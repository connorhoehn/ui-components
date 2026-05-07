// frontend/src/hooks/useDocTypeProposals.ts
//
// Polls GET /api/ingest/mapping/proposals for auto-discovered DocType
// candidates the LLM mapper raised. AGENTIC_ETL_VISION §B Tier 3 — operator
// promotes / rejects each proposal.

import { useCallback, useEffect, useState } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
const POLL_INTERVAL_MS = 30_000;

export interface ProposedField {
  name: string;
  sectionType: string;
  required: boolean;
}

export interface DocTypeProposalRow {
  proposalId: string;
  sourceId: string;
  signature: string;
  sampleIngestIds: string[];
  proposedName: string;
  proposedDescription: string;
  proposedFields: ProposedField[];
  reasoning: string;
  status: 'pending' | 'promoted' | 'rejected';
  createdAt: string;
}

export interface UseDocTypeProposalsResult {
  proposals: DocTypeProposalRow[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  promote: (proposalId: string) => Promise<void>;
  reject: (proposalId: string) => Promise<void>;
}

export function useDocTypeProposals(): UseDocTypeProposalsResult {
  const { idToken, userEmail } = useIdentityContext();
  const [proposals, setProposals] = useState<DocTypeProposalRow[]>([]);
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
      const res = await fetch(`${BASE_URL}/api/ingest/mapping/proposals`, { headers: headers() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = (await res.json()) as { proposals: DocTypeProposalRow[] };
      setProposals(body.proposals);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    void refresh();
    const handle = window.setInterval(() => {
      if (!document.hidden) void refresh();
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(handle);
  }, [refresh]);

  const decide = useCallback(
    async (proposalId: string, action: 'promote' | 'reject') => {
      const res = await fetch(
        `${BASE_URL}/api/ingest/mapping/proposals/${encodeURIComponent(proposalId)}/${action}`,
        {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify({ reviewedBy: userEmail ?? 'operator' }),
        },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await refresh();
    },
    [headers, refresh, userEmail],
  );

  return {
    proposals,
    loading,
    error,
    refresh,
    promote: (id) => decide(id, 'promote'),
    reject: (id) => decide(id, 'reject'),
  };
}

export default useDocTypeProposals;
