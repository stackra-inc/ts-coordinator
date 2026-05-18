/**
 * @fileoverview Type-safe config helper for coordinator configuration.
 *
 * @module @stackra/ts-coordinator
 * @category Utilities
 */

import type { CoordinatorModuleOptions } from "@/interfaces/coordinator-module-options.interface";

/**
 * Type-safe configuration helper.
 *
 * Returns the config as-is but provides full IntelliSense and
 * type checking in the config file.
 *
 * @param config - Coordinator module options
 * @returns The same config object (identity function for type safety)
 *
 * @example
 * ```typescript
 * // config/coordinator.config.ts
 * import { defineConfig } from "@stackra/ts-coordinator";
 *
 * export default defineConfig({
 *   channelName: "my-app",
 *   heartbeatMs: 1000,
 *   broadcastPatterns: ["sync:**", "auth:**"],
 * });
 * ```
 */
export function defineConfig(config: CoordinatorModuleOptions): CoordinatorModuleOptions {
  return config;
}
