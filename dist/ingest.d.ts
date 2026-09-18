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

export declare function MappingRuleEditor({ rules, onChange, readOnly }: MappingRuleEditorProps): JSX.Element;

declare interface MappingRuleEditorProps {
    rules: MappingRule[];
    onChange: (rules: MappingRule[]) => void;
    /**
     * Render the rule table without any mutating controls. Additive.
     *
     * A caller that has nowhere to put an edit — `SourceDetailPage` outside its
     * edit mode passes `onChange={() => {}}` — still got the full Edit / Delete /
     * reorder / Add Rule toolbar. Every one of those calls `onChange`, so the
     * operator could open a rule, retype its target type, press Save, and watch
     * the row snap back to its old value with no error and no explanation. The
     * preview box stays: it is a read-only dry run and is useful here.
     */
    readOnly?: boolean;
}

declare interface Props {
    sourceId: string;
}

export declare function SourceDetailPage(): JSX.Element | null;

export declare function SourceSloPanel({ sourceId }: Props): JSX.Element;

export declare function SourcesPage(): JSX.Element;

export declare function SyncMonitorPage(): JSX.Element;

export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}
