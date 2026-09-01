// SuggestionCard — a proposed next action, offered rather than demanded.
//
// The shape a surface needs when it wants to answer "what should I do here?"
// on behalf of someone facing an empty input. A composer with no starting
// point is a blank page: correct, general, and the least approachable thing
// on a page full of context the app already has.
//
// Deliberately not a list row. A row implies a queue you work through; these
// are suggestions, any of which can be ignored, so they read as offers — one
// line of reasoning above the thing itself, and the cost of acting visible
// before you commit.
//
// Three parts, in the order someone reads them:
//   reason   why this is in front of you, in your terms not the rule's
//   title    the thing itself
//   meta     what it costs — estimates, owner, whatever the domain measures
//
// The reason comes FIRST on purpose. A card whose justification is buried
// under the title asks you to evaluate a suggestion before telling you why it
// was made, which is how a suggestion surface turns into noise.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { Tone } from './tones';
import { TONE_SOFT } from './tones';

export interface SuggestionCardProps {
  /** Why this is being suggested. Shown above the title — see the note above. */
  reason: string;
  /** The thing itself. */
  title: string;
  /**
   * Short category shown as a pill beside the reason, e.g. "blocked".
   * Omit where every suggestion on screen is the same kind.
   */
  label?: string;
  /** Tone for the label pill. Defaults to neutral. */
  tone?: Tone;
  /** What acting costs — estimates, owner, target. Kept to one line. */
  meta?: ReactNode;
  /** Where it points, e.g. an initiative. Rendered as a quiet trailing note. */
  context?: string;
  /** Primary action. The whole card is the hit target. */
  onSelect: () => void;
  /** Verb for the action, shown on hover/focus. Default "Use this". */
  actionLabel?: string;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function SuggestionCard({
  reason,
  title,
  label,
  tone = 'neutral',
  meta,
  context,
  onSelect,
  actionLabel = 'Use this',
  disabled = false,
  className,
  'data-testid': testId,
}: SuggestionCardProps) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onSelect}
      disabled={disabled}
      // The accessible name leads with the title; the reason is supporting
      // detail, and a screen reader announcing the justification before the
      // subject makes a list of these very hard to scan.
      aria-label={`${title} — ${reason}`}
      className={cn(
        'group w-full text-left flex flex-col gap-1.5 rounded-lg border p-3 transition-colors',
        'border-border bg-surface hover:border-border-emphasis hover:bg-surface-hover',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <span className="flex items-center gap-2 min-w-0">
        {label && (
          <span
            className={cn(
              'shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded',
              TONE_SOFT[tone],
            )}
          >
            {label}
          </span>
        )}
        <span className="text-[11px] text-text-secondary truncate">{reason}</span>
      </span>

      <span className="text-[13px] font-medium text-text-primary line-clamp-2">{title}</span>

      {(meta || context) && (
        <span className="flex items-center gap-2 text-[11px] text-text-tertiary min-w-0">
          {meta}
          {context && <span className="truncate">{context}</span>}
        </span>
      )}

      {/* Reserved height rather than conditional rendering: an action that
          appears on hover and pushes the card taller makes a grid of these
          jump under the pointer. */}
      <span
        aria-hidden="true"
        className="text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
      >
        {actionLabel} →
      </span>
    </button>
  );
}

export default SuggestionCard;
