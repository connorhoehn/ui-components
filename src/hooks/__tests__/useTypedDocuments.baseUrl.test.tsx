// Same defect as ActivityPanel's: `import.meta.env.VITE_SOCIAL_API_URL` is
// inlined into THIS library's bundle, so a consumer's value never arrives and
// every request went same-origin to a path that is not there.

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTypedDocuments } from '../useTypedDocuments';

function okFetch() {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ items: [] }),
  });
}

beforeEach(() => { vi.stubEnv('VITE_SOCIAL_API_URL', ''); });
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('useTypedDocuments baseUrl', () => {
  it('reads from the consumer-supplied origin', async () => {
    const fetchMock = okFetch();
    vi.stubGlobal('fetch', fetchMock);

    renderHook(() =>
      useTypedDocuments({ idToken: 'tok', typeId: 'retro', baseUrl: 'https://platform.example' }),
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://platform.example/api/typed-documents?typeId=retro',
    );
  });

  it('wins over the build-time env value', async () => {
    vi.stubEnv('VITE_SOCIAL_API_URL', 'https://baked-in.example');
    const fetchMock = okFetch();
    vi.stubGlobal('fetch', fetchMock);

    renderHook(() =>
      useTypedDocuments({ idToken: 'tok', typeId: 'retro', baseUrl: 'https://consumer.example' }),
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toContain('https://consumer.example');
  });

  it('posts a new document to the same origin', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [], documentId: 'd-1' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() =>
      useTypedDocuments({ idToken: 'tok', typeId: 'retro', baseUrl: 'https://platform.example' }),
    );
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    await act(async () => { await result.current.createDocument({}); });

    const post = fetchMock.mock.calls.find((c) => (c[1] as RequestInit | undefined)?.method === 'POST');
    expect(post?.[0]).toBe('https://platform.example/api/typed-documents');
  });
});
