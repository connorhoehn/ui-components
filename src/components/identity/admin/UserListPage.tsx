// src/components/identity/admin/UserListPage.tsx
//
// Lists users within a specific pool with status badges and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { StatusBadge } from '../shared/StatusBadge';

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
          <span style={confirmStyle}>
            Are you sure?
            <button
              type="button"
              style={{ ...dangerBtnStyle, fontWeight: 600 }}
              onClick={() => handleDelete(item.userId)}
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
          <button type="button" style={actionBtnStyle} onClick={() => onEditUser(item.userId)}>
            Edit
          </button>
          <button type="button" style={dangerBtnStyle} onClick={() => setConfirmingId(item.userId)}>
            Delete
          </button>
        </>
      );
    },
    [confirmingId, deleting, handleDelete, onEditUser],
  );

  return (
    <div>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Users — {poolName}</h1>
        <button type="button" style={createBtnStyle} onClick={onCreateUser}>
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
