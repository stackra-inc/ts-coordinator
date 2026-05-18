/**
 * @fileoverview CoordinatorModule — DI Module for cross-tab coordination.
 *
 * Registers:
 * - `COORDINATOR_CONFIG` — raw config object
 * - `TabCoordinator` — leader election and tab awareness
 * - `TAB_COORDINATOR` — alias token for injection
 * - `LockManager` — distributed locks across tabs
 * - `TAB_LOCK_MANAGER` — alias token for injection
 * - `CoordinatorTransport` — event relay transport (auto-discovered by ts-events)
 *
 * @module @stackra/ts-coordinator
 */

import { Global, Module } from "@stackra/ts-container";
import type { IDynamicModule } from "@stackra/ts-container";
import { COORDINATOR_CONFIG, TAB_COORDINATOR, TAB_LOCK_MANAGER } from "@/constants";
import { TabCoordinator } from "@/services/tab-coordinator.service";
import { LockManager } from "@/services/lock-manager.service";
import { CoordinatorTransport } from "@/services/coordinator-transport.service";
import type { CoordinatorModuleOptions } from "@/interfaces/coordinator-module-options.interface";
/**
 * CoordinatorModule — Cross-tab coordination primitives.
 *
 * Provides leader election, distributed locks, and cross-tab event relay.
 * Import once in your root module via `forRoot()`.
 *
 * The `CoordinatorTransport` is auto-discovered by `@stackra/ts-events`
 * at bootstrap (via the `@EventTransport` decorator) — no manual wiring needed.
 *
 * @example
 * ```typescript
 * import { Module } from "@stackra/ts-container";
 * import { CoordinatorModule } from "@stackra/ts-coordinator";
 *
 * @Module({
 *   imports: [
 *     CoordinatorModule.forRoot({
 *       channelName: "my-pos-app",
 *       heartbeatMs: 1000,
 *       staleThresholdMs: 3000,
 *       broadcastEvents: true,
 *       broadcastPatterns: ["sync:**", "auth:**", "state:**"],
 *     }),
 *   ],
 * })
 * export class AppModule {}
 * ```
 *
 * @example
 * ```typescript
 * // Consuming in other services:
 * @Injectable()
 * class SyncEngine {
 *   constructor(@InjectCoordinator() private readonly coordinator: TabCoordinator) {
 *     coordinator.role$.subscribe(role => {
 *       if (role === "leader") this.startAutoSync();
 *       else this.stopAutoSync();
 *     });
 *   }
 * }
 * ```
 */
@Global()
@Module({})
export class CoordinatorModule {
  /**
   * Configure the coordinator module.
   *
   * Call once in your root module. Registers the TabCoordinator,
   * LockManager, and CoordinatorTransport globally.
   *
   * @param config - Coordinator configuration options
   * @returns A IDynamicModule with all coordinator providers
   */
  public static forRoot(config: CoordinatorModuleOptions = {}): IDynamicModule {
    return {
      module: CoordinatorModule,
      global: true,
      providers: [
        // Configuration
        { provide: COORDINATOR_CONFIG, useValue: config },

        // Core services
        { provide: TabCoordinator, useClass: TabCoordinator },
        { provide: TAB_COORDINATOR, useExisting: TabCoordinator },

        // Lock manager
        { provide: LockManager, useClass: LockManager },
        { provide: TAB_LOCK_MANAGER, useExisting: LockManager },

        // Event transport (auto-discovered by ts-events via @EventTransport)
        ...(config.broadcastEvents !== false ? [CoordinatorTransport] : []),
      ],
      exports: [TabCoordinator, TAB_COORDINATOR, LockManager, TAB_LOCK_MANAGER, COORDINATOR_CONFIG],
    };
  }
}
