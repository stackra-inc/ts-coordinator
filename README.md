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

### Peer Dependencies

```bash
pnpm add @stackra/contracts @stackra/ts-container @stackra/ts-logger rxjs
# Optional:
pnpm add @stackra/ts-events react
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

### Async Configuration

```typescript
import { Module } from "@stackra/ts-container";
import { CoordinatorModule } from "@stackra/ts-coordinator";

@Module({
  imports: [
    CoordinatorModule.forRootAsync({
      useFactory: async (configService) => ({
        channelName: configService.get("COORDINATOR_CHANNEL"),
        heartbeatMs: configService.get("COORDINATOR_HEARTBEAT_MS"),
      }),
      inject: [ConfigService],
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

## Leader Election Strategy

The package uses a **dual-strategy** approach for leader election:

### Primary: Web Locks API (when available)

Uses `navigator.locks.request()` for race-free leader election. The tab that
holds the lock is the leader. When it closes or crashes, the lock is
automatically released and the next waiting tab gets it instantly.

**Advantages:**

- Zero race conditions
- Instant failover (no stale threshold delay)
- No heartbeat overhead

### Fallback: BroadcastChannel Heartbeat Protocol

For browsers without Web Locks support, falls back to a heartbeat-based
protocol with epoch-based election rounds and lowest-ID tiebreaking.

**Instant failover:** The `pagehide` event is used to immediately resign
leadership when a tab closes, so other tabs don't have to wait for the
stale threshold.

## Browser APIs Used

| API                 | Purpose              | Fallback            |
| ------------------- | -------------------- | ------------------- |
| `Web Locks API`     | Leader election      | Heartbeat protocol  |
| `BroadcastChannel`  | Messaging + census   | localStorage events |
| `Web Locks API`     | Distributed locks    | localStorage locks  |
| `visibilitychange`  | Focused tab tracking | Disabled            |
| `pagehide`          | Instant failover     | stale threshold     |
| `crypto.randomUUID` | Tab ID generation    | timestamp + random  |

## Configuration Options

| Option                   | Type       | Default                              | Description                                |
| ------------------------ | ---------- | ------------------------------------ | ------------------------------------------ |
| `channelName`            | `string`   | `"stackra-coordinator"`              | BroadcastChannel name for coordination     |
| `heartbeatMs`            | `number`   | `1000`                               | Leader heartbeat interval (ms)             |
| `staleThresholdMs`       | `number`   | `3000`                               | Time before leader is considered dead (ms) |
| `broadcastEvents`        | `boolean`  | `true`                               | Enable cross-tab event relay               |
| `broadcastPatterns`      | `string[]` | `["sync:**", "auth:**", "state:**"]` | Event patterns to relay                    |
| `preferWebLocks`         | `boolean`  | `true`                               | Use Web Locks API for distributed locks    |
| `preferWebLocksElection` | `boolean`  | `true`                               | Use Web Locks API for leader election      |
| `preferVisibleLeader`    | `boolean`  | `false`                              | Transfer leadership to visible/focused tab |

## Testing

### Unit Tests

```bash
pnpm test
```

### E2E Tests (Playwright)

```bash
# Start your app first
APP_URL=http://localhost:5173 pnpm test:e2e
```

### Test Helpers

Expose coordinator internals for Playwright assertions:

```typescript
// main.tsx (dev only)
if (import.meta.env.DEV) {
  import("@stackra/ts-coordinator/testing").then(
    ({ exposeCoordinatorTestGlobals }) => {
      exposeCoordinatorTestGlobals();
    },
  );
}
```

## License

MIT © Stackra L.L.C
