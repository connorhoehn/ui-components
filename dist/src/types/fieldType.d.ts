import type { ViewMode } from './document';
/**
 * Step 2 ("Display") of the Data Types wizard, for one view mode.
 *
 * ADDITIVE, optional. Before this existed, `FieldTypesPage.handleSave` sent
 * only `{name, icon, description, primitiveType, baseType}` — the Visible
 * checkboxes and the renderer pickers had nowhere to be written, so every
 * step-2 choice was discarded the moment the user pressed Save and reopening
 * the type for edit showed all three modes visible with the default renderer.
 */
export interface CustomFieldTypeDisplay {
    /** Does this field appear at all in this view mode? */
    visible: boolean;
    /** Chosen renderer key, e.g. `'rich-text:reader'`. Absent = the base type's first. */
    renderer?: string;
}
export interface CustomFieldType {
    id: string;
    name: string;
    icon: string;
    description: string;
    /**
     * Primitive storage type — e.g. 'long_text_and_summary', 'list_text'.
     * Identifies the Drupal-style data storage class the user selected.
     * Optional for backward-compat with records persisted before this field was added.
     */
    primitiveType?: string;
    /**
     * Which built-in renderer to delegate to for display.
     * Derived from primitiveType at creation time.
     */
    baseType: string;
    /**
     * Per-view-mode visibility + renderer choice from step 2 of the wizard.
     * Optional for backward-compat with records persisted before it existed;
     * absent means "visible everywhere, base type's default renderer".
     */
    display?: Partial<Record<ViewMode, CustomFieldTypeDisplay>>;
    createdAt: string;
    updatedAt: string;
}
export declare const CUSTOM_FIELD_TYPE_STORAGE_KEY = "ws_field_types_v1";
export declare function isValidCustomFieldType(x: unknown): x is CustomFieldType;
//# sourceMappingURL=fieldType.d.ts.map