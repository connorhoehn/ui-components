// src/components/identity/admin/AdminDashboardPage.tsx
//
// Overview dashboard showing stats cards, pool list, and quick-action links.

import { useMemo } from 'react';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import EmptyState from '../../shared/EmptyState';

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
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="md">
              <div className="h-5 w-12 rounded bg-slate-100 animate-pulse mb-2" />
              <div className="h-3 w-20 rounded bg-slate-100 animate-pulse" />
            </Card>
          ))}
        </div>
        <Card className="h-[200px] animate-pulse" />
      </div>
    );
  }

  return (
    <PageSection title="Dashboard">
      {/* Stats */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {statsCards.map((s) => (
          <Card key={s.label} padding="md">
            <div className="text-[2rem] font-bold text-info-fg mb-1">{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </Card>
        ))}
      </section>

      {/* Pools */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-slate-900 m-0">User Pools</h2>
        <Card>
          {pools.length === 0 ? (
            <EmptyState title="No pools created yet" actionLabel="Create Pool" onAction={() => onNavigate('/identity/admin/pools/new')} />
          ) : (
            pools.map((pool, i) => (
              <div
                key={pool.poolId}
                className={`flex items-center justify-between px-4 py-3 ${i < pools.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-800">{pool.poolName}</span>
                  <span className="text-xs text-slate-400">{pool.createdAt}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onNavigate(`/identity/admin/pools/${pool.poolId}`)}>
                  View
                </Button>
              </div>
            ))
          )}
        </Card>
      </section>

      {/* Quick Links */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-slate-900 m-0">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="lg" onClick={() => onNavigate('/identity/admin/pools/new')}>
            Create Pool
          </Button>
          <Button variant="secondary" size="lg" onClick={() => onNavigate('/identity/admin/applications/new')}>
            Create Application
          </Button>
          <Button variant="secondary" size="lg" onClick={() => onNavigate('/identity/admin/setup')}>
            Setup Guide
          </Button>
        </div>
      </section>
    </PageSection>
  );
}
