// MasterDetail — a persistent rail of items paired with a detail pane for
// whichever one is selected. The rail collapses to a narrow icon-only strip
// (mode persisted across reloads when `storageKey` is given), the same
// compact/expanded toggle the dimension scorecard and knowledge explorer both
// hand-rolled before this existed.
//
// Selection is fully controlled: the caller owns `selectedKey`/`onSelect` and
// decides what "nothing selected" means (usually "select the first item"),
// which is why there is no internal default-selection behaviour here — only
// `emptyDetail`, rendered when `selectedKey` doesn't resolve to an item.

import {
  useCallback,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

export interface MasterDetailProps<T> {
  items: T[];
  keyOf: (item: T) => string;
  selectedKey: string | null;
  onSelect: (key: string) => void;
  /** Expanded rail row. */
  renderRow: (item: T, index: number, selected: boolean) => ReactNode;
  /** Compact (72px) rail row. Falls back to an index badge when omitted. */
  renderCompactRow?: (item: T, index: number, selected: boolean) => ReactNode;
  renderDetail: (item: T, index: number) => ReactNode;
  railTitle?: ReactNode;
  /** Expanded rail width in px. Default 340. */
  railWidth?: number;
  /** Compact rail width in px. Default 72. */
  compactWidth?: number;
  /** Persists compact/expanded mode under this localStorage key. */
  storageKey?: string;
  /** Rendered in the detail pane when nothing resolves from `selectedKey`. */
  emptyDetail?: ReactNode;
  /** Docked under the detail pane (a composer, a call strip). It reserves its
   *  own height and stays put while the pane above it scrolls, whatever the
   *  selection — mirrors ExplorerLayout's `paneFooter`. The rail is unaffected. */
  paneFooter?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

function readStoredCompact(storageKey: string | undefined): boolean {
  if (!storageKey || typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(storageKey) === 'compact';
  } catch {
    return false;
  }
}

function writeStoredCompact(storageKey: string | undefined, compact: boolean): void {
  if (!storageKey || typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(storageKey, compact ? 'compact' : 'expanded');
  } catch {
    // Storage can throw in private/restrictive contexts — the toggle still
    // works for the current session, it just won't persist.
  }
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      className={cn('h-4 w-4', direction === 'right' && 'rotate-180')}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 3L5 8l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DefaultCompactRow({ index, selected }: { index: number; selected: boolean }) {
  return (
    <span
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold',
        selected ? 'bg-primary text-on-primary' : 'bg-surface-inset text-text-tertiary',
      )}
    >
      {index + 1}
    </span>
  );
}

export function MasterDetail<T>({
  items,
  keyOf,
  selectedKey,
  onSelect,
  renderRow,
  renderCompactRow,
  renderDetail,
  railTitle,
  railWidth = 340,
  compactWidth = 72,
  storageKey,
  emptyDetail,
  paneFooter,
  className,
  'data-testid': testId = 'master-detail',
}: MasterDetailProps<T>) {
  const [compact, setCompact] = useState<boolean>(() => readStoredCompact(storageKey));

  const toggleCompact = useCallback(() => {
    setCompact((prev) => {
      const next = !prev;
      writeStoredCompact(storageKey, next);
      return next;
    });
  }, [storageKey]);

  const selectedIndex = useMemo(
    () => items.findIndex((item) => keyOf(item) === selectedKey),
    [items, keyOf, selectedKey],
  );
  const selectedItem = selectedIndex >= 0 ? items[selectedIndex] : null;

  const handleRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    if (items.length === 0) return;
    event.preventDefault();
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    const base = selectedIndex >= 0 ? selectedIndex : delta > 0 ? -1 : 0;
    const next = (base + delta + items.length) % items.length;
    onSelect(keyOf(items[next]));
  };

  const detail = selectedItem ? renderDetail(selectedItem, selectedIndex) : emptyDetail;

  return (
    <div
      className={cn('flex overflow-hidden rounded-lg border border-border bg-surface', className)}
      data-testid={testId}
    >
      <nav
        className="flex flex-shrink-0 flex-col overflow-y-auto border-r border-border"
        style={{ width: compact ? compactWidth : railWidth }}
        onKeyDown={handleRailKeyDown}
        aria-label={typeof railTitle === 'string' ? railTitle : 'Items'}
        data-testid={`${testId}-rail`}
      >
        <div
          className={cn(
            'flex items-center gap-1 border-b border-border px-3 py-2',
            compact ? 'justify-center' : 'justify-between',
          )}
        >
          {!compact && railTitle && (
            <span className="truncate text-xs font-semibold uppercase tracking-wide text-text-tertiary">
              {railTitle}
            </span>
          )}
          <button
            type="button"
            onClick={toggleCompact}
            aria-label={compact ? 'Expand list' : 'Collapse list'}
            data-testid={`${testId}-toggle`}
            className="flex-shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary"
          >
            <ChevronIcon direction={compact ? 'right' : 'left'} />
          </button>
        </div>
        <div className="flex flex-col">
          {items.map((item, index) => {
            const key = keyOf(item);
            const selected = key === selectedKey;
            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                aria-current={selected}
                onClick={() => onSelect(key)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect(key);
                  }
                }}
                data-testid={`${testId}-row-${key}`}
                className={cn(
                  'cursor-pointer border-l-2 text-left transition-colors',
                  selected ? 'border-primary bg-surface-hover' : 'border-transparent hover:bg-surface-hover',
                )}
              >
                {compact
                  ? (renderCompactRow?.(item, index, selected) ?? (
                      <div className="flex justify-center py-2.5">
                        <DefaultCompactRow index={index} selected={selected} />
                      </div>
                    ))
                  : renderRow(item, index, selected)}
              </div>
            );
          })}
        </div>
      </nav>

      {paneFooter != null ? (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col" data-testid={`${testId}-pane-column`}>
          <div className="min-h-0 flex-1 overflow-y-auto" data-testid={`${testId}-detail`}>
            {detail}
          </div>
          <div className="shrink-0 bg-surface" data-testid={`${testId}-pane-footer`}>{paneFooter}</div>
        </div>
      ) : (
        <div className="min-w-0 flex-1 overflow-y-auto" data-testid={`${testId}-detail`}>
          {detail}
        </div>
      )}
    </div>
  );
}

export default MasterDetail;
