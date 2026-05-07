// frontend/src/components/observability/MetricsPage.tsx
//
// /observability/metrics — grid of chart cards per PIPELINES_PLAN.md §18.9.
// Phase 4: each card renders a real recharts-based chart via the shared
// <LineChart/>, <StackedAreaChart/>, and <BarChart/> wrappers in
// components/shared/Chart.tsx.
//
// Because the backend `/api/observability/dashboard` endpoint returns only a
// point-in-time snapshot, we seed each card with ~30 deterministic historical
// points on first paint so charts aren't empty. As `useMetricsHistory`
// accumulates live dashboard snapshots, we append the latest live value to
// each series and shift the window.
//
// Grid responsiveness: 2 columns at 1280-1599, 3 at 1600+. Rendered via a
// ResizeObserver-driven layout; for simplicity and to avoid a runtime
// dependency we use the window width (read once on mount + on resize).

import { useEffect, useMemo, useState } from 'react';
import type { LineSeries } from '../shared/Chart';
import { useMetricsHistory } from './hooks/useMetricsHistory';
import { usePipelineMetrics } from './hooks/usePipelineMetrics';
import type { PipelineMetrics } from './hooks/usePipelineMetrics';
import { usePipelineModuleDashboard } from './hooks/usePipelineModuleDashboard';
import MetricTimeSeriesPanel from './components/MetricTimeSeriesPanel';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Seed helpers — deterministic LCG so first paint is stable across reloads.
// ---------------------------------------------------------------------------

function seeded(seed: number, n = 30, max = 60): number[] {
  const out: number[] = [];
  let v = seed;
  for (let i = 0; i < n; i++) {
    v = (v * 9301 + 49297) % 233280;
    out.push(Math.abs(v % max));
  }
  return out;
}

/**
 * Turn a raw number[] into the {x, y}[] shape the Chart wrappers expect.
 * `x` is a minute offset (0, 1, 2, ...) so the axis renders as integers.
 */
function toSeries(label: string, values: number[], color?: string): LineSeries {
  return {
    label,
    color,
    data: values.map((y, i) => ({ x: i, y })),
  };
}

// ---------------------------------------------------------------------------
// Seeded chart data builders
// ---------------------------------------------------------------------------

// Chart data viz colors — kept as raw values since these are runtime data colors
const CHART_COLORS = {
  primary: '#646cff',
  completed: '#16a34a',
  failed: '#dc2626',
};

interface SeedBundle {
  runsPerMinute: LineSeries[];
  stepDuration: LineSeries[];
  llmTokens: LineSeries[];
  llmCost: LineSeries[];
  clusterCpu: LineSeries[];
  clusterMemory: LineSeries[];
  eventRate: LineSeries[];
  activeRuns: LineSeries[];
  failureRate: Array<Record<string, unknown>>;
  approvalLatency: LineSeries[];
}

function buildSeeds(): SeedBundle {
  return {
    runsPerMinute: [
      toSeries('started',   seeded(3,  30, 40), CHART_COLORS.primary),
      toSeries('completed', seeded(7,  30, 40), CHART_COLORS.completed),
      toSeries('failed',    seeded(11, 30, 20), CHART_COLORS.failed),
    ],
    stepDuration: [
      toSeries('p50', seeded(17, 30, 400)),
      toSeries('p95', seeded(23, 30, 800)),
      toSeries('p99', seeded(29, 30, 1200)),
    ],
    llmTokens: [
      toSeries('input',  seeded(31, 30, 2000)),
      toSeries('output', seeded(37, 30, 1000)),
    ],
    llmCost: [toSeries('USD', seeded(41, 30, 5))],
    clusterCpu: [
      toSeries('node-0', seeded(43, 30, 40)),
      toSeries('node-1', seeded(47, 30, 40)),
      toSeries('node-2', seeded(53, 30, 40)),
    ],
    clusterMemory: [
      toSeries('node-0', seeded(59, 30, 512)),
      toSeries('node-1', seeded(61, 30, 512)),
      toSeries('node-2', seeded(67, 30, 512)),
    ],
    eventRate:     [toSeries('events/s', seeded(71, 30, 20))],
    activeRuns:    [toSeries('active',   seeded(73, 30, 10))],
    // Failure-rate-by-type is rendered as a bar chart and needs row-shaped data.
    failureRate: (() => {
      const llm       = seeded(79, 30, 15);
      const http      = seeded(83, 30, 15);
      const transform = seeded(89, 30, 15);
      return llm.map((_v, i) => ({
        x: i,
        llm: llm[i],
        http: http[i],
        transform: transform[i],
        // For a single-series bar view we expose a `total` field too.
        total: llm[i] + http[i] + transform[i],
      }));
    })(),
    approvalLatency: [toSeries('seconds', seeded(97, 30, 120))],
  };
}

// ---------------------------------------------------------------------------
// Column count
// ---------------------------------------------------------------------------

