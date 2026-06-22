import { JSX } from 'react';
import { ApiDocumentType, TypedDocumentValue } from '../../hooks/useTypedDocuments';
export interface ReferenceOption {
    value: string;
    label: string;
}
export interface TypedDocumentFormProps {
    type: ApiDocumentType;
    onSubmit: (values: Record<string, TypedDocumentValue>) => Promise<void>;
    /** Reset to defaults after a successful submit (default true). */
    resetOnSubmit?: boolean;
    /**
     * Phase C — keyed by DocumentType id. Used by reference fields to populate
     * their picker. Caller (typically TypedDocumentsPage) fetches instances of
     * each referenced type and supplies them. Missing entries render a disabled
     * picker with a "no options" hint.
     */
    referenceOptions?: Record<string, ReferenceOption[]>;
}
export declare function TypedDocumentForm({ type, onSubmit, resetOnSubmit, referenceOptions }: TypedDocumentFormProps): JSX.Element;
//# sourceMappingURL=TypedDocumentForm.d.ts.map