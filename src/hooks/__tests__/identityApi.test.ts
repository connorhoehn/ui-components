import { describe, it, expect, vi, afterEach } from 'vitest';
import { apiFetch } from '../identityApi';

function stubResponse(opts: {
  ok?: boolean;
  status?: number;
  statusText?: string;
  jsonValue?: unknown;
  jsonThrows?: boolean;
}): Response {
  const {
    ok = true,
    status = ok ? 200 : 400,
    statusText = ok ? 'OK' : 'Bad Request',
    jsonValue = {},
    jsonThrows = false,
  } = opts;

  return {
    ok,
    status,
    statusText,
    json: () => (jsonThrows ? Promise.reject(new Error('parse failed')) : Promise.resolve(jsonValue)),
  } as unknown as Response;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('identityApi.apiFetch', () => {
  describe('ok path', () => {
    it('returns parsed JSON from the response body', async () => {
      const fetchMock = vi.fn().mockResolvedValue(stubResponse({ jsonValue: { token: 'jwt' } }));
      vi.stubGlobal('fetch', fetchMock);

      const result = await apiFetch<{ token: string }>('/api/me', 'tok-1');

      expect(result).toEqual({ token: 'jwt' });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toContain('/api/me');
    });

    it('returns the parsed JSON even when the body is an array', async () => {
      const fetchMock = vi.fn().mockResolvedValue(stubResponse({ jsonValue: [1, 2, 3] }));
      vi.stubGlobal('fetch', fetchMock);

      const result = await apiFetch<number[]>('/api/numbers', null);

      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('headers', () => {
    it('adds Authorization: Bearer <idToken> when idToken is provided', async () => {
      const fetchMock = vi.fn().mockResolvedValue(stubResponse({ jsonValue: {} }));
      vi.stubGlobal('fetch', fetchMock);

      await apiFetch('/api/me', 'tok-xyz');

      const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      const headers = init.headers as Record<string, string>;
      expect(headers.Authorization).toBe('Bearer tok-xyz');
    });

    it('omits Authorization when idToken is null', async () => {
      const fetchMock = vi.fn().mockResolvedValue(stubResponse({ jsonValue: {} }));
      vi.stubGlobal('fetch', fetchMock);

      await apiFetch('/api/public', null);

      const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      const headers = init.headers as Record<string, string>;
      expect(headers.Authorization).toBeUndefined();
    });

    it('always sets Content-Type: application/json', async () => {
      const fetchMock = vi.fn().mockResolvedValue(stubResponse({ jsonValue: {} }));
      vi.stubGlobal('fetch', fetchMock);

      await apiFetch('/api/me', null);

      const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      const headers = init.headers as Record<string, string>;
      expect(headers['Content-Type']).toBe('application/json');
    });

    it('merges caller-supplied headers without dropping the defaults', async () => {
      const fetchMock = vi.fn().mockResolvedValue(stubResponse({ jsonValue: {} }));
      vi.stubGlobal('fetch', fetchMock);

      await apiFetch('/api/me', 'tok-1', {
        headers: { 'X-Trace-Id': 'trace-42' },
      });

      const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      const headers = init.headers as Record<string, string>;
      expect(headers['Content-Type']).toBe('application/json');
      expect(headers.Authorization).toBe('Bearer tok-1');
      expect(headers['X-Trace-Id']).toBe('trace-42');
    });

    it('lets caller-supplied headers override the defaults (last wins)', async () => {
      const fetchMock = vi.fn().mockResolvedValue(stubResponse({ jsonValue: {} }));
      vi.stubGlobal('fetch', fetchMock);

      await apiFetch('/api/me', null, {
        headers: { 'Content-Type': 'text/plain' },
      });

      const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      const headers = init.headers as Record<string, string>;
      expect(headers['Content-Type']).toBe('text/plain');
    });
  });

  describe('options pass-through', () => {
    it('forwards method and body to fetch', async () => {
      const fetchMock = vi.fn().mockResolvedValue(stubResponse({ jsonValue: {} }));
      vi.stubGlobal('fetch', fetchMock);

      const body = JSON.stringify({ email: 'a@b.com' });
      await apiFetch('/api/login', null, { method: 'POST', body });

      const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(init.method).toBe('POST');
      expect(init.body).toBe(body);
    });
  });

  describe('error path', () => {
    it('throws an Error with the JSON body message on non-ok responses', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        stubResponse({
          ok: false,
          status: 401,
          statusText: 'Unauthorized',
          jsonValue: { message: 'token expired' },
        }),
      );
      vi.stubGlobal('fetch', fetchMock);

      await expect(apiFetch('/api/me', 'tok-bad')).rejects.toThrow('token expired');
    });

    it('falls back to res.statusText when the JSON body has no message field', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        stubResponse({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          jsonValue: { somethingElse: true },
        }),
      );
      vi.stubGlobal('fetch', fetchMock);

      await expect(apiFetch('/api/me', null)).rejects.toThrow('Internal Server Error');
    });

    it('falls back to res.statusText when the JSON body decode fails', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        stubResponse({
          ok: false,
          status: 502,
          statusText: 'Bad Gateway',
          jsonThrows: true,
        }),
      );
      vi.stubGlobal('fetch', fetchMock);

      await expect(apiFetch('/api/me', null)).rejects.toThrow('Bad Gateway');
    });
  });
});
