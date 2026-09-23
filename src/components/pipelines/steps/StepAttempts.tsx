// StepAttempts — the per-attempt retry history of a single pipeline step.
//
// `StepExecution` keeps its top-level status/error/timing fields pointed at the
// LATEST attempt, which is why a step that failed twice and then succeeded
// looks, everywhere in the product, exactly like a step that succeeded first
// try. The only retry signal that existed anywhere was a `×N` count chip in
// StepTimeline. This renders the history those counts are hiding: what each
// attempt did, why it failed, and how long the executor waited before trying
// again.
//
// The rows are deliberately not uniform. The last attempt is the one whose
// outcome the step reports; the earlier ones are history, so they are rendered
// quieter (inset, secondary text) and the final one sits on the plain surface
// with a "final" marker. N identical rows would make the reader count.

import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import Chip, { type ChipTone } from '../../shared/Chip';
import { DetailSection } from '../../shared/DetailSection';
import type { ErrorCategory, StepAttempt } from '../../../types/pipeline';

export interface StepAttemptsProps {
  attempts: StepAttempt[];
  className?: string;
}

/**
 * Human duration. Sub-second stays in ms (a 400ms attempt reads as fast);
 * anything longer goes to seconds with the trailing `.0` trimmed, so a 2000ms
 * backoff reads "2s" rather than "2.0s". Minutes once we pass a minute,
 * because a 90000ms backoff as "90s" makes the reader do the division.
 */
function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60_000) return `${Number((ms / 1000).toFixed(1))}s`;
  const mins = Math.floor(ms / 60_000);
  const secs = Math.round((ms % 60_000) / 1000);
  return secs === 0 ? `${mins}m` : `${mins}m ${secs}s`;
}

/**
 * Tone for an error category. Transient categories (the ones a retry can
 * plausibly fix) read as warnings; deterministic ones — a bad payload, a
 * registry conflict — read as danger, because retrying those was never going
 * to help and that is the useful thing for an operator to notice.
 */
const CATEGORY_TONE: Record<ErrorCategory, ChipTone> = {
  NetworkError: 'warning',
  TimeoutError: 'warning',
  LLMError: 'warning',
  ValidationError: 'danger',
  RegistryConflict: 'danger',
  Refused: 'caution',
  UnknownError: 'neutral',
};

/** An attempt failed iff it carries an error; everything else succeeded. */
// An attempt that failed carries an `error` — even an empty one. A thrown
// value with no message (an AggregateError from a refused connection) used to
// make three failures read as three successes, and the whole history as
// "succeeded on attempt 3 after 0 failures" over a step that never did.
function isFailed(attempt: StepAttempt): boolean {
  return attempt.error != null;
}

function AttemptRow({
  attempt,
  isLast,
}: {
  attempt: StepAttempt;
  isLast: boolean;
}) {
  const failed = isFailed(attempt);
  const tone: ChipTone = failed ? 'danger' : 'success';
  const categoryTone: ChipTone =
    attempt.errorCategory != null ? CATEGORY_TONE[attempt.errorCategory] ?? 'neutral' : 'neutral';

  return (
    <li
      data-testid={`step-attempt-${attempt.attemptNumber}`}
      data-final={isLast ? 'true' : 'false'}
      className={cn(
        'rounded-md border px-3 py-2',
        isLast
          ? 'border-border bg-surface'
          : 'border-border bg-surface-inset opacity-90 hover:opacity-100 hover:bg-surface-hover',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'text-[11px] font-semibold',
            isLast ? 'text-text-primary' : 'text-text-secondary',
          )}
        >
          Attempt {attempt.attemptNumber}
        </span>
        <Chip tone={tone} size="xs" uppercase>
          {failed ? 'failed' : 'succeeded'}
        </Chip>
        {isLast && (
          <Chip tone="info" size="xs" uppercase>
            final
          </Chip>
        )}
        <span className="ml-auto text-[11px] text-text-tertiary">
          {attempt.durationMs != null ? formatDuration(attempt.durationMs) : '—'}
        </span>
      </div>

      {failed && (
        <div className="mt-1.5 flex flex-col gap-1.5">
          {attempt.errorCategory != null && (
            <div>
              <Chip tone={categoryTone} size="xs" mono>
                {attempt.errorCategory}
              </Chip>
            </div>
          )}
          <div className="rounded-md border border-danger-border bg-danger-bg px-2.5 py-1.5 text-[11px] font-mono whitespace-pre-wrap break-words text-danger-fg">
            {attempt.error || 'Failed without a message'}
          </div>
        </div>
      )}

      {attempt.retryAfterMs != null && (
        // The raw number is meaningless to a reader; the sentence is the point.
        <div className="mt-1.5 text-[11px] text-text-secondary">
          Waited {formatDuration(attempt.retryAfterMs)} before retrying
        </div>
      )}

      <div className="mt-1.5 truncate text-[10px] font-mono text-text-tertiary" title={attempt.idempotencyKey}>
        {attempt.idempotencyKey}
      </div>
    </li>
  );
}

export function StepAttempts({ attempts, className }: StepAttemptsProps) {
  // Render nothing for a step with no history worth a section: no attempts at
  // all (a row persisted before attempts[] existed), or exactly one attempt
  // that succeeded — "it worked first try" is already what the step header
  // says, and an empty titled box is pure noise on the common path.
  if (attempts.length === 0) return null;
  if (attempts.length === 1 && !isFailed(attempts[0]!)) return null;

  // Copy before sorting: the caller's array is not ours to reorder in place.
  const ordered = [...attempts].sort((a, b) => a.attemptNumber - b.attemptNumber);
  const last = ordered[ordered.length - 1]!;
  const failures = ordered.filter(isFailed).length;

  const hint: ReactNode = isFailed(last)
    ? `${ordered.length} attempt${ordered.length === 1 ? '' : 's'}, all failed`
    : `succeeded on attempt ${last.attemptNumber} after ${failures} failure${failures === 1 ? '' : 's'}`;

  return (
    <DetailSection
      first
      title="Retry history"
      hint={hint}
      className={cn(className)}
      data-testid="step-attempts"
    >
      <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
        {ordered.map((attempt, i) => (
          <AttemptRow
            key={`${attempt.attemptNumber}-${attempt.idempotencyKey}`}
            attempt={attempt}
            isLast={i === ordered.length - 1}
          />
        ))}
      </ol>
    </DetailSection>
  );
}

export default StepAttempts;
