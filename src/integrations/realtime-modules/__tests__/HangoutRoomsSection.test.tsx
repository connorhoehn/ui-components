// src/integrations/realtime-modules/__tests__/HangoutRoomsSection.test.tsx
//
// The overflow row exists only to be clicked — "Browse all (14)" carries no
// information the section doesn't already show. `onBrowseAll` is optional, so
// rendered unguarded it was a live-looking sidebar row that went nowhere: the
// list stayed truncated and nothing said why. The room rows beside it already
// pass `undefined` rather than a dead handler when `onJoinRoom` is missing.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HangoutRoomsSection } from '../HangoutRoomsSection';
import type { RMRoom, RMUseHangoutRoomsReturn } from '../types';

function makeRoom(slug: string, overrides: Partial<RMRoom> = {}): RMRoom {
  return {
    orgId: 'org-1',
    roomId: `room-${slug}`,
    slug,
    name: `Room ${slug}`,
    createdBy: 'u-1',
    createdAt: '2026-05-30T00:00:00.000Z',
    visibility: 'org',
    settings: { audioOnly: false, recordingEnabled: false, softCap: 25 },
    state: 'active',
    lastActiveAt: '2026-05-30T00:00:00.000Z',
    ...overrides,
  };
}

function makeHook(rooms: RMRoom[]): RMUseHangoutRoomsReturn {
  return {
    rooms,
    isLoading: false,
    error: null,
    refetch: vi.fn().mockResolvedValue(undefined),
    createRoom: vi.fn(),
    archiveRoom: vi.fn().mockResolvedValue(undefined),
    joinRoom: vi.fn(),
  };
}

// Six rooms with maxVisible=2 leaves four in overflow.
const SIX = ['a', 'b', 'c', 'd', 'e', 'f'].map((s) => makeRoom(s));

describe('HangoutRoomsSection — "Browse all" overflow row', () => {
  it('omits the row when no onBrowseAll handler is wired', () => {
    render(<HangoutRoomsSection rooms={makeHook(SIX)} maxVisible={2} />);
    // The truncation itself still happened…
    expect(screen.getByText('Room a')).toBeInTheDocument();
    expect(screen.queryByText('Room f')).toBeNull();
    // …but nothing offers a click that goes nowhere.
    expect(screen.queryByTestId('hangout-rooms-browse-all')).toBeNull();
    expect(screen.queryByText(/Browse all/)).toBeNull();
  });

  it('renders the row and fires onBrowseAll when the caller wired one', () => {
    const onBrowseAll = vi.fn();
    render(
      <HangoutRoomsSection rooms={makeHook(SIX)} maxVisible={2} onBrowseAll={onBrowseAll} />,
    );
    const row = screen.getByTestId('hangout-rooms-browse-all');
    expect(row).toHaveTextContent('Browse all (6)');
    fireEvent.click(row);
    expect(onBrowseAll).toHaveBeenCalledTimes(1);
  });

  it('omits the row when nothing overflows, even with a handler wired', () => {
    render(
      <HangoutRoomsSection rooms={makeHook(SIX)} maxVisible={10} onBrowseAll={vi.fn()} />,
    );
    expect(screen.queryByTestId('hangout-rooms-browse-all')).toBeNull();
  });
});
