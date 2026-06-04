import { render, screen, fireEvent } from '@testing-library/react';
import HangoutPreJoinShell, {
  type HangoutPreJoinShellProps,
} from '../HangoutPreJoinShell';

function baseProps(overrides: Partial<HangoutPreJoinShellProps> = {}): HangoutPreJoinShellProps {
  return {
    channelName: 'test-room',
    previewStream: null,
    permission: 'granted',
    audioEnabled: true,
    videoEnabled: true,
    onToggleAudio: () => {},
    onToggleVideo: () => {},
    onJoin: () => {},
    onCancel: () => {},
    ...overrides,
  };
}

describe('HangoutPreJoinShell', () => {
  it('renders the channel name + Cancel button', () => {
    render(<HangoutPreJoinShell {...baseProps()} />);
    expect(screen.getByText('test-room')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('shows the Join button enabled when permission is granted', () => {
    render(<HangoutPreJoinShell {...baseProps({ permission: 'granted' })} />);
    const btn = screen.getByTestId('prejoin-join-button');
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveTextContent('Join now');
  });

  it('disables Join with "Allow camera to join" copy when permission denied', () => {
    render(<HangoutPreJoinShell {...baseProps({ permission: 'denied' })} />);
    const btn = screen.getByTestId('prejoin-join-button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveTextContent('Allow camera to join');
  });

  it('passes mic/cam intent to onJoin', () => {
    const onJoin = vi.fn();
    render(
      <HangoutPreJoinShell
        {...baseProps({
          onJoin,
          audioEnabled: false,
          videoEnabled: true,
        })}
      />,
    );
    fireEvent.click(screen.getByTestId('prejoin-join-button'));
    expect(onJoin).toHaveBeenCalledWith({ audio: false, video: true });
  });

  it('renders the permission-denied card with retry when permission is "denied"', () => {
    const onRetryPermission = vi.fn();
    render(
      <HangoutPreJoinShell
        {...baseProps({
          permission: 'denied',
          permissionMessage: 'Browser blocked the camera',
          onRetryPermission,
        })}
      />,
    );
    const card = screen.getByTestId('prejoin-permission-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('data-permission-kind', 'camera');
    expect(card).toHaveAttribute('data-permission-state', 'denied');
    expect(screen.getByText('Browser blocked the camera')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(onRetryPermission).toHaveBeenCalled();
  });

  it('renders "You\'ll be the first" subtitle on empty readyState', () => {
    render(<HangoutPreJoinShell {...baseProps({ readyState: 'empty' })} />);
    expect(screen.getAllByText(/first one in this room/i).length).toBeGreaterThan(0);
  });

  it('renders N-people copy + roster on ready readyState', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          readyState: 'ready',
          participants: [
            { participantId: 'alice-123', ready: true },
            { participantId: 'bob-456', ready: false },
          ],
        })}
      />,
    );
    expect(screen.getAllByText(/2 people are in this call/).length).toBeGreaterThan(0);
    expect(screen.getByText('alice-12')).toBeInTheDocument();
    expect(screen.getByText('bob-456')).toBeInTheDocument();
    expect(screen.getByText('live')).toBeInTheDocument();
    expect(screen.getByText('connecting')).toBeInTheDocument();
  });

  it('renders the "pending" caveat when readyState is pending', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          readyState: 'pending',
          participants: [{ participantId: 'alice', ready: false }],
        })}
      />,
    );
    expect(screen.getByText(/Other publishers are still connecting/)).toBeInTheDocument();
  });

  it('disables mic/cam toggles until permission is granted', () => {
    render(<HangoutPreJoinShell {...baseProps({ permission: 'pending' })} />);
    expect(screen.getByTestId('prejoin-toggle-audio')).toBeDisabled();
    expect(screen.getByTestId('prejoin-toggle-video')).toBeDisabled();
  });

  it('reflects audio/video disabled visually via aria-pressed', () => {
    const { rerender } = render(
      <HangoutPreJoinShell {...baseProps({ audioEnabled: true, videoEnabled: true })} />,
    );
    expect(screen.getByTestId('prejoin-toggle-audio')).toHaveAttribute('aria-pressed', 'true');
    rerender(
      <HangoutPreJoinShell {...baseProps({ audioEnabled: false, videoEnabled: false })} />,
    );
    expect(screen.getByTestId('prejoin-toggle-audio')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('prejoin-toggle-video')).toHaveAttribute('aria-pressed', 'false');
  });

  it('honors joinLabel override', () => {
    render(<HangoutPreJoinShell {...baseProps({ joinLabel: 'Start meeting' })} />);
    expect(screen.getByTestId('prejoin-join-button')).toHaveTextContent('Start meeting');
  });

  it('honors joinDisabled override even when permission is granted', () => {
    render(<HangoutPreJoinShell {...baseProps({ joinDisabled: true })} />);
    expect(screen.getByTestId('prejoin-join-button')).toBeDisabled();
  });

  it('renders subtitleOverride when provided', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({ subtitleOverride: 'CUSTOM SUBTITLE' })}
      />,
    );
    expect(screen.getAllByText('CUSTOM SUBTITLE').length).toBeGreaterThan(0);
  });

  it('shows readyLoading spinner instead of roster when readyLoading=true', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          readyLoading: true,
          readyState: 'ready',
          participants: [{ participantId: 'alice', ready: true }],
        })}
      />,
    );
    expect(screen.getAllByText(/Checking room/).length).toBeGreaterThan(0);
    expect(screen.queryByText('alice')).not.toBeInTheDocument();
  });

  it('fires onCancel from header Cancel button', () => {
    const onCancel = vi.fn();
    render(<HangoutPreJoinShell {...baseProps({ onCancel })} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('fires onCancel from "Back to rooms" link', () => {
    const onCancel = vi.fn();
    render(<HangoutPreJoinShell {...baseProps({ onCancel })} />);
    fireEvent.click(screen.getByText('Back to rooms'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('truncates roster to 8 entries + shows "+N more" overflow', () => {
    const participants = Array.from({ length: 12 }, (_, i) => ({
      participantId: `p-${i.toString().padStart(2, '0')}`,
      ready: true,
    }));
    render(
      <HangoutPreJoinShell {...baseProps({ readyState: 'ready', participants })} />,
    );
    // 8 visible
    expect(screen.getByText('p-00')).toBeInTheDocument();
    expect(screen.getByText('p-07')).toBeInTheDocument();
    expect(screen.queryByText('p-08')).not.toBeInTheDocument();
    expect(screen.getByText('+4 more')).toBeInTheDocument();
  });
});
