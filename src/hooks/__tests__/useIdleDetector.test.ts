import { renderHook, act } from '@testing-library/react';
import { useIdleDetector } from '../useIdleDetector';

describe('useIdleDetector', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts as not idle', () => {
    const { result } = renderHook(() => useIdleDetector({ timeoutMs: 5000 }));
    expect(result.current.isIdle).toBe(false);
  });

  it('detects idle after timeout', () => {
    const { result } = renderHook(() => useIdleDetector({ timeoutMs: 5000 }));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.isIdle).toBe(true);
  });

  it('resets on user activity (mousemove)', () => {
    const { result } = renderHook(() => useIdleDetector({ timeoutMs: 5000 }));

    // Advance partway to idle
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(result.current.isIdle).toBe(false);

    // Trigger activity
    act(() => {
      window.dispatchEvent(new Event('mousemove'));
    });

    // Advance another 4000ms from activity — should not be idle yet
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(result.current.isIdle).toBe(false);

    // Advance the remaining time to go idle
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(result.current.isIdle).toBe(true);
  });

  it('resets from idle state on activity', () => {
    const { result } = renderHook(() => useIdleDetector({ timeoutMs: 5000 }));

    // Become idle
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.isIdle).toBe(true);

    // Trigger activity — should become active immediately
    act(() => {
      window.dispatchEvent(new Event('keydown'));
    });
    expect(result.current.isIdle).toBe(false);
  });

  it('uses default timeout of 2 minutes', () => {
    const { result } = renderHook(() => useIdleDetector());

    act(() => {
      vi.advanceTimersByTime(119_999);
    });
    expect(result.current.isIdle).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.isIdle).toBe(true);
  });
});
