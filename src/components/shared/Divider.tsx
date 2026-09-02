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

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

export interface DividerProps {
  /** Optional caption sitting on the rule. */
  label?: ReactNode;
  /** Vertical margin around the rule. Default `md`. */
  spacing?: DividerSpacing;
  className?: string;
  'data-testid'?: string;
}

const SPACING: Record<DividerSpacing, string> = {
  none: 'my-0',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-6',
};

export function Divider({ label, spacing = 'md', className, 'data-testid': testId }: DividerProps) {
  const margin = SPACING[spacing];

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
      <span className="text-[10px] font-semibold uppercase tracking-wide text-text-tertiary whitespace-nowrap">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export default Divider;
