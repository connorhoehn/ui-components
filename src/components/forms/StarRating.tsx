// src/components/forms/StarRating.tsx
//
// A star presentation of a 1..max rating. Interactive: a radiogroup with one
// tab stop, click or arrow keys set it, each star is named "3 of 4". Read-only:
// an image with the value in words ("3.5 of 4 stars") that can show a
// fractional average by partly filling the last star.

import { useId, useRef, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';

export interface StarRatingProps {
  /** Current value; fractional only when `readOnly`. Null is "not rated". */
  value: number | null;
  /** Interactive mode only. Receives the chosen 1..max value. */
  onChange?: (value: number) => void;
  /** Number of stars. @default 5 */
  max?: number;
  readOnly?: boolean;
  disabled?: boolean;
  /** Names the group (interactive) or prefixes the spoken value (read-only). */
  label: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'data-testid'?: string;
}

const SIZE = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-7 w-7' } as const;
const STAR_PATH = 'M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6L2.5 9.5l6.6-.8z';

function Star({ fill, size }: { fill: number; size: keyof typeof SIZE }) {
  // Two stacked glyphs: an empty outline, and a filled one clipped to `fill`.
  // Quarter steps, so the clip width is a class rather than an inline style.
  const q = Math.round(Math.max(0, Math.min(1, fill)) * 4);
  const clip = ['w-0', 'w-1/4', 'w-1/2', 'w-3/4', 'w-full'][q];
  return (
    <span className={cn('relative inline-block', SIZE[size])} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full fill-none stroke-border-emphasis" strokeWidth={1.5}>
        <path d={STAR_PATH} />
      </svg>
      <span className={cn('absolute inset-y-0 left-0 overflow-hidden', clip)}>
        <svg viewBox="0 0 24 24" className={cn('fill-warning stroke-warning', SIZE[size], 'max-w-none')} strokeWidth={1.5}>
          <path d={STAR_PATH} />
        </svg>
      </span>
    </span>
  );
}

export function StarRating({
  value, onChange, max = 5, readOnly = false, disabled = false, label, size = 'md',
  className, 'data-testid': testId = 'star-rating',
}: StarRatingProps) {
  const baseId = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  if (readOnly || !onChange) {
    const shown = value === null ? null : Math.round(value * 10) / 10;
    const words = shown === null ? `${label}: not rated` : `${label}: ${shown} of ${max} stars`;
    return (
      <span
        role="img"
        aria-label={words}
        data-testid={testId}
        className={cn('inline-flex items-center gap-0.5', className)}
      >
        {stars.map((n) => <Star key={n} size={size} fill={value === null ? 0 : value - (n - 1)} />)}
      </span>
    );
  }

  const current = value === null ? 0 : Math.round(value);
  const tabStop = current > 0 ? current : 1;
  const move = (to: number) => {
    const clamped = Math.min(max, Math.max(1, to));
    onChange(clamped);
    refs.current[clamped - 1]?.focus();
  };
  const onKeyDown = (e: KeyboardEvent, n: number) => {
    if (disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); move(n + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); move(n - 1); }
    else if (e.key === 'Home') { e.preventDefault(); move(1); }
    else if (e.key === 'End') { e.preventDefault(); move(max); }
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      data-ui-control="star-rating"
      data-testid={testId}
      className={cn('inline-flex items-center gap-0.5', className)}
    >
      {stars.map((n) => (
        <button
          key={`${baseId}-${n}`}
          ref={(el) => { refs.current[n - 1] = el; }}
          type="button"
          role="radio"
          aria-checked={n === current}
          aria-label={`${n} of ${max}`}
          tabIndex={n === tabStop ? 0 : -1}
          disabled={disabled}
          onClick={() => onChange(n)}
          onKeyDown={(e) => onKeyDown(e, n)}
          className={cn(
            'rounded-sm p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-info/40',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <Star size={size} fill={n <= current ? 1 : 0} />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
