import type { CSSProperties, ReactNode } from 'react';
export type KPIGridColumns = 1 | 2 | 3 | 4;
export interface KPIGridProps {
    /** Children — expected to be <StatCard> instances. */
    children: ReactNode;
    /** Number of columns at >=640px. Default 4. Always collapses to 1 below. */
    columns?: KPIGridColumns;
    /**
     * Column count for the 768–1023px (`md`) band. Undefined (the default)
     * emits no `md:` class, so `columns` applies starting at the `sm`
     * breakpoint (640px) exactly as it always has.
     *
     * Setting this steps the grid up in three stages instead: 1 column below
     * `sm`, `mdColumns` starting at `md` (768px), then `columns` starting at
     * `lg` (1024px) — no `sm:` class is emitted in this mode, since `sm` and
     * `md` would otherwise both apply at 768px+ and Tailwind's declaration
     * order (not specificity) makes the later one, `md`, win regardless of
     * which is visually "bigger". Set `mdColumns` lower than `columns` for a
     * grid that lives inside a nested rail (a laptop-width `md` view there is
     * far narrower than a full-width page at the same viewport size) so tiles
     * stay readable instead of cramming `columns` of them into the rail's
     * actual width.
     */
    mdColumns?: KPIGridColumns;
    /** Tighter gap (8px vs 16px). Default false. */
    dense?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function KPIGrid({ children, columns, mdColumns, dense, className, style, 'data-testid': testId, }: KPIGridProps): import("react").JSX.Element;
export default KPIGrid;
//# sourceMappingURL=KPIGrid.d.ts.map