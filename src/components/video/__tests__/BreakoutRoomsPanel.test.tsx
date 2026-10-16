import { act, render, screen, fireEvent, within } from '@testing-library/react';
import { BreakoutRoomsPanel, type BreakoutRoomView } from '../BreakoutRoomsPanel';
import { BreakoutRoomBanner } from '../BreakoutRoomBanner';

const ROOMS: BreakoutRoomView[] = [
  { id: 'r1', name: "Hilla's Room", state: 'open', members: [{ id: 'u-a', name: 'Ana', handRaised: 1 }] },
  { id: 'r2', name: "Jeff's Room", state: 'open', members: [] },
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
    render(<BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="assigned" isOrganizer {...fns} />);
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

  it('no timer, no return button when returning is not allowed', () => {
    render(<BreakoutRoomBanner roomName="Room 2" />);
    expect(screen.queryByTestId('breakout-banner-countdown')).toBeNull();
    expect(screen.queryByTestId('breakout-banner-return')).toBeNull();
  });
});
