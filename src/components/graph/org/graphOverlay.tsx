// Two small shapes the org graph's overlays share. Internal to graph/org —
// the list rows that used to live here (SuggestionRow, MeterRow) are now
// shared primitives.

import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { SectionLabel } from '../../shared/SectionLabel';
import { Inline } from '../../ui/Stack';

/** The tinted band above the graph canvas: a path, a department focus, etc. */
export function ContextStrip({
  children,
  'aria-label': ariaLabel,
  'data-testid': testId,
}: {
  children: ReactNode;
  'aria-label'?: string;
  'data-testid'?: string;
}) {
  return (
    <Inline
      gap="md"
      align="center"
      wrap
      role="region"
      aria-label={ariaLabel}
      data-testid={testId}
      className="border-b border-border bg-primary-bg px-3 py-1.5 text-[12px] text-text-primary"
    >
      {children}
    </Inline>
  );
}

/** The small uppercase caption that labels a group inside a strip or panel. */
export function OverlineLabel({
  children,
  tone = 'default',
  className,
}: {
  children: ReactNode;
  /** `warning` keeps the amber tone a caption like "rare skills" needs. */
  tone?: 'default' | 'warning';
  className?: string;
}) {
  return (
    <SectionLabel className={cn('whitespace-nowrap', tone === 'warning' && 'text-warning', className)}>
      {children}
    </SectionLabel>
  );
}
