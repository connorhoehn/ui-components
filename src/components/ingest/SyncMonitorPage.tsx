// frontend/src/components/ingest/SyncMonitorPage.tsx
//
// Real-time sync monitor page for the ingest subsystem. Shows active syncs
// with progress bars, a scrollable event log, and quick stats.

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useIngestProgress } from '../../hooks/useIngestProgress';
import type { ActiveSync, IngestProgressEvent } from '../../hooks/useIngestProgress';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatDuration(startedAt: string): string {
  const ms = Date.now() - new Date(startedAt).getTime();
  const sec = Math.floor(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  const remSec = sec % 60;
  return `${min}m ${remSec}s`;
}

function eventBadgeClasses(type: string): string {
  if (type.startsWith('sync.')) {
    return 'bg-[#dbeafe] text-[#1d4ed8]';
  }
  if (type === 'item.mapped') {
    return 'bg-[#ede9fe] text-[#7c3aed]';
  }
  if (type === 'item.materialized') {
    return 'bg-[#dcfce7] text-success-fg';
  }
  if (type === 'item.failed') {
    return 'bg-danger-bg text-danger-fg';
  }
  return 'bg-surface-hover text-neutral';
}

function eventDescription(event: IngestProgressEvent): string {
  const source = (event.sourceName as string) ?? (event.sourceId as string) ?? '';
  switch (event.type) {
    case 'sync.started':
      return `Sync started for ${source}`;
    case 'sync.progress':
      return `${source}: fetched ${event.filesFetched ?? 0}/${event.fileCount ?? '?'} files`;
    case 'sync.completed':
      return `Sync completed for ${source}`;
    case 'sync.failed':
      return `Sync failed for ${source}${event.error ? `: ${event.error}` : ''}`;
    case 'item.mapped':
      return `Item mapped: ${(event.sourcePath as string) ?? (event.itemId as string) ?? 'unknown'}`;
    case 'item.materialized':
      return `Item materialized: ${(event.sourcePath as string) ?? (event.itemId as string) ?? 'unknown'}`;
    case 'item.failed':
      return `Item failed: ${(event.sourcePath as string) ?? (event.itemId as string) ?? 'unknown'}`;
    default:
      return event.type;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Coarse event-type buckets the filter UI exposes.
 */
const EVENT_TYPE_BUCKETS = [
  { value: 'all',     label: 'All',     match: (_t: string) => true },
  { value: 'sync',    label: 'Sync',    match: (t: string) => t.startsWith('sync.') },
  { value: 'item',    label: 'Item',    match: (t: string) => t.startsWith('item.') },
  { value: 'source',  label: 'Source',  match: (t: string) => t.startsWith('source.') },
  { value: 'errors',  label: 'Errors',  match: (t: string) => t === 'item.failed' || t === 'sync.failed' },
] as const;

type EventTypeBucket = (typeof EVENT_TYPE_BUCKETS)[number]['value'];

export default function SyncMonitorPage() {
  const navigate = useNavigate();
  const { events, activeSyncs, clearEvents } = useIngestProgress();
  const logRef = useRef<HTMLDivElement>(null);

  const [paused, setPaused] = useState(false);
  const [sourceFilter, setSourceFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<EventTypeBucket>('all');
  const pausedSnapshotRef = useRef<IngestProgressEvent[] | null>(null);

  useEffect(() => {
    if (paused && pausedSnapshotRef.current === null) {
      pausedSnapshotRef.current = [...events];
    } else if (!paused) {
      pausedSnapshotRef.current = null;
    }
  }, [paused, events]);

  const sourceOptions = useMemo(() => {
    const ids = new Set<string>();
    for (const e of events) {
      const sid = (e as IngestProgressEvent & { sourceId?: string }).sourceId;
      if (typeof sid === 'string' && sid) ids.add(sid);
    }
    for (const sid of activeSyncs.keys()) ids.add(sid);
    return Array.from(ids).sort();
  }, [events, activeSyncs]);

  const filteredEvents = useMemo(() => {
    const base = paused && pausedSnapshotRef.current ? pausedSnapshotRef.current : events;
    const bucket = EVENT_TYPE_BUCKETS.find((b) => b.value === typeFilter) ?? EVENT_TYPE_BUCKETS[0];
    return base.filter((ev) => {
      if (!bucket.match(ev.type)) return false;
      if (sourceFilter) {
        const sid = (ev as IngestProgressEvent & { sourceId?: string }).sourceId;
        if (sid !== sourceFilter) return false;
      }
      return true;
    });
  }, [events, paused, typeFilter, sourceFilter]);

  // Auto-scroll event log to bottom when new events arrive (live mode only).
  useEffect(() => {
    if (paused) return;
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [filteredEvents.length, paused]);

  const stats = useMemo(() => {
    const errorCount = events.filter((e) => e.type === 'item.failed' || e.type === 'sync.failed').length;
    return {
      totalEvents: events.length,
      activeSyncsCount: activeSyncs.size,
      errorsCount: errorCount,
    };
  }, [events, activeSyncs]);

  const activeSyncList: ActiveSync[] = useMemo(
    () => Array.from(activeSyncs.values()),
    [activeSyncs],
  );

  return (
    <div data-testid="sync-monitor-page" className="p-6 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="m-0 text-[22px] font-bold text-text-primary">Sync Monitor</h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold bg-[#ecfdf5] text-success-fg rounded-full border border-success-border">
            <span className="w-[7px] h-[7px] rounded-full bg-success animate-[sync-pulse_1.5s_ease-in-out_infinite]" />
            Live
          </span>
        </div>
        <button
          className="px-3.5 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary"
          onClick={() => navigate('/ingest/sources')}
        >
          Sources
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mb-5">
        <div className="p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1">
          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-tight">Events Received</span>
          <span className="text-[22px] font-bold text-text-primary leading-none">{stats.totalEvents}</span>
        </div>
        <div className="p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1">
          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-tight">Active Syncs</span>
          <span className={cn('text-[22px] font-bold leading-none', stats.activeSyncsCount > 0 ? 'text-[var(--color-state-running)]' : 'text-text-primary')}>
            {stats.activeSyncsCount}
          </span>
        </div>
        <div className="p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1">
          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-tight">Errors</span>
          <span className={cn('text-[22px] font-bold leading-none', stats.errorsCount > 0 ? 'text-[var(--color-state-failed)]' : 'text-text-primary')}>
            {stats.errorsCount}
          </span>
        </div>
      </div>

      {/* Active Syncs */}
      <div className="bg-surface border border-border rounded-[10px] p-4 mb-4">
        <div className="text-sm font-semibold text-text-primary mb-3">Active Syncs</div>
        {activeSyncList.length === 0 ? (
          <div className="py-8 text-center">
            <div className="text-sm font-medium text-text-secondary mb-1">No active syncs</div>
            <div className="text-xs text-text-tertiary">Trigger a sync from the Sources page to see progress here.</div>
          </div>
        ) : (
          activeSyncList.map((sync) => {
            const pct = sync.fileCount > 0
              ? Math.round((sync.filesFetched / sync.fileCount) * 100)
              : 0;
            return (
              <div key={sync.sourceId} className="p-3.5 bg-surface-inset border border-border rounded-lg mb-2.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-text-primary">{sync.sourceName}</span>
                  <span className="text-[11px] text-text-tertiary font-mono">{formatDuration(sync.startedAt)}</span>
                </div>
                <div className="h-2 rounded bg-surface-emphasis overflow-hidden mb-2">
                  <div
                    className="h-full rounded bg-[var(--color-state-running)] transition-[width] duration-300 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex gap-4 text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    Files: {sync.filesFetched}/{sync.fileCount} ({pct}%)
                  </span>
                  <span className="flex items-center gap-1">
                    Mapped: {sync.itemsMapped}
                  </span>
                  <span className="flex items-center gap-1">
                    Materialized: {sync.itemsMaterialized}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Event Log */}
      <div className="bg-surface border border-border rounded-[10px] p-4 mb-4">
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <span className="text-sm font-semibold text-text-primary">Event Log</span>
          <div className="flex items-center gap-2 flex-wrap">
            <Select
              data-testid="event-source-filter"
              aria-label="Filter by source"
              className="w-auto min-w-[140px]"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              options={[
                { value: '', label: 'All sources' },
                ...sourceOptions.map((sid) => ({ value: sid, label: sid.slice(0, 12) })),
              ]}
            />
            <Select
              data-testid="event-type-filter"
              aria-label="Filter by event type"
              className="w-auto min-w-[110px]"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as EventTypeBucket)}
              options={EVENT_TYPE_BUCKETS.map((b) => ({ value: b.value, label: b.label }))}
            />
            <button
              data-testid="event-pause-toggle"
              className="px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary"
              onClick={() => setPaused((p) => !p)}
              title={paused ? 'Resume the live stream' : 'Pause the stream so the log doesn\'t scroll'}
            >
              {paused ? 'Resume' : 'Pause'}
            </button>
            {events.length > 0 && (
              <button
                className="px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary"
                onClick={clearEvents}
              >
                Clear
              </button>
            )}
          </div>
        </div>
        {filteredEvents.length === 0 ? (
          <div className="py-8 text-center">
            <div className="text-sm font-medium text-text-secondary mb-1">
              {events.length === 0 ? 'No events yet' : 'No events match the current filter'}
            </div>
            <div className="text-xs text-text-tertiary">
              {events.length === 0
                ? 'Events will appear here in real-time as syncs run.'
                : 'Try a different source or event-type filter, or clear the filter.'}
            </div>
          </div>
        ) : (
          <div ref={logRef} data-testid="event-log" className="max-h-80 overflow-y-auto flex flex-col gap-0.5">
            {filteredEvents.map((event, idx) => (
              <div key={`${event.timestamp}-${idx}`} className="flex items-center gap-2 px-2 py-1 rounded text-xs">
                <span className="text-[11px] font-mono text-text-tertiary shrink-0 min-w-[60px]">{formatTime(event.timestamp)}</span>
                <span className={cn('px-[7px] py-0.5 text-[10px] font-semibold rounded shrink-0', eventBadgeClasses(event.type))}>{event.type}</span>
                <span className="text-xs text-text-secondary flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap" title={eventDescription(event)}>
                  {eventDescription(event)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
