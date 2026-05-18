import { Logger } from "@stackra/ts-logger";
/**
 * @fileoverview LocalStorageFallback — Fallback cross-tab messaging via storage events.
 *
 * Used when BroadcastChannel is unavailable (some WebViews, older environments).
 * Leverages the `storage` event which fires in all OTHER tabs when localStorage
 * is modified. Messages are written as JSON to a key, read by other tabs, then
 * cleaned up.
 *
 * Limitations vs BroadcastChannel:
 * - ~5ms latency (vs ~1ms for BroadcastChannel)
 * - 5-10MB total localStorage limit
 * - Synchronous writes (blocks main thread briefly)
 * - Does NOT fire in the tab that wrote the value
 *
 * @module @stackra/ts-coordinator
 * @category Services
 */

/**
 * Message envelope stored in localStorage.
 */
interface StorageMessage {
  /** Sender tab ID. */
  senderId: string;
  /** Message payload. */
  data: unknown;
  /** Timestamp for cleanup. */
  at: number;
}

/**
 * LocalStorageFallback — Cross-tab messaging via storage events.
 *
 * Drop-in replacement for BroadcastChannel when the native API is unavailable.
 * Implements the same `postMessage` / `onmessage` interface.
 *
 * @example
 * ```typescript
 * const channel = new LocalStorageFallback("my-channel", "tab-123");
 * channel.onmessage = (event) => logger.log(event.data);
 * channel.postMessage({ kind: "heartbeat", tabId: "tab-123", at: Date.now() });
 * ```
 */
export class LocalStorageFallback {
  private readonly logger = new Logger(LocalStorageFallback.name);
  private readonly storageKey: string;
  private readonly storageHandler: (event: StorageEvent) => void;
  private closed = false;

  /** Callback for incoming messages (mirrors BroadcastChannel API). */
  public onmessage: ((event: { data: unknown }) => void) | null = null;

  constructor(
    public readonly name: string,
    private readonly senderId: string,
  ) {
    this.storageKey = `__coordinator_msg__${name}`;

    // Listen for storage events from other tabs
    this.storageHandler = (event: StorageEvent) => {
      if (this.closed) return;
      if (event.key !== this.storageKey) return;
      if (!event.newValue) return;

      try {
        const message: StorageMessage = JSON.parse(event.newValue);

        // Ignore our own messages
        if (message.senderId === this.senderId) return;

        // Deliver to handler
        if (this.onmessage) {
          this.onmessage({ data: message.data });
        }
      } catch {
        // Ignore malformed messages
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", this.storageHandler);
    }
  }

  /**
   * Post a message to all other tabs via localStorage.
   *
   * Writes the message to localStorage (triggering `storage` events in
   * other tabs), then immediately removes it to avoid accumulation.
   */
  postMessage(data: unknown): void {
    if (this.closed) return;
    if (typeof localStorage === "undefined") return;

    const message: StorageMessage = {
      senderId: this.senderId,
      data,
      at: Date.now(),
    };

    try {
      // Write triggers `storage` event in other tabs
      localStorage.setItem(this.storageKey, JSON.stringify(message));

      // Clean up immediately — we only need the event, not the persisted value
      // Use setTimeout to ensure the event fires before removal
      setTimeout(() => {
        try {
          localStorage.removeItem(this.storageKey);
        } catch {
          /* ignore */
        }
      }, 50);
    } catch (error: Error | any) {
      this.logger.warn(`[LocalStorageFallback] Failed to post message: ${error?.message}`);
    }
  }

  /**
   * Close the fallback channel and stop listening.
   */
  close(): void {
    this.closed = true;
    this.onmessage = null;

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", this.storageHandler);
    }
  }
}
