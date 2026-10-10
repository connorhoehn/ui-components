// frontend/src/editor/suggestions/suggestionAuthor.ts
//
// WHO a suggestion belongs to, when a model drafted it on someone's behalf.
//
// THE PROBLEM THIS SOLVES
//
// A suggestion mark carries `{ user, username, date }` and nothing else, and for
// an agent run platform-api has been writing the AGENT's identity into both
// fields — `user: 'agent:haiku'`, `username: 'Haiku'`. So every card in the
// margin, the Suggestions pane and the review panel says "Haiku".
//
// That is the least useful name that could be on the card. A suggestion is a
// request for a decision, and the decision is a conversation with a PERSON: the
// one who typed `/doc tighten the intro` and is waiting to hear whether it
// landed. "Haiku" tells you which engine ran. In a document with four
// collaborators and two agent runs it does not even distinguish the two runs.
//
// So the person owns the suggestion and the model is the secondary fact:
//
//     Eve (powered by Haiku)
//
// THE WIRE FORMAT IS THE `username` STRING, DELIBERATELY
//
// The obvious alternative — a fourth mark attribute for the model — was not
// taken. The mark schema is shared by three codebases: the vendored
// prosemirror-suggest-changes fork here, platform-api's own writer, and every
// document already persisted with the current three attributes. Adding an
// attribute means a coordinated release across all of them plus a migration for
// documents that predate it, to carry a string that is only ever displayed.
//
// Encoding it in `username` costs one parse and nothing else: an old mark
// (`username: 'Haiku'`) parses to a person named "Haiku" and renders exactly as
// it does today, so there is no version skew and no migration.
//
// WHY THE VIEWER IS NEVER THE ANSWER
//
// It would be easy to make the card say the person reading it — the mark is
// applied through somebody's browser, so a name is always to hand. That name is
// wrong. Agent suggestions replicate through Yjs to everyone, so guessing the
// viewer means the same suggestion is attributed to a different person in every
// window, and the one place attribution has to be trustworthy is the one place
// it would be fabricated. If the person is not on the mark, we say the model and
// nothing more.

import type { SuggestionIdentity } from './vendor';

export interface SuggestionAuthor {
  /** The person the suggestion belongs to — who to talk to about the change. */
  person: string;
  /** The model that drafted it, when an agent run produced it. */
  model?: string;
}

/**
 * The suffix that carries the model.
 *
 * Anchored to the end and non-greedy up to the final `)` so a person whose own
 * name contains brackets keeps them: "Ann (Design) (powered by Haiku)" is Ann
 * (Design), drafted by Haiku.
 */
const POWERED_BY = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;

/** Compose the display name an agent run should write onto its marks. */
export function formatSuggestionAuthor({ person, model }: SuggestionAuthor): string {
  const who = person.trim();
  const engine = model?.trim();
  if (!who) return engine ?? '';
  return engine ? `${who} (powered by ${engine})` : who;
}

/**
 * Split a mark's `username` into the person and the model.
 *
 * A name with no suffix is a person, which is what makes this safe to run over
 * every suggestion including the ones a human typed by hand.
 */
export function parseSuggestionAuthor(username: string | null | undefined): SuggestionAuthor {
  const raw = (username ?? '').trim();
  if (!raw) return { person: '' };
  const match = POWERED_BY.exec(raw);
  if (!match) return { person: raw };
  const person = match[1]!.trim();
  const model = match[2]!.trim();
  if (!person || !model) return { person: raw };
  return { person, model };
}

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
export function suggestionAuthorLabel(id: Pick<SuggestionIdentity, 'username'>): string {
  return formatSuggestionAuthor(parseSuggestionAuthor(id.username));
}

export default suggestionAuthorLabel;
