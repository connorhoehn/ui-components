// src/components/pipelines/lineage/useImageLineage.ts
//
// Hook that fetches /api/pipeline/runs/:runId/image-lineage and exposes
// { entries, loading, error, refetch }. Module-level cache by runId so
// multiple consumers share the same fetch.

import { useEffect, useRef, useState, useCallback } from 'react';

export interface ImageLineageEntry {
  imageId: string;
  producedByStepId: string;
  producedByNodeKind: string;
  parentImageId?: string;
  width: number;
  height: number;
  mimeType: string;
  bbox?: { x: number; y: number; width: number; height: number };
  at: string;
}

export interface UseImageLineageResult {
  entries: ImageLineageEntry[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Module-level cache: runId → { entries, fetchedAt }
// Avoids duplicate fetches when multiple consumers mount for the same run.
interface CacheEntry {
  entries: ImageLineageEntry[];
  fetchedAt: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60_000; // 1 minute

// In-flight requests by runId. The `cache` above only dedupes callers that
// mount AFTER a response has landed; two callers that mount while the first
// request is still open both saw an empty cache and both fetched. That is the
// normal case, not an edge case — a StrictMode/dev double-mount, an
// <Activity>/Offscreen re-show, a Suspense retry, or simply two lineage panels
// on one page all mount concurrently. Sharing the promise makes the module's
// stated contract ("multiple consumers share the same fetch") actually true.
const inflight = new Map<string, Promise<ImageLineageEntry[]>>();

function getCached(runId: string): ImageLineageEntry[] | null {
  const entry = cache.get(runId);
  if (!entry) return null;
  if (Date.now() - entry.fetchedAt > CACHE_TTL_MS) {
    cache.delete(runId);
    return null;
  }
  return entry.entries;
}

function setCached(runId: string, entries: ImageLineageEntry[]): void {
  cache.set(runId, { entries, fetchedAt: Date.now() });
}

// Exported for test-time cache clearing.
export function clearImageLineageCache(): void {
  cache.clear();
  inflight.clear();
}

/**
 * One GET per runId, shared by every concurrent caller. Resolves with the
 * entries; rejects with the fetch/HTTP error so each caller can surface it.
 */
function fetchLineage(runId: string, pipelineId: string): Promise<ImageLineageEntry[]> {
  const existing = inflight.get(runId);
  if (existing) return existing;

  const url = `/api/pipeline/runs/${encodeURIComponent(runId)}/image-lineage?pipelineId=${encodeURIComponent(pipelineId)}`;

  const promise: Promise<ImageLineageEntry[]> = fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`image-lineage: ${res.status} ${res.statusText}`);
      }
      const data = (await res.json()) as { entries: ImageLineageEntry[] };
      const fetched = Array.isArray(data.entries) ? data.entries : [];
      setCached(runId, fetched);
      return fetched;
    })
    .finally(() => {
      // Only retire OUR entry: a `refetch()` may already have replaced it with
      // a newer request, and deleting that would let a third caller start yet
      // another duplicate fetch.
      if (inflight.get(runId) === promise) inflight.delete(runId);
    });

  inflight.set(runId, promise);
  return promise;
}

export function useImageLineage(
  runId: string | null | undefined,
  pipelineId: string | null | undefined,
): UseImageLineageResult {
  const [entries, setEntries] = useState<ImageLineageEntry[]>(() => {
    if (runId) {
      return getCached(runId) ?? [];
    }
    return [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchCountRef = useRef(0);

  const doFetch = useCallback(() => {
    if (!runId || !pipelineId) return;

    const cached = getCached(runId);
    if (cached) {
      setEntries(cached);
      setLoading(false);
      setError(null);
      return;
    }

    const token = ++fetchCountRef.current;
    setLoading(true);
    setError(null);

    fetchLineage(runId, pipelineId)
      .then((fetched) => {
        if (token !== fetchCountRef.current) return;
        setEntries(fetched);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (token !== fetchCountRef.current) return;
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, [runId, pipelineId]);

  // Expose a stable refetch that busts the cache for this run.
  const refetch = useCallback(() => {
    if (runId) {
      cache.delete(runId);
      // Drop the shared in-flight entry too, or "refetch" would silently
      // re-join the very request the caller is trying to supersede.
      inflight.delete(runId);
    }
    doFetch();
  }, [runId, doFetch]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return { entries, loading, error, refetch };
}

export default useImageLineage;
