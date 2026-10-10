// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE
//
// Fork change: the mark being tracked is matched by suggestion IDENTITY rather
// than by an `id` attr, and an explicit identity may be supplied so the walk
// follows one author's mark when several overlap.

import type { MarkType, ResolvedPos } from '@tiptap/pm/model';

import { sameSuggestion, suggestionIdentityOf, type SuggestionIdentity } from './identity';
import { findSuggestionMark } from './utils';

export function findSuggestionMarkEnd(
  $pos: ResolvedPos,
  markType: MarkType,
  id?: SuggestionIdentity,
): number {
  const initialMark = findSuggestionMark(
    ($pos.nodeAfter ?? $pos.nodeBefore)?.marks ?? [],
    markType,
    id,
  );
  if (!initialMark) {
    return $pos.pos;
  }
  const initialId = suggestionIdentityOf(initialMark);

  let afterPos = $pos.pos + ($pos.nodeAfter?.nodeSize ?? 0);
  // We always return from this while loop
  for (;;) {
    const $afterPos = $pos.doc.resolve(afterPos);
    if (
      $afterPos.depth < 1 ||
      ($afterPos.nodeAfter && !findSuggestionMark($afterPos.marks(), markType, initialId ?? undefined))
    ) {
      return $afterPos.pos;
    }
    // We're at the end of a node. We need to check whether there's a matching
    // mark at the beginning of the next node.
    let afterParentPos = $afterPos.after();
    let $afterParentPos = $pos.doc.resolve(afterParentPos);
    let nextParent = $afterParentPos.nodeAfter;
    while ($afterParentPos.depth > 0 && !nextParent) {
      afterParentPos = $afterPos.after($afterParentPos.depth);
      $afterParentPos = $pos.doc.resolve(afterParentPos);
      nextParent = $afterParentPos.nodeAfter;
    }
    let cousinStartPos = afterParentPos + 1;
    let cousin = nextParent?.firstChild;
    while (cousin && !cousin.isLeaf && !findSuggestionMark(cousin.marks, markType, initialId ?? undefined)) {
      cousin = cousin.firstChild;
      cousinStartPos++;
    }
    const cousinMark = cousin
      ? findSuggestionMark(cousin.marks, markType, initialId ?? undefined)
      : undefined;
    if (!cousin || !cousinMark || !sameSuggestion(suggestionIdentityOf(cousinMark), initialId)) {
      return $afterPos.pos;
    }
    const $cousinStartPos = $pos.doc.resolve(cousinStartPos);
    afterPos = $cousinStartPos.pos + ($cousinStartPos.nodeAfter?.nodeSize ?? 0);
  }
}
