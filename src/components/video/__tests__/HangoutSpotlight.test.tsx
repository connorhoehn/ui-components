import { render, screen, act } from '@testing-library/react';
import { HangoutSpotlight } from '../HangoutSpotlight';
import type { HangoutLayoutParticipant } from '../HangoutLayoutTypes';

function p(id: string, displayName?: string): HangoutLayoutParticipant {
  return { id, displayName: displayName ?? id };
}

describe('HangoutSpotlight', () => {
  it('explicit spotlightContent wins over active speaker', () => {
    render(
      <HangoutSpotlight
        participants={[p('alice', 'Alice')]}
        spotlightContent={<div data-testid="screen-share">screen</div>}
        activeSpeakerId="alice"
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('screen-share')).toBeInTheDocument();
    const spotlight = screen.getByTestId('hangout-spotlight');
    expect(spotlight.getAttribute('data-spotlight-type')).toBe('screen');
  });

  it('falls back to the first remote participant when no active speaker', () => {
    render(
      <HangoutSpotlight
        participants={[p('alice', 'Alice'), p('bob', 'Bob')]}
        speakerHysteresisMs={0}
      />,
    );
    const spotlight = screen.getByTestId('hangout-spotlight');
    expect(spotlight.getAttribute('data-spotlight-type')).toBe('camera');
    expect(spotlight.getAttribute('data-spotlight-user')).toBe('Alice');
  });

  it('renders the active-speaker tile in the spotlight when hysteresis is disabled', () => {
    render(
      <HangoutSpotlight
        participants={[p('alice', 'Alice'), p('bob', 'Bob')]}
        activeSpeakerId="bob"
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('hangout-spotlight').getAttribute('data-spotlight-user')).toBe('Bob');
  });

  it('excludes the spotlit participant from the filmstrip', () => {
    const { container } = render(
      <HangoutSpotlight
        participants={[p('alice', 'Alice'), p('bob', 'Bob'), p('carol', 'Carol')]}
        activeSpeakerId="bob"
        speakerHysteresisMs={0}
      />,
    );
    // Spotlight slot has data-testid; filmstrip is the rest. Bob shouldn't
    // appear in the filmstrip strip since he's spotlit.
    const filmstrip = container.querySelector('.flex.gap-1.overflow-x-auto');
    expect(filmstrip).not.toBeNull();
    expect(filmstrip!.textContent ?? '').toContain('Alice');
    expect(filmstrip!.textContent ?? '').toContain('Carol');
    expect(filmstrip!.textContent ?? '').not.toContain('Bob');
  });

  it('always renders the local participant in the filmstrip', () => {
    const { container } = render(
      <HangoutSpotlight
        participants={[p('alice', 'Alice'), p('bob', 'Bob')]}
        localParticipant={p('me', 'Me')}
        activeSpeakerId="alice"
        speakerHysteresisMs={0}
      />,
    );
    const filmstrip = container.querySelector('.flex.gap-1.overflow-x-auto')!;
    // Alice is spotlit (excluded), Bob + Me are in the filmstrip.
    expect(filmstrip.textContent ?? '').toContain('Bob');
    // Local participant's tile shows "You" not the displayName (per
    // ParticipantTile convention), so check the participant tile count.
    const tiles = filmstrip.querySelectorAll('.w-32');
    expect(tiles.length).toBe(2); // Bob + Me
  });

  it('hysteresis delays the spotlight swap', async () => {
    vi.useFakeTimers();
    try {
      const { rerender } = render(
        <HangoutSpotlight
          participants={[p('alice', 'Alice'), p('bob', 'Bob')]}
          activeSpeakerId="alice"
          speakerHysteresisMs={500}
        />,
      );
      expect(screen.getByTestId('hangout-spotlight').getAttribute('data-spotlight-user')).toBe('Alice');

      // Speaker changes — should NOT swap immediately.
      rerender(
        <HangoutSpotlight
          participants={[p('alice', 'Alice'), p('bob', 'Bob')]}
          activeSpeakerId="bob"
          speakerHysteresisMs={500}
        />,
      );
      expect(screen.getByTestId('hangout-spotlight').getAttribute('data-spotlight-user')).toBe('Alice');

      // After the hysteresis window, the swap commits.
      await act(async () => {
        await vi.advanceTimersByTimeAsync(500);
      });
      expect(screen.getByTestId('hangout-spotlight').getAttribute('data-spotlight-user')).toBe('Bob');
    } finally {
      vi.useRealTimers();
    }
  });
});
