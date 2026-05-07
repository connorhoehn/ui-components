// frontend/src/api/pipelineResume.ts
//
// API client for pipeline resume-from-step endpoint (hub#2223).
// POST /api/pipelines/:pipelineId/runs/:runId/resume?fromNodeId=<nodeId>
//
// Distinct from `pipelineRetry.ts`: resume re-enters the SAME run via
// PipelineModule.resumeFromStep (preserving accumulated context and
// incrementing `replayAttempts`), whereas retry triggers a brand-new run.

export interface ResumeFromStepResponse {
  runId: string;
  fromNodeId: string;
  /** The stepId that originally failed, when surfaceable. */
  originalFailedStepId?: string;
  /** Monotonic count of `resumeFromStep` invocations on this run. */
  replayAttempts: number;
  at: string;
}

export interface ResumeFromStepOptions {
  /** When true, allow resuming a `succeeded`/`done` run for diagnostic re-execution. */
  allowCompleted?: boolean;
  /** Optional list of node ids to break on during the resumed dispatch loop. */
  breakpoints?: string[];
}

export async function resumeFromStep(
  pipelineId: string,
  runId: string,
  fromNodeId: string,
  options?: ResumeFromStepOptions,
): Promise<ResumeFromStepResponse> {
  const url = `/api/pipelines/${encodeURIComponent(pipelineId)}/runs/${encodeURIComponent(runId)}/resume?fromNodeId=${encodeURIComponent(fromNodeId)}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(options ?? {}),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to resume run ${runId} from node ${fromNodeId}: ${res.status} ${errorText}`);
  }

  return res.json();
}
