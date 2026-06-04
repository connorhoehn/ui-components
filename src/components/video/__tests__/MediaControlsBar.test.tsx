import { render, screen, fireEvent } from '@testing-library/react';
import MediaControlsBar from '../MediaControlsBar';

function baseProps() {
  return {
    audioOn: true,
    videoOn: true,
    onToggleAudio: () => {},
    onToggleVideo: () => {},
    onLeave: () => {},
  };
}

describe('MediaControlsBar', () => {
  it('renders mic/cam/leave by default; screen-share opt-in', () => {
    render(<MediaControlsBar {...baseProps()} />);
    expect(screen.getByTestId('media-controls-mic')).toBeInTheDocument();
    expect(screen.getByTestId('media-controls-cam')).toBeInTheDocument();
    expect(screen.getByTestId('media-controls-leave')).toBeInTheDocument();
    expect(screen.queryByTestId('media-controls-screenshare')).not.toBeInTheDocument();
  });

  it('renders screen-share button when onToggleScreenShare provided', () => {
    render(<MediaControlsBar {...baseProps()} onToggleScreenShare={() => {}} />);
    expect(screen.getByTestId('media-controls-screenshare')).toBeInTheDocument();
  });

  it('reflects on/off via aria-pressed on the toggles', () => {
    const { rerender } = render(<MediaControlsBar {...baseProps()} />);
    expect(screen.getByTestId('media-controls-mic')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('media-controls-cam')).toHaveAttribute('aria-pressed', 'true');
    rerender(<MediaControlsBar {...baseProps()} audioOn={false} videoOn={false} />);
    expect(screen.getByTestId('media-controls-mic')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('media-controls-cam')).toHaveAttribute('aria-pressed', 'false');
  });

  it('fires the right callbacks on click', () => {
    const onToggleAudio = vi.fn();
    const onToggleVideo = vi.fn();
    const onToggleScreenShare = vi.fn();
    const onLeave = vi.fn();
    render(
      <MediaControlsBar
        {...baseProps()}
        onToggleAudio={onToggleAudio}
        onToggleVideo={onToggleVideo}
        onToggleScreenShare={onToggleScreenShare}
        onLeave={onLeave}
      />,
    );
    fireEvent.click(screen.getByTestId('media-controls-mic'));
    fireEvent.click(screen.getByTestId('media-controls-cam'));
    fireEvent.click(screen.getByTestId('media-controls-screenshare'));
    fireEvent.click(screen.getByTestId('media-controls-leave'));
    expect(onToggleAudio).toHaveBeenCalledTimes(1);
    expect(onToggleVideo).toHaveBeenCalledTimes(1);
    expect(onToggleScreenShare).toHaveBeenCalledTimes(1);
    expect(onLeave).toHaveBeenCalledTimes(1);
  });

  it('honors per-button disabled flags', () => {
    render(
      <MediaControlsBar
        {...baseProps()}
        onToggleScreenShare={() => {}}
        audioDisabled
        videoDisabled
        screenShareDisabled
      />,
    );
    expect(screen.getByTestId('media-controls-mic')).toBeDisabled();
    expect(screen.getByTestId('media-controls-cam')).toBeDisabled();
    expect(screen.getByTestId('media-controls-screenshare')).toBeDisabled();
  });

  it('honors leaveLabel override', () => {
    render(<MediaControlsBar {...baseProps()} leaveLabel="Hang up" />);
    expect(screen.getByTestId('media-controls-leave')).toHaveAttribute('aria-label', 'Hang up');
  });

  it('renders the extras slot before the leave button', () => {
    render(
      <MediaControlsBar
        {...baseProps()}
        extras={<button data-testid="raise-hand">Raise</button>}
      />,
    );
    const extras = screen.getByTestId('raise-hand');
    const leave = screen.getByTestId('media-controls-leave');
    expect(extras.compareDocumentPosition(leave) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
