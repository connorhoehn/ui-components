export type RunEstimateUnit = 'usd' | 'ms';
export type RunEstimate = {
    kind: 'range';
    low: number;
    high: number;
    unit: RunEstimateUnit;
} | {
    kind: 'none';
    reason: string;
} | {
    kind: 'loading';
};
export type RunEstimateConfidenceLevel = 'none' | 'low' | 'medium' | 'high';
/** Sample size → confidence: 0 none, 1–2 low, 3–5 medium, more than 5 high. */
export declare function confidenceOf(sampleSize: number): RunEstimateConfidenceLevel;
/** "No prior runs" for n = 0, else "Low confidence · Based on 2 runs". */
export declare function confidenceNote(sampleSize: number): string;
/** Dollars: two decimals, and "<$0.01" for anything above zero but below a cent. */
export declare function formatUsd(value: number): string;
/** Format one duration in ms: "40 s", "6 min", "1.5 h". */
export declare function formatDuration(ms: number): string;
/**
 * The display text for an estimate. Ranges read "$0.03 – $0.30" or
 * "1 – 6 min"; equal ends collapse to one value. A range whose numbers are
 * not finite or are negative is not an estimate — it reads "Unavailable"
 * rather than printing NaN.
 */
export declare function formatEstimate(estimate: RunEstimate): string;
export interface EstimateRowProps {
    label: string;
    estimate: RunEstimate;
    className?: string;
    'data-testid'?: string;
}
export declare function EstimateRow({ label, estimate, className, 'data-testid': testId }: EstimateRowProps): import("react").JSX.Element;
export default EstimateRow;
//# sourceMappingURL=EstimateRow.d.ts.map