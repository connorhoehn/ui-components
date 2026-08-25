import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { PlaybackReactionsLayer, type TimedReaction } from '../PlaybackReactionsLayer';

// The layer fires reactions as the playhead crosses their offsets and
// drains them onto ReactionOverlay one per 200ms tick. Tests drive
// `currentTimeMs` by rerendering (as a player's timeupdate would) and
// advance fake timers to let the drain interval surface floats.

const REACTIONS: TimedReaction[] = [
  { id: 'r1', emoji: '👍', offsetMs: 1_000, displayName: 'Hank' },
  { id: 'r2', emoji: '🔥', offsetMs: 5_000 },
  { id: 'r3', emoji: '🎉', offsetMs: 5_200 },
  { id: 'r4', emoji: '❤️', offsetMs: 9_000 },
  { id: 'r5', emoji: '😮', offsetMs: 9_100 },
  { id: 'r6', emoji: '💯', offsetMs: 9_200 },
  { id: 'r7', emoji: '🚀', offsetMs: 9_300 },
];

function setup(initialTimeMs = 0) {
  const result = render(
    <PlaybackReactionsLayer reactions={REACTIONS} currentTimeMs={initialTimeMs} />,
  );
  const seek = (timeMs: number) =>
    act(() => {
      result.rerender(
        <PlaybackReactionsLayer reactions={REACTIONS} currentTimeMs={timeMs} />,
      );
    });
  const tick = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
  return { seek, tick };
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('PlaybackReactionsLayer', () => {
  it('renders no floats before the playhead reaches any offset', () => {
    const { seek, tick } = setup(0);
    seek(500);
    tick(1_000);
    expect(screen.queryAllByTestId('reaction-float')).toHaveLength(0);
  });

  it('fires a reaction when the playhead crosses its offset', () => {
    const { seek, tick } = setup(0);
    seek(1_500);
    tick(250);
    const floats = screen.getAllByTestId('reaction-float');
    expect(floats).toHaveLength(1);
    expect(floats[0].textContent).toBe('👍');
  });

  it('close-together reactions each get their own float (drain, not collapse)', () => {
    const { seek, tick } = setup(4_000);
    seek(6_000); // crosses r2 (🔥) and r3 (🎉)
    tick(250);
    expect(screen.getAllByTestId('reaction-float')).toHaveLength(1);
    tick(200);
    const floats = screen.getAllByTestId('reaction-float');
    expect(floats).toHaveLength(2);
    expect(floats.map(f => f.textContent)).toEqual(['🔥', '🎉']);
  });

  it('does not refire on ordinary forward progress past a fired offset', () => {
    const { seek, tick } = setup(0);
    seek(1_500);
    tick(250);
    seek(2_000);
    seek(3_000);
    tick(1_000);
    expect(screen.getAllByTestId('reaction-float')).toHaveLength(1);
  });

  it('caps a big forward seek to the last few skipped reactions', () => {
    const { seek, tick } = setup(8_500);
    seek(10_000); // crosses r4..r7 (4 reactions) — cap is 3
    // Drain ticks must advance separately: a single big advance runs all
    // interval callbacks inside one act() → React batches the setFeed
    // calls into one render and ReactionOverlay (which animates per array
    // CHANGE) floats only the newest. Real time drains one per macrotask.
    tick(250);
    tick(200);
    tick(200);
    tick(200);
    const floats = screen.getAllByTestId('reaction-float');
    expect(floats).toHaveLength(3);
    // The LAST three before the new playhead survive the cap.
    expect(floats.map(f => f.textContent)).toEqual(['😮', '💯', '🚀']);
  });

  it('seeking backward replays a reaction on rewatch', () => {
    const { seek, tick } = setup(0);
    seek(1_500);
    tick(250);
    expect(screen.getAllByTestId('reaction-float')).toHaveLength(1);
    // 3s float lifetime — let the first float expire so the count below
    // unambiguously comes from the replay.
    tick(3_500);
    expect(screen.queryAllByTestId('reaction-float')).toHaveLength(0);
    seek(200); // rewind (backward > 1.5s threshold)
    seek(1_500); // replay across r1
    tick(250);
    expect(screen.getAllByTestId('reaction-float')).toHaveLength(1);
  });
});
