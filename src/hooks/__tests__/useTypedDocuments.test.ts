import { renderHook, act, waitFor } from '@testing-library/react';
import { useTypedDocuments } from '../useTypedDocuments';
import type { TypedDocument } from '../useTypedDocuments';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://social-api';
const TOKEN = 'tok-typed';
const TYPE_ID = 'type-abc';

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
    status: ok ? 200 : 404,
    text: () => Promise.resolve(ok ? '' : 'Not Found'),
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

const DOC: TypedDocument = {
  documentId: 'doc-1',
  typeId: TYPE_ID,
  values: { title: 'Hello' },
  createdBy: 'user-1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useTypedDocuments', () => {
  describe('null guards', () => {
    it('returns empty documents and does not fetch when idToken is null', async () => {
      const mockFetch = stubFetch({ items: [DOC] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() =>
        useTypedDocuments({ idToken: null, typeId: TYPE_ID }),
      );

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.documents).toEqual([]);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('returns empty documents and does not fetch when typeId is null', async () => {
      const mockFetch = stubFetch({ items: [DOC] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() =>
        useTypedDocuments({ idToken: TOKEN, typeId: null }),
      );

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.documents).toEqual([]);
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('initial load', () => {
    it('fetches documents on mount with typeId query param', async () => {
      globalThis.fetch = stubFetch({ items: [DOC] });

      const { result } = renderHook(() =>
        useTypedDocuments({ idToken: TOKEN, typeId: TYPE_ID }),
      );

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toBeNull();
      expect(result.current.documents).toHaveLength(1);
      expect(result.current.documents[0].documentId).toBe('doc-1');

      const [url, init] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0] as [string, RequestInit];
      expect(url).toContain(`typeId=${encodeURIComponent(TYPE_ID)}`);
      expect((init.headers as Record<string, string>)['Authorization']).toBe(`Bearer ${TOKEN}`);
    });

    it('sets error when fetch returns non-OK', async () => {
      globalThis.fetch = stubFetch({}, false);

      const { result } = renderHook(() =>
        useTypedDocuments({ idToken: TOKEN, typeId: TYPE_ID }),
      );

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.error).toContain('404');
      expect(result.current.documents).toEqual([]);
    });
  });

  describe('createDocument', () => {
    it('POSTs and prepends the new document to the list', async () => {
      const mockFetch = stubFetch({ items: [DOC] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() =>
        useTypedDocuments({ idToken: TOKEN, typeId: TYPE_ID }),
      );
      await waitFor(() => expect(result.current.loading).toBe(false));

      const newDoc: TypedDocument = { ...DOC, documentId: 'doc-new' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve(newDoc),
      } as unknown as Response);

      let created: TypedDocument | undefined;
      await act(async () => {
        created = await result.current.createDocument({ title: 'New' });
      });

      expect(created?.documentId).toBe('doc-new');
      expect(result.current.documents[0].documentId).toBe('doc-new');
      expect(result.current.documents).toHaveLength(2);
    });

    it('throws when idToken is null', async () => {
      globalThis.fetch = stubFetch({ items: [] });

      const { result } = renderHook(() =>
        useTypedDocuments({ idToken: null, typeId: TYPE_ID }),
      );

      await expect(
        act(() => result.current.createDocument({ title: 'Fail' })),
      ).rejects.toThrow('not ready');
    });

    it('throws when fetch returns non-OK', async () => {
      const mockFetch = stubFetch({ items: [DOC] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() =>
        useTypedDocuments({ idToken: TOKEN, typeId: TYPE_ID }),
      );
      await waitFor(() => expect(result.current.loading).toBe(false));

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        text: () => Promise.resolve('Invalid values'),
        json: () => Promise.reject(new Error('not json')),
      } as unknown as Response);

      await expect(
        act(() => result.current.createDocument({ title: 'Bad' })),
      ).rejects.toThrow('422');
    });
  });

  describe('refresh', () => {
    it('triggers a re-fetch when called', async () => {
      const mockFetch = stubFetch({ items: [DOC] });
      globalThis.fetch = mockFetch;

      const { result } = renderHook(() =>
        useTypedDocuments({ idToken: TOKEN, typeId: TYPE_ID }),
      );
      await waitFor(() => expect(result.current.loading).toBe(false));
      // StrictMode runs the mount effect twice, so the mount fetch count is
      // not 1. What matters is that refresh() adds exactly one more call.
      const afterMount = mockFetch.mock.calls.length;
      expect(afterMount).toBeGreaterThan(0);

      act(() => result.current.refresh());
      await waitFor(() =>
        expect(mockFetch.mock.calls.length).toBe(afterMount + 1),
      );
    });
  });
});
