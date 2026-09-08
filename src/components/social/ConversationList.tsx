// ConversationList — Slack-style DM inbox rows: avatar (or stacked
// avatars for groups), peer name(s), a truncated last-message preview,
// the message time, and an unread badge. Purely presentational — the
// consumer maps its DM channels + presence roster into items and owns
// selection/navigation via `onSelect`.
//
// Timestamps render as absolute HH:MM (via formatChatTime) rather than
// Date.now()-dependent fuzzy labels, so tests can pin the output and a
// row never rerenders just because time passed.
//
// Both tones: 'light' (default) uses theme tokens; 'dark' swaps to
// white/alpha classes so the list can sit on call chrome (e.g. inside a
// CallSidePanel or the CallSettingsDialog Chat tab).

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { Avatar, AvatarGroup } from '../shared/Avatar';
import { PresenceDot } from '../shared/PresenceDot';
import { formatChatTime } from './MessageRow';

/**
 * Most-recent-first, with never-used conversations after every used one.
 *
 * The list used to render in whatever order the caller assembled it, which in
 * the app meant "rooms in whatever order the rooms API returned, then DMs".
 * Measured on a real dev account: forty-two abandoned test rooms
 * (`probe*`, `endaudit*`, `doc-join-*`, `masscast*`) sat above the only
 * conversation with a message in it, and the first DM row was the 90th of 120
 * tab stops on the page.
 *
 * Recency is the ordering a message list actually wants, and it is the one
 * that keeps working as the data changes: a room nobody has spoken in sinks on
 * its own, without anyone having to go and delete it. A row with no
 * `lastMessageAt` is not "oldest" — it has never been used at all — so it
 * sorts below every timestamped row rather than at some arbitrary epoch.
 *
 * Ties keep their incoming order (Array.prototype.sort is stable), so a caller
 * that has its own opinion about two silent rooms still gets it.
 */
function byRecency(a: ConversationItem, b: ConversationItem): number {
    const ta = a.lastMessageAt ? Date.parse(a.lastMessageAt) : NaN;
    const tb = b.lastMessageAt ? Date.parse(b.lastMessageAt) : NaN;
    const va = Number.isNaN(ta) ? null : ta;
    const vb = Number.isNaN(tb) ? null : tb;
    if (va === null && vb === null) return 0;
    if (va === null) return 1;
    if (vb === null) return -1;
    return vb - va;
}

export interface ConversationPeer {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  color?: string;
  /** Presence: true → online dot, false → offline dot, undefined → no dot. */
  online?: boolean;
}

export interface ConversationItem {
  /** Chat channel id — handed back verbatim by `onSelect`. */
  channel: string;
  /**
   * What kind of conversation this is.
   *
   * The server already models all three as ONE thing — a room carries
   * `type: 'standalone' | 'group' | 'dm'` — so they belong in one list rather
   * than three panels with three "new" buttons. This only changes how the row
   * IDENTIFIES itself:
   *
   *   'dm'      → the peer's avatar and name
   *   'group'   → stacked avatars, all the names
   *   'channel' → a # and the channel's own name. A channel is not the sum of
   *               its members; #general does not want forty stacked avatars,
   *               and its identity survives everyone leaving.
   *
   * Defaults to peer-derived ('dm' or 'group' by peer count), so every existing
   * caller keeps the rows it already had.
   */
  kind?: 'dm' | 'group' | 'channel';
  /** Required for `kind: 'channel'` — the channel's name, without the '#'. */
  name?: string;
  /** 1 peer for a 1:1 conversation, N for groups. Empty for a channel. */
  peers: ConversationPeer[];
  lastMessagePreview?: string;
  /** ISO timestamp of the last message. Rendered as HH:MM. */
  lastMessageAt?: string;
  unreadCount?: number;
  /**
   * Somebody named YOU in this conversation.
   *
   * Separate from `unreadCount` because they answer different questions and
   * only one of them is urgent: unread is "there is traffic here", a mention
   * is "someone is waiting on you". Rolling them into one number is how a
   * mention gets lost inside a busy channel's 40 unread.
   */
  mentioned?: boolean;
  /**
   * A call is happening in this conversation RIGHT NOW.
   *
   * Its own signal, for the same reason `mentioned` is: unread says "there is
   * traffic here", a mention says "someone is waiting on you", and this says
   * "something is happening that you can still join". Only the last one
   * expires — a call you learn about afterwards is a fact, not an invitation.
   *
   * Until this existed a call was invisible from the list: the thread posted a
   * card when the call ENDED, so the only way to discover one in progress was
   * to already be looking at the conversation it was in. For a stream meant
   * for an audience that is the whole problem — nobody can watch what nobody
   * can find.
   */
  live?: boolean;
}

