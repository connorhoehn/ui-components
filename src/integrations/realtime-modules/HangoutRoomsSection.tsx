// src/integrations/realtime-modules/HangoutRoomsSection.tsx
//
// HangoutRoomsSection — the full "Rooms" sidebar group.
//
// Composes:
//   SidebarSection + N × HangoutRoomRow + NewHangoutRoomDialog + actions
//
// The caller wires the realtime-modules `useHangoutRooms()` hook and
// passes the return value as `rooms`. This keeps the composite framework-
// pure (no LVSProvider context dep at this layer) and matches the pattern
// used by `WrappedChatPanel` / `WrappedPresencePanel`.
//
// Occupancy resolution: the caller supplies an `occupancyFor(slug)`
// function that returns the latest `RMRoomOccupancy | null` snapshot.
// Typically wired to a single `useGateway()`-backed cache that
// dispatches `rooms:occupancy` frames to `useRoomOccupancy(slug)`
// consumers — but this composite stays decoupled from that detail.
//
// States:
//   - isLoading           → 3 skeleton rows
//   - error               → small retry banner
//   - rooms.length === 0  → EmptyState with "Create room" CTA
//   - else                → up to `maxVisible` rows + "Browse all" link

import { useMemo, useState, type MouseEvent } from 'react';
import type { RoomsIndexSubscriber } from '@connorhoehn/realtime-modules/client/hangout-rooms';
import { SidebarSection } from '../../components/sidebar/SidebarSection';
import { SidebarRow } from '../../components/sidebar/SidebarRow';
import EmptyState from '../../components/shared/EmptyState';
import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import { HangoutRoomRow } from './HangoutRoomRow';
import { NewHangoutRoomDialog } from './NewHangoutRoomDialog';
import type {
  RMRoom,
  RMRoomOccupancy,
  RMUseHangoutRoomsReturn,
} from './types';

export interface HangoutRoomsSectionProps {
  /** Return value of `useHangoutRooms()` from realtime-modules. */
  rooms: RMUseHangoutRoomsReturn;
  /** Resolves the latest occupancy snapshot for one slug. Legacy
   *  pattern — when `occupancyAdapter` is supplied, that adapter wins
   *  and this callback is ignored on a per-row basis. */
  occupancyFor?: (slug: string) => RMRoomOccupancy | null;
  /** Live gateway adapter — when provided, each row drives its own
   *  `useRoomOccupancy(slug)` off this subscriber and the static
   *  `occupancyFor` lookup is bypassed. The expected shape matches the
   *  `subscribeRoomsIndex` adapter returned by `useRoomsSubscription`
   *  in the gateway frontend. */
  occupancyAdapter?: RoomsIndexSubscriber;
  /** Per-tab participantId — used to highlight rooms this tab is in. */
  participantId?: string;
  /** Called when a row is clicked. Caller opens the hangout overlay. */
  onJoinRoom?: (room: RMRoom) => void;
  /** Called when a row is right-clicked. */
  onContextMenu?: (room: RMRoom, e: MouseEvent<HTMLElement>) => void;
  /** Called when "Browse all" is clicked (when rooms exceed `maxVisible`). */
  onBrowseAll?: () => void;
  /** Max rows to render inline. Defaults to 10. */
  maxVisible?: number;
  /** Section title override. Defaults to "Rooms". */
  title?: string;
  /** Section storageKey override (collapse persistence). */
  storageKey?: string;
  /** Custom create renderer — when omitted the built-in dialog is used. */
  renderCreateDialog?: (props: { open: boolean; onClose: () => void }) => React.ReactNode;
}

export function HangoutRoomsSection({
  rooms,
  occupancyFor,
  occupancyAdapter,
  participantId,
  onJoinRoom,
  onContextMenu,
  onBrowseAll,
  maxVisible = 10,
  title = 'Rooms',
  storageKey,
  renderCreateDialog,
}: HangoutRoomsSectionProps) {
  const [createOpen, setCreateOpen] = useState(false);

  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);

  const activeRooms = useMemo(
    () => rooms.rooms.filter((r) => r.state === 'active'),
    [rooms.rooms],
  );
  const visible = useMemo(
    () => activeRooms.slice(0, maxVisible),
    [activeRooms, maxVisible],
  );
  const overflow = activeRooms.length - visible.length;

  const actions = (
    <IconButton
      aria-label="New room"
      size="sm"
      onClick={openCreate}
      icon={
        <span aria-hidden="true" className="text-[14px] leading-none font-bold">
          +
        </span>
      }
      // Aligns with the RoomsSidebar page-object's `new-room-button` lookup.
      data-testid="new-room-button"
    />
  );

  return (
    <>
      <SidebarSection
        title={title}
        storageKey={storageKey}
        actions={actions}
        data-testid="rooms-section"
      >
        {rooms.isLoading && (
          <div className="flex flex-col gap-1 px-1 py-1" data-testid="hangout-rooms-loading">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                aria-hidden="true"
                className="h-7 rounded-md bg-surface-hover animate-pulse"
              />
            ))}
          </div>
        )}

        {!rooms.isLoading && rooms.error && (
          <div
            role="alert"
            data-testid="hangout-rooms-error"
            className="mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2"
          >
            <span className="truncate">Couldn't load rooms.</span>
            <button
              type="button"
              onClick={() => void rooms.refetch()}
              className="text-danger-fg underline hover:text-danger-fg cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {!rooms.isLoading && !rooms.error && activeRooms.length === 0 && (
          <EmptyState
            testId="hangout-rooms-empty"
            title="No rooms yet"
            description="Create one to start an ongoing hangout."
            action={
              <Button onClick={openCreate} variant="primary" size="sm">
                Create room
              </Button>
            }
          />
        )}

        {!rooms.isLoading && !rooms.error && activeRooms.length > 0 && (
          <div className="flex flex-col gap-0.5">
            {visible.map((room) => (
              <HangoutRoomRow
                key={room.slug}
                slug={room.slug}
                name={room.name}
                participantId={participantId}
                // Live adapter wins; the static snapshot is the fallback
                // for legacy callers that still drive occupancyFor.
                subscribeRoomsIndex={occupancyAdapter}
                occupancy={
                  occupancyAdapter ? null : (occupancyFor?.(room.slug) ?? null)
                }
                onClick={onJoinRoom ? () => onJoinRoom(room) : undefined}
                onContextMenu={
                  onContextMenu ? (e) => onContextMenu(room, e) : undefined
                }
              />
            ))}
            {overflow > 0 && (
              <SidebarRow
                data-testid="hangout-rooms-browse-all"
                label={
                  <span className="text-[12px] text-neutral">
                    Browse all ({activeRooms.length})
                  </span>
                }
                onClick={onBrowseAll}
              />
            )}
          </div>
        )}
      </SidebarSection>

      {renderCreateDialog
        ? renderCreateDialog({ open: createOpen, onClose: closeCreate })
        : (
            <NewHangoutRoomDialog
              open={createOpen}
              onClose={closeCreate}
              onCreate={rooms.createRoom}
              onCreated={(room) => {
                // Optional auto-join is the caller's call — wired via
                // onJoinRoom downstream. We just close the modal.
                onJoinRoom?.(room);
              }}
            />
          )}
    </>
  );
}

export default HangoutRoomsSection;
