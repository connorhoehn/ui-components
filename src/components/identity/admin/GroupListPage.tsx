// src/components/identity/admin/GroupListPage.tsx
//
// Lists groups within a pool with permission badges and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import Chip from '../../shared/Chip';
import ConfirmDialog from '../../shared/ConfirmDialog';

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
              ? <span className="text-slate-400 text-xs">None</span>
              : item.permissions.map((p) => (
                  <Chip key={p} tone="info" size="xs">{p}</Chip>
                ))}
          </div>
        ),
      },
    ],
    [],
  );

  const renderActions = useCallback(
    (item: GroupRow) => (
      <>
        <Button variant="ghost" size="sm" onClick={() => onEditGroup(item.groupId)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => setConfirmingId(item.groupId)}>
          Delete
        </Button>
      </>
    ),
    [onEditGroup],
  );

  return (
    <PageSection
      title={`Groups — ${poolName}`}
      actions={
        <Button variant="primary" size="lg" onClick={onCreateGroup}>
          Create Group
        </Button>
      }
    >
      <EntityTable<GroupRow>
        columns={columns}
        data={groups}
        keyField="groupId"
        actions={renderActions}
        loading={loading}
        emptyMessage="No groups in this pool yet."
        emptyIcon="👥"
      />

      <ConfirmDialog
        open={!!confirmingId}
        onConfirm={() => confirmingId && handleDelete(confirmingId)}
        onCancel={() => setConfirmingId(null)}
        title="Delete Group"
        body="This action cannot be undone. Members will lose their group permissions."
        tone="destructive"
        confirmLabel="Delete"
        confirmDisabled={deleting}
      />
    </PageSection>
  );
}
