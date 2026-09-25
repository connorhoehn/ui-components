// TreeView — nested rows built from a flat `{id, title, parentId}` list, the
// shape a knowledge/document explorer's sidebar actually has on the wire
// (parent_id pointers, not a pre-nested tree). Selection paints a 2px left
// border; a fixed 20px leading slot holds the caret when a row has children
// so a leaf row's title starts at the same x as a directory row's.
//
// Keyboard: the WAI-ARIA tree pattern, built in. One row carries the tab stop
// (roving tabindex), ArrowUp/Down/Home/End walk the VISIBLE rows, ArrowRight
// opens a directory (or steps into it), ArrowLeft closes one (or steps up to
// the parent), Enter/Space select (and toggle a directory). A click anywhere
// on a directory row — caret, icon, title, count; not its ⋯ — selects it AND
// opens/closes it, the same as Enter (2.389.10): the caret alone was a 20px
// target and a click on the title only selected its text. Every row carries `aria-level` and a
// directory row `aria-expanded`. Two consuming apps had bolted this on from
// outside by reading the rendered DOM back; it belongs here.
//
// Drag-to-reorder is optional (`onReorder`) and deliberately minimal: no
// visual drop-position line, just a highlighted target row and a computed
// {before, after, into} based on pointer position within it. Good enough for
// sibling reorder and re-parenting; a fancier indicator can be layered on by
// the consumer via `renderTrailing` if ever needed.
//
// Row metadata and the row menu (2.362.0). `hoverMeta` is a quiet label — a
// version, a size — that stays out of the way until the row is hovered or
// focused, so a list of forty files does not read as forty version numbers.
// `rowMenu` puts a ⋯ `DropdownMenu` (role="menu", arrow keys, Escape) at the
// end of each row it returns sections for; the keyboard reaches it with
// Shift+F10 or the context-menu key on the focused row, the pointer with the
// ⋯ or a right-click. Both are opt-in: a tree that passes neither renders
// exactly the rows it rendered before.

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type KeyboardEvent,
  type MouseEvent,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { DropdownMenu, type DropdownMenuSection } from './DropdownMenu';

export interface TreeNode {
  id: string;
  title: string;
  parentId: string | null;
  isDir?: boolean;
  badge?: ReactNode;
  meta?: string;
  /**
   * Like `meta`, but hidden until the row is hovered or has focus — a
   * version ("v4"), a size. Still in the accessible name, so a screen-reader
   * user hears it without hovering.
   */
  hoverMeta?: string;
  /** Leading glyph after the caret slot — normally a `FileKindMark`. */
  icon?: ReactNode;
  disabled?: boolean;
  /**
   * What is happening to this row right now, for a move the host has sent and
   * not yet heard back about. `pending` draws the row translucent and inert
   * (`aria-busy`); `moved` flashes it as landed. The host clears both — the
   * tree has no idea when a server answered.
   */
  status?: 'pending' | 'moved';
}

export type TreeDropPosition = 'before' | 'after' | 'into';

