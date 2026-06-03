import type { SectionRenderer } from './types';
import type { ViewMode } from '../types/document';
export interface FieldTypeDefinition {
    /** Unique key — matches SectionType for built-ins; UUID for user-defined types */
    type: string;
    label: string;
    icon: string;
    description: string;
    /** Available renderer keys per view mode, e.g. { editor: ['tasks:editor'] } */
    rendererKeys: Partial<Record<ViewMode, string[]>>;
    /** Human-readable label for each renderer key */
    rendererLabels: Record<string, string>;
    /**
     * When set, renderer resolution uses this type's renderers instead of `type`.
     * User-defined field types set this to the built-in type they wrap.
     */
    rendererType?: string;
}
export declare function registerFieldType(def: FieldTypeDefinition): void;
export declare function getFieldTypes(): FieldTypeDefinition[];
export declare function getFieldType(type: string): FieldTypeDefinition | undefined;
export declare function registerRenderer(sectionType: string, viewMode: ViewMode | '*', component: SectionRenderer): void;
export declare function getRenderer(sectionType: string | null | undefined, viewMode: ViewMode): SectionRenderer | null;
/** Returns all registered (sectionType, viewMode) pairs — useful for debug / config UIs. */
export declare function listRegisteredRenderers(): Array<{
    sectionType: string;
    viewMode: string;
    component: SectionRenderer;
}>;
//# sourceMappingURL=registry.d.ts.map