import type { RMNotificationEntry, RMUseNotificationsReturn } from './types';
import type { NotificationBellProps } from '../../components/shared/NotificationBell';
import type { NotificationItem } from '../../components/shared/NotificationCenter';
export interface WrappedNotificationBellProps extends Omit<NotificationBellProps, 'items' | 'onItemClick' | 'onMarkAllRead' | 'onClearAll'> {
    /** Return value of useNotifications(channel?) from realtime-modules */
    notifications: RMUseNotificationsReturn;
    /**
     * Override item click handler (default: markAsRead on the clicked id).
     *
     * The SECOND argument is the original realtime-modules entry — see
     * `WrappedNotificationCenterProps.onItemClick`: `NotificationItem` has no
     * `channel`, `payload` or `action`, so the entry is what says where a
     * notification points. Undefined only if the click arrives for an id the
     * hook no longer holds.
     */
    onItemClick?: (item: NotificationItem, entry: RMNotificationEntry | undefined) => void;
}
export declare function WrappedNotificationBell({ notifications, onItemClick, unreadCount, ...rest }: WrappedNotificationBellProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedNotificationBell.d.ts.map