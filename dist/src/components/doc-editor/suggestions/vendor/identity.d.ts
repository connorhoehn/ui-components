import type { Mark } from '@tiptap/pm/model';
/** Suggestions by one author within the same bucket join into one suggestion. */
export declare const SUGGESTION_DATE_BUCKET_MS: number;
export interface SuggestionIdentity {
    /** Stable user id. The attribution key — never a display name. */
    user: string;
    /** Display name, denormalised onto the mark so review chrome needs no lookup. */
    username: string;
    /** Epoch ms, floored to SUGGESTION_DATE_BUCKET_MS. */
    date: number;
}
/** Floor an epoch-ms timestamp to the start of its ten-minute bucket. */
export declare function bucketSuggestionDate(epochMs?: number): number;
/** Build the identity a new suggestion mark should carry right now. */
export declare function createSuggestionIdentity(user: string, username: string, at?: number): SuggestionIdentity;
/** Read the identity off a suggestion mark, or null if it isn't one. */
export declare function suggestionIdentityOf(mark: Mark | null | undefined): SuggestionIdentity | null;
/**
 * Do two identities denote the same suggestion?
 *
 * `username` is deliberately NOT compared: it's denormalised display data and a
 * rename mid-session must not split one suggestion in two.
 */
export declare function sameSuggestion(a: SuggestionIdentity | null | undefined, b: SuggestionIdentity | null | undefined): boolean;
/** Stable string form, for React keys, decoration keys and Map lookups. */
export declare function suggestionKey(id: SuggestionIdentity): string;
export declare const suggestionUserValidate = "string";
export declare const suggestionDateValidate = "number";
//# sourceMappingURL=identity.d.ts.map