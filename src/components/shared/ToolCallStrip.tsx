import { cn } from '../../lib/cn';

export interface ToolCall {
  id: string;
  name: string;
  done: boolean;
  args?: string;
}

export interface ToolCallStripProps {
  toolCalls: ToolCall[];
  className?: string;
}

export interface ToolCallPillProps {
  name: string;
  done: boolean;
  /**
   * Tooltip text, rendered as the pill's `title` attribute — a place for the
   * raw tool id when `name` is a friendlier display label ("searched
   * knowledge base" vs. the tool's actual name) and the two need to differ.
   * Undefined (the default) renders no `title`, same as today.
   */
  title?: string;
  className?: string;
}

/**
 * A single pill rendering one tool call's name + done/pending state.
 */
export function ToolCallPill({ name, done, title, className }: ToolCallPillProps) {
  return (
    <span
      title={title}
      className={cn(
        'inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full',
        done
          ? 'bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]'
          : 'bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]',
        className,
      )}
    >
      {name}
      {done ? ' ✓' : '…'}
    </span>
  );
}

/**
 * A compact strip of tool call pills.
 */
export function ToolCallStrip({ toolCalls, className }: ToolCallStripProps) {
  return (
    <div className={cn('flex flex-wrap gap-1.5 py-1', className)}>
      {toolCalls.map((tc) => (
        <ToolCallPill key={tc.id} name={tc.name} done={tc.done} />
      ))}
    </div>
  );
}
