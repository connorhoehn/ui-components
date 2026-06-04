import type { DocumentType } from '../../../types/documentType';
export interface DocumentTypeCookbook {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: CookbookCategory;
    tags: string[];
    build(): Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>;
}
export type CookbookCategory = 'Engineering' | 'Operations' | 'People' | 'Sales & CRM' | 'Product' | 'Finance' | 'Legal' | 'General';
export declare const COOKBOOK_CATEGORIES: CookbookCategory[];
export declare const documentTypeCookbooks: DocumentTypeCookbook[];
//# sourceMappingURL=index.d.ts.map