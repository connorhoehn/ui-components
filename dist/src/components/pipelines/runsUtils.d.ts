import { PipelineRun, RunStatus } from '../../types/pipeline';
export type StatusKey = Exclude<RunStatus, 'awaiting_approval'>;
export type TriggerKindKey = 'manual' | 'scheduled' | 'webhook' | 'document';
export type DateRangeKey = '24h' | '7d' | '30d' | 'all';
export declare const STATUS_KEYS: readonly StatusKey[];
export declare const TRIGGER_KIND_KEYS: readonly TriggerKindKey[];
export declare const DATE_RANGE_KEYS: readonly DateRangeKey[];
export declare const RANGE_MS: Record<Exclude<DateRangeKey, 'all'>, number>;
/**
 * Map a stored `triggeredBy.triggerType` string onto one of the user-facing
 * UI bins. `document.*` collapses to 'document'; the legacy 'schedule' string
 * surfaces as 'scheduled'. Anything unrecognized falls back to 'manual'.
 */
export declare function triggerTypeToKind(triggerType: string): TriggerKindKey;
/**
 * Hub#1287: sum of retries across all steps in a run.
 * One step with `attempts.length === 3` contributes 2 retries.
 */
export declare function countTotalRetries(run: PipelineRun): number;
export interface RunFilterCriteria {
    query: string;
    statuses: ReadonlySet<StatusKey>;
    triggerKinds: ReadonlySet<TriggerKindKey>;
    range: DateRangeKey;
    /** ms since epoch. Defaults to Date.now() — exposed for deterministic tests. */
    now?: number;
}
/**
 * Pure filter applied to a list of runs. Empty status/trigger sets mean
 * "match all" (so the unfiltered default doesn't accidentally hide everything).
 */
export declare function filterRuns(runs: PipelineRun[], c: RunFilterCriteria): PipelineRun[];
export declare function parseFilterParams(params: URLSearchParams): {
    query: string;
    statuses: Set<StatusKey>;
    triggerKinds: Set<TriggerKindKey>;
    range: DateRangeKey;
};
//# sourceMappingURL=runsUtils.d.ts.map