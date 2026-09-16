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
  /**
   * `card` (default) is a bordered, titled card for a page margin. `pane` is
   * the same list hosted inside a tab or side column that already names it:
   * no card chrome, no title, a slim toolbar carrying the count and the
   * whole-document resolutions, and its own gutter.
   */
  variant?: 'card' | 'pane';
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
  variant = 'card',
  className,
  'data-testid': testId = 'suggestion-review-list',
}: SuggestionReviewListProps) {
  const resolvable = count > 0 && (onAcceptAll || onRejectAll);
  const actions = (resolvable || headerExtra) ? (
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
  ) : undefined;
  const body = (
    <>
      {error && (
        <div className={cn('pt-2', variant === 'card' && 'px-3')}>
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
    </>
  );

  if (variant === 'pane') {
    return (
      <div className={cn('flex min-h-0 flex-1 flex-col', className)} data-testid={testId} data-variant="pane">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5">
          <span className="text-xs text-tertiary" data-testid={`${testId}-count`}>
            {count === 0 ? 'None open' : count === 1 ? '1 open' : `${count} open`}
          </span>
          {actions}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3">{body}</div>
      </div>
    );
  }

  return (
    <Card padding="none" className={cn('overflow-hidden', className)} data-testid={testId}>
      <CardHeader
        title={title}
        meta={<Chip tone="neutral" size="xs" mono>{String(count)}</Chip>}
        action={actions}
      />
      {body}
    </Card>
  );
}

export default SuggestionReviewList;
