// MessageRow — single chat message render. Pure presentational. Renders
// an avatar, author name, content, and a timestamp. Designed to compose
// inside a list (e.g. ChatPanel) or a grouped bundle (see MessageGroup).

import type { ReactNode } from 'react';
import { Avatar } from '../shared/Avatar';
import { cn } from '../../lib/cn';
import { fullTimestampLabel } from './dayBoundary';

export interface MessageRowProps {
  /** Display name shown next to the message; required even for anonymous rows (use a fallback). */
  author: string;
  /** Message body. Plain text or pre-rendered ReactNode for rich content. */
  content: ReactNode;
  /** ISO timestamp string; rendered as local HH:MM. */
  timestamp: string;
  /** Optional avatar image URL. Falls back to initials derived from `author`. */
  avatarUrl?: string;
  /** Hide the avatar slot (e.g. middle of a MessageGroup). Defaults to false. */
  hideAvatar?: boolean;
  /** Hide the author label (e.g. middle of a MessageGroup). Defaults to false. */
  hideAuthor?: boolean;
  /**
   * This row is the viewer's own message.
   *
   * Mirrors what Teams and iMessage do, and for the same reason: in a busy
   * thread the question "which of these did I write" is answered constantly
   * and answering it by reading names is work. The row flips to the other
   * side and takes a tinted bubble, so the shape of the conversation is
   * legible before any of it is read.
   *
   * The avatar goes with it — a own-side bubble with a left-hand avatar reads
   * as somebody else's message that has drifted right.
   */
  mine?: boolean;
  /**
   * Slot rendered below the content (e.g. a `<ReactionsBar>` for this message).
   * Indented under the content so it lines up under text, not under the avatar.
   */
  footer?: ReactNode;
  /** Message actions in the header, beside metadata or on a wrapped line.
   *  Keep the slot mounted while hiding its controls to avoid hover layout shifts. */
  actions?: ReactNode;
  /** Surface the row renders on. 'light' (default) keeps the theme tokens;
   *  'dark' swaps to white/alpha classes for dark call chrome — without it
   *  the message text renders dark-on-dark and disappears. Mirrors
   *  InviteCandidateList's tone seam. */
  tone?: 'light' | 'dark';
  /** ISO: when the text was last changed. Renders "(edited)" after the time. */
  editedAt?: string;
  /**
   * How the content span is laid out. Defaults to `'inline'` — the
   * shrink-to-fit tinted bubble (`max-w-[85%]`, padded, right-aligned text)
   * this component has always used, sized for plain chat text.
   *
   * `'block'` is for a card body (an `AgentRunCard`, a document/deck
   * preview, an attachment) instead of text. Those cards size themselves to
   * their CONTAINER (`AgentRunCard` uses a `@container` query, so its
   * intrinsic inline size is 0) — inside the `'inline'` bubble, which has no
   * width of its own beyond its shrink-to-fit content, that container
   * collapses to a few px and the card's contents wrap letter-by-letter in
   * a sliver on the right. `'block'` renders the span as a full-width block
   * up to a cap (`w-full max-w-[30rem]`) with no tint/padding, so the card
   * gets real horizontal room to size against — still right-aligned via the
   * column's `items-end` on a `mine` row, not via `text-align`.
   *
   * The cap is ONE fixed width (30rem, 480px — where Teams puts its cards)
   * on EVERY card row, own or not, at every pane width. A card is never the
   * column's width: on a wide monitor a document card 1100px wide, icon at
   * one end and "Open" at the other, makes the reader run their eyes across
   * the whole pane for one line. Incoming cards sit at the left edge,
   * outgoing at the right, the way the bubbles do; a pane narrower than the
   * cap shrinks the card to fit.
   */
  contentLayout?: 'inline' | 'block';
  className?: string;
}

/** Formats an ISO timestamp string to HH:MM local time. */
export function formatChatTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return '';
    const hh = d.getHours().toString().padStart(2, '0');
    const mm = d.getMinutes().toString().padStart(2, '0');
    return `${hh}:${mm}`;
  } catch {
    return '';
  }
}

