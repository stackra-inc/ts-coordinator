/**
 * @fileoverview Coordinator module configuration interface.
 *
 * @module @stackra/ts-coordinator
 * @category Interfaces
 */

/**
 * Configuration options for the CoordinatorModule.
 *
 * @example
 * ```typescript
 * CoordinatorModule.forRoot({
 *   channelName: "my-pos-app",
 *   heartbeatMs: 1000,
 *   staleThresholdMs: 3000,
 *   broadcastEvents: true,
 *   broadcastPatterns: ["sync:**", "auth:**"],
 * });
 * ```
 */
export interface CoordinatorModuleOptions {
  /**
   * BroadcastChannel name shared across all tabs.
   *
   * All tabs using the same channel name participate in the same
   * leader election and receive the same cross-tab events.
   *
   * @default "stackra-coordinator"
   */
  channelName?: string;

  /**
   * Interval between leader heartbeat pings, in milliseconds.
   *
   * Shorter intervals mean faster failover when the leader tab closes,
   * at the cost of slightly more cross-tab chatter.
   *
   * @default 1000
   */
  heartbeatMs?: number;

  /**
   * Time in milliseconds after which a leader is considered stale
   * if no heartbeat is received.
   *
   * Should be at least 2-3x the heartbeat interval.
   *
   * @default 3000
   */
  staleThresholdMs?: number;

  /**
   * Whether to enable the BroadcastTransport for cross-tab event relay.
   *
   * When true, events matching `broadcastPatterns` emitted via
   * `@stackra/ts-events` will be relayed to all other tabs.
   *
   * Requires `@stackra/ts-events` as a peer dependency.
   *
   * @default true
   */
  broadcastEvents?: boolean;

  /**
   * Event name patterns to relay across tabs.
   *
   * Uses the same wildcard syntax as `@stackra/ts-events`:
   * - `*` matches one segment
   * - `**` matches one or more segments
   *
   * Only events matching these patterns will be broadcast.
   * Set to `["**"]` to relay all events (not recommended for performance).
   *
   * @default ["sync:**", "auth:**", "state:**"]
   */
  broadcastPatterns?: string[];

  /**
   * Whether to prefer the Web Locks API for distributed locks
   * when available (Chrome 69+, Firefox 96+, Safari 15.4+).
   *
   * Falls back to localStorage-based locking when unavailable.
   *
   * @default true
   */
  preferWebLocks?: boolean;

  /**
   * Whether to use the Web Locks API for leader election when available.
   *
   * When true, leader election uses `navigator.locks.request()` which is
   * race-free and provides instant failover when a tab closes (the lock
   * is automatically released). Falls back to the heartbeat protocol
   * when Web Locks is unavailable.
   *
   * @default true
   */
  preferWebLocksElection?: boolean;

  /**
   * Whether to transfer leadership to the focused/visible tab.
   *
   * When true, if the current leader becomes hidden and another tab
   * is visible, leadership will transfer. This ensures the active tab
   * has priority for resource-intensive operations.
   *
   * @default false
   */
  preferVisibleLeader?: boolean;
}

/**
 * Async factory for coordinator module options.
 *
 * Use with `CoordinatorModule.forRootAsync()` when configuration
 * needs to be resolved asynchronously.
 */
export interface CoordinatorModuleAsyncOptions {
  /**
   * Factory function that returns the coordinator options.
   */
  useFactory: (
    ...args: unknown[]
  ) => Promise<CoordinatorModuleOptions> | CoordinatorModuleOptions;

  /**
   * Dependencies to inject into the factory function.
   */
  inject?: unknown[];
}
