export { SUGGESTION_DELETE_MARK, SUGGESTION_INSERT_MARK, SUGGESTION_MODIFY_MARK, } from './markNames';
export { bucketSuggestionDate, createSuggestionIdentity, sameSuggestion, suggestionDateValidate, suggestionIdentityOf, suggestionKey, suggestionUserValidate, SUGGESTION_DATE_BUCKET_MS, type SuggestionIdentity, } from './identity';
export { findSuggestionMark, findSuggestionMarks, getSuggestionMarks } from './utils';
export type { SuggestionMarks } from './utils';
export { applySuggestion, applySuggestions, applySuggestionsInRange, applySuggestionsToNode, applySuggestionsToRange, disableSuggestChanges, enableSuggestChanges, revertSuggestion, revertSuggestions, revertSuggestionsInRange, revertSuggestionsToNode, selectSuggestion, toggleSuggestChanges, } from './commands';
export { isSuggestChangesEnabled, suggestChanges, suggestChangesKey } from './plugin';
export type { SuggestChangesState } from './plugin';
export { shouldSkipSuggestChanges, transformToSuggestionTransaction, withSuggestChanges, } from './withSuggestChanges';
export type { SuggestionIdentityFactory } from './withSuggestChanges';
export { ZERO_WIDTH_SPACE } from './zeroWidthSpace';
//# sourceMappingURL=index.d.ts.map