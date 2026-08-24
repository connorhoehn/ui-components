// frontend/src/components/observability/components/DashboardKPIStrip.tsx
//
// Extracted KPI row from DashboardPage — responsive auto-fit grid (minmax 170px).
// 5 cards may wrap to 4+1 or 5+0 depending on viewport; both layouts are
// intentional. Deltas suppressed when the underlying KPI is null/em-dash so we
// don't render a stale "▲ 12%" next to "—".

import KPICard from './KPICard';

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

function DashboardKPIStrip({
  runsToday,
  runsSparkline,
  activeNow,
  pendingApprovals,
  failed24h,
  avgFirstTokenLatency,
  runsTodayDelta,
  failed24hDelta,
  onScrollToActive,
  onGoToPipelines,
  onGoToFailedEvents,
}: DashboardKPIStripProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4">
      <KPICard
        title="Runs today"
        value={runsToday}
        // Still suppressed next to an em-dash: a delta on an unknown value
        // is meaningless even when the host supplies one.
        delta={typeof runsToday === 'number' ? runsTodayDelta : undefined}
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
        delta={typeof failed24h === 'number' ? failed24hDelta : undefined}
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
