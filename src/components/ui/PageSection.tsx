// src/components/ui/PageSection.tsx
//
// Page-level section with title, optional description, and header actions.

import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';

export interface PageSectionProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  /**
   * A count beside the title in a neutral chip — "Needs attention 1". Absent
   * draws none; zero shows "0" (an empty section is a fact). Since 2.392.0.
   */
  count?: number;
  /**
   * `lg` (default): the page's own 20px h1 with 24px to its content. `md`
   * (since 2.392.0): a 16px semibold h2 over a section of a page — "Needs
   * attention", "Up next" — with 8px to its content, the actions vertically
   * centred on the title.
   */
  size?: 'lg' | 'md';
  className?: string;
  'data-testid'?: string;
}

export function PageSection({
  title,
  description,
  actions,
  children,
  count,
  size = 'lg',
  className,
  'data-testid': testId,
}: PageSectionProps) {
  const md = size === 'md';
  const Heading = md ? 'h2' : 'h1';
  return (
    <section className={cn('flex flex-col', md ? 'gap-2' : 'gap-6', className)} {...(testId ? { 'data-testid': testId } : {})} data-size={md ? 'md' : undefined}>
      <div className={cn('flex justify-between gap-4', md ? 'items-center' : 'items-start')}>
        <div className="min-w-0">
          <Heading className={cn('m-0 text-text-primary', md ? 'flex min-w-0 items-center gap-2.5 text-[16px] font-semibold leading-6' : 'text-xl font-semibold')}>
            {md ? <span className="min-w-0 truncate">{title}</span> : title}
            {typeof count === 'number' && (
              <Chip size="sm" tone="neutral" className={cn('shrink-0', !md && 'ml-2.5 align-middle')} aria-label={`${count} items`} {...(testId ? { 'data-testid': `${testId}-count` } : {})}>
                {count}
              </Chip>
            )}
          </Heading>
          {description && (
            <p className="text-sm text-neutral mt-1 mb-0">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
      {children}
    </section>
  );
}
