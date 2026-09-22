// frontend/src/hooks/useDocumentTypes.ts
//
// CRUD hook for document type definitions — REMOTE-FIRST.
//
// History: Phase A.5 kept localStorage authoritative and dual-wrote to
// `/api/document-types` as a fire-and-forget shadow. That inversion is what
// broke /documents: the operator's types lived only in this browser's
// localStorage, so any browser-state loss rendered "No document types
// defined yet" even while the server held copies. Remote-first fixes the
// root:
//
//   * READ: the server is the source of truth. localStorage is demoted to an
//     offline/optimistic cache — it paints instantly and covers server
//     outages, but a successful fetch always overwrites it. "No document
//     types" now means the SERVER said so (`source === 'remote'`).
//   * WRITE: write-through, server first. A server 4xx REJECTS the save (the
//     caller must render the failure — no silent "saved"); a network/5xx
//     failure degrades to an offline local save that is surfaced as such.
//   * MIGRATION: on the first successful fetch, any cached types the server
//     does not have (matched by id, then case-insensitive name) are uploaded
//     automatically — idempotent, so pre-remote-first localStorage types stop
//     silently dying with the browser profile. The upload carries the full
//     local shape as `editorSchema`, so the type's id survives the round-trip.

import { useState, useCallback, useEffect, useRef } from 'react';
import type { DocumentType } from '../types/documentType';
import {
  fetchDocumentTypesFromServer,
  setDocumentTypeApiBaseUrl,
  syncDocumentTypeCreate,
  syncDocumentTypeUpdate,
  syncDocumentTypeDelete,
  isRejection,
} from '../lib/documentTypeApiAdapter';

export const STORAGE_KEY = 'ws_document_types_v1';

// ---------------------------------------------------------------------------
// Type guard — rejects any entry missing the required DocumentType fields.
// Silently drops stale/corrupt items rather than crashing or surfacing garbage.
// ---------------------------------------------------------------------------

export function isValidDocumentType(x: unknown): x is DocumentType {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id          === 'string' && o.id.length > 0 &&
    typeof o.name        === 'string' && o.name.length > 0 &&
    typeof o.description === 'string' &&
    typeof o.icon        === 'string' &&
    Array.isArray(o.fields) &&
    typeof o.createdAt   === 'string' &&
    typeof o.updatedAt   === 'string'
  );
}

// ---------------------------------------------------------------------------
// Cache helpers — deliberately separate from React so tests (and the one
// remaining synchronous consumer, DocumentEditorPage's template effect) can
// call them directly. This is the offline CACHE, not the source of truth.
// ---------------------------------------------------------------------------

export function loadTypes(): DocumentType[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter(isValidDocumentType);
    // If any entries were invalid, rewrite storage immediately so future reads
    // don't carry the stale data forward.
    if (valid.length !== parsed.length) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(valid)); } catch { /* ignore */ }
    }
    return valid;
  } catch {
    return [];
  }
}

export function persistTypes(types: DocumentType[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(types));
  } catch { /* ignore QuotaExceededError */ }
}

/**
 * Fetch the server list, reconcile the offline cache into it (uploading
 * cache-only types — the migration described above), persist the result as
 * the new cache, and return it. Shared by the hook and by non-hook callers
 * (DocumentEditorPage's template-population effect).
 *
 * Returns `{ ok: false }` untouched-cache on fetch failure so callers can
 * fall back.
 */
/** Local type ids already handed to the migration this session. See below. */
const migrationAttempted = new Set<string>();

/** Test seam — the guard is session-scoped, so suites must clear it. */
export function _resetMigrationGuardForTests(): void {
  migrationAttempted.clear();
}

