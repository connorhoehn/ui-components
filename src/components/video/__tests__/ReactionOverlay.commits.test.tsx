// ReactionOverlay — commit-count guard for the 3s expiry sweep.
//
// The sweep runs on a 500ms interval for the whole life of a call. It used to
// call `setFloating(prev => prev.filter(...))` unconditionally, and `filter`
// always allocates a new array — so React committed a new render of the
// overlay twice a second forever, even sitting over an idle video stage with
// zero reactions on screen. `<Profiler>` counts actual commits, so this test
// measures the thing that matters rather than asserting on the source.

import { Profiler, type ProfilerOnRenderCallback } from 'react';
import { render, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ReactionOverlay } from '../ReactionOverlay';

describe('ReactionOverlay commit count', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  function renderCounted(reactions: Parameters<typeof ReactionOverlay>[0]['reactions']) {
    let commits = 0;
    const onRender: ProfilerOnRenderCallback = () => { commits += 1; };
    render(
      <Profiler id="overlay" onRender={onRender}>
        <ReactionOverlay reactions={reactions} />
      </Profiler>,
    );
    return { commits: () => commits };
  }

  it('does not commit on the expiry sweep when there is nothing to expire', () => {
    const { commits } = renderCounted([]);
    const afterMount = commits();

    // 10 seconds = 20 sweep ticks.
    act(() => { vi.advanceTimersByTime(10_000); });

    expect(commits()).toBe(afterMount);
  });

  it('still commits when a reaction expires, then goes quiet again', () => {
    const { commits } = renderCounted([{ id: 'r1', emoji: '🎉', userId: 'u1' }]);
    const afterMount = commits();

    // Past the 3s lifetime — the sweep must drop it, which is a real change.
    act(() => { vi.advanceTimersByTime(5_000); });
    expect(commits()).toBeGreaterThan(afterMount);

    // One settling window: React renders a bailing-out component once more
    // after a real state change before it stops scheduling for it.
    act(() => { vi.advanceTimersByTime(2_000); });
    const settled = commits();

    // From here the overlay must stop committing entirely rather than
    // churning every 500ms. Before the fix this climbed by 2 per second
    // indefinitely — 22 commits over the first 10s, vs 5 total now.
    act(() => { vi.advanceTimersByTime(30_000); });
    expect(commits()).toBe(settled);
  });
});
