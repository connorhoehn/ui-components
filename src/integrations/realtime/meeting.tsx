// Meeting bindings — raised hands and breakout rooms from realtime-modules'
// `useMeeting` (`@connorhoehn/realtime-modules/client/meeting`, 0.121.0+)
// onto the transport-agnostic video composites.
//
// No runtime import of realtime-modules: the hook's RESULT is the input
// (`meeting={useMeeting(lobby)}`), typed structurally below, so this module
// loads on any realtime-modules pin and a host on an older one simply never
// renders it.

import type { ReactNode } from 'react';
import {
  BreakoutRoomsPanel,
  type BreakoutPerson,
  type BreakoutRoomView,
  type BreakoutRoomsPanelProps,
} from '../../components/video/BreakoutRoomsPanel';
import { BreakoutRoomBanner } from '../../components/video/BreakoutRoomBanner';
import Banner from '../../components/shared/Banner';
import { MeetingHandIcon, MeetingRoomsIcon } from '../../components/video/MeetingIcons';
import type { MeetingToolbarItem } from '../../components/video/MeetingToolbar';
import type { RosterPanelProps, RosterParticipant } from '../../components/video/RosterPanel';

/** The slice of realtime-modules' `BreakoutState` these bindings read. */
export interface RMBreakoutState {
  phase: 'none' | 'draft' | 'open';
  mode: 'assigned' | 'self-select';
  rooms: { id: string; name: string; state: 'open' | 'closed'; members: string[] }[];
  returned: string[];
  endsAt: string | null;
  /** realtime-modules 0.124.0+: rooms are in the closing grace. */
  closing?: boolean;
  announcement: { message: string; fromUserId: string; fromDisplayName: string; at: string } | null;
  settings: { allowReturnToMain: boolean };
}

export interface RMRaisedHand {
  userId: string;
  displayName: string;
  raisedAt: string;
}

/**
 * Structural `UseMeetingResult` (realtime-modules 0.121.0). Members added
 * later are optional, so an older pin's result still fits.
 */
export interface RMMeetingSource {
  ready: boolean;
  isOrganizer: boolean;
  hands: RMRaisedHand[];
  myHandPosition: number | null;
  toggleHand(): void;
  lowerHand(userId?: string): void;
  lowerAllHands(): void;
  breakout: RMBreakoutState;
  myRoom: { id: string; name: string } | null;
  state: { announcement: RMBreakoutState['announcement']; you?: { userId: string | null; organizer: boolean } };
  error: { code: string; message: string; requestAction: string } | null;
  configureBreakouts(rooms: { id?: string; name: string; members?: string[] }[], opts?: { mode?: 'assigned' | 'self-select'; allowReturnToMain?: boolean }): void;
  /** realtime-modules 0.123.0+. Without it the pane has no Add room. */
  addRoom?(opts?: { id?: string; name?: string }): void;
  /** realtime-modules 0.123.0+. Without it room names are read-only. */
  renameRoom?(roomId: string, name: string): void;
  assign(assignments: Record<string, string | null>): void;
  autoAssign(userIds: string[]): void;
  openRooms(roomIds?: string[]): void;
  closeRooms(roomIds?: string[]): void;
  setTimer(durationMs: number | null): void;
  broadcast(message: string): void;
  joinRoom(roomId: string): void;
  returnToMain(): void;
  endBreakouts(): void;
  dismissAnnouncement(): void;
}

/** A person in the meeting as the host knows them (the call roster). */
export interface RMMeetingPerson {
  userId: string;
  displayName: string;
  avatarUrl?: string;
}

/** userId → 1-based hand position. Feed `handRaised` on tiles and roster rows. */
export function meetingHandPositions(hands: readonly RMRaisedHand[]): Map<string, number> {
  return new Map(hands.map((h, i) => [h.userId, i + 1]));
}

/**
 * The People pane's hands queue: spread onto `RosterPanel`. Each participant
 * (keyed by the meeting's userId) gets its queue position, raised hands sort
 * to the top, and an organizer gets Lower and Lower all hands.
 *
 *   <RosterPanel {...meetingRosterProps(meeting, roster)} />
 */
export function meetingRosterProps(
  meeting: Pick<RMMeetingSource, 'hands' | 'isOrganizer' | 'lowerHand' | 'lowerAllHands'>,
  participants: readonly RosterParticipant[],
): Pick<RosterPanelProps, 'participants' | 'raisedHandsFirst' | 'onLowerHand' | 'onLowerAllHands'> {
  const handAt = meetingHandPositions(meeting.hands);
  return {
    participants: participants.map((p) => ({ ...p, handRaised: handAt.get(p.id) })),
    raisedHandsFirst: true,
    onLowerHand: meeting.isOrganizer ? (id) => meeting.lowerHand(id) : undefined,
    onLowerAllHands: meeting.isOrganizer ? () => meeting.lowerAllHands() : undefined,
  };
}

