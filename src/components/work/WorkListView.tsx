// WorkListView — the Work column of a planning scope ("Work 11", search, sort
// and filter, then "Next up 4 / In progress 2 / In review 1 / Done 4").
//
// A composition, not a new list: the rows are `GroupedList` rows with a
// `leading` checkbox (or a status dot), a `meta` line ("5 pts · Layla
// Hassan") and GroupedList's reorder (drag handle + Alt+arrows). The chrome is
// the same primitives `PipelinesListView` composes — `SearchInput`, `Select`,
// `FilterPopover`, `IconButton` — so the two columns read as one family.
//
// ## What the host owns
//
// Everything that is data: groups (normally work statuses), items, the sort
// value and its options, the filter controls and their count, and every
// write (`onToggleDone`, `onReorder`, `onCreate`). This view filters by the
// search query on the title (so a host may pass everything), and it never
// reorders or re-groups items itself.
//
// ## Honest states
//
// - Loading with no items → "Loading work…"; an error → a banner with Retry.
// - No items at all → `emptyLabel`; items but none matching → "No work
//   matches", with a way out. An open group with no rows → its own
//   `emptyLabel` ("Nothing up next"), default "Nothing here".
// - No owner → "Unassigned"; no points → no points part (never "0 pts").
// - While a query is narrowing the list, reorder is OFF: an index into a
//   filtered group is not an index into the real one.
//
// `chrome="embedded"` drops the title row for a host that puts "Work 11" in
// its own rail header; `WorkListToolbar` is exported for the same reason.

import { useMemo, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon, PlusIcon } from '../ui/Icons';
import Banner from '../shared/Banner';
import Chip, { type ChipTone } from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import { FilterPopover } from '../shared/FilterPopover';
import { GroupedList, type GroupedListGroup, type GroupedListRow } from '../shared/GroupedList';
import LoadingState from '../shared/LoadingState';
import { SearchInput } from '../shared/SearchInput';
import { StatusDot } from '../shared/StatusDot';
import { Avatar } from '../shared/Avatar';
import { Checkbox } from '../forms/Checkbox';
import { Select, type SelectOption } from '../forms/Select';
import { FilterChip } from '../shared/FilterChip';

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
}

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
  options: Array<{ value: string; label: string; count?: number }>;
  selected: readonly string[];
  onChange: (selected: string[]) => void;
}

/** The filter panel body for `facets`. Exported for hosts that compose their own toolbar. */
export function WorkListFilters({ facets, 'data-testid': testId = 'work-list-filters' }: { facets: WorkListFilterFacet[]; 'data-testid'?: string }) {
  return (
    <div className="flex flex-col gap-3" data-testid={testId}>
      {facets.map((facet) => (
        <fieldset key={facet.id} className="m-0 flex min-w-0 flex-col gap-1.5 border-0 p-0" data-testid={`${testId}-${facet.id}`}>
          <legend className="mb-1.5 p-0 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">{facet.label}</legend>
          {facet.options.length === 0 ? (
            <span className="text-[13px] text-text-tertiary">Nothing to filter by</span>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {facet.options.map((option) => {
                const on = facet.selected.includes(option.value);
                return (
                  <FilterChip
                    key={option.value}
                    size="md"
                    active={on}
                    onClick={() =>
                      facet.onChange(on ? facet.selected.filter((v) => v !== option.value) : [...facet.selected, option.value])
                    }
                    data-testid={`${testId}-${facet.id}-${option.value}`}
                  >
                    {typeof option.count === 'number' ? `${option.label} · ${option.count}` : option.label}
                  </FilterChip>
                );
              })}
            </div>
          )}
        </fieldset>
      ))}
    </div>
  );
}

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
  className?: string;
  'data-testid'?: string;
}

// ---------------------------------------------------------------------------
// Row mapping
// ---------------------------------------------------------------------------

function SignalDot({ signal }: { signal: WorkListSignal }) {
  if (signal.state === 'review') {
    return (
      <StatusDot
        color="transparent"
        size="md"
        aria-label={signal.label}
        className="rounded-full ring-[1.5px] ring-text-tertiary"
        data-testid="work-signal-dot"
      />
    );
  }
  return (
    <StatusDot
      color={signal.state === 'running' ? 'var(--color-primary)' : 'var(--color-danger)'}
      size="md"
      aria-label={signal.label}
      data-testid="work-signal-dot"
    />
  );
}

