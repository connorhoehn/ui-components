import { render, screen, fireEvent, act } from '@testing-library/react';
import { ResumeCallDialog } from '../ResumeCallDialog';

describe('ResumeCallDialog', () => {
  const onClose = vi.fn();
  const onReconnect = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
    onReconnect.mockClear();
  });

  it('does not render when closed', () => {
    render(
      <ResumeCallDialog
        open={false}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob"
        lobbyName="dm:bob|hank"
        elapsedMs={5000}
        participants={[]}
      />,
    );
    expect(screen.queryByTestId('resume-call-dialog')).not.toBeInTheDocument();
  });

  it('renders caller + lobby + dismiss + reconnect buttons when open', () => {
    render(
      <ResumeCallDialog
        open={true}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob Johnson"
        lobbyName="dm:bob|hank"
        elapsedMs={5000}
        participants={[{ userId: 'bob', name: 'Bob Johnson' }]}
      />,
    );
    expect(screen.getByText('Reconnect to your call?')).toBeInTheDocument();
    // "Bob Johnson" appears both in the caller sentence and the chip — match all.
    expect(screen.getAllByText('Bob Johnson').length).toBeGreaterThan(0);
    expect(screen.getByText('dm:bob|hank')).toBeInTheDocument();
    expect(screen.getByTestId('resume-call-dismiss')).toBeInTheDocument();
    expect(screen.getByTestId('resume-call-reconnect')).toBeInTheDocument();
  });

  it('renders one participant chip with the participant data', () => {
    render(
      <ResumeCallDialog
        open={true}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob"
        lobbyName="dm:bob|hank"
        elapsedMs={1000}
        participants={[{ userId: 'bob', name: 'Bob Johnson' }]}
      />,
    );
    const chips = screen.getAllByTestId('resume-call-participant');
    expect(chips).toHaveLength(1);
    expect(chips[0]).toHaveAttribute('data-participant-id', 'bob');
    expect(chips[0]).toHaveAttribute('data-participant-name', 'Bob Johnson');
  });

  it('renders multiple participant chips in passed order', () => {
    render(
      <ResumeCallDialog
        open={true}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob"
        lobbyName="group:abc"
        elapsedMs={1000}
        participants={[
          { userId: 'bob', name: 'Bob' },
          { userId: 'carol', name: 'Carol' },
          { userId: 'dave', name: 'Dave' },
        ]}
      />,
    );
    const chips = screen.getAllByTestId('resume-call-participant');
    expect(chips).toHaveLength(3);
    expect(chips.map((c) => c.getAttribute('data-participant-id'))).toEqual([
      'bob',
      'carol',
      'dave',
    ]);
  });

  it('renders dialog even with zero participants (no chip row rendered)', () => {
    render(
      <ResumeCallDialog
        open={true}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob"
        lobbyName="dm:bob|hank"
        elapsedMs={1000}
        participants={[]}
      />,
    );
    expect(screen.getByTestId('resume-call-dialog')).toBeInTheDocument();
    expect(screen.queryAllByTestId('resume-call-participant')).toHaveLength(0);
  });

  it('fires onReconnect when the Reconnect button is clicked', () => {
    render(
      <ResumeCallDialog
        open={true}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob"
        lobbyName="dm:bob|hank"
        elapsedMs={1000}
        participants={[{ userId: 'bob', name: 'Bob' }]}
      />,
    );
    fireEvent.click(screen.getByTestId('resume-call-reconnect'));
    expect(onReconnect).toHaveBeenCalledTimes(1);
  });

  it('fires onClose when the Dismiss button is clicked', () => {
    render(
      <ResumeCallDialog
        open={true}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob"
        lobbyName="dm:bob|hank"
        elapsedMs={1000}
        participants={[]}
      />,
    );
    fireEvent.click(screen.getByTestId('resume-call-dismiss'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('disables both buttons when loading=true and shows Reconnecting…', () => {
    render(
      <ResumeCallDialog
        open={true}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob"
        lobbyName="dm:bob|hank"
        elapsedMs={1000}
        participants={[]}
        loading={true}
      />,
    );
    expect(screen.getByTestId('resume-call-reconnect')).toBeDisabled();
    expect(screen.getByTestId('resume-call-dismiss')).toBeDisabled();
    expect(screen.getByText('Reconnecting…')).toBeInTheDocument();
  });

  it('renders an initial elapsed value formatted as MM:SS', () => {
    render(
      <ResumeCallDialog
        open={true}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob"
        lobbyName="dm:bob|hank"
        elapsedMs={75_000} // 1m 15s
        participants={[]}
      />,
    );
    // Anchored at mount → display starts at 1:15.
    expect(screen.getByTestId('resume-call-elapsed').textContent).toBe('01:15');
  });

  it('live-ticks the elapsed counter via setInterval', () => {
    vi.useFakeTimers();
    try {
      render(
        <ResumeCallDialog
          open={true}
          onClose={onClose}
          onReconnect={onReconnect}
          callerName="Bob"
          lobbyName="dm:bob|hank"
          elapsedMs={0}
          participants={[]}
        />,
      );
      expect(screen.getByTestId('resume-call-elapsed').textContent).toBe('00:00');
      act(() => {
        vi.advanceTimersByTime(2_000);
      });
      // After ~2s wall-clock advance, the counter should show 00:02.
      expect(screen.getByTestId('resume-call-elapsed').textContent).toBe('00:02');
    } finally {
      vi.useRealTimers();
    }
  });

  it('formats hour-long elapsed times as H:MM:SS', () => {
    render(
      <ResumeCallDialog
        open={true}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob"
        lobbyName="dm:bob|hank"
        elapsedMs={3_725_000} // 1h 2m 5s
        participants={[]}
      />,
    );
    expect(screen.getByTestId('resume-call-elapsed').textContent).toBe('1:02:05');
  });

  it('renders an avatar URL when provided (img element)', () => {
    render(
      <ResumeCallDialog
        open={true}
        onClose={onClose}
        onReconnect={onReconnect}
        callerName="Bob"
        lobbyName="dm:bob|hank"
        elapsedMs={0}
        participants={[
          { userId: 'bob', name: 'Bob', avatarUrl: 'https://example.com/b.png' },
        ]}
      />,
    );
    const img = screen.getByAltText('Bob') as HTMLImageElement;
    expect(img.src).toContain('https://example.com/b.png');
  });
});
