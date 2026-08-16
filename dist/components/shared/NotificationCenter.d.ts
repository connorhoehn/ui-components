export interface NotificationItem {
    id: string;
    title: string;
    body?: string;
    timestamp?: string | number;
    read?: boolean;
    /** Optional icon / emoji / ReactNode prefix */
    icon?: string;
    /** Optional grouping / category label */
    category?: string;
}
export interface NotificationCenterProps {
    items: NotificationItem[];
    onItemClick?: (item: NotificationItem) => void;
    onMarkAllRead?: () => void;
    onClearAll?: () => void;
    className?: string;
    'data-testid'?: string;
}
export declare function NotificationCenter({ items, onItemClick, onMarkAllRead, onClearAll, className, 'data-testid': testId, }: NotificationCenterProps): import("react").JSX.Element;
export default NotificationCenter;
//# sourceMappingURL=NotificationCenter.d.ts.map