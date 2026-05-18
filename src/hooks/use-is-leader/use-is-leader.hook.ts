/**
 * @fileoverview useIsLeader React hook.
 *
 * @module @stackra/ts-coordinator
 * @category Hooks
 */

import { useState, useEffect } from "react";
import { inject } from "@stackra/ts-container";
import type { TabCoordinator } from "@/services/tab-coordinator.service";
import { TAB_COORDINATOR } from "@/constants";

/**
 * React hook that returns whether the current tab is the leader.
 *
 * Reactively updates when leadership changes.
 *
 * @returns `true` if this tab is the leader, `false` otherwise
 *
 * @example
 * ```tsx
 * function SyncIndicator() {
 *   const isLeader = useIsLeader();
 *
 *   return (
 *     <span>
 *       {isLeader ? "🟢 Syncing (leader)" : "⏸️ Standby (follower)"}
 *     </span>
 *   );
 * }
 * ```
 */
export function useIsLeader(): boolean {
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    const coordinator = inject<TabCoordinator>(TAB_COORDINATOR);
    setIsLeader(coordinator.isLeader());

    const subscription = coordinator.role$.subscribe((role) => {
      setIsLeader(role === "leader");
    });

    return () => subscription.unsubscribe();
  }, []);

  return isLeader;
}
