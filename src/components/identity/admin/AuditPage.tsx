// src/components/identity/admin/AuditPage.tsx
//
// Audit log viewer with filters, point-in-time replay, and entity navigation.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';

export interface AuditPageProps {
  records: Array<{
    timestamp: number;
    actor: { id?: string; email?: string } | string;
    entityType: string;
    entityId: string;
    operation: string;
  }>;
  onQuery: (params: {
    entityType?: string;
    entityId?: string;
    fromTime?: number;
    toTime?: number;
    limit?: number;
  }) => Promise<void>;
  onViewEntity: (entityType: string, entityId: string) => void;
  onReplay: (entityId: string, atTime: number) => Promise<Record<string, unknown> | null>;
  loading?: boolean;
  totalRecords?: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type AuditRow = AuditPageProps['records'][number];

const ENTITY_TYPES = ['', 'user', 'pool', 'client', 'group', 'template'];

export function AuditPage({
  records,
  onQuery,
  onViewEntity,
  onReplay,
  loading,
  totalRecords,
}: AuditPageProps) {
  const [entityType, setEntityType] = useState('');
  const [entityId, setEntityId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [limit, setLimit] = useState('50');

  const [replayEntityId, setReplayEntityId] = useState('');
  const [replayTimestamp, setReplayTimestamp] = useState('');
  const [replayResult, setReplayResult] = useState<Record<string, unknown> | null>(null);
  const [replaying, setReplaying] = useState(false);

  const handleQuery = useCallback(async () => {
    await onQuery({
      entityType: entityType || undefined,
      entityId: entityId || undefined,
      fromTime: fromDate ? new Date(fromDate).getTime() : undefined,
      toTime: toDate ? new Date(toDate).getTime() : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }, [entityType, entityId, fromDate, toDate, limit, onQuery]);

  const handleReplay = useCallback(async () => {
    if (!replayEntityId || !replayTimestamp) return;
    setReplaying(true);
    try {
      const result = await onReplay(replayEntityId, new Date(replayTimestamp).getTime());
      setReplayResult(result);
    } finally {
      setReplaying(false);
    }
  }, [replayEntityId, replayTimestamp, onReplay]);

  const columns: Column<AuditRow>[] = useMemo(
    () => [
      {
        key: 'timestamp',
        header: 'Timestamp',
        sortable: true,
        render: (item) => (
          <span className="font-mono text-xs text-slate-500">
            {new Date(item.timestamp).toLocaleString()}
          </span>
        ),
      },
      {
        key: 'actor',
        header: 'Actor',
        render: (item) =>
          typeof item.actor === 'string'
            ? item.actor
            : item.actor?.email || item.actor?.id || JSON.stringify(item.actor),
      },
      { key: 'entityType', header: 'Entity Type' },
      {
        key: 'entityId',
        header: 'Entity ID',
        render: (item) => (
          <Button
            variant="ghost"
            size="sm"
            className="p-0 underline text-info-fg font-mono text-xs"
            onClick={() => onViewEntity(item.entityType, item.entityId)}
          >
            {item.entityId}
          </Button>
        ),
      },
      { key: 'operation', header: 'Operation' },
    ],
    [onViewEntity],
  );

  const inputClass = 'px-3 py-2 text-sm border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-info focus:border-info transition-shadow';

  return (
    <PageSection title="Audit Log">
      {/* Filter bar */}
      <Card padding="md">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Entity Type</label>
            <select className={inputClass} value={entityType} onChange={(e) => setEntityType(e.target.value)}>
              <option value="">All</option>
              {ENTITY_TYPES.filter(Boolean).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Entity ID</label>
            <input className={inputClass} value={entityId} onChange={(e) => setEntityId(e.target.value)} placeholder="Optional" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">From</label>
            <input className={inputClass} type="datetime-local" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">To</label>
            <input className={inputClass} type="datetime-local" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Limit</label>
            <input className={`${inputClass} w-[70px]`} type="number" value={limit} onChange={(e) => setLimit(e.target.value)} />
          </div>
          <Button variant="primary" size="lg" onClick={handleQuery} disabled={loading}>
            {loading ? 'Querying...' : 'Query'}
          </Button>
        </div>
      </Card>

      {/* Results */}
      {totalRecords !== undefined && (
        <p className="text-sm text-slate-400 m-0">{totalRecords} total record(s)</p>
      )}

      <EntityTable<AuditRow>
        columns={columns}
        data={records}
        keyField="timestamp"
        loading={loading}
        emptyMessage="No audit records found. Adjust filters and query."
        emptyIcon="📜"
      />

      {/* Point-in-time replay */}
      <Card padding="md">
        <h3 className="text-base font-semibold text-slate-900 mb-4 mt-0">Point-in-Time Replay</h3>
        <div className="flex flex-wrap gap-4 items-end mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Entity ID</label>
            <input className={inputClass} value={replayEntityId} onChange={(e) => setReplayEntityId(e.target.value)} placeholder="entity-id" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">At Timestamp</label>
            <input className={inputClass} type="datetime-local" value={replayTimestamp} onChange={(e) => setReplayTimestamp(e.target.value)} />
          </div>
          <Button variant="primary" size="lg" onClick={handleReplay} disabled={replaying || !replayEntityId || !replayTimestamp}>
            {replaying ? 'Replaying...' : 'Replay'}
          </Button>
        </div>
        {replayResult && (
          <pre className="p-4 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs text-slate-700 overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto m-0">
            {JSON.stringify(replayResult, null, 2)}
          </pre>
        )}
      </Card>
    </PageSection>
  );
}
