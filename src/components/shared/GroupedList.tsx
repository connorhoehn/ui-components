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
//
// ## `leading` and `meta` (a work list's checkbox and "5 pts · Layla Hassan")
//
// `leading` sits in the caret column, as a SIBLING before the row's button —
// a checkbox nested in a button is invalid HTML and would open the row on
// every tick. It is its own tab stop (it is a control, not a row), and keys
// pressed in it are its own: the list's arrows ignore it.
//
// `meta` is a second line INSIDE the button, above `subline` when both are
// given. It is therefore non-interactive by contract — avatars, points, a
// chip, a coloured label. Anything a reader clicks goes in `leading`,
// `trailing` or `hoverActions`, which are outside the button.
//
// ## Reorder (`onReorder`)
//
// With `onReorder`, each row that `canReorder` allows draws a grip handle at
// its end, and the list reports `(rowId, toGroupId, index)` where `index` is
// the row's FINAL position in the target group. The list never reorders
// itself: the host applies the move and passes new rows back.
//
// - Alt+ArrowUp / Alt+ArrowDown on a focused row — one place up / down within
//   its group (nothing at either end).
// - Alt+ArrowLeft / Alt+ArrowRight — to the END of the previous / next group
//   in `groups` order (appending is the one position that always exists; a
//   closed target group is opened so focus can follow).
// - Focus follows the row once the host re-renders it in place, and the move
//   is announced politely ("Moved X to position 2 of 4 in In progress").
// - Pointer drag uses `@dnd-kit`, which is an OPTIONAL peer while this file is
//   in the ROOT entry — so it is reached only through a dynamic
//   `import('./GroupedListSortable')` (a separate chunk; see
//   `SortableSlideList` for the history). Not `React.lazy`: a lazy component
//   whose import fails throws to the nearest error boundary, while this
//   import's failure (peer not installed) just leaves the list keyboard-only
//   with an inert handle. Until the chunk arrives the list renders the same
//   rows and handles, unwrapped. Nothing is translated under the pointer (no
//   inline transforms): the dragged row dims and the drop target shows an
//   insertion edge.

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
import { GripIcon } from '../ui/Icons';
import {
  RailCaretIcon,
  RAIL_CURRENT_FILL,
  RAIL_GROUP_COUNT,
  RAIL_GROUP_LABEL,
  RAIL_GROUP_LABEL_INK,
  RAIL_GROUP_PAD_Y,
  RAIL_ITEM_TEXT,
  RAIL_ROW_PAD_Y,
} from './railType';

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
  /**
   * A control in the caret column — normally a `Checkbox`. Rendered OUTSIDE the
   * row's button, so pressing it never opens the row.
   */
  leading?: ReactNode;
  /** A decorative status mark needs only an 8px column; controls keep their full target. */
  leadingSize?: 'control' | 'indicator' | 'none';
  /**
   * A second line inside the row's button, above `subline` — avatar, points,
   * owner. Non-interactive by contract (it is inside a button).
   */
  meta?: ReactNode;
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
  /**
   * Turns on reorder: a drag handle per row plus Alt+arrow keys. `index` is the
   * row's final position within `toGroupId`. The host applies the move.
   */
  onReorder?: (rowId: string, toGroupId: string, index: number) => void;
  /** Which rows can move. Default: every row that is not `disabled`. */
  canReorder?: (row: GroupedListRow) => boolean;
  /** Accessible name of a row's drag handle. Default `Reorder <title>`. */
  reorderLabel?: (row: GroupedListRow) => string;
  /**
   * `sm` (default): 14px titles, 12px meta, a tinted current row. `md` — the
   * Work column: 14px group headers (15px before 2.441.4), rail titles, 12px meta (13px before), taller rows, a
   * current row that is a rounded tint with a 3px primary bar on its left
   * edge, and a larger drag handle that is always visible.
   */
  size?: 'sm' | 'md';
  /**
   * How a group header reads. `title` (default): a sentence-case heading
   * (14px at both sizes since 2.441.4) with its count in a 12px neutral chip (10px before). `label`: a section
   * label — 11px uppercase semibold, letter-spaced, secondary ink — with the
   * count as plain muted text after it ("RECENTLY UPDATED 4"), for a list
   * whose groups are time bands rather than named things. Since 2.389.0.
   */
  groupHeading?: 'title' | 'label';
  /**
   * How the current row is marked. `tint` (default): a pale primary fill (at
   * `md`, also the 3px bar). `bar`: the fill plus a 2px inset primary bar on
   * the left edge at `sm` too. Since 2.389.0.
   */
  currentStyle?: 'tint' | 'bar';
  /**
   * How a `title` group header's count reads. `chip` (default): a neutral
   * count chip. `plain`: muted text after the title — "In progress 9". (A
   * `label` heading's count is always plain.) Since 2.390.0.
   */
  groupCountStyle?: 'chip' | 'plain';
  /**
   * Where a group header's count sits. `inline` (default): right after the
   * title. `end`: pushed to the header's right edge — "IN PROGRESS … 9", the
   * Initiatives v2 rail. Applies to every heading and count style. Since
   * 2.392.0.
   */
  groupCountAlign?: 'inline' | 'end';
  /**
   * `ruled` (default): a 1px rule above every row. `plain` (since 2.392.0):
   * no rules — a title-only list whose rows are separated by space alone —
   * the Initiatives v2 rail. Since 2.397.0 a plain row is a RAIL row: it
   * draws the shared rail scale (`railType`: 15px/500 titles on a 40px pitch,
   * the 3px-bar current row) at any `size`, the same scale as SubNavLayout.
   */
  rowStyle?: 'ruled' | 'plain';
  className?: string;
  'data-testid'?: string;
}

