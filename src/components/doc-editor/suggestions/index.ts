// Suggestion marks ("track changes") for the Tiptap editor — pure engine, no
// React context. The marks, the SuggestChanges extension, the readers
// (listSuggestions, finalDoc, originalDoc) and the author encoding. Ported from
// realtime-examples' `editor/suggestions`; the transaction rewriting is the
// vendored @handlewithcare/prosemirror-suggest-changes 0.1.8 (see ./vendor).
export { SuggestionDelete, SuggestionInsert, SuggestionMarks, SuggestionModify } from './marks';
export { SuggestChanges, authorSuggestionsAs, proposalAuthor } from './SuggestChanges';
export type { SuggestChangesOptions, SuggestionUser } from './SuggestChanges';

export { listSuggestions } from './listSuggestions';
export type { SuggestionKind, SuggestionSummary } from './listSuggestions';

export { formatSuggestionAuthor, parseSuggestionAuthor, suggestionAuthorLabel } from './suggestionAuthor';
export type { SuggestionAuthor } from './suggestionAuthor';

export {
  docForViewMode,
  finalDoc,
  originalDoc,
  previewStateForViewMode,
  viewModeClassName,
  SUGGESTION_VIEW_MODES,
} from './viewModes';
export type { SuggestionViewMode } from './viewModes';

export {
  bucketSuggestionDate,
  createSuggestionIdentity,
  isSuggestChangesEnabled,
  sameSuggestion,
  suggestionIdentityOf,
  suggestionKey,
  SUGGESTION_DATE_BUCKET_MS,
} from './vendor';
export type { SuggestionIdentity } from './vendor';
