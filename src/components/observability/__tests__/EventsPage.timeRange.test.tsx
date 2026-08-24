// The events page's "Time range" selector wrote `filters.timeRange` and
// nothing ever read it: picking "Last 15m" left hour-old rows on screen and
// never moved the "N / M events" counter. This drives the real page against a
// real EventStreamProvider, with Date.now under our control so events can be
// genuinely old.

import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useEffect } from 'react';
import {
  EventStreamProvider,
  useEventStreamContext,
} from '../../pipelines/context/EventStreamContext';
import type { EventStreamValue } from '../../pipelines/context/EventStreamContext';
import EventsPage from '../EventsPage';

let stream: EventStreamValue | null = null;

function CaptureStream() {
  const value = useEventStreamContext();
  useEffect(() => {
    stream = value;
  }, [value]);
  return null;
}

const T0 = new Date('2026-08-24T12:00:00.000Z').getTime();

function emit(runId: string) {
  act(() => {
    stream!.dispatch('pipeline.run.started', {
      runId,
      pipelineId: 'p1',
      triggeredBy: { triggerType: 'manual', payload: {} },
      at: new Date(Date.now()).toISOString(),
    });
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  stream = null;
});

describe('EventsPage time-range filter', () => {
  it('drops events older than the selected window and updates the counter', () => {
    const now = vi.spyOn(Date, 'now');

    now.mockReturnValue(T0);
    render(
      <EventStreamProvider>
        <CaptureStream />
        <EventsPage />
      </EventStreamProvider>,
    );

    // One event 30 minutes ago, one right now.
    emit('older-run');
    now.mockReturnValue(T0 + 30 * 60_000);
    emit('newer-run');

    // Default range is "Last 1h" — a 30-minute-old event is inside it.
    expect(screen.getByText(/run older-run/)).toBeInTheDocument();
    expect(screen.getByText(/run newer-run/)).toBeInTheDocument();
    expect(screen.getByText('2 / 2 events')).toBeInTheDocument();

    // Narrow to 15m: the 30-minute-old event must fall out of BOTH the list
    // and the visible count. Against the bug both stay and the counter reads
    // "2 / 2 events".
    fireEvent.change(screen.getByTestId('events-time-range'), {
      target: { value: '15m' },
    });

    expect(screen.queryByText(/run older-run/)).toBeNull();
    expect(screen.getByText(/run newer-run/)).toBeInTheDocument();
    expect(screen.getByText('1 / 2 events')).toBeInTheDocument();
  });

  it('widening the window brings the older event back', () => {
    const now = vi.spyOn(Date, 'now');

    now.mockReturnValue(T0);
    render(
      <EventStreamProvider>
        <CaptureStream />
        <EventsPage />
      </EventStreamProvider>,
    );

    emit('ancient-run');
    now.mockReturnValue(T0 + 3 * 60 * 60_000); // 3 hours later
    emit('fresh-run');

    // Default 1h window already excludes the 3-hour-old event.
    expect(screen.queryByText(/run ancient-run/)).toBeNull();

    fireEvent.change(screen.getByTestId('events-time-range'), {
      target: { value: '6h' },
    });
    expect(screen.getByText(/run ancient-run/)).toBeInTheDocument();
    expect(screen.getByText('2 / 2 events')).toBeInTheDocument();
  });

  it('offers no "Custom" range, since there is no UI to bound one', () => {
    render(
      <EventStreamProvider>
        <EventsPage />
      </EventStreamProvider>,
    );
    const select = screen.getByTestId('events-time-range') as HTMLSelectElement;
    const values = Array.from(select.options).map((o) => o.value);
    expect(values).toEqual(['15m', '1h', '6h', '24h']);
  });
});
