// DecisionPath (2.482.0) — the hairline path a multi-stage answer walks inside
// one response box: `Choose → Draft request → Confirm → Done`, completed steps
// ticked, the current step emphasised, an alternate branch (`Choose → Saved`)
// as its own list.
//
//   ✓ Choose → ② Draft request → ③ Confirm → ④ Done
//
// It is NOT `WorkflowStepper`: that is a page's readiness track (24px nodes,
// connector bars that fill as the workflow advances, one line that scrolls).
// This sits on one 12px line under a card's header and wraps, so a response
// box tells where a decision is without a second toolbar. Markers:
// `aria-current="step"` on the current step, `data-complete` on finished
// ones, `data-decision-path` on the list.

import { cn } from '../../lib/cn';
import { Text } from './Text';

/** Where a path stands: its labels and the 0-based current step. */
export interface DecisionPathState {
  steps: readonly string[];
  /** 0-based; steps before it are complete. Past the end: every step is complete. */
  current: number;
}

export interface DecisionPathProps extends DecisionPathState {
  /** Names the list for assistive tech. Default "Decision path". */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DecisionPath({ steps, current, className, 'aria-label': ariaLabel = 'Decision path', 'data-testid': testId = 'decision-path' }: DecisionPathProps) {
  return (
    <ol
      className={cn('m-0 flex min-w-0 list-none flex-wrap items-center gap-x-1.5 gap-y-1 p-0', className)}
      aria-label={ariaLabel}
      data-decision-path={current >= steps.length ? 'complete' : String(current)}
      data-testid={testId}
    >
      {steps.map((label, i) => {
        const complete = i < current;
        const active = i === current;
        return (
          <li
            key={`${label}-${i}`}
            className="flex min-w-0 items-center gap-1.5"
            aria-current={active ? 'step' : undefined}
            data-complete={complete || undefined}
            data-decision-step={label}
          >
            <span
              aria-hidden="true"
              className={cn(
                'inline-flex size-4.5 shrink-0 items-center justify-center rounded-full border text-xs leading-none tabular-nums',
                complete ? 'border-transparent bg-success-bg text-success-fg' : active ? 'border-primary text-primary' : 'border-border text-text-tertiary',
              )}
            >
              {complete ? <Check /> : i + 1}
            </span>
            <Text size="xs" weight={active ? 'semibold' : 'normal'} className={cn('min-w-0', active ? 'text-primary' : complete ? 'text-text-secondary' : 'text-text-tertiary')}>
              {label}
            </Text>
            {i < steps.length - 1 && <span aria-hidden="true" className="mx-0.5 text-xs text-text-tertiary">→</span>}
          </li>
        );
      })}
    </ol>
  );
}

export default DecisionPath;
