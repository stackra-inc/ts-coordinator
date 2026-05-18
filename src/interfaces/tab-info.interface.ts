/**
 * @fileoverview Tab information interface.
 *
 * @module @stackra/ts-coordinator
 * @category Interfaces
 */

/**
 * Information about a known tab in the coordination group.
 */
export interface TabInfo {
  /** Unique identifier for the tab (generated at construction). */
  id: string;

  /** Whether this tab is the current leader. */
  isLeader: boolean;

  /** Epoch milliseconds of the last heartbeat received from this tab. */
  lastSeen: number;

  /** Whether this tab is the current tab (self). */
  isSelf: boolean;
}

/**
 * Role of the current tab in the coordination group.
 */
export type TabRole = "leader" | "follower";
