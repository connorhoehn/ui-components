// src/components/identity/admin/GroupListPage.tsx
//
// Lists groups within a pool with permission badges and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { StatusBadge } from '../shared/StatusBadge';
import { cn } from '../../../lib/cn';

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
          <div className="flex flex-wrap gap-1">
            {item.permissions.length === 0
              ? <span className="text-text-tertiary">None</span>
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
          <span className="inline-flex items-center gap-1.5 text-sm text-danger">
            Are you sure?
            <button
              type="button"
              className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer font-semibold mr-1.5"
              onClick={() => handleDelete(item.groupId)}
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
            onClick={() => onEditGroup(item.groupId)}
          >
            Edit
          </button>
          <button
            type="button"
            className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer mr-1.5"
            onClick={() => setConfirmingId(item.groupId)}
          >
            Delete
          </button>
        </>
      );
    },
    [confirmingId, deleting, handleDelete, onEditGroup],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-text-primary">Groups — {poolName}</h1>
        <button
          type="button"
          className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover cursor-pointer"
          onClick={onCreateGroup}
        >
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