/** Rooms with people resolved, plus who is in the meeting but in no room. */
export function adaptBreakoutRooms(
  breakout: RMBreakoutState,
  people: readonly RMMeetingPerson[],
  hands: readonly RMRaisedHand[] = [],
): { rooms: BreakoutRoomView[]; unassigned: BreakoutPerson[] } {
  const byId = new Map(people.map((p) => [p.userId, p]));
  const handAt = meetingHandPositions(hands);
  const person = (userId: string): BreakoutPerson => {
    const p = byId.get(userId);
    return { id: userId, name: p?.displayName ?? userId, avatarUrl: p?.avatarUrl, handRaised: handAt.get(userId) };
  };
  const placed = new Set<string>();
  const rooms = breakout.rooms.map((r) => {
    r.members.forEach((m) => placed.add(m));
    return { id: r.id, name: r.name, state: r.state, members: r.members.map(person) };
  });
  const unassigned = people.filter((p) => !placed.has(p.userId)).map((p) => person(p.userId));
  return { rooms, unassigned };
}

/** Default room names: "Room 1"…"Room n". */
export function defaultRoomDrafts(count: number): { name: string }[] {
  return Array.from({ length: count }, (_, i) => ({ name: `Room ${i + 1}` }));
}

export interface WrappedBreakoutRoomsPanelProps
  extends Pick<BreakoutRoomsPanelProps, 'onClose' | 'title' | 'timerMinutes' | 'maxRooms' | 'className' | 'data-testid'> {
  meeting: RMMeetingSource;
  /** Everyone in the meeting (the call roster), for names and the "not in a room" list. */
  people: RMMeetingPerson[];
  /** Name the rooms an organizer creates. Default "Room 1"… */
  roomNames?: (count: number) => string[];
  /** Rendered above the list when the last action was refused. Default: the server's message. */
  renderError?: (error: NonNullable<RMMeetingSource['error']>) => ReactNode;
}

export function WrappedBreakoutRoomsPanel({ meeting, people, roomNames, renderError, ...rest }: WrappedBreakoutRoomsPanelProps) {
  const { rooms, unassigned } = adaptBreakoutRooms(meeting.breakout, people, meeting.hands);
  const b = meeting.breakout;
  return (
    <BreakoutRoomsPanel
      {...rest}
      rooms={rooms}
      phase={b.phase}
      mode={b.mode}
      myRoomId={meeting.myRoom?.id ?? null}
      isOrganizer={meeting.isOrganizer}
      unassigned={unassigned}
      endsAt={b.endsAt}
      closing={b.closing === true}
      allowReturnToMain={b.settings.allowReturnToMain}
      onJoin={meeting.joinRoom}
      onReturnToMain={meeting.returnToMain}
      onCreateRooms={(count, mode) => {
        const names = roomNames?.(count) ?? defaultRoomDrafts(count).map((d) => d.name);
        meeting.configureBreakouts(names.map((name) => ({ name })), { mode });
      }}
      onAutoAssign={() => {
        // Everyone but the organizer pressing the button, rooms reshuffled.
        const self = meeting.state.you?.userId ?? null;
        meeting.autoAssign(people.map((p) => p.userId).filter((u) => u !== self));
      }}
      onAssign={(userId, roomId) => meeting.assign({ [userId]: roomId })}
      onOpenRooms={meeting.openRooms}
      onCloseRooms={meeting.closeRooms}
      onSetTimer={meeting.setTimer}
      onBroadcast={meeting.broadcast}
      onEnd={meeting.endBreakouts}
      onDeleteRooms={() => meeting.configureBreakouts([])}
      onAddRoom={meeting.addRoom ? () => meeting.addRoom?.() : undefined}
      onRenameRoom={meeting.renameRoom}
      notice={meeting.error ? (renderError?.(meeting.error) ?? (
        <Banner variant="error" className="mx-4 mt-3" data-testid="breakout-error">{meeting.error.message}</Banner>
      )) : null}
    />
  );
}

/** The in-room banner, or nothing in the main meeting. */
export function WrappedBreakoutRoomBanner({ meeting, className }: { meeting: RMMeetingSource; className?: string }) {
  if (!meeting.myRoom) return null;
  const b = meeting.breakout;
  return (
    <BreakoutRoomBanner
      roomName={meeting.myRoom.name}
      endsAt={b.endsAt}
      closing={b.closing === true}
      announcement={meeting.state.announcement}
      onDismissAnnouncement={meeting.dismissAnnouncement}
      onReturnToMain={b.settings.allowReturnToMain || meeting.isOrganizer ? meeting.returnToMain : undefined}
      className={className}
    />
  );
}

/** Raise and Rooms toolbar buttons bound to the meeting. */
export function meetingToolbarItems(
  meeting: RMMeetingSource,
  opts: { roomsOpen: boolean; onToggleRooms: () => void },
): { raise: MeetingToolbarItem; rooms: MeetingToolbarItem } {
  const raised = meeting.myHandPosition !== null;
  return {
    raise: {
      id: 'raise',
      label: raised ? 'Lower' : 'Raise',
      title: raised ? `Lower your hand (${meeting.myHandPosition} in line)` : 'Raise your hand',
      icon: <MeetingHandIcon />,
      pressed: raised,
      onClick: meeting.toggleHand,
      disabled: !meeting.ready,
    },
    rooms: {
      id: 'rooms',
      label: 'Rooms',
      icon: <MeetingRoomsIcon />,
      active: opts.roomsOpen,
      onClick: opts.onToggleRooms,
      disabled: !meeting.ready,
      badge: meeting.breakout.phase === 'open' && !meeting.myRoom && meeting.breakout.mode === 'self-select' ? meeting.breakout.rooms.filter((r) => r.state === 'open').length : undefined,
    },
  };
}
