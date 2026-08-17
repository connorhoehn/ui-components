// src/components/identity/admin/ApplicationListPage.tsx
//
// Lists OAuth/OIDC applications with pool info and redirect URIs.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import Chip from '../../shared/Chip';
import ConfirmDialog from '../../shared/ConfirmDialog';

export interface ApplicationListPageProps {
  applications: Array<{
    clientId: string;
    clientName: string;
    poolId: string;
    poolName?: string;
    redirectUris: string[];
  }>;
  onCreateApp: () => void;
  onCreateAppWithPool: () => void;
  onEditApp: (clientId: string) => void;
  onDeleteApp: (clientId: string) => Promise<void>;
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type AppRow = ApplicationListPageProps['applications'][number];

export function ApplicationListPage({
  applications,
  onCreateApp,
  onCreateAppWithPool,
  onEditApp,
  onDeleteApp,
  loading,
}: ApplicationListPageProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = useCallback(
    async (clientId: string) => {
      setDeleting(true);
      try {
        await onDeleteApp(clientId);
      } finally {
        setDeleting(false);
        setConfirmingId(null);
      }
    },
    [onDeleteApp],
  );

  const columns: Column<AppRow>[] = useMemo(
    () => [
      { key: 'clientName', header: 'Name', sortable: true },
      {
        key: 'clientId',
        header: 'Client ID',
        render: (item) => (
          <span className="font-mono text-xs text-neutral">{item.clientId}</span>
        ),
      },
      { key: 'poolName', header: 'Pool', render: (item) => item.poolName || item.poolId },
      {
        key: 'redirectUris',
        header: 'Redirect URIs',
        render: (item) => (
          <div className="flex flex-wrap gap-1">
            {item.redirectUris.slice(0, 2).map((uri) => (
              <Chip key={uri} tone="neutral" size="xs">{uri}</Chip>
            ))}
            {item.redirectUris.length > 2 && (
              <Chip tone="neutral" size="xs">+{item.redirectUris.length - 2} more</Chip>
            )}
          </div>
        ),
      },
    ],
    [],
  );

  const renderActions = useCallback(
    (item: AppRow) => (
      <>
        <Button variant="ghost" size="sm" onClick={() => onEditApp(item.clientId)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => setConfirmingId(item.clientId)}>
          Delete
        </Button>
      </>
    ),
    [onEditApp],
  );

  return (
    <PageSection
      title="Applications"
      actions={
        <>
          <Button variant="primary" size="lg" onClick={onCreateApp}>
            New Application
          </Button>
          <Button variant="secondary" size="lg" onClick={onCreateAppWithPool}>
            New App + Pool
          </Button>
        </>
      }
    >
      <EntityTable<AppRow>
        columns={columns}
        data={applications}
        keyField="clientId"
        actions={renderActions}
        loading={loading}
        emptyMessage="No applications registered yet."
        emptyIcon="🔐"
      />

      <ConfirmDialog
        open={!!confirmingId}
        onConfirm={() => confirmingId && handleDelete(confirmingId)}
        onCancel={() => setConfirmingId(null)}
        title="Delete Application"
        body="This action cannot be undone. The application will lose access immediately."
        tone="destructive"
        confirmLabel="Delete"
        confirmDisabled={deleting}
      />
    </PageSection>
  );
}
