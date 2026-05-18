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

import { Injectable, Inject, Optional } from "@stackra/ts-container";
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
  | { kind: "heartbeat"; tabId: string; at: number }
  | { kind: "claim"; tabId: string; at: number }
  | { kind: "resigned"; tabId: string }
  | { kind: "announce"; tabId: string; at: number };

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
@Injectable()
export class TabCoordinator {
  private readonly logger = new Logger(TabCoordinator.name);

  /** Unique identifier for this tab instance. */
  private readonly tabId: string;

  /** BroadcastChannel or localStorage fallback for inter-tab communication. */
  private readonly channel: BroadcastChannel | LocalStorageFallback | null;

  /** Configuration with defaults applied. */
  private readonly config: Required<
    Pick<
      CoordinatorModuleOptions,
      "channelName" | "heartbeatMs" | "staleThresholdMs" | "preferVisibleLeader"
    >
  >;

  /** Current leader tab ID, or null if unknown. */
  private leaderId: string | null = null;

  /** Epoch ms of the last heartbeat received from the leader. */
  private lastHeartbeatAt: number = 0;

  /** Heartbeat timer handle (active only when this tab is leader). */
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  /** Stale-check timer handle (active only when this tab is follower). */
  private staleCheckTimer: ReturnType<typeof setInterval> | null = null;

  /** Known tabs with their last-seen timestamps. */
  private readonly knownTabs: Map<string, number> = new Map();

  /** Role subject for reactive subscriptions. */
  private readonly roleSubject: BehaviorSubject<TabRole>;

  /** Visibility change handler reference for cleanup. */
  private readonly visibilityHandler: (() => void) | null = null;

  /**
   * Observable that emits the current tab's role.
   * Only emits on actual role changes (distinctUntilChanged).
   */
  public readonly role$: Observable<TabRole>;

