import { SectionType, ViewMode } from './document';
export type { SectionType, ViewMode };
export declare const DOCUMENT_TYPE_ICONS: string[];
export interface DocumentTypeField {
    id: string;
    name: string;
    sectionType: string;
    required: boolean;
    defaultCollapsed: boolean;
    placeholder: string;
    hiddenInModes: ViewMode[];
    rendererOverrides: Partial<Record<ViewMode, string>>;
}
export interface DocumentTypePage {
    id: string;
    title?: string;
    sectionIds: string[];
}
export interface DocumentTypePageConfig {
    showTableOfContents: boolean;
}
export interface DocumentType {
    id: string;
    name: string;
    description: string;
    icon: string;
    fields: DocumentTypeField[];
    /** Phase 51 / hub#66 — multi-page layout. Optional; absent = single-page (legacy). */
    pages?: DocumentTypePage[];
    /** Phase 51 / hub#66 — page-level configuration. Only meaningful when pages.length > 1. */
    pageConfig?: DocumentTypePageConfig;
    createdAt: string;
    updatedAt: string;
}
/**
 * Migration helper. Returns the type's `pages` if present, otherwise
 * derives a single page that wraps every field. Pure function — does
 * NOT mutate the input. Existing code paths that don't know about
 * pages can keep reading `fields`; the wizard reads via this helper.
 */
export declare function getPagesView(type: DocumentType): DocumentTypePage[];
/**
 * Returns a fresh page-config (with safe defaults) when the stored
 * config is undefined. Used by the wizard so toggles always have a
 * value to bind to.
 */
export declare function getPageConfig(type: DocumentType): DocumentTypePageConfig;
export declare function makeEmptyField(sectionType: string): DocumentTypeField;
//# sourceMappingURL=documentType.d.ts.map