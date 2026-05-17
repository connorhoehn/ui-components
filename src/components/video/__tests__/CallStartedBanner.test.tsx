import { render, screen, fireEvent, act } from '@testing-library/react';
import { CallStartedBanner } from '../CallStartedBanner';

describe('CallStartedBanner', () => {
  it('renders the "started a call" copy by default', () => {
    render(<CallStartedBanner callerName="Alice" autoExpireSec={0} />);
    expect(screen.getByText('Alice started a call')).toBeInTheDocument();
  });

  it('renders the "is calling you" copy when mode=calling', () => {
    render(<CallStartedBanner callerName="Alice" mode="calling" autoExpireSec={0} />);
    expect(screen.getByText('Alice is calling you')).toBeInTheDocument();
  });

  it('renders the optional context line', () => {
    render(
      <CallStartedBanner callerName="Alice" context="in #general" autoExpireSec={0} />,
    );
    expect(screen.getByText('in #general')).toBeInTheDocument();
  });

  it('omits the context line when context is not supplied', () => {
    const { container } = render(
      <CallStartedBanner callerName="Alice" autoExpireSec={0} />,
    );
    // Only one <p> for the headline, no second <p>.
    expect(container.querySelectorAll('p')).toHaveLength(1);
  });

  it('omits the Join button when onJoin is not provided', () => {
    render(<CallStartedBanner callerName="Alice" autoExpireSec={0} />);
    expect(screen.queryByRole('button', { name: /join call/i })).toBeNull();
  });

  it('omits the Dismiss button when onDismiss is not provided', () => {
    render(<CallStartedBanner callerName="Alice" autoExpireSec={0} />);
    expect(screen.queryByRole('button', { name: /dismiss call/i })).toBeNull();
  });

  it('fires onJoin and self-hides on Join click', () => {
    const onJoin = vi.fn();
    render(
      <CallStartedBanner callerName="Alice" onJoin={onJoin} autoExpireSec={0} />,
    );
    fireEvent.click(screen.getByRole('button', { name: /join call/i }));
    expect(onJoin).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Alice started a call')).toBeNull();
  });

  it('fires onDismiss and self-hides on Dismiss click', () => {
    const onDismiss = vi.fn();
    render(
      <CallStartedBanner callerName="Alice" onDismiss={onDismiss} autoExpireSec={0} />,
    );
    fireEvent.click(screen.getByRole('button', { name: /dismiss call/i }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Alice started a call')).toBeNull();
  });

  it('renders the avatar image when callerAvatarUrl is supplied', () => {
    const { container } = render(
      <CallStartedBanner
        callerName="Alice"
        callerAvatarUrl="https://example.com/a.png"
        autoExpireSec={0}
      />,
    );
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('https://example.com/a.png');
  });

  it('renders initials fallback when no avatarUrl is supplied', () => {
    render(<CallStartedBanner callerName="Alice Cooper" autoExpireSec={0} />);
    expect(screen.getByText('AC')).toBeInTheDocument();
  });

  it('auto-expires after autoExpireSec seconds and fires onDismiss', () => {
    vi.useFakeTimers();
    try {
      const onDismiss = vi.fn();
      render(
        <CallStartedBanner
          callerName="Alice"
          onDismiss={onDismiss}
          autoExpireSec={2}
        />,
      );
      expect(screen.getByText('Alice started a call')).toBeInTheDocument();
      act(() => { vi.advanceTimersByTime(2000); });
      expect(onDismiss).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('Alice started a call')).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not auto-expire when autoExpireSec is 0', () => {
    vi.useFakeTimers();
    try {
      render(
        <CallStartedBanner callerName="Alice" autoExpireSec={0} />,
      );
      act(() => { vi.advanceTimersByTime(60_000); });
      expect(screen.getByText('Alice started a call')).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
