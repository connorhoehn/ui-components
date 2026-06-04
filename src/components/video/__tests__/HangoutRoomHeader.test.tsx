import { render, screen } from '@testing-library/react';
import HangoutRoomHeader from '../HangoutRoomHeader';

describe('HangoutRoomHeader', () => {
  it('renders the channel name', () => {
    render(<HangoutRoomHeader channelName="weekly-standup" />);
    expect(screen.getByText('weekly-standup')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<HangoutRoomHeader channelName="t" subtitle="3 people in the room" />);
    expect(screen.getByText('3 people in the room')).toBeInTheDocument();
  });

  it('renders the recording pill only when recording.armed=true', () => {
    const { rerender } = render(
      <HangoutRoomHeader channelName="t" recording={{ armed: false, active: false }} />,
    );
    expect(screen.queryByTestId('hangout-room-header-recording')).not.toBeInTheDocument();
    rerender(
      <HangoutRoomHeader channelName="t" recording={{ armed: true, active: false }} />,
    );
    expect(screen.getByTestId('hangout-room-header-recording')).toBeInTheDocument();
  });

  it('renders the elapsed chip when elapsedLabel is provided', () => {
    render(<HangoutRoomHeader channelName="t" elapsedLabel="00:34" />);
    const chip = screen.getByTestId('hangout-room-header-elapsed');
    expect(chip).toHaveTextContent('00:34');
  });

  it('renders the phase chip when phase is provided', () => {
    render(<HangoutRoomHeader channelName="t" phase="joined" />);
    expect(screen.getByTestId('hangout-room-header-phase')).toHaveTextContent('Live');
  });

  it('uses warning tone + reconnecting label for phase=reconnecting', () => {
    render(<HangoutRoomHeader channelName="t" phase="reconnecting" />);
    expect(screen.getByTestId('hangout-room-header-phase')).toHaveTextContent(/Reconnecting/);
  });

  it('renders consumer-supplied actions on the right', () => {
    render(
      <HangoutRoomHeader
        channelName="t"
        actions={<button data-testid="custom-action">Debug</button>}
      />,
    );
    expect(screen.getByTestId('custom-action')).toBeInTheDocument();
  });

  it('omits the subtitle row entirely when nothing to show', () => {
    const { container } = render(<HangoutRoomHeader channelName="t" />);
    // Header only contains the h1; no subtitle div underneath
    expect(container.querySelector('p,.flex.items-center.gap-2')).toBeNull();
  });
});
