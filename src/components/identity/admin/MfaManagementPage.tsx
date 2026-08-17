// src/components/identity/admin/MfaManagementPage.tsx
//
// MFA overview with adoption metrics, user MFA status table, and pool filter.

import { useState, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { StatusBadge } from '../shared/StatusBadge';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';

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
        width: '140px',
        render: (item) => (
          <StatusBadge
            status={item.mfaEnabled ? 'ENABLED' : 'DISABLED'}
            variant={item.mfaEnabled ? 'success' : 'warning'}
          />
        ),
      },
      { key: 'deviceCount', header: 'Devices', width: '100px' },
    ],
    [],
  );

  if (loading) {
    return (
      <PageSection title="MFA Management">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} padding="md">
              <div className="h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" />
              <div className="h-3 w-20 rounded bg-surface-hover animate-pulse" />
            </Card>
          ))}
        </div>
        <Card className="h-[200px] animate-pulse" />
      </PageSection>
    );
  }

  const inputClass = 'px-3 py-2 text-sm border border-border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-info focus:border-info transition-shadow';

  return (
    <PageSection
      title="MFA Management"
      actions={
        <Button variant="ghost" size="lg" onClick={onRefresh}>
          Refresh
        </Button>
      }
    >
      {/* Metrics */}
      {metrics && (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
          <Card padding="md">
            <div className="text-[1.75rem] font-bold text-info-fg mb-1">{metrics.totalUsers}</div>
            <div className="text-sm text-neutral">Total Users</div>
          </Card>
          <Card padding="md">
            <div className="text-[1.75rem] font-bold text-success-fg mb-1">{metrics.mfaEnabled}</div>
            <div className="text-sm text-neutral">MFA Enabled</div>
          </Card>
          <Card padding="md">
            <div className="text-[1.75rem] font-bold text-warning-fg mb-1">{metrics.mfaDisabled}</div>
            <div className="text-sm text-neutral">MFA Disabled</div>
          </Card>
          <Card padding="md">
            <div className="text-[1.75rem] font-bold text-info-fg mb-1">{metrics.adoptionRate}%</div>
            <div className="text-sm text-neutral">Adoption Rate</div>
          </Card>
        </section>
      )}

      {/* Pool filter */}
      {pools && pools.length > 0 && (
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-neutral uppercase tracking-wide">
            Filter by pool
          </label>
          <select className={inputClass} value={selectedPool} onChange={(e) => setSelectedPool(e.target.value)}>
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
        emptyIcon="🔑"
      />
    </PageSection>
  );
}
