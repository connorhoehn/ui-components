// RoomList decides between four mutually exclusive bodies — loading, error,
// empty, list — and the guard on each is "…and rooms.length === 0", so a
// transient error during a background refresh must NOT blow away rooms the
// user is already looking at. It also renders two entirely different layouts
// (compact sidebar vs. full card) from one `compact` flag, and gates the DM
// form on the follow graph: with no mutual friends the picker must stay
// unusable rather than submitting an empty peer id.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UseFriendsReturn, PublicProfile } from '../../../hooks/useFriends';
import type { RoomItem } from '../../../hooks/useRooms';

const useFriendsMock = vi.fn<() => UseFriendsReturn>();
vi.mock('../../../hooks/useFriends', () => ({ useFriends: () => useFriendsMock() }));

import { RoomList } from '../RoomList';

function friend(userId: string, displayName: string): PublicProfile {
  return { userId, displayName, visibility: 'public' };
}

function makeFriends(friends: PublicProfile[] = []): UseFriendsReturn {
  return {
    followers: [],
    following: [],
    friends,
    follow: vi.fn().mockResolvedValue(undefined),
    unfollow: vi.fn().mockResolvedValue(undefined),
    loading: false,
    error: null,
    loadError: null,
  };
}

function room(over: Partial<RoomItem> = {}): RoomItem {
  return {
    roomId: 'r1',
    name: 'general',
    type: 'standalone',
    createdAt: new Date().toISOString(),
    ...over,
  } as RoomItem;
}

type Props = Parameters<typeof RoomList>[0];

function renderList(over: Partial<Props> = {}) {
  const props: Props = {
    idToken: 'tok',
    rooms: [],
    createRoom: vi.fn().mockResolvedValue(undefined),
    createDM: vi.fn().mockResolvedValue(undefined),
    loading: false,
    onRoomSelect: vi.fn(),
    ...over,
  };
  render(<RoomList {...props} />);
  return props;
}

beforeEach(() => {
  useFriendsMock.mockReset();
  useFriendsMock.mockReturnValue(makeFriends());
});

