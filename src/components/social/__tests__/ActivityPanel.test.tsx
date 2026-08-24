// ActivityPanel hydrates over REST and then keeps itself current from the
// gateway socket. Three things in that seam can break silently:
//   1. the dedup guard — the REST hydrate and the first live event often
//      describe the SAME action, and without the guard it renders twice;
//   2. the 50-item cap — an unbounded prepend on a chatty socket is a leak;
//   3. the event-type → copy mapping, which must degrade to the raw event
//      type rather than rendering "undefined" for a type it has not seen.
// It previously had a genuine dead end: with no VITE_SOCIAL_API_URL the
// hydrate effect returned before `setLoading(false)`, so the panel spun
// forever. Fixed in v2.77.0 — it now resolves to the empty state, which is
// pinned below.

import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ActivityPanel } from '../ActivityPanel';
import { ToastProvider } from '../../shared/ToastProvider';
import type { GatewayMessage } from '../../../types/gateway';

type Handler = (msg: GatewayMessage) => void;

const TOKEN = `h.${btoa(JSON.stringify({ sub: 'u-1' }))}.s`;

/** Captures the registered gateway handler so tests can push events. */
function makeBus() {
  const handlers: Handler[] = [];
  return {
    onMessage: (h: Handler) => {
      handlers.push(h);
      return () => {
        const i = handlers.indexOf(h);
        if (i >= 0) handlers.splice(i, 1);
      };
    },
    emit(payload: { eventType: string; timestamp: string; detail?: Record<string, unknown> }) {
      act(() => {
        handlers.forEach((h) => h({ type: 'activity:event', payload: { detail: {}, ...payload } }));
      });
    },
    emitRaw(msg: GatewayMessage) {
      act(() => { handlers.forEach((h) => h(msg)); });
    },
  };
}

function mockActivityResponse(items: unknown[]) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ items, nextKey: null }),
  });
}

async function renderPanel(opts: {
  bus?: ReturnType<typeof makeBus>;
  idToken?: string | null;
  connectionState?: 'connected' | 'connecting' | 'disconnected';
  sendMessage?: (msg: Record<string, unknown>) => void;
} = {}) {
  const bus = opts.bus ?? makeBus();
  const sendMessage = opts.sendMessage ?? vi.fn<(msg: Record<string, unknown>) => void>();
  render(
    <ToastProvider>
      <ActivityPanel
        idToken={opts.idToken === undefined ? TOKEN : opts.idToken}
        sendMessage={sendMessage}
        onMessage={bus.onMessage}
        connectionState={opts.connectionState ?? 'connected'}
      />
    </ToastProvider>,
  );
  // Let the hydrate promise chain settle.
  await act(async () => { await Promise.resolve(); });
  return { bus, sendMessage };
}

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', 'https://api.test');
  vi.stubGlobal('fetch', mockActivityResponse([]));
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('ActivityPanel hydrate', () => {
  it('resolves to the empty state once the REST call returns nothing', async () => {
    await renderPanel();
    expect(screen.getByText('No activity yet')).toBeInTheDocument();
  });

  it('renders one row per hydrated item', async () => {
    vi.stubGlobal('fetch', mockActivityResponse([
      { eventType: 'social.follow', timestamp: new Date().toISOString(), detail: { followeeId: 'deadbeefcafe' } },
    ]));
    await renderPanel();
    expect(screen.getByText('Followed @deadbeef')).toBeInTheDocument();
  });

  it('a failed hydrate offers a retry that refetches', async () => {
    const failing = vi.fn().mockResolvedValue({ ok: false, status: 503 });
    vi.stubGlobal('fetch', failing);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    await renderPanel();
    // Two role="alert" nodes exist here — the inline panel error and the
    // toast the hook fires — so assert on the message itself.
    expect(screen.getByText('HTTP 503')).toBeInTheDocument();

    // Assert the DELTA, not the total: the suite runs under StrictMode, so the
    // hydrate effect already ran twice before the click. What Retry owes is
    // "one more request than there were", which reads the same either way.
    const beforeRetry = failing.mock.calls.length;
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    await waitFor(() => expect(failing).toHaveBeenCalledTimes(beforeRetry + 1));
  });

  it('resolves to the empty state when no API base URL is configured', async () => {
    // Regression: `loading` starts true, and the hydrate effect used to
    // early-return without clearing it — so an unconfigured deployment
    // showed a spinner that never resolved.
    vi.stubEnv('VITE_SOCIAL_API_URL', '');
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    await renderPanel();
    expect(fetchSpy).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
  });

  it('resolves to the empty state when there is no signed-in user', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    await renderPanel({ idToken: null });
    expect(fetchSpy).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
  });
});

