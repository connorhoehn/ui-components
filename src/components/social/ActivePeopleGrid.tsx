// ActivePeopleGrid — a rail section's "who's around right now": a compact
// wrapping grid of bubble avatars, first name underneath, sized so ~4 fit
// per row at the ~288px width Teams-style left rails use.
//
// Sibling of PresenceAvatars (a single overlapping row, no names, meant for
// a header strip) and AvatarGroup (same idea, even more compact). Neither
// fits a rail section that wants NAMES under the bubbles in a fixed
// multi-column grid rather than one overlapping row — hence a new shape
// instead of overloading either.

import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';
import { PresenceDot, type PresenceState } from '../shared/PresenceDot';
import { ActivityIcon } from '../ui/Icons';

const BUBBLE_SIZE = 40;

const STATUS_LABEL: Record<'online' | 'busy' | 'away', string> = {
  online: 'online',
  busy: 'busy',
  away: 'away',
};

const TILE_CLASSES =
  'flex w-full min-w-0 flex-col items-center gap-1 rounded-lg p-1 text-center';

const INTERACTIVE_TILE_CLASSES =
  'cursor-pointer border-0 bg-transparent hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1';

export interface ActivePerson {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  /** What they are doing right now — "In a call", "Editing the roadmap". A tooltip, and a small glyph on the bubble. */
  activity?: string;
  /** In a live call right now: the bubble gets a ring and the tile a small live marker. */
  inCall?: boolean;
  status?: 'online' | 'busy' | 'away';
}

export interface ActivePeopleGridProps {
  people: readonly ActivePerson[];
  /** Beyond this many, the rest collapse into a "+N" tile. Default 8. */
  maxVisible?: number;
  /** Clicking a tile — the host opens a chat with them. */
  onSelectPerson?: (userId: string) => void;
  /** Clicking the "+N" tile. Without it, the tile is inert text rather than a button. */
  onShowAll?: () => void;
  emptyLabel?: string;
  className?: string;
  'data-testid'?: string;
}

// A card in a wrapping grid can't truncate to the width of its longest
// sibling's name — a 40px avatar sitting under "Bartholomew" would either
// blow the column out to five-per-row or force every other tile to match
// its width. Only the first name goes under the bubble; the full name still
// carries the accessible name below, so nothing is actually lost.
function firstName(displayName: string): string {
  const trimmed = displayName.trim();
  if (!trimmed) return displayName;
  return trimmed.split(/\s+/)[0];
}

// The dot's colour is the only signal for status once a name is legible at
// 11px, and colour alone fails anyone who can't distinguish it (or isn't
// looking at all — a screen reader). Fold status, activity and call state
// into the one string that becomes both the tooltip and the accessible name.
function accessibleName(person: ActivePerson): string {
  const state = person.status ?? 'online';
  const parts = [person.displayName, STATUS_LABEL[state]];
  if (person.activity) parts.push(person.activity);
  if (person.inCall) parts.push('in a call');
  return parts.join(', ');
}

function TileBubble({ person, testId }: { person: ActivePerson; testId: string }) {
  const state: PresenceState = person.status ?? 'online';
  return (
    <span className="relative inline-flex shrink-0">
      <Avatar
        name={person.displayName}
        src={person.avatarUrl}
        size={BUBBLE_SIZE}
        className={cn(
          // Ring, not just a colour swap — someone who can't tell primary
          // from success-green from the presence dot still sees the ring.
          person.inCall && 'ring-2 ring-primary ring-offset-2 ring-offset-[var(--color-surface)]',
        )}
      />
      <PresenceDot
        state={state}
        className="absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-[var(--color-surface)]"
      />
      {person.activity && (
        <span
          aria-hidden="true"
          data-testid={`${testId}-activity-glyph`}
          className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface-emphasis text-text-secondary ring-2 ring-[var(--color-surface)]"
        >
          <ActivityIcon size={9} />
        </span>
      )}
    </span>
  );
}

export function ActivePeopleGrid({
  people,
  maxVisible = 8,
  onSelectPerson,
  onShowAll,
  emptyLabel = 'Nobody is around right now.',
  className,
  'data-testid': testId = 'active-people-grid',
}: ActivePeopleGridProps) {
  if (people.length === 0) {
    return (
      <p
        data-testid={`${testId}-empty`}
        className={cn('text-[12px] text-text-tertiary', className)}
      >
        {emptyLabel}
      </p>
    );
  }

  const visible = people.slice(0, maxVisible);
  const overflow = people.length - visible.length;

  return (
    <div
      data-testid={testId}
      role="list"
      aria-label="Active now"
      className={cn('grid grid-cols-4 gap-x-1 gap-y-2', className)}
    >
      {visible.map((person) => {
        const tileTestId = `${testId}-person-${person.userId}`;
        const label = accessibleName(person);
        const nameRow = (
          <span className="flex w-full min-w-0 items-center justify-center gap-1">
            {person.inCall && (
              <span
                aria-hidden="true"
                data-testid={`${tileTestId}-live`}
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />
            )}
            <span className="min-w-0 truncate text-[11px] font-medium text-text-primary">
              {firstName(person.displayName)}
            </span>
          </span>
        );

        if (onSelectPerson) {
          return (
            <button
              key={person.userId}
              type="button"
              role="listitem"
              onClick={() => onSelectPerson(person.userId)}
              title={label}
              aria-label={label}
              data-testid={tileTestId}
              className={cn(TILE_CLASSES, INTERACTIVE_TILE_CLASSES)}
            >
              <TileBubble person={person} testId={tileTestId} />
              {nameRow}
            </button>
          );
        }

        return (
          <div
            key={person.userId}
            role="listitem"
            title={label}
            aria-label={label}
            data-testid={tileTestId}
            className={TILE_CLASSES}
          >
            <TileBubble person={person} testId={tileTestId} />
            {nameRow}
          </div>
        );
      })}

      {overflow > 0 &&
        (onShowAll ? (
          <button
            type="button"
            onClick={onShowAll}
            aria-label={`${overflow} more people`}
            data-testid={`${testId}-more`}
            className={cn(TILE_CLASSES, INTERACTIVE_TILE_CLASSES)}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary"
            >
              +{overflow}
            </span>
            <span className="w-full min-w-0 truncate text-[11px] font-medium text-text-tertiary">
              More
            </span>
          </button>
        ) : (
          <div data-testid={`${testId}-more`} className={TILE_CLASSES}>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary"
            >
              +{overflow}
            </span>
            <span className="w-full min-w-0 truncate text-[11px] font-medium text-text-tertiary">
              More
            </span>
          </div>
        ))}
    </div>
  );
}

export default ActivePeopleGrid;
