// Regression: `subscribeToRun` / `subscribeToAll` / `subscribeToApprovals`
// used to be unconditional `return () => {}` stubs (with a comment claiming
// WebSocketEventAdapter replaced them — it never did, it's a sibling hook).
// Callers held an unsubscribe handle for a gateway channel that was never
// opened, so a run-detail page's per-run channel and the approvals channel
// were dead in every deployment.
//
// These assertions are mount-count independent on purpose: the suite runs
// under StrictMode, so mount effects fire as mount -> unmount -> remount.
// We assert on WHICH channels were touched and on subscribe/unsubscribe
// BALANCE, never on absolute call counts.

import { useEffect } from 'react';
import { render, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  EventStreamProvider,
  useEventStreamContext,
  type EventStreamChannelTransport,
} from '../EventStreamContext';
import { usePipelineRunAuditLog } from '../../hooks/usePipelineRunAuditLog';

vi.mock('../../../../api/pipelineAudit', () => ({
  getRunAuditLog: vi.fn(async () => ({ items: [], nextCursor: undefined })),
}));

function makeRecorder() {
  const subscribed: string[] = [];
  const unsubscribed: string[] = [];
  const transport: EventStreamChannelTransport = {
    subscribe: (channel) => subscribed.push(channel),
    unsubscribe: (channel) => unsubscribed.push(channel),
  };
  const count = (list: string[], channel: string) =>
    list.filter((c) => c === channel).length;
  return {
    transport,
    subscribed,
    unsubscribed,
    /** True iff the channel was opened at least once. */
    opened: (channel: string) => count(subscribed, channel) > 0,
    /** True iff every open of the channel was matched by a close. */
    balanced: (channel: string) =>
      count(subscribed, channel) === count(unsubscribed, channel),
  };
}

/** Calls one channel-subscribe method for its whole lifetime. */
function ChannelConsumer({ method, runId }: { method: 'run' | 'all' | 'approvals'; runId?: string }) {
  const stream = useEventStreamContext();
  useEffect(() => {
    if (method === 'run') return stream.subscribeToRun(runId ?? 'run-1');
    if (method === 'all') return stream.subscribeToAll();
    return stream.subscribeToApprovals();
  }, [stream, method, runId]);
  return null;
}

describe('EventStreamProvider channel subscriptions', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    warn.mockRestore();
  });

  it('opens pipeline:run:{runId} through the host transport', () => {
    const rec = makeRecorder();
    render(
      <EventStreamProvider channelTransport={rec.transport}>
        <ChannelConsumer method="run" runId="run-42" />
      </EventStreamProvider>,
    );
    expect(rec.opened('pipeline:run:run-42')).toBe(true);
  });

  it('opens pipeline:all and pipeline:approvals through the host transport', () => {
    const rec = makeRecorder();
    render(
      <EventStreamProvider channelTransport={rec.transport}>
        <ChannelConsumer method="all" />
        <ChannelConsumer method="approvals" />
      </EventStreamProvider>,
    );
    expect(rec.opened('pipeline:all')).toBe(true);
    expect(rec.opened('pipeline:approvals')).toBe(true);
  });

  it('returns a real unsubscribe — every open is closed on unmount', () => {
    const rec = makeRecorder();
    const view = render(
      <EventStreamProvider channelTransport={rec.transport}>
        <ChannelConsumer method="run" runId="run-7" />
      </EventStreamProvider>,
    );
    expect(rec.opened('pipeline:run:run-7')).toBe(true);
    view.unmount();
    expect(rec.balanced('pipeline:run:run-7')).toBe(true);
    // …and the unsubscribe handle is idempotent, so a caller that drains its
    // cleanup array twice can't close a channel a later mount re-opened.
    expect(rec.unsubscribed.filter((c) => c === 'pipeline:run:run-7').length).toBe(
      rec.subscribed.filter((c) => c === 'pipeline:run:run-7').length,
    );
  });

  it('refcounts a shared channel — one subscriber leaving does not close it', () => {
    const rec = makeRecorder();
    function Pair({ second }: { second: boolean }) {
      return (
        <EventStreamProvider channelTransport={rec.transport}>
          <ChannelConsumer method="all" />
          {second ? <ChannelConsumer method="all" /> : null}
        </EventStreamProvider>
      );
    }
    const view = render(<Pair second />);
    const opensWithBoth = rec.subscribed.filter((c) => c === 'pipeline:all').length;
    const closesWithBoth = rec.unsubscribed.filter((c) => c === 'pipeline:all').length;
    // Both consumers want the same channel; the wire saw strictly fewer opens
    // than there were subscribers, i.e. the refcount collapsed them.
    expect(opensWithBoth - closesWithBoth).toBe(1);

    // Drop one subscriber. The channel must stay open for the other.
    view.rerender(<Pair second={false} />);
    const openNow =
      rec.subscribed.filter((c) => c === 'pipeline:all').length -
      rec.unsubscribed.filter((c) => c === 'pipeline:all').length;
    expect(openNow).toBe(1);
  });

  it('warns once per channel when no transport is wired, instead of pretending', () => {
    render(
      <EventStreamProvider>
        <ChannelConsumer method="run" runId="run-9" />
        <ChannelConsumer method="run" runId="run-9" />
      </EventStreamProvider>,
    );
    const messages = warn.mock.calls.map((c: unknown[]) => String(c[0]));
    const forChannel = messages.filter((m: string) => m.includes('pipeline:run:run-9'));
    expect(forChannel.length).toBe(1);
    expect(forChannel[0]).toContain('channelTransport');
  });

  it('usePipelineRunAuditLog opens the per-run channel for the run it shows', async () => {
    const rec = makeRecorder();
    renderHook(() => usePipelineRunAuditLog('pipe-1', 'run-live', { pollMs: 0 }), {
      wrapper: ({ children }) => (
        <EventStreamProvider channelTransport={rec.transport}>{children}</EventStreamProvider>
      ),
    });
    await waitFor(() => {
      expect(rec.opened('pipeline:run:run-live')).toBe(true);
    });
  });
});
