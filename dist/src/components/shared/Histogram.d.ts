import { type DataAccent } from './dataAccent';
export interface HistogramProps {
    /** Counts per bucket, left to right. */
    buckets: readonly number[];
    /** Per-bucket labels; used for the tooltip and the accessible description. */
    labels?: readonly string[];
    accent?: DataAccent;
    /** Plot height in px (default 48). */
    height?: number;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare function Histogram({ buckets, labels, accent, height, className, 'aria-label': ariaLabel, 'data-testid': testId }: HistogramProps): import("react").JSX.Element;
export default Histogram;
//# sourceMappingURL=Histogram.d.ts.map