// src/components/change-review/ChangeReviewList.tsx
//
// The document-level frame around a queue of changes.
//
// WHY THE HEADING NAMES THE DOCUMENT
//
// The surface this replaces led with the name of the SYSTEM that produced the
// queue ("Sync Conflicts"). That is the one fact the reviewer already knows —
// they clicked the thing that got them here — and it crowds out the two facts
// they do not: which document is about to change, and how much. So the heading
// is the document, and the line under it is the count. "Acme MSA — 3 changes"
// is the whole orientation problem solved before the first card.
//
// WHY IT SHOWS A FEW AT A TIME
//
// Review quality falls off a cliff with queue length: a reviewer handed
// nineteen changes skims nineteen changes. `pageSize` keeps the visible set
// small and puts the rest behind an explicit, counted button, so the reviewer
// always knows how much is left without having it all on screen at once. This
// is a batch control, not pagination — nothing is hidden on another page, and
// the count in the header is always the true total.

import { Children, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';

export interface ChangeReviewListProps {
  /** The document being changed. This is the heading — not the queue's name. */
  documentTitle: string;
  /**
   * Total number of changes awaiting review. Defaults to the number of
   * children. Pass it explicitly when some children are not cards, or when the
   * host is paging server-side and the children are only part of the total.
   */
  changeCount?: number;
  /** Document type, owner, last-edited — whatever orients the reviewer. */
  documentMeta?: ReactNode;
  /** Rendered on the right of the heading, e.g. a Refresh button. */
  headerActions?: ReactNode;
  /** How many cards to show before the "show more" control. Default 3. */
  pageSize?: number;
  /** Rendered in place of the queue when there is nothing to review. */
  emptyState?: ReactNode;
  /** Banners — load errors, stale-data notices — above the queue. */
  notices?: ReactNode;
  /**
   * Rendered after the queue and OUTSIDE the `pageSize` window.
   *
   * Commit controls belong here, not in `children`: a "Apply to document"
   * button passed as a child is one of the paged items, so on a queue longer
   * than `pageSize` it disappears behind "show more" and the surface becomes
   * unsubmittable.
   */
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function ChangeReviewList({
  documentTitle,
  changeCount,
  documentMeta,
  headerActions,
  pageSize = 3,
  emptyState,
  notices,
  footer,
  children,
  className,
  'data-testid': testId = 'change-review-list',
}: ChangeReviewListProps) {
  const items = Children.toArray(children).filter(Boolean);
  const total = changeCount ?? items.length;
  const [shown, setShown] = useState(pageSize);

  const visible = items.slice(0, shown);
  const remaining = items.length - visible.length;

  return (
    <div
      data-testid={testId}
      className={cn('flex min-w-0 flex-col gap-3', className)}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          {/* The document, first and largest. */}
          <h2
            className="m-0 text-lg font-bold leading-tight text-text-primary"
            data-testid={`${testId}-title`}
          >
            {documentTitle}
          </h2>
          {/* No count while empty (2.503.0): the empty state says it, and a
              "No changes to review" line above it was chrome describing nothing. */}
          {(total > 0 || documentMeta) && <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
            {total > 0 && <span className="text-[13px] text-text-secondary" data-testid={`${testId}-count`} data-collection-summary>
              {`${total} change${total === 1 ? '' : 's'} to review`}
            </span>}
            {total > 0 && documentMeta && <span aria-hidden className="text-text-tertiary">·</span>}
            {documentMeta && <span className="text-[12px] text-text-tertiary">{documentMeta}</span>}
          </div>}
        </div>
        {headerActions}
      </div>

      {notices}

      {items.length === 0
        ? emptyState
        : (
          <>
            <div className="flex flex-col gap-2" data-testid={`${testId}-queue`}>
              {visible}
            </div>

            {remaining > 0 && (
              <div className="flex items-center gap-2" data-collection-pager>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShown((n) => n + pageSize)}
                  data-testid={`${testId}-more`}
                >
                  Show {Math.min(remaining, pageSize)} more
                </Button>
                <Chip tone="neutral" size="xs" mono data-testid={`${testId}-remaining`}>
                  {remaining} left
                </Chip>
              </div>
            )}
          </>
        )}

      {footer}
    </div>
  );
}

export default ChangeReviewList;
