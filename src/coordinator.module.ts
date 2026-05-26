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
import type { DynamicModule } from "@stackra/ts-container";
import {
  COORDINATOR_CONFIG,
  TAB_COORDINATOR,
  TAB_LOCK_MANAGER,
} from "@/constants";
import { TabCoordinator } from "@/services/tab-coordinator.service";
import { LockManager } from "@/services/lock-manager.service";
import { CoordinatorTransport } from "@/services/coordinator-transport.service";
import type {
  CoordinatorModuleOptions,
  CoordinatorModuleAsyncOptions,
} from "@/interfaces/coordinator-module-options.interface";

/**
 * CoordinatorModule — Cross-tab coordination primitives.
 *
 * Provides leader election, distributed locks, and cross-tab event relay.
 * Import once in your root module via `forRoot()` or `forRootAsync()`.
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
 * // Async configuration (e.g., from a remote config service)
 * @Module({
 *   imports: [
 *     CoordinatorModule.forRootAsync({
 *       useFactory: async (configService) => ({
 *         channelName: configService.get("COORDINATOR_CHANNEL"),
 *         heartbeatMs: configService.get("COORDINATOR_HEARTBEAT_MS"),
 *       }),
 *       inject: [ConfigService],
 *     }),
 *   ],
 * })
 * export class AppModule {}
 * ```
 */
@Global()
@Module({})
export class CoordinatorModule {
  /**
   * Configure the coordinator module with static options.
   *
   * Call once in your root module. Registers the TabCoordinator,
   * LockManager, and CoordinatorTransport globally.
   *
   * @param config - Coordinator configuration options
   * @returns A DynamicModule with all coordinator providers
   */
  public static forRoot(config: CoordinatorModuleOptions = {}): DynamicModule {
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
      exports: [
        TabCoordinator,
        TAB_COORDINATOR,
        LockManager,
        TAB_LOCK_MANAGER,
        COORDINATOR_CONFIG,
      ],
    };
  }

  /**
   * Configure the coordinator module with async options.
   *
   * Use when configuration needs to be resolved asynchronously
   * (e.g., from a remote config service, IndexedDB, or API).
   *
   * @param options - Async configuration options with factory
   * @returns A DynamicModule with all coordinator providers
   */
  public static forRootAsync(
    options: CoordinatorModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: CoordinatorModule,
      global: true,
      providers: [
        // Async configuration factory
        {
          provide: COORDINATOR_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },

        // Core services
        { provide: TabCoordinator, useClass: TabCoordinator },
        { provide: TAB_COORDINATOR, useExisting: TabCoordinator },

        // Lock manager
        { provide: LockManager, useClass: LockManager },
        { provide: TAB_LOCK_MANAGER, useExisting: LockManager },

        // Event transport (always included for async — can't check config statically)
        CoordinatorTransport,
      ],
      exports: [
        TabCoordinator,
        TAB_COORDINATOR,
        LockManager,
        TAB_LOCK_MANAGER,
        COORDINATOR_CONFIG,
      ],
    };
  }
}
