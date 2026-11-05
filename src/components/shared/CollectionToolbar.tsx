import { type ReactNode } from 'react';
import { Select, type SelectOption } from '../forms/Select';
import { IconButton } from '../ui/IconButton';
import { CloseIcon, InfoIcon, RepeatIcon } from '../ui/Icons';
import { FilterPopover } from './FilterPopover';
import FormField from './FormField';
import { SearchInput, type SearchInputProps } from './SearchInput';
import { Toolbar } from './Toolbar';
import { Tooltip } from './Tooltip';
import { InlinePopover } from './InlinePopover';
import { useRef, useState } from 'react';

export interface CollectionFilter {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  /** Value meaning no restriction. Defaults to the empty string. */
  emptyValue?: string;
}
export interface CollectionAction {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  'data-testid'?: string;
}
/**
 * A row selection, drawn IN PLACE of the resting controls (search, filters,
 * count) on the same toolbar row, so selecting a row never inserts a band
 * above the table and the table's top edge never moves. Since 2.442.0.
 */
export interface CollectionSelection {
  /** Selected row count. `0` restores the resting controls. */
  count: number;
  /** Override the "N selected" label. */
  label?: ReactNode;
  /** Bulk actions for the selection — `Button size="sm"`s, drawn at the row's end. */
  actions?: ReactNode;
  /** Clears the selection (the row's × control). */
  onClear: () => void;
}
/**
 * The toolbar's search. Collapsed to a search icon by default (since
 * 2.503.0): it expands on click or `/` and folds away again while empty, so a
 * collection never carries a full-width search band. `collapsible: false`
 * keeps the open field.
 */
export type CollectionSearch = Pick<SearchInputProps, 'value' | 'onChange' | 'placeholder' | 'aria-label' | 'data-testid' | 'shortcut'> & {
  collapsible?: boolean;
};
export interface CollectionToolbarProps {
  label: string;
  /** Tables add a cell inset; cards and standalone collections align to their content edge. */
  layout?: 'table' | 'cards';
  search?: CollectionSearch;
  filters?: CollectionFilter[];
  /**
   * Host-built content for the same Filters popover, for filters that are not
   * single selects (multi-select facets such as `WorkListFilters`). Drawn
   * after any `filters`; `activeCount` joins the trigger's count and
   * `onClear` runs with the panel's Clear. Since 2.503.0.
   */
  filterPanel?: { content: ReactNode; activeCount?: number; onClear?: () => void };
  /** A count line ("12 of 40 runs"). Hidden while `resultCount` is 0 — the empty state says it instead. */
  summary?: ReactNode;
  /**
   * How many items the collection is showing right now (since 2.503.0). At
   * `0` the toolbar draws no count: "0 of 0 artworks" above an empty state is
   * chrome describing nothing. Leave it undefined to always draw `summary`.
   */
  resultCount?: number;
  /**
   * `band` (default) is the toolbar's own row above the collection. `header`
   * (since 2.503.0) is the same controls with no row of their own, for a
   * page header's actions row — `CollectionPage` uses it automatically.
   */
  placement?: 'band' | 'header';
  /** Explanations belong behind an info control, never in the filter row. */
  notices?: ReactNode[];
  actions?: CollectionAction[];
  onRefresh?: () => void;
  refreshing?: boolean;
  /** While `selection.count > 0` the row shows the selection and its bulk actions instead of search/filters/count. */
  selection?: CollectionSelection;
  children?: ReactNode;
}

/** One collection control row: filters, count, notices and named icon actions.
 * Hosts supply state and commands, never control geometry or presentation. */
