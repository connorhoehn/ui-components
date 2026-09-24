// CommentList — a compact, read-only preview of discussion on a work item
// ("Planning notes"): avatar, "Name · role · 2d ago", then the text.
//
// It is a preview, not the thread: no replies, no composer. `max` trims to the
// newest few and "View all (N)" hands off to wherever the full discussion
// lives. A role is shown only when the caller has one — no "Member" filler.
// Relative time goes through the library's existing `relativeAgo` helper, and
// `now` pins it so tests and stories do not drift with the clock.

import { DetailSection } from '../shared/DetailSection';
import { Avatar } from '../shared/Avatar';
import { MetaLine } from '../shared/MetaLine';
import { Button } from '../ui/Button';
import { relativeAgo } from '../pipelines/list/catalog';

export interface CommentListItem {
  id: string;
  author: { id: string; name: string; avatarUrl?: string };
  role?: string | null;
  createdAt: string | number | Date;
  text: string;
}

export interface CommentListProps {
  title?: string;
  comments: CommentListItem[];
  /** Total in the full discussion, when larger than what is passed. */
  total?: number;
  onViewAll?: () => void;
  /** Clock for relative times (ms since epoch). Default Date.now(). */
  now?: number;
  emptyLabel?: string;
  /** Show at most this many comments. */
  max?: number;
  first?: boolean;
  /**
   * `heading` (default since 2.386.14): a 16px heading, 32px avatars, 14px
   * text, "View all" quiet until hover — a work item's Brief. `label`: the
   * small caption and 28px avatars, for a side panel.
   */
  variant?: 'label' | 'heading';
  className?: string;
  'data-testid'?: string;
}

function toIso(v: string | number | Date): string | undefined {
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export function CommentList({
  title = 'Planning notes', comments, total, onViewAll, now, emptyLabel = 'No notes yet', max,
  first, variant = 'heading', className, 'data-testid': testId = 'comment-list',
}: CommentListProps) {
  const heading = variant === 'heading';
  const shown = max != null ? comments.slice(0, max) : comments;
  const count = total ?? comments.length;
  const clock = now ?? Date.now();

  const actions = onViewAll && count > 0 ? (
    <Button variant="link" size="sm" onClick={onViewAll} className="text-[13px] font-medium">View all ({count})</Button>
  ) : undefined;

  return (
    <DetailSection title={title} actions={actions} first={first} variant={variant} className={className} data-testid={testId}>
      {shown.length === 0 ? (
        <p className={heading ? 'm-0 text-sm text-text-tertiary' : 'm-0 text-[13px] text-text-tertiary'}>{emptyLabel}</p>
      ) : (
        <ul className={heading ? 'm-0 flex list-none flex-col gap-2.5 px-0 pb-0 pt-1' : 'm-0 flex list-none flex-col gap-3 p-0'} aria-label={title}>
          {shown.map((c) => {
            const iso = toIso(c.createdAt);
            const ago = relativeAgo(iso, clock);
            return (
              <li key={c.id} className={heading ? 'flex items-start gap-3' : 'flex items-start gap-2.5'} data-testid={`comment-${c.id}`}>
                <Avatar name={c.author.name} src={c.author.avatarUrl} size={heading ? 32 : 28} />
                <div className="min-w-0 flex-1">
                  <MetaLine
                    size="sm"
                    items={[
                      <span key="n" className="font-medium text-text-primary">{c.author.name}</span>,
                      c.role || null,
                      ago && iso ? <time key="t" dateTime={iso}>{ago}</time> : null,
                    ]}
                  />
                  <p className={heading ? 'm-0 whitespace-pre-wrap text-sm leading-5 text-text-primary' : 'm-0 whitespace-pre-wrap text-[13px] leading-snug text-text-primary'}>{c.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </DetailSection>
  );
}

export default CommentList;
