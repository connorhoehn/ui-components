import type { JudgeFailureReason, JudgmentResult } from './types';
export type JudgmentStepStatus = 'running' | 'scored' | 'failed' | 'budget-exceeded';
export interface JudgmentStepRecord {
    runId: string;
    stepId: string;
    pipelineId?: string;
    status: JudgmentStepStatus;
    result?: JudgmentResult;
    error?: string;
    failureReason?: JudgeFailureReason;
    /** Wall-clock ms since the step's `started` event. */
    elapsedMs?: number;
    /** Rubric id from the started event. */
    rubricId?: string;
    /** Model id from the started or scored event. */
    judgeModel?: string;
    startedAt?: number;
    completedAt?: number;
    costUsd?: number;
    tokensIn?: number;
    tokensOut?: number;
}
/**
 * Wire-event payload contract for the four `pipeline.judge.*` events. The
 * gateway delivers colon-form (`pipeline:judge:scored`) over the WS bus;
 * the EventStreamContext normalizes to dot-form (`pipeline.judge.scored`)
 * before delivery, matching the existing vision-hook convention.
 *
 * Permissive shapes — only the required envelope fields are typed; the
 * payload otherwise matches platform-api's JudgeStepHandler emits +
 * event-catalog's pipeline-judge schema.
 */
export interface PipelineJudgeStartedPayload {
    runId: string;
    stepId: string;
    pipelineId?: string;
    rubricId?: string;
    judgeModel?: string;
    at?: number | string;
}
export interface PipelineJudgeScoredPayload {
    runId: string;
    stepId: string;
    pipelineId?: string;
    judgmentId?: string;
    rubricId?: string;
    judgeModel?: string;
    result: JudgmentResult;
    costUsd?: number;
    latencyMs?: number;
    usage?: {
        inputTokens?: number;
        outputTokens?: number;
    };
    at?: number | string;
}
export interface PipelineJudgeFailedPayload {
    runId: string;
    stepId: string;
    pipelineId?: string;
    reason: JudgeFailureReason;
    error: string;
    costUsd?: number;
    latencyMs?: number;
    tokensIn?: number;
    tokensOut?: number;
    at?: number | string;
}
export interface PipelineJudgeBudgetExceededPayload {
    runId: string;
    stepId: string;
    pipelineId?: string;
    at?: number | string;
}
export interface UseJudgmentResultsOptions {
    /** Limit accumulated records to the most recent N. Default 50. */
    maxRecords?: number;
    /** When set, only records for this runId are kept. */
    runId?: string;
}
/**
 * Hook that subscribes to the pipeline event stream and folds the four
 * `pipeline.judge.*` events into a per-step record map. Stable identity
 * per (runId, stepId) — `scored`/`failed`/`budget-exceeded` mutate the
 * existing record rather than creating a new one, so a downstream card
 * smoothly transitions running → scored without unmounting.
 *
 * Pure observer: never publishes, never owns state outside React. Designed
 * to be embedded in the existing PipelinesPage / PipelineRunsPanel without
 * disturbing their context tree. Mirrors useVisionResults' shape so
 * consumers can fold both into one activity stream component.
 */
export declare function useJudgmentResults(opts?: UseJudgmentResultsOptions): JudgmentStepRecord[];
export default useJudgmentResults;
//# sourceMappingURL=useJudgmentResults.d.ts.map