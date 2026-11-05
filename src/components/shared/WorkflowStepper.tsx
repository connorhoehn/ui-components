// WorkflowStepper — a horizontal strip of named steps: done (check), active
// (filled dot), todo (outline), joined by connector lines that fill in as the
// workflow advances. Scrolls horizontally rather than wrapping, so a 6+ step
// workflow stays one line on a narrow pane.
//
// Compact (since 2.440.0, the compact density's form): a content-width track
// on the app's meta step — 16px nodes, 12/600 labels, short fixed connectors —
// that sits inline in a stat line or a table cell, scrolling only when it
// outgrows its container ("L1 ✓ — L2 ● — L3 ○", the
// scorecard's level track) instead of stretching to its container.

import { cn } from '../../lib/cn';
import type { ReactNode } from 'react';
import { useDensity, warnDeprecatedSize } from './Density';

export interface WorkflowStep {
  step: number;
  label: string;
  done: boolean;
  active: boolean;
  /** Supporting timestamp or explanation, below the milestone label. */
  description?: ReactNode;
  /** Terminal outcomes must not look like successful completion. */
  outcome?: 'failed' | 'cancelled';
}

export interface WorkflowStepperProps {
  steps: WorkflowStep[];
  /**
   * Default: the density's — `compact` under `DensityProvider density="compact"`,
   * else `md`. `sm` (10px labels, off the app's scale) is deprecated since
   * 2.440.0; `compact` and `md` stay as explicit overrides.
   */
  size?: 'sm' | 'md' | 'compact';
  /** Names the track for assistive tech ("Level L1 of target L3"). */
  'aria-label'?: string;
  /**
   * Wrap onto further rows instead of scrolling when the steps don't fit, so
   * no step is ever hidden past the track's edge. Default false (scrolls).
   */
  wrap?: boolean;
  className?: string;
  'data-testid'?: string;
}

type StepperSize = 'sm' | 'md' | 'compact';

const NODE_SIZE: Record<StepperSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  compact: 'h-4 w-4',
};

const LABEL_SIZE: Record<StepperSize, string> = {
  sm: 'text-[10px] font-medium leading-none',
  md: 'text-[11px] font-medium leading-none',
  compact: 'text-xs font-semibold leading-4',
};

function CheckIcon({ compact }: { compact: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={compact ? 'h-2.5 w-2.5' : 'h-3 w-3'} aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WorkflowStepper({ steps, size: sizeProp, wrap = false, className, 'aria-label': ariaLabel, 'data-testid': testId = 'workflow-stepper' }: WorkflowStepperProps) {
  const density = useDensity();
  if (sizeProp === 'sm') warnDeprecatedSize('WorkflowStepper', 'sm');
  const size: StepperSize = sizeProp ?? (density === 'compact' ? 'compact' : 'md');
  const compact = size === 'compact';
  const detailed = steps.some(step => step.description != null);
  return (
    <ol
      className={cn(detailed || compact ? 'm-0 inline-flex w-fit max-w-full list-none p-0' : 'flex', wrap ? 'flex-wrap gap-y-2' : 'overflow-x-auto', detailed ? 'items-start' : 'items-center', className)}
      {...(wrap ? { 'data-wrap': '' } : {})}
      data-testid={testId}
      {...(compact ? { 'data-density': 'compact' } : {})}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const next = steps[idx + 1];
        const connectorClass = step.done
          ? next?.done
            ? 'bg-success'
            : 'bg-gradient-to-r from-success to-success/30'
          : 'bg-border';
        const state = step.outcome ?? (step.done ? 'done' : step.active ? 'active' : 'pending');
        const node = <div className={cn('flex flex-shrink-0 items-center justify-center rounded-full transition-colors', NODE_SIZE[size],
          step.outcome === 'failed' ? 'border-2 border-danger bg-danger-bg text-danger'
            : step.outcome === 'cancelled' ? 'border-2 border-border bg-surface-inset text-text-secondary'
              : step.done ? 'bg-success text-white'
                : step.active ? cn(compact ? 'border-[1.5px]' : 'border-2', 'border-info bg-info-bg')
                  : 'border border-border bg-surface-inset')}>
          {step.outcome ? <span className={cn('rounded-full', step.outcome === 'failed' ? 'bg-danger' : 'bg-text-secondary', compact ? 'h-1.5 w-1.5' : 'h-2 w-2')} />
            : step.done ? <CheckIcon compact={compact} /> : step.active ? <span className={cn('rounded-full bg-info', compact ? 'h-1.5 w-1.5' : 'h-2 w-2')} /> : null}
        </div>;
        const label = <span className={cn(detailed ? 'block text-xs font-semibold leading-4' : LABEL_SIZE[size],
          step.active ? 'text-text-primary' : step.done ? 'text-text-secondary' : 'text-text-tertiary')}>{step.label}</span>;
        if (detailed) return <li key={step.step} aria-current={step.active ? 'step' : undefined} data-state={state}
          className={cn('shrink-0', compact ? 'w-32' : 'w-40')}>
          <div className="flex items-center">{node}{!isLast && <div aria-hidden="true" data-workflow-connector="" className={cn('h-0.5 flex-1', connectorClass)} />}</div>
          <div className="mt-2 pr-3 space-y-1">{label}
            {step.description != null && <div data-ui-text="workflow-step-description" className="text-xs text-text-secondary leading-5 break-words">{step.description}</div>}
          </div>
        </li>;
        return <li key={step.step} aria-current={step.active ? 'step' : undefined} data-state={state}
          className={compact ? 'flex items-center' : 'flex flex-1 items-center last:flex-none'}>
          <div className={cn('flex items-center whitespace-nowrap', compact ? 'gap-1' : 'gap-1.5')}>{node}{label}</div>
          {!isLast && <div aria-hidden="true" className={cn(compact ? 'mx-2 h-0.5 w-3' : 'mx-2 h-1 flex-1', 'rounded-full transition-colors', connectorClass)} />}
        </li>;
      })}
    </ol>
  );
}

export default WorkflowStepper;
