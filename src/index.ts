/**
 * @stackra/ts-coordinator
 *
 * Cross-tab coordination primitives for the `@stackra` monorepo.
 *
 * Provides:
 * - `TabCoordinator` — leader election and tab awareness
 * - `LockManager` — distributed locks across browser tabs
 * - `CoordinatorTransport` — cross-tab event relay for `@stackra/ts-events`
 * - `CoordinatorModule` — DI module with `forRoot()` / `forRootAsync()` configuration
 * - `@InjectCoordinator()` — decorator for TabCoordinator injection
 * - `@InjectLockManager()` — decorator for LockManager injection
 * - `useIsLeader` — React hook for leadership status
 * - `useTabCount` — React hook for active tab count
 * - `coordinator` — module-level lazy proxy facade
 * - `lock` — module-level lazy proxy facade for locks
 *
 * This package does NOT contain:
 * - Event bus (use `@stackra/ts-events`)
 * - Queue logic (use `@stackra/ts-queue`)
 * - WebSocket logic (use `@stackra/ts-realtime`)
 * - Sync logic (use `@stackra/ts-sync`)
 *
 * It provides ONLY coordination primitives that those packages consume.
 *
 * @example
 * ```typescript
 * import { CoordinatorModule } from "@stackra/ts-coordinator";
 *
 * @Module({
 *   imports: [
 *     CoordinatorModule.forRoot({
 *       channelName: "my-pos-app",
 *       heartbeatMs: 1000,
 *       broadcastPatterns: ["sync:**", "auth:**"],
 *     }),
 *   ],
 * })
 * export class AppModule {}
 * ```
 *
 * @module @stackra/ts-coordinator
 */

// ============================================================================
// Module
// ============================================================================
export { CoordinatorModule } from "./coordinator.module";

// ============================================================================
// Services
// ============================================================================
export { TabCoordinator } from "./services";
export { LockManager } from "./services";
export { CoordinatorTransport } from "./services";

// ============================================================================
// Decorators
// ============================================================================
export { InjectCoordinator } from "./decorators";
export { InjectLockManager } from "./decorators";

// ============================================================================
// Hooks
// ============================================================================
export { useIsLeader } from "./hooks";
export { useTabCount } from "./hooks";

// ============================================================================
// Facades
// ============================================================================
export { coordinator } from "./facades";
export { lock } from "./facades";

// ============================================================================
// Constants
// ============================================================================
export {
  COORDINATOR_CONFIG,
  TAB_COORDINATOR,
  TAB_LOCK_MANAGER,
} from "./constants";

// ============================================================================
// Interfaces
// ============================================================================
export type { TabInfo, TabRole } from "./interfaces";
export type {
  CoordinatorModuleOptions,
  CoordinatorModuleAsyncOptions,
} from "./interfaces";
export type { LockOptions } from "./services";

// ============================================================================
// Errors
// ============================================================================
export { CoordinatorError } from "./errors";

// ============================================================================
// Utilities
// ============================================================================
export { defineConfig } from "./utils";
