// MessageGroup — vertically stacks consecutive messages from the same
// author. Only the first row shows the avatar + author label; subsequent
// rows in the same group render content+time only, aligned under the
// content column. Pure presentational; designed to compose inside a
// chat list (thread panel variant, dense feed view, etc.).

import type { ReactNode } from 'react';
import { MessageRow } from './MessageRow';
import { cn } from '../../lib/cn';

export interface MessageGroupItem {
  /** Stable React key for the row. */
  id: string;
  content: ReactNode;
  /** ISO timestamp string; rendered as local HH:MM. */
  timestamp: string;
  /** Optional per-row footer (e.g. a `<ReactionsBar>` specific to this message). */
  footer?: ReactNode;
}

export interface MessageGroupProps {
  /** Display name shown on the first row of the group. */
  author: string;
  /** Avatar image URL for the group header. Falls back to initials. */
  avatarUrl?: string;
  /** Mark all rows as the current viewer's own — passed through to each MessageRow. */
  mine?: boolean;
  /** Messages in this group, in chronological order. */
  messages: MessageGroupItem[];
  className?: string;
}

export function MessageGroup({
  author,
  avatarUrl,
  mine = false,
  messages,
  className,
}: MessageGroupProps) {
  if (messages.length === 0) return null;
  return (
    <div
      data-testid="message-group"
      data-author={author}
      data-row-count={messages.length}
      className={cn('flex flex-col', className)}
    >
      {messages.map((m, idx) => (
        <MessageRow
          key={m.id}
          author={author}
          content={m.content}
          timestamp={m.timestamp}
          avatarUrl={avatarUrl}
          hideAvatar={idx > 0}
          hideAuthor={idx > 0}
          mine={mine}
          footer={m.footer}
        />
      ))}
    </div>
  );
}

export default MessageGroup;
