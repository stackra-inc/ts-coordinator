/**
 * Playwright configuration for @stackra/ts-coordinator E2E tests.
 *
 * Tests multi-tab coordination behavior in a real browser environment.
 *
 * Prerequisites:
 * - The app must be running at APP_URL (default: http://localhost:5173)
 * - The app must expose coordinator test helpers on `window`:
 *   - `window.__coordinatorRole` — current tab role
 *   - `window.__coordinatorTabCount` — active tab count
 *   - `window.__coordinatorReceivedEvents` — array of received event names
 *   - `window.__emitTestEvent(name, payload)` — emit a test event
 *   - `window.__acquireLock(name, holdMs)` — acquire and hold a lock
 *   - `window.__triggerSync()` — trigger sync (returns { synced: boolean })
 *   - `window.__hasWebSocket()` — check if WS is connected
 *
 * Run:
 *   APP_URL=http://localhost:5173 npx playwright test
 *
 * @module @stackra/ts-coordinator/e2e
 */

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./__tests__/e2e",
  fullyParallel: false, // Tests must run sequentially (shared browser context)
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker — multi-tab tests need sequential execution
  reporter: "html",

  use: {
    baseURL: process.env.APP_URL ?? "http://localhost:5173",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
