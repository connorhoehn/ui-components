export type DotMeterTone = 'code' | 'surface';
export interface DotMeterProps {
    /** Row label, e.g. `current` / `weekly`. Omit for a bare meter. */
    label?: string;
    /** 0–1. Values outside the range are clamped rather than overflowing. */
    value: number;
    /** Number of dots. Ten is the default because it reads as a percentage. */
    segments?: number;
    /** Show the value as a percentage after the dots. Default true. */
    showPercent?: boolean;
    /**
     * Trailing note, conventionally the reset time (`⟳ Sun 10:00pm`). This is
     * the field that makes a quota meter actionable — "89% used" is alarming
     * until you know it resets in nine minutes.
     */
    note?: string;
    /**
     * Fraction above which the meter reads as spent. Default 0.85. Below it the
     * meter is neutral: a half-used budget is not a warning.
     */
    warnAbove?: number;
    tone?: DotMeterTone;
    className?: string;
    'data-testid'?: string;
}
export declare function DotMeter({ label, value, segments, showPercent, note, warnAbove, tone, className, 'data-testid': testId, }: DotMeterProps): import("react").JSX.Element;
export default DotMeter;
//# sourceMappingURL=DotMeter.d.ts.map