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
  /**
   * True when `rawModelText` was stripped at persist time for being
   * ≥ the inline cap (32KB). The full body is recoverable via
   * `JudgmentApi.fetchRawText(judgmentId)` when configured server-side.
   */
  rawTextTruncated?: boolean;
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

// ---------------------------------------------------------------------------
// v2 — aggregate rollups + fetcher contract
// ---------------------------------------------------------------------------

/**
 * One day's rollup for a (pipelineId, rubricId) pair. Mirrors the row
 * shape platform-api's JudgmentAggregateRepository emits over
 * `GET /api/judgments/aggregates`. UI consumers MUST NOT depend on
 * fields outside this contract — the trend chart degrades when fields
 * are absent (e.g. min/max may be undefined on rows written before the
 * extremum tracker landed).
 */
export interface AggregateRow {
  aggregateKey: string;
  pipelineId: string;
  rubricId: string;
  /** yyyy-mm-dd UTC. */
  dayBucket: string;
  numJudgments: number;
  numPassed: number;
  numFailed: number;
  sumOverallScore: number;
  sumTokensIn: number;
  sumTokensOut: number;
  sumCostUsd: number;
  minOverallScore?: number;
  maxOverallScore?: number;
  firstJudgedAt: string;
  lastJudgedAt: string;
}

/** Query options for the aggregate-list fetcher. */
export interface FetchAggregatesParams {
  /** Exactly one of pipelineId / rubricId must be present. */
  pipelineId?: string;
  rubricId?: string;
  /** yyyy-mm-dd inclusive bounds. */
  since?: string;
  until?: string;
  /** Page size cap. Default + max enforced server-side. */
  limit?: number;
}

/** Response envelope for the aggregate-list fetcher. */
export interface FetchAggregatesResult {
  items: AggregateRow[];
  nextCursor?: string;
}

/**
 * The judge data-fetcher contract. Implementations live in the consumer
 * (gateway frontend has `src/api/judgments.ts`); the UI is fully
 * decoupled from URL conventions, auth headers, retry semantics, etc.
 */
export interface JudgmentApi {
  /**
   * Lazy-fetches the full rawModelText for a judgment. Returns null
   * when the body is unavailable (404 from the server, S3 spillover not
   * configured, network error — the impl normalizes all 3).
   */
  fetchRawText(judgmentId: string): Promise<string | null>;
  /**
   * Lists per-day aggregate rollups. Throws on validation errors
   * (missing partition key, malformed date). Returns an empty `items`
   * array when there's no data in range.
   */
  fetchAggregates(params: FetchAggregatesParams): Promise<FetchAggregatesResult>;
}
