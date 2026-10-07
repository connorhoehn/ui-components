import { Mark } from '@tiptap/core';
/** Text the author has suggested adding. */
export declare const SuggestionInsert: Mark<any, any>;
/** Text the author has suggested removing. Still present until accepted. */
export declare const SuggestionDelete: Mark<any, any>;
/**
 * A suggested change to a node's attributes, marks or type (bold, heading
 * level, list type...). Carries the identity attrs plus enough of the old value
 * to roll the change back on reject.
 */
export declare const SuggestionModify: Mark<any, any>;
/** All three suggestion marks, ready to spread into an extension list. */
export declare const SuggestionMarks: Mark<any, any>[];
//# sourceMappingURL=marks.d.ts.map