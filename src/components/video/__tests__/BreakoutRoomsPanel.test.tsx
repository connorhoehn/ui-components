import { act, render, screen, fireEvent, within } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { BreakoutRoomsPanel, type BreakoutRoomView } from '../BreakoutRoomsPanel';
import { BreakoutRoomBanner } from '../BreakoutRoomBanner';

const ROOMS: BreakoutRoomView[] = [
  { id: 'r1', name: "Mara's Room", state: 'open', members: [{ id: 'u-a', name: 'Ana', handRaised: 1 }] },
  { id: 'r2', name: "Theo's Room", state: 'open', members: [] },
  { id: 'r3', name: 'Room 1', state: 'closed', members: [] },
];

describe('BreakoutRoomsPanel — participant', () => {
  it('lists rooms with Open/Closed and Join on open rooms in self-select mode', () => {
    const onJoin = vi.fn();
    render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="self-select" onJoin={onJoin} onClose={() => {}} />);
    expect(screen.getByRole('complementary', { name: 'Breakout rooms' })).toBeInTheDocument();
    const rows = screen.getAllByTestId('breakout-room');
    expect(rows.map((r) => within(r).getByTestId('breakout-room-status').textContent)).toEqual(['Open· 1', 'Open', 'Closed']);
    expect(within(rows[2]!).queryByTestId('breakout-room-join')).toBeNull();
    fireEvent.click(within(rows[1]!).getByTestId('breakout-room-join'));
    expect(onJoin).toHaveBeenCalledWith('r2');
  });

  it('assigned mode: no Join for participants; your room offers Leave', () => {
    const onReturn = vi.fn();
    render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="assigned" myRoomId="r1" onJoin={() => {}} onReturnToMain={onReturn} />);
    expect(screen.queryByTestId('breakout-room-join')).toBeNull();
    fireEvent.click(screen.getByTestId('breakout-room-leave'));
    expect(onReturn).toHaveBeenCalled();
  });

  it('allowReturnToMain=false says "You\'re here" instead of Leave', () => {
    render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="assigned" myRoomId="r1" allowReturnToMain={false} onReturnToMain={() => {}} />);
    expect(screen.queryByTestId('breakout-room-leave')).toBeNull();
    expect(screen.getByTestId('breakout-room-here')).toBeInTheDocument();
  });

  it('the chevron shows who is in a room, with raised hands', () => {
    render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="self-select" />);
    const first = screen.getAllByTestId('breakout-room')[0]!;
    const expand = within(first).getByTestId('breakout-room-expand');
    expect(expand).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(expand);
    expect(expand).toHaveAttribute('aria-expanded', 'true');
    expect(within(first).getByTestId('breakout-member')).toHaveTextContent('Ana');
    expect(within(first).getByRole('img', { name: 'Hand raised, 1st in line' })).toBeInTheDocument();
  });

  it('an empty list says the organizer will open rooms', () => {
    render(<BreakoutRoomsPanel rooms={[]} phase="none" mode="self-select" />);
    expect(screen.getByTestId('breakout-rooms-panel-empty')).toBeInTheDocument();
  });
});