export interface ConversationListProps {
  items: ConversationItem[];
  /** Channel of the conversation currently open — its row highlights. */
  activeChannel?: string | null;
  onSelect: (channel: string) => void;
  /** Renders a "+ New chat" affordance above the rows when set. */
  onNewChat?: () => void;
  /** Empty-state text. Defaults to "No conversations yet". */
  emptyLabel?: string;
  /**
   * Split the list into Channels and Direct messages, the way Slack and Teams
   * do.
   *
   * A flat list mixing the two is scannable at four rows and not at forty: a
   * channel and a person are different kinds of destination, and the eye
   * looks for them in different places. Off by default so existing callers —
   * a compact sidebar, a call's people list — keep the single run they were
   * designed around.
   */
  grouped?: boolean;
  /**
   * Which group leads when `grouped`.
   *
   * `'channels-first'` (the default, and what every existing caller keeps) is
   * the Slack shape and is right when channels are things you deliberately
   * joined. `'dms-first'` is right on a surface whose subject is people: a DM
   * is addressed to you personally and a channel is not, and on a rail with
   * forty rooms in it that difference is the only thing keeping a new message
   * from a colleague above the fold.
   */
  sectionOrder?: 'channels-first' | 'dms-first';
  /**
   * Sort rows most-recent-first within each group. Default TRUE.
   *
   * Off for a caller whose order already means something — a call's people
   * list is in join order, and re-sorting it by "last message" would shuffle
   * the participants of a live call every time somebody spoke.
   */
  sortByRecency?: boolean;
  tone?: 'light' | 'dark';
  className?: string;
  'data-testid'?: string;
}

