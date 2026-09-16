// MembershipNotice — "Eve Thompson added Carol Johnson · history from the
// last 7 days", as a centred system line in the thread rather than a bubble.
//
// Teams posts membership changes as thread events, not messages from the
// person who made them. The line names who did it, to whom, and what the
// newcomer can read — the one fact a person cannot see any other way.

import { cn } from '../../lib/cn';

export type MembershipHistoryMode = 'none' | 'days' | 'all';

export interface MembershipHistory {
  mode: MembershipHistoryMode;
  days?: number;
}

export interface MembershipRef {
  event: 'added' | 'removed';
  actorId: string;
  actorName?: string;
  userIds: string[];
  names?: string[];
  history?: MembershipHistory;
}

export interface MembershipNoticeProps {
  membership: MembershipRef;
  /** The message text — what the line says when the names are missing. */
  fallbackText?: string;
  timestamp?: string;
  className?: string;
  'data-testid'?: string;
}

function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

export function describeMembershipHistory(history: MembershipHistory | undefined): string {
  if (!history) return '';
  if (history.mode === 'all') return 'all history';
  if (history.mode === 'days') return `history from the last ${history.days === 1 ? 'day' : `${history.days ?? 7} days`}`;
  return 'no history';
}

/** The sentence the line shows; the fallback when the names are not on the wire. */
export function describeMembership(ref: MembershipRef, fallbackText?: string): string {
  const who = ref.names && ref.names.length > 0 ? joinNames(ref.names) : ref.userIds.length > 0 ? joinNames(ref.userIds) : '';
  const actor = ref.actorName ?? ref.actorId;
  if (!who) return fallbackText || (ref.event === 'added' ? `${actor} added people` : `${actor} removed people`);
  if (ref.event === 'removed') return `${actor} removed ${who}`;
  const history = describeMembershipHistory(ref.history);
  return `${actor} added ${who}${history ? ` · ${history}` : ''}`;
}

export function MembershipNotice({
  membership,
  fallbackText,
  timestamp,
  className,
  'data-testid': testId = 'membership-notice',
}: MembershipNoticeProps) {
  const text = describeMembership(membership, fallbackText);
  return (
    <div
      role="status"
      data-testid={testId}
      data-event={membership.event}
      className={cn('flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary', className)}
    >
      <span data-testid={`${testId}-text`}>{text}</span>
      {timestamp && (
        <time dateTime={timestamp} className="tabular-nums" data-testid={`${testId}-time`}>
          {new Date(timestamp).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
        </time>
      )}
    </div>
  );
}

export default MembershipNotice;
