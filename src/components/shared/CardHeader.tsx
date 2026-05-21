// CardHeader — reusable header bar for Card-style sections.
//
// Title + optional subtitle on the left, optional meta slot next to the
// title (e.g. a count chip), optional right-aligned action slot
// (e.g. a Refresh button). Used as the top row of dashboard cards.

import React from 'react';
import { cn } from '../../lib/cn';

export interface CardHeaderProps {
  title: string;
  /** Small text below the title. */
  subtitle?: string;
  /** Extra content rendered immediately to the right of the title (badges/chips). */
  meta?: React.ReactNode;
  /** Right-aligned action area (buttons, menus). */
  action?: React.ReactNode;
  className?: string;
}

function CardHeader({ title, subtitle, meta, action, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <div className="min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
            {title}
          </h3>
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
