// frontend/src/components/observability/DashboardPage.tsx
//
// Single-page scrollable observability dashboard (§18.6).
//
// Layout (top to bottom):
//   1. Header: title + Live/Paused toggle
//   2. KPI row (Runs today / Active now / Pending approvals / Failed 24h)
//   3. Cluster health card with node grid
//   4. Active runs table
//   5. Recent events list (EventRow)
//   6. Alerts panel
//
// Phase 1: fixture-driven. A TODO marker flags Phase 4 polling hookup.

import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import dashboardFixture from './fixtures/dashboardFixture';
import { useDashboard } from './hooks/useDashboard';
import { usePipelineMetrics } from './hooks/usePipelineMetrics';
import type { PipelineMetricsSource } from './hooks/usePipelineMetrics';
import { useObservability } from './context/ObservabilityContext';
import type { RecentEvent } from './context/ObservabilityContext';
import DashboardKPIStrip from './components/DashboardKPIStrip';
import NodeGrid from './components/NodeGrid';
import type { NodeSummary } from './components/NodeGridTile';
import ActiveRunsTable, { type ActiveRunRow } from './components/ActiveRunsTable';
import AlertsPanel, { type Alert } from './components/AlertsPanel';
import EventRow from '../shared/EventRow';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const EM_DASH = '—';

/**
 * Format a millisecond value for the KPI card. Returns the em-dash for
 * `null`/non-finite inputs (FE1 fix pattern) so the UI never shows a stale
 * "0 ms" when the bridge hasn't supplied the field yet.
 *
 * Examples:
 *   formatMs(null)   → "—"
 *   formatMs(0)      → "0 ms"
 *   formatMs(234)    → "234 ms"
 *   formatMs(1234)   → "1.2s"
 *   formatMs(12345)  → "12.3s"
 */
export function formatMs(value: number | null | undefined): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return EM_DASH;
  if (value < 1000) return `${Math.round(value)} ms`;
  return `${(value / 1000).toFixed(1)}s`;
}

// ---------------------------------------------------------------------------
// Phase-1 synthesized data (from the dashboardFixture scaffolding)
// ---------------------------------------------------------------------------

/**
 * Shape whatever per-node telemetry the dashboard payload carries into
 * `NodeSummary` tiles. Returns `[]` when the payload has none.
 *
 * This used to be `buildPhase1Nodes`, which SYNTHESIZED a tile per
 * `overview.totalNodes` — `cpu: 10 + i * 4`, `memoryMb: 280 + i * 60`, a
 * sine-wave `cpuHistory`, and `status: 'healthy'` for every node. Only the
 * node *count* was real. The header pill is scoped to the dashboard fetch,
 * so on a genuinely connected cluster it read "live data" directly above
 * invented per-node CPU, invented memory, and an all-healthy grid that
 * stayed all-healthy through an incident. Absent telemetry now renders as
 * absent, not as a plausible number.
 */
