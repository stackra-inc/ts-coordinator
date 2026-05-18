/**
 * Unit Tests — TabCoordinator service
 *
 * Tests the leader election and tab awareness service that coordinates
 * multiple browser tabs via BroadcastChannel.
 *
 * Covers:
 * - Constructor: generates tabId, creates BroadcastChannel, starts as follower
 * - isLeader(): returns false initially, true after becoming leader
 * - getTabId(): returns the generated ID
 * - getRole(): returns current role
 * - getActiveTabs(): returns known tabs, filters stale ones
 * - getTabCount(): returns count of active tabs
 * - resign(): posts resigned message, stops heartbeat, becomes follower
 * - destroy(): cleans up timers, closes channel, completes subject
 * - Leader election: claims leadership when no leader exists
 * - Heartbeat: leader sends periodic heartbeats
 * - Stale detection: claims leadership when leader goes stale
 * - Message handling: heartbeat, claim, resigned, announce
 * - onLeader() / onFollower(): callback subscriptions
 * - SSR mode: becomes leader immediately when BroadcastChannel unavailable
 *
 * @module @stackra/ts-coordinator/tests
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────

vi.mock("@stackra/ts-container", () => ({
  Injectable: () => (target: any) => target,
  Inject: () => () => {},
  Optional: () => () => {},
}));

vi.mock("@stackra/ts-logger", () => ({
  Logger: class {
    info = vi.fn();
    warn = vi.fn();
    error = vi.fn();
    debug = vi.fn();
  },
}));

class MockBroadcastChannel {
  onmessage: ((event: any) => void) | null = null;
  postMessage = vi.fn();
  close = vi.fn();
  static instances: MockBroadcastChannel[] = [];

  constructor(public name: string) {
    MockBroadcastChannel.instances.push(this);
  }

  /** Simulate receiving a message from another tab. */
  simulateMessage(data: any): void {
    if (this.onmessage) {
      this.onmessage({ data } as MessageEvent);
    }
  }
}

// Set up global BroadcastChannel mock
Object.defineProperty(globalThis, "BroadcastChannel", {
  value: MockBroadcastChannel,
  writable: true,
  configurable: true,
});

// Mock crypto.randomUUID
const MOCK_TAB_ID = "mock-uuid-1234-5678-abcd";
Object.defineProperty(globalThis, "crypto", {
  value: { randomUUID: vi.fn(() => MOCK_TAB_ID) },
  writable: true,
  configurable: true,
});

import { TabCoordinator } from "@/services/tab-coordinator.service";

