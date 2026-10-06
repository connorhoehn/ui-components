export interface DeckRecordingOption {
    recordingId: string;
    label: string;
    hint?: string;
}
export interface ParsedDeckCommand {
    /** The instruction with the flags removed — what the deck is about. */
    prompt: string;
    preview: boolean;
    from?: 'transcript' | 'documents';
    /**
     * The recording, when `--from` named one directly as `recording:<id>` —
     * the token the picker inserts. Set alongside `from: 'transcript'`.
     */
    recordingId?: string;
}
/**
 * The same grammar `parseDeckCommand` implements on the server, read here only
 * to know what to SEND. Anything unrecognised stays in the prompt rather than
 * being dropped, so a typo reaches the server as text instead of vanishing.
 *
 * `--preview` and `--from` are recognised WHEREVER they fall in the text, not
 * only trailing — every word is scanned, so appending `--preview` after a
 * picked recording (or any other free text) still lands.
 */
export declare function parseDeckText(argumentText: string): ParsedDeckCommand;
/**
 * "Sprint review — the release risks" → the deck's title and its subject.
 *
 * Only an em dash or en dash ends the title — NOT a bare colon. A colon shows
 * up in ordinary text that has nothing to do with naming a deck (a time like
 * "08:30 AM", a `key:value` option value) and splitting on it there truncates
 * the title mid-sentence. A title that really means "name: subject" keeps its
 * colon; there is no way to tell that case apart from a timestamp without
 * requiring the em/en dash instead, so this only recognises the dash.
 */
export declare function deckTitleFrom(prompt: string, conversationName?: string): string;
/**
 * Which recording a `--from transcript` deck reads.
 *
 * The person's own pick first — it is the only unambiguous answer. Failing
 * that, the conversation's single recording, because "the transcript" has one
 * meaning when there is exactly one. With several and no pick, none: guessing
 * which meeting a deck is about is the error worth refusing.
 */
export declare function recordingIdFor(picked: string | undefined, recordings: readonly DeckRecordingOption[]): string | undefined;
//# sourceMappingURL=deckText.d.ts.map