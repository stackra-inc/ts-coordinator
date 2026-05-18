/**
 * E2E Tests — Multi-Tab Coordinator Behavior
 *
 * Uses Playwright to open multiple browser tabs and verify:
 * - Only one tab becomes leader
 * - Leadership transfers when leader tab closes
 * - Follower tabs detect leader failure (stale heartbeat)
 * - Cross-tab events relay correctly
 * - Distributed locks prevent concurrent execution
 *
 * Prerequisites:
 * - A running app that imports CoordinatorModule.forRoot()
 * - Playwright installed: `pnpm add -D @playwright/test`
 *
 * Run: `npx playwright test __tests__/e2e/multi-tab-coordinator.spec.ts`
 *
 * @module @stackra/ts-coordinator/tests/e2e
 */

import { test, expect, type Page, type BrowserContext } from "@playwright/test";

/**
 * Helper: wait for a page to report its coordinator role.
 * Assumes the app exposes `window.__coordinatorRole` for testing.
 */
async function getTabRole(page: Page): Promise<"leader" | "follower"> {
  return page.evaluate(() => (window as any).__coordinatorRole ?? "follower");
}

/**
 * Helper: wait until a page becomes leader.
 */
async function waitForLeader(page: Page, timeoutMs = 5000): Promise<void> {
  await page.waitForFunction(() => (window as any).__coordinatorRole === "leader", {
    timeout: timeoutMs,
  });
}

/**
 * Helper: wait until a page becomes follower.
 */
async function waitForFollower(page: Page, timeoutMs = 5000): Promise<void> {
  await page.waitForFunction(() => (window as any).__coordinatorRole === "follower", {
    timeout: timeoutMs,
  });
}

/**
 * Helper: get the tab count reported by the coordinator.
 */
async function getTabCount(page: Page): Promise<number> {
  return page.evaluate(() => (window as any).__coordinatorTabCount ?? 1);
}

/**
 * Helper: check if a cross-tab event was received.
 */
async function getReceivedEvents(page: Page): Promise<string[]> {
  return page.evaluate(() => (window as any).__coordinatorReceivedEvents ?? []);
}

// ============================================================================
// Test Suite
// ============================================================================

