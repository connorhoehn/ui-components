// frontend/src/components/observability/components/MetricsGraph.tsx
//
// Phase 1 placeholder chart card. Renders a title and a <Sparkline> per series
// (or a single `data` array). Per PIPELINES_PLAN.md §18.9 — real charting
// library swap lands in Phase 4.

import Sparkline from '../../shared/Sparkline';
import { cn } from '../../../lib/cn';

export interface MetricsGraphSeries {
  label: string;
  data: number[];
  color?: string;
}

export interface MetricsGraphProps {
  title: string;
  data?: number[];
  series?: MetricsGraphSeries[];
  yLabel?: string;
}

function MetricsGraph({ title, data, series, yLabel }: MetricsGraphProps) {
  const resolvedSeries: MetricsGraphSeries[] =
    series && series.length > 0
      ? series
      : data
        ? [{ label: title, data, color: '#646cff' }]
        : [];

  return (
    <div
      data-testid="metrics-graph"
      className="flex flex-col gap-2 font-[inherit] text-[13px] text-text-primary"
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-[13px] font-semibold text-text-primary">
          {title}
        </div>
        {yLabel && (
          <div className="text-[11px] text-text-tertiary">{yLabel}</div>
        )}
      </div>

      <div
        className={cn(
          'flex flex-col gap-1',
          'bg-surface-inset border border-border rounded-md px-3 py-2.5'
        )}
      >
        {resolvedSeries.length === 0 ? (
          <div className="text-xs text-text-tertiary">No data</div>
        ) : (
          resolvedSeries.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5"
            >
              <div
                className="text-[11px] text-text-secondary w-20 shrink-0 overflow-hidden text-ellipsis whitespace-nowrap"
                title={s.label}
              >
                {s.label}
              </div>
              <Sparkline
                data={s.data}
                width={180}
                height={28}
                color={s.color ?? '#646cff'}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MetricsGraph;
