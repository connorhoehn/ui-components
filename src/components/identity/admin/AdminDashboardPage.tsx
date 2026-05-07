// src/components/identity/admin/AdminDashboardPage.tsx
//
// Overview dashboard showing stats cards, pool list, and quick-action links.

import { useMemo } from 'react';

export interface AdminDashboardPageProps {
  stats: { userPools: number; clients: number; totalUsers: number };
  pools: Array<{ poolId: string; poolName: string; createdAt: string }>;
  onNavigate: (path: string) => void;
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

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 'var(--ui-spacingMd)',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--ui-surface)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusMd)',
  padding: 'var(--ui-spacingMd)',
  boxShadow: 'var(--ui-shadowSm)',
};

const statValueStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 700,
  color: 'var(--ui-primary)',
  marginBottom: '4px',
};

const statLabelStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textSecondary)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeLg)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
  marginBottom: 'var(--ui-spacingSm)',
};

const poolRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--ui-spacingSm) var(--ui-spacingMd)',
  borderBottom: '1px solid var(--ui-border)',
};

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--ui-primary)',
  cursor: 'pointer',
  fontSize: 'var(--ui-fontSizeSm)',
  fontWeight: 500,
  padding: 0,
  textDecoration: 'underline',
  font: 'inherit',
};

const quickLinksStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--ui-spacingSm)',
};

const quickLinkBtnStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 'var(--ui-radiusSm)',
  border: '1px solid var(--ui-primary)',
  backgroundColor: 'transparent',
  color: 'var(--ui-primary)',
  fontSize: 'var(--ui-fontSizeSm)',
  fontWeight: 500,
  cursor: 'pointer',
  font: 'inherit',
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
      <div style={pageStyle}>
        <div style={statsGridStyle}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ ...cardStyle, ...skeletonStyle }} />
          ))}
        </div>
        <div style={skeletonStyle} />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Stats */}
      <section style={statsGridStyle}>
        {statsCards.map((s) => (
          <div key={s.label} style={cardStyle}>
            <div style={statValueStyle}>{s.value}</div>
            <div style={statLabelStyle}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Pools */}
      <section>
        <h2 style={sectionTitleStyle}>User Pools</h2>
        <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
          {pools.length === 0 ? (
            <p style={{ padding: 'var(--ui-spacingMd)', color: 'var(--ui-textMuted)', textAlign: 'center' }}>
              No pools created yet.
            </p>
          ) : (
            pools.map((pool) => (
              <div key={pool.poolId} style={poolRowStyle}>
                <div>
                  <span style={{ fontWeight: 500, color: 'var(--ui-textPrimary)' }}>{pool.poolName}</span>
                  <span style={{ marginLeft: '12px', fontSize: 'var(--ui-fontSizeSm)', color: 'var(--ui-textMuted)' }}>
                    {pool.createdAt}
                  </span>
                </div>
                <button
                  type="button"
                  style={linkBtnStyle}
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
        <h2 style={sectionTitleStyle}>Quick Actions</h2>
        <div style={quickLinksStyle}>
          <button
            type="button"
            style={quickLinkBtnStyle}
            onClick={() => onNavigate('/identity/admin/pools/new')}
          >
            Create Pool
          </button>
          <button
            type="button"
            style={quickLinkBtnStyle}
            onClick={() => onNavigate('/identity/admin/applications/new')}
          >
            Create Application
          </button>
          <button
            type="button"
            style={quickLinkBtnStyle}
            onClick={() => onNavigate('/identity/admin/setup')}
          >
            Setup Guide
          </button>
        </div>
      </section>
    </div>
  );
}
