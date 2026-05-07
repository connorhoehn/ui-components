// Identity diagnostics hook — cluster health, rates, and DLQ management.

import { useState, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';
import type { DiagnosticsInfo, RateInfo, DlqEntry } from '../types/identity';

export interface UseIdentityDiagnosticsReturn {
  diagnostics: DiagnosticsInfo | null;
  rates: RateInfo | null;
  dlq: DlqEntry[];
  loading: boolean;
  error: string | null;
  redriveDlq: (id: string) => Promise<void>;
  purgeDlq: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useIdentityDiagnostics(): UseIdentityDiagnosticsReturn {
  const { idToken } = useIdentityContext();
  const [diagnostics, setDiagnostics] = useState<DiagnosticsInfo | null>(null);
  const [rates, setRates] = useState<RateInfo | null>(null);
  const [dlq, setDlq] = useState<DlqEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const [diagData, rateData, dlqData] = await Promise.all([
        apiFetch<DiagnosticsInfo>('/api/admin/diagnostics', idToken),
        apiFetch<RateInfo>('/api/admin/diagnostics/rates', idToken),
        apiFetch<DlqEntry[]>('/api/admin/diagnostics/dlq', idToken),
      ]);
      setDiagnostics(diagData);
      setRates(rateData);
      setDlq(dlqData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const redriveDlq = useCallback(async (id: string): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      await apiFetch<void>(`/api/admin/diagnostics/dlq/${id}/redrive`, idToken, {
        method: 'POST',
      });
      setDlq((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken]);

  const purgeDlq = useCallback(async (id: string): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      await apiFetch<void>(`/api/admin/diagnostics/dlq/${id}`, idToken, {
        method: 'DELETE',
      });
      setDlq((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken]);

  return { diagnostics, rates, dlq, loading, error, redriveDlq, purgeDlq, refresh };
}
