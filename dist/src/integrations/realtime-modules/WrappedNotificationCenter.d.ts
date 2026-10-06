import type { RMNotificationEntry, RMUseNotificationsReturn } from './types';
import type { NotificationCenterProps } from '../../components/shared/NotificationCenter';
import type { NotificationItem } from '../../components/shared/NotificationCenter';
export interface WrappedNotificationCenterProps extends Omit<NotificationCenterProps, 'items' | 'onItemClick' | 'onMarkAllRead' | 'onClearAll'> {
    /** Return value of useNotifications(channel?) from realtime-modules */
    notifications: RMUseNotificationsReturn;
    /**
     * Override item click handler (default: markAsRead on the clicked id).
     *
     * The SECOND argument is the original realtime-modules entry, and it is the
     * reason this signature is not just `(item)`. `NotificationItem` has no
     * field for `channel`, `payload` or `action`, so an adapted item cannot say
     * where a notification points — which made click-to-navigate, the main thing
     * a host does with a notification, impossible through this component. The
     * entry is undefined only if the click arrives for an id the hook no longer
     * holds.
     */
    onItemClick?: (item: NotificationItem, entry: RMNotificationEntry | undefined) => void;
}
export declare function WrappedNotificationCenter({ notifications, onItemClick, ...rest }: WrappedNotificationCenterProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedNotificationCenter.d.ts.map