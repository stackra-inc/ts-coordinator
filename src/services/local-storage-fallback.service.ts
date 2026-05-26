/**
 * @fileoverview LocalStorageFallback — Fallback cross-tab messaging via storage events.
 *
 * Used when BroadcastChannel is unavailable (some WebViews, older environments).
 * Leverages the `storage` event which fires in all OTHER tabs when localStorage
 * is modified. Messages are written as JSON to unique keys, read by other tabs,
 * then cleaned up periodically.
 *
 * Limitations vs BroadcastChannel:
 * - ~5ms latency (vs ~1ms for BroadcastChannel)
 * - 5-10MB total localStorage limit
 * - Synchronous writes (blocks main thread briefly)
 * - Does NOT fire in the tab that wrote the value
 *
 * @module @stackra/ts-coordinator
 * @category Services
 */

import { Logger } from "@stackra/ts-logger";

/**
 * Message envelope stored in localStorage.
 */
interface StorageMessage {
  /** Sender tab ID. */
  senderId: string;
  /** Message payload. */
  data: unknown;
  /** Timestamp for cleanup. */
  at: number;
}

/**
 * LocalStorageFallback — Cross-tab messaging via storage events.
 *
 * Drop-in replacement for BroadcastChannel when the native API is unavailable.
 * Implements the same `postMessage` / `onmessage` interface.
 *
 * Uses unique keys per message to prevent rapid-fire message loss, with
 * periodic cleanup of stale entries.
 *
 * @example
 * ```typescript
 * const channel = new LocalStorageFallback("my-channel", "tab-123");
 * channel.onmessage = (event) => logger.log(event.data);
 * channel.postMessage({ kind: "heartbeat", tabId: "tab-123", at: Date.now() });
 * ```
 */
export class LocalStorageFallback {
  private readonly logger = new Logger(LocalStorageFallback.name);
  private readonly storagePrefix: string;
  private readonly storageHandler: (event: StorageEvent) => void;
  private readonly cleanupTimer: ReturnType<typeof setInterval> | null = null;
  private closed = false;
  private messageCounter = 0;

  /** Callback for incoming messages (mirrors BroadcastChannel API). */
  public onmessage: ((event: { data: unknown }) => void) | null = null;

  constructor(
    public readonly name: string,
    private readonly senderId: string,
  ) {
    this.storagePrefix = `__coordinator_msg__${name}__`;

    // Listen for storage events from other tabs
    this.storageHandler = (event: StorageEvent) => {
      if (this.closed) return;
      if (!event.key || !event.key.startsWith(this.storagePrefix)) return;
      if (!event.newValue) return;

      try {
        const message: StorageMessage = JSON.parse(event.newValue);

        // Ignore our own messages
        if (message.senderId === this.senderId) return;

        // Deliver to handler
        if (this.onmessage) {
          this.onmessage({ data: message.data });
        }
      } catch {
        // Ignore malformed messages
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", this.storageHandler);

      // Periodic cleanup of stale messages (every 5 seconds)
      this.cleanupTimer = setInterval(() => this.cleanup(), 5000);
    }
  }

  /**
   * Post a message to all other tabs via localStorage.
   *
   * Writes the message to a unique localStorage key (triggering `storage`
   * events in other tabs). Messages are cleaned up periodically.
   */
  postMessage(data: unknown): void {
    if (this.closed) return;
    if (typeof localStorage === "undefined") return;

    const message: StorageMessage = {
      senderId: this.senderId,
      data,
      at: Date.now(),
    };

    // Use a unique key per message to prevent overwriting
    const key = `${this.storagePrefix}${Date.now()}_${this.messageCounter++}`;

    try {
      localStorage.setItem(key, JSON.stringify(message));

      // Schedule cleanup of this specific message after a short delay
      setTimeout(() => {
        try {
          localStorage.removeItem(key);
        } catch {
          /* ignore */
        }
      }, 500);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      this.logger.warn(`[LocalStorageFallback] Failed to post message: ${msg}`);
    }
  }

  /**
   * Close the fallback channel and stop listening.
   */
  close(): void {
    this.closed = true;
    this.onmessage = null;

    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", this.storageHandler);
    }
  }

  /**
   * Remove stale messages from localStorage.
   */
  private cleanup(): void {
    if (typeof localStorage === "undefined") return;

    const now = Date.now();
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(this.storagePrefix)) continue;

      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;

        const message: StorageMessage = JSON.parse(raw);
        // Remove messages older than 10 seconds
        if (now - message.at > 10000) {
          keysToRemove.push(key);
        }
      } catch {
        // Remove malformed entries
        keysToRemove.push(key);
      }
    }

    for (const key of keysToRemove) {
      try {
        localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
    }
  }
}
