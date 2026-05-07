// frontend/src/hooks/useIngestAudit.ts
//
// Polls GET /api/ingest/audit for the operator-facing audit-log viewer
// (hub#2214). Filter knobs are exposed as a single object so the page
// passes them through unchanged. AGENTIC_ETL_VISION §F.

import { useCallback, useEffect, useState } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
const POLL_INTERVAL_MS = 30_000;

export type IngestAuditEventType =
  | 'mapping.decided'
  | 'source.created'
  | 'source.updated'
  | 'source.paused'
  | 'source.resumed'
  | 'writeback.attempted'
  | 'writeback.failed';

export interface IngestAuditEntry {
  auditId: string;
  createdAt: string;
  actor: string;
  eventType: IngestAuditEventType;
  targetType: 'source' | 'item' | 'document';
  targetId: string;
  summary: string;
  detail: Record<string, unknown>;
}

export interface IngestAuditFilters {
  since?: string;
  until?: string;
  actor?: string;
  eventType?: IngestAuditEventType;
  targetId?: string;
  limit?: number;
}

export interface UseIngestAuditResult {
  entries: IngestAuditEntry[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useIngestAudit(filters: IngestAuditFilters = {}): UseIngestAuditResult {
  const { idToken } = useIdentityContext();
  const [entries, setEntries] = useState<IngestAuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (idToken) headers['Authorization'] = `Bearer ${idToken}`;
      const params = new URLSearchParams();
      if (filters.since) params.set('since', filters.since);
      if (filters.until) params.set('until', filters.until);
      if (filters.actor) params.set('actor', filters.actor);
      if (filters.eventType) params.set('eventType', filters.eventType);
      if (filters.targetId) params.set('targetId', filters.targetId);
      if (filters.limit) params.set('limit', String(filters.limit));
      const qs = params.toString();
      const url = `${BASE_URL}/api/ingest/audit${qs ? `?${qs}` : ''}`;
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = (await res.json()) as { entries: IngestAuditEntry[] };
      setEntries(body.entries);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [idToken, filters.since, filters.until, filters.actor, filters.eventType, filters.targetId, filters.limit]);

  useEffect(() => {
    void refresh();
    const handle = window.setInterval(() => {
      if (!document.hidden) void refresh();
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(handle);
  }, [refresh]);

  return { entries, loading, error, refresh };
}

export default useIngestAudit;
