// The meeting bindings against the REAL realtime-modules 0.121 service and
// reducer: MeetingService runs in-process behind a fake router, each "client"
// folds frames with the library's own meetingReducer, and the wrapped panels
// render from that. So a click in the Rooms pane travels the real wire
// contract and comes back as rendered state — no imitation of the server.
// (useMeeting itself is not called here: realtime-modules carries its own
// React copy in this workspace; its hook is tested in that repo, and the
// type test below pins that its result fits RMMeetingSource.)

import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { useMemo, useReducer, useEffect, useState } from 'react';
import { MeetingService } from '@connorhoehn/realtime-modules/meeting';
import { INITIAL_MEETING_STATE, meetingReducer, handPosition, breakoutRoomFor } from '@connorhoehn/realtime-modules/client/meeting';
import type { UseMeetingResult } from '@connorhoehn/realtime-modules/client/meeting';
import {
  WrappedBreakoutRoomsPanel,
  WrappedBreakoutRoomBanner,
  adaptBreakoutRooms,
  meetingHandPositions,
  meetingRosterProps,
  meetingToolbarItems,
  useMeetingChat,
  type RMMeetingSource,
} from '../meeting';
import { RosterPanel } from '../../../components/video/RosterPanel';
import { MeetingToolbar } from '../../../components/video/MeetingToolbar';
import { ChatPanel } from '../../../components/social/ChatPanel';

// Compile-time: the hook's result is a valid source.
const _fits = (m: UseMeetingResult): RMMeetingSource => m;
void _fits;

const M = 'room:lounge';
const PEOPLE = [
  { userId: 'u-org', displayName: 'Olive Organizer' },
  { userId: 'u-a', displayName: 'Ana' },
  { userId: 'u-b', displayName: 'Ben' },
];

function world(config: ConstructorParameters<typeof MeetingService>[0]['config'] = {}) {
  const users = new Map<string, string>();
  const subs = new Map<string, Set<string>>();
  const listeners = new Map<string, (f: any) => void>();
  const deliver = (clientId: string, frame: unknown) => { act(() => { listeners.get(clientId)?.(frame); }); };
  const svc = new MeetingService({
    router: {
      sendToClient: (c, m) => { deliver(c, m); },
      sendToChannel: (ch, m) => { for (const [c, s] of subs) if (s.has(ch)) deliver(c, m); },
      subscribeToChannel: (c, ch) => { const s = subs.get(c) ?? new Set<string>(); s.add(ch); subs.set(c, s); return true; },
      unsubscribeFromChannel: (c, ch) => { subs.get(c)?.delete(ch); },
      getUserIdForClient: (c) => users.get(c),
      getClientData: (c) => ({ userContext: { userId: users.get(c), displayName: PEOPLE.find((p) => p.userId === users.get(c))?.displayName } }),
    },
    config,
  });
  return { svc, users, listeners };
}

function useTestMeeting(w: ReturnType<typeof world>, clientId: string, userId: string): RMMeetingSource {
  const [state, dispatch] = useReducer(meetingReducer, INITIAL_MEETING_STATE);
  useEffect(() => {
    w.users.set(clientId, userId);
    w.listeners.set(clientId, (frame) => dispatch({ kind: 'frame', frame }));
    dispatch({ kind: 'reset', meetingId: M });
    void w.svc.handleAction(clientId, 'subscribe', { meetingId: M });
  }, [w, clientId, userId]);
  return useMemo(() => {
    const act_ = (action: string, extra: Record<string, unknown> = {}) => { void w.svc.handleAction(clientId, action, { meetingId: M, ...extra }); };
    const self = state.you.userId;
    const myRoomId = breakoutRoomFor(state.breakout, self);
    return {
      ready: state.ready,
      isOrganizer: state.you.organizer,
      hands: state.hands,
      myHandPosition: handPosition(state.hands, self),
      toggleHand: () => act_(handPosition(state.hands, self) ? 'hand.lower' : 'hand.raise'),
      lowerHand: (u?: string) => act_('hand.lower', u ? { userId: u } : {}),
      lowerAllHands: () => act_('hand.lowerAll'),
      breakout: state.breakout,
      myRoom: myRoomId ? state.breakout.rooms.find((r) => r.id === myRoomId) ?? null : null,
      state,
      error: state.error,
      configureBreakouts: (rooms, o = {}) => act_('breakout.configure', { rooms, ...o }),
      addRoom: (o = {}) => act_('breakout.addRoom', o),
      renameRoom: (roomId, name) => act_('breakout.rename', { roomId, name }),
      assign: (assignments) => act_('breakout.assign', { assignments }),
      autoAssign: (userIds) => act_('breakout.autoAssign', { userIds }),
      openRooms: (roomIds) => act_('breakout.open', roomIds ? { roomIds } : {}),
      closeRooms: (roomIds) => act_('breakout.close', roomIds ? { roomIds } : {}),
      setTimer: (durationMs) => act_('breakout.timer', { durationMs }),
      broadcast: (message) => act_('breakout.broadcast', { message }),
      joinRoom: (roomId) => act_('breakout.join', { roomId }),
      returnToMain: () => act_('breakout.leave'),
      endBreakouts: () => act_('breakout.end'),
      dismissAnnouncement: () => dispatch({ kind: 'dismissAnnouncement' }),
    };
  }, [state, w, clientId]);
}

