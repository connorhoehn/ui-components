// frontend/src/hooks/useMappingReviewQueue.ts
//
// Polls GET /api/ingest/mapping/review for ingest items that the LLM
// mapper produced low-confidence type matches for. AGENTIC_ETL_VISION §B
// Tier 2 — the human-in-the-loop queue.
//
// Returns the same `IngestItem` shape the rest of the ingest UI uses
// (sourcePath / itemId / documentTypeId), with a normalize step that
// reshapes the backend's `ingestId` / `filePath` / `mappedTypeId` fields.

import { useCallback, useEffect, useState } from 'react';
import { useOptionalIdentityContext } from '../contexts/IdentityContext';
import { getApiBaseUrl } from '../lib/apiBaseUrl';
import type { IngestItem, IngestItemStatus, IngestMappingMethod } from '../types/ingest';

const POLL_INTERVAL_MS = 15_000;

interface BackendIngestItem {
  ingestId?: string;
  itemId?: string;
  sourceId: string;
  filePath?: string;
  sourcePath?: string;
  status: IngestItemStatus;
  mappedTypeId?: string | null;
  documentTypeId?: string | null;
  mappingConfidence?: number | null;
  mappingMethod?: IngestMappingMethod | null;
  documentId?: string | null;
  pipelineRunId?: string | null;
  attempts?: number;
  error?: string | null;
  createdAt: string;
  updatedAt: string;
}

function normalize(b: BackendIngestItem): IngestItem {
  return {
    itemId: b.itemId ?? b.ingestId ?? '',
    sourceId: b.sourceId,
    sourcePath: b.sourcePath ?? b.filePath ?? '',
    status: b.status,
    documentTypeId: b.documentTypeId ?? b.mappedTypeId ?? null,
    documentId: b.documentId ?? null,
    pipelineRunId: b.pipelineRunId ?? null,
    mappingMethod: b.mappingMethod ?? null,
    mappingConfidence: b.mappingConfidence ?? null,
    attempts: b.attempts,
    error: b.error ?? null,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  };
}

export interface UseMappingReviewQueueOptions {
  /** Wins over this library's `useIdentityContext().idToken`. */
  idToken?: string | null;
  /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
  baseUrl?: string;
}

export interface UseMappingReviewQueueResult {
  items: IngestItem[];
  threshold: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  remap: (itemId: string, typeId: string) => Promise<void>;
  skip: (itemId: string) => Promise<void>;
}

export function useMappingReviewQueue(options: UseMappingReviewQueueOptions = {}): UseMappingReviewQueueResult {
  const identityCtx = useOptionalIdentityContext();
  const idToken = options.idToken !== undefined ? options.idToken : (identityCtx?.idToken ?? null);
  const BASE_URL = options.baseUrl ?? getApiBaseUrl();
  const [items, setItems] = useState<IngestItem[]>([]);
  const [threshold, setThreshold] = useState(0.7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headers = useCallback((): Record<string, string> => {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (idToken) h['Authorization'] = `Bearer ${idToken}`;
    return h;
  }, [idToken]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/mapping/review`, { headers: headers() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = (await res.json()) as { items: BackendIngestItem[]; threshold: number };
      setItems(body.items.map(normalize));
      setThreshold(body.threshold);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [headers, BASE_URL]);

  useEffect(() => {
    void refresh();
    const handle = window.setInterval(() => {
      if (!document.hidden) void refresh();
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(handle);
  }, [refresh]);

  const remap = useCallback(
    async (itemId: string, typeId: string) => {
      const res = await fetch(`${BASE_URL}/api/ingest/items/${itemId}/remap`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ typeId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await refresh();
    },
    [headers, refresh, BASE_URL],
  );

  const skip = useCallback(
    async (itemId: string) => {
      const res = await fetch(`${BASE_URL}/api/ingest/items/${itemId}/skip`, {
        method: 'POST',
        headers: headers(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await refresh();
    },
    [headers, refresh, BASE_URL],
  );

  return { items, threshold, loading, error, refresh, remap, skip };
}

export default useMappingReviewQueue;
