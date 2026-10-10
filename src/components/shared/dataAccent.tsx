// Data-colour accents: tint a surface from a runtime value without Tailwind
// needing to know the colour. A caller passes either a slot (1..8, resolved by
// the `[data-accent]` rules in styles.css onto design tokens — no inline style)
// or a raw CSS colour, which is set as the `--data-accent` custom property. That
// one custom-property assignment is the only inline style, and it lives here.

import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type DataAccentSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
/** A slot number, or any CSS colour value (`var(--color-x)`, `#2563eb`, `teal`). */
export type DataAccent = DataAccentSlot | (string & {});

export const DATA_ACCENT_SLOTS: readonly DataAccentSlot[] = [1, 2, 3, 4, 5, 6, 7, 8];

/** Spread onto an element; children paint with `bg-[var(--data-accent)]` etc. */
export function dataAccentProps(accent: DataAccent | undefined): {
  'data-accent'?: string;
  style?: CSSProperties;
} {
  if (accent === undefined || accent === '') return {};
  if (typeof accent === 'number') return { 'data-accent': String(accent) };
  return { style: { ['--data-accent' as string]: accent } as CSSProperties };
}

export interface AccentStripeProps {
  accent?: DataAccent;
  /** Stripe thickness in px class terms; default the 5px card edge. */
  className?: string;
  'data-testid'?: string;
}

/** The full-height coloured edge of a card (`<Card className="flex overflow-hidden">`). */
export function AccentStripe({ accent, className, 'data-testid': testId }: AccentStripeProps) {
  return (
    <span
      aria-hidden
      data-testid={testId}
      {...dataAccentProps(accent)}
      className={cn('block w-[5px] shrink-0 self-stretch bg-[var(--data-accent,var(--color-text-tertiary))]', className)}
    />
  );
}
