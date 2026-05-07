// src/components/identity/admin/UserListPage.tsx
//
// Lists users within a specific pool with status badges and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { StatusBadge } from '../shared/StatusBadge';
import { cn } from '../../../lib/cn';

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
          [item.givenName, item.familyName].filter(Boolean).join(' ') || '-',
      },
      {
        key: 'status',
        header: 'Status',
        render: (item) => <StatusBadge status={item.status} />,
      },
      { key: 'createdAt', header: 'Created', sortable: true },
    ],
    [],
  );

  const renderActions = useCallback(
    (item: UserRow) => {
      if (confirmingId === item.userId) {
        return (
          <span className="inline-flex items-center gap-1.5 text-sm text-danger">
            Are you sure?
            <button
              type="button"
              className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer font-semibold mr-1.5"
              onClick={() => handleDelete(item.userId)}
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
            onClick={() => onEditUser(item.userId)}
          >
            Edit
          </button>
          <button
            type="button"
            className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer mr-1.5"
            onClick={() => setConfirmingId(item.userId)}
          >
            Delete
          </button>
        </>
      );
    },
    [confirmingId, deleting, handleDelete, onEditUser],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-text-primary">Users — {poolName}</h1>
        <button
          type="button"
          className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover cursor-pointer"
          onClick={onCreateUser}
        >
          Create User
        </button>
      </div>

      <EntityTable<UserRow>
        columns={columns}
        data={users}
        keyField="userId"
        actions={renderActions}
        loading={loading}
        emptyMessage="No users in this pool yet."
      />
    </div>
  );
}
