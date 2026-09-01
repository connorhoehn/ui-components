import { type JSX } from 'react';
import type { ApiDocumentType, TypedDocumentValue } from '../../hooks/useTypedDocuments';
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
    /**
     * Keyed by DocumentType id. Set when the caller's lookup for that type
     * FAILED, which is not the same thing as the type having no instances — the
     * picker says so instead of claiming there is nothing to reference.
     */
    referenceOptionsErrors?: Record<string, string>;
    /**
     * Keyed by DocumentType id. `true` while the caller's lookup for that type
     * is still in flight. Additive.
     *
     * "No options yet" was inferred purely from an empty `referenceOptions`, and
     * an unstarted lookup is empty too — so for the whole duration of the fetch
     * the picker sat disabled under "No referenceable documents yet for this
     * type." That is the same false statement the `referenceOptionsErrors`
     * fix removed, just in a different window: it tells the user the documents
     * do not exist and to go create one.
     */
    referenceOptionsLoading?: Record<string, boolean>;
}
export declare function TypedDocumentForm({ type, onSubmit, resetOnSubmit, referenceOptions, referenceOptionsErrors, referenceOptionsLoading }: TypedDocumentFormProps): JSX.Element;
//# sourceMappingURL=TypedDocumentForm.d.ts.map