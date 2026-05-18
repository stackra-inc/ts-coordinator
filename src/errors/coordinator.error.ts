/**
 * @fileoverview Coordinator error class.
 *
 * @module @stackra/ts-coordinator
 * @category Errors
 */

/**
 * Base error for coordinator-related failures.
 *
 * @example
 * ```typescript
 * throw new CoordinatorError("Lock acquisition timed out", "LOCK_TIMEOUT");
 * ```
 */
export class CoordinatorError extends Error {
  public readonly code: string;
  public readonly context?: Record<string, unknown>;

  constructor(
    message: string,
    code: string = "COORDINATOR_ERROR",
    context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "CoordinatorError";
    this.code = code;
    this.context = context;
  }
}
