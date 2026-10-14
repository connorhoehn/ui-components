// NotificationCenter — inbox/notification feed panel.
//
// Tabs: Unread | All. Uses EmptyState when empty.

import { useId, useState, type ReactNode } from 'react';
import { IconButton } from '../ui/IconButton';
import { ChecklistIcon, TrashIcon } from '../ui/Icons';
import { Tooltip } from './Tooltip';
import { Tabs, TabPanel } from './Tabs';
import { T } from './Text';
import EmptyState from './EmptyState';
import { cn } from '../../lib/cn';

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
  /**
   * Pinned under the feed, outside its scroll region — e.g. a "See all
   * activity" link. Since 2.443.1. The header (title, Mark all read, tabs) is
   * likewise outside the scroll region, so in a height-capped host both stay
   * in view while only the feed scrolls.
   */
  footer?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

function formatTime(ts: string | number | undefined): string | null {
  if (ts == null) return null;
  const d = new Date(ts);
  if (isNaN(d.getTime())) return null;
  const now = Date.now();
  const diff = now - d.getTime();
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

type Tab = 'unread' | 'all';

export function NotificationCenter({
  items,
  onItemClick,
  onMarkAllRead,
  onClearAll,
  footer,
  className,
  'data-testid': testId,
}: NotificationCenterProps) {
  const [tab, setTab] = useState<Tab>('unread');
  const tabsId = useId();

  const unread = items.filter(n => !n.read);
  const displayed = tab === 'unread' ? unread : items;
  const hasUnread = unread.length > 0;

  return (
    <section data-testid={testId} aria-label="Notifications"
      className={cn('flex min-h-0 flex-col bg-surface text-text-primary', className)}>
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <h2><T as="span" size="sm" weight="semibold">
          Notifications {hasUnread && <span className="ml-2 text-xs text-primary" aria-label={`${unread.length} unread`}>{unread.length}</span>}
        </T></h2>
        <div className="flex items-center gap-2">
          {onMarkAllRead && hasUnread && <Tooltip content="Mark all read" placement="bottom"><IconButton aria-label="Mark all read" icon={<ChecklistIcon size={16} />} onClick={onMarkAllRead} /></Tooltip>}
          {onClearAll && items.length > 0 && <Tooltip content="Clear all" placement="bottom"><IconButton aria-label="Clear all" icon={<TrashIcon size={16} />} onClick={onClearAll} /></Tooltip>}
        </div>
      </div>
      <Tabs idPrefix={tabsId} className="mx-4 shrink-0" aria-label="Notification filter" value={tab}
        onValueChange={value => setTab(value as Tab)} size="md" variant="underline"
        items={[{ id: 'unread', label: `Unread${unread.length ? ` (${unread.length})` : ''}` }, { id: 'all', label: 'All' }]} />

      {/* Feed */}
      <TabPanel id={tab} when={tab} idPrefix={tabsId} className="flex min-h-0 flex-1 flex-col overflow-y-auto py-2">
        {displayed.length === 0 ? (
          <EmptyState
            size="sm" align="start"
            title={tab === 'unread' ? 'All caught up' : 'No notifications'}
            body={tab === 'unread' ? 'No unread notifications.' : 'Notifications will appear here.'}
          />
        ) : (
          displayed.map(item => {
            // `onItemClick` is optional and nothing else consumes a row click
            // — not even mark-as-read. Rendered unconditionally as a
            // <button>, every notification was a focus stop announced as a
            // button, lit up on hover and did nothing at all when activated.
            // A read-only feed is a legitimate configuration; it just must
            // not dress its rows as controls.
            const Row = onItemClick ? 'button' : 'div';
            return (
            <Row
              key={item.id}
              type={onItemClick ? 'button' : undefined}
              onClick={onItemClick ? () => onItemClick(item) : undefined}
              className={cn(
                'flex items-start gap-3 px-4 py-3 text-left border-0 border-b border-solid border-border/50 last:border-b-0',
                'transition-colors duration-100 font-[inherit] w-full',
                onItemClick && 'cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-2px]',
                item.read
                  ? cn('bg-transparent', onItemClick && 'hover:bg-[var(--color-surface-hover)]')
                  : cn('bg-primary/5', onItemClick && 'hover:bg-surface-hover'),
              )}
            >
              {item.icon && (
                <span className="text-lg shrink-0 mt-0.5" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'text-sm leading-5 line-clamp-2',
                      item.read
                        ? 'text-[var(--color-text-secondary)] font-normal'
                        : 'text-[var(--color-text-primary)] font-medium',
                    )}
                  >
                    {item.title}
                  </span>
                  {!item.read && (
                    <span
                      className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary"
                      aria-label="Unread"
                    />
                  )}
                </div>
                {item.body && (
                  <p className="text-sm text-text-secondary mt-1 leading-5 line-clamp-2">
                    {item.body}
                  </p>
                )}
                {item.timestamp != null && (
                  <p className="text-xs text-text-tertiary mt-1">
                    {formatTime(item.timestamp)}
                  </p>
                )}
              </div>
            </Row>
            );
          })
        )}
      </TabPanel>
      {footer != null && footer !== false && (
        <div className="flex shrink-0 items-center justify-center border-t border-border px-4 py-1.5" data-notification-footer="">
          {footer}
        </div>
      )}
    </section>
  );
}

export default NotificationCenter;