// ---------------------------------------------------------------------------
// Reorder helpers
// ---------------------------------------------------------------------------

/** The droppable id of a group header (drop there = end of that group). */
export const GROUPED_LIST_GROUP_DROP_PREFIX = '__grouped-list-group__:';

/**
 * Where a drop of `activeId` onto `overId` lands: `overId` is a row id (take
 * its place in its group) or a group droppable id (the end of that group).
 * `null` when nothing would move. Pure; exported for tests.
 */
export function resolveGroupedListDrop(
  rows: GroupedListRow[],
  activeId: string,
  overId: string,
): { toGroupId: string; index: number } | null {
  const active = rows.find((r) => r.id === activeId);
  if (!active || activeId === overId) return null;
  if (overId.startsWith(GROUPED_LIST_GROUP_DROP_PREFIX)) {
    const toGroupId = overId.slice(GROUPED_LIST_GROUP_DROP_PREFIX.length);
    const inTarget = rows.filter((r) => r.groupId === toGroupId && r.id !== activeId).length;
    const from = rows.filter((r) => r.groupId === toGroupId).findIndex((r) => r.id === activeId);
    if (toGroupId === active.groupId && from === inTarget) return null;
    return { toGroupId, index: inTarget };
  }
  const over = rows.find((r) => r.id === overId);
  if (!over) return null;
  const index = rows.filter((r) => r.groupId === over.groupId).findIndex((r) => r.id === overId);
  return { toGroupId: over.groupId, index };
}

type SortableModule = typeof import('./GroupedListSortable');
let sortableLoad: Promise<SortableModule | null> | null = null;
/** One dynamic import per page; a missing optional peer resolves to `null`. */
function loadSortable(): Promise<SortableModule | null> {
  sortableLoad ??= import('./GroupedListSortable').catch(() => null);
  return sortableLoad;
}

