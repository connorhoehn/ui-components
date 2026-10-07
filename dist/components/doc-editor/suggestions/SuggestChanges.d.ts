import { Extension, type Editor } from '@tiptap/core';
import { type SuggestionIdentity } from './vendor';
export interface SuggestionUser {
    /** Stable user id — the attribution key. */
    id: string;
    /** Display name. */
    name: string;
}
export interface SuggestChangesOptions {
    /** Author every suggestion made through this editor is attributed to. */
    user: SuggestionUser;
    /** Whether suggestion mode starts on. */
    enabled: boolean;
    /** Clock seam, so tests can drive the ten-minute bucketing deterministically. */
    now: () => number;
    /**
     * Called with this editor instance on create; the returned function runs on
     * destroy. This is how a DOCUMENT-level suggestion toggle reaches every
     * section: a document renders N independent section editors, suggestion
     * mode lives in each one's ProseMirror plugin state, and the host adapter
     * (realtime-modules' TiptapEditor) exposes no editor handle. Registering
     * from inside the extension keeps that coordination here instead of
     * requiring a new prop on the adapter.
     */
    register?: (editor: Editor) => (() => void) | void;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        suggestChanges: {
            /** Turn suggestion mode on or off. */
            setSuggestionMode: (enabled: boolean) => ReturnType;
            /** Flip suggestion mode. */
            toggleSuggestionMode: () => ReturnType;
            /** Accept one suggestion: keep its insertions, remove its deletions. */
            acceptSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Reject one suggestion: drop its insertions, restore its deletions. */
            rejectSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Accept every suggestion in the document. */
            acceptAllSuggestions: () => ReturnType;
            /** Reject every suggestion in the document. */
            rejectAllSuggestions: () => ReturnType;
            /** Move the selection onto a suggestion. */
            selectSuggestion: (id: SuggestionIdentity) => ReturnType;
        };
    }
}
export declare const SuggestChanges: Extension<SuggestChangesOptions, any>;
/**
 * Run `edit` with its suggestions attributed to `author` instead of the editor's
 * own user, turning suggestion mode on for the duration if it was off.
 *
 * Two separate problems make this necessary, and both are silent if unhandled.
 *
 * ATTRIBUTION. An AI proposal is applied by whichever browser is looking at the
 * document. Without an override the marks would carry that person's identity,
 * and the document would show a human proposing an edit they never wrote. Every
 * collaborator sees unreviewed marks the moment they exist — Gemini keeps its
 * own private until approved and we do not — so the only thing standing between
 * "a proposal" and "an agreed edit" is the name on it. It has to be right.
 *
 * SEPARATION. A suggestion's identity is `user@date` with the date floored to a
 * ten-minute bucket, deliberately, so a burst of typing reads as one suggestion.
 * That is right for a person and wrong for us: two AI proposals drafted eight
 * minutes apart would land in the same bucket, share an identity, merge into one
 * un-separable suggestion, and a human accepting one would accept both. Passing
 * `ai:<proposalId>` as the id makes every proposal its own author and the
 * bucketing irrelevant.
 *
 * `edit` must be synchronous. The override is a single mutable slot on the
 * editor, and an async callback would leave it set while unrelated keystrokes
 * were dispatched.
 */
export declare function authorSuggestionsAs(editor: Editor, author: SuggestionUser, edit: () => void): void;
/** The author id every proposal's marks carry. One per proposal, never shared. */
export declare function proposalAuthor(proposalId: string, label?: string): SuggestionUser;
//# sourceMappingURL=SuggestChanges.d.ts.map