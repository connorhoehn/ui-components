// src/integrations/realtime-modules/WrappedNotificationBell.tsx
//
// NotificationBell wired directly to a useNotifications() hook return from
// realtime-modules. Mirrors WrappedNotificationCenter: the caller passes the
// `notifications` object; this component handles field adaptation. Since
// 2.407.37.

import type { RMNotificationEntry, RMUseNotificationsReturn } from './types';
import { adaptNotifications } from './adapters';
import { NotificationBell } from '../../components/shared/NotificationBell';
import type { NotificationBellProps } from '../../components/shared/NotificationBell';
import type { NotificationItem } from '../../components/shared/NotificationCenter';

export interface WrappedNotificationBellProps
  extends Omit<NotificationBellProps, 'items' | 'onItemClick' | 'onMarkAllRead' | 'onClearAll'> {
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

export function WrappedNotificationBell({
  notifications,
  onItemClick,
  unreadCount,
  ...rest
}: WrappedNotificationBellProps) {
  const items = adaptNotifications(notifications.notifications);

  const handleItemClick = (item: NotificationItem) => {
    if (onItemClick) {
      onItemClick(
        item,
        notifications.notifications.find((n) => n.id === item.id),
      );
    } else {
      notifications.markAsRead(item.id);
    }
  };

  return (
    <NotificationBell
      items={items}
      unreadCount={unreadCount ?? notifications.unreadCount}
      onItemClick={handleItemClick}
      onMarkAllRead={notifications.markAllRead}
      onClearAll={notifications.clearAll}
      {...rest}
    />
  );
}
