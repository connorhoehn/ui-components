import { type ReactNode } from 'react';
import { type DropdownMenuSection } from '../../shared/DropdownMenu';
import { type GroupedListGroup, type GroupedListRow } from '../../shared/GroupedList';
import { type PipelinesGroupBy, type PipelinesListEntry } from './catalog';
export interface PipelinesListViewProps {
    entries: PipelinesListEntry[];
    /** The list is being fetched for the first time. */
    loading?: boolean;
    /** The fetch failed; shown as a banner above whatever is cached. */
    error?: string | null;
    onRetry?: () => void;
    /** Free-text search, applied by the view (`matchesQuery`). */
    query: string;
    onQueryChange: (query: string) => void;
    /** Search placeholder. Default "Search pipelines…". */
    searchPlaceholder?: string;
    groupBy: PipelinesGroupBy;
    onGroupByChange: (groupBy: PipelinesGroupBy) => void;
    /** The filter controls inside the Filter popover — `FilterChip` groups. */
    filters?: ReactNode;
    /** How many filters are narrowing the list; drives the badge on the button. */
    activeFilterCount?: number;
    onClearFilters?: () => void;
    /** Page title. Default "Pipelines". */
    title?: string;
    /** The count chip beside the title. Default: the number of entries shown. */
    count?: number;
    /** The header's ⋯ menu — Metrics, Dead letters, All runs, Import JSON. */
    headerMenu?: DropdownMenuSection[];
    onTemplates?: () => void;
    onStartBlank?: () => void;
    /** Extra header actions, after the built-in ones. */
    headerActions?: ReactNode;
    /** The row the reader is "at" — last opened, just created. Tinted. */
    currentId?: string | null;
    onOpen: (entry: PipelinesListEntry) => void;
    /** Shows a run button in the row's hover actions on published pipelines. */
    onRun?: (entry: PipelinesListEntry) => void;
    /** Shows "View run" on a row whose last run failed (or partly failed). */
    onViewRun?: (entry: PipelinesListEntry, runId: string) => void;
    /** The row's ⋯ menu. */
    rowMenu?: (entry: PipelinesListEntry) => DropdownMenuSection[] | null | undefined;
    /** Extra always-visible trailing content per row. */
    rowTrailing?: (entry: PipelinesListEntry) => ReactNode;
    /** Remember collapsed groups under this `localStorage` key. */
    storageKey?: string;
    /** What an empty catalog says. */
    emptyState?: {
        title?: string;
        body?: string;
        actionLabel?: string;
        onAction?: () => void;
    };
    /** The docked composer. */
    footer?: ReactNode;
    /** A fixed clock for the pills' "· 29m ago" — tests and stories. Default `Date.now()`. */
    now?: number;
    /**
     * `card` draws the mockup's frame — a border and radius around the toolbar
     * and the groups together, the toolbar ruled off from the list. The header
     * and the docked composer stay outside it. Default `none`: the current look.
     */
    frame?: 'card' | 'none';
    className?: string;
    'data-testid'?: string;
}
export interface ToGroupedRowsOptions {
    currentId?: string | null;
    now?: number;
    onOpen?: (entry: PipelinesListEntry) => void;
    onRun?: (entry: PipelinesListEntry) => void;
    onViewRun?: (entry: PipelinesListEntry, runId: string) => void;
    rowTrailing?: (entry: PipelinesListEntry) => ReactNode;
    testId?: string;
}
/**
 * The rows and groups `PipelinesListView` draws for these entries. The second
 * line is the description at rest and the route on hover / when current; a
 * pipeline with no description shows its route all the time.
 */
export declare function toGroupedRows(entries: PipelinesListEntry[], groupBy: PipelinesGroupBy, options?: ToGroupedRowsOptions): {
    groups: GroupedListGroup[];
    rows: GroupedListRow[];
};
export declare function PipelinesListView({ entries, loading, error, onRetry, query, onQueryChange, searchPlaceholder, groupBy, onGroupByChange, filters, activeFilterCount, onClearFilters, title, count, headerMenu, onTemplates, onStartBlank, headerActions, currentId, onOpen, onRun, onViewRun, rowMenu, rowTrailing, storageKey, emptyState, footer, now, frame, className, 'data-testid': testId, }: PipelinesListViewProps): import("react").JSX.Element;
export default PipelinesListView;
//# sourceMappingURL=PipelinesListView.d.ts.map