export interface TreeViewProps {
  nodes: TreeNode[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Node ids expanded on first render. Ancestors of `selectedId` auto-expand. */
  defaultExpanded?: string[];
  /**
   * Controlled expansion. When given, the tree renders exactly these ids open
   * and reports every caret click and ArrowLeft/ArrowRight through `onToggle`
   * instead of keeping its own set — for a host that persists expansion or
   * drives it from a URL. Ancestors of `selectedId` are still auto-opened,
   * reported through `onToggle` as well.
   */
  expanded?: string[];
  onToggle?: (id: string, expanded: boolean) => void;
  /** Enables HTML5 drag-and-drop reorder/reparent when provided. */
  onReorder?: (id: string, targetParentId: string | null, position: number) => void;
  /** Host policy for synthetic rows or source-owned roots that cannot move. */
  canDragNode?: (node: TreeNode) => boolean;
  /** Host policy for valid parent/sibling destinations; false removes the drop affordance. */
  canDropNode?: (dragged: TreeNode, target: TreeNode, position: TreeDropPosition) => boolean;
  /** Trailing slot per row — count chip, badge, menu button. */
  renderTrailing?: (node: TreeNode) => ReactNode;
  /**
   * The row's ⋯ menu — Version, Rename, Move, View details. Return `null` or
   * an empty array for a row that has none. Opens from the ⋯ button, a
   * right-click, or Shift+F10 / the context-menu key on the focused row.
   */
  rowMenu?: (node: TreeNode) => DropdownMenuSection[] | null | undefined;
  /** Accessible name of each row's menu button. Default `Actions for <title>`. */
  rowMenuLabel?: (node: TreeNode) => string;
  /**
   * Row scale. `sm` (default) is the 14px / 14px-indent rail. `md` (2.386.0)
   * is the Folders explorer's: 15px titles on 32px rows, an 18px indent step,
   * a selected row in the brand tint with brand ink (its icon follows through
   * `currentColor`), and the ⋯ laid OVER the row's meta on hover instead of
   * holding an empty 24px slot that pushed every time off the right edge.
   */
  size?: TreeViewSize;
  className?: string;
  'data-testid'?: string;
}

export type TreeViewSize = 'sm' | 'md';

interface Entry extends TreeNode {
  children: Entry[];
}

function buildTree(nodes: TreeNode[]): Entry[] {
  const byId = new Map<string, Entry>();
  nodes.forEach((node) => byId.set(node.id, { ...node, children: [] }));
  const roots: Entry[] = [];
  byId.forEach((entry) => {
    const parent = entry.parentId ? byId.get(entry.parentId) : undefined;
    if (parent) parent.children.push(entry);
    else roots.push(entry);
  });
  return roots;
}

/** `CSS.escape` where it exists (jsdom has it; older engines do not). */
function cssEscape(value: string): string {
  return typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(value) : value;
}

function ancestorIds(nodes: TreeNode[], selectedId: string | null): Set<string> {
  const ids = new Set<string>();
  if (!selectedId) return ids;
  const byId = new Map(nodes.map((n) => [n.id, n]));
  let current = byId.get(selectedId);
  while (current?.parentId) {
    ids.add(current.parentId);
    current = byId.get(current.parentId);
  }
  return ids;
}

function CaretIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={cn('h-3.5 w-3.5 transition-transform', expanded ? '' : '-rotate-90')}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Held outside state: dragstart doing a React render can make the browser
 * cancel the drag mid-gesture, so the active drag is tracked in a ref. */
interface DragState {
  id: string;
}

function positionInRow(event: DragEvent<HTMLElement>): TreeDropPosition {
  const rect = event.currentTarget.getBoundingClientRect();
  const y = event.clientY - rect.top;
  if (y < rect.height / 3) return 'before';
  if (y > (rect.height * 2) / 3) return 'after';
  return 'into';
}

function TreeRow({
  entry,
  depth,
  expanded,
  onToggle,
  selectedId,
  onSelect,
  renderTrailing,
  rowMenu,
  rowMenuLabel,
  dragEnabled,
  canDragNode,
  canDrop,
  dragRef,
  dropTarget,
  setDropTarget,
  onDrop,
  testId,
  focusedId,
  setFocusedId,
  size,
}: {
  size: TreeViewSize;
  entry: Entry;
  depth: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  renderTrailing?: (node: TreeNode) => ReactNode;
  rowMenu?: (node: TreeNode) => DropdownMenuSection[] | null | undefined;
  rowMenuLabel?: (node: TreeNode) => string;
  dragEnabled: boolean;
  canDragNode?: (node: TreeNode) => boolean;
  canDrop: (draggedId: string, targetId: string, position: TreeDropPosition) => boolean;
  dragRef: MutableRefObject<DragState | null>;
  dropTarget: { id: string; position: TreeDropPosition } | null;
  setDropTarget: (v: { id: string; position: TreeDropPosition } | null) => void;
  onDrop: (targetId: string, position: TreeDropPosition) => void;
  testId: string;
  focusedId: string | null;
  setFocusedId: (id: string) => void;
}) {
  const isExpanded = expanded.has(entry.id);
  const hasChildren = entry.children.length > 0;
  const isSelected = entry.id === selectedId;
  const isDropTarget = dropTarget?.id === entry.id;
  const draggable = dragEnabled && !entry.disabled && entry.status !== 'pending' && (canDragNode?.(entry) ?? true);
  const menuSections = rowMenu?.(entry);
  const hasMenu = !!menuSections && menuSections.some((section) => section.items.length > 0);
  const md = size === 'md';

  return (
    <div>
      <div
        draggable={draggable}
        onDragStart={(event) => {
          if (!draggable) { event.preventDefault(); return; }
          event.dataTransfer.setData('text/plain', entry.id);
          event.dataTransfer.effectAllowed = 'move';
          dragRef.current = { id: entry.id };
        }}
        onDragOver={(event) => {
          const drag = dragRef.current;
          if (!drag || drag.id === entry.id) return;
          const position = positionInRow(event);
          if (!canDrop(drag.id, entry.id, position)) { setDropTarget(null); return; }
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
          setDropTarget({ id: entry.id, position });
        }}
        onDragLeave={() => {
          if (dropTarget?.id === entry.id) setDropTarget(null);
        }}
        onDrop={(event) => {
          const drag = dragRef.current;
          if (!drag || drag.id === entry.id) return;
          event.preventDefault();
          const position = positionInRow(event);
          setDropTarget(null);
          // Reset AFTER the callback: handleDrop below reads dragRef.current
          // to resolve the dragged node, so clearing it first would make
          // every drop silently no-op.
          if (canDrop(drag.id, entry.id, position)) onDrop(entry.id, position);
          dragRef.current = null;
        }}
        onDragEnd={() => {
          dragRef.current = null;
          setDropTarget(null);
        }}
        // The whole row is the target: select, and a directory also toggles —
        // what Enter does. The caret's own click stops here (it only toggles).
        onClick={() => {
          if (entry.disabled) return;
          onSelect(entry.id);
          if (hasChildren) onToggle(entry.id);
        }}
        {...(hasMenu
          ? {
              // A right-click opens the same menu as the ⋯, not the browser's.
              onContextMenu: (event: MouseEvent<HTMLDivElement>) => {
                event.preventDefault();
                openRowMenu(event.currentTarget);
              },
            }
          : {})}
        role="treeitem"
        aria-selected={isSelected}
        aria-disabled={entry.disabled}
        aria-level={depth + 1}
        aria-busy={entry.status === 'pending' || undefined}
        data-status={entry.status}
        {...(hasChildren ? { 'aria-expanded': isExpanded } : {})}
        // Roving tabindex (WAI-ARIA tree pattern): exactly one row is in the
        // tab order — the focused one, else the selected one, else the first —
        // and the arrow keys move between VISIBLE rows. Tab leaves the tree.
        tabIndex={focusedId === entry.id ? 0 : -1}
        onFocus={() => setFocusedId(entry.id)}
        data-testid={`${testId}-row-${entry.id}`}
        className={cn(
          // `relative`: the sr-only hover meta is absolutely positioned; without
          // a positioned row it escapes the rail's scroll box and stretches the
          // document (a long tree scrolled the whole window — 2.367.1).
          'group relative flex items-center border-l-2 transition-colors',
          // A click toggles, so it must not start a text selection; the ring
          // is the keyboard's only sign of which row has the focus.
          'select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
          md ? 'min-h-8 gap-1.5 py-1 pr-2.5 text-[15px] leading-6' : 'gap-1 py-1.5 pr-2 text-sm',
          // A row you can pick up says so before you try. Only when the host
          // wired a drop target: a grab cursor over an immovable row is a lie.
          draggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer',
          isSelected
            ? (md ? 'border-primary bg-primary-bg font-medium text-primary-fg' : 'border-primary bg-surface-hover font-semibold text-text-primary')
            : (md ? 'border-transparent text-text-primary hover:bg-surface-hover' : 'border-transparent text-text-secondary hover:bg-surface-hover'),
          entry.disabled && 'cursor-not-allowed opacity-50',
          // A move in flight: still on screen where it will land, but
          // visibly not there yet, and not a drop target or a drag source.
          entry.status === 'pending' && 'pointer-events-none opacity-50',
          // Landed. `transition-colors` above fades the tint back out when
          // the host clears the status.
          entry.status === 'moved' && 'bg-success/10',
          isDropTarget && dropTarget?.position === 'into' && 'ring-1 ring-inset ring-primary',
          isDropTarget && dropTarget?.position === 'before' && 'shadow-[inset_0_2px_0_0_var(--color-primary)]',
          isDropTarget && dropTarget?.position === 'after' && 'shadow-[inset_0_-2px_0_0_var(--color-primary)]',
        )}
        style={{ paddingLeft: depth * (md ? 18 : 14) + 8 }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggle(entry.id);
            }}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary"
          >
            <CaretIcon expanded={isExpanded} />
          </button>
        ) : (
          // 20px leading slot: leaf titles line up with directory titles.
          <span className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        )}
        {entry.icon && <span className={cn('flex flex-shrink-0 items-center', md && (isSelected ? 'text-primary-fg' : 'text-text-secondary'))} data-testid={`${testId}-icon-${entry.id}`}>{entry.icon}</span>}
        <span className="min-w-0 flex-1 truncate" title={entry.title}>
          {entry.title}
        </span>
        {entry.meta && <span className={cn('flex-shrink-0 text-text-tertiary', md ? 'text-[13px] tabular-nums' : 'text-xs')}>{entry.meta}</span>}
        {entry.hoverMeta && (
          <span
            data-testid={`${testId}-hover-meta-${entry.id}`}
            // sr-only, not opacity-0: hidden meta must not take width, or
            // every title truncates early for a label nobody can see (2.365.0).
            className="sr-only flex-shrink-0 text-xs text-text-tertiary group-hover:not-sr-only group-focus:not-sr-only group-focus-within:not-sr-only"
          >
            {entry.hoverMeta}
          </span>
        )}
        {entry.badge}
        {renderTrailing?.(entry)}
        {hasMenu && (
          // A click on ⋯ (or on an item in its panel — the popover is
          // portalled, but React events still bubble through this span) is
          // not a click on the row. Keys are NOT stopped here: the popover's
          // Escape listens on `window`, and a React stopPropagation stops the
          // native event too. The tree's own handler skips them instead.
          <span
            data-tree-row-menu=""
            className={cn(
              'flex flex-shrink-0 items-center',
              // md: over the meta, not beside it — the slot is empty until
              // hover, and a reserved one moved every time 24px off the edge.
              md && 'pointer-events-none absolute inset-y-0 right-1.5 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 has-[[aria-expanded=true]]:pointer-events-auto has-[[aria-expanded=true]]:opacity-100',
            )}
            onClick={(event) => event.stopPropagation()}
            onContextMenu={(event) => event.stopPropagation()}
          >
            <DropdownMenu
              trigger={<span aria-hidden="true" className="text-sm leading-none">⋯</span>}
              triggerLabel={rowMenuLabel?.(entry) ?? `Actions for ${entry.title}`}
              triggerTabIndex={focusedId === entry.id ? 0 : -1}
              triggerTestId={`${testId}-menu-${entry.id}`}
              align="end"
              sections={menuSections!}
              data-testid={`${testId}-menu-panel-${entry.id}`}
              triggerClassName={cn(
                'h-5 w-6 border-transparent px-0 py-0 opacity-0 transition-opacity motion-reduce:transition-none',
                'group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 aria-expanded:opacity-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                md && 'h-6 w-7 bg-surface-hover',
              )}
            />
          </span>
        )}
      </div>
      {isExpanded &&
        entry.children.map((child) => (
          <TreeRow
            key={child.id}
            entry={child}
            depth={depth + 1}
            expanded={expanded}
            onToggle={onToggle}
            selectedId={selectedId}
            onSelect={onSelect}
            renderTrailing={renderTrailing}
            size={size}
            rowMenu={rowMenu}
            rowMenuLabel={rowMenuLabel}
            dragEnabled={dragEnabled}
            canDragNode={canDragNode}
            canDrop={canDrop}
            dragRef={dragRef}
            dropTarget={dropTarget}
            setDropTarget={setDropTarget}
            onDrop={onDrop}
            testId={testId}
            focusedId={focusedId}
            setFocusedId={setFocusedId}
          />
        ))}
    </div>
  );
}

