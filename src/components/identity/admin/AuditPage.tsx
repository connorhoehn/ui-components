// src/components/identity/admin/AuditPage.tsx
//
// Audit log viewer with filters, point-in-time replay, and entity navigation.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { FilterField } from '../shared/FilterField';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import { Input } from '../../forms/Input';
import { Select } from '../../forms/Select';

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
          <span className="font-mono text-xs text-neutral">
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

  return (
    <PageSection title="Audit Log">
      {/* Filter bar */}
      <Card padding="md">
        <div className="flex flex-wrap gap-4 items-end">
          <FilterField label="Entity Type">
            {(w) => (
              <Select
                {...w}
                className="w-40"
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
                options={[
                  { value: '', label: 'All' },
                  ...ENTITY_TYPES.filter(Boolean).map((t) => ({ value: t, label: t })),
                ]}
              />
            )}
          </FilterField>
          <FilterField label="Entity ID">
            {(w) => <Input {...w} className="w-44" value={entityId} onChange={(e) => setEntityId(e.target.value)} placeholder="Optional" />}
          </FilterField>
          <FilterField label="From">
            {(w) => <Input {...w} className="w-52" type="datetime-local" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />}
          </FilterField>
          <FilterField label="To">
            {(w) => <Input {...w} className="w-52" type="datetime-local" value={toDate} onChange={(e) => setToDate(e.target.value)} />}
          </FilterField>
          <FilterField label="Limit">
            {(w) => <Input {...w} className="w-[70px]" type="number" value={limit} onChange={(e) => setLimit(e.target.value)} />}
          </FilterField>
          <Button variant="primary" size="lg" onClick={handleQuery} disabled={loading}>
            {loading ? 'Querying...' : 'Query'}
          </Button>
        </div>
      </Card>

      {/* Results */}
      {totalRecords !== undefined && (
        <p className="text-sm text-text-tertiary m-0">{totalRecords} total record(s)</p>
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
        <h3 className="text-base font-semibold text-text-primary mb-4 mt-0">Point-in-Time Replay</h3>
        <div className="flex flex-wrap gap-4 items-end mb-4">
          <FilterField label="Entity ID">
            {(w) => <Input {...w} className="w-44" value={replayEntityId} onChange={(e) => setReplayEntityId(e.target.value)} placeholder="entity-id" />}
          </FilterField>
          <FilterField label="At Timestamp">
            {(w) => <Input {...w} className="w-52" type="datetime-local" value={replayTimestamp} onChange={(e) => setReplayTimestamp(e.target.value)} />}
          </FilterField>
          <Button variant="primary" size="lg" onClick={handleReplay} disabled={replaying || !replayEntityId || !replayTimestamp}>
            {replaying ? 'Replaying...' : 'Replay'}
          </Button>
        </div>
        {replayResult && (
          <pre className="p-4 bg-surface-panel border border-border rounded-md font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto m-0">
            {JSON.stringify(replayResult, null, 2)}
          </pre>
        )}
      </Card>
    </PageSection>
  );
}
