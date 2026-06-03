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
    createdAt: string;
    updatedAt: string;
}
export declare const CUSTOM_FIELD_TYPE_STORAGE_KEY = "ws_field_types_v1";
export declare function isValidCustomFieldType(x: unknown): x is CustomFieldType;
//# sourceMappingURL=fieldType.d.ts.map