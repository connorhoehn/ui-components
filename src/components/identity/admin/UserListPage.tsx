// src/components/identity/admin/UserListPage.tsx
//
// Lists users within a specific pool with status badges and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { StatusBadge } from '../shared/StatusBadge';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import ConfirmDialog from '../../shared/ConfirmDialog';
import Banner from '../../shared/Banner';

export interface UserListPageProps {
  users: Array<{
    userId: string;
    email: string;
    givenName?: string;
    familyName?: string;
    status: string;
    createdAt: string;
  }>;
  poolId: string;
  poolName: string;
  onCreateUser: () => void;
  onEditUser: (userId: string) => void;
  onDeleteUser: (userId: string) => Promise<void>;
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type UserRow = UserListPageProps['users'][number];

export function UserListPage({
  users,
  poolName,
  onCreateUser,
  onEditUser,
  onDeleteUser,
  loading,
}: UserListPageProps) {
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
    async (userId: string) => {
      setDeleting(true);
      setDeleteError(null);
      try {
        await onDeleteUser(userId);
        setConfirmingId(null);
      } catch (err: unknown) {
        setDeleteError(err instanceof Error ? err.message : 'Failed to delete user.');
      } finally {
        setDeleting(false);
      }
    },
    [onDeleteUser],
  );

  const closeConfirm = useCallback(() => {
    setConfirmingId(null);
    setDeleteError(null);
  }, []);

  const columns: Column<UserRow>[] = useMemo(
    () => [
      { key: 'email', header: 'Email', sortable: true },
      {
        key: 'name',
        header: 'Name',
        render: (item) =>
          [item.givenName, item.familyName].filter(Boolean).join(' ') || '—',
      },
      {
        key: 'status',
        header: 'Status',
        width: '180px',
        render: (item) => <StatusBadge status={item.status} />,
      },
      { key: 'createdAt', header: 'Created', sortable: true },
    ],
    [],
  );

  const renderActions = useCallback(
    (item: UserRow) => (
      <>
        <Button variant="ghost" size="sm" onClick={() => onEditUser(item.userId)}>
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => { setConfirmingId(item.userId); setDeleteError(null); }}
        >
          Delete
        </Button>
      </>
    ),
    [onEditUser],
  );

  return (
    <PageSection
      title={`Users — ${poolName}`}
      actions={
        <Button variant="primary" size="lg" onClick={onCreateUser}>
          Create User
        </Button>
      }
    >
      <EntityTable<UserRow>
        columns={columns}
        data={users}
        keyField="userId"
        actions={renderActions}
        loading={loading}
        emptyMessage="No users in this pool yet."
        emptyIcon="👤"
      />

      <ConfirmDialog
        open={!!confirmingId}
        onConfirm={() => { if (confirmingId) void handleDelete(confirmingId); }}
        onCancel={closeConfirm}
        title="Delete User"
        body="This action cannot be undone. The user will be permanently removed."
        tone="destructive"
        confirmLabel="Delete"
        confirmDisabled={deleting}
      >
        {deleteError && <Banner variant="error">{deleteError}</Banner>}
      </ConfirmDialog>
    </PageSection>
  );
}
