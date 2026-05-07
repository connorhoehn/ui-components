// frontend/src/types/ingest.ts
//
// Data model for the ingest subsystem — source configurations, mapping rules,
// sync stats, and ingest items flowing through the pipeline.

// ---------------------------------------------------------------------------
// Mapping rules
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Sync stats
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Source configuration
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Ingest items
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Write-back conflicts
//
// These types describe the operator queue for sync conflicts that surfaced
// when a CRDT edit collides with a remote change in the source-of-record
// system (e.g. someone edited a Drive doc from Drive while the platform
// was syncing an edit out). Operator picks left, right, or merged.
//
// Backend endpoint shape (Agent F to implement):
//   GET    /api/sync/conflicts                  -> { conflicts: SyncConflict[] }
//   GET    /api/sync/conflicts/:id              -> SyncConflict
//   POST   /api/sync/conflicts/:id/resolve      body: ConflictResolution
//          -> { conflict: SyncConflict }   (status flips to 'resolved')
// ---------------------------------------------------------------------------

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
}

export interface SyncConflict {
  conflictId: string;
  sourceId: string;
  documentId: string;
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
  fieldChoices?: Record<string, ConflictSide | { custom: unknown }>;
  /** Operator note explaining the pick. */
  note?: string;
}
