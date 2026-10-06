import type { SuggestionIdentity } from './vendor';
export interface SuggestionAuthor {
    /** The person the suggestion belongs to — who to talk to about the change. */
    person: string;
    /** The model that drafted it, when an agent run produced it. */
    model?: string;
}
/** Compose the display name an agent run should write onto its marks. */
export declare function formatSuggestionAuthor({ person, model }: SuggestionAuthor): string;
/**
 * Split a mark's `username` into the person and the model.
 *
 * A name with no suffix is a person, which is what makes this safe to run over
 * every suggestion including the ones a human typed by hand.
 */
export declare function parseSuggestionAuthor(username: string | null | undefined): SuggestionAuthor;
/**
 * The string every suggestion surface hands `SuggestionCard`'s `author`.
 *
 * One function for all three surfaces — the margin bubble, the Suggestions pane
 * and the review panel — because a card that says "Eve" in the gutter and
 * "Haiku" in the pane is worse than either alone: the reader cannot tell which
 * one is lying and has no way to find out.
 *
 * The card splits this back apart to lay it out, so the person is what survives
 * a narrow column. Composed rather than passed as two props because the card is
 * consumed from a published build of ui-components and the person/model split
 * has to work against the version already installed.
 */
export declare function suggestionAuthorLabel(id: Pick<SuggestionIdentity, 'username'>): string;
export default suggestionAuthorLabel;
//# sourceMappingURL=suggestionAuthor.d.ts.map