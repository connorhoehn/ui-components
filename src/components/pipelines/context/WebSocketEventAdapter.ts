// frontend/src/components/pipelines/context/WebSocketEventAdapter.ts
//
// WebSocket source adapter for the pipeline EventStreamContext.
//
// Subscribes to a gateway channel, decodes incoming `pipeline:event` frames
// into `PipelineWireEvent` envelopes, and hands them to a caller-supplied
// `onEvent` callback. AppLayout wires `onEvent` to
// `EventStreamContext.dispatchEnvelope`.
//
// Design notes:
//  - Does NOT modify EventStreamContext.tsx. Consumers opt in via a hook
//    that reads `dispatchEnvelope` and passes it through.
//  - Default `enabled = false` so the adapter stays inert in tests / pages
//    that don't want to subscribe.
//  - Gaps in the local-emit wire format (missing seq / sourceNodeId /
//    emittedAt) are filled with sentinel defaults — dedupe in
//    dispatchEnvelope still works because each envelope gets a distinct
//    local-counter-style key from the caller if seq is 0 repeatedly; the
//    gateway bridge supplies real monotonic seqs over the wire.
//  - Handles reconnects by re-subscribing whenever `connectionState`
//    transitions back to 'connected'.

import { useCallback, useEffect, useRef } from 'react';
import type {
  PipelineDefinition,
  PipelineEventMap,
  PipelineWireEvent,
} from '../../../types/pipeline';
import { useWebSocketContext } from '../../../contexts/WebSocketContext';
import type { GatewayMessage, PipelineEventFrame } from '../../../types/gateway';

// ---------------------------------------------------------------------------
// Wire-eventType aliasing (hub task #2209)
// ---------------------------------------------------------------------------
//
// distributed-core publishes the canonical event `pipeline:run:resume-from-step`
// on its EventBus. The websocket-gateway's `mapBusEventToWireEvent` performs a
// naïve `:` → `.` substitution, which yields the kebab-form
// `pipeline.run.resume-from-step` — a name the frontend's PipelineEventMap
// does NOT recognise directly.
//
// The gateway's local fallback (handleResumeFromStep without PipelineModule)
// emits `pipeline:run:resumeFromStep` (colon-form) on the plain EventEmitter;
// the bridge forwards the `eventType` field unchanged, so the wire carries the
// colon-form directly. The PipelineEventMap key was renamed to match:
// `pipeline:run:resumeFromStep` (colon-form, wave10-e).
//
// This map normalises both wire shapes to the single in-app key.
// Keep this map small — only events whose wire name doesn't match a
// PipelineEventMap key need an entry here.
const WIRE_EVENTTYPE_ALIASES: Readonly<Record<string, keyof PipelineEventMap>> = Object.freeze({
  // DC-sourced kebab form (after bridge's `:` → `.` mapping) → colon-form in-app key.
  'pipeline.run.resume-from-step': 'pipeline:run:resumeFromStep',
  // hub#2223: producer-backed canonical past-tense form. Kebab-from-the-wire
  // already maps directly into the PipelineEventMap key, but keep an explicit
  // identity entry here for documentation purposes (the function below
  // collapses to the input when the alias is the same string).
  'pipeline.run.resumed-from-step': 'pipeline.run.resumed-from-step',
});

/**
 * Normalise an inbound wire `eventType` to its PipelineEventMap canonical key.
 * Returns the input unchanged when no alias mapping is registered.
 */
function normaliseWireEventType(raw: string): keyof PipelineEventMap {
  const aliased = WIRE_EVENTTYPE_ALIASES[raw];
  return (aliased ?? (raw as keyof PipelineEventMap));
}

export interface WebSocketEventAdapterOptions {
  /** Subscribe to this channel on mount. Default: 'pipeline:all' (observability). */
  channel?: string;
  /** Called with each decoded wire event. Wire this to EventStreamContext.dispatchEnvelope. */
  onEvent: (env: PipelineWireEvent<keyof PipelineEventMap>) => void;
  /** Opt-in: default `false` leaves the adapter dormant (still mock-driven). */
  enabled?: boolean;
}

/**
 * Subscribes to a pipeline event channel via the gateway WebSocket and invokes
 * `onEvent` with each received `pipeline:event` wire envelope. No-op when
 * `enabled === false`.
 *
 * Phase 5: may be replaced by an EventSource (SSE) adapter for observability-only clients.
 */
