import { render, screen, fireEvent } from '@testing-library/react';
import { UserChip } from '../UserChip';

describe('UserChip', () => {
  it('renders the user name by default', () => {
    render(<UserChip name="Alice Wong" />);
    expect(screen.getByText('Alice Wong')).toBeInTheDocument();
    expect(screen.getByTestId('user-chip')).toBeInTheDocument();
  });

  it('prefers explicit label over name for display text', () => {
    render(<UserChip name="Alice Wong" label="@alice" />);
    expect(screen.getByText('@alice')).toBeInTheDocument();
    expect(screen.queryByText('Alice Wong')).not.toBeInTheDocument();
  });

  it('renders a presence dot when presence is provided', () => {
    render(<UserChip name="Alice" presence="online" />);
    expect(screen.getByTestId('presence-online')).toBeInTheDocument();
  });

  it('renders as a button and fires onClick when interactive', () => {
    const onClick = vi.fn();
    render(<UserChip name="Alice" onClick={onClick} />);
    const chip = screen.getByTestId('user-chip');
    expect(chip.tagName).toBe('BUTTON');
    fireEvent.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a span (non-interactive) when no onClick', () => {
    render(<UserChip name="Alice" />);
    const chip = screen.getByTestId('user-chip');
    expect(chip.tagName).toBe('SPAN');
  });

  it('honors a custom testid', () => {
    render(<UserChip name="Alice" data-testid="mention-alice" />);
    expect(screen.getByTestId('mention-alice')).toBeInTheDocument();
  });

  it('takes classes on the name label alone, so a narrow column can keep the avatar', () => {
    render(<UserChip name="Alice" labelClassName="hidden @2xl:inline" />);
    const chip = screen.getByTestId('user-chip');
    // The name is still the chip's title — an avatar alone must still say who.
    expect(chip).toHaveAttribute('title', 'Alice');
    const label = screen.getByText('Alice');
    expect(label).toHaveClass('hidden', '@2xl:inline');
    expect(chip).not.toHaveClass('hidden');
  });
});
