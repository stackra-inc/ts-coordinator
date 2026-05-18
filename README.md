# @stackra/ts-coordinator

Cross-tab coordination primitives: leader election, distributed locks, tab
awareness, and event transport for the `@stackra` monorepo.

## What This Package Does

Provides **coordination primitives only**. It does NOT contain queue logic,
WebSocket logic, sync logic, or an event bus.

| Primitive         | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| Leader Election   | One tab is "leader", others are "followers"          |
| Distributed Locks | Mutual exclusion for critical operations across tabs |
| Tab Awareness     | Know how many tabs are open, their roles             |
| Event Transport   | Relay `@stackra/ts-events` events across tabs        |

## Why

Production apps should NOT run duplicate work in every tab:

| Problem                  | Solution                    |
| ------------------------ | --------------------------- |
| Multiple WS connections  | Leader-only WebSocket       |
| Multiple sync engines    | Leader-only sync            |
| Multiple queue workers   | Leader-only queue draining  |
| Auth token race          | Distributed lock on refresh |
| Stale state in other tab | Cross-tab event relay       |

## Install

```bash
pnpm add @stackra/ts-coordinator
```

## Quick Start

```typescript
import { Module } from "@stackra/ts-container";
import { CoordinatorModule } from "@stackra/ts-coordinator";

@Module({
  imports: [
    CoordinatorModule.forRoot({
      channelName: "my-pos-app",
      heartbeatMs: 1000,
      staleThresholdMs: 3000,
      broadcastPatterns: ["sync:**", "auth:**", "state:**"],
    }),
  ],
})
export class AppModule {}
```

### Leader Election

```typescript
import { Injectable } from "@stackra/ts-container";
import { InjectCoordinator, TabCoordinator } from "@stackra/ts-coordinator";

@Injectable()
export class SyncEngine {
  constructor(
    @InjectCoordinator() private readonly coordinator: TabCoordinator,
  ) {
    coordinator.role$.subscribe((role) => {
      if (role === "leader") this.startAutoSync();
      else this.stopAutoSync();
    });
  }

  async sync() {
    if (!this.coordinator.isLeader()) return;
    await this.performSync();
  }
}
```

### Distributed Locks

```typescript
import { Injectable } from "@stackra/ts-container";
import { InjectLockManager, LockManager } from "@stackra/ts-coordinator";

@Injectable()
export class TokenService {
  constructor(@InjectLockManager() private readonly locks: LockManager) {}

  async refresh() {
    // Only one tab refreshes the token at a time
    return this.locks.run("token-refresh", async () => {
      const token = await this.fetchNewToken();
      localStorage.setItem("token", token);
      return token;
    });
  }
}
```

### Cross-Tab Event Relay

No manual wiring needed. The `CoordinatorTransport` is auto-discovered by
`@stackra/ts-events` at bootstrap via the `@EventTransport` decorator.

Events matching `broadcastPatterns` are automatically relayed:

```typescript
import { EventEmitter } from "@stackra/ts-events";

@Injectable()
class AuthService {
  constructor(private readonly events: EventEmitter) {}

  async logout() {
    // This event is automatically relayed to all other tabs
    this.events.emit("auth:logout", { reason: "user_initiated" });
  }
}
```

In another tab, any `@OnEvent("auth:logout")` listener fires automatically.

### React Hooks

```tsx
import { useIsLeader, useTabCount } from "@stackra/ts-coordinator";

function StatusBar() {
  const isLeader = useIsLeader();
  const tabCount = useTabCount();

  return (
    <div>
      <span>{isLeader ? "🟢 Leader" : "⏸️ Follower"}</span>
      <span>{tabCount} tab(s) open</span>
    </div>
  );
}
```

### Facade (Global Access)

```typescript
import { coordinator, lock } from "@stackra/ts-coordinator";

// Check leadership
if (coordinator.isLeader()) {
  await performSync();
}

// Distributed lock
await lock.run("migration", async () => {
  await runMigrations();
});
```

## How Other Packages Use It

### `@stackra/ts-queue`

Only the leader tab drains queues:

```typescript
if (!coordinator.isLeader()) return null; // followers skip pop()
```

### `@stackra/ts-sync`

Only the leader tab performs sync:

```typescript
coordinator.role$.subscribe((role) => {
  role === "leader" ? sync.start() : sync.stop();
});
```

### `@stackra/ts-realtime`

Only the leader tab holds the WebSocket connection. Events received via WS are
emitted into `@stackra/ts-events`, and the `CoordinatorTransport` automatically
relays them to follower tabs.

## Browser APIs Used

| API                 | Purpose              | Fallback           |
| ------------------- | -------------------- | ------------------ |
| `BroadcastChannel`  | Messaging + election | Always-leader mode |
| `Web Locks API`     | Distributed locks    | localStorage locks |
| `visibilitychange`  | Focused tab tracking | Disabled           |
| `crypto.randomUUID` | Tab ID generation    | timestamp + random |

## License

MIT © Stackra L.L.C
