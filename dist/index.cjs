'use strict';

var tsContainer = require('@stackra/ts-container');
var contracts = require('@stackra/contracts');
var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var tsLogger = require('@stackra/ts-logger');
var tsEvents = require('@stackra/ts-events');
var react = require('react');

/**
 * @stackra/ts-coordinator v0.1.0
 * (c) 2026 [object Object]
 * @license MIT
 */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var LocalStorageFallback = class _LocalStorageFallback {
  static {
    __name(this, "LocalStorageFallback");
  }
  name;
  senderId;
  logger = new tsLogger.Logger(_LocalStorageFallback.name);
  storageKey;
  storageHandler;
  closed = false;
  /** Callback for incoming messages (mirrors BroadcastChannel API). */
  onmessage = null;
  constructor(name, senderId) {
    this.name = name;
    this.senderId = senderId;
    this.storageKey = `__coordinator_msg__${name}`;
    this.storageHandler = (event) => {
      if (this.closed) return;
      if (event.key !== this.storageKey) return;
      if (!event.newValue) return;
      try {
        const message = JSON.parse(event.newValue);
        if (message.senderId === this.senderId) return;
        if (this.onmessage) {
          this.onmessage({
            data: message.data
          });
        }
      } catch {
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
  postMessage(data) {
    if (this.closed) return;
    if (typeof localStorage === "undefined") return;
    const message = {
      senderId: this.senderId,
      data,
      at: Date.now()
    };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(message));
      setTimeout(() => {
        try {
          localStorage.removeItem(this.storageKey);
        } catch {
        }
      }, 50);
    } catch (error) {
      this.logger.warn(`[LocalStorageFallback] Failed to post message: ${error?.message}`);
    }
  }
  /**
  * Close the fallback channel and stop listening.
  */
  close() {
    this.closed = true;
    this.onmessage = null;
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", this.storageHandler);
    }
  }
};
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
function _ts_param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param, "_ts_param");
exports.TabCoordinator = class _TabCoordinator {
  static {
    __name(this, "TabCoordinator");
  }
  logger = new tsLogger.Logger(_TabCoordinator.name);
  /** Unique identifier for this tab instance. */
  tabId;
  /** BroadcastChannel or localStorage fallback for inter-tab communication. */
  channel;
  /** Configuration with defaults applied. */
  config;
  /** Current leader tab ID, or null if unknown. */
  leaderId = null;
  /** Epoch ms of the last heartbeat received from the leader. */
  lastHeartbeatAt = 0;
  /** Heartbeat timer handle (active only when this tab is leader). */
  heartbeatTimer = null;
  /** Stale-check timer handle (active only when this tab is follower). */
  staleCheckTimer = null;
  /** Known tabs with their last-seen timestamps. */
  knownTabs = /* @__PURE__ */ new Map();
  /** Role subject for reactive subscriptions. */
  roleSubject;
  /** Visibility change handler reference for cleanup. */
  visibilityHandler = null;
  /**
  * Observable that emits the current tab's role.
  * Only emits on actual role changes (distinctUntilChanged).
  */
  role$;
  constructor(config = {}) {
    this.tabId = this.generateTabId();
    this.config = {
      channelName: config.channelName ?? "stackra-coordinator",
      heartbeatMs: config.heartbeatMs ?? 1e3,
      staleThresholdMs: config.staleThresholdMs ?? 3e3,
      preferVisibleLeader: config.preferVisibleLeader ?? false
    };
    this.roleSubject = new rxjs.BehaviorSubject("follower");
    this.role$ = this.roleSubject.asObservable().pipe(operators.distinctUntilChanged());
    this.knownTabs.set(this.tabId, Date.now());
    if (typeof BroadcastChannel !== "undefined") {
      this.channel = new BroadcastChannel(`${this.config.channelName}:leader`);
      this.channel.onmessage = (event) => {
        this.onMessage(event.data);
      };
      queueMicrotask(() => {
        this.announce();
        this.claimLeadership();
      });
      this.startStaleCheck();
    } else if (typeof localStorage !== "undefined" && typeof window !== "undefined") {
      this.channel = new LocalStorageFallback(`${this.config.channelName}:leader`, this.tabId);
      this.channel.onmessage = (event) => {
        this.onMessage(event.data);
      };
      queueMicrotask(() => {
        this.announce();
        this.claimLeadership();
      });
      this.startStaleCheck();
    } else {
      this.channel = null;
      this.becomeLeader();
    }
    if (this.config.preferVisibleLeader && typeof document !== "undefined") {
      this.visibilityHandler = () => this.onVisibilityChange();
      document.addEventListener("visibilitychange", this.visibilityHandler);
    }
  }
  // ── Public API ──────────────────────────────────────────────────────────
  /**
  * Whether this tab is currently the leader.
  */
  isLeader() {
    return this.leaderId === this.tabId;
  }
  /**
  * Get the current tab's unique ID.
  */
  getTabId() {
    return this.tabId;
  }
  /**
  * Get the current leader's tab ID, or null if unknown.
  */
  getLeaderId() {
    return this.leaderId;
  }
  /**
  * Get the current role of this tab.
  */
  getRole() {
    return this.roleSubject.value;
  }
  /**
  * Get information about all known active tabs.
  */
  getActiveTabs() {
    const now = Date.now();
    const tabs = [];
    for (const [id, lastSeen] of this.knownTabs) {
      if (now - lastSeen < this.config.staleThresholdMs * 2) {
        tabs.push({
          id,
          isLeader: id === this.leaderId,
          lastSeen,
          isSelf: id === this.tabId
        });
      }
    }
    return tabs;
  }
  /**
  * Get the number of active tabs.
  */
  getTabCount() {
    return this.getActiveTabs().length;
  }
  /**
  * Register a callback for when this tab becomes leader.
  *
  * @returns Unsubscribe function
  */
  onLeader(callback) {
    const subscription = this.role$.subscribe((role) => {
      if (role === "leader") callback();
    });
    return () => subscription.unsubscribe();
  }
  /**
  * Register a callback for when this tab loses leadership.
  *
  * @returns Unsubscribe function
  */
  onFollower(callback) {
    const subscription = this.role$.subscribe((role) => {
      if (role === "follower") callback();
    });
    return () => subscription.unsubscribe();
  }
  /**
  * Voluntarily resign leadership.
  *
  * Useful when the tab is about to close or navigate away.
  */
  resign() {
    if (!this.isLeader()) return;
    this.postMessage({
      kind: "resigned",
      tabId: this.tabId
    });
    this.leaderId = null;
    this.stopHeartbeat();
    this.updateRole("follower");
    this.logger.info("[TabCoordinator] Resigned leadership");
  }
  /**
  * Cleanup all resources. Call on application shutdown.
  */
  destroy() {
    if (this.isLeader()) {
      this.resign();
    }
    this.stopHeartbeat();
    this.stopStaleCheck();
    this.channel?.close();
    if (this.visibilityHandler && typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", this.visibilityHandler);
    }
    this.roleSubject.complete();
  }
  // ── Leader Election Protocol ────────────────────────────────────────────
  /**
  * Announce this tab's presence to all peers.
  */
  announce() {
    this.postMessage({
      kind: "announce",
      tabId: this.tabId,
      at: Date.now()
    });
  }
  /**
  * Attempt to claim leadership.
  *
  * If no leader is known or the current leader is stale, this tab
  * broadcasts a claim. After a short delay, if no higher-priority
  * tab has claimed, this tab becomes leader.
  */
  claimLeadership() {
    if (this.leaderId && Date.now() - this.lastHeartbeatAt < this.config.staleThresholdMs) {
      return;
    }
    this.postMessage({
      kind: "claim",
      tabId: this.tabId,
      at: Date.now()
    });
    setTimeout(() => {
      if (!this.leaderId || this.leaderId === this.tabId) {
        this.becomeLeader();
      }
    }, this.config.heartbeatMs);
  }
  /**
  * Promote this tab to leader.
  */
  becomeLeader() {
    const wasLeader = this.isLeader();
    this.leaderId = this.tabId;
    this.startHeartbeat();
    this.updateRole("leader");
    if (!wasLeader) {
      this.logger.info(`[TabCoordinator] Became leader (tabId: ${this.tabId})`);
    }
  }
  /**
  * Handle incoming messages from peer tabs.
  */
  onMessage(msg) {
    if ("tabId" in msg) {
      this.knownTabs.set(msg.tabId, Date.now());
    }
    switch (msg.kind) {
      case "heartbeat":
        this.leaderId = msg.tabId;
        this.lastHeartbeatAt = msg.at;
        if (this.isLeader() && msg.tabId !== this.tabId) {
          this.stopHeartbeat();
          this.updateRole("follower");
        }
        break;
      case "claim":
        if (this.isLeader() && msg.tabId < this.tabId) {
          this.stopHeartbeat();
          this.leaderId = msg.tabId;
          this.lastHeartbeatAt = msg.at;
          this.updateRole("follower");
        } else if (!this.leaderId && msg.tabId < this.tabId) {
          this.leaderId = msg.tabId;
          this.lastHeartbeatAt = msg.at;
        }
        break;
      case "resigned":
        if (this.leaderId === msg.tabId) {
          this.leaderId = null;
          this.claimLeadership();
        }
        break;
      case "announce":
        if (this.isLeader()) {
          this.postMessage({
            kind: "heartbeat",
            tabId: this.tabId,
            at: Date.now()
          });
        }
        break;
    }
  }
  // ── Heartbeat ───────────────────────────────────────────────────────────
  /**
  * Start the heartbeat timer (leader only).
  */
  startHeartbeat() {
    this.stopHeartbeat();
    const beat = /* @__PURE__ */ __name(() => {
      this.postMessage({
        kind: "heartbeat",
        tabId: this.tabId,
        at: Date.now()
      });
    }, "beat");
    beat();
    this.heartbeatTimer = setInterval(beat, this.config.heartbeatMs);
  }
  /**
  * Stop the heartbeat timer.
  */
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
  // ── Stale Detection ─────────────────────────────────────────────────────
  /**
  * Start the stale-check loop that detects leader failure.
  */
  startStaleCheck() {
    this.staleCheckTimer = setInterval(() => {
      if (this.isLeader()) return;
      if (this.leaderId && Date.now() - this.lastHeartbeatAt > this.config.staleThresholdMs) {
        this.logger.info(`[TabCoordinator] Leader ${this.leaderId} is stale, claiming leadership`);
        this.leaderId = null;
        this.claimLeadership();
      }
      const now = Date.now();
      for (const [id, lastSeen] of this.knownTabs) {
        if (id !== this.tabId && now - lastSeen > this.config.staleThresholdMs * 3) {
          this.knownTabs.delete(id);
        }
      }
    }, this.config.heartbeatMs);
  }
  /**
  * Stop the stale-check loop.
  */
  stopStaleCheck() {
    if (this.staleCheckTimer) {
      clearInterval(this.staleCheckTimer);
      this.staleCheckTimer = null;
    }
  }
  // ── Visibility ──────────────────────────────────────────────────────────
  /**
  * Handle visibility change events.
  *
  * When `preferVisibleLeader` is enabled, a visible follower tab
  * will attempt to claim leadership from a hidden leader.
  */
  onVisibilityChange() {
    if (!this.config.preferVisibleLeader) return;
    if (document.visibilityState === "visible" && !this.isLeader()) {
      this.claimLeadership();
    }
  }
  // ── Helpers ─────────────────────────────────────────────────────────────
  /**
  * Post a message to the BroadcastChannel (no-op if channel unavailable).
  */
  postMessage(msg) {
    this.channel?.postMessage(msg);
  }
  /**
  * Update the role subject if the role actually changed.
  */
  updateRole(role) {
    if (this.roleSubject.value !== role) {
      this.roleSubject.next(role);
    }
  }
  /**
  * Generate a unique tab identifier.
  *
  * Uses crypto.randomUUID when available, falls back to timestamp + random.
  */
  generateTabId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
};
exports.TabCoordinator = _ts_decorate([
  tsContainer.Injectable(),
  _ts_param(0, tsContainer.Optional()),
  _ts_param(0, tsContainer.Inject(contracts.COORDINATOR_CONFIG)),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof CoordinatorModuleOptions === "undefined" ? Object : CoordinatorModuleOptions
  ])
], exports.TabCoordinator);

