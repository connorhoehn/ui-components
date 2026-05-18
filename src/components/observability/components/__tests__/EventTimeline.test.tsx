import { render, screen, fireEvent } from '@testing-library/react';
import EventTimeline, { type EventItem } from '../EventTimeline';

function makeEvent(overrides: Partial<EventItem> = {}): EventItem {
  return {
    id: 'e1',
    timestamp: '12:00:00',
    type: 'run.started',
    summary: 'pipeline-A started',
    severity: 'info',
    ...overrides,
  };
}

function mockScrollMetrics(
  el: HTMLElement,
  { scrollHeight, clientHeight, scrollTop }: {
    scrollHeight: number;
    clientHeight: number;
    scrollTop: number;
  },
) {
  Object.defineProperty(el, 'scrollHeight', {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(el, 'clientHeight', {
    value: clientHeight,
    configurable: true,
  });
  Object.defineProperty(el, 'scrollTop', {
    value: scrollTop,
    writable: true,
    configurable: true,
  });
}

describe('EventTimeline', () => {
  it('renders the empty state when events list is empty', () => {
    render(<EventTimeline events={[]} />);
    expect(screen.getByText('No events yet')).toBeInTheDocument();
    expect(
      screen.getByText('Trigger a pipeline to see activity here.'),
    ).toBeInTheDocument();
  });

  it('renders one row per event with timestamp and summary visible', () => {
    const events = [
      makeEvent({ id: 'e1', timestamp: '12:00:00', summary: 'first' }),
      makeEvent({ id: 'e2', timestamp: '12:00:01', summary: 'second' }),
      makeEvent({ id: 'e3', timestamp: '12:00:02', summary: 'third' }),
    ];
    render(<EventTimeline events={events} />);
    expect(screen.getAllByTestId('event-row')).toHaveLength(3);
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
    expect(screen.getByText('third')).toBeInTheDocument();
    expect(screen.getByText('12:00:01')).toBeInTheDocument();
  });

  it('invokes onSelect with the event id when a row is clicked', () => {
    const onSelect = vi.fn();
    render(
      <EventTimeline
        events={[makeEvent({ id: 'event-xyz' })]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByTestId('event-row'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('event-xyz');
  });

  it('does not show the jump-to-live pill when live=false', () => {
    render(
      <EventTimeline events={[makeEvent()]} live={false} />,
    );
    expect(screen.queryByTestId('jump-to-live')).not.toBeInTheDocument();
  });

  it('shows the jump-to-live pill after the user scrolls up while live', () => {
    const { container } = render(
      <EventTimeline events={[makeEvent()]} live />,
    );
    const scrollEl = container.querySelector(
      '[data-testid="event-timeline"] > div',
    ) as HTMLDivElement;
    expect(scrollEl).not.toBeNull();

    mockScrollMetrics(scrollEl, {
      scrollHeight: 1000,
      clientHeight: 200,
      scrollTop: 100,
    });
    fireEvent.scroll(scrollEl);

    expect(screen.getByTestId('jump-to-live')).toBeInTheDocument();
  });

  it('hides the pill and resets scrollTop when jump-to-live is clicked', () => {
    const { container } = render(
      <EventTimeline events={[makeEvent()]} live />,
    );
    const scrollEl = container.querySelector(
      '[data-testid="event-timeline"] > div',
    ) as HTMLDivElement;

    mockScrollMetrics(scrollEl, {
      scrollHeight: 1000,
      clientHeight: 200,
      scrollTop: 100,
    });
    fireEvent.scroll(scrollEl);

    fireEvent.click(screen.getByTestId('jump-to-live'));
    expect(scrollEl.scrollTop).toBe(1000);
    expect(screen.queryByTestId('jump-to-live')).not.toBeInTheDocument();
  });
});
