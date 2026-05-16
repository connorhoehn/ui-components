import { renderHook, act, waitFor } from '@testing-library/react';
import { useIdentityResource } from '../useIdentityResource';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: 'tok-id-resource',
    userId: 'admin',
    displayName: 'Admin',
    userEmail: 'admin@test.com',
    onSignOut: vi.fn(),
  }),
}));

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

afterEach(() => {
  vi.restoreAllMocks();
});

function stubFetch(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    statusText: ok ? 'OK' : 'Server Error',
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useIdentityResource', () => {
  describe('initial fetch', () => {
    it('fetches data on mount and populates data', async () => {
      globalThis.fetch = stubFetch({ items: [{ id: 'a' }] });

      const { result } = renderHook(() =>
        useIdentityResource<{ items: { id: string }[] }>(
          { items: [] },
          { url: '/api/admin/resources' },
        ),
      );

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toBeNull();
      expect(result.current.data.items).toHaveLength(1);
    });

    it('does not fetch when url is null', async () => {
      const mockFetch = stubFetch({});
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() =>
        useIdentityResource<object>({}, { url: null }),
      );

      // Give it a tick to settle
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('skips initial fetch when fetchOnMount is false', async () => {
      const mockFetch = stubFetch({ value: 42 });
      globalThis.fetch = mockFetch;

      renderHook(() =>
        useIdentityResource<object>(
          {},
          { url: '/api/admin/resources', fetchOnMount: false },
        ),
      );

      // Allow any pending microtasks to settle
      await act(async () => {});
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('sets error when fetch returns non-OK', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Forbidden',
        json: () => Promise.resolve({ message: 'Forbidden' }),
      } as unknown as Response);

      const { result } = renderHook(() =>
        useIdentityResource<object>({}, { url: '/api/admin/resources' }),
      );

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.error).toBe('Forbidden');
    });

    it('sets error on network failure', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Network error'));

      const { result } = renderHook(() =>
        useIdentityResource<object>({}, { url: '/api/admin/resources' }),
      );

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.error).toBe('Network error');
    });
  });

  describe('mutate', () => {
    it('POSTs and returns the response body', async () => {
      const mockFetch = stubFetch({ users: [] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() =>
        useIdentityResource<object>({}, { url: null, fetchOnMount: false }),
      );

      mockFetch.mockResolvedValueOnce({
        ok: true,
        statusText: 'OK',
        json: () => Promise.resolve({ created: true }),
      } as unknown as Response);

      let response: { created: boolean } | null | undefined;
      await act(async () => {
        response = await result.current.mutate<{ created: boolean }>(
          '/api/admin/resources',
          { method: 'POST', body: JSON.stringify({ name: 'x' }) },
        );
      });

      expect(response).toEqual({ created: true });
    });

    it('returns null and sets error when mutate fails', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Bad Request',
        json: () => Promise.resolve({ message: 'Bad Request' }),
      } as unknown as Response);

      const { result } = renderHook(() =>
        useIdentityResource<object>({}, { url: null, fetchOnMount: false }),
      );

      let response: unknown;
      await act(async () => {
        response = await result.current.mutate('/api/admin/resources');
      });

      expect(response).toBeNull();
      expect(result.current.error).toBe('Bad Request');
    });
  });

  describe('refresh', () => {
    it('re-fetches data when called', async () => {
      const mockFetch = stubFetch({ count: 1 });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() =>
        useIdentityResource<{ count: number }>(
          { count: 0 },
          { url: '/api/admin/resources' },
        ),
      );
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockFetch).toHaveBeenCalledTimes(1);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        statusText: 'OK',
        json: () => Promise.resolve({ count: 5 }),
      } as unknown as Response);

      await act(() => result.current.refresh());
      await waitFor(() => expect(result.current.data.count).toBe(5));
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});
