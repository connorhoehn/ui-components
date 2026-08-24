// frontend/src/components/pipelines/context/EventStreamContext.tsx
//
// Single dispatcher for pipeline events. The editor canvas, observability
// dashboard, and approvals panel all subscribe here. The only producer is
// the gateway WebSocket bridge (see WebSocketEventAdapter). Tests can also
// drive `dispatch` / `dispatchEnvelope` directly. See PIPELINES_PLAN.md §13.2.
//
// The provider owns a mutable `listeners` ref so subscribe/dispatch don't
// trigger re-renders. `'*'` subscribers see every event tagged with its
// `eventType` for debug / observability use.

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type {
  PipelineEventMap,
  PipelineWireEvent,
} from '../../../types/pipeline';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WildcardEvent = {
  eventType: string;
  payload: unknown;
};

export type PipelineEventHandler<K extends keyof PipelineEventMap> = (
  payload: PipelineEventMap[K] | WildcardEvent,
) => void;

export interface EventStreamValue {
  subscribe<K extends keyof PipelineEventMap>(
    type: K | '*',
    handler: (payload: PipelineEventMap[K] | WildcardEvent) => void,
  ): () => void;
  /**
   * Convenience shim for tests / synthetic event sources. Synthesizes a
   * `PipelineWireEvent` (auto-incrementing local `seq`, `sourceNodeId =
   * 'local'`, `emittedAt = Date.now()`) and forwards to `dispatchEnvelope`
   * so synthetic and WS-sourced events share the exact same dedupe +
   * fan-out pipeline.
   */
  dispatch<K extends keyof PipelineEventMap>(
    type: K,
    payload: PipelineEventMap[K],
  ): void;
  /**
   * Primary entry point for any envelope-aware producer. Used by the
   * WebSocket adapter to forward server-supplied envelopes verbatim. Dedupes
   * on `(runId, stepId, seq)` so replays after a ResourceRouter-orphaned run
   * is resumed on a new owner don't double-count. Timestamps are re-stamped
   * on replay — never use them for dedupe.
   */
  dispatchEnvelope<K extends keyof PipelineEventMap>(
    envelope: PipelineWireEvent<K>,
  ): void;
  /**
   * Ask the gateway to start streaming the per-run channel
   * `pipeline:run:{runId}`, and return a function that unsubscribes it.
   *
   * **This only does anything when the host wired `channelTransport` on
   * `<EventStreamProvider>`.** The provider owns no socket of its own — see
   * the `EventStreamChannelTransport` docs below. With no transport the
   * returned function is a no-op and a dev-mode warning names the channel
   * that was requested but never opened.
   */
  subscribeToRun(runId: string): () => void;
  /** Same contract as `subscribeToRun`, for the `pipeline:all` firehose. */
  subscribeToAll(): () => void;
  /** Same contract as `subscribeToRun`, for the `pipeline:approvals` channel. */
  subscribeToApprovals(): () => void;
}

/**
 * Host seam for gateway channel subscription.
 *
 * `EventStreamProvider` is a pure in-memory dispatcher: it has no WebSocket,
 * and deliberately doesn't take a hard dependency on `WebSocketContext` so it
 * stays mountable in tests, Storybook and the backendless demo. But
 * `subscribeToRun` / `subscribeToAll` / `subscribeToApprovals` are, by name,
 * promises to open a *gateway* channel — something only the host can do.
 *
 * Until v2.90 those three methods were unconditional `return () => {}` stubs
 * with a comment claiming "WebSocketEventAdapter provides real subscriptions".
 * It doesn't and it can't: the adapter is a sibling hook, not a wrapper, so
 * nothing ever replaced the stub. Callers (`usePipelineRunAuditLog`,
 * `usePendingApprovals`, `ObservabilityContext`) held an unsubscribe handle
 * for a channel that had never been opened.
 *
 * Implement this with `usePipelineWsCommands()` from `WebSocketEventAdapter`
 * — its `subscribe`/`unsubscribe` frames use exactly these channel names. See
 * `AppLayout` for the reference wiring.
 *
 * **Pass a stable (memoized) object.** Its identity is part of the context
 * value, so a new object every render re-runs every subscriber's effect.
 * Changing identity on purpose (e.g. when the socket reconnects) is how
 * re-subscription after a reconnect happens.
 */
