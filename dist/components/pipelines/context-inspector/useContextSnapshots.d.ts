import type { PipelineRun, StepExecution } from '../../../types/pipeline';
export interface StepContextSnapshot {
    stepId: string;
    /** Context as it was before this step executed (input). */
    inputContext: Record<string, unknown>;
    /** What this step produced / added. */
    output: unknown;
    /** Context after this step's output was merged. */
    outputContext: Record<string, unknown>;
    /** For LLM steps: the resolved prompt template. */
    resolvedPrompt?: string;
    /** Keys that were newly added to the context by this step. */
    newKeys: string[];
    /** Full StepExecution for metadata access (LLM, error, approvals, duration). */
    stepExecution: StepExecution;
}
export interface UseContextSnapshotsResult {
    /** All enriched snapshots (with live prompt/checkpoint data merged in). */
    enrichedSnapshots: StepContextSnapshot[];
    /** The currently-active snapshot (based on activeStepId). */
    activeSnapshot: StepContextSnapshot | null;
    /** Set of keys newly added by the active step. */
    newKeysSet: Set<string>;
}
export declare function useContextSnapshots(run: PipelineRun | null, activeStepId: string | null): UseContextSnapshotsResult;
//# sourceMappingURL=useContextSnapshots.d.ts.map