import * as Y from 'yjs';
/**
 * Stable id for a section created from a document-type template field.
 *
 * Deterministic in `(documentId, fieldName)` so concurrent appliers agree.
 * Not a cryptographic hash — it only has to be stable and collision-free
 * within one document's field names.
 */
export declare function templateSectionId(documentId: string, fieldName: string): string;
/**
 * Remove duplicate sections, keeping the first occurrence of each id.
 *
 * Safe to run on every client independently and repeatedly: it is convergent
 * (post-merge array order is identical everywhere) and a no-op once clean.
 * Sections with no `id` are left alone — dropping them would be data loss, and
 * they cannot be duplicates of anything identifiable.
 *
 * Returns the number of entries removed, for logging/tests.
 */
export declare function dedupeSectionsById(ydoc: Y.Doc): number;
//# sourceMappingURL=templateSections.d.ts.map