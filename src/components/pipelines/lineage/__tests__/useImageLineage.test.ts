// src/components/pipelines/lineage/__tests__/useImageLineage.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useImageLineage, clearImageLineageCache, type ImageLineageEntry } from '../useImageLineage';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sourceEntry: ImageLineageEntry = {
  imageId: 'img-source',
  producedByStepId: 'node-source',
  producedByNodeKind: 'image-source',
  width: 1568,
  height: 1024,
  mimeType: 'image/jpeg',
  at: '2026-01-01T00:00:00.000Z',
};

const cropEntry: ImageLineageEntry = {
  imageId: 'img-crop-1',
  producedByStepId: 'node-crop',
  producedByNodeKind: 'image:crop',
  parentImageId: 'img-source',
  width: 400,
  height: 300,
  mimeType: 'image/png',
  at: '2026-01-01T00:00:01.000Z',
};

function makeOkResponse(entries: ImageLineageEntry[]) {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => ({ entries }),
  } as unknown as Response;
}

function makeErrorResponse(status: number, statusText: string) {
  return {
    ok: false,
    status,
    statusText,
    json: async () => ({}),
  } as unknown as Response;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useImageLineage', () => {
  beforeEach(() => {
    clearImageLineageCache();
    vi.spyOn(globalThis, 'fetch').mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    clearImageLineageCache();
  });

  it('returns loading=true while fetching, then entries on success', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(makeOkResponse([sourceEntry, cropEntry]));

    const { result } = renderHook(() =>
      useImageLineage('run-1', 'pipeline-1'),
    );

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    // Wait for fetch to complete
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.entries).toHaveLength(2);
    expect(result.current.entries[0].imageId).toBe('img-source');
  });

  it('surfaces an error when the fetch returns a non-ok response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(makeErrorResponse(404, 'Not Found'));

    const { result } = renderHook(() =>
      useImageLineage('run-missing', 'pipeline-1'),
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toMatch(/404/);
    expect(result.current.entries).toHaveLength(0);
  });

  it('uses the module-level cache on second mount — fetch called only once', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(makeOkResponse([sourceEntry]));

    // First mount
    const { result: r1 } = renderHook(() =>
      useImageLineage('run-cached', 'pipeline-1'),
    );
    await act(async () => { await Promise.resolve(); });
    expect(r1.current.entries).toHaveLength(1);

    // Second mount for the same runId — should use cache, no second fetch
    const { result: r2 } = renderHook(() =>
      useImageLineage('run-cached', 'pipeline-1'),
    );
    await act(async () => { await Promise.resolve(); });
    expect(r2.current.entries).toHaveLength(1);

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('refetch busts the cache and re-fetches', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(makeOkResponse([sourceEntry]))
      .mockResolvedValueOnce(makeOkResponse([sourceEntry, cropEntry]));

    const { result } = renderHook(() =>
      useImageLineage('run-refetch', 'pipeline-1'),
    );
    await act(async () => { await Promise.resolve(); });
    expect(result.current.entries).toHaveLength(1);

    // Trigger refetch
    act(() => { result.current.refetch(); });
    await act(async () => { await Promise.resolve(); });

    expect(result.current.entries).toHaveLength(2);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('returns empty entries and does not fetch when runId is null', async () => {
    const { result } = renderHook(() =>
      useImageLineage(null, 'pipeline-1'),
    );

    await act(async () => { await Promise.resolve(); });

    expect(result.current.entries).toHaveLength(0);
    expect(result.current.loading).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });
});
