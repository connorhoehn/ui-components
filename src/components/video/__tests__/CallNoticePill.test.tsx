import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CallNoticePill } from '../CallNoticePill';

afterEach(cleanup);

describe('CallNoticePill', () => {
  it('says one thing in one line with the action beside it, and nothing when hidden', () => {
    const onRejoin = vi.fn();
    const { rerender } = render(
      <CallNoticePill show message="Your media stopped" actions={<button type="button" onClick={onRejoin}>Rejoin</button>} />,
    );
    const pill = screen.getByTestId('call-notice');
    expect(pill.className).toContain('rounded-2xl');
    expect(pill.dataset.maxLines).toBe('2');
    expect(pill.dataset.tone).toBe('warning');
    fireEvent.click(screen.getByText('Rejoin'));
    expect(onRejoin).toHaveBeenCalledTimes(1);
    rerender(<CallNoticePill show={false} message="Your media stopped" />);
    expect(screen.queryByTestId('call-notice')).toBeNull();
  });
});
