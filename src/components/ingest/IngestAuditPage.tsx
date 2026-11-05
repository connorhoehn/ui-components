// frontend/src/components/ingest/IngestAuditPage.tsx
//
// Operator audit-log viewer.

import { useId, useMemo, useState } from 'react';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { useIngestAudit } from '../../hooks/useIngestAudit';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import type {
  IngestAuditEntry,
  IngestAuditEventType,
  IngestAuditFilters,
} from '../../hooks/useIngestAudit';

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
  const uid = useId();
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
    <div data-testid="ingest-audit-page" className="p-6 flex flex-col gap-3">
      <div className="mb-3">
        <div className="text-[22px] font-bold text-text-primary">Audit log</div>
      </div>

      {/* Three of these four filters announced a DIFFERENT name from the word
          printed beside them — "Time range" next to "Time", "Event type" next
          to "Event", "Target ID" next to "Target". Nobody could report the
          mismatch, because no sighted user can see the name being read aloud.
          The visible text wins, and the captions are now real <label htmlFor>
          associations, so there is one source of truth that cannot drift
          apart again. */}
      <div className="flex gap-2 flex-wrap items-center p-3 bg-surface-inset rounded-lg mb-3">
        <label htmlFor={`${uid}-time`} className="text-[11px] text-text-tertiary mr-1">Time</label>
        <Select
          id={`${uid}-time`}
          data-testid="audit-time-range"
          className="w-auto min-w-[140px]"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          options={TIME_RANGES.map((t) => ({ value: t.value, label: t.label }))}
        />
        <label htmlFor={`${uid}-event`} className="text-[11px] text-text-tertiary mr-1">Event</label>
        <Select
          id={`${uid}-event`}
          data-testid="audit-event-type"
          className="w-auto min-w-[140px]"
          value={eventType}
          onChange={(e) => setEventType(e.target.value as '' | IngestAuditEventType)}
          options={EVENT_TYPES.map((t) => ({ value: t.value, label: t.label }))}
        />
        <label htmlFor={`${uid}-actor`} className="text-[11px] text-text-tertiary mr-1">Actor</label>
        <Input
          id={`${uid}-actor`}
          data-testid="audit-actor"
          className="w-auto min-w-[140px]"
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          placeholder="email or system"
        />
        <label htmlFor={`${uid}-target`} className="text-[11px] text-text-tertiary mr-1">Target</label>
        <Input
          id={`${uid}-target`}
          data-testid="audit-target-id"
          className="w-auto min-w-[140px]"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          placeholder="sourceId / itemId"
        />
      </div>

      {error ? (
        <div role="alert" data-testid="audit-error" className="px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3">
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
        <table data-ui-part="" data-testid="audit-table" className="w-full border-collapse bg-surface border border-border rounded-[10px] overflow-hidden">
          <thead>
            <tr>
              <th className="text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border">Time</th>
              <th className="text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border">Actor</th>
              <th className="text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border">Event</th>
              <th className="text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border">Target</th>
              <th className="text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border">Summary</th>
              <th className="text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border"></th>
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
        <td className="text-[13px] p-2 align-top border-b border-border font-mono text-xs">{entry.createdAt.slice(0, 19).replace('T', ' ')}</td>
        <td className="text-[13px] p-2 align-top border-b border-border">{entry.actor}</td>
        <td className="text-[13px] p-2 align-top border-b border-border font-mono text-xs">{entry.eventType}</td>
        <td className="text-[13px] p-2 align-top border-b border-border font-mono text-xs" title={entry.targetId}>
          {entry.targetType}/{entry.targetId.slice(0, 12)}
        </td>
        <td className="text-[13px] p-2 align-top border-b border-border">{entry.summary}</td>
        <td className="text-[13px] p-2 align-top border-b border-border">
          <button
            data-ui-part=""
            data-testid={`audit-detail-toggle-${entry.auditId}`}
            className="text-[11px] text-primary bg-transparent border-none p-0 cursor-pointer underline"
            onClick={onToggle}
          >
            {expanded ? 'hide' : 'detail'}
          </button>
        </td>
      </tr>
      {expanded ? (
        <tr>
          <td colSpan={6} className="text-[13px] p-2 align-top border-b border-border">
            <pre data-testid={`audit-detail-${entry.auditId}`} className="text-[11px] font-mono bg-surface-inset px-2 py-1.5 rounded whitespace-pre-wrap mt-1 max-h-[200px] overflow-auto">
              {JSON.stringify(entry.detail, null, 2)}
            </pre>
          </td>
        </tr>
      ) : null}
    </>
  );
}
