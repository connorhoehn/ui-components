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
import { RAIL_ITEM_TEXT, RAIL_ROW_PAD_Y } from '../shared/railType';

export interface ConversationShelfItem {
  id: string;
  label: string;
  /**
   * A glyph component from `ui/Icons` (e.g. `<ActivityIcon />`), rendered in a
   * fixed-size box so every row's label starts at the same x. Avoid emoji —
   * they render as a fixed system glyph and do not take the theme's colour,
   * so an urgent shelf item and a quiet one end up looking the same.
   */
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
  compact?: boolean;
  iconOnly?: boolean;
  /**
   * `sm` (default) is the 13px shelf. `md` (2.386.0) is the Documents
   * explorer's quick views: 15px labels and 18px icons on 36px rows, the
   * scale of the Folders tree under them. `rail` (2.407.13) is `md` on the
   * shared rail scale (../shared/railType): 13px/500 labels on the 36px rail
   * pitch, the scale of a `TreeView size="rail"` under them and of the
   * Workspace `NavRail` beside them.
   */
  size?: 'sm' | 'md' | 'rail';
  /**
   * Labels only — no icon slot. The selected row takes the folder tree's
   * selection (primary tint, primary left accent), so the views above a
   * `TreeView size="md"` and the tree read as one list. The All documents
   * mockup's All documents / Recent / Shared with me. Since 2.389.2.
   */
  plain?: boolean;
  /**
   * `bar` (2.432.0): the destinations as ONE row of icon buttons with their
   * counts — Activity, Mentions, Calls, Recordings at the rail's top — so the
   * conversations start right under the header instead of four rows down.
   * Each button is named by its label (and says its count); the active one
   * takes the selected tint. `list` (default) is the stacked rows.
   */
  layout?: 'list' | 'bar';
  className?: string;
  'data-testid'?: string;
}

export function ConversationShelf({
  items,
  activeId,
  onSelect,
  compact = false,
  iconOnly = false,
  size = 'sm',
  plain = false,
  layout = 'list',
  className,
  'data-testid': testId = 'conversation-shelf',
}: ConversationShelfProps) {
  if (items.length === 0) return null;
  if (layout === 'bar') {
    return (
      <ul data-testid={testId} data-layout="bar" className={cn('m-0 flex list-none items-center gap-1 p-0', className)}>
        {items.map((item) => {
          const active = item.id === activeId;
          const count = item.count ?? 0;
          const name = count > 0 ? `${item.label}, ${count > 99 ? '99+' : count} ${item.urgent ? 'waiting' : 'new'}` : item.label;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                title={item.label}
                data-testid={`${testId}-${item.id}`}
                data-active={active ? 'true' : 'false'}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'relative grid h-8 w-8 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0 text-text-secondary',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  active ? 'bg-primary-bg text-primary-fg' : 'hover:bg-surface-hover hover:text-text-primary',
                )}
              >
                <span aria-hidden className="grid h-[18px] w-[18px] place-items-center [&>svg]:h-[18px] [&>svg]:w-[18px]">
                  {item.icon ?? <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                </span>
                {/* The name is real text (screen-reader only), so the bar still reads "Activity, Mentions, …". */}
                <span className="sr-only">{name}</span>
                {count > 0 && (
                  <span
                    aria-hidden
                    data-testid={`${testId}-${item.id}-count`}
                    className={cn(
                      'absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-semibold leading-none text-white',
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
  // `rail` keeps md's row (icon box, plain indent) on the rail scale.
  const rail = size === 'rail';
  const md = size === 'md' || rail;

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
              aria-label={iconOnly ? item.label : undefined}
              title={iconOnly ? item.label : undefined}
              data-testid={`${testId}-${item.id}`}
              data-active={active ? 'true' : 'false'}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'relative flex w-full cursor-pointer items-center gap-2 text-left',
                compact ? cn('border-l-2 border-transparent px-2', rail ? cn('min-h-9 gap-3', RAIL_ROW_PAD_Y) : md ? 'min-h-9 gap-3 py-1.5' : 'min-h-8 py-1') : 'rounded-lg px-2 py-1.5',
                compact && active && (plain ? 'border-primary bg-primary-bg' : 'border-primary bg-surface-hover'),
                plain && md && 'pl-4',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                !(plain && active) && 'hover:bg-surface-hover',
                active && !plain && 'bg-surface-hover',
              )}
            >
              {!plain && <span
                aria-hidden
                className={compact ? (md ? 'grid h-5 w-5 shrink-0 place-items-center' : 'grid h-4 w-4 shrink-0 place-items-center') : 'grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-inset'}
              >
                {/* Fixed 16px inner box: every row's label starts at the same
                    x no matter what the icon draws, and the fallback below
                    sits in the identical box rather than a differently-sized
                    glyph of its own. */}
                <span className={cn('grid shrink-0 place-items-center text-text-secondary', md ? 'h-5 w-5 [&>svg]:h-[18px] [&>svg]:w-[18px]' : 'h-4 w-4')}>
                  {item.icon ?? <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                </span>
              </span>}
              {!iconOnly && <span
                className={cn(
                  'min-w-0 flex-1 truncate',
                  rail ? RAIL_ITEM_TEXT : md ? 'text-[15px]' : 'text-[13px]',
                  plain && active ? 'font-medium text-primary-fg'
                    : count > 0 || active ? 'font-semibold text-text-primary'
                    : rail ? 'text-text-primary' : md ? 'font-normal text-text-primary' : 'font-medium text-text-secondary',
                )}
              >
                {item.label}
              </span>}
              {count > 0 && (
                <span
                  data-testid={`${testId}-${item.id}-count`}
                  className={cn(
                    'grid h-5 min-w-5 shrink-0 place-items-center rounded px-1 text-[11px] font-semibold leading-none text-white',
                    iconOnly && 'absolute right-0 top-0 scale-75',
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