  constructor(@Optional() @Inject(COORDINATOR_CONFIG) config: CoordinatorModuleOptions = {}) {
    this.tabId = this.generateTabId();
    this.config = {
      channelName: config.channelName ?? "stackra-coordinator",
      heartbeatMs: config.heartbeatMs ?? 1000,
      staleThresholdMs: config.staleThresholdMs ?? 3000,
      preferVisibleLeader: config.preferVisibleLeader ?? false,
    };

    this.roleSubject = new BehaviorSubject<TabRole>("follower");
    this.role$ = this.roleSubject.asObservable().pipe(distinctUntilChanged());

    // Register self in known tabs
    this.knownTabs.set(this.tabId, Date.now());

    // Initialize BroadcastChannel (or localStorage fallback)
    if (typeof BroadcastChannel !== "undefined") {
      this.channel = new BroadcastChannel(`${this.config.channelName}:leader`);
      this.channel.onmessage = (event: MessageEvent<CoordinatorMessage>) => {
        this.onMessage(event.data);
      };

      // Start election on next tick (channel fully wired first)
      queueMicrotask(() => {
        this.announce();
        this.claimLeadership();
      });

      // Start stale-check loop
      this.startStaleCheck();
    } else if (typeof localStorage !== "undefined" && typeof window !== "undefined") {
      // Fallback: use localStorage storage events for cross-tab messaging
      this.channel = new LocalStorageFallback(`${this.config.channelName}:leader`, this.tabId);
      this.channel.onmessage = (event: { data: unknown }) => {
        this.onMessage(event.data as CoordinatorMessage);
      };

      queueMicrotask(() => {
        this.announce();
        this.claimLeadership();
      });

      this.startStaleCheck();
    } else {
      // Non-browser / SSR — always leader
      this.channel = null;
      this.becomeLeader();
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
    this.updateRole("follower");

    this.logger.info("[TabCoordinator] Resigned leadership");
  }

  /**
   * Cleanup all resources. Call on application shutdown.
   */
  destroy(): void {
    // Resign if leader
    if (this.isLeader()) {
      this.resign();
    }

    // Stop timers
    this.stopHeartbeat();
    this.stopStaleCheck();

    // Close channel
    this.channel?.close();

    // Remove visibility listener
    if (this.visibilityHandler && typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", this.visibilityHandler);
    }

    // Complete observable
    this.roleSubject.complete();
  }

  // ── Leader Election Protocol ────────────────────────────────────────────

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
    if (this.leaderId && Date.now() - this.lastHeartbeatAt < this.config.staleThresholdMs) {
      return;
    }

    this.postMessage({ kind: "claim", tabId: this.tabId, at: Date.now() });

    // Wait one heartbeat interval for competing claims
    setTimeout(() => {
      // If no one else claimed (or we have the lowest ID), become leader
      if (!this.leaderId || this.leaderId === this.tabId) {
        this.becomeLeader();
      }
    }, this.config.heartbeatMs);
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
    // Track the sender as a known tab
    if ("tabId" in msg) {
      this.knownTabs.set(msg.tabId, Date.now());
    }

    switch (msg.kind) {
      case "heartbeat":
        this.leaderId = msg.tabId;
        this.lastHeartbeatAt = msg.at;

        // If we thought we were leader but someone else is heartbeating, yield
        if (this.isLeader() && msg.tabId !== this.tabId) {
          this.stopHeartbeat();
          this.updateRole("follower");
        }
        break;

      case "claim":
        // If two tabs claim simultaneously, lowest tabId wins
        if (this.isLeader() && msg.tabId < this.tabId) {
          // Yield to the lower-ID claimant
          this.stopHeartbeat();
          this.leaderId = msg.tabId;
          this.lastHeartbeatAt = msg.at;
          this.updateRole("follower");
        } else if (!this.leaderId && msg.tabId < this.tabId) {
          // No leader yet, and they have priority
          this.leaderId = msg.tabId;
          this.lastHeartbeatAt = msg.at;
        }
        break;

      case "resigned":
        if (this.leaderId === msg.tabId) {
          this.leaderId = null;
          // Try to claim leadership
          this.claimLeadership();
        }
        break;

      case "announce":
        // A new tab joined — if we're leader, heartbeat immediately
        // so the new tab knows who the leader is
        if (this.isLeader()) {
          this.postMessage({
            kind: "heartbeat",
            tabId: this.tabId,
            at: Date.now(),
          });
        }
        break;
    }
  }

  // ── Heartbeat ───────────────────────────────────────────────────────────

  /**
   * Start the heartbeat timer (leader only).
   */
  private startHeartbeat(): void {
    this.stopHeartbeat();

    const beat = () => {
      this.postMessage({ kind: "heartbeat", tabId: this.tabId, at: Date.now() });
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
      if (this.isLeader()) return; // Leaders don't check themselves

      if (this.leaderId && Date.now() - this.lastHeartbeatAt > this.config.staleThresholdMs) {
        this.logger.info(`[TabCoordinator] Leader ${this.leaderId} is stale, claiming leadership`);
        this.leaderId = null;
        this.claimLeadership();
      }

      // Prune stale tabs from known list
      const now = Date.now();
      for (const [id, lastSeen] of this.knownTabs) {
        if (id !== this.tabId && now - lastSeen > this.config.staleThresholdMs * 3) {
          this.knownTabs.delete(id);
        }
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

  // ── Visibility ──────────────────────────────────────────────────────────

  /**
   * Handle visibility change events.
   *
   * When `preferVisibleLeader` is enabled, a visible follower tab
   * will attempt to claim leadership from a hidden leader.
   */
  private onVisibilityChange(): void {
    if (!this.config.preferVisibleLeader) return;

    if (document.visibilityState === "visible" && !this.isLeader()) {
      // We're visible and not leader — try to claim
      // Only if the current leader has been hidden for a while
      this.claimLeadership();
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
   * Generate a unique tab identifier.
   *
   * Uses crypto.randomUUID when available, falls back to timestamp + random.
   */
  private generateTabId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
