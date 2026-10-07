import type { Mark, MarkType, Schema } from '@tiptap/pm/model';
import { type SuggestionIdentity } from './identity';
export interface SuggestionMarks {
    insertion: MarkType;
    deletion: MarkType;
    modification: MarkType;
}
/**
 * Get the suggestion mark types from a schema, with proper error handling.
 * Throws if any of the required marks are not registered.
 */
export declare function getSuggestionMarks(schema: Schema): SuggestionMarks;
/**
 * Find a mark of `type` in `marks`, optionally narrowed to one suggestion.
 *
 * Upstream used `MarkType.isInSet`, which returns only the FIRST mark of a
 * given type. Because our marks declare `excludes: ''`, a node can legitimately
 * carry two `suggestionDelete` marks from two different authors — `isInSet`
 * would see only one of them and the other author's suggestion would be
 * invisible to accept/reject.
 */
export declare function findSuggestionMark(marks: readonly Mark[], type: MarkType, id?: SuggestionIdentity): Mark | undefined;
/** Every suggestion mark of `type` on `marks`, in document order. */
export declare function findSuggestionMarks(marks: readonly Mark[], type: MarkType): Mark[];
//# sourceMappingURL=utils.d.ts.map