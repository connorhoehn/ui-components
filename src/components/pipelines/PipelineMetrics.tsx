// frontend/src/components/pipelines/PipelineMetrics.tsx
//
// Pipeline Metrics Dashboard — global bridge metrics fetched from
// GET /api/pipelines/metrics. Displays token rate, avg duration,
// first-token latency, run counts, and success rate.
// Polls every 10s for live updates.

import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { useOptionalIdentityContext } from '../../contexts/IdentityContext';
import { getApiBaseUrl } from '../../lib/apiBaseUrl';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BridgeMetrics {
  runsStarted: number;
  runsCompleted: number;
  runsFailed: number;
  runsActive: number;
  avgDurationMs: number;
  llmTokensIn: number;
  llmTokensOut: number;
  avgFirstTokenLatencyMs: number;
  estimatedCostUsd?: number | null;
  tokenRate?: number;
  asOf: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatMs(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return '0ms';
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60_000).toFixed(1)}m`;
}

function successRate(started: number, completed: number): number {
  if (started === 0) return 0;
  return Math.round((completed / started) * 100);
}

function rateColor(pct: number): string {
  if (pct >= 90) return 'var(--color-success)';
  if (pct >= 70) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

function latencyColor(ms: number): string {
  if (ms <= 500) return 'var(--color-success)';
  if (ms <= 2000) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

function formatCostUsd(usd: number | null | undefined): string {
  if (usd == null || usd === 0) return '$0.00';
  if (usd < 0.01) return `$${usd.toFixed(4)}`;
  if (usd < 1) return `$${usd.toFixed(3)}`;
  return `$${usd.toFixed(2)}`;
}

function costPerRun(totalCost: number | null | undefined, runsCompleted: number): string {
  if (totalCost == null || totalCost === 0 || runsCompleted === 0) return '$0.00';
  const avg = totalCost / runsCompleted;
  if (avg < 0.001) return '<$0.001';
  if (avg < 0.01) return `$${avg.toFixed(4)}`;
  if (avg < 1) return `$${avg.toFixed(3)}`;
  return `$${avg.toFixed(2)}`;
}

function costValueColor(usd: number | null | undefined): string {
  if (usd == null || usd === 0) return 'var(--color-text-tertiary)';
  if (usd < 1) return 'var(--color-success)';
  if (usd < 10) return 'var(--color-warning)';
  if (usd < 100) return 'var(--color-caution)';
  return 'var(--color-danger)';
}

function failureRateColor(started: number, failed: number): string {
  if (started === 0) return 'var(--color-text-tertiary)';
  const pct = (failed / started) * 100;
  if (pct <= 5) return 'var(--color-success)';
  if (pct <= 20) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

function relativeTimeAgo(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 5_000) return 'just now';
  if (d < 60_000) return `${Math.floor(d / 1000)}s ago`;
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  return `${Math.floor(d / 3_600_000)}h ago`;
}

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
  testId?: string;
}

function StatCard({ label, value, sub, valueColor, testId }: StatCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0" data-testid={testId}>
      <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]">{label}</div>
      <div
        className="text-[22px] font-bold font-mono"
        style={{ color: valueColor || 'var(--color-text-primary)' }}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-text-tertiary font-mono">{sub}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mini Bar Chart — token usage
// ---------------------------------------------------------------------------

function TokenBarChart({ tokensIn, tokensOut }: { tokensIn: number; tokensOut: number }) {
  const data = [
    { name: 'In', value: tokensIn, color: 'var(--color-primary)' },
    { name: 'Out', value: tokensOut, color: 'var(--color-success)' },
  ];
  return (
    <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0">
      <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]">Token Usage</div>
      <div className="w-full h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-3 text-[11px] text-text-secondary">
        <span>
          <span className="inline-block w-2 h-2 rounded-sm bg-primary mr-1" />
          In: {formatNumber(tokensIn)}
        </span>
        <span>
          <span className="inline-block w-2 h-2 rounded-sm bg-success mr-1" />
          Out: {formatNumber(tokensOut)}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Runs Overview Bar Chart
// ---------------------------------------------------------------------------

function RunsBarChart({ started, completed, failed, active }: {
  started: number; completed: number; failed: number; active: number;
}) {
  const data = [
    { name: 'Started', value: started, color: 'var(--color-primary)' },
    { name: 'Completed', value: completed, color: 'var(--color-success)' },
    { name: 'Failed', value: failed, color: 'var(--color-danger)' },
    { name: 'Active', value: active, color: 'var(--color-info)' },
  ];
  return (
    <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0">
      <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]">Run Breakdown</div>
      <div className="w-full h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-2.5 flex-wrap text-[11px] text-text-secondary">
        {data.map((d) => (
          <span key={d.name}>
            <span className="inline-block w-2 h-2 rounded-sm mr-1" style={{ background: d.color }} />
            {d.name}: {d.value}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const POLL_INTERVAL = 10_000;

export interface PipelineMetricsProps {
  /**
   * Bearer token for `/api/pipelines/metrics`. Wins over this library's
   * `useIdentityContext().idToken`. Defaults to the context's `idToken`
   * (or `null` when no `<IdentityProvider>` is mounted) via the
   * non-throwing `useOptionalIdentityContext`.
   */
  idToken?: string | null;
  /** Origin for `/api/pipelines/metrics`. Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
  baseUrl?: string;
}

export default function PipelineMetrics({ idToken: idTokenProp, baseUrl: baseUrlProp }: PipelineMetricsProps = {}) {
  const navigate = useNavigate();
  const identityCtx = useOptionalIdentityContext();
  const idToken = idTokenProp !== undefined ? idTokenProp : (identityCtx?.idToken ?? null);
  const [metrics, setMetrics] = useState<BridgeMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const baseUrl = baseUrlProp ?? getApiBaseUrl();

  const fetchMetrics = useCallback(async () => {
    if (!idToken) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/api/pipelines/metrics`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json() as BridgeMetrics;
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken, baseUrl]);

  useEffect(() => {
    void fetchMetrics();
    intervalRef.current = setInterval(() => {
      void fetchMetrics();
    }, POLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchMetrics]);

  // Loading state
  if (loading && !metrics) {
    return (
      <div
        className="flex items-center justify-center h-full text-text-tertiary text-[13px]"
        data-testid="metrics-loading"
      >
        Loading metrics...
      </div>
    );
  }

  // No data state
  if (!metrics && !loading) {
    return (
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button
            data-ui-part=""
            type="button"
            onClick={() => navigate('/pipelines')}
            className="bg-transparent border-none text-primary cursor-pointer text-[13px] p-0"
          >
            ← Pipelines
          </button>
          <span className="text-text-tertiary">/</span>
          <span className="text-lg font-bold text-text-primary">
            Metrics
          </span>
        </div>
        <div
          data-testid="metrics-empty"
          className="text-center p-12 text-sm text-text-tertiary bg-surface border border-border rounded-lg"
        >
          <div className="text-[32px] mb-3">--</div>
          <div className="font-semibold text-text-secondary mb-1">
            No data yet
          </div>
          <div>
            {error
              ? `Could not load metrics: ${error}`
              : 'The pipeline module has not started or has not produced any metrics yet.'}
          </div>
        </div>
      </div>
    );
  }

  // Data available
  const m = metrics!;
  const rate = successRate(m.runsStarted, m.runsCompleted);
  const tokenRateValue = m.tokenRate ?? 0;

  return (
    <div
      className="p-6 flex flex-col gap-4 overflow-auto"
      data-testid="pipeline-metrics"
    >
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <button
          data-ui-part=""
          type="button"
          onClick={() => navigate('/pipelines')}
          className="bg-transparent border-none text-primary cursor-pointer text-[13px] p-0"
        >
          ← Pipelines
        </button>
        <span className="text-text-tertiary">/</span>
        <span className="text-lg font-bold text-text-primary">
          Pipeline Metrics
        </span>
        <div className="ml-auto flex items-center gap-2">
          {error && (
            <span role="alert" className="text-[11px] text-danger-fg">
              Fetch error: {error}
            </span>
          )}
          <span
            className="text-[11px] text-text-tertiary"
            data-testid="metrics-last-updated"
          >
            Updated {relativeTimeAgo(m.asOf)}
          </span>
          <button
            data-ui-part=""
            type="button"
            onClick={() => void fetchMetrics()}
            className="px-2.5 py-1 text-xs font-medium bg-surface text-text-secondary border border-border rounded cursor-pointer font-[inherit]"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Row - Run Counts */}
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3"
        data-testid="metrics-run-cards"
      >
        <StatCard
          label="Runs Started"
          value={formatNumber(m.runsStarted)}
          testId="metric-runs-started"
        />
        <StatCard
          label="Runs Completed"
          value={formatNumber(m.runsCompleted)}
          valueColor="var(--color-success)"
          testId="metric-runs-completed"
        />
        <StatCard
          label="Runs Failed"
          value={formatNumber(m.runsFailed)}
          valueColor={failureRateColor(m.runsStarted, m.runsFailed)}
          testId="metric-runs-failed"
        />
        <StatCard
          label="Runs Active"
          value={formatNumber(m.runsActive)}
          valueColor={m.runsActive > 0 ? 'var(--color-info)' : 'var(--color-text-tertiary)'}
          testId="metric-runs-active"
        />
      </div>

      {/* KPI Row - Rates & Latency */}
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3"
        data-testid="metrics-rate-cards"
      >
        <StatCard
          label="Success Rate"
          value={`${rate}%`}
          valueColor={rateColor(rate)}
          sub={`${m.runsCompleted} / ${m.runsStarted} runs`}
          testId="metric-success-rate"
        />
        <StatCard
          label="Token Rate"
          value={`${tokenRateValue.toFixed(1)} tok/s`}
          sub="Current throughput"
          testId="metric-token-rate"
        />
        <StatCard
          label="Avg Duration"
          value={formatMs(m.avgDurationMs)}
          valueColor={latencyColor(m.avgDurationMs)}
          sub="Per run"
          testId="metric-avg-duration"
        />
        <StatCard
          label="Avg First-Token Latency"
          value={formatMs(m.avgFirstTokenLatencyMs)}
          valueColor={latencyColor(m.avgFirstTokenLatencyMs)}
          sub="Time to first token"
          testId="metric-first-token-latency"
        />
      </div>

      {/* Cost KPI Row */}
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3"
        data-testid="metrics-cost-cards"
      >
        <StatCard
          label="Total Cost"
          value={formatCostUsd(m.estimatedCostUsd)}
          valueColor={costValueColor(m.estimatedCostUsd)}
          sub="Estimated LLM spend"
          testId="metric-total-cost"
        />
        <StatCard
          label="Cost per Run"
          value={costPerRun(m.estimatedCostUsd, m.runsCompleted)}
          valueColor={costValueColor(m.estimatedCostUsd != null && m.runsCompleted > 0 ? (m.estimatedCostUsd ?? 0) / m.runsCompleted : null)}
          sub="Average per completed run"
          testId="metric-cost-per-run"
        />
      </div>

      {/* Token Usage & Run Breakdown */}
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3"
        data-testid="metrics-charts"
      >
        <StatCard
          label="Total Tokens In"
          value={formatNumber(m.llmTokensIn)}
          sub="Input tokens consumed"
          testId="metric-tokens-in"
        />
        <StatCard
          label="Total Tokens Out"
          value={formatNumber(m.llmTokensOut)}
          sub="Output tokens generated"
          testId="metric-tokens-out"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
        <TokenBarChart tokensIn={m.llmTokensIn} tokensOut={m.llmTokensOut} />
        <RunsBarChart
          started={m.runsStarted}
          completed={m.runsCompleted}
          failed={m.runsFailed}
          active={m.runsActive}
        />
      </div>
    </div>
  );
}