export function ConversationList({
  items,
  grouped = false,
  sectionOrder = 'channels-first',
  sortByRecency = true,
  activeChannel,
  onSelect,
  onNewChat,
  emptyLabel = 'No conversations yet',
  tone = 'light',
  className,
  'data-testid': testId,
}: ConversationListProps) {
  const dark = tone === 'dark';

  // One SCROLL container holding one <ul> per group, rather than one <ul>
  // with headings interleaved as `aria-hidden` list items.
  //
  // The old shape hid the headings from assistive technology on the grounds
  // that "the rows carry the semantics", and the rows do — but the BOUNDARY
  // was then carried by nothing at all: a screen-reader user got one
  // undifferentiated run of forty-odd buttons with no way to tell a room from
  // a person. A list per group puts that fact where AT already looks for it
  // (`<ul aria-label="Direct messages">` announces the name and the count on
  // entry), and the visible heading stays presentational because it would
  // otherwise be read out twice.
  //
  // Scrolling and tab order are unchanged: the wrapper below is the single
  // scroll container, and DOM order across the lists is still one sequence.
  const ordered = sortByRecency ? [...items].sort(byRecency) : items;
  const sections: Array<{ heading?: string; label: string; items: ConversationItem[] }> = [];
  if (grouped) {
    const isChannelRow = (i: ConversationItem) =>
      (i.kind ?? (i.peers.length > 1 ? 'group' : 'dm')) === 'channel';
    const channels = ordered.filter(isChannelRow);
    const directs = ordered.filter((i) => !isChannelRow(i));
    // A heading with nothing under it is a promise of content that is not
    // there, so each one appears only when its group does.
    const channelSection = { heading: 'Channels', label: 'Channels', items: channels };
    const directSection = { heading: 'Direct messages', label: 'Direct messages', items: directs };
    const inOrder = sectionOrder === 'dms-first'
      ? [directSection, channelSection]
      : [channelSection, directSection];
    for (const section of inOrder) if (section.items.length > 0) sections.push(section);
  } else {
    sections.push({ label: 'Conversations', items: ordered });
  }

  // ── Roving focus ───────────────────────────────────────────────────
  // Every row is a real <button>, so before this each one was its own tab
  // stop: a rail with 43 rows cost 43 Tab presses to cross, and everything
  // after it — the transcript, the composer — sat behind all of them.
  //
  // The rows keep their button semantics (Enter and Space still activate,
  // which is what a list of destinations should do); what changes is that
  // only ONE of them is in the tab order at a time and Up/Down move between
  // them. Tab now enters the list once and leaves once.
  const rows = sections.flatMap((section) => section.items);
  const listRef = useRef<HTMLDivElement>(null);
  const [rovingChannel, setRovingChannel] = useState<string | null>(null);
  // The cursor starts on the OPEN conversation, so tabbing into the rail lands
  // on where you already are rather than at the top of a list you have to
  // walk back down. It follows `activeChannel` for the same reason.
  const cursorChannel =
    (rovingChannel && rows.some((r) => r.channel === rovingChannel) ? rovingChannel : null)
    ?? (activeChannel && rows.some((r) => r.channel === activeChannel) ? activeChannel : null)
    ?? rows[0]?.channel
    ?? null;

  // Focus follows the cursor only when the move came from a key press inside
  // the list. Without this guard the list would steal focus whenever the
  // active conversation changed for any other reason — a notification, a
  // deep link — and yank the caret out of whatever the user was typing.
  const pendingFocusRef = useRef<string | null>(null);
  useEffect(() => {
    const channel = pendingFocusRef.current;
    if (!channel) return;
    pendingFocusRef.current = null;
    const el = listRef.current?.querySelector<HTMLButtonElement>(
      `[data-testid="conversation-row"][data-channel="${CSS.escape(channel)}"]`,
    );
    el?.focus();
    // Keep the newly focused row on screen in a long list. `nearest` so a row
    // that is already visible does not scroll the rail out from under the eye.
    el?.scrollIntoView({ block: 'nearest' });
  });

  function moveCursor(to: number) {
    const clamped = Math.max(0, Math.min(rows.length - 1, to));
    const next = rows[clamped];
    // Nothing to do at either end of the list — and doing nothing has to mean
    // NOTHING. Setting `pendingFocusRef` for a move that does not change the
    // cursor leaves it armed: `setRovingChannel` with the same value does not
    // re-render, so the effect that consumes the ref never runs, and the
    // request sits there until some UNRELATED render fires it. Observed in
    // the browser as focus jumping to a conversation row several actions
    // later — pressing ArrowDown on the last row, then reacting to a message,
    // moved focus into the rail.
    if (!next || next.channel === cursorChannel) return;
    pendingFocusRef.current = next.channel;
    setRovingChannel(next.channel);
  }

  function handleListKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (rows.length === 0) return;
    const at = rows.findIndex((r) => r.channel === cursorChannel);
    const from = at < 0 ? 0 : at;
    switch (e.key) {
      case 'ArrowDown': moveCursor(from + 1); break;
      case 'ArrowUp': moveCursor(from - 1); break;
      case 'Home': moveCursor(0); break;
      case 'End': moveCursor(rows.length - 1); break;
      default: return;
    }
    // Only after a handled key: PageUp and friends still scroll the rail, and
    // Home/End inside a row's own text field are not ours to intercept.
    e.preventDefault();
  }

  return (
    <div className={cn('flex min-h-0 flex-col gap-1', className)} data-testid={testId}>
      {onNewChat && (
        <button
          type="button"
          onClick={onNewChat}
          data-testid="conversation-new-chat"
          className={cn(
            'flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
            dark
              ? 'text-white/80 hover:bg-white/10 hover:text-white'
              : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none',
              dark ? 'border-white/30' : 'border-border',
            )}
          >
            +
          </span>
          New chat
        </button>
      )}

      {items.length === 0 ? (
        <p
          className={cn('m-0 px-2 py-1.5 text-[13px]', dark ? 'text-white/60' : 'text-text-secondary')}
          data-testid="conversation-empty"
        >
          {emptyLabel}
        </p>
      ) : (
        <div
          ref={listRef}
          onKeyDown={handleListKeyDown}
          className="m-0 flex min-h-0 flex-col overflow-y-auto p-0"
        >
          {sections.map((section) => (
            <div key={section.label}>
              {section.heading && (
                <p
                  data-testid="conversation-section"
                  // Presentational: the <ul> below carries the same name, and
                  // a heading announced on top of it is the label twice.
                  aria-hidden
                  className={cn(
                    'm-0 px-2 pb-0.5 pt-3 text-[11px] font-semibold uppercase tracking-wide',
                    dark ? 'text-white/40' : 'text-text-tertiary',
                  )}
                >
                  {section.heading}
                </p>
              )}
              <ul
                className="m-0 flex list-none flex-col gap-0.5 p-0"
                aria-label={section.label}
              >
          {section.items.map((item) => {
            const isActive = item.channel === activeChannel;
            const isCursor = item.channel === cursorChannel;
            const kind = item.kind ?? (item.peers.length > 1 ? 'group' : 'dm');
            const isChannel = kind === 'channel';
            const isGroup = kind === 'group';
            const primary = item.peers[0];
            // A channel is named, not enumerated. Falling back to the channel
            // id keeps a mislabelled row readable instead of blank.
            const names = isChannel
              ? (item.name ?? item.channel)
              : item.peers.map((p) => p.displayName).join(', ');
            const time = item.lastMessageAt ? formatChatTime(item.lastMessageAt) : '';
            const unread = item.unreadCount ?? 0;
            const mentioned = !!item.mentioned;
            const live = !!item.live;
            return (
              <li key={item.channel}>
                <button
                  type="button"
                  onClick={() => onSelect(item.channel)}
                  // A click moves the roving cursor too, so a subsequent
                  // ArrowDown continues from the row you just used rather
                  // than from wherever the keyboard last was.
                  onFocus={() => setRovingChannel(item.channel)}
                  data-testid="conversation-row"
                  data-channel={item.channel}
                  data-active={isActive ? 'true' : 'false'}
                  aria-current={isActive ? 'true' : undefined}
                  // Roving: exactly one row is in the tab order. See the
                  // cursor block above for why.
                  tabIndex={isCursor ? 0 : -1}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left',
                    // The rail is the page's primary navigation and had no
                    // focus style of its own — only the UA outline, which
                    // several surrounding surfaces suppress.
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                    dark ? 'hover:bg-white/10' : 'hover:bg-surface-hover',
                    isActive && (dark ? 'bg-white/10' : 'bg-surface-hover'),
                  )}
                >
                  {/* Avatar (1:1) or stacked avatars (group), with a
                      presence dot only when the peer's presence is known. */}
                  {isChannel ? (
                    <span
                      aria-hidden="true"
                      data-testid="conversation-channel-glyph"
                      className={cn(
                        'grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none',
                        dark ? 'bg-white/10 text-white/70' : 'bg-surface-inset text-text-secondary',
                      )}
                    >
                      #
                    </span>
                  ) : isGroup ? (
                    <AvatarGroup
                      size={28}
                      maxVisible={2}
                      items={item.peers.map((p) => ({
                        name: p.displayName,
                        color: p.color,
                        src: p.avatarUrl,
                      }))}
                    />
                  ) : primary ? (
                    <span className="relative inline-flex shrink-0">
                      <Avatar
                        name={primary.displayName}
                        color={primary.color}
                        src={primary.avatarUrl}
                        size={28}
                      />
                      {primary.online !== undefined && (
                        <PresenceDot
                          state={primary.online ? 'online' : 'offline'}
                          pulse={false}
                          className={cn(
                            'absolute -bottom-0.5 -right-0.5 rounded-full ring-2',
                            dark ? 'ring-call-chrome' : 'ring-surface',
                          )}
                        />
                      )}
                    </span>
                  ) : null}

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="flex items-baseline gap-2">
                      <span
                        className={cn(
                          'min-w-0 flex-1 truncate text-[13px]',
                          unread > 0 ? 'font-semibold' : 'font-medium',
                          dark ? 'text-white' : 'text-text-primary',
                        )}
                      >
                        {names}
                      </span>
                      {time && (
                        <span
                          className={cn('shrink-0 text-[11px] tabular-nums', dark ? 'text-white/50' : 'text-text-tertiary')}
                          data-testid="conversation-time"
                        >
                          {time}
                        </span>
                      )}
                    </span>
                    {item.lastMessagePreview && (
                      <span
                        className={cn('truncate text-[12px]', dark ? 'text-white/60' : 'text-text-secondary')}
                        data-testid="conversation-preview"
                      >
                        {item.lastMessagePreview}
                      </span>
                    )}
                  </span>

                  {/* Shown ALONGSIDE the unread count, never instead of it.
                      "40 unread" and "one of them is about you" are different
                      facts, and collapsing them is how a mention gets lost
                      inside a busy channel. */}
                  {/* First in the row: it is the only one of these badges
                      that is time-limited. */}
                  {live && (
                    <span
                      data-testid="conversation-live"
                      aria-label="Call in progress"
                      title="Call in progress"
                      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white"
                    >
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
                      Live
                    </span>
                  )}
                  {mentioned && (
                    <span
                      data-testid="conversation-mention"
                      aria-label="You were mentioned"
                      title="You were mentioned"
                      className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger text-[11px] font-bold leading-none text-white"
                    >
                      @
                    </span>
                  )}
                  {unread > 0 && (
                    <span
                      data-testid="conversation-unread"
                      className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-semibold leading-none text-white"
                    >
                      {unread > 99 ? '99+' : unread}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConversationList;
