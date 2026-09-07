// frontend/src/components/pipelines/DiffMetadataHeader.tsx
//
// Header section showing Run A vs Run B metadata (status, duration, cost, started time).
// Extracted from PipelineRunDiff.tsx.

import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import type { PipelineRun, RunStatus } from '../../types/pipeline';
import { formatDate, formatDuration } from './utils/formatTime';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDelta(ms: number): string {
  if (ms === 0) return '0ms';
  const sign = ms > 0 ? '+' : '-';
  return `${sign}${formatDuration(Math.abs(ms))}`;
}

function runStatusVariant(s: RunStatus): ChipTone {
  switch (s) {
    case 'completed':         return 'success';
    case 'rejected':          return 'danger';
    case 'failed':            return 'danger';
    case 'cancelled':         return 'neutral';
    case 'awaiting_approval': return 'warning';
    case 'stuck':             return 'warning';
    case 'running':           return 'info';
    case 'pending':           return 'neutral';
    default:                  return 'neutral';
  }
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface DiffMetadataHeaderProps {
  runA: PipelineRun;
  runB: PipelineRun;
  costA: string;
  costB: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DiffMetadataHeader({
  runA,
  runB,
  costA,
  costB,
}: DiffMetadataHeaderProps) {
  const durationA = runA.durationMs ?? 0;
  const durationB = runB.durationMs ?? 0;
  const delta = durationB - durationA;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {/* Run A summary card */}
        <div
          className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs"
          data-testid="diff-run-a-summary"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            Run A
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-tertiary">
              {runA.id.slice(0, 8)}
            </span>
            <Chip tone={runStatusVariant(runA.status)}>
              {runA.status}
            </Chip>
          </div>
          <div className="text-xs text-text-secondary">
            {formatDate(runA.startedAt)}
          </div>
          <div className="font-mono text-xs">
            {formatDuration(runA.durationMs)} | {costA}
          </div>
          <div className="text-[11px] text-text-tertiary">
            Trigger: {runA.triggeredBy.userId ?? runA.triggeredBy.triggerType}
          </div>
        </div>

        {/* Run B summary card */}
        <div
          className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs"
          data-testid="diff-run-b-summary"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            Run B
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-tertiary">
              {runB.id.slice(0, 8)}
            </span>
            <Chip tone={runStatusVariant(runB.status)}>
              {runB.status}
            </Chip>
          </div>
          <div className="text-xs text-text-secondary">
            {formatDate(runB.startedAt)}
          </div>
          <div className="font-mono text-xs">
            {formatDuration(runB.durationMs)} | {costB}
          </div>
          <div className="text-[11px] text-text-tertiary">
            Trigger: {runB.triggeredBy.userId ?? runB.triggeredBy.triggerType}
          </div>
        </div>
      </div>

      {/* Duration delta strip */}
      <div
        className="flex items-center gap-4 rounded-md bg-surface-inset px-3.5 py-2.5"
        data-testid="diff-duration-delta"
      >
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
          Duration delta
        </span>
        <span
          className={cn(
            'font-mono text-sm font-bold',
            delta === 0
              ? 'text-text-secondary'
              : delta < 0
                ? 'text-success-fg'
                : 'text-danger-fg',
          )}
        >
          {formatDelta(delta)}
        </span>
        <span className="text-[11px] text-text-tertiary">
          ({delta < 0 ? 'faster' : delta > 0 ? 'slower' : 'same'} in Run B)
        </span>
      </div>
    </div>
  );
}
