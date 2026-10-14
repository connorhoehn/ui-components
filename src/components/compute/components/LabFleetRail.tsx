// The workspace lab's rail: the fleet as two tabs, a search, and numbered rows.
//
// The classic `LabRail` stacks "what exists" over "what is happening" and
// splits a narrow column between them. At eighteen computers neither half
// has room, so this rail gives each question the whole height and lets you
// switch: Computers (the directory, grouped by what each box is charged to)
// and Agents (only the boxes with an agent in play, most-wanting first).
//
// Rows carry a stable number — the computer's position in the Computers tab —
// and keep it in the Agents tab, so "fourteen" names the same box in both
// lists and in conversation.
//
// Keyboard: each list is a roving-tabindex listbox labelled `computers` or
// `agents`, the labels the lab's focus-rail command looks for.

import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { StatusDot } from '../../shared/StatusDot';
import { SearchInput } from '../../shared/SearchInput';
import { DropdownMenu } from '../../shared/DropdownMenu';
import { ChevronIcon, FilterIcon, LaptopIcon, DesktopIcon, PeopleIcon, PopOutIcon } from '../../ui/Icons';
import { COMPUTE_STATUS, statusOf } from '../lib/status';
import { byAttention, hasAgent, isLocalComputer, matchesQuery } from '../lib/fleetSummary';
import { useComputeOptional } from '../context/ComputeContext';
import { UNASSIGNED_PROJECT_ID, type ProjectRollup } from '../hooks/useComputeProjects';
import type { Computer, ComputeStatus } from '../types';

/** Status ink as a class, for glyphs and words that take the dot's colour. */
const STATUS_TEXT: Record<ComputeStatus, string> = {
  provisioning: 'text-info',
  waiting: 'text-warning',
  running: 'text-primary',
  error: 'text-danger',
  idle: 'text-success',
  stopped: 'text-text-tertiary',
};

export type LabFleetTab = 'computers' | 'agents';

export interface LabFleetRailProps {
  computers: Computer[];
  /** Computer bound to the focused pane. */
  activeComputerId: string | null;
  /** Computers on screen in some pane. */
  openComputerIds: readonly string[];
  /** Computers picked as instruction targets (⌘/Ctrl-click a row). */
  selectedIds?: ReadonlySet<string>;
  /** Plain click retargets the focused pane; `toggle` is a ⌘/Ctrl-click. */
  onSelect: (computer: Computer, options: { toggle: boolean }) => void;
  /** Open in a new pane (the row's detail action, middle-click, ⌘⏎). */
  onOpenInPane?: (computer: Computer) => void;
  /** Show only computers in this status — the top bar's pills set it. */
  statusFilter?: ComputeStatus | null;
  onStatusFilterChange?: (status: ComputeStatus | null) => void;
  tab?: LabFleetTab;
  onTabChange?: (tab: LabFleetTab) => void;
  /** Start a computer. Offered in the empty-fleet state when present. */
  onCreate?: () => void;
  className?: string;
}

/** `$95`, `$0.46` — whole budgets read whole, spend keeps its cents. */
function usd(value: number, cents: boolean): string {
  return cents || !Number.isInteger(value) ? `$${value.toFixed(2)}` : `$${value.toFixed(0)}`;
}

/**
 * "6 computers · $0.46 / $95 · 5 bots" — every clause only when known. A
 * project with no allocation shows its spend alone, and a bucket with no bots
 * says nothing about bots rather than "0 bots".
 */
export function groupQuickLine(project: Pick<ProjectRollup, 'budgetUsd' | 'spentUsd' | 'liveSpendUsd' | 'botCount'>, count: number): string {
  const parts = [`${count} ${count === 1 ? 'computer' : 'computers'}`];
  const spent = project.spentUsd ?? project.liveSpendUsd;
  if (typeof project.budgetUsd === 'number' && project.budgetUsd > 0) {
    parts.push(`${usd(spent, true)} / ${usd(project.budgetUsd, false)}`);
  } else if (spent > 0) {
    parts.push(usd(spent, true));
  }
  if (project.botCount) parts.push(`${project.botCount} ${project.botCount === 1 ? 'bot' : 'bots'}`);
  return parts.join(' · ');
}

interface Group {
  id: string;
  name: string;
  quickLine: string;
  computers: Computer[];
}

