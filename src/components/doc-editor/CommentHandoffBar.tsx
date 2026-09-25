// ui-components/src/components/doc-editor/CommentHandoffBar.tsx
//
// Sits above the page composer while it is answering a margin comment (WS-J
// lane B, "Ask agent"): whose comment, the text it is anchored to, and the
// "Resolve when applied" choice the run carries. Dismiss drops the comment
// from the draft (the instruction stays).
//
// `variant="reply"`: the same bar while the composer is in Reply mode — a
// card's Reply button moved the reply into the dock. It names whose comment
// is being answered; × (or Escape in the composer) returns the composer to
// the mode and draft it had. No "Resolve when applied": a reply applies
// nothing (`/resolve` in the reply does that).

import { Checkbox } from '../forms/Checkbox';
import { ReplyIcon, SparkleIcon } from '../ui/Icons';
import { cn } from '../../lib/cn';

export interface CommentHandoffBarProps {
  author: string;
  /** The anchored text, when the comment has one. */
  quote?: string;
  /** `agent` (default): answering through the agent. `reply`: the composer is posting a reply. */
  variant?: 'agent' | 'reply';
  /** Agent variant only. */
  resolveOnApply?: boolean;
  onResolveOnApplyChange?: (next: boolean) => void;
  onDismiss: () => void;
  className?: string;
  'data-testid'?: string;
}

export function CommentHandoffBar({
  author,
  quote,
  variant = 'agent',
  resolveOnApply = false,
  onResolveOnApplyChange,
  onDismiss,
  className,
  'data-testid': testId = 'comment-handoff-bar',
}: CommentHandoffBarProps) {
  const reply = variant === 'reply';
  const dismissLabel = reply ? 'Stop replying' : 'Stop answering this comment';
  return (
    <div
      role="status"
      data-testid={testId}
      data-variant={variant}
      className={cn('flex min-w-0 items-center gap-3 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary shadow-sm', className)}
    >
      {reply
        ? <ReplyIcon size={14} aria-hidden="true" className="shrink-0 text-primary" />
        : <SparkleIcon size={14} aria-hidden="true" className="shrink-0 text-info-fg" />}
      <span className="min-w-0 flex-1 truncate">
        {reply ? 'Replying to ' : 'Answering '}
        <span className="font-semibold text-text-primary">{author}</span>{reply ? null : '’s comment'}
        {quote ? <span className="text-text-tertiary"> on “{quote}”</span> : null}
      </span>
      {reply ? (
        <span className="hidden shrink-0 text-text-tertiary sm:inline">Esc to go back</span>
      ) : (
        <label className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-text-primary">
          <Checkbox
            checked={resolveOnApply}
            onChange={(next) => onResolveOnApplyChange?.(next)}
            data-testid={`${testId}-resolve`}
          />
          Resolve when applied
        </label>
      )}
      <button
        type="button"
        onClick={onDismiss}
        aria-label={dismissLabel}
        title={dismissLabel}
        data-testid={`${testId}-dismiss`}
        className="grid h-6 w-6 shrink-0 place-items-center rounded border-0 bg-transparent p-0 text-text-tertiary hover:bg-surface-hover hover:text-text-primary"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}

export default CommentHandoffBar;
