// RecordingList — vertical list of recording cards. Pure presentational
// shell — receives a flat array of items and an onSelect handler.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface RecordingListItem {
  id: string;
  startIso: string;
  endIso: string;
  durationSec: number;
  participantCount?: number;
  thumbnailUrl?: string;
  /** Optional human label — e.g. "Hank & Alice" or "Global hangout". */
  label?: string;
}

export interface RecordingListProps {
  recordings: RecordingListItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  loading?: boolean;
  emptyState?: ReactNode;
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

export function RecordingList({
  recordings,
  selectedId,
  onSelect,
  loading,
  emptyState,
  className,
}: RecordingListProps) {
  if (loading) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 animate-pulse"
          >
            <div className="aspect-video rounded bg-white/5 mb-2" />
            <div className="h-3 w-2/3 bg-white/5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (recordings.length === 0) {
    return (
      <div className={cn('rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center text-sm text-[var(--color-text-secondary)]', className)}>
        {emptyState ?? 'No recordings yet.'}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {recordings.map((r) => {
        const selected = r.id === selectedId;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r.id)}
            className={cn(
              'text-left rounded-lg border bg-[var(--color-surface)] p-3 transition-colors',
              'hover:border-[var(--color-primary)] hover:bg-white/[0.02]',
              selected
                ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40'
                : 'border-[var(--color-border)]',
            )}
            aria-pressed={selected}
          >
            <div className="relative aspect-video rounded bg-black overflow-hidden mb-2">
              {r.thumbnailUrl ? (
                <img
                  src={r.thumbnailUrl}
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
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white tabular-nums">
                {formatDuration(r.durationSec)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                {r.label ?? formatStart(r.startIso)}
              </span>
              {typeof r.participantCount === 'number' && r.participantCount > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] shrink-0">
                  {r.participantCount} 👥
                </span>
              )}
            </div>
            {r.label && (
              <div className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                {formatStart(r.startIso)}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default RecordingList;
