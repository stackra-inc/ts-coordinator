import { IDynamicModule } from '@stackra/ts-container';
import { Observable } from 'rxjs';
import { IEventTransport } from '@stackra/contracts';
export { COORDINATOR_CONFIG, TAB_COORDINATOR, TAB_LOCK_MANAGER } from '@stackra/contracts';

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
interface CoordinatorModuleOptions {
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
     * Falls back to BroadcastChannel-based locking when unavailable.
     *
     * @default true
     */
    preferWebLocks?: boolean;
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

/**
 * CoordinatorModule — Cross-tab coordination primitives.
 *
 * Provides leader election, distributed locks, and cross-tab event relay.
 * Import once in your root module via `forRoot()`.
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
 * // Consuming in other services:
 * @Injectable()
 * class SyncEngine {
 *   constructor(@InjectCoordinator() private readonly coordinator: TabCoordinator) {
 *     coordinator.role$.subscribe(role => {
 *       if (role === "leader") this.startAutoSync();
 *       else this.stopAutoSync();
 *     });
 *   }
 * }
 * ```
 */
declare class CoordinatorModule {
    /**
     * Configure the coordinator module.
     *
     * Call once in your root module. Registers the TabCoordinator,
     * LockManager, and CoordinatorTransport globally.
     *
     * @param config - Coordinator configuration options
     * @returns A IDynamicModule with all coordinator providers
     */
    static forRoot(config?: CoordinatorModuleOptions): IDynamicModule;
}

/**
 * @fileoverview Tab information interface.
 *
 * @module @stackra/ts-coordinator
 * @category Interfaces
 */
/**
 * Information about a known tab in the coordination group.
 */
interface TabInfo {
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
type TabRole = "leader" | "follower";

/**
 * @fileoverview TabCoordinator — Leader election and tab awareness.
 *
 * Provides a single source of truth for which tab is the "leader" in a
 * multi-tab browser environment. Uses the native BroadcastChannel API
 * with a heartbeat-based leader election protocol.
 *
 * Other packages (`ts-queue`, `ts-sync`, `ts-realtime`) consume this
 * service to ensure only one tab performs expensive operations (sync,
 * WebSocket connections, queue draining).
 *
 * @module @stackra/ts-coordinator
 * @category Services
 */

/**
 * TabCoordinator — Leader election and cross-tab awareness.
 *
 * Responsibilities:
 * - Elect a single leader tab from all open tabs
 * - Detect leader failure via heartbeat timeout
 * - Track active tabs (census)
 * - Emit role changes as an RxJS observable
 * - Optionally prefer the visible/focused tab as leader
 *
 * @example
 * ```typescript
 * @Injectable()
 * class SyncEngine {
 *   constructor(private readonly coordinator: TabCoordinator) {
 *     coordinator.role$.subscribe(role => {
 *       if (role === "leader") this.startAutoSync();
 *       else this.stopAutoSync();
 *     });
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Check leadership synchronously
 * if (coordinator.isLeader()) {
 *   await performExpensiveOperation();
 * }
 * ```
 */
declare class TabCoordinator {
    private readonly logger;
    /** Unique identifier for this tab instance. */
    private readonly tabId;
    /** BroadcastChannel or localStorage fallback for inter-tab communication. */
    private readonly channel;
    /** Configuration with defaults applied. */
    private readonly config;
    /** Current leader tab ID, or null if unknown. */
    private leaderId;
    /** Epoch ms of the last heartbeat received from the leader. */
    private lastHeartbeatAt;
    /** Heartbeat timer handle (active only when this tab is leader). */
    private heartbeatTimer;
    /** Stale-check timer handle (active only when this tab is follower). */
    private staleCheckTimer;
    /** Known tabs with their last-seen timestamps. */
    private readonly knownTabs;
    /** Role subject for reactive subscriptions. */
    private readonly roleSubject;
    /** Visibility change handler reference for cleanup. */
    private readonly visibilityHandler;
    /**
     * Observable that emits the current tab's role.
     * Only emits on actual role changes (distinctUntilChanged).
     */
    readonly role$: Observable<TabRole>;
    constructor(config?: CoordinatorModuleOptions);
    /**
     * Whether this tab is currently the leader.
     */
    isLeader(): boolean;
    /**
     * Get the current tab's unique ID.
     */
    getTabId(): string;
    /**
     * Get the current leader's tab ID, or null if unknown.
     */
    getLeaderId(): string | null;
    /**
     * Get the current role of this tab.
     */
    getRole(): TabRole;
    /**
     * Get information about all known active tabs.
     */
    getActiveTabs(): TabInfo[];
    /**
     * Get the number of active tabs.
     */
    getTabCount(): number;
    /**
     * Register a callback for when this tab becomes leader.
     *
     * @returns Unsubscribe function
     */
    onLeader(callback: () => void): () => void;
    /**
     * Register a callback for when this tab loses leadership.
     *
     * @returns Unsubscribe function
     */
    onFollower(callback: () => void): () => void;
    /**
     * Voluntarily resign leadership.
     *
     * Useful when the tab is about to close or navigate away.
     */
    resign(): void;
    /**
     * Cleanup all resources. Call on application shutdown.
     */
    destroy(): void;
    /**
     * Announce this tab's presence to all peers.
     */
    private announce;
    /**
     * Attempt to claim leadership.
     *
     * If no leader is known or the current leader is stale, this tab
     * broadcasts a claim. After a short delay, if no higher-priority
     * tab has claimed, this tab becomes leader.
     */
    private claimLeadership;
    /**
     * Promote this tab to leader.
     */
    private becomeLeader;
    /**
     * Handle incoming messages from peer tabs.
     */
    private onMessage;
    /**
     * Start the heartbeat timer (leader only).
     */
    private startHeartbeat;
    /**
     * Stop the heartbeat timer.
     */
    private stopHeartbeat;
    /**
     * Start the stale-check loop that detects leader failure.
     */
    private startStaleCheck;
    /**
     * Stop the stale-check loop.
     */
    private stopStaleCheck;
    /**
     * Handle visibility change events.
     *
     * When `preferVisibleLeader` is enabled, a visible follower tab
     * will attempt to claim leadership from a hidden leader.
     */
    private onVisibilityChange;
    /**
     * Post a message to the BroadcastChannel (no-op if channel unavailable).
     */
    private postMessage;
    /**
     * Update the role subject if the role actually changed.
     */
    private updateRole;
    /**
     * Generate a unique tab identifier.
     *
     * Uses crypto.randomUUID when available, falls back to timestamp + random.
     */
    private generateTabId;
}

/**
 * @fileoverview LockManager — Distributed locks across browser tabs.
 *
 * Provides mutual exclusion for critical operations that should only
 * run in one tab at a time (sync, auth token refresh, IndexedDB migrations).
 *
 * Uses the Web Locks API when available (Chrome 69+, Firefox 96+, Safari 15.4+),
 * falls back to a BroadcastChannel-based lock protocol.
 *
 * @module @stackra/ts-coordinator
 * @category Services
 */

/**
 * LockManager — Cross-tab distributed locks.
 *
 * @example
 * ```typescript
 * // Run a critical section — only one tab executes at a time
 * const result = await lockManager.run("sync-operation", async () => {
 *   return await performSync();
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Try to acquire with timeout
 * const result = await lockManager.run("token-refresh", async () => {
 *   return await refreshToken();
 * }, { timeoutMs: 5000 });
 * ```
 */
declare class LockManager {
    private readonly preferWebLocks;
    private readonly channelName;
    constructor(config?: CoordinatorModuleOptions);
    /**
     * Acquire a named lock and run the callback.
     *
     * Only one tab can hold a given lock at a time. Other tabs wait
     * until the lock is released.
     *
     * @param name - Lock name (should be descriptive, e.g. "sync", "token-refresh")
     * @param callback - The critical section to execute while holding the lock
     * @param options - Lock options (timeout, steal)
     * @returns The return value of the callback
     * @throws CoordinatorError if the lock cannot be acquired within the timeout
     *
     * @example
     * ```typescript
     * await lockManager.run("database-migration", async () => {
     *   await runMigrations();
     * });
     * ```
     */
    run<T>(name: string, callback: () => Promise<T> | T, options?: LockOptions): Promise<T>;
    /**
     * Check if a lock is currently held (best-effort).
     *
     * Only works with Web Locks API. Returns false if Web Locks unavailable.
     *
     * @param name - Lock name to check
     */
    isLocked(name: string): Promise<boolean>;
    /**
     * Acquire lock using the Web Locks API.
     */
    private runWithWebLocks;
    /**
     * Fallback lock using localStorage + polling.
     *
     * Not as robust as Web Locks but works in all browsers.
     * Uses a simple lock-file pattern with expiry.
     */
    private runWithFallback;
    private isWebLocksAvailable;
    private getStorageLock;
    private setStorageLock;
    private clearStorageLock;
    private sleep;
}
/**
 * Options for lock acquisition.
 */
interface LockOptions {
    /**
     * Maximum time to wait for lock acquisition, in milliseconds.
     * If the lock cannot be acquired within this time, a CoordinatorError is thrown.
     *
     * @default 30000
     */
    timeoutMs?: number;
}

/**
 * @fileoverview CoordinatorTransport — Cross-tab event relay via BroadcastChannel.
 *
 * This is an `@EventTransport` for `@stackra/ts-events`. It bridges
 * locally-emitted events to other tabs via BroadcastChannel, and
 * re-emits events received from other tabs into the local event bus.
 *
 * This is NOT a separate event system. It's just a transport layer
 * that makes `ts-events` work across tabs — exactly like how the
 * WebSocket transport bridges server events into the local bus.
 *
 * @module @stackra/ts-coordinator
 * @category Services
 */

/**
 * CoordinatorTransport — Bridges `@stackra/ts-events` across browser tabs.
 *
 * When connected, it:
 * 1. Listens for local events matching `broadcastPatterns`
 * 2. Posts them to a BroadcastChannel
 * 3. Receives events from other tabs and emits them locally
 *
 * Uses a sender ID to prevent infinite echo loops.
 *
 * @example
 * ```typescript
 * // This transport is auto-discovered by ts-events at bootstrap.
 * // No manual wiring needed — just import CoordinatorModule.
 *
 * // Events matching broadcastPatterns will automatically relay:
 * events.emit("sync:completed", { collections: ["users"] });
 * // → All other tabs receive this event via their local EventEmitter
 * ```
 */
declare class CoordinatorTransport implements IEventTransport {
    private readonly logger;
    /** BroadcastChannel for event relay. */
    private channel;
    /** Reference to the local EventEmitter. */
    private emitter;
    /** Unique ID for this tab to prevent echo. */
    private readonly senderId;
    /** Whether we're currently processing an incoming message (prevents re-broadcast). */
    private receiving;
    /** Configured event patterns to broadcast. */
    private readonly patterns;
    /** Whether broadcasting is enabled. */
    private readonly enabled;
    /** Channel name for the event relay. */
    private readonly channelName;
    constructor(config?: CoordinatorModuleOptions);
    /**
     * Connect to the event bus. Called by `EventSubscribersLoader` at bootstrap.
     *
     * Sets up:
     * - BroadcastChannel listener for incoming events from other tabs
     * - Hooks into the emitter to broadcast matching outgoing events
     */
    connect(emitter: unknown): void;
    /**
     * Disconnect the transport. Called during application shutdown.
     */
    disconnect(): void;
    /**
     * Hook into the emitter to intercept outgoing events.
     *
     * Wraps the emitter's `emit` method to broadcast matching events
     * to other tabs via BroadcastChannel.
     */
    private hookEmitter;
    /**
     * Broadcast an event to other tabs.
     */
    private broadcast;
    /**
     * Check if an event name matches any of the configured broadcast patterns.
     */
    private matchesPatterns;
    /**
     * Simple wildcard matching.
     * - `*` matches one segment (delimited by `.`)
     * - `**` matches one or more segments
     */
    private matchWildcard;
    private matchParts;
    /**
     * Attempt to serialize args for structured clone.
     * Strips non-serializable values (functions, symbols, etc.).
     */
    private serializeArgs;
    private generateId;
}

/**
 * @fileoverview @InjectCoordinator decorator.
 *
 * @module @stackra/ts-coordinator
 * @category Decorators
 */
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
declare const InjectCoordinator: () => ParameterDecorator;

/**
 * @fileoverview @InjectLockManager decorator.
 *
 * @module @stackra/ts-coordinator
 * @category Decorators
 */
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
declare const InjectLockManager: () => ParameterDecorator;

/**
 * @fileoverview useIsLeader React hook.
 *
 * @module @stackra/ts-coordinator
 * @category Hooks
 */
/**
 * React hook that returns whether the current tab is the leader.
 *
 * Reactively updates when leadership changes.
 *
 * @returns `true` if this tab is the leader, `false` otherwise
 *
 * @example
 * ```tsx
 * function SyncIndicator() {
 *   const isLeader = useIsLeader();
 *
 *   return (
 *     <span>
 *       {isLeader ? "🟢 Syncing (leader)" : "⏸️ Standby (follower)"}
 *     </span>
 *   );
 * }
 * ```
 */
declare function useIsLeader(): boolean;

/**
 * @fileoverview useTabCount React hook.
 *
 * @module @stackra/ts-coordinator
 * @category Hooks
 */
/**
 * React hook that returns the number of active tabs.
 *
 * Updates periodically as tabs join or leave.
 *
 * @param pollIntervalMs - How often to refresh the count (default: 2000ms)
 * @returns The number of active tabs
 *
 * @example
 * ```tsx
 * function TabCounter() {
 *   const tabCount = useTabCount();
 *   return <span>{tabCount} tab(s) open</span>;
 * }
 * ```
 */
declare function useTabCount(pollIntervalMs?: number): number;

/**
 * @fileoverview Coordinator inject proxy — Global coordinator access.
 *
 * @module @stackra/ts-coordinator
 */

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
declare const coordinator: TabCoordinator;

/**
 * @fileoverview Lock inject proxy — Global lock manager access.
 *
 * @module @stackra/ts-coordinator
 */

/**
 * Lock inject proxy — Static-style access to LockManager.
 *
 * Provides global access to distributed locks without manual DI resolution.
 * Must call `Application.create(AppModule)` before using.
 *
 * @example
 * ```typescript
 * import { lock } from "@stackra/ts-coordinator";
 *
 * // Run a critical section across tabs
 * await lock.run("sync-operation", async () => {
 *   await performSync();
 * });
 *
 * // With timeout
 * await lock.run("token-refresh", async () => {
 *   return await refreshToken();
 * }, { timeoutMs: 5000 });
 * ```
 *
 * @see {@link LockManager} for available methods
 */
declare const lock: LockManager;

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
declare class CoordinatorError extends Error {
    readonly code: string;
    readonly context?: Record<string, unknown>;
    constructor(message: string, code?: string, context?: Record<string, unknown>);
}

/**
 * @fileoverview Type-safe config helper for coordinator configuration.
 *
 * @module @stackra/ts-coordinator
 * @category Utilities
 */

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
declare function defineConfig(config: CoordinatorModuleOptions): CoordinatorModuleOptions;

export { CoordinatorError, CoordinatorModule, CoordinatorTransport, InjectCoordinator, InjectLockManager, LockManager, TabCoordinator, type TabInfo, type TabRole, coordinator, defineConfig, lock, useIsLeader, useTabCount };
