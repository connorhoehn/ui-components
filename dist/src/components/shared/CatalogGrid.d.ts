import type { CSSProperties, ReactNode } from 'react';
export type CatalogGridColumns = 1 | 2 | 3 | 4 | 5;
export interface CatalogGridProps {
    /** Children — expected to be <ThumbnailCard> instances (any node accepted). */
    children: ReactNode;
    /** Target column count at >=640px. Default 3. Always collapses to 1 below. */
    columns?: CatalogGridColumns;
    /** Tighter gap (12px vs 20px). Default false. */
    dense?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function CatalogGrid({ children, columns, dense, className, style, 'data-testid': testId, }: CatalogGridProps): import("react").JSX.Element;
export default CatalogGrid;
//# sourceMappingURL=CatalogGrid.d.ts.map