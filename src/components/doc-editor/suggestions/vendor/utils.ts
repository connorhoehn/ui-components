// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE

import type { Mark, MarkType, Schema } from '@tiptap/pm/model';

import { sameSuggestion, suggestionIdentityOf, type SuggestionIdentity } from './identity';
import {
  SUGGESTION_DELETE_MARK,
  SUGGESTION_INSERT_MARK,
  SUGGESTION_MODIFY_MARK,
} from './markNames';

export interface SuggestionMarks {
  insertion: MarkType;
  deletion: MarkType;
  modification: MarkType;
}

/**
 * Get the suggestion mark types from a schema, with proper error handling.
 * Throws if any of the required marks are not registered.
 */
export function getSuggestionMarks(schema: Schema): SuggestionMarks {
  const insertion = schema.marks[SUGGESTION_INSERT_MARK];
  const deletion = schema.marks[SUGGESTION_DELETE_MARK];
  const modification = schema.marks[SUGGESTION_MODIFY_MARK];
  const missing = [
    insertion ? null : SUGGESTION_INSERT_MARK,
    deletion ? null : SUGGESTION_DELETE_MARK,
    modification ? null : SUGGESTION_MODIFY_MARK,
  ].filter(Boolean);
  if (!insertion || !deletion || !modification) {
    throw new Error(
      `Suggestion marks missing from schema: ${missing.join(', ')}. ` +
        'Register the SuggestionMarks extensions on the editor.',
    );
  }
  return { insertion, deletion, modification };
}

/**
 * Find a mark of `type` in `marks`, optionally narrowed to one suggestion.
 *
 * Upstream used `MarkType.isInSet`, which returns only the FIRST mark of a
 * given type. Because our marks declare `excludes: ''`, a node can legitimately
 * carry two `suggestionDelete` marks from two different authors — `isInSet`
 * would see only one of them and the other author's suggestion would be
 * invisible to accept/reject.
 */
export function findSuggestionMark(
  marks: readonly Mark[],
  type: MarkType,
  id?: SuggestionIdentity,
): Mark | undefined {
  return marks.find(
    (mark) => mark.type === type && (!id || sameSuggestion(suggestionIdentityOf(mark), id)),
  );
}

/** Every suggestion mark of `type` on `marks`, in document order. */
export function findSuggestionMarks(marks: readonly Mark[], type: MarkType): Mark[] {
  return marks.filter((mark) => mark.type === type);
}
