// frontend/src/components/observability/EventsPage.tsx
//
// Three-pane /observability/events route (PIPELINES_PLAN.md §18.8):
//   left:   filter rail (240px, collapsible)
//   center: live event list (Phase 1 = plain scroll; Phase 2 virtualized)
//   right:  detail pane (320px) with pretty JSON + copy/download
//
// Phase 1 subscribes to `useEventStream('*', handler)` so any dispatch from
// the mock executor (or sibling tests) appears here. A local cap of 500 keeps
// memory bounded — oldest trimmed first. Live/Paused toggle freezes prepends.
//
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  useEventStream,
} from '../pipelines/context/EventStreamContext';
import type { WildcardEvent } from '../pipelines/context/EventStreamContext';
import EventTimeline, { type EventItem } from './components/EventTimeline';
import EventDetailPane from './components/EventDetailPane';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_EVENTS = Number(import.meta.env.VITE_MAX_EVENTS) || 500;

type EventGroup = 'All' | 'Errors' | 'LLM' | 'Approvals' | 'Lifecycle';
// `'custom'` used to be offered here. There is no UI anywhere on this page to
// enter custom bounds, so picking it could only ever mean "no filter" — one
// more inert option on a control that was already inert. Removed rather than
// faked; re-add it together with the from/to inputs that give it meaning.
type TimeRange = '15m' | '1h' | '6h' | '24h';

const EVENT_GROUPS: EventGroup[] = ['All', 'Errors', 'LLM', 'Approvals', 'Lifecycle'];
const TIME_RANGES: Array<{ value: TimeRange; label: string }> = [
  { value: '15m', label: 'Last 15m' },
  { value: '1h', label: 'Last 1h' },
  { value: '6h', label: 'Last 6h' },
  { value: '24h', label: 'Last 24h' },
];