export function LabFleetRail({
  computers,
  activeComputerId,
  openComputerIds,
  selectedIds,
  onSelect,
  onOpenInPane,
  statusFilter = null,
  onStatusFilterChange,
  tab: controlledTab,
  onTabChange,
  onCreate,
  className,
}: LabFleetRailProps) {
  const [ownTab, setOwnTab] = useState<LabFleetTab>('computers');
  const tab = controlledTab ?? ownTab;
  const setTab = (next: LabFleetTab) => {
    setOwnTab(next);
    onTabChange?.(next);
  };
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(new Set());
  const open = useMemo(() => new Set(openComputerIds), [openComputerIds]);

  const ctx = useComputeOptional();
  const rollups = ctx?.projects ?? [];
  const projectsAbsent = ctx?.projectsAbsent ?? true;

  // Groups in the order the classic rail uses: named projects that have a
  // computer, then the unassigned bucket last. A fleet with no projects is
  // one unheaded group.
  const allGroups = useMemo<Group[]>(() => {
    const named = rollups.filter((p) => p.id !== UNASSIGNED_PROJECT_ID && p.computers.length > 0);
    if (projectsAbsent || named.length === 0) {
      return [{ id: '__all', name: '', quickLine: '', computers }];
    }
    const groups: Group[] = named.map((p) => ({
      id: p.id, name: p.name, quickLine: groupQuickLine(p, p.computers.length), computers: p.computers,
    }));
    const grouped = new Set(groups.flatMap((g) => g.computers.map((c) => c.id)));
    // Anything the roll-up did not place — including a laptop, which is never
    // charged to a project — lands in Unassigned rather than vanishing.
    const rest = computers.filter((c) => !grouped.has(c.id));
    if (rest.length > 0) {
      const unassigned = rollups.find((p) => p.id === UNASSIGNED_PROJECT_ID);
      groups.push({
        id: UNASSIGNED_PROJECT_ID,
        name: 'Unassigned',
        quickLine: groupQuickLine(
          { budgetUsd: undefined, spentUsd: undefined, liveSpendUsd: 0, botCount: unassigned?.botCount },
          rest.length,
        ),
        computers: rest,
      });
    }
    return groups;
  }, [rollups, projectsAbsent, computers]);

  // The number is the position in the unfiltered directory, so it does not
  // change under a search or between tabs.
  const numberOf = useMemo(() => {
    const map = new Map<string, number>();
    let n = 0;
    for (const group of allGroups) for (const c of group.computers) map.set(c.id, (n += 1));
    return map;
  }, [allGroups]);

  const visible = useCallback(
    (c: Computer) => matchesQuery(c, query) && (!statusFilter || statusOf(c) === statusFilter),
    [query, statusFilter],
  );

  const agents = useMemo(() => computers.filter(hasAgent).sort(byAttention), [computers]);

  const filterSections = [{
    label: 'Show',
    items: [
      { label: 'Every status', checked: !statusFilter, onSelect: () => onStatusFilterChange?.(null) },
      ...(['waiting', 'running', 'provisioning', 'error', 'idle', 'stopped'] as const).map((status) => ({
        label: COMPUTE_STATUS[status].label,
        checked: statusFilter === status,
        onSelect: () => onStatusFilterChange?.(statusFilter === status ? null : status),
      })),
    ],
  }];

  // An empty fleet is not a filter miss: say there is nothing here and how to
  // get a computer, the way the classic lab does. "Nothing matches." is only
  // for a search or status filter hiding computers that exist.
  const noComputers = computers.length === 0;
  const emptyFleet = (
    <div data-testid="lab-fleet-empty" className="px-3 py-4 flex flex-col items-start gap-2">
      <div className="text-[13px] font-semibold text-text-primary">No computers in the lab</div>
      <div className="text-[12px] text-text-secondary">
        {onCreate
          ? 'Start a computer and it opens here in a pane.'
          : 'Nothing in the fleet is shared with you yet.'}
      </div>
      {onCreate && (
        <button
          type="button"
          onClick={onCreate}
          data-testid="lab-fleet-empty-create"
          className="text-[12px] font-semibold rounded-md px-3 py-1 cursor-pointer border border-primary text-primary bg-transparent hover:bg-surface-hover"
        >
          + New computer
        </button>
      )}
    </div>
  );

  return (
    <div
      data-testid="lab-fleet-rail"
      className={cn('flex flex-col h-full min-h-0 border-r border-border bg-surface', className)}
    >
      <div role="tablist" aria-label="Fleet" className="flex shrink-0 border-b border-border">
        <RailTab
          selected={tab === 'computers'}
          onSelect={() => setTab('computers')}
          icon={<DesktopIcon size={14} />}
          label="Computers"
          count={computers.length}
        />
        <RailTab
          selected={tab === 'agents'}
          onSelect={() => setTab('agents')}
          icon={<PeopleIcon size={14} />}
          label="Agents"
          count={agents.length}
        />
      </div>

      <div className="flex items-center gap-1.5 px-2 py-2 shrink-0">
        <SearchInput
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
          placeholder="Find computer or agent…"
          className="flex-1 min-w-0"
        />
        {onStatusFilterChange && (
          <DropdownMenu
            trigger={<FilterIcon size={14} />}
            triggerLabel="Filter by status"
            triggerTitle={statusFilter ? `Showing ${COMPUTE_STATUS[statusFilter].label}` : 'Filter by status'}
            triggerClassName={cn(statusFilter && 'text-primary border-primary')}
            align="end"
            sections={filterSections}
            data-testid="lab-fleet-filter"
          />
        )}
      </div>

      {tab === 'computers' ? (
        <RovingList label="computers" emptyState={noComputers ? emptyFleet : undefined}>
          {allGroups.map((group) => {
            const rows = group.computers.filter(visible);
            if (rows.length === 0) return null;
            const isCollapsed = collapsed.has(group.id) && !query;
            return (
              <div key={group.id} role="presentation">
                {group.name && (
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-expanded={!isCollapsed}
                    onClick={() => setCollapsed((prev) => {
                      const next = new Set(prev);
                      if (next.has(group.id)) next.delete(group.id); else next.add(group.id);
                      return next;
                    })}
                    data-testid="lab-fleet-group"
                    className="w-full flex items-start gap-1.5 px-2 pt-2.5 pb-1 text-left bg-transparent border-none cursor-pointer hover:bg-surface-hover"
                  >
                    <ChevronIcon
                      size={12}
                      className={cn('mt-0.5 shrink-0 text-text-tertiary transition-transform', isCollapsed && '-rotate-90')}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-text-primary truncate">{group.name}</span>
                      <span className="block text-xs text-text-tertiary truncate tabular-nums">{group.quickLine}</span>
                    </span>
                  </button>
                )}
                {!isCollapsed && rows.map((computer) => (
                  <FleetRow
                    key={computer.id}
                    computer={computer}
                    number={numberOf.get(computer.id) ?? 0}
                    active={computer.id === activeComputerId}
                    selected={selectedIds?.has(computer.id) ?? false}
                    open={open.has(computer.id)}
                    onSelect={onSelect}
                    onOpenInPane={onOpenInPane}
                  />
                ))}
              </div>
            );
          })}
        </RovingList>
      ) : (
        <RovingList label="agents">
          {agents.filter(visible).map((computer) => (
            <FleetRow
              key={computer.id}
              computer={computer}
              number={numberOf.get(computer.id) ?? 0}
              active={computer.id === activeComputerId}
              selected={selectedIds?.has(computer.id) ?? false}
              open={open.has(computer.id)}
              onSelect={onSelect}
              onOpenInPane={onOpenInPane}
              showTask
            />
          ))}
        </RovingList>
      )}
    </div>
  );
}