describe('RoomList body selection', () => {
  it('shows the spinner only while loading with no cached rooms', () => {
    renderList({ loading: true });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('keeps showing rooms when a refresh is in flight', () => {
    renderList({ loading: true, rooms: [room({ name: 'general' })] });
    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.getByText('general')).toBeInTheDocument();
  });

  it('renders the error state with a retry when there is nothing to fall back on', () => {
    const onRetry = vi.fn();
    renderList({ error: 'network down', onRetry });
    expect(screen.getByRole('alert')).toHaveTextContent('network down');
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('omits the Retry button when the host supplies no onRetry', () => {
    renderList({ error: 'network down' });
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull();
  });

  it('a background error never replaces rooms already on screen', () => {
    renderList({ error: 'network down', rooms: [room({ name: 'general' })] });
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByText('general')).toBeInTheDocument();
  });

  it('falls through to the empty state with neither error nor rooms', () => {
    renderList();
    expect(screen.getByText('No rooms yet')).toBeInTheDocument();
  });
});

describe('RoomList compact layout', () => {
  it('swaps the card heading for the sidebar affordances', () => {
    renderList({ compact: true, rooms: [room({ name: 'general' })] });
    expect(screen.queryByRole('heading', { name: 'Rooms' })).toBeNull();
    expect(screen.getByRole('button', { name: '+ New Room' })).toBeInTheDocument();
  });

  it('uses the terse empty and error copy in compact mode', () => {
    renderList({ compact: true });
    expect(screen.getByText('No rooms yet')).toBeInTheDocument();
    // The full-card variant adds a second explanatory line; compact does not.
    expect(screen.queryByText('Create a room or ask to be added.')).toBeNull();
  });
});

describe('RoomList room creation', () => {
  it('the create form is hidden until the toggle is pressed', () => {
    renderList();
    expect(screen.queryByPlaceholderText('Room name')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Create Room' }));
    expect(screen.getByPlaceholderText('Room name')).toBeInTheDocument();
  });

  it('trims the name and collapses the form on success', async () => {
    const props = renderList();
    fireEvent.click(screen.getByRole('button', { name: 'Create Room' }));
    fireEvent.change(screen.getByPlaceholderText('Room name'), { target: { value: '  standup  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() => expect(props.createRoom).toHaveBeenCalledWith('standup'));
    await waitFor(() => expect(screen.queryByPlaceholderText('Room name')).toBeNull());
  });

  it('a rejected create keeps the form open and shows the reason', async () => {
    const props = renderList({ createRoom: vi.fn().mockRejectedValue(new Error('name taken')) });
    fireEvent.click(screen.getByRole('button', { name: 'Create Room' }));
    fireEvent.change(screen.getByPlaceholderText('Room name'), { target: { value: 'standup' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() => expect(screen.getByText('name taken')).toBeInTheDocument());
    expect(screen.getByPlaceholderText('Room name')).toBeInTheDocument();
    expect(props.createRoom).toHaveBeenCalledTimes(1);
  });

  it('Cancel closes the form without creating anything', () => {
    const props = renderList();
    fireEvent.click(screen.getByRole('button', { name: 'Create Room' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByPlaceholderText('Room name')).toBeNull();
    expect(props.createRoom).not.toHaveBeenCalled();
  });
});

describe('RoomList DM creation', () => {
  it('is unusable when the follow graph has no mutuals', () => {
    const props = renderList();
    fireEvent.click(screen.getByRole('button', { name: '+ New DM' }));
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.getByText('No mutual friends yet')).toBeInTheDocument();
    const open = screen.getByRole('button', { name: 'Open DM' });
    expect(open).toBeDisabled();
    fireEvent.click(open);
    expect(props.createDM).not.toHaveBeenCalled();
  });

  it('creates a DM against the selected friend’s userId, not their name', async () => {
    useFriendsMock.mockReturnValue(makeFriends([friend('u-42', 'Bo Peep')]));
    const props = renderList();
    fireEvent.click(screen.getByRole('button', { name: '+ New DM' }));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'u-42' } });
    fireEvent.click(screen.getByRole('button', { name: 'Open DM' }));
    await waitFor(() => expect(props.createDM).toHaveBeenCalledWith('u-42'));
    await waitFor(() => expect(screen.queryByRole('button', { name: 'Open DM' })).toBeNull());
  });

  it('surfaces a rejected DM and leaves the form open', async () => {
    useFriendsMock.mockReturnValue(makeFriends([friend('u-42', 'Bo Peep')]));
    renderList({ createDM: vi.fn().mockRejectedValue(new Error('blocked')) });
    fireEvent.click(screen.getByRole('button', { name: '+ New DM' }));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'u-42' } });
    fireEvent.click(screen.getByRole('button', { name: 'Open DM' }));
    await waitFor(() => expect(screen.getByText('blocked')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Open DM' })).toBeInTheDocument();
  });
});

describe('RoomList selection', () => {
  it('hands the whole room object back, not just its id', () => {
    const target = room({ roomId: 'r2', name: 'random', type: 'dm' });
    const props = renderList({ rooms: [room(), target] });
    fireEvent.click(screen.getByText('random'));
    expect(props.onRoomSelect).toHaveBeenCalledWith(target);
  });
});

// REGRESSION (keyboard a11y): the full-card `RoomRow` was a bare
// `<div onClick>` — not focusable, no key handler, not announced as a control —
// even though its sibling `CompactRoomRow` in the same file was already a real
// `<button>`. Picking a room was mouse-only in the non-compact layout. RoomRow
// is now a `<button type="button">` too, matching the in-file precedent, so
// focus plus Enter/Space come from the browser.
describe('RoomList selection — keyboard', () => {
  it('exposes each full-card room row as a button', () => {
    renderList({ rooms: [room({ roomId: 'r2', name: 'random' })] });
    const row = screen.getByRole('button', { name: /random/ });
    expect(row.tagName).toBe('BUTTON');
    expect(row).toHaveAttribute('type', 'button');
  });

  it('puts the full-card room row in the tab order', () => {
    renderList({ rooms: [room({ roomId: 'r2', name: 'random' })] });
    const row = screen.getByRole('button', { name: /random/ });
    row.focus();
    expect(document.activeElement).toBe(row);
  });

  it('activating a focused row selects the room', () => {
    const target = room({ roomId: 'r2', name: 'random', type: 'dm' });
    const props = renderList({ rooms: [room(), target] });
    const row = screen.getByRole('button', { name: /random/ });
    row.focus();
    // jsdom does not run the browser's Enter/Space -> click default action;
    // the tagName + focus assertions above are what prove the key press lands.
    fireEvent.click(row);
    expect(props.onRoomSelect).toHaveBeenCalledWith(target);
  });

  it('marks the active room with aria-pressed', () => {
    const target = room({ roomId: 'r2', name: 'random' });
    renderList({ rooms: [room({ roomId: 'r1', name: 'general' }), target], activeRoomId: 'r2' } as Partial<Props>);
    expect(screen.getByRole('button', { name: /random/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /general/ })).toHaveAttribute('aria-pressed', 'false');
  });

  it('matches the compact variant, which was already a button', () => {
    renderList({ compact: true, rooms: [room({ name: 'general' })] });
    expect(screen.getByRole('button', { name: /general/ }).tagName).toBe('BUTTON');
  });
});
