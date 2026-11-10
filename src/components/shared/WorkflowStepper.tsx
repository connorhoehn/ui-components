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
//
// Vertical (since 2.512.0, `orientation="vertical"`): a timeline down the
// page. Each step is a row — the marker, joined to the next by a vertical
// connector that fills as the workflow advances, then the label, its one
// fact (`description`: "Mina (proposed)") and, on the active step only, its
// `action` (the step's next move, a Button).

import { cn } from '../../lib/cn';
import type { ReactNode } from 'react';
import { useDensity, warnDeprecatedSize } from './Density';

export interface WorkflowStep {
  step: number;
  label: string;
  done: boolean;
  active: boolean;
  /**
   * Supporting timestamp or explanation, below the milestone label. In the
   * vertical orientation this is the step's one fact ("Mina (proposed)").
   */
  description?: ReactNode;
  /**
   * Vertical orientation only (2.512.0): the step's next move — a library
   * `Button` — drawn under its label while the step is `active`. Ignored on
   * other steps and in the horizontal strip.
   */
  action?: ReactNode;
  /** Terminal outcomes must not look like successful completion. */
  outcome?: 'failed' | 'cancelled';
}

export interface WorkflowStepperProps {
  steps: WorkflowStep[];
  /**
   * Default: the density's — `compact` under `DensityProvider density="compact"`,
   * else `md`. `sm` is deprecated since 2.440.0 (it still draws a 20px marker;
   * since 2.516.2 its label is 12px, as `md`'s, was 10px); `compact` and `md`
   * stay as explicit overrides. Every size puts the label 4px from its marker
   * (2.516.2; `sm` and `md` were 6px).
   */
  size?: 'sm' | 'md' | 'compact';
  /** Names the track for assistive tech ("Level L1 of target L3"). */
  'aria-label'?: string;
  /**
   * Wrap onto further rows instead of scrolling when the steps don't fit, so
   * no step is ever hidden past the track's edge. Default false (scrolls).
   */
  wrap?: boolean;
  /**
   * `horizontal` (default): the strip. `vertical` (2.512.0): a timeline, one
   * row per step with its fact and, on the active step, its `action`.
   * `data-orientation` on the root.
   */
  orientation?: 'horizontal' | 'vertical';
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
  // 12px on a 16px line since 2.516.2 (sm was 10px, md 11px, both on a 1.0 line).
  sm: 'text-xs font-medium leading-4',
  md: 'text-xs font-medium leading-4',
  compact: 'text-xs font-semibold leading-4',
};

function CheckIcon({ compact }: { compact: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={compact ? 'h-2.5 w-2.5' : 'h-3 w-3'} aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepMarker({ step, size }: { step: WorkflowStep; size: StepperSize }) {
  const compact = size === 'compact';
  return (
    <div data-workflow-marker={step.outcome ?? (step.done ? 'done' : step.active ? 'active' : 'todo')}
      className={cn('flex flex-shrink-0 items-center justify-center rounded-full transition-colors', NODE_SIZE[size],
        step.outcome === 'failed' ? 'border-2 border-danger bg-danger-bg text-danger'
          : step.outcome === 'cancelled' ? 'border-2 border-border bg-surface-inset text-text-secondary'
            : step.done ? 'bg-success text-white'
              : step.active ? cn(compact ? 'border-[1.5px]' : 'border-2', 'border-info bg-info-bg')
                : 'border border-border bg-surface-inset')}>
      {step.outcome ? <span className={cn('rounded-full', step.outcome === 'failed' ? 'bg-danger' : 'bg-text-secondary', compact ? 'h-1.5 w-1.5' : 'h-2 w-2')} />
        : step.done ? <CheckIcon compact={compact} /> : step.active ? <span className={cn('rounded-full bg-info', compact ? 'h-1.5 w-1.5' : 'h-2 w-2')} /> : null}
    </div>
  );
}

/** How much of the connector after `step` is filled: both ends done, done into the next, or not yet. */
function connectorFill(step: WorkflowStep, next: WorkflowStep | undefined): 'full' | 'partial' | 'none' {
  return step.done ? (next?.done ? 'full' : 'partial') : 'none';
}

function VerticalStepper({ steps, size, className, ariaLabel, testId }: { steps: WorkflowStep[]; size: StepperSize; className?: string; ariaLabel?: string; testId: string }) {
  return (
    <ol className={cn('m-0 flex min-w-0 list-none flex-col p-0', className)} data-orientation="vertical" data-testid={testId}
      {...(size === 'compact' ? { 'data-density': 'compact' } : {})}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}>
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const fill = connectorFill(step, steps[idx + 1]);
        const state = step.outcome ?? (step.done ? 'done' : step.active ? 'active' : 'pending');
        return (
          <li key={step.step} aria-current={step.active ? 'step' : undefined} data-state={state} className="flex min-w-0 gap-3">
            <div className="flex flex-shrink-0 flex-col items-center">
              <StepMarker step={step} size={size} />
              {!isLast && <div aria-hidden="true" data-workflow-connector={fill}
                className={cn('my-1 min-h-4 w-0.5 flex-1 rounded-full transition-colors',
                  fill === 'full' ? 'bg-success' : fill === 'partial' ? 'bg-gradient-to-b from-success to-success/30' : 'bg-border')} />}
            </div>
            <div className={cn('flex min-w-0 flex-1 flex-col gap-1', !isLast && 'pb-4')}>
              <span className={cn('text-sm font-medium leading-6',
                step.active ? 'text-text-primary' : step.done ? 'text-text-secondary' : 'text-text-tertiary')}>{step.label}</span>
              {step.description != null && <div data-ui-text="workflow-step-description" className="min-w-0 break-words text-xs leading-5 text-text-secondary">{step.description}</div>}
              {step.active && step.action != null && <div data-workflow-action="" className="mt-1 flex min-w-0 flex-wrap items-center gap-2">{step.action}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function WorkflowStepper({ steps, size: sizeProp, wrap = false, orientation = 'horizontal', className, 'aria-label': ariaLabel, 'data-testid': testId = 'workflow-stepper' }: WorkflowStepperProps) {
  const density = useDensity();
  if (sizeProp === 'sm') warnDeprecatedSize('WorkflowStepper', 'sm');
  const size: StepperSize = sizeProp ?? (density === 'compact' ? 'compact' : 'md');
  const compact = size === 'compact';
  if (orientation === 'vertical') return <VerticalStepper steps={steps} size={size} className={className} ariaLabel={ariaLabel} testId={testId} />;
  const detailed = steps.some(step => step.description != null);
  return (
    <ol
      className={cn(detailed || compact ? 'm-0 inline-flex w-fit max-w-full list-none p-0' : 'flex', wrap ? 'flex-wrap gap-y-2' : 'overflow-x-auto', detailed ? 'items-start' : 'items-center', className)}
      {...(wrap ? { 'data-wrap': '' } : {})}
      data-orientation="horizontal"
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
        const node = <StepMarker step={step} size={size} />;
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
          <div className="flex items-center gap-1 whitespace-nowrap" data-workflow-step-head="">{node}{label}</div>
          {!isLast && <div aria-hidden="true" className={cn(compact ? 'mx-2 h-0.5 w-3' : 'mx-2 h-1 flex-1', 'rounded-full transition-colors', connectorClass)} />}
        </li>;
      })}
    </ol>
  );
}

export default WorkflowStepper;
