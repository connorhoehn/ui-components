// src/components/identity/admin/MfaManagementPage.tsx
//
// MFA overview with adoption metrics, user MFA status table, and pool filter.

import { useState, useCallback, useMemo } from 'react';
import { EntityTable, type Column } from '../shared/EntityTable';
import { StatusBadge } from '../shared/StatusBadge';
import { cn } from '../../../lib/cn';

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
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-border rounded-md h-[60px] opacity-50" />
          ))}
        </div>
        <div className="bg-border rounded-md h-[60px] opacity-50" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-text-primary">MFA Management</h1>
        <button
          type="button"
          className="px-4 py-2 border border-border rounded-sm bg-surface text-text-primary text-sm cursor-pointer"
          onClick={onRefresh}
        >
          Refresh
        </button>
      </div>

      {/* Metrics */}
      {metrics && (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
          <div className="bg-surface border border-border rounded-md p-4 shadow-sm">
            <div className="text-[1.75rem] font-bold text-primary mb-1">{metrics.totalUsers}</div>
            <div className="text-sm text-text-secondary">Total Users</div>
          </div>
          <div className="bg-surface border border-border rounded-md p-4 shadow-sm">
            <div className="text-[1.75rem] font-bold text-success mb-1">{metrics.mfaEnabled}</div>
            <div className="text-sm text-text-secondary">MFA Enabled</div>
          </div>
          <div className="bg-surface border border-border rounded-md p-4 shadow-sm">
            <div className="text-[1.75rem] font-bold text-warning mb-1">{metrics.mfaDisabled}</div>
            <div className="text-sm text-text-secondary">MFA Disabled</div>
          </div>
          <div className="bg-surface border border-border rounded-md p-4 shadow-sm">
            <div className="text-[1.75rem] font-bold text-primary mb-1">{metrics.adoptionRate}%</div>
            <div className="text-sm text-text-secondary">Adoption Rate</div>
          </div>
        </section>
      )}

      {/* Pool filter */}
      {pools && pools.length > 0 && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-secondary">
            Filter by pool:
          </label>
          <select
            className="p-2 text-base border border-border rounded-sm bg-surface text-text-primary"
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
