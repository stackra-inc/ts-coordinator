/**
 * @fileoverview Coordinator inject proxy — Global coordinator access.
 *
 * @module @stackra/ts-coordinator
 */

import { inject } from "@stackra/ts-container";
import type { TabCoordinator } from "@/services/tab-coordinator.service";
import { TAB_COORDINATOR } from "@/constants";

/**
 * Coordinator inject proxy — Static-style access to TabCoordinator.
 *
 * Provides global access to tab coordination without manual DI resolution.
 * Must call `Application.create(AppModule)` before using.
 *
 * @example
 * ```typescript
 * import { coordinator } from "@stackra/ts-coordinator";
 *
 * // Check if this tab is the leader
 * if (coordinator.isLeader()) {
 *   await performSync();
 * }
 *
 * // Subscribe to role changes
 * coordinator.role$.subscribe(role => {
 *   logger.log(`Tab role: ${role}`);
 * });
 *
 * // Get active tab count
 * const count = coordinator.getTabCount();
 * ```
 *
 * @see {@link TabCoordinator} for available methods
 */
export const coordinator: TabCoordinator = inject<TabCoordinator>(TAB_COORDINATOR);
