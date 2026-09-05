// TreeView — nested rows built from a flat `{id, title, parentId}` list, the
// shape a knowledge/document explorer's sidebar actually has on the wire
// (parent_id pointers, not a pre-nested tree). Selection paints a 2px left
// border; a fixed 20px leading slot holds the caret when a row has children
// so a leaf row's title starts at the same x as a directory row's.
//
// Drag-to-reorder is optional (`onReorder`) and deliberately minimal: no
// visual drop-position line, just a highlighted target row and a computed
// {before, after, into} based on pointer position within it. Good enough for
// sibling reorder and re-parenting; a fancier indicator can be layered on by
// the consumer via `renderTrailing` if ever needed.

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

export interface TreeNode {
  id: string;
  title: string;
  parentId: string | null;
  isDir?: boolean;
  badge?: ReactNode;
  meta?: string;
  disabled?: boolean;
}

export type TreeDropPosition = 'before' | 'after' | 'into';

export interface TreeViewProps {
  nodes: TreeNode[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Node ids expanded on first render. Ancestors of `selectedId` auto-expand. */
  defaultExpanded?: string[];
  /** Enables HTML5 drag-and-drop reorder/reparent when provided. */
  onReorder?: (id: string, targetParentId: string | null, position: number) => void;
  /** Trailing slot per row — count chip, badge, menu button. */
  renderTrailing?: (node: TreeNode) => ReactNode;
  className?: string;
  'data-testid'?: string;
}

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
  dragEnabled,
  dragRef,
  dropTarget,
  setDropTarget,
  onDrop,
  testId,
}: {
  entry: Entry;
  depth: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  renderTrailing?: (node: TreeNode) => ReactNode;
  dragEnabled: boolean;
  dragRef: MutableRefObject<DragState | null>;
  dropTarget: { id: string; position: TreeDropPosition } | null;
  setDropTarget: (v: { id: string; position: TreeDropPosition } | null) => void;
  onDrop: (targetId: string, position: TreeDropPosition) => void;
  testId: string;
}) {
  const isExpanded = expanded.has(entry.id);
  const hasChildren = entry.children.length > 0;
  const isSelected = entry.id === selectedId;
  const isDropTarget = dropTarget?.id === entry.id;

  return (
    <div>
      <div
        draggable={dragEnabled && !entry.disabled}
        onDragStart={(event) => {
          if (entry.disabled) return;
          event.dataTransfer.setData('text/plain', entry.id);
          event.dataTransfer.effectAllowed = 'move';
          dragRef.current = { id: entry.id };
        }}
        onDragOver={(event) => {
          const drag = dragRef.current;
          if (!drag || drag.id === entry.id) return;
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
          setDropTarget({ id: entry.id, position: positionInRow(event) });
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
          onDrop(entry.id, position);
          dragRef.current = null;
        }}
        onDragEnd={() => {
          dragRef.current = null;
          setDropTarget(null);
        }}
        onClick={() => !entry.disabled && onSelect(entry.id)}
        role="treeitem"
        aria-selected={isSelected}
        aria-disabled={entry.disabled}
        data-testid={`${testId}-row-${entry.id}`}
        className={cn(
          'group flex cursor-pointer items-center gap-1 border-l-2 py-1.5 pr-2 text-sm transition-colors',
          isSelected
            ? 'border-primary bg-surface-hover font-semibold text-text-primary'
            : 'border-transparent text-text-secondary hover:bg-surface-hover',
          entry.disabled && 'cursor-not-allowed opacity-50',
          isDropTarget && dropTarget?.position === 'into' && 'ring-1 ring-inset ring-primary',
          isDropTarget && dropTarget?.position === 'before' && 'shadow-[inset_0_2px_0_0_var(--color-primary)]',
          isDropTarget && dropTarget?.position === 'after' && 'shadow-[inset_0_-2px_0_0_var(--color-primary)]',
        )}
        style={{ paddingLeft: depth * 14 + 8 }}
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
        <span className="min-w-0 flex-1 truncate" title={entry.title}>
          {entry.title}
        </span>
        {entry.meta && <span className="flex-shrink-0 text-xs text-text-tertiary">{entry.meta}</span>}
        {entry.badge}
        {renderTrailing?.(entry)}
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
            dragEnabled={dragEnabled}
            dragRef={dragRef}
            dropTarget={dropTarget}
            setDropTarget={setDropTarget}
            onDrop={onDrop}
            testId={testId}
          />
        ))}
    </div>
  );
}

export function TreeView({
  nodes,
  selectedId,
  onSelect,
  defaultExpanded,
  onReorder,
  renderTrailing,
  className,
  'data-testid': testId = 'tree-view',
}: TreeViewProps) {
  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(defaultExpanded ?? []));
  const dragRef = useRef<DragState | null>(null);
  const [dropTarget, setDropTarget] = useState<{ id: string; position: TreeDropPosition } | null>(null);
  const nodesById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  useEffect(() => {
    const ancestors = ancestorIds(nodes, selectedId);
    if (ancestors.size === 0) return;
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
  }, [nodes, selectedId]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDrop = (targetId: string, position: TreeDropPosition) => {
    const draggedId = dragRef.current?.id;
    if (!draggedId || !onReorder) return;
    const target = nodesById.get(targetId);
    if (!target) return;

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

  if (nodes.length === 0) return null;

  return (
    <div role="tree" className={cn('flex flex-col', className)} data-testid={testId}>
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
          dragEnabled={Boolean(onReorder)}
          dragRef={dragRef}
          dropTarget={dropTarget}
          setDropTarget={setDropTarget}
          onDrop={handleDrop}
          testId={testId}
        />
      ))}
    </div>
  );
}

export default TreeView;
