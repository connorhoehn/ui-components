// frontend/src/hooks/useIngestItems.ts
//
// Hook for fetching and managing ingest items. Supports optional filtering by
// sourceId and status. Provides retry and skip actions for individual items.

import { useCallback, useEffect, useRef, useState } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import type { IngestItem, IngestItemStatus, IngestMappingMethod } from '../types/ingest';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

// Backend wire shape (from social-api/src/ingest/types.ts). The backend uses
// `ingestId` / `filePath` / `mappedTypeId`; the frontend type uses
// `itemId` / `sourcePath` / `documentTypeId`. Normalize here so the rest of
// the UI can stay on a single shape.
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

function normalizeItem(raw: BackendIngestItem): IngestItem {
  return {
    itemId:            raw.itemId ?? raw.ingestId ?? '',
    sourceId:          raw.sourceId,
    sourcePath:        raw.sourcePath ?? raw.filePath ?? '',
    status:            raw.status,
    documentTypeId:    raw.documentTypeId ?? raw.mappedTypeId ?? null,
    documentId:        raw.documentId ?? null,
    pipelineRunId:     raw.pipelineRunId ?? null,
    mappingMethod:     raw.mappingMethod ?? null,
    mappingConfidence: raw.mappingConfidence ?? null,
    attempts:          raw.attempts,
    error:             raw.error ?? null,
    createdAt:         raw.createdAt,
    updatedAt:         raw.updatedAt,
  };
}

export interface UseIngestItemsOptions {
  sourceId?: string | null;
  status?: IngestItemStatus | null;
}

export interface UseIngestItemsReturn {
  items: IngestItem[];
  loading: boolean;
  /** Why the LIST fetch failed. Never set by retry/skip — see `actionError`. */
  error: string | null;
  refresh: () => Promise<void>;
  retryItem: (itemId: string) => Promise<boolean>;
  skipItem: (itemId: string) => Promise<boolean>;
  /**
   * Why the last `retryItem`/`skipItem` failed, or `null`. Additive
   * (v2.95.0).
   *
   * These used to write into `error`, the same state the list loader owns.
   * A failed Skip therefore made `IngestItemsPage` hide the entire,
   * correctly-loaded table behind a banner reading "Failed to load ingest
   * items." — a statement that was simply false — whose Retry button
   * re-fetched the list rather than re-trying the skip. The next refresh
   * cleared `error`, everything reappeared, and the operator concluded the
   * skip had worked. It had not.
   */
  actionError: string | null;
  /** Dismiss `actionError`. Additive (v2.95.0). */
  clearActionError: () => void;
}

export function useIngestItems(options: UseIngestItemsOptions = {}): UseIngestItemsReturn {
  const { sourceId, status } = options;
  const { idToken } = useIdentityContext();
  const [items, setItems] = useState<IngestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const cancelledRef = useRef(false);

  const headers = useCallback((): Record<string, string> => {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (idToken) h['Authorization'] = `Bearer ${idToken}`;
    return h;
  }, [idToken]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (sourceId) params.set('sourceId', sourceId);
      if (status) params.set('status', status);
      const qs = params.toString();
      const url = `${BASE_URL}/api/ingest/items${qs ? `?${qs}` : ''}`;
      const res = await fetch(url, { headers: headers() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json() as { items?: BackendIngestItem[] };
      if (!cancelledRef.current) {
        setItems((body.items ?? []).map(normalizeItem));
      }
    } catch (err) {
      if (!cancelledRef.current) {
        setError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      if (!cancelledRef.current) {
        setLoading(false);
      }
    }
  }, [headers, sourceId, status]);

  useEffect(() => {
    cancelledRef.current = false;
    void refresh();
    return () => { cancelledRef.current = true; };
  }, [refresh]);

  const clearActionError = useCallback(() => setActionError(null), []);

  const retryItem = useCallback(async (itemId: string): Promise<boolean> => {
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/items/${itemId}/retry`, {
        method: 'POST',
        headers: headers(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Update local state optimistically
      setItems((prev) =>
        prev.map((it) => (it.itemId === itemId ? { ...it, status: 'queued' as const, error: null } : it)),
      );
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : String(err));
      return false;
    }
  }, [headers]);

  const skipItem = useCallback(async (itemId: string): Promise<boolean> => {
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/items/${itemId}/skip`, {
        method: 'POST',
        headers: headers(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Remove skipped item from local state
      setItems((prev) => prev.filter((it) => it.itemId !== itemId));
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : String(err));
      return false;
    }
  }, [headers]);

  return {
    items, loading, error, refresh, retryItem, skipItem,
    actionError, clearActionError,
  };
}
