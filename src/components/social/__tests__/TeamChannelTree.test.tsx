import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TeamChannelTree, type TeamTreeItem } from '../TeamChannelTree';

afterEach(cleanup);

const TEAMS: TeamTreeItem[] = [
  {
    teamId: 't1',
    name: 'Design',
    expanded: true,
    channels: [
      { channel: 'general', name: 'General', unreadCount: 3 },
      { channel: 'reviews', name: 'Reviews', private: true },
      { channel: 'standup', name: 'Standup', mentioned: true, unreadCount: 2 },
      { channel: 'archive', name: 'Archive', unreadCount: 5, muted: true },
      { channel: 'launch', name: 'Launch', live: true },
    ],
  },
  {
    teamId: 't2',
    name: 'Marketing',
    channels: [{ channel: 'campaigns', name: 'Campaigns' }],
  },
];

describe('TeamChannelTree', () => {
  it('is a tree with treeitem rows', () => {
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} />);
    expect(screen.getByRole('tree')).toBeInTheDocument();
    expect(screen.getAllByRole('treeitem').length).toBeGreaterThan(0);
  });

  it('expands an already-expanded team and shows its channels', () => {
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} />);
    expect(screen.getByTestId('team-channel-tree-team-t1').getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByTestId('team-channel-tree-channel-general')).toBeInTheDocument();
    // t2 is not expanded by default — no rows for its channel.
    expect(screen.getByTestId('team-channel-tree-team-t2').getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByTestId('team-channel-tree-channel-campaigns')).toBeNull();
  });

  it('expands and collapses a team on click (uncontrolled)', () => {
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} />);
    fireEvent.click(screen.getByTestId('team-channel-tree-team-t2'));
    expect(screen.getByTestId('team-channel-tree-channel-campaigns')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('team-channel-tree-team-t2'));
    expect(screen.queryByTestId('team-channel-tree-channel-campaigns')).toBeNull();
  });

  it('reports toggles through onToggleTeam and stays controlled by team.expanded', () => {
    const onToggleTeam = vi.fn();
    const { rerender } = render(
      <TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} onToggleTeam={onToggleTeam} />,
    );
    fireEvent.click(screen.getByTestId('team-channel-tree-team-t2'));
    expect(onToggleTeam).toHaveBeenCalledWith('t2', true);
    // Nothing renders yet — the host hasn't fed the new `expanded` back in.
    expect(screen.queryByTestId('team-channel-tree-channel-campaigns')).toBeNull();

    const next = TEAMS.map((t) => (t.teamId === 't2' ? { ...t, expanded: true } : t));
    rerender(<TeamChannelTree teams={next} onSelectChannel={vi.fn()} onToggleTeam={onToggleTeam} />);
    expect(screen.getByTestId('team-channel-tree-channel-campaigns')).toBeInTheDocument();
  });

  it('selects a channel', () => {
    const onSelectChannel = vi.fn();
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={onSelectChannel} />);
    fireEvent.click(screen.getByTestId('team-channel-tree-channel-general'));
    expect(onSelectChannel).toHaveBeenCalledWith('general');
  });

  it('highlights the active channel', () => {
    render(<TeamChannelTree teams={TEAMS} activeChannel="general" onSelectChannel={vi.fn()} />);
    expect(screen.getByTestId('team-channel-tree-channel-general').getAttribute('data-active')).toBe('true');
    expect(screen.getByTestId('team-channel-tree-channel-reviews').getAttribute('data-active')).toBe('false');
  });

  it('shows a lock glyph instead of # for a private channel', () => {
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} />);
    expect(screen.getByTestId('team-channel-tree-channel-general').textContent).toContain('#');
    expect(screen.getByTestId('team-channel-tree-channel-reviews').textContent).not.toContain('#');
  });

  it('marks a mentioned channel', () => {
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} />);
    expect(screen.getByTestId('team-channel-tree-channel-standup-mention')).toBeInTheDocument();
    expect(screen.queryByTestId('team-channel-tree-channel-general-mention')).toBeNull();
  });

  it('gives a muted channel a neutral-toned unread badge, and an unmuted one an accent badge', () => {
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} />);
    const muted = screen.getByTestId('team-channel-tree-channel-archive-unread');
    const accent = screen.getByTestId('team-channel-tree-channel-general-unread');
    expect(muted.getAttribute('data-muted')).toBe('true');
    expect(muted.className).toContain('bg-surface-inset');
    expect(accent.getAttribute('data-muted')).toBe('false');
    expect(accent.className).toContain('bg-primary');
  });

  it('shows a live badge', () => {
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} />);
    expect(screen.getByTestId('team-channel-tree-channel-launch-live')).toBeInTheDocument();
  });

  it('renders the ⋯ menu only with the handlers given, each item wired to its handler', () => {
    const onManageTeam = vi.fn();
    render(
      <TeamChannelTree
        teams={TEAMS}
        onSelectChannel={vi.fn()}
        onManageTeam={onManageTeam}
      />,
    );
    fireEvent.click(screen.getByTestId('team-channel-tree-team-t1-menu'));
    const menu = within(screen.getByTestId('team-channel-tree-team-t1-menu-panel'));
    expect(menu.getByTestId('team-channel-tree-team-t1-menu-manage')).toBeInTheDocument();
    expect(menu.queryByTestId('team-channel-tree-team-t1-menu-leave')).toBeNull();
    fireEvent.click(menu.getByTestId('team-channel-tree-team-t1-menu-manage'));
    expect(onManageTeam).toHaveBeenCalledWith('t1');
  });

  it('creates a channel from a + on the team row, and hands back the button to anchor to', () => {
    const onCreateChannel = vi.fn();
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} onCreateChannel={onCreateChannel} />);
    const plus = screen.getByTestId('team-channel-tree-team-t1-add-channel');
    expect(plus.getAttribute('aria-label')).toBe('Create a channel in Design');
    fireEvent.click(plus);
    expect(onCreateChannel).toHaveBeenCalledWith('t1', plus);
  });

  it('creating a channel does not also open or close the team', () => {
    const onToggleTeam = vi.fn();
    render(
      <TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} onToggleTeam={onToggleTeam} onCreateChannel={vi.fn()} />,
    );
    fireEvent.click(screen.getByTestId('team-channel-tree-team-t1-add-channel'));
    expect(onToggleTeam).not.toHaveBeenCalled();
  });

  it('creates a team from the + on the Teams heading', () => {
    const onCreateTeam = vi.fn();
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} onCreateTeam={onCreateTeam} />);
    const plus = screen.getByTestId('team-channel-tree-create-team');
    expect(plus.getAttribute('aria-label')).toBe('Create a team');
    fireEvent.click(plus);
    expect(onCreateTeam).toHaveBeenCalledWith(plus);
  });

  it('omits the ⋯ menu entirely when no team-menu handler is given', () => {
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} />);
    expect(screen.queryByTestId('team-channel-tree-team-t1-menu')).toBeNull();
  });

  it('shows the "Join or create a team" footer action only when onCreateTeam is given', () => {
    const onCreateTeam = vi.fn();
    const { rerender } = render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} onCreateTeam={onCreateTeam} />);
    fireEvent.click(screen.getByTestId('team-channel-tree-create-team'));
    expect(onCreateTeam).toHaveBeenCalled();

    rerender(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} />);
    expect(screen.queryByTestId('team-channel-tree-create-team')).toBeNull();
  });

  it('keyboard: Enter selects a channel, Enter toggles a team, Left/Right collapse/expand', () => {
    const onSelectChannel = vi.fn();
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={onSelectChannel} />);

    const channelRow = screen.getByTestId('team-channel-tree-channel-general');
    fireEvent.keyDown(channelRow, { key: 'Enter' });
    expect(onSelectChannel).toHaveBeenCalledWith('general');

    const teamRow = screen.getByTestId('team-channel-tree-team-t2');
    expect(teamRow.getAttribute('aria-expanded')).toBe('false');
    fireEvent.keyDown(teamRow, { key: 'ArrowRight' });
    expect(teamRow.getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(teamRow, { key: 'ArrowLeft' });
    expect(teamRow.getAttribute('aria-expanded')).toBe('false');
    fireEvent.keyDown(teamRow, { key: ' ' });
    expect(teamRow.getAttribute('aria-expanded')).toBe('true');
  });
});
