// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 (MIT).
// See ./LICENSE for the upstream licence and the full list of fork changes.
//
// Do not add a dependency on the upstream package alongside this: the two
// register different mark names and a document written by one is unreadable by
// the other.

export {
  SUGGESTION_DELETE_MARK,
  SUGGESTION_INSERT_MARK,
  SUGGESTION_MODIFY_MARK,
} from './markNames';

export {
  bucketSuggestionDate,
  createSuggestionIdentity,
  sameSuggestion,
  suggestionDateValidate,
  suggestionIdentityOf,
  suggestionKey,
  suggestionUserValidate,
  SUGGESTION_DATE_BUCKET_MS,
  type SuggestionIdentity,
} from './identity';

export { findSuggestionMark, findSuggestionMarks, getSuggestionMarks } from './utils';
export type { SuggestionMarks } from './utils';

export {
  applySuggestion,
  applySuggestions,
  applySuggestionsInRange,
  applySuggestionsToNode,
  applySuggestionsToRange,
  disableSuggestChanges,
  enableSuggestChanges,
  revertSuggestion,
  revertSuggestions,
  revertSuggestionsInRange,
  revertSuggestionsToNode,
  selectSuggestion,
  toggleSuggestChanges,
} from './commands';

export { isSuggestChangesEnabled, suggestChanges, suggestChangesKey } from './plugin';
export type { SuggestChangesState } from './plugin';

export {
  shouldSkipSuggestChanges,
  transformToSuggestionTransaction,
  withSuggestChanges,
} from './withSuggestChanges';
export type { SuggestionIdentityFactory } from './withSuggestChanges';

export { ZERO_WIDTH_SPACE } from './zeroWidthSpace';