function Seat({ w, clientId, userId }: { w: ReturnType<typeof world>; clientId: string; userId: string }) {
  const meeting = useTestMeeting(w, clientId, userId);
  const items = meetingToolbarItems(meeting, { roomsOpen: true, onToggleRooms: () => {} });
  const [posted, setPosted] = useState<string[]>([]);
  const chat = useMeetingChat(meeting, { send: (c) => setPosted((p) => [...p, c]) });
  return (
    <section data-testid={`seat-${userId}`}>
      <button type="button" data-testid={`raise-${userId}`} aria-pressed={items.raise.pressed} onClick={items.raise.onClick}>{items.raise.label}</button>
      <div data-testid={`chat-${userId}`} data-posted={posted.join('|')}>
        <ChatPanel messages={chat.withAnnouncements([])} onSend={chat.onSend} renderMessageReferences={chat.renderMessageReferences} dock={chat.dock} />
      </div>
      <WrappedBreakoutRoomBanner meeting={meeting} />
      <WrappedBreakoutRoomsPanel meeting={meeting} people={PEOPLE} data-testid={`panel-${userId}`} />
    </section>
  );
}

async function flush() {
  for (let i = 0; i < 20; i++) await act(async () => { await Promise.resolve(); });
}

describe('meeting bindings over the real service', () => {
  it('organizer creates and assigns rooms; the participant follows into theirs and back', async () => {
    const w = world();
    render(<><Seat w={w} clientId="c-org" userId="u-org" /><Seat w={w} clientId="c-a" userId="u-a" /><Seat w={w} clientId="c-b" userId="u-b" /></>);
    await flush();
    const org = screen.getByTestId('seat-u-org');
    const ana = screen.getByTestId('seat-u-a');

    // Organizer view has the create form; a participant only sees the empty state.
    expect(within(org).getByTestId('breakout-create')).toBeInTheDocument();
    expect(within(ana).getByTestId('panel-u-a-empty')).toBeInTheDocument();

    fireEvent.change(within(org).getByLabelText('Number of rooms'), { target: { value: '2' } });
    fireEvent.click(within(org).getByTestId('breakout-create-submit'));
    await flush();
    expect(within(ana).getAllByTestId('breakout-room').map((r) => r.getAttribute('data-room-state'))).toEqual(['closed', 'closed']);

    // Place Ana in Room 2 by hand, then open everything.
    const anaRow = within(org).getAllByTestId('breakout-unassigned-person').find((r) => r.getAttribute('data-user-id') === 'u-a')!;
    const room2 = within(org).getAllByTestId('breakout-room')[1]!.getAttribute('data-room-id')!;
    fireEvent.change(within(anaRow).getByLabelText('Move Ana'), { target: { value: room2 } });
    await flush();
    fireEvent.click(within(org).getByTestId('breakout-open-all'));
    await flush();

    expect(within(ana).getByRole('region', { name: 'Breakout room: Room 2' })).toBeInTheDocument();
    expect(within(ana).getAllByTestId('breakout-room')[1]).toHaveAttribute('data-mine', 'true');

    // The organizer announces from the meeting chat ("To: All rooms"); it
    // reaches the room banner and shows in the participant's chat, marked.
    expect(within(ana).queryByTestId('meeting-chat-target')).toBeNull();
    const orgChat = within(org).getByTestId('chat-u-org');
    fireEvent.click(within(within(orgChat).getByTestId('meeting-chat-target')).getByText('All rooms'));
    fireEvent.change(within(orgChat).getByPlaceholderText('Type a message...'), { target: { value: 'Five minutes left' } });
    fireEvent.keyDown(within(orgChat).getByPlaceholderText('Type a message...'), { key: 'Enter' });
    await flush();
    expect(orgChat.getAttribute('data-posted')).toBe(''); // not an ordinary chat message
    expect(within(ana).getByTestId('breakout-banner-announcement')).toHaveTextContent('Olive Organizer: Five minutes left');
    const anaChat = within(ana).getByTestId('chat-u-a');
    expect(anaChat).toHaveTextContent('Five minutes left');
    expect(anaChat).toHaveTextContent('Announcement to every room');
    // Merged as Olive's message (her side of the thread, counted), not a local one.
    expect(within(anaChat).getByTestId('chat-message')).toHaveTextContent('Olive Organizer');
    expect(within(anaChat).getByTestId('meeting-chat-announcement-note')).toBeInTheDocument();
    // The switch went back to This chat: the next message is ordinary chat.
    fireEvent.change(within(orgChat).getByPlaceholderText('Type a message...'), { target: { value: 'thanks all' } });
    fireEvent.keyDown(within(orgChat).getByPlaceholderText('Type a message...'), { key: 'Enter' });
    expect(orgChat.getAttribute('data-posted')).toBe('thanks all');

    // Ana returns to the main meeting; the banner goes away.
    fireEvent.click(within(ana).getByTestId('breakout-banner-return'));
    await flush();
    expect(within(ana).queryByTestId('breakout-banner')).toBeNull();

    // The organizer ends the session; every room closes for everyone.
    expect(within(ana).queryByTestId('breakout-end')).toBeNull();
    fireEvent.click(within(org).getByTestId('breakout-end'));
    await flush();
    expect(within(ana).getAllByTestId('breakout-room').every((r) => r.getAttribute('data-room-state') === 'closed')).toBe(true);

    // Back in draft the organizer can delete the rooms and start over.
    fireEvent.click(within(org).getByTestId('breakout-delete'));
    await flush();
    expect(within(org).getByTestId('breakout-create')).toBeInTheDocument();
    expect(within(ana).getByTestId('panel-u-a-empty')).toBeInTheDocument();
    w.svc.dispose();
  });

  it('while rooms are open the organizer renames one and adds another; everyone sees it', async () => {
    const w = world();
    render(<><Seat w={w} clientId="c-org" userId="u-org" /><Seat w={w} clientId="c-a" userId="u-a" /></>);
    await flush();
    const org = screen.getByTestId('seat-u-org');
    const ana = screen.getByTestId('seat-u-a');
    fireEvent.change(within(org).getByLabelText('Number of rooms'), { target: { value: '1' } });
    fireEvent.click(within(org).getByTestId('breakout-create-submit'));
    await flush();
    fireEvent.click(within(org).getByTestId('breakout-open-all'));
    await flush();

    fireEvent.click(within(org).getByTestId('breakout-room-name'));
    fireEvent.change(within(org).getByLabelText('Room name'), { target: { value: 'Design crit' } });
    fireEvent.keyDown(within(org).getByLabelText('Room name'), { key: 'Enter' });
    await flush();
    fireEvent.click(within(org).getByTestId('breakout-add-room'));
    await flush();

    const rows = within(ana).getAllByTestId('breakout-room');
    expect(rows.map((r) => r.textContent)).toEqual([expect.stringContaining('Design crit'), expect.stringContaining('Room 2')]);
    expect(rows.map((r) => r.getAttribute('data-room-state'))).toEqual(['open', 'closed']);
    // A participant reads names; they cannot edit them.
    expect(within(ana).queryByTestId('breakout-room-name')).toBeNull();
    w.svc.dispose();
  });

  it('a source without addRoom/renameRoom (realtime-modules < 0.123) renders read-only names and no Add room', () => {
    const source = {
      ready: true, isOrganizer: true, hands: [], myHandPosition: null,
      toggleHand() {}, lowerHand() {}, lowerAllHands() {},
      breakout: { phase: 'open', mode: 'assigned', rooms: [{ id: 'r1', name: 'Room 1', state: 'open', members: [] }], returned: [], endsAt: null, announcement: null, settings: { allowReturnToMain: true } },
      myRoom: null, state: { announcement: null }, error: null,
      configureBreakouts() {}, assign() {}, autoAssign() {}, openRooms() {}, closeRooms() {}, setTimer() {}, broadcast() {},
      joinRoom() {}, returnToMain() {}, endBreakouts() {}, dismissAnnouncement() {},
    } satisfies RMMeetingSource;
    render(<WrappedBreakoutRoomsPanel meeting={source} people={PEOPLE} />);
    expect(screen.queryByTestId('breakout-add-room')).toBeNull();
    expect(screen.queryByTestId('breakout-room-name')).toBeNull();
    expect(screen.getByText('Room 1')).toBeInTheDocument();
  });

  it('People queue: hands sort to the top in order; only the organizer can lower one or all', async () => {
    const w = world();
    const roster = PEOPLE.map((p) => ({ id: p.userId, displayName: p.displayName }));
    function People({ clientId, userId }: { clientId: string; userId: string }) {
      const meeting = useTestMeeting(w, clientId, userId);
      const items = meetingToolbarItems(meeting, { roomsOpen: false, onToggleRooms: () => {} });
      return (
        <section data-testid={`people-${userId}`}>
          <button type="button" data-testid={`raise-${userId}`} onClick={items.raise.onClick}>{items.raise.label}</button>
          <RosterPanel {...meetingRosterProps(meeting, roster)} />
        </section>
      );
    }
    render(<><People clientId="c-org" userId="u-org" /><People clientId="c-a" userId="u-a" /><People clientId="c-b" userId="u-b" /></>);
    await flush();
    fireEvent.click(screen.getByTestId('raise-u-b'));
    await flush();
    fireEvent.click(screen.getByTestId('raise-u-a'));
    await flush();
    const org = screen.getByTestId('people-u-org');
    const ana = screen.getByTestId('people-u-a');
    expect(within(ana).getAllByTestId('roster-row').map((r) => r.getAttribute('data-user-id'))).toEqual(['u-b', 'u-a', 'u-org']);
    expect(within(ana).queryByTestId('roster-lower-hand')).toBeNull();
    expect(within(ana).queryByTestId('roster-lower-all')).toBeNull();

    fireEvent.click(within(org).getByRole('button', { name: "Lower Ben's hand" }));
    await flush();
    expect(within(ana).getAllByTestId('roster-row').map((r) => r.getAttribute('data-user-id'))).toEqual(['u-a', 'u-org', 'u-b']);
    fireEvent.click(within(org).getByTestId('roster-lower-all'));
    await flush();
    expect(within(ana).queryAllByTestId('roster-raised-hand')).toHaveLength(0);
    expect(within(org).queryByTestId('roster-lower-all')).toBeNull();
    w.svc.dispose();
  });

  it('closing grace: Close rooms counts down in the pane and banner; Close now ends it at once', async () => {
    const w = world({ closingGraceMs: 30_000 });
    render(<><Seat w={w} clientId="c-org" userId="u-org" /><Seat w={w} clientId="c-a" userId="u-a" /></>);
    await flush();
    const org = screen.getByTestId('seat-u-org');
    const ana = screen.getByTestId('seat-u-a');
    fireEvent.change(within(org).getByLabelText('Number of rooms'), { target: { value: '1' } });
    fireEvent.click(within(org).getByTestId('breakout-create-submit'));
    await flush();
    const room = within(org).getAllByTestId('breakout-room')[0]!.getAttribute('data-room-id')!;
    fireEvent.change(within(org).getByLabelText('Move Ana'), { target: { value: room } });
    await flush();
    fireEvent.click(within(org).getByTestId('breakout-open-all'));
    await flush();
    expect(within(ana).getByTestId('breakout-banner')).toBeInTheDocument();

    fireEvent.click(within(org).getByTestId('breakout-close-all'));
    await flush();
    expect(within(ana).getByTestId('breakout-banner-countdown')).toHaveTextContent(/Room closes in 00:(30|29)/);
    expect(within(org).getByTestId('breakout-timer-left')).toHaveTextContent(/Closing in/);

    fireEvent.click(within(org).getByTestId('breakout-close-now'));
    await flush();
    expect(within(ana).queryByTestId('breakout-banner')).toBeNull();
    expect(within(org).getByTestId('breakout-open-all')).toBeInTheDocument();
    w.svc.dispose();
  });

  it('raised hands flow to the Raise button and to the rooms member list', async () => {
    const w = world();
    render(<><Seat w={w} clientId="c-org" userId="u-org" /><Seat w={w} clientId="c-a" userId="u-a" /></>);
    await flush();
    fireEvent.click(screen.getByTestId('raise-u-a'));
    await flush();
    expect(screen.getByTestId('raise-u-a')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('raise-u-a')).toHaveTextContent('Lower');
    expect(screen.getByTestId('raise-u-org')).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(screen.getByTestId('raise-u-a'));
    await flush();
    expect(screen.getByTestId('raise-u-a')).toHaveAttribute('aria-pressed', 'false');
    w.svc.dispose();
  });
});

