// frontend/src/components/observability/components/MetricTimeSeriesPanel.tsx
//
// Extracted from MetricsPage — encapsulates the time-range/refresh controls bar
// and the responsive chart grid. Receives seeded + live series and renders
// MetricCards with their chart children.

import { useState } from 'react';
import MetricCard from './MetricCard';
import {
  LineChart,
  StackedAreaChart,
  BarChart,
  type LineSeries,
} from '../../shared/Chart';
import { cn } from '../../../lib/cn';
import { Select } from '../../forms/Select';

type TimeRange = '15m' | '1h' | '24h' | '7d';
const TIME_RANGES: Array<{ value: TimeRange; label: string }> = [
  { value: '15m', label: 'Last 15m' },
  { value: '1h', label: 'Last 1h' },
  { value: '24h', label: 'Last 24h' },
  { value: '7d', label: 'Last 7d' },
];

type RefreshInterval = 'off' | '5s' | '30s' | '60s';
const REFRESH_INTERVALS: Array<{ value: RefreshInterval; label: string }> = [
  { value: 'off', label: 'Off' },
  { value: '5s', label: '5s' },
  { value: '30s', label: '30s' },
  { value: '60s', label: '60s' },
];

export interface MetricTimeSeriesPanelProps {
  seeds: {
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
  };
  liveSeries: {
    activeRuns: LineSeries[] | null;
    llmTokens: LineSeries[] | null;
    llmCost: LineSeries[] | null;
    runsPerMinute: LineSeries[] | null;
  } | null;
  cols: number;
  isLiveData: boolean;
  /** Color for the failure-rate bar chart */
  failedColor: string;
}

function MetricTimeSeriesPanel({
  seeds,
  liveSeries,
  cols,
  isLiveData,
  failedColor,
}: MetricTimeSeriesPanelProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1h');
  const [refresh, setRefresh] = useState<RefreshInterval>('30s');

  const timeLabel = TIME_RANGES.find((t) => t.value === timeRange)?.label ?? '';

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel">
        <Select
          data-testid="metrics-time-range"
          aria-label="Time range"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="w-auto min-w-[120px]"
          options={TIME_RANGES.map((t) => ({ value: t.value, label: t.label }))}
        />

        <Select
          data-testid="metrics-refresh-interval"
          aria-label="Refresh interval"
          value={refresh}
          onChange={(e) => setRefresh(e.target.value as RefreshInterval)}
          className="w-auto min-w-[100px]"
          options={REFRESH_INTERVALS.map((r) => ({ value: r.value, label: `Refresh: ${r.label}` }))}
        />

        <button
          data-testid="metrics-reset-zoom"
          onClick={() => console.log('[MetricsPage] reset zoom')}
          className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0"
        >
          Reset zoom
        </button>

        <button
          data-testid="metrics-export-csv"
          onClick={() => console.log('[MetricsPage] export CSV')}
          className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0"
        >
          Export CSV
        </button>

        <div
          data-testid="metrics-data-source"
          className="ml-auto flex items-center gap-3 text-[11px] text-text-tertiary"
        >
          <span
            title={
              isLiveData
                ? 'Connected to /api/pipelines/metrics'
                : 'Backend unreachable — using seeded fixture'
            }
            className={cn(
              'font-semibold',
              isLiveData ? 'text-state-completed' : 'text-text-tertiary'
            )}
          >
            {isLiveData ? 'live' : 'fixture'}
          </span>
          <span>{cols} column{cols === 1 ? '' : 's'}</span>
        </div>
      </div>

      <div
        className="gap-4 p-4 overflow-y-auto flex-1 grid"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        <MetricCard title="Runs per minute" timeRange={timeLabel}>
          <StackedAreaChart
            series={liveSeries?.runsPerMinute ?? seeds.runsPerMinute}
            height={180}
          />
        </MetricCard>

        <MetricCard title="Step duration (p50/p95/p99)" timeRange={timeLabel}>
          <LineChart
            series={seeds.stepDuration}
            height={180}
            yFormat={(v) => `${Math.round(v)}ms`}
          />
        </MetricCard>

        <MetricCard title="LLM tokens" timeRange={timeLabel}>
          <LineChart
            series={liveSeries?.llmTokens ?? seeds.llmTokens}
            height={180}
          />
        </MetricCard>

        <MetricCard title="LLM cost" timeRange={timeLabel}>
          <LineChart
            series={liveSeries?.llmCost ?? seeds.llmCost}
            height={180}
            yFormat={(v) => `$${v.toFixed(2)}`}
          />
        </MetricCard>

        <MetricCard title="Cluster CPU" timeRange={timeLabel}>
          <LineChart
            series={seeds.clusterCpu}
            height={180}
            yFormat={(v) => `${Math.round(v)}%`}
          />
        </MetricCard>

        <MetricCard title="Cluster memory" timeRange={timeLabel}>
          <LineChart
            series={seeds.clusterMemory}
            height={180}
            yFormat={(v) => `${Math.round(v)}MB`}
          />
        </MetricCard>

        <MetricCard title="Event rate" timeRange={timeLabel}>
          <LineChart series={seeds.eventRate} height={180} />
        </MetricCard>

        <MetricCard title="Active runs over time" timeRange={timeLabel}>
          <LineChart
            series={liveSeries?.activeRuns ?? seeds.activeRuns}
            height={180}
          />
        </MetricCard>

        <MetricCard title="Failure rate by type" timeRange={timeLabel}>
          <BarChart
            data={seeds.failureRate}
            xKey="x"
            yKey="total"
            color={failedColor}
            height={180}
          />
        </MetricCard>

        <MetricCard title="Approval latency" timeRange={timeLabel}>
          <LineChart
            series={seeds.approvalLatency}
            height={180}
            yFormat={(v) => `${Math.round(v)}s`}
          />
        </MetricCard>
      </div>
    </>
  );
}

export default MetricTimeSeriesPanel;
