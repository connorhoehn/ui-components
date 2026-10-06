import React from 'react';
import type { PipelineEventMap, PipelineWireEvent } from '../../../types/pipeline';
export type WildcardEvent = {
    eventType: string;
    payload: unknown;
};
export type PipelineEventHandler<K extends keyof PipelineEventMap> = (payload: PipelineEventMap[K] | WildcardEvent) => void;
export interface EventStreamValue {
    subscribe<K extends keyof PipelineEventMap>(type: K | '*', handler: (payload: PipelineEventMap[K] | WildcardEvent) => void): () => void;
    /**
     * Convenience shim for tests / synthetic event sources. Synthesizes a
     * `PipelineWireEvent` (auto-incrementing local `seq`, `sourceNodeId =
     * 'local'`, `emittedAt = Date.now()`) and forwards to `dispatchEnvelope`
     * so synthetic and WS-sourced events share the exact same dedupe +
     * fan-out pipeline.
     */
    dispatch<K extends keyof PipelineEventMap>(type: K, payload: PipelineEventMap[K]): void;
    /**
     * Primary entry point for any envelope-aware producer. Used by the
     * WebSocket adapter to forward server-supplied envelopes verbatim. Dedupes
     * on `(runId, stepId, seq)` so replays after a ResourceRouter-orphaned run
     * is resumed on a new owner don't double-count. Timestamps are re-stamped
     * on replay — never use them for dedupe.
     */
    dispatchEnvelope<K extends keyof PipelineEventMap>(envelope: PipelineWireEvent<K>): void;
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
export declare function EventStreamProvider({ children, channelTransport, }: EventStreamProviderProps): React.JSX.Element;
/**
 * Access the raw EventStream context. Throws if used outside a provider.
 * Prefer `useEventStream(type, handler)` for subscription use cases.
 */
export declare function useEventStreamContext(): EventStreamValue;
/**
 * Lifecycle-safe subscription. The `handler` ref is kept latest so callers
 * can use inline closures without re-subscribing on every render. Cleanup
 * removes the listener when the component unmounts or `type` changes.
 */
export declare function useEventStream<K extends keyof PipelineEventMap>(type: K | '*', handler: (payload: PipelineEventMap[K] | WildcardEvent) => void): void;
//# sourceMappingURL=EventStreamContext.d.ts.map