export function CollectionToolbar({ label, layout = 'table', search, filters = [], filterPanel, summary, resultCount, placement = 'band', notices = [], actions = [], onRefresh, refreshing = false, selection, children }: CollectionToolbarProps) {
  const infoRef = useRef<HTMLButtonElement>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const active = filters.filter(f => f.value !== (f.emptyValue ?? ''));
  if (selection && selection.count > 0) {
    // Same Toolbar, same variant and control scale: the selection replaces the
    // resting controls on this row, so the table under it keeps its top edge.
    return <Toolbar aria-label={`${label}: selection`} wrap variant="collection" data-collection-layout={layout} className={layout === 'cards' ? 'px-0' : undefined} data-collection-selection="active" end={selection.actions}>
      <Tooltip content="Clear selection"><IconButton aria-label="Clear selection" icon={<CloseIcon />} onClick={selection.onClear} /></Tooltip>
      <span className="min-w-0 truncate text-xs font-medium text-text-primary" role="status" data-collection-selection-count>{selection.label ?? `${selection.count} selected`}</span>
    </Toolbar>;
  }
  const { collapsible = true, ...searchProps } = search ?? { value: '', onChange: () => {} };
  const showSummary = summary != null && summary !== false && resultCount !== 0;
  // The query controls (search, filters, refresh) sit at the row's trailing
  // end beside the named actions; the start keeps what describes the
  // results (active filters, count, notices). They share one marked group,
  // `data-collection-query`, so the DOM audit's `collection.refresh-with-query`
  // can check Refresh stays with the query rather than drifting among the
  // named actions — whether the search is open or folded to its icon.
  const hasQuery = Boolean(search || filters.length > 0 || filterPanel || onRefresh);
  const query = <>
    {hasQuery && <div className="flex min-w-0 items-center gap-2" data-collection-query="">
    {search && <SearchInput {...searchProps} collapsible={collapsible} className={collapsible ? 'min-w-0 w-56 max-w-full' : 'min-w-0 w-full max-w-64'} />}
    {(filters.length > 0 || filterPanel) && <FilterPopover label="Filters" trigger="icon" placement="bottom-end" activeCount={active.length + (filterPanel?.activeCount ?? 0)} panelLabel={label} onClear={() => { filters.forEach(f => f.onChange(f.emptyValue ?? '')); filterPanel?.onClear?.(); }}>
      {filters.map(filter => <FormField key={filter.id} label={filter.label}>{wiring => <Select {...wiring} aria-label={filter.label} value={filter.value} options={filter.options} onChange={event => filter.onChange(event.target.value)} chevron="custom" />}</FormField>)}
      {filterPanel?.content}
    </FilterPopover>}
    {onRefresh && <Tooltip content="Refresh"><IconButton aria-label="Refresh" icon={<RepeatIcon />} onClick={onRefresh} disabled={refreshing} /></Tooltip>}
    </div>}
    {actions.map(action => <Tooltip key={action.id} content={action.label}><IconButton aria-label={action.label} icon={action.icon} onClick={action.onClick} disabled={action.disabled} data-testid={action['data-testid']} /></Tooltip>)}
  </>;
  const described = active.length > 0 || showSummary || notices.length > 0 || children != null;
  return <Toolbar aria-label={label} wrap={placement === 'band'} variant="collection" bordered={false} data-collection-layout={layout} data-collection-placement={placement}
    className={placement === 'header' ? 'min-h-0 px-0 py-0' : layout === 'cards' ? 'px-0' : undefined} data-collection-selection={selection ? 'idle' : undefined}
    end={hasQuery || actions.length ? query : undefined}>
    {described && <>
      {active.length > 0 && <span className="min-w-0 truncate text-xs text-text-primary" title={active.map(f => `${f.label}: ${f.options.find(o => o.value === f.value)?.label ?? f.value}`).join(' · ')}>{active.map(f => f.options.find(o => o.value === f.value)?.label ?? f.value).join(' · ')}</span>}
      {showSummary && <span className="min-w-0 text-xs text-text-secondary" data-collection-summary>{summary}</span>}
      {notices.length > 0 && <>
        <Tooltip content="About these results"><IconButton ref={infoRef} aria-label="About these results" aria-haspopup="dialog" aria-expanded={infoOpen} icon={<InfoIcon />} onClick={() => setInfoOpen(!infoOpen)} /></Tooltip>
        <InlinePopover open={infoOpen} onClose={() => setInfoOpen(false)} trigger={infoRef} aria-label="About these results" className="max-w-sm p-3 text-sm text-text-secondary"><ul className="flex flex-col gap-2">{notices.map((notice, index) => <li key={index}>{notice}</li>)}</ul></InlinePopover>
      </>}
      {children}
    </>}
  </Toolbar>;
}

/**
 * Whether a toolbar can live in a page header's actions row instead of its
 * own band: nothing in it needs the full row. A selection replaces the row's
 * controls, and `children` are host content of unknown width. Since 2.503.0.
 */
export function collectionToolbarFitsHeader(toolbar: CollectionToolbarProps): boolean {
  return !toolbar.selection && toolbar.children == null;
}
