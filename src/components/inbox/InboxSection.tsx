// InboxSection — one lane of a queue page: a titled list group that carries
// its own count, and says so properly when it is empty.
//
//   ┌ Decisions  (2)                          Refresh ┐
//   ├──────────────────────────────────────────────────┤
//   │ row                                              │
//   ├──────────────────────────────────────────────────┤
//   │ row                                              │
//   └──────────────────────────────────────────────────┘
//
// Why a composite and not a `SectionLabel` over a stack of cards: a queue
// page has several lanes, and each of them is asked the same three questions
// — what is this lane, how many things are in it, and what does "nothing" mean
// here. The inbox answered them with a bare small-caps caption and a grey
// one-liner, which read as unstyled next to the documents table beside it.
// Making the lane a bordered group aligns it with that table, gives the count
// a fixed home in the header, and gives the empty state a frame to sit in.
//
// Rows are `InboxSectionRow`s — plain `<li>`s with the group's padding and a
// hairline between them. A card inside a card is the shape this replaces, so
// the rows deliberately draw no frame of their own; a row that needs one
// (`ConsultCard`) should render `flush`.
//
// The empty state is `EmptyState size="sm"`, not the full 220px block: three
// lanes on one page cannot each spend a quarter of the viewport announcing an
// absence. Measured on the inbox, two full-size empty lanes pushed the only
// actionable row below the fold.

import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Chip, { type ChipTone } from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import { DensityProvider } from '../shared/Density';

export interface InboxSectionEmpty {
  /** A small glyph above the title. An emoji string is fine. */
  icon?: ReactNode;
  /** One line: "No decisions waiting". */
  title: string;
  /** The hint under it: what would appear here, and when. */
  body?: string;
  /** Lands on the empty-state container. Default `<section testid>-empty`. */
  testId?: string;
}

export interface InboxSectionProps {
  title: string;
  /** How many rows the lane holds. Drawn in the header beside the title. */
  count: number;
  /** Tone of the count chip. `warning` for a lane whose rows block something. */
  countTone?: ChipTone;
  /** Quiet qualifier after the count — "newest blockage first". */
  hint?: ReactNode;
  /** Right-aligned control in the header. */
  action?: ReactNode;
  /** What the lane says instead of rows when `count` is 0. */
  empty?: InboxSectionEmpty;
  /** A note under the rows — a horizon, a caveat. Not drawn when empty. */
  footer?: ReactNode;
  /** Heading level of the title. Default `2`: one lane, one landmark heading. */
  headingLevel?: 2 | 3;
  /** The rows, as `InboxSectionRow`s. */
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function InboxSection({
  title,
  count,
  countTone = 'neutral',
  hint,
  action,
  empty,
  footer,
  headingLevel = 2,
  children,
  className,
  'data-testid': testId,
}: InboxSectionProps) {
  const headingId = useId();
  const Heading: 'h2' | 'h3' = headingLevel === 3 ? 'h3' : 'h2';
  const isEmpty = count === 0;

  return (
    <section
      data-ui-part=""
      aria-labelledby={headingId}
      data-testid={testId}
      className={cn('overflow-hidden rounded-lg border border-border bg-surface', className)}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5">
        <Heading id={headingId} className="m-0 text-[13px] font-semibold leading-none text-text-primary">
          {title}
        </Heading>
        <Chip tone={isEmpty ? 'neutral' : countTone} size="xs" mono aria-label={`${count} in ${title}`}>
          {String(count)}
        </Chip>
        {hint != null && (
          <span className="min-w-0 truncate text-[11px] text-text-tertiary">{hint}</span>
        )}
        {action != null && (
          <>
            <span className="flex-1" />
            <div className="flex shrink-0 items-center gap-2">{action}</div>
          </>
        )}
      </div>

      {isEmpty && empty ? (
        <DensityProvider density="compact"><EmptyState
          testId={empty.testId ?? (testId ? `${testId}-empty` : 'inbox-section-empty')}
          {...(empty.icon != null ? { icon: empty.icon } : {})}
          title={empty.title}
          {...(empty.body ? { body: empty.body } : {})}
        /></DensityProvider>
      ) : (
        <ul className="m-0 list-none divide-y divide-border p-0">{children}</ul>
      )}

      {!isEmpty && footer != null && (
        <div className="border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary">
          {footer}
        </div>
      )}
    </section>
  );
}

export interface InboxSectionRowProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  'data-testid'?: string;
}

/** One row of an `InboxSection`. The group draws the frame and the rule. */
export function InboxSectionRow({ children, className, ...rest }: InboxSectionRowProps) {
  return (
    <li className={cn('px-4 py-3', className)} {...rest}>
      {children}
    </li>
  );
}

export default InboxSection;