// src/errors/coordinator.error.ts
var CoordinatorError = class extends Error {
  static {
    __name(this, "CoordinatorError");
  }
  code;
  context;
  constructor(message, code = "COORDINATOR_ERROR", context) {
    super(message);
    this.name = "CoordinatorError";
    this.code = code;
    this.context = context;
  }
};

// src/services/lock-manager.service.ts
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
function _ts_metadata2(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata2, "_ts_metadata");
function _ts_param2(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param2, "_ts_param");
exports.LockManager = class LockManager {
  static {
    __name(this, "LockManager");
  }
  preferWebLocks;
  channelName;
  constructor(config = {}) {
    this.preferWebLocks = config.preferWebLocks ?? true;
    this.channelName = config.channelName ?? "stackra-coordinator";
  }
  /**
  * Acquire a named lock and run the callback.
  *
  * Only one tab can hold a given lock at a time. Other tabs wait
  * until the lock is released.
  *
  * @param name - Lock name (should be descriptive, e.g. "sync", "token-refresh")
  * @param callback - The critical section to execute while holding the lock
  * @param options - Lock options (timeout, steal)
  * @returns The return value of the callback
  * @throws CoordinatorError if the lock cannot be acquired within the timeout
  *
  * @example
  * ```typescript
  * await lockManager.run("database-migration", async () => {
  *   await runMigrations();
  * });
  * ```
  */
  async run(name, callback, options = {}) {
    const lockName = `${this.channelName}:lock:${name}`;
    if (this.preferWebLocks && this.isWebLocksAvailable()) {
      return this.runWithWebLocks(lockName, callback, options);
    }
    return this.runWithFallback(lockName, callback, options);
  }
  /**
  * Check if a lock is currently held (best-effort).
  *
  * Only works with Web Locks API. Returns false if Web Locks unavailable.
  *
  * @param name - Lock name to check
  */
  async isLocked(name) {
    const lockName = `${this.channelName}:lock:${name}`;
    if (!this.isWebLocksAvailable()) {
      return false;
    }
    const state = await navigator.locks.query();
    return state.held?.some((lock2) => lock2.name === lockName) ?? false;
  }
  // ── Web Locks Implementation ────────────────────────────────────────────
  /**
  * Acquire lock using the Web Locks API.
  */
  async runWithWebLocks(lockName, callback, options) {
    const { timeoutMs } = options;
    const lockOptions = {
      mode: "exclusive"
    };
    if (timeoutMs) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      lockOptions.signal = controller.signal;
      try {
        return await navigator.locks.request(lockName, lockOptions, async () => {
          clearTimeout(timer);
          return await callback();
        });
      } catch (error) {
        clearTimeout(timer);
        if (error.name === "AbortError") {
          throw new CoordinatorError(`Lock "${lockName}" acquisition timed out after ${timeoutMs}ms`, "LOCK_TIMEOUT", {
            lockName,
            timeoutMs
          });
        }
        throw error;
      }
    }
    return navigator.locks.request(lockName, lockOptions, async () => {
      return await callback();
    });
  }
  // ── Fallback Implementation ─────────────────────────────────────────────
  /**
  * Fallback lock using localStorage + polling.
  *
  * Not as robust as Web Locks but works in all browsers.
  * Uses a simple lock-file pattern with expiry.
  */
  async runWithFallback(lockName, callback, options) {
    const { timeoutMs = 3e4 } = options;
    const lockKey = `__lock__${lockName}`;
    const lockValue = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const lockExpiry = 3e4;
    const startTime = Date.now();
    while (true) {
      const existing = this.getStorageLock(lockKey);
      if (!existing || Date.now() - existing.at > lockExpiry) {
        this.setStorageLock(lockKey, lockValue);
        await this.sleep(50);
        const check = this.getStorageLock(lockKey);
        if (check && check.value === lockValue) {
          try {
            return await callback();
          } finally {
            this.clearStorageLock(lockKey, lockValue);
          }
        }
      }
      if (Date.now() - startTime > timeoutMs) {
        throw new CoordinatorError(`Lock "${lockName}" acquisition timed out after ${timeoutMs}ms (fallback)`, "LOCK_TIMEOUT", {
          lockName,
          timeoutMs
        });
      }
      await this.sleep(100 + Math.random() * 100);
    }
  }
  // ── Helpers ─────────────────────────────────────────────────────────────
  isWebLocksAvailable() {
    return typeof navigator !== "undefined" && "locks" in navigator;
  }
  getStorageLock(key) {
    if (typeof localStorage === "undefined") return null;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  setStorageLock(key, value) {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify({
        value,
        at: Date.now()
      }));
    } catch {
    }
  }
  clearStorageLock(key, expectedValue) {
    if (typeof localStorage === "undefined") return;
    try {
      const existing = this.getStorageLock(key);
      if (existing && existing.value === expectedValue) {
        localStorage.removeItem(key);
      }
    } catch {
    }
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
};
exports.LockManager = _ts_decorate2([
  tsContainer.Injectable(),
  _ts_param2(0, tsContainer.Optional()),
  _ts_param2(0, tsContainer.Inject(contracts.COORDINATOR_CONFIG)),
  _ts_metadata2("design:type", Function),
  _ts_metadata2("design:paramtypes", [
    typeof CoordinatorModuleOptions === "undefined" ? Object : CoordinatorModuleOptions
  ])
], exports.LockManager);
function _ts_decorate3(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate3, "_ts_decorate");
function _ts_metadata3(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata3, "_ts_metadata");
function _ts_param3(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param3, "_ts_param");
exports.CoordinatorTransport = class _CoordinatorTransport {
  static {
    __name(this, "CoordinatorTransport");
  }
  logger = new tsLogger.Logger(_CoordinatorTransport.name);
  /** BroadcastChannel for event relay. */
  channel = null;
  /** Reference to the local EventEmitter. */
  emitter = null;
  /** Unique ID for this tab to prevent echo. */
  senderId;
  /** Whether we're currently processing an incoming message (prevents re-broadcast). */
  receiving = false;
  /** Configured event patterns to broadcast. */
  patterns;
  /** Whether broadcasting is enabled. */
  enabled;
  /** Channel name for the event relay. */
  channelName;
  constructor(config = {}) {
    this.senderId = this.generateId();
    this.patterns = config.broadcastPatterns ?? [
      "sync:**",
      "auth:**",
      "state:**"
    ];
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
  connect(emitter) {
    if (!this.enabled) return;
    if (typeof BroadcastChannel === "undefined") return;
    this.emitter = emitter;
    this.channel = new BroadcastChannel(`${this.channelName}:events`);
    this.channel.onmessage = (event) => {
      const { eventName, args, senderId } = event.data;
      if (senderId === this.senderId) return;
      this.receiving = true;
      try {
        this.emitter.emit(eventName, ...args);
      } finally {
        this.receiving = false;
      }
    };
    this.hookEmitter(emitter);
    this.logger.info(`[CoordinatorTransport] Connected with patterns: ${this.patterns.join(", ")}`);
  }
  /**
  * Disconnect the transport. Called during application shutdown.
  */
  disconnect() {
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
  hookEmitter(emitter) {
    const originalEmit = emitter.emit.bind(emitter);
    emitter.emit = (event, ...args) => {
      const result = originalEmit(event, ...args);
      if (!this.receiving && typeof event === "string" && this.matchesPatterns(event)) {
        this.broadcast(event, args);
      }
      return result;
    };
  }
  /**
  * Broadcast an event to other tabs.
  */
  broadcast(eventName, args) {
    if (!this.channel) return;
    try {
      const message = {
        eventName,
        args: this.serializeArgs(args),
        senderId: this.senderId
      };
      this.channel.postMessage(message);
    } catch (error) {
      this.logger.warn(`[CoordinatorTransport] Failed to broadcast "${eventName}": ${error?.message}`);
    }
  }
  /**
  * Check if an event name matches any of the configured broadcast patterns.
  */
  matchesPatterns(eventName) {
    return this.patterns.some((pattern) => this.matchWildcard(pattern, eventName));
  }
  /**
  * Simple wildcard matching.
  * - `*` matches one segment (delimited by `.`)
  * - `**` matches one or more segments
  */
  matchWildcard(pattern, event) {
    const patternParts = pattern.split(":");
    const eventParts = event.split(":");
    return this.matchParts(patternParts, 0, eventParts, 0);
  }
  matchParts(pattern, pi, event, ei) {
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
  serializeArgs(args) {
    try {
      return JSON.parse(JSON.stringify(args));
    } catch {
      return [];
    }
  }
  generateId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
};
exports.CoordinatorTransport = _ts_decorate3([
  tsEvents.EventTransport({
    name: "coordinator"
  }),
  tsContainer.Injectable(),
  _ts_param3(0, tsContainer.Optional()),
  _ts_param3(0, tsContainer.Inject(contracts.COORDINATOR_CONFIG)),
  _ts_metadata3("design:type", Function),
  _ts_metadata3("design:paramtypes", [
    typeof CoordinatorModuleOptions === "undefined" ? Object : CoordinatorModuleOptions
  ])
], exports.CoordinatorTransport);

// src/coordinator.module.ts
function _ts_decorate4(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate4, "_ts_decorate");
exports.CoordinatorModule = class _CoordinatorModule {
  static {
    __name(this, "CoordinatorModule");
  }
  /**
  * Configure the coordinator module.
  *
  * Call once in your root module. Registers the TabCoordinator,
  * LockManager, and CoordinatorTransport globally.
  *
  * @param config - Coordinator configuration options
  * @returns A IDynamicModule with all coordinator providers
  */
  static forRoot(config = {}) {
    return {
      module: _CoordinatorModule,
      global: true,
      providers: [
        // Configuration
        {
          provide: contracts.COORDINATOR_CONFIG,
          useValue: config
        },
        // Core services
        {
          provide: exports.TabCoordinator,
          useClass: exports.TabCoordinator
        },
        {
          provide: contracts.TAB_COORDINATOR,
          useExisting: exports.TabCoordinator
        },
        // Lock manager
        {
          provide: exports.LockManager,
          useClass: exports.LockManager
        },
        {
          provide: contracts.TAB_LOCK_MANAGER,
          useExisting: exports.LockManager
        },
        // Event transport (auto-discovered by ts-events via @EventTransport)
        ...config.broadcastEvents !== false ? [
          exports.CoordinatorTransport
        ] : []
      ],
      exports: [
        exports.TabCoordinator,
        contracts.TAB_COORDINATOR,
        exports.LockManager,
        contracts.TAB_LOCK_MANAGER,
        contracts.COORDINATOR_CONFIG
      ]
    };
  }
};
exports.CoordinatorModule = _ts_decorate4([
  tsContainer.Global(),
  tsContainer.Module({})
], exports.CoordinatorModule);
var InjectCoordinator = /* @__PURE__ */ __name(() => tsContainer.Inject(contracts.TAB_COORDINATOR), "InjectCoordinator");
var InjectLockManager = /* @__PURE__ */ __name(() => tsContainer.Inject(contracts.TAB_LOCK_MANAGER), "InjectLockManager");
function useIsLeader() {
  const [isLeader, setIsLeader] = react.useState(false);
  react.useEffect(() => {
    const coordinator2 = tsContainer.inject(contracts.TAB_COORDINATOR);
    setIsLeader(coordinator2.isLeader());
    const subscription = coordinator2.role$.subscribe((role) => {
      setIsLeader(role === "leader");
    });
    return () => subscription.unsubscribe();
  }, []);
  return isLeader;
}
__name(useIsLeader, "useIsLeader");
function useTabCount(pollIntervalMs = 2e3) {
  const [count, setCount] = react.useState(1);
  react.useEffect(() => {
    const coordinator2 = tsContainer.inject(contracts.TAB_COORDINATOR);
    setCount(coordinator2.getTabCount());
    const interval = setInterval(() => {
      setCount(coordinator2.getTabCount());
    }, pollIntervalMs);
    return () => clearInterval(interval);
  }, [
    pollIntervalMs
  ]);
  return count;
}
__name(useTabCount, "useTabCount");
var coordinator = tsContainer.inject(contracts.TAB_COORDINATOR);
var lock = tsContainer.inject(contracts.TAB_LOCK_MANAGER);

// src/utils/define-config.util.ts
function defineConfig(config) {
  return config;
}
__name(defineConfig, "defineConfig");

Object.defineProperty(exports, "COORDINATOR_CONFIG", {
  enumerable: true,
  get: function () { return contracts.COORDINATOR_CONFIG; }
});
Object.defineProperty(exports, "TAB_COORDINATOR", {
  enumerable: true,
  get: function () { return contracts.TAB_COORDINATOR; }
});
Object.defineProperty(exports, "TAB_LOCK_MANAGER", {
  enumerable: true,
  get: function () { return contracts.TAB_LOCK_MANAGER; }
});
exports.CoordinatorError = CoordinatorError;
exports.InjectCoordinator = InjectCoordinator;
exports.InjectLockManager = InjectLockManager;
exports.coordinator = coordinator;
exports.defineConfig = defineConfig;
exports.lock = lock;
exports.useIsLeader = useIsLeader;
exports.useTabCount = useTabCount;
