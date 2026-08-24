// frontend/src/components/observability/components/MetricTimeSeriesPanel.tsx
//
// Extracted from MetricsPage — encapsulates the time-range/refresh controls bar
// and the responsive chart grid. Receives seeded + live series and renders
// MetricCards with their chart children.

import MetricCard from './MetricCard';
import {
  LineChart,
  StackedAreaChart,
  BarChart,
  type LineSeries,
} from '../../shared/Chart';
import { cn } from '../../../lib/cn';
import { Select } from '../../forms/Select';

/** Chart window the host can offer. Only the host can honour one — see props. */
type TimeRange = '15m' | '1h' | '24h' | '7d';
const TIME_RANGES: Array<{ value: TimeRange; label: string }> = [
  { value: '15m', label: 'Last 15m' },
  { value: '1h', label: 'Last 1h' },
  { value: '24h', label: 'Last 24h' },
  { value: '7d', label: 'Last 7d' },
];

/** Poll cadence the host can offer. `'off'` means "stop polling". */
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
  /** Host-wired zoom reset. The button renders only when provided. */
  onResetZoom?: () => void;
  /** Host-wired CSV export. The button renders only when provided. */
  onExportCsv?: () => void;
  /**
   * Currently-selected chart window. The panel cannot window the series it is
   * given, so this is host state: the host re-fetches `seeds`/`liveSeries` for
   * the chosen range. The Select — and the per-card range chip — render ONLY
   * when both this and `onTimeRangeChange` are supplied, because a range the
   * data does not honour is worse than no control at all.
   */
  timeRange?: TimeRange;
  /** Host handler for the chart-window Select. See `timeRange`. */
  onTimeRangeChange?: (value: TimeRange) => void;
  /**
   * Currently-selected poll cadence. Host state — the panel does no fetching,
   * so only the host can act on it. The Select renders ONLY when both this and
   * `onRefreshIntervalChange` are supplied.
   */
  refreshInterval?: RefreshInterval;
  /** Host handler for the refresh-cadence Select. See `refreshInterval`. */
  onRefreshIntervalChange?: (value: RefreshInterval) => void;
}

function MetricTimeSeriesPanel({
  seeds,
  liveSeries,
  cols,
  isLiveData,
  failedColor,
  onResetZoom,
  onExportCsv,
  timeRange,
  onTimeRangeChange,
  refreshInterval,
  onRefreshIntervalChange,
}: MetricTimeSeriesPanelProps) {
  // Both selectors used to be panel-local `useState`. Neither value was ever
  // read by anything that fetches or filters: picking "Refresh: 5s" changed
  // no poll, and picking "Last 7d" only re-captioned every card while the
  // plotted points stayed byte-identical. They are host state now, and are
  // hidden entirely unless the host wires them.
  const timeRangeWired = timeRange !== undefined && onTimeRangeChange !== undefined;
  const refreshWired =
    refreshInterval !== undefined && onRefreshIntervalChange !== undefined;

  // Only label a card with a window the host is actually honouring.
  const timeLabel = timeRangeWired
    ? TIME_RANGES.find((t) => t.value === timeRange)?.label ?? ''
    : undefined;

  // Provenance is PER CARD. Only four of the ten charts have a live series to
  // fall back from; the other six plot `seeds.*` — deterministic LCG noise —
  // no matter what the toolbar pill says. A single panel-level "live" badge
  // vouched for all ten, so an operator read seeded step-duration p99,
  // cluster CPU/memory, event rate, failure mix and approval latency as
  // measurements of their cluster. Each card now says which it is.
  const isSample = (live: unknown) => live === null || live === undefined;

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel">
        {timeRangeWired && (
          <Select
            data-testid="metrics-time-range"
            aria-label="Time range"
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
            className="w-auto min-w-[120px]"
            options={TIME_RANGES.map((t) => ({ value: t.value, label: t.label }))}
          />
        )}

        {refreshWired && (
          <Select
            data-testid="metrics-refresh-interval"
            aria-label="Refresh interval"
            value={refreshInterval}
            onChange={(e) => onRefreshIntervalChange(e.target.value as RefreshInterval)}
            className="w-auto min-w-[100px]"
            options={REFRESH_INTERVALS.map((r) => ({ value: r.value, label: `Refresh: ${r.label}` }))}
          />
        )}

        {onResetZoom && (
          <button
            data-testid="metrics-reset-zoom"
            onClick={onResetZoom}
            className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0"
          >
            Reset zoom
          </button>
        )}

        {onExportCsv && (
          <button
            data-testid="metrics-export-csv"
            onClick={onExportCsv}
            className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0"
          >
            Export CSV
          </button>
        )}

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
        <MetricCard title="Runs per minute" timeRange={timeLabel} sample={isSample(liveSeries?.runsPerMinute)}>
          <StackedAreaChart
            series={liveSeries?.runsPerMinute ?? seeds.runsPerMinute}
            height={180}
          />
        </MetricCard>

        <MetricCard title="Step duration (p50/p95/p99)" timeRange={timeLabel} sample>
          <LineChart
            series={seeds.stepDuration}
            height={180}
            yFormat={(v) => `${Math.round(v)}ms`}
          />
        </MetricCard>

        <MetricCard title="LLM tokens" timeRange={timeLabel} sample={isSample(liveSeries?.llmTokens)}>
          <LineChart
            series={liveSeries?.llmTokens ?? seeds.llmTokens}
            height={180}
          />
        </MetricCard>

        <MetricCard title="LLM cost" timeRange={timeLabel} sample={isSample(liveSeries?.llmCost)}>
          <LineChart
            series={liveSeries?.llmCost ?? seeds.llmCost}
            height={180}
            yFormat={(v) => `$${v.toFixed(2)}`}
          />
        </MetricCard>

        <MetricCard title="Cluster CPU" timeRange={timeLabel} sample>
          <LineChart
            series={seeds.clusterCpu}
            height={180}
            yFormat={(v) => `${Math.round(v)}%`}
          />
        </MetricCard>

        <MetricCard title="Cluster memory" timeRange={timeLabel} sample>
          <LineChart
            series={seeds.clusterMemory}
            height={180}
            yFormat={(v) => `${Math.round(v)}MB`}
          />
        </MetricCard>

        <MetricCard title="Event rate" timeRange={timeLabel} sample>
          <LineChart series={seeds.eventRate} height={180} />
        </MetricCard>

        <MetricCard title="Active runs over time" timeRange={timeLabel} sample={isSample(liveSeries?.activeRuns)}>
          <LineChart
            series={liveSeries?.activeRuns ?? seeds.activeRuns}
            height={180}
          />
        </MetricCard>

        <MetricCard title="Failure rate by type" timeRange={timeLabel} sample>
          <BarChart
            data={seeds.failureRate}
            xKey="x"
            yKey="total"
            color={failedColor}
            height={180}
          />
        </MetricCard>

        <MetricCard title="Approval latency" timeRange={timeLabel} sample>
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
