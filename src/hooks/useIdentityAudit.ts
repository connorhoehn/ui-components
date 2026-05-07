// Identity audit hook — query audit logs and entity history.

import { useState, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';
import type { AuditRecord, AuditQueryParams } from '../types/identity';

export interface UseIdentityAuditReturn {
  records: AuditRecord[];
  loading: boolean;
  error: string | null;
  query: (params: AuditQueryParams) => Promise<void>;
  getEntityHistory: (entityType: string, entityId: string) => Promise<AuditRecord[]>;
  getStateAtTime: (entityId: string, timestamp: number) => Promise<Record<string, unknown> | null>;
}

export function useIdentityAudit(): UseIdentityAuditReturn {
  const { idToken } = useIdentityContext();
  const [records, setRecords] = useState<AuditRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = useCallback(async (params: AuditQueryParams): Promise<void> => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const searchParams = new URLSearchParams();
      if (params.entityType) searchParams.set('entityType', params.entityType);
      if (params.entityId) searchParams.set('entityId', params.entityId);
      if (params.fromTime != null) searchParams.set('fromTime', String(params.fromTime));
      if (params.toTime != null) searchParams.set('toTime', String(params.toTime));
      if (params.limit != null) searchParams.set('limit', String(params.limit));
      if (params.cursor) searchParams.set('cursor', params.cursor);

      const qs = searchParams.toString();
      const path = `/api/audit${qs ? `?${qs}` : ''}`;
      const data = await apiFetch<AuditRecord[]>(path, idToken);
      setRecords(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const getEntityHistory = useCallback(async (entityType: string, entityId: string): Promise<AuditRecord[]> => {
    if (!idToken) return [];
    try {
      return await apiFetch<AuditRecord[]>(
        `/api/audit/entity/${entityType}/${entityId}`,
        idToken,
      );
    } catch (err) {
      setError((err as Error).message);
      return [];
    }
  }, [idToken]);

  const getStateAtTime = useCallback(async (entityId: string, timestamp: number): Promise<Record<string, unknown> | null> => {
    if (!idToken) return null;
    try {
      return await apiFetch<Record<string, unknown>>(
        `/api/audit/state/${entityId}?at=${timestamp}`,
        idToken,
      );
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  }, [idToken]);

  return { records, loading, error, query, getEntityHistory, getStateAtTime };
}
