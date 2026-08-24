// "Auto-refresh (10s)" is a checkbox this page advertises in its own UI.
// The interval that backs it depended on `onRefresh` — a required prop that
// callers pass inline — so every parent render tore the interval down and
// started a new one. Since `onRefresh` fetches, and fetching re-renders the
// parent, the clock reset on its own results too. For most callers it never
// fired once.

import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DiagnosticsPage } from '../DiagnosticsPage';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

function renderPage(onRefresh: () => void) {
  const props = {
    onRedrive: vi.fn().mockResolvedValue(undefined),
    onPurge: vi.fn().mockResolvedValue(undefined),
    onRefresh,
  };
  const utils = render(<DiagnosticsPage {...props} />);
  return { ...utils, props };
}

describe('DiagnosticsPage auto-refresh', () => {
  it('keeps ticking even when the parent re-renders with a new onRefresh identity', () => {
    const spy = vi.fn();
    const { rerender } = renderPage(() => spy());

    fireEvent.click(screen.getByRole('checkbox'));

    // Re-render every 4s, as a page that refetches would. Crucially the
    // clock is NEVER allowed to run 10s without a re-render in between —
    // that is what makes this catch the bug rather than accidentally
    // letting a freshly-created interval fire at the end.
    for (let i = 0; i < 10; i++) {
      act(() => { vi.advanceTimersByTime(4_000); });
      rerender(
        <DiagnosticsPage
          onRedrive={vi.fn()} onPurge={vi.fn()} onRefresh={() => spy()}
        />,
      );
    }
    // 40s elapsed => ~4 ticks are due. With the interval restarting on every
    // render it would be exactly 0.
    expect(spy.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  it('does not tick while auto-refresh is off', () => {
    const spy = vi.fn();
    renderPage(spy);
    act(() => { vi.advanceTimersByTime(60_000); });
    expect(spy).not.toHaveBeenCalled();
  });

  it('stops ticking when auto-refresh is switched back off', () => {
    const spy = vi.fn();
    renderPage(spy);
    const box = screen.getByRole('checkbox');
    fireEvent.click(box);
    act(() => { vi.advanceTimersByTime(25_000); });
    const afterOn = spy.mock.calls.length;
    expect(afterOn).toBeGreaterThan(0);
    fireEvent.click(box);
    act(() => { vi.advanceTimersByTime(60_000); });
    expect(spy.mock.calls.length).toBe(afterOn);
  });
});
