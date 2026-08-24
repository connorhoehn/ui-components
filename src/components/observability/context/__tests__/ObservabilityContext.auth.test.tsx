// Regression: the observability dashboard sent NO credentials at all.
//
// `ObservabilityProvider` fetched `/api/observability/dashboard` with no
// `Authorization` header and no `credentials`, while its sibling
// `usePipelineMetrics` sent a bearer token to the same origin. On a protected
// deployment every poll 401'd, the provider fell back to `dashboardFixture`,
// and the only thing on screen was a muted "fixture" pill whose tooltip said
// "Backend unreachable" — so an operator read synthetic cluster numbers as
// their own and had no way to learn otherwise.
//
// The fix must NOT introduce a hard `<IdentityProvider>` dependency: the
// backendless demo mounts this provider with no identity in the tree, and the
// fixture fallback has to stay reachable.
//
// Driven against a stubbed global `fetch` — the request itself is the
// contract under test.

import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IdentityProvider } from '../../../../contexts/IdentityContext';
import {
  ObservabilityProvider,
  useObservability,
} from '../ObservabilityContext';

// The provider subscribes to the shared EventStream; stub it so these tests
// stay about the fetch.
vi.mock('../../../pipelines/context/EventStreamContext', () => ({
  useEventStreamContext: () => ({
    subscribeToAll: () => () => {},
    subscribe: () => () => {},
  }),
}));

function Probe() {
  const { isLiveData, unauthorized, error, dashboard } = useObservability();
  return (
    <div>
      <span data-testid="live">{String(isLiveData)}</span>
      <span data-testid="unauthorized">{String(unauthorized)}</span>
      <span data-testid="error">{error ?? ''}</span>
      <span data-testid="has-dashboard">{String(dashboard !== null)}</span>
    </div>
  );
}

function okResponse(body: unknown = { overview: { totalNodes: 1 } }) {
  return {
    ok: true, status: 200, statusText: 'OK', json: () => Promise.resolve(body),
  };
}

async function settle() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
  });
}

const IDENTITY = {
  userId: 'u1',
  displayName: 'Ops',
  userEmail: 'ops@example.com',
  idToken: 'tok-from-identity',
  onSignOut: () => {},
};

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('ObservabilityProvider — credentials', () => {
  it('sends the bearer token from an <IdentityProvider> when one is present', async () => {
    const fetchSpy = vi.fn((_url: string, _init?: RequestInit) => Promise.resolve(okResponse()));
    vi.stubGlobal('fetch', fetchSpy);

    render(
      <IdentityProvider value={IDENTITY}>
        <ObservabilityProvider pollIntervalMs={999999}>
          <Probe />
        </ObservabilityProvider>
      </IdentityProvider>,
    );
    await settle();

    const init = fetchSpy.mock.calls[0][1] as RequestInit;
    expect((init.headers as Record<string, string>).Authorization).toBe(
      'Bearer tok-from-identity',
    );
    expect(init.credentials).toBe('include');
    expect(screen.getByTestId('live')).toHaveTextContent('true');
  });

  it('mounts and still fetches with NO IdentityProvider above it', async () => {
    // The whole point of the optional read: requiring an <IdentityProvider>
    // here would throw and take the backendless demo down with it.
    const fetchSpy = vi.fn((_url: string, _init?: RequestInit) => Promise.resolve(okResponse()));
    vi.stubGlobal('fetch', fetchSpy);

    expect(() =>
      render(
        <ObservabilityProvider pollIntervalMs={999999}>
          <Probe />
        </ObservabilityProvider>,
      ),
    ).not.toThrow();
    await settle();

    const init = fetchSpy.mock.calls[0][1] as RequestInit;
    expect((init.headers as Record<string, string>).Authorization).toBeUndefined();
    // Cookies still go out — that's the other half of "sends credentials".
    expect(init.credentials).toBe('include');
  });

  it('prefers an explicit authToken prop over the identity context', async () => {
    const fetchSpy = vi.fn((_url: string, _init?: RequestInit) => Promise.resolve(okResponse()));
    vi.stubGlobal('fetch', fetchSpy);

    render(
      <IdentityProvider value={IDENTITY}>
        <ObservabilityProvider pollIntervalMs={999999} authToken="tok-from-prop">
          <Probe />
        </ObservabilityProvider>
      </IdentityProvider>,
    );
    await settle();

    const init = fetchSpy.mock.calls[0][1] as RequestInit;
    expect((init.headers as Record<string, string>).Authorization).toBe(
      'Bearer tok-from-prop',
    );
  });

  it('uses the fetchImpl seam when the host supplies one', async () => {
    const globalFetch = vi.fn(() => Promise.resolve(okResponse()));
    vi.stubGlobal('fetch', globalFetch);
    const hostFetch = vi.fn(() => Promise.resolve(okResponse()));

    render(
      <ObservabilityProvider
        pollIntervalMs={999999}
        fetchImpl={hostFetch as unknown as typeof fetch}
      >
        <Probe />
      </ObservabilityProvider>,
    );
    await settle();

    expect(hostFetch).toHaveBeenCalled();
    expect(globalFetch).not.toHaveBeenCalled();
  });
});

describe('ObservabilityProvider — unauthorized is not the same as unreachable', () => {
  it('flags 401 as unauthorized while keeping the fixture on screen', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false, status: 401, statusText: 'Unauthorized',
      json: () => Promise.resolve({}),
    })));

    render(
      <ObservabilityProvider pollIntervalMs={999999}>
        <Probe />
      </ObservabilityProvider>,
    );
    await settle();

    expect(screen.getByTestId('unauthorized')).toHaveTextContent('true');
    expect(screen.getByTestId('live')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent(/not authorized/i);
    // Fixture fallback must remain reachable — the UI is never blank.
    expect(screen.getByTestId('has-dashboard')).toHaveTextContent('true');
  });

  it('flags 403 as unauthorized', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false, status: 403, statusText: 'Forbidden',
      json: () => Promise.resolve({}),
    })));

    render(
      <ObservabilityProvider pollIntervalMs={999999}>
        <Probe />
      </ObservabilityProvider>,
    );
    await settle();

    expect(screen.getByTestId('unauthorized')).toHaveTextContent('true');
  });

  it('does NOT flag a genuinely unreachable backend as unauthorized', async () => {
    // Fresh Error per call — `mockRejectedValue` reuses one instance.
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('Failed to fetch'))));

    render(
      <ObservabilityProvider pollIntervalMs={999999}>
        <Probe />
      </ObservabilityProvider>,
    );
    await settle();

    expect(screen.getByTestId('unauthorized')).toHaveTextContent('false');
    expect(screen.getByTestId('live')).toHaveTextContent('false');
    // Fixture fallback still reachable for the backendless demo.
    expect(screen.getByTestId('has-dashboard')).toHaveTextContent('true');
  });
});
