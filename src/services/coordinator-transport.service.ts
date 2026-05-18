/**
 * @fileoverview CoordinatorTransport — Cross-tab event relay via BroadcastChannel.
 *
 * This is an `@EventTransport` for `@stackra/ts-events`. It bridges
 * locally-emitted events to other tabs via BroadcastChannel, and
 * re-emits events received from other tabs into the local event bus.
 *
 * This is NOT a separate event system. It's just a transport layer
 * that makes `ts-events` work across tabs — exactly like how the
 * WebSocket transport bridges server events into the local bus.
 *
 * @module @stackra/ts-coordinator
 * @category Services
 */

import { Injectable, Inject, Optional } from "@stackra/ts-container";
import { EventTransport } from "@stackra/ts-events";
import { COORDINATOR_CONFIG } from "@/constants";
import type { CoordinatorModuleOptions } from "@/interfaces/coordinator-module-options.interface";
import type { IEventTransport } from "@stackra/contracts";
import { Logger } from "@stackra/ts-logger";

/**
 * Message format for cross-tab event relay.
 */
interface EventRelayMessage {
  /** The event name as emitted locally. */
  eventName: string;
  /** The arguments passed to emit(). */
  args: unknown[];
  /** Tab ID of the sender (to avoid echo). */
  senderId: string;
}

/**
 * CoordinatorTransport — Bridges `@stackra/ts-events` across browser tabs.
 *
 * When connected, it:
 * 1. Listens for local events matching `broadcastPatterns`
 * 2. Posts them to a BroadcastChannel
 * 3. Receives events from other tabs and emits them locally
 *
 * Uses a sender ID to prevent infinite echo loops.
 *
 * @example
 * ```typescript
 * // This transport is auto-discovered by ts-events at bootstrap.
 * // No manual wiring needed — just import CoordinatorModule.
 *
 * // Events matching broadcastPatterns will automatically relay:
 * events.emit("sync:completed", { collections: ["users"] });
 * // → All other tabs receive this event via their local EventEmitter
 * ```
 */
@EventTransport({ name: "coordinator" })
@Injectable()
export class CoordinatorTransport implements IEventTransport {
  private readonly logger = new Logger(CoordinatorTransport.name);

  /** BroadcastChannel for event relay. */
  private channel: BroadcastChannel | null = null;

  /** Reference to the local EventEmitter. */
  private emitter: any = null;

  /** Unique ID for this tab to prevent echo. */
  private readonly senderId: string;

  /** Whether we're currently processing an incoming message (prevents re-broadcast). */
  private receiving = false;

  /** Configured event patterns to broadcast. */
  private readonly patterns: string[];

  /** Whether broadcasting is enabled. */
  private readonly enabled: boolean;

  /** Channel name for the event relay. */
  private readonly channelName: string;

  constructor(@Optional() @Inject(COORDINATOR_CONFIG) config: CoordinatorModuleOptions = {}) {
    this.senderId = this.generateId();
    this.patterns = config.broadcastPatterns ?? ["sync:**", "auth:**", "state:**"];
    this.enabled = config.broadcastEvents ?? true;
    this.channelName = config.channelName ?? "stackra-coordinator";
  }

  /**
   * Connect to the event bus. Called by `EventSubscribersLoader` at bootstrap.
   *
   * Sets up:
   * - BroadcastChannel listener for incoming events from other tabs
   * - Hooks into the emitter to broadcast matching outgoing events
   */
  connect(emitter: unknown): void {
    if (!this.enabled) return;
    if (typeof BroadcastChannel === "undefined") return;

    this.emitter = emitter;
    this.channel = new BroadcastChannel(`${this.channelName}:events`);

    // Incoming: receive events from other tabs → emit locally
    this.channel.onmessage = (event: MessageEvent<EventRelayMessage>) => {
      const { eventName, args, senderId } = event.data;

      // Ignore our own messages
      if (senderId === this.senderId) return;

      // Emit locally without re-broadcasting
      this.receiving = true;
      try {
        (this.emitter as any).emit(eventName, ...args);
      } finally {
        this.receiving = false;
      }
    };

    // Outgoing: hook into emitter for matching patterns
    // We override emit to intercept outgoing events
    this.hookEmitter(emitter);

    this.logger.info(`[CoordinatorTransport] Connected with patterns: ${this.patterns.join(", ")}`);
  }

  /**
   * Disconnect the transport. Called during application shutdown.
   */
  disconnect(): void {
    this.channel?.close();
    this.channel = null;
    this.emitter = null;
  }

  /**
   * Hook into the emitter to intercept outgoing events.
   *
   * Wraps the emitter's `emit` method to broadcast matching events
   * to other tabs via BroadcastChannel.
   */
  private hookEmitter(emitter: unknown): void {
    const originalEmit = (emitter as any).emit.bind(emitter);

    (emitter as any).emit = (event: string | symbol, ...args: unknown[]): boolean => {
      // Call original emit first
      const result = originalEmit(event, ...args);

      // Broadcast to other tabs if not receiving and event matches patterns
      if (!this.receiving && typeof event === "string" && this.matchesPatterns(event)) {
        this.broadcast(event, args);
      }

      return result;
    };
  }

  /**
   * Broadcast an event to other tabs.
   */
  private broadcast(eventName: string, args: unknown[]): void {
    if (!this.channel) return;

    try {
      const message: EventRelayMessage = {
        eventName,
        args: this.serializeArgs(args),
        senderId: this.senderId,
      };
      this.channel.postMessage(message);
    } catch (error: Error | any) {
      // Structured clone can fail for non-serializable data
      this.logger.warn(
        `[CoordinatorTransport] Failed to broadcast "${eventName}": ${error?.message}`,
      );
    }
  }

  /**
   * Check if an event name matches any of the configured broadcast patterns.
   */
  private matchesPatterns(eventName: string): boolean {
    return this.patterns.some((pattern) => this.matchWildcard(pattern, eventName));
  }

  /**
   * Simple wildcard matching.
   * - `*` matches one segment (delimited by `.`)
   * - `**` matches one or more segments
   */
  private matchWildcard(pattern: string, event: string): boolean {
    const patternParts = pattern.split(":");
    const eventParts = event.split(":");

    return this.matchParts(patternParts, 0, eventParts, 0);
  }

  private matchParts(pattern: string[], pi: number, event: string[], ei: number): boolean {
    if (pi === pattern.length && ei === event.length) return true;
    if (pi === pattern.length) return false;

    const segment = pattern[pi];

    if (segment === "**") {
      for (let skip = 1; skip <= event.length - ei; skip++) {
        if (this.matchParts(pattern, pi + 1, event, ei + skip)) return true;
      }
      return false;
    }

    if (ei === event.length) return false;

    if (segment === "*") {
      return this.matchParts(pattern, pi + 1, event, ei + 1);
    }

    if (segment === event[ei]) {
      return this.matchParts(pattern, pi + 1, event, ei + 1);
    }

    return false;
  }

  /**
   * Attempt to serialize args for structured clone.
   * Strips non-serializable values (functions, symbols, etc.).
   */
  private serializeArgs(args: unknown[]): unknown[] {
    try {
      // Test if args are structured-clone-compatible
      return JSON.parse(JSON.stringify(args));
    } catch {
      // If serialization fails, return empty args
      return [];
    }
  }

  private generateId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
