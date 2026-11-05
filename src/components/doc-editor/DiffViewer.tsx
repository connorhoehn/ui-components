// frontend/src/components/doc-editor/DiffViewer.tsx
//
// Visual diff between two document snapshots (current vs historical).
// Shows per-section changes: added, removed, modified sections and items.

import type { SnapshotSection } from '../../hooks/useVersionHistory';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DiffViewerProps {
  /** Sections from the historical (older) version. */
  oldSections: SnapshotSection[];
  /** Sections from the current (newer) version. */
  newSections: SnapshotSection[];
  /** Called when the user dismisses the diff view. */
  onClose: () => void;
}

type SectionDiffStatus = 'added' | 'removed' | 'modified' | 'unchanged';

interface ItemDiff {
  status: 'added' | 'removed' | 'modified' | 'unchanged';
  oldItem?: SnapshotSection['items'][number];
  newItem?: SnapshotSection['items'][number];
  changes: string[];
}

interface SectionDiff {
  status: SectionDiffStatus;
  id: string;
  oldTitle?: string;
  newTitle?: string;
  titleChanged: boolean;
  textChanged?: boolean;
  oldTextContent?: string;
  newTextContent?: string;
  itemDiffs: ItemDiff[];
}

// ---------------------------------------------------------------------------
// Diffing logic
// ---------------------------------------------------------------------------

function diffItems(
  oldItems: SnapshotSection['items'],
  newItems: SnapshotSection['items'],
): ItemDiff[] {
  const oldMap = new Map(oldItems.map(i => [i.id, i]));
  const newMap = new Map(newItems.map(i => [i.id, i]));
  const result: ItemDiff[] = [];

  // Check items in old list
  for (const old of oldItems) {
    const cur = newMap.get(old.id);
    if (!cur) {
      result.push({ status: 'removed', oldItem: old, changes: [] });
    } else {
      const changes: string[] = [];
      if (old.text !== cur.text) changes.push('text');
      if (old.status !== cur.status) changes.push(`status: ${old.status} -> ${cur.status}`);
      if (old.assignee !== cur.assignee) changes.push(`assignee: "${old.assignee}" -> "${cur.assignee}"`);
      if (old.priority !== cur.priority) changes.push(`priority: ${old.priority} -> ${cur.priority}`);

      if (changes.length > 0) {
        result.push({ status: 'modified', oldItem: old, newItem: cur, changes });
      } else {
        result.push({ status: 'unchanged', oldItem: old, newItem: cur, changes: [] });
      }
    }
  }

  // Check for added items
  for (const cur of newItems) {
    if (!oldMap.has(cur.id)) {
      result.push({ status: 'added', newItem: cur, changes: [] });
    }
  }

  return result;
}

