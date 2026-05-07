// src/components/identity/admin/GroupListPage.tsx
//
// Lists groups within a pool with permission badges and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { StatusBadge } from '../shared/StatusBadge';

export interface GroupListPageProps {
  groups: Array<{
    groupId: string;
    groupName: string;
    description?: string;
    permissions: string[];
  }>;
  poolId: string;
  poolName: string;
  onCreateGroup: () => void;
  onEditGroup: (groupId: string) => void;
  onDeleteGroup: (groupId: string) => Promise<void>;
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

const badgeListStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type GroupRow = GroupListPageProps['groups'][number];

export function GroupListPage({
  groups,
  poolName,
  onCreateGroup,
  onEditGroup,
  onDeleteGroup,
  loading,
}: GroupListPageProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = useCallback(
    async (groupId: string) => {
      setDeleting(true);
      try {
        await onDeleteGroup(groupId);
      } finally {
        setDeleting(false);
        setConfirmingId(null);
      }
    },
    [onDeleteGroup],
  );

  const columns: Column<GroupRow>[] = useMemo(
    () => [
      { key: 'groupName', header: 'Name', sortable: true },
      { key: 'description', header: 'Description' },
      {
        key: 'permissions',
        header: 'Permissions',
        render: (item) => (
          <div style={badgeListStyle}>
            {item.permissions.length === 0
              ? <span style={{ color: 'var(--ui-textMuted)' }}>None</span>
              : item.permissions.map((p) => (
                  <StatusBadge key={p} status={p} variant="info" />
                ))}
          </div>
        ),
      },
    ],
    [],
  );

  const renderActions = useCallback(
    (item: GroupRow) => {
      if (confirmingId === item.groupId) {
        return (
          <span style={confirmStyle}>
            Are you sure?
            <button
              type="button"
              style={{ ...dangerBtnStyle, fontWeight: 600 }}
              onClick={() => handleDelete(item.groupId)}
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
          <button type="button" style={actionBtnStyle} onClick={() => onEditGroup(item.groupId)}>
            Edit
          </button>
          <button type="button" style={dangerBtnStyle} onClick={() => setConfirmingId(item.groupId)}>
            Delete
          </button>
        </>
      );
    },
    [confirmingId, deleting, handleDelete, onEditGroup],
  );

  return (
    <div>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Groups — {poolName}</h1>
        <button type="button" style={createBtnStyle} onClick={onCreateGroup}>
          Create Group
        </button>
      </div>

      <EntityTable<GroupRow>
        columns={columns}
        data={groups}
        keyField="groupId"
        actions={renderActions}
        loading={loading}
        emptyMessage="No groups in this pool yet."
      />
    </div>
  );
}
