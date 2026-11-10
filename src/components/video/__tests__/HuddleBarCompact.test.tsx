// HuddleBar `compact` (2.519.0): icon-only Start and Join for a phone-width
// footer, with the label as the accessible name and a tooltip.
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HuddleBar } from '../HuddleBar';

afterEach(cleanup);

describe('HuddleBar compact', () => {
  it('idle: Start is an icon button named by its label, no visible text', () => {
    const onStart = vi.fn();
    render(<HuddleBar name="Atlas" phase="idle" compact onStart={onStart} />);
    expect(screen.getByTestId('huddle-bar')).toHaveAttribute('data-compact');
    const start = screen.getByRole('button', { name: 'Huddle' });
    expect(start).toHaveTextContent('');
    expect(start.querySelector('svg')).not.toBeNull();
    fireEvent.click(start);
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('the label is the tooltip; a disabled reason replaces it and disables the button', () => {
    const { rerender } = render(<HuddleBar name="Atlas" phase="idle" compact onStart={() => {}} startLabel="Call" />);
    fireEvent.focus(screen.getByRole('button', { name: 'Call' }));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Call');
    rerender(<HuddleBar name="Atlas" phase="idle" compact onStart={() => {}} startDisabledReason="Calls are off here" />);
    expect(screen.getByRole('button', { name: 'Huddle' })).toBeDisabled();
  });

  it('joinable: Join is an icon button named "Join <name> huddle"', () => {
    const onJoin = vi.fn();
    render(<HuddleBar name="Standup" phase="joinable" compact onJoin={onJoin} liveParticipants={[{ id: 'a', displayName: 'Ada' }]} />);
    const join = screen.getByRole('button', { name: 'Join Standup huddle' });
    expect(join).toHaveTextContent('');
    fireEvent.click(join);
    expect(onJoin).toHaveBeenCalledTimes(1);
  });

  it('default (not compact) keeps the labelled buttons', () => {
    render(<HuddleBar name="Atlas" phase="idle" onStart={() => {}} />);
    expect(screen.getByTestId('huddle-bar')).not.toHaveAttribute('data-compact');
    expect(screen.getByTestId('huddle-bar-start')).toHaveTextContent('Huddle');
  });
});
