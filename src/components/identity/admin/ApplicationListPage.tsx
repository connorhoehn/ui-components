// src/components/identity/admin/ApplicationListPage.tsx
//
// Lists OAuth/OIDC applications with pool info and redirect URIs.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { cn } from '../../../lib/cn';

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
      { key: 'clientId', header: 'Client ID' },
      { key: 'poolName', header: 'Pool', render: (item) => item.poolName || item.poolId },
      {
        key: 'redirectUris',
        header: 'Redirect URIs',
        render: (item) => (
          <div className="flex flex-col gap-0.5 text-sm text-text-secondary">
            {item.redirectUris.slice(0, 2).map((uri) => (
              <span key={uri}>{uri}</span>
            ))}
            {item.redirectUris.length > 2 && (
              <span className="text-text-tertiary">
                +{item.redirectUris.length - 2} more
              </span>
            )}
          </div>
        ),
      },
    ],
    [],
  );

  const renderActions = useCallback(
    (item: AppRow) => {
      if (confirmingId === item.clientId) {
        return (
          <span className="inline-flex items-center gap-1.5 text-sm text-danger">
            Are you sure?
            <button
              type="button"
              className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer font-semibold mr-1.5"
              onClick={() => handleDelete(item.clientId)}
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
            onClick={() => onEditApp(item.clientId)}
          >
            Edit
          </button>
          <button
            type="button"
            className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer mr-1.5"
            onClick={() => setConfirmingId(item.clientId)}
          >
            Delete
          </button>
        </>
      );
    },
    [confirmingId, deleting, handleDelete, onEditApp],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h1 className="text-lg font-semibold text-text-primary">Applications</h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-primary text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-primary-hover cursor-pointer"
            onClick={onCreateApp}
          >
            New Application
          </button>
          <button
            type="button"
            className="bg-transparent border border-primary text-primary font-medium rounded-sm px-4 py-2 text-sm cursor-pointer"
            onClick={onCreateAppWithPool}
          >
            New App + Pool
          </button>
        </div>
      </div>

      <EntityTable<AppRow>
        columns={columns}
        data={applications}
        keyField="clientId"
        actions={renderActions}
        loading={loading}
        emptyMessage="No applications registered yet."
      />
    </div>
  );
}
