import { renderHook, act } from '@testing-library/react';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

// Helper to mock window.matchMedia with a specific result.
function mockMatchMedia(matches: boolean) {
  const listeners: ((e: { matches: boolean }) => void)[] = [];
  const mq = {
    matches,
    addEventListener: (_: string, handler: (e: { matches: boolean }) => void) => {
      listeners.push(handler);
    },
    removeEventListener: (_: string, handler: (e: { matches: boolean }) => void) => {
      const idx = listeners.indexOf(handler);
      if (idx >= 0) listeners.splice(idx, 1);
    },
  };
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: () => mq,
  });
  return { mq, listeners };
}

describe('usePrefersReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when prefers-reduced-motion does not match', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when prefers-reduced-motion matches', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it('updates when the media query fires a change event', () => {
    const { mq, listeners } = mockMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      mq.matches = true;
      listeners.forEach(fn => fn({ matches: true }));
    });

    expect(result.current).toBe(true);
  });

  it('removes event listener on unmount', () => {
    const { mq } = mockMatchMedia(false);
    const removeSpy = vi.fn();
    mq.removeEventListener = removeSpy;
    const { unmount } = renderHook(() => usePrefersReducedMotion());
    unmount();
    expect(removeSpy).toHaveBeenCalled();
  });
});
