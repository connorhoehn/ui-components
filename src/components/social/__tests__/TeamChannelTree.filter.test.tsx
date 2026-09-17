import { render, screen } from '@testing-library/react';
import { TeamChannelTree } from '../TeamChannelTree';

// The rail filtered its flat rows and left the tree alone, so typing the name
// of a channel that lives in a team returned nothing while the channel sat one
// fold away. This is the gesture people reach for when they want a
// conversation they are NOT already looking at.

const teams = [
  {
    teamId: 't-design',
    name: 'Design',
    channels: [
      { channel: 'room:design-general', name: 'General' },
      { channel: 'room:design-standups', name: 'Standups' },
    ],
  },
  {
    teamId: 't-research',
    name: 'Research',
    channels: [{ channel: 'room:research-general', name: 'General' }],
  },
];

const shown = () => [...document.querySelectorAll('[role="treeitem"]')].map((r) => r.textContent ?? '');

describe('TeamChannelTree — finding a channel inside a team', () => {
  it('opens the team and shows the channel that matches', () => {
    render(<TeamChannelTree teams={teams} onSelectChannel={vi.fn()} filter="standup" />);
    expect(screen.getByText('Standups')).toBeInTheDocument();
    // Its team is shown open even though nobody expanded it.
    expect(shown().some((t) => t.includes('Design'))).toBe(true);
    // And nothing that does not match survives.
    expect(screen.queryByText('Research')).toBeNull();
    expect(screen.queryByText('General')).toBeNull();
  });

  it('keeps every channel of a team whose own name matches', () => {
    // You asked for the team, so you get the team.
    render(<TeamChannelTree teams={teams} onSelectChannel={vi.fn()} filter="design" />);
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Standups')).toBeInTheDocument();
    expect(screen.queryByText('Research')).toBeNull();
  });

  it('matches case-insensitively, the way the box is typed into', () => {
    render(<TeamChannelTree teams={teams} onSelectChannel={vi.fn()} filter="STANDUPS" />);
    expect(screen.getByText('Standups')).toBeInTheDocument();
  });

  it('shows no teams at all when nothing matches', () => {
    render(<TeamChannelTree teams={teams} onSelectChannel={vi.fn()} filter="zzzz" />);
    expect(shown()).toHaveLength(0);
  });

  it('leaves the tree exactly as it was when the box is cleared', () => {
    // The filter's expansion is an answer to a question, not the reader
    // opening something — so it must not survive the question.
    const view = render(<TeamChannelTree teams={teams} onSelectChannel={vi.fn()} filter="standup" />);
    expect(screen.getByText('Standups')).toBeInTheDocument();
    view.rerender(<TeamChannelTree teams={teams} onSelectChannel={vi.fn()} filter="" />);
    expect(screen.queryByText('Standups')).toBeNull();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
  });

  it('is unchanged with no filter at all', () => {
    render(<TeamChannelTree teams={teams} onSelectChannel={vi.fn()} />);
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.queryByText('Standups')).toBeNull();
  });
});
