import { render, screen, fireEvent } from '@testing-library/react';
import { CallControls } from '../CallControls';
import type { CallStripParticipant } from '../CallParticipantStrip';

function p(id: string, displayName?: string): CallStripParticipant {
  return { id, displayName: displayName ?? id };
}

describe('CallControls', () => {
  it('calls onToggleMute when the mute button is clicked', () => {
    const onToggleMute = vi.fn();
    render(<CallControls mode="audio" onToggleMute={onToggleMute} />);
    fireEvent.click(screen.getByTestId('mute-button'));
    expect(onToggleMute).toHaveBeenCalledTimes(1);
  });

  it('shows the camera button in video mode and forwards clicks', () => {
    const onToggleCamera = vi.fn();
    render(
      <CallControls mode="video" isCameraOn onToggleCamera={onToggleCamera} />,
    );
    fireEvent.click(screen.getByTestId('camera-button'));
    expect(onToggleCamera).toHaveBeenCalledTimes(1);
  });

  it('hides the camera button in audio mode', () => {
    render(<CallControls mode="audio" />);
    expect(screen.queryByTestId('camera-button')).toBeNull();
  });

  it('shows "upgrade to video" only in audio mode when handler provided', () => {
    const onUpgradeToVideo = vi.fn();
    const { rerender } = render(
      <CallControls mode="audio" onUpgradeToVideo={onUpgradeToVideo} />,
    );
    fireEvent.click(screen.getByTestId('upgrade-to-video-button'));
    expect(onUpgradeToVideo).toHaveBeenCalledTimes(1);

    // No upgrade button without the handler.
    rerender(<CallControls mode="audio" />);
    expect(screen.queryByTestId('upgrade-to-video-button')).toBeNull();

    // No upgrade button in video mode even with handler.
    rerender(
      <CallControls mode="video" onUpgradeToVideo={onUpgradeToVideo} />,
    );
    expect(screen.queryByTestId('upgrade-to-video-button')).toBeNull();
  });

  it('toggles the screen-share button label/state', () => {
    const onToggleScreenShare = vi.fn();
    const { rerender } = render(
      <CallControls
        mode="video"
        isScreenSharing={false}
        onToggleScreenShare={onToggleScreenShare}
      />,
    );
    expect(screen.getByLabelText('Share screen')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('screenshare-button'));
    expect(onToggleScreenShare).toHaveBeenCalledTimes(1);

    rerender(
      <CallControls
        mode="video"
        isScreenSharing
        onToggleScreenShare={onToggleScreenShare}
      />,
    );
    expect(screen.getByLabelText('Stop sharing')).toBeInTheDocument();
  });

  it('calls onEndCall when the hangup button is clicked', () => {
    const onEndCall = vi.fn();
    render(<CallControls mode="video" onEndCall={onEndCall} />);
    fireEvent.click(screen.getByTestId('hangup-button'));
    expect(onEndCall).toHaveBeenCalledTimes(1);
  });

  it('renders the muted glyph + label when isMuted is true', () => {
    render(<CallControls mode="audio" isMuted onToggleMute={() => undefined} />);
    expect(screen.getByLabelText('Unmute')).toBeInTheDocument();
  });

  // INVERTED: the case above used to render with NO `onToggleMute` and still
  // assert the mute control was there. Every handler on this bar is optional
  // and `ControlButton` has no fallback, so an unwired control was an enabled
  // icon button that swallowed the click — the mic glyph never flipped and
  // the user read the call as broken. The switch-to-video and add-people
  // controls beside them were already gated on their handlers.
  it('omits mute / camera / screen-share / hangup when their handlers are absent', () => {
    render(<CallControls mode="video" />);
    expect(screen.queryByTestId('mute-button')).toBeNull();
    expect(screen.queryByTestId('camera-button')).toBeNull();
    expect(screen.queryByTestId('screenshare-button')).toBeNull();
    expect(screen.queryByTestId('hangup-button')).toBeNull();
  });

  it('omits the add-participant button when no handler is provided', () => {
    render(<CallControls mode="video" />);
    expect(screen.queryByTestId('add-participant-button')).toBeNull();
  });

  it('toggles the add-participant picker and forwards picks', () => {
    const onAddParticipant = vi.fn();
    render(
      <CallControls
        mode="video"
        onAddParticipant={onAddParticipant}
        availableParticipants={[p('alice', 'Alice'), p('bob', 'Bob')]}
      />,
    );
    // Picker hidden by default.
    expect(screen.queryByTestId('add-participant-picker')).toBeNull();

    fireEvent.click(screen.getByTestId('add-participant-button'));
    expect(screen.getByTestId('add-participant-picker')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Alice'));
    expect(onAddParticipant).toHaveBeenCalledWith('alice');
  });

  it('dedupes addable list against currentParticipantIds', () => {
    render(
      <CallControls
        mode="video"
        onAddParticipant={vi.fn()}
        availableParticipants={[p('alice', 'Alice'), p('bob', 'Bob')]}
        currentParticipantIds={['alice']}
      />,
    );
    fireEvent.click(screen.getByTestId('add-participant-button'));
    expect(screen.queryByText('Alice')).toBeNull();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows the "everyone is already in" empty state when all are filtered out', () => {
    render(
      <CallControls
        mode="video"
        onAddParticipant={vi.fn()}
        availableParticipants={[p('alice', 'Alice')]}
        currentParticipantIds={['alice']}
      />,
    );
    fireEvent.click(screen.getByTestId('add-participant-button'));
    expect(screen.getByText('Everyone is already in the call')).toBeInTheDocument();
  });

  it('auto-closes the picker after adding the last addable participant', () => {
    const onAddParticipant = vi.fn();
    render(
      <CallControls
        mode="video"
        onAddParticipant={onAddParticipant}
        availableParticipants={[p('alice', 'Alice')]}
      />,
    );
    fireEvent.click(screen.getByTestId('add-participant-button'));
    expect(screen.getByTestId('add-participant-picker')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Alice'));
    expect(screen.queryByTestId('add-participant-picker')).toBeNull();
  });
});
