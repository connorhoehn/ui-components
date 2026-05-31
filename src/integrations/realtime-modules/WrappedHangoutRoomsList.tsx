// src/integrations/realtime-modules/WrappedHangoutRoomsList.tsx
//
// HangoutRoomsSection wired directly to a useHangoutRooms() hook return
// from realtime-modules. Absorbs the three prop drills callers used to
// repeat:
//
//   1. forwards the full RMUseHangoutRoomsReturn (rooms, isLoading,
//      error, refetch, createRoom, joinRoom, …) to HangoutRoomsSection,
//   2. translates the row-click → (slug) instead of (RMRoom),
//   3. auto-wires `subscribeRoomsIndex` (a separate gateway adapter)
//      so each row drives its own live `useRoomOccupancy(slug)` without
//      the caller threading it through.
//
// HangoutRoomsSection itself stays unchanged — this wrapper is purely
// an adapter shell.
//
// The optional `wrapWithNetworkShim` opt-in mirrors the pattern used by
// WrappedChatPanel / WrappedPresencePanel: pass a connection state and
// the rendered section is wrapped in NetworkErrorBoundary + Reconnecting-
// Shim. Without it the section renders raw.

import type { ReactNode, MouseEvent } from 'react';
import {
  HangoutRoomsSection,
  type HangoutRoomsSectionProps,
} from './HangoutRoomsSection';
import { applyNetworkShim, type NetworkShimOptions } from './networkShim';
import type {
  RMRoom,
  RMRoomOccupancy,
  RMUseHangoutRoomsReturn,
} from './types';

// Derive the live-occupancy adapter type from HangoutRoomsSection's prop
// signature rather than re-importing from
// `@connorhoehn/realtime-modules/client/hangout-rooms` (which is not yet
// shipped — see CLAUDE.md "Known issues"). Keeps the file out of the TS
// error baseline.
type RoomsIndexSubscriber = NonNullable<
  HangoutRoomsSectionProps['occupancyAdapter']
>;

export interface WrappedHangoutRoomsListProps {
  /** Return value of `useHangoutRooms()` from realtime-modules. */
  hangoutRooms: RMUseHangoutRoomsReturn;
  /**
   * Live gateway adapter for room occupancy — typically the
   * `subscribeRoomsIndex` returned by `useRoomsSubscription()`. When
   * provided, every row drives its own `useRoomOccupancy(slug)` off
   * this subscriber so presence indicators stay live without the
   * caller wiring per-row occupancy.
   */
  subscribeRoomsIndex?: RoomsIndexSubscriber;
  /**
   * Back-compat / static-snapshot lookup. Used only when
   * `subscribeRoomsIndex` is NOT provided. Returns the latest occupancy
   * snapshot for a slug.
   */
  occupancyFor?: (slug: string) => RMRoomOccupancy | null;
  /** This tab's participantId — drives the row "active" highlight. */
  participantId?: string;
  /** Convenience: fires with the room slug when a row is clicked. */
  onJoin?: (slug: string) => void;
  /** Right-click on a row. */
  onContextMenu?: (room: RMRoom, e: MouseEvent<HTMLElement>) => void;
  /** Fired when "Browse all" overflow link is clicked. */
  onBrowseAll?: () => void;
  /** Max inline rows. Defaults to 10. */
  maxVisible?: number;
  /** Section title override. Defaults to "Rooms". */
  title?: string;
  /** Section storageKey override (collapse persistence). */
  storageKey?: string;
  /**
   * Custom empty-state slot. When the active rooms list is empty AND
   * the hook is not loading AND there is no error, this slot REPLACES
   * the entire section render. Use it when the host page wants full
   * control over the no-rooms UI (e.g. an onboarding upsell).
   */
  renderEmpty?: ReactNode;
  /** Custom create-dialog renderer — forwarded to HangoutRoomsSection. */
  renderCreateDialog?: (props: { open: boolean; onClose: () => void }) => ReactNode;
  /**
   * Opt-in: wrap the rendered section in NetworkErrorBoundary +
   * ReconnectingShim. Pass `connectionState` from the gateway layer.
   */
  wrapWithNetworkShim?: NetworkShimOptions;
}

export function WrappedHangoutRoomsList({
  hangoutRooms,
  subscribeRoomsIndex,
  occupancyFor,
  participantId,
  onJoin,
  onContextMenu,
  onBrowseAll,
  maxVisible,
  title,
  storageKey,
  renderEmpty,
  renderCreateDialog,
  wrapWithNetworkShim,
}: WrappedHangoutRoomsListProps) {
  const activeRoomCount = hangoutRooms.rooms.filter(
    (r) => r.state === 'active',
  ).length;

  const isEmpty =
    activeRoomCount === 0 &&
    !hangoutRooms.isLoading &&
    !hangoutRooms.error;

  if (isEmpty && renderEmpty) {
    return (
      <div data-testid="wrapped-hangout-rooms-empty-slot">{renderEmpty}</div>
    );
  }

  const section = (
    <HangoutRoomsSection
      rooms={hangoutRooms}
      occupancyAdapter={subscribeRoomsIndex}
      occupancyFor={occupancyFor}
      participantId={participantId}
      onJoinRoom={onJoin ? (room) => onJoin(room.slug) : undefined}
      onContextMenu={onContextMenu}
      onBrowseAll={onBrowseAll}
      maxVisible={maxVisible}
      title={title}
      storageKey={storageKey}
      renderCreateDialog={renderCreateDialog}
    />
  );

  return <>{applyNetworkShim(section, wrapWithNetworkShim)}</>;
}

export default WrappedHangoutRoomsList;
