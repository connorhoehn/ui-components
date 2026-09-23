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
export const REFUSAL_CODES = ['constraint-not-met', 'forbidden', 'revision-conflict', 'invalid-request'] as const;
export type RefusalCode = (typeof REFUSAL_CODES)[number];

export interface RunRefusal {
  /** The code the step refused with; `refused` when the platform said Refused without a code we know. */
  code: RefusalCode | 'refused';
  /** The refusal, verbatim, as the step wrote it. */
  message: string;
  /** The step that refused, when known. */
  nodeId?: string;
}

const REFUSAL_RE = new RegExp(`(?:^|: )[a-z][\\w-]* (${REFUSAL_CODES.join('|')}): `, 'i');

/** The refusal code in a failure message, or null: `403 Forbidden` mid-sentence is not one. */
export function refusalCodeOf(message: string | null | undefined): RefusalCode | null {
  if (!message) return null;
  const m = REFUSAL_RE.exec(message);
  return m ? (m[1].toLowerCase() as RefusalCode) : null;
}

/**
 * The refusal a failed run ended with, or null when it failed some other
 * way (or did not fail). Reads the platform's category first, then its
 * retryability, then the message — a row written before the category
 * existed still reads right.
 */
export function runRefusal(run: Pick<PipelineRun, 'status' | 'error'> | null | undefined): RunRefusal | null {
  if (!run || run.status !== 'failed' || !run.error) return null;
  const code = refusalCodeOf(run.error.message);
  const terminal = run.error.errorCategory === 'Refused' || run.error.retryability === 'terminal';
  if (!code && !terminal) return null;
  const nodeId = run.error.nodeId && run.error.nodeId !== 'unknown' ? run.error.nodeId : undefined;
  return { code: code ?? 'refused', message: run.error.message ?? '', ...(nodeId ? { nodeId } : {}) };
}

/**
 * The refusal a failed STEP ended with, or null. A step carries its
 * category per attempt (`attempts[].errorCategory`), so the latest attempt
 * decides; the step's own `error` string is read for a refusal code the
 * same way a run's message is.
 */
export function stepRefusal(
  step: Pick<StepExecution, 'nodeId' | 'status' | 'error' | 'attempts'> | null | undefined,
): RunRefusal | null {
  if (!step || step.status !== 'failed') return null;
  const last = step.attempts && step.attempts.length > 0 ? step.attempts[step.attempts.length - 1] : undefined;
  const message = step.error ?? last?.error;
  const code = refusalCodeOf(message);
  if (!code && last?.errorCategory !== 'Refused') return null;
  return { code: code ?? 'refused', message: message ?? '', nodeId: step.nodeId };
}

/** Why the run page offers no retry or resume for a refused run. */
export function refusalNotRetryableReason(refusal: RunRefusal): string {
  return `Refused (${refusal.code}): the step decided on the inputs this run already had, so retrying or resuming would refuse the same way. Change the request and start a new run.`;
}