function diffSections(
  oldSections: SnapshotSection[],
  newSections: SnapshotSection[],
): SectionDiff[] {
  const oldMap = new Map(oldSections.map(s => [s.id, s]));
  const newMap = new Map(newSections.map(s => [s.id, s]));
  const result: SectionDiff[] = [];

  // Check old sections
  for (const old of oldSections) {
    const cur = newMap.get(old.id);
    if (!cur) {
      result.push({
        status: 'removed',
        id: old.id,
        oldTitle: old.title,
        titleChanged: false,
        itemDiffs: old.items.map(i => ({ status: 'removed' as const, oldItem: i, changes: [] })),
      });
    } else {
      const titleChanged = old.title !== cur.title;
      const textChanged = (old.textContent || '') !== (cur.textContent || '');
      const itemDiffs = diffItems(old.items, cur.items);
      const hasChanges = titleChanged || textChanged || itemDiffs.some(d => d.status !== 'unchanged');
      result.push({
        status: hasChanges ? 'modified' : 'unchanged',
        id: old.id,
        oldTitle: old.title,
        newTitle: cur.title,
        titleChanged,
        textChanged,
        oldTextContent: old.textContent,
        newTextContent: cur.textContent,
        itemDiffs,
      });
    }
  }

  // Added sections
  for (const cur of newSections) {
    if (!oldMap.has(cur.id)) {
      result.push({
        status: 'added',
        id: cur.id,
        newTitle: cur.title,
        titleChanged: false,
        itemDiffs: cur.items.map(i => ({ status: 'added' as const, newItem: i, changes: [] })),
      });
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Style helpers
// ---------------------------------------------------------------------------

const statusBgClass: Record<SectionDiffStatus, string> = {
  added: 'bg-success-bg border-success-border',
  removed: 'bg-danger-bg border-danger-border',
  modified: 'bg-warning-bg border-warning-border',
  unchanged: 'bg-transparent border-border',
};

function badgeClasses(status: string): string {
  if (status === 'added') return 'text-success-fg bg-success-bg';
  if (status === 'removed') return 'text-danger-fg bg-danger-bg';
  if (status === 'modified') return 'text-warning-fg bg-warning-border';
  return 'text-text-secondary bg-surface-hover';
}

function itemRowClasses(status: string): string {
  if (status === 'added') return 'bg-success-bg text-success-fg';
  if (status === 'removed') return 'bg-danger-bg text-danger-fg line-through';
  if (status === 'modified') return 'bg-warning-bg text-warning-fg';
  return 'bg-transparent text-text-primary';
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DiffViewer({ oldSections, newSections, onClose }: DiffViewerProps) {
  const diffs = diffSections(oldSections, newSections);
  const hasChanges = diffs.some(d => d.status !== 'unchanged');

  return (
    <div className={cn('border-t border-border bg-surface-inset max-h-[400px] overflow-auto px-4 py-3')}>
      <div className={cn('flex items-center justify-between mb-2')}>
        <h4 className={cn('text-[13px] font-semibold text-text-primary m-0')}>Changes from selected version to current</h4>
        <button
          data-ui-part=""
          type="button"
          className={cn('px-2 py-0.5 text-xs border border-border-field rounded bg-surface text-text-secondary cursor-pointer font-[inherit]')}
          onClick={onClose}
        >
          Dismiss
        </button>
      </div>

      {!hasChanges && (
        <div className={cn('text-[13px] text-text-tertiary text-center p-4')}>No differences found. The documents are identical.</div>
      )}

      {diffs
        .filter(d => d.status !== 'unchanged')
        .map((sd) => (
          <div key={sd.id} className={cn('border rounded-md p-2 px-2.5 mb-1.5', statusBgClass[sd.status])}>
            <div className={cn('flex items-center gap-2 mb-1')}>
              <span className={cn('text-[10px] font-semibold uppercase px-1.5 py-px rounded-sm', badgeClasses(sd.status))}>{sd.status}</span>
              <span className={cn('text-[13px] font-semibold text-text-primary')}>
                {sd.status === 'removed' ? sd.oldTitle : sd.newTitle ?? sd.oldTitle}
              </span>
              {sd.titleChanged && (
                <span className={cn('text-[11px] text-warning-fg')}>
                  (was: &quot;{sd.oldTitle}&quot;)
                </span>
              )}
            </div>

            {/* Item-level diffs */}
            {sd.itemDiffs
              .filter(d => d.status !== 'unchanged')
              .map((id, idx) => {
                const item = id.newItem ?? id.oldItem;
                return (
                  <div key={item?.id ?? idx}>
                    <div className={cn('text-xs px-2 py-0.5 rounded-sm mt-0.5', itemRowClasses(id.status))}>
                      {id.status === 'added' && '+ '}
                      {id.status === 'removed' && '- '}
                      {id.status === 'modified' && '~ '}
                      {item?.text ?? '(untitled)'}
                      {item?.assignee ? ` [${item.assignee}]` : ''}
                    </div>
                    {id.changes.length > 0 && (
                      <div className={cn('text-[11px] text-warning-fg ml-4 italic')}>
                        {id.changes.join(', ')}
                      </div>
                    )}
                  </div>
                );
              })}

            {/* Text content diff */}
            {sd.textChanged && (
              <div className={cn('mt-1 text-xs')}>
                {sd.oldTextContent && (
                  <div className={cn('px-2 py-1 rounded-sm bg-danger-bg text-danger-fg line-through mb-0.5')}>
                    {sd.oldTextContent.substring(0, 200)}{(sd.oldTextContent?.length ?? 0) > 200 ? '...' : ''}
                  </div>
                )}
                {sd.newTextContent && (
                  <div className={cn('px-2 py-1 rounded-sm bg-success-bg text-success-fg')}>
                    {sd.newTextContent.substring(0, 200)}{(sd.newTextContent?.length ?? 0) > 200 ? '...' : ''}
                  </div>
                )}
              </div>
            )}

            {sd.status === 'modified' && !sd.textChanged && sd.itemDiffs.every(d => d.status === 'unchanged') && sd.titleChanged && (
              <div className={cn('text-xs text-text-secondary mt-0.5')}>
                Only the section title changed.
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
