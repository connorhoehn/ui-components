// src/components/identity/admin/GroupListPage.tsx
//
// Lists groups within a pool with permission badges and CRUD actions.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import Chip from '../../shared/Chip';
import ConfirmDialog from '../../shared/ConfirmDialog';
import Banner from '../../shared/Banner';

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
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // A rejected delete used to be swallowed whole: the close lived in
  // `finally`, so a 403/409/500 dismissed the dialog exactly like a success
  // while the row stayed in the table and nothing was ever shown or logged.
  // The admin's only clue was the row not disappearing, which reads as a
  // stale list — so the usual response was to reload and try again. Close on
  // success only; on failure keep the dialog up and name the reason.
  const handleDelete = useCallback(
    async (groupId: string) => {
      setDeleting(true);
      setDeleteError(null);
      try {
        await onDeleteGroup(groupId);
        setConfirmingId(null);
      } catch (err: unknown) {
        setDeleteError(err instanceof Error ? err.message : 'Failed to delete group.');
      } finally {
        setDeleting(false);
      }
    },
    [onDeleteGroup],
  );

  const closeConfirm = useCallback(() => {
    setConfirmingId(null);
    setDeleteError(null);
  }, []);

  const columns: Column<GroupRow>[] = useMemo(
    () => [
      { key: 'groupName', header: 'Name', sortable: true },
      { key: 'description', header: 'Description' },
      {
        key: 'permissions',
        header: 'Permissions',
        render: (item) => {
          // The empty-array case was handled; the *absent* case wasn't, and a
          // server that omits empty arrays (the common wire shape for a group
          // with no permissions yet) is what actually arrives. This render runs
          // inside DataTable's row map, so one such group blanked the whole
          // groups table rather than one cell.
          const permissions = Array.isArray(item.permissions) ? item.permissions : [];
          return (
            <div className="flex flex-wrap gap-1">
              {permissions.length === 0
                ? <span className="text-text-tertiary text-xs">None</span>
                : permissions.map((p) => (
                    <Chip key={p} tone="info" size="xs">{p}</Chip>
                  ))}
            </div>
          );
        },
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
        <Button
          variant="danger"
          size="sm"
          onClick={() => { setConfirmingId(item.groupId); setDeleteError(null); }}
        >
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
        onConfirm={() => { if (confirmingId) void handleDelete(confirmingId); }}
        onCancel={closeConfirm}
        title="Delete Group"
        body="This action cannot be undone. Members will lose their group permissions."
        tone="destructive"
        confirmLabel="Delete"
        confirmDisabled={deleting}
      >
        {deleteError && <Banner variant="error">{deleteError}</Banner>}
      </ConfirmDialog>
    </PageSection>
  );
}
