import { JSX } from 'react';

export declare function ConflictsPage(): JSX.Element;

export declare function DeadLetterQueuePage(): JSX.Element;

export declare function DocTypeProposalsPage(): JSX.Element;

export declare function IngestAuditPage(): JSX.Element;

export declare function IngestDashboard(): JSX.Element;

declare interface IngestItem {
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

export declare function IngestItemDrawer({ item, sourceName, onClose, onRetry, onSkip }: IngestItemDrawerProps): JSX.Element | null;

declare interface IngestItemDrawerProps {
    item: IngestItem | null;
    sourceName?: string;
    onClose: () => void;
    onRetry: (itemId: string) => Promise<boolean | void>;
    onSkip: (itemId: string) => Promise<boolean | void>;
}

export declare function IngestItemsPage(): JSX.Element;

declare type IngestItemStatus = 'queued' | 'mapping' | 'materializing' | 'triggering' | 'done' | 'failed';

declare type IngestMappingMethod = 'rule' | 'llm-match' | 'llm-generate';

export declare function MappingReviewPage(): JSX.Element;

declare interface MappingRule {
    /** Glob or regex pattern matching source file paths. */
    pattern: string;
    /** Document type to assign when pattern matches. */
    documentTypeId: string;
    /** Optional pipeline to trigger on ingest. Overrides source-level default. */
    pipelineId?: string;
    /** Priority when multiple rules match — higher wins. */
    priority: number;
}

export declare function MappingRuleEditor({ rules, onChange }: MappingRuleEditorProps): JSX.Element;

declare interface MappingRuleEditorProps {
    rules: MappingRule[];
    onChange: (rules: MappingRule[]) => void;
}

declare interface Props {
    sourceId: string;
}

export declare function SourceDetailPage(): JSX.Element | null;

export declare function SourceSloPanel({ sourceId }: Props): JSX.Element;

export declare function SourcesPage(): JSX.Element;

export declare function SyncMonitorPage(): JSX.Element;

export { }
