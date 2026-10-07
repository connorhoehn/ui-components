import { type ButtonHTMLAttributes, type ReactNode } from 'react';
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
export declare function GroupedListDndRoot({ ids, onDrop, children }: GroupedListDndRootProps): import("react").JSX.Element;
export interface SortableHandleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
    id: string;
    onStateChange: (state: {
        dragging: boolean;
        over: boolean;
    }) => void;
    'data-testid'?: string;
}
/**
 * A row's drag handle: the activator for `useSortable`, whose NODE is the
 * handle's row (`closest('[data-row-id]')`), so the whole row is the drop
 * target. Found from the handle rather than passed as a ref because a child's
 * layout effect runs before its parent's ref is attached.
 */
export declare function SortableHandle({ id, onStateChange, children, ...buttonProps }: SortableHandleProps): import("react").JSX.Element;
export interface GroupDropTargetProps {
    /** `GROUPED_LIST_GROUP_DROP_PREFIX + groupId`. */
    id: string;
    /** The group header — dropping on it appends to the group, even an empty or collapsed one. */
    getNode: () => HTMLElement | null;
    onOverChange: (over: boolean) => void;
}
/** Registers a group header as a droppable. Renders nothing. */
export declare function GroupDropTarget({ id, getNode, onOverChange }: GroupDropTargetProps): null;
//# sourceMappingURL=GroupedListSortable.d.ts.map