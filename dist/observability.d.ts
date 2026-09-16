import { CSSProperties } from 'react';
import { JSX } from 'react';
import { ReactNode } from 'react';

declare interface ActiveRunRow {
    pipelineId: string;
    pipelineName: string;
    runId: string;
    currentStep: string;
    ownerNode: string;
    elapsed: string;
    status: string;
}

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

export declare function DashboardKPIStrip({ runsToday, runsSparkline, activeNow, pendingApprovals, failed24h, avgFirstTokenLatency, runsTodayDelta, failed24hDelta, onScrollToActive, onGoToPipelines, onGoToFailedEvents, }: DashboardKPIStripProps): JSX.Element;

declare interface DashboardKPIStripProps {
    runsToday: number | string;
    runsSparkline: number[];
    activeNow: number | string;
    pendingApprovals: number | string;
    failed24h: number | string;
    avgFirstTokenLatency: string;
    /**
     * Period-over-period change for "Runs today". Host-supplied: the strip has
     * no history to derive one from, and until v2.93.0 it hard-coded
     * `▲ 12%` — every operator with live bridge metrics saw the same invented
     * 12% growth under a real number, forever. Omit and no delta renders.
     */
    runsTodayDelta?: KPIDelta;
    /** Period-over-period change for "Failed (24h)". Was hard-coded `▼ 4%`. */
    failed24hDelta?: KPIDelta;
    onScrollToActive: () => void;
    onGoToPipelines: () => void;
    onGoToFailedEvents: () => void;
}

export declare function DashboardPage({ activeRuns }?: DashboardPageProps): JSX.Element;

declare interface DashboardPageProps {
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

declare interface KPIDelta {
    value: number;
    direction: 'up' | 'down';
}

declare interface LineSeries {
    label: string;
    data: Array<{
        x: number | string;
        y: number;
    }>;
    color?: string;
}

export declare function MetricsGraph({ title, data, series, yLabel, sparkWidth, sparkHeight, }: MetricsGraphProps): JSX.Element;

export declare interface MetricsGraphProps {
    title: string;
    data?: number[];
    series?: MetricsGraphSeries[];
    yLabel?: string;
    /**
     * Sparkline size. The defaults suit the narrow dashboard card this was
     * built for; a card given a whole page column needs to fill it, and a
     * 180px line stranded in 600px of space reads as a rendering fault rather
     * than a deliberate size.
     */
    sparkWidth?: number;
    sparkHeight?: number;
}

export declare interface MetricsGraphSeries {
    label: string;
    data: number[];
    color?: string;
}

export declare function MetricsPage(): JSX.Element;

export declare function MetricTimeSeriesPanel({ seeds, liveSeries, cols, isLiveData, failedColor, onResetZoom, onExportCsv, timeRange, onTimeRangeChange, refreshInterval, onRefreshIntervalChange, }: MetricTimeSeriesPanelProps): JSX.Element;

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

/** Poll cadence the host can offer. `'off'` means "stop polling". */
declare type RefreshInterval = 'off' | '5s' | '30s' | '60s';

/** Chart window the host can offer. Only the host can honour one — see props. */
declare type TimeRange = '15m' | '1h' | '24h' | '7d';

export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}
