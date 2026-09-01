// src/components/ui/SelectableCard.tsx
//
// A card that is also a radio: click it and it becomes the one selected tile
// in its grid, driving a detail panel elsewhere on the page.
//
// `Card` is a `<div>` — it cannot be pressed, cannot be tabbed to, and has no
// selected state. So every picker grid in the consuming apps hand-rolled a
// `<button>` with an inline style object that swapped `borderColor` to
// `--color-primary` and `background` to `--color-surface-hover`. That is four
// separate re-implementations of the same three lines, and each one lost the
// focus ring on the way (a `<button>` with `border: none` and no `:focus`
// rule is invisible to a keyboard user).
//
// `aria-pressed` rather than `role="radio"`: a grid of these is usually a
// filter/selection surface where the selection can also be cleared elsewhere,
// and a radiogroup makes promises about arrow-key roving that the callers do
// not keep.

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type SelectableCardPadding = 'sm' | 'md' | 'lg';

export interface SelectableCardProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect' | 'children' | 'type'> {
  children?: ReactNode;
  /** Draws the selected chrome and sets `aria-pressed`. */
  selected?: boolean;
  /** Fired on click. Named `onSelect` so callers read as pickers, not buttons. */
  onSelect?: () => void;
  /** Default `sm` (12px) — these sit in dense grids, unlike Card's 24px `md`. */
  padding?: SelectableCardPadding;
}

const PADDING: Record<SelectableCardPadding, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function SelectableCard({
  children,
  selected = false,
  onSelect,
  padding = 'sm',
  disabled = false,
  className,
  ...rest
}: SelectableCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        'block w-full text-left font-inherit rounded-lg border transition-colors duration-150',
        // The focus ring the hand-rolled versions all dropped.
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        PADDING[padding],
        selected
          ? 'border-primary bg-surface-hover'
          : 'border-border bg-surface hover:border-border-emphasis',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default SelectableCard;
