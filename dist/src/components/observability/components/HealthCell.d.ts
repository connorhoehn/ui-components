import type { CSSProperties, ReactNode } from 'react';
export type HealthStatus = 'healthy' | 'degraded' | 'down' | 'unknown';
export interface HealthCellProps {
    status: HealthStatus;
    label: ReactNode;
    /** Detail line under the label. Falls back to the status string. */
    reason?: ReactNode;
    /** Tighter padding when used in dense grids. */
    dense?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function HealthCell({ status, label, reason, dense, className, style, 'data-testid': testId, }: HealthCellProps): import("react").JSX.Element;
export default HealthCell;
//# sourceMappingURL=HealthCell.d.ts.map