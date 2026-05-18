/**
 * Unit Tests — CoordinatorError
 *
 * Tests the custom error class for coordinator-related failures.
 *
 * Covers:
 * - Constructor sets message, code, context
 * - Default code is "COORDINATOR_ERROR"
 * - Name is "CoordinatorError"
 * - instanceof Error
 *
 * @module @stackra/ts-coordinator/tests
 */
import { describe, it, expect } from "vitest";
import { CoordinatorError } from "@/errors/coordinator.error";

describe("CoordinatorError", () => {
  // ══════════════════════════════════════════════════════════════════════════
  // Constructor
  // ══════════════════════════════════════════════════════════════════════════

  describe("constructor", () => {
    it("sets the message property", () => {
      const error = new CoordinatorError("Lock acquisition failed");

      expect(error.message).toBe("Lock acquisition failed");
    });

    it("sets the code property", () => {
      const error = new CoordinatorError("Timed out", "LOCK_TIMEOUT");

      expect(error.code).toBe("LOCK_TIMEOUT");
    });

    it("sets the context property", () => {
      const context = { lockName: "sync", timeoutMs: 5000 };
      const error = new CoordinatorError("Timed out", "LOCK_TIMEOUT", context);

      expect(error.context).toEqual({ lockName: "sync", timeoutMs: 5000 });
    });

    it("context is undefined when not provided", () => {
      const error = new CoordinatorError("Something failed");

      expect(error.context).toBeUndefined();
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Default code
  // ══════════════════════════════════════════════════════════════════════════

  describe("default code", () => {
    it("defaults to 'COORDINATOR_ERROR' when no code is provided", () => {
      const error = new CoordinatorError("Generic error");

      expect(error.code).toBe("COORDINATOR_ERROR");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Name
  // ══════════════════════════════════════════════════════════════════════════

  describe("name", () => {
    it("has name set to 'CoordinatorError'", () => {
      const error = new CoordinatorError("test");

      expect(error.name).toBe("CoordinatorError");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Inheritance
  // ══════════════════════════════════════════════════════════════════════════

  describe("inheritance", () => {
    it("is an instance of Error", () => {
      const error = new CoordinatorError("test");

      expect(error).toBeInstanceOf(Error);
    });

    it("is an instance of CoordinatorError", () => {
      const error = new CoordinatorError("test");

      expect(error).toBeInstanceOf(CoordinatorError);
    });

    it("has a stack trace", () => {
      const error = new CoordinatorError("test");

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("CoordinatorError");
    });
  });
});
