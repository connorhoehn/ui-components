// GroupedList — a flat directory of two-line rows under collapsible group
// headers. The pipelines page ("Documents & presentations · 5", then five
// rows each with a kind mark, a title, a status pill and a description or
// route) is the first consumer; any list that groups by a category rather than
// nesting by containment is the shape this exists for.
//
// ## Not a TreeView
//
// `TreeView` is a one-line, arbitrarily deep, drag-to-reorder tree of things
// that CONTAIN each other. This is exactly two levels — a group and its rows —
// where the group is a label, not a parent, and nothing moves. A row here has
// two lines (title with a pill, then a subline), a hover-revealed action slot
// and a ⋯ menu; a tree row has one line and a caret. Sharing one component
// would have made both worse.
//
// ## Semantics
//
// Each group is a `<section>` labelled by its header `<button aria-expanded>`;
// the rows are a `<ul>` of `<li>`, each with a primary `<button>` that opens
// the row. No `role="listbox"`/`option`: these are not selectable choices in a
// form, they are things a reader opens, so a button per row is the honest
// element and a screen reader reads "button, Document agent edit, Published,
// /doc → Read → Plan". The header button and every visible row button share
// ONE tab stop (roving tabindex); arrows move between them.
//
// ## Keyboard
//
// - ArrowUp / ArrowDown / Home / End — the previous / next / first / last
//   visible header or row.
// - Enter / Space on a row — opens it (`onOpenRow`); on a header — toggles it.
// - ArrowLeft on a row — collapses its group and lands on the header; on an
//   open header — collapses it.
// - ArrowRight on a closed header — opens it; on an open header — steps to
//   its first row.
// - Shift+F10 / ContextMenu on a row — its ⋯ menu (same as a right-click).
//
// ## `hoverSubline`
//
// A row can carry two second lines: the one it wears at rest (`subline`, a
// description) and the one it shows when it has the reader's attention
// (`hoverSubline`, the route through the pipeline). Both are rendered; CSS
// swaps them on hover / focus-within, and the `current` row wears the hover
// one all the time. The at-rest line is what assistive tech reads; the hover
// line is `aria-hidden`, so a row is not read twice.
//
// ## Collapsed state
//
// Uncontrolled by default (`defaultOpen` on each group, else open); pass
// `openGroups` + `onToggleGroup` to control it; pass `storageKey` to remember
// collapses in `localStorage` between visits (a read that throws — private
// window, blocked storage — is treated as "nothing stored").

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { DropdownMenu, type DropdownMenuSection } from './DropdownMenu';
import Chip from './Chip';

export interface GroupedListGroup {
  id: string;
  title: string;
  /** Shown as a count chip after the title. Omit for no chip. */
  count?: number;
  /** Leading mark after the caret — normally a `FileKindMark kind="folder"`. */
  icon?: ReactNode;
  /** Open on first render. Default `true`. Ignored when `openGroups` is controlled. */
  defaultOpen?: boolean;
  /** What an open group with no rows says. Default "Nothing here". */
  emptyLabel?: string;
}

export interface GroupedListRow {
  id: string;
  groupId: string;
  /** Leading kind mark — normally a `FileKindMark`. */
  icon?: ReactNode;
  title: string;
  /** Beside the title on the first line — normally a `StatusPill`. */
  pill?: ReactNode;
  /** The second line at rest. */
  subline?: ReactNode;
  /** The second line while hovered, focused or `current`. Falls back to `subline`. */
  hoverSubline?: ReactNode;
  /** Trailing content that is always visible — a "View run" link. */
  trailing?: ReactNode;
  /** Trailing content revealed on hover / focus / `current` — an "Open" button. */
  hoverActions?: ReactNode;
  /** The row the reader is "at": last opened, just created. Tinted; wears its hover line. */
  current?: boolean;
  /** Muted and inert; the menu still opens so a reader can see why. */
  disabled?: boolean;
  /** Optional accessible name override — default is the title. */
  ariaLabel?: string;
}

