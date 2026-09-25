// DocumentResultList — a Documents page's search results: one row per
// document with its kind mark, bold title, a one-line summary and a
// folder · age meta line; an Add / Added toggle and a ⋯ menu at the right.
// Since 2.389.6.
//
// - The whole row opens the document; the toggle and the menu sit outside that
//   target and never open it.
// - One tab stop (roving): ArrowUp / ArrowDown / Home / End move between rows,
//   Enter opens. The host decides which row is "current" (tint + left bar).
// - Rows are draggable: the drag carries the prompt-context payload
//   (`writePromptContextDrag`), so a composer's drop target takes it.
// - "Added" is always shown; "Add" appears on hover, focus or the current row.

import { useCallback, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { FileKindMark, type FileKind } from './FileKindMark';
import { AttachToggle } from './AttachToggle';
import { DropdownMenu, type DropdownMenuSection } from './DropdownMenu';
import { FolderIcon, MoreIcon } from '../ui/Icons';
import { writePromptContextDrag } from '../../hooks/usePromptContext';

export interface DocumentResultItem {
  id: string;
  title: string;
  /** One line: the document's opening sentence or description. */
  summary?: string | null;
  kind: FileKind;
  /** The folder's name; absent = no folder line segment. */
  folder?: string | null;
  updatedAt?: string | number | Date | null;
  /** In the working set (the toggle reads "Added"). */
  attached?: boolean;
  /**
   * Always-visible content at the row's right, before Add and ⋯ — a live
   * badge such as `CallPresenceIndicator` ("● 3" for a document with an
   * active call). Outside the row's open target, so clicking it never opens
   * the document. Keep it one line (≤ the row's text height); the row height
   * does not change. Since 2.394.0.
   */
  trailing?: ReactNode;
}

export interface DocumentResultListProps {
  items: readonly DocumentResultItem[];
  currentId?: string | null;
  /** Keyboard focus moved to a row. */
  onCurrentChange?: (id: string) => void;
  onOpen: (item: DocumentResultItem) => void;
  /** Omit to draw no toggle. */
  onToggleAttach?: (item: DocumentResultItem) => void;
  /** Default true. */
  draggable?: boolean;
  /** Extra drag data (called after the prompt-context payload is written). */
  onDragStartItem?: (item: DocumentResultItem, dataTransfer: DataTransfer) => void;
  /** Per-row trailing content computed by the host (wins over `item.trailing` when it returns non-null). Since 2.394.0. */
  rowTrailing?: (item: DocumentResultItem) => ReactNode;
  /** The row's ⋯ menu; null or empty = no menu. */
  rowMenu?: (item: DocumentResultItem) => DropdownMenuSection[] | null;
  emptyState?: ReactNode;
  /** For the age labels; default Date.now(). */
  now?: number;
  toggleLabels?: { add: string; added: string };
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

/** "just now", "15m ago", "2h ago", "Yesterday", "3d ago", "Sep 12". */
export function documentAgeLabel(value: string | number | Date | null | undefined, now: number = Date.now()): string | null {
  if (value === null || value === undefined || value === '') return null;
  const t = value instanceof Date ? value.getTime() : typeof value === 'number' ? value : Date.parse(value);
  if (!Number.isFinite(t)) return null;
  const min = Math.floor((now - t) / 60_000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d === 1) return 'Yesterday';
  if (d < 7) return `${d}d ago`;
  return new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function DocumentResultList({
  items,
  currentId,
  onCurrentChange,
  onOpen,
  onToggleAttach,
  draggable = true,
  onDragStartItem,
  rowMenu,
  rowTrailing,
  emptyState,
  now,
  toggleLabels,
  'aria-label': ariaLabel = 'Documents',
  className,
  'data-testid': testId = 'document-result-list',
}: DocumentResultListProps) {
  const rowRefs = useRef(new Map<string, HTMLDivElement>());
  const at = Date.now();
  const clock = now ?? at;
  const cursorId = items.some((i) => i.id === currentId) ? currentId! : items[0]?.id;

  const focusRow = useCallback((index: number) => {
    const item = items[Math.max(0, Math.min(items.length - 1, index))];
    if (!item) return;
    rowRefs.current.get(item.id)?.focus();
    onCurrentChange?.(item.id);
  }, [items, onCurrentChange]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number, item: DocumentResultItem) => {
    switch (event.key) {
      case 'ArrowDown': event.preventDefault(); focusRow(index + 1); break;
      case 'ArrowUp': event.preventDefault(); focusRow(index - 1); break;
      case 'Home': event.preventDefault(); focusRow(0); break;
      case 'End': event.preventDefault(); focusRow(items.length - 1); break;
      case 'Enter': case ' ': event.preventDefault(); onOpen(item); break;
      default: break;
    }
  };

  if (!items.length) return <>{emptyState ?? null}</>;

  return (
    <ul aria-label={ariaLabel} data-testid={testId} className={cn('m-0 flex list-none flex-col p-0', className)}>
      {items.map((item, index) => {
        const current = item.id === currentId;
        const tabStop = item.id === cursorId;
        const age = documentAgeLabel(item.updatedAt, clock);
        const menu = rowMenu?.(item);
        const trailing = rowTrailing?.(item) ?? item.trailing ?? null;
        return (
          <li
            key={item.id}
            data-testid="document-result-row"
            data-id={item.id}
            data-current={current || undefined}
            className={cn(
              'group relative flex items-center gap-4 border-b border-border-subtle pl-4 pr-3 transition-colors duration-100',
              current ? 'bg-primary-bg' : 'hover:bg-surface-hover',
            )}
          >
            {current && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] rounded-r bg-primary" />}
            <div
              ref={(el) => { if (el) rowRefs.current.set(item.id, el); else rowRefs.current.delete(item.id); }}
              role="link"
              tabIndex={tabStop ? 0 : -1}
              aria-current={current || undefined}
              draggable={draggable}
              onDragStart={draggable ? (event) => {
                writePromptContextDrag(event.dataTransfer, [{ id: item.id, title: item.title, kind: item.kind }]);
                onDragStartItem?.(item, event.dataTransfer);
              } : undefined}
              onClick={() => onOpen(item)}
              onFocus={() => { if (item.id !== currentId) onCurrentChange?.(item.id); }}
              onKeyDown={(event) => onKeyDown(event, index, item)}
              className="flex min-w-0 flex-1 cursor-pointer items-center gap-[18px] py-2.5 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
            >
              <FileKindMark kind={item.kind} variant="app" size="xl" />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate text-base font-semibold leading-snug text-text-primary">{item.title}</span>
                {item.summary && <span className="truncate text-[14.5px] leading-snug text-text-secondary">{item.summary}</span>}
                {(item.folder || age) && (
                  <span className="flex min-w-0 items-center gap-1.5 text-sm leading-snug text-text-tertiary">
                    {item.folder && <FolderIcon size={15} className="shrink-0" />}
                    {item.folder && <span className="truncate">{item.folder}</span>}
                    {item.folder && age && <span aria-hidden="true">·</span>}
                    {age && <span className="shrink-0">{age}</span>}
                  </span>
                )}
              </span>
            </div>
            {trailing != null && trailing !== false && (
              <span className="flex max-h-8 shrink-0 items-center" data-testid="document-result-trailing">
                {trailing}
              </span>
            )}
            {onToggleAttach && (
              <AttachToggle
                attached={!!item.attached}
                onToggle={() => onToggleAttach(item)}
                labels={toggleLabels}
                tabIndex={tabStop ? 0 : -1}
                aria-label={`${item.attached ? 'Remove' : 'Add'} ${item.title}`}
                className={cn(!item.attached && !current && 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100')}
              />
            )}
            {menu && menu.length > 0 && (
              <span className="shrink-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                <DropdownMenu
                  trigger={<MoreIcon size={16} />}
                  triggerLabel={`More actions for ${item.title}`}
                  triggerTabIndex={tabStop ? 0 : -1}
                  triggerClassName="h-8 w-8 border-none px-0"
                  align="end"
                  sections={menu}
                  data-testid="document-result-menu"
                />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default DocumentResultList;
