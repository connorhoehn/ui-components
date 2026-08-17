import { render, screen, fireEvent } from '@testing-library/react';
import CircularIconToggle from '../CircularIconToggle';

describe('CircularIconToggle', () => {
  it('renders the ON icon and aria-pressed=true when on', () => {
    render(
      <CircularIconToggle
        on
        iconOn={<span data-testid="on-icon" />}
        iconOff={<span data-testid="off-icon" />}
        aria-label="Microphone"
      />,
    );
    expect(screen.getByRole('button', { name: 'Microphone' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('on-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('off-icon')).not.toBeInTheDocument();
  });

  it('renders the OFF icon and aria-pressed=false when not on', () => {
    render(
      <CircularIconToggle
        on={false}
        iconOn={<span data-testid="on-icon" />}
        iconOff={<span data-testid="off-icon" />}
        aria-label="Microphone"
      />,
    );
    expect(screen.getByRole('button', { name: 'Microphone' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('off-icon')).toBeInTheDocument();
  });

  it('forwards onClick', () => {
    const onClick = vi.fn();
    render(
      <CircularIconToggle
        on
        iconOn={<span />}
        iconOff={<span />}
        aria-label="Mic"
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('respects disabled', () => {
    const onClick = vi.fn();
    render(
      <CircularIconToggle
        on
        iconOn={<span />}
        iconOff={<span />}
        aria-label="Mic"
        disabled
        onClick={onClick}
      />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('uses neutral OFF palette when offTone="neutral"', () => {
    render(
      <CircularIconToggle
        on={false}
        iconOn={<span />}
        iconOff={<span />}
        aria-label="Mic"
        offTone="neutral"
      />,
    );
    expect(screen.getByRole('button').className).toMatch(/bg-surface-hover/);
    expect(screen.getByRole('button').className).not.toMatch(/bg-red-/);
  });
});
