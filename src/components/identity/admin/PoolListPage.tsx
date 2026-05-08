// src/components/identity/admin/PoolListPage.tsx
//
// Lists all user pools with create/edit/delete/view actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import ConfirmDialog from '../../shared/ConfirmDialog';

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
    (item: PoolRow) => (
      <>
        <Button variant="ghost" size="sm" onClick={() => onViewPool(item.poolId)}>
          View
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEditPool(item.poolId)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => setConfirmingId(item.poolId)}>
          Delete
        </Button>
      </>
    ),
    [onEditPool, onViewPool],
  );

  return (
    <PageSection
      title="User Pools"
      actions={
        <Button variant="primary" size="lg" onClick={onCreatePool}>
          Create Pool
        </Button>
      }
    >
      <EntityTable<PoolRow>
        columns={columns}
        data={pools}
        keyField="poolId"
        actions={renderActions}
        loading={loading}
        emptyMessage="No user pools found. Create one to get started."
        emptyIcon="🏊"
      />

      <ConfirmDialog
        open={!!confirmingId}
        onConfirm={() => confirmingId && handleDelete(confirmingId)}
        onCancel={() => setConfirmingId(null)}
        title="Delete Pool"
        body="This action cannot be undone. All users in this pool will be affected."
        tone="destructive"
        confirmLabel="Delete"
        confirmDisabled={deleting}
      />
    </PageSection>
  );
}
