// Three lifecycle bugs from the v2.82.0 leak audit that were reported but
// deferred because each changes behaviour. Each current behaviour is
// clearly unintended, so they are fixed here — these pin the fixes.

import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CallStartedBanner } from '../CallStartedBanner';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('CallStartedBanner auto-expire', () => {
  it('expires on schedule even when the parent re-renders with a new onDismiss identity', () => {
    const onDismiss = vi.fn();
    // A caller passing an inline arrow is the common case; it used to be an
    // effect dependency, so each parent render restarted the timer and the
    // banner never expired.
    const { rerender } = render(
      <CallStartedBanner
        callerName="Ada"
        autoExpireSec={30}
        onDismiss={() => onDismiss()}
      />,
    );

    // Re-render repeatedly across the window, as a live call UI would.
    for (let i = 0; i < 5; i++) {
      act(() => { vi.advanceTimersByTime(5_000); });
      rerender(
        <CallStartedBanner
          callerName="Ada"
          autoExpireSec={30}
          onDismiss={() => onDismiss()}
        />,
      );
    }
    act(() => { vi.advanceTimersByTime(6_000); });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not fire before its window elapses', () => {
    const onDismiss = vi.fn();
    render(<CallStartedBanner callerName="Ada" autoExpireSec={30} onDismiss={onDismiss} />);
    act(() => { vi.advanceTimersByTime(29_000); });
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
