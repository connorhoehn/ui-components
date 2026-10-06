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
/**
 * Does this cookbook answer to `query`?
 *
 * One predicate, shared by every surface that offers the cookbooks — the
 * gallery on the Document Types page and the starting-point picker in the New
 * Document modal. They used to filter with two hand-written copies of the same
 * four `.includes()` calls, which is how "retro" came to match in one place
 * and not the other.
 *
 * Matches on name, description, tags and category so the words a person
 * actually types ("retro", "postmortem", "hiring") land on the right template
 * even when they are nowhere in its title.
 */
export declare function matchesCookbookQuery(cookbook: DocumentTypeCookbook, query: string): boolean;
/** Cookbooks in catalogue order, filtered by category then query. */
export declare function filterCookbooks(query: string, category?: CookbookCategory | 'All'): DocumentTypeCookbook[];
//# sourceMappingURL=index.d.ts.map