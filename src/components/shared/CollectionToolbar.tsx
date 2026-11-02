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
export interface CollectionToolbarProps {
  label: string;
  /** Tables add a cell inset; cards and standalone collections align to their content edge. */
  layout?: 'table' | 'cards';
  search?: Pick<SearchInputProps, 'value' | 'onChange' | 'placeholder' | 'aria-label' | 'data-testid'>;
  filters?: CollectionFilter[];
  summary?: ReactNode;
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
export function CollectionToolbar({ label, layout = 'table', search, filters = [], summary, notices = [], actions = [], onRefresh, refreshing = false, selection, children }: CollectionToolbarProps) {
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
  return <Toolbar aria-label={label} wrap variant="collection" data-collection-layout={layout} className={layout === 'cards' ? 'px-0' : undefined} data-collection-selection={selection ? 'idle' : undefined} end={actions.length ? <>
    {actions.map(action => <Tooltip key={action.id} content={action.label}><IconButton aria-label={action.label} icon={action.icon} onClick={action.onClick} disabled={action.disabled} data-testid={action['data-testid']} /></Tooltip>)}
  </> : undefined}>
    {search && <SearchInput {...search} className="min-w-0 w-full max-w-64" />}
    {filters.length > 0 && <FilterPopover label="Filters" trigger="icon" activeCount={active.length} panelLabel={label} onClear={() => filters.forEach(f => f.onChange(f.emptyValue ?? ''))}>
      {filters.map(filter => <FormField key={filter.id} label={filter.label}>{wiring => <Select {...wiring} aria-label={filter.label} value={filter.value} options={filter.options} onChange={event => filter.onChange(event.target.value)} chevron="custom" />}</FormField>)}
    </FilterPopover>}
    {onRefresh && <Tooltip content="Refresh"><IconButton aria-label="Refresh" icon={<RepeatIcon />} onClick={onRefresh} disabled={refreshing} /></Tooltip>}
    {active.length > 0 && <span className="min-w-0 truncate text-xs text-text-primary" title={active.map(f => `${f.label}: ${f.options.find(o => o.value === f.value)?.label ?? f.value}`).join(' · ')}>{active.map(f => f.options.find(o => o.value === f.value)?.label ?? f.value).join(' · ')}</span>}
    {summary && <span className="min-w-0 text-xs text-text-secondary" data-collection-summary>{summary}</span>}
    {notices.length > 0 && <>
      <Tooltip content="About these results"><IconButton ref={infoRef} aria-label="About these results" aria-haspopup="dialog" aria-expanded={infoOpen} icon={<InfoIcon />} onClick={() => setInfoOpen(!infoOpen)} /></Tooltip>
      <InlinePopover open={infoOpen} onClose={() => setInfoOpen(false)} trigger={infoRef} aria-label="About these results" className="max-w-sm p-3 text-sm text-text-secondary"><ul className="flex flex-col gap-2">{notices.map((notice, index) => <li key={index}>{notice}</li>)}</ul></InlinePopover>
    </>}
    {children}
  </Toolbar>;
}
