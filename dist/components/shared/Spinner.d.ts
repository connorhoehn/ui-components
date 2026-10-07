import type { CSSProperties } from 'react';
export type SpinnerSize = 'sm' | 'md' | 'lg';
export interface SpinnerProps {
    size?: SpinnerSize;
    /** Arc color. Defaults to var(--color-primary). */
    color?: string;
    className?: string;
    style?: CSSProperties;
    /**
     * Purely visual — no role, no label, hidden from assistive technology.
     * Set this whenever the spinner sits inside a container that already
     * announces the wait (LoadingState does), otherwise the two live regions
     * nest and the reader says "Loading" twice.
     */
    decorative?: boolean;
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare function Spinner({ size, color, className, style, decorative, 'aria-label': ariaLabel, 'data-testid': testId, }: SpinnerProps): import("react").JSX.Element;
export default Spinner;
//# sourceMappingURL=Spinner.d.ts.map