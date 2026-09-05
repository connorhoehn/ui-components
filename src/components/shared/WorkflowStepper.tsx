// WorkflowStepper — a horizontal strip of named steps: done (check), active
// (filled dot), todo (outline), joined by connector lines that fill in as the
// workflow advances. Scrolls horizontally rather than wrapping, so a 6+ step
// workflow stays one line on a narrow pane.

import { cn } from '../../lib/cn';

export interface WorkflowStep {
  step: number;
  label: string;
  done: boolean;
  active: boolean;
}

export interface WorkflowStepperProps {
  steps: WorkflowStep[];
  size?: 'sm' | 'md';
  className?: string;
  'data-testid'?: string;
}

const NODE_SIZE: Record<'sm' | 'md', string> = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
};

const LABEL_SIZE: Record<'sm' | 'md', string> = {
  sm: 'text-[10px]',
  md: 'text-[11px]',
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WorkflowStepper({ steps, size = 'md', className, 'data-testid': testId = 'workflow-stepper' }: WorkflowStepperProps) {
  return (
    <ol
      className={cn('flex items-center overflow-x-auto', className)}
      data-testid={testId}
    >
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const next = steps[idx + 1];
        const connectorClass = step.done
          ? next?.done
            ? 'bg-success'
            : 'bg-gradient-to-r from-success to-success/30'
          : 'bg-border';
        return (
          <li
            key={step.step}
            aria-current={step.active ? 'step' : undefined}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <div
                className={cn(
                  'flex flex-shrink-0 items-center justify-center rounded-full transition-colors',
                  NODE_SIZE[size],
                  step.done
                    ? 'bg-success text-white'
                    : step.active
                      ? 'border-2 border-info bg-info-bg'
                      : 'border border-border bg-surface-inset',
                )}
              >
                {step.done ? <CheckIcon /> : step.active ? <span className="h-2 w-2 rounded-full bg-info" /> : null}
              </div>
              <span
                className={cn(
                  'font-medium leading-none',
                  LABEL_SIZE[size],
                  step.active ? 'text-text-primary' : step.done ? 'text-text-secondary' : 'text-text-tertiary',
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && <div className={cn('mx-2 h-1 flex-1 rounded-full transition-colors', connectorClass)} />}
          </li>
        );
      })}
    </ol>
  );
}

export default WorkflowStepper;
