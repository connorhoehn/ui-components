// StackedRail — the concise stacking left menu, grown up enough to hold a
// documents tree.
//
// ## What it is
//
// The Org tenant's explorer rail (/iq/library) is a caption ("AGENT
// LIBRARY"), collapsible group headers with a plain count ("KIND 6") and
// plain 13px rows with a right-aligned count, the current row tinted — no
// card chrome, no icons unless asked for. `RailNavList` draws those rows but
// is flat: one list, no groups, no nesting. The documents rails (sources →
// pages → child pages, an age at the right, a ⋯ per row, presence on a
// source, drag to move) reached for `TreeView size="rail"` and a card panel
// instead, and so drew a second rail look. StackedRail is that tree in the
// first look: every row is a `SubNavLayout` row — the Org rail itself (13px
// type, a 36px pitch of 8px + a 20px line + 8px, a 14px side inset behind a
// 3px left edge that turns primary on the current row, over the 8% tint) —
// and headings sit at that pitch too. (2.407.30–.32 drew RailNavList's 32px
// row; since 2.407.33 the rows are the reference's 36px, `RAIL_ROW_PITCH`.)
//
// ## Geometry: one gutter model
//
// Every row and every heading starts at SubNavLayout's row inset (a 3px edge
// + 14px, so text at 17px; part of the row class), then draws a run of 18px gutter cells
// before its text: one per nesting level, plus one holding the caret when it
// has children. A heading draws one cell — the caret, or an empty cell when
// it does not collapse. So, with no other numbers:
//
// - a leaf at level d has its text at 17 + 18·d (level 0 = SubNavLayout's text);
// - a row with children puts its caret in that column and its label one step
//   in, where its children's text starts;
// - a collapsible heading's caret sits in its level-0 rows' text column, and
//   every heading's label (collapsible or not, and the rail caption) is at 35.
//
// (2.407.32; before, the heading button padded inside a padded row, rows with
// a caret slot added it on top of an 18px/level `pl-*` table, and a heading
// that did not collapse dropped its caret column.)
//
// ## Semantics
//
// A `<nav>` of groups. Each group is a `<section>` whose heading is a button
// when it collapses. Rows are links (`href`) or buttons, marked
// `aria-current="page"` when current, `aria-expanded` when they have
// children. Keyboard: one tab stop for the whole tree (roving tabindex);
// Up/Down/Home/End walk the visible headers and rows, Right opens (or steps
// into) a node, Left closes it (or steps to its parent), Enter/Space select.
// The row ⋯ slot and group actions stay ordinary tab stops.
//
// ## The chrome budget (2.407.36)
//
// At the Org rail's 220px (`railWidth="xs"`) the label is the first thing to
// give, so the chrome around it is rationed: a group heading's `actions` wait
// for hover, keyboard focus (focus-visible — Tab onto the heading, or onto the
// actions themselves), an open menu, or a current group, and are always out
// on a touch screen (`@media (hover: none)`); `trailing` presence and the
// count never hide or shrink. The caption's count sits right after its title,
// and two or more caption actions fold into one ⋯ below 240px. Headings and
// the caption carry their full name in `title`, as rows always have.
//
// ## Deliberately the host's
//
// Drag and drop is pass-through: the handlers and `data-*` attributes go on
// the row (or group heading) control untouched; what a drop means — before,
// after, into, allowed or not — is the host's rule, not this list's.

