// ConversationRail — the whole left side of a chat app: the shelf of fixed
// destinations, and the conversations that come and go beneath it.
//
// ## Why this exists as one component
//
// The shelf and the list look like two independent widgets, and assembling
// them looks trivial — an <aside>, a <ConversationShelf>, a
// <ConversationList>. It is not trivial, because they share one thing that
// neither of them owns: WHAT THE PANE IS SHOWING. Mentions and #general
// cannot both be open. Every host that wires the two by hand has to remember
// to clear the other one's selection, and the failure when it forgets is not
// a crash — it is a rail with two highlighted rows and a pane showing only
// one of them.
//
// So the rail takes ONE selection and hands back ONE selection:
//
//   { kind: 'shelf', id: 'mentions' } | { kind: 'conversation', channel: 'general' }
//
// The exclusivity is then structural. There is no second state to forget.
//
// ## What stays outside
//
// The rail renders no pane. It reports what was picked and lets the host
// route — because "open the mentions view" and "open a thread" are the
// host's screens, and a rail that owned them could not be dropped into an
// app that already has its own.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ChevronIcon } from '../ui/Icons';
import { IconButton } from '../ui/IconButton';
import { ConversationList, type ConversationItem } from './ConversationList';
import { ConversationShelf, type ConversationShelfItem } from './ConversationShelf';
import type { RailSectionAction } from './RailSectionHeader';

/**
 * What the rail currently points at. One value, because one pane.
 */
export type RailSelection =
  | { kind: 'shelf'; id: string }
  | { kind: 'conversation'; channel: string };

export interface ConversationRailProps {
  /**
   * Persistent destinations — Mentions, Threads, Drafts. Empty renders
   * nothing at all rather than an empty strip.
   */
  shelf?: readonly ConversationShelfItem[];
  conversations: ConversationItem[];
  /** Null when nothing is open — a cold start, or a pane the rail does not model. */
  selected?: RailSelection | null;
  onSelect: (selection: RailSelection) => void;
  /** Renders the "+ New chat" row above the conversations when set. */
  onNewChat?: () => void;
  /**
   * Split conversations into Channels and Direct messages. On by default
   * here — unlike the bare list, which serves compact sidebars too. A rail is
   * the full-height case, where a forty-row flat mix stops being scannable.
   */
  grouped?: boolean;
  /**
   * Which group leads. Forwarded to ConversationList — `'dms-first'` on a
   * surface whose subject is people rather than rooms.
   */
  sectionOrder?: 'channels-first' | 'dms-first';
  /** Trailing buttons on each section heading, keyed by section name. Forwarded to the list. */
  sectionActions?: Readonly<Record<string, readonly RailSectionAction[]>>;
  /**
   * Which conversation sections are folded away, keyed by section name.
   * Forwarded to the list.
   *
   * Nothing to do with `collapsed` below: that shrinks the WHOLE rail to an
   * icon strip, this folds one section inside an otherwise normal rail.
   */
  collapsedSections?: Readonly<Record<string, boolean>>;
  /** Fires with the section's name and the state to switch to. Forwarded to the list. */
  onToggleSection?: (label: string, next: boolean) => void;
  /** "Call" / "Video call" in each row's ⋯ menu. Forwarded to the list. */
  onStartCall?: (channel: string, kind: 'audio' | 'video') => void;
  /** Forwarded to the list: rows per group before a "Show N more" row. */
  maxVisible?: number;
  emptyLabel?: string;
  /** Above the shelf: a workspace switcher, a search field, a title. */
  header?: ReactNode;
  /** Below the list: a "you" row, a status control. */
  /**
   * Between the shelf and the conversation list — where a team → channel
   * tree goes, so it sits above the flat conversations rather than below
   * them.
   */
  beforeList?: ReactNode;
  footer?: ReactNode;
  /**
   * Per-row actions, forwarded to the list: the ⋯ menu on each conversation.
   * Each item appears only when its handler does.
   */
  onTogglePin?: (channel: string, next: boolean) => void;
  onToggleMute?: (channel: string, next: boolean) => void;
  onMarkUnread?: (channel: string) => void;
  /** "Rename" in each row's ⋯ menu. Forwarded to the list; see its prop docs. */
  onRename?: (channel: string) => void;
  /** Which rows accept a rename. Forwarded to the list. */
  canRename?: (item: ConversationItem) => boolean;
  /** "Move to section…" in each row's ⋯ menu. Forwarded to the list. */
  onSetSection?: (channel: string) => void;
  /**
   * Opts into the Teams/Slack "shrink to an icon strip" toggle. Off by
   * default, so every existing caller keeps its always-expanded rail with no
   * behaviour change.
   */
  collapsible?: boolean;
  /**
   * Whether the rail is currently the narrow icon strip. The rail does not
   * own this — the host decides, typically from a piece of state it
   * persists, and hears about a change through `onToggleCollapse`.
   */
  collapsed?: boolean;
  /** Fires with the state the host should switch to when the toggle is used. */
  onToggleCollapse?: (next: boolean) => void;
  className?: string;
  'data-testid'?: string;
}

