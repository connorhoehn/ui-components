import { CSSProperties } from 'react';
export type SpinnerSize = 'sm' | 'md' | 'lg';
export interface SpinnerProps {
    size?: SpinnerSize;
    /** Arc color. Defaults to var(--color-primary). */
    color?: string;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare function Spinner({ size, color, className, style, 'aria-label': ariaLabel, 'data-testid': testId, }: SpinnerProps): import("react").JSX.Element;
export default Spinner;
//# sourceMappingURL=Spinner.d.ts.map