function RailTab({ selected, onSelect, icon, label, count }: {
  selected: boolean; onSelect: () => void; icon: ReactNode; label: string; count: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={cn(
        'flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 text-[12px] bg-transparent border-0 border-b-2 cursor-pointer transition-colors',
        selected
          ? 'border-primary text-text-primary font-semibold'
          : 'border-transparent text-text-secondary hover:text-text-primary',
      )}
    >
      {icon}
      {label}
      <span className="text-xs font-normal text-text-tertiary tabular-nums">{count}</span>
    </button>
  );
}

function RovingList({ label, children, emptyState }: { label: string; children: ReactNode; emptyState?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const rows = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[data-rail-row]') ?? []);
    if (rows.length === 0) return;
    event.preventDefault();
    const index = rows.findIndex((r) => r === document.activeElement);
    const next =
      event.key === 'Home' ? 0
      : event.key === 'End' ? rows.length - 1
      : index < 0 ? 0
      : (index + (event.key === 'ArrowDown' ? 1 : -1) + rows.length) % rows.length;
    rows[next]?.focus();
  }, []);
  const empty = Array.isArray(children) ? children.every((c) => !c) : !children;
  return (
    <div
      ref={ref}
      role="listbox" data-ui-listbox="lab-fleet"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="flex-1 min-h-0 overflow-y-auto pb-2"
    >
      {empty
        ? (emptyState ?? <div className="px-3 py-2 text-[12px] text-text-tertiary">Nothing matches.</div>)
        : children}
    </div>
  );
}

