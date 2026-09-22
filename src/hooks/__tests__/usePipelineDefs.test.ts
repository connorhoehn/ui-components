import { renderHook, act, waitFor } from '@testing-library/react';
import { usePipelineDefs } from '../usePipelineDefs';

// ---------------------------------------------------------------------------
// Mock IdentityContext
// ---------------------------------------------------------------------------

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: 'tok-pipelines',
    userId: 'admin',
    displayName: 'Admin',
    userEmail: 'admin@test.com',
    onSignOut: vi.fn(),
  }),
  useOptionalIdentityContext: () => ({
    idToken: 'tok-pipelines',
    userId: 'admin',
    displayName: 'Admin',
    userEmail: 'admin@test.com',
    onSignOut: vi.fn(),
  }),
}));

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://social-api';

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function stubFetch(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('usePipelineDefs', () => {
  describe('initial load', () => {
    it('fetches pipeline defs and sets pipelines on success', async () => {
      globalThis.fetch = stubFetch({
        pipelines: [
          { id: 'p1', name: 'My Pipeline', status: 'active', icon: '🚀' },
          { id: 'p2', name: 'Another', status: 'inactive' },
        ],
      });

      const { result } = renderHook(() => usePipelineDefs());

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toBeNull();
      expect(result.current.pipelines).toEqual([
        { id: 'p1', name: 'My Pipeline', status: 'active', icon: '🚀' },
        { id: 'p2', name: 'Another', status: 'inactive', icon: undefined },
      ]);
    });

    it('sends Authorization header when idToken is set', async () => {
      const mockFetch = stubFetch({ pipelines: [] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() => usePipelineDefs());
      await waitFor(() => expect(result.current.loading).toBe(false));

      const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain('/api/pipelines/defs');
      expect((init.headers as Record<string, string>)['Authorization']).toBe('Bearer tok-pipelines');
    });

    it('handles empty pipelines array', async () => {
      globalThis.fetch = stubFetch({ pipelines: [] });

      const { result } = renderHook(() => usePipelineDefs());
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.pipelines).toEqual([]);
      expect(result.current.error).toBeNull();
    });

    it('handles missing pipelines key in response', async () => {
      globalThis.fetch = stubFetch({});

      const { result } = renderHook(() => usePipelineDefs());
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.pipelines).toEqual([]);
    });
  });

  describe('error handling', () => {
    it('sets error on non-OK response', async () => {
      globalThis.fetch = stubFetch({}, false);

      const { result } = renderHook(() => usePipelineDefs());
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toMatch(/HTTP 500/);
      expect(result.current.pipelines).toEqual([]);
    });

    it('sets error on network failure', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

      const { result } = renderHook(() => usePipelineDefs());
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toBe('Failed to fetch');
      expect(result.current.pipelines).toEqual([]);
    });
  });

  describe('refresh', () => {
    it('re-fetches and updates pipelines when called', async () => {
      const mockFetch = stubFetch({ pipelines: [{ id: 'p1', name: 'First' }] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() => usePipelineDefs());
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.pipelines).toHaveLength(1);

      // Update mock for second call
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          pipelines: [
            { id: 'p1', name: 'First' },
            { id: 'p2', name: 'Second' },
          ],
        }),
      } as unknown as Response);

      await act(() => result.current.refresh());
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.pipelines).toHaveLength(2);
      expect(result.current.pipelines[1].id).toBe('p2');
    });

    it('clears previous error on successful refresh', async () => {
      globalThis.fetch = stubFetch({}, false);

      const { result } = renderHook(() => usePipelineDefs());
      await waitFor(() => expect(result.current.error).not.toBeNull());

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ pipelines: [{ id: 'p1', name: 'OK' }] }),
      } as unknown as Response);

      await act(() => result.current.refresh());
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toBeNull();
      expect(result.current.pipelines).toHaveLength(1);
    });
  });
});
