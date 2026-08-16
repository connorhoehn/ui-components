export interface ScoreBarGaugeProps {
    /** 0..1 value. Out-of-range inputs are clamped, NaN renders an empty gauge. */
    value: number;
    /** Threshold at which the gauge flips from "below threshold" tone to "above". 0..1, default 0.5. */
    threshold?: number;
    /** Override tone selection; otherwise derived from `value` vs `threshold`. */
    tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    /** Default 'md'. */
    size?: 'sm' | 'md' | 'lg';
    /** Render the percentage label inline (right-aligned). Default true. */
    showLabel?: boolean;
    /** Custom label formatter — receives the clamped 0..1 value. Default: percent. */
    formatLabel?: (value: number) => string;
    /**
     * aria-label override. When omitted, the component synthesizes a label
     * from value + threshold + pass state.
     */
    ariaLabel?: string;
    className?: string;
}
/**
 * Horizontal progress-bar gauge for 0..1 scores. Used by the judge
 * composites for per-criterion + overall scores, but generic enough to be
 * reused elsewhere (rate-limit budget, processing progress, etc.).
 *
 * a11y: rendered with `role="meter"`, `aria-valuenow / -valuemin / -valuemax`.
 */
export declare function ScoreBarGauge({ value, threshold, tone, size, showLabel, formatLabel, ariaLabel, className, }: ScoreBarGaugeProps): import("react").JSX.Element;
export default ScoreBarGauge;
//# sourceMappingURL=ScoreBarGauge.d.ts.map