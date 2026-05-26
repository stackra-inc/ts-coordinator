/**
 * @fileoverview Test harness for Playwright E2E tests.
 *
 * Import this file in your app's entry point (only in test/dev mode)
 * to expose coordinator internals on `window` for Playwright assertions.
 *
 * @example
 * ```typescript
 * // main.tsx (dev only)
 * if (import.meta.env.DEV) {
 *   import("@stackra/ts-coordinator/testing").then(({ exposeCoordinatorTestGlobals }) => {
 *     exposeCoordinatorTestGlobals();
 *   });
 * }
 * ```
 *
 * @module @stackra/ts-coordinator/testing
 */

import { inject } from "@stackra/ts-container";
import type { TabCoordinator } from "@/services/tab-coordinator.service";
import type { LockManager } from "@/services/lock-manager.service";
import { TAB_COORDINATOR, TAB_LOCK_MANAGER } from "@/constants";

/**
 * Expose coordinator test globals on `window`.
 *
 * Call this after `Application.create(AppModule)` resolves.
 */
export function exposeCoordinatorTestGlobals(): void {
  if (typeof window === "undefined") return;

  const coordinator = inject<TabCoordinator>(TAB_COORDINATOR);
  const lockManager = inject<LockManager>(TAB_LOCK_MANAGER);
  const win = window as unknown as Record<string, unknown>;

  // Track role
  win.__coordinatorRole = coordinator.getRole();
  coordinator.role$.subscribe((role) => {
    win.__coordinatorRole = role;
  });

  // Track tab count reactively
  win.__coordinatorTabCount = coordinator.getTabCount();
  coordinator.tabCount$.subscribe((count) => {
    win.__coordinatorTabCount = count;
  });

  // Track received events (populated by the app's event listeners)
  win.__coordinatorReceivedEvents =
    (win.__coordinatorReceivedEvents as string[]) ?? [];

  // Emit test event helper
  win.__emitTestEvent = (eventName: string, payload: unknown) => {
    try {
      const emitter = inject(Symbol.for("EVENT_EMITTER"));
      if (
        emitter &&
        typeof (emitter as { emit: unknown }).emit === "function"
      ) {
        (emitter as { emit: (name: string, payload: unknown) => void }).emit(
          eventName,
          payload,
        );
      }
    } catch {
      // Events package not available
    }
  };

  // Lock acquisition helper
  win.__acquireLock = async (name: string, holdMs: number) => {
    const startTime = Date.now();
    let endTime = startTime;
    let usedWebLocks = false;

    try {
      await lockManager.run(name, async () => {
        usedWebLocks = typeof navigator !== "undefined" && "locks" in navigator;
        // Hold the lock for the specified duration
        await new Promise((resolve) => setTimeout(resolve, holdMs));
        endTime = Date.now();
      });

      return { acquired: true, startTime, endTime, usedWebLocks };
    } catch {
      return { acquired: false, startTime, endTime: Date.now(), usedWebLocks };
    }
  };

  // Sync trigger helper
  win.__triggerSync = () => {
    if (coordinator.isLeader()) {
      return { synced: true, role: "leader" };
    }
    return { synced: false, role: "follower" };
  };

  // WebSocket check helper
  win.__hasWebSocket = () => {
    try {
      const realtimeManager = inject(Symbol.for("REALTIME_MANAGER"));
      return (
        (
          realtimeManager as { isConnectionActive?: () => boolean }
        )?.isConnectionActive?.() ?? false
      );
    } catch {
      return false;
    }
  };
}