export async function refreshTypesFromServer(
  idToken?: string | null,
): Promise<{ ok: true; types: DocumentType[] } | { ok: false; error: string; cached: DocumentType[] }> {
  const res = await fetchDocumentTypesFromServer(idToken);
  if (!res.ok) {
    return { ok: false, error: res.error, cached: loadTypes() };
  }

  const server = res.types;
  const cached = loadTypes();
  const byId = new Set(server.map((t) => t.id));
  const byName = new Set(server.map((t) => t.name.toLowerCase()));

  // One-time migration kindness — but ONLY for types that never lived on the
  // server (no `serverTypeId` marker): pre-remote-era localStorage types and
  // offline-created ones. A marked cache entry that the server no longer
  // lists was DELETED server-side; re-uploading it would resurrect deleted
  // types forever (observed live: a dev tab with a polluted cache kept
  // re-seeding rows the cleanup had just removed).
  const cacheOnly = cached.filter(
    (t) => !t.serverTypeId && !byId.has(t.id) && !byName.has(t.name.toLowerCase()),
  );
  for (const t of cacheOnly) {
    // At most one upload per local id per session. The migration is driven
    // from a mount effect, so anything that runs that effect twice against
    // the same (still stale) server list uploads the same type twice and
    // leaves a duplicate row behind: React StrictMode's double-mount does it
    // on every dev page load, and so does a token change or a remount that
    // lands before the first POST is reflected in a subsequent GET. The
    // `serverTypeId` marker below cannot cover this — it is only stamped
    // once the first POST has already answered.
    if (migrationAttempted.has(t.id)) continue;
    migrationAttempted.add(t.id);
    void syncDocumentTypeCreate(t, idToken).then((r) => {
      if (!r.ok || !r.serverTypeId) return;
      // Stamp the marker so later sessions treat it as server-backed.
      const current = loadTypes();
      persistTypes(current.map((c) => (c.id === t.id ? { ...c, serverTypeId: r.serverTypeId } : c)));
    });
  }

  const merged = [...server, ...cacheOnly];
  persistTypes(merged);
  return { ok: true, types: merged };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/** Where the currently rendered list came from. */
export type TypesSource = 'loading' | 'remote' | 'cache';

export type SaveOutcome =
  | { status: 'synced'; type: DocumentType }
  /** Server unreachable / 5xx — saved to the local cache, NOT on the server. */
  | { status: 'offline'; type: DocumentType; error: string }
  /** Server rejected the payload (4xx) — NOTHING was saved. */
  | { status: 'rejected'; error: string };

export type DeleteOutcome =
  | { status: 'synced' }
  | { status: 'offline'; error: string }
  | { status: 'rejected'; error: string };

export interface UseDocumentTypesOptions {
  /** Cognito ID token. Attached to every server call when present. */
  idToken?: string | null;
  /**
   * Origin for `/api/document-types`. Applied through
   * `setDocumentTypeApiBaseUrl`, and it has to be given here (or set at boot)
   * because the build-time `VITE_*` names this module falls back to are baked
   * into the LIBRARY's bundle and are always empty for a consumer.
   */
  baseUrl?: string;
}

export interface UseDocumentTypesReturn {
  types: DocumentType[];
  /** True while the initial server fetch (or a refresh) is in flight. */
  loading: boolean;
  /** 'remote' = list reflects the server; 'cache' = offline fallback. */
  source: TypesSource;
  /** Last fetch error (when source === 'cache'), else null. */
  error: string | null;
  /** Re-fetch from the server. */
  refresh: () => Promise<void>;
  createType: (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => Promise<SaveOutcome>;
  updateType: (id: string, patch: Partial<Omit<DocumentType, 'id' | 'createdAt'>>) => Promise<SaveOutcome>;
  deleteType: (id: string) => Promise<DeleteOutcome>;
  getType: (id: string) => DocumentType | undefined;
}

export function useDocumentTypes(options: UseDocumentTypesOptions = {}): UseDocumentTypesReturn {
  const { idToken, baseUrl } = options;
  // Applied during render, not in an effect: the mount-time fetch below runs
  // in an effect that would otherwise fire FIRST and go to the wrong origin.
  if (baseUrl !== undefined) setDocumentTypeApiBaseUrl(baseUrl);
  const idTokenRef = useRef(idToken);
  idTokenRef.current = idToken;

  // Paint the cache instantly; the mount-time fetch replaces it.
  const [types, setTypes] = useState<DocumentType[]>(loadTypes);
  const [source, setSource] = useState<TypesSource>('loading');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Monotonic fetch counter so a slow stale response can't clobber a newer one.
  const fetchSeq = useRef(0);

  const refresh = useCallback(async (): Promise<void> => {
    const seq = ++fetchSeq.current;
    setLoading(true);
    const result = await refreshTypesFromServer(idTokenRef.current);
    if (!mountedRef.current || seq !== fetchSeq.current) return;
    if (result.ok) {
      setTypes(result.types);
      setSource('remote');
      setError(null);
    } else {
      setTypes(result.cached);
      setSource('cache');
      setError(result.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh, idToken]);

  /** Commit a new full list to state + offline cache. */
  const commit = useCallback((next: DocumentType[]) => {
    persistTypes(next);
    setTypes(next);
  }, []);

  const createType = useCallback(
    async (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>): Promise<SaveOutcome> => {
      const now = new Date().toISOString();
      const newType: DocumentType = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

      const r = await syncDocumentTypeCreate(newType, idTokenRef.current);
      if (isRejection(r)) {
        return { status: 'rejected', error: r.error ?? 'server rejected the save' };
      }
      // Mark server-backed copies so the migration never mistakes them for
      // local-only types; offline saves stay unmarked until they sync.
      const toStore: DocumentType = r.ok && r.serverTypeId
        ? { ...newType, serverTypeId: r.serverTypeId }
        : newType;
      commit([...loadTypes(), toStore]);
      return r.ok
        ? { status: 'synced', type: toStore }
        : { status: 'offline', type: toStore, error: r.error ?? 'server unreachable' };
    },
    [commit],
  );

  const updateType = useCallback(
    async (id: string, patch: Partial<Omit<DocumentType, 'id' | 'createdAt'>>): Promise<SaveOutcome> => {
      // Base the update on current state (which reflects the server after a
      // fetch), not the possibly-staler cache.
      const current = types.find((t) => t.id === id) ?? loadTypes().find((t) => t.id === id);
      if (!current) return { status: 'rejected', error: `unknown document type ${id}` };
      const updated: DocumentType = { ...current, ...patch, id, updatedAt: new Date().toISOString() };

      const r = await syncDocumentTypeUpdate(updated, idTokenRef.current);
      if (isRejection(r)) {
        return { status: 'rejected', error: r.error ?? 'server rejected the save' };
      }
      const base = types.some((t) => t.id === id) ? types : loadTypes();
      commit(base.map((t) => (t.id === id ? updated : t)));
      return r.ok
        ? { status: 'synced', type: updated }
        : { status: 'offline', type: updated, error: r.error ?? 'server unreachable' };
    },
    [commit, types],
  );

  const deleteType = useCallback(
    async (id: string): Promise<DeleteOutcome> => {
      const target = types.find((t) => t.id === id) ?? loadTypes().find((t) => t.id === id);
      const r = await syncDocumentTypeDelete(id, idTokenRef.current, target?.serverTypeId);
      if (isRejection(r)) {
        return { status: 'rejected', error: r.error ?? 'server rejected the delete' };
      }
      const base = types.some((t) => t.id === id) ? types : loadTypes();
      commit(base.filter((t) => t.id !== id));
      return r.ok ? { status: 'synced' } : { status: 'offline', error: r.error ?? 'server unreachable' };
    },
    [commit, types],
  );

  const getType = useCallback(
    (id: string): DocumentType | undefined => types.find(t => t.id === id),
    [types],
  );

  return { types, loading, source, error, refresh, createType, updateType, deleteType, getType };
}
