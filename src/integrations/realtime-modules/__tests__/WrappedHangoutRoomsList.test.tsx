// src/integrations/realtime-modules/__tests__/WrappedHangoutRoomsList.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedHangoutRoomsList } from '../WrappedHangoutRoomsList';
import type {
  RMRoom,
  RMRoomOccupancy,
  RMUseHangoutRoomsReturn,
} from '../types';

const SELF_PARTICIPANT_ID = 'p-self';

function makeRoom(overrides: Partial<RMRoom> = {}): RMRoom {
  return {
    orgId: 'org-1',
    roomId: overrides.slug ?? 'r-x',
    slug: 'r-x',
    name: 'Room X',
    createdBy: 'u-1',
    createdAt: '2026-05-30T00:00:00.000Z',
    visibility: 'org',
    settings: { audioOnly: false, recordingEnabled: false, softCap: 25 },
    state: 'active',
    lastActiveAt: '2026-05-30T00:00:00.000Z',
    ...overrides,
  };
}

function makeHook(
  rooms: RMRoom[],
  overrides: Partial<RMUseHangoutRoomsReturn> = {},
): RMUseHangoutRoomsReturn {
  return {
    rooms,
    isLoading: false,
    error: null,
    refetch: vi.fn().mockResolvedValue(undefined),
    createRoom: vi.fn(),
    archiveRoom: vi.fn().mockResolvedValue(undefined),
    joinRoom: vi.fn(),
    ...overrides,
  };
}