function MetaLine({ item, testId }: { item: WorkListItem; testId: string }) {
  const parts: ReactNode[] = [];
  if (item.signal) {
    parts.push(
      <span key="signal" className={cn(item.signal.state === 'running' && 'font-medium text-primary')}>
        {item.signal.label}
      </span>,
    );
  }
  if (typeof item.points === 'number') parts.push(<span key="pts">{`${item.points} pts`}</span>);
  parts.push(<span key="owner">{item.owner ? item.owner.name : 'Unassigned'}</span>);

  return (
    <>
      {item.owner && (
        <span aria-hidden="true" className="flex shrink-0">
          <Avatar name={item.owner.name} src={item.owner.avatarUrl} size={20} title={null} />
        </span>
      )}
      {item.chips?.map((chip) => (
        <Chip key={chip.label} size="xs" tone={chip.tone ?? 'neutral'} className="shrink-0">
          {chip.label}
        </Chip>
      ))}
      <span className="truncate" data-testid={`${testId}-meta-${item.id}`}>
        {parts.map((part, i) => (
          <span key={i}>
            {i > 0 && ' · '}
            {part}
          </span>
        ))}
      </span>
    </>
  );
}

export interface ToWorkListRowsOptions {
  onToggleDone?: (item: WorkListItem, done: boolean) => void;
  testId?: string;
}

/** Items → `GroupedListRow`s: leading checkbox or signal dot, and the meta line. Exported for tests. */
export function toWorkListRows(items: WorkListItem[], { onToggleDone, testId = 'work-list' }: ToWorkListRowsOptions = {}): GroupedListRow[] {
  return items.map((item) => {
    let leading: ReactNode = undefined;
    if (item.signal) {
      const dot = <SignalDot signal={item.signal} />;
      leading = item.signal.onClick ? (
        <IconButton
          aria-label={`${item.signal.label}: ${item.title}`}
          size="sm"
          icon={dot}
          onClick={item.signal.onClick}
          data-testid={`${testId}-signal-${item.id}`}
          className="h-5 w-5"
        />
      ) : (
        <span className="flex" data-testid={`${testId}-signal-${item.id}`}>
          {dot}
        </span>
      );
    } else if (onToggleDone) {
      leading = (
        <span className="flex" aria-busy={item.donePending || undefined}>
          <Checkbox
            checked={!!item.done}
            disabled={!!item.donePending || !!item.disabled}
            aria-label={`Mark ${item.title} done`}
            className="h-4 w-4"
            onChange={(done) => onToggleDone(item, done)}
            data-testid={`${testId}-done-${item.id}`}
          />
        </span>
      );
    }
    return {
      id: item.id,
      groupId: item.groupId,
      title: item.title,
      disabled: item.disabled,
      leading,
      meta: <MetaLine item={item} testId={testId} />,
    };
  });
}

function facetCount(facets: WorkListFilterFacet[] | undefined): number {
  return (facets ?? []).filter((f) => f.selected.length > 0).length;
}

function matches(item: WorkListItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  return !q || item.title.toLowerCase().includes(q);
}

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

