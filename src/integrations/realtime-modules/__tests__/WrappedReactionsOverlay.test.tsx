import { render, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { WrappedReactionsOverlay } from '../WrappedReactionsOverlay';
import type { RMReaction, RMUseReactionsReturn } from '../types';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function makeReaction(id: string, emoji = '🎉'): RMReaction {
  return {
    id,
    clientId: 'c1',
    channel: 'room-1',
    emoji,
    effect: 'float',
    position: null,
    metadata: {},
    timestamp: new Date().toISOString(),
  };
}

function hook(reactions: RMReaction[]): RMUseReactionsReturn {
  return { reactions, react: vi.fn() };
}

/** Count rendered reaction emoji nodes (ReactionsOverlay renders one span each). */
const visibleCount = (c: HTMLElement) => c.querySelectorAll('span').length;

describe('WrappedReactionsOverlay', () => {
  it('expires every reaction in a burst, not just the last one', () => {
    // A burst arriving faster than ttlMs. The overlay re-runs its effect on
    // each new reaction; previously the effect's cleanup cancelled the
    // PREVIOUS reaction's expiry timer, so only the final one was ever
    // removed and the rest accumulated for the life of the mount.
    const { container, rerender } = render(
      <WrappedReactionsOverlay reactions={hook([makeReaction('r1')])} ttlMs={2500} />,
    );

    act(() => { vi.advanceTimersByTime(200); });
    rerender(
      <WrappedReactionsOverlay
        reactions={hook([makeReaction('r1'), makeReaction('r2')])}
        ttlMs={2500}
      />,
    );

    act(() => { vi.advanceTimersByTime(200); });
    rerender(
      <WrappedReactionsOverlay
        reactions={hook([makeReaction('r1'), makeReaction('r2'), makeReaction('r3')])}
        ttlMs={2500}
      />,
    );

    expect(visibleCount(container)).toBe(3);

    // Well past ttlMs for all three.
    act(() => { vi.advanceTimersByTime(5000); });

    expect(visibleCount(container)).toBe(0);
  });

  it('clears pending expiry timers on unmount', () => {
    const { unmount } = render(
      <WrappedReactionsOverlay reactions={hook([makeReaction('r1')])} ttlMs={2500} />,
    );

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
