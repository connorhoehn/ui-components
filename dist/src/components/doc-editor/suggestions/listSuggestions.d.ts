import type { Node } from '@tiptap/pm/model';
import { type SuggestionIdentity } from './vendor';
export type SuggestionKind = 'insert' | 'delete' | 'replace' | 'modify';
export interface SuggestionSummary {
    /** Who and when — the identity carried by every mark in this suggestion. */
    id: SuggestionIdentity;
    /** Stable string form of `id`, for React keys. */
    key: string;
    kind: SuggestionKind;
    /** Document range the suggestion spans, for scroll-to and range commands. */
    from: number;
    to: number;
    /** Text the author proposes adding — every block run together, for search and tests. */
    insertedText: string;
    /**
     * The same, one entry per BLOCK the insertion touches. A suggestion is one
     * key — `${user}@${date}`, bucketed to ten minutes — so an agent appending
     * a rule, a paragraph and a second paragraph is ONE suggestion, and joined
     * flat it read as "| Column 1 | Column 2 ||--------|| | |Placeholder text".
     */
    insertedBlocks: string[];
    /** Text the author proposes removing. */
    deletedText: string;
}
/**
 * Every suggestion in `doc`, in document order.
 *
 * Marks are grouped by identity, not by position: one author's run of edits in
 * the same ten-minute bucket is one entry here even when the marks are split
 * across several text nodes, which is what makes the review list readable
 * rather than one row per keystroke.
 */
export declare function listSuggestions(doc: Node): SuggestionSummary[];
//# sourceMappingURL=listSuggestions.d.ts.map