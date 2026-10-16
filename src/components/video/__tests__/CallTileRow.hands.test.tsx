// Raised hands on every CallTileRow variant (audit 2026-10-15: the dock the
// app renders dropped `handRaised` at all of its tile sites).
import { render, screen } from '@testing-library/react';
import { CallTileRow, type CallTileParticipant } from '../CallTileRow';

const people: CallTileParticipant[] = [
  { id: 'a', displayName: 'Ana', handRaised: 1 },
  { id: 'b', displayName: 'Ben', handRaised: true, isMuted: true },
  { id: 'c', displayName: 'Cy' },
];

describe('CallTileRow raised hands', () => {
  it('dock variant: badge on the tile and the hand in its accessible name', () => {
    render(<CallTileRow participants={people} variant="dock" />);
    const ana = document.querySelector('[data-peer-id="a"]')!;
    expect(ana).toHaveAttribute('data-hand-raised', 'true');
    expect(ana.getAttribute('aria-label')).toBe('Ana, hand raised, 1st in line');
    expect(document.querySelector('[data-peer-id="b"]')!.getAttribute('aria-label')).toBe('Ben, hand raised, muted');
    expect(document.querySelector('[data-peer-id="c"]')).not.toHaveAttribute('data-hand-raised');
  });

  it('floating variant: avatar bubbles carry the hand', () => {
    render(<CallTileRow participants={people} variant="floating" />);
    expect(screen.getAllByTestId('bubble-hand')).toHaveLength(2);
    expect(screen.getByRole('img', { name: 'Ana, hand raised, 1st in line' })).toBeInTheDocument();
  });

  it('bar variant: ParticipantTile tiles show the hand', () => {
    render(<CallTileRow participants={people} variant="bar" />);
    expect(screen.getAllByTestId('tile-raised-hand').map((e) => e.getAttribute('data-hand-position') ?? 'yes')).toEqual(['1', 'yes']);
  });

  it('floating variant with video: the ParticipantTile shows the hand', () => {
    render(<CallTileRow participants={[{ id: 'a', displayName: 'Ana', handRaised: 2, videoElement: <video /> }]} variant="floating" />);
    expect(screen.getByTestId('tile-raised-hand')).toHaveAttribute('data-hand-position', '2');
  });
});
