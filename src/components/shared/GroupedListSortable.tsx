// GroupedList's pointer drag-to-reorder — the only file that touches @dnd-kit.
//
// `@dnd-kit/*` are OPTIONAL peers and `GroupedList` is in the ROOT entry, so
// this module is reached only through a dynamic `import('./GroupedListSortable')`
// in GroupedList.tsx, which rollup emits as its own chunk. A consumer without
// the peers installed gets a keyboard-only list, not a crash on import.
//
// It adds no markup of its own. `GroupedList` renders every row, header and
// handle; these pieces only register nodes GroupedList already owns with
// dnd-kit (via a ref / getter) and report drag state back so the row can dim
// and the drop target can draw its insertion edge. No `transform` is applied —
// inline styles are banned here, for the reasons in `SortableSlideList`.

import { useCallback, useEffect, useLayoutEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

export interface GroupedListDndRootProps {
  /** Every visible, sortable row id, top to bottom. */
  ids: string[];
  /** A drop landed: the dragged row id and the row or group droppable under it. */
  onDrop: (activeId: string, overId: string) => void;
  children: ReactNode;
}

/**
 * The DndContext around the whole list. Pointer only: keyboard reorder is
 * GroupedList's own Alt+arrow handling, which works before this chunk loads.
 */
export function GroupedListDndRoot({ ids, onDrop, children }: GroupedListDndRootProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over) onDrop(String(event.active.id), String(event.over.id));
  };
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

export interface SortableHandleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
  id: string;
  onStateChange: (state: { dragging: boolean; over: boolean }) => void;
  'data-testid'?: string;
}

/**
 * A row's drag handle: the activator for `useSortable`, whose NODE is the
 * handle's row (`closest('[data-row-id]')`), so the whole row is the drop
 * target. Found from the handle rather than passed as a ref because a child's
 * layout effect runs before its parent's ref is attached.
 */
export function SortableHandle({ id, onStateChange, children, ...buttonProps }: SortableHandleProps) {
  const { listeners, setNodeRef, setActivatorNodeRef, isDragging, isOver } = useSortable({ id });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const setButton = useCallback(
    (el: HTMLButtonElement | null) => {
      buttonRef.current = el;
      setActivatorNodeRef(el);
    },
    [setActivatorNodeRef],
  );

  useLayoutEffect(() => {
    setNodeRef(buttonRef.current?.closest<HTMLElement>('[data-row-id]') ?? null);
    return () => setNodeRef(null);
  }, [setNodeRef]);

  useEffect(() => {
    onStateChange({ dragging: isDragging, over: isOver });
  }, [isDragging, isOver, onStateChange]);

  // dnd-kit's `attributes` are deliberately not spread: they would make the
  // handle a tab stop and point it at keyboard-sensor instructions that do not
  // apply (keyboard reorder is Alt+arrows on the row).
  return (
    <button type="button" {...buttonProps} {...listeners} ref={setButton} tabIndex={-1}>
      {children}
    </button>
  );
}

export interface GroupDropTargetProps {
  /** `GROUPED_LIST_GROUP_DROP_PREFIX + groupId`. */
  id: string;
  /** The group header — dropping on it appends to the group, even an empty or collapsed one. */
  getNode: () => HTMLElement | null;
  onOverChange: (over: boolean) => void;
}

/** Registers a group header as a droppable. Renders nothing. */
export function GroupDropTarget({ id, getNode, onOverChange }: GroupDropTargetProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  useLayoutEffect(() => {
    setNodeRef(getNode());
    return () => setNodeRef(null);
    // `getNode` is a fresh closure every render; the header node it returns is stable per group.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNodeRef, id]);
  useEffect(() => {
    onOverChange(isOver);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver]);
  return null;
}
