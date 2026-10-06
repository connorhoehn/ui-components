import { type ReactNode } from 'react';
import type { DocumentType } from '../../types/documentType';
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
export interface DocumentTypesPageProps {
    /** Compact content layout for hosts that already provide workspace navigation. */
    layout?: 'split' | 'workspace';
    /** Link to the host's existing document-processing pipeline editor. */
    processingAction?: ReactNode;
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
    onExportSchema?: (type: DocumentType) => Promise<void>;
    /**
     * Start a document of this type, from the page where the type lives.
     *
     * Absent hides the action entirely. An embedder with no creation route
     * should not be shown a button that cannot do anything — the same rule the
     * document header applies to "Share to #room".
     */
    onCreateDocument?: (type: DocumentType) => void;
}
export declare function DocumentTypesPage({ idToken, onExportSchema, onCreateDocument, layout, processingAction }?: DocumentTypesPageProps): import("react").JSX.Element;
//# sourceMappingURL=DocumentTypesPage.d.ts.map