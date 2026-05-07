// frontend/src/hooks/usePipelineDefs.ts
//
// Lightweight hook for the "default pipeline picker" use case. Fetches
// the list of pipeline definitions from `/api/pipelines/defs` (the same
// endpoint pipelineStorageRemote.ts reads). We keep this separate from the
// PipelineEditorContext to avoid pulling the whole pipelines bundle into
// the ingest pages.

import { useCallback, useEffect, useRef, useState } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

export interface PipelineDefSummary {
  id: string;
  name: string;
  status?: string;
  icon?: string;
}

export interface UsePipelineDefsReturn {
  pipelines: PipelineDefSummary[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function usePipelineDefs(): UsePipelineDefsReturn {
  const { idToken } = useIdentityContext();
  const [pipelines, setPipelines] = useState<PipelineDefSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cancelledRef = useRef(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = {};
      if (idToken) headers['Authorization'] = `Bearer ${idToken}`;
      const res = await fetch(`${BASE_URL}/api/pipelines/defs`, {
        headers,
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json() as { pipelines?: Array<{ id: string; name: string; status?: string; icon?: string }> };
      if (!cancelledRef.current) {
        setPipelines((body.pipelines ?? []).map((p) => ({
          id: p.id,
          name: p.name,
          status: p.status,
          icon: p.icon,
        })));
      }
    } catch (err) {
      if (!cancelledRef.current) {
        setError(err instanceof Error ? err.message : String(err));
        setPipelines([]);
      }
    } finally {
      if (!cancelledRef.current) {
        setLoading(false);
      }
    }
  }, [idToken]);

  useEffect(() => {
    cancelledRef.current = false;
    void refresh();
    return () => { cancelledRef.current = true; };
  }, [refresh]);

  return { pipelines, loading, error, refresh };
}
