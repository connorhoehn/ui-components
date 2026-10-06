import { type InlinePopoverPlacement } from './InlinePopover';
import { type NotificationItem } from './NotificationCenter';
export type NotificationBellSize = 'sm' | 'md';
export interface NotificationBellProps {
    /** The feed, in `NotificationCenter`'s shape. */
    items: NotificationItem[];
    /** Unread count on the badge and in the name. Default: items whose `read` is not `true`. */
    unreadCount?: number;
    /** A row was activated. The popover closes after the call. */
    onItemClick?: (item: NotificationItem) => void;
    onMarkAllRead?: () => void;
    onClearAll?: () => void;
    /** Accessible name of the button and the popover. Default "Activity". */
    label?: string;
    /** Where the popover opens. Default `bottom-end` (a bell at a header's right edge). */
    placement?: InlinePopoverPlacement;
    /** `sm` = 28px, the header-control family; `md` = 32px. Default `md`. */
    size?: NotificationBellSize;
    className?: string;
    /** Root test id (default `notification-bell`); parts: `-button`, `-badge`, `-popover`, `-center`, `-empty`. */
    'data-testid'?: string;
}
/** The button's accessible name: the label, plus the unread count when there is one. */
export declare function notificationBellLabel(label: string, unread: number): string;
export declare function NotificationBell({ items, unreadCount, onItemClick, onMarkAllRead, onClearAll, label, placement, size, className, 'data-testid': testId, }: NotificationBellProps): import("react").JSX.Element;
export default NotificationBell;
//# sourceMappingURL=NotificationBell.d.ts.map