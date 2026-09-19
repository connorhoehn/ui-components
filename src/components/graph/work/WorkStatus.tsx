import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { cn } from '../../../lib/cn';
import type { WorkGraphStatus, WorkStatusProps } from './types';

/**
 * The graph status is a statement about the source of the work. Sharing
 * freshness is intentionally a separate input: a completed item can remain
 * shared, while a running item with an old heartbeat must not look live.
 */
const STATUS_META: Record<
  WorkGraphStatus,
  { label: string; icon: string; tone: string }
> = {
  idle: { label: 'Idle', icon: '○', tone: 'text-text-secondary' },
  running: { label: 'Running', icon: '▶', tone: 'text-info-fg' },
  waiting: { label: 'Waiting', icon: '⏸', tone: 'text-warning-fg' },
  completed: { label: 'Completed', icon: '✓', tone: 'text-success-fg' },
  error: { label: 'Error', icon: '!', tone: 'text-danger-fg' },
  stopped: { label: 'Stopped', icon: '■', tone: 'text-text-tertiary' },
  stale: { label: 'Stale', icon: '◌', tone: 'text-warning-fg' },
};

/**
 * Compact, text-labelled status indicator for work graph nodes and edges.
 *
 * The animated marker is deliberately restricted to fresh, currently
 * running work. The status word and glyph remain present so state is never
 * conveyed by colour or motion alone.
 */
export function WorkStatus({
  status,
  sharingFresh = false,
  label,
  className,
}: WorkStatusProps) {
  const reduceMotion = usePrefersReducedMotion();
  const meta = STATUS_META[status];
  const displayLabel = label ?? meta.label;
  const isFreshRunning = status === 'running' && sharingFresh;
  const isPulsing = isFreshRunning && !reduceMotion;

  return (
    <span
      role="status"
      aria-label={label ? `${meta.label}: ${label}` : meta.label}
      data-status={status}
      data-sharing-fresh={sharingFresh ? 'true' : 'false'}
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium',
        meta.tone,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none',
          isPulsing && 'animate-pulse',
        )}
      >
        {meta.icon}
      </span>
      <span>{displayLabel}</span>
    </span>
  );
}

export default WorkStatus;
