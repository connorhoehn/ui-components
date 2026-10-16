// Goal G11: the whole meeting screen from the public bindings over the REAL
// MeetingService (realtime-modules createMeetingLoopback), so
// a runtime mismatch between UseMeetingResult and the bindings fails here,
// not in an app. The flow is the reference picture's: hands, rooms, the
// announcement through the chat, and everyone back.

import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';


import { createMeetingLoopback } from '@connorhoehn/realtime-modules/meeting';
import { useEffect, useMemo, useReducer } from 'react';
import {
  INITIAL_MEETING_STATE, activeMeetingChat, breakoutRoomFor, handPosition, meetingReducer,
} from '@connorhoehn/realtime-modules/client/meeting';
import {
  REHEARSAL_MEETING, RehearsalSeat, createRehearsalChat, type RehearsalMeeting, type RehearsalMeetingHook,
} from '../../../components/video/MeetingRehearsal.kit';

// The seat's hook under vitest: realtime-modules' reducer over the loopback
// socket, sending the same frames useMeeting sends. (The CommonJS dist would
// load its own React here; realtime-modules tests the real hook over the same
// loopback, and the Storybook story runs it.)
const useLoopbackMeeting: RehearsalMeetingHook = (meetingId, { socket }) => {
  const [state, dispatch] = useReducer(meetingReducer, INITIAL_MEETING_STATE);
  useEffect(() => {
    const off = socket.onMessage((frame) => act(() => dispatch({ kind: 'frame', frame } as never)));
    dispatch({ kind: 'reset', meetingId } as never);
    socket.send({ service: 'meeting', action: 'subscribe', meetingId });
    return off;
  }, [socket, meetingId]);
  return useMemo<RehearsalMeeting>(() => {
    const send = (action: string, extra: Record<string, unknown> = {}) => socket.send({ service: 'meeting', action, meetingId, ...extra });
    const self = state.you.userId;
    const myRoomId = breakoutRoomFor(state.breakout, self);
    return {
      ready: state.ready, isOrganizer: state.you.organizer, hands: state.hands, myHandPosition: handPosition(state.hands, self),
      toggleHand: () => send(handPosition(state.hands, self) ? 'hand.lower' : 'hand.raise'),
      lowerHand: (u?: string) => send('hand.lower', u ? { userId: u } : {}),
      lowerAllHands: () => send('hand.lowerAll'),
      breakout: state.breakout,
      myRoom: myRoomId ? state.breakout.rooms.find((r) => r.id === myRoomId) ?? null : null,
      state, error: state.error,
      configureBreakouts: (rooms, o = {}) => send('breakout.configure', { rooms, ...o }),
      addRoom: (o = {}) => send('breakout.addRoom', o),
      renameRoom: (roomId, name) => send('breakout.rename', { roomId, name }),
      assign: (assignments) => send('breakout.assign', { assignments }),
      autoAssign: (userIds) => send('breakout.autoAssign', { userIds }),
      openRooms: (roomIds) => send('breakout.open', roomIds ? { roomIds } : {}),
      closeRooms: (roomIds?: string[]) => send('breakout.close', roomIds ? { roomIds } : {}),
      setTimer: (durationMs) => send('breakout.timer', { durationMs }),
      broadcast: (message) => send('breakout.broadcast', { message }),
      joinRoom: (roomId) => send('breakout.join', { roomId }),
      returnToMain: () => send('breakout.leave'),
      endBreakouts: () => send('breakout.end'),
      dismissAnnouncement: () => dispatch({ kind: 'dismissAnnouncement' } as never),
      activeChat: activeMeetingChat(meetingId, state.breakout, self),
    };
  }, [state, socket, meetingId]);
};

const PEOPLE = [
  { userId: 'u-rowan', displayName: 'Rowan Ellery' },
  { userId: 'u-ada', displayName: 'Ada Lindqvist' },
  { userId: 'u-bram', displayName: 'Bram Okonjo' },
];

