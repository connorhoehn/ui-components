import { render, screen, fireEvent, within } from '@testing-library/react';
import { RosterPanel, type RosterParticipant } from '../RosterPanel';

function participant(overrides: Partial<RosterParticipant> & { id: string }): RosterParticipant {
  return {
    displayName: `User ${overrides.id}`,
    ...overrides,
  };
}

describe('RosterPanel', () => {
  it('renders the default title "Participants" and honors a title override', () => {
    const { rerender } = render(<RosterPanel participants={[]} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Participants');
    rerender(<RosterPanel participants={[]} title="In this call" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('In this call');
  });

  it('header count defaults to participants.length and honors override', () => {
    const ps = [participant({ id: 'a' }), participant({ id: 'b' }), participant({ id: 'c' })];
    const { rerender } = render(<RosterPanel participants={ps} />);
    expect(screen.getByRole('heading', { level: 3 }).parentElement).toHaveTextContent('3');
    rerender(<RosterPanel participants={ps} count={42} />);
    expect(screen.getByRole('heading', { level: 3 }).parentElement).toHaveTextContent('42');
  });

  it('renders one row per participant', () => {
    const ps = [
      participant({ id: 'a', displayName: 'Alpha' }),
      participant({ id: 'b', displayName: 'Bravo' }),
      participant({ id: 'c', displayName: 'Charlie' }),
    ];
    render(<RosterPanel participants={ps} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('renders "(you)" suffix for the local participant', () => {
    const ps = [
      participant({ id: 'a', displayName: 'Alpha', isLocal: true }),
      participant({ id: 'b', displayName: 'Bravo' }),
    ];
    render(<RosterPanel participants={ps} />);
    expect(screen.getByText('(you)')).toBeInTheDocument();
    // Only the local participant gets the suffix.
    expect(screen.getAllByText('(you)')).toHaveLength(1);
  });

  it('renders avatar img when avatarUrl is set, falls back to initials when not', () => {
    const ps = [
      participant({ id: 'a', displayName: 'Alpha Beta', avatarUrl: 'https://x/a.png' }),
      participant({ id: 'b', displayName: 'Gamma Delta' }),
    ];
    render(<RosterPanel participants={ps} />);
    const img = document.querySelector('img[src="https://x/a.png"]');
    expect(img).not.toBeNull();
    // Beta has no avatar — initials "GD" for Gamma Delta render.
    expect(screen.getByText('GD')).toBeInTheDocument();
  });

  it('initials: first+last initial for multi-word, first 2 chars for single-word, "?" for empty', () => {
    render(
      <RosterPanel
        participants={[
          participant({ id: '1', displayName: 'Alice Bobson' }),
          participant({ id: '2', displayName: 'cher' }),
          participant({ id: '3', displayName: '' }),
        ]}
      />,
    );
    expect(screen.getByText('AB')).toBeInTheDocument();
    expect(screen.getByText('CH')).toBeInTheDocument();
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('applies the active-speaker ring to the matching row and not to others', () => {
    const ps = [
      participant({ id: 'a', displayName: 'Alpha' }),
      participant({ id: 'b', displayName: 'Bravo' }),
    ];
    render(<RosterPanel participants={ps} activeSpeakerId="a" />);
    const alphaRow = screen.getByText('Alpha').closest('button')!;
    const bravoRow = screen.getByText('Bravo').closest('button')!;
    // The avatar container (first child div) holds the speaking ring.
    const alphaAvatar = alphaRow.querySelector('div')!;
    const bravoAvatar = bravoRow.querySelector('div')!;
    expect(alphaAvatar.className).toContain('ring-2');
    expect(bravoAvatar.className).not.toContain('ring-2');
  });

  it('renders the mute icon only when isMuted is true', () => {
    const ps = [
      participant({ id: 'a', displayName: 'Alpha', isMuted: true }),
      participant({ id: 'b', displayName: 'Bravo' }),
    ];
    render(<RosterPanel participants={ps} />);
    const alphaRow = screen.getByText('Alpha').closest('button')!;
    const bravoRow = screen.getByText('Bravo').closest('button')!;
    expect(within(alphaRow).getByLabelText('Muted')).toBeInTheDocument();
    expect(within(bravoRow).queryByLabelText('Muted')).toBeNull();
  });

  it('renders the screen-share dot only when isScreenSharing is true', () => {
    const ps = [
      participant({ id: 'a', displayName: 'Alpha', isScreenSharing: true }),
      participant({ id: 'b', displayName: 'Bravo' }),
    ];
    render(<RosterPanel participants={ps} />);
    const alphaRow = screen.getByText('Alpha').closest('button')!;
    const bravoRow = screen.getByText('Bravo').closest('button')!;
    expect(alphaRow.querySelector('[title="Sharing screen"]')).not.toBeNull();
    expect(bravoRow.querySelector('[title="Sharing screen"]')).toBeNull();
  });

  it('renders the hand-raised glyph only when handRaised is true', () => {
    const ps = [
      participant({ id: 'a', displayName: 'Alpha', handRaised: true }),
      participant({ id: 'b', displayName: 'Bravo' }),
    ];
    render(<RosterPanel participants={ps} />);
    const alphaRow = screen.getByText('Alpha').closest('button')!;
    const bravoRow = screen.getByText('Bravo').closest('button')!;
    expect(within(alphaRow).getByLabelText('Hand raised')).toBeInTheDocument();
    expect(within(bravoRow).queryByLabelText('Hand raised')).toBeNull();
  });

  it('invokes onParticipantClick with the participant id when a row is clicked', () => {
    const onClick = vi.fn();
    const ps = [participant({ id: 'a', displayName: 'Alpha' }), participant({ id: 'b', displayName: 'Bravo' })];
    render(<RosterPanel participants={ps} onParticipantClick={onClick} />);
    fireEvent.click(screen.getByText('Bravo').closest('button')!);
    expect(onClick).toHaveBeenCalledWith('b');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('rows are disabled when no click handler is provided', () => {
    const ps = [participant({ id: 'a', displayName: 'Alpha' })];
    render(<RosterPanel participants={ps} />);
    const row = screen.getByText('Alpha').closest('button')!;
    expect(row).toBeDisabled();
    expect(row.className).toContain('cursor-default');
  });

  it('renders a footer when supplied and omits the footer container when not', () => {
    const { rerender, container } = render(<RosterPanel participants={[]} />);
    // No <div.border-t> footer container with no footer prop
    expect(container.querySelector('aside > div.border-t')).toBeNull();
    rerender(<RosterPanel participants={[]} footer={<button>Add</button>} />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('emits aria-label="Call participants" on the aside', () => {
    render(<RosterPanel participants={[]} />);
    expect(screen.getByLabelText('Call participants').tagName.toLowerCase()).toBe('aside');
  });
});
