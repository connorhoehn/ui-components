// DetailSection — a titled block inside a detail surface, separated from what
// precedes it by a hairline.
//
// This exists because the same twenty lines kept being hand-rolled in every
// drawer and thread page: a uppercase tracking-wide caption, an optional hint
// beside it, a gap, then content — each copy drifting a little in size and
// spacing. Consolidating it also fixes the thing those copies all missed,
// which is the boundary itself: without a rule, section two reads as a
// continuation of section one.
//
// The divider is drawn ABOVE the section and suppressed on the first one
// (`first`), so a caller can map over sections without special-casing the
// head of the list or ending up with a stray rule under the header.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Divider } from './Divider';

export interface DetailSectionProps {
  title: string;
  /** Quiet qualifier beside the title — a count, a state, a caveat. */
  hint?: ReactNode;
  /** Right-aligned affordance for this section only. */
  actions?: ReactNode;
  /** Suppress the leading rule. Use on the first section of a surface. */
  first?: boolean;
  /**
   * `label` (default): a small uppercase caption under a hairline, for a
   * drawer or side panel. `heading` (since 2.386.14): a 16px sentence-case
   * heading with no rule, for a document-like body (a work item's Brief); its
   * `actions` stay quiet until the section is hovered or focused (always shown
   * where there is no hover).
   */
  variant?: 'label' | 'heading';
  children: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function DetailSection({
  title, hint, actions, first = false, variant = 'label', children, className, 'data-testid': testId,
}: DetailSectionProps) {
  if (variant === 'heading') {
    return (
      <section className={cn('group/section', className)} data-variant="heading" {...(testId ? { 'data-testid': testId } : {})}>
        <div className="mb-1 flex min-h-7 items-center gap-2">
          <h3 className="m-0 text-base font-semibold leading-6 text-text-primary">{title}</h3>
          {hint != null && <span className="min-w-0 truncate text-[13px] text-text-tertiary">{hint}</span>}
          {actions != null && (
            <>
              <span className="flex-1" />
              <span className="flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover/section:opacity-100 [@media(hover:none)]:opacity-100">
                {actions}
              </span>
            </>
          )}
        </div>
        {children}
      </section>
    );
  }
  return (
    <section className={cn(className)} {...(testId ? { 'data-testid': testId } : {})}>
      {!first && <Divider spacing="md" />}
      <div className="mb-2 flex items-baseline gap-2">
        <h3 className="m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">
          {title}
        </h3>
        {hint != null && <span className="min-w-0 truncate text-[11px] text-text-tertiary">{hint}</span>}
        {actions != null && (
          <>
            <span className="flex-1" />
            {actions}
          </>
        )}
      </div>
      {children}
    </section>
  );
}

export default DetailSection;
