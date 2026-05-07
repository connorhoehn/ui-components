// frontend/src/components/ingest/IngestDashboard.tsx
//
// Overview dashboard for the ingest subsystem. Shows summary cards (total
// sources with status breakdown, items in queue, recent completions, errors),
// a recent activity list, and quick-action buttons.

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useIngestSources } from '../../hooks/useIngestSources';
import { useIngestItems } from '../../hooks/useIngestItems';
import Chip from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { colors, pageContainerStyle, saveBtnStyle, cancelBtnStyle } from '../../constants/styles';
import { useIdentityContext } from '../../contexts/IdentityContext';
import type { IngestItem } from '../../types/ingest';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

/**
 * Dev-only button that posts to /api/ingest/dev/seed-fake-content. Vite gates
 * the import-meta DEV flag to local dev builds; the backend re-enforces the
 * non-prod gate on its end. AGENTIC_ETL_VISION slice J.
 */
function DevSeedButton() {
  const { idToken } = useIdentityContext();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const seed = async (count: number) => {
    setBusy(true);
    setStatus(null);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (idToken) headers['Authorization'] = `Bearer ${idToken}`;
      const res = await fetch(`${BASE_URL}/api/ingest/dev/seed-fake-content`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ count }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = (await res.json()) as { count: number };
      setStatus(`Seeded ${body.count} item${body.count === 1 ? '' : 's'}`);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        data-testid="dev-seed-btn"
        style={cancelBtnStyle}
        onClick={() => void seed(5)}
        disabled={busy}
        title="Dev-only: seed 5 fake ingest items so the UI renders against realistic data"
      >
        {busy ? 'Seeding…' : 'Seed sample data'}
      </button>
      {status ? (
        <span data-testid="dev-seed-status" style={{ fontSize: 11, color: colors.textTertiary }}>
          {status}
        </span>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Static styles
// ---------------------------------------------------------------------------

const styles: Record<string, CSSProperties> = {
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
  },
  title: {
    margin: 0, fontSize: 22, fontWeight: 700, color: colors.textPrimary,
  },
  cardsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20,
  },
  card: {
    padding: 16, background: colors.surface, border: `1px solid ${colors.border}`,
    borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 6,
  },
  cardLabel: {
    fontSize: 12, fontWeight: 500, color: colors.textTertiary, textTransform: 'uppercase' as const, letterSpacing: '0.03em',
  },
  cardValue: {
    fontSize: 28, fontWeight: 700, color: colors.textPrimary, lineHeight: 1,
  },
  cardSub: {
    fontSize: 12, color: colors.textTertiary,
  },
  section: {
    background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10,
    padding: 16, marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14, fontWeight: 600, color: colors.textPrimary, marginBottom: 12,
  },
  activityRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    padding: '8px 0', borderBottom: `1px solid ${colors.border}`,
  },
  activityPath: {
    fontSize: 13, color: colors.textSecondary, fontFamily: 'monospace',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0,
  },
  activityTime: {
    fontSize: 11, color: colors.textTertiary, whiteSpace: 'nowrap', flexShrink: 0,
  },
  quickActions: {
    display: 'flex', gap: 10, alignItems: 'center',
  },
  linkBtn: {
    padding: '6px 14px', fontSize: 13, fontWeight: 500, background: 'none',
    border: `1px solid ${colors.border}`, borderRadius: 6, cursor: 'pointer',
    fontFamily: 'inherit', color: colors.textSecondary,
  },
  errorBanner: {
    padding: '12px 16px', background: '#fef2f2', border: `1px solid ${colors.state.failed}`,
    color: colors.state.failed, borderRadius: 8, display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: 12, marginBottom: 16,
  },
  retryBtn: {
    padding: '6px 14px', fontSize: 13, fontWeight: 500, background: '#fff',
    color: colors.state.failed, border: `1px solid ${colors.state.failed}`,
    borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  return `${Math.floor(d / 86_400_000)}d ago`;
}

function isWithin24h(iso: string): boolean {
  return Date.now() - new Date(iso).getTime() < 86_400_000;
}

function isWithin1h(iso: string): boolean {
  return Date.now() - new Date(iso).getTime() < 3_600_000;
}

/** Queue-depth threshold above which the dashboard surfaces a warning. */
const DASHBOARD_QUEUE_DEPTH_ALERT = 50;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function IngestDashboard() {
  const navigate = useNavigate();
  const { sources, loading: sourcesLoading, error: sourcesError, refresh: refreshSources } = useIngestSources();
  const { items, loading: itemsLoading, error: itemsError, refresh: refreshItems } = useIngestItems();

  const loading = sourcesLoading || itemsLoading;
  const error = sourcesError || itemsError;

  const stats = useMemo(() => {
    const active = sources.filter((s) => s.status === 'active').length;
    const paused = sources.filter((s) => s.status === 'paused').length;
    const errored = sources.filter((s) => s.status === 'error').length;
    const queued = items.filter((i) => i.status !== 'done' && i.status !== 'failed').length;
    const recentDone = items.filter((i) => i.status === 'done' && isWithin24h(i.updatedAt)).length;
    const failed = items.filter((i) => i.status === 'failed').length;
    return { total: sources.length, active, paused, errored, queued, recentDone, failed };
  }, [sources, items]);

  const recentActivity: IngestItem[] = useMemo(() => {
    return items
      .filter((i) => i.status === 'done')
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 5);
  }, [items]);

  /**
   * Threshold-based alerts surfaced as a strip at the top of the dashboard,
   * above the summary cards. AGENTIC_ETL_VISION §F. Currently emits:
   *   - one banner per source with status === 'error'
   *   - one banner if the rolling 1h failure rate exceeds 10%
   *   - one banner if the queue depth exceeds DASHBOARD_QUEUE_DEPTH_ALERT
   */
  const alerts = useMemo(() => {
    const out: Array<{ id: string; level: 'warning' | 'critical'; message: string }> = [];
    for (const s of sources) {
      if (s.status === 'error') {
        out.push({
          id: `source-error-${s.sourceId}`,
          level: 'critical',
          message: `Source "${s.name}" is in error state — check its config or last sync log.`,
        });
      }
    }
    const recent1h = items.filter((i) => isWithin1h(i.updatedAt));
    if (recent1h.length >= 5) {
      const failed1h = recent1h.filter((i) => i.status === 'failed').length;
      const rate = failed1h / recent1h.length;
      if (rate > 0.1) {
        out.push({
          id: 'failure-rate-1h',
          level: 'warning',
          message: `Last-hour failure rate is ${(rate * 100).toFixed(0)}% (${failed1h} of ${recent1h.length} items failed).`,
        });
      }
    }
    if (stats.queued > DASHBOARD_QUEUE_DEPTH_ALERT) {
      out.push({
        id: 'queue-depth',
        level: 'warning',
        message: `Queue depth is ${stats.queued} items — sources may be ingesting faster than the engine can drain.`,
      });
    }
    return out;
  }, [sources, items, stats.queued]);

  const handleRetry = () => {
    void refreshSources();
    void refreshItems();
  };

  if (loading && sources.length === 0 && items.length === 0) {
    return (
      <div data-testid="ingest-dashboard" style={pageContainerStyle}>
        <div style={styles.header}>
          <h2 style={styles.title}>Ingest</h2>
        </div>
        <div style={styles.cardsRow}>
          <SkeletonCard height={90} />
          <SkeletonCard height={90} />
          <SkeletonCard height={90} />
          <SkeletonCard height={90} />
        </div>
        <SkeletonCard height={200} />
      </div>
    );
  }

  return (
    <div data-testid="ingest-dashboard" style={pageContainerStyle}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Ingest</h2>
        <div style={styles.quickActions}>
          {import.meta.env.DEV ? <DevSeedButton /> : null}
          <button
            style={saveBtnStyle(false)}
            onClick={() => navigate('/ingest/sources')}
            data-testid="add-source-btn"
          >
            Add Source
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div style={styles.errorBanner} role="alert">
          <span style={{ fontSize: 13, fontWeight: 500 }}>Failed to load ingest data.</span>
          <button onClick={handleRetry} style={styles.retryBtn}>Retry</button>
        </div>
      )}

      {/* Alerts strip */}
      {alerts.length > 0 && (
        <div data-testid="alerts-strip" style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          {alerts.map((a) => (
            <div
              key={a.id}
              data-testid={`alert-${a.id}`}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 13,
                background: a.level === 'critical' ? '#fef2f2' : '#fefce8',
                border: `1px solid ${a.level === 'critical' ? colors.state.failed : '#fbbf24'}`,
                color: a.level === 'critical' ? colors.state.failed : '#92400e',
              }}
            >
              <strong>{a.level === 'critical' ? '⛔' : '⚠'}</strong> {a.message}
            </div>
          ))}
        </div>
      )}

      {/* Summary cards */}
      <div style={styles.cardsRow}>
        <div style={styles.card}>
          <span style={styles.cardLabel}>Sources</span>
          <span style={styles.cardValue}>{stats.total}</span>
          <span style={styles.cardSub}>
            {stats.active} active, {stats.paused} paused{stats.errored > 0 ? `, ${stats.errored} error` : ''}
          </span>
        </div>
        <div style={styles.card}>
          <span style={styles.cardLabel}>In Queue</span>
          <span style={{ ...styles.cardValue, color: stats.queued > 0 ? colors.state.awaiting : colors.textPrimary }}>
            {stats.queued}
          </span>
          <span style={styles.cardSub}>items processing</span>
        </div>
        <div style={styles.card}>
          <span style={styles.cardLabel}>Completed (24h)</span>
          <span style={{ ...styles.cardValue, color: stats.recentDone > 0 ? colors.state.completed : colors.textPrimary }}>
            {stats.recentDone}
          </span>
          <span style={styles.cardSub}>items ingested</span>
        </div>
        <div style={styles.card}>
          <span style={styles.cardLabel}>Errors</span>
          <span style={{ ...styles.cardValue, color: stats.failed > 0 ? colors.state.failed : colors.textPrimary }}>
            {stats.failed}
          </span>
          <span style={styles.cardSub}>items failed</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Recent Activity</div>
        {recentActivity.length === 0 ? (
          <EmptyState
            icon="📥"
            title="No recent activity"
            body="Completed ingest items will appear here."
          />
        ) : (
          <div>
            {recentActivity.map((item) => (
              <div key={item.itemId} style={styles.activityRow}>
                <span style={styles.activityPath} title={item.sourcePath}>
                  {item.sourcePath}
                </span>
                <Chip tone="success" size="xs">done</Chip>
                <span style={styles.activityTime}>{relativeTime(item.updatedAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
