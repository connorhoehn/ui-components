import { CSSProperties, ReactNode } from 'react';
import { default as AlertItem, AlertItemProps, AlertSeverity } from './AlertItem';
export interface AlertListEntry {
    id: string;
    severity: AlertSeverity;
    title: ReactNode;
    description?: ReactNode;
    timestamp?: ReactNode;
    resolved?: boolean;
    action?: ReactNode;
}
export interface AlertListProps {
    items: AlertListEntry[];
    /** Header title. Default: "Alerts". */
    title?: string;
    /** Override the header's right-side meta slot (replaces the default count chip). */
    headerSlot?: ReactNode;
    /** When true, render the loading state instead of the empty/items list. */
    loading?: boolean;
    /** Empty-state slot (rendered when items.length === 0 and !loading). */
    empty?: ReactNode;
    /** Optional max-height on the scrollable region (string CSS value, e.g. "320px"). */
    maxHeight?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function AlertList({ items, title, headerSlot, loading, empty, maxHeight, className, style, 'data-testid': testId, }: AlertListProps): import("react").JSX.Element;
export type { AlertSeverity, AlertItemProps };
export { AlertItem };
export default AlertList;
//# sourceMappingURL=AlertList.d.ts.map