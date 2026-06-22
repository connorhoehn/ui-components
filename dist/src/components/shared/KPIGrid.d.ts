import { CSSProperties, ReactNode } from 'react';
export type KPIGridColumns = 1 | 2 | 3 | 4;
export interface KPIGridProps {
    /** Children — expected to be <StatCard> instances. */
    children: ReactNode;
    /** Number of columns at >=640px. Default 4. Always collapses to 1 below. */
    columns?: KPIGridColumns;
    /** Tighter gap (8px vs 16px). Default false. */
    dense?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function KPIGrid({ children, columns, dense, className, style, 'data-testid': testId, }: KPIGridProps): import("react").JSX.Element;
export default KPIGrid;
//# sourceMappingURL=KPIGrid.d.ts.map