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
  className,
}: MessageRowProps) {
  const time = formatChatTime(timestamp);
  return (
    <div
      data-testid="message-row"
      data-mine={mine ? 'true' : 'false'}
      className={cn('flex items-start gap-1.5 py-0.5', className)}
    >
      <div className="w-5 shrink-0 mt-0.5">
        {!hideAvatar && <Avatar name={author} src={avatarUrl} size={20} />}
      </div>
      <div className="flex items-baseline gap-1.5 grow flex-wrap min-w-0">
        {!hideAuthor && (
          <span
            data-testid="message-row-author"
            className="text-[0.7rem] text-text-secondary shrink-0"
          >
            {author}
          </span>
        )}
        <span
          data-testid="message-row-content"
          className="text-[0.8rem] text-text-primary grow"
        >
          {content}
        </span>
        {time && (
          <span
            data-testid="message-row-time"
            className="text-[0.65rem] text-text-tertiary shrink-0"
          >
            {time}
          </span>
        )}
        {footer && (
          <div data-testid="message-row-footer" className="basis-full mt-1">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageRow;
