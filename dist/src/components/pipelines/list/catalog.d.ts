import type { FileKind } from '../../shared/FileKindMark';
import type { StatusPillTone } from '../../shared/StatusPill';
export type WorkType = 'documents' | 'agents' | 'conversations' | 'other';
export declare const WORK_TYPE_LABEL: Record<WorkType, string>;
export declare const WORK_TYPE_ORDER: WorkType[];
export type PipelineKind = 'document' | 'presentation' | 'diagram' | 'agent' | 'experiment' | 'recording' | 'call' | 'conversation' | 'media' | 'workflow';
export declare const KIND_MARK: Record<PipelineKind, FileKind>;
export declare const KIND_WORK_TYPE: Record<PipelineKind, WorkType>;
export declare const KIND_LABEL: Record<PipelineKind, string>;
export declare const KIND_ORDER: PipelineKind[];
export type PipelineDefinitionStatus = 'draft' | 'published' | 'archived';
export declare const STATUS_LABEL: Record<PipelineDefinitionStatus, string>;
export declare const STATUS_ORDER: PipelineDefinitionStatus[];
/** A run's terminal or in-flight state, as the platform's run list names them. */
export type PipelineRunItemStatus = 'running' | 'awaiting_approval' | 'completed' | 'failed' | 'cancelled' | 'interrupted' | 'rejected' | 'stuck';
/** The last-run read model: one row per pipeline, kept fresh by run events. */
export interface PipelineRunRollup {
    pipelineId: string;
    lastRunId: string;
    /** `startedAt` of the newest run. Empty string on the "no runs yet" sentinel. */
    lastRunAt: string;
    lastRunStatus: PipelineRunItemStatus;
    /** Newest first, at most five. */
    recent: Array<{
        runId: string;
        status: PipelineRunItemStatus;
        startedAt: string;
        completedAt?: string;
    }>;
    /** `recent` rows that failed, were interrupted or stuck. */
    failedOfRecent: number;
    /** `recent` rows still running or awaiting approval. */
    runningCount: number;
    updatedAt: string;
}
/** One pipeline as the directory lists it. */
export interface PipelinesListEntry {
    id: string;
    name: string;
    description?: string;
    /** Short step labels in order: `['/doc', 'Read', 'Plan', 'Approval', 'Suggestions']`. */
    route?: string[];
    kind?: PipelineKind;
    workType?: WorkType;
    status: PipelineDefinitionStatus;
    /** A system pipeline the reader cannot edit. */
    readOnly?: boolean;
    rollup?: PipelineRunRollup | null;
    updatedAt?: string;
    tags?: string[];
}
export type PipelinesGroupBy = 'worktype' | 'status' | 'kind' | 'none';
export declare const GROUP_BY_LABEL: Record<PipelinesGroupBy, string>;
export declare const GROUP_BY_ORDER: PipelinesGroupBy[];
/** The id of the one group `groupBy: 'none'` produces. */
export declare const ALL_GROUP_ID = "all";
export declare function entryKind(entry: Pick<PipelinesListEntry, 'kind'>): PipelineKind;
export declare function entryWorkType(entry: Pick<PipelinesListEntry, 'kind' | 'workType'>): WorkType;
/** The route as one line: "/doc → Read → Plan → Approval → Suggestions". */
export declare function routeLine(route: string[] | undefined): string | undefined;
/** "just now", "29m ago", "10h ago", "3d ago", else a short date. */
export declare function relativeAgo(iso: string | undefined, now?: number): string | undefined;
/** What `statusPillFor` returns — spread it straight into a `StatusPill`. */
export interface PillSpec {
    tone: StatusPillTone;
    label: string;
    meta?: string;
}
/**
 * What the row's pill says, from the rollup first and the definition status
 * otherwise:
 * - last run failed → danger "Failed · 10h ago"
 * - some of the recent runs failed → warning "1 of 5 failed · 29m ago"
 * - a run is live → info "Running" / "Awaiting approval"
 * - else the definition status: "Published" (success), "Draft" (neutral),
 *   "Archived" (neutral).
 */
export declare function statusPillFor(entry: PipelinesListEntry, now?: number): PillSpec;
export interface GroupedEntries {
    groups: Array<{
        id: string;
        title: string;
        count: number;
    }>;
    /** Group id per entry id. */
    groupOf: Map<string, string>;
}
/**
 * Buckets entries by the chosen axis, in the vocabulary's order, dropping
 * groups with nothing in them. `none` yields the single `all` group.
 */
export declare function groupEntries(entries: PipelinesListEntry[], groupBy: PipelinesGroupBy): GroupedEntries;
/** Case-insensitive match on name, description, route and tags. */
export declare function matchesQuery(entry: PipelinesListEntry, query: string): boolean;
//# sourceMappingURL=catalog.d.ts.map