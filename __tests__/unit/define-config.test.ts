/**
 * Unit Tests — defineConfig utility
 *
 * Tests the type-safe configuration helper for coordinator options.
 *
 * Covers:
 * - Returns the same config object (identity function)
 * - Provides type safety (verifies it compiles with valid options)
 *
 * @module @stackra/ts-coordinator/tests
 */
import { describe, it, expect } from "vitest";
import { defineConfig } from "@/utils/define-config.util";

describe("defineConfig", () => {
  // ══════════════════════════════════════════════════════════════════════════
  // Identity function
  // ══════════════════════════════════════════════════════════════════════════

  describe("identity function", () => {
    it("returns the same config object passed in", () => {
      const config = {
        channelName: "my-app",
        heartbeatMs: 1000,
        staleThresholdMs: 3000,
      };

      const result = defineConfig(config);

      expect(result).toBe(config);
    });

    it("returns an empty object when passed an empty object", () => {
      const config = {};

      const result = defineConfig(config);

      expect(result).toBe(config);
      expect(result).toEqual({});
    });

    it("preserves all configuration properties", () => {
      const config = {
        channelName: "pos-system",
        heartbeatMs: 500,
        staleThresholdMs: 1500,
        broadcastEvents: true,
        broadcastPatterns: ["sync:**", "auth:**"],
        preferWebLocks: true,
        preferVisibleLeader: false,
      };

      const result = defineConfig(config);

      expect(result).toEqual(config);
      expect(result.channelName).toBe("pos-system");
      expect(result.heartbeatMs).toBe(500);
      expect(result.staleThresholdMs).toBe(1500);
      expect(result.broadcastEvents).toBe(true);
      expect(result.broadcastPatterns).toEqual(["sync:**", "auth:**"]);
      expect(result.preferWebLocks).toBe(true);
      expect(result.preferVisibleLeader).toBe(false);
    });

    it("does not mutate the input config", () => {
      const config = { channelName: "test" };
      const original = { ...config };

      defineConfig(config);

      expect(config).toEqual(original);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Type safety
  // ══════════════════════════════════════════════════════════════════════════

  describe("type safety", () => {
    it("accepts valid CoordinatorModuleOptions", () => {
      // This test verifies the function compiles with valid options.
      // If the types are wrong, TypeScript will catch it at compile time.
      const result = defineConfig({
        channelName: "typed-app",
        heartbeatMs: 2000,
        broadcastPatterns: ["**"],
      });

      expect(result).toBeDefined();
    });

    it("accepts partial options (all fields are optional)", () => {
      const result = defineConfig({ channelName: "partial" });

      expect(result.channelName).toBe("partial");
      expect(result.heartbeatMs).toBeUndefined();
    });
  });
});
