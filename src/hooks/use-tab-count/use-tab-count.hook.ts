/**
 * @fileoverview useTabCount React hook.
 *
 * @module @stackra/ts-coordinator
 * @category Hooks
 */

import { useState, useEffect } from "react";
import { inject } from "@stackra/ts-container";
import type { TabCoordinator } from "@/services/tab-coordinator.service";
import { TAB_COORDINATOR } from "@/constants";

/**
 * React hook that returns the number of active tabs.
 *
 * Updates periodically as tabs join or leave.
 *
 * @param pollIntervalMs - How often to refresh the count (default: 2000ms)
 * @returns The number of active tabs
 *
 * @example
 * ```tsx
 * function TabCounter() {
 *   const tabCount = useTabCount();
 *   return <span>{tabCount} tab(s) open</span>;
 * }
 * ```
 */
export function useTabCount(pollIntervalMs: number = 2000): number {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const coordinator = inject<TabCoordinator>(TAB_COORDINATOR);
    setCount(coordinator.getTabCount());

    const interval = setInterval(() => {
      setCount(coordinator.getTabCount());
    }, pollIntervalMs);

    return () => clearInterval(interval);
  }, [pollIntervalMs]);

  return count;
}
