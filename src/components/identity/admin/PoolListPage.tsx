// src/components/identity/admin/PoolListPage.tsx
//
// Lists all user pools with create/edit/delete/view actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';

export interface PoolListPageProps {
  pools: Array<{ poolId: string; poolName: string; clientId: string; createdAt: string }>;
  onCreatePool: () => void;
  onEditPool: (poolId: string) => void;
  onDeletePool: (poolId: string) => Promise<void>;
  onViewPool: (poolId: string) => void;
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 'var(--ui-spacingMd)',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeLg)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
};

const createBtnStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: 'var(--ui-primary)',
  color: '#fff',
  border: 'none',
  borderRadius: 'var(--ui-radiusSm)',
  fontSize: 'var(--ui-fontSizeSm)',
  fontWeight: 500,
  cursor: 'pointer',
  font: 'inherit',
};

const actionBtnStyle: React.CSSProperties = {
  padding: '4px 10px',
  fontSize: 'var(--ui-fontSizeSm)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  cursor: 'pointer',
  marginRight: '6px',
  font: 'inherit',
};

const dangerBtnStyle: React.CSSProperties = {
  ...actionBtnStyle,
  borderColor: 'var(--ui-danger)',
  color: 'var(--ui-danger)',
};

const confirmStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-danger)',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type PoolRow = PoolListPageProps['pools'][number];

export function PoolListPage({
  pools,
  onCreatePool,
  onEditPool,
  onDeletePool,
  onViewPool,
  loading,
}: PoolListPageProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = useCallback(
    async (poolId: string) => {
      setDeleting(true);
      try {
        await onDeletePool(poolId);
      } finally {
        setDeleting(false);
        setConfirmingId(null);
      }
    },
    [onDeletePool],
  );

  const columns: Column<PoolRow>[] = useMemo(
    () => [
      { key: 'poolName', header: 'Name', sortable: true },
      { key: 'clientId', header: 'Client ID' },
      { key: 'createdAt', header: 'Created', sortable: true },
    ],
    [],
  );

  const renderActions = useCallback(
    (item: PoolRow) => {
      if (confirmingId === item.poolId) {
        return (
          <span style={confirmStyle}>
            Are you sure?
            <button
              type="button"
              style={{ ...dangerBtnStyle, fontWeight: 600 }}
              onClick={() => handleDelete(item.poolId)}
              disabled={deleting}
            >
              {deleting ? '...' : 'Yes'}
            </button>
            <button type="button" style={actionBtnStyle} onClick={() => setConfirmingId(null)}>
              No
            </button>
          </span>
        );
      }

      return (
        <>
          <button type="button" style={actionBtnStyle} onClick={() => onViewPool(item.poolId)}>
            View
          </button>
          <button type="button" style={actionBtnStyle} onClick={() => onEditPool(item.poolId)}>
            Edit
          </button>
          <button type="button" style={dangerBtnStyle} onClick={() => setConfirmingId(item.poolId)}>
            Delete
          </button>
        </>
      );
    },
    [confirmingId, deleting, handleDelete, onEditPool, onViewPool],
  );

  return (
    <div>
      <div style={headerStyle}>
        <h1 style={titleStyle}>User Pools</h1>
        <button type="button" style={createBtnStyle} onClick={onCreatePool}>
          Create Pool
        </button>
      </div>

      <EntityTable<PoolRow>
        columns={columns}
        data={pools}
        keyField="poolId"
        actions={renderActions}
        loading={loading}
        emptyMessage="No user pools found. Create one to get started."
      />
    </div>
  );
}
