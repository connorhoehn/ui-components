import { useState } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';
import { DropdownMenu } from '../shared/DropdownMenu';
import EmptyState from '../shared/EmptyState';
import ErrorState from '../shared/ErrorState';
import LoadingState from '../shared/LoadingState';
import Chip from '../shared/Chip';
import { StatusDot } from '../shared/StatusDot';
import { Checkbox } from '../forms/Checkbox';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { CheckIcon, ChevronIcon } from '../ui/Icons';
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
  const cell = 'border-b border-border px-2 py-2.5 text-[13px] text-text-secondary';
  const heading = 'border-b border-border px-2 py-2 text-xs font-medium normal-case tracking-normal text-text-secondary';

  return <section className={cn('min-w-0 px-6 pb-6 pt-[18px]', className)} aria-label={title} data-testid={testId}>
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="m-0 text-lg font-semibold text-text-primary">{title} {!loading && !error && <span className="ml-1 font-normal text-text-secondary">{count}</span>}</h2>
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
      <div className="overflow-x-auto">
        <Table className="min-w-[620px] border-collapse text-left" aria-label={`Work items grouped by ${groupBy}`}>
          <TableHead className="border-t border-border bg-transparent"><Tr>
            <Th className={cn(heading, 'w-1/2')}>Work item</Th><Th className={heading}>Owner</Th><Th className={heading}>Type</Th><Th className={heading}>Points</Th><Th className={heading}><span className="sr-only">Open</span></Th>
          </Tr></TableHead>
          {tableGroups.map((group) => {
            const rows = items.filter((item) => groupKey(item) === group.id);
            if (!rows.length) return null;
            const key = `${groupBy}:${group.id}`;
            const closed = collapsed[key] ?? group.defaultOpen === false;
            return <TableBody key={key}>
              <Tr><Th colSpan={5} scope="rowgroup" className="border-b border-border p-0 normal-case tracking-normal">
                <button type="button" aria-expanded={!closed} onClick={() => setCollapsed((prev) => ({ ...prev, [key]: !closed }))}
                  className="flex w-full items-center gap-3 bg-transparent px-1 py-3 text-left text-[13px] font-semibold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <ChevronIcon dir={closed ? 'right' : 'down'} size={14} />
                  {groupBy === 'status' && groupColors?.[group.id] && <StatusDot color={groupColors[group.id]} />}
                  {group.title} <span className="font-normal text-text-tertiary">{rows.length}</span>
                </button>
              </Th></Tr>
              {!closed && rows.map((item) => <Tr key={item.id} className={cn('hover:bg-primary/5', currentId === item.id && 'bg-primary/10')}>
                <Td className={cn(cell, 'pl-8 text-text-primary')}><div className="flex items-center gap-3">
                  {onToggleDone ? <Checkbox checked={item.done ?? false} disabled={item.donePending || item.disabled}
                    aria-label={`Mark ${item.title} ${item.done ? 'not done' : 'done'}`} onChange={(done) => onToggleDone(item, done)} /> :
                    <span className={cn('inline-flex h-4 w-4 shrink-0 items-center justify-center rounded text-[11px] text-white', item.kindLabel === 'Bug' ? 'bg-danger' : 'bg-primary')} aria-hidden="true">{item.kindLabel === 'Bug' ? '!' : <CheckIcon size={12} />}</span>}
                  {onOpenItem ? <button type="button" disabled={item.disabled} className="bg-transparent text-left leading-normal hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
                    onClick={() => onOpenItem(item)}>{item.title}</button> : <span>{item.title}</span>}
                  {item.tag && <Chip tone={item.tag.tone}>{item.tag.label}</Chip>}
                  {item.signal && (item.signal.onClick ? <Button size="sm" variant="link" onClick={item.signal.onClick}>{item.signal.label}</Button> : <span className="text-xs text-text-secondary">{item.signal.label}</span>)}
                  {item.chips?.map((chip) => <Chip key={chip.label} tone={chip.tone}>{chip.label}</Chip>)}
                </div></Td>
                <Td className={cell}>{item.owner ? <span className="inline-flex items-center gap-2"><Avatar name={item.owner.name} src={item.owner.avatarUrl} size={28} />{item.owner.name}</span> : 'Unassigned'}</Td>
                <Td className={cell}>{item.kindLabel ?? defaultKindLabel}</Td><Td className={cell}>{item.points ?? '—'}</Td>
                <Td className={cell}>{onOpenItem && <IconButton disabled={item.disabled} aria-label={`Open ${item.title}`} onClick={() => onOpenItem(item)} icon={<ChevronIcon dir="right" size={14} />} />}</Td>
              </Tr>)}
            </TableBody>;
          })}
        </Table>
      </div>
      <p className="m-0 pt-2 text-xs text-text-tertiary">{items.length === count ? `${count} work ${count === 1 ? 'item' : 'items'}` : `${items.length} of ${count} work items`}</p>
    </>}
  </section>;
}
