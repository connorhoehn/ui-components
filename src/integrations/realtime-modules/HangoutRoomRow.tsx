// src/integrations/realtime-modules/HangoutRoomRow.tsx
//
// HangoutRoomRow — one room in the sidebar "Rooms" section.
//
// Composes:
//   SidebarRow · #-icon · room name · PresenceAvatars · Badge
//
// Occupancy resolution (two modes, mutually-compatible — adapter wins):
//
//   1. `subscribeRoomsIndex` adapter — when provided, the row calls
//      `useRoomOccupancy(slug, { subscribeRoomsIndex })` from realtime-
//      modules internally. This is the live mode and matches the
//      end-to-end wiring used by AppLayout.
//
//   2. `occupancy` snapshot prop — back-compat: caller supplies the
//      latest `RMRoomOccupancy | null` directly (legacy `occupancyFor`
//      callback flow). Used when no adapter is wired.
//
// The adapter takes precedence whenever it's defined; the snapshot prop
// is the fallback.
//
// Active-state derivation:
//   - If `participantId` is provided AND it appears in the occupancy
//     members list → this tab is in the room → render `active`.
//   - Otherwise → inactive.
//
// Trailing slot:
//   - count > 1                       → PresenceAvatars + count badge
//   - count == 1 && includes self     → pulse badge ("Just you")
//   - count == 0 or no occupancy yet  → nothing

import { useMemo, type MouseEvent } from 'react';
import { useRoomOccupancy, type RoomsIndexSubscriber } from '@connorhoehnslalom/realtime-modules/client/hangout-rooms';
import { SidebarRow } from '../../components/sidebar/SidebarRow';
import { PresenceAvatars } from '../../components/shared/PresenceAvatars';
import { Badge } from '../../components/shared/Badge';
import type { RMRoomOccupancy } from './types';

export interface HangoutRoomRowProps {
  /** Room slug (immutable identifier). */
  slug: string;
  /** Visible room name. */
  name: string;
  /** This tab's participantId, if currently in the room. Used to drive
   *  the `active` highlight and the "Just you" pulse. */
  participantId?: string;
  /** Latest occupancy snapshot for this room, or null when not yet
   *  received from the gateway. Ignored when `subscribeRoomsIndex` is
   *  provided. */
  occupancy?: RMRoomOccupancy | null;
  /** Live adapter wiring the gateway's `rooms:index` stream into
   *  `useRoomOccupancy(slug)`. When set, takes precedence over the
   *  static `occupancy` prop. */
  subscribeRoomsIndex?: RoomsIndexSubscriber;
  /** Fired on row click — caller opens the hangout overlay. */
  onClick?: () => void;
  /** Fired on right-click — caller can show a context menu. */
  onContextMenu?: (e: MouseEvent<HTMLElement>) => void;
  /** Optional kebab node passed through to the row. */
  kebab?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function HangoutRoomRow({
  slug,
  name,
  participantId,
  occupancy,
  subscribeRoomsIndex,
  onClick,
  onContextMenu,
  kebab,
  className,
  // Default testid is `room-row` — matches the e2e RoomsSidebar page-
  // object's selectors. Callers can still override via the prop.
  'data-testid': testId = 'room-row',
}: HangoutRoomRowProps) {
  // Live mode: drive occupancy off the realtime-modules hook so this
  // row updates in-place as `occupancy-delta` frames arrive. Falls back
  // to the `occupancy` prop when no adapter is wired (back-compat with
  // the legacy occupancyFor pattern).
  const live = useRoomOccupancy(subscribeRoomsIndex ? slug : null, {
    subscribeRoomsIndex,
  });
  const effective: RMRoomOccupancy | null = subscribeRoomsIndex
    ? (live.occupancy ?? null)
    : (occupancy ?? null);
  const count = effective?.count ?? 0;
  const members = effective?.members ?? [];

  const selfIncluded = useMemo(() => {
    if (!participantId) return false;
    return members.some((m) => m.participantId === participantId);
  }, [members, participantId]);

  const active = selfIncluded;

  // Avatar slice — at most 3 faces in the row, the count badge carries
  // the full number.
  const avatarUsers = useMemo(
    () =>
      members.slice(0, 3).map((m) => ({
        id: m.participantId,
        name: m.displayName ?? m.userId,
        online: true,
      })),
    [members],
  );

  let trailing: React.ReactNode = null;
  if (count > 1) {
    trailing = (
      <>
        <PresenceAvatars users={avatarUsers} maxVisible={3} size={18} />
        <Badge variant="count" value={count} color="muted" />
      </>
    );
  } else if (count === 1 && selfIncluded) {
    trailing = (
      <Badge
        variant="pulse"
        color="accent"
        aria-label="Just you in this room"
        data-testid={`${testId}-self-pulse`}
      />
    );
  } else if (count === 1) {
    // Someone else is in the room (we aren't) — show their face.
    trailing = (
      <>
        <PresenceAvatars users={avatarUsers} maxVisible={1} size={18} />
        <Badge variant="count" value={1} color="muted" />
      </>
    );
  }

  return (
    <SidebarRow
      data-testid={testId}
      icon={<span aria-hidden="true" className="font-semibold text-slate-400">#</span>}
      label={name}
      trailing={trailing}
      active={active}
      onClick={onClick}
      onContextMenu={onContextMenu}
      kebab={kebab}
      aria-label={`${name} room`}
      className={className}
      // E2E hooks: room slug + live occupancy + joined-state flags so the
      // RoomsSidebar page-object can locate rows + assert presence
      // transitions without scraping CSS.
      dataAttrs={{
        'data-room-slug': slug,
        'data-room-name': name,
        'data-room-active-count': count,
        'data-joined': active ? 'true' : 'false',
      }}
    />
  );
}

export default HangoutRoomRow;
