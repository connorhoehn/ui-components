import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CircularIconToggle from '../CircularIconToggle';
import MediaControlsBar from '../MediaControlsBar';
import { CallControls } from '../CallControls';
import { CallWidget } from '../CallWidget';

const REASON = 'The host made you view-only';

describe('CircularIconToggle — disabledReason', () => {
  it('stays focusable, does nothing when pressed, and carries the reason as tooltip and description', () => {
    const onClick = vi.fn();
    render(<CircularIconToggle on={false} iconOn="on" iconOff="off" aria-label="Unmute microphone" title="Unmute microphone" onClick={onClick} disabledReason={REASON} />);
    const button = screen.getByRole('button', { name: 'Unmute microphone' });
    expect(button).not.toHaveAttribute('disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('title', REASON);
    expect(button).toHaveAccessibleDescription(REASON);
    button.focus();
    expect(button).toHaveFocus();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('keeps an existing aria-describedby beside the reason', () => {
    render(
      <>
        <span id="hint">Press M</span>
        <CircularIconToggle on iconOn="on" iconOff="off" aria-label="Mute" aria-describedby="hint" disabledReason={REASON} />
      </>,
    );
    expect(screen.getByRole('button', { name: 'Mute' })).toHaveAccessibleDescription(`Press M ${REASON}`);
  });

  it('without a reason, `disabled` is the native attribute it always was', () => {
    render(<CircularIconToggle on iconOn="on" iconOff="off" aria-label="Mute" title="Mute" disabled />);
    const button = screen.getByRole('button', { name: 'Mute' });
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute('aria-disabled');
    expect(button).not.toHaveAttribute('aria-describedby');
    expect(button).toHaveAttribute('title', 'Mute');
  });
});

describe('MediaControlsBar — disabled reasons', () => {
  const base = { audioOn: false, videoOn: false, onToggleAudio: vi.fn(), onToggleVideo: vi.fn(), onToggleScreenShare: vi.fn(), onLeave: vi.fn() };

  it('each reason disables its own toggle and describes it', () => {
    render(<MediaControlsBar {...base} audioDisabledReason={REASON} videoDisabledReason={REASON} screenShareDisabledReason="Ana is sharing" />);
    const mic = screen.getByTestId('media-controls-mic');
    const cam = screen.getByTestId('media-controls-cam');
    const share = screen.getByTestId('media-controls-screenshare');
    expect(mic).toHaveAttribute('aria-disabled', 'true');
    expect(mic).toHaveAccessibleDescription(REASON);
    expect(cam).toHaveAttribute('title', REASON);
    expect(share).toHaveAccessibleDescription('Ana is sharing');
    fireEvent.click(mic);
    fireEvent.click(cam);
    fireEvent.click(share);
    expect(base.onToggleAudio).not.toHaveBeenCalled();
    expect(base.onToggleVideo).not.toHaveBeenCalled();
    expect(base.onToggleScreenShare).not.toHaveBeenCalled();
    // The leave button is never disabled by a publish reason.
    expect(screen.getByTestId('media-controls-leave')).not.toHaveAttribute('aria-disabled');
  });

  it('without reasons the toggles are as before', () => {
    const { container: before } = render(<MediaControlsBar {...base} audioDisabled />);
    const { container: after } = render(<MediaControlsBar {...base} audioDisabled audioDisabledReason={undefined} videoDisabledReason="" />);
    expect(after.innerHTML).toBe(before.innerHTML);
  });
});

describe('CallControls — disabled props', () => {
  const handlers = () => ({ onToggleMute: vi.fn(), onToggleCamera: vi.fn(), onToggleScreenShare: vi.fn(), onUpgradeToVideo: vi.fn(), onEndCall: vi.fn() });

  it('reasons disable mute, camera and share, which stay focusable and say why', () => {
    const h = handlers();
    render(<CallControls mode="video" {...h} audioDisabledReason={REASON} videoDisabledReason={REASON} screenShareDisabledReason={REASON} />);
    for (const id of ['mute-button', 'camera-button', 'screenshare-button']) {
      const button = screen.getByTestId(id);
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).not.toHaveAttribute('disabled');
      expect(button).toHaveAttribute('title', REASON);
      expect(button).toHaveAccessibleDescription(REASON);
      fireEvent.click(button);
    }
    expect(h.onToggleMute).not.toHaveBeenCalled();
    expect(h.onToggleCamera).not.toHaveBeenCalled();
    expect(h.onToggleScreenShare).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('hangup-button'));
    expect(h.onEndCall).toHaveBeenCalledTimes(1);
  });

  it('the boolean props disable natively, without a reason', () => {
    render(<CallControls mode="video" {...handlers()} audioDisabled videoDisabled screenShareDisabled />);
    expect(screen.getByTestId('mute-button')).toBeDisabled();
    expect(screen.getByTestId('camera-button')).toBeDisabled();
    expect(screen.getByTestId('screenshare-button')).toBeDisabled();
    expect(screen.getByTestId('mute-button')).toHaveAttribute('title', 'Mute');
  });

  it('videoDisabledReason also covers "Switch to video" in an audio call', () => {
    const h = handlers();
    render(<CallControls mode="audio" {...h} videoDisabledReason={REASON} />);
    fireEvent.click(screen.getByTestId('upgrade-to-video-button'));
    expect(h.onUpgradeToVideo).not.toHaveBeenCalled();
    expect(screen.getByTestId('upgrade-to-video-button')).toHaveAccessibleDescription(REASON);
  });

  it('compact density: a disabled control in the More menu shows its reason and stays put when chosen', () => {
    const h = handlers();
    render(<CallControls mode="video" density="compact" {...h} screenShareDisabledReason={REASON} />);
    fireEvent.click(screen.getByTestId('call-controls-more-button'));
    const item = screen.getByTestId('screenshare-button');
    expect(item).toHaveAttribute('role', 'menuitem');
    expect(item).toHaveAttribute('aria-disabled', 'true');
    expect(item).toHaveTextContent(REASON);
    expect(item).toHaveAccessibleDescription(REASON);
    fireEvent.click(item);
    expect(h.onToggleScreenShare).not.toHaveBeenCalled();
    expect(screen.getByTestId('call-controls-overflow')).toBeInTheDocument();
  });

  it('without the new props the row is unchanged', () => {
    const { container: before } = render(<CallControls mode="video" {...handlers()} density="compact" />);
    const { container: after } = render(
      <CallControls mode="video" {...handlers()} density="compact" audioDisabled={false} audioDisabledReason={undefined} screenShareDisabledReason="" />,
    );
    expect(after.innerHTML).toBe(before.innerHTML);
    expect(before.querySelector('[aria-disabled]')).toBeNull();
  });
});

describe('CallWidget — disabled publish controls', () => {
  const people = [{ id: 'a', displayName: 'Ana' }];

  it('passes the reasons to its control row', () => {
    const onToggleMute = vi.fn();
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={people}
        onToggleMute={onToggleMute}
        onToggleCamera={() => {}}
        onToggleScreenShare={() => {}}
        audioDisabledReason={REASON}
        videoDisabledReason={REASON}
        screenShareDisabledReason={REASON}
      />,
    );
    expect(screen.getByTestId('mute-button')).toHaveAccessibleDescription(REASON);
    expect(screen.getByTestId('camera-button')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByTestId('screenshare-button')).toHaveAttribute('title', REASON);
    fireEvent.click(screen.getByTestId('mute-button'));
    expect(onToggleMute).not.toHaveBeenCalled();
  });

  it('the minimized pill’s mute honours the same props', () => {
    const onToggleMute = vi.fn();
    const { rerender } = render(
      <CallWidget state="active" mode="video" participants={people} minimized onMinimize={() => {}} onToggleMute={onToggleMute} audioDisabledReason={REASON} />,
    );
    const mute = screen.getByTestId('call-pill-mute');
    expect(mute).toHaveAttribute('aria-disabled', 'true');
    expect(mute).toHaveAccessibleDescription(REASON);
    fireEvent.click(mute);
    expect(onToggleMute).not.toHaveBeenCalled();
    rerender(<CallWidget state="active" mode="video" participants={people} minimized onMinimize={() => {}} onToggleMute={onToggleMute} audioDisabled />);
    expect(screen.getByTestId('call-pill-mute')).toBeDisabled();
  });

  it('without the new props mute works as before', () => {
    const onToggleMute = vi.fn();
    render(<CallWidget state="active" mode="video" participants={people} onToggleMute={onToggleMute} />);
    const mute = screen.getByTestId('mute-button');
    expect(mute).not.toHaveAttribute('aria-disabled');
    expect(mute).not.toBeDisabled();
    fireEvent.click(mute);
    expect(onToggleMute).toHaveBeenCalledTimes(1);
  });
});
