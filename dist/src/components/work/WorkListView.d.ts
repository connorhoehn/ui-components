import { type ReactNode } from 'react';
import { type ChipTone } from '../shared/Chip';
import { type GroupedListRow } from '../shared/GroupedList';
import { type SelectOption } from '../forms/Select';
export interface WorkListPerson {
    id: string;
    name: string;
    avatarUrl?: string;
}
export interface WorkListChip {
    label: string;
    tone?: ChipTone;
}
/**
 * Replaces the checkbox with a dot, and adds its label to the meta line:
 * `running` a filled primary dot ("Agent running"), `review` a hollow ring
 * ("Awaiting review"), `blocked` a danger dot. With `onClick` the dot is a
 * button (e.g. open the live run).
 */
export interface WorkListSignal {
    state: 'running' | 'review' | 'blocked';
    label: string;
    onClick?: () => void;
}
export interface WorkListItem {
    id: string;
    groupId: string;
    title: string;
    done?: boolean;
    /** A done toggle is in flight: the checkbox is disabled and busy. */
    donePending?: boolean;
    /** Story points. `null` / absent → no points part. */
    points?: number | null;
    /** `null` / absent → "Unassigned". */
    owner?: WorkListPerson | null;
    /** Type chips, e.g. `{ label: 'Bug', tone: 'danger' }`. */
    chips?: WorkListChip[];
    signal?: WorkListSignal | null;
    disabled?: boolean;
    /**
     * The item's kind as a word — "Bug", "Story". With `metaStyle="text"` it
     * leads the meta line ("Bug · Eli Garcia · 2 points") instead of a chip.
     * Since 2.390.0.
     */
    kindLabel?: string;
    /**
     * A toned tag at the row's end — "Blocked" (danger). Always visible; not
     * inside the row's button. Since 2.390.0.
     */
    tag?: WorkListChip | null;
}
/** How a work row's second line reads. See `WorkListViewProps.metaStyle`. */
export type WorkListMetaStyle = 'default' | 'text';
export interface WorkListGroup {
    id: string;
    title: string;
    /** What this group says when open and empty. Default "Nothing here". */
    emptyLabel?: string;
    defaultOpen?: boolean;
}
/**
 * One filter dimension ("Kind", "Owner", "Status"), drawn as a labelled row of
 * toggle chips in the filter panel. `selected` empty = no narrowing on this
 * facet. The host does the filtering; this only draws and reports.
 */
