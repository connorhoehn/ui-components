import type { AggregateRow } from './types';
export interface AggregateSummaryCardProps {
    aggregate: AggregateRow;
    className?: string;
}
/**
 * Single-row summary card for one day's rollup. Pass-rate as a gauge,
 * verdict tone derived from numPassed/numJudgments, totals on the right.
 *
 * No fetch. No URL knowledge. Renders whatever `aggregate` it receives.
 */
export declare function AggregateSummaryCard({ aggregate, className }: AggregateSummaryCardProps): import("react/jsx-runtime").JSX.Element;
export default AggregateSummaryCard;
//# sourceMappingURL=AggregateSummaryCard.d.ts.map