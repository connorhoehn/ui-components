// Judge-result types shared across the judgment-step visualization components.
//
// Mirrors `JudgmentResult` from platform-api/src/pipeline/judge/types.ts.
// Kept here (rather than in `event-catalog`) because ui-components is
// allowed to consume but not depend on event-catalog — the canonical
// event-side declaration lives there; these types are the rendering-side
// contract.
//
// Stability: fields the model didn't emit are optional. Renderers
// gracefully degrade — a result with only `overallScore` + `criteria[]`
// still renders the verdict + per-criterion rows.

export type JudgeScale = 'binary' | '1-5' | '1-10' | 'pass-fail';
export type JudgmentAggregation = 'weighted-mean' | 'min' | 'all-pass';
export type JudgeMode = 'absolute' | 'comparison';
export type JudgmentVerdict = 'pass' | 'fail' | 'inconclusive';

export interface JudgmentCriterion {
  id: string;
  prompt: string;
  scale: JudgeScale;
  weight?: number;
  failThreshold?: number;
  anchors?: string[];
}

export interface JudgmentRubric {
  id: string;
  version: number;
  criteria: JudgmentCriterion[];
  overall: JudgmentAggregation;
  passThreshold?: number;
}

export interface CriterionScore {
  criterionId: string;
  /** Normalized 0..1 for display. */
  score: number;
  /** Verbatim score from the model (might be 1-5, "pass", etc.). */
  rawScore: number | string;
  rationale: string;
  passed: boolean;
}

/** The structured judgment payload — top-level render shape. */
export interface JudgmentResult {
  judgmentId: string;
  runId: string;
  stepId: string;
  pipelineId: string;
  rubricId: string;
  rubricVersion: number;
  /** Pinned rubric snapshot — historical record never reinterprets when rubric edits later. */
  rubricSnapshot: JudgmentRubric;
  mode: JudgeMode;
  overallScore: number;
  overallVerdict: JudgmentVerdict;
  overallPassed: boolean;
  confidence?: number;
  criteria: CriterionScore[];
  rawModelText?: string;
  model: string;
  tokensIn: number;
  tokensOut: number;
  cacheReadTokens?: number;
  cacheCreationTokens?: number;
  latencyMs: number;
  costUsd: number;
  cacheHit: boolean;
  /** ISO-8601 wall-clock for the judge call. */
  judgedAt: string;
}

/** Failure-mode tag for `useJudgmentResults` records. */
export type JudgeFailureReason =
  | 'input-resolution'
  | 'malformed'
  | 'aborted'
  | 'budget-exhausted'
  | 'unknown';
