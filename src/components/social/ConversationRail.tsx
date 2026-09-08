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
import { ConversationList, type ConversationItem } from './ConversationList';
import { ConversationShelf, type ConversationShelfItem } from './ConversationShelf';

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
  emptyLabel?: string;
  /** Above the shelf: a workspace switcher, a search field, a title. */
  header?: ReactNode;
  /** Below the list: a "you" row, a status control. */
  footer?: ReactNode;
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
  emptyLabel,
  header,
  footer,
  className,
  'data-testid': testId = 'conversation-rail',
}: ConversationRailProps) {
  return (
    <aside
      data-testid={testId}
      className={cn(
        'flex min-h-0 w-80 shrink-0 flex-col border-r border-border bg-surface',
        className,
      )}
    >
      {header && <div className="shrink-0">{header}</div>}

      {shelf.length > 0 && (
        <ConversationShelf
          items={shelf}
          activeId={selected?.kind === 'shelf' ? selected.id : null}
          onSelect={(id) => onSelect({ kind: 'shelf', id })}
          className="shrink-0 px-2 pt-2"
          data-testid={`${testId}-shelf`}
        />
      )}

      <ConversationList
        items={conversations}
        grouped={grouped}
        sectionOrder={sectionOrder}
        // A shelf selection means no conversation is open, so no row is
        // active — passing the last-opened channel here is how a rail ends up
        // highlighting two things at once.
        activeChannel={selected?.kind === 'conversation' ? selected.channel : null}
        onSelect={(channel) => onSelect({ kind: 'conversation', channel })}
        onNewChat={onNewChat}
        emptyLabel={emptyLabel}
        className="min-h-0 flex-1 overflow-y-auto p-2"
        data-testid={`${testId}-list`}
      />

      {footer && <div className="shrink-0">{footer}</div>}
    </aside>
  );
}

export default ConversationRail;