export interface GroupedListProps {
  groups: GroupedListGroup[];
  rows: GroupedListRow[];
  /** A row was activated — click, Enter or Space on its primary button. */
  onOpenRow?: (row: GroupedListRow) => void;
  /**
   * The row's ⋯ menu. Return `null` or an empty array for a row without one.
   * Opens from the ⋯ button, a right-click, or Shift+F10 / the context-menu
   * key on the focused row.
   */
  rowMenu?: (row: GroupedListRow) => DropdownMenuSection[] | null | undefined;
  /** Accessible name of a row's menu button. Default `Actions for <title>`. */
  rowMenuLabel?: (row: GroupedListRow) => string;
  /** Controlled open groups. With this, `defaultOpen` and `storageKey` are ignored. */
  openGroups?: string[];
  /** Fires on every caret click / ArrowLeft / ArrowRight toggle, controlled or not. */
  onToggleGroup?: (groupId: string, open: boolean) => void;
  /** Persist collapsed group ids under this `localStorage` key. */
  storageKey?: string;
  /** Marks a row `current` by id — an alternative to setting it on the row. */
  currentId?: string | null;
  /** Hide a group whose row list is empty instead of showing its empty label. Default `false`. */
  hideEmptyGroups?: boolean;
  className?: string;
  'data-testid'?: string;
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

function readCollapsed(key: string | undefined): Set<string> {
  if (!key || typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []);
  } catch {
    return new Set();
  }
}

function writeCollapsed(key: string | undefined, collapsed: Set<string>) {
  if (!key || typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(Array.from(collapsed)));
  } catch {
    // Storage is a convenience; a page without it still collapses for the session.
  }
}

// ---------------------------------------------------------------------------
// Focus bookkeeping — one tab stop across headers and visible rows
// ---------------------------------------------------------------------------

type FocusKey = `g:${string}` | `r:${string}`;

function CaretIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('shrink-0 transition-transform duration-150', open ? '' : '-rotate-90')}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

/** `CSS.escape` where it exists (jsdom has it; older engines do not). */
function cssEscape(value: string): string {
  return typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(value) : value;
}

/** Opens a row's ⋯ menu as if its button were pressed (the menu owns its state). */
function openRowMenu(row: HTMLElement): boolean {
  const trigger = row.querySelector<HTMLButtonElement>('[data-grouped-list-menu] button[aria-haspopup="menu"]');
  if (!trigger) return false;
  if (trigger.getAttribute('aria-expanded') !== 'true') trigger.click();
  return true;
}

