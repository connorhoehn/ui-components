import { renderHook, act, waitFor } from '@testing-library/react';
import { useIdentityEmailTemplates } from '../useIdentityEmailTemplates';
import type { EmailTemplate } from '../../types/identity';

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

const TEMPLATE: EmailTemplate = {
  templateId: 't1',
  name: 'Welcome',
  subject: 'Welcome to the platform',
  htmlBody: '<p>Hello {{name}}</p>',
  textBody: 'Hello {{name}}',
  variables: ['name'],
};

function stubFetch(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    statusText: ok ? 'OK' : 'Error',
    json: () => Promise.resolve(ok ? body : { message: 'Error' }),
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

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches templates from /api/email-templates on mount', async () => {
    vi.stubGlobal('fetch', stubFetch([TEMPLATE]));
    const { result } = renderHook(() => useIdentityEmailTemplates());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.templates).toHaveLength(1);
    expect(result.current.templates[0].templateId).toBe('t1');
    expect(result.current.error).toBeNull();
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch(null, false));
    const { result } = renderHook(() => useIdentityEmailTemplates());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// createTemplate
// ---------------------------------------------------------------------------

describe('createTemplate', () => {
  it('POSTs to /api/email-templates and appends the template', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityEmailTemplates());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(TEMPLATE) } as unknown as Response);
    await act(async () => {
      await result.current.createTemplate({ name: 'Welcome', subject: 'Hi', htmlBody: '', textBody: '' });
    });

    expect(result.current.templates).toHaveLength(1);
    const [url, opts] = callWith(fetchMock, 'POST');
    expect(url).toContain('/api/email-templates');
    expect(opts.method).toBe('POST');
  });
});

// ---------------------------------------------------------------------------
// updateTemplate
// ---------------------------------------------------------------------------

describe('updateTemplate', () => {
  it('PUTs to /api/email-templates/:id and updates the template in state', async () => {
    const fetchMock = stubFetch([TEMPLATE]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityEmailTemplates());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const updated = { ...TEMPLATE, subject: 'Updated Subject' };
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(updated) } as unknown as Response);
    await act(async () => { await result.current.updateTemplate('t1', { subject: 'Updated Subject' }); });

    expect(result.current.templates[0].subject).toBe('Updated Subject');
    const [url, opts] = callWith(fetchMock, 'PUT');
    expect(url).toContain('/api/email-templates/t1');
    expect(opts.method).toBe('PUT');
  });
});

// ---------------------------------------------------------------------------
// deleteTemplate
// ---------------------------------------------------------------------------

describe('deleteTemplate', () => {
  it('DELETEs /api/email-templates/:id and removes the template', async () => {
    const fetchMock = stubFetch([TEMPLATE]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityEmailTemplates());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.deleteTemplate('t1'); });

    expect(result.current.templates).toHaveLength(0);
    const [url, opts] = callWith(fetchMock, 'DELETE');
    expect(url).toContain('/api/email-templates/t1');
    expect(opts.method).toBe('DELETE');
  });
});

// ---------------------------------------------------------------------------
// testSend
// ---------------------------------------------------------------------------

describe('testSend', () => {
  it('POSTs to /api/email-templates/:id/test', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityEmailTemplates());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(null) } as unknown as Response);
    await act(async () => { await result.current.testSend('t1', 'test@example.com'); });

    const [url, opts] = callWith(fetchMock, 'POST');
    expect(url).toContain('/api/email-templates/t1/test');
    expect(opts.method).toBe('POST');
  });
});
