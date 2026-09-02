// RailLayout — a detail page split into a main column and a right context
// rail. The rail carries WHO and WHAT-AROUND (the initiative, the people,
// the gates, the status), the main column carries the work itself — a review
// thread, a diff, a document. Below the lg breakpoint the rail stacks under
// the main column rather than crushing it.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface RailLayoutProps {
  /** The main column. */
  children: ReactNode;
  /** The context rail. Compose with <RailSection>. */
  rail: ReactNode;
  /** Rail width at lg+. Default 'md' (300px). */
  railWidth?: 'sm' | 'md' | 'lg';
  className?: string;
  'data-testid'?: string;
}

const RAIL_WIDTH: Record<NonNullable<RailLayoutProps['railWidth']>, string> = {
  sm: 'lg:w-[260px]',
  md: 'lg:w-[300px]',
  lg: 'lg:w-[340px]',
};

export function RailLayout({ children, rail, railWidth = 'md', className, 'data-testid': testId }: RailLayoutProps) {
  return (
    <div
      className={cn('flex flex-col gap-4 lg:flex-row lg:items-start', className)}
      {...(testId ? { 'data-testid': testId } : {})}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <aside className={cn('w-full shrink-0 lg:sticky lg:top-4', RAIL_WIDTH[railWidth])}>
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          {rail}
        </div>
      </aside>
    </div>
  );
}

export interface RailSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/** One titled block in the rail. Sections divide themselves. */
export function RailSection({ title, children, className }: RailSectionProps) {
  return (
    <section className={cn('border-b border-border px-3.5 py-3 last:border-b-0', className)}>
      <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">{title}</h3>
      <div className="flex flex-col gap-2 text-xs text-text-secondary">{children}</div>
    </section>
  );
}

export default RailLayout;