/** Window width in ms for each selectable range. */
const TIME_RANGE_MS: Record<TimeRange, number> = {
  '15m': 15 * 60_000,
  '1h': 60 * 60_000,
  '6h': 6 * 60 * 60_000,
  '24h': 24 * 60 * 60_000,
};
const DEFAULT_NODE_OPTIONS = ['node-0', 'node-1', 'node-2'];
const SEVERITIES: Array<'info' | 'warning' | 'error' | 'success'> = [
  'info', 'warning', 'error', 'success',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function severityFor(eventType: string): EventItem['severity'] {
  if (eventType.includes('failed') || eventType.includes('error')) return 'error';
  if (eventType.includes('completed')) return 'success';
  if (eventType.includes('warn') || eventType.includes('awaiting')) return 'warning';
  return 'info';
}

function groupFor(eventType: string): EventGroup {
  if (eventType.includes('failed') || eventType.includes('error')) return 'Errors';
  if (eventType.startsWith('llm.') || eventType.includes('.llm.')) return 'LLM';
  if (eventType.includes('approval')) return 'Approvals';
  if (eventType.includes('run.') || eventType.includes('pipeline.')) return 'Lifecycle';
  return 'Lifecycle';
}

function summarize(eventType: string, payload: unknown): string {
  if (payload && typeof payload === 'object') {
    const p = payload as Record<string, unknown>;
    const parts: string[] = [];
    if (typeof p.runId === 'string') parts.push(`run ${p.runId}`);
    if (typeof p.pipelineId === 'string') parts.push(`pipeline ${p.pipelineId}`);
    if (typeof p.nodeId === 'string') parts.push(`node ${p.nodeId}`);
    if (parts.length > 0) return parts.join(' · ');
  }
  return eventType;
}

function formatTimestamp(d: Date = new Date()): string {
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');
  return `${hh}:${mm}:${ss}.${ms}`;
}

// ---------------------------------------------------------------------------
// Inner page (assumes an EventStream context is available)
// ---------------------------------------------------------------------------

interface FilterState {
  groups: Set<EventGroup>;
  runIds: string;
  pipelineIds: string;
  nodes: Set<string>;
  severities: Set<NonNullable<EventItem['severity']>>;
  timeRange: TimeRange;
}

const INITIAL_FILTERS: FilterState = {
  groups: new Set(['All']),
  runIds: '',
  pipelineIds: '',
  nodes: new Set(DEFAULT_NODE_OPTIONS),
  severities: new Set(SEVERITIES),
  timeRange: '1h',
};

function EventsPageInner() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [railCollapsed, setRailCollapsed] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const seq = useRef(0);

  const handleWildcard = useCallback((payload: WildcardEvent | unknown) => {
    if (pausedRef.current) return;
    const env = payload as WildcardEvent;
    const type = env?.eventType ?? 'unknown';
    const inner = env?.payload ?? env;
    seq.current += 1;
    const receivedAt = Date.now();
    const item: EventItem = {
      id: `ev-${receivedAt}-${seq.current}`,
      timestamp: formatTimestamp(new Date(receivedAt)),
      receivedAt,
      type,
      summary: summarize(type, inner),
      severity: severityFor(type),
      payload: inner,
    };
    setEvents((prev) => {
      const next = [...prev, item];
      if (next.length > MAX_EVENTS) {
        return next.slice(next.length - MAX_EVENTS);
      }
      return next;
    });
  }, []);

  useEventStream('*', handleWildcard);

  // -----------------------------------------------------------------------
  // Filtering
  // -----------------------------------------------------------------------

  const visibleEvents = useMemo(() => {
    const runIds = filters.runIds
      .split(',').map((s) => s.trim()).filter(Boolean);
    const pipelineIds = filters.pipelineIds
      .split(',').map((s) => s.trim()).filter(Boolean);
    const allGroups = filters.groups.has('All');
    // The time-range Select used to set state that nothing read: picking
    // "Last 15m" left hour-old rows in the list and never moved the
    // "N / M events" counter. Cutoff is recomputed whenever an event arrives
    // or a filter changes — a page with a completely idle stream can hold a
    // row a little past its window until the next render.
    const cutoff = Date.now() - TIME_RANGE_MS[filters.timeRange];

    return events.filter((ev) => {
      // Time-range filter. Events with no `receivedAt` (host-supplied items
      // predating the field) are kept rather than silently dropped.
      if (typeof ev.receivedAt === 'number' && ev.receivedAt < cutoff) return false;
      // Group filter
      if (!allGroups) {
        const g = groupFor(ev.type);
        if (!filters.groups.has(g)) return false;
      }
      // Severity filter
      if (ev.severity && !filters.severities.has(ev.severity)) return false;
      // Run id filter
      if (runIds.length > 0) {
        const payloadRun = (ev.payload as { runId?: string } | null)?.runId;
        if (!payloadRun || !runIds.some((r) => payloadRun.includes(r))) return false;
      }
      // Pipeline id filter
      if (pipelineIds.length > 0) {
        const p = (ev.payload as { pipelineId?: string } | null)?.pipelineId;
        if (!p || !pipelineIds.some((x) => p.includes(x))) return false;
      }
      // Node filter
      const nodeId = (ev.payload as { nodeId?: string } | null)?.nodeId;
      if (nodeId && !filters.nodes.has(nodeId)) return false;

      return true;
    });
  }, [events, filters]);

  const selectedEvent = useMemo(
    () => visibleEvents.find((e) => e.id === selectedId) ?? null,
    [visibleEvents, selectedId],
  );

  // -----------------------------------------------------------------------
  // Filter toggles
  // -----------------------------------------------------------------------

  const toggleGroup = (g: EventGroup) => {
    setFilters((f) => {
      const next = new Set(f.groups);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return { ...f, groups: next };
    });
  };
  const toggleNode = (id: string) => {
    setFilters((f) => {
      const next = new Set(f.nodes);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...f, nodes: next };
    });
  };
  const toggleSeverity = (s: NonNullable<EventItem['severity']>) => {
    setFilters((f) => {
      const next = new Set(f.severities);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return { ...f, severities: next };
    });
  };
  const clearFilters = () => setFilters(INITIAL_FILTERS);

  return (
    <div
      data-testid="events-page"
      className="flex flex-col h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface"
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel">
        <button
          onClick={() => setPaused((p) => !p)}
          data-testid="events-live-toggle"
          className={cn(
            'px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer font-[inherit]',
            paused
              ? 'bg-surface-hover text-text-secondary border border-border'
              : 'bg-state-completed text-white border border-state-completed'
          )}
        >
          {paused ? '■ Paused' : '● Live'}
        </button>

        <Select
          data-testid="events-time-range"
          aria-label="Time range"
          value={filters.timeRange}
          onChange={(e) =>
            setFilters((f) => ({ ...f, timeRange: e.target.value as TimeRange }))
          }
          className="w-auto min-w-[120px]"
          options={TIME_RANGES.map((t) => ({ value: t.value, label: t.label }))}
        />

        <div className="ml-auto text-xs text-text-tertiary">
          {visibleEvents.length} / {events.length} event{events.length === 1 ? '' : 's'}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Filter rail */}
        <aside
          data-testid="events-filter-rail"
          className={cn(
            'shrink-0 border-r border-border bg-surface-panel overflow-y-auto transition-[width] duration-150 ease-in-out',
            railCollapsed ? 'w-9' : 'w-60'
          )}
        >
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border">
            {!railCollapsed && (
              <div className="text-[11px] font-bold tracking-[0.3px] text-text-secondary">
                FILTERS
              </div>
            )}
            <button
              onClick={() => setRailCollapsed((c) => !c)}
              aria-label={railCollapsed ? 'Expand filters' : 'Collapse filters'}
              className="border-none bg-transparent text-text-tertiary cursor-pointer text-xs p-0.5 font-[inherit]"
            >
              {railCollapsed ? '›' : '‹'}
            </button>
          </div>

          {!railCollapsed && (
            <>
              <div className="flex flex-col gap-1.5 px-3.5 py-3 border-b border-border">
                <div className="text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase">
                  Event type
                </div>
                {EVENT_GROUPS.map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <Checkbox
                      checked={filters.groups.has(g)}
                      onChange={() => toggleGroup(g)}
                    />
                    {g}
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-1.5 px-3.5 py-3 border-b border-border">
                <div className="text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase">
                  Runs
                </div>
                <Input
                  data-testid="events-filter-runs"
                  placeholder="runId (comma-separated)"
                  value={filters.runIds}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, runIds: e.target.value }))
                  }
                  className="flex-1 min-w-[120px]"
                />
              </div>

              <div className="flex flex-col gap-1.5 px-3.5 py-3 border-b border-border">
                <div className="text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase">
                  Pipelines
                </div>
                <Input
                  data-testid="events-filter-pipelines"
                  placeholder="pipelineId (comma-separated)"
                  value={filters.pipelineIds}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, pipelineIds: e.target.value }))
                  }
                  className="flex-1 min-w-[120px]"
                />
              </div>

              <div className="flex flex-col gap-1.5 px-3.5 py-3 border-b border-border">
                <div className="text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase">
                  Nodes
                </div>
                {DEFAULT_NODE_OPTIONS.map((id) => (
                  <label
                    key={id}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <Checkbox
                      checked={filters.nodes.has(id)}
                      onChange={() => toggleNode(id)}
                    />
                    {id}
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-1.5 px-3.5 py-3 border-b border-border">
                <div className="text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase">
                  Severity
                </div>
                {SEVERITIES.map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <Checkbox
                      checked={filters.severities.has(s)}
                      onChange={() => toggleSeverity(s)}
                    />
                    {s}
                  </label>
                ))}
              </div>

              <div className="px-3.5 py-3">
                <button
                  data-testid="events-clear-filters"
                  onClick={clearFilters}
                  className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0"
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </aside>

        {/* Center list */}
        <section className="flex-1 min-w-0 flex flex-col">
          <EventTimeline
            events={visibleEvents}
            selectedId={selectedId}
            onSelect={setSelectedId}
            live={!paused}
          />
        </section>

        {/* Detail pane */}
        <aside className="w-80 shrink-0 border-l border-border bg-surface">
          <EventDetailPane event={selectedEvent} />
        </aside>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exported page — uses EventStreamProvider from AppLayout (guaranteed).
// ---------------------------------------------------------------------------

export default function EventsPage() {
  return <EventsPageInner />;
}
