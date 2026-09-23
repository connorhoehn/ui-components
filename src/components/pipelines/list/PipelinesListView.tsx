// PipelinesListView — the pipelines page's body, as a presentational
// composite: header (title, count chip, ⋯ / Templates / Start from blank),
// toolbar (search, Filter popover, "Group: …" select), the grouped directory
// of pipeline rows, the empty / loading / error states, and a `footer` slot
// for the docked agent composer.
//
// No fetching, no URL state, no modals: the host owns those and passes data
// and callbacks. `toGroupedRows` and the catalog helpers are exported so the
// host's tests can assert on the same rows the view draws.
//
// ## The footer is a pinned dock
//
// The mockup's composer sits at the bottom of the list column, spanning it,
// as a flat card — the same card `FloatingComposerDock` draws when it is
// pinned inside an `EditorShell`. The footer slot provides that placement
// (`ComposerDockPlacementContext` = `pinned`) and zeroes `--dock-inset`, so a
// `FloatingComposerDock` dropped in here is column-wide and lines up with the
// rows' edges. Whatever the host puts there — the dock, a `TaskStrip`, both —
// stays in normal flow below the list; the list scrolls, the footer does not.

import { useMemo, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import Banner from '../../shared/Banner';
import Chip from '../../shared/Chip';
import { DropdownMenu, type DropdownMenuSection } from '../../shared/DropdownMenu';
import EmptyState from '../../shared/EmptyState';
import { FileKindMark } from '../../shared/FileKindMark';
import { FilterPopover } from '../../shared/FilterPopover';
import { GroupedList, type GroupedListGroup, type GroupedListRow } from '../../shared/GroupedList';
import LoadingState from '../../shared/LoadingState';
import PageHeader from '../../shared/PageHeader';
import { SearchInput } from '../../shared/SearchInput';
import { StatusPill } from '../../shared/StatusPill';
import { Toolbar } from '../../shared/Toolbar';
import { Select } from '../../forms/Select';
import { ComposerDockPlacementContext } from '../../doc-editor/FloatingComposerDock';
import {
  GROUP_BY_LABEL,
  GROUP_BY_ORDER,
  KIND_MARK,
  entryKind,
  groupEntries,
  matchesQuery,
  routeLine,
  statusPillFor,
  type PipelinesGroupBy,
  type PipelinesListEntry,
} from './catalog';

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
  emptyState?: { title?: string; body?: string; actionLabel?: string; onAction?: () => void };
  /** The docked composer. */
  footer?: ReactNode;
  /** A fixed clock for the pills' "· 29m ago" — tests and stories. Default `Date.now()`. */
  now?: number;
  className?: string;
  'data-testid'?: string;
}

function PlayGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.2 2.1A.8.8 0 0 0 4 2.8Z" />
    </svg>
  );
}

const WARN_OR_FAIL = new Set(['danger', 'warning']);

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
export function toGroupedRows(
  entries: PipelinesListEntry[],
  groupBy: PipelinesGroupBy,
  options: ToGroupedRowsOptions = {},
): { groups: GroupedListGroup[]; rows: GroupedListRow[] } {
  const { currentId = null, now = Date.now(), onOpen, onRun, onViewRun, rowTrailing, testId = 'pipelines-list' } = options;
  const { groups: buckets, groupOf } = groupEntries(entries, groupBy);
  const groups: GroupedListGroup[] = buckets.map((g) => ({
    id: g.id,
    title: g.title,
    count: g.count,
    icon: <FileKindMark kind="folder" size="lg" variant="plain" />,
  }));
  const rows: GroupedListRow[] = entries.map((entry) => {
    const pill = statusPillFor(entry, now);
    const route = routeLine(entry.route);
    const description = entry.description?.trim() || undefined;
    const canViewRun = !!onViewRun && !!entry.rollup?.lastRunId && WARN_OR_FAIL.has(pill.tone);
    const extra = rowTrailing?.(entry);
    const trailing =
      canViewRun || extra ? (
        <>
          {canViewRun && (
            <Button
              variant="link"
              size="sm"
              data-testid={`${testId}-view-run-${entry.id}`}
              onClick={() => onViewRun!(entry, entry.rollup!.lastRunId)}
            >
              View run
            </Button>
          )}
          {extra}
        </>
      ) : undefined;
    return {
      id: entry.id,
      groupId: groupOf.get(entry.id) ?? 'all',
      icon: <FileKindMark kind={KIND_MARK[entryKind(entry)]} size="lg" variant="plain" />,
      title: entry.name,
      pill: (
        <StatusPill variant="text" {...pill} data-testid={`${testId}-pill-${entry.id}`} />
      ),
      subline: description ?? route,
      hoverSubline: description && route ? route : undefined,
      current: entry.id === currentId,
      trailing,
      hoverActions: (
        <>
          {onRun && entry.status === 'published' && (
            <IconButton
              aria-label={`Run ${entry.name}`}
              size="sm"
              variant="ghost"
              icon={<PlayGlyph />}
              data-testid={`${testId}-run-${entry.id}`}
              onClick={() => onRun(entry)}
            />
          )}
          <Button variant="secondary" size="sm" data-testid={`${testId}-open-${entry.id}`} onClick={() => onOpen?.(entry)}>
            Open
          </Button>
        </>
      ),
    };
  });
  return { groups, rows };
}

