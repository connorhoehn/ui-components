// ui-components/src/components/video/ReviewDocumentList.tsx
//
// The documents a call is about. Two shapes of the same list:
//   trailing='remove' — the start-a-call drawer: compact 34px rows, a doc
//     icon, the title and an × (hidden on rows that may not be removed, such
//     as the document the call is started from).
//   trailing='open'   — the call side panel: taller rows with a subline
//     ("Presenting · Alice", "Up next"), the presented row selected, and an
//     open-in-place icon.
// Rows reorder by drag when `onReorder` is set (the host's host-only rule).

import { useState, type DragEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CloseIcon, DocumentIcon } from '../ui/Icons';
import { PopOutIcon } from './MediaIcons';
import { IconButton } from '../ui/IconButton';

export interface ReviewDocumentItem {
  id: string;
  title: string;
  subline?: ReactNode;
  /** Accent sublines ("Presenting · Alice") vs tertiary ("Up next"). Default: accent when `selected`. */
  sublineTone?: 'accent' | 'muted';
  selected?: boolean;
  /** Default true. The document a call starts from is not removable. */
  removable?: boolean;
  icon?: ReactNode;
}

export interface ReviewDocumentListProps {
  items: ReviewDocumentItem[];
  trailing: 'remove' | 'open';
  onRemove?: (id: string) => void;
  onOpen?: (id: string) => void;
  onSelect?: (id: string) => void;
  /** Drag-reorder: the id moved and its new index. */
  onReorder?: (id: string, index: number) => void;
  emptyLabel?: string;
  className?: string;
  /** Test id of the list; rows are `<rowTestIdPrefix>-<id>`. */
  'data-testid'?: string;
  /** Default `call-document` (so rows read `call-document-<id>`). */
  rowTestIdPrefix?: string;
}

export function ReviewDocumentList({
  items,
  trailing,
  onRemove,
  onOpen,
  onSelect,
  onReorder,
  emptyLabel = 'No documents yet',
  className,
  'data-testid': testId = 'review-document-list',
  rowTestIdPrefix = 'call-document',
}: ReviewDocumentListProps) {
  const [dragId, setDragId] = useState<string | null>(null);
  const compact = trailing === 'remove';

  if (items.length === 0) {
    return (
      <p className={cn('m-0 py-2 text-sm text-text-tertiary', className)} data-testid={testId}>
        {emptyLabel}
      </p>
    );
  }

  const dropOn = (targetIndex: number) => (e: DragEvent) => {
    e.preventDefault();
    if (dragId && onReorder) onReorder(dragId, targetIndex);
    setDragId(null);
  };

  return (
    <ul className={cn('m-0 flex list-none flex-col p-0', !compact && 'gap-1', className)} data-testid={testId}>
      {items.map((item, index) => {
        const removable = item.removable !== false;
        const sublineAccent = item.sublineTone ? item.sublineTone === 'accent' : item.selected;
        return (
          <li
            key={item.id}
            data-testid={`${rowTestIdPrefix}-${item.id}`}
            data-selected={item.selected ? 'true' : 'false'}
            draggable={Boolean(onReorder)}
            onDragStart={onReorder ? () => setDragId(item.id) : undefined}
            onDragOver={onReorder ? (e) => e.preventDefault() : undefined}
            onDrop={onReorder ? dropOn(index) : undefined}
            className={cn(
              'group/doc flex items-center rounded-md',
              compact ? 'min-h-8 gap-2.5 px-0.5' : 'min-h-[58px] gap-3 px-3 py-2',
              item.selected && 'bg-primary-bg',
              !item.selected && !compact && 'hover:bg-surface-hover',
              onSelect && 'cursor-pointer',
              dragId === item.id && 'opacity-50',
            )}
            onClick={onSelect ? () => onSelect(item.id) : undefined}
          >
            <span className={cn('flex shrink-0 text-text-secondary', item.selected && 'text-primary')} aria-hidden="true">
              {item.icon ?? <DocumentIcon size={compact ? 18 : 24} />}
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className={cn('truncate text-text-primary', compact ? 'text-sm' : 'text-[15px] font-medium')}>
                {item.title}
              </span>
              {item.subline != null && (
                <span className={cn('truncate text-sm', sublineAccent ? 'text-primary' : 'text-text-tertiary')}>
                  {item.subline}
                </span>
              )}
            </span>
            {trailing === 'remove' && removable && onRemove && (
              <IconButton
                aria-label={`Remove ${item.title}`}
                size="sm"
                icon={<CloseIcon size={14} />}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                data-testid={`${rowTestIdPrefix}-remove-${item.id}`}
                className="shrink-0 text-text-secondary"
              />
            )}
            {trailing === 'open' && onOpen && (
              <IconButton
                aria-label={`Open ${item.title}`}
                title={`Open ${item.title}`}
                icon={<PopOutIcon size={18} />}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(item.id);
                }}
                data-testid={`${rowTestIdPrefix}-open-${item.id}`}
                className="shrink-0 text-text-secondary"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewDocumentList;