export interface WorkListFilterFacet {
    id: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
        count?: number;
    }>;
    selected: readonly string[];
    onChange: (selected: string[]) => void;
}
/** The filter panel body for `facets`. Exported for hosts that compose their own toolbar. */
export declare function WorkListFilters({ facets, 'data-testid': testId }: {
    facets: WorkListFilterFacet[];
    'data-testid'?: string;
}): import("react").JSX.Element;
export interface WorkListToolbarProps {
    query: string;
    onQueryChange: (query: string) => void;
    /** Default "Search work…". */
    searchPlaceholder?: string;
    sort?: string;
    sortOptions?: SelectOption[];
    onSortChange?: (value: string) => void;
    /** Accessible name of the sort select. Default "Sort work". */
    sortLabel?: string;
    /** Filter controls; omit for no filter button. */
    filters?: ReactNode;
    /**
     * Filter facets, drawn by `WorkListFilters` in the panel (and counted for
     * the button's dot) when `filters` is not given.
     */
    filterFacets?: WorkListFilterFacet[];
    /** Default: the number of facets with a selection, else 0. */
    activeFilterCount?: number;
    onClearFilters?: () => void;
    /**
     * `stacked` (default): search on its own row, sort and the filter button
     * on the next. `inline`: search and the filter button share the first
     * row; sort sits alone below. Since 2.390.0.
     */
    toolbarLayout?: 'stacked' | 'inline';
    /**
     * `select` (default): a full-width select. `menu`: a quiet text menu —
     * the current option's label and a chevron ("By priority ⌄"). Since 2.390.0.
     */
    sortStyle?: 'select' | 'menu';
    className?: string;
    'data-testid'?: string;
}
export interface WorkListViewProps extends Omit<WorkListToolbarProps, 'className' | 'data-testid'> {
    /** Default "Work". */
    title?: string;
    /** The header count. Defaults to `items.length`. */
    count?: number;
    /** Shows a + button in the title row. */
    onCreate?: () => void;
    /** Default "New work item". */
    createLabel?: string;
    /** Shows a ‹ button in the title row. */
    onCollapse?: () => void;
    /** Default "Collapse work list". */
    collapseLabel?: string;
    /** `embedded` omits the title row (the host shows it in a rail header). Default `full`. */
    chrome?: 'full' | 'embedded';
    groups: WorkListGroup[];
    items: WorkListItem[];
    currentId?: string | null;
    onOpenItem?: (item: WorkListItem) => void;
    /** Omit for read-only rows (no checkbox). */
    onToggleDone?: (item: WorkListItem, done: boolean) => void;
    /** `index` is the item's final position within `toGroupId`. Omit for no reorder. */
    onReorder?: (itemId: string, toGroupId: string, index: number) => void;
    loading?: boolean;
    error?: string | null;
    onRetry?: () => void;
    /** No items at all. Default "No work yet". */
    emptyLabel?: string;
    /** Persists collapsed groups (GroupedList `storageKey`). */
    storageKey?: string;
    /**
     * `default`: owner avatar, type chips, then "signal · 5 pts · Owner".
     * `text` (since 2.390.0): one line of words, no avatar and no chips —
     * "Bug · Eli Garcia · 2 points" (`kindLabel`, owner, points).
     */
    metaStyle?: WorkListMetaStyle;
    /** The points unit: `pts` (default, "5 pts") or `points` ("5 points", "1 point"). Since 2.390.0. */
    pointsLabel?: 'pts' | 'points';
    /**
     * Where a `signal` shows. `dot` (default): a leading dot that replaces the
     * checkbox, and its label in the meta line. `meta`: the label in the meta
     * line only — no dot, so the row keeps its checkbox (or nothing). Since 2.390.0.
     */
    signalDisplay?: 'dot' | 'meta';
    /** Passed to `GroupedList.currentStyle`. Since 2.390.0. */
    currentStyle?: 'tint' | 'bar';
    /** Passed to `GroupedList.groupCountStyle`. Since 2.390.0. */
    groupCountStyle?: 'chip' | 'plain';
    className?: string;
    'data-testid'?: string;
}
export interface ToWorkListRowsOptions {
    onToggleDone?: (item: WorkListItem, done: boolean) => void;
    testId?: string;
    /** Since 2.390.0. See `WorkListViewProps.metaStyle`. */
    metaStyle?: WorkListMetaStyle;
    /** Since 2.390.0. See `WorkListViewProps.pointsLabel`. */
    pointsLabel?: 'pts' | 'points';
    /** Since 2.390.0. See `WorkListViewProps.signalDisplay`. */
    signalDisplay?: 'dot' | 'meta';
}
/** Items → `GroupedListRow`s: leading checkbox or signal dot, and the meta line. Exported for tests. */
export declare function toWorkListRows(items: WorkListItem[], { onToggleDone, testId, metaStyle, pointsLabel, signalDisplay }?: ToWorkListRowsOptions): GroupedListRow[];
/** Search on its own row; sort and the filter button on the next. */
export declare function WorkListToolbar({ query, onQueryChange, searchPlaceholder, sort, sortOptions, onSortChange, sortLabel, filters: filtersProp, filterFacets, activeFilterCount: activeFilterCountProp, onClearFilters, toolbarLayout, sortStyle, className, 'data-testid': testId, }: WorkListToolbarProps): import("react").JSX.Element;
export declare function WorkListView({ title, count, onCreate, createLabel, onCollapse, collapseLabel, chrome, query, onQueryChange, searchPlaceholder, sort, sortOptions, onSortChange, sortLabel, filters, filterFacets, activeFilterCount: activeFilterCountProp, onClearFilters, groups, items, currentId, onOpenItem, onToggleDone, onReorder, loading, error, onRetry, emptyLabel, storageKey, toolbarLayout, sortStyle, metaStyle, pointsLabel, signalDisplay, currentStyle, groupCountStyle, className, 'data-testid': testId, }: WorkListViewProps): import("react").JSX.Element;
export default WorkListView;
//# sourceMappingURL=WorkListView.d.ts.map