function useColumnCount(): number {
  const [cols, setCols] = useState<number>(() => {
    if (typeof window === 'undefined') return 2;
    return window.innerWidth >= 1600 ? 3 : 2;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => {
      setCols(window.innerWidth >= 1600 ? 3 : 2);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return cols;
}

// ---------------------------------------------------------------------------
// Active modules section
// ---------------------------------------------------------------------------

function ActiveModulesSection() {
  const { data, loading, error } = usePipelineModuleDashboard();

  if (loading && !data) {
    return (
      <div
        data-testid="modules-section-loading"
        className="flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4"
      >
        <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]">
          Loading active modules…
        </span>
      </div>
    );
  }
  if (!data) {
    return (
      <div
        data-testid="modules-section-error"
        className="flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4"
      >
        <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]">
          Active modules unavailable{error ? `: ${error}` : ''}
        </span>
      </div>
    );
  }

  return (
    <div
      data-testid="modules-section"
      className="flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-bold text-text-primary">{data.moduleName}</span>
        <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]">
          {data.source} · {data.state}
        </span>
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="flex flex-col gap-0.5 min-w-[110px]">
          <span className="text-[11px] text-text-tertiary">Total</span>
          <span className="text-lg font-bold text-text-primary">{data.summary.totalResources}</span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-[110px]">
          <span className="text-[11px] text-text-tertiary">Healthy</span>
          <span className="text-lg font-bold text-text-primary">{data.summary.healthyResources}</span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-[110px]">
          <span className="text-[11px] text-text-tertiary">Active</span>
          <span className="text-lg font-bold text-text-primary">{data.summary.activeConnections}</span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-[110px]">
          <span className="text-[11px] text-text-tertiary">Throughput</span>
          <span className="text-lg font-bold text-text-primary">{data.summary.throughput}</span>
        </div>
      </div>
      {data.alerts && data.alerts.length > 0 ? (
        <div data-testid="modules-section-alerts" className="flex flex-col gap-1">
          {data.alerts.map((a, i) => (
            <div
              key={i}
              className={cn(
                'text-xs px-2.5 py-1.5 rounded-md bg-surface-inset',
                (a.level === 'critical' || a.level === 'error') ? 'text-state-failed' : 'text-text-primary'
              )}
            >
              [{a.level}] {a.message}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function MetricsPage() {
  const seeds = useMemo(buildSeeds, []);
  const cols = useColumnCount();

  // The dashboard-history ring is kept so future work can splice live values
  // onto the seeded series. Phase 1 snapshot isn't time-series-shaped yet, so
  // we currently just read the length to decide when to start overlaying.
  const history = useMetricsHistory(60);
  void history; // reserved for real-data overlay once server sends time-series

  // Live pipeline metrics — drives the "Runs" / "LLM tokens" / "LLM cost" /
  // "Active runs" / "Approval latency" cards by appending each new poll's
  // value to a small in-page ring buffer.
  const { metrics, isLiveData } = usePipelineMetrics();
  const [metricsRing, setMetricsRing] = useState<PipelineMetrics[]>([]);
  useEffect(() => {
    if (!metrics) return;
    setMetricsRing((prev) => [...prev, metrics].slice(-30));
  }, [metrics]);

  // Derived live series — only used when we've collected at least 2 samples
  // AND the bridge is actually populating the relevant numeric fields. The
  // hook now returns `null` for fields the bridge doesn't expose; we drop
  // those points so charts don't render zeros that lie about the data.
  const liveSeries = useMemo(() => {
    if (metricsRing.length < 2) return null;
    type Pt = { x: number; y: number };
    const series = (key: keyof PipelineMetrics): Pt[] => {
      const out: Pt[] = [];
      metricsRing.forEach((m, i) => {
        const v = m[key];
        if (typeof v === 'number' && Number.isFinite(v)) {
          out.push({ x: i, y: v });
        }
      });
      return out;
    };
    const hasEnough = (pts: Pt[]) => pts.length >= 2;

    const active = series('runsActive');
    const tokensIn = series('llmTokensIn');
    const tokensOut = series('llmTokensOut');
    const cost = series('estimatedCostUsd');
    const started = series('runsStarted');
    const completed = series('runsCompleted');
    const failed = series('runsFailed');

    return {
      activeRuns: hasEnough(active)
        ? ([{ label: 'active', data: active }] as LineSeries[])
        : null,
      llmTokens:
        hasEnough(tokensIn) && hasEnough(tokensOut)
          ? ([
              { label: 'input', data: tokensIn },
              { label: 'output', data: tokensOut },
            ] as LineSeries[])
          : null,
      llmCost: hasEnough(cost)
        ? ([{ label: 'USD', data: cost }] as LineSeries[])
        : null,
      runsPerMinute:
        hasEnough(started) && hasEnough(completed) && hasEnough(failed)
          ? ([
              { label: 'started', color: CHART_COLORS.primary, data: started },
              { label: 'completed', color: CHART_COLORS.completed, data: completed },
              { label: 'failed', color: CHART_COLORS.failed, data: failed },
            ] as LineSeries[])
          : null,
    };
  }, [metricsRing]);

  return (
    <div
      data-testid="metrics-page"
      className="flex flex-col h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface"
    >
      <MetricTimeSeriesPanel
        seeds={seeds}
        liveSeries={liveSeries}
        cols={cols}
        isLiveData={isLiveData}
        failedColor={CHART_COLORS.failed}
      />

      <ActiveModulesSection />
    </div>
  );
}

export default MetricsPage;
