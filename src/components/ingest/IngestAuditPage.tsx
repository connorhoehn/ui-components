// frontend/src/components/ingest/IngestAuditPage.tsx
//
// Operator audit-log viewer (hub#2214 — slice 2/3 of the audit-viewer
// feature). Lists every mapping decision, source change, and write-back
// attempt with timestamp / actor / event type / target / summary +
// expandable JSON detail. Filter bar covers time-range, event type,
// actor, targetId.
//
// The table is empty until hub#2215 (instrumentation pass) lands. Page
// + route + filters still ship first so the seam is verifiable.

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { colors, fieldStyle, pageContainerStyle } from '../../constants/styles';
import { useIngestAudit } from '../../hooks/useIngestAudit';
import type {
  IngestAuditEntry,
  IngestAuditEventType,
  IngestAuditFilters,
} from '../../hooks/useIngestAudit';

const styles: Record<string, CSSProperties> = {
  header: { marginBottom: 12 },
  title: { fontSize: 22, fontWeight: 700, color: colors.textPrimary },
  filters: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', padding: 12, background: colors.surfaceInset, borderRadius: 8, marginBottom: 12 },
  filterLabel: { fontSize: 11, color: colors.textTertiary, marginRight: 4 },
  filterField: { ...fieldStyle, flex: 'none', minWidth: 140 },
  errorBanner: { padding: '8px 12px', background: '#fef2f2', border: `1px solid ${colors.state.failed}`, color: colors.state.failed, borderRadius: 8, marginBottom: 12 },
  table: { width: '100%', borderCollapse: 'collapse' as const, background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10, overflow: 'hidden' },
  th: { textAlign: 'left' as const, fontSize: 11, fontWeight: 600, color: colors.textTertiary, textTransform: 'uppercase' as const, padding: '8px 10px', borderBottom: `1px solid ${colors.border}` },
  td: { fontSize: 13, padding: '8px 10px', verticalAlign: 'top' as const, borderBottom: `1px solid ${colors.border}` },
  tdMono: { fontSize: 12, fontFamily: 'ui-monospace, monospace' },
  detailButton: { fontSize: 11, color: colors.primary, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' },
  detailJson: { fontSize: 11, fontFamily: 'ui-monospace, monospace', background: colors.surfaceInset, padding: '6px 8px', borderRadius: 4, whiteSpace: 'pre-wrap' as const, marginTop: 4, maxHeight: 200, overflow: 'auto' },
};

const EVENT_TYPES: Array<{ value: '' | IngestAuditEventType; label: string }> = [
  { value: '',                     label: 'All events' },
  { value: 'mapping.decided',      label: 'mapping.decided' },
  { value: 'source.created',       label: 'source.created' },
  { value: 'source.updated',       label: 'source.updated' },
  { value: 'source.paused',        label: 'source.paused' },
  { value: 'source.resumed',       label: 'source.resumed' },
  { value: 'writeback.attempted',  label: 'writeback.attempted' },
  { value: 'writeback.failed',     label: 'writeback.failed' },
];

const TIME_RANGES: Array<{ value: string; label: string; ms: number | null }> = [
  { value: '1h',   label: 'Last 1h',   ms: 60 * 60 * 1000 },
  { value: '6h',   label: 'Last 6h',   ms: 6 * 60 * 60 * 1000 },
  { value: '24h',  label: 'Last 24h',  ms: 24 * 60 * 60 * 1000 },
  { value: '7d',   label: 'Last 7d',   ms: 7 * 24 * 60 * 60 * 1000 },
  { value: 'all',  label: 'All time',  ms: null },
];

export default function IngestAuditPage() {
  const [timeRange, setTimeRange] = useState('24h');
  const [eventType, setEventType] = useState<'' | IngestAuditEventType>('');
  const [actor, setActor] = useState('');
  const [targetId, setTargetId] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filters = useMemo<IngestAuditFilters>(() => {
    const range = TIME_RANGES.find((t) => t.value === timeRange);
    return {
      since: range && range.ms !== null ? new Date(Date.now() - range.ms).toISOString() : undefined,
      eventType: eventType || undefined,
      actor: actor.trim() || undefined,
      targetId: targetId.trim() || undefined,
      limit: 200,
    };
  }, [timeRange, eventType, actor, targetId]);

  const { entries, loading, error } = useIngestAudit(filters);

  return (
    <div data-testid="ingest-audit-page" style={pageContainerStyle}>
      <div style={styles.header}>
        <div style={styles.title}>Audit log</div>
      </div>

      <div style={styles.filters}>
        <span style={styles.filterLabel}>Time</span>
        <select
          data-testid="audit-time-range"
          aria-label="Time range"
          style={styles.filterField}
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          {TIME_RANGES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <span style={styles.filterLabel}>Event</span>
        <select
          data-testid="audit-event-type"
          aria-label="Event type"
          style={styles.filterField}
          value={eventType}
          onChange={(e) => setEventType(e.target.value as '' | IngestAuditEventType)}
        >
          {EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <span style={styles.filterLabel}>Actor</span>
        <input
          data-testid="audit-actor"
          aria-label="Actor"
          style={styles.filterField}
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          placeholder="email or system"
        />
        <span style={styles.filterLabel}>Target</span>
        <input
          data-testid="audit-target-id"
          aria-label="Target ID"
          style={styles.filterField}
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          placeholder="sourceId / itemId"
        />
      </div>

      {error ? (
        <div data-testid="audit-error" style={styles.errorBanner}>
          Couldn't load audit log: {error}
        </div>
      ) : null}

      {loading && entries.length === 0 ? (
        <div>
          <SkeletonCard height={200} />
        </div>
      ) : entries.length === 0 && !error ? (
        <EmptyState
          icon="📜"
          title="No audit entries"
          body="Mapping decisions, source changes, and write-back attempts will appear here once instrumentation is wired (hub#2215)."
          testId="audit-empty"
        />
      ) : (
        <table data-testid="audit-table" style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Actor</th>
              <th style={styles.th}>Event</th>
              <th style={styles.th}>Target</th>
              <th style={styles.th}>Summary</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <AuditRow
                key={e.auditId}
                entry={e}
                expanded={expandedId === e.auditId}
                onToggle={() => setExpandedId(expandedId === e.auditId ? null : e.auditId)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function AuditRow({ entry, expanded, onToggle }: { entry: IngestAuditEntry; expanded: boolean; onToggle: () => void }) {
  return (
    <>
      <tr data-testid={`audit-row-${entry.auditId}`}>
        <td style={{ ...styles.td, ...styles.tdMono }}>{entry.createdAt.slice(0, 19).replace('T', ' ')}</td>
        <td style={styles.td}>{entry.actor}</td>
        <td style={{ ...styles.td, ...styles.tdMono }}>{entry.eventType}</td>
        <td style={{ ...styles.td, ...styles.tdMono }} title={entry.targetId}>
          {entry.targetType}/{entry.targetId.slice(0, 12)}
        </td>
        <td style={styles.td}>{entry.summary}</td>
        <td style={styles.td}>
          <button
            data-testid={`audit-detail-toggle-${entry.auditId}`}
            style={styles.detailButton}
            onClick={onToggle}
          >
            {expanded ? 'hide' : 'detail'}
          </button>
        </td>
      </tr>
      {expanded ? (
        <tr>
          <td colSpan={6} style={styles.td}>
            <pre data-testid={`audit-detail-${entry.auditId}`} style={styles.detailJson}>
              {JSON.stringify(entry.detail, null, 2)}
            </pre>
          </td>
        </tr>
      ) : null}
    </>
  );
}
