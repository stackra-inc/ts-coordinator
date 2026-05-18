/**
 * @fileoverview Lock inject proxy — Global lock manager access.
 *
 * @module @stackra/ts-coordinator
 */

import { inject } from "@stackra/ts-container";
import type { LockManager } from "@/services/lock-manager.service";
import { TAB_LOCK_MANAGER } from "@/constants";

/**
 * Lock inject proxy — Static-style access to LockManager.
 *
 * Provides global access to distributed locks without manual DI resolution.
 * Must call `Application.create(AppModule)` before using.
 *
 * @example
 * ```typescript
 * import { lock } from "@stackra/ts-coordinator";
 *
 * // Run a critical section across tabs
 * await lock.run("sync-operation", async () => {
 *   await performSync();
 * });
 *
 * // With timeout
 * await lock.run("token-refresh", async () => {
 *   return await refreshToken();
 * }, { timeoutMs: 5000 });
 * ```
 *
 * @see {@link LockManager} for available methods
 */
export const lock: LockManager = inject<LockManager>(TAB_LOCK_MANAGER);
