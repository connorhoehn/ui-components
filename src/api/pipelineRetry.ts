// frontend/src/api/pipelineRetry.ts
//
// API client for pipeline retry-from-node endpoint.
// POST /api/pipelines/:pipelineId/runs/:runId/retry/:nodeId

export interface RetryFromNodeResponse {
  newRunId: string;
  originalRunId: string;
  pipelineId: string;
  retryFromNodeId: string;
  skippedNodes: string[];
  at: string;
}

export interface ForceFailResponse {
  runId: string;
  status: string;
  hint: string;
  at: string;
}

export async function forceFail(pipelineId: string, runId: string): Promise<ForceFailResponse> {
  const url = `/api/pipelines/${pipelineId}/runs/${runId}/force-fail`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Force-fail failed: ${res.status} ${errorText}`);
  }
  return res.json();
}

export async function retryFromNode(
  pipelineId: string,
  runId: string,
  nodeId: string,
  inputs?: Record<string, unknown>,
  snapshotInput?: boolean,
): Promise<RetryFromNodeResponse> {
  const url = `/api/pipelines/${pipelineId}/runs/${runId}/retry/${nodeId}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs, ...(snapshotInput ? { snapshotInput } : {}) }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to retry from node ${nodeId}: ${res.status} ${errorText}`);
  }

  return res.json();
}
