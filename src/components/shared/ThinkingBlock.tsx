import { cn } from '../../lib/cn';
import { ThinkingDots } from './ThinkingDots';

export interface ThinkingBlockProps {
  /** the thinking/reasoning text */
  content: string;
  /** if true, show "Thinking…" and ThinkingDots when content empty */
  streaming?: boolean;
  /** default false (collapsed) */
  defaultOpen?: boolean;
  className?: string;
}

/**
 * A collapsible `<details>` block for showing chain-of-thought reasoning.
 *
 * Pair with a parser that strips `<thinking>...</thinking>` from the assistant
 * message and feeds the extracted text into `content`.
 */
export function ThinkingBlock({
  content,
  streaming = false,
  defaultOpen = false,
  className,
}: ThinkingBlockProps) {
  const isActive = streaming || !content;
  const label = isActive ? 'Thinking' : 'Thought';

  return (
    <details
      open={defaultOpen}
      className={cn(
        'rounded-md border border-[var(--color-border)] overflow-hidden text-sm group',
        className,
      )}
    >
      <summary className="flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none">
        <svg
          className="w-3.5 h-3.5 transition-transform group-open:rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-[11px] font-semibold uppercase tracking-wide">{label}</span>
        {streaming && !content && <ThinkingDots size="sm" />}
      </summary>
      <div className="px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed">
        {content || <ThinkingDots />}
      </div>
    </details>
  );
}
