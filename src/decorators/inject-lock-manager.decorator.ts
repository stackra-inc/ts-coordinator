/**
 * @fileoverview @InjectLockManager decorator.
 *
 * @module @stackra/ts-coordinator
 * @category Decorators
 */

import { Inject } from "@stackra/ts-container";
import { TAB_LOCK_MANAGER } from "@/constants";

/**
 * Inject the LockManager service.
 *
 * @example
 * ```typescript
 * @Injectable()
 * class TokenService {
 *   constructor(@InjectLockManager() private readonly locks: LockManager) {}
 *
 *   async refresh() {
 *     return this.locks.run("token-refresh", async () => {
 *       return await this.doRefresh();
 *     });
 *   }
 * }
 * ```
 */
export const InjectLockManager = (): ParameterDecorator => Inject(TAB_LOCK_MANAGER);
