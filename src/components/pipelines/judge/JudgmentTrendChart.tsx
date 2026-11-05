import { useMemo } from 'react';
import { cn } from '../../../lib/cn';
import TrendSparkline from '../../shared/TrendSparkline';
import Chip from '../../shared/Chip';
import type { AggregateRow } from './types';

export interface JudgmentTrendChartProps {
  aggregates: AggregateRow[];
  /**
   * Sort direction for the table view. Default 'desc' (newest first).
   */
  sortOrder?: 'asc' | 'desc';
  /** Caption — defaults to `${count} days` if omitted. */
  caption?: string;
  /** Optional loading hint shown when aggregates is empty AND `loading=true`. */
  loading?: boolean;
  className?: string;
}

/**
 * Trend visualization for per-day judgment rollups:
 *   - top: sparkline of pass-rate per day
 *   - bottom: per-day table — date, pass-rate, mean score, cost
 *
 * Pure rendering — accepts `aggregates` as a prop, no fetch. Pair with
 * `useJudgmentAggregates({ pipelineId | rubricId })` at the call site
 * for live data; the hook lives in this folder for symmetry but isn't
 * required to render the chart.
 *
 * The chart works equally well for per-pipeline trends and per-rubric
 * trends — it doesn't know which axis the caller used.
 */
export function JudgmentTrendChart({
  aggregates,
  sortOrder = 'desc',
  caption,
  loading = false,
  className,
}: JudgmentTrendChartProps) {
  const ordered = useMemo(() => {
    const copy = aggregates.slice();
    copy.sort((a, b) => a.dayBucket.localeCompare(b.dayBucket));
    if (sortOrder === 'desc') copy.reverse();
    return copy;
  }, [aggregates, sortOrder]);

  // Sparkline always reads chronological so the line direction is
  // intuitive ("rising = recent improvement"), regardless of sortOrder.
  const sparklinePoints = useMemo(() => {
    const chrono = aggregates.slice().sort((a, b) => a.dayBucket.localeCompare(b.dayBucket));
    return chrono.map((r) => (r.numJudgments > 0 ? r.numPassed / r.numJudgments : 0));
  }, [aggregates]);

  if (aggregates.length === 0) {
    return (
      <section
        data-ui-part=""
        className={cn(
          'flex min-h-[120px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface-panel p-4 text-text-tertiary',
          className,
        )}
      >
        <span className="text-[12px]">{loading ? 'Loading trends…' : 'No judgment activity in range.'}</span>
      </section>
    );
  }

  const totalJudgments = aggregates.reduce((acc, r) => acc + r.numJudgments, 0);
  const totalPassed = aggregates.reduce((acc, r) => acc + r.numPassed, 0);
  const totalCost = aggregates.reduce((acc, r) => acc + r.sumCostUsd, 0);
  const overallPassRate = totalJudgments > 0 ? totalPassed / totalJudgments : 0;

  return (
    <section data-ui-part="" className={cn('flex w-full flex-col gap-2', className)}>
      <header className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
          {caption ?? `Judgment trend — ${aggregates.length} days`}
        </span>
        <Chip
          tone={overallPassRate >= 0.9 ? 'success' : overallPassRate >= 0.6 ? 'warning' : 'danger'}
          size="sm"
        >
          {(overallPassRate * 100).toFixed(0)}% pass · {totalJudgments} judgments
        </Chip>
        <span className="ml-auto font-mono text-[11px] text-text-tertiary">
          total cost ${totalCost.toFixed(4)}
        </span>
      </header>
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-medium uppercase text-text-tertiary">pass-rate</span>
        <TrendSparkline
          points={sparklinePoints}
          yMin={0}
          yMax={1}
          width={240}
          height={36}
          ariaLabel={`Pass-rate over ${sparklinePoints.length} days, ending at ${(sparklinePoints[sparklinePoints.length - 1] * 100).toFixed(0)}%`}
        />
      </div>
      <table data-ui-part="" className="w-full border-collapse text-[12px]">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-text-tertiary">
            <th scope="col" className="py-1 pr-2">date</th>
            <th scope="col" className="py-1 pr-2">pass</th>
            <th scope="col" className="py-1 pr-2">mean</th>
            <th scope="col" className="py-1 pr-2 text-right">judgments</th>
            <th scope="col" className="py-1 pl-2 text-right">cost</th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((row) => (
            <TrendRow key={row.aggregateKey} row={row} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

function TrendRow({ row }: { row: AggregateRow }) {
  const passRate = row.numJudgments > 0 ? row.numPassed / row.numJudgments : 0;
  const meanScore = row.numJudgments > 0 ? row.sumOverallScore / row.numJudgments : 0;
  const tone = passRate >= 0.9 ? 'success' : passRate >= 0.6 ? 'warning' : 'danger';
  return (
    <tr className="border-t border-border">
      <td className="py-1 pr-2 font-mono">{row.dayBucket}</td>
      <td className="py-1 pr-2">
        <Chip tone={tone} size="sm">{(passRate * 100).toFixed(0)}%</Chip>
      </td>
      <td className="py-1 pr-2 font-mono">{(meanScore * 100).toFixed(0)}%</td>
      <td className="py-1 pr-2 text-right font-mono">{row.numJudgments}</td>
      <td className="py-1 pl-2 text-right font-mono">${row.sumCostUsd.toFixed(4)}</td>
    </tr>
  );
}

export default JudgmentTrendChart;
