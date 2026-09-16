import { JSX } from 'react';

export declare const COOKBOOK_CATEGORIES: CookbookCategory[];

export declare type CookbookCategory = 'Engineering' | 'Operations' | 'People' | 'Sales & CRM' | 'Product' | 'Finance' | 'Legal' | 'General';

export declare function CookbookPicker({ onPick, busy, actionLabel, autoFocusSearch, idPrefix, cardPrefix, layout, gridHeightClassName, installedNames, onOpenInstalled, }: CookbookPickerProps): JSX.Element;

export declare interface CookbookPickerProps {
    /** Fired with the chosen cookbook. Persistence is the caller's business. */
    onPick: (cookbook: DocumentTypeCookbook) => void;
    /** Disables every action while an install is in flight. */
    busy?: boolean;
    /** Label on each card's action button. Default `Install`. */
    actionLabel?: string;
    /**
     * Names of types the host ALREADY has, lower-cased by the host or not — the
     * comparison here is case- and whitespace-insensitive.
     *
     * Opt-in, because "installed" only means something on the types ADMIN page.
     * The same picker also opens the new-document dialog, where you are starting
     * a document rather than installing a type and every cookbook is a valid
     * choice however many you have already used.
     *
     * Measured before this existed: the admin page offered "Add this type" for
     * all fourteen cookbooks including the three already installed, and clicking
     * one produced a SECOND type with the same name, same icon and same field
     * count — indistinguishable from the first in the type list, the create
     * dialog and the document chip.
     */
    installedNames?: readonly string[];
    /** Fired instead of `onPick` when an installed cookbook's card is actioned. */
    onOpenInstalled?: (cookbook: DocumentTypeCookbook) => void;
    /** Focus the search box shortly after mount. Default `false`. */
    autoFocusSearch?: boolean;
    /**
     * Testid stem for the search box, grid and empty state (`<prefix>-search`,
     * `-grid`, `-empty`). Defaults to `cookbooks`, which is what the modal's
     * existing specs address — a second mount of this picker on the same screen
     * MUST pass its own prefix or those selectors match twice.
     */
    idPrefix?: string;
    /** Testid stem for the per-card ids (`<prefix>-card-<id>`, `-use-<id>`, `-cat-<slug>`). */
    cardPrefix?: string;
    /**
     * `fixed` keeps the modal's original three 220px columns; `fluid` fills the
     * width it is given, which is what the Document Types page needs.
     */
    layout?: 'fixed' | 'fluid';
    /** Height cap on the scrolling grid. Default `max-h-[60vh]`. */
    gridHeightClassName?: string;
}

export declare function CookbooksModal({ open, onClose, onCreated, createType, }: CookbooksModalProps): JSX.Element;

declare interface CookbooksModalProps {
    open: boolean;
    onClose: () => void;
    onCreated: (typeId: string) => void;
    /**
     * Persists the picked cookbook. Async and fallible: `rejected` means the
     * server refused the payload and NOTHING was saved, so the modal must not
     * report success. `offline` did save locally, so it counts as created.
     */
    createType: (data: Omit<DocumentType_2, 'id' | 'createdAt' | 'updatedAt'>) => Promise<SaveOutcome>;
}

declare interface DocumentType_2 {
    id: string;
    name: string;
    description: string;
    icon: string;
    fields: DocumentTypeField[];
    /** Phase 51 / hub#66 — multi-page layout. Optional; absent = single-page (legacy). */
    pages?: DocumentTypePage[];
    /** Phase 51 / hub#66 — page-level configuration. Only meaningful when pages.length > 1. */
    pageConfig?: DocumentTypePageConfig;
    /**
     * Remote-first (2026-08): the server row this type is stored under.
     * Stamped on every server hydration and successful create. Its ABSENCE is
     * what marks a type as genuinely local (pre-remote-era or created offline)
     * and therefore eligible for the one-time upload migration — without it, a
     * cache entry of a server-DELETED type is indistinguishable from a local
     * type and gets resurrected onto the server forever.
     */
    serverTypeId?: string;
    createdAt: string;
    updatedAt: string;
}

export declare interface DocumentTypeCookbook {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: CookbookCategory;
    tags: string[];
    build(): Omit<DocumentType_2, 'id' | 'createdAt' | 'updatedAt'>;
}

export declare const documentTypeCookbooks: DocumentTypeCookbook[];

declare interface DocumentTypeField {
    id: string;
    name: string;
    sectionType: string;
    required: boolean;
    defaultCollapsed: boolean;
    placeholder: string;
    hiddenInModes: ViewMode[];
    rendererOverrides: Partial<Record<ViewMode, string>>;
}

declare interface DocumentTypePage {
    id: string;
    title?: string;
    sectionIds: string[];
}

declare interface DocumentTypePageConfig {
    showTableOfContents: boolean;
}

export declare function DocumentTypesPage({ idToken, onExportSchema, onCreateDocument }?: DocumentTypesPageProps): JSX.Element;

