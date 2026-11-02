import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';
import { MessageActionBar, type MessageAction } from './MessageActionBar';

export interface DialogueSegmentProps {
  author: string;
  avatarUrl?: string;
  text: string;
  metadata?: ReactNode;
  status?: ReactNode;
  actions?: readonly MessageAction[];
  className?: string;
}
/** Two-line transcript row. The host owns playback, persistence and full-text
 * inspection; the same action toolbar used by chat owns keyboard navigation. */
export function DialogueSegment({ author, avatarUrl, text, metadata, status, actions = [], className }: DialogueSegmentProps) {
  return (
    <div data-dialogue-segment className={cn('group relative flex min-w-0 items-center gap-2 border-b border-border-subtle px-2 py-1 hover:bg-surface-hover focus-within:bg-surface-hover', className)}>
      <Avatar name={author} src={avatarUrl} size={32} />
      <div className="min-w-0 flex-1">
        <div className="flex h-5 min-w-0 items-center gap-2 pr-24 text-xs text-text-secondary">
          <strong className="shrink-0 font-semibold text-text-primary">{author}</strong>
          <span className="truncate">{metadata}</span>
          {status && <span className="shrink-0">{status}</span>}
        </div>
        <span className="block truncate text-sm leading-5 text-text-primary" title={text}>{text}</span>
      </div>
      <MessageActionBar label={`Actions for ${author}`} actions={actions}
        className="absolute right-2 top-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100" />
    </div>
  );
}
