import { JSX } from 'react';

export declare const COOKBOOK_CATEGORIES: CookbookCategory[];

export declare type CookbookCategory = 'Engineering' | 'Operations' | 'People' | 'Sales & CRM' | 'Product' | 'Finance' | 'Legal' | 'General';

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

export declare function DocumentTypesPage({ idToken, onExportSchema }?: DocumentTypesPageProps): JSX.Element;

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
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}
