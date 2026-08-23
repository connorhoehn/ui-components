import { CSSProperties } from 'react';
import { JSX } from 'react';
import { ReactNode } from 'react';

export declare function AlertItem({ severity, title, description, timestamp, resolved, action, className, style, 'data-testid': testId, }: AlertItemProps): JSX.Element;

export declare interface AlertItemProps {
    severity: AlertSeverity;
    title: ReactNode;
    description?: ReactNode;
    /** Pre-formatted timestamp string (e.g. "10:48:21"). */
    timestamp?: ReactNode;
    /** When true, dims the row and shows a Resolved chip next to the title. */
    resolved?: boolean;
    /** Optional right-aligned action slot (button, menu). */
    action?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function AlertList({ items, title, headerSlot, loading, empty, maxHeight, className, style, 'data-testid': testId, }: AlertListProps): JSX.Element;

export declare interface AlertListEntry {
    id: string;
    severity: AlertSeverity;
    title: ReactNode;
    description?: ReactNode;
    timestamp?: ReactNode;
    resolved?: boolean;
    action?: ReactNode;
}

export declare interface AlertListProps {
    items: AlertListEntry[];
    /** Header title. Default: "Alerts". */
    title?: string;
    /** Override the header's right-side meta slot (replaces the default count chip). */
    headerSlot?: ReactNode;
    /** When true, render the loading state instead of the empty/items list. */
    loading?: boolean;
    /** Empty-state slot (rendered when items.length === 0 and !loading). */
    empty?: ReactNode;
    /** Optional max-height on the scrollable region (string CSS value, e.g. "320px"). */
    maxHeight?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type AlertSeverity = 'critical' | 'warning' | 'info';

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

export declare function HealthCell({ status, label, reason, dense, className, style, 'data-testid': testId, }: HealthCellProps): JSX.Element;

export declare interface HealthCellProps {
    status: HealthStatus;
    label: ReactNode;
    /** Detail line under the label. Falls back to the status string. */
    reason?: ReactNode;
    /** Tighter padding when used in dense grids. */
    dense?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function HealthGrid({ items, columns, dense, title, headerSlot, empty, className, style, 'data-testid': testId, }: HealthGridProps): JSX.Element;

export declare type HealthGridColumns = 1 | 2 | 3 | 4 | 6;

export declare interface HealthGridEntry {
    id: string;
    label: ReactNode;
    status: HealthStatus;
    reason?: ReactNode;
}

export declare interface HealthGridProps {
    items: HealthGridEntry[];
    /** Columns at >=640px. Default 3. Collapses to 1 below. */
    columns?: HealthGridColumns;
    /** Tighter padding/gap on cells + grid. Default false. */
    dense?: boolean;
    /** Optional header title — when present, wraps the grid in a Card with header. */
    title?: string;
    /** Right-aligned header meta slot (count chip, refresh button). */
    headerSlot?: ReactNode;
    /** Empty-state node when items.length === 0. */
    empty?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type HealthStatus = 'healthy' | 'degraded' | 'down' | 'unknown';

declare interface LineSeries {
    label: string;
    data: Array<{
        x: number | string;
        y: number;
    }>;
    color?: string;
}

export declare function MetricsPage(): JSX.Element;

export declare function MetricTimeSeriesPanel({ seeds, liveSeries, cols, isLiveData, failedColor, onResetZoom, onExportCsv, }: MetricTimeSeriesPanelProps): JSX.Element;

export declare interface MetricTimeSeriesPanelProps {
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
}

export declare function NodesPage({ nodes: nodesProp, onAddLatency, onKillNode, onTransferResource, }: NodesPageProps): JSX.Element;

export declare interface NodesPageProps {
    /**
     * Node summaries to render. When omitted, falls back to the Phase-1
     * fixture-derived set so the demo route is never blank.
     */
    nodes?: NodeSummary[];
    /** Host-wired per-node chaos: add latency. Section hidden when absent. */
    onAddLatency?: (nodeId: string) => void;
    /** Host-wired per-node chaos: kill. Section hidden when absent. */
    onKillNode?: (nodeId: string) => void;
    /** Host-wired resource transfer. Section hidden when absent. */
    onTransferResource?: (nodeId: string) => void;
}

declare interface NodeSummary {
    id: string;
    status: 'healthy' | 'degraded' | 'dead' | 'idle';
    region?: string;
    role?: string;
    cpu: number;
    memoryMb: number;
    connections: number;
    activeRuns: number;
    cpuHistory: number[];
}

export declare function ObservabilityLayout(): JSX.Element;

export { }
