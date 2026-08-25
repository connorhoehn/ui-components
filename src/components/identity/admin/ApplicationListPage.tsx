// src/components/identity/admin/ApplicationListPage.tsx
//
// Lists OAuth/OIDC applications with pool info and redirect URIs.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import Chip from '../../shared/Chip';
import ConfirmDialog from '../../shared/ConfirmDialog';
import Banner from '../../shared/Banner';

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
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // A rejected delete used to be swallowed whole: the close lived in
  // `finally`, so a 403/409/500 dismissed the dialog exactly like a success
  // while the row stayed in the table and nothing was ever shown or logged.
  // The admin's only clue was the row not disappearing, which reads as a
  // stale list — so the usual response was to reload and try again. Close on
  // success only; on failure keep the dialog up and name the reason.
  const handleDelete = useCallback(
    async (clientId: string) => {
      setDeleting(true);
      setDeleteError(null);
      try {
        await onDeleteApp(clientId);
        setConfirmingId(null);
      } catch (err: unknown) {
        setDeleteError(err instanceof Error ? err.message : 'Failed to delete application.');
      } finally {
        setDeleting(false);
      }
    },
    [onDeleteApp],
  );

  const closeConfirm = useCallback(() => {
    setConfirmingId(null);
    setDeleteError(null);
  }, []);

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
        render: (item) => {
          // `redirectUris` is typed required, but a client_credentials-only
          // application legitimately has none and OIDC registration responses
          // routinely omit empty arrays. This render runs inside DataTable's
          // row map, so `undefined.slice` took the ENTIRE applications table
          // down — all the well-formed rows with it — and left a white page.
          const uris = Array.isArray(item.redirectUris) ? item.redirectUris : [];
          return (
            <div className="flex flex-wrap gap-1">
              {uris.length === 0 && (
                <span className="text-text-tertiary text-xs">None</span>
              )}
              {uris.slice(0, 2).map((uri) => (
                <Chip key={uri} tone="neutral" size="xs">{uri}</Chip>
              ))}
              {uris.length > 2 && (
                <Chip tone="neutral" size="xs">+{uris.length - 2} more</Chip>
              )}
            </div>
          );
        },
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
        <Button
          variant="danger"
          size="sm"
          onClick={() => { setConfirmingId(item.clientId); setDeleteError(null); }}
        >
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
        onConfirm={() => { if (confirmingId) void handleDelete(confirmingId); }}
        onCancel={closeConfirm}
        title="Delete Application"
        body="This action cannot be undone. The application will lose access immediately."
        tone="destructive"
        confirmLabel="Delete"
        confirmDisabled={deleting}
      >
        {deleteError && <Banner variant="error">{deleteError}</Banner>}
      </ConfirmDialog>
    </PageSection>
  );
}
