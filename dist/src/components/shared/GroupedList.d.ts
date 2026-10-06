import { type ReactNode } from 'react';
import { type DropdownMenuSection } from './DropdownMenu';
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
     * Work column: 15px group headers and titles, 13px meta, taller rows, a
     * current row that is a rounded tint with a 3px primary bar on its left
     * edge, and a larger drag handle that is always visible.
     */
    size?: 'sm' | 'md';
    /**
     * How a group header reads. `title` (default): a sentence-case heading
     * (14px, 15px at `md`) with its count in a neutral chip. `label`: a section
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
/** The droppable id of a group header (drop there = end of that group). */
export declare const GROUPED_LIST_GROUP_DROP_PREFIX = "__grouped-list-group__:";
/**
 * Where a drop of `activeId` onto `overId` lands: `overId` is a row id (take
 * its place in its group) or a group droppable id (the end of that group).
 * `null` when nothing would move. Pure; exported for tests.
 */
export declare function resolveGroupedListDrop(rows: GroupedListRow[], activeId: string, overId: string): {
    toGroupId: string;
    index: number;
} | null;
export declare function GroupedList({ groups, rows, onOpenRow, rowMenu, rowMenuLabel, openGroups, onToggleGroup, storageKey, currentId, hideEmptyGroups, onReorder, canReorder, reorderLabel, size, groupHeading, currentStyle, groupCountStyle, groupCountAlign, rowStyle, className, 'data-testid': testId, }: GroupedListProps): import("react").JSX.Element;
export default GroupedList;
//# sourceMappingURL=GroupedList.d.ts.map