import { render, screen } from '@testing-library/react';
import { RaisedHandBadge, raisedHandLabel } from '../RaisedHandBadge';
import { ParticipantTile } from '../ParticipantTile';
import { RosterPanel } from '../RosterPanel';

describe('RaisedHandBadge', () => {
  it('labels the queue position', () => {
    expect(raisedHandLabel(true)).toBe('Hand raised');
    expect(raisedHandLabel(1)).toBe('Hand raised, 1st in line');
    expect(raisedHandLabel(2)).toBe('Hand raised, 2nd in line');
    expect(raisedHandLabel(3)).toBe('Hand raised, 3rd in line');
    expect(raisedHandLabel(11)).toBe('Hand raised, 11th in line');
    expect(raisedHandLabel(22)).toBe('Hand raised, 22nd in line');
    expect(raisedHandLabel(0)).toBeNull();
  });

  it('renders the position, and nothing when not raised', () => {
    const { rerender } = render(<RaisedHandBadge raised={2} />);
    expect(screen.getByRole('img', { name: 'Hand raised, 2nd in line' })).toHaveTextContent('2');
    rerender(<RaisedHandBadge raised={false} />);
    expect(screen.queryByTestId('raised-hand-badge')).toBeNull();
  });

  it('ParticipantTile shows the hand in its name chip', () => {
    render(<ParticipantTile id="a" displayName="Esme Tanaka" handRaised={1} isMuted />);
    expect(screen.getByTestId('remote-tile')).toHaveAttribute('data-hand-raised', 'true');
    expect(screen.getByTestId('tile-raised-hand')).toHaveAttribute('data-hand-position', '1');
  });

  it('RosterPanel accepts a position and still answers to "Hand raised" for a boolean', () => {
    render(<RosterPanel participants={[{ id: 'a', displayName: 'A', handRaised: 3 }, { id: 'b', displayName: 'B', handRaised: true }]} />);
    expect(screen.getByRole('img', { name: 'Hand raised, 3rd in line' })).toBeInTheDocument();
    expect(screen.getByLabelText('Hand raised')).toBeInTheDocument();
  });
});
