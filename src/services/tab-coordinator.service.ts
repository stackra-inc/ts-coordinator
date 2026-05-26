/**
 * @fileoverview TabCoordinator — Leader election and tab awareness.
 *
 * Provides a single source of truth for which tab is the "leader" in a
 * multi-tab browser environment. Uses the Web Locks API for race-free
 * leader election when available, falling back to a BroadcastChannel
 * heartbeat-based protocol.
 *
 * Other packages (`ts-queue`, `ts-sync`, `ts-realtime`) consume this
 * service to ensure only one tab performs expensive operations (sync,
 * WebSocket connections, queue draining).
 *
 * @module @stackra/ts-coordinator
 * @category Services
 */

import {
  Injectable,
  Inject,
  Optional,
  OnModuleDestroy,
} from "@stackra/ts-container";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { COORDINATOR_CONFIG } from "@/constants";
import type { CoordinatorModuleOptions } from "@/interfaces/coordinator-module-options.interface";
import type { TabInfo, TabRole } from "@/interfaces/tab-info.interface";
import { LocalStorageFallback } from "./local-storage-fallback.service";
import { Logger } from "@stackra/ts-logger";

/**
 * Internal message types exchanged over the BroadcastChannel.
 */
type CoordinatorMessage =
  | { kind: "heartbeat"; tabId: string; at: number; epoch: number }
  | { kind: "claim"; tabId: string; at: number; epoch: number }
  | { kind: "resigned"; tabId: string }
  | { kind: "announce"; tabId: string; at: number }
  | { kind: "yield-request"; tabId: string; at: number };

