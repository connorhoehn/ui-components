// frontend/src/api/pipelineAudit.ts
//
// hub#2225 — read-only API client for the pipeline-audit query routes.
//
// GET /api/pipelines/:pipelineId/runs/:runId/audit?since=&until=&actions=&limit=&cursor=
// GET /api/pipelines/audit/search?actor=&pipelineId=&action=&since=&until=&limit=&cursor=

/**
 * Mirrors `StoredAuditEvent` from social-api/src/pipeline/audit-repository.ts.
 * Re-declared here as a plain TS interface (per project conventions — no
 * runtime schema lib) so the frontend doesn't pull a backend module across
 * the Vite/TSX boundary.
 */
export interface AuditRow {
  auditId: string;
  timestamp: string;
  action: string;
  actorUserId: string;
  pipelineId: string;
  runId?: string;
  decision?: 'approved' | 'rejected' | 'cancelled' | 'failed' | 'completed' | 'success' | 'error';
  outcome?: 'success' | 'error' | 'rejected';
  details?: Record<string, unknown>;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  trace?: Record<string, unknown>;
  ttlEpoch?: number;
}

export interface AuditFilters {
  /** ISO 8601 lower bound on `timestamp`. */
  since?: string;
  /** ISO 8601 upper bound on `timestamp`. */
  until?: string;
  /** Action types to keep — comma-joined for the query string. */
  actions?: string[];
  /** Page size (1..1000). Server defaults to 100. */
  limit?: number;
  /** Opaque pagination token from a previous response. */
  cursor?: string;
}

export interface SearchAuditFilters extends AuditFilters {
  /** Either `actor` or `pipelineId` is required. */
  actor?: string;
  /** Either `actor` or `pipelineId` is required. */
  pipelineId?: string;
}

export interface AuditPage {
  items: AuditRow[];
  nextCursor?: string;
}

function buildQuery(params: Record<string, string | number | string[] | undefined>): string {
  const entries: string[] = [];
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) continue;
      entries.push(`${encodeURIComponent(k)}=${encodeURIComponent(v.join(','))}`);
    } else {
      entries.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
    }
  }
  return entries.length > 0 ? `?${entries.join('&')}` : '';
}

/**
 * Per-run audit timeline. Returns a single page; callers paginate with
 * `nextCursor`. The backend route returns `{ items: [], nextCursor }`
 * with rows newest-first.
 */
export async function getRunAuditLog(
  pipelineId: string,
  runId: string,
  filters: AuditFilters = {},
): Promise<AuditPage> {
  const qs = buildQuery({
    since: filters.since,
    until: filters.until,
    actions: filters.actions,
    limit: filters.limit,
    cursor: filters.cursor,
  });
  const url = `/api/pipelines/${encodeURIComponent(pipelineId)}/runs/${encodeURIComponent(runId)}/audit${qs}`;

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to load audit log for ${pipelineId}/${runId}: ${res.status} ${text}`);
  }
  return res.json();
}

/**
 * Cross-run audit search. At least one of `actor` / `pipelineId` is required;
 * the backend returns 400 otherwise.
 */
export async function searchAudit(filters: SearchAuditFilters): Promise<AuditPage> {
  if (!filters.actor && !filters.pipelineId) {
    throw new Error('searchAudit requires at least one of `actor` or `pipelineId`');
  }
  const qs = buildQuery({
    actor: filters.actor,
    pipelineId: filters.pipelineId,
    actions: filters.actions,
    since: filters.since,
    until: filters.until,
    limit: filters.limit,
    cursor: filters.cursor,
  });
  const url = `/api/pipelines/audit/search${qs}`;

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Audit search failed: ${res.status} ${text}`);
  }
  return res.json();
}
