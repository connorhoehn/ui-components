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
    // ParticipantTile convention), so check the participant tile count
    // via filmstrip's direct children (one wrapper div per tile).
    expect(filmstrip.children.length).toBe(2); // Bob + Me
  });

  it('auto-promotes a remote screen-share into the spotlight', () => {
    render(
      <HangoutSpotlight
        participants={[
          p('alice', 'Alice'),
          {
            ...p('bob', 'Bob'),
            screenElement: <div data-testid="bob-screen">bob screen</div>,
          },
          p('carol', 'Carol'),
        ]}
        activeSpeakerId="alice"
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('bob-screen')).toBeInTheDocument();
    const spotlight = screen.getByTestId('hangout-spotlight');
    expect(spotlight.getAttribute('data-spotlight-type')).toBe('screen');
    expect(spotlight.getAttribute('data-spotlight-user')).toBe('Bob');
  });

  it('keeps the sharer’s camera tile in the filmstrip while their screen is spotlit', () => {
    const { container } = render(
      <HangoutSpotlight
        participants={[
          p('alice', 'Alice'),
          {
            ...p('bob', 'Bob'),
            screenElement: <div data-testid="bob-screen">bob screen</div>,
          },
          p('carol', 'Carol'),
        ]}
        speakerHysteresisMs={0}
      />,
    );
    const filmstrip = container.querySelector('.flex.gap-1.overflow-x-auto')!;
    expect(filmstrip.textContent ?? '').toContain('Alice');
    expect(filmstrip.textContent ?? '').toContain('Bob');
    expect(filmstrip.textContent ?? '').toContain('Carol');
    // All three remotes have filmstrip slots — nothing was displaced.
    expect(filmstrip.children.length).toBe(3);
  });

  it('auto-promotes a local screen-share into the spotlight', () => {
    render(
      <HangoutSpotlight
        participants={[p('alice', 'Alice')]}
        localParticipant={{
          ...p('me', 'Me'),
          screenElement: <div data-testid="my-screen">my screen</div>,
        }}
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('my-screen')).toBeInTheDocument();
    const spotlight = screen.getByTestId('hangout-spotlight');
    expect(spotlight.getAttribute('data-spotlight-type')).toBe('screen');
    expect(spotlight.getAttribute('data-spotlight-user')).toBe('Me');
  });

  it('explicit spotlightContent overrides screenElement auto-promotion', () => {
    render(
      <HangoutSpotlight
        participants={[
          {
            ...p('bob', 'Bob'),
            screenElement: <div data-testid="bob-screen">bob screen</div>,
          },
        ]}
        spotlightContent={<div data-testid="custom-content">custom</div>}
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.queryByTestId('bob-screen')).not.toBeInTheDocument();
  });

  it('with multiple screen-shares, the first remote sharer wins', () => {
    render(
      <HangoutSpotlight
        participants={[
          {
            ...p('bob', 'Bob'),
            screenElement: <div data-testid="bob-screen">bob</div>,
          },
          {
            ...p('carol', 'Carol'),
            screenElement: <div data-testid="carol-screen">carol</div>,
          },
        ]}
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('bob-screen')).toBeInTheDocument();
    expect(screen.queryByTestId('carol-screen')).not.toBeInTheDocument();
    expect(screen.getByTestId('hangout-spotlight').getAttribute('data-spotlight-user')).toBe('Bob');
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

// speakerHysteresisMs is the "make this deterministic" escape hatch. These
// pin both halves of its contract: the 750ms default that a real call wants,
// and the 0 that tests/stories need so the render tracks the props.
describe('HangoutSpotlight — speakerHysteresisMs', () => {
  const PEOPLE = [p('alice', 'Alice'), p('bob', 'Bob')];

  function spotlitName(): string | null {
    return screen.getByTestId('hangout-spotlight').getAttribute('data-spotlight-user');
  }

  it('defaults to 750ms — the swap is still pending at 749ms and commits at 750', async () => {
    vi.useFakeTimers();
    try {
      const { rerender } = render(
        <HangoutSpotlight participants={PEOPLE} activeSpeakerId="alice" />,
      );
      rerender(<HangoutSpotlight participants={PEOPLE} activeSpeakerId="bob" />);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(749);
      });
      expect(spotlitName()).toBe('Alice');

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1);
      });
      expect(spotlitName()).toBe('Bob');
    } finally {
      vi.useRealTimers();
    }
  });

  it('speakerHysteresisMs={0} swaps without advancing any timer', () => {
    const { rerender } = render(
      <HangoutSpotlight participants={PEOPLE} activeSpeakerId="alice" speakerHysteresisMs={0} />,
    );
    expect(spotlitName()).toBe('Alice');

    rerender(
      <HangoutSpotlight participants={PEOPLE} activeSpeakerId="bob" speakerHysteresisMs={0} />,
    );
    // No fake timers, no act() beyond rerender's own — this is the property
    // that makes the component storyable and snapshot-testable.
    expect(spotlitName()).toBe('Bob');
  });

  it('a speaker who stops talking inside the window never reaches the spotlight', async () => {
    vi.useFakeTimers();
    try {
      const { rerender } = render(
        <HangoutSpotlight participants={PEOPLE} activeSpeakerId="alice" speakerHysteresisMs={750} />,
      );
      // Bob coughs for 200ms, then Alice is speaking again.
      rerender(
        <HangoutSpotlight participants={PEOPLE} activeSpeakerId="bob" speakerHysteresisMs={750} />,
      );
      await act(async () => {
        await vi.advanceTimersByTimeAsync(200);
      });
      rerender(
        <HangoutSpotlight participants={PEOPLE} activeSpeakerId="alice" speakerHysteresisMs={750} />,
      );
      await act(async () => {
        await vi.advanceTimersByTimeAsync(2000);
      });
      expect(spotlitName()).toBe('Alice');
    } finally {
      vi.useRealTimers();
    }
  });

  it('first paint already matches activeSpeakerId, even at the default window', () => {
    render(<HangoutSpotlight participants={PEOPLE} activeSpeakerId="bob" />);
    expect(spotlitName()).toBe('Bob');
  });
});

describe('HangoutSpotlight — sharer attribution (F5)', () => {
  it('spotlightContentLabel attributes the share to the SHARER, not the speaker', () => {
    render(
      <HangoutSpotlight
        participants={[p('alice', 'Alice'), p('bob', 'Bob')]}
        spotlightContent={<div data-testid="screen-share">screen</div>}
        spotlightContentLabel="Bob"
        activeSpeakerId="alice"
        speakerHysteresisMs={0}
      />,
    );
    expect(
      screen.getByTestId('hangout-spotlight').getAttribute('data-spotlight-user'),
    ).toBe('Bob');
  });

  it('falls back to the speaker name when no label is given (legacy behavior)', () => {
    render(
      <HangoutSpotlight
        participants={[p('alice', 'Alice')]}
        spotlightContent={<div>screen</div>}
        activeSpeakerId="alice"
        speakerHysteresisMs={0}
      />,
    );
    expect(
      screen.getByTestId('hangout-spotlight').getAttribute('data-spotlight-user'),
    ).toBe('Alice');
  });
});