export function ConversationRail({
  shelf = [],
  conversations,
  selected = null,
  onSelect,
  onNewChat,
  grouped = true,
  sectionOrder = 'channels-first',
  sectionActions,
  collapsedSections,
  onToggleSection,
  onStartCall,
  maxVisible,
  emptyLabel,
  header,
  beforeList,
  footer,
  onTogglePin,
  onToggleMute,
  onMarkUnread,
  onRename,
  canRename,
  onSetSection,
  collapsible = false,
  collapsed = false,
  onToggleCollapse,
  className,
  'data-testid': testId = 'conversation-rail',
}: ConversationRailProps) {
  // Only collapses when the host both opted in AND set the flag — a
  // `collapsed` passed without `collapsible` is not a valid combination the
  // rail acts on, so a host that forgets the opt-in gets the plain rail
  // rather than a strip nothing can re-expand.
  const isCollapsed = collapsible && collapsed;
  const activeShelfId = selected?.kind === 'shelf' ? selected.id : null;

  return (
    <aside
      data-testid={testId}
      className={cn(
        'flex min-h-0 shrink-0 flex-col border-r border-border bg-surface',
        isCollapsed ? 'w-14' : 'w-80',
        collapsible && 'relative',
        className,
      )}
    >
      {collapsible && (
        // Pinned in the corner rather than laid out in flow, so it neither
        // pushes the header down when expanded nor needs its own row in the
        // 56px strip when collapsed.
        <div className="absolute right-1 top-1 z-10">
          <IconButton
            aria-label={isCollapsed ? 'Expand the sidebar' : 'Collapse the sidebar'}
            title={isCollapsed ? 'Expand the sidebar' : 'Collapse the sidebar'}
            aria-expanded={!isCollapsed}
            data-testid={`${testId}-collapse`}
            size="sm"
            onClick={() => onToggleCollapse?.(!isCollapsed)}
            icon={<ChevronIcon dir={isCollapsed ? 'right' : 'left'} />}
          />
        </div>
      )}

      {!isCollapsed && header && <div className="shrink-0">{header}</div>}

      {!isCollapsed && shelf.length > 0 && (
        <ConversationShelf
          items={shelf}
          activeId={activeShelfId}
          onSelect={(id) => onSelect({ kind: 'shelf', id })}
          className="shrink-0 px-2 pt-2"
          data-testid={`${testId}-shelf`}
        />
      )}

      {isCollapsed && shelf.length > 0 && (
        // The strip's whole purpose: still pick a destination with none of
        // the labels that no longer fit. Each icon carries the label the
        // text row would have shown, as its accessible name.
        <ul
          data-testid={`${testId}-collapsed-shelf`}
          // pt-9 clears the pinned toggle button above rather than sitting
          // under it.
          className="m-0 flex list-none flex-col items-center gap-0.5 p-2 pt-9"
        >
          {shelf.map((item) => {
            const active = item.id === activeShelfId;
            const count = item.count ?? 0;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect({ kind: 'shelf', id: item.id })}
                  title={item.label}
                  aria-label={item.label}
                  data-testid={`${testId}-collapsed-shelf-${item.id}`}
                  data-active={active ? 'true' : 'false'}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'relative grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                    'hover:bg-surface-hover',
                    active && 'bg-surface-hover',
                  )}
                >
                  <span aria-hidden className="grid h-4 w-4 shrink-0 place-items-center text-text-secondary">
                    {item.icon ?? <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                  </span>
                  {count > 0 && (
                    <span
                      data-testid={`${testId}-collapsed-shelf-${item.id}-count`}
                      className={cn(
                        'absolute -right-1 -top-1 grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 text-[9px] font-semibold leading-none text-white',
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
      )}

      {/* Same px-2 as the shelf above and the list below. Without it the
          team tree's rows sat at a different left edge from the conversation
          rows, which reads as a broken rail rather than as two sections. */}
      {!isCollapsed && beforeList && <div className="shrink-0 px-2">{beforeList}</div>}

      {!isCollapsed && (
        <ConversationList
          items={conversations}
          grouped={grouped}
          sectionOrder={sectionOrder}
          sectionActions={sectionActions}
          collapsedSections={collapsedSections}
          onToggleSection={onToggleSection}
          onStartCall={onStartCall}
          maxVisible={maxVisible}
          // A shelf selection means no conversation is open, so no row is
          // active — passing the last-opened channel here is how a rail ends up
          // highlighting two things at once.
          activeChannel={selected?.kind === 'conversation' ? selected.channel : null}
          onSelect={(channel) => onSelect({ kind: 'conversation', channel })}
          onNewChat={onNewChat}
          emptyLabel={emptyLabel}
          onTogglePin={onTogglePin}
          onToggleMute={onToggleMute}
          onMarkUnread={onMarkUnread}
          onRename={onRename}
          canRename={canRename}
          onSetSection={onSetSection}
          className="min-h-0 flex-1 overflow-y-auto p-2"
          data-testid={`${testId}-list`}
        />
      )}

      {!isCollapsed && footer && <div className="shrink-0">{footer}</div>}
    </aside>
  );
}

export default ConversationRail;
