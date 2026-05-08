// src/components/identity/admin/UserListPage.tsx
//
// Lists users within a specific pool with status badges and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { StatusBadge } from '../shared/StatusBadge';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import ConfirmDialog from '../../shared/ConfirmDialog';

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

  const handleDelete = useCallback(
    async (userId: string) => {
      setDeleting(true);
      try {
        await onDeleteUser(userId);
      } finally {
        setDeleting(false);
        setConfirmingId(null);
      }
    },
    [onDeleteUser],
  );

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
        <Button variant="danger" size="sm" onClick={() => setConfirmingId(item.userId)}>
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
        onConfirm={() => confirmingId && handleDelete(confirmingId)}
        onCancel={() => setConfirmingId(null)}
        title="Delete User"
        body="This action cannot be undone. The user will be permanently removed."
        tone="destructive"
        confirmLabel="Delete"
        confirmDisabled={deleting}
      />
    </PageSection>
  );
}
