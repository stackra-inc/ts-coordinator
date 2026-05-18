/**
 * Unit Tests — LockManager service
 *
 * Tests the distributed lock manager that provides mutual exclusion
 * across browser tabs using Web Locks API with localStorage fallback.
 *
 * Covers:
 * - run(): executes callback and returns result
 * - run(): with Web Locks — acquires exclusive lock
 * - run(): with fallback — uses localStorage
 * - run(): timeout throws CoordinatorError with LOCK_TIMEOUT code
 * - run(): sequential calls wait for lock release
 * - isLocked(): returns true when lock is held (Web Locks only)
 * - isLocked(): returns false when Web Locks unavailable
 * - Config: respects preferWebLocks and channelName options
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

// Mock Web Locks API — handles both (name, opts, cb) and (name, cb) signatures
const mockLocksRequest = vi.fn(async (name: string, optsOrCb: any, maybeCb?: any) => {
  const cb = maybeCb ?? optsOrCb;
  return cb();
});

const mockLocksQuery = vi.fn(async () => ({ held: [] as any[], pending: [] as any[] }));

Object.defineProperty(globalThis, "navigator", {
  value: {
    locks: {
      request: mockLocksRequest,
      query: mockLocksQuery,
    },
  },
  writable: true,
  configurable: true,
});

// Mock localStorage
const localStorageStore: Record<string, string> = {};
const mockLocalStorage = {
  getItem: vi.fn((key: string) => localStorageStore[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageStore[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageStore[key];
  }),
};

Object.defineProperty(globalThis, "localStorage", {
  value: mockLocalStorage,
  writable: true,
  configurable: true,
});

import { LockManager } from "@/services/lock-manager.service";
import { CoordinatorError } from "@/errors/coordinator.error";

describe("LockManager", () => {
  let lockManager: LockManager;

  beforeEach(() => {
    mockLocksRequest.mockClear();
    mockLocksQuery.mockClear();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();

    // Reset the default implementation
    mockLocksRequest.mockImplementation(async (_name: string, optsOrCb: any, maybeCb?: any) => {
      const cb = maybeCb ?? optsOrCb;
      return cb();
    });

    // Clear localStorage store
    Object.keys(localStorageStore).forEach((key) => delete localStorageStore[key]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ══════════════════════════════════════════════════════════════════════════
  // run() — Basic execution
  // ══════════════════════════════════════════════════════════════════════════

  describe("run() — basic execution", () => {
    it("executes the callback and returns its result", async () => {
      lockManager = new LockManager();

      const result = await lockManager.run("test-lock", async () => {
        return "hello";
      });

      expect(result).toBe("hello");
    });

    it("executes synchronous callbacks", async () => {
      lockManager = new LockManager();

      const result = await lockManager.run("test-lock", () => 42);

      expect(result).toBe(42);
    });

    it("propagates errors from the callback", async () => {
      lockManager = new LockManager();

      await expect(
        lockManager.run("test-lock", async () => {
          throw new Error("callback error");
        }),
      ).rejects.toThrow("callback error");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // run() — Web Locks
  // ══════════════════════════════════════════════════════════════════════════

  describe("run() — Web Locks", () => {
    it("acquires an exclusive lock via navigator.locks.request", async () => {
      lockManager = new LockManager({ preferWebLocks: true });

      await lockManager.run("my-lock", async () => "done");

      expect(mockLocksRequest).toHaveBeenCalledWith(
        "stackra-coordinator:lock:my-lock",
        expect.objectContaining({ mode: "exclusive" }),
        expect.any(Function),
      );
    });

    it("uses the configured channel name in lock name", async () => {
      lockManager = new LockManager({ channelName: "custom-app", preferWebLocks: true });

      await lockManager.run("sync", async () => "done");

      expect(mockLocksRequest).toHaveBeenCalledWith(
        "custom-app:lock:sync",
        expect.any(Object),
        expect.any(Function),
      );
    });

    it("passes AbortSignal when timeout is specified", async () => {
      lockManager = new LockManager({ preferWebLocks: true });

      await lockManager.run("timed-lock", async () => "done", { timeoutMs: 5000 });

      expect(mockLocksRequest).toHaveBeenCalledWith(
        "stackra-coordinator:lock:timed-lock",
        expect.objectContaining({ mode: "exclusive", signal: expect.any(AbortSignal) }),
        expect.any(Function),
      );
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // run() — Fallback (localStorage)
  // ══════════════════════════════════════════════════════════════════════════

  describe("run() — fallback (localStorage)", () => {
    it("uses localStorage when Web Locks is unavailable", async () => {
      // Remove navigator.locks
      const originalNavigator = globalThis.navigator;
      Object.defineProperty(globalThis, "navigator", {
        value: {},
        writable: true,
        configurable: true,
      });

      lockManager = new LockManager({ preferWebLocks: true });

      const result = await lockManager.run("fallback-lock", async () => "fallback-result");

      expect(result).toBe("fallback-result");
      expect(mockLocalStorage.setItem).toHaveBeenCalled();

      // Restore
      Object.defineProperty(globalThis, "navigator", {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    });

    it("uses localStorage when preferWebLocks is false", async () => {
      lockManager = new LockManager({ preferWebLocks: false });

      const result = await lockManager.run("fallback-lock", async () => "result");

      expect(result).toBe("result");
      expect(mockLocksRequest).not.toHaveBeenCalled();
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it("cleans up localStorage lock after callback completes", async () => {
      lockManager = new LockManager({ preferWebLocks: false });

      await lockManager.run("cleanup-lock", async () => "done");

      expect(mockLocalStorage.removeItem).toHaveBeenCalled();
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // run() — Timeout
  // ══════════════════════════════════════════════════════════════════════════

  describe("run() — timeout", () => {
    it("throws CoordinatorError with LOCK_TIMEOUT code on Web Locks timeout", async () => {
      // Mock request to throw AbortError (simulating timeout)
      mockLocksRequest.mockImplementationOnce(async (_name, _opts, _cb) => {
        const error = new DOMException("The operation was aborted.", "AbortError");
        throw error;
      });

      lockManager = new LockManager({ preferWebLocks: true });

      await expect(
        lockManager.run("timeout-lock", async () => "never", { timeoutMs: 100 }),
      ).rejects.toMatchObject({
        code: "LOCK_TIMEOUT",
        name: "CoordinatorError",
      });
    });

    it("throws CoordinatorError with LOCK_TIMEOUT code on fallback timeout", async () => {
      vi.useFakeTimers();

      lockManager = new LockManager({ preferWebLocks: false });

      // Simulate a lock that's already held (never expires within timeout)
      const lockKey = "__lock__stackra-coordinator:lock:held-lock";
      localStorageStore[lockKey] = JSON.stringify({ value: "other-holder", at: Date.now() });

      // Make getItem always return the held lock
      mockLocalStorage.getItem.mockImplementation((key: string) => {
        return localStorageStore[key] ?? null;
      });

      let caughtError: any = null;
      const promise = lockManager.run("held-lock", async () => "never", { timeoutMs: 500 });
      promise.catch((err) => {
        caughtError = err;
      });

      // Advance time past the timeout (need enough for polling + timeout check)
      await vi.advanceTimersByTimeAsync(700);

      // Allow the rejection to propagate
      await vi.advanceTimersByTimeAsync(200);

      expect(caughtError).not.toBeNull();
      expect(caughtError.code).toBe("LOCK_TIMEOUT");
      expect(caughtError.name).toBe("CoordinatorError");

      vi.useRealTimers();
    });

    it("includes context in the timeout error", async () => {
      mockLocksRequest.mockImplementationOnce(async () => {
        throw new DOMException("The operation was aborted.", "AbortError");
      });

      lockManager = new LockManager({ preferWebLocks: true });

      try {
        await lockManager.run("ctx-lock", async () => "never", { timeoutMs: 2000 });
        expect.fail("Should have thrown");
      } catch (error: any) {
        expect(error).toBeInstanceOf(CoordinatorError);
        expect(error.context).toMatchObject({
          lockName: "stackra-coordinator:lock:ctx-lock",
          timeoutMs: 2000,
        });
      }
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // run() — Sequential calls
  // ══════════════════════════════════════════════════════════════════════════

  describe("run() — sequential calls", () => {
    it("Web Locks: sequential calls are serialized by the browser", async () => {
      lockManager = new LockManager({ preferWebLocks: true });
      const order: number[] = [];

      // With Web Locks, the browser handles serialization
      // Our mock just calls the callback immediately
      await lockManager.run("serial", async () => {
        order.push(1);
      });
      await lockManager.run("serial", async () => {
        order.push(2);
      });

      expect(order).toEqual([1, 2]);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // isLocked()
  // ══════════════════════════════════════════════════════════════════════════

  describe("isLocked()", () => {
    it("returns true when lock is held (Web Locks)", async () => {
      lockManager = new LockManager({ preferWebLocks: true });

      mockLocksQuery.mockResolvedValueOnce({
        held: [{ name: "stackra-coordinator:lock:active-lock", mode: "exclusive" }],
        pending: [],
      });

      const result = await lockManager.isLocked("active-lock");
      expect(result).toBe(true);
    });

    it("returns false when lock is not held (Web Locks)", async () => {
      lockManager = new LockManager({ preferWebLocks: true });

      mockLocksQuery.mockResolvedValueOnce({
        held: [],
        pending: [],
      });

      const result = await lockManager.isLocked("free-lock");
      expect(result).toBe(false);
    });

    it("returns false when Web Locks is unavailable", async () => {
      const originalNavigator = globalThis.navigator;
      Object.defineProperty(globalThis, "navigator", {
        value: {},
        writable: true,
        configurable: true,
      });

      lockManager = new LockManager({ preferWebLocks: true });

      const result = await lockManager.isLocked("any-lock");
      expect(result).toBe(false);

      Object.defineProperty(globalThis, "navigator", {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // Config
  // ══════════════════════════════════════════════════════════════════════════

  describe("config", () => {
    it("respects preferWebLocks: true (uses Web Locks when available)", async () => {
      lockManager = new LockManager({ preferWebLocks: true });

      await lockManager.run("config-lock", async () => "done");

      expect(mockLocksRequest).toHaveBeenCalled();
    });

    it("respects preferWebLocks: false (uses fallback)", async () => {
      lockManager = new LockManager({ preferWebLocks: false });

      await lockManager.run("config-lock", async () => "done");

      expect(mockLocksRequest).not.toHaveBeenCalled();
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it("respects channelName option in lock naming", async () => {
      lockManager = new LockManager({ channelName: "pos-app", preferWebLocks: true });

      await lockManager.run("checkout", async () => "done");

      expect(mockLocksRequest).toHaveBeenCalledWith(
        "pos-app:lock:checkout",
        expect.any(Object),
        expect.any(Function),
      );
    });

    it("defaults channelName to 'stackra-coordinator'", async () => {
      lockManager = new LockManager();

      await lockManager.run("default-name", async () => "done");

      expect(mockLocksRequest).toHaveBeenCalledWith(
        "stackra-coordinator:lock:default-name",
        expect.any(Object),
        expect.any(Function),
      );
    });

    it("defaults preferWebLocks to true", async () => {
      lockManager = new LockManager();

      await lockManager.run("default-pref", async () => "done");

      expect(mockLocksRequest).toHaveBeenCalled();
    });
  });
});
