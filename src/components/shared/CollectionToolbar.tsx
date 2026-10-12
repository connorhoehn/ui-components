import { type ReactNode } from 'react';
import { Select, type SelectOption } from '../forms/Select';
import { IconButton } from '../ui/IconButton';
import { InfoIcon, RepeatIcon } from '../ui/Icons';
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
export interface CollectionToolbarProps {
  label: string;
  search?: Pick<SearchInputProps, 'value' | 'onChange' | 'placeholder' | 'aria-label' | 'data-testid'>;
  filters?: CollectionFilter[];
  summary?: ReactNode;
  /** Explanations belong behind an info control, never in the filter row. */
  notices?: ReactNode[];
  actions?: CollectionAction[];
  onRefresh?: () => void;
  refreshing?: boolean;
  children?: ReactNode;
}

/** One collection control row: filters, count, notices and named icon actions.
 * Hosts supply state and commands, never control geometry or presentation. */
export function CollectionToolbar({ label, search, filters = [], summary, notices = [], actions = [], onRefresh, refreshing = false, children }: CollectionToolbarProps) {
  const infoRef = useRef<HTMLButtonElement>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const active = filters.filter(f => f.value !== (f.emptyValue ?? ''));
  return <Toolbar aria-label={label} wrap variant="collection" end={<>
    {actions.map(action => <Tooltip key={action.id} content={action.label}><IconButton aria-label={action.label} icon={action.icon} onClick={action.onClick} disabled={action.disabled} data-testid={action['data-testid']} /></Tooltip>)}
    {onRefresh && <Tooltip content="Refresh"><IconButton aria-label="Refresh" icon={<RepeatIcon />} onClick={onRefresh} disabled={refreshing} /></Tooltip>}
  </>}>
    {search && <SearchInput {...search} className="min-w-0 w-full max-w-64" />}
    {filters.length > 0 && <FilterPopover label="Filters" trigger="icon" activeCount={active.length} panelLabel={label} onClear={() => filters.forEach(f => f.onChange(f.emptyValue ?? ''))}>
      {filters.map(filter => <FormField key={filter.id} label={filter.label}>{wiring => <Select {...wiring} aria-label={filter.label} value={filter.value} options={filter.options} onChange={event => filter.onChange(event.target.value)} chevron="custom" />}</FormField>)}
    </FilterPopover>}
    {active.length > 0 && <span className="min-w-0 truncate text-xs text-text-primary" title={active.map(f => `${f.label}: ${f.options.find(o => o.value === f.value)?.label ?? f.value}`).join(' · ')}>{active.map(f => f.options.find(o => o.value === f.value)?.label ?? f.value).join(' · ')}</span>}
    {summary && <span className="min-w-0 text-xs text-text-secondary" data-collection-summary>{summary}</span>}
    {notices.length > 0 && <>
      <Tooltip content="About these results"><IconButton ref={infoRef} aria-label="About these results" aria-haspopup="dialog" aria-expanded={infoOpen} icon={<InfoIcon />} onClick={() => setInfoOpen(!infoOpen)} /></Tooltip>
      <InlinePopover open={infoOpen} onClose={() => setInfoOpen(false)} trigger={infoRef} aria-label="About these results" className="max-w-sm p-3 text-sm text-text-secondary"><ul className="flex flex-col gap-2">{notices.map((notice, index) => <li key={index}>{notice}</li>)}</ul></InlinePopover>
    </>}
    {children}
  </Toolbar>;
}
