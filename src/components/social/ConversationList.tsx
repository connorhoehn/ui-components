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

import { cn } from '../../lib/cn';
import { Avatar, AvatarGroup } from '../shared/Avatar';
import { PresenceDot } from '../shared/PresenceDot';
import { formatChatTime } from './MessageRow';

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
  tone?: 'light' | 'dark';
  className?: string;
  'data-testid'?: string;
}

export function ConversationList({
  items,
  grouped = false,
  activeChannel,
  onSelect,
  onNewChat,
  emptyLabel = 'No conversations yet',
  tone = 'light',
  className,
  'data-testid': testId,
}: ConversationListProps) {
  const dark = tone === 'dark';

  // Section headings are interleaved as entries rather than wrapping each
  // group in its own <ul>: one list means one scroll container and one
  // tab order, and the rows below stay exactly as they were.
  const entries: Array<ConversationItem | { heading: string }> = [];
  if (grouped) {
    const isChannelRow = (i: ConversationItem) =>
      (i.kind ?? (i.peers.length > 1 ? 'group' : 'dm')) === 'channel';
    const channels = items.filter(isChannelRow);
    const directs = items.filter((i) => !isChannelRow(i));
    // A heading with nothing under it is a promise of content that is not
    // there, so each one appears only when its group does.
    if (channels.length > 0) entries.push({ heading: 'Channels' }, ...channels);
    if (directs.length > 0) entries.push({ heading: 'Direct messages' }, ...directs);
  } else {
    entries.push(...items);
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
        <ul
          className="m-0 flex min-h-0 list-none flex-col gap-0.5 overflow-y-auto p-0"
          aria-label="Conversations"
        >
          {entries.map((entry) => {
            if ('heading' in entry) {
              return (
                <li
                  key={`heading:${entry.heading}`}
                  data-testid="conversation-section"
                  // Presentational: the rows carry the semantics, and a
                  // heading announced as a list item would just be noise
                  // between them.
                  aria-hidden
                  className={cn(
                    'px-2 pb-0.5 pt-3 text-[11px] font-semibold uppercase tracking-wide',
                    dark ? 'text-white/40' : 'text-text-tertiary',
                  )}
                >
                  {entry.heading}
                </li>
              );
            }
            const item = entry;
            const isActive = item.channel === activeChannel;
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
            return (
              <li key={item.channel}>
                <button
                  type="button"
                  onClick={() => onSelect(item.channel)}
                  data-testid="conversation-row"
                  data-channel={item.channel}
                  data-active={isActive ? 'true' : 'false'}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left',
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
      )}
    </div>
  );
}

export default ConversationList;
