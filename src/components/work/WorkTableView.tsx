import { useState } from 'react';
import { cn } from '../../lib/cn';
import { ActionRowPerson } from './ActionRowList';
import { DropdownMenu } from '../shared/DropdownMenu';
import EmptyState from '../shared/EmptyState';
import ErrorState from '../shared/ErrorState';
import LoadingState from '../shared/LoadingState';
import { StatusDot } from '../shared/StatusDot';
import { Checkbox } from '../forms/Checkbox';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';
import { Table, TableBody, TableHead, TableTd as Td, TableTh as Th, TableRow as Tr } from '../ui/Table';
import { WorkListToolbar, type WorkListItem, type WorkListToolbarProps, type WorkListViewProps } from './WorkListView';
import { DensityProvider } from '../shared/Density';

export type WorkTableGrouping = 'status' | 'owner' | 'type';

export interface WorkTableViewProps extends WorkListToolbarProps,
  Pick<WorkListViewProps, 'items' | 'groups' | 'count' | 'title' | 'currentId' | 'onOpenItem' | 'onToggleDone' | 'loading' | 'error' | 'onRetry' | 'emptyLabel'> {
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
export function WorkTableView({
  items, groups, count = items.length, title = 'Work', currentId,
  onOpenItem, onToggleDone, loading, error, onRetry, emptyLabel = 'No work yet',
  groupBy: controlledGrouping, onGroupByChange, groupColors, defaultKindLabel = 'Work',
  query, onQueryChange, searchPlaceholder = 'Find work…',
  sort, sortOptions, onSortChange, filters, filterFacets, activeFilterCount, onClearFilters,
  className, 'data-testid': testId = 'work-table',
}: WorkTableViewProps) {
  const [localGrouping, setLocalGrouping] = useState<WorkTableGrouping>('status');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const groupBy = controlledGrouping ?? localGrouping;
  const groupKey = (item: WorkListItem) => groupBy === 'status' ? item.groupId : groupBy === 'owner' ? item.owner?.id ?? 'unassigned' : item.kindLabel ?? defaultKindLabel;
  const tableGroups = groupBy === 'status' ? groups : Array.from(new Map(items.map((item) => [groupKey(item), {
    id: groupKey(item), title: groupBy === 'owner' ? item.owner?.name ?? 'Unassigned' : item.kindLabel ?? defaultKindLabel,
    defaultOpen: true,
  }])).values());
  const summary = groups.map((group) => {
    const n = items.filter((item) => item.groupId === group.id).length;
    return n ? `${n} ${group.title.toLowerCase()}` : null;
  }).filter(Boolean).join(' · ');
  const cell = 'border-b border-border px-0 py-[3px] text-sm leading-5 text-text-secondary h-11';
  const heading = 'border-b border-border px-0 py-2 text-xs font-semibold normal-case tracking-normal text-text-secondary';

  return <section className={cn('min-w-0 px-6 pb-6 pt-4', className)} aria-label={title} data-testid={testId}>
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="m-0 text-sm font-semibold text-text-primary">{title} {!loading && !error && <span className="ml-1 font-normal text-text-secondary">{count}</span>}</h2>
        {!loading && !error && <span className="text-xs text-text-tertiary">{summary}</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        <DropdownMenu trigger={<span className="inline-flex items-center gap-4">Group: {groupBy.charAt(0).toUpperCase() + groupBy.slice(1)} <ChevronIcon dir="down" size={12} /></span>}
          triggerLabel="Group work" triggerClassName="h-8 px-3 text-xs" sections={[{ items: (['status', 'owner', 'type'] as const).map((value) => ({
            label: value.charAt(0).toUpperCase() + value.slice(1), checked: groupBy === value,
            onSelect: () => { setLocalGrouping(value); onGroupByChange?.(value); },
          })) }]} />
        {sortOptions?.length && onSortChange ? <DropdownMenu trigger={<span className="inline-flex items-center gap-4">Sort: {sortOptions.find((option) => option.value === sort)?.label ?? 'Choose'} <ChevronIcon dir="down" size={12} /></span>}
          triggerLabel="Sort work" triggerClassName="h-8 px-3 text-xs" sections={[{ items: sortOptions.map((option) => ({
            label: option.label, checked: sort === option.value, onSelect: () => onSortChange(option.value),
          })) }]} /> : null}
      </div>
    </div>
    <WorkListToolbar query={query} onQueryChange={onQueryChange} searchPlaceholder={searchPlaceholder}
      toolbarLayout="inline" filters={filters} filterFacets={filterFacets} activeFilterCount={activeFilterCount}
      onClearFilters={onClearFilters} className="mb-3 max-w-[420px]" />
    {loading ? <LoadingState label="Loading work…" /> : error ? <ErrorState title="Work unavailable" body={error}
      action={onRetry ? <Button size="sm" onClick={onRetry}>Try again</Button> : undefined} /> : !items.length ? <DensityProvider density="compact"><EmptyState title={emptyLabel} /></DensityProvider> : <>
      {/* Table scrolls itself sideways below its 520px floor. */}
        <Table data-ui-table-rows="work" className="min-w-[520px] table-fixed border-collapse text-left" aria-label={`Work items grouped by ${groupBy}`}>
          <TableHead className="border-t border-border bg-transparent"><Tr>
            <Th className={cn(heading, 'px-2.5')}>Work item</Th><Th className={cn(heading, 'w-[184px]')}>Owner</Th><Th className={cn(heading, 'w-[89px] pl-5')}>Points</Th><Th className={cn(heading, 'w-[50px]')}><span className="sr-only">Open</span></Th>
          </Tr></TableHead>
          {tableGroups.map((group) => {
            const rows = items.filter((item) => groupKey(item) === group.id);
            if (!rows.length) return null;
            const key = `${groupBy}:${group.id}`;
            const closed = collapsed[key] ?? group.defaultOpen === false;
            return <TableBody key={key}>
              <Tr><Th colSpan={4} scope="rowgroup" className="border-b border-border p-0 normal-case tracking-normal">
                <button type="button" aria-expanded={!closed} onClick={() => setCollapsed((prev) => ({ ...prev, [key]: !closed }))}
                  className="flex w-full items-center gap-3 bg-transparent px-2.5 py-3 text-left text-sm font-semibold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <ChevronIcon dir={closed ? 'right' : 'down'} size={14} />
                  {groupBy === 'status' && groupColors?.[group.id] && <StatusDot color={groupColors[group.id]} />}
                  {group.title} <span className="font-normal text-text-tertiary">{rows.length}</span>
                </button>
              </Th></Tr>
              {!closed && rows.map((item, index) => <Tr key={item.id} data-work-row={item.id}
                clickable={!!onOpenItem && !item.disabled}
                onClick={(event) => {
                  // The title, completion toggle and signal each own their action.
                  if (!item.disabled && !(event.target as Element).closest('button, input, label, a')) onOpenItem?.(item);
                }}
                className={cn(index % 2 === 1 && 'bg-surface-panel', item.signal?.state === 'blocked' && 'bg-warning-callout', currentId === item.id && 'bg-primary/10', item.disabled && 'opacity-50')}>
                <Td className={cn(cell, 'min-w-0 px-2.5 text-text-primary')} data-testid="work-table-title-cell">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="min-w-0 flex-1">
                      {onOpenItem ? <button type="button" disabled={item.disabled} title={item.title} data-work-title=""
                        className="block max-w-full truncate bg-transparent text-left text-sm font-medium leading-5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        onClick={() => onOpenItem(item)}>{item.title}</button> : <span data-work-title="" className="block min-w-0 truncate text-sm font-medium leading-5" title={item.title}>{item.title}</span>}
                      <div className="flex min-w-0 items-center gap-2 text-xs leading-4 text-text-secondary" data-work-description="">
                        {item.reference && <span className="shrink-0 font-mono" data-work-reference="">{item.reference}</span>}
                        <span className="truncate" title={item.kindLabel ?? defaultKindLabel}>{item.kindLabel ?? defaultKindLabel}</span>
                        {item.signal && (item.signal.onClick ? <button type="button" disabled={item.disabled} className="shrink-0 text-sm text-primary hover:underline" onClick={item.signal.onClick}>{item.signal.label}</button> : <span className={cn('shrink-0', item.signal.state === 'blocked' ? 'text-danger' : item.signal.state === 'running' && 'text-primary')}>{item.signal.label}</span>)}
                        {[...(item.tag ? [item.tag] : []), ...(item.chips ?? [])].map((chip) => <span key={chip.label} className={cn('truncate', chip.tone === 'danger' && 'text-danger')}>{chip.label}</span>)}
                      </div>
                    </div>
                    {onToggleDone && <Checkbox checked={item.done ?? false} disabled={item.donePending || item.disabled}
                      aria-label={`Mark ${item.title} ${item.done ? 'not done' : 'done'}`} onChange={(done) => onToggleDone(item, done)} />}
                  </div>
                </Td>
                <Td className={cn(cell, 'min-w-0')} data-testid="work-table-owner-cell">{item.owner ? <ActionRowPerson name={item.owner.name} avatarUrl={item.owner.avatarUrl} size={24} /> : 'Unassigned'}</Td>
                <Td className={cell}><span className="flex h-6 items-center border-l border-border pl-5">{item.points == null ? 'Unsized' : `${item.points} pts`}</span></Td>
                <Td className={cn(cell, 'pl-4 pr-2.5')}>{onOpenItem && <IconButton className="h-6 w-6" disabled={item.disabled} aria-label={`Open ${item.title}`} onClick={() => onOpenItem(item)} icon={<ChevronIcon dir="right" size={16} />} />}</Td>
              </Tr>)}
            </TableBody>;
          })}
        </Table>
      <p className="m-0 pt-2 text-xs text-text-tertiary">{items.length === count ? `${count} work ${count === 1 ? 'item' : 'items'}` : `${items.length} of ${count} work items`}</p>
    </>}
  </section>;
}
