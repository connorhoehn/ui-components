// src/components/identity/admin/MfaManagementPage.tsx
//
// MFA overview with adoption metrics, user MFA status table, and pool filter.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { StatusBadge } from '../shared/StatusBadge';

export interface MfaManagementPageProps {
  metrics?: {
    totalUsers: number;
    mfaEnabled: number;
    mfaDisabled: number;
    adoptionRate: number;
  };
  users?: Array<{
    userId: string;
    email: string;
    mfaEnabled: boolean;
    deviceCount: number;
  }>;
  pools?: Array<{ poolId: string; poolName: string; userCount: number }>;
  onRefresh: () => void;
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ui-spacingLg)',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeLg)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
};

const refreshBtnStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  fontSize: 'var(--ui-fontSizeSm)',
  cursor: 'pointer',
  font: 'inherit',
};

const metricsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: 'var(--ui-spacingMd)',
};

const metricCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--ui-surface)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusMd)',
  padding: 'var(--ui-spacingMd)',
  boxShadow: 'var(--ui-shadowSm)',
};

const metricValueStyle: React.CSSProperties = {
  fontSize: '1.75rem',
  fontWeight: 700,
  color: 'var(--ui-primary)',
  marginBottom: '4px',
};

const metricLabelStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textSecondary)',
};

const filterRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--ui-spacingSm)',
};

const selectStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
};

const skeletonStyle: React.CSSProperties = {
  height: '60px',
  borderRadius: 'var(--ui-radiusMd)',
  backgroundColor: 'var(--ui-border)',
  opacity: 0.5,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type UserRow = NonNullable<MfaManagementPageProps['users']>[number];

export function MfaManagementPage({
  metrics,
  users,
  pools,
  onRefresh,
  loading,
}: MfaManagementPageProps) {
  const [selectedPool, setSelectedPool] = useState('');

  const filteredUsers = useMemo(() => users ?? [], [users]);

  const columns: Column<UserRow>[] = useMemo(
    () => [
      { key: 'email', header: 'Email', sortable: true },
      {
        key: 'mfaEnabled',
        header: 'MFA Status',
        render: (item) => (
          <StatusBadge
            status={item.mfaEnabled ? 'Enabled' : 'Disabled'}
            variant={item.mfaEnabled ? 'success' : 'warning'}
          />
        ),
      },
      { key: 'deviceCount', header: 'Devices' },
    ],
    [],
  );

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={metricsGridStyle}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ ...metricCardStyle, ...skeletonStyle }} />
          ))}
        </div>
        <div style={skeletonStyle} />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>MFA Management</h1>
        <button type="button" style={refreshBtnStyle} onClick={onRefresh}>
          Refresh
        </button>
      </div>

      {/* Metrics */}
      {metrics && (
        <section style={metricsGridStyle}>
          <div style={metricCardStyle}>
            <div style={metricValueStyle}>{metrics.totalUsers}</div>
            <div style={metricLabelStyle}>Total Users</div>
          </div>
          <div style={metricCardStyle}>
            <div style={{ ...metricValueStyle, color: 'var(--ui-success)' }}>{metrics.mfaEnabled}</div>
            <div style={metricLabelStyle}>MFA Enabled</div>
          </div>
          <div style={metricCardStyle}>
            <div style={{ ...metricValueStyle, color: 'var(--ui-warning)' }}>{metrics.mfaDisabled}</div>
            <div style={metricLabelStyle}>MFA Disabled</div>
          </div>
          <div style={metricCardStyle}>
            <div style={metricValueStyle}>{metrics.adoptionRate}%</div>
            <div style={metricLabelStyle}>Adoption Rate</div>
          </div>
        </section>
      )}

      {/* Pool filter */}
      {pools && pools.length > 0 && (
        <div style={filterRowStyle}>
          <label style={{ fontSize: 'var(--ui-fontSizeSm)', color: 'var(--ui-textSecondary)' }}>
            Filter by pool:
          </label>
          <select
            style={selectStyle}
            value={selectedPool}
            onChange={(e) => setSelectedPool(e.target.value)}
          >
            <option value="">All Pools</option>
            {pools.map((p) => (
              <option key={p.poolId} value={p.poolId}>
                {p.poolName} ({p.userCount} users)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* User table */}
      <EntityTable<UserRow>
        columns={columns}
        data={filteredUsers}
        keyField="userId"
        emptyMessage="No user MFA data available."
      />
    </div>
  );
}
