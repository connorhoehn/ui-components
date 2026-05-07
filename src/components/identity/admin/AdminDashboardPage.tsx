// src/components/identity/admin/AdminDashboardPage.tsx
//
// Overview dashboard showing stats cards, pool list, and quick-action links.

import { useMemo } from 'react';
import { cn } from '../../../lib/cn';

export interface AdminDashboardPageProps {
  stats: { userPools: number; clients: number; totalUsers: number };
  pools: Array<{ poolId: string; poolName: string; createdAt: string }>;
  onNavigate: (path: string) => void;
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AdminDashboardPage({ stats, pools, onNavigate, loading }: AdminDashboardPageProps) {
  const statsCards = useMemo(
    () => [
      { label: 'User Pools', value: stats.userPools },
      { label: 'Applications', value: stats.clients },
      { label: 'Total Users', value: stats.totalUsers },
    ],
    [stats],
  );

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-border rounded-md h-[60px] opacity-50"
            />
          ))}
        </div>
        <div className="bg-border rounded-md h-[60px] opacity-50" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {statsCards.map((s) => (
          <div key={s.label} className="bg-surface border border-border rounded-md p-4 shadow-sm">
            <div className="text-[2rem] font-bold text-primary mb-1">{s.value}</div>
            <div className="text-sm text-text-secondary">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Pools */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-2">User Pools</h2>
        <div className="bg-surface border border-border rounded-md p-0 overflow-hidden shadow-sm">
          {pools.length === 0 ? (
            <p className="p-4 text-text-tertiary text-center">
              No pools created yet.
            </p>
          ) : (
            pools.map((pool) => (
              <div key={pool.poolId} className="flex items-center justify-between px-4 py-2 border-b border-border">
                <div>
                  <span className="font-medium text-text-primary">{pool.poolName}</span>
                  <span className="ml-3 text-sm text-text-tertiary">
                    {pool.createdAt}
                  </span>
                </div>
                <button
                  type="button"
                  className="bg-transparent border-none text-primary cursor-pointer text-sm font-medium p-0 underline"
                  onClick={() => onNavigate(`/identity/admin/pools/${pool.poolId}`)}
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-sm border border-primary bg-transparent text-primary text-sm font-medium cursor-pointer"
            onClick={() => onNavigate('/identity/admin/pools/new')}
          >
            Create Pool
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-sm border border-primary bg-transparent text-primary text-sm font-medium cursor-pointer"
            onClick={() => onNavigate('/identity/admin/applications/new')}
          >
            Create Application
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-sm border border-primary bg-transparent text-primary text-sm font-medium cursor-pointer"
            onClick={() => onNavigate('/identity/admin/setup')}
          >
            Setup Guide
          </button>
        </div>
      </section>
    </div>
  );
}
