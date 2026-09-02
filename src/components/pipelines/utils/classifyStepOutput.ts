// src/components/pipelines/utils/classifyStepOutput.ts
//
// Best-effort discriminator for `step.output` shapes — used by
// hosts (e.g. PipelineRunsPanel) to route step output into the right
// composite (judge vs vision vs raw JSON).
//
// Duck-typing rather than runtime schema validation: the catalog of
// known step output shapes is small enough that the cost of bringing in
// zod / runtime validators isn't justified. If a new shape is added,
// extend the union here and add a test below.

export type StepOutputKind = 'judgment' | 'vision' | 'agent' | 'unknown';

export function classifyStepOutput(
  output: Record<string, unknown> | undefined | null,
): StepOutputKind {
  if (!output) return 'unknown';

  // AgentStepOutput — the `agent` node's persisted result (agent-step
  // contract v1). Discriminated on `toolCalls` + `turns` + `text`, the
  // three-field combination no other step output carries. Note `toolless`
  // is NOT the discriminator: it is legitimately true on the outputs we
  // most want to render honestly, so a toolless agent step must still
  // classify as 'agent'.
  if (
    Array.isArray((output as { toolCalls?: unknown }).toolCalls) &&
    typeof (output as { turns?: unknown }).turns === 'number' &&
    typeof (output as { text?: unknown }).text === 'string'
  ) {
    return 'agent';
  }

  // JudgmentResult — the discriminator is `judgmentId` + the per-criterion
  // array. (See platform-api/src/pipeline/judge/types.ts.)
  if (
    typeof output.judgmentId === 'string' &&
    Array.isArray(output.criteria) &&
    typeof output.overallScore === 'number'
  ) {
    return 'judgment';
  }

  // VisionResult — fields the platform-api `image:vision-analyze` step
  // produces. The canonical discriminator is `visionId`; legacy/manual
  // outputs without it still classify when caption/tags are present.
  if (
    !('judgmentId' in output) &&
    (typeof output.visionId === 'string' ||
      typeof output.caption === 'string' ||
      Array.isArray((output as { tags?: unknown }).tags) ||
      (typeof output.imageId === 'string' && 'rawModelText' in output))
  ) {
    return 'vision';
  }

  return 'unknown';
}