describe('BreakoutRoomsPanel — organizer', () => {
  it('creates rooms with a count and a mode', () => {
    const onCreate = vi.fn();
    render(<BreakoutRoomsPanel rooms={[]} phase="none" mode="assigned" isOrganizer onCreateRooms={onCreate} />);
    fireEvent.click(screen.getByRole('radio', { name: 'People choose' }));
    fireEvent.click(screen.getByTestId('breakout-create-submit'));
    expect(onCreate).toHaveBeenCalledWith(3, 'self-select');
  });

  it('opens all, assigns automatically, moves a person, and opens or closes one room', () => {
    const fns = { onOpenRooms: vi.fn(), onCloseRooms: vi.fn(), onAutoAssign: vi.fn(), onAssign: vi.fn(), onEnd: vi.fn(), onDeleteRooms: vi.fn() };
    const draft = ROOMS.map((r) => ({ ...r, state: 'closed' as const }));
    render(<BreakoutRoomsPanel rooms={draft} phase="draft" mode="assigned" isOrganizer unassigned={[{ id: 'u-b', name: 'Ben' }]} {...fns} />);
    fireEvent.click(screen.getByTestId('breakout-open-all'));
    expect(fns.onOpenRooms).toHaveBeenCalledWith();
    fireEvent.click(screen.getByTestId('breakout-auto-assign'));
    expect(fns.onAutoAssign).toHaveBeenCalled();
    const ben = screen.getByTestId('breakout-unassigned-person');
    fireEvent.change(within(ben).getByLabelText('Move Ben'), { target: { value: 'r2' } });
    expect(fns.onAssign).toHaveBeenCalledWith('u-b', 'r2');
    fireEvent.click(within(screen.getAllByTestId('breakout-room')[0]!).getByTestId('breakout-room-toggle'));
    expect(fns.onOpenRooms).toHaveBeenCalledWith(['r1']);
    // Draft: nothing to end, but the rooms can be deleted and created again.
    expect(screen.queryByTestId('breakout-end')).toBeNull();
    fireEvent.click(screen.getByTestId('breakout-delete'));
    expect(fns.onDeleteRooms).toHaveBeenCalled();
  });

  it('with rooms open: close all, a timer, and a broadcast that clears after sending', () => {
    const fns = { onOpenRooms: vi.fn(), onCloseRooms: vi.fn(), onSetTimer: vi.fn(), onBroadcast: vi.fn() };
    render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="assigned" isOrganizer announceIn="pane" {...fns} />);
    fireEvent.click(screen.getByTestId('breakout-close-all'));
    expect(fns.onCloseRooms).toHaveBeenCalledWith();
    expect(screen.queryByTestId('breakout-delete')).toBeNull();
    fireEvent.change(screen.getByLabelText('Breakout timer'), { target: { value: '10' } });
    expect(fns.onSetTimer).toHaveBeenCalledWith(600_000);
    const input = screen.getByLabelText('Announcement to every room');
    expect(screen.getByTestId('breakout-broadcast-send')).toBeDisabled();
    fireEvent.change(input, { target: { value: '  Two minutes left ' } });
    fireEvent.click(screen.getByTestId('breakout-broadcast-send'));
    expect(fns.onBroadcast).toHaveBeenCalledWith('Two minutes left');
    expect(input).toHaveValue('');
  });

  it('by default announcements live in the meeting chat: the pane has no composer, only a pointer', () => {
    render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="assigned" isOrganizer onBroadcast={vi.fn()} />);
    expect(screen.queryByLabelText('Announcement to every room')).toBeNull();
    expect(screen.queryByTestId('breakout-broadcast-send')).toBeNull();
    expect(screen.getByTestId('breakout-announce-hint')).toHaveTextContent('from the meeting chat');
  });

  it('while rooms are open: rename a room in place and add a room', () => {
    const fns = { onRenameRoom: vi.fn(), onAddRoom: vi.fn() };
    render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="assigned" isOrganizer {...fns} />);
    const first = screen.getAllByTestId('breakout-room')[0]!;
    fireEvent.click(within(first).getByTestId('breakout-room-name'));
    const input = within(first).getByLabelText('Room name');
    expect(input).toHaveAttribute('maxlength', '80');
    fireEvent.change(input, { target: { value: '  Design crit ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(fns.onRenameRoom).toHaveBeenCalledWith('r1', 'Design crit');
    // Escape cancels; an emptied name is refused.
    fireEvent.click(within(first).getByTestId('breakout-room-name'));
    fireEvent.change(within(first).getByLabelText('Room name'), { target: { value: 'nope' } });
    fireEvent.keyDown(within(first).getByLabelText('Room name'), { key: 'Escape' });
    fireEvent.click(within(first).getByTestId('breakout-room-name'));
    fireEvent.change(within(first).getByLabelText('Room name'), { target: { value: '  ' } });
    fireEvent.blur(within(first).getByLabelText('Room name'));
    expect(fns.onRenameRoom).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('breakout-add-room'));
    expect(fns.onAddRoom).toHaveBeenCalledTimes(1);
  });

  it('Add room is disabled at the cap; participants get plain names and no Add room', () => {
    const { rerender } = render(<BreakoutRoomsPanel rooms={ROOMS} phase="draft" mode="assigned" isOrganizer maxRooms={ROOMS.length} onAddRoom={vi.fn()} onRenameRoom={vi.fn()} />);
    expect(screen.getByTestId('breakout-add-room')).toBeDisabled();
    rerender(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="self-select" onAddRoom={vi.fn()} onRenameRoom={vi.fn()} />);
    expect(screen.queryByTestId('breakout-add-room')).toBeNull();
    expect(screen.queryByTestId('breakout-room-name')).toBeNull();
  });

  it('shows the time left on a running timer and lets it be cleared', () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2026-10-15T12:00:00Z'));
      const onSetTimer = vi.fn();
      render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="assigned" isOrganizer endsAt="2026-10-15T12:05:00Z" onSetTimer={onSetTimer} />);
      expect(screen.getByTestId('breakout-timer-left')).toHaveTextContent('05:00 left');
      act(() => { vi.advanceTimersByTime(2000); });
      expect(screen.getByTestId('breakout-timer-left')).toHaveTextContent('04:58 left');
      fireEvent.change(screen.getByLabelText('Breakout timer'), { target: { value: '' } });
      expect(onSetTimer).toHaveBeenCalledWith(null);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('BreakoutRoomsPanel — closing grace', () => {
  it('organizer: Closing in, Close now and Keep rooms open replace Close rooms and End', () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(Date.parse('2026-10-16T12:00:00Z'));
      const fns = { onOpenRooms: vi.fn(), onCloseRooms: vi.fn(), onEnd: vi.fn(), onSetTimer: vi.fn() };
      render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="self-select" isOrganizer closing endsAt="2026-10-16T12:00:30Z" {...fns} />);
      expect(screen.getByTestId('breakout-timer-left')).toHaveTextContent('Closing in 00:30');
      expect(screen.queryByTestId('breakout-close-all')).toBeNull();
      expect(screen.queryByTestId('breakout-end')).toBeNull();
      expect(screen.queryAllByTestId('breakout-room-join')).toHaveLength(0);
      fireEvent.click(screen.getByTestId('breakout-close-now'));
      expect(fns.onCloseRooms).toHaveBeenCalledWith();
      fireEvent.click(screen.getByTestId('breakout-keep-open'));
      expect(fns.onOpenRooms).toHaveBeenCalledWith();
    } finally {
      vi.useRealTimers();
    }
  });

  it('participant: Closing in, and no Join while closing', () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(Date.parse('2026-10-16T12:00:00Z'));
      render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="self-select" closing endsAt="2026-10-16T12:00:30Z" onJoin={vi.fn()} />);
      expect(screen.getByTestId('breakout-timer-left')).toHaveTextContent('Closing in 00:30');
      expect(screen.queryAllByTestId('breakout-room-join')).toHaveLength(0);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('BreakoutRoomBanner', () => {
  afterEach(() => vi.useRealTimers());

  it('counts down, marks the last minute urgent, shows and dismisses an announcement, returns', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-15T12:00:00Z'));
    const onReturn = vi.fn();
    const onDismiss = vi.fn();
    render(
      <BreakoutRoomBanner
        roomName="Room 2"
        endsAt="2026-10-15T12:01:05Z"
        announcement={{ message: 'Wrap up', fromDisplayName: 'Olive' }}
        onDismissAnnouncement={onDismiss}
        onReturnToMain={onReturn}
      />,
    );
    expect(screen.getByRole('region', { name: 'Breakout room: Room 2' })).toHaveTextContent("You're in Room 2");
    const countdown = screen.getByTestId('breakout-banner-countdown');
    expect(countdown).toHaveTextContent('01:05 left');
    expect(countdown).not.toHaveAttribute('data-urgent');
    act(() => { vi.advanceTimersByTime(6000); });
    expect(countdown).toHaveAttribute('data-urgent', 'true');
    expect(screen.getByTestId('breakout-banner-announcement')).toHaveTextContent('Olive: Wrap up');
    fireEvent.click(screen.getByTestId('breakout-banner-announcement-dismiss'));
    expect(onDismiss).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('breakout-banner-return'));
    expect(onReturn).toHaveBeenCalled();
  });

  it('closing: "Room closes in", urgent, and one polite status for screen readers', () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(Date.parse('2026-10-16T12:00:00Z'));
      const { rerender } = render(<BreakoutRoomBanner roomName="Room 1" endsAt="2026-10-16T12:05:00Z" />);
      expect(screen.getByTestId('breakout-banner-countdown')).toHaveTextContent('05:00 left');
      expect(screen.getByTestId('breakout-banner-closing-status')).toHaveTextContent('');
      rerender(<BreakoutRoomBanner roomName="Room 1" endsAt="2026-10-16T12:00:30Z" closing />);
      const countdown = screen.getByTestId('breakout-banner-countdown');
      expect(countdown).toHaveTextContent('Room closes in 00:30');
      expect(countdown).toHaveAttribute('data-urgent', 'true');
      expect(screen.getByRole('status')).toHaveTextContent('closing the breakout rooms');
    } finally {
      vi.useRealTimers();
    }
  });

  it('no timer, no return button when returning is not allowed', () => {
    render(<BreakoutRoomBanner roomName="Room 2" />);
    expect(screen.queryByTestId('breakout-banner-countdown')).toBeNull();
    expect(screen.queryByTestId('breakout-banner-return')).toBeNull();
  });

  it('counts down in server time when given clockOffsetMs (2.469.0)', () => {
    // The server runs 40 s ahead: a deadline 60 s away on this device is 20 s away for real.
    const endsAt = new Date(Date.now() + 60_000).toISOString();
    render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="assigned" isOrganizer endsAt={endsAt} clockOffsetMs={40_000} onSetTimer={vi.fn()} />);
    expect(screen.getByTestId('breakout-timer-left').textContent).toMatch(/00:(19|20)/);
    cleanup();
    render(<BreakoutRoomBanner roomName="Room 1" endsAt={endsAt} clockOffsetMs={40_000} />);
    expect(screen.getByTestId('breakout-banner')).toHaveTextContent(/00:(19|20)/);
    cleanup();
    render(<BreakoutRoomBanner roomName="Room 1" endsAt={endsAt} />);
    expect(screen.getByTestId('breakout-banner')).toHaveTextContent(/00:(59|60)|01:00/);
  });
});

