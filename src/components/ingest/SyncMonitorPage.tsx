// frontend/src/components/ingest/SyncMonitorPage.tsx
//
// Real-time sync monitor page for the ingest subsystem. Shows active syncs
// with progress bars, a scrollable event log, and quick stats.

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useIngestProgress } from '../../hooks/useIngestProgress';
import type { ActiveSync, IngestProgressEvent } from '../../hooks/useIngestProgress';
import { colors, fieldStyle, pageContainerStyle } from '../../constants/styles';

// ---------------------------------------------------------------------------
// Static styles
// ---------------------------------------------------------------------------

const styles: Record<string, CSSProperties> = {
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
  },
  titleRow: {
    display: 'flex', alignItems: 'center', gap: 10,
  },
  title: {
    margin: 0, fontSize: 22, fontWeight: 700, color: colors.textPrimary,
  },
  liveBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '3px 10px', fontSize: 11, fontWeight: 600,
    background: '#ecfdf5', color: '#16a34a', borderRadius: 12,
    border: '1px solid #bbf7d0',
  },
  liveDot: {
    width: 7, height: 7, borderRadius: '50%', background: '#16a34a',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  statsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20,
  },
  statCard: {
    padding: 14, background: colors.surface, border: `1px solid ${colors.border}`,
    borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 4,
  },
  statLabel: {
    fontSize: 11, fontWeight: 500, color: colors.textTertiary, textTransform: 'uppercase' as const,
    letterSpacing: '0.03em',
  },
  statValue: {
    fontSize: 22, fontWeight: 700, color: colors.textPrimary, lineHeight: 1,
  },
  section: {
    background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10,
    padding: 16, marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14, fontWeight: 600, color: colors.textPrimary, marginBottom: 12,
  },
  syncCard: {
    padding: 14, background: colors.surfaceInset, border: `1px solid ${colors.border}`,
    borderRadius: 8, marginBottom: 10,
  },
  syncHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
  },
  syncName: {
    fontSize: 14, fontWeight: 600, color: colors.textPrimary,
  },
  syncDuration: {
    fontSize: 11, color: colors.textTertiary, fontFamily: 'monospace',
  },
  progressBarOuter: {
    height: 8, borderRadius: 4, background: '#e2e8f0', overflow: 'hidden', marginBottom: 8,
  },
  progressBarInner: {
    height: '100%', borderRadius: 4, background: colors.state.running,
    transition: 'width 0.3s ease',
  },
  syncStats: {
    display: 'flex', gap: 16, fontSize: 12, color: colors.textSecondary,
  },
  syncStatItem: {
    display: 'flex', alignItems: 'center', gap: 4,
  },
  emptyState: {
    padding: '32px 0', textAlign: 'center' as const,
  },
  emptyTitle: {
    fontSize: 14, fontWeight: 500, color: colors.textSecondary, marginBottom: 4,
  },
  emptyBody: {
    fontSize: 12, color: colors.textTertiary,
  },
  eventLog: {
    maxHeight: 320, overflowY: 'auto' as const, display: 'flex', flexDirection: 'column', gap: 2,
  },
  eventRow: {
    display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px',
    borderRadius: 4, fontSize: 12,
  },
  eventTime: {
    fontSize: 11, fontFamily: 'monospace', color: colors.textTertiary,
    flexShrink: 0, minWidth: 60,
  },
  eventBadge: {
    padding: '2px 7px', fontSize: 10, fontWeight: 600, borderRadius: 4,
    flexShrink: 0,
  },
  eventDescription: {
    fontSize: 12, color: colors.textSecondary, flex: 1, minWidth: 0,
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  linkBtn: {
    padding: '6px 14px', fontSize: 13, fontWeight: 500, background: 'none',
    border: `1px solid ${colors.border}`, borderRadius: 6, cursor: 'pointer',
    fontFamily: 'inherit', color: colors.textSecondary,
  },
};

// Inject keyframe animation for the pulsing dot
const pulseKeyframes = `
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
`;

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

