import type { CSSProperties, ReactNode } from 'react';
export type AlertSeverity = 'critical' | 'warning' | 'info';
export interface AlertItemProps {
    severity: AlertSeverity;
    title: ReactNode;
    description?: ReactNode;
    /** Pre-formatted timestamp string (e.g. "10:48:21"). */
    timestamp?: ReactNode;
    /** When true, dims the row and shows a Resolved chip next to the title. */
    resolved?: boolean;
    /** Optional right-aligned action slot (button, menu). */
    action?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function AlertItem({ severity, title, description, timestamp, resolved, action, className, style, 'data-testid': testId, }: AlertItemProps): import("react").JSX.Element;
export default AlertItem;
//# sourceMappingURL=AlertItem.d.ts.map