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
    subscribeToRun(runId: string): () => void;
    subscribeToAll(): () => void;
    subscribeToApprovals(): () => void;
}
export interface EventStreamProviderProps {
    children: React.ReactNode;
}
export declare function EventStreamProvider({ children, }: EventStreamProviderProps): React.JSX.Element;
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