import {
  useRef,
  useState,
  type DragEventHandler,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { MoreIcon } from '../ui/Icons';
import { DropdownMenu } from './DropdownMenu';
import {
  RailCaretIcon,
  RAIL_CURRENT_FILL,
  RAIL_GROUP_COUNT,
  RAIL_GROUP_LABEL,
  RAIL_GROUP_LABEL_INK,
  RAIL_ITEM_COUNT,
  RAIL_ITEM_TEXT,
  RAIL_ROW_PAD_Y,
} from './railType';

/** `data-*` attributes passed straight through to a row or group heading. */
export type StackedRailDataAttributes = Record<`data-${string}`, string | number | boolean | undefined>;

/** Drag pass-through: the host owns what a drag and a drop mean. */
export interface StackedRailDragProps {
  draggable?: boolean;
  onDragStart?: DragEventHandler<HTMLElement>;
  onDragOver?: DragEventHandler<HTMLElement>;
  onDragEnter?: DragEventHandler<HTMLElement>;
  onDragLeave?: DragEventHandler<HTMLElement>;
  onDrop?: DragEventHandler<HTMLElement>;
  onDragEnd?: DragEventHandler<HTMLElement>;
  /** Extra `data-*` attributes for the element that carries the testid. */
  data?: StackedRailDataAttributes;
}

export interface StackedRailRow extends StackedRailDragProps {
  id: string;
  label: string;
  /** A link target. Without it the row is a button calling `onSelect`. */
  href?: string;
  /** Called on activation — also for `href` rows (the host's router). */
  onSelect?: () => void;
  /** Router interception; keep modified clicks native by checking the event. */
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /** The view on screen. Also set by `selectedId`. */
  current?: boolean;
  /** Right-aligned muted meta: a number is a count ("0" shows), a string an age ("3h"). */
  meta?: number | string;
  /**
   * After `meta`, at the row's right edge: a small presence stack (20px
   * avatars), a status dot. It never moves the text column or the 36px pitch.
   */
  trailing?: ReactNode;
  /** A small glyph before the label. None by default — the rail is words. */
  icon?: ReactNode;
  children?: StackedRailRow[];
  /** Controlled disclosure. With `onToggle`, the host owns it; alone, the initial state. */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  disabled?: boolean;
  /** Tooltip on a disabled row: why it cannot be opened. */
  disabledReason?: string;
  /** Busy (a move or pull in flight): translucent and `aria-busy`. */
  pending?: boolean;
  /** The hover/focus-revealed row menu slot (a ⋯ `DropdownMenu`, usually). */
  menu?: ReactNode | ((row: StackedRailRow) => ReactNode);
  /** The row control's testid. Default `${listTestId}-row-${id}`. */
  testId?: string;
}

/** A group heading action: a 28px ghost icon button. */
export interface StackedRailAction {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  'data-testid'?: string;
}

export interface StackedRailGroup extends StackedRailDragProps {
  id: string;
  /** The heading's label; also its `title`, so a truncated one reads whole on hover. */
  title: string;
  /** Plain count after the heading ("KIND 6"). */
  count?: number;
  /** Default true. A non-collapsible group draws its heading as text. */
  collapsible?: boolean;
  /** Controlled open state (with `onToggle`), else the initial one. Default open. */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  /** Right of the heading — presence avatars, a status. */
  trailing?: ReactNode;
  /**
   * 28px icon buttons at the heading's right edge, or the host's own nodes (a
   * ⋯ `DropdownMenu`). Revealed, not always drawn (2.407.36): they take no
   * width until the heading is hovered, holds keyboard focus (Tab onto the
   * heading or into the actions — `:focus-visible`, so a mouse click on the
   * heading does not pin them), has a menu open (`aria-expanded="true"`
   * inside), or the group is current; on a touch screen (`hover: none`)
   * they are always out. Hidden they stay in the tab order and the
   * accessibility tree (visually hidden, like `sr-only`), never `display:none`.
   * `trailing` and `count` are not part of this and always show.
   */
  actions?: StackedRailAction[] | ReactNode;
  /**
   * The group holds the view on screen: its actions stay out. Derived when
   * any row in it (at any depth) is current; set it to force either way.
   */
  current?: boolean;
  rows: StackedRailRow[];
  /** The line an empty open group shows. Default "Nothing here yet." */
  emptyLabel?: ReactNode;
  /** Busy (the whole source mid-pull): translucent and `aria-busy`. */
  pending?: boolean;
  /** The group section's testid. Default `${listTestId}-group-${id}`. */
  testId?: string;
}

export interface StackedRailProps {
  /** The rail's caption ("AGENT LIBRARY"). */
  title?: string;
  /** Plain count directly after the caption ("DOCUMENTS 187"), like a group's. */
  count?: number;
  /**
   * The caption's actions. A `ReactNode`, or a single `StackedRailAction`,
   * draws as-is at the right edge. Two or more `StackedRailAction`s draw as
   * 28px icon buttons while the rail is 240px or wider (`railWidth="sm"` and
   * up), and fold into one ⋯ menu (`${data-testid}-actions-menu`, one item
   * per action, disabled carried over) below that — at `xs` (220px) three
   * buttons would leave the caption "DOCUM… 187". A container query on the
   * caption row decides, so the rail needs no width prop. (2.407.36)
   */
  actions?: StackedRailAction[] | ReactNode;
  groups: StackedRailGroup[];
  /** The current row, in place of (or as well as) `row.current`. */
  selectedId?: string | null;
  /**
   * The current row always wears the 3px primary edge. `tint` (default, the
   * Org rail) adds the 8% primary fill; `weight` draws it semibold instead.
   */
  currentStyle?: 'tint' | 'weight';
  /** The nav landmark's name. Default "Navigation". */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

/**
 * SubNavLayout's row inset: a 3px left edge (transparent; primary when
 * current) then 14px, so text sits 17px in. Rows, headings, the caption and
 * the empty line all start here.
 */
const ROW_INSET = 'border-y-0 border-r-0 border-l-[3px] border-solid border-transparent px-[14px]';

/**
 * The row control — the Org rail's (SubNavLayout) row: 13px/500 on a 36px
 * pitch (8px + a 20px line + 8px, `RAIL_ROW_PITCH`), no gap between rows, no
 * radius. Group headings and the caption sit at the same 36px.
 */
export const STACKED_RAIL_ROW_CLASS = cn(
  'flex w-full min-w-0 items-center gap-2.5 bg-transparent text-left',
  ROW_INSET,
  RAIL_ROW_PAD_Y,
  RAIL_ITEM_TEXT,
  'text-text-primary no-underline [font-family:inherit]',
  'transition-colors duration-100 hover:bg-surface-hover',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
);

/** The current row: the 3px primary edge (plus the tint or the weight). */
const CURRENT_EDGE = 'border-l-primary';

/** Vertical padding for headings and empty lines: the row's 36px pitch. */
const ROW_PAD_Y = RAIL_ROW_PAD_Y;

/**
 * One gutter cell: the single 18px indent step. A nesting level is one empty
 * cell; a caret is one cell with the caret at its left edge (so the caret's x
 * is the text x of a leaf at the same level). Exported for the geometry test.
 */
export const STACKED_RAIL_STEP_CLASS = 'flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary';

/**
 * The run of gutter cells before a row's (or heading's) text. It cancels the
 * flex gap that follows it, so the cells alone set the text x: the row class
 * gaps by 10px (`gap-2.5`), a heading by 8px (`gap-2`).
 */
function Gutter({ cancelGap, children }: { cancelGap: '-mr-2.5' | '-mr-2'; children: ReactNode }) {
  return <span className={cn('flex shrink-0', cancelGap)} data-rail-gutter="">{children}</span>;
}

/**
 * A group heading's actions slot (2.407.36): visually hidden (`sr-only`, so
 * it takes no width yet stays a tab stop and in the accessibility tree) until
 * the heading strip (`group/head`) is hovered, holds a `:focus-visible`
 * element (the heading or an action, reached by Tab), a menu inside is open,
 * or the group is current (`data-current` on the strip); always out when the
 * primary pointer cannot hover (touch). Exported for the test.
 */
export const STACKED_RAIL_GROUP_ACTIONS_CLASS = cn(
  'sr-only flex shrink-0 items-center gap-0.5',
  'group-hover/head:not-sr-only',
  'group-has-[:focus-visible]/head:not-sr-only',
  'group-data-[current]/head:not-sr-only',
  'has-[[aria-expanded=true]]:not-sr-only',
  '[@media(hover:none)]:not-sr-only',
);

/** Menu slot: hidden until the row is hovered or focused, or its menu is open. */
const MENU_SLOT_CLASS =
  'hidden shrink-0 items-center pr-1 group-hover/row:flex group-focus-within/row:flex has-[[aria-expanded=true]]:flex';

function dragProps(source: StackedRailDragProps) {
  return {
    ...(source.draggable !== undefined ? { draggable: source.draggable } : {}),
    ...(source.onDragStart ? { onDragStart: source.onDragStart } : {}),
    ...(source.onDragOver ? { onDragOver: source.onDragOver } : {}),
    ...(source.onDragEnter ? { onDragEnter: source.onDragEnter } : {}),
    ...(source.onDragLeave ? { onDragLeave: source.onDragLeave } : {}),
    ...(source.onDrop ? { onDrop: source.onDrop } : {}),
    ...(source.onDragEnd ? { onDragEnd: source.onDragEnd } : {}),
    ...(source.data ?? {}),
  };
}

function isActionList(actions: unknown): actions is StackedRailAction[] {
  return Array.isArray(actions) && actions.every((a) => a && typeof a === 'object' && 'label' in a && 'onClick' in a);
}

function Actions({ actions, className, testId }: { actions: StackedRailAction[] | ReactNode; className?: string; testId?: string }) {
  if (actions == null || actions === false) return null;
  const slot = { className: className ?? 'flex shrink-0 items-center gap-0.5', ...(testId ? { 'data-testid': testId } : {}) };
  if (!isActionList(actions)) return <span {...slot}>{actions}</span>;
  if (actions.length === 0) return null;
  return (
    <span {...slot}>
      {actions.map((action) => (
        <IconButton
          key={action.label}
          aria-label={action.label}
          title={action.label}
          size="sm"
          variant="ghost"
          className="h-7 w-7 text-text-secondary"
          icon={action.icon}
          disabled={action.disabled}
          onClick={action.onClick}
          {...(action['data-testid'] ? { 'data-testid': action['data-testid'] } : {})}
        />
      ))}
    </span>
  );
}

/**
 * The caption's actions: inline, or — two or more below 240px, the caption
 * row being the `@container` — one ⋯ menu holding them all.
 */
function CaptionActions({ actions, title, testId }: { actions: StackedRailAction[] | ReactNode; title: string; testId: string }) {
  if (!isActionList(actions) || actions.length < 2) return <Actions actions={actions} />;
  return (
    <>
      <Actions actions={actions} className="flex shrink-0 items-center gap-0.5 @max-[15rem]:hidden" testId={`${testId}-actions`} />
      <span className="hidden shrink-0 items-center @max-[15rem]:flex" data-testid={`${testId}-actions-fold`}>
        <DropdownMenu
          trigger={<MoreIcon size={14} />}
          triggerLabel={`${title} actions`}
          triggerTitle={`${title} actions`}
          triggerTestId={`${testId}-actions-menu`}
          align="end"
          data-testid={`${testId}-actions-panel`}
          sections={[{
            items: actions.map((action) => ({
              label: action.label,
              icon: action.icon,
              onSelect: action.onClick,
              ...(action.disabled ? { disabled: true } : {}),
              ...(action['data-testid'] ? { 'data-testid': `${action['data-testid']}-item` } : {}),
            })),
          }]}
        />
      </span>
    </>
  );
}

function rowsHaveCurrent(rows: StackedRailRow[], isCurrent: (row: StackedRailRow) => boolean): boolean {
  return rows.some((row) => isCurrent(row) || rowsHaveCurrent(row.children ?? [], isCurrent));
}

/** Focus keys: `g:<groupId>` for a heading, `r:<rowId>` for a row. */
interface VisibleEntry {
  key: string;
  parentKey: string | null;
  hasChildren: boolean;
  open: boolean;
  setOpen?: (open: boolean) => void;
  row?: StackedRailRow;
}

export function StackedRail({
  title,
  count,
  actions,
  groups,
  selectedId = null,
  currentStyle = 'tint',
  'aria-label': ariaLabel = 'Navigation',
  className,
  'data-testid': testId = 'stacked-rail',
}: StackedRailProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [groupOpen, setGroupOpenState] = useState<Record<string, boolean>>({});
  const [rowOpen, setRowOpenState] = useState<Record<string, boolean>>({});
  const [focusedKey, setFocusedKey] = useState<string | null>(null);

  const isGroupOpen = (group: StackedRailGroup) =>
    group.collapsible === false ? true : group.onToggle && group.open !== undefined ? group.open : (groupOpen[group.id] ?? group.open ?? true);
  const setGroupOpen = (group: StackedRailGroup, open: boolean) => {
    group.onToggle?.(open);
    if (!(group.onToggle && group.open !== undefined)) setGroupOpenState((prev) => ({ ...prev, [group.id]: open }));
  };
  const isRowOpen = (row: StackedRailRow) =>
    row.onToggle && row.open !== undefined ? row.open : (rowOpen[row.id] ?? row.open ?? false);
  const setRowOpen = (row: StackedRailRow, open: boolean) => {
    row.onToggle?.(open);
    if (!(row.onToggle && row.open !== undefined)) setRowOpenState((prev) => ({ ...prev, [row.id]: open }));
  };

  // Every focusable heading and row on screen, in order — the roving list.
  const visible: VisibleEntry[] = [];
  for (const group of groups) {
    const collapsible = group.collapsible !== false;
    const gOpen = isGroupOpen(group);
    if (collapsible) visible.push({ key: `g:${group.id}`, parentKey: null, hasChildren: true, open: gOpen, setOpen: (o) => setGroupOpen(group, o) });
    if (!gOpen) continue;
    const walk = (rows: StackedRailRow[], parentKey: string | null) => {
      for (const row of rows) {
        const kids = row.children ?? [];
        const open = kids.length > 0 && isRowOpen(row);
        visible.push({ key: `r:${row.id}`, parentKey, hasChildren: kids.length > 0, open, setOpen: (o) => setRowOpen(row, o), row });
        if (open) walk(kids, `r:${row.id}`);
      }
    };
    walk(group.rows, collapsible ? `g:${group.id}` : null);
  }
  const keys = visible.map((entry) => entry.key);
  const isCurrent = (row: StackedRailRow) => Boolean(row.current) || (selectedId != null && row.id === selectedId);
  const currentKey = visible.find((entry) => entry.row && isCurrent(entry.row))?.key;
  const tabKey = focusedKey && keys.includes(focusedKey) ? focusedKey : (currentKey ?? keys[0] ?? null);

  const focusKey = (key: string | null | undefined) => {
    if (!key) return;
    setFocusedKey(key);
    const escaped = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(key) : key.replace(/["\\]/g, '\\$&');
    rootRef.current?.querySelector<HTMLElement>(`[data-rail-key="${escaped}"]`)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const key = target.getAttribute('data-rail-key');
    if (!key) return; // the ⋯ slot and group actions keep their own keys
    const index = keys.indexOf(key);
    const entry = visible[index];
    if (!entry) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusKey(keys[Math.min(index + 1, keys.length - 1)]);
        return;
      case 'ArrowUp':
        event.preventDefault();
        focusKey(keys[Math.max(index - 1, 0)]);
        return;
      case 'Home':
        event.preventDefault();
        focusKey(keys[0]);
        return;
      case 'End':
        event.preventDefault();
        focusKey(keys[keys.length - 1]);
        return;
      case 'ArrowRight':
        event.preventDefault();
        if (entry.hasChildren && !entry.open) entry.setOpen?.(true);
        else if (entry.hasChildren) focusKey(keys[index + 1]);
        return;
      case 'ArrowLeft':
        event.preventDefault();
        if (entry.hasChildren && entry.open) entry.setOpen?.(false);
        else focusKey(entry.parentKey);
        return;
      case ' ':
        // A link does not activate on Space natively; a button does.
        if (target.tagName === 'A') {
          event.preventDefault();
          target.click();
        }
        return;
      default:
    }
  };

  const renderRow = (row: StackedRailRow, depth: number): ReactNode => {
    const kids = row.children ?? [];
    const hasChildren = kids.length > 0;
    const open = hasChildren && isRowOpen(row);
    const current = isCurrent(row);
    const key = `r:${row.id}`;
    const rowTestId = row.testId ?? `${testId}-row-${row.id}`;
    const menu = typeof row.menu === 'function' ? row.menu(row) : row.menu;
    const activate = (event?: MouseEvent<HTMLAnchorElement>) => {
      if (row.disabled) {
        event?.preventDefault();
        return;
      }
      if (event) row.onNavigate?.(event);
      row.onSelect?.();
      // A node with no page of its own (a folder) opens and closes instead.
      if (hasChildren && !row.href && !row.onSelect) setRowOpen(row, !open);
    };
    const body = (
      <>
        {(depth > 0 || hasChildren) && (
          <Gutter cancelGap="-mr-2.5">
            {Array.from({ length: depth }, (_, level) => (
              <span key={level} className={STACKED_RAIL_STEP_CLASS} data-rail-step="indent" />
            ))}
            {hasChildren && (
              <span
                className={STACKED_RAIL_STEP_CLASS}
                data-rail-step="caret"
                data-testid={`${rowTestId}-caret`}
                onClick={(event: MouseEvent) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setRowOpen(row, !open);
                }}
              >
                <RailCaretIcon open={open} />
              </span>
            )}
          </Gutter>
        )}
        {row.icon != null && <span className="flex shrink-0 items-center text-text-secondary">{row.icon}</span>}
        <span className="min-w-0 flex-1 truncate" title={row.label}>{row.label}</span>
        {row.meta !== undefined && row.meta !== '' && (
          <span
            className={cn('shrink-0', RAIL_ITEM_COUNT)}
            data-testid={`${rowTestId}-meta`}
            data-meta-kind={typeof row.meta === 'number' ? 'count' : 'text'}
            {...(typeof row.meta === 'number' ? { 'aria-label': `${row.meta} items` } : {})}
          >
            {row.meta}
          </span>
        )}
        {row.trailing != null && row.trailing !== false && (
          <span className="flex h-5 shrink-0 items-center" data-testid={`${rowTestId}-trailing`}>{row.trailing}</span>
        )}
      </>
    );
    const cls = cn(
      STACKED_RAIL_ROW_CLASS,
      current && CURRENT_EDGE,
      current && (currentStyle === 'tint' ? RAIL_CURRENT_FILL : 'font-semibold'),
      row.disabled ? 'cursor-default opacity-60 hover:bg-transparent' : 'cursor-pointer',
      row.pending && 'opacity-60',
    );
    const common = {
      className: cls,
      'data-testid': rowTestId,
      'data-rail-key': key,
      'data-current': current || undefined,
      'data-depth': depth,
      'data-pending': row.pending || undefined,
      'aria-current': current ? ('page' as const) : undefined,
      'aria-expanded': hasChildren ? open : undefined,
      'aria-busy': row.pending || undefined,
      'aria-disabled': row.disabled || undefined,
      title: row.disabled ? row.disabledReason : undefined,
      tabIndex: tabKey === key ? 0 : -1,
      onFocus: () => setFocusedKey(key),
      ...dragProps(row),
    };
    return (
      <li key={row.id} className="min-w-0">
        <div className="group/row flex min-w-0 items-center">
          {row.href && !row.disabled ? (
            <a href={row.href} onClick={(event) => activate(event)} {...common}>
              {body}
            </a>
          ) : (
            <button type="button" onClick={() => activate()} {...common}>
              {body}
            </button>
          )}
          {menu != null && menu !== false && (
            <span className={MENU_SLOT_CLASS} data-testid={`${rowTestId}-menu`}>
              {menu}
            </span>
          )}
        </div>
        {open && (
          <ul className="m-0 flex list-none flex-col p-0" data-testid={`${rowTestId}-children`}>
            {kids.map((child) => renderRow(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  const anyGroups = groups.length > 0;
  const heading = `${testId}-title`;
  if (!anyGroups && !title) return null;

  return (
    <nav ref={rootRef} aria-label={ariaLabel} className={cn('flex min-w-0 flex-col', className)} data-testid={testId} onKeyDown={onKeyDown}>
      {title && (
        <div className={cn('@container flex h-9 min-w-0 items-center gap-2', ROW_INSET)}>
          <Gutter cancelGap="-mr-2"><span className={STACKED_RAIL_STEP_CLASS} data-rail-step="caption" /></Gutter>
          <span className={cn('min-w-0 truncate', RAIL_GROUP_LABEL, RAIL_GROUP_LABEL_INK)} title={title} data-testid={heading}>{title}</span>
          {typeof count === 'number' && (
            <span className={cn('shrink-0', RAIL_GROUP_COUNT)} aria-label={`${count} items`} data-testid={`${testId}-count`}>{count}</span>
          )}
          <span className="flex-1" />
          {actions != null && <CaptionActions actions={actions} title={title} testId={testId} />}
        </div>
      )}
      {groups.map((group) => {
        const collapsible = group.collapsible !== false;
        const open = isGroupOpen(group);
        const groupTestId = group.testId ?? `${testId}-group-${group.id}`;
        const headerId = `${groupTestId}-header`;
        const key = `g:${group.id}`;
        const label = (
          <>
            {/* Every heading keeps the caret cell, so all heading labels share one x. */}
            <Gutter cancelGap="-mr-2">
              <span className={STACKED_RAIL_STEP_CLASS} data-rail-step={collapsible ? 'caret' : 'caption'} data-testid={`${headerId}-caret`}>
                {collapsible && <RailCaretIcon open={open} />}
              </span>
            </Gutter>
            <span className="min-w-0 truncate" data-testid={`${headerId}-label`}>{group.title}</span>
            {typeof group.count === 'number' && (
              <span className={cn('shrink-0', RAIL_GROUP_COUNT)} aria-label={`${group.count} items`} data-testid={`${groupTestId}-count`}>
                {group.count}
              </span>
            )}
          </>
        );
        const hasActions = group.actions != null && group.actions !== false && !(Array.isArray(group.actions) && group.actions.length === 0);
        const hasTrailing = group.trailing != null && group.trailing !== false;
        const groupCurrent = group.current ?? rowsHaveCurrent(group.rows, isCurrent);
        const headerClass = cn(
          'flex min-w-0 flex-1 items-center gap-2 bg-transparent text-left [font-family:inherit]',
          ROW_INSET,
          // Chrome after the heading brings its own gap: the label keeps the
          // 14px right inset for itself (2.407.36).
          (hasActions || hasTrailing) && 'pr-0',
          ROW_PAD_Y,
          RAIL_GROUP_LABEL,
          RAIL_GROUP_LABEL_INK,
        );
        return (
          <section
            key={group.id}
            aria-labelledby={headerId}
            aria-busy={group.pending || undefined}
            className={cn('flex min-w-0 flex-col', group.pending && 'opacity-60')}
            data-testid={groupTestId}
            data-group-id={group.id}
            data-open={open}
            data-pending={group.pending || undefined}
          >
            <div
              className="group/head relative flex min-w-0 items-center gap-1 pr-1"
              data-current={groupCurrent || undefined}
              data-testid={`${groupTestId}-head`}
            >
              {collapsible ? (
                <button
                  type="button"
                  id={headerId}
                  data-testid={headerId}
                  title={group.title}
                  data-rail-key={key}
                  aria-expanded={open}
                  tabIndex={tabKey === key ? 0 : -1}
                  onFocus={() => setFocusedKey(key)}
                  onClick={() => setGroupOpen(group, !open)}
                  className={cn(headerClass, 'cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary')}
                  {...dragProps(group)}
                >
                  {label}
                </button>
              ) : (
                <h3 id={headerId} data-testid={headerId} title={group.title} className={cn('m-0', headerClass)} {...dragProps(group)}>
                  {label}
                </h3>
              )}
              {hasTrailing && (
                <span className="flex shrink-0 items-center" data-testid={`${groupTestId}-trailing`}>{group.trailing}</span>
              )}
              {hasActions && (
                <Actions actions={group.actions} className={STACKED_RAIL_GROUP_ACTIONS_CLASS} testId={`${groupTestId}-actions`} />
              )}
            </div>
            {open && (
              <ul className="m-0 flex list-none flex-col p-0" data-testid={`${groupTestId}-rows`}>
                {group.rows.length === 0 ? (
                  <li className={cn('text-[13px] leading-5', ROW_INSET, ROW_PAD_Y, 'text-text-tertiary')} data-testid={`${groupTestId}-empty`}>
                    {group.emptyLabel ?? 'Nothing here yet.'}
                  </li>
                ) : (
                  group.rows.map((row) => renderRow(row, 0))
                )}
              </ul>
            )}
          </section>
        );
      })}
    </nav>
  );
}

export default StackedRail;
