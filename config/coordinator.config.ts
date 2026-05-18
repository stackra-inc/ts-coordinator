/**
 * Coordinator Configuration
 *
 * Cross-tab coordination settings: leader election, distributed locks,
 * and event relay configuration.
 *
 * ## Environment Variables
 *
 * | Variable                              | Description                          | Default                  |
 * |---------------------------------------|--------------------------------------|--------------------------|
 * | `VITE_COORDINATOR_CHANNEL`            | BroadcastChannel name                | `'stackra-coordinator'`  |
 * | `VITE_COORDINATOR_HEARTBEAT_MS`       | Leader heartbeat interval (ms)       | `1000`                   |
 * | `VITE_COORDINATOR_STALE_MS`           | Stale threshold (ms)                 | `3000`                   |
 * | `VITE_COORDINATOR_BROADCAST_EVENTS`   | Enable cross-tab event relay         | `true`                   |
 * | `VITE_COORDINATOR_PREFER_WEB_LOCKS`   | Prefer Web Locks API for locks       | `true`                   |
 * | `VITE_COORDINATOR_PREFER_VISIBLE`     | Transfer leadership to visible tab   | `false`                  |
 *
 * @module config/coordinator
 *
 * @example
 * ```typescript
 * import coordinatorConfig from './config/coordinator.config';
 * import { CoordinatorModule } from '@stackra/ts-coordinator';
 *
 * CoordinatorModule.forRoot(coordinatorConfig);
 * ```
 */

import { defineConfig } from "@stackra/ts-coordinator";

const coordinatorConfig = defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Channel Name
  |--------------------------------------------------------------------------
  |
  | BroadcastChannel name shared across all tabs. All tabs using the same
  | channel name participate in the same leader election group.
  |
  */
  channelName: env("VITE_COORDINATOR_CHANNEL", "stackra-coordinator"),

  /*
  |--------------------------------------------------------------------------
  | Heartbeat Interval
  |--------------------------------------------------------------------------
  |
  | How often the leader broadcasts a heartbeat (ms). Shorter intervals
  | mean faster failover but more cross-tab chatter.
  |
  */
  heartbeatMs: env("VITE_COORDINATOR_HEARTBEAT_MS", 1000),

  /*
  |--------------------------------------------------------------------------
  | Stale Threshold
  |--------------------------------------------------------------------------
  |
  | Time after which a leader is considered dead if no heartbeat received.
  | Should be 2-3x the heartbeat interval.
  |
  */
  staleThresholdMs: env("VITE_COORDINATOR_STALE_MS", 3000),

  /*
  |--------------------------------------------------------------------------
  | Cross-Tab Event Relay
  |--------------------------------------------------------------------------
  |
  | When enabled, events matching `broadcastPatterns` emitted via
  | @stackra/ts-events will be relayed to all other tabs automatically.
  |
  */
  broadcastEvents: env("VITE_COORDINATOR_BROADCAST_EVENTS", true),

  /*
  |--------------------------------------------------------------------------
  | Broadcast Patterns
  |--------------------------------------------------------------------------
  |
  | Event name patterns to relay across tabs. Uses wildcard syntax:
  | - `*` matches one segment
  | - `**` matches one or more segments
  |
  | Only events matching these patterns will be broadcast to other tabs.
  |
  */
  broadcastPatterns: ["sync:**", "auth:**", "state:**"],

  /*
  |--------------------------------------------------------------------------
  | Web Locks API
  |--------------------------------------------------------------------------
  |
  | Whether to prefer the Web Locks API for distributed locks.
  | Falls back to localStorage-based locking when unavailable.
  |
  */
  preferWebLocks: env("VITE_COORDINATOR_PREFER_WEB_LOCKS", true),

  /*
  |--------------------------------------------------------------------------
  | Prefer Visible Leader
  |--------------------------------------------------------------------------
  |
  | When true, leadership transfers to the focused/visible tab.
  | Useful for ensuring the active tab handles resource-intensive work.
  |
  */
  preferVisibleLeader: env("VITE_COORDINATOR_PREFER_VISIBLE", false),
});

export default coordinatorConfig;