const HANDLE_CLASS = cn(
  'flex h-7 w-5 shrink-0 cursor-grab select-none touch-none items-center justify-center rounded border-0 bg-transparent p-0',
  'text-text-tertiary hover:text-text-secondary',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
);

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
  onReorder,
  canReorder,
  reorderLabel,
  size = 'sm',
  groupHeading = 'title',
  currentStyle = 'tint',
  groupCountStyle = 'chip',
  groupCountAlign = 'inline',
  rowStyle = 'ruled',
  className,
  'data-testid': testId = 'grouped-list',
}: GroupedListProps) {
  const md = size === 'md';
  const labelHeading = groupHeading === 'label';
  // `end`: the count takes the header's right edge (a little in from it, so
  // it lines up with a row's trailing content rather than the hover fill).
  const countEnd = groupCountAlign === 'end' ? 'ml-auto pr-1' : undefined;
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

  // ---- Reorder -----------------------------------------------------------
  const reorderable = useCallback(
    (row: GroupedListRow) => !!onReorder && (canReorder ? canReorder(row) : !row.disabled),
    [onReorder, canReorder],
  );
  const [announcement, setAnnouncement] = useState('');
  /** A keyboard move waiting for the host to re-render the row in its new place. */
  const pendingFocus = useRef<{ id: string; groupId: string; index: number } | null>(null);
  const [sortable, setSortable] = useState<SortableModule | null>(null);
  const [overGroup, setOverGroup] = useState<string | null>(null);
  const headerRefs = useRef(new Map<string, HTMLElement | null>());
  const wantsDnd = !!onReorder;

  useEffect(() => {
    if (!wantsDnd || sortable) return;
    let live = true;
    void loadSortable().then((mod) => {
      if (live && mod) setSortable(mod);
    });
    return () => {
      live = false;
    };
  }, [wantsDnd, sortable]);

  /** Reports a move, announces it, and asks focus to follow the row. */
  const commitMove = useCallback(
    (row: GroupedListRow, toGroupId: string, index: number) => {
      if (!onReorder) return;
      const target = groups.find((g) => g.id === toGroupId);
      const others = (rowsByGroup.get(toGroupId) ?? []).filter((r) => r.id !== row.id).length;
      onReorder(row.id, toGroupId, index);
      setAnnouncement(`Moved ${row.title} to position ${index + 1} of ${others + 1} in ${target?.title ?? toGroupId}`);
    },
    [onReorder, groups, rowsByGroup],
  );

  const moveByKey = useCallback(
    (row: GroupedListRow, key: string) => {
      const siblings = rowsByGroup.get(row.groupId) ?? [];
      const at = siblings.findIndex((r) => r.id === row.id);
      let move: { toGroupId: string; index: number } | null = null;
      if (key === 'ArrowUp' && at > 0) move = { toGroupId: row.groupId, index: at - 1 };
      else if (key === 'ArrowDown' && at >= 0 && at < siblings.length - 1) move = { toGroupId: row.groupId, index: at + 1 };
      else if (key === 'ArrowLeft' || key === 'ArrowRight') {
        const g = groups.findIndex((gr) => gr.id === row.groupId);
        const target = groups[key === 'ArrowLeft' ? g - 1 : g + 1];
        if (g >= 0 && target) move = { toGroupId: target.id, index: rowsByGroup.get(target.id)?.length ?? 0 };
      }
      if (!move) return;
      commitMove(row, move.toGroupId, move.index);
      pendingFocus.current = { id: row.id, groupId: move.toGroupId, index: move.index };
      if (!isOpen(move.toGroupId)) setOpen(move.toGroupId, true);
    },
    [rowsByGroup, groups, commitMove, isOpen, setOpen],
  );

  const onDrop = useCallback(
    (activeId: string, overId: string) => {
      const row = rows.find((r) => r.id === activeId);
      const drop = row && reorderable(row) ? resolveGroupedListDrop(rows, activeId, overId) : null;
      if (row && drop) commitMove(row, drop.toGroupId, drop.index);
    },
    [rows, reorderable, commitMove],
  );

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

  // Focus follows a keyboard-moved row once it sits where it was sent (moving
  // a focused node between lists drops its focus). Checked every render; the
  // next keypress in the list abandons it, so a rejected move never steals focus later.
  useEffect(() => {
    const pending = pendingFocus.current;
    if (!pending) return;
    const inPlace = (rowsByGroup.get(pending.groupId) ?? []).findIndex((r) => r.id === pending.id) === pending.index;
    if (!inPlace || !focusOrder.includes(`r:${pending.id}`)) return;
    pendingFocus.current = null;
    const el = rootRef.current?.querySelector<HTMLElement>(`[data-focus-key="${cssEscape(`r:${pending.id}`)}"]`);
    if (el && el !== document.activeElement) focusKey(`r:${pending.id}`);
  });

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
      pendingFocus.current = null;

      if (event.altKey && onReorder && event.key.startsWith('Arrow')) {
        if (isGroup) return;
        event.preventDefault();
        const row = rows.find((r) => r.id === id);
        if (row && reorderable(row)) moveByKey(row, event.key);
        return;
      }

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
    [focusOrder, focusKey, isOpen, setOpen, rows, rowsByGroup, onReorder, reorderable, moveByKey],
  );

  const list = (
    <div ref={rootRef} data-testid={testId} className={cn('flex flex-col', className)} onKeyDown={onKeyDown}>
      {onReorder && (
        <div role="status" aria-live="polite" className="sr-only" data-testid={`${testId}-reorder-status`}>
          {announcement}
        </div>
      )}
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
            <h3
              // The heading wrapper carries its button's step (or the rail label's), so the
              // element itself never measures the document's 16px beside the rail captions.
              className={cn('m-0 rounded-md', labelHeading ? RAIL_GROUP_LABEL : 'text-sm font-semibold', overGroup === group.id && 'bg-primary/8')}
              data-drop-over={overGroup === group.id || undefined}
              ref={(el) => {
                headerRefs.current.set(group.id, el);
              }}
            >
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
                data-heading={labelHeading ? 'label' : undefined}
                className={cn(
                  'flex w-full items-center gap-2.5 border-0 bg-transparent px-2 text-left',
                  RAIL_GROUP_PAD_Y,
                  labelHeading
                    ? cn(RAIL_GROUP_LABEL, RAIL_GROUP_LABEL_INK)
                    : 'text-sm font-semibold text-text-primary', // 14/600 at both sizes: a heading button is a control (md was 15px before 2.441.4)
                  'rounded-md hover:bg-surface-hover',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                )}
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center text-text-secondary">
                  <RailCaretIcon open={open} />
                </span>
                {group.icon && (
                  <span className="flex shrink-0 items-center text-text-secondary" data-testid={`${testId}-group-icon-${group.id}`}>
                    {group.icon}
                  </span>
                )}
                <span className="truncate">{group.title}</span>
                {typeof group.count === 'number' && !labelHeading && groupCountStyle === 'plain' && (
                  <span className={cn('shrink-0 text-xs font-medium tabular-nums text-text-secondary', countEnd)} aria-label={`${group.count} items`} data-testid={`${testId}-group-count-${group.id}`} data-count-style="plain" data-count-align={groupCountAlign === 'end' ? 'end' : undefined}>
                    {group.count}
                  </span>
                )}
                {typeof group.count === 'number' && labelHeading && (
                  <span className={cn('shrink-0', RAIL_GROUP_COUNT, countEnd)} aria-label={`${group.count} items`} data-testid={`${testId}-group-count-${group.id}`} data-count-align={groupCountAlign === 'end' ? 'end' : undefined}>
                    {group.count}
                  </span>
                )}
                {typeof group.count === 'number' && !labelHeading && groupCountStyle !== 'plain' && (
                  <Chip size="md" tone="neutral" className={cn('shrink-0', countEnd)} aria-label={`${group.count} items`} data-testid={`${testId}-group-count-${group.id}`} data-count-align={groupCountAlign === 'end' ? 'end' : undefined}>
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
                <li className="px-4 py-3 pl-12 text-xs text-text-tertiary" data-testid={`${testId}-group-empty-${group.id}`}>
                  {group.emptyLabel ?? 'Nothing here'}
                </li>
              )}
              {open &&
                groupRows.map((row) => (
                  <Row
                    key={row.id}
                    row={row}
                    current={row.current || row.id === currentId}
                    currentStyle={currentStyle}
                    rowStyle={rowStyle}
                    testId={testId}
                    size={size}
                    tabbable={tabTarget === `r:${row.id}`}
                    onFocusRow={() => setFocused(`r:${row.id}`)}
                    onOpenRow={onOpenRow}
                    menuSections={rowMenu?.(row)}
                    menuLabel={rowMenuLabel?.(row) ?? `Actions for ${row.title}`}
                    reorder={
                      reorderable(row)
                        ? { label: reorderLabel?.(row) ?? `Reorder ${row.title}`, sortable }
                        : undefined
                    }
                  />
                ))}
            </ul>
            {/* After the header, so its ref is attached when this registers it. */}
            {sortable && (
              <sortable.GroupDropTarget
                id={`${GROUPED_LIST_GROUP_DROP_PREFIX}${group.id}`}
                getNode={() => headerRefs.current.get(group.id) ?? null}
                onOverChange={(over) =>
                  setOverGroup((prev) => (over ? group.id : prev === group.id ? null : prev))
                }
              />
            )}
          </section>
        );
      })}
    </div>
  );

  if (!sortable) return list;
  return (
    <sortable.GroupedListDndRoot ids={focusOrder.filter((k) => k.startsWith('r:')).map((k) => k.slice(2))} onDrop={onDrop}>
      {list}
    </sortable.GroupedListDndRoot>
  );
}

