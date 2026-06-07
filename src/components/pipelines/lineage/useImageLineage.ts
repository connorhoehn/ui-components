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

    const url = `/api/pipeline/runs/${encodeURIComponent(runId)}/image-lineage?pipelineId=${encodeURIComponent(pipelineId)}`;

    fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(async (res) => {
        if (token !== fetchCountRef.current) return;
        if (!res.ok) {
          const msg = `image-lineage: ${res.status} ${res.statusText}`;
          setError(msg);
          setLoading(false);
          return;
        }
        const data = (await res.json()) as { entries: ImageLineageEntry[] };
        if (token !== fetchCountRef.current) return;
        const fetched = Array.isArray(data.entries) ? data.entries : [];
        setCached(runId, fetched);
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
    if (runId) cache.delete(runId);
    doFetch();
  }, [runId, doFetch]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return { entries, loading, error, refetch };
}

export default useImageLineage;
