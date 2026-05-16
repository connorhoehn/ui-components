import { renderHook, act } from '@testing-library/react';
import { useIdentityDiagnostics } from '../useIdentityDiagnostics';
import type { DiagnosticsInfo, RateInfo, DlqEntry } from '../../types/identity';

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: 'tok-1',
    userId: 'admin',
    displayName: 'Admin',
    userEmail: 'admin@test.com',
    onSignOut: vi.fn(),
  }),
}));

const BASE = 'http://identity-api';

beforeEach(() => { vi.stubEnv('VITE_IDENTITY_API_URL', BASE); });
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

const DIAG: DiagnosticsInfo = { node: { uptime: 1000 }, cluster: { nodes: 3 }, resources: { cpu: 0.2 } };
const RATES: RateInfo = { loginRate: 100 };
const DLQ_ENTRY: DlqEntry = { id: 'd1', payload: {}, error: 'timeout', failedAt: '2024-01-01T00:00:00.000Z', retryCount: 1 };

function makeOrderedFetch(responses: unknown[]) {
  let call = 0;
  return vi.fn().mockImplementation(() => {
    const body = responses[call++];
    return Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve(body),
    } as unknown as Response);
  });
}

function stubFetch(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    statusText: ok ? 'OK' : 'Error',
    json: () => Promise.resolve(ok ? body : { message: 'Error' }),
  } as unknown as Response);
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe('initial state', () => {
  it('starts with null data and empty dlq', () => {
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));
    const { result } = renderHook(() => useIdentityDiagnostics());
    expect(result.current.diagnostics).toBeNull();
    expect(result.current.rates).toBeNull();
    expect(result.current.dlq).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// refresh
// ---------------------------------------------------------------------------

describe('refresh', () => {
  it('fetches diagnostics, rates, and DLQ in parallel', async () => {
    vi.stubGlobal('fetch', makeOrderedFetch([DIAG, RATES, [DLQ_ENTRY]]));
    const { result } = renderHook(() => useIdentityDiagnostics());

    await act(async () => { await result.current.refresh(); });

    expect(result.current.diagnostics).toEqual(DIAG);
    expect(result.current.rates).toEqual(RATES);
    expect(result.current.dlq).toHaveLength(1);
    expect(result.current.loading).toBe(false);
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 500, statusText: 'Error',
      json: () => Promise.resolve({ message: 'Server Error' }),
    } as unknown as Response));
    const { result } = renderHook(() => useIdentityDiagnostics());

    await act(async () => { await result.current.refresh(); });

    expect(result.current.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// redriveDlq
// ---------------------------------------------------------------------------

describe('redriveDlq', () => {
  it('POSTs to .../redrive and removes the entry from dlq', async () => {
    const fetchMock = makeOrderedFetch([DIAG, RATES, [DLQ_ENTRY]]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityDiagnostics());
    await act(async () => { await result.current.refresh(); });
    expect(result.current.dlq).toHaveLength(1);

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(null) } as unknown as Response);
    await act(async () => { await result.current.redriveDlq('d1'); });

    expect(result.current.dlq).toHaveLength(0);
    const [url, opts] = fetchMock.mock.calls[3] as [string, RequestInit];
    expect(url).toContain('/api/admin/diagnostics/dlq/d1/redrive');
    expect(opts.method).toBe('POST');
  });
});

// ---------------------------------------------------------------------------
// purgeDlq
// ---------------------------------------------------------------------------

describe('purgeDlq', () => {
  it('DELETEs .../dlq/:id and removes the entry from dlq', async () => {
    const fetchMock = makeOrderedFetch([DIAG, RATES, [DLQ_ENTRY]]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityDiagnostics());
    await act(async () => { await result.current.refresh(); });
    expect(result.current.dlq).toHaveLength(1);

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(null) } as unknown as Response);
    await act(async () => { await result.current.purgeDlq('d1'); });

    expect(result.current.dlq).toHaveLength(0);
    const [url, opts] = fetchMock.mock.calls[3] as [string, RequestInit];
    expect(url).toContain('/api/admin/diagnostics/dlq/d1');
    expect(opts.method).toBe('DELETE');
  });
});
