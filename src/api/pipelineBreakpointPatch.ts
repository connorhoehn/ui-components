// frontend/src/api/pipelineBreakpointPatch.ts
//
// API client for pipeline edit-and-continue paused-context patching (hub#2226).
// Pairs with `social-api/src/routes/pipelineBreakpointPatch.ts`.
//
//   POST   /api/pipelines/:pipelineId/runs/:runId/breakpoint/:stepId/patch
//   DELETE /api/pipelines/:pipelineId/runs/:runId/breakpoint/:stepId/patch/:patchId
//
// The 422 case (validator rejected the patch) is surfaced as a typed thrown
// `PatchValidationRejectedError` carrying `reason` so the UI can keep edit
// mode open and display the executor's rejection message.

export interface ContextPatchMerge {
  mode: 'merge';
  values: Record<string, unknown>;
}

export interface ContextPatchJsonPatch {
  mode: 'jsonPatch';
  ops: Array<{
    op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
    path: string;
    value?: unknown;
    from?: string;
  }>;
}

export type ContextPatch = ContextPatchMerge | ContextPatchJsonPatch;

export interface PatchResult {
  patchId: string;
  before: Record<string, unknown>;
  after: Record<string, unknown>;
  validation: { ok: true } | { ok: false; reason: string };
}

/**
 * Thrown when the executor's `ContextValidator` rejected a paused-context
 * patch. The patch was NOT applied; the UI should keep the dirty buffer
 * intact and show `reason` to the user.
 */
export class PatchValidationRejectedError extends Error {
  readonly reason: string;
  readonly result?: PatchResult;
  constructor(reason: string, result?: PatchResult) {
    super(reason);
    this.name = 'PatchValidationRejectedError';
    this.reason = reason;
    this.result = result;
  }
}

/**
 * Thrown for non-2xx/422 transport errors (404, 409, 500, 503, ...).
 * `status` is the HTTP status; `body` is the parsed JSON body when present.
 */
export class PatchHttpError extends Error {
  readonly status: number;
  readonly body?: unknown;
  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = 'PatchHttpError';
    this.status = status;
    this.body = body;
  }
}

function patchUrl(
  pipelineId: string,
  runId: string,
  stepId: string,
  patchId?: string,
): string {
  const baseUrl = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
  const base =
    `${baseUrl}/api/pipelines/${encodeURIComponent(pipelineId)}` +
    `/runs/${encodeURIComponent(runId)}` +
    `/breakpoint/${encodeURIComponent(stepId)}/patch`;
  return patchId ? `${base}/${encodeURIComponent(patchId)}` : `${base}`;
}

/**
 * Apply a paused-context patch. Resolves the executor's `PatchResult` on a
 * 200. Throws `PatchValidationRejectedError` on a 422 (carrying the executor
 * rejection reason). Throws `PatchHttpError` on any other non-2xx.
 */
export async function applyPatch(
  pipelineId: string,
  runId: string,
  stepId: string,
  patch: ContextPatch,
  appliedBy?: string,
): Promise<PatchResult> {
  const res = await fetch(patchUrl(pipelineId, runId, stepId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ patch, ...(appliedBy ? { appliedBy } : {}) }),
  });

  if (res.status === 200) {
    return (await res.json()) as PatchResult;
  }

  if (res.status === 422) {
    const body = (await res.json().catch(() => ({}))) as {
      error?: string;
      result?: PatchResult;
    };
    let reason: string = 'patch rejected by validator';
    if (
      body.result &&
      body.result.validation &&
      body.result.validation.ok === false &&
      typeof body.result.validation.reason === 'string'
    ) {
      reason = body.result.validation.reason;
    } else if (typeof body.error === 'string') {
      reason = body.error;
    }
    throw new PatchValidationRejectedError(reason, body.result);
  }

  const text = await res.text().catch(() => '');
  let parsed: unknown = undefined;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }
  throw new PatchHttpError(
    res.status,
    `applyPatch HTTP ${res.status}: ${text}`,
    parsed,
  );
}

/**
 * Revert a previously-applied paused-context patch. Throws `PatchHttpError`
 * for non-204 (typically 409 once the run has resumed past the breakpoint).
 */
export async function revertPatch(
  pipelineId: string,
  runId: string,
  stepId: string,
  patchId: string,
): Promise<void> {
  const res = await fetch(patchUrl(pipelineId, runId, stepId, patchId), {
    method: 'DELETE',
    credentials: 'include',
  });

  if (res.status === 204) return;

  const text = await res.text().catch(() => '');
  let parsed: unknown = undefined;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }
  throw new PatchHttpError(
    res.status,
    `revertPatch HTTP ${res.status}: ${text}`,
    parsed,
  );
}