function FleetRow({
  computer, number, active, selected, open, onSelect, onOpenInPane, showTask = false,
}: {
  computer: Computer;
  number: number;
  active: boolean;
  selected: boolean;
  open: boolean;
  onSelect: LabFleetRailProps['onSelect'];
  onOpenInPane?: LabFleetRailProps['onOpenInPane'];
  showTask?: boolean;
}) {
  const status = statusOf(computer);
  const meta = COMPUTE_STATUS[status];
  const local = isLocalComputer(computer);
  return (
    <div
      role="presentation"
      className={cn(
        'group relative flex items-stretch',
        active ? 'bg-primary-bg' : selected ? 'bg-surface-hover' : 'hover:bg-surface-hover',
      )}
    >
      <button
        data-rail-row
        type="button"
        role="option"
        aria-selected={active}
        tabIndex={active ? 0 : -1}
        data-selected={selected || undefined}
        title={`${computer.label} — ${meta.label}${computer.currentTask ? ` · ${computer.currentTask}` : ''}`}
        onClick={(e) => onSelect(computer, { toggle: e.metaKey || e.ctrlKey })}
        onAuxClick={(e) => {
          if (e.button === 1 && onOpenInPane) { e.preventDefault(); onOpenInPane(computer); }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && onOpenInPane) {
            e.preventDefault();
            onOpenInPane(computer);
          }
        }}
        className={cn(
          'min-w-0 flex-1 text-left flex items-start gap-2 pl-2 pr-1 py-1.5 border-l-2 cursor-pointer bg-transparent border-y-0 border-r-0',
          'focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset',
          active ? 'border-primary' : selected ? 'border-border-emphasis' : 'border-transparent',
        )}
      >
        <span className="w-5 shrink-0 text-right text-xs text-text-tertiary tabular-nums leading-5">{number}</span>
        <span className="w-3.5 shrink-0 flex justify-center leading-5 pt-[5px]">
          {local ? (
            <LaptopIcon size={14} aria-label={`laptop · ${meta.label}`} className={cn('-mt-[2px]', STATUS_TEXT[status])} />
          ) : (
            <StatusDot size="xs" color={meta.color} pulse={meta.pulse} aria-label={meta.label} />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              // The rail scale (2.441.3): 14px title, 12px meta. The label stays
              // mono (a computer name is an identifier).
              'block text-sm leading-5 truncate font-mono',
              active ? 'text-text-primary font-semibold' : 'text-text-secondary',
            )}
          >
            {computer.label}
          </span>
          {showTask && (
            <span className="block text-xs text-text-tertiary truncate">
              <span className={cn('font-semibold', STATUS_TEXT[status])}>{meta.label}</span>
              {computer.currentTask ? ` · ${computer.currentTask}` : ''}
            </span>
          )}
        </span>
        {selected && <span aria-label="selected as a target" className="text-xs text-primary leading-5">✓</span>}
        {open && <span aria-label="open in a pane" title="Open in a pane" className="text-xs text-primary leading-5">▣</span>}
      </button>
      {onOpenInPane && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => onOpenInPane(computer)}
          aria-label={`Open ${computer.label} in a new pane`}
          title="Open in a new pane"
          className={cn(
            'px-2 shrink-0 bg-transparent border-none cursor-pointer text-text-tertiary hover:text-primary',
            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
          )}
        >
          <PopOutIcon size={13} />
        </button>
      )}
    </div>
  );
}
