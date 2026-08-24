import { renderHook, act, waitFor } from '@testing-library/react';
import { useDocTypeProposals } from '../useDocTypeProposals';
import type { DocTypeProposalRow } from '../useDocTypeProposals';

const TOKEN = 'tok-1';

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: TOKEN,
    userId: 'u1',
    displayName: 'Alice',
    userEmail: 'alice@test.com',
    onSignOut: vi.fn(),
  }),
}));

const BASE = 'http://ingest-api';

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

const PROPOSAL: DocTypeProposalRow = {
  proposalId: 'prop-1',
  sourceId: 'src-1',
  signature: 'sig-abc',
  sampleIngestIds: ['ing-1'],
  proposedName: 'Invoice',
  proposedDescription: 'An invoice document',
  proposedFields: [{ name: 'amount', sectionType: 'number', required: true }],
  reasoning: 'matches invoice pattern',
  status: 'pending',
  createdAt: '2024-01-01T00:00:00.000Z',
};

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

// The suite runs under React StrictMode, so mount effects fire twice and the
// mutation is no longer at a fixed call index. Locate the call we mean by its
// HTTP method rather than by position.
function callWith(
  mock: { mock: { calls: unknown[][] } },
  method: string,
): [string, RequestInit] {
  const call = mock.mock.calls.find(
    (c) => (c[1] as RequestInit | undefined)?.method === method,
  );
  expect(call, `expected a ${method} fetch`).toBeDefined();
  return call as [string, RequestInit];
}

// Same reason as callWith, for calls that share a method and are told apart by
// their URL instead.
function callTo(
  mock: { mock: { calls: unknown[][] } },
  urlPart: string,
): [string, RequestInit] {
  const call = mock.mock.calls.find((c) => String(c[0]).includes(urlPart));
  expect(call, `expected a fetch to ${urlPart}`).toBeDefined();
  return call as [string, RequestInit];
}

describe('initial load', () => {
  it('fetches proposals on mount and populates state', async () => {
    vi.stubGlobal('fetch', stubFetch({ proposals: [PROPOSAL] }));
    const { result } = renderHook(() => useDocTypeProposals());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.proposals).toHaveLength(1);
    expect(result.current.proposals[0].proposedName).toBe('Invoice');
    expect(result.current.error).toBeNull();
  });

  it('sets error on non-ok response', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 502));
    const { result } = renderHook(() => useDocTypeProposals());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/502/);
    expect(result.current.proposals).toHaveLength(0);
  });

  it('sends Authorization header', async () => {
    const fetchMock = stubFetch({ proposals: [] });
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useDocTypeProposals());
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    const [url, init] = callTo(fetchMock, '/api/ingest/mapping/proposals');
    expect(url).toContain('/api/ingest/mapping/proposals');
    expect((init.headers as Record<string, string>).Authorization).toBe(`Bearer ${TOKEN}`);
  });
});

describe('refresh', () => {
  it('re-fetches and updates proposals', async () => {
    const fetchMock = stubFetch({ proposals: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useDocTypeProposals());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({
      ok: true, status: 200,
      json: () => Promise.resolve({ proposals: [PROPOSAL] }),
    } as unknown as Response);

    await act(async () => { await result.current.refresh(); });

    expect(result.current.proposals).toHaveLength(1);
  });
});

describe('promote', () => {
  it('POSTs to /promote and refreshes proposals', async () => {
    const fetchMock = stubFetch({ proposals: [PROPOSAL] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useDocTypeProposals());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ proposals: [] }) } as unknown as Response);

    await act(async () => { await result.current.promote('prop-1'); });

    const promoteCall = callWith(fetchMock, 'POST');
    expect(promoteCall[0]).toContain('/prop-1/promote');
    expect(promoteCall[1].method).toBe('POST');
  });

  it('throws on non-ok response', async () => {
    const fetchMock = stubFetch({ proposals: [PROPOSAL] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useDocTypeProposals());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 404, json: () => Promise.resolve({}) } as unknown as Response);

    await expect(act(async () => { await result.current.promote('prop-1'); })).rejects.toThrow('404');
  });
});

describe('reject', () => {
  it('POSTs to /reject and refreshes proposals', async () => {
    const fetchMock = stubFetch({ proposals: [PROPOSAL] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useDocTypeProposals());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ proposals: [] }) } as unknown as Response);

    await act(async () => { await result.current.reject('prop-1'); });

    const rejectCall = callWith(fetchMock, 'POST');
    expect(rejectCall[0]).toContain('/prop-1/reject');
    expect(rejectCall[1].method).toBe('POST');
    expect(JSON.parse(rejectCall[1].body as string).reviewedBy).toBe('alice@test.com');
  });
});
