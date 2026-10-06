import type { PipelineDefinition, PipelineEventMap, PipelineWireEvent } from '../../../types/pipeline';
import type { EventStreamChannelTransport } from './EventStreamContext';
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
export declare function useWebSocketPipelineEvents({ channel, onEvent, enabled, }: WebSocketEventAdapterOptions): void;
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
    triggerRun: (pipelineId: string, options?: {
        definition?: PipelineDefinition;
        triggerPayload?: Record<string, unknown>;
        triggeredBy?: {
            userId: string;
            triggerType: string;
        };
        correlationId?: string;
    }) => string;
    cancelRun: (runId: string, correlationId?: string) => string;
    resolveApproval: (runId: string, stepId: string, decision: 'approve' | 'reject', options?: {
        comment?: string;
        decidedBy?: string;
        correlationId?: string;
    }) => string;
    requestResumeFromStep: (runId: string, fromNodeId: string, correlationId?: string) => string;
}
export declare function usePipelineWsCommands(): PipelineWsCommands;
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
export declare function usePipelineRunChannelSubscription(runId: string | null | undefined, options?: {
    enabled?: boolean;
}): void;
/**
 * Build the `channelTransport` for `<EventStreamProvider>` out of the gateway
 * socket. This is what makes `subscribeToRun` / `subscribeToAll` /
 * `subscribeToApprovals` actually open a channel — without it those calls are
 * no-ops (they were unconditional no-op stubs until v2.90; see the
 * `EventStreamChannelTransport` docs).
 *
 * The returned object's identity changes when `connectionState` changes,
 * which is deliberate: every subscriber's effect re-runs and re-subscribes
 * after a reconnect. Sends are dropped while not `connected` rather than the
 * transport being absent, so a not-yet-connected socket isn't mistaken for a
 * host that forgot to wire the seam.
 */
export declare function usePipelineChannelTransport(): EventStreamChannelTransport;
//# sourceMappingURL=WebSocketEventAdapter.d.ts.map