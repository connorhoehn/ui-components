// frontend/src/components/observability/components/DashboardKPIStrip.tsx
//
// Extracted KPI row from DashboardPage — responsive auto-fit grid (minmax 170px).
// 5 cards may wrap to 4+1 or 5+0 depending on viewport; both layouts are
// intentional. Deltas suppressed when the underlying KPI is null/em-dash so we
// don't render a stale "▲ 12%" next to "—".

import KPICard from './KPICard';

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

function DashboardKPIStrip({
  runsToday,
  runsSparkline,
  activeNow,
  pendingApprovals,
  failed24h,
  avgFirstTokenLatency,
  onScrollToActive,
  onGoToPipelines,
  onGoToFailedEvents,
}: DashboardKPIStripProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4">
      <KPICard
        title="Runs today"
        value={runsToday}
        delta={typeof runsToday === 'number' ? { value: 12, direction: 'up' } : undefined}
        sparklineData={runsSparkline}
      />
      <KPICard
        title="Active now"
        value={activeNow}
        onClick={onScrollToActive}
      />
      <KPICard
        title="Pending approvals"
        value={pendingApprovals}
        onClick={onGoToPipelines}
      />
      <KPICard
        title="Failed (24h)"
        value={failed24h}
        delta={typeof failed24h === 'number' ? { value: 4, direction: 'down' } : undefined}
        onClick={onGoToFailedEvents}
      />
      <KPICard
        title="Avg first-token latency"
        value={avgFirstTokenLatency}
      />
    </div>
  );
}

export default DashboardKPIStrip;
