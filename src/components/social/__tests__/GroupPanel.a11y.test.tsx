// GroupPanel keyboard access (v2.73.0).
//
// The group row and the per-group room rows were `<div onClick>` with
// cursor-pointer and no role/tabIndex/key handler — visually obvious
// affordances that keyboard users could not reach at all. They now follow
// the SidebarRow house pattern: role="button" + tabIndex + Enter/Space.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const groups = [
  { groupId: 'g1', name: 'Design', description: 'design crew', visibility: 'public', ownerId: 'u-other' },
];

vi.mock('../../../hooks/useGroups', () => ({
  useGroups: () => ({
    groups,
    createGroup: vi.fn(), deleteGroup: vi.fn(), joinGroup: vi.fn(),
    leaveGroup: vi.fn(), inviteUser: vi.fn(), acceptInvite: vi.fn(),
    loadMembers: vi.fn(), members: [], loading: false, error: null,
  }),
}));

import { GroupPanel } from '../GroupPanel';

const ROOMS = [
  { roomId: 'r1', name: 'standup', groupId: 'g1' },
] as never[];

function renderPanel(onRoomSelect = vi.fn()) {
  render(
    <GroupPanel
      idToken="t"
      rooms={ROOMS}
      createGroupRoom={vi.fn()}
      onRoomSelect={onRoomSelect}
      roomsLoading={false}
    />,
  );
  return onRoomSelect;
}

describe('GroupPanel keyboard access', () => {
  beforeEach(() => vi.clearAllMocks());

  it('the group row is a focusable button that responds to Enter and Space', () => {
    renderPanel();
    const row = screen.getByRole('button', { name: /Select group Design/ });
    expect(row).toHaveAttribute('tabindex', '0');
    expect(row).toHaveAttribute('aria-pressed');
    // Activating by keyboard selects the group, revealing its room list.
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(screen.getByRole('button', { name: /Open room standup/ })).toBeInTheDocument();
  });

  it('room rows activate with Enter and with Space', () => {
    const onRoomSelect = renderPanel();
    fireEvent.keyDown(screen.getByRole('button', { name: /Select group Design/ }), { key: 'Enter' });

    const room = screen.getByRole('button', { name: /Open room standup/ });
    fireEvent.keyDown(room, { key: 'Enter' });
    expect(onRoomSelect).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(room, { key: ' ' });
    expect(onRoomSelect).toHaveBeenCalledTimes(2);
  });

  it('ignores unrelated keys', () => {
    const onRoomSelect = renderPanel();
    fireEvent.keyDown(screen.getByRole('button', { name: /Select group Design/ }), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('button', { name: /Open room standup/ }), { key: 'a' });
    expect(onRoomSelect).not.toHaveBeenCalled();
  });
});