export function useWebSocketPipelineEvents({
  channel = 'pipeline:all',
  onEvent,
  enabled = false,
}: WebSocketEventAdapterOptions): void {
  const { connectionState, sendMessage, onMessage } = useWebSocketContext();

  // Keep the latest `onEvent` in a ref so the effect doesn't re-subscribe on
  // every render when the caller passes an inline closure.
  const onEventRef = useRef(onEvent);
  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);

  useEffect(() => {
    if (!enabled) return;
    if (connectionState !== 'connected') return;

    // Subscribe to the channel. The gateway fans out `pipeline:event` frames
    // for any run/step the caller has permission to observe.
    sendMessage({ service: 'pipeline', action: 'subscribe', channel });

    // Register a filtering listener on the shared WS message bus.
    const unregister = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'pipeline:event') return;

      // Type-safe decode: msg is now PipelineEventFrame.
      const frame = msg as PipelineEventFrame;

      // Decode the wire envelope, tolerating gaps for the Phase 1 local-emit
      // source. The gateway bridge is expected to supply full envelopes in
      // Phase 4; until then, sentinel defaults keep the dispatch path safe.
      const rawEventType = frame.eventType;
      if (!rawEventType) return;

      // Apply wire-form alias map (e.g. kebab `pipeline.run.resume-from-step`
      // → colon-form `pipeline:run:resumeFromStep`) so downstream listeners
      // that key on PipelineEventMap names continue to fire. See WIRE_EVENTTYPE_ALIASES.
      const eventType = normaliseWireEventType(rawEventType as string);

      const envelope: PipelineWireEvent<keyof PipelineEventMap> = {
        eventType,
        payload: frame.payload as PipelineEventMap[keyof PipelineEventMap],
        seq: typeof frame.seq === 'number' ? frame.seq : 0,
        sourceNodeId:
          typeof frame.sourceNodeId === 'string' ? frame.sourceNodeId : 'unknown',
        emittedAt:
          typeof frame.emittedAt === 'number' ? frame.emittedAt : Date.now(),
      };

      try {
        onEventRef.current(envelope);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[WebSocketEventAdapter] onEvent threw', err);
      }
    });

    return () => {
      unregister();
      // Best-effort unsubscribe. If the socket is already dropping we just
      // rely on the gateway's session cleanup; this send is a no-op in that
      // case.
      sendMessage({ service: 'pipeline', action: 'unsubscribe', channel });
    };
  }, [enabled, connectionState, channel, sendMessage, onMessage]);
}

// ---------------------------------------------------------------------------
// Command helpers — outbound WS frames per PIPELINES_PLAN.md §14.2
// ---------------------------------------------------------------------------

/**
 * Returns memoized helpers that fan WS frames for the pipeline service.
 * Channel subscriptions are fire-and-forget — the gateway echoes a
 * `pipeline` ack frame when subscribed; the dispatch path (above) is what
 * actually surfaces events. Execution-control helpers return correlation ids
 * that callers can match against `pipeline:ack` / `pipeline:error` frames.
 */
export interface PipelineWsCommands {
  subscribeToRun: (runId: string) => void;
  unsubscribeFromRun: (runId: string) => void;
  subscribeToAll: () => void;
  unsubscribeFromAll: () => void;
  subscribeToApprovals: () => void;
  unsubscribeFromApprovals: () => void;
  triggerRun: (
    pipelineId: string,
    options?: { definition?: PipelineDefinition; triggerPayload?: Record<string, unknown>; triggeredBy?: { userId: string; triggerType: string }; correlationId?: string },
  ) => string;
  cancelRun: (runId: string, correlationId?: string) => string;
  resolveApproval: (
    runId: string,
    stepId: string,
    decision: 'approve' | 'reject',
    options?: { comment?: string; decidedBy?: string; correlationId?: string },
  ) => string;
  requestResumeFromStep: (runId: string, fromNodeId: string, correlationId?: string) => string;
}

