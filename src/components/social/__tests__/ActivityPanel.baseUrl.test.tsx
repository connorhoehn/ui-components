// `import.meta.env.VITE_SOCIAL_API_URL` is replaced when a bundle is BUILT,
// and the bundle that ships is this library's — so a consumer's own .env never
// reaches `getBaseUrl()`, which resolves to `''` and makes the hydrate effect
// take its "nothing to hydrate from" branch. Every consumer got a permanently
// empty activity feed and no error anywhere.
//
// These tests can only pass BECAUSE they run against source, where stubEnv
// still works — which is exactly why the defect survived the existing suite.
// The point of `baseUrl` / `fetchActivity` is that neither depends on the env.

import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ActivityPanel } from '../ActivityPanel';
import { ToastProvider } from '../../shared/ToastProvider';
import type { GatewayMessage } from '../../../types/gateway';

const TOKEN = `h.${btoa(JSON.stringify({ sub: 'u-1' }))}.s`;
const noMessages = (_h: (m: GatewayMessage) => void) => () => undefined;

function okFetch(items: unknown[] = []) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ items, nextKey: null }),
  });
}

async function renderPanel(extra: Record<string, unknown> = {}) {
  render(
    <ToastProvider>
      <ActivityPanel
        idToken={TOKEN}
        sendMessage={vi.fn()}
        onMessage={noMessages}
        connectionState="disconnected"
        {...extra}
      />
    </ToastProvider>,
  );
  await act(async () => { await Promise.resolve(); });
}

beforeEach(() => {
  // The state a published build is always in: no usable env value.
  vi.stubEnv('VITE_SOCIAL_API_URL', '');
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('ActivityPanel baseUrl', () => {
  it('hydrates from the consumer-supplied origin', async () => {
    const fetchMock = okFetch([
      { eventType: 'social.follow', timestamp: '2026-09-22T10:00:00Z', detail: { followeeId: 'u-2' } },
    ]);
    vi.stubGlobal('fetch', fetchMock);

    await renderPanel({ baseUrl: 'https://platform.example' });

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock.mock.calls[0][0]).toBe('https://platform.example/api/activity?limit=20');
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
  });

  it('wins over the build-time env value', async () => {
    vi.stubEnv('VITE_SOCIAL_API_URL', 'https://baked-in.example');
    const fetchMock = okFetch();
    vi.stubGlobal('fetch', fetchMock);

    await renderPanel({ baseUrl: 'https://consumer.example' });

    expect(fetchMock.mock.calls[0][0]).toContain('https://consumer.example');
  });

  it('without it, an empty env still means no request — the defect, pinned', async () => {
    const fetchMock = okFetch();
    vi.stubGlobal('fetch', fetchMock);

    await renderPanel();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fetchActivity replaces the REST call entirely', async () => {
    const fetchMock = okFetch();
    vi.stubGlobal('fetch', fetchMock);
    const fetchActivity = vi.fn().mockResolvedValue({
      items: [{ eventType: 'social.like', timestamp: '2026-09-22T10:00:00Z', detail: {} }],
      nextKey: null,
    });

    await renderPanel({ fetchActivity });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(fetchActivity).toHaveBeenCalledWith({ idToken: TOKEN, limit: 20 });
    expect(screen.getByText(/Liked/)).toBeInTheDocument();
  });

  it('onError fires when fetchActivity rejects', async () => {
    const fetchMock = okFetch();
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const onError = vi.fn();
    const fetchActivity = vi.fn().mockRejectedValue(new Error('boom'));

    await renderPanel({ fetchActivity, onError });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(onError.mock.calls[0][0].message).toBe('boom');
  });

  it('fetchActivity wins over baseUrl', async () => {
    const fetchMock = okFetch();
    vi.stubGlobal('fetch', fetchMock);
    const fetchActivity = vi.fn().mockResolvedValue({ items: [], nextKey: null });

    await renderPanel({ baseUrl: 'https://consumer.example', fetchActivity });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(fetchActivity).toHaveBeenCalled();
  });
});