describe('meeting wiring rehearsal (real service, public bindings only)', () => {
  it('hands, rooms, a chat announcement and the return, seen from three seats', async () => {
    const loop = createMeetingLoopback();
    const chat = createRehearsalChat();
    render(<>{PEOPLE.map((p) => <RehearsalSeat key={p.userId} loop={loop} chat={chat} person={p} people={PEOPLE} useMeetingHook={useLoopbackMeeting} />)}</>);
    const rowan = screen.getByTestId('seat-u-rowan');
    const ada = screen.getByTestId('seat-u-ada');
    const bram = screen.getByTestId('seat-u-bram');
    await waitFor(() => expect(within(rowan).getByText(/organizer/)).toBeInTheDocument());
    await waitFor(() => expect(within(bram).getByTestId('meeting-toolbar-raise')).not.toBeDisabled());

    // Bram then Ada raise; Rowan's People pane lists them in order with Lower.
    fireEvent.click(within(bram).getByTestId('meeting-toolbar-raise'));
    await waitFor(() => expect(within(bram).getByTestId('meeting-toolbar-raise')).toHaveAttribute('aria-pressed', 'true'));
    fireEvent.click(within(ada).getByTestId('meeting-toolbar-raise'));
    fireEvent.click(within(rowan).getByTestId('meeting-toolbar-people'));
    await waitFor(() => expect(within(rowan).getAllByTestId('roster-row').map((r) => r.getAttribute('data-user-id')).slice(0, 2)).toEqual(['u-bram', 'u-ada']));
    expect(within(rowan).getAllByTestId('roster-lower-hand')).toHaveLength(2);
    expect(within(ada).queryByTestId('roster-lower-hand')).toBeNull();

    // Rowan creates two rooms, auto-assigns and opens them.
    fireEvent.click(within(rowan).getByTestId('meeting-toolbar-rooms'));
    fireEvent.change(within(rowan).getByLabelText(/number of rooms/i), { target: { value: '2' } });
    fireEvent.click(within(rowan).getByTestId('breakout-create-submit'));
    await waitFor(() => expect(within(rowan).getAllByTestId('breakout-room')).toHaveLength(2));
    fireEvent.click(within(rowan).getByTestId('breakout-auto-assign'));
    // Everyone but the organizer is placed; Rowan stays in the main meeting.
    await waitFor(() => expect(within(rowan).queryAllByTestId('breakout-unassigned-person').map((r) => r.getAttribute('data-user-id'))).toEqual(['u-rowan']));
    fireEvent.click(within(rowan).getByTestId('breakout-open-all'));
    await waitFor(() => expect(within(ada).getByTestId('breakout-banner')).toBeInTheDocument());
    await waitFor(() => expect(within(bram).getByTestId('breakout-banner')).toBeInTheDocument());

    // Rowan announces from the chat; Ada sees it in her room's chat.
    fireEvent.click(within(rowan).getByTestId('meeting-toolbar-chat'));
    fireEvent.click(within(within(rowan).getByTestId('meeting-chat-target')).getByText('All rooms'));
    const input = within(rowan).getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'Five minutes left' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(within(ada).getByTestId('breakout-banner-announcement')).toHaveTextContent('Five minutes left'));
    fireEvent.click(within(ada).getByTestId('meeting-toolbar-chat'));
    await waitFor(() => expect(within(ada).getByTestId('seat-u-ada-pane')).toHaveTextContent('Announcement to every room'));
    // Which chat: Ada is told she is in her room's chat; Rowan, in the main meeting, is not.
    expect(within(ada).getByTestId('meeting-chat-context')).toHaveTextContent(/Room \d chat/);
    expect(within(ada).getByTestId('meeting-chat-context')).toHaveAttribute('aria-live', 'polite');
    expect(within(rowan).queryByTestId('meeting-chat-context')).toBeNull();

    // Ada chats in her room; Rowan (main meeting) does not see it.
    const adaInput = within(ada).getByPlaceholderText('Type a message...');
    fireEvent.change(adaInput, { target: { value: 'we pick idea two' } });
    fireEvent.keyDown(adaInput, { key: 'Enter' });
    await waitFor(() => expect(within(ada).getByTestId('seat-u-ada-pane')).toHaveTextContent('we pick idea two'));
    expect(within(rowan).getByTestId('seat-u-rowan-pane')).not.toHaveTextContent('we pick idea two');

    // Rowan ends the session (twice if a grace applies); everyone is back.
    fireEvent.click(within(rowan).getByTestId('meeting-toolbar-rooms'));
    fireEvent.click(within(rowan).getByTestId('breakout-end'));
    await waitFor(() => expect(within(ada).queryByTestId('breakout-banner')).toBeNull());
    await waitFor(() => expect(within(bram).queryByTestId('breakout-banner')).toBeNull());
    // Back in the main meeting the room-chat line goes away.
    await waitFor(() => expect(within(ada).queryByTestId('meeting-chat-context')).toBeNull());
    act(() => loop.dispose());
  });
});
