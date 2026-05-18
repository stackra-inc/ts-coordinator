/**
 * Unit Tests — CoordinatorTransport service
 *
 * Tests the cross-tab event relay transport that bridges locally-emitted
 * events to other tabs via BroadcastChannel.
 *
 * Covers:
 * - connect(): creates BroadcastChannel, hooks emitter
 * - disconnect(): closes channel, clears references
 * - Incoming messages: re-emits events locally (ignores own messages)
 * - Outgoing events: broadcasts matching events to channel
 * - Pattern matching: `*` matches one segment, `**` matches multiple
 * - Pattern matching: non-matching events are NOT broadcast
 * - Serialization: handles non-serializable args gracefully
 * - Config: respects broadcastPatterns, broadcastEvents, channelName
 * - Disabled: does nothing when broadcastEvents is false
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

vi.mock("@stackra/ts-events", () => ({
  EventTransport: () => (target: any) => target,
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

  simulateMessage(data: any): void {
    if (this.onmessage) {
      this.onmessage({ data } as MessageEvent);
    }
  }
}

Object.defineProperty(globalThis, "BroadcastChannel", {
  value: MockBroadcastChannel,
  writable: true,
  configurable: true,
});

// Mock crypto.randomUUID
const MOCK_SENDER_ID = "sender-uuid-1234";
Object.defineProperty(globalThis, "crypto", {
  value: { randomUUID: vi.fn(() => MOCK_SENDER_ID) },
  writable: true,
  configurable: true,
});

import { CoordinatorTransport } from "@/services/coordinator-transport.service";

describe("CoordinatorTransport", () => {
  let transport: CoordinatorTransport;
  let mockEmitter: { emit: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    MockBroadcastChannel.instances = [];
    mockEmitter = { emit: vi.fn(() => true) };
  });

  afterEach(() => {
    transport?.disconnect();
    vi.restoreAllMocks();
  });

  // ══════════════════════════════════════════════════════════════════════════
  // connect()
  // ══════════════════════════════════════════════════════════════════════════

  describe("connect()", () => {
    it("creates a BroadcastChannel with the configured name", () => {
      transport = new CoordinatorTransport({ channelName: "my-app" });
      transport.connect(mockEmitter);

      expect(MockBroadcastChannel.instances).toHaveLength(1);
      expect(MockBroadcastChannel.instances[0]!.name).toBe("my-app:events");
    });

    it("creates a BroadcastChannel with default name", () => {
      transport = new CoordinatorTransport();
      transport.connect(mockEmitter);

      expect(MockBroadcastChannel.instances[0]!.name).toBe("stackra-coordinator:events");
    });

    it("hooks into the emitter's emit method", () => {
      transport = new CoordinatorTransport();
      transport.connect(mockEmitter);

      // The emit method should be wrapped
      expect(mockEmitter.emit).not.toBe(vi.fn);
    });

    it("sets up onmessage handler on the channel", () => {
      transport = new CoordinatorTransport();
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;
      expect(channel.onmessage).toBeTypeOf("function");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // disconnect()
  // ══════════════════════════════════════════════════════════════════════════

  describe("disconnect()", () => {
    it("closes the BroadcastChannel", () => {
      transport = new CoordinatorTransport();
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;
      transport.disconnect();

      expect(channel.close).toHaveBeenCalled();
    });

    it("clears internal references", () => {
      transport = new CoordinatorTransport();
      transport.connect(mockEmitter);
      transport.disconnect();

      // Calling disconnect again should not throw
      expect(() => transport.disconnect()).not.toThrow();
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Incoming messages
  // ══════════════════════════════════════════════════════════════════════════

  describe("incoming messages", () => {
    it("re-emits events from other tabs locally", () => {
      // hookEmitter replaces emit, so we track calls via the original spy reference
      const emitSpy = vi.fn(() => true);
      const emitter = { emit: emitSpy };

      transport = new CoordinatorTransport();
      transport.connect(emitter);

      const channel = MockBroadcastChannel.instances[0]!;
      channel.simulateMessage({
        eventName: "sync:completed",
        args: [{ collections: ["users"] }],
        senderId: "other-tab-id",
      });

      expect(emitSpy).toHaveBeenCalledWith("sync:completed", {
        collections: ["users"],
      });
    });

    it("ignores messages from itself (same senderId)", () => {
      const emitSpy = vi.fn(() => true);
      const emitter = { emit: emitSpy };

      transport = new CoordinatorTransport();
      transport.connect(emitter);

      const channel = MockBroadcastChannel.instances[0]!;
      emitSpy.mockClear();

      channel.simulateMessage({
        eventName: "sync:completed",
        args: [{ data: "test" }],
        senderId: MOCK_SENDER_ID,
      });

      // Should not have been called because the message is from ourselves
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it("handles messages with multiple args", () => {
      const emitSpy = vi.fn(() => true);
      const emitter = { emit: emitSpy };

      transport = new CoordinatorTransport();
      transport.connect(emitter);

      const channel = MockBroadcastChannel.instances[0]!;
      channel.simulateMessage({
        eventName: "auth:token-refreshed",
        args: ["token123", { expiresIn: 3600 }],
        senderId: "other-tab",
      });

      expect(emitSpy).toHaveBeenCalledWith("auth:token-refreshed", "token123", {
        expiresIn: 3600,
      });
    });

    it("handles messages with no args", () => {
      const emitSpy = vi.fn(() => true);
      const emitter = { emit: emitSpy };

      transport = new CoordinatorTransport();
      transport.connect(emitter);

      const channel = MockBroadcastChannel.instances[0]!;
      channel.simulateMessage({
        eventName: "sync:started",
        args: [],
        senderId: "other-tab",
      });

      expect(emitSpy).toHaveBeenCalledWith("sync:started");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Outgoing events
  // ══════════════════════════════════════════════════════════════════════════

  describe("outgoing events", () => {
    it("broadcasts matching events to the channel", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["sync:**"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      // Trigger the wrapped emit
      mockEmitter.emit("sync:completed", { data: "test" });

      expect(channel.postMessage).toHaveBeenCalledWith({
        eventName: "sync:completed",
        args: [{ data: "test" }],
        senderId: MOCK_SENDER_ID,
      });
    });

    it("does not broadcast non-matching events", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["sync:**"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      mockEmitter.emit("ui:modal-opened", { id: "settings" });

      expect(channel.postMessage).not.toHaveBeenCalled();
    });

    it("does not re-broadcast incoming events (prevents echo)", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["sync:**"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      // Simulate incoming message (sets receiving = true internally)
      channel.simulateMessage({
        eventName: "sync:completed",
        args: [{ data: "from-other" }],
        senderId: "other-tab",
      });

      // The local emit triggered by incoming should NOT re-broadcast
      expect(channel.postMessage).not.toHaveBeenCalled();
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Pattern matching
  // ══════════════════════════════════════════════════════════════════════════

  describe("pattern matching", () => {
    it("* matches one segment", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["sync:*"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      mockEmitter.emit("sync:completed");
      expect(channel.postMessage).toHaveBeenCalled();

      channel.postMessage.mockClear();

      // Should NOT match two segments
      mockEmitter.emit("sync:data:completed");
      expect(channel.postMessage).not.toHaveBeenCalled();
    });

    it("** matches one or more segments", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["sync:**"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      mockEmitter.emit("sync:completed");
      expect(channel.postMessage).toHaveBeenCalled();

      channel.postMessage.mockClear();

      mockEmitter.emit("sync:data:users:completed");
      expect(channel.postMessage).toHaveBeenCalled();
    });

    it("exact match works", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["auth:logout"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      mockEmitter.emit("auth:logout");
      expect(channel.postMessage).toHaveBeenCalled();

      channel.postMessage.mockClear();

      mockEmitter.emit("auth:login");
      expect(channel.postMessage).not.toHaveBeenCalled();
    });

    it("multiple patterns are OR-matched", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["sync:**", "auth:**"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      mockEmitter.emit("sync:completed");
      expect(channel.postMessage).toHaveBeenCalledTimes(1);

      mockEmitter.emit("auth:token-refreshed");
      expect(channel.postMessage).toHaveBeenCalledTimes(2);

      mockEmitter.emit("ui:opened");
      expect(channel.postMessage).toHaveBeenCalledTimes(2); // No new call
    });

    it("non-matching events are NOT broadcast", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["sync:**", "auth:**", "state:**"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      mockEmitter.emit("ui:modal:opened");
      mockEmitter.emit("analytics:track");
      mockEmitter.emit("router:navigate");

      expect(channel.postMessage).not.toHaveBeenCalled();
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Serialization
  // ══════════════════════════════════════════════════════════════════════════

  describe("serialization", () => {
    it("serializes plain objects successfully", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["sync:**"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      mockEmitter.emit("sync:data", { users: [1, 2, 3], timestamp: 12345 });

      expect(channel.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          args: [{ users: [1, 2, 3], timestamp: 12345 }],
        }),
      );
    });

    it("handles non-serializable args gracefully (falls back to empty args)", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["sync:**"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      // Circular reference — not JSON-serializable
      const circular: any = {};
      circular.self = circular;

      mockEmitter.emit("sync:data", circular);

      // Should still attempt to broadcast (with empty args due to serialization failure)
      // The postMessage might throw or the args will be []
      // Based on implementation: serializeArgs returns [] on failure
      expect(channel.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          args: [],
        }),
      );
    });

    it("strips functions from serialized args", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["sync:**"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      mockEmitter.emit("sync:data", { name: "test", callback: () => {} });

      expect(channel.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          args: [{ name: "test" }], // callback stripped by JSON.parse(JSON.stringify())
        }),
      );
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Config
  // ══════════════════════════════════════════════════════════════════════════

  describe("config", () => {
    it("respects broadcastPatterns option", () => {
      transport = new CoordinatorTransport({
        broadcastPatterns: ["custom:**"],
      });
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      mockEmitter.emit("custom:event");
      expect(channel.postMessage).toHaveBeenCalled();

      channel.postMessage.mockClear();

      mockEmitter.emit("sync:event");
      expect(channel.postMessage).not.toHaveBeenCalled();
    });

    it("respects channelName option", () => {
      transport = new CoordinatorTransport({
        channelName: "pos-system",
      });
      transport.connect(mockEmitter);

      expect(MockBroadcastChannel.instances[0]!.name).toBe("pos-system:events");
    });

    it("defaults broadcastPatterns to sync:**, auth:**, state:**", () => {
      transport = new CoordinatorTransport();
      transport.connect(mockEmitter);

      const channel = MockBroadcastChannel.instances[0]!;

      mockEmitter.emit("sync:completed");
      expect(channel.postMessage).toHaveBeenCalledTimes(1);

      mockEmitter.emit("auth:refreshed");
      expect(channel.postMessage).toHaveBeenCalledTimes(2);

      mockEmitter.emit("state:updated");
      expect(channel.postMessage).toHaveBeenCalledTimes(3);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Disabled
  // ══════════════════════════════════════════════════════════════════════════

  describe("disabled (broadcastEvents: false)", () => {
    it("does not create a BroadcastChannel when disabled", () => {
      transport = new CoordinatorTransport({ broadcastEvents: false });
      transport.connect(mockEmitter);

      expect(MockBroadcastChannel.instances).toHaveLength(0);
    });

    it("does not modify the emitter when disabled", () => {
      const originalEmit = mockEmitter.emit;
      transport = new CoordinatorTransport({ broadcastEvents: false });
      transport.connect(mockEmitter);

      expect(mockEmitter.emit).toBe(originalEmit);
    });

    it("disconnect is safe when disabled", () => {
      transport = new CoordinatorTransport({ broadcastEvents: false });
      transport.connect(mockEmitter);

      expect(() => transport.disconnect()).not.toThrow();
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // No BroadcastChannel (SSR)
  // ══════════════════════════════════════════════════════════════════════════

  describe("no BroadcastChannel available (SSR)", () => {
    it("does not throw when BroadcastChannel is undefined", () => {
      const original = globalThis.BroadcastChannel;
      Object.defineProperty(globalThis, "BroadcastChannel", {
        value: undefined,
        writable: true,
        configurable: true,
      });

      transport = new CoordinatorTransport();

      expect(() => transport.connect(mockEmitter)).not.toThrow();

      Object.defineProperty(globalThis, "BroadcastChannel", {
        value: original,
        writable: true,
        configurable: true,
      });
    });
  });
});
