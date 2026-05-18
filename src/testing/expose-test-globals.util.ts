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
 *   import("@stackra/ts-coordinator/testing/expose-test-globals");
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
  const win = window as any;

  // Track role
  win.__coordinatorRole = coordinator.getRole();
  coordinator.role$.subscribe((role) => {
    win.__coordinatorRole = role;
  });

  // Track tab count
  win.__coordinatorTabCount = coordinator.getTabCount();
  setInterval(() => {
    win.__coordinatorTabCount = coordinator.getTabCount();
  }, 1000);

  // Track received events (populated by the app's event listeners)
  win.__coordinatorReceivedEvents = win.__coordinatorReceivedEvents ?? [];

  // Emit test event helper
  win.__emitTestEvent = (eventName: string, payload: unknown) => {
    try {
      // Import dynamically to avoid hard dep
      const { inject: injectFn } = require("@stackra/ts-container");
      const emitter = injectFn(Symbol.for("EVENT_EMITTER"));
      if (emitter && typeof emitter.emit === "function") {
        emitter.emit(eventName, payload);
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
      return (realtimeManager as any)?.isConnectionActive?.() ?? false;
    } catch {
      return false;
    }
  };
}
