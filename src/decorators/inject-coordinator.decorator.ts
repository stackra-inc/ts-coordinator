/**
 * @fileoverview @InjectCoordinator decorator.
 *
 * @module @stackra/ts-coordinator
 * @category Decorators
 */

import { Inject } from "@stackra/ts-container";
import { TAB_COORDINATOR } from "@/constants";

/**
 * Inject the TabCoordinator service.
 *
 * @example
 * ```typescript
 * @Injectable()
 * class SyncEngine {
 *   constructor(@InjectCoordinator() private readonly coordinator: TabCoordinator) {}
 * }
 * ```
 */
export const InjectCoordinator = (): ParameterDecorator => Inject(TAB_COORDINATOR);
