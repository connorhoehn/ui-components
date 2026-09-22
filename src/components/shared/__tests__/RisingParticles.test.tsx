import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RisingParticles } from '../RisingParticles';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  setReducedMotion(false);
});

/**
 * jsdom's `matchMedia` is a no-op polyfill from `test-setup`, so the preference
 * has to be swapped per test. The component reads the query through
 * `usePrefersReducedMotion`, which is what every other animated component here
 * uses — the point of this test is that it actually consults it.
 */
function setReducedMotion(reduce: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: reduce && query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

beforeEach(() => setReducedMotion(false));

const layers = () => screen.queryAllByTestId('rising-particles-layer');

describe('RisingParticles', () => {
  it('paints nothing at all while inactive, and the four layers while active', () => {
    const { rerender } = render(
      <RisingParticles active={false}>
        <p>output</p>
      </RisingParticles>,
    );
    // The children are always there; only the ground under them changes.
    expect(screen.getByText('output')).toBeInTheDocument();
    expect(screen.queryByTestId('rising-particles-backdrop')).toBeNull();
    expect(layers()).toHaveLength(0);

    rerender(
      <RisingParticles active>
        <p>output</p>
      </RisingParticles>,
    );
    expect(screen.getByTestId('rising-particles-backdrop')).toBeInTheDocument();
    expect(layers()).toHaveLength(4);
    expect(layers().map((el) => el.getAttribute('data-layer'))).toEqual(['near', 'mid', 'far', 'drift']);
    // Behind the content and untouchable: nothing above it moves or changes
    // hit-testing when the state flips.
    const backdrop = screen.getByTestId('rising-particles-backdrop');
    expect(backdrop.className).toContain('pointer-events-none');
    expect(backdrop.className).toContain('-z-10');
    expect(backdrop).toHaveAttribute('aria-hidden', 'true');
  });

  it('holds the backdrop for one crossfade after deactivation, then drops it', () => {
    vi.useFakeTimers();
    const { rerender } = render(<RisingParticles active><p>output</p></RisingParticles>);
    expect(screen.getByTestId('rising-particles-backdrop')).toBeInTheDocument();

    rerender(<RisingParticles active={false}><p>output</p></RisingParticles>);
    // Still mounted, now fading — unmounting on the same tick would make the
    // sky vanish instantly, which is the one moment it is being watched.
    expect(screen.getByTestId('rising-particles-backdrop').className).toContain('opacity-0');

    act(() => { vi.advanceTimersByTime(250); });
    expect(screen.queryByTestId('rising-particles-backdrop')).toBeNull();
  });

  it('is deterministic: the same seed is the same sky, a different seed is not', () => {
    const fields = () => layers().map((el) => el.getAttribute('style'));

    const { unmount } = render(<RisingParticles active seed={42} />);
    const first = fields();
    unmount();

    render(<RisingParticles active seed={42} />);
    expect(fields()).toEqual(first);
    cleanup();

    render(<RisingParticles active seed={43} />);
    expect(fields()).not.toEqual(first);
    // …and it really is a field, not an empty variable.
    expect(first[0]).toContain('--uic-particle-shadow');
    expect(first[0]).toContain('px white');
  });

  it('scales the point counts with intensity', () => {
    const counts = () => layers().map((el) => Number(el.getAttribute('data-points')));

    render(<RisingParticles active intensity="medium" />);
    expect(counts()).toEqual([600, 200, 100, 400]);
    cleanup();

    render(<RisingParticles active intensity="low" />);
    expect(counts()).toEqual([210, 70, 35, 140]);
    cleanup();

    render(<RisingParticles active intensity="high" />);
    expect(counts()).toEqual([1050, 350, 175, 700]);
  });

  it('keeps the sky and stops the motion when the viewer asks for less of it', () => {
    setReducedMotion(true);
    render(<RisingParticles active seed={7} />);

    expect(screen.getByTestId('rising-particles-backdrop')).toHaveAttribute('data-motion', 'static');
    // The stars stay — the sky is the message — but no duration is handed to
    // the keyframe, so there is nothing for it to animate over.
    for (const layer of layers()) {
      expect(layer.getAttribute('style')).toContain('--uic-particle-shadow');
      expect(layer.getAttribute('style')).not.toContain('--uic-particle-duration');
    }
  });

  it('reports its own state for a host that wants to style around it', () => {
    const { rerender } = render(<RisingParticles active={false} className="rounded-md" />);
    expect(screen.getByTestId('rising-particles')).toHaveAttribute('data-active', 'false');
    expect(screen.getByTestId('rising-particles').className).toContain('rounded-md');
    rerender(<RisingParticles active className="rounded-md" />);
    expect(screen.getByTestId('rising-particles')).toHaveAttribute('data-active', 'true');
  });
});
