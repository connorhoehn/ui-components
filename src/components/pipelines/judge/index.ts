// Judge-step visualization composites for the pipelines page.
//
// Top-level entry: `<JudgmentResultViewer>` — renders the full structured
// output of an `llm:judge` run (overall verdict + per-criterion scores +
// rationale + cost/latency/model footer). Drop into a
// `pipeline.judge.scored` step's expanded view.
//
// Sub-composites: `<VerdictPanel>` (header alone), `<CriteriaPanel>`
// (per-criterion rows). Both pluck the subset of `JudgmentResult` they
// need, so consumers can render either standalone.
//
// Realtime: `useJudgmentResults({ runId? })` — folds the existing
// pipeline event stream's `pipeline.judge.*` events into running/scored/
// failed records. Lives on the same `EventStreamContext` the existing
// runs page already provides — same shape as `useVisionResults` so the
// activity stream can fold both.
//
// `<ScoreBarGauge>` is exported from `../../shared/` because gauges are
// reused outside judge (rate-limit budget bars, processing progress).
// See `JudgmentResultViewer.stories.tsx` for the full visual surface.

export { JudgmentResultViewer } from './JudgmentResultViewer';
export type { JudgmentResultViewerProps } from './JudgmentResultViewer';

export { VerdictPanel } from './VerdictPanel';
export type { VerdictPanelProps } from './VerdictPanel';

export { CriteriaPanel } from './CriteriaPanel';
export type { CriteriaPanelProps } from './CriteriaPanel';

export { useJudgmentResults } from './useJudgmentResults';
export type {
  UseJudgmentResultsOptions,
  JudgmentStepRecord,
  JudgmentStepStatus,
  PipelineJudgeStartedPayload,
  PipelineJudgeScoredPayload,
  PipelineJudgeFailedPayload,
  PipelineJudgeBudgetExceededPayload,
} from './useJudgmentResults';

export type {
  JudgeScale,
  JudgmentAggregation,
  JudgeMode,
  JudgmentVerdict,
  JudgmentCriterion,
  JudgmentRubric,
  CriterionScore,
  JudgmentResult,
  JudgeFailureReason,
} from './types';