function eventBadgeStyle(type: string): CSSProperties {
  if (type.startsWith('sync.')) {
    return { ...styles.eventBadge, background: '#dbeafe', color: '#1d4ed8' };
  }
  if (type === 'item.mapped') {
    return { ...styles.eventBadge, background: '#ede9fe', color: '#7c3aed' };
  }
  if (type === 'item.materialized') {
    return { ...styles.eventBadge, background: '#dcfce7', color: '#16a34a' };
  }
  if (type === 'item.failed') {
    return { ...styles.eventBadge, background: '#fef2f2', color: '#dc2626' };
  }
  return { ...styles.eventBadge, background: '#f1f5f9', color: '#64748b' };
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
 * Coarse event-type buckets the filter UI exposes. Each bucket maps to
 * a list of `IngestEvent.type` strings; "all" matches everything.
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

  // Filter + pause state. The pause snapshot freezes the live event stream
  // so the operator can inspect history without it scrolling out from under
  // them. New events arriving while paused are still tracked in `events`
  // and re-appear when resumed.
  const [paused, setPaused] = useState(false);
  const [sourceFilter, setSourceFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<EventTypeBucket>('all');
  const pausedSnapshotRef = useRef<IngestProgressEvent[] | null>(null);

  // When pausing, capture the current event list once and freeze it. When
  // resuming, drop the snapshot so the live stream takes over again.
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

  // Quick stats — always against the full live stream so the badges
  // reflect reality, not the filter view.
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
    <div data-testid="sync-monitor-page" style={pageContainerStyle}>
      {/* Inject pulse keyframes */}
      <style>{pulseKeyframes}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <h2 style={styles.title}>Sync Monitor</h2>
          <span style={styles.liveBadge}>
            <span style={styles.liveDot} />
            Live
          </span>
        </div>
        <button
          style={styles.linkBtn}
          onClick={() => navigate('/ingest/sources')}
        >
          Sources
        </button>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Events Received</span>
          <span style={styles.statValue}>{stats.totalEvents}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Active Syncs</span>
          <span style={{ ...styles.statValue, color: stats.activeSyncsCount > 0 ? colors.state.running : colors.textPrimary }}>
            {stats.activeSyncsCount}
          </span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Errors</span>
          <span style={{ ...styles.statValue, color: stats.errorsCount > 0 ? colors.state.failed : colors.textPrimary }}>
            {stats.errorsCount}
          </span>
        </div>
      </div>

      {/* Active Syncs */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Active Syncs</div>
        {activeSyncList.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyTitle}>No active syncs</div>
            <div style={styles.emptyBody}>Trigger a sync from the Sources page to see progress here.</div>
          </div>
        ) : (
          activeSyncList.map((sync) => {
            const pct = sync.fileCount > 0
              ? Math.round((sync.filesFetched / sync.fileCount) * 100)
              : 0;
            return (
              <div key={sync.sourceId} style={styles.syncCard}>
                <div style={styles.syncHeader}>
                  <span style={styles.syncName}>{sync.sourceName}</span>
                  <span style={styles.syncDuration}>{formatDuration(sync.startedAt)}</span>
                </div>
                <div style={styles.progressBarOuter}>
                  <div style={{ ...styles.progressBarInner, width: `${pct}%` }} />
                </div>
                <div style={styles.syncStats}>
                  <span style={styles.syncStatItem}>
                    Files: {sync.filesFetched}/{sync.fileCount} ({pct}%)
                  </span>
                  <span style={styles.syncStatItem}>
                    Mapped: {sync.itemsMapped}
                  </span>
                  <span style={styles.syncStatItem}>
                    Materialized: {sync.itemsMaterialized}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Event Log */}
      <div style={styles.section}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 8, flexWrap: 'wrap' }}>
          <span style={styles.sectionTitle}>Event Log</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <select
              data-testid="event-source-filter"
              aria-label="Filter by source"
              style={{ ...fieldStyle, flex: 'none', minWidth: 140 }}
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option value="">All sources</option>
              {sourceOptions.map((sid) => (
                <option key={sid} value={sid}>{sid.slice(0, 12)}</option>
              ))}
            </select>
            <select
              data-testid="event-type-filter"
              aria-label="Filter by event type"
              style={{ ...fieldStyle, flex: 'none', minWidth: 110 }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as EventTypeBucket)}
            >
              {EVENT_TYPE_BUCKETS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
            <button
              data-testid="event-pause-toggle"
              style={{ ...styles.linkBtn, fontSize: 11, padding: '3px 10px' }}
              onClick={() => setPaused((p) => !p)}
              title={paused ? 'Resume the live stream' : 'Pause the stream so the log doesn\'t scroll'}
            >
              {paused ? 'Resume' : 'Pause'}
            </button>
            {events.length > 0 && (
              <button
                style={{ ...styles.linkBtn, fontSize: 11, padding: '3px 10px' }}
                onClick={clearEvents}
              >
                Clear
              </button>
            )}
          </div>
        </div>
        {filteredEvents.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyTitle}>
              {events.length === 0 ? 'No events yet' : 'No events match the current filter'}
            </div>
            <div style={styles.emptyBody}>
              {events.length === 0
                ? 'Events will appear here in real-time as syncs run.'
                : 'Try a different source or event-type filter, or clear the filter.'}
            </div>
          </div>
        ) : (
          <div ref={logRef} data-testid="event-log" style={styles.eventLog}>
            {filteredEvents.map((event, idx) => (
              <div key={`${event.timestamp}-${idx}`} style={styles.eventRow}>
                <span style={styles.eventTime}>{formatTime(event.timestamp)}</span>
                <span style={eventBadgeStyle(event.type)}>{event.type}</span>
                <span style={styles.eventDescription} title={eventDescription(event)}>
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
