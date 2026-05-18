/**
 * Integration Tests — CoordinatorModule.forRoot()
 *
 * Tests the DI module registration and token resolution for the
 * coordinator system.
 *
 * Covers:
 * - forRoot(): returns DynamicModule with correct module reference
 * - forRoot(): marks module as global
 * - forRoot(): registers COORDINATOR_CONFIG with config value
 * - forRoot(): registers TabCoordinator as class provider
 * - forRoot(): registers TAB_COORDINATOR as alias
 * - forRoot(): registers LockManager as class provider
 * - forRoot(): registers TAB_LOCK_MANAGER as alias
 * - forRoot(): includes CoordinatorTransport when broadcastEvents !== false
 * - forRoot(): excludes CoordinatorTransport when broadcastEvents is false
 * - forRoot(): exports all expected tokens
 *
 * @module @stackra/ts-coordinator/tests
 */
import { describe, it, expect, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────

vi.mock("@stackra/ts-container", () => ({
  Injectable: () => (target: any) => target,
  Inject: () => () => {},
  Optional: () => () => {},
  Global: () => (target: any) => target,
  Module: () => (target: any) => target,
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

// Mock BroadcastChannel for TabCoordinator/CoordinatorTransport imports
class MockBroadcastChannel {
  onmessage: ((event: any) => void) | null = null;
  postMessage = vi.fn();
  close = vi.fn();
  constructor(public name: string) {}
}

Object.defineProperty(globalThis, "BroadcastChannel", {
  value: MockBroadcastChannel,
  writable: true,
  configurable: true,
});

Object.defineProperty(globalThis, "crypto", {
  value: { randomUUID: vi.fn(() => "test-uuid") },
  writable: true,
  configurable: true,
});

import { CoordinatorModule } from "@/coordinator.module";
import { COORDINATOR_CONFIG, TAB_COORDINATOR, TAB_LOCK_MANAGER } from "@/constants";
import { TabCoordinator } from "@/services/tab-coordinator.service";
import { LockManager } from "@/services/lock-manager.service";
import { CoordinatorTransport } from "@/services/coordinator-transport.service";

describe("CoordinatorModule.forRoot()", () => {
  // ══════════════════════════════════════════════════════════════════════════
  // Module structure
  // ══════════════════════════════════════════════════════════════════════════

  describe("module structure", () => {
    it("returns a DynamicModule with the correct module class", () => {
      const result = CoordinatorModule.forRoot();

      expect(result.module).toBe(CoordinatorModule);
    });

    it("marks the module as global", () => {
      const result = CoordinatorModule.forRoot();

      expect(result.global).toBe(true);
    });

    it("has providers array", () => {
      const result = CoordinatorModule.forRoot();

      expect(result.providers).toBeDefined();
      expect(Array.isArray(result.providers)).toBe(true);
    });

    it("has exports array", () => {
      const result = CoordinatorModule.forRoot();

      expect(result.exports).toBeDefined();
      expect(Array.isArray(result.exports)).toBe(true);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Provider registration
  // ══════════════════════════════════════════════════════════════════════════

  describe("provider registration", () => {
    it("registers COORDINATOR_CONFIG with the provided config value", () => {
      const config = { channelName: "my-app", heartbeatMs: 500 };
      const result = CoordinatorModule.forRoot(config);

      const configProvider = result.providers!.find(
        (p: any) => p.provide === COORDINATOR_CONFIG,
      ) as any;

      expect(configProvider).toBeDefined();
      expect(configProvider.useValue).toEqual(config);
    });

    it("registers COORDINATOR_CONFIG with empty object when no config", () => {
      const result = CoordinatorModule.forRoot();

      const configProvider = result.providers!.find(
        (p: any) => p.provide === COORDINATOR_CONFIG,
      ) as any;

      expect(configProvider).toBeDefined();
      expect(configProvider.useValue).toEqual({});
    });

    it("registers TabCoordinator as a class provider", () => {
      const result = CoordinatorModule.forRoot();

      const provider = result.providers!.find((p: any) => p.provide === TabCoordinator) as any;

      expect(provider).toBeDefined();
      expect(provider.useClass).toBe(TabCoordinator);
    });

    it("registers TAB_COORDINATOR as an alias for TabCoordinator", () => {
      const result = CoordinatorModule.forRoot();

      const provider = result.providers!.find((p: any) => p.provide === TAB_COORDINATOR) as any;

      expect(provider).toBeDefined();
      expect(provider.useExisting).toBe(TabCoordinator);
    });

    it("registers LockManager as a class provider", () => {
      const result = CoordinatorModule.forRoot();

      const provider = result.providers!.find((p: any) => p.provide === LockManager) as any;

      expect(provider).toBeDefined();
      expect(provider.useClass).toBe(LockManager);
    });

    it("registers TAB_LOCK_MANAGER as an alias for LockManager", () => {
      const result = CoordinatorModule.forRoot();

      const provider = result.providers!.find((p: any) => p.provide === TAB_LOCK_MANAGER) as any;

      expect(provider).toBeDefined();
      expect(provider.useExisting).toBe(LockManager);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // CoordinatorTransport inclusion
  // ══════════════════════════════════════════════════════════════════════════

  describe("CoordinatorTransport inclusion", () => {
    it("includes CoordinatorTransport when broadcastEvents is not specified", () => {
      const result = CoordinatorModule.forRoot();

      const hasTransport = result.providers!.some(
        (p: any) => p === CoordinatorTransport || p.provide === CoordinatorTransport,
      );

      expect(hasTransport).toBe(true);
    });

    it("includes CoordinatorTransport when broadcastEvents is true", () => {
      const result = CoordinatorModule.forRoot({ broadcastEvents: true });

      const hasTransport = result.providers!.some(
        (p: any) => p === CoordinatorTransport || p.provide === CoordinatorTransport,
      );

      expect(hasTransport).toBe(true);
    });

    it("excludes CoordinatorTransport when broadcastEvents is false", () => {
      const result = CoordinatorModule.forRoot({ broadcastEvents: false });

      const hasTransport = result.providers!.some(
        (p: any) => p === CoordinatorTransport || p.provide === CoordinatorTransport,
      );

      expect(hasTransport).toBe(false);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Exports
  // ══════════════════════════════════════════════════════════════════════════

  describe("exports", () => {
    it("exports TabCoordinator", () => {
      const result = CoordinatorModule.forRoot();

      expect(result.exports).toContain(TabCoordinator);
    });

    it("exports TAB_COORDINATOR token", () => {
      const result = CoordinatorModule.forRoot();

      expect(result.exports).toContain(TAB_COORDINATOR);
    });

    it("exports LockManager", () => {
      const result = CoordinatorModule.forRoot();

      expect(result.exports).toContain(LockManager);
    });

    it("exports TAB_LOCK_MANAGER token", () => {
      const result = CoordinatorModule.forRoot();

      expect(result.exports).toContain(TAB_LOCK_MANAGER);
    });

    it("exports COORDINATOR_CONFIG token", () => {
      const result = CoordinatorModule.forRoot();

      expect(result.exports).toContain(COORDINATOR_CONFIG);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Config forwarding
  // ══════════════════════════════════════════════════════════════════════════

  describe("config forwarding", () => {
    it("passes full config to COORDINATOR_CONFIG provider", () => {
      const config = {
        channelName: "pos-system",
        heartbeatMs: 2000,
        staleThresholdMs: 6000,
        broadcastEvents: true,
        broadcastPatterns: ["sync:**", "auth:**"],
        preferWebLocks: true,
        preferVisibleLeader: true,
      };

      const result = CoordinatorModule.forRoot(config);

      const configProvider = result.providers!.find(
        (p: any) => p.provide === COORDINATOR_CONFIG,
      ) as any;

      expect(configProvider.useValue).toEqual(config);
    });
  });
});
