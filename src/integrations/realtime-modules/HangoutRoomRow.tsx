// src/integrations/realtime-modules/HangoutRoomRow.tsx
//
// HangoutRoomRow — one room in the sidebar "Rooms" section.
//
// Composes:
//   SidebarRow · #-icon · room name · PresenceAvatars · Badge
//
// Occupancy comes from a RoomOccupancy snapshot (the caller wires the
// realtime-modules `useRoomOccupancy(slug)` hook and forwards the
// result). This keeps the composite decoupled from any specific WS
// adapter — matching the pattern used by `WrappedChatPanel` /
// `WrappedPresencePanel`.
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
   *  received from the gateway. */
  occupancy?: RMRoomOccupancy | null;
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
  onClick,
  onContextMenu,
  kebab,
  className,
  'data-testid': testId = 'hangout-room-row',
}: HangoutRoomRowProps) {
  const count = occupancy?.count ?? 0;
  const members = occupancy?.members ?? [];

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
    />
  );
}

export default HangoutRoomRow;
