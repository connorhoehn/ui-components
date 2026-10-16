// Meeting bindings — raised hands and breakout rooms from realtime-modules'
// `useMeeting` (`@connorhoehn/realtime-modules/client/meeting`, 0.121.0+)
// onto the transport-agnostic video composites.
//
// No runtime import of realtime-modules: the hook's RESULT is the input
// (`meeting={useMeeting(lobby)}`), typed structurally below, so this module
// loads on any realtime-modules pin and a host on an older one simply never
// renders it.

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  BreakoutRoomsPanel,
  type BreakoutPerson,
  type BreakoutRoomView,
  type BreakoutRoomsPanelProps,
} from '../../components/video/BreakoutRoomsPanel';
import { BreakoutRoomBanner } from '../../components/video/BreakoutRoomBanner';
import Banner from '../../components/shared/Banner';
import { SegmentedControl } from '../../components/shared/SegmentedControl';
import { T } from '../../components/shared/Text';
import type { LocalChatMessage } from '../../components/social/ChatPanel';
import type { ChatMessage } from '../../hooks/useChat';
import { MeetingHandIcon, MeetingReactIcon, MeetingRoomsIcon } from '../../components/video/MeetingIcons';
import { ReactionPicker } from '../../components/video/ReactionOverlay';
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
  /** realtime-modules 0.129.0+: server clock minus this device's, ms. Older pins: treated as 0. */
  clockOffsetMs?: number;
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
 * Tiles (or any list keyed by the meeting's userId) with their hand position
 * set, for `HangoutGrid` / `HangoutLayout` participants. Lowered hands clear
 * `handRaised`. Since 2.468.0.
 *
 *   <HangoutGrid participants={withMeetingHands(callParticipants, meeting)} />
 */
export function withMeetingHands<P extends { id: string; handRaised?: boolean | number }>(
  participants: readonly P[],
  meeting: Pick<RMMeetingSource, 'hands'>,
): P[] {
  const handAt = meetingHandPositions(meeting.hands);
  return participants.map((p) => ({ ...p, handRaised: handAt.get(p.id) }));
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
      clockOffsetMs={meeting.clockOffsetMs}
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
      clockOffsetMs={meeting.clockOffsetMs}
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
  opts: {
    roomsOpen: boolean;
    onToggleRooms: () => void;
    /**
     * Send a reaction (e.g. `useReactions().send`). When given, the result
     * carries a React item whose popover is the reaction picker. Since 2.465.0.
     */
    onReact?: (emoji: string) => void;
    /** The picker's emoji. Default the picker's own set. */
    reactions?: string[];
  },
): { raise: MeetingToolbarItem; rooms: MeetingToolbarItem; react?: MeetingToolbarItem } {
  const raised = meeting.myHandPosition !== null;
  const onReact = opts.onReact;
  return {
    ...(onReact ? {
      react: {
        id: 'react',
        label: 'React',
        icon: <MeetingReactIcon />,
        popoverLabel: 'Send a reaction',
        popover: (close: () => void) => (
          <ReactionPicker tone="surface" emojis={opts.reactions} onReact={(emoji) => { onReact(emoji); close(); }} />
        ),
      } satisfies MeetingToolbarItem,
    } : {}),
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

// ── Meeting chat: announcements live in the chat (2.466.0) ────────────────────
//
// Teams puts the organizer's "announce to every room" in the chat, not in a
// second box in the rooms pane. `useMeetingChat` binds a ChatPanel to that:
// while rooms are open an organizer gets a "To: This chat | All rooms" switch
// in the panel's `dock`, sending with All rooms calls `meeting.broadcast`, and
// every announcement this client has seen shows in the timeline as a marked
// message, in the main chat and in each room's chat alike. Announcements are
// not chat messages on the server, so a client that joins later sees only the
// latest one (the meeting state keeps one).

export type MeetingChatTarget = 'chat' | 'rooms';

export interface MeetingChatBinding {
  /** Pass to ChatPanel `onSend`: posts to the chat, or announces to every room. */
  onSend: (content: string) => void;
  /**
   * Your chat's messages with the announcements merged in by time, each from
   * its organizer (so it sits on their side of the thread and counts):
   * `messages={chat.withAnnouncements(messages)}`. Since 2.468.0.
   */
  withAnnouncements: (messages: readonly ChatMessage[]) => ChatMessage[];
  /**
   * Pass to ChatPanel `renderMessageReferences`: marks announcements
   * "Announcement to every room". Wraps the host's own renderer if given in
   * the options. Since 2.468.0.
   */
  renderMessageReferences: (message: ChatMessage) => ReactNode;
  /**
   * @deprecated since 2.468.0: viewer-only messages are drawn as YOUR OWN,
   * so another organizer's announcement sat on your side of the thread. Use
   * `withAnnouncements` + `renderMessageReferences`; do not pass both.
   */
  localMessages: LocalChatMessage[];
  /**
   * Pass to ChatPanel `dock`: which chat this is when you are in a room, and
   * the organizer's "To" switch while rooms are open; null when neither
   * applies.
   */
  dock: ReactNode;
  /** "Room 1 chat" inside a room, "Meeting chat" otherwise. Since 2.470.0. */
  title: string;
  target: MeetingChatTarget;
  setTarget: (target: MeetingChatTarget) => void;
}

/**
 * "Room 1 chat · Only people in Room 1 see these messages." Shown above the
 * composer while you are in a room, so the thread changing under you when
 * rooms open or close is explained; announced politely when it changes.
 * Since 2.470.0.
 */
export function meetingChatTitle(meeting: Pick<RMMeetingSource, 'myRoom'>): string {
  return meeting.myRoom ? `${meeting.myRoom.name} chat` : 'Meeting chat';
}

export function MeetingChatContext({ roomName }: { roomName: string }) {
  return (
    <div className="flex items-center gap-2 border-t border-border px-3 py-1.5" role="status" aria-live="polite" data-testid="meeting-chat-context">
      <MeetingRoomsIcon size={14} aria-hidden className="shrink-0 text-text-secondary" />
      <T size="xs" weight="semibold" className="shrink-0 whitespace-nowrap">{roomName} chat</T>
      <T size="xs" tone="tertiary" className="min-w-0">Only people in {roomName} see these messages.</T>
    </div>
  );
}

/** The "To: This chat | All rooms" switch an organizer sees while rooms are open. */
export function MeetingChatTargetSwitch({ value, onChange }: { value: MeetingChatTarget; onChange: (v: MeetingChatTarget) => void }) {
  return (
    <div className="flex items-center gap-2 border-t border-border px-3 py-1.5" data-testid="meeting-chat-target">
      <T size="xs" tone="secondary">To</T>
      <SegmentedControl
        size="sm"
        aria-label="Send to"
        value={value}
        onChange={(v) => onChange(v === 'rooms' ? 'rooms' : 'chat')}
        options={[{ value: 'chat', label: 'This chat' }, { value: 'rooms', label: 'All rooms' }]}
      />
      {value === 'rooms' && <T size="xs" tone="tertiary">Every room sees this as an announcement.</T>}
    </div>
  );
}

const ANNOUNCEMENT_ID = 'meeting-announcement:';

export function useMeetingChat(
  meeting: RMMeetingSource,
  opts: {
    send: (content: string) => void;
    announcementNote?: string;
    /** The host's own ChatPanel `renderMessageReferences`, kept for other messages. */
    renderMessageReferences?: (message: ChatMessage) => ReactNode;
  },
): MeetingChatBinding {
  const [target, setTarget] = useState<MeetingChatTarget>('chat');
  const [seen, setSeen] = useState<Array<NonNullable<RMBreakoutState['announcement']>>>([]);
  const latest = meeting.breakout.announcement;
  const key = latest ? `${latest.at}|${latest.fromUserId}` : null;
  useEffect(() => {
    if (!latest || !key) return;
    setSeen((list) => (list.some((a) => `${a.at}|${a.fromUserId}` === key) ? list : [...list, latest].slice(-50)));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on the announcement's identity
  }, [key]);
  const canAnnounce = meeting.ready && meeting.isOrganizer && meeting.breakout.phase === 'open';
  const effective: MeetingChatTarget = canAnnounce ? target : 'chat';
  const note = opts.announcementNote ?? 'Announcement to every room';
  const announcementMessages = useMemo<ChatMessage[]>(() => seen.map((a) => ({
    id: `${ANNOUNCEMENT_ID}${a.at}:${a.fromUserId}`,
    clientId: 'meeting',
    userId: a.fromUserId,
    displayName: a.fromDisplayName,
    content: a.message,
    timestamp: a.at,
  })), [seen]);
  const hostRefs = opts.renderMessageReferences;
  const localMessages = useMemo<LocalChatMessage[]>(() => seen.map((a) => ({
    id: `${ANNOUNCEMENT_ID}${a.at}:${a.fromUserId}`,
    timestamp: a.at,
    displayName: a.fromDisplayName,
    content: a.message,
    metadata: { kind: 'meeting-announcement', fromUserId: a.fromUserId },
    note,
  })), [seen, note]);
  const { send } = opts;
  return {
    target: effective,
    setTarget,
    localMessages,
    withAnnouncements: (messages) => (announcementMessages.length === 0
      ? [...messages]
      : [...messages, ...announcementMessages].sort((x, y) => Date.parse(x.timestamp) - Date.parse(y.timestamp))),
    renderMessageReferences: (message) => (message.id?.startsWith(ANNOUNCEMENT_ID)
      ? <T as="p" size="xs" tone="tertiary" data-testid="meeting-chat-announcement-note">{note}</T>
      : hostRefs?.(message) ?? null),
    title: meetingChatTitle(meeting),
    dock: meeting.myRoom || canAnnounce
      ? (
        <>
          {meeting.myRoom && <MeetingChatContext roomName={meeting.myRoom.name} />}
          {canAnnounce && <MeetingChatTargetSwitch value={effective} onChange={setTarget} />}
        </>
      )
      : null,
    onSend: (content: string) => {
      const text = content.trim();
      if (!text) return;
      if (effective === 'rooms') {
        meeting.broadcast(text.slice(0, 500));
        setTarget('chat'); // one announcement at a time; the next message is chat again
        return;
      }
      send(content);
    },
  };
}