describe('BreakoutRoomsPanel — every room closed (2.480.0)', () => {
  const CLOSED: BreakoutRoomView[] = [1, 2, 3].map((n) => ({
    id: `r${n}`, name: `Room ${n}`, state: 'closed' as const, members: [{ id: `u-${n}`, name: `Person ${n}` }],
  }));

  it('a participant sees one summary line, and Show rooms lists them', () => {
    render(<BreakoutRoomsPanel rooms={CLOSED} phase="draft" mode="assigned" />);
    expect(screen.getByTestId('breakout-closed-summary')).toHaveTextContent('3 rooms closed');
    expect(screen.queryAllByTestId('breakout-room')).toHaveLength(0);
    const toggle = screen.getByTestId('breakout-closed-toggle');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('breakout-delete')).toBeNull();
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveTextContent('Hide rooms');
    expect(screen.getAllByTestId('breakout-room')).toHaveLength(3);
  });

  it('the organizer\'s ended rooms fold too, with Start new rooms in place of Delete rooms', () => {
    const onDeleteRooms = vi.fn();
    const open = CLOSED.map((r) => ({ ...r, state: 'open' as const }));
    const { rerender } = render(<BreakoutRoomsPanel rooms={open} phase="open" mode="assigned" isOrganizer onDeleteRooms={onDeleteRooms} onEnd={() => {}} />);
    // Open rooms list their rows (and members behind the chevron).
    expect(screen.getAllByTestId('breakout-room')).toHaveLength(3);
    expect(screen.queryByTestId('breakout-closed-summary')).toBeNull();
    // The session ends: back to draft with every room closed.
    rerender(<BreakoutRoomsPanel rooms={CLOSED} phase="draft" mode="assigned" isOrganizer onDeleteRooms={onDeleteRooms} onEnd={() => {}} />);
    expect(screen.getByTestId('breakout-closed-summary')).toHaveTextContent('3 rooms closed');
    expect(screen.queryAllByTestId('breakout-room')).toHaveLength(0);
    const startNew = screen.getAllByTestId('breakout-delete');
    expect(startNew).toHaveLength(1);
    expect(startNew[0]).toHaveTextContent('Start new rooms');
    fireEvent.click(startNew[0]!);
    expect(onDeleteRooms).toHaveBeenCalled();
    // Unfolded, the controls' Delete rooms comes back and the summary's goes.
    fireEvent.click(screen.getByTestId('breakout-closed-toggle'));
    expect(screen.getAllByTestId('breakout-room')).toHaveLength(3);
    expect(screen.getByTestId('breakout-delete')).toHaveTextContent('Delete rooms');
  });

  it('rooms an organizer just created stay listed so people can be placed', () => {
    const { rerender } = render(<BreakoutRoomsPanel rooms={[]} phase="none" mode="assigned" isOrganizer onCreateRooms={() => {}} />);
    const fresh = CLOSED.map((r) => ({ ...r, members: [] }));
    rerender(<BreakoutRoomsPanel rooms={fresh} phase="draft" mode="assigned" isOrganizer />);
    expect(screen.getAllByTestId('breakout-room')).toHaveLength(3);
    // Placing people (auto-assign) does not fold the list mid-planning.
    rerender(<BreakoutRoomsPanel rooms={CLOSED} phase="draft" mode="assigned" isOrganizer />);
    expect(screen.getAllByTestId('breakout-room')).toHaveLength(3);
    expect(screen.getByTestId('breakout-closed-toggle')).toHaveTextContent('Hide rooms');
  });

  it('collapseClosedRooms={false} always lists the rooms', () => {
    render(<BreakoutRoomsPanel rooms={CLOSED} phase="draft" mode="assigned" collapseClosedRooms={false} />);
    expect(screen.queryByTestId('breakout-closed-summary')).toBeNull();
    expect(screen.getAllByTestId('breakout-room')).toHaveLength(3);
  });

  it('a mix of open and closed rooms is listed as before, in compact rows', () => {
    render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="self-select" />);
    expect(screen.queryByTestId('breakout-closed-summary')).toBeNull();
    expect(screen.getAllByTestId('breakout-room')).toHaveLength(3);
  });
});
