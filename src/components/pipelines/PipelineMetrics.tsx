// frontend/src/components/pipelines/PipelineMetrics.tsx
//
// Pipeline Metrics Dashboard — global bridge metrics fetched from
// GET /api/pipelines/metrics. Displays token rate, avg duration,
// first-token latency, run counts, and success rate.
// Polls every 10s for live updates.

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { useIdentityContext } from '../../contexts/IdentityContext';
import { colors } from '../../constants/styles';

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
  if (pct >= 90) return colors.state.completed;
  if (pct >= 70) return colors.state.awaiting;
  return colors.state.failed;
}

function latencyColor(ms: number): string {
  if (ms <= 500) return colors.state.completed;
  if (ms <= 2000) return colors.state.awaiting;
  return colors.state.failed;
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
  if (usd == null || usd === 0) return colors.textTertiary;
  if (usd < 1) return '#16a34a'; // green
  if (usd < 10) return '#ca8a04'; // yellow
  if (usd < 100) return '#ea580c'; // orange
  return '#dc2626'; // red
}

function failureRateColor(started: number, failed: number): string {
  if (started === 0) return colors.textTertiary;
  const pct = (failed / started) * 100;
  if (pct <= 5) return colors.state.completed;
  if (pct <= 20) return colors.state.awaiting;
  return colors.state.failed;
}

function relativeTimeAgo(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 5_000) return 'just now';
  if (d < 60_000) return `${Math.floor(d / 1000)}s ago`;
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  return `${Math.floor(d / 3_600_000)}h ago`;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const cardStyle: CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  minWidth: 0,
};

const cardLabelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: colors.textSecondary,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const cardValueStyle: CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: colors.textPrimary,
  fontFamily: 'monospace',
};

const cardSubStyle: CSSProperties = {
  fontSize: 12,
  color: colors.textTertiary,
  fontFamily: 'monospace',
};

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
    <div style={cardStyle} data-testid={testId}>
      <div style={cardLabelStyle}>{label}</div>
      <div style={{ ...cardValueStyle, color: valueColor || colors.textPrimary }}>
        {value}
      </div>
      {sub && <div style={cardSubStyle}>{sub}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mini Bar Chart — token usage
// ---------------------------------------------------------------------------

function TokenBarChart({ tokensIn, tokensOut }: { tokensIn: number; tokensOut: number }) {
  const data = [
    { name: 'In', value: tokensIn, color: colors.primary },
    { name: 'Out', value: tokensOut, color: colors.state.completed },
  ];
  return (
    <div style={{ ...cardStyle, gap: 8 }}>
      <div style={cardLabelStyle}>Token Usage</div>
      <div style={{ width: '100%', height: 80 }}>
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
      <div style={{ display: 'flex', gap: 12, fontSize: 11, color: colors.textSecondary }}>
        <span>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: colors.primary, marginRight: 4 }} />
          In: {formatNumber(tokensIn)}
        </span>
        <span>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: colors.state.completed, marginRight: 4 }} />
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
    { name: 'Started', value: started, color: colors.primary },
    { name: 'Completed', value: completed, color: colors.state.completed },
    { name: 'Failed', value: failed, color: colors.state.failed },
    { name: 'Active', value: active, color: colors.state.running },
  ];
  return (
    <div style={{ ...cardStyle, gap: 8 }}>
      <div style={cardLabelStyle}>Run Breakdown</div>
      <div style={{ width: '100%', height: 80 }}>
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
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11, color: colors.textSecondary }}>
        {data.map((d) => (
          <span key={d.name}>
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: d.color, marginRight: 4 }} />
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

export default function PipelineMetrics() {
  const navigate = useNavigate();
  const { idToken } = useIdentityContext();
  const [metrics, setMetrics] = useState<BridgeMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const baseUrl = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

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
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100%', color: colors.textTertiary, fontSize: 13,
        }}
        data-testid="metrics-loading"
      >
        Loading metrics...
      </div>
    );
  }

  // No data state
  if (!metrics && !loading) {
    return (
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            onClick={() => navigate('/pipelines')}
            style={{
              background: 'none', border: 'none', color: colors.primary,
              cursor: 'pointer', fontSize: 13, padding: 0,
            }}
          >
            ← Pipelines
          </button>
          <span style={{ color: colors.textTertiary }}>/</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: colors.textPrimary }}>
            Metrics
          </span>
        </div>
        <div
          data-testid="metrics-empty"
          style={{
            textAlign: 'center', padding: 48, fontSize: 14,
            color: colors.textTertiary,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>--</div>
          <div style={{ fontWeight: 600, color: colors.textSecondary, marginBottom: 4 }}>
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
      style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}
      data-testid="pipeline-metrics"
    >
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          onClick={() => navigate('/pipelines')}
          style={{
            background: 'none', border: 'none', color: colors.primary,
            cursor: 'pointer', fontSize: 13, padding: 0,
          }}
        >
          ← Pipelines
        </button>
        <span style={{ color: colors.textTertiary }}>/</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: colors.textPrimary }}>
          Pipeline Metrics
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {error && (
            <span style={{ fontSize: 11, color: colors.state.failed }}>
              Fetch error: {error}
            </span>
          )}
          <span
            style={{ fontSize: 11, color: colors.textTertiary }}
            data-testid="metrics-last-updated"
          >
            Updated {relativeTimeAgo(m.asOf)}
          </span>
          <button
            type="button"
            onClick={() => void fetchMetrics()}
            style={{
              padding: '4px 10px', fontSize: 12, fontWeight: 500,
              background: colors.surface, color: colors.textSecondary,
              border: `1px solid ${colors.border}`, borderRadius: 4,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Row - Run Counts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
        }}
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
          valueColor={colors.state.completed}
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
          valueColor={m.runsActive > 0 ? colors.state.running : colors.textTertiary}
          testId="metric-runs-active"
        />
      </div>

      {/* KPI Row - Rates & Latency */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
        }}
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
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
        }}
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
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
        }}
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 12,
        }}
      >
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
