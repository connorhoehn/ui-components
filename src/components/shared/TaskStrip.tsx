// TaskStrip — one 30px line above a composer that says what the agent is
// doing right now: "Creating release-readiness deck · Editing slide 4".
//
// ## Phase, not a made-up percentage
//
// The handoff prototype animated a run to "45%". Nothing in the platform
// reports a percentage for a deck revision — `/api/deck/revise` is one
// request/response — so a number here would be invented. The strip therefore
// shows the PHASE the host knows (`status` + `phase`), and draws a bar only
// when the host passes a real `percent`. Without one there is no bar at all:
// an indeterminate shimmer would still read as "progress".
//
// ## Only the controls that do something
//
// Pause, Resume, Stop, Open and Dismiss each render only when their handler
// is passed. There is no pause route today; a strip that shows a pause button
// which does nothing is the failure this component exists to prevent.

import type { ReactNode, SVGProps } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { Button } from '../ui/Button';
import { CloseIcon } from '../ui/Icons';
import { ProgressBar } from './ProgressBar';

/** Where an agent task is. Shared by `TaskStrip` and `AgentTaskCard`. */
export type AgentTaskStatus = 'queued' | 'running' | 'paused' | 'awaiting' | 'done' | 'failed' | 'stopped';

/** The words for each status, as the strip and the card print them. */
export const AGENT_TASK_STATUS_LABELS: Record<AgentTaskStatus, string> = {
  queued: 'Starting',
  running: 'Running',
  paused: 'Paused',
  awaiting: 'Needs you',
  done: 'Done',
  failed: 'Failed',
  stopped: 'Stopped',
};

/** Dot colour per status. `running` pulses unless the reader asked for less motion. */
export const AGENT_TASK_STATUS_DOT: Record<AgentTaskStatus, string> = {
  queued: 'bg-info',
  running: 'bg-info animate-pulse motion-reduce:animate-none',
  paused: 'bg-warning',
  awaiting: 'bg-warning',
  done: 'bg-success',
  failed: 'bg-danger',
  stopped: 'bg-border-emphasis',
};

export interface TaskStripProps {
  /** What the task is — "Creating release-readiness deck". */
  label: string;
  status: AgentTaskStatus;
  /** What it is doing now — "Editing slide 4". Replaces the status word when given. */
  phase?: string;
  /**
   * A REAL completion percentage from the run, 0–100. Omit when the source
   * does not report one; the strip then shows no bar rather than a guess.
   */
  percent?: number;
  /** Leading glyph. Defaults to a status dot. */
  icon?: ReactNode;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  /** "Open run" — jump to the run's full view. */
  onOpen?: () => void;
  /** Hide the strip. The task keeps running. */
  onDismiss?: () => void;
  className?: string;
  'data-testid'?: string;
}

function PauseGlyph(props: Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="4" y="3" width="3" height="10" rx="0.75" />
      <rect x="9" y="3" width="3" height="10" rx="0.75" />
    </svg>
  );
}

function PlayGlyph(props: Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5 3.2v9.6a.6.6 0 0 0 .9.5l7.4-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" />
    </svg>
  );
}

function StopGlyph(props: Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="9" height="9" rx="1.25" />
    </svg>
  );
}

/** A percentage the strip is willing to print: finite, clamped, rounded. */
export function taskPercent(percent: number | undefined): number | null {
  if (typeof percent !== 'number' || !Number.isFinite(percent)) return null;
  return Math.round(Math.max(0, Math.min(100, percent)));
}

export function TaskStrip({
  label,
  status,
  phase,
  percent,
  icon,
  onPause,
  onResume,
  onStop,
  onOpen,
  onDismiss,
  className,
  'data-testid': testId = 'task-strip',
}: TaskStripProps) {
  const pct = taskPercent(percent);
  const live = status === 'running' || status === 'queued' || status === 'paused' || status === 'awaiting';
  const detail = phase ?? AGENT_TASK_STATUS_LABELS[status];

  return (
    <div
      data-testid={testId}
      data-status={status}
      aria-busy={status === 'running' || status === 'queued' || undefined}
      className={cn(
        'flex h-[30px] min-w-0 items-center gap-2 rounded-t-lg border border-b-0 border-border bg-surface px-2 text-xs',
        className,
      )}
    >
      {icon ?? <span aria-hidden="true" className={cn('inline-block h-1.5 w-1.5 shrink-0 rounded-full', AGENT_TASK_STATUS_DOT[status])} />}
      {/* One polite live region for the words: the phase changing IS the news. */}
      <p role="status" aria-live="polite" className="m-0 flex min-w-0 shrink items-center gap-1 truncate" data-testid={`${testId}-label`}>
        <span className="truncate font-semibold text-text-primary">{label}</span>
        <span aria-hidden="true" className="text-text-tertiary">·</span>
        <span className="truncate text-text-secondary" data-testid={`${testId}-phase`}>{detail}</span>
        {pct !== null && (
          <span className="shrink-0 text-text-secondary" data-testid={`${testId}-percent`}>· {pct}%</span>
        )}
      </p>
      {pct !== null ? (
        <ProgressBar
          value={pct}
          size="sm"
          aria-label={`${label}: ${pct}%`}
          className="min-w-[3rem] flex-1"
          data-testid={`${testId}-bar`}
        />
      ) : (
        <span className="flex-1" aria-hidden="true" />
      )}
      <span className="flex shrink-0 items-center gap-0.5">
        {onOpen && (
          <Button variant="ghost" size="sm" onClick={onOpen} data-testid={`${testId}-open`}>Open run</Button>
        )}
        {status === 'paused' && onResume && (
          <IconButton size="sm" aria-label="Resume task" title="Resume" onClick={onResume} data-testid={`${testId}-resume`}>
            <PlayGlyph />
          </IconButton>
        )}
        {live && status !== 'paused' && onPause && (
          <IconButton size="sm" aria-label="Pause task" title="Pause" onClick={onPause} data-testid={`${testId}-pause`}>
            <PauseGlyph />
          </IconButton>
        )}
        {live && onStop && (
          <IconButton size="sm" aria-label="Stop task" title="Stop" onClick={onStop} data-testid={`${testId}-stop`}>
            <StopGlyph />
          </IconButton>
        )}
        {onDismiss && (
          <IconButton size="sm" aria-label="Hide task strip" title="Hide" onClick={onDismiss} data-testid={`${testId}-dismiss`}>
            <CloseIcon size={12} />
          </IconButton>
        )}
      </span>
    </div>
  );
}

export default TaskStrip;
