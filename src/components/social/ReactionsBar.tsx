// ReactionsBar — horizontal chip list of existing reactions on a message
// (or any reactable surface) plus an "add reaction" trigger that opens
// <ReactionPickerPopover>.

import { useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import {
  DEFAULT_PICKER_EMOJIS,
  ReactionPickerPopover,
} from './ReactionPickerPopover';

export interface ReactionSummary {
  emoji: string;
  count: number;
  /** True if the local viewer is one of the reactors. */
  mine?: boolean;
}

export interface ReactionsBarProps {
  reactions: ReactionSummary[];
  /**
   * Called when the viewer clicks a chip (toggle) OR picks an emoji from
   * the popover. The consumer decides whether this is an add or a remove
   * based on the `mine` flag of the matching chip.
   */
  onReact: (emoji: string) => void;
  /**
   * Disables both the chips and the add-reaction trigger (e.g. when the
   * connection is not 'connected'). Defaults to false.
   */
  disabled?: boolean;
  /**
   * Override the popover emoji set. Defaults to the 64-emoji 8x8 grid.
   */
  pickerEmojis?: readonly string[];
  /** Override the add-reaction trigger label. Defaults to a "+" plus emoji. */
  addTriggerLabel?: ReactNode;
  /** Hide the add-reaction trigger entirely (read-only mode). */
  hideAddTrigger?: boolean;
  className?: string;
}

export function ReactionsBar({
  reactions,
  onReact,
  disabled = false,
  pickerEmojis = DEFAULT_PICKER_EMOJIS,
  addTriggerLabel,
  hideAddTrigger = false,
  className,
}: ReactionsBarProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleChipClick = (emoji: string) => {
    if (disabled) return;
    onReact(emoji);
  };

  const handlePickerSelect = (emoji: string) => {
    onReact(emoji);
  };

  // De-duplicate by emoji defensively — collapse repeated entries by
  // summing counts and OR'ing `mine`. Consumers shouldn't send dupes, but
  // adapter conversions can.
  const collapsed: ReactionSummary[] = [];
  const seen = new Map<string, number>();
  for (const r of reactions) {
    if (seen.has(r.emoji)) {
      const idx = seen.get(r.emoji)!;
      const prev = collapsed[idx]!;
      collapsed[idx] = {
        emoji: r.emoji,
        count: prev.count + r.count,
        mine: prev.mine || r.mine,
      };
    } else {
      seen.set(r.emoji, collapsed.length);
      collapsed.push({ ...r });
    }
  }

  return (
    <div
      data-testid="reactions-bar"
      className={cn('relative inline-flex flex-wrap items-center gap-1', className)}
    >
      {collapsed.map((r) => (
        <button
          key={r.emoji}
          type="button"
          onClick={() => handleChipClick(r.emoji)}
          disabled={disabled}
          aria-pressed={r.mine ?? false}
          data-testid="reaction-chip"
          data-emoji={r.emoji}
          data-mine={r.mine ? 'true' : 'false'}
          className={cn(
            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-none transition-colors',
            r.mine
              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-text-primary)]'
              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-text-primary)]',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <span aria-hidden className="text-sm leading-none">{r.emoji}</span>
          <span className="tabular-nums">{r.count}</span>
        </button>
      ))}

      {!hideAddTrigger && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => !disabled && setPickerOpen((v) => !v)}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={pickerOpen}
          data-testid="reactions-bar-add"
          className={cn(
            'inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-border)]',
            'h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors',
            !disabled && 'hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          {addTriggerLabel ?? <span aria-hidden>+ 😀</span>}
          <span className="sr-only">Add reaction</span>
        </button>
      )}

      <ReactionPickerPopover
        open={pickerOpen}
        onSelect={handlePickerSelect}
        onClose={() => setPickerOpen(false)}
        triggerRef={triggerRef}
        emojis={pickerEmojis}
      />
    </div>
  );
}

export default ReactionsBar;
