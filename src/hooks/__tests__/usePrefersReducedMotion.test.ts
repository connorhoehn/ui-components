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

  // Ported from the app's copy of this test (frontend/src/hooks/__tests__)
  // when that fork was deleted: the app covered the FALLING edge and the
  // post-unmount case, which this suite did not.
  it('updates back to false when the query fires with matches=false', () => {
    const { mq, listeners } = mockMatchMedia(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);

    act(() => {
      mq.matches = false;
      listeners.forEach(fn => fn({ matches: false }));
    });

    expect(result.current).toBe(false);
  });

  it('removes event listener on unmount', () => {
    const { mq } = mockMatchMedia(false);
    const removeSpy = vi.fn();
    mq.removeEventListener = removeSpy;
    const { unmount } = renderHook(() => usePrefersReducedMotion());
    unmount();
    expect(removeSpy).toHaveBeenCalled();
  });

  it('does not update state after unmount', () => {
    const { mq, listeners } = mockMatchMedia(false);
    const { result, unmount } = renderHook(() => usePrefersReducedMotion());
    unmount();

    act(() => {
      mq.matches = true;
      listeners.forEach(fn => fn({ matches: true }));
    });

    expect(result.current).toBe(false);
  });
});
