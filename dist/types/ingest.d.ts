export interface MappingRule {
    /** Glob or regex pattern matching source file paths. */
    pattern: string;
    /** Document type to assign when pattern matches. */
    documentTypeId: string;
    /** Optional pipeline to trigger on ingest. Overrides source-level default. */
    pipelineId?: string;
    /** Priority when multiple rules match — higher wins. */
    priority: number;
}
export interface SyncStats {
    /** Total files the adapter saw on the source. */
    filesFound: number;
    /** Newly-ingested files (not seen before). */
    filesNew: number;
    /** Existing files whose hash changed since last sync. */
    filesUpdated: number;
    /** Files skipped (already-seen + unchanged). */
    filesSkipped: number;
    /** Errors during this sync (per-file failures). */
    errors: number;
    /** Sync duration in ms. */
    durationMs: number;
}
export type IngestSourceType = 'local' | 's3' | 'google-drive' | 'webhook';
export type IngestSourceStatus = 'active' | 'paused' | 'error';
export interface IngestSource {
    sourceId: string;
    name: string;
    type: IngestSourceType;
    config: Record<string, unknown>;
    syncSchedule: string | null;
    mappingRules: MappingRule[];
    defaultPipelineId: string | null;
    /**
     * Per-DocType pipeline override. Keys are `targetTypeId` (the DocType id
     * a mapping rule resolved to); values are pipeline ids that should run
     * instead of `defaultPipelineId` for items of that type. Absent / empty
     * map ⇒ use defaultPipelineId for everything. AGENTIC_ETL_VISION §C.
     */
    pipelineByDocType?: Record<string, string>;
    status: IngestSourceStatus;
    lastSyncAt: string | null;
    lastSyncStats: SyncStats | null;
    createdAt: string;
    updatedAt: string;
}
export type IngestItemStatus = 'queued' | 'mapping' | 'materializing' | 'triggering' | 'done' | 'failed';
export type IngestMappingMethod = 'rule' | 'llm-match' | 'llm-generate';
export interface IngestItem {
    itemId: string;
    sourceId: string;
    sourcePath: string;
    status: IngestItemStatus;
    documentTypeId: string | null;
    documentId: string | null;
    pipelineRunId: string | null;
    mappingMethod: IngestMappingMethod | null;
    /** Confidence in the mapping decision (0..1). Null when no mapping attempted. */
    mappingConfidence?: number | null;
    /** Retry attempts so far. Optional — backend may omit. */
    attempts?: number;
    error: string | null;
    createdAt: string;
    updatedAt: string;
}
export type SyncConflictStatus = 'pending' | 'resolved' | 'discarded';
export type ConflictSide = 'source' | 'platform' | 'merged';
export interface ConflictField {
    /** Field key (path within the typed document — e.g. "title", "body.text"). */
    field: string;
    /** Value as it currently exists in the source system. */
    sourceValue: unknown;
    /** Value as it currently exists in the platform CRDT. */
    platformValue: unknown;
    /** Optional auto-merge proposal (if the engine produced one). */
    mergedValue?: unknown;
    /**
     * Who made the source-side edit, when the connector can tell us.
     *
     * Additive and optional because most connectors CANNOT tell us: a Drive
     * revision carries an editor, an S3 object generally does not. Absent means
     * "unattributed", and the review UI says exactly that rather than crediting
     * the change to the source system — "Contracts (Google Drive)" is where the
     * change came from, not who made it, and showing a system where a person
     * belongs is what made this queue unreadable.
     */
    changedBy?: string;
    /**
     * Human-readable location of this field in the document, outermost first —
     * e.g. `['Payment terms']`. The `field` path above is a machine key; this is
     * where a reader would look on the page. Optional: connectors that only know
     * the field path omit it, and the UI falls back to showing the path.
     */
    path?: string[];
}
export interface SyncConflict {
    conflictId: string;
    sourceId: string;
    documentId: string;
    /**
     * The document's human name.
     *
     * Additive and optional. The review surface leads with the DOCUMENT, and
     * until now the only document identity in this payload was `documentId` — so
     * the page could not name the thing it was asking the operator to change.
     * Absent falls back to `documentId`.
     */
    documentTitle?: string;
    documentTypeId: string | null;
    /** Stable identity in the source system (e.g. Drive file id). */
    sourceRef: string;
    /** Free-form short summary, e.g. "title and body changed remotely". */
    summary: string;
    fields: ConflictField[];
    status: SyncConflictStatus;
    /** Last edit time from the platform side. */
    platformUpdatedAt: string;
    /** Last edit time from the source side. */
    sourceUpdatedAt: string;
    detectedAt: string;
    resolvedAt?: string | null;
}
export interface ConflictResolution {
    /** Which side wins as a whole — used when fieldChoices is empty. */
    pick: ConflictSide;
    /**
     * Optional per-field override map. Keys are field paths matching
     * ConflictField.field; values are 'source' | 'platform' | 'merged' or a
     * literal value supplied by the operator.
     */
    fieldChoices?: Record<string, ConflictSide | {
        custom: unknown;
    }>;
    /** Operator note explaining the pick. */
    note?: string;
}
//# sourceMappingURL=ingest.d.ts.map