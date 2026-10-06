// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE
//
// The names our suggestion marks are registered under in the editor schema.
//
// These deliberately do NOT reuse upstream's `insertion` / `deletion` /
// `modification`. y-prosemirror's `gatherMarks` resolves marks by name; those
// upstream names collide with the `y-attributed-*` marks y-prosemirror uses for
// its own attribution and the collision is silent — you lose author info with
// no error. Keep these prefixed.

export const SUGGESTION_INSERT_MARK = 'suggestionInsert';
export const SUGGESTION_DELETE_MARK = 'suggestionDelete';
export const SUGGESTION_MODIFY_MARK = 'suggestionModify';
