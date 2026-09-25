// ui-components/src/components/video/CollaboratorCheckList.tsx
//
// "Document collaborators": the people who already share a document, each
// with an avatar carrying their presence dot, their name, a status word
// (Online / Away / Offline) and a checkbox that puts them on the call. The
// whole row is the label, so a click anywhere ticks the box. Offline rows
// stay selectable — they get the invite link rather than a ring.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';
import { PresenceDot } from '../shared/PresenceDot';
import { Checkbox } from '../forms/Checkbox';
import SkeletonCard from '../shared/SkeletonCard';

export interface CollaboratorRow {
  userId: string;
  name: string;
  avatarUrl?: string;
  color?: string;
  presence: 'online' | 'away' | 'offline';
  /** "Online", "Away", "Offline", "In a call"… */
  statusLabel: string;
  /** Disables the checkbox with this as the title (e.g. "You"). */
  disabledReason?: string;
}

export interface CollaboratorCheckListProps {
  /** Section label, e.g. "Document collaborators". Omit for none. */
  title?: string;
  rows: CollaboratorRow[];
  selected: string[];
  onToggle: (userId: string, next: boolean) => void;
  loading?: boolean;
  emptyLabel?: string;
  footnote?: ReactNode;
  className?: string;
  'data-testid'?: string;
  /** Rows are `<rowTestIdPrefix>-<userId>`. Default `start-call-collaborator`. */
  rowTestIdPrefix?: string;
}

export function CollaboratorCheckList({
  title,
  rows,
  selected,
  onToggle,
  loading = false,
  emptyLabel = 'No one else has this document open',
  footnote,
  className,
  'data-testid': testId = 'start-call-collaborators',
  rowTestIdPrefix = 'start-call-collaborator',
}: CollaboratorCheckListProps) {
  const selectedSet = new Set(selected);
  return (
    <section className={cn('flex flex-col', className)} data-testid={testId} aria-label={title}>
      {title && <h4 className="m-0 mb-1.5 text-sm font-normal text-text-secondary">{title}</h4>}
      {loading ? (
        <div className="flex flex-col gap-2 py-1" data-testid={`${testId}-loading`}>
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} height={33} rounded="md" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="m-0 py-2 text-sm text-text-tertiary">{emptyLabel}</p>
      ) : (
        <ul className="m-0 flex list-none flex-col p-0">
          {rows.map((row) => {
            const checked = selectedSet.has(row.userId);
            const disabled = Boolean(row.disabledReason);
            return (
              <li key={row.userId}>
                <label
                  className={cn(
                    'flex min-h-[41px] items-center gap-3 rounded-md',
                    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
                  )}
                  title={row.disabledReason}
                  data-testid={`${rowTestIdPrefix}-${row.userId}`}
                  data-checked={checked ? 'true' : 'false'}
                  data-presence={row.presence}
                >
                  <span className="relative inline-flex shrink-0">
                    <Avatar
                      name={row.name}
                      size={32}
                      {...(row.avatarUrl ? { src: row.avatarUrl } : {})}
                      {...(row.color ? { color: row.color } : {})}
                      showTitle={false}
                    />
                    <PresenceDot
                      state={row.presence}
                      pulse={false}
                      size="sm"
                      className="absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-surface"
                      data-testid={`${rowTestIdPrefix}-presence-${row.userId}`}
                    />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-text-primary">{row.name}</span>
                  <span className="w-20 shrink-0 text-xs text-text-tertiary">{row.statusLabel}</span>
                  <Checkbox
                    checked={checked}
                    disabled={disabled}
                    onChange={(next) => onToggle(row.userId, next)}
                    aria-label={`Invite ${row.name}`}
                    className="h-[18px] w-[18px] shrink-0"
                    data-testid={`${rowTestIdPrefix}-check-${row.userId}`}
                  />
                </label>
              </li>
            );
          })}
        </ul>
      )}
      {footnote && <p className="m-0 mt-2 text-xs text-text-tertiary">{footnote}</p>}
    </section>
  );
}

export default CollaboratorCheckList;
