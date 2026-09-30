// NotificationBell — the header's activity trigger: a bell with an unread
// count that opens the NotificationCenter in an anchored popover.
//
// Composed from library parts only: `IconButton` + `BellIcon`, a `Badge`
// count at the button's top-right (hidden at 0, "99+" past 99), an
// `InlinePopover` anchored to the button (Esc / outside click close it, focus
// goes back to the button), and `NotificationCenter` inside — or an
// `EmptyState` ("Nothing new") when there are no items at all.
//
// Open state is internal: a header drops it in and passes items. The unread
// count is part of the button's accessible name ("Activity, 3 unread"), so
// the badge itself is hidden from assistive tech rather than announced twice.
// Since 2.407.37.

import { useCallback, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { BellIcon } from '../ui/Icons';
import { Badge } from './Badge';
import EmptyState from './EmptyState';
import { InlinePopover, type InlinePopoverPlacement } from './InlinePopover';
import { NotificationCenter, type NotificationItem } from './NotificationCenter';

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
export function notificationBellLabel(label: string, unread: number): string {
  return unread > 0 ? `${label}, ${unread} unread` : label;
}

export function NotificationBell({
  items,
  unreadCount,
  onItemClick,
  onMarkAllRead,
  onClearAll,
  label = 'Activity',
  placement = 'bottom-end',
  size = 'md',
  className,
  'data-testid': testId = 'notification-bell',
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLSpanElement | null>(null);
  const unread = Math.max(0, Math.trunc(unreadCount ?? items.filter((i) => i.read !== true).length));

  const close = useCallback(() => {
    setOpen(false);
    anchorRef.current?.querySelector('button')?.focus();
  }, []);

  const handleItemClick = onItemClick
    ? (item: NotificationItem) => {
        onItemClick(item);
        close();
      }
    : undefined;

  const empty = items.length === 0;

  return (
    <span ref={anchorRef} data-testid={testId} className={cn('relative inline-flex', className)}>
      <IconButton
        aria-label={notificationBellLabel(label, unread)}
        aria-haspopup="dialog"
        aria-expanded={open}
        size={size}
        className={cn('relative', size === 'sm' && 'h-7 w-7')}
        onClick={() => setOpen((o) => !o)}
        data-testid={`${testId}-button`}
      >
        <BellIcon size={size === 'sm' ? 16 : 18} />
        {unread > 0 && (
          <span aria-hidden="true" className="pointer-events-none absolute -right-1.5 -top-1.5">
            <Badge variant="count" value={unread} color="danger" data-testid={`${testId}-badge`} />
          </span>
        )}
      </IconButton>
      <InlinePopover
        trigger={anchorRef}
        open={open}
        onClose={close}
        placement={placement}
        aria-label={label}
        data-testid={`${testId}-popover`}
        className={
          empty
            ? 'w-[300px] max-w-[calc(100vw-16px)]'
            : 'w-[360px] max-w-[calc(100vw-16px)] p-0 border-0 bg-transparent shadow-none'
        }
      >
        {empty ? (
          <EmptyState
            size="sm"
            icon={<BellIcon size={24} />}
            title="Nothing new"
            description="Activity will appear here."
            testId={`${testId}-empty`}
          />
        ) : (
          <NotificationCenter
            items={items}
            onItemClick={handleItemClick}
            onMarkAllRead={onMarkAllRead}
            onClearAll={onClearAll}
            className="w-full"
            data-testid={`${testId}-center`}
          />
        )}
      </InlinePopover>
    </span>
  );
}

export default NotificationBell;
