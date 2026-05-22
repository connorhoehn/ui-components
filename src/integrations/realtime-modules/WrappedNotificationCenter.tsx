// src/integrations/realtime-modules/WrappedNotificationCenter.tsx
//
// NotificationCenter wired directly to a useNotifications() hook return from
// realtime-modules. Caller passes the `notifications` object; this component
// handles field adaptation.

import type { RMUseNotificationsReturn } from './types';
import { adaptNotifications } from './adapters';
import { NotificationCenter } from '../../components/shared/NotificationCenter';
import type { NotificationCenterProps } from '../../components/shared/NotificationCenter';
import type { NotificationItem } from '../../components/shared/NotificationCenter';

export interface WrappedNotificationCenterProps
  extends Omit<NotificationCenterProps, 'items' | 'onItemClick' | 'onMarkAllRead' | 'onClearAll'> {
  /** Return value of useNotifications(channel?) from realtime-modules */
  notifications: RMUseNotificationsReturn;
  /** Override item click handler (default: markAsRead on the clicked id) */
  onItemClick?: (item: NotificationItem) => void;
}

export function WrappedNotificationCenter({
  notifications,
  onItemClick,
  ...rest
}: WrappedNotificationCenterProps) {
  const items = adaptNotifications(notifications.notifications);

  const handleItemClick = (item: NotificationItem) => {
    if (onItemClick) {
      onItemClick(item);
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
