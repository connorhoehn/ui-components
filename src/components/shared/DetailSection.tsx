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
  children: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function DetailSection({
  title, hint, actions, first = false, children, className, 'data-testid': testId,
}: DetailSectionProps) {
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