export function GroupedList({
  groups,
  rows,
  onOpenRow,
  rowMenu,
  rowMenuLabel,
  openGroups,
  onToggleGroup,
  storageKey,
  currentId = null,
  hideEmptyGroups = false,
  className,
  'data-testid': testId = 'grouped-list',
}: GroupedListProps) {
  const isControlled = openGroups !== undefined;

  // Uncontrolled: the set of CLOSED groups (so a group added later defaults open).
  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    const stored = readCollapsed(storageKey);
    groups.forEach((g) => {
      if (g.defaultOpen === false && !stored.has(g.id)) stored.add(g.id);
    });
    return stored;
  });

  const isOpen = useCallback(
    (groupId: string) => (isControlled ? openGroups!.includes(groupId) : !collapsed.has(groupId)),
    [isControlled, openGroups, collapsed],
  );

  const setOpen = useCallback(
    (groupId: string, open: boolean) => {
      if (!isControlled) {
        setCollapsed((prev) => {
          const next = new Set(prev);
          if (open) next.delete(groupId);
          else next.add(groupId);
          writeCollapsed(storageKey, next);
          return next;
        });
      }
      onToggleGroup?.(groupId, open);
    },
    [isControlled, onToggleGroup, storageKey],
  );

  const rowsByGroup = useMemo(() => {
    const map = new Map<string, GroupedListRow[]>();
    groups.forEach((g) => map.set(g.id, []));
    rows.forEach((r) => {
      const list = map.get(r.groupId);
      if (list) list.push(r);
    });
    return map;
  }, [groups, rows]);

  const visibleGroups = useMemo(
    () => (hideEmptyGroups ? groups.filter((g) => (rowsByGroup.get(g.id)?.length ?? 0) > 0) : groups),
    [groups, rowsByGroup, hideEmptyGroups],
  );

  /** Every focusable header/row key, top to bottom, as the arrows walk them. */
  const focusOrder = useMemo<FocusKey[]>(() => {
    const out: FocusKey[] = [];
    visibleGroups.forEach((g) => {
      out.push(`g:${g.id}`);
      if (isOpen(g.id)) rowsByGroup.get(g.id)?.forEach((r) => out.push(`r:${r.id}`));
    });
    return out;
  }, [visibleGroups, rowsByGroup, isOpen]);

  const [focused, setFocused] = useState<FocusKey | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Which element carries tabIndex=0 when nothing has been focused yet: the
  // current row, else the first header.
  const tabTarget = useMemo<FocusKey | null>(() => {
    if (focused && focusOrder.includes(focused)) return focused;
    const current = rows.find((r) => r.current || r.id === currentId);
    const currentKey: FocusKey | null = current ? `r:${current.id}` : null;
    if (currentKey && focusOrder.includes(currentKey)) return currentKey;
    return focusOrder[0] ?? null;
  }, [focused, focusOrder, rows, currentId]);

  const focusKey = useCallback((key: FocusKey) => {
    const el = rootRef.current?.querySelector<HTMLElement>(`[data-focus-key="${cssEscape(key)}"]`);
    if (el) {
      setFocused(key);
      el.focus();
    }
  }, []);

  // If the focused element disappears (its group collapsed under it), keep the
  // tab stop on something reachable.
  useEffect(() => {
    if (focused && !focusOrder.includes(focused)) setFocused(null);
  }, [focused, focusOrder]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      // Keys inside an open menu belong to the menu.
      if (target.closest('[role="menu"]')) return;
      const key = target.closest<HTMLElement>('[data-focus-key]')?.dataset.focusKey as FocusKey | undefined;
      if (!key) return;
      const index = focusOrder.indexOf(key);
      if (index < 0) return;
      const isGroup = key.startsWith('g:');
      const id = key.slice(2);

      if ((event.key === 'F10' && event.shiftKey) || event.key === 'ContextMenu') {
        if (!isGroup) {
          const li = target.closest<HTMLElement>('[data-row-id]');
          if (li && openRowMenu(li)) event.preventDefault();
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (index < focusOrder.length - 1) focusKey(focusOrder[index + 1]);
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (index > 0) focusKey(focusOrder[index - 1]);
          break;
        case 'Home':
          event.preventDefault();
          if (focusOrder.length) focusKey(focusOrder[0]);
          break;
        case 'End':
          event.preventDefault();
          if (focusOrder.length) focusKey(focusOrder[focusOrder.length - 1]);
          break;
        case 'ArrowLeft': {
          event.preventDefault();
          if (isGroup) {
            if (isOpen(id)) setOpen(id, false);
          } else {
            const row = rows.find((r) => r.id === id);
            if (row) {
              setOpen(row.groupId, false);
              focusKey(`g:${row.groupId}`);
            }
          }
          break;
        }
        case 'ArrowRight': {
          event.preventDefault();
          if (isGroup) {
            if (!isOpen(id)) setOpen(id, true);
            else {
              const first = rowsByGroup.get(id)?.[0];
              if (first) focusKey(`r:${first.id}`);
            }
          }
          break;
        }
        default:
          break;
      }
    },
    [focusOrder, focusKey, isOpen, setOpen, rows, rowsByGroup],
  );

  return (
    <div ref={rootRef} data-testid={testId} className={cn('flex flex-col', className)} onKeyDown={onKeyDown}>
      {visibleGroups.map((group) => {
        const open = isOpen(group.id);
        const groupRows = rowsByGroup.get(group.id) ?? [];
        const headerId = `${testId}-group-toggle-${group.id}`;
        const listId = `${testId}-group-rows-${group.id}`;
        const gKey: FocusKey = `g:${group.id}`;
        return (
          <section
            key={group.id}
            aria-labelledby={headerId}
            data-testid={`${testId}-group-${group.id}`}
            data-group-id={group.id}
            data-open={open}
            className="flex flex-col"
          >
            <h3 className="m-0">
              <button
                type="button"
                id={headerId}
                data-testid={headerId}
                data-focus-key={gKey}
                aria-expanded={open}
                aria-controls={listId}
                tabIndex={tabTarget === gKey ? 0 : -1}
                onFocus={() => setFocused(gKey)}
                onClick={() => setOpen(group.id, !open)}
                className={cn(
                  'flex w-full items-center gap-2.5 border-0 bg-transparent px-2 py-2.5 text-left',
                  'text-[14px] font-semibold text-text-primary',
                  'rounded-md hover:bg-surface-hover',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                )}
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center text-text-secondary">
                  <CaretIcon open={open} />
                </span>
                {group.icon && (
                  <span className="flex shrink-0 items-center text-text-secondary" data-testid={`${testId}-group-icon-${group.id}`}>
                    {group.icon}
                  </span>
                )}
                <span className="truncate">{group.title}</span>
                {typeof group.count === 'number' && (
                  <Chip size="xs" tone="neutral" className="shrink-0" aria-label={`${group.count} items`} data-testid={`${testId}-group-count-${group.id}`}>
                    {group.count}
                  </Chip>
                )}
              </button>
            </h3>
            <ul
              id={listId}
              data-testid={listId}
              hidden={!open}
              className="m-0 flex list-none flex-col p-0"
            >
              {open && groupRows.length === 0 && (
                <li className="px-4 py-3 pl-12 text-[13px] text-text-tertiary" data-testid={`${testId}-group-empty-${group.id}`}>
                  {group.emptyLabel ?? 'Nothing here'}
                </li>
              )}
              {open &&
                groupRows.map((row) => (
                  <Row
                    key={row.id}
                    row={row}
                    current={row.current || row.id === currentId}
                    testId={testId}
                    tabbable={tabTarget === `r:${row.id}`}
                    onFocusRow={() => setFocused(`r:${row.id}`)}
                    onOpenRow={onOpenRow}
                    menuSections={rowMenu?.(row)}
                    menuLabel={rowMenuLabel?.(row) ?? `Actions for ${row.title}`}
                  />
                ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Row
// ---------------------------------------------------------------------------

interface RowProps {
  row: GroupedListRow;
  current: boolean;
  testId: string;
  tabbable: boolean;
  onFocusRow: () => void;
  onOpenRow?: (row: GroupedListRow) => void;
  menuSections: DropdownMenuSection[] | null | undefined;
  menuLabel: string;
}

function Row({ row, current, testId, tabbable, onFocusRow, onOpenRow, menuSections, menuLabel }: RowProps) {
  const hasMenu = !!menuSections && menuSections.some((s) => s.items.length > 0);
  const hasHoverLine = row.hoverSubline !== undefined && row.hoverSubline !== null;
  const rKey: FocusKey = `r:${row.id}`;

  return (
    <li
      data-testid={`${testId}-row-${row.id}`}
      data-row-id={row.id}
      data-current={current || undefined}
      aria-current={current ? 'true' : undefined}
      onFocus={onFocusRow}
      {...(hasMenu
        ? {
            onContextMenu: (event: MouseEvent<HTMLLIElement>) => {
              // A right-click opens the same menu as the ⋯, not the browser's.
              if ((event.target as HTMLElement).closest('[data-grouped-list-menu]')) return;
              event.preventDefault();
              openRowMenu(event.currentTarget);
            },
          }
        : {})}
      className={cn(
        'group relative flex items-center gap-3 border-t border-border px-2 py-2.5',
        'transition-colors duration-100',
        current ? 'bg-primary/8 hover:bg-primary/12' : 'hover:bg-surface-hover',
        row.disabled && 'opacity-60',
      )}
    >
      <button
        type="button"
        data-testid={`${testId}-row-open-${row.id}`}
        data-focus-key={rKey}
        aria-label={row.ariaLabel}
        aria-disabled={row.disabled || undefined}
        tabIndex={tabbable ? 0 : -1}
        disabled={row.disabled}
        onClick={() => {
          if (!row.disabled) onOpenRow?.(row);
        }}
        className={cn(
          'flex min-w-0 flex-1 items-center gap-3 rounded-md border-0 bg-transparent p-0 text-left',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          row.disabled ? 'cursor-default' : 'cursor-pointer',
        )}
      >
        {/* Caret column of the header, kept so a row's mark lines up under the folder mark. */}
        <span className="w-5 shrink-0" aria-hidden="true" />
        {row.icon && (
          <span className="flex shrink-0 items-center" data-testid={`${testId}-row-icon-${row.id}`}>
            {row.icon}
          </span>
        )}
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="truncate text-[14px] font-medium leading-5 text-text-primary" title={row.title}>
              {row.title}
            </span>
            {row.pill && <span className="flex shrink-0 items-center">{row.pill}</span>}
          </span>
          {(row.subline !== undefined || hasHoverLine) && (
            <span className="min-w-0 text-[12px] leading-4 text-text-secondary">
              {row.subline !== undefined && (
                <span
                  data-testid={`${testId}-row-subline-${row.id}`}
                  className={cn(
                    'block truncate',
                    hasHoverLine && (current ? 'hidden' : 'group-hover:hidden group-focus-within:hidden'),
                  )}
                >
                  {row.subline}
                </span>
              )}
              {hasHoverLine && (
                <span
                  aria-hidden={row.subline !== undefined ? true : undefined}
                  data-testid={`${testId}-row-hover-subline-${row.id}`}
                  className={cn(
                    'truncate',
                    current || row.subline === undefined ? 'block' : 'hidden group-hover:block group-focus-within:block',
                  )}
                >
                  {row.hoverSubline}
                </span>
              )}
            </span>
          )}
        </span>
      </button>
      {row.hoverActions && (
        <span
          data-testid={`${testId}-row-actions-${row.id}`}
          className={cn(
            'flex shrink-0 items-center gap-1.5 transition-opacity duration-100',
            current
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
          )}
        >
          {row.hoverActions}
        </span>
      )}
      {row.trailing && (
        <span className="flex shrink-0 items-center gap-1.5 text-[13px]" data-testid={`${testId}-row-trailing-${row.id}`}>
          {row.trailing}
        </span>
      )}
      {hasMenu && (
        <span
          data-grouped-list-menu
          data-testid={`${testId}-row-menu-${row.id}`}
          className="flex shrink-0 items-center"
          onContextMenu={(event) => event.stopPropagation()}
        >
          <DropdownMenu
            trigger={<span aria-hidden="true" className="text-base leading-none">⋯</span>}
            triggerLabel={menuLabel}
            triggerTabIndex={-1}
            triggerTestId={`${testId}-row-menu-trigger-${row.id}`}
            align="end"
            sections={menuSections!}
            triggerClassName="h-7 w-7 border-transparent px-0 py-0 text-text-secondary hover:border-border"
          />
        </span>
      )}
    </li>
  );
}

export default GroupedList;