/**
 * The two things this page needs from its host. Both are OPTIONAL and both
 * are props rather than ambient lookups: a library component that reads a
 * global auth context or a module-scope API client is one an embedder cannot
 * mount twice, cannot point at a second backend, and cannot test.
 *
 * Everything else the page needs it owns — `useDocumentTypes` does its own
 * fetching and offline caching, and the save/delete outcome is reported in
 * the page's own banner rather than through a host toast bus.
 */
export declare interface DocumentTypesPageProps {
    /**
     * Bearer token attached to every `/api/document-types` call. The server is
     * the source of truth (remote-first); localStorage is only the hook's
     * offline cache. In a dev stack with SKIP_AUTH the calls also work without
     * a token, which is why this is optional rather than required.
     */
    idToken?: string | null;
    /**
     * Overrides the wizard's "Export Schema" action. Omit and the wizard GETs
     * `/api/document-types/:id/schema` with the token above and hands the user
     * a download. Rejecting surfaces the reason inline in the wizard.
     */
    onExportSchema?: (type: DocumentType_2) => Promise<void>;
    /**
     * Start a document of this type, from the page where the type lives.
     *
     * Absent hides the action entirely. An embedder with no creation route
     * should not be shown a button that cannot do anything — the same rule the
     * document header applies to "Share to #room".
     */
    onCreateDocument?: (type: DocumentType_2) => void;
}

export declare function DocumentTypeWizard({ initialType, onSave, onCancel, idToken, onExportSchema, }: DocumentTypeWizardProps): JSX.Element;

export declare interface DocumentTypeWizardProps {
    initialType?: DocumentType_2;
    onSave: (type: Omit<DocumentType_2, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
    /**
     * Bearer token for the "Export Schema" request. Every other
     * `/api/document-types` call this surface makes goes through
     * `documentTypeApiAdapter`, which attaches `Authorization` from the same
     * token; the export was the one request that did not, so it worked only in
     * a SKIP_AUTH dev stack. Optional, matching the adapter's own signature.
     */
    idToken?: string | null;
    /**
     * Replaces the built-in export entirely — for a host that keeps its schemas
     * somewhere other than `/api/document-types/:id/schema`, or that wants to
     * hand the user the file some way other than a synthetic `<a download>`.
     * Rejecting surfaces the reason in the nav bar. Omit for the default.
     */
    onExportSchema?: (type: DocumentType_2) => Promise<void>;
}

export declare function FieldDefinitionEditor({ field, index, total, onRename, onChangeType, onRemove, onMoveUp, onMoveDown, onToggleRequired, onToggleCollapsed, }: FieldDefinitionEditorProps): JSX.Element;

export declare interface FieldDefinitionEditorProps {
    field: DocumentTypeField;
    index: number;
    total: number;
    onRename: (name: string) => void;
    onChangeType: (type: string) => void;
    onRemove: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onToggleRequired: () => void;
    onToggleCollapsed: () => void;
}

/** Cookbooks in catalogue order, filtered by category then query. */
export declare function filterCookbooks(query: string, category?: CookbookCategory | 'All'): DocumentTypeCookbook[];

/**
 * Does this cookbook answer to `query`?
 *
 * One predicate, shared by every surface that offers the cookbooks — the
 * gallery on the Document Types page and the starting-point picker in the New
 * Document modal. They used to filter with two hand-written copies of the same
 * four `.includes()` calls, which is how "retro" came to match in one place
 * and not the other.
 *
 * Matches on name, description, tags and category so the words a person
 * actually types ("retro", "postmortem", "hiring") land on the right template
 * even when they are nowhere in its title.
 */
export declare function matchesCookbookQuery(cookbook: DocumentTypeCookbook, query: string): boolean;

declare type SaveOutcome = {
    status: 'synced';
    type: DocumentType_2;
}
/** Server unreachable / 5xx — saved to the local cache, NOT on the server. */
| {
    status: 'offline';
    type: DocumentType_2;
    error: string;
}
/** Server rejected the payload (4xx) — NOTHING was saved. */
| {
    status: 'rejected';
    error: string;
};

export declare function StepIndicator({ step, total }: {
    step: number;
    total: number;
}): JSX.Element;

declare type ViewMode = 'editor' | 'ack' | 'reader';

export declare interface WizardNavProps {
    step: number;
    totalSteps: number;
    canAdvance: boolean;
    isEditing: boolean;
    onCancel: () => void;
    onBack: () => void;
    onNext: () => void;
    onExportSchema?: () => void;
    /**
     * Why the last export attempt failed, rendered next to the button.
     *
     * The alternative a library component must NOT reach for is `alert()`: it
     * assumes a host with a modal-capable window, is untestable, and blocks the
     * embedder from styling or suppressing the failure. The message is state
     * the caller owns; this bar only renders it.
     */
    exportError?: string | null;
}

export declare function WizardStepNavigation({ step, totalSteps, canAdvance, isEditing, onCancel, onBack, onNext, onExportSchema, exportError, }: WizardNavProps): JSX.Element;

export { }


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
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
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
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
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
