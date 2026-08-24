// frontend/src/api/pipelineRuns.ts
//
// API client for pipeline run history — replaces localStorage-only persistence
// with DynamoDB-backed queries via social-api bridge.

import type { PipelineRun } from '../types/pipeline';
import type { PipelineRunDetailResponse } from '../types/pipeline-contracts';

export interface ListRunsResponse {
  runs: PipelineRun[];
  nextCursor?: string;
}

/**
 * Fetch pipeline run history from the backend API.
 *
 * **Rejects** when the endpoint is unavailable or answers non-2xx. It used to
 * swallow the failure and resolve `{ runs: [] }`, which is indistinguishable
 * from "this pipeline has never run": `PipelineRunsPanel` rendered
 * "No runs yet. Trigger this pipeline to see history here." with its error
 * banner unreachable, and `PipelineRunsContext`'s localStorage fallback —
 * written in its `.catch` — could never run because nothing ever rejected.
 * Every caller already has a `catch`/`.catch` that does the right thing.
 */
export async function listPipelineRuns(
  pipelineId: string,
  options?: { limit?: number; cursor?: string },
): Promise<ListRunsResponse> {
  const params = new URLSearchParams();
  if (options?.limit) params.set('limit', String(options.limit));
  if (options?.cursor) params.set('cursor', options.cursor);

  const url = `/api/pipelines/${pipelineId}/runs${params.toString() ? `?${params}` : ''}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies for auth
    });

    if (!res.ok) {
      throw new Error(`Failed to list runs: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    // Backend returns `runId`; frontend type uses `id`. Map here at the boundary.
    if (Array.isArray(data.runs)) {
      data.runs = data.runs
        .map((r: Record<string, unknown>) => ({
          ...r,
          id: r.id ?? r.runId,
        }))
        .sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
          const aT = a.startedAt ? new Date(a.startedAt as string).getTime() : 0;
          const bT = b.startedAt ? new Date(b.startedAt as string).getTime() : 0;
          return bT - aT;
        });
    }
    return data;
  } catch (err) {
    console.error('[pipelineRuns] Failed to fetch from API:', err);
    // Rethrow: an empty list is a legitimate answer, so failures must not be
    // spelled the same way. Callers fall back to localStorage / show a banner.
    throw err;
  }
}

/**
 * Fetch a single pipeline run by runId from the dedicated v2 endpoint.
 * The v2 handler does live-then-stored fallback so historical runs (no
 * longer in the runtime's in-memory state) resolve correctly.
 *
 * **Resolves `null` for a genuine 404 only. Rejects for everything else** —
 * transport failure, 5xx, 401, malformed JSON. It used to spell both the
 * same way, so an unreachable API was indistinguishable from a run that had
 * really been garbage-collected: `PipelineRunReplayPage` told the user
 * "Run not available — it may have been trimmed from history." with no
 * retry, and `PendingApprovalsPage` claimed the upstream steps "haven't
 * produced reviewable output yet" while the approver decided blind.
 * Same class as `listPipelineRuns` above (fixed in v2.92.0).
 *
 * Wire shape comes from `PipelineRunDetailResponse` in
 * frontend/src/types/pipeline-contracts.ts — kept in lockstep with
 * social-api/src/pipeline/http/contracts.ts.
 */
export async function getPipelineRun(
  pipelineId: string,
  runId: string,
): Promise<PipelineRun | null> {
  const url = `/api/v2/pipelines/${encodeURIComponent(pipelineId)}/runs/${encodeURIComponent(runId)}`;

  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Failed to get run: ${res.status} ${res.statusText}`);
    }
    const data = (await res.json()) as PipelineRunDetailResponse;
    // Backend uses `runId`; frontend's PipelineRun type uses `id`.
    // Normalize at the boundary so callers see one shape.
    return { ...(data as unknown as Record<string, unknown>), id: data.runId } as PipelineRun;
  } catch (err) {
    console.error('[pipelineRuns] Failed to fetch run:', err);
    // Rethrow: `null` is reserved for "the server says this run does not
    // exist". A failure must not be spelled the same way, or the caller
    // renders a confident claim about the run's fate that isn't true.
    throw err;
  }
}