export interface EventStreamChannelTransport {
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const EventStreamContext = createContext<EventStreamValue | null>(null);

// Internal untyped handler bucket — keeps the listener map a single Set
// per channel without juggling 30+ typed sets.
type AnyHandler = (payload: unknown) => void;

// Upper bound on the dedupe memory — enough to cover the replay window of a
// crash/failover on a mid-sized run without unbounded growth. Oldest entries
// are evicted on insert (insertion-order LRU via Set iteration order).
const DEDUPE_CAPACITY = Number(import.meta.env.VITE_DEDUPE_CAPACITY) || 2048;

/**
 * Build the dedupe key for a wire event.
 *  - `runId` is extracted from the payload (all lifecycle events carry one;
 *    unknown payload shapes fall back to `'<no-run>'`).
 *  - `stepId` is extracted when present (step / llm / approval / join events)
 *    and falls back to `'<run>'` for run-scoped events so `(run, seq)` on
 *    retries stays unique.
 *  - `seq` is the server-supplied monotonic per-run counter; it's the same
 *    across replays, which is what makes dedupe work.
 */
function buildDedupeKey(env: PipelineWireEvent): string {
  const payload = env.payload as
    | (Record<string, unknown> & { runId?: unknown; stepId?: unknown })
    | undefined;
  const runId =
    payload && typeof payload.runId === 'string' ? payload.runId : '<no-run>';
  const stepId =
    payload && typeof payload.stepId === 'string' ? payload.stepId : '<run>';
  return `${runId}:${stepId}:${env.seq}`;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface EventStreamProviderProps {
  children: React.ReactNode;
  /**
   * Gateway channel transport. Omit it and `subscribeToRun` /
   * `subscribeToAll` / `subscribeToApprovals` open nothing — correct for
   * tests, Storybook and the backendless demo, which drive the dispatcher
   * directly via `dispatch` / `dispatchEnvelope`. Any deployment with a real
   * gateway must pass one. See `EventStreamChannelTransport`.
   */
  channelTransport?: EventStreamChannelTransport;
}

export function EventStreamProvider({
  children,
  channelTransport,
}: EventStreamProviderProps) {
  const listeners = useRef<Map<string, Set<AnyHandler>>>(new Map());
  // Insertion-order LRU of seen `(runId, stepId, seq)` triples. We use a plain
  // Set; on overflow, we evict the oldest entry (the first value produced by
  // Set's iterator). Capped at DEDUPE_CAPACITY to bound memory.
  const seenKeys = useRef<Set<string>>(new Set());
  // Local monotonic counter used by the `dispatch(type, payload)` shim so the
  // mock source produces distinct-seq envelopes without the caller threading a
  // counter. Not used for replay semantics — the WS adapter supplies server
  // seqs via `dispatchEnvelope`.
  const localSeqCounter = useRef<number>(0);

  const subscribe = useCallback(
    <K extends keyof PipelineEventMap>(
      type: K | '*',
      handler: (payload: PipelineEventMap[K] | WildcardEvent) => void,
    ): (() => void) => {
      const key = type as string;
      let bucket = listeners.current.get(key);
      if (!bucket) {
        bucket = new Set();
        listeners.current.set(key, bucket);
      }
      const wrapped = handler as AnyHandler;
      bucket.add(wrapped);
      return () => {
        const current = listeners.current.get(key);
        if (!current) return;
        current.delete(wrapped);
        if (current.size === 0) listeners.current.delete(key);
      };
    },
    [],
  );

  // Internal fan-out — does not dedupe. Called by `dispatchEnvelope` once the
  // event has been accepted; callers outside the module should never reach
  // this path directly.
  const fanOut = useCallback(
    <K extends keyof PipelineEventMap>(
      type: K,
      payload: PipelineEventMap[K],
    ): void => {
      const typed = listeners.current.get(type as string);
      if (typed) {
        // Clone to tolerate handlers unsubscribing during iteration.
        for (const h of Array.from(typed)) {
          try {
            h(payload);
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[EventStream] handler threw', type, err);
          }
        }
      }
      const wildcard = listeners.current.get('*');
      if (wildcard) {
        const envelope: WildcardEvent = { eventType: type as string, payload };
        for (const h of Array.from(wildcard)) {
          try {
            h(envelope);
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[EventStream] wildcard handler threw', type, err);
          }
        }
      }
    },
    [],
  );

  const dispatchEnvelope = useCallback(
    <K extends keyof PipelineEventMap>(env: PipelineWireEvent<K>): void => {
      const key = buildDedupeKey(env);
      const seen = seenKeys.current;
      if (seen.has(key)) return;
      seen.add(key);
      // Bound memory — evict the oldest entry (insertion-order) when over cap.
      if (seen.size > DEDUPE_CAPACITY) {
        const oldest = seen.values().next().value;
        if (oldest !== undefined) seen.delete(oldest);
      }
      fanOut(env.eventType, env.payload);
    },
    [fanOut],
  );

  const dispatch = useCallback(
    <K extends keyof PipelineEventMap>(
      type: K,
      payload: PipelineEventMap[K],
    ): void => {
      // Synthesize a local envelope so synthetic events (tests, manual
      // simulation) funnel through `dispatchEnvelope`. Dedupe is a
      // pass-through for synthetic events (seqs are unique by construction).
      const envelope: PipelineWireEvent<K> = {
        eventType: type,
        payload,
        seq: localSeqCounter.current++,
        sourceNodeId: 'local',
        emittedAt: Date.now(),
      };
      dispatchEnvelope(envelope);
    },
    [dispatchEnvelope],
  );

  // Channels we've already warned about, so a component that re-subscribes on
  // every reconnect doesn't spam the console. Per provider instance.
  const warnedChannels = useRef<Set<string>>(new Set());
  // Refcount per channel. Two components can want the same channel
  // (`ObservabilityContext` and a run page both want `pipeline:all`); without
  // this, the first one to unmount would close the channel out from under the
  // second, which still believes it is subscribed. Only the 0->1 and 1->0
  // transitions reach the wire.
  const channelRefs = useRef<Map<string, number>>(new Map());

  /**
   * Open a gateway channel through the host transport and return its
   * unsubscribe. With no transport wired this is a no-op — but a *loud* one
   * in dev, because a silent no-op here is indistinguishable from a healthy
   * subscription at the call site.
   */
  const openChannel = useCallback(
    (channel: string): (() => void) => {
      if (!channelTransport) {
        if (import.meta.env.DEV && !warnedChannels.current.has(channel)) {
          warnedChannels.current.add(channel);
          // eslint-disable-next-line no-console
          console.warn(
            `[EventStream] channel "${channel}" was requested but no ` +
              '`channelTransport` is wired on <EventStreamProvider>, so nothing ' +
              'was subscribed. Events only reach subscribers if some other ' +
              'producer dispatches them. See EventStreamChannelTransport.',
          );
        }
        return () => {};
      }
      const refs = channelRefs.current;
      const before = refs.get(channel) ?? 0;
      refs.set(channel, before + 1);
      if (before === 0) channelTransport.subscribe(channel);

      let closed = false;
      return () => {
        // Guard double-invocation: React StrictMode runs mount effects as
        // mount -> unmount -> remount, and callers keep the handle in arrays
        // they may drain more than once. Without this, one handle could
        // decrement the refcount twice and close a live channel.
        if (closed) return;
        closed = true;
        const current = refs.get(channel) ?? 0;
        const next = Math.max(0, current - 1);
        if (next === 0) {
          refs.delete(channel);
          channelTransport.unsubscribe(channel);
        } else {
          refs.set(channel, next);
        }
      };
    },
    [channelTransport],
  );

  const subscribeToRun = useCallback(
    (runId: string): (() => void) => openChannel(`pipeline:run:${runId}`),
    [openChannel],
  );

  const subscribeToAll = useCallback(
    (): (() => void) => openChannel('pipeline:all'),
    [openChannel],
  );

  const subscribeToApprovals = useCallback(
    (): (() => void) => openChannel('pipeline:approvals'),
    [openChannel],
  );

  const value = useMemo<EventStreamValue>(
    () => ({
      subscribe,
      dispatch,
      dispatchEnvelope,
      subscribeToRun,
      subscribeToAll,
      subscribeToApprovals,
    }),
    [
      subscribe,
      dispatch,
      dispatchEnvelope,
      subscribeToRun,
      subscribeToAll,
      subscribeToApprovals,
    ],
  );

  return (
    <EventStreamContext.Provider value={value}>
      {children}
    </EventStreamContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Access the raw EventStream context. Throws if used outside a provider.
 * Prefer `useEventStream(type, handler)` for subscription use cases.
 */
export function useEventStreamContext(): EventStreamValue {
  const ctx = useContext(EventStreamContext);
  if (!ctx) {
    throw new Error(
      'useEventStreamContext must be used within an EventStreamProvider',
    );
  }
  return ctx;
}

/**
 * Lifecycle-safe subscription. The `handler` ref is kept latest so callers
 * can use inline closures without re-subscribing on every render. Cleanup
 * removes the listener when the component unmounts or `type` changes.
 */
export function useEventStream<K extends keyof PipelineEventMap>(
  type: K | '*',
  handler: (payload: PipelineEventMap[K] | WildcardEvent) => void,
): void {
  const { subscribe } = useEventStreamContext();
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const cleanup = subscribe<K>(type, (payload) => handlerRef.current(payload));
    return cleanup;
  }, [subscribe, type]);
}
