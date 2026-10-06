import { type LineSeries } from '../../shared/Chart';
/** Chart window the host can offer. Only the host can honour one — see props. */
type TimeRange = '15m' | '1h' | '24h' | '7d';
/** Poll cadence the host can offer. `'off'` means "stop polling". */
type RefreshInterval = 'off' | '5s' | '30s' | '60s';
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
declare function MetricTimeSeriesPanel({ seeds, liveSeries, cols, isLiveData, failedColor, onResetZoom, onExportCsv, timeRange, onTimeRangeChange, refreshInterval, onRefreshIntervalChange, }: MetricTimeSeriesPanelProps): import("react").JSX.Element;
export default MetricTimeSeriesPanel;
//# sourceMappingURL=MetricTimeSeriesPanel.d.ts.map