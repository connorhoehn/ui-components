// src/integrations/realtime-modules/WrappedNotificationCenter.tsx
//
// NotificationCenter wired directly to a useNotifications() hook return from
// realtime-modules. Caller passes the `notifications` object; this component
// handles field adaptation.

import type { RMNotificationEntry, RMUseNotificationsReturn } from './types';
import { adaptNotifications } from './adapters';
import { NotificationCenter } from '../../components/shared/NotificationCenter';
import type { NotificationCenterProps } from '../../components/shared/NotificationCenter';
import type { NotificationItem } from '../../components/shared/NotificationCenter';

export interface WrappedNotificationCenterProps
  extends Omit<NotificationCenterProps, 'items' | 'onItemClick' | 'onMarkAllRead' | 'onClearAll'> {
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

export function WrappedNotificationCenter({
  notifications,
  onItemClick,
  ...rest
}: WrappedNotificationCenterProps) {
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
    <NotificationCenter
      items={items}
      onItemClick={handleItemClick}
      onMarkAllRead={notifications.markAllRead}
      onClearAll={notifications.clearAll}
      {...rest}
    />
  );
}
