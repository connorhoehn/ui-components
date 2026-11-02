// ProcedureSteps — a procedure's ordered steps, drawn once: in a guide's body
// ("What to do: 1 Rerun the failing test…") and, with outcomes, in its Runs
// tab ("✓ 1 Keep the SAML shim / ✓ 2 Confirm sessions / ! 3 Flip one tenant /
// ○ 4 Roll back — Not reached in this run.").
//
// A step with no `status` shows its number in a soft disc. A step WITH a
// status shows the outcome marker instead (done ✓, failed !, pending ○,
// skipped a dashed ○) and keeps its number as text beside the title when
// `numbered`, so "stopped at step 3" still reads off the list. Each marker
// carries its outcome in words for a screen reader; the glyph is decoration.
//
// Static by default. `onSelectStep` turns each title into a button (a host
// that opens a step's evidence).

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import VisuallyHidden from '../shared/VisuallyHidden';

export type ProcedureStepStatus = 'done' | 'failed' | 'pending' | 'skipped';

export interface ProcedureStep {
  id: string;
  title: ReactNode;
  /** Longer instruction under the title. */
  body?: ReactNode;
  /** The latest outcome for this step. Absent: no run has reached a verdict — the number is shown. */
  status?: ProcedureStepStatus;
  /** A quiet line under the step — "Not reached in this run.", the failure reason. */
  note?: ReactNode;
}

export interface ProcedureStepsProps {
  steps: ProcedureStep[];
  /** Show step numbers. Default `true`. */
  numbered?: boolean;
  /** `sm` 13px text, 20px markers (an inspector); `md` (default) 14px, 24px markers (a record body). */
  size?: 'sm' | 'md';
  onSelectStep?: (id: string) => void;
  /** Shown when `steps` is empty. Default "No steps recorded". */
  emptyLabel?: string;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

/** What each outcome marker says to a screen reader (and a host's legend). */
export const PROCEDURE_STEP_STATUS_LABELS: Record<ProcedureStepStatus, string> = {
  done: 'Done',
  failed: 'Failed',
  pending: 'Not reached',
  skipped: 'Skipped',
};

const MARKER_SIZE = { sm: 'h-5 w-5 text-[11px]', md: 'h-6 w-6 text-[12px]' } as const;
const GLYPH_SIZE = { sm: 10, md: 12 } as const;

function CheckGlyph({ size }: { size: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6.2 L5 8.6 L9.5 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Marker({ step, index, size }: { step: ProcedureStep; index: number; size: 'sm' | 'md' }) {
  const base = cn('inline-flex shrink-0 items-center justify-center rounded-full font-semibold leading-none', MARKER_SIZE[size]);
  switch (step.status) {
    case 'done':
      return <span aria-hidden="true" className={cn(base, 'bg-success text-white')}><CheckGlyph size={GLYPH_SIZE[size]} /></span>;
    case 'failed':
      return <span aria-hidden="true" className={cn(base, 'bg-danger text-white')}>!</span>;
    case 'pending':
      return <span aria-hidden="true" className={cn(base, 'border-[1.5px] border-border-emphasis bg-surface')} />;
    case 'skipped':
      return <span aria-hidden="true" className={cn(base, 'border-[1.5px] border-dashed border-border-emphasis bg-surface')} />;
    default:
      return <span aria-hidden="true" className={cn(base, 'bg-neutral-bg text-text-secondary')}>{index + 1}</span>;
  }
}

export function ProcedureSteps({
  steps,
  numbered = true,
  size = 'md',
  onSelectStep,
  emptyLabel = 'No steps recorded',
  className,
  'aria-label': ariaLabel,
  'data-testid': testId = 'procedure-steps',
}: ProcedureStepsProps) {
  const text = size === 'sm' ? 'text-[13px]' : 'text-[14px]';
  const meta = size === 'sm' ? 'text-[12px]' : 'text-[13px]';

  if (steps.length === 0) {
    return <p className={cn('m-0 text-text-tertiary', meta, className)} data-testid={`${testId}-empty`}>{emptyLabel}</p>;
  }

  return (
    <ol
      className={cn('m-0 flex list-none flex-col p-0', size === 'sm' ? 'gap-2.5' : 'gap-3', className)}
      data-testid={testId}
      data-ui-procedure={size}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {steps.map((step, index) => {
        // The number stays readable text beside the title once a status
        // marker has taken the disc; without a status the disc IS the number.
        const numberText = numbered && step.status ? (
          <span className="shrink-0 tabular-nums text-text-secondary">{index + 1}</span>
        ) : null;
        const title = onSelectStep ? (
          <button
            type="button"
            onClick={() => onSelectStep(step.id)}
            className="min-w-0 cursor-pointer border-none bg-transparent p-0 text-left text-text-primary hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {step.title}
          </button>
        ) : (
          <span className="min-w-0 text-text-primary">{step.title}</span>
        );
        return (
          <li
            key={step.id}
            className="flex min-w-0 items-start gap-3"
            data-status={step.status ?? 'none'}
            data-testid={`${testId}-step-${step.id}`}
          >
            {numbered || step.status ? (
              <Marker step={step} index={index} size={size} />
            ) : (
              <span aria-hidden="true" className={cn('inline-flex shrink-0 items-center justify-center', MARKER_SIZE[size])}>
                <span className="h-1.5 w-1.5 rounded-full bg-text-tertiary" />
              </span>
            )}
            <div className={cn('flex min-w-0 flex-1 flex-col gap-0.5', size === 'sm' ? 'pt-px' : 'pt-0.5', text)}>
              <div className="flex min-w-0 items-baseline gap-2 leading-snug">
                {step.status && <VisuallyHidden>{`${PROCEDURE_STEP_STATUS_LABELS[step.status]}:`}</VisuallyHidden>}
                {numberText}
                {title}
              </div>
              {step.body != null && <div className={cn('leading-relaxed text-text-secondary', meta)}>{step.body}</div>}
              {step.note != null && (
                <div
                  className={cn('leading-snug', meta, step.status === 'failed' ? 'text-danger-fg' : 'text-text-tertiary')}
                  data-testid={`${testId}-note-${step.id}`}
                >
                  {step.note}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default ProcedureSteps;
