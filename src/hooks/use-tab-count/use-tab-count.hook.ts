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
 * Subscribes to the reactive `tabCount$` observable for efficient updates
 * without polling. Falls back to polling if the observable is unavailable.
 *
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
export function useTabCount(): number {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const coordinator = inject<TabCoordinator>(TAB_COORDINATOR);
    setCount(coordinator.getTabCount());

    // Subscribe to reactive tab count changes
    const subscription = coordinator.tabCount$.subscribe((newCount) => {
      setCount(newCount);
    });

    return () => subscription.unsubscribe();
  }, []);

  return count;
}
