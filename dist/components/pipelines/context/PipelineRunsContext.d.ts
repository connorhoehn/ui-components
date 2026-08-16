import React from 'react';
import type { PipelineRun, StepExecution } from '../../../types/pipeline';
export interface PipelineRunsValue {
    runs: Record<string, PipelineRun>;
    activeRunIds: string[];
    triggerRun: (pipelineId: string, payload?: Record<string, unknown>) => Promise<string>;
    /**
     * Trigger a run with debug breakpoints. Passes `breakpoints` as node IDs
     * where execution should pause for inspection before proceeding.
     */
    triggerDebugRun: (pipelineId: string, breakpoints: string[], payload?: Record<string, unknown>) => Promise<string>;
    cancelRun: (runId: string) => void;
    resolveApproval: (runId: string, stepId: string, decision: 'approve' | 'reject', comment?: string) => void;
    /**
     * Resolve a debug breakpoint, resuming execution from the paused node.
     * @param action  — 'continue' resumes to the next breakpoint;
     *                  'resume_all' ignores all remaining breakpoints
     */
    resolveBreakpoint: (runId: string, stepId: string, action?: 'continue' | 'resume_all') => void;
    /**
     * hub#2226 — edit-and-continue: apply a paused-context patch via
     * social-api. Resolves the executor's `PatchResult` (`{ patchId, before,
     * after, validation }`); on a 422 the resolved value's
     * `validation.ok === false` and the caller can show the rejection reason.
     * Throws on non-2xx/422 transport / 404 / 409 errors.
     */
    applyContextPatch: (runId: string, stepId: string, patch: {
        mode: 'merge';
        values: Record<string, unknown>;
    }, appliedBy?: string) => Promise<{
        patchId: string;
        before: Record<string, unknown>;
        after: Record<string, unknown>;
        validation: {
            ok: true;
        } | {
            ok: false;
            reason: string;
        };
    }>;
    /**
     * hub#2226 — revert a paused-context patch by id. Throws if the run has
     * already resumed past `pausedAtNodeId` (server returns 409).
     */
    revertContextPatch: (runId: string, stepId: string, patchId: string) => Promise<void>;
    /**
     * Retry the most recent failed run from a specific step (per §18.4.4 / §17.6).
     * Finds the newest run that contained `nodeId` AND ended in `failed` AND had
     * `nodeId` itself fail; calls the backend retry-from-node API to spawn a new
     * run that resumes traversal at `nodeId` and skips upstream nodes. No-op +
     * console.warn when no eligible run is found.
     */
    retryFromStep: (nodeId: string) => Promise<void>;
    /**
     * Merge a polled PipelineRun into the in-memory runs map. Used by the
     * poll-based live status visualizer to inject fresh run data fetched from
     * the API. Safe to call repeatedly — newer step data wins.
     */
    ingestRun: (run: PipelineRun) => void;
}
export interface PipelineRunsProviderProps {
    children: React.ReactNode;
}
export declare function PipelineRunsProvider({ children }: PipelineRunsProviderProps): React.JSX.Element;
export declare function usePipelineRuns(): PipelineRunsValue;
/**
 * Ergonomic shortcut: returns just the `retryFromStep` callback so per-node
 * components don't have to destructure the whole runs value. See §17.6.
 *
 * Graceful when no `PipelineRunsProvider` is in scope — returns a no-op so
 * standalone visual renders (storybook, isolated unit tests) don't throw just
 * for asking for the retry handler.
 *
 * Host seam: when a `PipelineNodeRuntimeProvider` is mounted AND its value
 * supplies `retryFromStep`, that handler wins over the bundled one (wrapped
 * so callers always get a Promise back). A mounted seam WITHOUT a
 * `retryFromStep` falls through to the bundled handler / no-op as before.
 */
export declare function useRetryFromStep(): (nodeId: string) => Promise<void>;
/**
 * Lookup the most recent run that contains a step matching `nodeId`, and
 * return that step. Used by per-node visuals (LLMNode etc.) to surface live
 * runtime state on the canvas without each node having to fold over all
 * runs itself.
 *
 * "Most recent" is defined as max(run.startedAt). Active runs are NOT
 * preferred over completed — the visual is the *latest observed* state of
 * this node, regardless of whether the run is still running. The streaming
 * indicators rely on freshness anyway: streamOpened is cleared on the
 * first token and never re-set, so a stale streamOpened from a completed
 * run would imply the run never received its first token (which is
 * accurate state to render).
 *
 * Returns null when no run has executed this node yet (the common case
 * for nodes that haven't run, or for the editor view when no run has been
 * triggered).
 *
 * Host seam: when a `PipelineNodeRuntimeProvider` is mounted, its
 * `getLatestStepForNode` is consulted INSTEAD of the bundled runs store —
 * even if a `PipelineRunsProvider` is also in scope. The host lookup is
 * memoized on the function's identity, so hosts must hand us a fresh
 * function whenever their store changes (see PipelineNodeRuntimeContext).
 */
export declare function useLatestStepForNode(nodeId: string): StepExecution | null;
//# sourceMappingURL=PipelineRunsContext.d.ts.map