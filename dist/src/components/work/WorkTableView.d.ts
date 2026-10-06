import { type WorkListToolbarProps, type WorkListViewProps } from './WorkListView';
export type WorkTableGrouping = 'status' | 'owner' | 'type';
export interface WorkTableViewProps extends WorkListToolbarProps, Pick<WorkListViewProps, 'items' | 'groups' | 'count' | 'title' | 'currentId' | 'onOpenItem' | 'onToggleDone' | 'loading' | 'error' | 'onRetry' | 'emptyLabel'> {
    /** Optional controlled grouping; otherwise starts with status. */
    groupBy?: WorkTableGrouping;
    onGroupByChange?: (group: WorkTableGrouping) => void;
    /** Optional group dots, keyed by the host's status IDs. Use theme tokens. */
    groupColors?: Record<string, string>;
    /** Label for items with no kindLabel. Default "Work". */
    defaultKindLabel?: string;
}
/** Full-width sibling of WorkListView. Hosts own reads, search/filter/sort,
 * navigation and writes; this owns table presentation and collapsible groups.
 * No router, API, initiative IDs or app-specific CSS is required. */
export declare function WorkTableView({ items, groups, count, title, currentId, onOpenItem, onToggleDone, loading, error, onRetry, emptyLabel, groupBy: controlledGrouping, onGroupByChange, groupColors, defaultKindLabel, query, onQueryChange, searchPlaceholder, sort, sortOptions, onSortChange, filters, filterFacets, activeFilterCount, onClearFilters, className, 'data-testid': testId, }: WorkTableViewProps): import("react").JSX.Element;
//# sourceMappingURL=WorkTableView.d.ts.map