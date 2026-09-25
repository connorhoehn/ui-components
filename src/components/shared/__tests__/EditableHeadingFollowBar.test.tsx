import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditableHeading } from '../EditableHeading';
import { FollowBanner } from '../FollowBanner';

describe('EditableHeading', () => {
  it('commits on Enter, reverts on Escape and on an empty value', () => {
    const onCommit = vi.fn();
    render(<EditableHeading value="Auth architecture review" onCommit={onCommit} data-testid="t" />);
    fireEvent.click(screen.getByTestId('t-edit'));
    const input = screen.getByTestId('t') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '  Sign-in review ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onCommit).toHaveBeenCalledWith('Sign-in review');

    fireEvent.click(screen.getByTestId('t-edit'));
    fireEvent.change(screen.getByTestId('t'), { target: { value: 'x' } });
    fireEvent.keyDown(screen.getByTestId('t'), { key: 'Escape' });
    expect(onCommit).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('t-edit'));
    fireEvent.change(screen.getByTestId('t'), { target: { value: '   ' } });
    fireEvent.blur(screen.getByTestId('t'));
    expect(onCommit).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Auth architecture review')).toBeTruthy();
  });

  it('read-only has no pencil', () => {
    render(<EditableHeading value="T" onCommit={() => {}} readOnly data-testid="t" />);
    expect(screen.queryByTestId('t-edit')).toBeNull();
  });
});

describe('FollowBanner bar', () => {
  it('reads "Following Alice · Session flow" with Stop following', () => {
    const onStop = vi.fn();
    render(<FollowBanner name="Alice" location="Session flow" appearance="bar" autoStopOnInteract={false} onStop={onStop} data-testid="follow-bar" />);
    expect(screen.getByTestId('follow-bar').textContent).toContain('Following Alice · Session flow');
    fireEvent.click(screen.getByTestId('follow-bar-stop'));
    expect(onStop).toHaveBeenCalled();
    expect(screen.getByText('Stop following')).toBeTruthy();
  });
});
