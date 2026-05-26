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
 *   import("@stackra/ts-coordinator/testing").then(({ exposeCoordinatorTestGlobals }) => {
 *     exposeCoordinatorTestGlobals();
 *   });
 * }
 * ```
 *
 * @module @stackra/ts-coordinator/testing
 */
/**
 * Expose coordinator test globals on `window`.
 *
 * Call this after `Application.create(AppModule)` resolves.
 */
declare function exposeCoordinatorTestGlobals(): void;

export { exposeCoordinatorTestGlobals };