// ---------------------------------------------------------------------------
// Row
// ---------------------------------------------------------------------------

interface RowProps {
  row: GroupedListRow;
  current: boolean;
  currentStyle: 'tint' | 'bar';
  rowStyle: 'ruled' | 'plain';
  testId: string;
  size: 'sm' | 'md';
  tabbable: boolean;
  onFocusRow: () => void;
  onOpenRow?: (row: GroupedListRow) => void;
  menuSections: DropdownMenuSection[] | null | undefined;
  menuLabel: string;
  /** Present when this row can move: the handle's name, and dnd once loaded. */
  reorder?: { label: string; sortable: SortableModule | null };
}

function Row({ row, current, currentStyle, rowStyle, testId, size, tabbable, onFocusRow, onOpenRow, menuSections, menuLabel, reorder }: RowProps) {
  const hasMenu = !!menuSections && menuSections.some((s) => s.items.length > 0);
  const hasHoverLine = row.hoverSubline !== undefined && row.hoverSubline !== null;
  const hasMeta = row.meta !== undefined && row.meta !== null;
  const hasLeading = row.leading !== undefined && row.leading !== null;
  const rKey: FocusKey = `r:${row.id}`;
  const md = size === 'md';
  // A plain row is a rail row: it draws the shared rail scale (railType.tsx)
  // whatever `size` says, so a rail can't drift from the shell rail beside it.
  const railRow = md || rowStyle === 'plain';
  const [drag, setDrag] = useState({ dragging: false, over: false });
  const onDragState = useCallback((next: { dragging: boolean; over: boolean }) => {
    setDrag((prev) => (prev.dragging === next.dragging && prev.over === next.over ? prev : next));
  }, []);

  const handleProps = {
    'aria-label': reorder?.label,
    title: 'Drag to reorder, or Alt+arrow keys on the row',
    'data-testid': `${testId}-row-handle-${row.id}`,
    className: cn(HANDLE_CLASS, md && 'h-8 w-6 text-text-secondary'),
  };
  const grip = <GripIcon size={md ? 20 : 14} />;

  return (
    <li
      data-dragging={drag.dragging || undefined}
      data-drop-over={(drag.over && !drag.dragging) || undefined}
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
        'group relative flex items-center px-2',
        row.leadingSize === 'indicator' ? 'gap-2' : 'gap-3',
        rowStyle === 'plain' ? 'border-t-0' : 'border-t border-border',
        // plain rows are the rail form: the shared rail pitch at any size.
        rowStyle === 'plain' ? RAIL_ROW_PAD_Y : md ? 'py-[7px]' : 'py-2.5',
        'transition-colors duration-100',
        current ? cn(RAIL_CURRENT_FILL, 'hover:bg-primary/12') : 'hover:bg-surface-hover',
        // md (and every plain rail row): the current row is a rounded tint
        // with a 3px bar on its left edge; the rows either side keep their
        // rules, this one drops its own.
        railRow && current && 'rounded-r-md border-transparent shadow-[inset_3px_0_0_0_var(--color-primary)]',
        // bar (2.389.0): the same edge bar at sm, 2px.
        !railRow && current && currentStyle === 'bar' && 'shadow-[inset_2px_0_0_0_var(--color-primary)]',
        row.disabled && 'opacity-60',
        drag.dragging && 'opacity-50',
        drag.over && !drag.dragging && 'shadow-[inset_0_2px_0_0_var(--color-primary)]',
      )}
    >
      {hasLeading && (
        <span className={cn('flex shrink-0 items-center justify-center', row.leadingSize === 'indicator' ? 'w-2' : md ? 'w-6' : 'w-5')} data-ui-rail-leading={row.leadingSize} data-testid={`${testId}-row-leading-${row.id}`}>
          {row.leading}
        </span>
      )}
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
        {!hasLeading && row.leadingSize !== 'none' && <span className="w-5 shrink-0" aria-hidden="true" />}
        {row.icon && (
          <span className="flex shrink-0 items-center" data-testid={`${testId}-row-icon-${row.id}`}>
            {row.icon}
          </span>
        )}
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex min-w-0 items-center gap-2.5">
            <span data-ui-text={railRow ? 'rail-item' : undefined} className={cn('truncate text-text-primary', railRow ? RAIL_ITEM_TEXT : 'text-[14px] font-medium leading-5')} title={row.title}>
              {row.title}
            </span>
            {row.pill && <span className="flex shrink-0 items-center">{row.pill}</span>}
          </span>
          {hasMeta && (
            <span
              data-testid={`${testId}-row-meta-${row.id}`}
              className={cn('flex min-w-0 items-center gap-1.5 truncate text-text-secondary', md ? 'text-xs leading-5' : 'text-[12px] leading-4')}
            >
              {row.meta}
            </span>
          )}
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
        <span className="flex shrink-0 items-center gap-1.5 text-xs" data-testid={`${testId}-row-trailing-${row.id}`}>
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
      {reorder &&
        (reorder.sortable ? (
          <reorder.sortable.SortableHandle id={row.id} onStateChange={onDragState} {...handleProps}>
            {grip}
          </reorder.sortable.SortableHandle>
        ) : (
          <button type="button" tabIndex={-1} {...handleProps}>
            {grip}
          </button>
        ))}
    </li>
  );
}

export default GroupedList;
