// RailLayout — a detail page split into a main column and a right context
// rail. The rail carries WHO and WHAT-AROUND (the initiative, the people,
// the gates, the status), the main column carries the work itself — a review
// thread, a diff, a document. Below the lg breakpoint the rail stacks under
// the main column rather than crushing it.

import { createContext, useContext, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { RAIL_GROUP_LABEL, RAIL_GROUP_LABEL_INK } from './railType';

export interface RailLayoutProps {
  /** The main column. */
  children: ReactNode;
  /** The context rail. Compose with <RailSection>. */
  rail: ReactNode;
  /** Rail width at lg+. Default 'md' (300px). */
  railWidth?: 'sm' | 'md' | 'lg';
  /** Plain record sections, responsive to the available column rather than the viewport. */
  variant?: 'card' | 'plain';
  className?: string;
  'data-testid'?: string;
}

const RAIL_WIDTH: Record<NonNullable<RailLayoutProps['railWidth']>, string> = {
  sm: 'lg:w-[260px]',
  md: 'lg:w-[300px]',
  lg: 'lg:w-[340px]',
};

const RailStyle = createContext<'card' | 'plain'>('card');

export function RailLayout({ children, rail, railWidth = 'md', variant = 'card', className, 'data-testid': testId }: RailLayoutProps) {
  if (variant === 'plain') return <div className={cn('@container min-w-0', className)} data-testid={testId} data-variant="plain">
    <div className="flex min-w-0 flex-col gap-6 @3xl:flex-row @3xl:items-start">
      <div className="min-w-0 flex-1">{children}</div>
      <aside aria-label="Record context" className="w-full min-w-0 shrink-0 border-t border-border @3xl:w-[260px] @3xl:border-t-0 @3xl:border-l @3xl:pl-5">
        <RailStyle.Provider value="plain">{rail}</RailStyle.Provider>
      </aside>
    </div>
  </div>;
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
  /** A section used directly in an information pane, without a RailLayout wrapper. */
  variant?: 'card' | 'plain';
}

/** One titled block in the rail. Sections divide themselves. */
export function RailSection({ title, children, className, variant: variantProp }: RailSectionProps) {
  const inheritedVariant = useContext(RailStyle);
  const variant = variantProp ?? inheritedVariant;
  const Heading = variant === 'plain' ? 'h2' : 'h3';
  return (
    <section className={cn('border-b border-border py-3 last:border-b-0', variant === 'card' && 'px-3.5', className)}>
      {/* The shared rail group label (railType, 2.397.1) — was 10px, the one
          rail heading left off the 2.397.0 scale. */}
      <Heading className={cn('mb-2', RAIL_GROUP_LABEL, RAIL_GROUP_LABEL_INK)} data-testid="rail-section-title">{title}</Heading>
      <div className="flex flex-col gap-2 text-xs text-text-secondary">{children}</div>
    </section>
  );
}

export default RailLayout;