function nodesFromDashboard(dashboard: { regions?: Record<string, unknown> } | null | undefined): NodeSummary[] {
  const regions = (dashboard?.regions ?? {}) as Record<
    string,
    { nodes?: Array<Record<string, unknown>> } | undefined
  >;
  const out: NodeSummary[] = [];
  for (const key of Object.keys(regions)) {
    const nodes = regions[key]?.nodes;
    if (!Array.isArray(nodes)) continue;
    for (const n of nodes) {
      out.push({
        id: (n.id as string) ?? `node-${out.length}`,
        status: (n.status as NodeSummary['status']) ?? 'healthy',
        role: (n.role as string) ?? 'worker',
        region: key,
        cpu: (n.cpu as number) ?? 0,
        memoryMb: (n.memoryMb as number) ?? 0,
        connections: (n.connections as number) ?? 0,
        activeRuns: (n.activeRuns as number) ?? 0,
        cpuHistory: (n.cpuHistory as number[]) ?? [],
      });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Sub-components (kept local — not reused elsewhere)
// ---------------------------------------------------------------------------

/**
 * Tiny pill that surfaces where pipeline metrics came from on this poll.
 * Rendering rules (Wave 2 / AUDIT-06):
 *   - 'bridge' → no pill (intended steady state, avoid chrome).
 *   - 'stub'   → amber "demo data" pill so operators don't mistake
 *                synthesized numbers for live state.
 *   - 'error'  → red "metrics error" badge.
 *   - null     → no pill until the first poll resolves.
 */
function MetricsSourcePill({ source }: { source: PipelineMetricsSource | null }) {
  if (source === null || source === 'bridge') return null;

  const isError = source === 'error';

  return (
    <span
      data-testid="pipeline-metrics-source-pill"
      data-source={source}
      title={
        isError
          ? '/api/pipelines/metrics returned an error — values are placeholders'
          : 'No pipeline bridge wired — metrics are synthesized fixture data'
      }
      className={cn(
        'inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold',
        isError ? 'bg-danger-bg text-state-failed' : 'bg-warning-bg text-state-awaiting'
      )}
    >
      {isError ? 'metrics error' : 'demo data'}
    </span>
  );
}

function LiveToggle({
  live,
  onChange,
}: {
  live: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      data-ui-part=""
      data-testid="live-toggle"
      onClick={() => onChange(!live)}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold',
        'rounded-md cursor-pointer font-[inherit]',
        live
          ? 'bg-surface border border-primary text-primary'
          : 'bg-surface-inset border border-border text-text-secondary'
      )}
    >
      <span
        className={cn('w-2 h-2 rounded-full', live ? 'bg-success' : 'bg-text-tertiary')}
      />
      {live ? 'Live' : 'Paused'}
    </button>
  );
}

function ClusterHealthCard({
  nodes,
  healthyCount,
  totalCount,
  onSelect,
}: {
  nodes: NodeSummary[];
  healthyCount: number;
  totalCount: number;
  onSelect: (id: string) => void;
}) {
  const allHealthy = healthyCount === totalCount;

  return (
    <div className="bg-surface border border-border rounded-[10px] p-4 font-[inherit]">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-semibold text-text-primary mb-0 font-[inherit]">
          Cluster health
        </div>
        <span
          data-testid="cluster-health-chip"
          className={cn(
            'inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold',
            allHealthy ? 'bg-success-bg text-state-completed' : 'bg-warning-bg text-state-awaiting'
          )}
        >
          {healthyCount}/{totalCount} {allHealthy ? '✓' : '!'}
        </span>
      </div>
      {nodes.length > 0 ? (
        <NodeGrid nodes={nodes} onSelect={onSelect} />
      ) : (
        <div
          data-testid="cluster-health-no-telemetry"
          className="p-4 text-center text-text-tertiary text-[13px]"
        >
          No per-node telemetry in this dashboard payload — {totalCount} node
          {totalCount === 1 ? '' : 's'} reported, {healthyCount} healthy.
        </div>
      )}
    </div>
  );
}

function RecentEventsCard({
  events,
  onViewAll,
}: {
  events: RecentEvent[];
  onViewAll: () => void;
}) {
  return (
    <div className="bg-surface border border-border rounded-[10px] p-4 font-[inherit]">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-semibold text-text-primary font-[inherit]">
          Recent events (last 20)
        </div>
        <button
          data-ui-part=""
          data-testid="recent-events-view-all"
          onClick={onViewAll}
          className="bg-transparent border-none text-primary text-xs font-semibold cursor-pointer font-[inherit]"
        >
          ▸ view all
        </button>
      </div>
      {events.length === 0 ? (
        <div className="p-4 text-center text-text-tertiary text-[13px]">
          No recent events
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {events.slice(0, 20).map((e) => (
            <EventRow
              key={e.id}
              timestamp={e.timestamp}
              type={e.type}
              summary={e.summary}
              severity={e.severity}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export interface DashboardPageProps {
  /**
   * Currently-running rows for the "Active runs" table. **Additive, v2.97.0.**
   *
   * The table used to be fed a module-level `const PHASE1_ACTIVE_RUNS = []`,
   * so the section rendered a permanent "Active runs (0)" heading over an
   * empty table — directly beneath a live "Active now: 7" KPI read off the
   * event stream. Operators could see that runs existed and could not reach
   * them. With no host wiring there is no source for this list, so the
   * section now says so instead of asserting zero.
   */
  activeRuns?: ActiveRunRow[];
}

export default function DashboardPage({ activeRuns }: DashboardPageProps = {}) {
  const navigate = useNavigate();
  const activeRunsRef = useRef<HTMLDivElement>(null);

  const { live, setLive, recentEvents, activeRunsCount, isLiveData, unauthorized } =
    useObservability();
  const liveDashboard = useDashboard();
  // First-paint fallback: before the provider's initial-load effect has run,
  // render the static fixture so the UI is never blank.
  const dashboard = liveDashboard ?? dashboardFixture;

  // Pipeline metrics poller — drives the KPI row.
  // Phase 4 wires distributed-core's PipelineModule.getMetrics(); the bridge
  // currently exposes only a subset of fields, so most numerics arrive as
  // `null` and must render as "—" rather than zero.
  const { metrics: pipelineMetrics, source: metricsSource } = usePipelineMetrics();

  const overview = dashboard?.overview ?? {};
  const nodes = useMemo(() => nodesFromDashboard(dashboard), [dashboard]);

  // KPI values: pass through nulls so KPICard can render the em-dash.
  // `activeRunsCount` from the EventStream takes precedence when non-zero —
  // it's the most up-to-date "active now" since it updates on every dispatch.
  // When the EventStream count is 0 AND the bridge value is null, we fall
  // back to the empty active-runs table count (also 0) — these are real
  // zeroes, not "unknown" zeroes, so they're rendered as numbers.
  const runsToday: number | string = pipelineMetrics?.runsStarted ?? EM_DASH;
  // No runs-over-time series exists yet, so there is nothing to draw. This
  // used to be eight literal zeros, which rendered a flat sparkline under a
  // live number as if the trend had been measured. An empty array makes
  // KPICard omit the sparkline entirely.
  const runsSparkline: number[] = [];
  const activeNow: number | string =
    activeRunsCount > 0
      ? activeRunsCount
      : pipelineMetrics?.runsActive ?? EM_DASH;
  const pendingApprovals: number | string =
    pipelineMetrics?.runsAwaitingApproval ?? EM_DASH;
  const failed24h: number | string = pipelineMetrics?.runsFailed ?? EM_DASH;
  // First-token latency arrives from distributed-core v0.3.7+ via the bridge;
  // older builds and the stub fixture leave it null → render em-dash, never
  // "0 ms".
  const avgFirstTokenLatencyMs = pipelineMetrics?.avgFirstTokenLatencyMs ?? null;
  const avgFirstTokenLatency: string = formatMs(avgFirstTokenLatencyMs);

  const alerts: Alert[] = Array.isArray(dashboard?.alerts) ? dashboard.alerts : [];

  const handleScrollToActive = () => {
    activeRunsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGoToPipelines = () => {
    // Phase 4 will have a dedicated pending-approvals panel; placeholder for now.
    navigate('/pipelines');
  };

  const handleGoToFailedEvents = () => {
    navigate('/observability/events?filter=errors');
  };

  const handleSelectNode = (id: string) => {
    navigate(`/observability/nodes?selected=${encodeURIComponent(id)}`);
  };

  const handleViewAllEvents = () => {
    navigate('/observability/events');
  };

  return (
    <div
      data-testid="observability-dashboard"
      className="p-6 flex flex-col gap-4 font-sans text-[13px] text-text-primary bg-surface-panel min-h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-text-primary m-0 leading-[1.3]">
          Dashboard
        </h1>
        <div className="flex items-center gap-2">
          {/* Three states, not two. "not authorized" used to render as the
              same muted "fixture" pill as an unreachable backend, so an
              operator whose credentials were rejected read synthetic cluster
              numbers as their own — with nothing on screen to correct them. */}
          <span
            data-testid="dashboard-data-source"
            title={
              isLiveData
                ? 'Connected to /api/observability/dashboard'
                : unauthorized
                  ? 'Not authorized to read /api/observability/dashboard — the numbers below are fixture data, NOT your cluster. Sign in or supply a token to ObservabilityProvider.'
                  : 'Backend unreachable — using fixture data'
            }
            className={cn(
              'text-[11px] font-semibold',
              isLiveData
                ? 'text-state-completed'
                : unauthorized
                  ? 'text-danger-fg bg-danger-bg border border-danger-border rounded-sm px-1.5 py-0.5'
                  : 'text-text-tertiary'
            )}
          >
            {isLiveData ? 'live data' : unauthorized ? 'not authorized — fixture' : 'fixture'}
          </span>
          <MetricsSourcePill source={metricsSource} />
          <LiveToggle live={live} onChange={setLive} />
        </div>
      </div>

      {/* KPI row */}
      <DashboardKPIStrip
        runsToday={runsToday}
        runsSparkline={runsSparkline}
        activeNow={activeNow}
        pendingApprovals={pendingApprovals}
        failed24h={failed24h}
        avgFirstTokenLatency={avgFirstTokenLatency}
        onScrollToActive={handleScrollToActive}
        onGoToPipelines={handleGoToPipelines}
        onGoToFailedEvents={handleGoToFailedEvents}
      />

      {/* Cluster health */}
      <ClusterHealthCard
        nodes={nodes}
        healthyCount={overview.healthyNodes ?? 0}
        totalCount={overview.totalNodes ?? 0}
        onSelect={handleSelectNode}
      />

      {/* Active runs */}
      <div ref={activeRunsRef}>
        <div className="text-sm font-semibold text-text-primary mb-2 font-[inherit]">
          Active runs{activeRuns ? ` (${activeRuns.length})` : ''}
        </div>
        {activeRuns ? (
          <ActiveRunsTable
            runs={activeRuns}
            onRowClick={(run) =>
              navigate(`/pipelines/${run.pipelineId}/runs/${run.runId}`)
            }
          />
        ) : (
          <div
            data-testid="active-runs-not-wired"
            className="bg-surface border border-border rounded-[10px] p-4 text-center text-text-tertiary text-[13px]"
          >
            No active-run source is wired to this dashboard.{' '}
            <button
              data-ui-part=""
              data-testid="active-runs-go-to-pipelines"
              onClick={handleGoToPipelines}
              className="bg-transparent border-none text-primary text-[13px] font-semibold cursor-pointer font-[inherit] p-0"
            >
              Open Pipelines
            </button>{' '}
            to see runs in progress.
          </div>
        )}
      </div>

      {/* Recent events */}
      <RecentEventsCard
        events={recentEvents}
        onViewAll={handleViewAllEvents}
      />

      {/* Alerts */}
      <div>
        <div className="text-sm font-semibold text-text-primary mb-2 font-[inherit]">
          Alerts ({alerts.length})
        </div>
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
  );
}
