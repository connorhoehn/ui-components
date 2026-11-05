// frontend/src/components/pipelines/DLQEntryCard.tsx
//
// Extracted from DLQInspector.tsx — a single dead-letter queue entry row
// showing event type, error details, error kind chip, attempt count, age,
// and action buttons (redrive / purge).

import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import type { DLQEntry } from '../../api/pipelineDLQ';
import { Checkbox } from '../forms/Checkbox';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max) + '...';
}

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 0) return 'just now';
  if (d < 60_000) return `${Math.floor(d / 1000)}s ago`;
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  return `${Math.floor(d / 86_400_000)}d ago`;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface DLQEntryCardProps {
  entry: DLQEntry;
  isHovered: boolean;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onRedrive: (ids: string[]) => void;
  onPurge: (ids: string[]) => void;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DLQEntryCard({
  entry,
  isHovered,
  isSelected,
  onToggleSelect,
  onRedrive,
  onPurge,
  onMouseEnter,
  onMouseLeave,
}: DLQEntryCardProps) {
  return (
    <tr
      onMouseEnter={() => onMouseEnter(entry.messageId)}
      onMouseLeave={onMouseLeave}
      className={cn(
        'transition-colors duration-100',
        isHovered && 'bg-surface-hover',
      )}
    >
      <td className="p-2.5 border-b border-border align-top">
        <Checkbox
          checked={isSelected}
          onChange={() => onToggleSelect(entry.messageId)}
          aria-label={`Select dead letter ${entry.messageId}`}
        />
      </td>
      <td className="p-2.5 border-b border-border align-top">
        <span className="font-mono text-xs text-text-primary">
          {entry.eventType}
        </span>
      </td>
      <td className="p-2.5 border-b border-border align-top">
        <span
          className="text-xs text-text-secondary"
          title={entry.lastError}
        >
          {truncate(entry.lastError, 80)}
        </span>
      </td>
      <td className="p-2.5 border-b border-border align-top">
        {entry.errorKind ? (
          <Chip tone="danger">{entry.errorKind}</Chip>
        ) : (
          <span className="text-[11px] text-text-tertiary">unknown</span>
        )}
      </td>
      <td className="p-2.5 border-b border-border align-top text-center">
        <Chip tone="neutral">
          <span className="tabular-nums">{entry.totalAttempts}</span>
        </Chip>
      </td>
      <td className="p-2.5 border-b border-border align-top">
        <span
          className="text-xs text-text-secondary"
          title={new Date(entry.failedAt).toLocaleString()}
        >
          {relativeTime(entry.failedAt)}
        </span>
      </td>
      <td className="p-2.5 border-b border-border align-top">
        <div className="flex gap-1">
          <button
            data-ui-part=""
            type="button"
            onClick={() => onRedrive([entry.messageId])}
            className="px-2.5 py-1 text-xs font-semibold border-none rounded-[5px] cursor-pointer font-[inherit] bg-info-bg text-info-fg"
            title="Redrive this entry"
          >
            Redrive
          </button>
          <button
            data-ui-part=""
            type="button"
            onClick={() => onPurge([entry.messageId])}
            className="px-2.5 py-1 text-xs font-semibold border-none rounded-[5px] cursor-pointer font-[inherit] bg-danger-bg text-danger-fg"
            title="Purge this entry"
          >
            Purge
          </button>
        </div>
      </td>
    </tr>
  );
}