describe('WrappedHangoutRoomsList', () => {
  it('renders the section with rooms forwarded from the hook return', () => {
    const hangoutRooms = makeHook([
      makeRoom({ slug: 'general', name: 'General' }),
      makeRoom({ slug: 'design', name: 'Design Jam' }),
    ]);
    render(<WrappedHangoutRoomsList hangoutRooms={hangoutRooms} />);

    expect(screen.getByTestId('rooms-section')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Design Jam')).toBeInTheDocument();
  });

  it('shows skeleton loading rows when isLoading', () => {
    const hangoutRooms = makeHook([], { isLoading: true });
    render(<WrappedHangoutRoomsList hangoutRooms={hangoutRooms} />);
    expect(screen.getByTestId('hangout-rooms-loading')).toBeInTheDocument();
  });

  it('shows the error banner with retry CTA wired to refetch()', () => {
    const refetch = vi.fn().mockResolvedValue(undefined);
    const hangoutRooms = makeHook([], {
      error: new Error('boom'),
      refetch,
    });
    render(<WrappedHangoutRoomsList hangoutRooms={hangoutRooms} />);
    const banner = screen.getByTestId('hangout-rooms-error');
    expect(banner).toBeInTheDocument();
    fireEvent.click(screen.getByText('Retry'));
    expect(refetch).toHaveBeenCalledOnce();
  });

  it('falls back to the built-in empty state when no rooms and no renderEmpty', () => {
    const hangoutRooms = makeHook([]);
    render(<WrappedHangoutRoomsList hangoutRooms={hangoutRooms} />);
    expect(screen.getByTestId('hangout-rooms-empty')).toBeInTheDocument();
    // The section header still renders so the "+ new" CTA stays visible
    expect(screen.getByTestId('rooms-section')).toBeInTheDocument();
  });

  it('uses renderEmpty slot when rooms list is empty', () => {
    const hangoutRooms = makeHook([]);
    render(
      <WrappedHangoutRoomsList
        hangoutRooms={hangoutRooms}
        renderEmpty={<div data-testid="custom-empty">Custom empty UI</div>}
      />,
    );
    expect(screen.getByTestId('wrapped-hangout-rooms-empty-slot')).toBeInTheDocument();
    expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
    // The section itself does NOT render in this case
    expect(screen.queryByTestId('rooms-section')).not.toBeInTheDocument();
  });

  it('ignores renderEmpty while loading (so the slot does not flash on first fetch)', () => {
    const hangoutRooms = makeHook([], { isLoading: true });
    render(
      <WrappedHangoutRoomsList
        hangoutRooms={hangoutRooms}
        renderEmpty={<div data-testid="custom-empty">Custom empty UI</div>}
      />,
    );
    expect(screen.queryByTestId('custom-empty')).not.toBeInTheDocument();
    expect(screen.getByTestId('hangout-rooms-loading')).toBeInTheDocument();
  });

  it('translates row clicks from (room) to (slug) via onJoin', () => {
    const hangoutRooms = makeHook([
      makeRoom({ slug: 'design', name: 'Design Jam' }),
    ]);
    const onJoin = vi.fn();
    render(<WrappedHangoutRoomsList hangoutRooms={hangoutRooms} onJoin={onJoin} />);
    fireEvent.click(screen.getByText('Design Jam'));
    expect(onJoin).toHaveBeenCalledOnce();
    expect(onJoin).toHaveBeenCalledWith('design');
  });

  it('forwards occupancyFor so trailing badges render counts and avatars', () => {
    const hangoutRooms = makeHook([
      makeRoom({ slug: 'general', name: 'General' }),
    ]);
    const occupancy: RMRoomOccupancy = {
      slug: 'general',
      count: 3,
      members: [
        { userId: 'u-a', displayName: 'Alice', participantId: 'p-a' },
        { userId: 'u-b', displayName: 'Bob', participantId: 'p-b' },
        { userId: 'u-c', displayName: 'Carol', participantId: 'p-c' },
      ],
    };
    render(
      <WrappedHangoutRoomsList
        hangoutRooms={hangoutRooms}
        occupancyFor={(slug) => (slug === 'general' ? occupancy : null)}
      />,
    );
    const row = screen.getByTestId('room-row');
    expect(row.getAttribute('data-room-active-count')).toBe('3');
  });

  it('renders the self-pulse when participantId matches the only occupant', () => {
    const hangoutRooms = makeHook([
      makeRoom({ slug: 'pairing', name: 'Pairing' }),
    ]);
    const occupancy: RMRoomOccupancy = {
      slug: 'pairing',
      count: 1,
      members: [
        {
          userId: 'u-self',
          displayName: 'You',
          participantId: SELF_PARTICIPANT_ID,
        },
      ],
    };
    render(
      <WrappedHangoutRoomsList
        hangoutRooms={hangoutRooms}
        participantId={SELF_PARTICIPANT_ID}
        occupancyFor={(slug) => (slug === 'pairing' ? occupancy : null)}
      />,
    );
    const row = screen.getByTestId('room-row');
    expect(row.getAttribute('data-joined')).toBe('true');
    expect(
      screen.getByTestId('room-row-self-pulse'),
    ).toBeInTheDocument();
  });

  it('wraps the section in ReconnectingShim when wrapWithNetworkShim is set', () => {
    const hangoutRooms = makeHook([
      makeRoom({ slug: 'general', name: 'General' }),
    ]);
    render(
      <WrappedHangoutRoomsList
        hangoutRooms={hangoutRooms}
        wrapWithNetworkShim={{ connectionState: 'connected' }}
      />,
    );
    expect(screen.getByTestId('reconnecting-shim-connected')).toBeInTheDocument();
  });

  it('shows the connecting placeholder instead of the section when state=connecting', () => {
    const hangoutRooms = makeHook([
      makeRoom({ slug: 'general', name: 'General' }),
    ]);
    render(
      <WrappedHangoutRoomsList
        hangoutRooms={hangoutRooms}
        wrapWithNetworkShim={{ connectionState: 'connecting' }}
      />,
    );
    expect(screen.getByTestId('reconnecting-shim-connecting')).toBeInTheDocument();
    expect(screen.queryByText('General')).not.toBeInTheDocument();
  });
});
