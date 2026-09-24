// ui-components/src/components/doc-editor/CommentHandoffBar.tsx
//
// Sits above the page composer while it is answering a margin comment (WS-J
// lane B, "Ask agent"): whose comment, the text it is anchored to, and the
// "Resolve when applied" choice the run carries. Dismiss drops the comment
// from the draft (the instruction stays).

import { Checkbox } from '../forms/Checkbox';
import { SparkleIcon } from '../ui/Icons';
import { cn } from '../../lib/cn';

export interface CommentHandoffBarProps {
  author: string;
  /** The anchored text, when the comment has one. */
  quote?: string;
  resolveOnApply: boolean;
  onResolveOnApplyChange: (next: boolean) => void;
  onDismiss: () => void;
  className?: string;
  'data-testid'?: string;
}

export function CommentHandoffBar({
  author,
  quote,
  resolveOnApply,
  onResolveOnApplyChange,
  onDismiss,
  className,
  'data-testid': testId = 'comment-handoff-bar',
}: CommentHandoffBarProps) {
  return (
    <div
      role="status"
      data-testid={testId}
      className={cn('flex min-w-0 items-center gap-3 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary shadow-sm', className)}
    >
      <SparkleIcon size={14} aria-hidden="true" className="shrink-0 text-info-fg" />
      <span className="min-w-0 flex-1 truncate">
        Answering <span className="font-semibold text-text-primary">{author}</span>’s comment
        {quote ? <span className="text-text-tertiary"> on “{quote}”</span> : null}
      </span>
      <label className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-text-primary">
        <Checkbox
          checked={resolveOnApply}
          onChange={(next) => onResolveOnApplyChange(next)}
          data-testid={`${testId}-resolve`}
        />
        Resolve when applied
      </label>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Stop answering this comment"
        title="Stop answering this comment"
        data-testid={`${testId}-dismiss`}
        className="grid h-6 w-6 shrink-0 place-items-center rounded border-0 bg-transparent p-0 text-text-tertiary hover:bg-surface-hover hover:text-text-primary"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}

export default CommentHandoffBar;