describe('meeting adapters', () => {
  it('adaptBreakoutRooms resolves names, hands, and the unassigned list', () => {
    const hands = [{ userId: 'u-b', displayName: 'Ben', raisedAt: '' }];
    const { rooms, unassigned } = adaptBreakoutRooms(
      { phase: 'open', mode: 'assigned', rooms: [{ id: 'r1', name: 'R1', state: 'open', members: ['u-a', 'ghost'] }], returned: [], endsAt: null, announcement: null, settings: { allowReturnToMain: true } },
      PEOPLE,
      hands,
    );
    expect(rooms[0]!.members).toEqual([{ id: 'u-a', name: 'Ana', avatarUrl: undefined, handRaised: undefined }, { id: 'ghost', name: 'ghost', avatarUrl: undefined, handRaised: undefined }]);
    expect(unassigned.map((p) => [p.id, p.handRaised])).toEqual([['u-org', undefined], ['u-b', 1]]);
    expect(meetingHandPositions(hands).get('u-b')).toBe(1);
  });

  it('meetingToolbarItems: React appears only with onReact, and its picker sends then closes', () => {
    const source = {
      ready: true, isOrganizer: false, hands: [], myHandPosition: null,
      toggleHand() {}, lowerHand() {}, lowerAllHands() {},
      breakout: { phase: 'none', mode: 'assigned', rooms: [], returned: [], endsAt: null, announcement: null, settings: { allowReturnToMain: true } },
      myRoom: null, state: { announcement: null }, error: null,
      configureBreakouts() {}, assign() {}, autoAssign() {}, openRooms() {}, closeRooms() {}, setTimer() {}, broadcast() {},
      joinRoom() {}, returnToMain() {}, endBreakouts() {}, dismissAnnouncement() {},
    } satisfies RMMeetingSource;
    expect(meetingToolbarItems(source, { roomsOpen: false, onToggleRooms: () => {} }).react).toBeUndefined();
    const sent: string[] = [];
    const items = meetingToolbarItems(source, { roomsOpen: false, onToggleRooms: () => {}, onReact: (e) => sent.push(e), reactions: ['👍', '🎉'] });
    render(<MeetingToolbar items={[items.raise, items.react!, items.rooms]} onLeave={() => {}} compact={false} />);
    fireEvent.click(screen.getByTestId('meeting-toolbar-react'));
    const panel = screen.getByRole('dialog', { name: 'Send a reaction' });
    expect(within(panel).getByTestId('reaction-picker')).toHaveAttribute('data-tone', 'surface');
    expect(within(panel).getAllByRole('button')).toHaveLength(2);
    fireEvent.click(within(panel).getByRole('button', { name: 'React with party' }));
    expect(sent).toEqual(['🎉']);
    expect(screen.queryByRole('dialog', { name: 'Send a reaction' })).toBeNull();
  });
});
