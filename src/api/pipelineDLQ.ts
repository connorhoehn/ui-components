// frontend/src/api/pipelineDLQ.ts
//
// API client for the pipeline Dead Letter Queue inspector endpoints.
// Backend: GET /api/pipelines/dlq, POST /api/pipelines/dlq/redrive,
// POST /api/pipelines/dlq/purge

export interface DLQEntry {
  messageId: string;
  eventType: string;
  eventPayload: unknown;
  lastError: string;
  failedAt: string;
  totalAttempts: number;
  errorKind: string | null;
}

export interface DLQListResponse {
  items: DLQEntry[];
  cursor?: string;
}

export interface DLQRedriveResponse {
  redriven: string[];
  notFound: string[];
}

export interface DLQPurgeResponse {
  purged: string[];
  notFound: string[];
}

/**
 * Fetch DLQ entries with optional filters.
 */
export async function listDLQEntries(options?: {
  limit?: number;
  cursor?: string;
  errorKind?: string;
  sinceMs?: number;
}): Promise<DLQListResponse> {
  const params = new URLSearchParams();
  if (options?.limit) params.set('limit', String(options.limit));
  if (options?.cursor) params.set('cursor', options.cursor);
  if (options?.errorKind) params.set('errorKind', options.errorKind);
  if (options?.sinceMs) params.set('sinceMs', String(options.sinceMs));

  const url = `/api/pipelines/dlq${params.toString() ? `?${params}` : ''}`;

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (res.status === 503) {
    return { items: [] };
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch DLQ: ${res.status} ${text}`);
  }

  return res.json();
}

/**
 * Redrive one or more DLQ entries (re-publish them to the event bus).
 */
export async function redriveDLQEntries(
  ids: string[],
  options?: { resetAttempts?: boolean; preview?: boolean },
): Promise<DLQRedriveResponse> {
  const res = await fetch('/api/pipelines/dlq/redrive', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      ids,
      ...(options?.resetAttempts ? { resetAttempts: true } : {}),
      ...(options?.preview ? { preview: true } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Redrive failed: ${res.status} ${text}`);
  }

  return res.json();
}

/**
 * Purge (permanently delete) one or more DLQ entries.
 */
export async function purgeDLQEntries(
  ids: string[],
  options?: { preview?: boolean },
): Promise<DLQPurgeResponse> {
  const res = await fetch('/api/pipelines/dlq/purge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      ids,
      ...(options?.preview ? { preview: true } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Purge failed: ${res.status} ${text}`);
  }

  return res.json();
}
