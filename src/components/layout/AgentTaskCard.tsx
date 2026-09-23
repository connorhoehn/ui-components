// AgentTaskCard — the "Current task" card at the top of a Workbench: what the
// agent was asked to do, where it is, and when it started.
//
// Same honesty rule as `TaskStrip`: the status and phase come from the host's
// real run, and the bar and percentage render ONLY when the host passes a real
// `percent`. The handoff prototype printed "45%" for a request/response call
// that reports no progress at all; this card will not.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ProgressBar } from '../shared/ProgressBar';
import { StatusPill, type StatusPillState } from '../shared/StatusPill';
import { AGENT_TASK_STATUS_LABELS, taskPercent, type AgentTaskStatus } from '../shared/TaskStrip';

export interface AgentTaskCardProps {
  /** "Build risk outlook slide". */
  title: string;
  status: AgentTaskStatus;
  /** Overrides the status pill's word ("Editing slide 4" stays in `phase`). */
  statusLabel?: string;
  /** The request, or what the agent is working from. */
  description?: ReactNode;
  /** What it is doing now — "Editing slide 4". */
  phase?: string;
  /** A REAL percentage, 0–100. Omit when the run reports none: no bar is drawn. */
  percent?: number;
  /** "Started 2m ago" — the host formats it, since it owns the clock. */
  startedLabel?: string;
  /** Buttons under the card body — Open run, Pause, Stop. */
  actions?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

const PILL: Record<AgentTaskStatus, StatusPillState> = {
  queued: 'pending',
  running: 'info',
  paused: 'warning',
  awaiting: 'warning',
  done: 'success',
  failed: 'error',
  stopped: 'neutral',
};

export function AgentTaskCard({
  title,
  status,
  statusLabel,
  description,
  phase,
  percent,
  startedLabel,
  actions,
  className,
  'data-testid': testId = 'agent-task-card',
}: AgentTaskCardProps) {
  const pct = taskPercent(percent);
  const footer = [startedLabel, phase].filter(Boolean).join(' · ');
  return (
    <section
      data-testid={testId}
      data-status={status}
      aria-label={`Current task: ${title}`}
      aria-busy={status === 'running' || status === 'queued' || undefined}
      className={cn('flex flex-col gap-2 rounded-lg border border-border bg-surface p-3', className)}
    >
      <div className="flex min-w-0 items-start gap-2">
        <h3 className="m-0 min-w-0 flex-1 text-sm font-semibold leading-snug text-text-primary">{title}</h3>
        <StatusPill state={PILL[status]} label={statusLabel ?? AGENT_TASK_STATUS_LABELS[status]} size="sm" data-testid={`${testId}-status`} />
      </div>
      {description != null && (
        <div className="text-xs leading-relaxed text-text-secondary" data-testid={`${testId}-description`}>{description}</div>
      )}
      {pct !== null && (
        <ProgressBar value={pct} size="sm" aria-label={`${title}: ${pct}%`} data-testid={`${testId}-bar`} />
      )}
      {(footer || pct !== null) && (
        <p role="status" aria-live="polite" className="m-0 flex items-center justify-between gap-2 text-[11px] text-text-tertiary" data-testid={`${testId}-meta`}>
          <span className="min-w-0 truncate">{footer}</span>
          {pct !== null && <span className="shrink-0 tabular-nums">{pct}%</span>}
        </p>
      )}
      {actions && <div className="flex flex-wrap items-center gap-1.5">{actions}</div>}
    </section>
  );
}

export default AgentTaskCard;
