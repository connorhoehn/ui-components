import { useState } from 'react';
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

  describe('pinning', () => {
    it('sorts pinned teams before unpinned ones, keeping order within each group', () => {
      const teams: TeamTreeItem[] = [
        { teamId: 'a', name: 'Alpha', channels: [] },
        { teamId: 'b', name: 'Beta', pinned: true, channels: [] },
        { teamId: 'c', name: 'Gamma', channels: [] },
        { teamId: 'd', name: 'Delta', pinned: true, channels: [] },
      ];
      render(<TeamChannelTree teams={teams} onSelectChannel={vi.fn()} />);
      const order = Array.from(
        screen.getByTestId('team-channel-tree').querySelectorAll('[aria-level="1"]'),
      ).map((el) => el.getAttribute('data-row-id'));
      // b and d (pinned) come first, in the order they were given; a and c
      // (unpinned) follow, also in the order they were given — a stable sort.
      expect(order).toEqual(['team:b', 'team:d', 'team:a', 'team:c']);
    });

    it('sorts a pinned channel first within its team, without lifting it out of the team', () => {
      const teams: TeamTreeItem[] = [
        {
          teamId: 't1',
          name: 'Design',
          expanded: true,
          channels: [
            { channel: 'general', name: 'General' },
            { channel: 'reviews', name: 'Reviews', pinned: true },
            { channel: 'standup', name: 'Standup' },
          ],
        },
      ];
      render(<TeamChannelTree teams={teams} onSelectChannel={vi.fn()} />);
      const order = Array.from(
        screen.getByTestId('team-channel-tree').querySelectorAll('[aria-level="2"]'),
      ).map((el) => el.getAttribute('data-row-id'));
      expect(order).toEqual(['channel:reviews', 'channel:general', 'channel:standup']);
      // Still a level-2 treeitem under its team — not lifted into a flat group.
      expect(screen.getByTestId('team-channel-tree-channel-reviews').getAttribute('aria-level')).toBe('2');
    });

    it('shows the same pin glyph the flat rail rows use, on both a pinned team and a pinned channel', () => {
      const teams: TeamTreeItem[] = [
        {
          teamId: 't1',
          name: 'Design',
          pinned: true,
          expanded: true,
          channels: [{ channel: 'general', name: 'General', pinned: true }],
        },
      ];
      render(<TeamChannelTree teams={teams} onSelectChannel={vi.fn()} />);
      expect(screen.getByTestId('team-channel-tree-team-t1-pinned')).toBeInTheDocument();
      expect(screen.getByTestId('team-channel-tree-channel-general-pinned')).toBeInTheDocument();
    });

    it('offers Pin/Unpin in the team menu, wired to onTogglePinTeam with the next state', () => {
      const onTogglePinTeam = vi.fn();
      const { rerender } = render(
        <TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} onTogglePinTeam={onTogglePinTeam} />,
      );
      fireEvent.click(screen.getByTestId('team-channel-tree-team-t1-menu'));
      let menu = within(screen.getByTestId('team-channel-tree-team-t1-menu-panel'));
      expect(menu.getByTestId('team-channel-tree-team-t1-menu-pin').textContent).toContain('Pin');
      fireEvent.click(menu.getByTestId('team-channel-tree-team-t1-menu-pin'));
      expect(onTogglePinTeam).toHaveBeenCalledWith('t1', true);

      const pinned = TEAMS.map((t) => (t.teamId === 't1' ? { ...t, pinned: true } : t));
      rerender(<TeamChannelTree teams={pinned} onSelectChannel={vi.fn()} onTogglePinTeam={onTogglePinTeam} />);
      fireEvent.click(screen.getByTestId('team-channel-tree-team-t1-menu'));
      menu = within(screen.getByTestId('team-channel-tree-team-t1-menu-panel'));
      expect(menu.getByTestId('team-channel-tree-team-t1-menu-pin').textContent).toContain('Unpin');
      fireEvent.click(menu.getByTestId('team-channel-tree-team-t1-menu-pin'));
      expect(onTogglePinTeam).toHaveBeenCalledWith('t1', false);
    });

    it('toggles a channel pin, reporting (channel, true) then (channel, false)', () => {
      const onTogglePinChannel = vi.fn();
      const { rerender } = render(
        <TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} onTogglePinChannel={onTogglePinChannel} />,
      );
      fireEvent.click(screen.getByTestId('team-channel-tree-channel-general-pin-toggle'));
      expect(onTogglePinChannel).toHaveBeenCalledWith('general', true);

      const pinned = TEAMS.map((t) =>
        t.teamId !== 't1'
          ? t
          : { ...t, channels: t.channels.map((c) => (c.channel === 'general' ? { ...c, pinned: true } : c)) },
      );
      rerender(<TeamChannelTree teams={pinned} onSelectChannel={vi.fn()} onTogglePinChannel={onTogglePinChannel} />);
      fireEvent.click(screen.getByTestId('team-channel-tree-channel-general-pin-toggle'));
      expect(onTogglePinChannel).toHaveBeenCalledWith('general', false);
    });

    it('offers no pin affordance at all when the pin handlers are absent, even alongside other handlers', () => {
      const onManageTeam = vi.fn();
      render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} onManageTeam={onManageTeam} />);
      fireEvent.click(screen.getByTestId('team-channel-tree-team-t1-menu'));
      const menu = within(screen.getByTestId('team-channel-tree-team-t1-menu-panel'));
      expect(menu.queryByTestId('team-channel-tree-team-t1-menu-pin')).toBeNull();
      expect(screen.queryByTestId('team-channel-tree-channel-general-pin-toggle')).toBeNull();
    });

    it('keeps keyboard navigation walking the same on-screen rows with pin controls present', () => {
      const onSelectChannel = vi.fn();
      const teamsWithPins = TEAMS.map((t) =>
        t.teamId === 't1'
          ? { ...t, channels: t.channels.map((c) => (c.channel === 'reviews' ? { ...c, pinned: true } : c)) }
          : t,
      );
      render(
        <TeamChannelTree
          teams={teamsWithPins}
          onSelectChannel={onSelectChannel}
          onTogglePinTeam={vi.fn()}
          onTogglePinChannel={vi.fn()}
        />,
      );
      const teamRow = screen.getByTestId('team-channel-tree-team-t1');
      fireEvent.keyDown(teamRow, { key: 'ArrowDown' });
      // "reviews" was pinned, so it now leads t1's channels on screen — and
      // that's the row Down should land on, matching the visible order.
      expect(document.activeElement?.getAttribute('data-row-id')).toBe('channel:reviews');
      fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
      expect(document.activeElement?.getAttribute('data-row-id')).toBe('channel:general');
    });
  });
});

