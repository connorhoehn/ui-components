import { JSX } from 'react/jsx-runtime';

export declare function DashboardKPIStrip({ runsToday, runsSparkline, activeNow, pendingApprovals, failed24h, avgFirstTokenLatency, onScrollToActive, onGoToPipelines, onGoToFailedEvents, }: DashboardKPIStripProps): JSX.Element;

declare interface DashboardKPIStripProps {
    runsToday: number | string;
    runsSparkline: number[];
    activeNow: number | string;
    pendingApprovals: number | string;
    failed24h: number | string;
    avgFirstTokenLatency: string;
    onScrollToActive: () => void;
    onGoToPipelines: () => void;
    onGoToFailedEvents: () => void;
}

export declare function DashboardPage(): JSX.Element;

export declare function EventsPage(): JSX.Element;

declare interface LineSeries {
    label: string;
    data: Array<{
        x: number | string;
        y: number;
    }>;
    color?: string;
}

export declare function MetricsPage(): JSX.Element;

export declare function MetricTimeSeriesPanel({ seeds, liveSeries, cols, isLiveData, failedColor, }: MetricTimeSeriesPanelProps): JSX.Element;

declare interface MetricTimeSeriesPanelProps {
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

export declare function NodesPage(): JSX.Element;

export declare function ObservabilityLayout(): JSX.Element;

export { }
