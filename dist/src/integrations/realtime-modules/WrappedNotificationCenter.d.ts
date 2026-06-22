import { RMUseNotificationsReturn } from './types';
import { NotificationCenterProps, NotificationItem } from '../../components/shared/NotificationCenter';
export interface WrappedNotificationCenterProps extends Omit<NotificationCenterProps, 'items' | 'onItemClick' | 'onMarkAllRead' | 'onClearAll'> {
    /** Return value of useNotifications(channel?) from realtime-modules */
    notifications: RMUseNotificationsReturn;
    /** Override item click handler (default: markAsRead on the clicked id) */
    onItemClick?: (item: NotificationItem) => void;
}
export declare function WrappedNotificationCenter({ notifications, onItemClick, ...rest }: WrappedNotificationCenterProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedNotificationCenter.d.ts.map