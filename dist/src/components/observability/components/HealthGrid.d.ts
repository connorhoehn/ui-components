import { CSSProperties, ReactNode } from 'react';
import { default as HealthCell, HealthStatus } from './HealthCell';
export interface HealthGridEntry {
    id: string;
    label: ReactNode;
    status: HealthStatus;
    reason?: ReactNode;
}
export type HealthGridColumns = 1 | 2 | 3 | 4 | 6;
export interface HealthGridProps {
    items: HealthGridEntry[];
    /** Columns at >=640px. Default 3. Collapses to 1 below. */
    columns?: HealthGridColumns;
    /** Tighter padding/gap on cells + grid. Default false. */
    dense?: boolean;
    /** Optional header title — when present, wraps the grid in a Card with header. */
    title?: string;
    /** Right-aligned header meta slot (count chip, refresh button). */
    headerSlot?: ReactNode;
    /** Empty-state node when items.length === 0. */
    empty?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function HealthGrid({ items, columns, dense, title, headerSlot, empty, className, style, 'data-testid': testId, }: HealthGridProps): import("react").JSX.Element;
export type { HealthStatus };
export { HealthCell };
export default HealthGrid;
//# sourceMappingURL=HealthGrid.d.ts.map