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
import type { RoomsIndexSubscriber } from '@connorhoehn/realtime-modules/client/hangout-rooms';
import type { RealtimeClientModules } from './modules';
import { SidebarRow } from '../../components/sidebar/SidebarRow';
import { PresenceAvatars } from '../../components/shared/PresenceAvatars';
import { Badge } from '../../components/shared/Badge';
import type { RMRoomOccupancy } from '../realtime-modules/types';

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
  /**
   * Open the room's CONVERSATION rather than joining its call.
   *
   * A room is not only a call. Things are said in it, files are dropped in
   * it, documents get written in it — and until this existed the only way
   * into a room was to join the video, so everything that came out of it was
   * unreachable unless somebody was in there right now.
   *
   * Secondary by design: the row's own click still joins, because that is
   * what a hangout row is for. Omit to render no such control.
   */
  onOpenConversation?: () => void;
  /** Optional kebab node passed through to the row. */
  kebab?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

/** The realtime-modules functions HangoutRoomRow calls. */
export type HangoutRoomRowModules = Pick<RealtimeClientModules, 'useRoomOccupancy'>;

export type HangoutRoomRowComponent = (props: HangoutRoomRowProps) => React.JSX.Element;

/**
 * Bind HangoutRoomRow to an injected `useRoomOccupancy`. The canonical binding
 * lives in `integrations/realtime-modules/HangoutRoomRow`.
 */
export function createHangoutRoomRow(rm: HangoutRoomRowModules): HangoutRoomRowComponent {
  function HangoutRoomRow(props: HangoutRoomRowProps) {
    return HangoutRoomRowView(rm, props);
  }
  return HangoutRoomRow;
}

function HangoutRoomRowView(rm: HangoutRoomRowModules, {
  slug,
  name,
  participantId,
  occupancy,
  subscribeRoomsIndex,
  onClick,
  onContextMenu,
  onOpenConversation,
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
  const live = rm.useRoomOccupancy(subscribeRoomsIndex ? slug : null, {
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
        // `||`, not `??`. The gateway writes `displayName: ''` — not
        // undefined — whenever a membership record is touched by a signal
        // that carries no identity, and `'' ?? x` is `''`. So this fallback
        // never fired, `Avatar` got an empty name, and every face in the
        // sidebar's room row rendered `?` (Avatar.tsx: `if (!trimmed)
        // return '?'`). An empty string is not a name.
        //
        // The blanking itself is fixed upstream in realtime-modules'
        // RoomService (the record merges now instead of being replaced);
        // this stays because a nameless member is a thing this row should
        // survive, not a thing it should render a question mark for.
        name: m.displayName || m.userId,
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

  // Sits in the kebab slot so it never competes with the row's own click
  // target, and only shows on hover or focus — a persistent second button on
  // every room turns a navigation list into a toolbar.
  const conversationControl = onOpenConversation ? (
    <button
      data-ui-part=""
      type="button"
      aria-label={`Open the ${name} conversation`}
      title="Open conversation"
      data-testid={`${testId}-open-conversation`}
      onClick={(e) => {
        // Without this the row's own handler also fires and the call opens
        // on top of the conversation you asked for.
        e.stopPropagation();
        onOpenConversation();
      }}
      className="grid h-5 w-5 place-items-center rounded bg-transparent text-[11px] text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover hover:text-text-primary focus:opacity-100 group-hover:opacity-100"
    >
      💬
    </button>
  ) : null;

  return (
    <SidebarRow
      data-testid={testId}
      icon={<span aria-hidden="true" className="font-semibold text-text-tertiary">#</span>}
      label={name}
      trailing={trailing}
      active={active}
      onClick={onClick}
      onContextMenu={onContextMenu}
      kebab={kebab ?? conversationControl}
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

