// frontend/src/hooks/useSyncConflicts.ts
//
// Hook for the operator write-back conflicts queue.
//
// Backend endpoint shape (Agent F to implement — defined here so the UI can
// be built and verified before the backend lands):
//
//   GET    /api/sync/conflicts                    -> { conflicts: SyncConflict[] }
//   POST   /api/sync/conflicts/:id/resolve        body: ConflictResolution
//          -> { conflict: SyncConflict }
//   POST   /api/sync/conflicts/:id/discard        -> { conflict: SyncConflict }
//
// Until the endpoint exists this hook falls back to a small set of mock
// conflicts so the UI is verifiable end-to-end against the seeded sources.
// Once the real endpoint returns 200, the mock fallback drops out
// automatically (we only fall back on network or 404 errors).

import { useCallback, useEffect, useRef, useState } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import type { ConflictResolution, SyncConflict } from '../types/ingest';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

// ---------------------------------------------------------------------------
// Mock fallback (matches sourceIds seeded by scripts/seed-ingest-mocks.sh)
// ---------------------------------------------------------------------------

function buildMockConflicts(): SyncConflict[] {
  const now = Date.now();
  const minutesAgo = (m: number) => new Date(now - m * 60_000).toISOString();
  return [
    {
      conflictId: 'cfl-001',
      sourceId: 'src-gdrive-team',
      documentId: 'doc-policy-acceptable-use',
      documentTypeId: 'doctype-policy',
      sourceRef: 'drive:1A2B3C4D5E6F',
      summary: 'Title and body changed remotely while platform edit was pending',
      fields: [
        {
          field: 'title',
          sourceValue: 'Acceptable Use Policy (revised May 2026)',
          platformValue: 'Acceptable Use Policy — DRAFT',
          mergedValue: 'Acceptable Use Policy (revised May 2026) — DRAFT',
        },
        {
          field: 'body.intro',
          sourceValue: 'This policy supersedes the 2025 version and applies to all employees, contractors, and partners.',
          platformValue: 'This policy applies to all staff and contractors. Reviewed quarterly.',
        },
      ],
      status: 'pending',
      platformUpdatedAt: minutesAgo(8),
      sourceUpdatedAt: minutesAgo(3),
      detectedAt: minutesAgo(2),
    },
    {
      conflictId: 'cfl-003',
      sourceId: 'src-s3-reports',
      documentId: 'doc-fin-0002',
      documentTypeId: 'doctype-financial-report',
      sourceRef: 's3://acme-quarterly-reports/2026/Q2/financial-overview.pdf',
      summary: 'Source replaced PDF; platform comments pending',
      fields: [
        {
          field: 'attachment.sha256',
          sourceValue: 'sha256:c1a2b3...new',
          platformValue: 'sha256:9f8e7d...old',
        },
      ],
      status: 'pending',
      platformUpdatedAt: minutesAgo(220),
      sourceUpdatedAt: minutesAgo(15),
      detectedAt: minutesAgo(15),
    },
  ];
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface UseSyncConflictsReturn {
  conflicts: SyncConflict[];
  loading: boolean;
  error: string | null;
  /** True when the data came from the local mock fallback. */
  usingMock: boolean;
  refresh: () => Promise<void>;
  resolveConflict: (id: string, resolution: ConflictResolution) => Promise<boolean>;
  discardConflict: (id: string) => Promise<boolean>;
}

export function useSyncConflicts(): UseSyncConflictsReturn {
  const { idToken } = useIdentityContext();
  const [conflicts, setConflicts] = useState<SyncConflict[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMock, setUsingMock] = useState(false);
  // Two DIFFERENT concerns, deliberately not one flag.
  //
  // `mountedRef` answers "is this hook still mounted"; it is shared across
  // effect runs, which is correct — a re-run means we are still mounted.
  //
  // `requestIdRef` answers "is this response still the one we want". That
  // question used to be answered by the mount flag too, and it cannot be: the
  // cleanup set it true-for-cancelled and the next effect run immediately set
  // it back to false, resurrecting the cancellation. `refresh` is memoised on
  // `idToken`, so the effect re-runs on every token refresh or identity
  // switch — and the request issued under the OLD token then sailed past the
  // guard. That request usually 404s or fails, and BOTH of those branches
  // swap in `buildMockConflicts()` with `usingMock = true`, so the page could
  // silently replace real conflicts with fabricated ones and let an operator
  // resolve/discard against rows that do not exist. A monotonic token can't
  // be resurrected: each call claims the next id and only the current holder
  // may write.
  const mountedRef = useRef(true);
  const requestIdRef = useRef(0);

  const headers = useCallback((): Record<string, string> => {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (idToken) h['Authorization'] = `Bearer ${idToken}`;
    return h;
  }, [idToken]);

  const refresh = useCallback(async () => {
    const token = ++requestIdRef.current;
    const current = () => mountedRef.current && token === requestIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/sync/conflicts`, { headers: headers() });
      if (res.status === 404) {
        // Endpoint not implemented yet — fall back to the mock set.
        if (current()) {
          setConflicts(buildMockConflicts());
          setUsingMock(true);
        }
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json() as { conflicts?: SyncConflict[] };
      if (current()) {
        setConflicts(body.conflicts ?? []);
        setUsingMock(false);
      }
    } catch (err) {
      // Network-level failure (server down, CORS, …) — keep operator working
      // against mock data so the page is still verifiable.
      if (current()) {
        setConflicts(buildMockConflicts());
        setUsingMock(true);
        setError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      if (current()) setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    mountedRef.current = true;
    void refresh();
    return () => {
      mountedRef.current = false;
      // Retire whatever is in flight so a superseded run can never write.
      requestIdRef.current += 1;
    };
  }, [refresh]);

  const resolveConflict = useCallback(async (id: string, resolution: ConflictResolution): Promise<boolean> => {
    if (usingMock) {
      // Mock path — just remove the conflict locally so the UI can be exercised.
      setConflicts((prev) => prev.map((c) =>
        c.conflictId === id ? { ...c, status: 'resolved', resolvedAt: new Date().toISOString() } : c,
      ));
      return true;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/sync/conflicts/${id}/resolve`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(resolution),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json() as { conflict?: SyncConflict };
      if (body.conflict) {
        setConflicts((prev) => prev.map((c) => (c.conflictId === id ? body.conflict! : c)));
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    }
  }, [headers, usingMock]);

  const discardConflict = useCallback(async (id: string): Promise<boolean> => {
    if (usingMock) {
      setConflicts((prev) => prev.map((c) =>
        c.conflictId === id ? { ...c, status: 'discarded', resolvedAt: new Date().toISOString() } : c,
      ));
      return true;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/sync/conflicts/${id}/discard`, {
        method: 'POST',
        headers: headers(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setConflicts((prev) => prev.map((c) =>
        c.conflictId === id ? { ...c, status: 'discarded', resolvedAt: new Date().toISOString() } : c,
      ));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    }
  }, [headers, usingMock]);

  return { conflicts, loading, error, usingMock, refresh, resolveConflict, discardConflict };
}