test.describe("Multi-Tab Coordinator", () => {
  let context: BrowserContext;
  const APP_URL = process.env.APP_URL ?? "http://localhost:5173";

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
  });

  test.afterEach(async () => {
    await context.close();
  });

  // ════════════════════════════════════════════════════════════════════════
  // Leader Election
  // ════════════════════════════════════════════════════════════════════════

  test.describe("Leader Election", () => {
    test("first tab becomes leader", async () => {
      const page = await context.newPage();
      await page.goto(APP_URL);

      await waitForLeader(page);
      const role = await getTabRole(page);

      expect(role).toBe("leader");
    });

    test("only one tab is leader when multiple tabs are open", async () => {
      const tab1 = await context.newPage();
      const tab2 = await context.newPage();
      const tab3 = await context.newPage();

      await tab1.goto(APP_URL);
      await tab2.goto(APP_URL);
      await tab3.goto(APP_URL);

      // Wait for election to settle
      await tab1.waitForTimeout(3000);

      const roles = await Promise.all([getTabRole(tab1), getTabRole(tab2), getTabRole(tab3)]);

      const leaders = roles.filter((r) => r === "leader");
      const followers = roles.filter((r) => r === "follower");

      expect(leaders).toHaveLength(1);
      expect(followers).toHaveLength(2);
    });

    test("leadership transfers when leader tab closes", async () => {
      const tab1 = await context.newPage();
      const tab2 = await context.newPage();

      await tab1.goto(APP_URL);
      await tab2.goto(APP_URL);

      // Wait for election
      await tab1.waitForTimeout(2000);

      // Find the leader
      const role1 = await getTabRole(tab1);
      const leaderTab = role1 === "leader" ? tab1 : tab2;
      const followerTab = role1 === "leader" ? tab2 : tab1;

      // Verify follower is indeed a follower
      expect(await getTabRole(followerTab)).toBe("follower");

      // Close the leader
      await leaderTab.close();

      // Wait for failover (stale threshold + claim timeout)
      await followerTab.waitForTimeout(5000);

      // Follower should now be leader
      expect(await getTabRole(followerTab)).toBe("leader");
    });

    test("new tab detects existing leader immediately", async () => {
      const tab1 = await context.newPage();
      await tab1.goto(APP_URL);
      await waitForLeader(tab1);

      // Open second tab after leader is established
      const tab2 = await context.newPage();
      await tab2.goto(APP_URL);

      // Wait for announce/heartbeat exchange
      await tab2.waitForTimeout(2000);

      expect(await getTabRole(tab1)).toBe("leader");
      expect(await getTabRole(tab2)).toBe("follower");
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // Tab Awareness
  // ════════════════════════════════════════════════════════════════════════

  test.describe("Tab Awareness", () => {
    test("tab count increases when new tabs open", async () => {
      const tab1 = await context.newPage();
      await tab1.goto(APP_URL);
      await tab1.waitForTimeout(2000);

      expect(await getTabCount(tab1)).toBe(1);

      const tab2 = await context.newPage();
      await tab2.goto(APP_URL);
      await tab1.waitForTimeout(2000);

      expect(await getTabCount(tab1)).toBeGreaterThanOrEqual(2);
    });

    test("tab count decreases when tabs close", async () => {
      const tab1 = await context.newPage();
      const tab2 = await context.newPage();

      await tab1.goto(APP_URL);
      await tab2.goto(APP_URL);
      await tab1.waitForTimeout(2000);

      expect(await getTabCount(tab1)).toBeGreaterThanOrEqual(2);

      await tab2.close();
      // Wait for stale detection to prune the closed tab
      await tab1.waitForTimeout(5000);

      expect(await getTabCount(tab1)).toBe(1);
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // Cross-Tab Events
  // ════════════════════════════════════════════════════════════════════════

  test.describe("Cross-Tab Events", () => {
    test("events emitted in one tab are received in another", async () => {
      const tab1 = await context.newPage();
      const tab2 = await context.newPage();

      await tab1.goto(APP_URL);
      await tab2.goto(APP_URL);
      await tab1.waitForTimeout(2000);

      // Emit an event in tab1
      await tab1.evaluate(() => {
        (window as any).__emitTestEvent("sync:completed", { collections: ["users"] });
      });

      // Wait for relay
      await tab2.waitForTimeout(500);

      // Check tab2 received it
      const events = await getReceivedEvents(tab2);
      expect(events).toContain("sync:completed");
    });

    test("events do not echo back to the sender", async () => {
      const tab1 = await context.newPage();
      const tab2 = await context.newPage();

      await tab1.goto(APP_URL);
      await tab2.goto(APP_URL);
      await tab1.waitForTimeout(2000);

      // Clear events
      await tab1.evaluate(() => {
        (window as any).__coordinatorReceivedEvents = [];
      });

      // Emit in tab1
      await tab1.evaluate(() => {
        (window as any).__emitTestEvent("auth:logout", { reason: "test" });
      });

      await tab1.waitForTimeout(500);

      // Tab1 should NOT have received its own event via the relay
      const events = await getReceivedEvents(tab1);
      expect(events).not.toContain("auth:logout");
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // Distributed Locks
  // ════════════════════════════════════════════════════════════════════════

  test.describe("Distributed Locks", () => {
    test("only one tab can hold a lock at a time", async () => {
      const tab1 = await context.newPage();
      const tab2 = await context.newPage();

      await tab1.goto(APP_URL);
      await tab2.goto(APP_URL);
      await tab1.waitForTimeout(2000);

      // Both tabs try to acquire the same lock simultaneously
      const [result1, result2] = await Promise.all([
        tab1.evaluate(async () => {
          return (window as any).__acquireLock("test-lock", 2000);
        }),
        tab2.evaluate(async () => {
          return (window as any).__acquireLock("test-lock", 2000);
        }),
      ]);

      // Both should eventually succeed (one waits for the other)
      expect(result1.acquired).toBe(true);
      expect(result2.acquired).toBe(true);

      // They should NOT have overlapped (sequential execution)
      const overlap = result1.startTime < result2.endTime && result2.startTime < result1.endTime;
      // If Web Locks API is available, there should be no overlap
      // (one runs after the other releases)
      if (result1.usedWebLocks && result2.usedWebLocks) {
        expect(overlap).toBe(false);
      }
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // Leader-Only Operations
  // ════════════════════════════════════════════════════════════════════════

  test.describe("Leader-Only Operations", () => {
    test("only leader tab performs sync", async () => {
      const tab1 = await context.newPage();
      const tab2 = await context.newPage();

      await tab1.goto(APP_URL);
      await tab2.goto(APP_URL);
      await tab1.waitForTimeout(3000);

      // Trigger sync in both tabs
      const [sync1, sync2] = await Promise.all([
        tab1.evaluate(() => (window as any).__triggerSync()),
        tab2.evaluate(() => (window as any).__triggerSync()),
      ]);

      // Only the leader should have actually synced
      const leaderSynced = sync1.synced || sync2.synced;
      const followerSkipped = !sync1.synced || !sync2.synced;

      expect(leaderSynced).toBe(true);
      expect(followerSkipped).toBe(true);
    });

    test("only leader tab holds WebSocket connection", async () => {
      const tab1 = await context.newPage();
      const tab2 = await context.newPage();

      await tab1.goto(APP_URL);
      await tab2.goto(APP_URL);
      await tab1.waitForTimeout(3000);

      const [ws1, ws2] = await Promise.all([
        tab1.evaluate(() => (window as any).__hasWebSocket()),
        tab2.evaluate(() => (window as any).__hasWebSocket()),
      ]);

      // Only one tab should have an active WebSocket
      const totalConnections = (ws1 ? 1 : 0) + (ws2 ? 1 : 0);
      expect(totalConnections).toBe(1);
    });
  });
});
