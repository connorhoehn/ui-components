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
import { DropdownMenu } from '../shared/DropdownMenu';
import { DensityProvider } from '../shared/Density';

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
  /** A narrow navigation rail: small status marks, full-width titles and keys on the metadata line. */
  layout?: 'default' | 'rail';
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

// ---------------------------------------------------------------------------
// Row mapping
// ---------------------------------------------------------------------------

function SignalDot({ signal, compact = false }: { signal: WorkListSignal; compact?: boolean }) {
  if (signal.state === 'review') {
    return (
      <StatusDot
        color="transparent"
        size={compact ? 'xs' : 'md'}
        aria-label={signal.label}
        className="rounded-full ring-[1.5px] ring-text-tertiary"
        data-testid="work-signal-dot"
      />
    );
  }
  return (
    <StatusDot
      color={signal.state === 'running' ? 'var(--color-primary)' : 'var(--color-danger)'}
      size={compact ? 'xs' : 'md'}
      aria-label={signal.label}
      data-testid="work-signal-dot"
    />
  );
}

function pointsText(points: number, unit: 'pts' | 'points'): string {
  if (unit === 'points') return `${points} ${points === 1 ? 'point' : 'points'}`;
  return `${points} pts`;
}

function TextMetaLine({ item, testId, unit }: { item: WorkListItem; testId: string; unit: 'pts' | 'points' }) {
  const parts: ReactNode[] = [];
  if (item.signal) {
    parts.push(
      <span key="signal" className={cn(item.signal.state === 'running' && 'font-medium text-primary')}>
        {item.signal.label}
      </span>,
    );
  }
  if (item.kindLabel) parts.push(<span key="kind">{item.kindLabel}</span>);
  parts.push(<span key="owner">{item.owner ? item.owner.name : 'Unassigned'}</span>);
  if (typeof item.points === 'number') parts.push(<span key="pts">{pointsText(item.points, unit)}</span>);
  return (
    <span className="truncate" data-testid={`${testId}-meta-${item.id}`} data-meta-style="text">
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && ' · '}
          {part}
        </span>
      ))}
    </span>
  );
}

