import { render, screen } from '@testing-library/react';
import { PresenceDot } from '../PresenceDot';

describe('PresenceDot', () => {
  it('renders an online state with auto pulse and accessible label', () => {
    render(<PresenceDot state="online" />);
    const node = screen.getByTestId('presence-online');
    expect(node).toBeInTheDocument();
    // Inner dot has aria-label "Online" (default for online state)
    expect(screen.getByLabelText('Online')).toBeInTheDocument();
  });

  it('uses presence-{state} as the default testid for each state', () => {
    const states = ['online', 'away', 'busy', 'offline', 'unknown'] as const;
    for (const s of states) {
      const { unmount } = render(<PresenceDot state={s} />);
      expect(screen.getByTestId(`presence-${s}`)).toBeInTheDocument();
      unmount();
    }
  });

  it('renders a visible label when provided', () => {
    render(<PresenceDot state="away" label="Idle 5m" />);
    expect(screen.getByText('Idle 5m')).toBeInTheDocument();
  });

  it('allows overriding the aria label', () => {
    render(<PresenceDot state="busy" ariaLabel="Do not disturb" />);
    expect(screen.getByLabelText('Do not disturb')).toBeInTheDocument();
  });

  it('honors a custom testid', () => {
    render(<PresenceDot state="online" data-testid="cursor-pres" />);
    expect(screen.getByTestId('cursor-pres')).toBeInTheDocument();
  });
});
