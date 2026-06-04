import type { CSSProperties, ReactNode } from 'react';
export type StatusDotSize = 'xs' | 'sm' | 'md';
export interface StatusDotProps {
    /** Dot color. Defaults to var(--color-text-tertiary). */
    color?: string;
    pulse?: boolean;
    size?: StatusDotSize;
    label?: ReactNode;
    className?: string;
    style?: CSSProperties;
    title?: string;
    'data-testid'?: string;
    'aria-label'?: string;
}
export declare function StatusDot({ color, pulse, size, label, className, style, title, 'data-testid': testId, 'aria-label': ariaLabel, }: StatusDotProps): import("react/jsx-runtime").JSX.Element;
export default StatusDot;
//# sourceMappingURL=StatusDot.d.ts.map