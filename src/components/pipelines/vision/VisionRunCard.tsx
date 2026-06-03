import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import type { VisionResult } from './types';

export type VisionRunStatus = 'running' | 'completed' | 'failed';

export interface VisionRunCardProps {
  status: VisionRunStatus;
  /** Required when status === 'completed'. */
  result?: VisionResult;
  /** Optional run identifier displayed in the header. */
  runId?: string;
  /** Optional model / endpoint name override (falls back to result.model.endpointId). */
  endpointLabel?: string;
  error?: string;
  /** Latency in ms — shown in the header. Derived from result.model if absent. */
  latencyMs?: number;
  /** Click handler to expand into the full VisionResultViewer. */
  onOpen?: () => void;
  className?: string;
}

/**
 * Compact summary card for the activity stream. Shows endpoint + status +
 * a caption snippet + 3-4 top tags. Click to expand into the full
 * VisionResultViewer.
 */
export function VisionRunCard({
  status,
  result,
  runId,
  endpointLabel,
  error,
  latencyMs,
  onOpen,
  className,
}: VisionRunCardProps) {
  const endpoint = endpointLabel ?? result?.model?.endpointId ?? 'vision-model';
  const effectiveLatency = latencyMs ?? result?.model?.latencyMs;
  const caption = result?.caption;
  const topTags = (result?.tags ?? []).slice(0, 5);

  const body = (
    <>
      <header className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          {endpoint}
        </span>
        {status === 'running' ? (
          <Chip tone="info" size="sm">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" /> running
          </Chip>
        ) : status === 'completed' ? (
          <Chip tone="success" size="sm">ok</Chip>
        ) : (
          <Chip tone="danger" size="sm">failed</Chip>
        )}
        {typeof effectiveLatency === 'number' ? (
          <span className="font-mono text-[11px] text-text-tertiary">
            {effectiveLatency.toFixed(0)}ms
          </span>
        ) : null}
        {runId ? (
          <span className="ml-auto truncate font-mono text-[10px] text-text-tertiary">
            {runId}
          </span>
        ) : null}
      </header>
      {status === 'failed' && error ? (
        <p className="text-[13px] text-red-700">{error}</p>
      ) : (
        <p className="line-clamp-2 text-left text-[13px] text-text-primary">
          {caption ?? (status === 'running' ? 'Analyzing image…' : 'No caption produced.')}
        </p>
      )}
      {topTags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {topTags.map((t) => (
            <Chip key={t} tone="neutral" size="sm">#{t}</Chip>
          ))}
        </div>
      ) : null}
    </>
  );

  const baseClasses = cn(
    'flex w-full flex-col gap-1.5 rounded-lg border bg-surface p-3 text-sm text-left',
    status === 'running'
      ? 'border-indigo-300 ring-1 ring-indigo-200'
      : status === 'failed'
        ? 'border-red-300'
        : 'border-border',
  );

  if (onOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          baseClasses,
          'cursor-pointer transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1',
          className,
        )}
      >
        {body}
      </button>
    );
  }

  return (
    <article className={cn(baseClasses, className)}>
      {body}
    </article>
  );
}

export default VisionRunCard;
