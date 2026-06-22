import { LineSeries } from '../../shared/Chart';
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
declare function MetricTimeSeriesPanel({ seeds, liveSeries, cols, isLiveData, failedColor, }: MetricTimeSeriesPanelProps): import("react").JSX.Element;
export default MetricTimeSeriesPanel;
//# sourceMappingURL=MetricTimeSeriesPanel.d.ts.map