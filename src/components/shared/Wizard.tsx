// Wizard — a numbered step rail beside a content pane, with a Back/Next/
// Finish footer. Fully controlled: the caller owns `activeKey` via `onStep`,
// and a step's own `canAdvance` (default true) gates Next/Finish without the
// wizard needing to know anything about what makes a step valid.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface WizardStep {
  key: string;
  label: string;
  content: ReactNode;
  /** Default true. false disables Next/Finish while this step is active. */
  canAdvance?: boolean;
}

export interface WizardProps {
  steps: WizardStep[];
  activeKey: string;
  onStep: (key: string) => void;
  onFinish?: () => void;
  finishLabel?: string;
  className?: string;
  'data-testid'?: string;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wizard({
  steps,
  activeKey,
  onStep,
  onFinish,
  finishLabel = 'Finish',
  className,
  'data-testid': testId = 'wizard',
}: WizardProps) {
  const activeIndex = steps.findIndex((s) => s.key === activeKey);
  const active = activeIndex >= 0 ? steps[activeIndex] : steps[0];
  const canAdvance = active?.canAdvance ?? true;
  const isLast = activeIndex === steps.length - 1;

  const goBack = () => {
    if (activeIndex > 0) onStep(steps[activeIndex - 1].key);
  };
  const goNext = () => {
    if (!canAdvance) return;
    if (isLast) onFinish?.();
    else onStep(steps[activeIndex + 1].key);
  };

  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row', className)} data-testid={testId}>
      <ol className="flex flex-shrink-0 flex-col gap-1 sm:w-56" data-testid={`${testId}-rail`}>
        {steps.map((step, idx) => {
          const isDone = idx < activeIndex;
          const isActive = step.key === activeKey;
          return (
            <li key={step.key}>
              <button
                type="button"
                onClick={() => onStep(step.key)}
                aria-current={isActive ? 'step' : undefined}
                data-testid={`${testId}-step-${step.key}`}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors',
                  isActive ? 'bg-surface-hover font-semibold text-text-primary' : 'text-text-secondary hover:bg-surface-hover',
                )}
              >
                <span
                  className={cn(
                    'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold',
                    isDone
                      ? 'bg-success text-white'
                      : isActive
                        ? 'border-2 border-info bg-info-bg text-info-fg'
                        : 'border border-border bg-surface-inset text-text-tertiary',
                  )}
                >
                  {isDone ? <CheckIcon /> : idx + 1}
                </span>
                <span className="truncate">{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="min-w-0 flex-1" data-testid={`${testId}-content`}>
          {active?.content}
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
          <button
            type="button"
            onClick={goBack}
            disabled={activeIndex <= 0}
            data-testid={`${testId}-back`}
            className="rounded-md px-3 py-1.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canAdvance}
            data-testid={`${testId}-next`}
            className="rounded-md bg-primary px-3.5 py-1.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLast ? finishLabel : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wizard;
