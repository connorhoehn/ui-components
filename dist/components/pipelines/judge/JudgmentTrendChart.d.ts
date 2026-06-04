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
export declare function JudgmentTrendChart({ aggregates, sortOrder, caption, loading, className, }: JudgmentTrendChartProps): import("react/jsx-runtime").JSX.Element;
export default JudgmentTrendChart;
//# sourceMappingURL=JudgmentTrendChart.d.ts.map