/**
 * Opens a row's ⋯ menu as if its button were pressed. The menu owns its open
 * state (and moves focus into itself, and back to the row on close), so the
 * keyboard and right-click paths drive the same button rather than keeping a
 * second copy of that state. Returns whether the row had a menu.
 */
function openRowMenu(row: HTMLElement): boolean {
  const trigger = row.querySelector<HTMLButtonElement>('[data-tree-row-menu] button[aria-haspopup="menu"]');
  if (!trigger) return false;
  if (trigger.getAttribute('aria-expanded') !== 'true') trigger.click();
  return true;
}

/** The rows a reader can see, top to bottom — what the arrow keys walk. */
function visibleIds(tree: Entry[], expanded: Set<string>): string[] {
  const out: string[] = [];
  const walk = (entries: Entry[]) => {
    for (const e of entries) {
      out.push(e.id);
      if (expanded.has(e.id) && e.children.length > 0) walk(e.children);
    }
  };
  walk(tree);
  return out;
}

export function TreeView({
  nodes,
  selectedId,
  onSelect,
  defaultExpanded,
  expanded: controlledExpanded,
  onToggle,
  onReorder,
  canDragNode,
  canDropNode,
  renderTrailing,
  rowMenu,
  rowMenuLabel,
  size = 'sm',
  className,
  'data-testid': testId = 'tree-view',
}: TreeViewProps) {
  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const [ownExpanded, setExpanded] = useState<Set<string>>(() => new Set(defaultExpanded ?? []));
  const isControlled = controlledExpanded !== undefined;
  const expanded = useMemo(
    () => (isControlled ? new Set(controlledExpanded) : ownExpanded),
    [isControlled, controlledExpanded, ownExpanded],
  );
  // The row in the tab order. `null` until something is focused, in which case
  // the selected row (else the first) takes it — see `tabTargetId`.
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [dropTarget, setDropTarget] = useState<{ id: string; position: TreeDropPosition } | null>(null);
  const nodesById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  useEffect(() => {
    const ancestors = ancestorIds(nodes, selectedId);
    if (ancestors.size === 0) return;
    if (isControlled) {
      ancestors.forEach((id) => {
        if (!controlledExpanded!.includes(id)) onToggle?.(id, true);
      });
      return;
    }
    setExpanded((prev) => {
      let changed = false;
      const next = new Set(prev);
      ancestors.forEach((id) => {
        if (!next.has(id)) {
          next.add(id);
          changed = true;
        }
      });
      return changed ? next : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, selectedId]);

  const setOpen = (id: string, open: boolean) => {
    onToggle?.(id, open);
    if (isControlled) return;
    setExpanded((prev) => {
      if (prev.has(id) === open) return prev;
      const next = new Set(prev);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });
  };
  const toggle = (id: string) => setOpen(id, !expanded.has(id));

  // Which row carries tabIndex=0 when nothing has been focused yet.
  const visible = useMemo(() => visibleIds(tree, expanded), [tree, expanded]);
  const tabTargetId =
    focusedId && visible.includes(focusedId)
      ? focusedId
      : selectedId && visible.includes(selectedId)
        ? selectedId
        : (visible[0] ?? null);

  const focusRow = (id: string | null) => {
    if (!id) return;
    setFocusedId(id);
    const root = rootRef.current;
    root?.querySelector<HTMLElement>(`[data-testid="${testId}-row-${cssEscape(id)}"]`)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const row = target.closest<HTMLElement>('[role="treeitem"]');
    if (!row) return;
    // The ⋯ button's own Enter/Space/arrows belong to the menu, not the tree.
    if (target.closest('[data-tree-row-menu]')) return;
    // Shift+F10 and the context-menu key: the keyboard's right-click.
    if ((event.key === 'F10' && event.shiftKey) || event.key === 'ContextMenu') {
      if (openRowMenu(row)) event.preventDefault();
      return;
    }
    const prefix = `${testId}-row-`;
    const id = (row.getAttribute('data-testid') ?? '').slice(prefix.length);
    if (!id || !nodesById.has(id)) return;
    const index = visible.indexOf(id);
    const node = nodesById.get(id)!;
    const hasChildren = nodes.some((n) => n.parentId === id);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusRow(visible[Math.min(index + 1, visible.length - 1)] ?? null);
        return;
      case 'ArrowUp':
        event.preventDefault();
        focusRow(visible[Math.max(index - 1, 0)] ?? null);
        return;
      case 'Home':
        event.preventDefault();
        focusRow(visible[0] ?? null);
        return;
      case 'End':
        event.preventDefault();
        focusRow(visible[visible.length - 1] ?? null);
        return;
      case 'ArrowRight':
        event.preventDefault();
        if (hasChildren && !expanded.has(id)) setOpen(id, true);
        // Already open: the first child is the very next visible row.
        else if (hasChildren) focusRow(visible[index + 1] ?? null);
        return;
      case 'ArrowLeft':
        event.preventDefault();
        if (hasChildren && expanded.has(id)) setOpen(id, false);
        else focusRow(node.parentId);
        return;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!node.disabled) onSelect(id);
        if (hasChildren) toggle(id);
        return;
      default:
    }
  };

  const handleDrop = (targetId: string, position: TreeDropPosition) => {
    const draggedId = dragRef.current?.id;
    if (!draggedId || !onReorder) return;
    const target = nodesById.get(targetId);
    if (!target) return;
    if (!canDrop(draggedId, targetId, position)) return;

    // Dropping onto a descendant of the dragged node would orphan it.
    let cursor: TreeNode | undefined = target;
    while (cursor?.parentId) {
      if (cursor.parentId === draggedId) return;
      cursor = nodesById.get(cursor.parentId);
    }

    if (position === 'into') {
      const siblingCount = nodes.filter((n) => n.parentId === targetId && n.id !== draggedId).length;
      onReorder(draggedId, targetId, siblingCount);
      return;
    }
    const siblingIds = nodes.filter((n) => n.parentId === target.parentId && n.id !== draggedId).map((n) => n.id);
    const targetIndex = siblingIds.indexOf(targetId);
    if (targetIndex === -1) return;
    onReorder(draggedId, target.parentId, position === 'before' ? targetIndex : targetIndex + 1);
  };

  function canDrop(draggedId: string, targetId: string, position: TreeDropPosition): boolean {
    const dragged = nodesById.get(draggedId);
    const target = nodesById.get(targetId);
    if (!dragged || !target || draggedId === targetId || dragged.disabled || target.disabled || dragged.status === 'pending' || target.status === 'pending') return false;
    if (canDragNode?.(dragged) === false || canDropNode?.(dragged, target, position) === false) return false;
    let cursor: TreeNode | undefined = target;
    while (cursor?.parentId) {
      if (cursor.parentId === draggedId) return false;
      cursor = nodesById.get(cursor.parentId);
    }
    return true;
  }

  if (nodes.length === 0) return null;

  return (
    <div
      ref={rootRef}
      role="tree"
      className={cn('flex flex-col', className)}
      data-testid={testId}
      onKeyDown={onKeyDown}
    >
      {tree.map((entry) => (
        <TreeRow
          key={entry.id}
          entry={entry}
          depth={0}
          expanded={expanded}
          onToggle={toggle}
          selectedId={selectedId}
          onSelect={onSelect}
          renderTrailing={renderTrailing}
          size={size}
          rowMenu={rowMenu}
          rowMenuLabel={rowMenuLabel}
          dragEnabled={Boolean(onReorder)}
          canDragNode={canDragNode}
          canDrop={canDrop}
          dragRef={dragRef}
          dropTarget={dropTarget}
          setDropTarget={setDropTarget}
          onDrop={handleDrop}
          testId={testId}
          focusedId={tabTargetId}
          setFocusedId={setFocusedId}
        />
      ))}
    </div>
  );
}

export default TreeView;