describe("TabCoordinator", () => {
  let coordinator: TabCoordinator;

  beforeEach(() => {
    vi.useFakeTimers();
    MockBroadcastChannel.instances = [];
  });

  afterEach(() => {
    coordinator?.destroy();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Constructor
  // ══════════════════════════════════════════════════════════════════════════

  describe("constructor", () => {
    it("generates a unique tabId using crypto.randomUUID", () => {
      coordinator = new TabCoordinator();

      expect(coordinator.getTabId()).toBe(MOCK_TAB_ID);
    });

    it("creates a BroadcastChannel with the configured name", () => {
      coordinator = new TabCoordinator();

      expect(MockBroadcastChannel.instances).toHaveLength(1);
      expect(MockBroadcastChannel.instances[0]!.name).toBe("stackra-coordinator:leader");
    });

    it("creates a BroadcastChannel with custom channel name", () => {
      coordinator = new TabCoordinator({ channelName: "my-app" });

      expect(MockBroadcastChannel.instances[0]!.name).toBe("my-app:leader");
    });

    it("starts as a follower", () => {
      coordinator = new TabCoordinator();

      expect(coordinator.getRole()).toBe("follower");
      expect(coordinator.isLeader()).toBe(false);
    });

    it("registers itself in known tabs", () => {
      coordinator = new TabCoordinator();

      const tabs = coordinator.getActiveTabs();
      expect(tabs.some((t) => t.id === MOCK_TAB_ID && t.isSelf)).toBe(true);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // isLeader()
  // ══════════════════════════════════════════════════════════════════════════

  describe("isLeader()", () => {
    it("returns false initially", () => {
      coordinator = new TabCoordinator();

      expect(coordinator.isLeader()).toBe(false);
    });

    it("returns true after becoming leader", async () => {
      coordinator = new TabCoordinator();

      // Flush microtask (announce + claimLeadership)
      await vi.advanceTimersByTimeAsync(0);
      // Wait for the claim timeout (heartbeatMs = 1000)
      await vi.advanceTimersByTimeAsync(1000);

      expect(coordinator.isLeader()).toBe(true);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // getTabId()
  // ══════════════════════════════════════════════════════════════════════════

  describe("getTabId()", () => {
    it("returns the generated tab ID", () => {
      coordinator = new TabCoordinator();

      expect(coordinator.getTabId()).toBe(MOCK_TAB_ID);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // getRole()
  // ══════════════════════════════════════════════════════════════════════════

  describe("getRole()", () => {
    it("returns 'follower' initially", () => {
      coordinator = new TabCoordinator();

      expect(coordinator.getRole()).toBe("follower");
    });

    it("returns 'leader' after election", async () => {
      coordinator = new TabCoordinator();

      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);

      expect(coordinator.getRole()).toBe("leader");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // getActiveTabs()
  // ══════════════════════════════════════════════════════════════════════════

  describe("getActiveTabs()", () => {
    it("returns the current tab as an active tab", () => {
      coordinator = new TabCoordinator();

      const tabs = coordinator.getActiveTabs();
      expect(tabs).toHaveLength(1);
      expect(tabs[0]!.id).toBe(MOCK_TAB_ID);
      expect(tabs[0]!.isSelf).toBe(true);
    });

    it("includes tabs that have announced themselves", async () => {
      coordinator = new TabCoordinator();
      const channel = MockBroadcastChannel.instances[0]!;

      // Simulate another tab announcing
      channel.simulateMessage({
        kind: "announce",
        tabId: "other-tab-id",
        at: Date.now(),
      });

      const tabs = coordinator.getActiveTabs();
      expect(tabs).toHaveLength(2);
      expect(tabs.some((t) => t.id === "other-tab-id")).toBe(true);
    });

    it("filters out stale tabs beyond threshold", async () => {
      coordinator = new TabCoordinator({ staleThresholdMs: 3000 });
      const channel = MockBroadcastChannel.instances[0]!;

      // Simulate another tab announcing
      channel.simulateMessage({
        kind: "announce",
        tabId: "stale-tab",
        at: Date.now(),
      });

      // Advance time beyond 2x stale threshold
      await vi.advanceTimersByTimeAsync(7000);

      const tabs = coordinator.getActiveTabs();
      // The stale tab should be filtered out (lastSeen > staleThresholdMs * 2)
      expect(tabs.some((t) => t.id === "stale-tab")).toBe(false);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // getTabCount()
  // ══════════════════════════════════════════════════════════════════════════

  describe("getTabCount()", () => {
    it("returns 1 for a single tab", () => {
      coordinator = new TabCoordinator();

      expect(coordinator.getTabCount()).toBe(1);
    });

    it("returns correct count with multiple tabs", () => {
      coordinator = new TabCoordinator();
      const channel = MockBroadcastChannel.instances[0]!;

      channel.simulateMessage({ kind: "announce", tabId: "tab-2", at: Date.now() });
      channel.simulateMessage({ kind: "announce", tabId: "tab-3", at: Date.now() });

      expect(coordinator.getTabCount()).toBe(3);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // resign()
  // ══════════════════════════════════════════════════════════════════════════

  describe("resign()", () => {
    it("posts a resigned message to the channel", async () => {
      coordinator = new TabCoordinator();

      // Become leader first
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);
      expect(coordinator.isLeader()).toBe(true);

      const channel = MockBroadcastChannel.instances[0]!;
      channel.postMessage.mockClear();

      coordinator.resign();

      expect(channel.postMessage).toHaveBeenCalledWith({
        kind: "resigned",
        tabId: MOCK_TAB_ID,
      });
    });

    it("becomes follower after resigning", async () => {
      coordinator = new TabCoordinator();

      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);
      expect(coordinator.isLeader()).toBe(true);

      coordinator.resign();

      expect(coordinator.isLeader()).toBe(false);
      expect(coordinator.getRole()).toBe("follower");
    });

    it("is a no-op when not leader", () => {
      coordinator = new TabCoordinator();
      const channel = MockBroadcastChannel.instances[0]!;
      channel.postMessage.mockClear();

      coordinator.resign();

      // Should not post any message (only announce/claim from constructor)
      expect(channel.postMessage).not.toHaveBeenCalledWith(
        expect.objectContaining({ kind: "resigned" }),
      );
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // destroy()
  // ══════════════════════════════════════════════════════════════════════════

  describe("destroy()", () => {
    it("closes the BroadcastChannel", () => {
      coordinator = new TabCoordinator();
      const channel = MockBroadcastChannel.instances[0]!;

      coordinator.destroy();

      expect(channel.close).toHaveBeenCalled();
    });

    it("completes the role$ observable", () => {
      coordinator = new TabCoordinator();
      const completeSpy = vi.fn();

      coordinator.role$.subscribe({ complete: completeSpy });
      coordinator.destroy();

      expect(completeSpy).toHaveBeenCalled();
    });

    it("resigns leadership if currently leader", async () => {
      coordinator = new TabCoordinator();

      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);
      expect(coordinator.isLeader()).toBe(true);

      const channel = MockBroadcastChannel.instances[0]!;
      channel.postMessage.mockClear();

      coordinator.destroy();

      expect(channel.postMessage).toHaveBeenCalledWith({
        kind: "resigned",
        tabId: MOCK_TAB_ID,
      });
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Leader Election
  // ══════════════════════════════════════════════════════════════════════════

  describe("leader election", () => {
    it("claims leadership when no leader exists", async () => {
      coordinator = new TabCoordinator();

      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);

      expect(coordinator.isLeader()).toBe(true);
      expect(coordinator.getRole()).toBe("leader");
    });

    it("posts a claim message during election", async () => {
      coordinator = new TabCoordinator();
      const channel = MockBroadcastChannel.instances[0]!;

      await vi.advanceTimersByTimeAsync(0);

      expect(channel.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ kind: "claim", tabId: MOCK_TAB_ID }),
      );
    });

    it("does not claim when a fresh leader heartbeat exists", async () => {
      coordinator = new TabCoordinator();
      const channel = MockBroadcastChannel.instances[0]!;

      // Simulate receiving a heartbeat from another leader before claim resolves
      channel.simulateMessage({
        kind: "heartbeat",
        tabId: "existing-leader",
        at: Date.now(),
      });

      // The coordinator should recognize the existing leader
      expect(coordinator.getLeaderId()).toBe("existing-leader");
    });

    it("yields to a lower-ID claimant", async () => {
      coordinator = new TabCoordinator();

      // Become leader
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);
      expect(coordinator.isLeader()).toBe(true);

      const channel = MockBroadcastChannel.instances[0]!;

      // Another tab with a lower ID claims
      channel.simulateMessage({
        kind: "claim",
        tabId: "aaa-lower-id",
        at: Date.now(),
      });

      expect(coordinator.isLeader()).toBe(false);
      expect(coordinator.getLeaderId()).toBe("aaa-lower-id");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Heartbeat
  // ══════════════════════════════════════════════════════════════════════════

  describe("heartbeat", () => {
    it("leader sends periodic heartbeats", async () => {
      coordinator = new TabCoordinator({ heartbeatMs: 500 });

      // Become leader
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(500);

      const channel = MockBroadcastChannel.instances[0]!;
      channel.postMessage.mockClear();

      // Advance one heartbeat interval
      await vi.advanceTimersByTimeAsync(500);

      expect(channel.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ kind: "heartbeat", tabId: MOCK_TAB_ID }),
      );
    });

    it("sends immediate heartbeat when becoming leader", async () => {
      coordinator = new TabCoordinator();
      const channel = MockBroadcastChannel.instances[0]!;

      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);

      expect(channel.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ kind: "heartbeat", tabId: MOCK_TAB_ID }),
      );
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Stale Detection
  // ══════════════════════════════════════════════════════════════════════════

  describe("stale detection", () => {
    it("claims leadership when leader goes stale", async () => {
      coordinator = new TabCoordinator({ heartbeatMs: 1000, staleThresholdMs: 3000 });
      const channel = MockBroadcastChannel.instances[0]!;

      // Simulate an existing leader heartbeat
      channel.simulateMessage({
        kind: "heartbeat",
        tabId: "old-leader",
        at: Date.now(),
      });

      expect(coordinator.getLeaderId()).toBe("old-leader");

      // Advance past stale threshold without new heartbeats
      await vi.advanceTimersByTimeAsync(4000);

      // The coordinator should have claimed leadership
      expect(channel.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ kind: "claim", tabId: MOCK_TAB_ID }),
      );
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Message Handling
  // ══════════════════════════════════════════════════════════════════════════

  describe("message handling", () => {
    it("handles heartbeat messages — updates leader ID", () => {
      coordinator = new TabCoordinator();
      const channel = MockBroadcastChannel.instances[0]!;

      channel.simulateMessage({
        kind: "heartbeat",
        tabId: "leader-tab",
        at: Date.now(),
      });

      expect(coordinator.getLeaderId()).toBe("leader-tab");
    });

    it("handles claim messages — tracks the sender as known tab", () => {
      coordinator = new TabCoordinator();
      const channel = MockBroadcastChannel.instances[0]!;

      channel.simulateMessage({
        kind: "claim",
        tabId: "claiming-tab",
        at: Date.now(),
      });

      const tabs = coordinator.getActiveTabs();
      expect(tabs.some((t) => t.id === "claiming-tab")).toBe(true);
    });

    it("handles resigned messages — triggers new election", async () => {
      coordinator = new TabCoordinator();
      const channel = MockBroadcastChannel.instances[0]!;

      // Set up an existing leader
      channel.simulateMessage({
        kind: "heartbeat",
        tabId: "resigning-leader",
        at: Date.now(),
      });

      expect(coordinator.getLeaderId()).toBe("resigning-leader");

      // Leader resigns
      channel.postMessage.mockClear();
      channel.simulateMessage({
        kind: "resigned",
        tabId: "resigning-leader",
      });

      // Should trigger a new claim
      expect(channel.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ kind: "claim", tabId: MOCK_TAB_ID }),
      );
    });

    it("handles announce messages — leader responds with heartbeat", async () => {
      coordinator = new TabCoordinator();

      // Become leader
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);
      expect(coordinator.isLeader()).toBe(true);

      const channel = MockBroadcastChannel.instances[0]!;
      channel.postMessage.mockClear();

      // New tab announces
      channel.simulateMessage({
        kind: "announce",
        tabId: "new-tab",
        at: Date.now(),
      });

      expect(channel.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ kind: "heartbeat", tabId: MOCK_TAB_ID }),
      );
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // onLeader() / onFollower()
  // ══════════════════════════════════════════════════════════════════════════

  describe("onLeader() / onFollower()", () => {
    it("onLeader() fires when tab becomes leader", async () => {
      coordinator = new TabCoordinator();
      const callback = vi.fn();

      coordinator.onLeader(callback);

      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);

      expect(callback).toHaveBeenCalled();
    });

    it("onFollower() fires initially (starts as follower)", () => {
      coordinator = new TabCoordinator();
      const callback = vi.fn();

      coordinator.onFollower(callback);

      // BehaviorSubject emits current value on subscribe
      expect(callback).toHaveBeenCalled();
    });

    it("onFollower() fires when leader resigns", async () => {
      coordinator = new TabCoordinator();
      const callback = vi.fn();

      // Become leader
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);

      callback.mockClear();
      coordinator.onFollower(callback);

      coordinator.resign();

      expect(callback).toHaveBeenCalled();
    });

    it("onLeader() returns an unsubscribe function", async () => {
      coordinator = new TabCoordinator();
      const callback = vi.fn();

      const unsubscribe = coordinator.onLeader(callback);
      unsubscribe();

      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(1000);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // SSR Mode
  // ══════════════════════════════════════════════════════════════════════════

  describe("SSR mode (no BroadcastChannel)", () => {
    it("becomes leader immediately when BroadcastChannel is unavailable", () => {
      // Temporarily remove BroadcastChannel
      const original = globalThis.BroadcastChannel;
      Object.defineProperty(globalThis, "BroadcastChannel", {
        value: undefined,
        writable: true,
        configurable: true,
      });

      coordinator = new TabCoordinator();

      expect(coordinator.isLeader()).toBe(true);
      expect(coordinator.getRole()).toBe("leader");

      // Restore
      Object.defineProperty(globalThis, "BroadcastChannel", {
        value: original,
        writable: true,
        configurable: true,
      });
    });
  });
});
