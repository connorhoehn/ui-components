// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE
//
// Replaces upstream's `generateId.ts`.
//
// Upstream identifies a suggestion by an opaque `id` attr (an incrementing
// number). That does not survive collaboration: two peers both pick "next id 4"
// and their unrelated suggestions merge into one.
//
// Instead a suggestion is identified by WHO made it and WHEN, bucketed to ten
// minutes (the Fiduswriter convention):
//
//     { user: 'u-123', username: 'Ada', date: 1755000000000 }
//
// Two marks with the same identity are `Mark.eq`-equal, so ProseMirror joins
// adjacent text carrying them into one range for free. That gives the behaviour
// we want: a burst of typing by one author reads as ONE suggestion, but the
// same author's edits ten minutes later are a separate suggestion, and another
// author's edits are always separate.

import type { Mark } from '@tiptap/pm/model';

/** Suggestions by one author within the same bucket join into one suggestion. */
export const SUGGESTION_DATE_BUCKET_MS = 10 * 60 * 1000;

export interface SuggestionIdentity {
  /** Stable user id. The attribution key — never a display name. */
  user: string;
  /** Display name, denormalised onto the mark so review chrome needs no lookup. */
  username: string;
  /** Epoch ms, floored to SUGGESTION_DATE_BUCKET_MS. */
  date: number;
}

/** Floor an epoch-ms timestamp to the start of its ten-minute bucket. */
export function bucketSuggestionDate(epochMs: number = Date.now()): number {
  return Math.floor(epochMs / SUGGESTION_DATE_BUCKET_MS) * SUGGESTION_DATE_BUCKET_MS;
}

/** Build the identity a new suggestion mark should carry right now. */
export function createSuggestionIdentity(
  user: string,
  username: string,
  at: number = Date.now(),
): SuggestionIdentity {
  return { user, username, date: bucketSuggestionDate(at) };
}

/** Read the identity off a suggestion mark, or null if it isn't one. */
export function suggestionIdentityOf(mark: Mark | null | undefined): SuggestionIdentity | null {
  if (!mark) return null;
  const { user, username, date } = mark.attrs as Partial<SuggestionIdentity>;
  if (typeof user !== 'string' || typeof date !== 'number') return null;
  return { user, username: typeof username === 'string' ? username : user, date };
}

/**
 * Do two identities denote the same suggestion?
 *
 * `username` is deliberately NOT compared: it's denormalised display data and a
 * rename mid-session must not split one suggestion in two.
 */
export function sameSuggestion(
  a: SuggestionIdentity | null | undefined,
  b: SuggestionIdentity | null | undefined,
): boolean {
  if (!a || !b) return false;
  return a.user === b.user && a.date === b.date;
}

/** Stable string form, for React keys, decoration keys and Map lookups. */
export function suggestionKey(id: SuggestionIdentity): string {
  return `${id.user}@${id.date}`;
}

export const suggestionUserValidate = 'string';
export const suggestionDateValidate = 'number';
