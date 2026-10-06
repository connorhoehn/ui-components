import type { CSSProperties, ReactNode } from 'react';
import { type ToneOrAlias } from './tones';
export type ProgressBarSize = 'sm' | 'md';
export interface ProgressBarProps {
    value: number;
    /** Maximum value. Defaults to 100. */
    max?: number;
    /** Fill color. Defaults to var(--color-primary). */
    color?: string;
    size?: ProgressBarSize;
    /**
     * Tone the fill (and the value readout) switches to once the bar is full.
     *
     * A completion bar that turns green at 100% is a different signal from one
     * that just reaches the right-hand edge, and reproducing it meant computing
     * the colour outside and passing `color`, then hand-writing a second
     * coloured `<span>` for the percentage — which is how the checklist reader
     * ended up with its own label row instead of using this one. Default
     * undefined: the bar keeps `color` at every value.
     */
    completeTone?: ToneOrAlias;
    label?: ReactNode;
    /**
     * Right-hand readout, replacing the computed ratio/percentage. Use it for a
     * caption the arithmetic here can't produce (a remaining count, an ETA).
     */
    valueLabel?: ReactNode;
    /** When true (default), shows "{value}/{max}". Otherwise shows percentage. */
    showRatio?: boolean;
    /** Extra classes on the label row, for a caller matching a nearby caption size. */
    labelClassName?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
}
export declare function ProgressBar({ value, max, color, size, completeTone, label, valueLabel, showRatio, labelClassName, className, style, 'data-testid': testId, 'aria-label': ariaLabel, }: ProgressBarProps): import("react").JSX.Element;
export default ProgressBar;
//# sourceMappingURL=ProgressBar.d.ts.map