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
import type { HangoutRoomRowComponent } from './HangoutRoomRow';
import { NewHangoutRoomDialog } from '../realtime-modules/NewHangoutRoomDialog';
import type {
  RMRoom,
  RMRoomOccupancy,
  RMUseHangoutRoomsReturn,
} from '../realtime-modules/types';

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
  /**
   * Open a room's conversation instead of joining its call. Omit and rooms
   * stay call-only, which is what they were before this existed.
   */
  onOpenConversation?: (room: RMRoom) => void;
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

export type HangoutRoomsSectionComponent = (props: HangoutRoomsSectionProps) => React.JSX.Element;

/**
 * Bind HangoutRoomsSection to a HangoutRoomRow (which carries the injected
 * `useRoomOccupancy`). See `createRealtimeIntegrations`.
 */
export function createHangoutRoomsSection(HangoutRoomRow: HangoutRoomRowComponent): HangoutRoomsSectionComponent {
  function HangoutRoomsSection(props: HangoutRoomsSectionProps) {
    return HangoutRoomsSectionView(HangoutRoomRow, props);
  }
  return HangoutRoomsSection;
}

function HangoutRoomsSectionView(HangoutRoomRow: HangoutRoomRowComponent, {
  rooms,
  occupancyFor,
  occupancyAdapter,
  participantId,
  onJoinRoom,
  onOpenConversation,
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

  /**
   * Active rooms, one row per slug.
   *
   * The slug is this list's identity — it is the React key and the thing the
   * row navigates to — and the feed can carry the same one more than once. On
   * a workspace with three rooms called "General" that meant three rows keyed
   * `general`, fifteen duplicate-key warnings per page load, and React free to
   * duplicate or omit rows on any update. Two rows that point at the same room
   * are not information either way.
   *
   * First occurrence wins, so ordering is untouched for the common case where
   * there are no duplicates.
   */
  const activeRooms = useMemo(() => {
    const seen = new Set<string>();
    const out: typeof rooms.rooms = [];
    for (const room of rooms.rooms) {
      if (room.state !== 'active') continue;
      if (seen.has(room.slug)) continue;
      seen.add(room.slug);
      out.push(room);
    }
    return out;
  }, [rooms.rooms]);
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
                onOpenConversation={
                  onOpenConversation ? () => onOpenConversation(room) : undefined
                }
                onContextMenu={
                  onContextMenu ? (e) => onContextMenu(room, e) : undefined
                }
              />
            ))}
            {/* This row exists only to be clicked — there is nothing else to
                read in it. `onBrowseAll` is optional, and the room rows above
                already pass `undefined` rather than a dead handler when
                `onJoinRoom` is missing, so gate this the same way instead of
                rendering a "Browse all" affordance that goes nowhere. */}
            {overflow > 0 && onBrowseAll && (
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

