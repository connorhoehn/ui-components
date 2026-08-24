import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useEventCallback } from '../useEventCallback';

describe('useEventCallback', () => {
  it('keeps a stable identity across re-renders with a new callback each time', () => {
    const { result, rerender } = renderHook(
      ({ cb }) => useEventCallback(cb),
      { initialProps: { cb: () => 'a' } },
    );
    const first = result.current;
    rerender({ cb: () => 'b' });
    rerender({ cb: () => 'c' });
    // Identity stable — this is what makes it safe in a dependency array.
    expect(result.current).toBe(first);
  });

  it('always invokes the LATEST callback, so no stale closure is captured', () => {
    const { result, rerender } = renderHook(
      ({ cb }) => useEventCallback(cb),
      { initialProps: { cb: () => 'first' } },
    );
    const stable = result.current;
    rerender({ cb: () => 'second' });
    // Called through the ORIGINAL reference, as an effect would.
    expect(stable()).toBe('second');
  });

  it('forwards arguments and tolerates an undefined callback', () => {
    const spy = vi.fn((a: number, b: number) => a + b);
    const { result, rerender } = renderHook(
      ({ cb }) => useEventCallback<[number, number], number>(cb),
      { initialProps: { cb: spy as ((a: number, b: number) => number) | undefined } },
    );
    expect(result.current(2, 3)).toBe(5);
    expect(spy).toHaveBeenCalledWith(2, 3);

    rerender({ cb: undefined });
    act(() => { expect(result.current(1, 1)).toBeUndefined(); });
  });
});
