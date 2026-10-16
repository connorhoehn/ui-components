import { act, render, screen, fireEvent } from '@testing-library/react';
import { MeetingStatusCluster } from '../MeetingStatusCluster';

describe('MeetingStatusCluster', () => {
  afterEach(() => vi.useRealTimers());

  it('ticks from startedAt and formats like the reference (32:52)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-15T12:32:52Z'));
    render(<MeetingStatusCluster startedAt="2026-10-15T12:00:00Z" />);
    expect(screen.getByTestId('meeting-status-elapsed')).toHaveTextContent('32:52');
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByTestId('meeting-status-elapsed')).toHaveTextContent('32:53');
  });

  it('a controlled elapsedMs wins; the recording chip and options button render when given', () => {
    const onOpen = vi.fn();
    render(<MeetingStatusCluster elapsedMs={3_723_000} recording={{ armed: true, active: true }} onOpenOptions={onOpen} />);
    expect(screen.getByTestId('meeting-status-elapsed')).toHaveTextContent('1:02:03');
    expect(screen.getByTestId('meeting-status-recording')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('meeting-status-options'));
    expect(onOpen).toHaveBeenCalled();
  });

  it('renders no timer without a start', () => {
    render(<MeetingStatusCluster />);
    expect(screen.queryByTestId('meeting-status-elapsed')).toBeNull();
  });
});