/**
 * TabCoordinator — Leader election and cross-tab awareness.
 *
 * Responsibilities:
 * - Elect a single leader tab from all open tabs
 * - Detect leader failure via heartbeat timeout (or Web Locks release)
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
@Injectable()
export class TabCoordinator implements OnModuleDestroy {
  private readonly logger = new Logger(TabCoordinator.name);

  /** Unique identifier for this tab instance. */
  private readonly tabId: string;

  /** BroadcastChannel or localStorage fallback for inter-tab communication. */
  private readonly channel: BroadcastChannel | LocalStorageFallback | null;

  /** Configuration with defaults applied. */
  private readonly config: Required<
    Pick<
      CoordinatorModuleOptions,
      | "channelName"
      | "heartbeatMs"
      | "staleThresholdMs"
      | "preferVisibleLeader"
      | "preferWebLocksElection"
    >
  >;

  /** Current leader tab ID, or null if unknown. */
  private leaderId: string | null = null;

  /** Epoch ms of the last heartbeat received from the leader. */
  private lastHeartbeatAt: number = 0;

  /** Election epoch — incremented on each new election round. */
  private electionEpoch: number = 0;

  /** Heartbeat timer handle (active only when this tab is leader). */
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  /** Stale-check timer handle (active only when this tab is follower). */
  private staleCheckTimer: ReturnType<typeof setInterval> | null = null;

  /** Pending claim timeout (for cancellation). */
  private claimTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Known tabs with their last-seen timestamps. */
  private readonly knownTabs: Map<string, number> = new Map();

  /** Role subject for reactive subscriptions. */
  private readonly roleSubject: BehaviorSubject<TabRole>;

  /** Tab count subject for reactive subscriptions. */
  private readonly tabCountSubject: BehaviorSubject<number>;

  /** Visibility change handler reference for cleanup. */
  private visibilityHandler: (() => void) | null = null;

  /** Page hide handler reference for cleanup. */
  private pageHideHandler: (() => void) | null = null;

  /** Whether this instance has been destroyed. */
  private destroyed = false;

  /** AbortController for Web Locks election (to cancel on destroy). */
  private webLocksAbortController: AbortController | null = null;

  /**
   * Observable that emits the current tab's role.
   * Only emits on actual role changes (distinctUntilChanged).
   */
  public readonly role$: Observable<TabRole>;

  /**
   * Observable that emits the current active tab count.
   * Only emits on actual count changes.
   */
  public readonly tabCount$: Observable<number>;

  constructor(
    @Optional()
    @Inject(COORDINATOR_CONFIG)
    config: CoordinatorModuleOptions = {},
  ) {
    this.tabId = this.generateTabId();
    this.config = {
      channelName: config.channelName ?? "stackra-coordinator",
      heartbeatMs: config.heartbeatMs ?? 1000,
      staleThresholdMs: config.staleThresholdMs ?? 3000,
      preferVisibleLeader: config.preferVisibleLeader ?? false,
      preferWebLocksElection: config.preferWebLocksElection ?? true,
    };

    this.roleSubject = new BehaviorSubject<TabRole>("follower");
    this.role$ = this.roleSubject.asObservable().pipe(distinctUntilChanged());

    this.tabCountSubject = new BehaviorSubject<number>(1);
    this.tabCount$ = this.tabCountSubject
      .asObservable()
      .pipe(distinctUntilChanged());

    // Register self in known tabs
    this.knownTabs.set(this.tabId, Date.now());

    // Initialize BroadcastChannel (or localStorage fallback)
    if (typeof BroadcastChannel !== "undefined") {
      this.channel = new BroadcastChannel(`${this.config.channelName}:leader`);
      this.channel.onmessage = (event: MessageEvent<CoordinatorMessage>) => {
        this.onMessage(event.data);
      };
    } else if (
      typeof localStorage !== "undefined" &&
      typeof window !== "undefined"
    ) {
      this.channel = new LocalStorageFallback(
        `${this.config.channelName}:leader`,
        this.tabId,
      );
      this.channel.onmessage = (event: { data: unknown }) => {
        this.onMessage(event.data as CoordinatorMessage);
      };
    } else {
      // Non-browser / SSR — always leader
      this.channel = null;
      this.becomeLeader();
    }

    // Start election
    if (this.channel) {
      queueMicrotask(() => {
        if (this.destroyed) return;
        this.announce();

        // Prefer Web Locks for election if available
        if (this.config.preferWebLocksElection && this.isWebLocksAvailable()) {
          this.startWebLocksElection();
        } else {
          this.claimLeadership();
        }

        // Start stale-check loop (needed even with Web Locks for tab census)
        this.startStaleCheck();
      });
    }

    // Register pagehide/beforeunload for instant failover
    if (typeof window !== "undefined") {
      this.pageHideHandler = () => this.onPageHide();
      window.addEventListener("pagehide", this.pageHideHandler);
      window.addEventListener("beforeunload", this.pageHideHandler);
    }

    // Visibility tracking
    if (this.config.preferVisibleLeader && typeof document !== "undefined") {
      this.visibilityHandler = () => this.onVisibilityChange();
      document.addEventListener("visibilitychange", this.visibilityHandler);
    }
  }

  // ── Public API ──────────────────────────────────────────────────────────

  /**
   * Whether this tab is currently the leader.
   */
  isLeader(): boolean {
    return this.leaderId === this.tabId;
  }

  /**
   * Get the current tab's unique ID.
   */
  getTabId(): string {
    return this.tabId;
  }

  /**
   * Get the current leader's tab ID, or null if unknown.
   */
  getLeaderId(): string | null {
    return this.leaderId;
  }

  /**
   * Get the current role of this tab.
   */
  getRole(): TabRole {
    return this.roleSubject.value;
  }

  /**
   * Get information about all known active tabs.
   */
  getActiveTabs(): TabInfo[] {
    const now = Date.now();
    const tabs: TabInfo[] = [];

    for (const [id, lastSeen] of this.knownTabs) {
      // Only include tabs seen within the stale threshold
      if (now - lastSeen < this.config.staleThresholdMs * 2) {
        tabs.push({
          id,
          isLeader: id === this.leaderId,
          lastSeen,
          isSelf: id === this.tabId,
        });
      }
    }

    return tabs;
  }

  /**
   * Get the number of active tabs.
   */
  getTabCount(): number {
    return this.getActiveTabs().length;
  }

  /**
   * Register a callback for when this tab becomes leader.
   *
   * @returns Unsubscribe function
   */
  onLeader(callback: () => void): () => void {
    const subscription = this.role$.subscribe((role) => {
      if (role === "leader") callback();
    });
    return () => subscription.unsubscribe();
  }

  /**
   * Register a callback for when this tab loses leadership.
   *
   * @returns Unsubscribe function
   */
  onFollower(callback: () => void): () => void {
    const subscription = this.role$.subscribe((role) => {
      if (role === "follower") callback();
    });
    return () => subscription.unsubscribe();
  }

  /**
   * Voluntarily resign leadership.
   *
   * Useful when the tab is about to close or navigate away.
   */
  resign(): void {
    if (!this.isLeader()) return;

    this.postMessage({ kind: "resigned", tabId: this.tabId });
    this.leaderId = null;
    this.stopHeartbeat();
    this.cancelPendingClaim();
    this.updateRole("follower");

    this.logger.info("[TabCoordinator] Resigned leadership");
  }

  /**
   * Cleanup all resources. Call on application shutdown.
   */
  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;

    // Resign if leader
    if (this.isLeader()) {
      this.resign();
    }

    // Abort Web Locks election
    if (this.webLocksAbortController) {
      this.webLocksAbortController.abort();
      this.webLocksAbortController = null;
    }

    // Stop timers
    this.stopHeartbeat();
    this.stopStaleCheck();
    this.cancelPendingClaim();

    // Close channel
    this.channel?.close();

    // Remove event listeners
    if (this.visibilityHandler && typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", this.visibilityHandler);
    }
    if (this.pageHideHandler && typeof window !== "undefined") {
      window.removeEventListener("pagehide", this.pageHideHandler);
      window.removeEventListener("beforeunload", this.pageHideHandler);
    }

    // Complete observables
    this.roleSubject.complete();
    this.tabCountSubject.complete();
  }

  /**
   * Lifecycle hook — called by the DI container on module destroy.
   */
  onModuleDestroy(): void {
    this.destroy();
  }

  // ── Web Locks Election ──────────────────────────────────────────────────

  /**
   * Start leader election using the Web Locks API.
   *
   * The tab that holds the lock is the leader. When it closes or crashes,
   * the lock is automatically released and the next waiting tab gets it.
   * This is race-free and provides instant failover.
   */
  private startWebLocksElection(): void {
    if (!this.isWebLocksAvailable()) return;

    const lockName = `${this.config.channelName}:leader-election`;
    this.webLocksAbortController = new AbortController();

    navigator.locks
      .request(
        lockName,
        { signal: this.webLocksAbortController.signal },
        async () => {
          // We acquired the lock — we are the leader
          if (this.destroyed) return;
          this.becomeLeader();

          // Hold the lock until destroyed or resigned
          return new Promise<void>((resolve) => {
            const checkInterval = setInterval(() => {
              if (this.destroyed || !this.isLeader()) {
                clearInterval(checkInterval);
                resolve();
              }
            }, 500);
          });
        },
      )
      .catch((error: unknown) => {
        // AbortError is expected on destroy
        if (error instanceof Error && error.name === "AbortError") return;
        this.logger.warn(
          `[TabCoordinator] Web Locks election failed, falling back to heartbeat`,
        );
        // Fallback to heartbeat-based election
        this.claimLeadership();
      });
  }

  // ── Leader Election Protocol (Heartbeat Fallback) ───────────────────────

  /**
   * Announce this tab's presence to all peers.
   */
  private announce(): void {
    this.postMessage({ kind: "announce", tabId: this.tabId, at: Date.now() });
  }

  /**
   * Attempt to claim leadership.
   *
   * If no leader is known or the current leader is stale, this tab
   * broadcasts a claim. After a short delay, if no higher-priority
   * tab has claimed, this tab becomes leader.
   */
  private claimLeadership(): void {
    // If there's a fresh leader, don't claim
    if (
      this.leaderId &&
      Date.now() - this.lastHeartbeatAt < this.config.staleThresholdMs
    ) {
      return;
    }

    // Cancel any pending claim
    this.cancelPendingClaim();

    // Increment election epoch to invalidate stale claims
    this.electionEpoch++;
    const claimEpoch = this.electionEpoch;

    this.postMessage({
      kind: "claim",
      tabId: this.tabId,
      at: Date.now(),
      epoch: claimEpoch,
    });

    // Wait one heartbeat interval for competing claims
    this.claimTimeout = setTimeout(() => {
      this.claimTimeout = null;

      // Verify epoch hasn't changed (another election didn't start)
      if (claimEpoch !== this.electionEpoch) return;
      if (this.destroyed) return;

      // If no one else claimed (or we have the lowest ID), become leader
      if (!this.leaderId || this.leaderId === this.tabId) {
        this.becomeLeader();
      }
    }, this.config.heartbeatMs);
  }

  /**
   * Cancel a pending claim timeout.
   */
  private cancelPendingClaim(): void {
    if (this.claimTimeout) {
      clearTimeout(this.claimTimeout);
      this.claimTimeout = null;
    }
  }

  /**
   * Promote this tab to leader.
   */
  private becomeLeader(): void {
    const wasLeader = this.isLeader();
    this.leaderId = this.tabId;
    this.startHeartbeat();
    this.updateRole("leader");

    if (!wasLeader) {
      this.logger.info(`[TabCoordinator] Became leader (tabId: ${this.tabId})`);
    }
  }

  /**
   * Handle incoming messages from peer tabs.
   */
  private onMessage(msg: CoordinatorMessage): void {
    if (this.destroyed) return;

    // Track the sender as a known tab
    if ("tabId" in msg) {
      this.knownTabs.set(msg.tabId, Date.now());
      this.updateTabCount();
    }

    switch (msg.kind) {
      case "heartbeat":
        this.onHeartbeat(msg);
        break;

      case "claim":
        this.onClaim(msg);
        break;

      case "resigned":
        this.onResigned(msg);
        break;

      case "announce":
        this.onAnnounce(msg);
        break;

      case "yield-request":
        this.onYieldRequest(msg);
        break;
    }
  }

  private onHeartbeat(
    msg: Extract<CoordinatorMessage, { kind: "heartbeat" }>,
  ): void {
    this.leaderId = msg.tabId;
    this.lastHeartbeatAt = msg.at;

    // If we thought we were leader but someone else is heartbeating, yield
    if (this.isLeader() && msg.tabId !== this.tabId) {
      this.stopHeartbeat();
      this.cancelPendingClaim();
      this.updateRole("follower");
    }
  }

  private onClaim(msg: Extract<CoordinatorMessage, { kind: "claim" }>): void {
    // If two tabs claim simultaneously, lowest tabId wins
    if (this.isLeader() && msg.tabId < this.tabId) {
      // Yield to the lower-ID claimant
      this.stopHeartbeat();
      this.cancelPendingClaim();
      this.leaderId = msg.tabId;
      this.lastHeartbeatAt = msg.at;
      this.electionEpoch = msg.epoch;
      this.updateRole("follower");
    } else if (!this.leaderId && msg.tabId < this.tabId) {
      // No leader yet, and they have priority
      this.leaderId = msg.tabId;
      this.lastHeartbeatAt = msg.at;
      this.electionEpoch = msg.epoch;
      this.cancelPendingClaim();
    }
  }

  private onResigned(
    msg: Extract<CoordinatorMessage, { kind: "resigned" }>,
  ): void {
    if (this.leaderId === msg.tabId) {
      this.leaderId = null;
      // Try to claim leadership
      if (!this.config.preferWebLocksElection || !this.isWebLocksAvailable()) {
        this.claimLeadership();
      }
      // If using Web Locks, the next waiting tab will automatically get the lock
    }
  }

  private onAnnounce(
    _msg: Extract<CoordinatorMessage, { kind: "announce" }>,
  ): void {
    // A new tab joined — if we're leader, heartbeat immediately
    // so the new tab knows who the leader is
    if (this.isLeader()) {
      this.postMessage({
        kind: "heartbeat",
        tabId: this.tabId,
        at: Date.now(),
        epoch: this.electionEpoch,
      });
    }
  }

  private onYieldRequest(
    msg: Extract<CoordinatorMessage, { kind: "yield-request" }>,
  ): void {
    // Another tab is requesting leadership (preferVisibleLeader)
    if (!this.isLeader()) return;

    // Only yield if we're hidden and the requester is presumably visible
    if (
      typeof document !== "undefined" &&
      document.visibilityState === "hidden"
    ) {
      this.logger.info(`[TabCoordinator] Yielding to visible tab ${msg.tabId}`);
      this.resign();
    }
  }

  // ── Heartbeat ───────────────────────────────────────────────────────────

  /**
   * Start the heartbeat timer (leader only).
   */
  private startHeartbeat(): void {
    this.stopHeartbeat();

    const beat = () => {
      this.postMessage({
        kind: "heartbeat",
        tabId: this.tabId,
        at: Date.now(),
        epoch: this.electionEpoch,
      });
    };

    // Immediate first beat
    beat();
    this.heartbeatTimer = setInterval(beat, this.config.heartbeatMs);
  }

  /**
   * Stop the heartbeat timer.
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  // ── Stale Detection ─────────────────────────────────────────────────────

  /**
   * Start the stale-check loop that detects leader failure.
   */
  private startStaleCheck(): void {
    this.staleCheckTimer = setInterval(() => {
      if (this.destroyed) return;
      if (this.isLeader()) return; // Leaders don't check themselves

      if (
        this.leaderId &&
        Date.now() - this.lastHeartbeatAt > this.config.staleThresholdMs
      ) {
        this.logger.info(
          `[TabCoordinator] Leader ${this.leaderId} is stale, claiming leadership`,
        );
        this.leaderId = null;

        if (
          !this.config.preferWebLocksElection ||
          !this.isWebLocksAvailable()
        ) {
          this.claimLeadership();
        }
      }

      // Prune stale tabs from known list
      const now = Date.now();
      let pruned = false;
      for (const [id, lastSeen] of this.knownTabs) {
        if (
          id !== this.tabId &&
          now - lastSeen > this.config.staleThresholdMs * 3
        ) {
          this.knownTabs.delete(id);
          pruned = true;
        }
      }

      if (pruned) {
        this.updateTabCount();
      }
    }, this.config.heartbeatMs);
  }

  /**
   * Stop the stale-check loop.
   */
  private stopStaleCheck(): void {
    if (this.staleCheckTimer) {
      clearInterval(this.staleCheckTimer);
      this.staleCheckTimer = null;
    }
  }

  // ── Visibility & Page Lifecycle ─────────────────────────────────────────

  /**
   * Handle visibility change events.
   *
   * When `preferVisibleLeader` is enabled, a visible follower tab
   * will send a yield request to the hidden leader.
   */
  private onVisibilityChange(): void {
    if (!this.config.preferVisibleLeader) return;
    if (this.destroyed) return;

    if (document.visibilityState === "visible" && !this.isLeader()) {
      // Send a yield request to the current leader
      this.postMessage({
        kind: "yield-request",
        tabId: this.tabId,
        at: Date.now(),
      });
    }
  }

  /**
   * Handle page hide / beforeunload events.
   *
   * Immediately resigns leadership so other tabs don't have to wait
   * for the stale threshold to expire.
   */
  private onPageHide(): void {
    if (this.isLeader()) {
      this.resign();
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────────────

  /**
   * Post a message to the BroadcastChannel (no-op if channel unavailable).
   */
  private postMessage(msg: CoordinatorMessage): void {
    this.channel?.postMessage(msg);
  }

  /**
   * Update the role subject if the role actually changed.
   */
  private updateRole(role: TabRole): void {
    if (this.roleSubject.value !== role) {
      this.roleSubject.next(role);
    }
  }

  /**
   * Update the tab count subject.
   */
  private updateTabCount(): void {
    const count = this.getTabCount();
    if (this.tabCountSubject.value !== count) {
      this.tabCountSubject.next(count);
    }
  }

  /**
   * Check if the Web Locks API is available.
   */
  private isWebLocksAvailable(): boolean {
    return typeof navigator !== "undefined" && "locks" in navigator;
  }

  /**
   * Generate a unique tab identifier.
   *
   * Uses crypto.randomUUID when available, falls back to timestamp + random.
   */
  private generateTabId(): string {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
    ) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
