// NotificationCenter — inbox/notification feed panel.
//
// Tabs: Unread | All. Uses EmptyState when empty.

import { useState } from 'react';
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
  className,
  'data-testid': testId,
}: NotificationCenterProps) {
  const [tab, setTab] = useState<Tab>('unread');

  const unread = items.filter(n => !n.read);
  const displayed = tab === 'unread' ? unread : items;
  const hasUnread = unread.length > 0;

  const tabCls = (active: boolean) => cn(
    'px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100',
    active
      ? 'bg-[#e0e7ff] text-[#1e1b4b] font-semibold'
      : 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]',
  );

  return (
    <div
      data-testid={testId}
      className={cn(
        'flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]">
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          Notifications
          {hasUnread && (
            <span className="ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white leading-none">
              {unread.length}
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          {onMarkAllRead && hasUnread && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="text-xs text-[#2563eb] bg-transparent border-none cursor-pointer hover:underline"
            >
              Mark all read
            </button>
          )}
          {onClearAll && items.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-[var(--color-text-tertiary)] bg-transparent border-none cursor-pointer hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-3 pt-2">
        <button type="button" className={tabCls(tab === 'unread')} onClick={() => setTab('unread')}>
          Unread {unread.length > 0 && `(${unread.length})`}
        </button>
        <button type="button" className={tabCls(tab === 'all')} onClick={() => setTab('all')}>
          All
        </button>
      </div>

      {/* Feed */}
      <div className="flex flex-col overflow-y-auto max-h-[420px] py-2">
        {displayed.length === 0 ? (
          <EmptyState
            icon={tab === 'unread' ? '✓' : '🔔'}
            title={tab === 'unread' ? 'All caught up' : 'No notifications'}
            body={tab === 'unread' ? 'No unread notifications.' : 'Notifications will appear here.'}
          />
        ) : (
          displayed.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick?.(item)}
              className={cn(
                'flex items-start gap-3 px-4 py-3 text-left border-none',
                'transition-colors duration-100 cursor-pointer font-[inherit] w-full',
                item.read
                  ? 'bg-transparent hover:bg-[var(--color-surface-hover)]'
                  : 'bg-[rgba(59,130,246,0.05)] hover:bg-[rgba(59,130,246,0.1)]',
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
                      'text-sm leading-snug truncate',
                      item.read
                        ? 'text-[var(--color-text-secondary)] font-normal'
                        : 'text-[var(--color-text-primary)] font-medium',
                    )}
                  >
                    {item.title}
                  </span>
                  {!item.read && (
                    <span
                      className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#3b82f6]"
                      aria-label="Unread"
                    />
                  )}
                </div>
                {item.body && (
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2">
                    {item.body}
                  </p>
                )}
                {item.timestamp != null && (
                  <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono">
                    {formatTime(item.timestamp)}
                  </p>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationCenter;
