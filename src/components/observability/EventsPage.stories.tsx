import { useEffect, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import EventsPage from './EventsPage';
import {
  EventStreamProvider,
  useEventStreamContext,
} from '../pipelines/context/EventStreamContext';

// ---------------------------------------------------------------------------
// EventStreamProvider is a pure in-memory dispatcher — no socket, no network.
// These stories drive it exactly the way the WebSocket adapter does, by
// pushing envelopes through `dispatch`, so what you see is the real filter and
// timeline behaviour rather than a stubbed render.
// ---------------------------------------------------------------------------

const TRIGGER = { triggerType: 'schedule', payload: {} };

function Seed({ intervalMs, children }: { intervalMs?: number; children: ReactNode }) {
  const stream = useEventStreamContext();

  useEffect(() => {
    let run = 8800;
    const emit = () => {
      run += 1;
      const runId = `run-${run}`;
      stream.dispatch('pipeline.run.started', {
        runId,
        pipelineId: 'pl-invoice',
        triggeredBy: TRIGGER,
        at: new Date().toISOString(),
      });
      if (run % 3 === 0) {
        stream.dispatch('pipeline.run.failed', {
          runId,
          error: {
            nodeId: 'http-post-1',
            message: 'HTTP 502 from upstream',
            errorCategory: 'NetworkError',
          },
          at: new Date().toISOString(),
        });
      } else {
        stream.dispatch('pipeline.run.completed', {
          runId,
          durationMs: 1200 + (run % 7) * 310,
          at: new Date().toISOString(),
        });
      }
    };

    // Prime the timeline so the story is never blank on first paint.
    for (let i = 0; i < 6; i++) emit();

    if (!intervalMs) return undefined;
    const timer = setInterval(emit, intervalMs);
    return () => clearInterval(timer);
  }, [stream, intervalMs]);

  return <>{children}</>;
}

const meta = {
  title: 'Observability/Pages/EventsPage',
  component: EventsPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof EventsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Provider mounted, nothing dispatched — the real first-paint state. */
export const NoEventsYet: Story = {
  render: () => (
    <div className="h-[680px] border border-border rounded-md overflow-hidden">
      <EventStreamProvider>
        <EventsPage />
      </EventStreamProvider>
    </div>
  ),
};

/** A short burst of lifecycle events; use the rail to filter by group. */
export const WithEvents: Story = {
  render: () => (
    <div className="h-[680px] border border-border rounded-md overflow-hidden">
      <EventStreamProvider>
        <Seed>
          <EventsPage />
        </Seed>
      </EventStreamProvider>
    </div>
  ),
};

/**
 * Events arriving every 1.5s so the timeline's auto-follow and the Pause
 * control have something to do.
 */
export const StreamingLive: Story = {
  render: () => (
    <div className="h-[680px] border border-border rounded-md overflow-hidden">
      <EventStreamProvider>
        <Seed intervalMs={1500}>
          <EventsPage />
        </Seed>
      </EventStreamProvider>
    </div>
  ),
};
