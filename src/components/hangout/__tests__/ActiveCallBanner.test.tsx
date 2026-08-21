import { render, screen, fireEvent } from '@testing-library/react';
import { ActiveCallBanner } from '../ActiveCallBanner';

describe('ActiveCallBanner', () => {
  const onJoin = vi.fn();
  const onDismiss = vi.fn();

  beforeEach(() => {
    onJoin.mockClear();
    onDismiss.mockClear();
  });

  const baseProps = {
    open: true,
    onJoin,
    onDismiss,
    lobbyLabel: 'global-hangout',
    elapsedMs: 65_000,
    participants: [
      { userId: 'u-alice', name: 'Alice' },
      { userId: 'u-bob', name: 'Bob' },
    ],
  };

  it('renders nothing when closed', () => {
    render(<ActiveCallBanner {...baseProps} open={false} />);
    expect(screen.queryByTestId('active-call-banner')).toBeNull();
  });

  it('shows lobby, count, elapsed, and participant chips', () => {
    render(<ActiveCallBanner {...baseProps} />);
    expect(screen.getByTestId('active-call-banner')).toHaveAttribute(
      'data-lobby-name',
      'global-hangout',
    );
    expect(screen.getByTestId('active-call-count')).toHaveTextContent('2 people in call');
    expect(screen.getByTestId('active-call-elapsed')).toHaveTextContent('01:05');
    expect(screen.getAllByTestId('active-call-participant')).toHaveLength(2);
  });

  it('participantCount overrides participants.length', () => {
    render(<ActiveCallBanner {...baseProps} participantCount={5} />);
    expect(screen.getByTestId('active-call-count')).toHaveTextContent('5 people in call');
  });

  it('hides the elapsed chip when elapsedMs is absent', () => {
    render(<ActiveCallBanner {...baseProps} elapsedMs={0} />);
    expect(screen.queryByTestId('active-call-elapsed')).toBeNull();
  });

  it('wires Join and Not now', () => {
    render(<ActiveCallBanner {...baseProps} />);
    fireEvent.click(screen.getByTestId('active-call-join'));
    expect(onJoin).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('active-call-dismiss'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('disables both buttons and swaps the Join label while loading', () => {
    render(<ActiveCallBanner {...baseProps} loading />);
    const join = screen.getByTestId('active-call-join');
    expect(join).toBeDisabled();
    expect(join).toHaveTextContent('Joining…');
    expect(screen.getByTestId('active-call-dismiss')).toBeDisabled();
  });
});
