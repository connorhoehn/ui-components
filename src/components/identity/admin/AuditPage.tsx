// src/components/identity/admin/AuditPage.tsx
//
// Audit log viewer with filters, point-in-time replay, and entity navigation.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';

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
// Styles
// ---------------------------------------------------------------------------

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ui-spacingMd)',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeLg)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
};

const filterBarStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--ui-spacingSm)',
  alignItems: 'flex-end',
  padding: 'var(--ui-spacingMd)',
  backgroundColor: 'var(--ui-surface)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusMd)',
};

const filterFieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const filterLabelStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textSecondary)',
  fontWeight: 500,
};

const filterInputStyle: React.CSSProperties = {
  padding: '6px 10px',
  fontSize: 'var(--ui-fontSizeSm)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
};

const queryBtnStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: 'var(--ui-primary)',
  color: '#fff',
  border: 'none',
  borderRadius: 'var(--ui-radiusSm)',
  fontSize: 'var(--ui-fontSizeSm)',
  fontWeight: 500,
  cursor: 'pointer',
  font: 'inherit',
  alignSelf: 'flex-end',
};

const replayPanelStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingMd)',
  backgroundColor: 'var(--ui-surface)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusMd)',
};

const replayTitleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeMd)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
  marginBottom: 'var(--ui-spacingSm)',
};

const replayInputRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--ui-spacingSm)',
  alignItems: 'flex-end',
  marginBottom: 'var(--ui-spacingSm)',
  flexWrap: 'wrap',
};

const codeBlockStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingMd)',
  backgroundColor: 'var(--ui-surfaceAlt)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  fontFamily: 'monospace',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textPrimary)',
  overflowX: 'auto',
  whiteSpace: 'pre-wrap',
  maxHeight: '300px',
  overflowY: 'auto',
};

const totalStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textMuted)',
};

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--ui-primary)',
  cursor: 'pointer',
  fontSize: 'var(--ui-fontSizeSm)',
  padding: 0,
  textDecoration: 'underline',
  font: 'inherit',
};

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
            style={linkBtnStyle}
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
    <div style={pageStyle}>
      <h1 style={titleStyle}>Audit Log</h1>

      {/* Filter bar */}
      <div style={filterBarStyle}>
        <div style={filterFieldStyle}>
          <label style={filterLabelStyle}>Entity Type</label>
          <select
            style={filterInputStyle}
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
          >
            <option value="">All</option>
            {ENTITY_TYPES.filter(Boolean).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div style={filterFieldStyle}>
          <label style={filterLabelStyle}>Entity ID</label>
          <input
            style={filterInputStyle}
            value={entityId}
            onChange={(e) => setEntityId(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div style={filterFieldStyle}>
          <label style={filterLabelStyle}>From</label>
          <input
            style={filterInputStyle}
            type="datetime-local"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div style={filterFieldStyle}>
          <label style={filterLabelStyle}>To</label>
          <input
            style={filterInputStyle}
            type="datetime-local"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div style={filterFieldStyle}>
          <label style={filterLabelStyle}>Limit</label>
          <input
            style={{ ...filterInputStyle, width: '60px' }}
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        <button type="button" style={queryBtnStyle} onClick={handleQuery} disabled={loading}>
          {loading ? 'Querying...' : 'Query'}
        </button>
      </div>

      {/* Results */}
      {totalRecords !== undefined && (
        <p style={totalStyle}>{totalRecords} total record(s)</p>
      )}

      <EntityTable<AuditRow>
        columns={columns}
        data={records}
        keyField="timestamp"
        loading={loading}
        emptyMessage="No audit records found. Adjust filters and query."
      />

      {/* Point-in-time replay */}
      <div style={replayPanelStyle}>
        <h3 style={replayTitleStyle}>Point-in-Time Replay</h3>
        <div style={replayInputRowStyle}>
          <div style={filterFieldStyle}>
            <label style={filterLabelStyle}>Entity ID</label>
            <input
              style={filterInputStyle}
              value={replayEntityId}
              onChange={(e) => setReplayEntityId(e.target.value)}
              placeholder="entity-id"
            />
          </div>
          <div style={filterFieldStyle}>
            <label style={filterLabelStyle}>At Timestamp</label>
            <input
              style={filterInputStyle}
              type="datetime-local"
              value={replayTimestamp}
              onChange={(e) => setReplayTimestamp(e.target.value)}
            />
          </div>
          <button
            type="button"
            style={queryBtnStyle}
            onClick={handleReplay}
            disabled={replaying || !replayEntityId || !replayTimestamp}
          >
            {replaying ? 'Replaying...' : 'Replay'}
          </button>
        </div>
        {replayResult && (
          <pre style={codeBlockStyle}>{JSON.stringify(replayResult, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
