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
   * drawer or side panel. `heading` (since 2.386.15): a 16px sentence-case
   * heading with no rule, for a document-like body (a work item's Brief); its
   * `actions` stay quiet until the section is hovered or focused (always shown
   * where there is no hover).
   */
  variant?: 'label' | 'heading';
  /**
   * `heading` only. `md` (default) is the 16px heading. `lg` (since 2.390.0)
   * is a page's section heading — 19px semibold on a 28px row, sentence case
   * ("What needs attention", "Plan next", "Why this matters"). `sm` (since
   * 2.429.0) is the body step — a 14px semibold heading over a 12px
   * description (`T size="sm"` / `T size="xs"`) — for a section inside a
   * tabbed pane beside `PageSection size="sm"`.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * `heading` only: one line under the heading, before the content — what
   * the section is for ("Add enough detail for an engineer or agent to know
   * what success looks like."). Since 2.390.0.
   */
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function DetailSection({
  title, hint, actions, first = false, variant = 'label', size = 'md', description, children, className, 'data-testid': testId,
}: DetailSectionProps) {
  if (variant === 'heading') {
    const lg = size === 'lg';
    const sm = size === 'sm';
    const hasDescription = description != null && description !== false;
    return (
      <section className={cn('group/section', className)} data-variant="heading" data-size={size} {...(testId ? { 'data-testid': testId } : {})}>
        {/* A fixed 24px row: a hover action may be taller, but never pushes
            the body down (the mockup's heading → text pitch is 24px). */}
        <div className={cn('flex items-center gap-2', lg ? 'h-7' : 'h-6', lg ? (hasDescription ? 'mb-0' : 'mb-2') : 'mb-0.5')}>
          <h3 className={cn('m-0 font-semibold text-text-primary', lg ? 'text-[19px] leading-7' : sm ? 'text-sm leading-5' : 'text-base leading-6')}>{title}</h3>
          {hint != null && <span className={cn('min-w-0 truncate text-text-tertiary', sm ? 'text-xs' : 'text-[13px]')}>{hint}</span>}
          {actions != null && (
            <>
              <span className="flex-1" />
              <span className="flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover/section:opacity-100 [@media(hover:none)]:opacity-100">
                {actions}
              </span>
            </>
          )}
        </div>
        {hasDescription && (
          <p className={cn('m-0 text-text-secondary', lg ? '-mt-1 mb-2 text-[15px] leading-6' : sm ? 'mb-2 text-xs leading-4' : 'mb-2 text-[13px] leading-5')} data-testid={testId ? `${testId}-description` : undefined}>
            {description}
          </p>
        )}
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
