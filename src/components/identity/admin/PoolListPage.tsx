// src/components/identity/admin/PoolListPage.tsx
//
// Lists all user pools with create/edit/delete/view actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { cn } from '../../../lib/cn';

export interface PoolListPageProps {
  pools: Array<{ poolId: string; poolName: string; clientId: string; createdAt: string }>;
  onCreatePool: () => void;
  onEditPool: (poolId: string) => void;
  onDeletePool: (poolId: string) => Promise<void>;
  onViewPool: (poolId: string) => void;
  loading?: boolean;
}

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
          <span className="inline-flex items-center gap-1.5 text-sm text-danger">
            Are you sure?
            <button
              type="button"
              className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer font-semibold mr-1.5"
              onClick={() => handleDelete(item.poolId)}
              disabled={deleting}
            >
              {deleting ? '...' : 'Yes'}
            </button>
            <button
              type="button"
              className="px-2.5 py-1 text-sm border border-border rounded-sm bg-surface text-text-primary cursor-pointer mr-1.5"
              onClick={() => setConfirmingId(null)}
            >
              No
            </button>
          </span>
        );
      }

      return (
        <>
          <button
            type="button"
            className="px-2.5 py-1 text-sm border border-border rounded-sm bg-surface text-text-primary cursor-pointer mr-1.5"
            onClick={() => onViewPool(item.poolId)}
          >
            View
          </button>
          <button
            type="button"
            className="px-2.5 py-1 text-sm border border-border rounded-sm bg-surface text-text-primary cursor-pointer mr-1.5"
            onClick={() => onEditPool(item.poolId)}
          >
            Edit
          </button>
          <button
            type="button"
            className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer mr-1.5"
            onClick={() => setConfirmingId(item.poolId)}
          >
            Delete
          </button>
        </>
      );
    },
    [confirmingId, deleting, handleDelete, onEditPool, onViewPool],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-text-primary">User Pools</h1>
        <button
          type="button"
          className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover cursor-pointer"
          onClick={onCreatePool}
        >
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
