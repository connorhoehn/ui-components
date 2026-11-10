import type { ReactNode, DragEvent } from 'react';
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
  /**
   * Keep 96px clear at the end of the metadata line for the hover actions
   * (the layout before 2.516.1). Default false: the action bar overlays the
   * line's end on hover or focus, on the row's hover fill, and the line uses
   * the full width; with no `actions` no bar is drawn. Marker
   * `data-dialogue-actions="overlay|reserve|none"`.
   */
  reserveActions?: boolean;
  className?: string;
  onDragStart?: (event: DragEvent<HTMLDivElement>) => void;
}
/** Two-line transcript row. The host owns playback, persistence and full-text
 * inspection; the same action toolbar used by chat owns keyboard navigation. */
export function DialogueSegment({ author, avatarUrl, text, metadata, status, actions = [], reserveActions = false, className, onDragStart }: DialogueSegmentProps) {
  const hasActions = actions.length > 0;
  const mode = !hasActions ? 'none' : reserveActions ? 'reserve' : 'overlay';
  return (
    <div data-dialogue-segment data-dialogue-actions={mode} draggable={!!onDragStart} onDragStart={onDragStart} className={cn('group relative flex min-w-0 items-center gap-2 border-b border-border-subtle px-2 py-1 hover:bg-surface-hover focus-within:bg-surface-hover', className)}>
      <Avatar name={author} src={avatarUrl} size={32} tone="neutral" />
      <div className="min-w-0 flex-1">
        <div className={cn('flex h-5 min-w-0 items-center gap-2 text-xs text-text-secondary', mode === 'reserve' && 'pr-24')} data-dialogue-meta="">
          <strong className="shrink-0 font-semibold text-text-primary">{author}</strong>
          <span className="truncate">{metadata}</span>
          {status && <span className="shrink-0">{status}</span>}
        </div>
        <span className="block truncate text-sm leading-5 text-text-primary" title={text}>{text}</span>
      </div>
      {hasActions && (
        <MessageActionBar label={`Actions for ${author}`} actions={actions}
          className="absolute right-2 top-0.5 rounded bg-surface-hover opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100" />
      )}
    </div>
  );
}
