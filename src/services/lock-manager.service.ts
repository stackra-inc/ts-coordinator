/**
 * @fileoverview LockManager — Distributed locks across browser tabs.
 *
 * Provides mutual exclusion for critical operations that should only
 * run in one tab at a time (sync, auth token refresh, IndexedDB migrations).
 *
 * Uses the Web Locks API when available (Chrome 69+, Firefox 96+, Safari 15.4+),
 * falls back to a BroadcastChannel-based lock protocol.
 *
 * @module @stackra/ts-coordinator
 * @category Services
 */

import { Injectable, Inject, Optional } from "@stackra/ts-container";
import { COORDINATOR_CONFIG } from "@/constants";
import type { CoordinatorModuleOptions } from "@/interfaces/coordinator-module-options.interface";
import { CoordinatorError } from "@/errors/coordinator.error";

/**
 * LockManager — Cross-tab distributed locks.
 *
 * @example
 * ```typescript
 * // Run a critical section — only one tab executes at a time
 * const result = await lockManager.run("sync-operation", async () => {
 *   return await performSync();
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Try to acquire with timeout
 * const result = await lockManager.run("token-refresh", async () => {
 *   return await refreshToken();
 * }, { timeoutMs: 5000 });
 * ```
 */
@Injectable()
export class LockManager {
  private readonly preferWebLocks: boolean;
  private readonly channelName: string;

  constructor(@Optional() @Inject(COORDINATOR_CONFIG) config: CoordinatorModuleOptions = {}) {
    this.preferWebLocks = config.preferWebLocks ?? true;
    this.channelName = config.channelName ?? "stackra-coordinator";
  }

  /**
   * Acquire a named lock and run the callback.
   *
   * Only one tab can hold a given lock at a time. Other tabs wait
   * until the lock is released.
   *
   * @param name - Lock name (should be descriptive, e.g. "sync", "token-refresh")
   * @param callback - The critical section to execute while holding the lock
   * @param options - Lock options (timeout, steal)
   * @returns The return value of the callback
   * @throws CoordinatorError if the lock cannot be acquired within the timeout
   *
   * @example
   * ```typescript
   * await lockManager.run("database-migration", async () => {
   *   await runMigrations();
   * });
   * ```
   */
  async run<T>(
    name: string,
    callback: () => Promise<T> | T,
    options: LockOptions = {},
  ): Promise<T> {
    const lockName = `${this.channelName}:lock:${name}`;

    if (this.preferWebLocks && this.isWebLocksAvailable()) {
      return this.runWithWebLocks(lockName, callback, options);
    }

    return this.runWithFallback(lockName, callback, options);
  }

  /**
   * Check if a lock is currently held (best-effort).
   *
   * Only works with Web Locks API. Returns false if Web Locks unavailable.
   *
   * @param name - Lock name to check
   */
  async isLocked(name: string): Promise<boolean> {
    const lockName = `${this.channelName}:lock:${name}`;

    if (!this.isWebLocksAvailable()) {
      return false; // Can't check without Web Locks
    }

    const state = await navigator.locks.query();
    return state.held?.some((lock) => lock.name === lockName) ?? false;
  }

  // ── Web Locks Implementation ────────────────────────────────────────────

  /**
   * Acquire lock using the Web Locks API.
   */
  private async runWithWebLocks<T>(
    lockName: string,
    callback: () => Promise<T> | T,
    options: LockOptions,
  ): Promise<T> {
    const { timeoutMs } = options;

    const lockOptions: { mode: "exclusive" | "shared"; signal?: AbortSignal } = {
      mode: "exclusive",
    };

    if (timeoutMs) {
      // Use AbortController for timeout
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      lockOptions.signal = controller.signal;

      try {
        return await navigator.locks.request(lockName, lockOptions, async () => {
          clearTimeout(timer);
          return await callback();
        });
      } catch (error: Error | any) {
        clearTimeout(timer);
        if (error.name === "AbortError") {
          throw new CoordinatorError(
            `Lock "${lockName}" acquisition timed out after ${timeoutMs}ms`,
            "LOCK_TIMEOUT",
            { lockName, timeoutMs },
          );
        }
        throw error;
      }
    }

    return navigator.locks.request(lockName, lockOptions, async () => {
      return await callback();
    });
  }

  // ── Fallback Implementation ─────────────────────────────────────────────

  /**
   * Fallback lock using localStorage + polling.
   *
   * Not as robust as Web Locks but works in all browsers.
   * Uses a simple lock-file pattern with expiry.
   */
  private async runWithFallback<T>(
    lockName: string,
    callback: () => Promise<T> | T,
    options: LockOptions,
  ): Promise<T> {
    const { timeoutMs = 30000 } = options;
    const lockKey = `__lock__${lockName}`;
    const lockValue = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const lockExpiry = 30000; // Lock expires after 30s (safety net)

    const startTime = Date.now();

    // Try to acquire
    while (true) {
      const existing = this.getStorageLock(lockKey);

      if (!existing || Date.now() - existing.at > lockExpiry) {
        // Lock is free or expired — claim it
        this.setStorageLock(lockKey, lockValue);

        // Double-check (simple compare-and-swap)
        await this.sleep(50);
        const check = this.getStorageLock(lockKey);

        if (check && check.value === lockValue) {
          // We got the lock
          try {
            return await callback();
          } finally {
            this.clearStorageLock(lockKey, lockValue);
          }
        }
      }

      // Check timeout
      if (Date.now() - startTime > timeoutMs) {
        throw new CoordinatorError(
          `Lock "${lockName}" acquisition timed out after ${timeoutMs}ms (fallback)`,
          "LOCK_TIMEOUT",
          { lockName, timeoutMs },
        );
      }

      // Wait and retry
      await this.sleep(100 + Math.random() * 100);
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────────────

  private isWebLocksAvailable(): boolean {
    return typeof navigator !== "undefined" && "locks" in navigator;
  }

  private getStorageLock(key: string): { value: string; at: number } | null {
    if (typeof localStorage === "undefined") return null;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private setStorageLock(key: string, value: string): void {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify({ value, at: Date.now() }));
    } catch {
      // Storage full or unavailable
    }
  }

  private clearStorageLock(key: string, expectedValue: string): void {
    if (typeof localStorage === "undefined") return;
    try {
      const existing = this.getStorageLock(key);
      if (existing && existing.value === expectedValue) {
        localStorage.removeItem(key);
      }
    } catch {
      // Ignore
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Options for lock acquisition.
 */
export interface LockOptions {
  /**
   * Maximum time to wait for lock acquisition, in milliseconds.
   * If the lock cannot be acquired within this time, a CoordinatorError is thrown.
   *
   * @default 30000
   */
  timeoutMs?: number;
}
