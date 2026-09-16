import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CallInterruptedNotice } from '../CallInterruptedNotice';

afterEach(cleanup);

describe('CallInterruptedNotice', () => {
  it('states the cause under the title and keeps the actions reachable', () => {
    const onRejoin = vi.fn();
    render(
      <CallInterruptedNotice
        show
        title="Call disconnected"
        description="Connection lost after repeated retries."
        actions={<button type="button" onClick={onRejoin}>Rejoin</button>}
      />,
    );
    const card = screen.getByTestId('call-interrupted-notice');
    expect(card.textContent).toContain('Call disconnected');
    expect(card.textContent).toContain('Connection lost after repeated retries.');
    fireEvent.click(screen.getByText('Rejoin'));
    expect(onRejoin).toHaveBeenCalledTimes(1);
  });

  it('announces itself assertively — it arrives without the user acting and needs one', () => {
    render(<CallInterruptedNotice show title="Call disconnected" description="Connection lost." />);
    const card = screen.getByTestId('call-interrupted-notice');
    expect(card.getAttribute('role')).toBe('alert');
    expect(card.getAttribute('aria-live')).toBe('assertive');
  });

  it('does not truncate the cause line — that clipping is why this is a card and not the pill', () => {
    render(<CallInterruptedNotice show title="Call disconnected" description="Connection lost." />);
    const card = screen.getByTestId('call-interrupted-notice');
    expect(card.innerHTML).not.toContain('truncate');
  });

  it('paints in call chrome rather than the host theme — the stage is dark in both', () => {
    render(<CallInterruptedNotice show title="Call disconnected" description="Connection lost." />);
    expect(screen.getByTestId('call-interrupted-notice').className).toContain('bg-call-chrome');
  });

  it('renders nothing when hidden, and takes a caller testid', () => {
    const { rerender } = render(
      <CallInterruptedNotice show={false} title="Call disconnected" description="Connection lost." />,
    );
    expect(screen.queryByTestId('call-interrupted-notice')).toBeNull();
    rerender(
      <CallInterruptedNotice
        show
        title="Call disconnected"
        description="Connection lost."
        data-testid="hangout-failed-banner"
      />,
    );
    expect(screen.getByTestId('hangout-failed-banner')).toBeInTheDocument();
  });

  it('omits the action row entirely when there are no actions', () => {
    render(<CallInterruptedNotice show title="Call disconnected" description="Connection lost." />);
    expect(screen.getByTestId('call-interrupted-notice').querySelector('button')).toBeNull();
  });
});
