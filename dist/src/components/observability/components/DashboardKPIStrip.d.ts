export interface KPIDelta {
    value: number;
    direction: 'up' | 'down';
}
export interface DashboardKPIStripProps {
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
declare function DashboardKPIStrip({ runsToday, runsSparkline, activeNow, pendingApprovals, failed24h, avgFirstTokenLatency, runsTodayDelta, failed24hDelta, onScrollToActive, onGoToPipelines, onGoToFailedEvents, }: DashboardKPIStripProps): import("react").JSX.Element;
export default DashboardKPIStrip;
//# sourceMappingURL=DashboardKPIStrip.d.ts.map