// MessageRow — single chat message render. Pure presentational. Renders
// an avatar, author name, content, and a timestamp. Designed to compose
// inside a list (e.g. ChatPanel) or a grouped bundle (see MessageGroup).

import type { ReactNode } from 'react';
import { Avatar } from '../shared/Avatar';
import { cn } from '../../lib/cn';

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
  /** Mark this row as the current viewer's own message — exposed on data attr for styling hooks. */
  mine?: boolean;
  /**
   * Slot rendered below the content (e.g. a `<ReactionsBar>` for this message).
   * Indented under the content so it lines up under text, not under the avatar.
   */
  footer?: ReactNode;
  /** Surface the row renders on. 'light' (default) keeps the theme tokens;
   *  'dark' swaps to white/alpha classes for dark call chrome — without it
   *  the message text renders dark-on-dark and disappears. Mirrors
   *  InviteCandidateList's tone seam. */
  tone?: 'light' | 'dark';
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
  tone = 'light',
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
      className={cn('flex items-start gap-2 py-1', className)}
    >
      <div className="w-5 shrink-0 mt-0.5">
        {!hideAvatar && <Avatar name={author} src={avatarUrl} size={20} />}
      </div>
      <div className="flex grow flex-col min-w-0">
        {metaVisible && (
          <div className="flex items-baseline gap-2 min-w-0">
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
              <span
                data-testid="message-row-time"
                className={cn('text-xs shrink-0', dark ? 'text-white/40' : 'text-text-tertiary')}
              >
                {time}
              </span>
            )}
          </div>
        )}
        {/* `break-words` + `min-w-0` are what stop a 400-char unbroken
            token from stretching the row (and the whole thread) sideways. */}
        <span
          data-testid="message-row-content"
          className={cn(
            'text-sm min-w-0 break-words whitespace-pre-wrap',
            dark ? 'text-white/90' : 'text-text-primary',
          )}
        >
          {content}
        </span>
        {footer && (
          <div data-testid="message-row-footer" className="mt-1">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageRow;