function makeCorrelationId(): string {
  // crypto.randomUUID is available in modern browsers + jsdom 22+; fall back
  // for older runtimes used by tests.
  const c = typeof globalThis !== 'undefined' ? (globalThis.crypto as Crypto | undefined) : undefined;
  if (c && typeof c.randomUUID === 'function') return c.randomUUID();
  return `ws-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function usePipelineWsCommands(): PipelineWsCommands {
  const { sendMessage } = useWebSocketContext();

  const subscribeToRun = useCallback(
    (runId: string) =>
      sendMessage({ service: 'pipeline', action: 'subscribe', channel: `pipeline:run:${runId}` }),
    [sendMessage],
  );
  const unsubscribeFromRun = useCallback(
    (runId: string) =>
      sendMessage({ service: 'pipeline', action: 'unsubscribe', channel: `pipeline:run:${runId}` }),
    [sendMessage],
  );
  const subscribeToAll = useCallback(
    () => sendMessage({ service: 'pipeline', action: 'subscribe', channel: 'pipeline:all' }),
    [sendMessage],
  );
  const unsubscribeFromAll = useCallback(
    () => sendMessage({ service: 'pipeline', action: 'unsubscribe', channel: 'pipeline:all' }),
    [sendMessage],
  );
  const subscribeToApprovals = useCallback(
    () => sendMessage({ service: 'pipeline', action: 'subscribe', channel: 'pipeline:approvals' }),
    [sendMessage],
  );
  const unsubscribeFromApprovals = useCallback(
    () => sendMessage({ service: 'pipeline', action: 'unsubscribe', channel: 'pipeline:approvals' }),
    [sendMessage],
  );

  const triggerRun = useCallback<PipelineWsCommands['triggerRun']>(
    (pipelineId, options = {}) => {
      const correlationId = options.correlationId ?? makeCorrelationId();
      sendMessage({
        service: 'pipeline',
        action: 'trigger',
        pipelineId,
        ...(options.definition ? { definition: options.definition } : {}),
        ...(options.triggerPayload ? { triggerPayload: options.triggerPayload } : {}),
        ...(options.triggeredBy ? { triggeredBy: options.triggeredBy } : {}),
        correlationId,
      });
      return correlationId;
    },
    [sendMessage],
  );

  const cancelRun = useCallback<PipelineWsCommands['cancelRun']>(
    (runId, correlationId) => {
      const cid = correlationId ?? makeCorrelationId();
      sendMessage({ service: 'pipeline', action: 'cancel', runId, correlationId: cid });
      return cid;
    },
    [sendMessage],
  );

  const resolveApproval = useCallback<PipelineWsCommands['resolveApproval']>(
    (runId, stepId, decision, options = {}) => {
      const cid = options.correlationId ?? makeCorrelationId();
      sendMessage({
        service: 'pipeline',
        action: 'resolveApproval',
        runId,
        stepId,
        decision,
        ...(options.comment ? { comment: options.comment } : {}),
        ...(options.decidedBy ? { decidedBy: options.decidedBy } : {}),
        correlationId: cid,
      });
      return cid;
    },
    [sendMessage],
  );

  const requestResumeFromStep = useCallback<PipelineWsCommands['requestResumeFromStep']>(
    (runId, fromNodeId, correlationId) => {
      const cid = correlationId ?? makeCorrelationId();
      sendMessage({
        service: 'pipeline',
        action: 'resumeFromStep',
        runId,
        fromNodeId,
        correlationId: cid,
      });
      return cid;
    },
    [sendMessage],
  );

  return {
    subscribeToRun,
    unsubscribeFromRun,
    subscribeToAll,
    unsubscribeFromAll,
    subscribeToApprovals,
    unsubscribeFromApprovals,
    triggerRun,
    cancelRun,
    resolveApproval,
    requestResumeFromStep,
  };
}

// ---------------------------------------------------------------------------
// Per-run channel subscription helper
// ---------------------------------------------------------------------------

/**
 * Subscribe to the per-run gateway channel `pipeline:run:{runId}` while the
 * caller (typically a run-detail page) is mounted. Complements the global
 * `pipeline:all` firehose subscribed by AppLayout — distributed-core emits
 * some lifecycle events (e.g. `pipeline:run:orphaned`,
 * `pipeline:run:reassigned`, `pipeline:join:waiting`, `pipeline:join:fired`)
 * on per-run channels in addition to the firehose, so without this hook a
 * client viewing a single run can miss late-arriving membership transitions
 * if the firehose is rate-limited or dropped frames during overload.
 *
 * Behaviour:
 *  - Only subscribes when the WS connection is `connected`. Reconnects re-fire
 *    the subscribe automatically because `connectionState` flips back to
 *    `'connected'` after recovery.
 *  - Only active when `enabled` (default: `true`).
 *  - Sends a best-effort unsubscribe on unmount or `runId` change. If the
 *    socket has already dropped, the unsubscribe is a no-op and the gateway's
 *    session cleanup handles it.
 *
 * Channel naming: the gateway treats `pipeline:run:{runId}` as an exact match
 * (no prefix-glob), so other runs' events do not bleed in.
 */
export function usePipelineRunChannelSubscription(
  runId: string | null | undefined,
  options: { enabled?: boolean } = {},
): void {
  const { enabled = true } = options;
  const { connectionState, sendMessage } = useWebSocketContext();

  useEffect(() => {
    if (!enabled) return;
    if (!runId) return;
    if (connectionState !== 'connected') return;

    const channel = `pipeline:run:${runId}`;
    sendMessage({ service: 'pipeline', action: 'subscribe', channel });

    return () => {
      sendMessage({ service: 'pipeline', action: 'unsubscribe', channel });
    };
  }, [enabled, runId, connectionState, sendMessage]);
}
