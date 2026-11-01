// CardHeader — reusable header bar for Card-style sections.
//
// Title + optional subtitle on the left, optional meta slot next to the
// title (e.g. a count chip), optional right-aligned action slot
// (e.g. a Refresh button). Used as the top row of dashboard cards.

import React from 'react';
import { cn } from '../../lib/cn';

export interface CardHeaderProps {
  title: string;
  /** Semantic heading level, independent of visual size. Use h2 directly under a page title. */
  as?: 'h2' | 'h3' | 'h4';
  /** Small text below the title. */
  subtitle?: string;
  /** Extra content rendered immediately to the right of the title (badges/chips). */
  meta?: React.ReactNode;
  /** Right-aligned action area (buttons, menus). */
  action?: React.ReactNode;
  /**
   * The header owns its own gutter and bottom rule. For a `Card padding="none"`
   * host — one with a full-bleed footer or edge-to-edge rows — where the card
   * is not padding the header for it; without this the title hangs on the
   * card's top-left edge.
   */
  inset?: boolean;
  className?: string;
}

function CardHeader({ title, as: Heading = 'h3', subtitle, meta, action, inset = false, className }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4',
        inset && 'px-3.5 pt-3 pb-2.5 border-b border-[var(--color-border)]',
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <Heading className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
            {title}
          </Heading>
          {meta}
        </div>
        {subtitle && (
          <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export { CardHeader };
export default CardHeader;
