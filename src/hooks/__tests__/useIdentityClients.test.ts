import { renderHook, act, waitFor } from '@testing-library/react';
import { useIdentityClients } from '../useIdentityClients';
import type { IdentityClient } from '../../types/identity';

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: 'tok-1',
    userId: 'u1',
    displayName: 'Alice',
    userEmail: 'alice@test.com',
    onSignOut: vi.fn(),
  }),
}));

const BASE = 'http://identity-api';

beforeEach(() => { vi.stubEnv('VITE_IDENTITY_API_URL', BASE); });
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

const CLIENT: IdentityClient = {
  clientId: 'c1',
  clientName: 'Test Client',
  poolId: 'p1',
  redirectUris: ['https://app.example.com/callback'],
  grantTypes: ['authorization_code'],
};

function stubFetch(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    statusText: ok ? 'OK' : 'Error',
    json: () => Promise.resolve(ok ? body : { message: 'Error' }),
  } as unknown as Response);
}

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches clients from /api/clients on mount', async () => {
    vi.stubGlobal('fetch', stubFetch([CLIENT]));
    const { result } = renderHook(() => useIdentityClients());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.clients).toHaveLength(1);
    expect(result.current.clients[0].clientId).toBe('c1');
    expect(result.current.error).toBeNull();
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch(null, false));
    const { result } = renderHook(() => useIdentityClients());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// createClient
// ---------------------------------------------------------------------------

describe('createClient', () => {
  it('POSTs to /api/clients and appends the new client', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityClients());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(CLIENT) } as unknown as Response);
    await act(async () => { await result.current.createClient({ clientName: 'Test', poolId: 'p1', redirectUris: [] }); });

    expect(result.current.clients).toHaveLength(1);
    const [url, opts] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain('/api/clients');
    expect(opts.method).toBe('POST');
  });
});

// ---------------------------------------------------------------------------
// updateClient
// ---------------------------------------------------------------------------

describe('updateClient', () => {
  it('PUTs to /api/clients/:id and updates the client in state', async () => {
    const fetchMock = stubFetch([CLIENT]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityClients());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const updated = { ...CLIENT, clientName: 'Updated' };
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(updated) } as unknown as Response);
    await act(async () => { await result.current.updateClient('c1', { clientName: 'Updated' }); });

    expect(result.current.clients[0].clientName).toBe('Updated');
    const [url, opts] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain('/api/clients/c1');
    expect(opts.method).toBe('PUT');
  });
});

// ---------------------------------------------------------------------------
// deleteClient
// ---------------------------------------------------------------------------

describe('deleteClient', () => {
  it('DELETEs /api/clients/:id and removes the client from state', async () => {
    const fetchMock = stubFetch([CLIENT]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityClients());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.deleteClient('c1'); });

    expect(result.current.clients).toHaveLength(0);
    const [url, opts] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain('/api/clients/c1');
    expect(opts.method).toBe('DELETE');
  });
});

// ---------------------------------------------------------------------------
// createWithPool
// ---------------------------------------------------------------------------

describe('createWithPool', () => {
  it('POSTs to /api/clients/with-pool and appends the client', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityClients());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(CLIENT) } as unknown as Response);
    await act(async () => { await result.current.createWithPool({ clientName: 'New', poolName: 'pool', redirectUris: [] }); });

    expect(result.current.clients).toHaveLength(1);
    const [url, opts] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain('/api/clients/with-pool');
    expect(opts.method).toBe('POST');
  });
});
