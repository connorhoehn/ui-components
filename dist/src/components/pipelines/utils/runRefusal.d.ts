import type { PipelineRun, StepExecution } from '../../../types/pipeline';
/**
 * A run (or step) that was REFUSED — a step looked at the request and said
 * no — as opposed to one that broke. The platform spells a refusal
 * `<step> <code>: <reason>` (`deck-revise constraint-not-met: Title has 2
 * words; it must have exactly 0. …`) and classifies it `Refused`,
 * retryability `terminal` (platform `error-classification.ts`).
 *
 * A refusal is a decision about inputs the run already holds: the recorded
 * proposal, the requester, the base revision. Retrying or resuming re-runs
 * the same step over the same inputs and decides the same way, so the run
 * page offers neither; the person changes the ask and starts a new run. An
 * outage (model unavailable, timeout, network) stays retryable.
 */
export declare const REFUSAL_CODES: readonly ['constraint-not-met', 'forbidden', 'revision-conflict', 'invalid-request'];
export type RefusalCode = (typeof REFUSAL_CODES)[number];
export interface RunRefusal {
    /** The code the step refused with; `refused` when the platform said Refused without a code we know. */
    code: RefusalCode | 'refused';
    /** The refusal, verbatim, as the step wrote it. */
    message: string;
    /** The step that refused, when known. */
    nodeId?: string;
}
/** The refusal code in a failure message, or null: `403 Forbidden` mid-sentence is not one. */
export declare function refusalCodeOf(message: string | null | undefined): RefusalCode | null;
/**
 * The refusal a failed run ended with, or null when it failed some other
 * way (or did not fail). Reads the platform's category first, then its
 * retryability, then the message — a row written before the category
 * existed still reads right.
 */
export declare function runRefusal(run: Pick<PipelineRun, 'status' | 'error'> | null | undefined): RunRefusal | null;
/**
 * The refusal a failed STEP ended with, or null. A step carries its
 * category per attempt (`attempts[].errorCategory`), so the latest attempt
 * decides; the step's own `error` string is read for a refusal code the
 * same way a run's message is.
 */
export declare function stepRefusal(step: Pick<StepExecution, 'nodeId' | 'status' | 'error' | 'attempts'> | null | undefined): RunRefusal | null;
/** Why the run page offers no retry or resume for a refused run. */
export declare function refusalNotRetryableReason(refusal: RunRefusal): string;
/**
 * A run that failed because the model could not sign in (the platform's
 * `ModelAuth`: missing or expired credentials). Terminal like a refusal —
 * retrying fails the same way — but nothing about the request was wrong.
 */
export declare function runModelAuth(run: Pick<PipelineRun, 'status' | 'error'> | null | undefined): boolean;
/** Why the run page offers no retry or resume for a model sign-in failure. */
export declare const MODEL_AUTH_NOT_RETRYABLE = "The model could not sign in \u2014 its credentials are missing or expired. Retrying fails the same way until an operator refreshes them; then start the run again.";
//# sourceMappingURL=runRefusal.d.ts.map