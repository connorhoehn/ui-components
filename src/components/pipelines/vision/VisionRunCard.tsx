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
 *
 * The visual is intentionally small (~80px tall) so an activity log can
 * stack many of these without scrolling fatigue.
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
  const captionSnippet =
    result?.caption && result.caption.length > 96 ? `${result.caption.slice(0, 93)}…` : result?.caption;
  const topTags = (result?.tags ?? []).slice(0, 5);

  return (
    <article
      className={[
        'flex flex-col gap-1.5 rounded-md border bg-[var(--color-surface,#fff)] p-3 text-sm',
        status === 'running' ? 'border-indigo-300 ring-1 ring-indigo-200' : 'border-[var(--color-border,#e2e8f0)]',
        status === 'failed' ? 'border-red-300' : '',
        onOpen ? 'cursor-pointer hover:bg-[var(--color-surface-hover,#f8fafc)]' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onOpen}
    >
      <header className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted,#475569)]">
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
          <span className="font-mono text-[11px] text-[var(--color-text-muted,#94a3b8)]">
            {effectiveLatency.toFixed(0)}ms
          </span>
        ) : null}
        {runId ? (
          <span className="ml-auto truncate font-mono text-[10px] text-[var(--color-text-muted,#94a3b8)]">
            {runId}
          </span>
        ) : null}
      </header>
      {status === 'failed' && error ? (
        <p className="text-[13px] text-red-700">{error}</p>
      ) : (
        <p className="line-clamp-2 text-[13px] text-[var(--color-text,#0f172a)]">
          {captionSnippet ?? (status === 'running' ? 'Analyzing image…' : 'No caption produced.')}
        </p>
      )}
      {topTags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {topTags.map((t) => (
            <Chip key={t} tone="neutral" size="sm">#{t}</Chip>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default VisionRunCard;