export function MessageRow({
  author,
  content,
  timestamp,
  avatarUrl,
  hideAvatar = false,
  hideAuthor = false,
  mine = false,
  footer,
  actions,
  tone = 'light',
  editedAt,
  contentLayout = 'inline',
  className,
}: MessageRowProps) {
  const dark = tone === 'dark';
  const time = formatChatTime(timestamp);
  // One layout for every row: a meta line (author + time) above a
  // full-width body. The old single wrapping line put author, body and
  // time in one `flex-wrap` run, so a short message rendered inline and a
  // long one spilled onto three lines — its timestamp landing directly
  // under the PREVIOUS message's text, where it read as that message's.
  const metaVisible = !hideAuthor || !!time;
  return (
    <div
      data-testid="message-row"
      data-mine={mine ? 'true' : 'false'}
      className={cn(
        'flex items-start gap-2 py-1',
        // Own messages run the other way: avatar last, content pushed right.
        mine && 'flex-row-reverse',
        className,
      )}
    >
      <div className="w-5 shrink-0 mt-0.5">
        {!hideAvatar && <Avatar name={author} src={avatarUrl} size={20} />}
      </div>
      <div className={cn('flex grow flex-col min-w-0', mine && 'items-end')}>
        {(metaVisible || actions) && (
          <div
            data-testid="message-row-header"
            className={cn(actions && 'mb-1 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1', actions && mine && 'flex-row-reverse')}
          >
          {metaVisible && (
            <div className={cn('flex items-baseline gap-2 min-w-0 max-w-full', actions && 'shrink-0', mine && 'flex-row-reverse')}>
              {!hideAuthor && (
                <span
                  data-testid="message-row-author"
                  className={cn(
                    'text-xs font-semibold truncate',
                    dark ? 'text-white/70' : 'text-text-secondary',
                  )}
                >
                  {author}
                </span>
              )}
              {time && (
                // A real <time>, and a title carrying the full local date.
                // HH:MM alone cannot say WHICH day, and the day separators
                // above only state it once per block — this is what answers
                // the question for one specific row without adding a second
                // date to every line of the transcript.
                <time
                  data-testid="message-row-time"
                  dateTime={timestamp}
                  title={fullTimestampLabel(timestamp)}
                  className={cn('text-xs shrink-0', dark ? 'text-white/40' : 'text-text-tertiary')}
                >
                  {time}
                </time>
              )}
              {editedAt && (
                <span
                  data-testid="message-row-edited"
                  title={`Edited ${fullTimestampLabel(editedAt)}`}
                  className={cn('text-[11px] shrink-0', dark ? 'text-white/40' : 'text-text-tertiary')}
                >
                  (edited)
                </span>
              )}
            </div>
          )}
          {actions && <div data-testid="message-row-actions" className="max-w-full shrink-0">{actions}</div>}
          </div>
        )}
        {/* `break-words` + `min-w-0` are what stop a 400-char unbroken
            token from stretching the row (and the whole thread) sideways. */}
        <span
          data-testid="message-row-content"
          className={cn(
            'text-sm min-w-0 break-words whitespace-pre-wrap',
            dark ? 'text-white/90' : 'text-text-primary',
            // A bubble only on own messages. Giving BOTH sides one doubles the
            // ink in the thread and makes the two harder to tell apart, not
            // easier — the contrast is the signal, so only one side carries it.
            // max-w so a long message still reads as a bubble rather than as a
            // full-width band with a tint.
            mine && contentLayout === 'inline' && 'max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right',
            mine && contentLayout === 'inline' && (dark ? 'bg-white/15' : 'bg-primary-bg'),
            // A card body (AgentRunCard, document/deck preview, attachment)
            // sizes itself to ITS CONTAINER rather than its content, so the
            // shrink-to-fit inline bubble above gives it 0px to work with.
            // One fixed cap for every card, own or not — `items-end` on the
            // column above pulls an own card to the right, someone else's
            // stays at the left edge. See the prop's doc comment.
            contentLayout === 'block' && 'w-full max-w-[30rem]',
          )}
        >
          {content}
        </span>
        {footer && (
          <div data-testid="message-row-footer" className={cn('mt-1', mine && 'self-end')}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageRow;
