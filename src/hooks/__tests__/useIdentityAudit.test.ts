import { renderHook, act } from '@testing-library/react';
import { useIdentityAudit } from '../useIdentityAudit';
import type { AuditRecord } from '../../types/identity';

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

const RECORD: AuditRecord = {
  timestamp: 1700000000,
  actor: { type: 'admin', email: 'admin@test.com' },
  entityType: 'user',
  entityId: 'u1',
  operation: 'update',
  before: { email: 'old@test.com' },
  after: { email: 'new@test.com' },
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
// query
// ---------------------------------------------------------------------------

describe('query', () => {
  it('fetches audit records with no params', async () => {
    vi.stubGlobal('fetch', stubFetch([RECORD]));
    const { result } = renderHook(() => useIdentityAudit());

    await act(async () => { await result.current.query({}); });

    expect(result.current.records).toHaveLength(1);
    expect(result.current.records[0].entityId).toBe('u1');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('builds query string from params', async () => {
    const fetchMock = stubFetch([RECORD]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityAudit());

    await act(async () => {
      await result.current.query({
        entityType: 'user',
        entityId: 'u1',
        fromTime: 1000,
        toTime: 2000,
        limit: 20,
        cursor: 'tok',
      });
    });

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain('entityType=user');
    expect(url).toContain('entityId=u1');
    expect(url).toContain('fromTime=1000');
    expect(url).toContain('toTime=2000');
    expect(url).toContain('limit=20');
    expect(url).toContain('cursor=tok');
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch(null, false));
    const { result } = renderHook(() => useIdentityAudit());

    await act(async () => { await result.current.query({}); });

    expect(result.current.error).toBeTruthy();
    expect(result.current.loading).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// getEntityHistory
// ---------------------------------------------------------------------------

describe('getEntityHistory', () => {
  it('fetches from /api/audit/entity/:type/:id', async () => {
    const fetchMock = stubFetch([RECORD]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityAudit());

    let history: AuditRecord[] = [];
    await act(async () => {
      history = await result.current.getEntityHistory('user', 'u1');
    });

    expect(history).toHaveLength(1);
    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain('/api/audit/entity/user/u1');
  });
});

// ---------------------------------------------------------------------------
// getStateAtTime
// ---------------------------------------------------------------------------

describe('getStateAtTime', () => {
  it('fetches from /api/audit/state/:id?at=:timestamp', async () => {
    const state = { email: 'old@test.com' };
    const fetchMock = stubFetch(state);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityAudit());

    let snapshot: Record<string, unknown> | null = null;
    await act(async () => {
      snapshot = await result.current.getStateAtTime('u1', 1700000000);
    });

    expect(snapshot).toEqual(state);
    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain('/api/audit/state/u1');
    expect(url).toContain('at=1700000000');
  });
});
