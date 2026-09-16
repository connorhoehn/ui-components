// SuggestionReviewList — the review column: a titled shell over a stack of
// SuggestionCards, with the whole-document resolutions in its header.
//
// The host owns the data and the editor; this owns the frame, so the two
// panels that show suggestions (a single editor's, a document's across every
// section) stop drawing their own headers, dividers and button rows.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Card } from '../ui/Card';
import CardHeader from '../shared/CardHeader';
import Chip from '../shared/Chip';
import Banner from '../shared/Banner';
import EmptyState from '../shared/EmptyState';
import { Button } from '../ui/Button';

export interface SuggestionReviewListProps {
  /** How many are open — the count in the header. */
  count: number;
  /** The cards. */
  children?: ReactNode;
  /** Present, the header offers Accept all / Reject all. Absent for a reader who cannot resolve. */
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  /** Something a resolution just refused, above the list. */
  error?: string | null;
  /** Something else the header should carry — a mode switch, say. */
  headerExtra?: ReactNode;
  /** Copy for the empty list. */
  emptyTitle?: string;
  emptyBody?: string;
  title?: string;
  className?: string;
  'data-testid'?: string;
}

export function SuggestionReviewList({
  count,
  children,
  onAcceptAll,
  onRejectAll,
  error = null,
  headerExtra,
  emptyTitle = 'No suggestions',
  emptyBody = 'Proposed changes to this document show up here for review.',
  title = 'Suggestions',
  className,
  'data-testid': testId = 'suggestion-review-list',
}: SuggestionReviewListProps) {
  const resolvable = count > 0 && (onAcceptAll || onRejectAll);
  return (
    <Card padding="none" className={cn('overflow-hidden', className)} data-testid={testId}>
      <CardHeader
        title={title}
        meta={<Chip tone="neutral" size="xs" mono>{String(count)}</Chip>}
        action={
          (resolvable || headerExtra) ? (
            <span className="flex items-center gap-1.5">
              {headerExtra}
              {resolvable && onRejectAll && (
                <Button variant="ghost" size="sm" onClick={onRejectAll} data-testid={`${testId}-reject-all`}>
                  Reject all
                </Button>
              )}
              {resolvable && onAcceptAll && (
                <Button variant="secondary" size="sm" onClick={onAcceptAll} data-testid={`${testId}-accept-all`}>
                  Accept all
                </Button>
              )}
            </span>
          ) : undefined
        }
      />
      {error && (
        <div className="px-3 pt-2">
          <Banner variant="error" layout="stacked" data-testid={`${testId}-error`}>{error}</Banner>
        </div>
      )}
      {count === 0 ? (
        <EmptyState size="sm" title={emptyTitle} body={emptyBody} testId={`${testId}-empty`} />
      ) : (
        <ul className="m-0 list-none p-0" data-testid={`${testId}-list`}>
          {children}
        </ul>
      )}
    </Card>
  );
}

export default SuggestionReviewList;
