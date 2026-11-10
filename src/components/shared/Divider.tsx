// Divider — a subtle horizontal rule that segments a column of content.
//
// The library had only ToolbarSeparator, which is vertical and scoped to a
// toolbar row. Long detail surfaces (drawers, modals, threads) had nothing, so
// sections ran into each other and every one of them relied on the reader
// inferring the boundary from a change of type size. A hairline does that work
// far more cheaply than more whitespace does — and unlike whitespace it
// survives a dense layout.
//
// `label` renders the rule as a captioned break ("─── Evidence ───"), which is
// the honest way to title a section that is a continuation rather than a new
// card: the caption belongs ON the boundary, not floating above it.
//
// `orientation="vertical"` (2.515.12) is the rule between items of an inline
// row ("3 episodes | 12 shots | Draft"): a 1px hairline as tall as the row's
// line, with `spacing` as its side margin.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

export interface DividerProps {
  /** Optional caption sitting on the rule. */
  label?: ReactNode;
  /** Margin around the rule: vertical for a horizontal rule, side margin for a vertical one. Default `md`. */
  spacing?: DividerSpacing;
  /**
   * `horizontal` (default): a rule across a column. `vertical` (since
   * 2.515.12): a hairline between the items of an inline row, `role="separator"`
   * `aria-orientation="vertical"`, stretched to the row's height (an
   * `align-self: stretch` flex item; 1em tall otherwise). `label` is ignored.
   * Margins: none 0, sm 8px, md 12px, lg 16px each side.
   */
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  'data-testid'?: string;
}

const INLINE_SPACING: Record<DividerSpacing, string> = {
  none: 'mx-0',
  sm: 'mx-2',
  md: 'mx-3',
  lg: 'mx-4',
};

const SPACING: Record<DividerSpacing, string> = {
  none: 'my-0',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-6',
};

export function Divider({ label, spacing = 'md', orientation = 'horizontal', className, 'data-testid': testId }: DividerProps) {
  const margin = SPACING[spacing];

  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        data-divider="vertical"
        className={cn('inline-block w-px shrink-0 self-stretch min-h-[1em] bg-border align-middle', INLINE_SPACING[spacing], className)}
        {...(testId ? { 'data-testid': testId } : {})}
      />
    );
  }

  if (label == null) {
    return (
      <hr
        className={cn('border-0 border-t border-border', margin, className)}
        {...(testId ? { 'data-testid': testId } : {})}
      />
    );
  }

  // A captioned rule is a labelled boundary, so it is a separator with an
  // accessible name rather than an <hr> with text jammed next to it.
  return (
    <div
      role="separator"
      aria-label={typeof label === 'string' ? label : undefined}
      className={cn('flex items-center gap-3', margin, className)}
      {...(testId ? { 'data-testid': testId } : {})}
    >
      <span className="h-px flex-1 bg-border" />
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export default Divider;
