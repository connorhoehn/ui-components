import type { ReactNode } from 'react';
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';
export interface DividerProps {
    /** Optional caption sitting on the rule. */
    label?: ReactNode;
    /** Vertical margin around the rule. Default `md`. */
    spacing?: DividerSpacing;
    className?: string;
    'data-testid'?: string;
}
export declare function Divider({ label, spacing, className, 'data-testid': testId }: DividerProps): import("react").JSX.Element;
export default Divider;
//# sourceMappingURL=Divider.d.ts.map