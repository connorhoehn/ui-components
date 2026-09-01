import React, { type ReactNode } from 'react';
import type { StepExecution } from '../../../types/pipeline';
/**
 * Value the host supplies to drive node-level live state.
 */
export interface PipelineNodeRuntimeValue {
    /**
     * Resolve the most recent `StepExecution` observed for a node, or null when
     * the node has never run. MUST be re-created (new identity) whenever the
     * host's runs store changes — consumers memoize on this function's identity.
     */
    getLatestStepForNode: (nodeId: string) => StepExecution | null;
    /**
     * Optional retry handler. When provided, `useRetryFromStep()` returns a
     * wrapper around this instead of the bundled retry path. May be sync or
     * async; the hook normalizes the return to a Promise.
     */
    retryFromStep?: (nodeId: string) => void | Promise<void>;
}
export declare const PipelineNodeRuntimeContext: React.Context<PipelineNodeRuntimeValue | null>;
export interface PipelineNodeRuntimeProviderProps {
    value: PipelineNodeRuntimeValue;
    children: ReactNode;
}
/**
 * Mount around any subtree containing ui-components pipeline nodes to feed
 * them live run state from a host-owned store, without mounting the bundled
 * `PipelineRunsProvider` (and its WebSocketProvider / social-api stack).
 */
export declare function PipelineNodeRuntimeProvider({ value, children, }: PipelineNodeRuntimeProviderProps): React.JSX.Element;
/**
 * Accessor for the host seam. Returns null when no host runtime provider is
 * mounted (the common case inside apps that use the bundled runs store).
 */
export declare function usePipelineNodeRuntime(): PipelineNodeRuntimeValue | null;
//# sourceMappingURL=PipelineNodeRuntimeContext.d.ts.map