// ConversationShelf — the fixed rows above a conversation list.
//
// Slack and Teams both put a small set of PERSISTENT destinations above the
// churn: Activity, Threads, Mentions, Drafts. They are not conversations —
// they do not appear and disappear as people talk — which is exactly why they
// sit apart from the list rather than inside it, where sorting by recency
// would shuffle them away.
//
// ## Why the count is on the shelf and not only in the list
//
// A mention in a channel you have not opened is invisible in a conversation
// list you have to scroll. The shelf answers "is anything waiting for me"
// without reading a single row, which is the entire job of an activity rail.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ConversationShelfItem {
  id: string;
  label: string;
  /** Emoji or glyph. Kept short — this rail is narrow by design. */
  icon?: ReactNode;
  /** Unread/waiting count. Zero renders no badge rather than a "0". */
  count?: number;
  /**
   * Draws the count in the alert colour. An @-mention is not the same kind of
   * pending as "there is traffic"; the rail should not make you open it to
   * find out which one this is.
   */
  urgent?: boolean;
}

export interface ConversationShelfProps {
  items: readonly ConversationShelfItem[];
  activeId?: string | null;
  onSelect: (id: string) => void;
  className?: string;
  'data-testid'?: string;
}

export function ConversationShelf({
  items,
  activeId,
  onSelect,
  className,
  'data-testid': testId = 'conversation-shelf',
}: ConversationShelfProps) {
  if (items.length === 0) return null;

  return (
    <ul
      data-testid={testId}
      className={cn('m-0 flex list-none flex-col gap-0.5 p-0', className)}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        const count = item.count ?? 0;
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              data-testid={`${testId}-${item.id}`}
              data-active={active ? 'true' : 'false'}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                'hover:bg-surface-hover',
                active && 'bg-surface-hover',
              )}
            >
              <span
                aria-hidden
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-inset text-[13px]"
              >
                {item.icon ?? '•'}
              </span>
              <span
                className={cn(
                  'min-w-0 flex-1 truncate text-[13px]',
                  count > 0 ? 'font-semibold text-text-primary' : 'font-medium text-text-secondary',
                )}
              >
                {item.label}
              </span>
              {count > 0 && (
                <span
                  data-testid={`${testId}-${item.id}-count`}
                  className={cn(
                    'grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none text-white',
                    item.urgent ? 'bg-danger' : 'bg-primary',
                  )}
                >
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default ConversationShelf;
