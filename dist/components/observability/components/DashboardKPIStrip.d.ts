export interface DashboardKPIStripProps {
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
declare function DashboardKPIStrip({ runsToday, runsSparkline, activeNow, pendingApprovals, failed24h, avgFirstTokenLatency, onScrollToActive, onGoToPipelines, onGoToFailedEvents, }: DashboardKPIStripProps): import("react/jsx-runtime").JSX.Element;
export default DashboardKPIStrip;
//# sourceMappingURL=DashboardKPIStrip.d.ts.map