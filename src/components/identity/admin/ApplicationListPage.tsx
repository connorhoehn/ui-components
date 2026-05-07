// src/components/identity/admin/ApplicationListPage.tsx
//
// Lists OAuth/OIDC applications with pool info and redirect URIs.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';

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
// Styles
// ---------------------------------------------------------------------------

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 'var(--ui-spacingMd)',
  flexWrap: 'wrap',
  gap: 'var(--ui-spacingSm)',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeLg)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
};

const btnGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--ui-spacingSm)',
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

const secondaryBtnStyle: React.CSSProperties = {
  ...createBtnStyle,
  backgroundColor: 'transparent',
  border: '1px solid var(--ui-primary)',
  color: 'var(--ui-primary)',
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

const uriListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textSecondary)',
};

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
          <div style={uriListStyle}>
            {item.redirectUris.slice(0, 2).map((uri) => (
              <span key={uri}>{uri}</span>
            ))}
            {item.redirectUris.length > 2 && (
              <span style={{ color: 'var(--ui-textMuted)' }}>
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
          <span style={confirmStyle}>
            Are you sure?
            <button
              type="button"
              style={{ ...dangerBtnStyle, fontWeight: 600 }}
              onClick={() => handleDelete(item.clientId)}
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
          <button type="button" style={actionBtnStyle} onClick={() => onEditApp(item.clientId)}>
            Edit
          </button>
          <button type="button" style={dangerBtnStyle} onClick={() => setConfirmingId(item.clientId)}>
            Delete
          </button>
        </>
      );
    },
    [confirmingId, deleting, handleDelete, onEditApp],
  );

  return (
    <div>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Applications</h1>
        <div style={btnGroupStyle}>
          <button type="button" style={createBtnStyle} onClick={onCreateApp}>
            New Application
          </button>
          <button type="button" style={secondaryBtnStyle} onClick={onCreateAppWithPool}>
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
