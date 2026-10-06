import type { DocumentType } from '../../types/documentType';
import '../../renderers';
export interface DocumentTypeWizardProps {
    initialType?: DocumentType;
    onSave: (type: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => void;
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
    onExportSchema?: (type: DocumentType) => Promise<void>;
}
export declare function DocumentTypeWizard({ initialType, onSave, onCancel, idToken, onExportSchema, }: DocumentTypeWizardProps): import("react").JSX.Element;
//# sourceMappingURL=DocumentTypeWizard.d.ts.map