describe('ActivityPanel live subscription', () => {
  it('subscribes to the caller’s own activity channel only once connected', async () => {
    const sendMessage = vi.fn<(msg: Record<string, unknown>) => void>();
    await renderPanel({ connectionState: 'connecting', sendMessage });
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('subscribes with the channel id derived from the token subject', async () => {
    const sendMessage = vi.fn<(msg: Record<string, unknown>) => void>();
    await renderPanel({ sendMessage });
    expect(sendMessage).toHaveBeenCalledWith({
      service: 'activity',
      action: 'subscribe',
      channelId: 'activity:u-1',
    });
  });

  it('prepends live events above the hydrated ones', async () => {
    vi.stubGlobal('fetch', mockActivityResponse([
      { eventType: 'social.like', timestamp: '2026-01-01T00:00:00.000Z', detail: { contentId: 'aaaaaaaaaa' } },
    ]));
    const { bus } = await renderPanel();
    bus.emit({ eventType: 'social.post.created', timestamp: '2026-01-02T00:00:00.000Z', detail: { roomId: 'bbbbbbbbbb' } });
    const rows = screen.getAllByText(/Posted in room|Liked/);
    expect(rows[0]).toHaveTextContent('Posted in room bbbbbbbb');
  });

  it('drops a live event that duplicates the newest row', async () => {
    const { bus } = await renderPanel();
    const dup = { eventType: 'social.follow', timestamp: '2026-01-02T00:00:00.000Z', detail: { followeeId: 'zzzz' } };
    bus.emit(dup);
    bus.emit(dup);
    expect(screen.getAllByText('Followed @zzzz')).toHaveLength(1);
  });

  it('keeps an identical event that is no longer the newest row', async () => {
    const { bus } = await renderPanel();
    const first = { eventType: 'social.follow', timestamp: '2026-01-02T00:00:00.000Z', detail: { followeeId: 'zzzz' } };
    bus.emit(first);
    bus.emit({ eventType: 'social.like', timestamp: '2026-01-03T00:00:00.000Z', detail: { contentId: 'cccc' } });
    bus.emit(first);
    expect(screen.getAllByText('Followed @zzzz')).toHaveLength(2);
  });

  it('caps the feed at 50 rows however many events arrive', async () => {
    const { bus } = await renderPanel();
    for (let i = 0; i < 60; i++) {
      bus.emit({ eventType: 'social.like', timestamp: `2026-01-01T00:00:${String(i).padStart(2, '0')}.000Z`, detail: { contentId: `c${i}` } });
    }
    expect(screen.getAllByText(/^Liked /)).toHaveLength(50);
  });

  it('ignores gateway traffic of another type, and activity events with no payload', async () => {
    const { bus } = await renderPanel();
    bus.emitRaw({ type: 'chat:message', payload: { eventType: 'social.like', timestamp: 'x', detail: {} } });
    bus.emitRaw({ type: 'activity:event' });
    expect(screen.getByText('No activity yet')).toBeInTheDocument();
  });
});

describe('ActivityPanel copy mapping', () => {
  const cases: Array<[string, Record<string, unknown>, string]> = [
    ['social.room.join', { roomId: 'roomroomroom' }, 'Joined room roomroom'],
    ['social.unfollow', { followeeId: 'friendfriend' }, 'Unfollowed @friendfr'],
    ['pipeline.run.started', { pipelineId: 'pl-9' }, 'Triggered pipeline pl-9'],
    ['pipeline.run.completed', { durationMs: 1200 }, 'Pipeline run completed in 1200ms'],
    ['pipeline.run.failed', {}, 'Pipeline run failed: unknown error'],
    ['pipeline.approval.requested', {}, 'Approval requested'],
    ['some.unmapped.type', {}, 'some.unmapped.type'],
  ];

  it.each(cases)('renders %s as its own sentence', async (eventType, detail, expected) => {
    const { bus } = await renderPanel();
    bus.emit({ eventType, timestamp: '2026-01-01T00:00:00.000Z', detail });
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('falls back to the generic pipeline copy when no pipelineId is present', async () => {
    const { bus } = await renderPanel();
    bus.emit({ eventType: 'pipeline.run.started', timestamp: '2026-01-01T00:00:00.000Z', detail: {} });
    expect(screen.getByText('Triggered pipeline')).toBeInTheDocument();
  });

  it('renders a completion with no duration without inventing one', async () => {
    const { bus } = await renderPanel();
    bus.emit({ eventType: 'pipeline.run.completed', timestamp: '2026-01-01T00:00:00.000Z', detail: {} });
    expect(screen.getByText('Pipeline run completed')).toBeInTheDocument();
  });
});
