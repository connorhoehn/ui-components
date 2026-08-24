// src/components/identity/admin/PoolListPage.tsx
//
// Lists all user pools with create/edit/delete/view actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import ConfirmDialog from '../../shared/ConfirmDialog';
import Banner from '../../shared/Banner';

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
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // A rejected delete used to be swallowed whole: the close lived in
  // `finally`, so a 403/409/500 dismissed the dialog exactly like a success
  // while the row stayed in the table and nothing was ever shown or logged.
  // The admin's only clue was the row not disappearing, which reads as a
  // stale list — so the usual response was to reload and try again. Close on
  // success only; on failure keep the dialog up and name the reason.
  const handleDelete = useCallback(
    async (poolId: string) => {
      setDeleting(true);
      setDeleteError(null);
      try {
        await onDeletePool(poolId);
        setConfirmingId(null);
      } catch (err: unknown) {
        setDeleteError(err instanceof Error ? err.message : 'Failed to delete pool.');
      } finally {
        setDeleting(false);
      }
    },
    [onDeletePool],
  );

  const closeConfirm = useCallback(() => {
    setConfirmingId(null);
    setDeleteError(null);
  }, []);

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
        <Button
          variant="danger"
          size="sm"
          onClick={() => { setConfirmingId(item.poolId); setDeleteError(null); }}
        >
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
        onConfirm={() => { if (confirmingId) void handleDelete(confirmingId); }}
        onCancel={closeConfirm}
        title="Delete Pool"
        body="This action cannot be undone. All users in this pool will be affected."
        tone="destructive"
        confirmLabel="Delete"
        confirmDisabled={deleting}
      >
        {deleteError && <Banner variant="error">{deleteError}</Banner>}
      </ConfirmDialog>
    </PageSection>
  );
}