/** Search on its own row; sort and the filter button on the next. */
export function WorkListToolbar({
  query,
  onQueryChange,
  searchPlaceholder = 'Search work…',
  sort,
  sortOptions,
  onSortChange,
  sortLabel = 'Sort work',
  filters: filtersProp,
  filterFacets,
  activeFilterCount: activeFilterCountProp,
  onClearFilters,
  className,
  'data-testid': testId = 'work-list-toolbar',
}: WorkListToolbarProps) {
  const hasSort = !!sortOptions?.length && !!onSortChange;
  const filters = filtersProp ?? (filterFacets?.length ? <WorkListFilters facets={filterFacets} data-testid={`${testId}-facets`} /> : null);
  const activeFilterCount = activeFilterCountProp ?? facetCount(filterFacets);
  return (
    <div className={cn('flex flex-col gap-2', className)} data-testid={testId}>
      <SearchInput
        size="md"
        value={query}
        onChange={onQueryChange}
        placeholder={searchPlaceholder}
        aria-label="Search work"
        data-testid={`${testId}-search`}
        className="w-full"
      />
      {(hasSort || filters) && (
        <div className="flex items-center gap-2">
          {hasSort && (
            <Select
              aria-label={sortLabel}
              data-testid={`${testId}-sort`}
              value={sort}
              onChange={(event) => onSortChange!(event.target.value)}
              options={sortOptions!}
              wrapperClassName="min-w-0 flex-1"
              className="w-full text-[15px] text-text-primary"
            />
          )}
          {filters && (
            <FilterPopover
              activeCount={activeFilterCount}
              onClear={onClearFilters}
              placement="bottom-end"
              trigger="icon"
              label="Filter work"
              data-testid={`${testId}-filter`}
              className={cn(!hasSort && 'ml-auto')}
            >
              {filters}
            </FilterPopover>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

export function WorkListView({
  title = 'Work',
  count,
  onCreate,
  createLabel = 'New work item',
  onCollapse,
  collapseLabel = 'Collapse work list',
  chrome = 'full',
  query,
  onQueryChange,
  searchPlaceholder,
  sort,
  sortOptions,
  onSortChange,
  sortLabel,
  filters,
  filterFacets,
  activeFilterCount: activeFilterCountProp,
  onClearFilters,
  groups,
  items,
  currentId = null,
  onOpenItem,
  onToggleDone,
  onReorder,
  loading = false,
  error = null,
  onRetry,
  emptyLabel = 'No work yet',
  storageKey,
  className,
  'data-testid': testId = 'work-list',
}: WorkListViewProps) {
  const visible = useMemo(() => items.filter((item) => matches(item, query)), [items, query]);
  const rows = useMemo(() => toWorkListRows(visible, { onToggleDone, testId }), [visible, onToggleDone, testId]);
  const byId = useMemo(() => new Map(visible.map((item) => [item.id, item])), [visible]);
  const activeFilterCount = activeFilterCountProp ?? facetCount(filterFacets);
  const searching = query.trim().length > 0;
  const narrowed = searching || activeFilterCount > 0;

  const listGroups = useMemo<GroupedListGroup[]>(
    () =>
      groups.map((g) => ({
        id: g.id,
        title: g.title,
        count: visible.filter((item) => item.groupId === g.id).length,
        emptyLabel: g.emptyLabel,
        defaultOpen: g.defaultOpen,
      })),
    [groups, visible],
  );

  let body: ReactNode;
  if (loading && items.length === 0) {
    body = <LoadingState label="Loading work…" spinnerSize="md" testId={`${testId}-loading`} />;
  } else if (items.length === 0) {
    body = error ? null : <EmptyState testId={`${testId}-empty`} size="sm" title={emptyLabel} />;
  } else if (visible.length === 0) {
    body = (
      <EmptyState
        testId={`${testId}-no-match`}
        size="sm"
        title="No work matches"
        body={narrowed ? 'Try a different search, or clear the filters.' : undefined}
        actionLabel={narrowed ? 'Clear search and filters' : undefined}
        onAction={
          narrowed
            ? () => {
                onQueryChange('');
                onClearFilters?.();
              }
            : undefined
        }
      />
    );
  } else {
    body = (
      <GroupedList
        data-testid={`${testId}-groups`}
        groups={listGroups}
        rows={rows}
        currentId={currentId}
        storageKey={storageKey}
        size="md"
        hideEmptyGroups={narrowed}
        onOpenRow={(row) => {
          const item = byId.get(row.id);
          if (item) onOpenItem?.(item);
        }}
        onReorder={onReorder && !narrowed ? onReorder : undefined}
        reorderLabel={(row) => `Reorder ${row.title}`}
      />
    );
  }

  const shownCount = count ?? items.length;

  return (
    <div data-testid={testId} data-chrome={chrome} className={cn('flex h-full min-h-0 flex-col gap-3', chrome === 'full' ? 'pt-3' : 'pt-1', className)}>
      {chrome === 'full' && (
        <div className="flex items-center gap-2 pl-5 pr-3" data-testid={`${testId}-title-row`}>
          <h2 className="m-0 truncate text-[18px] font-semibold text-text-primary">{title}</h2>
          <Chip size="sm" tone="neutral" className="shrink-0" data-testid={`${testId}-count`} aria-label={`${shownCount} items`}>
            {shownCount}
          </Chip>
          <span className="flex-1" />
          {onCreate && (
            <IconButton aria-label={createLabel} icon={<PlusIcon />} onClick={onCreate} data-testid={`${testId}-create`} className="text-primary" />
          )}
          {onCollapse && (
            <IconButton
              aria-label={collapseLabel}
              icon={<ChevronIcon dir="left" />}
              onClick={onCollapse}
              data-testid={`${testId}-collapse`}
              className="text-text-secondary"
            />
          )}
        </div>
      )}
      <WorkListToolbar
        query={query}
        onQueryChange={onQueryChange}
        searchPlaceholder={searchPlaceholder}
        sort={sort}
        sortOptions={sortOptions}
        onSortChange={onSortChange}
        sortLabel={sortLabel}
        filters={filters}
        filterFacets={filterFacets}
        activeFilterCount={activeFilterCount}
        onClearFilters={onClearFilters}
        className="px-5"
        data-testid={`${testId}-toolbar`}
      />
      {error && (
        <Banner
          className="mx-5"
          variant="error"
          data-testid={`${testId}-error`}
          action={
            onRetry ? (
              <Button variant="secondary" size="sm" onClick={onRetry} data-testid={`${testId}-retry`}>
                Retry
              </Button>
            ) : undefined
          }
        >
          {error}
        </Banner>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2" data-testid={`${testId}-body`}>
        {body}
      </div>
    </div>
  );
}

export default WorkListView;