describe('TeamChannelTree heading collapse', () => {
  /** The host owns the state — a rail persists it and comes back folded. */
  function Harness(props: Partial<React.ComponentProps<typeof TeamChannelTree>> = {}) {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <TeamChannelTree
        teams={TEAMS}
        onSelectChannel={vi.fn()}
        collapsed={collapsed}
        onToggleCollapse={setCollapsed}
        {...props}
      />
    );
  }

  it('folds the whole tree away behind the "Teams" heading and back', () => {
    render(<Harness />);
    expect(screen.getAllByRole('treeitem').length).toBeGreaterThan(0);

    const toggle = screen.getByRole('button', { name: 'Teams' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(toggle);

    expect(screen.queryAllByRole('treeitem')).toHaveLength(0);
    // The heading is the way back, so it has to survive the fold.
    expect(screen.getByRole('button', { name: /^Teams/ })).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(screen.getByRole('button', { name: /^Teams/ }));
    expect(screen.getAllByRole('treeitem').length).toBeGreaterThan(0);
  });

  it('reports the state to switch to', () => {
    const onToggleCollapse = vi.fn();
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} onToggleCollapse={onToggleCollapse} />);
    fireEvent.click(screen.getByRole('button', { name: 'Teams' }));
    expect(onToggleCollapse).toHaveBeenCalledWith(true);
  });

  it('empties the roving tabindex rather than leaving invisible rows Arrow-reachable', () => {
    render(<Harness collapsed onToggleCollapse={vi.fn()} />);
    const tree = screen.getByRole('tree');
    expect(tree.querySelectorAll('[tabindex]')).toHaveLength(0);
    // Nothing for Arrow/Home/End to walk to, and nothing to throw on either.
    fireEvent.keyDown(tree, { key: 'ArrowDown' });
    expect(screen.queryAllByRole('treeitem')).toHaveLength(0);
  });

  it('remembers which teams were expanded across a fold', () => {
    render(<Harness />);
    // t1 ships expanded; open t2 as well, then fold and unfold the section.
    fireEvent.click(screen.getByTestId('team-channel-tree-team-t2'));
    expect(screen.getByTestId('team-channel-tree-channel-campaigns')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^Teams/ }));
    fireEvent.click(screen.getByRole('button', { name: /^Teams/ }));
    expect(screen.getByTestId('team-channel-tree-channel-campaigns')).toBeInTheDocument();
    expect(screen.getByTestId('team-channel-tree-channel-general')).toBeInTheDocument();
  });

  it('says what is waiting in the folded tree', () => {
    render(<Harness collapsed onToggleCollapse={vi.fn()} />);
    // 3 + 2 + 5 across every team's channels.
    expect(screen.getByTestId('team-channel-tree-heading-collapsed-count')).toHaveTextContent('10');
    expect(screen.getByRole('button', { name: 'Teams 10 unread' })).toBeInTheDocument();
  });

  it('keeps the + on the heading creating rather than folding', () => {
    const onToggleCollapse = vi.fn();
    const onCreateTeam = vi.fn();
    render(
      <TeamChannelTree
        teams={TEAMS}
        onSelectChannel={vi.fn()}
        onCreateTeam={onCreateTeam}
        onToggleCollapse={onToggleCollapse}
      />,
    );
    fireEvent.click(screen.getByTestId('team-channel-tree-create-team'));
    expect(onCreateTeam).toHaveBeenCalledTimes(1);
    expect(onToggleCollapse).not.toHaveBeenCalled();
  });

  it('changes nothing for a caller that passes no collapse props', () => {
    render(<TeamChannelTree teams={TEAMS} onSelectChannel={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Teams' })).toBeNull();
    expect(screen.getByTestId('team-channel-tree-heading')).toHaveTextContent('Teams');
    expect(screen.getAllByRole('treeitem').length).toBeGreaterThan(0);
  });
});
