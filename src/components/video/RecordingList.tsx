// RecordingList — vertical list of recording cards. Pure presentational
// shell — receives a flat array of items and an onSelect handler.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { RecordingRow, type RecordingStatus } from './RecordingRow';

export interface RecordingListItem {
  id: string;
  startIso: string;
  endIso: string;
  durationSec: number;
  participantCount?: number;
  thumbnailUrl?: string;
  /** Optional human label — e.g. "Hank & Alice" or "Global hangout". */
  label?: string;
  /** Defaults to 'ready'. Forwarded to RecordingRow. */
  status?: RecordingStatus;
}

export interface RecordingListProps {
  recordings: RecordingListItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  loading?: boolean;
  emptyState?: ReactNode;
  /** Render a per-row actions slot (e.g. download/share buttons). */
  renderActions?: (item: RecordingListItem) => ReactNode;
  className?: string;
}

export function RecordingList({
  recordings,
  selectedId,
  onSelect,
  loading,
  emptyState,
  renderActions,
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
      {recordings.map((r) => (
        <RecordingRow
          key={r.id}
          id={r.id}
          startIso={r.startIso}
          endIso={r.endIso}
          durationSec={r.durationSec}
          participantCount={r.participantCount}
          thumbnailUrl={r.thumbnailUrl}
          label={r.label}
          status={r.status}
          selected={r.id === selectedId}
          onClick={onSelect}
          actions={renderActions?.(r)}
        />
      ))}
    </div>
  );
}

export default RecordingList;
