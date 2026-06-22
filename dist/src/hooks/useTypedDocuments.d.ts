export type TypedDocumentValue = string | string[] | number | number[] | boolean;
export type ApiFieldKind = 'text' | 'long_text' | 'number' | 'date' | 'boolean' | 'enum' | 'reference';
export type ApiFieldWidget = 'text_field' | 'textarea' | 'number_input' | 'date_picker' | 'checkbox' | 'select' | 'reference_picker';
export type ApiFieldCardinality = 1 | 'unlimited';
export interface ApiFieldValidation {
    /** Numbers: minimum value. Strings: minimum length. */
    min?: number;
    /** Numbers: maximum value. Strings: maximum length. */
    max?: number;
    /** text/long_text only: regex source string. */
    regex?: string;
    /** boolean only: value must be true. */
    requireTrue?: boolean;
}
export interface ApiFieldShowWhen {
    fieldId: string;
    equals: string | number | boolean;
}
/** Phase E — opt-in visibility per display context. Absent ⇒ visible in `full` only. */
export interface ApiFieldDisplayModes {
    full?: boolean;
    teaser?: boolean;
    list?: boolean;
}
export type ApiDisplayMode = 'full' | 'teaser' | 'list';
export interface ApiDocumentTypeField {
    fieldId: string;
    name: string;
    fieldType: ApiFieldKind;
    widget: ApiFieldWidget;
    cardinality: ApiFieldCardinality;
    required: boolean;
    helpText: string;
    /** Phase C — controlled vocabulary, set when fieldType='enum'. */
    options?: string[];
    /** Phase C — target DocumentType, set when fieldType='reference'. */
    referenceTypeId?: string;
    /** Phase D — optional constraints applied after shape validation. */
    validation?: ApiFieldValidation;
    /** Phase D — only show this field when another field equals a value. */
    showWhen?: ApiFieldShowWhen;
    /** Phase E — per-context visibility (full / teaser / list). */
    displayModes?: ApiFieldDisplayModes;
}
export interface ApiDocumentType {
    typeId: string;
    name: string;
    description: string;
    icon: string;
    fields: ApiDocumentTypeField[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}
export interface TypedDocument {
    documentId: string;
    typeId: string;
    values: Record<string, TypedDocumentValue>;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}
export interface UseTypedDocumentsOptions {
    idToken: string | null;
    typeId: string | null;
}
export interface UseTypedDocumentsReturn {
    documents: TypedDocument[];
    loading: boolean;
    error: string | null;
    createDocument: (values: Record<string, TypedDocumentValue>) => Promise<TypedDocument>;
    refresh: () => void;
}
export declare function useTypedDocuments({ idToken, typeId }: UseTypedDocumentsOptions): UseTypedDocumentsReturn;
//# sourceMappingURL=useTypedDocuments.d.ts.map