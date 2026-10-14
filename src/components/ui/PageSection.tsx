// src/components/ui/PageSection.tsx
//
// Page-level section with title, optional description, and header actions.

import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useDensity, useDensitySize } from '../shared/Density';
import Chip from '../shared/Chip';

export interface PageSectionProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  /** The section's content. Not drawn when `empty` is set. */
  children?: ReactNode;
  /**
   * The section has nothing to show: one quiet line beside the title, on the
   * title's row — "Needs your attention · Nothing right now". The section
   * collapses to that one row (no description, no content block); `actions`
   * stay on the right. Emits `data-section-empty` and marks the line
   * `data-ui-empty`. A heading over a two-line "nothing here" paragraph took
   * two full rows of an inbox page for nothing. Since 2.449.0.
   */
  empty?: ReactNode;
  /**
   * A count beside the title in a neutral chip — "Needs attention 1". Absent
   * draws none; zero shows "0" (an empty section is a fact). Since 2.392.0.
   */
  count?: number;
  /**
   * The count pill's colour. `neutral` (default): the grey chip. `primary`
   * (since 2.396.0): a pale indigo pill (`primary-bg`) with indigo
   * (`primary-fg`) numerals at 13px — the Initiatives v2 "Needs attention 1".
   */
  countTone?: 'neutral' | 'primary';
  /**
   * `lg` (default): the page's own 20px h1 with 24px to its content. `md`
   * (since 2.392.0): a 16px semibold h2 over a section of a page — "Needs
   * attention", "Up next" — with 8px to its content, the actions vertically
   * centred on the title. `sm` (since 2.429.0): the same h2 at the app's
   * body step — 14px semibold (`T size="sm" weight="semibold"`), a 12px count
   * pill and 14px actions — for a section inside a tabbed pane, where 16px
   * reads a size up from the 14px tabs and the 13–14px rails beside it.
   *
   * Unsized, it is `lg` at every density: under `<DensityProvider
   * density="compact">` it keeps the h1 and takes the compact 8px content
   * gap (2.441.5). An explicit size always wins, `lg` included.
   */
  size?: 'lg' | 'md' | 'sm';
  className?: string;
  'data-testid'?: string;
}

export function PageSection({
  title,
  description,
  actions,
  children,
  count,
  countTone = 'neutral',
  empty,
  size: sizeProp,
  className,
  'data-testid': testId,
}: PageSectionProps) {
  // Density is spacing, never heading level (2.441.5). Only an explicit
  // `md`/`sm` makes this a subsection (h2); an unsized PageSection is the
  // page's own title (h1, 20/600) at every density, and under the compact
  // density it takes the compact content gap. 2.440.0–2.441.4 mapped compact
  // to `sm`, which left every compact page with a 14px h2 and no h1.
  useDensitySize('PageSection', sizeProp, { comfortable: 'lg', compact: 'sm' }); // deprecation warning for an explicit sm only
  const density = useDensity();
  const size = sizeProp ?? 'lg';
  const sm = size === 'sm';
  // `sm` is `md`'s layout at the body type step.
  const md = size === 'md' || sm;
  const compactGap = md || (sizeProp === undefined && density === 'compact');
  const Heading = md ? 'h2' : 'h1';
  const isEmpty = empty != null && empty !== false;
  return (
    <section className={cn('flex flex-col', compactGap ? 'gap-2' : 'gap-6', className)} {...(testId ? { 'data-testid': testId } : {})} data-size={md ? size : undefined} data-density={sizeProp === undefined && density === 'compact' ? 'compact' : undefined} data-ui-section="" data-section-empty={isEmpty ? '' : undefined}>
      {/* The row wraps (since 2.446.4): when the title and the actions do not
          fit side by side, the actions take their own row, capped at its
          width, instead of squeezing the title into a sliver or running past
          the column. */}
      <div className={cn('flex flex-wrap justify-between gap-x-4 gap-y-2', md ? 'items-center' : 'items-start')}>
        <div className={cn('min-w-0 flex-[1_1_16rem]', isEmpty && 'flex items-baseline gap-3')}>
          <Heading className={cn('m-0 text-text-primary', md ? cn('flex min-w-0 items-center gap-2.5 font-semibold', sm ? 'text-sm leading-5' : 'text-[16px] leading-6') : 'text-xl font-semibold')}>
            {md ? <span className="min-w-0 truncate">{title}</span> : title}
            {typeof count === 'number' && (
              <Chip
                size={countTone === 'primary' ? 'md' : 'sm'}
                tone="neutral"
                className={cn(
                  'shrink-0',
                  !md && 'ml-2.5 align-middle',
                  countTone === 'primary' && cn('rounded-md bg-primary-bg font-medium text-primary-fg', sm ? 'text-xs leading-4' : 'text-[13px] leading-[18px]'),
                )}
                aria-label={`${count} items`} {...(testId ? { 'data-testid': `${testId}-count` } : {})}>
                {count}
              </Chip>
            )}
          </Heading>
          {isEmpty ? (
            <span data-ui-empty="" className={cn('min-w-0 truncate text-text-tertiary', sm ? 'text-xs' : 'text-sm')}>{empty}</span>
          ) : description && (
            <p className="text-sm text-neutral mt-1 mb-0">{description}</p>
          )}
        </div>
        {actions && <div className={cn('flex max-w-full min-w-0 flex-wrap items-center gap-2 shrink-0', sm && 'text-sm')}>{actions}</div>}
      </div>
      {!isEmpty && children}
    </section>
  );
}
