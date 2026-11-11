// A long notice is never silently lost: it wraps to `maxLines`, and past that
// the full text is a tooltip on hover and on keyboard focus.

import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CallNoticePill } from '../CallNoticePill';

const LONG = 'The host made you view-only: Too much background noise from the construction next door, please mute until it stops';

/** Lay the message out as cut (its content taller than its clamped box) or as fitting. */
function layout(cut: boolean) {
  vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(function (this: HTMLElement) {
    return this.dataset.testid === 'call-notice-message' && cut ? 48 : 32;
  });
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 32);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('CallNoticePill — long text', () => {
  it('wraps to two lines by default, rounded rather than a one-line capsule', () => {
    layout(false);
    render(<CallNoticePill show message={LONG} />);
    const message = screen.getByTestId('call-notice-message');
    expect(message.className).toContain('line-clamp-2');
    expect(message.className).not.toContain('truncate');
    expect(screen.getByTestId('call-notice')).not.toHaveAttribute('data-truncated');
    // Fits in two lines: nothing extra to reach.
    expect(message).not.toHaveAttribute('tabindex');
  });

  it('cut at its line limit: the message is focusable and the tooltip shows the full text on focus', () => {
    layout(true);
    render(<CallNoticePill show message={LONG} />);
    const pill = screen.getByTestId('call-notice');
    const message = screen.getByTestId('call-notice-message');
    expect(pill).toHaveAttribute('data-truncated', 'true');
    expect(message).toHaveAttribute('tabindex', '0');
    act(() => { message.focus(); });
    expect(screen.getByRole('tooltip')).toHaveTextContent(LONG);
    expect(message.className).toMatch(/focus-visible:outline-2/);
  });

  it('cut: hovering shows the full text too', () => {
    layout(true);
    vi.useFakeTimers();
    render(<CallNoticePill show message={LONG} />);
    fireEvent.mouseEnter(screen.getByTestId('call-notice-message'));
    act(() => { vi.advanceTimersByTime(400); });
    expect(screen.getByRole('tooltip')).toHaveTextContent(LONG);
  });

  it('the status region always holds the whole message for a screen reader', () => {
    layout(true);
    render(<CallNoticePill show message={LONG} />);
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(LONG);
  });

  it('not cut: no tooltip on hover', () => {
    layout(false);
    vi.useFakeTimers();
    render(<CallNoticePill show message="Reconnecting…" />);
    fireEvent.mouseEnter(screen.getByTestId('call-notice-message'));
    act(() => { vi.advanceTimersByTime(400); });
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('maxLines={1} is the single truncating line, still with the full text on focus when cut', () => {
    layout(true);
    render(<CallNoticePill show maxLines={1} message={LONG} />);
    const message = screen.getByTestId('call-notice-message');
    expect(message.className).toContain('truncate');
    expect(screen.getByTestId('call-notice').className).toContain('rounded-full');
    act(() => { message.focus(); });
    expect(screen.getByRole('tooltip')).toHaveTextContent(LONG);
  });

  it('each tone paints an ink that clears AA on its fill in both themes', () => {
    layout(false);
    const { rerender } = render(<CallNoticePill show tone="warning" message="Reconnecting…" />);
    expect(screen.getByTestId('call-notice').className).toContain('text-call-chrome');
    rerender(<CallNoticePill show tone="error" message="Lost the call" />);
    expect(screen.getByTestId('call-notice').className).toContain('text-on-danger');
    rerender(<CallNoticePill show tone="info" message="Recording" />);
    expect(screen.getByTestId('call-notice').className).toContain('text-white');
  });
});
