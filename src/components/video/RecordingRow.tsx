// RecordingRow — single recording card. Presentational; pairs with
// RecordingList (and is used by any custom recordings layout).

import type { KeyboardEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type RecordingStatus = 'ready' | 'processing' | 'failed';

export interface RecordingRowProps {
  id: string;
  startIso: string;
  endIso?: string;
  durationSec: number;
  participantCount?: number;
  thumbnailUrl?: string;
  /** Optional human label — e.g. "Hank & Alice" or "Global hangout". */
  label?: string;
  /** Defaults to 'ready'. 'processing' shows a spinner badge; 'failed' shows an error badge. */
  status?: RecordingStatus;
  selected?: boolean;
  onClick?: (id: string) => void;
  /** Slot rendered in the row footer (e.g. a download or share button). */
  actions?: ReactNode;
  className?: string;
}

function formatDuration(sec: number): string {
  if (!isFinite(sec) || sec < 0) return '—';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function formatStart(iso: string): string {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(d);
  } catch {
    return iso;
  }
}

function StatusBadge({ status }: { status: RecordingStatus }) {
  if (status === 'ready') return null;
  if (status === 'processing') {
    return (
      <span
        data-testid="recording-row-status"
        data-status="processing"
        className="absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white inline-flex items-center gap-1"
      >
        <span className="size-1.5 rounded-full bg-[var(--color-state-pending,_#facc15)] animate-pulse" />
        Processing
      </span>
    );
  }
  return (
    <span
      data-testid="recording-row-status"
      data-status="failed"
      className="absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-[var(--color-state-error,_#dc2626)]/90 text-white"
    >
      Failed
    </span>
  );
}

export function RecordingRow({
  id,
  startIso,
  durationSec,
  participantCount,
  thumbnailUrl,
  label,
  status = 'ready',
  selected,
  onClick,
  actions,
  className,
}: RecordingRowProps) {
  const interactive = typeof onClick === 'function';

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick!(id);
    }
  };

  return (
    <div
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            onClick: () => onClick!(id),
            onKeyDown: handleKey,
            'aria-pressed': selected ?? false,
          }
        : {})}
      data-testid="recording-row"
      data-recording-id={id}
      data-status={status}
      className={cn(
        'text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors',
        interactive &&
          'cursor-pointer hover:border-[var(--color-primary)] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/60',
        selected
          ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40'
          : 'border-[var(--color-border)]',
        className,
      )}
    >
      <div className="relative aspect-video rounded bg-black overflow-hidden mb-2">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/30">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
        <StatusBadge status={status} />
        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums">
          {formatDuration(durationSec)}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">
          {label ?? formatStart(startIso)}
        </span>
        {typeof participantCount === 'number' && participantCount > 0 && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0">
            {participantCount} 👥
          </span>
        )}
      </div>
      {label && (
        <div className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
          {formatStart(startIso)}
        </div>
      )}
      {actions && (
        <div
          data-testid="recording-row-actions"
          className="mt-2 flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {actions}
        </div>
      )}
    </div>
  );
}

export default RecordingRow;
