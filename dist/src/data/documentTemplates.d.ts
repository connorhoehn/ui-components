import type { Section, SectionType, ViewMode } from '../types/document';
export interface DefaultSectionDef {
    type: Section['type'];
    title: string;
    sectionType?: SectionType;
    placeholder?: string;
    metadata?: Record<string, unknown>;
}
export interface DocumentTemplate {
    type: string;
    name: string;
    icon: string;
    description: string;
    defaultSections: DefaultSectionDef[];
    supportedModes?: ViewMode[];
}
export declare const DOCUMENT_TEMPLATES: DocumentTemplate[];
//# sourceMappingURL=documentTemplates.d.ts.map