function MetaLine({ item, testId, unit = 'pts' }: { item: WorkListItem; testId: string; unit?: 'pts' | 'points' }) {
  const parts: ReactNode[] = [];
  if (item.signal) {
    parts.push(
      <span key="signal" className={cn(item.signal.state === 'running' && 'font-medium text-primary')}>
        {item.signal.label}
      </span>,
    );
  }
  if (typeof item.points === 'number') parts.push(<span key="pts">{pointsText(item.points, unit)}</span>);
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
  layout?: 'default' | 'rail';
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
export function toWorkListRows(
  items: WorkListItem[],
  { onToggleDone, testId = 'work-list', metaStyle = 'default', pointsLabel = 'pts', signalDisplay = 'dot', layout = 'default' }: ToWorkListRowsOptions = {},
): GroupedListRow[] {
  return items.map((item) => {
    let leading: ReactNode = undefined;
    if (item.signal && signalDisplay !== 'meta') {
      const dot = <SignalDot signal={item.signal} compact={layout === 'rail'} />;
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
    const compactMark = layout === 'rail' && !item.signal?.onClick && !onToggleDone;
    const meta = metaStyle === 'text' ? <TextMetaLine item={item} testId={testId} unit={pointsLabel} /> : <MetaLine item={item} testId={testId} unit={pointsLabel} />;
    const tag = item.tag && <Chip size="sm" tone={item.tag.tone ?? 'neutral'} mono className="shrink-0" data-testid={`${testId}-tag-${item.id}`}>{item.tag.label}</Chip>;
    return {
      id: item.id,
      groupId: item.groupId,
      title: item.title,
      disabled: item.disabled,
      leading: leading ?? (compactMark ? <span className="h-2 w-2" aria-hidden="true" /> : undefined),
      ...(compactMark ? { leadingSize: 'indicator' as const } : {}),
      meta: layout === 'rail' ? <span className="flex min-w-0 flex-1 items-center gap-2"><span className="min-w-0 flex-1 truncate">{meta}</span>{tag}</span> : meta,
      ...(item.tag && layout !== 'rail'
        ? {
            trailing: (
              tag
            ),
          }
        : {}),
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
  toolbarLayout = 'stacked',
  sortStyle = 'select',
  className,
  'data-testid': testId = 'work-list-toolbar',
}: WorkListToolbarProps) {
  const hasSort = !!sortOptions?.length && !!onSortChange;
  const filters = filtersProp ?? (filterFacets?.length ? <WorkListFilters facets={filterFacets} data-testid={`${testId}-facets`} /> : null);
  const activeFilterCount = activeFilterCountProp ?? facetCount(filterFacets);
  const current = hasSort ? sortOptions!.find((o) => o.value === sort) ?? sortOptions![0] : undefined;
  const sortControl = !hasSort ? null : sortStyle === 'menu' ? (
    <DropdownMenu
      triggerVariant="link"
      trigger={
        <>
          <span className="truncate">{current?.label}</span>
          <ChevronIcon dir="down" size={14} aria-hidden="true" className="shrink-0 text-text-secondary" />
        </>
      }
      triggerLabel={`${sortLabel}: ${current?.label ?? ''}`}
      triggerTestId={`${testId}-sort`}
      triggerClassName="px-1 text-sm text-text-primary"
      data-testid={`${testId}-sort-menu`}
      sections={[{
        items: sortOptions!.map((o) => ({
          label: String(o.label),
          active: o.value === current?.value,
          onSelect: () => onSortChange!(o.value),
        })),
      }]}
    />
  ) : (
    <Select
      aria-label={sortLabel}
      data-testid={`${testId}-sort`}
      value={sort}
      onChange={(event) => onSortChange!(event.target.value)}
      options={sortOptions!}
      wrapperClassName="min-w-0 flex-1"
      className="w-full text-sm text-text-primary"
    />
  );
  const filterControl = filters ? (
    <FilterPopover
      activeCount={activeFilterCount}
      onClear={onClearFilters}
      placement="bottom-end"
      trigger="icon"
      label="Filter work"
      data-testid={`${testId}-filter`}
      className={cn(!hasSort && toolbarLayout !== 'inline' && 'ml-auto')}
    >
      {filters}
    </FilterPopover>
  ) : null;
  if (toolbarLayout === 'inline') {
    return (
      <div className={cn('flex flex-col gap-2', className)} data-testid={testId} data-layout="inline">
        <div className="flex items-center gap-2">
          <SearchInput
            size="md"
            value={query}
            onChange={onQueryChange}
            placeholder={searchPlaceholder}
            aria-label="Search work"
            data-testid={`${testId}-search`}
            className="min-w-0 flex-1"
          />
          {filterControl}
        </div>
        {sortControl && <div className="flex min-w-0 items-center">{sortControl}</div>}
      </div>
    );
  }
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
          {sortStyle === 'menu' && sortControl ? <div className="min-w-0 flex-1">{sortControl}</div> : sortControl}
          {filterControl}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

export function WorkListView({
  layout = 'default',
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
  toolbarLayout,
  sortStyle,
  metaStyle = 'default',
  pointsLabel = 'pts',
  signalDisplay = 'dot',
  currentStyle,
  groupCountStyle,
  className,
  'data-testid': testId = 'work-list',
}: WorkListViewProps) {
  const visible = useMemo(() => items.filter((item) => matches(item, query)), [items, query]);
  const rows = useMemo(
    () => toWorkListRows(visible, { onToggleDone, testId, metaStyle, pointsLabel, signalDisplay, layout }),
    [visible, onToggleDone, testId, metaStyle, pointsLabel, signalDisplay, layout],
  );
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
    body = error ? null : <DensityProvider density="compact"><EmptyState testId={`${testId}-empty`} title={emptyLabel} /></DensityProvider>;
  } else if (visible.length === 0) {
    body = (
      <DensityProvider density="compact"><EmptyState
        testId={`${testId}-no-match`}
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
      /></DensityProvider>
    );
  } else {
    body = (
      <GroupedList
        data-testid={`${testId}-groups`}
        groups={listGroups}
        rows={rows}
        currentId={currentId}
        storageKey={storageKey}
        {...(currentStyle ? { currentStyle } : {})}
        {...(groupCountStyle ? { groupCountStyle } : {})}
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
    <div data-testid={testId} data-chrome={chrome} data-layout={layout} className={cn('flex h-full min-h-0 flex-col gap-3', chrome === 'full' ? 'pt-3' : 'pt-1', className)}>
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
        {...(toolbarLayout ? { toolbarLayout } : {})}
        {...(sortStyle ? { sortStyle } : {})}
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
