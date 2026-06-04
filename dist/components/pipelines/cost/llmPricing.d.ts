import type { PipelineDefinition, PipelineNode, PipelineRun, StepExecution } from '../../../types/pipeline';
export interface ModelPricing {
    inputPerMillion: number;
    outputPerMillion: number;
}
export declare const MODEL_PRICING: Record<string, ModelPricing>;
export interface CostBreakdown {
    inputTokens: number;
    outputTokens: number;
    inputCostUsd: number;
    outputCostUsd: number;
    totalCostUsd: number;
    model: string;
    modelFound: boolean;
}
/**
 * Convert a (model, tokensIn, tokensOut) triple into a dollar estimate.
 * When the model isn't in the pricing table, returns zero costs with
 * `modelFound: false` so the UI can show "—" rather than a misleading "$0.00".
 */
export declare function estimateCost(model: string, tokensIn: number, tokensOut: number): CostBreakdown;
/**
 * Sum costs across multiple step executions. Returns aggregate + per-model breakdown.
 * Steps missing `model` or tokens are treated as zero contributors but still counted
 * into the aggregate so callers can show a stable total.
 */
export declare function aggregateCost(steps: Array<{
    model?: string;
    tokensIn?: number;
    tokensOut?: number;
}>): {
    total: CostBreakdown;
    perModel: Record<string, CostBreakdown>;
};
/**
 * Display helper — formats USD with 4 decimals under $0.01, 2 decimals above.
 * Returns "—" when the breakdown has no pricing match and zero cost, so the UI
 * can avoid rendering a misleading "$0.00".
 */
export declare function formatUsd(cost: CostBreakdown | null): string;
/**
 * Display label for a pipeline node — same conventions as the validator's
 * private `nodeLabel`: prefer an explicit `label` field on the node data,
 * fall back to the type-specific descriptor (model / triggerType / actionType /
 * etc.), then to the bare node `type`.
 */
export declare function nodeDisplayLabel(node: PipelineNode): string;
/** One entry in the per-node cost breakdown. */
export interface NodeCostRow {
    nodeId: string;
    /** Display label (resolved via {@link nodeDisplayLabel}). */
    label: string;
    /** Node type — useful for tooltips / coloring. */
    type: string;
    /** Total USD across every step execution that ran this node. */
    totalCostUsd: number;
    /** How many step executions contributed to this row. */
    stepCount: number;
}
/**
 * Per-step USD cost: LLM token cost via {@link estimateCost} when the step
 * carries `llm` data, plus any other typed costs that may exist on a step.
 * Currently only LLM contributes a non-zero value; the function is structured
 * so future per-step typed costs (e.g. action billing) can plug in here without
 * touching every call site.
 */
export declare function stepCostUsd(step: StepExecution, models: Map<string, string>): number;
/**
 * Sum each pipeline node's USD cost across the supplied runs. Returns one row
 * per node defined in `def`, sorted by total cost descending. Nodes that the
 * runs never touched yield a zero-cost row so the chart still shows the full
 * pipeline shape; callers can filter those out before rendering if desired.
 */
export declare function costByNode(runs: PipelineRun[], def: PipelineDefinition | null): NodeCostRow[];
/** One day's total spend in the trend series. */
export interface DailyCostPoint {
    /** Local-day key in YYYY-MM-DD form (the bucket key used for grouping). */
    date: string;
    /** Bucket boundary as epoch ms (start of day in UTC). */
    ts: number;
    /** Total USD across every run that started on this day. */
    totalCostUsd: number;
    /** How many runs landed in this day. */
    runCount: number;
}
/**
 * Build a per-day total-spend series for the last `days` days (inclusive of
 * today, default 30). Days with no runs are emitted as zero-value points so
 * the line chart renders a continuous x-axis. `now` is injectable for tests.
 */
export declare function dailyCostTrend(runs: PipelineRun[], def: PipelineDefinition | null, days?: number, now?: Date): DailyCostPoint[];
//# sourceMappingURL=llmPricing.d.ts.map