import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HuddleBar } from '../HuddleBar';

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe('HuddleBar', () => {
  it('shows status, name, joined and ringing counts apart', () => {
    render(<HuddleBar name="Standup" participantCount={3} ringingCount={1} onLeave={() => {}} />);
    expect(screen.getByTestId('huddle-bar-name')).toHaveTextContent('Standup');
    expect(screen.getByTestId('huddle-bar')).toHaveAttribute('data-phase', 'live');
    expect(screen.getByTestId('huddle-bar-people')).toHaveTextContent('3 joined · 1 ringing');
  });

  it('ticks the timer while live and not otherwise', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-06T10:00:00Z'));
    const startedAt = Date.parse('2026-10-06T09:55:00Z');
    const { rerender } = render(<HuddleBar name="x" startedAt={startedAt} onLeave={() => {}} />);
    expect(screen.getByTestId('huddle-bar-timer')).toHaveTextContent('05:00');
    act(() => { vi.advanceTimersByTime(3000); });
    expect(screen.getByTestId('huddle-bar-timer')).toHaveTextContent('05:03');
    rerender(<HuddleBar name="x" phase="ringing" startedAt={startedAt} onLeave={() => {}} />);
    expect(screen.queryByTestId('huddle-bar-timer')).toBeNull();
  });

  it('mic and camera toggles are bare unless a device list is supplied', () => {
    const toggleMic = vi.fn();
    render(
      <HuddleBar
        name="x"
        mic={{ on: true, onToggle: toggleMic }}
        camera={{ on: false, onToggle: () => {}, devices: [{ deviceId: 'c1', label: 'Cam' }], onSelectDevice: () => {} }}
        onLeave={() => {}}
      />,
    );
    expect(screen.queryByTestId('huddle-bar-mic-menu')).toBeNull();
    expect(screen.getByTestId('huddle-bar-camera-menu')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('huddle-bar-mic'));
    expect(toggleMic).toHaveBeenCalledTimes(1);
  });

  it('renders the share slot, chat toggle with unread, and leaves', () => {
    const onChat = vi.fn();
    const onLeave = vi.fn();
    render(
      <HuddleBar
        name="x"
        shareSlot={<button type="button">Share page</button>}
        onToggleChat={onChat}
        chatOpen
        chatUnread={120}
        onLeave={onLeave}
      />,
    );
    expect(screen.getByText('Share page')).toBeInTheDocument();
    expect(screen.getByTestId('huddle-bar-chat')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('huddle-bar-chat-unread')).toHaveTextContent('99+');
    fireEvent.click(screen.getByTestId('huddle-bar-chat'));
    fireEvent.click(screen.getByTestId('huddle-bar-leave'));
    expect(onChat).toHaveBeenCalled();
    expect(onLeave).toHaveBeenCalled();
  });

  it('omits the chat button when there is no handler', () => {
    render(<HuddleBar name="x" onLeave={() => {}} />);
    expect(screen.queryByTestId('huddle-bar-chat')).toBeNull();
  });
});