export function PipelinesListView({
  entries,
  loading = false,
  error = null,
  onRetry,
  query,
  onQueryChange,
  searchPlaceholder = 'Search pipelines…',
  groupBy,
  onGroupByChange,
  filters,
  activeFilterCount = 0,
  onClearFilters,
  title = 'Pipelines',
  count,
  headerMenu,
  onTemplates,
  onStartBlank,
  headerActions,
  currentId = null,
  onOpen,
  onRun,
  onViewRun,
  rowMenu,
  rowTrailing,
  storageKey,
  emptyState,
  footer,
  now,
  className,
  'data-testid': testId = 'pipelines-list',
}: PipelinesListViewProps) {
  const visible = useMemo(() => entries.filter((e) => matchesQuery(e, query)), [entries, query]);
  const clock = now ?? Date.now();

  const { groups, rows } = useMemo(
    () => toGroupedRows(visible, groupBy, { currentId, now: clock, onOpen, onRun, onViewRun, rowTrailing, testId }),
    [visible, groupBy, currentId, clock, onOpen, onRun, onViewRun, rowTrailing, testId],
  );
  const rowByEntry = useMemo(() => new Map(visible.map((e) => [e.id, e])), [visible]);

  const narrowed = query.trim().length > 0 || activeFilterCount > 0;
  const hasHeaderActions = !!headerMenu?.length || !!onTemplates || !!onStartBlank || !!headerActions;

  let body: ReactNode;
  if (loading && entries.length === 0) {
    body = <LoadingState label="Loading pipelines…" testId={`${testId}-loading`} />;
  } else if (entries.length === 0) {
    body = (
      <EmptyState
        testId={`${testId}-empty`}
        title={emptyState?.title ?? 'No pipelines yet'}
        body={emptyState?.body ?? 'Start from a template, from blank, or ask the agent below to draft one.'}
        actionLabel={emptyState?.actionLabel ?? (onStartBlank ? 'Start from blank' : undefined)}
        onAction={emptyState?.onAction ?? onStartBlank}
      />
    );
  } else if (visible.length === 0) {
    body = (
      <EmptyState
        testId={`${testId}-no-match`}
        size="sm"
        title="No pipelines match"
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
        groups={groups}
        rows={rows}
        currentId={currentId}
        storageKey={storageKey}
        onOpenRow={(row) => {
          const entry = rowByEntry.get(row.id);
          if (entry) onOpen(entry);
        }}
        rowMenu={
          rowMenu
            ? (row) => {
                const entry = rowByEntry.get(row.id);
                return entry ? rowMenu(entry) : null;
              }
            : undefined
        }
      />
    );
  }

  return (
    <div data-testid={testId} className={cn('flex h-full min-h-0 flex-col gap-4', className)}>
      <PageHeader
        title={title}
        size="lg"
        badge={
          <Chip size="sm" tone="neutral" data-testid={`${testId}-count`} aria-label={`${count ?? visible.length} pipelines`}>
            {count ?? visible.length}
          </Chip>
        }
        actions={
          hasHeaderActions ? (
            <>
              {!!headerMenu?.length && (
                <DropdownMenu
                  trigger={<span aria-hidden="true" className="text-base leading-none">⋯</span>}
                  triggerLabel="More actions"
                  triggerTestId={`${testId}-more`}
                  align="end"
                  sections={headerMenu}
                  triggerClassName="h-9 w-9 px-0 py-0"
                />
              )}
              {onTemplates && (
                <Button variant="secondary" size="md" data-testid={`${testId}-templates`} onClick={onTemplates}>
                  Templates
                </Button>
              )}
              {onStartBlank && (
                <Button variant="secondary" size="md" data-testid={`${testId}-start-blank`} onClick={onStartBlank}>
                  Start from blank
                </Button>
              )}
              {headerActions}
            </>
          ) : undefined
        }
      />

      <Toolbar
        aria-label="Pipeline list tools"
        data-testid={`${testId}-toolbar`}
        end={
          <Select
            size="sm"
            aria-label="Group by"
            data-testid={`${testId}-group-by`}
            value={groupBy}
            onChange={(event) => onGroupByChange(event.target.value as PipelinesGroupBy)}
            options={GROUP_BY_ORDER.map((value) => ({ value, label: `Group: ${GROUP_BY_LABEL[value]}` }))}
          />
        }
      >
        <SearchInput
          value={query}
          onChange={onQueryChange}
          placeholder={searchPlaceholder}
          aria-label="Search pipelines"
          data-testid={`${testId}-search`}
          className="w-full max-w-[420px] flex-1"
        />
        {filters && (
          <FilterPopover
            activeCount={activeFilterCount}
            onClear={onClearFilters}
            data-testid={`${testId}-filter`}
          >
            {filters}
          </FilterPopover>
        )}
      </Toolbar>

      {error && (
        <Banner
          variant="error"
          data-testid={`${testId}-error`}
          action={
            onRetry ? (
              <Button variant="secondary" size="sm" onClick={onRetry}>
                Retry
              </Button>
            ) : undefined
          }
        >
          {error}
        </Banner>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto" data-testid={`${testId}-body`}>
        {body}
      </div>

      {footer && (
        <ComposerDockPlacementContext.Provider value="pinned">
          <div data-testid={`${testId}-footer`} className="w-full shrink-0 [--dock-inset:0px]">
            {footer}
          </div>
        </ComposerDockPlacementContext.Provider>
      )}
    </div>
  );
}

export default PipelinesListView;
