// frontend/src/components/ingest/IngestDashboard.tsx
//
// Overview dashboard for the ingest subsystem. Shows summary cards (total
// sources with status breakdown, items in queue, recent completions, errors),
// a recent activity list, and quick-action buttons.

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useIngestSources } from '../../hooks/useIngestSources';
import { useIngestItems } from '../../hooks/useIngestItems';
import Chip from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { cn } from '../../lib/cn';
import { useIdentityContext } from '../../contexts/IdentityContext';
import type { IngestItem } from '../../types/ingest';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

/**
 * Dev-only button that posts to /api/ingest/dev/seed-fake-content.
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
    <div className="flex items-center gap-2">
      <button
        data-testid="dev-seed-btn"
        className="px-3 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary"
        onClick={() => void seed(5)}
        disabled={busy}
        title="Dev-only: seed 5 fake ingest items so the UI renders against realistic data"
      >
        {busy ? 'Seeding…' : 'Seed sample data'}
      </button>
      {status ? (
        <span data-testid="dev-seed-status" className="text-[11px] text-text-tertiary">
          {status}
        </span>
      ) : null}
    </div>
  );
}

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
      <div data-testid="ingest-dashboard" className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="m-0 text-[22px] font-bold text-text-primary">Ingest</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5">
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
    <div data-testid="ingest-dashboard" className="p-6 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="m-0 text-[22px] font-bold text-text-primary">Ingest</h2>
        <div className="flex gap-2.5 items-center">
          {import.meta.env.DEV ? <DevSeedButton /> : null}
          <button
            className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]"
            onClick={() => navigate('/ingest/sources')}
            data-testid="add-source-btn"
          >
            Add Source
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4" role="alert">
          <span className="text-[13px] font-medium">Failed to load ingest data.</span>
          <button
            onClick={handleRetry}
            className="px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]"
          >
            Retry
          </button>
        </div>
      )}

      {/* Alerts strip */}
      {alerts.length > 0 && (
        <div data-testid="alerts-strip" className="flex flex-col gap-1.5 mb-3">
          {alerts.map((a) => (
            <div
              key={a.id}
              data-testid={`alert-${a.id}`}
              className={cn(
                'px-3 py-2 rounded-md text-[13px] border',
                a.level === 'critical'
                  ? 'bg-danger-bg border-[var(--color-state-failed)] text-[var(--color-state-failed)]'
                  : 'bg-warning-bg border-warning text-warning-fg',
              )}
            >
              <strong>{a.level === 'critical' ? '⛔' : '⚠'}</strong> {a.message}
            </div>
          ))}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5">
        <div className="p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wide">Sources</span>
          <span className="text-[28px] font-bold text-text-primary leading-none">{stats.total}</span>
          <span className="text-xs text-text-tertiary">
            {stats.active} active, {stats.paused} paused{stats.errored > 0 ? `, ${stats.errored} error` : ''}
          </span>
        </div>
        <div className="p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wide">In Queue</span>
          <span className={cn('text-[28px] font-bold leading-none', stats.queued > 0 ? 'text-[var(--color-state-awaiting)]' : 'text-text-primary')}>
            {stats.queued}
          </span>
          <span className="text-xs text-text-tertiary">items processing</span>
        </div>
        <div className="p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wide">Completed (24h)</span>
          <span className={cn('text-[28px] font-bold leading-none', stats.recentDone > 0 ? 'text-[var(--color-state-completed)]' : 'text-text-primary')}>
            {stats.recentDone}
          </span>
          <span className="text-xs text-text-tertiary">items ingested</span>
        </div>
        <div className="p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wide">Errors</span>
          <span className={cn('text-[28px] font-bold leading-none', stats.failed > 0 ? 'text-[var(--color-state-failed)]' : 'text-text-primary')}>
            {stats.failed}
          </span>
          <span className="text-xs text-text-tertiary">items failed</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface border border-border rounded-[10px] p-4 mb-4">
        <div className="text-sm font-semibold text-text-primary mb-3">Recent Activity</div>
        {recentActivity.length === 0 ? (
          <EmptyState
            icon="📥"
            title="No recent activity"
            body="Completed ingest items will appear here."
          />
        ) : (
          <div>
            {recentActivity.map((item) => (
              <div key={item.itemId} className="flex items-center justify-between gap-3 py-2 border-b border-border">
                <span className="text-[13px] text-text-secondary font-mono overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0" title={item.sourcePath}>
                  {item.sourcePath}
                </span>
                <Chip tone="success" size="xs">done</Chip>
                <span className="text-[11px] text-text-tertiary whitespace-nowrap shrink-0">{relativeTime(item.updatedAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
