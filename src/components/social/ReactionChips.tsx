// ReactionChips — grouped emoji reactions under a message.
//
// One chip per emoji with a count, not one chip per reaction: five people
// reacting with the same emoji is one fact, and rendering it five times buries
// the message it belongs to. The viewer's own reaction is highlighted because
// the chip is a TOGGLE — you have to be able to see what pressing it will do.

import { useMemo } from 'react';
import { cn } from '../../lib/cn';

export interface MessageReaction {
  emoji: string;
  /** Who reacted. Drives the count, the "you" state, and the tooltip. */
  userId: string;
  displayName?: string;
}

export interface ReactionChipsProps {
  reactions: readonly MessageReaction[];
  /** The viewer, so their own reactions can be marked and toggled. */
  currentUserId: string;
  onToggle: (emoji: string) => void;
  className?: string;
  'data-testid'?: string;
}

export interface ReactionGroup {
  emoji: string;
  count: number;
  mine: boolean;
  names: string[];
}

/** Groups by emoji, preserving first-seen order so chips do not reshuffle. */
export function groupReactions(
  reactions: readonly MessageReaction[],
  currentUserId: string,
): ReactionGroup[] {
  const order: string[] = [];
  const byEmoji = new Map<string, ReactionGroup>();
  const seen = new Set<string>();

  for (const r of reactions) {
    // The same person reacting twice with the same emoji is one reaction — a
    // double-fire from an optimistic update must not inflate the count.
    const dedupeKey = `${r.emoji} ${r.userId}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    let g = byEmoji.get(r.emoji);
    if (!g) {
      g = { emoji: r.emoji, count: 0, mine: false, names: [] };
      byEmoji.set(r.emoji, g);
      order.push(r.emoji);
    }
    g.count += 1;
    if (r.userId === currentUserId) g.mine = true;
    else g.names.push(r.displayName ?? r.userId);
  }

  return order.map((e) => byEmoji.get(e) as ReactionGroup);
}

/** "You and Ada", "Ada, Sam and 3 others" — the tooltip people expect. */
export function describeReactors(group: ReactionGroup): string {
  const parts = group.mine ? ['You', ...group.names] : [...group.names];
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];
  if (parts.length <= 3) return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
  return `${parts.slice(0, 2).join(', ')} and ${parts.length - 2} others`;
}

export function ReactionChips({
  reactions,
  currentUserId,
  onToggle,
  className,
  'data-testid': testId = 'reaction-chips',
}: ReactionChipsProps) {
  const groups = useMemo(() => groupReactions(reactions, currentUserId), [reactions, currentUserId]);
  if (groups.length === 0) return null;

  return (
    <div data-testid={testId} className={cn('mt-1 flex flex-wrap gap-1', className)}>
      {groups.map((g) => (
        <button
          key={g.emoji}
          type="button"
          data-testid="reaction-chip"
          data-emoji={g.emoji}
          data-mine={String(g.mine)}
          // aria-pressed, because the chip is a toggle rather than a command:
          // a screen-reader user needs to know they already reacted.
          aria-pressed={g.mine}
          aria-label={`${g.emoji} ${g.count}${g.mine ? ', including you' : ''}`}
          title={describeReactors(g)}
          onClick={() => onToggle(g.emoji)}
          className={cn(
            'flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            g.mine
              ? 'border-primary bg-primary-bg text-primary-fg'
              : 'border-border bg-surface text-text-secondary hover:bg-surface-hover',
          )}
        >
          <span aria-hidden>{g.emoji}</span>
          <span className="tabular-nums">{g.count}</span>
        </button>
      ))}
    </div>
  );
}

export default ReactionChips;
