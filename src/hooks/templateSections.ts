// templateSections.ts
//
// Makes new-document template application safe when two people open the
// document at the same moment.
//
// The auto-populate effect in useDocumentEditorState guards on
// `meta.templateApplied` and `sections.length === 0`. Neither is a lock:
// `templateApplied` is a Y.Map key (last-write-wins, not compare-and-set), and
// both clients read an empty section list before either has written. So both
// apply the template, `addSection` pushes onto the shared Y.Array with no
// dedupe, and the document ends up with every section twice.
//
// Rather than trying to make the write exclusive — which CRDTs do not give you
// — this makes it IDEMPOTENT:
//
//   1. `templateSectionId` derives a section id from the document and field, so
//      two clients applying the same template produce the same ids instead of
//      two sets of random UUIDs that nothing can tell apart afterwards.
//   2. `dedupeSectionsById` removes all but the first occurrence of each id.
//      Y.Array order converges identically on every client after a merge, so
//      "keep the first" is a convergent rule: each client computes the same
//      deletions, and no section is lost to a double delete.

import * as Y from 'yjs';

/**
 * Stable id for a section created from a document-type template field.
 *
 * Deterministic in `(documentId, fieldName)` so concurrent appliers agree.
 * Not a cryptographic hash — it only has to be stable and collision-free
 * within one document's field names.
 */
export function templateSectionId(documentId: string, fieldName: string): string {
  const key = `${documentId}::${fieldName}`;
  // djb2, matching the hashing style already used for avatar colours.
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 33) ^ key.charCodeAt(i);
  }
  return `tpl-${(hash >>> 0).toString(36)}`;
}

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
export function dedupeSectionsById(ydoc: Y.Doc): number {
  const sections = ydoc.getArray<Y.Map<unknown>>('sections');
  const seen = new Set<string>();
  const removeAt: number[] = [];

  sections.toArray().forEach((section, index) => {
    const id = section.get('id');
    if (typeof id !== 'string' || !id) return;
    if (seen.has(id)) removeAt.push(index);
    else seen.add(id);
  });

  if (removeAt.length === 0) return 0;

  ydoc.transact(() => {
    // Delete from the back so earlier indices stay valid.
    for (let i = removeAt.length - 1; i >= 0; i--) {
      sections.delete(removeAt[i], 1);
    }
  });
  return removeAt.length;
}
