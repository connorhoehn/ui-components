import { type ReactNode } from 'react';
import { type DropdownMenuSection } from './DropdownMenu';
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
     * `rail` (2.407.13) is `md` on the shared rail scale (./railType): 13px/500
     * titles on the 36px rail pitch and 12px `RAIL_ITEM_COUNT` meta — the
     * Documents explorer beside the Workspace `NavRail`, one type scale.
     */
    size?: TreeViewSize;
    className?: string;
    'data-testid'?: string;
}
export type TreeViewSize = 'sm' | 'md' | 'rail';
export declare function TreeView({ nodes, selectedId, onSelect, defaultExpanded, expanded: controlledExpanded, onToggle, onReorder, canDragNode, canDropNode, renderTrailing, rowMenu, rowMenuLabel, size, className, 'data-testid': testId, }: TreeViewProps): import("react").JSX.Element | null;
export default TreeView;
//# sourceMappingURL=TreeView.d.ts.map