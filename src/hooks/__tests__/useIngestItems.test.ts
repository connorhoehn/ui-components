import { renderHook, act, waitFor } from '@testing-library/react';
import { useIngestItems } from '../useIngestItems';

// ---------------------------------------------------------------------------
// Mock IdentityContext
// ---------------------------------------------------------------------------

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: 'tok-ingest',
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

const RAW_ITEM = {
  itemId: 'item-1',
  sourceId: 'src-1',
  sourcePath: '/data/file.csv',
  status: 'pending' as const,
  documentTypeId: null,
  documentId: null,
  pipelineRunId: null,
  mappingMethod: null,
  mappingConfidence: null,
  attempts: 0,
  error: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useIngestItems', () => {
  describe('initial load', () => {
    it('fetches ingest items and normalizes the response', async () => {
      globalThis.fetch = stubFetch({ items: [RAW_ITEM] });

      const { result } = renderHook(() => useIngestItems());
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toBeNull();
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].itemId).toBe('item-1');
      expect(result.current.items[0].sourcePath).toBe('/data/file.csv');
    });

    it('normalizes backend ingestId to itemId', async () => {
      const rawWithIngestId = { ...RAW_ITEM, ingestId: 'ingest-99', itemId: undefined };
      globalThis.fetch = stubFetch({ items: [rawWithIngestId] });

      const { result } = renderHook(() => useIngestItems());
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.items[0].itemId).toBe('ingest-99');
    });

    it('normalizes backend filePath to sourcePath', async () => {
      const rawWithFilePath = { ...RAW_ITEM, filePath: '/alt/path.json', sourcePath: undefined };
      globalThis.fetch = stubFetch({ items: [rawWithFilePath] });

      const { result } = renderHook(() => useIngestItems());
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.items[0].sourcePath).toBe('/alt/path.json');
    });

    it('sends Authorization header', async () => {
      const mockFetch = stubFetch({ items: [] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() => useIngestItems());
      await waitFor(() => expect(result.current.loading).toBe(false));

      const [, init] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect((init.headers as Record<string, string>)['Authorization']).toBe('Bearer tok-ingest');
    });
  });

  describe('query params', () => {
    it('appends sourceId as query param when provided', async () => {
      const mockFetch = stubFetch({ items: [] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() => useIngestItems({ sourceId: 'src-abc' }));
      await waitFor(() => expect(result.current.loading).toBe(false));

      const [url] = mockFetch.mock.calls[0] as [string];
      expect(url).toContain('sourceId=src-abc');
    });

    it('appends status as query param when provided', async () => {
      const mockFetch = stubFetch({ items: [] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() => useIngestItems({ status: 'failed' }));
      await waitFor(() => expect(result.current.loading).toBe(false));

      const [url] = mockFetch.mock.calls[0] as [string];
      expect(url).toContain('status=failed');
    });

    it('fetches without query string when no options provided', async () => {
      const mockFetch = stubFetch({ items: [] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() => useIngestItems());
      await waitFor(() => expect(result.current.loading).toBe(false));

      const [url] = mockFetch.mock.calls[0] as [string];
      expect(url).toMatch(/\/api\/ingest\/items$/);
    });
  });

  describe('error handling', () => {
    it('sets error on non-OK response', async () => {
      globalThis.fetch = stubFetch({}, false);

      const { result } = renderHook(() => useIngestItems());
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toMatch(/HTTP 500/);
      expect(result.current.items).toEqual([]);
    });
  });

  describe('retryItem', () => {
    it('POSTs to retry endpoint and optimistically sets status to queued', async () => {
      const mockFetch = stubFetch({ items: [RAW_ITEM] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() => useIngestItems());
      await waitFor(() => expect(result.current.loading).toBe(false));

      mockFetch.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);

      let success: boolean | undefined;
      await act(async () => { success = await result.current.retryItem('item-1'); });

      expect(success).toBe(true);
      expect(result.current.items[0].status).toBe('queued');
      expect(result.current.items[0].error).toBeNull();

      const retryCalls = mockFetch.mock.calls.filter(
        (call) => String(call[0]).includes('/retry'),
      );
      expect(retryCalls).toHaveLength(1);
      expect(retryCalls[0][0]).toContain('/api/ingest/items/item-1/retry');
    });

    it('returns false and sets error when retry fails', async () => {
      globalThis.fetch = stubFetch({ items: [RAW_ITEM] });

      const { result } = renderHook(() => useIngestItems());
      await waitFor(() => expect(result.current.loading).toBe(false));

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false, status: 422, json: () => Promise.resolve({}),
      } as unknown as Response);

      let success: boolean | undefined;
      await act(async () => { success = await result.current.retryItem('item-1'); });

      expect(success).toBe(false);
      // INVERTED: this used to assert the failure landed in `error`, the
      // list-loader's channel. That is the bug — the page renders `error` as
      // "Failed to load ingest items." and hides the whole table behind it.
      // A mutation failure belongs in `actionError`.
      expect(result.current.actionError).toMatch(/HTTP 422/);
      expect(result.current.error).toBeNull();
    });
  });

  describe('skipItem', () => {
    it('POSTs to skip endpoint and removes item from state', async () => {
      globalThis.fetch = stubFetch({ items: [RAW_ITEM] });

      const { result } = renderHook(() => useIngestItems());
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.items).toHaveLength(1);

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true, status: 200, json: () => Promise.resolve({}),
      } as unknown as Response);

      let success: boolean | undefined;
      await act(async () => { success = await result.current.skipItem('item-1'); });

      expect(success).toBe(true);
      expect(result.current.items).toHaveLength(0);
    });

    it('returns false and sets error when skip fails', async () => {
      globalThis.fetch = stubFetch({ items: [RAW_ITEM] });

      const { result } = renderHook(() => useIngestItems());
      await waitFor(() => expect(result.current.loading).toBe(false));

      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false, status: 403, json: () => Promise.resolve({}),
      } as unknown as Response);

      let success: boolean | undefined;
      await act(async () => { success = await result.current.skipItem('item-1'); });

      expect(success).toBe(false);
      // INVERTED: this used to assert the failure landed in `error`, the
      // list-loader's channel. That is the bug — the page renders `error` as
      // "Failed to load ingest items." and hides the whole table behind it.
      // A mutation failure belongs in `actionError`.
      expect(result.current.actionError).toMatch(/HTTP 403/);
      expect(result.current.error).toBeNull();
    });
  });
});
