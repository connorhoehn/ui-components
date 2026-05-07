// src/components/identity/admin/AuditPage.tsx
//
// Audit log viewer with filters, point-in-time replay, and entity navigation.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { cn } from '../../../lib/cn';

export interface AuditPageProps {
  records: Array<{
    timestamp: number;
    actor: any;
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
  onReplay: (entityId: string, atTime: number) => Promise<any>;
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

  // Replay state
  const [replayEntityId, setReplayEntityId] = useState('');
  const [replayTimestamp, setReplayTimestamp] = useState('');
  const [replayResult, setReplayResult] = useState<any>(null);
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
        render: (item) => new Date(item.timestamp).toLocaleString(),
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
          <button
            type="button"
            className="bg-transparent border-none text-primary cursor-pointer text-sm p-0 underline"
            onClick={() => onViewEntity(item.entityType, item.entityId)}
          >
            {item.entityId}
          </button>
        ),
      },
      { key: 'operation', header: 'Operation' },
    ],
    [onViewEntity],
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold text-text-primary">Audit Log</h1>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 items-end p-4 bg-surface border border-border rounded-md">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-text-secondary font-medium">Entity Type</label>
          <select
            className="px-2.5 py-1.5 text-sm border border-border rounded-sm bg-surface text-text-primary"
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
          >
            <option value="">All</option>
            {ENTITY_TYPES.filter(Boolean).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-text-secondary font-medium">Entity ID</label>
          <input
            className="px-2.5 py-1.5 text-sm border border-border rounded-sm bg-surface text-text-primary"
            value={entityId}
            onChange={(e) => setEntityId(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-text-secondary font-medium">From</label>
          <input
            className="px-2.5 py-1.5 text-sm border border-border rounded-sm bg-surface text-text-primary"
            type="datetime-local"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-text-secondary font-medium">To</label>
          <input
            className="px-2.5 py-1.5 text-sm border border-border rounded-sm bg-surface text-text-primary"
            type="datetime-local"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-text-secondary font-medium">Limit</label>
          <input
            className="px-2.5 py-1.5 text-sm border border-border rounded-sm bg-surface text-text-primary w-[60px]"
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed self-end"
          onClick={handleQuery}
          disabled={loading}
        >
          {loading ? 'Querying...' : 'Query'}
        </button>
      </div>

      {/* Results */}
      {totalRecords !== undefined && (
        <p className="text-sm text-text-tertiary">{totalRecords} total record(s)</p>
      )}

      <EntityTable<AuditRow>
        columns={columns}
        data={records}
        keyField="timestamp"
        loading={loading}
        emptyMessage="No audit records found. Adjust filters and query."
      />

      {/* Point-in-time replay */}
      <div className="p-4 bg-surface border border-border rounded-md">
        <h3 className="text-base font-semibold text-text-primary mb-2">Point-in-Time Replay</h3>
        <div className="flex gap-2 items-end mb-2 flex-wrap">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-text-secondary font-medium">Entity ID</label>
            <input
              className="px-2.5 py-1.5 text-sm border border-border rounded-sm bg-surface text-text-primary"
              value={replayEntityId}
              onChange={(e) => setReplayEntityId(e.target.value)}
              placeholder="entity-id"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-text-secondary font-medium">At Timestamp</label>
            <input
              className="px-2.5 py-1.5 text-sm border border-border rounded-sm bg-surface text-text-primary"
              type="datetime-local"
              value={replayTimestamp}
              onChange={(e) => setReplayTimestamp(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed self-end"
            onClick={handleReplay}
            disabled={replaying || !replayEntityId || !replayTimestamp}
          >
            {replaying ? 'Replaying...' : 'Replay'}
          </button>
        </div>
        {replayResult && (
          <pre className="p-4 bg-surface-inset border border-border rounded-sm font-mono text-sm text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto">
            {JSON.stringify(replayResult, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
