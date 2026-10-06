import type { CustomFieldType } from '../types/fieldType';
export declare function loadCustomFieldTypes(): CustomFieldType[];
/** Register a single user-defined field type with the renderer registry. */
export declare function registerCustomFieldType(ft: CustomFieldType): void;
/** Load from localStorage and register all user-defined field types. Call once at startup. */
export declare function registerCustomFieldTypes(): void;
export interface UseCustomFieldTypesReturn {
    types: CustomFieldType[];
    createType: (draft: Omit<CustomFieldType, 'id' | 'createdAt' | 'updatedAt'>) => CustomFieldType;
    updateType: (id: string, patch: Partial<Omit<CustomFieldType, 'id' | 'createdAt'>>) => void;
    deleteType: (id: string) => void;
}
export declare function useCustomFieldTypes(): UseCustomFieldTypesReturn;
//# sourceMappingURL=useCustomFieldTypes.d.ts.map