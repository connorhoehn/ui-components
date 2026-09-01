import type { CSSProperties, ReactNode } from 'react';
export type ProgressBarSize = 'sm' | 'md';
export interface ProgressBarProps {
    value: number;
    /** Maximum value. Defaults to 100. */
    max?: number;
    /** Fill color. Defaults to var(--color-primary). */
    color?: string;
    size?: ProgressBarSize;
    label?: ReactNode;
    /** When true (default), shows "{value}/{max}". Otherwise shows percentage. */
    showRatio?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
}
export declare function ProgressBar({ value, max, color, size, label, showRatio, className, style, 'data-testid': testId, 'aria-label': ariaLabel, }: ProgressBarProps): import("react").JSX.Element;
export default ProgressBar;
//# sourceMappingURL=ProgressBar.d.ts.map