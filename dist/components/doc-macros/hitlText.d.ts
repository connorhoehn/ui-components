import { type TextRangeEdit } from './actionItemsText';
/** The `macro:<name>` discriminator for an agent -> human hand-off. */
export declare const HITL_MACRO_NAME = "hitl";
/**
 * One answer the callout offers, and what taking it does.
 *
 * `then` is the half that makes this more than a labelled button: a person
 * asked "ship it or hold?" is being asked to pick a CONSEQUENCE, and an agent
 * that knows what each branch does can say so. Empty when the asker did not.
 */
export interface HitlOption {
    /** The literal answer recorded when this option is taken. */
    value: string;
    /** What happens if it is. `''` when unstated. */
    then: string;
}
/** A `macro:hitl` callout, as the block draws it. */
export interface HitlCallout {
    /**
     * Stable id, minted by whoever asked. `''` when the body has none — which
     * is legal and renders fine, but see `HITL_QUERYABILITY`: an id is what a
     * row outside the document is keyed on, so a callout without one exists
     * only on this page.
     */
    id: string;
    /** The question. The one field this reader refuses a body without. */
    question: string;
    /** What the agent was doing. `''` when unstated. */
    context: string;
    /** Who is asking. `''` when unstated. */
    askedBy: string;
    /**
     * Who is being asked — an identity key, not a display name.
     *
     * `''` when the callout is addressed to nobody in particular. The
     * distinction is load-bearing outside the document: the cross-document
     * query is by assignee, and the answer endpoint refuses anyone who is not
     * the addressee. See `HITL_QUERYABILITY`.
     */
    assignee: string;
    /** What is stopped until this is answered. `''` when nothing is. */
    blocks: string;
    /**
     * ISO, or null. When it passes the asker has STOPPED WAITING — which is a
     * different fact from a deadline, and the block treats it as one: an
     * expired callout draws no answer control at all.
     */
    expiresAt: string | null;
    /** The choices. Empty means the answer is free prose. */
    options: HitlOption[];
    /** The recorded answer, or null while the callout is still waiting. */
    answer: string | null;
    /** `''` when the answer carries no attribution. */
    answeredBy: string;
    /** ISO, or `''`. */
    answeredAt: string;
}
/**
 * HOW A CALLOUT BECOMES VISIBLE OUTSIDE THIS PAGE — and exactly how far that
 * goes. Stated here because it is the first thing a reader of this file will
 * assume wrongly.
 *
 * Nothing outside an open editor can read a document body. There is no
 * server-side Y.Doc; the gateway relays CRDT bytes opaquely and platform-api
 * never materialises a document. So a callout that exists ONLY as these bytes
 * is invisible to every surface that is not the page it is on — an inbox built
 * on it would be empty by construction.
 *
 * The fix is the one `macro:diagram` already made: the body carries a
 * REFERENCE (`id`) and a queryable substrate carries a row. Here that
 * substrate is the section-items table, reached with a sentinel section id
 * (`_macro`) because a page-shaped document has no sections — verified: the
 * item handlers never look `sectionId` up against a real section and the
 * partition key is a plain `${documentId}:${sectionId}` concatenation, which
 * is why `_inbox` is already in use for the same trick.
 *
 * What that buys, and what it does not:
 *
 *   VISIBLE     the question (`text`), who is asked (`assignee`), whether it
 *               is still waiting (`status`), and — via
 *               `POST …/items/:itemId/answer` — an answer, with the addressee
 *               check and the already-answered guard enforced server side.
 *   NOT VISIBLE the OPTIONS and `expiresAt`. A section item has no field for
 *               either, and this work does not own the repository that would
 *               add one. So a surface reading only the row can offer free
 *               prose, and cannot know a callout has expired.
 *
 * The consequence is deliberate and must not be papered over: a remote surface
 * may present a comment box, never the declared choices, unless it has the
 * body in hand. Drawing three named buttons from a row that never carried them
 * would be inventing the ask.
 */
export declare const HITL_QUERYABILITY: string;
/**
 * WHICH SIDE WINS WHEN THE BODY AND THE ROW DISAGREE.
 *
 * Two stores, no transaction between them (there is no server-side Y.Doc), so
 * they CAN disagree and the only dishonest answer is to not have decided. The
 * rule is not "newest wins" — it is per-field, because the two halves are
 * authoritative about different things:
 *
 *   THE BODY OWNS THE ASK.  The question, the addressee, the options and the
 *   expiry live in the document and are projected OUT to the row by whoever
 *   has the page open. A row whose text or assignee drifts is corrected from
 *   the body, never the other way round: the body is what a person reads and
 *   what a foreign tool round-trips.
 *
 *   THE ROW OWNS WHETHER AN ANSWER STUCK.  It is the only half a person can
 *   reach without opening the page, and the only half the asker polls. So an
 *   answer written in the page is PROVISIONAL until the row accepts it — if
 *   the mirror refuses, the document edit is retracted and the card says why
 *   (`retractHitlEdit`, and `HitlMacro`'s header).
 *
 *   AN ANSWERED ROW FILLS AN UNANSWERED BODY.  That is the whole point of
 *   answering from an inbox, and it is how a page catches up after being
 *   answered while nobody had it open.
 *
 *   AN ANSWERED BODY IS NEVER OVERWRITTEN BY THE ROW.  Not even when the two
 *   answers differ. Two different recorded answers means one of them was
 *   accepted by something that acted on it, and silently replacing the text a
 *   person can see is how a document stops being evidence. The disagreement is
 *   REPORTED to the host instead — see `onAnswered`'s contract — and left on
 *   screen for a human.
 */
export declare const HITL_CONVERGENCE: string;
/**
 * The sentinel section a page-shaped document files macro rows under.
 *
 * Shared by every macro that mirrors itself, not just callouts — a canvas page
 * has no sections at all, so all of them need the same fake one to be
 * addressable. `HITL_SENTINEL_SECTION` is the older name, kept because it is
 * what the shipped hosts import.
 */
export declare const MACRO_ITEM_SENTINEL_SECTION = "_macro";
/** @deprecated Use `MACRO_ITEM_SENTINEL_SECTION` — the sentinel is not HITL's. */
export declare const HITL_SENTINEL_SECTION = "_macro";
/** The `category` a section-item row carries so it is recognisably a callout. */
export declare const HITL_ITEM_CATEGORY = "hitl";
/**
 * The callout a macro body describes, or `null` when the body is not the shape
 * this renderer edits.
 *
 * The one hard requirement is `question`. A callout with no question is not a
 * callout, and drawing an empty card with an answer box under it would invite
 * someone to answer nothing.
 */
export declare function readHitl(source: string): HitlCallout | null;
/**
 * Whether the callout's asker has stopped waiting.
 *
 * Deliberately NOT folded into `readHitl`: expiry is a fact about the clock,
 * and a reader that baked `Date.now()` into a parse result would hand the
 * renderer a value that silently went stale between paints. The caller passes
 * the clock in.
 */
export declare function hitlExpired(callout: HitlCallout, now?: number): boolean;
/**
 * The edit that answers a callout — ONE range, always.
 *
 * Replaces an existing answer where one is already recorded and can be
 * replaced in a single step; inserts the trio otherwise. Returns `null` when
 * there is nothing to do, when the body is not editable, or when the existing
 * answer is not contiguous (see `answerRange`).
 *
 * `by` and `at` are optional: an answer with no attribution is still an
 * answer, and inventing `answeredBy: 'someone'` would be worse than the field
 * being absent.
 */
export declare function answerHitlEdit(source: string, params: {
    answer: string;
    by?: string;
    at?: string;
}): TextRangeEdit | null;
/**
 * The edit that takes an answer back — the trio's lines and the break that
 * separated them from their neighbour, so what is left reparses identically.
 */
export declare function retractHitlEdit(source: string): TextRangeEdit | null;
/** What `hitlMacroText` will write. Every field but `question` is optional. */
export interface HitlDraft {
    id?: string;
    question: string;
    context?: string;
    askedBy?: string;
    assignee?: string;
    blocks?: string;
    expiresAt?: string;
    /** A scalar shorthand, or a choice with its consequence. */
    options?: readonly (string | {
        value: string;
        then?: string;
    })[];
}
/**
 * The macro body for a callout — the bytes the chassis serializer would write
 * between the fences, keys alphabetical from `sortKeys: true`, with no
 * trailing newline (the closing fence supplies the final break).
 *
 * An empty `options` list is OMITTED rather than written as `options: []`.
 * They mean the same thing to a reader — the answer is free prose — and
 * leaving the key out keeps the two forms from having to be reconciled by an
 * edit later.
 */
export declare function hitlMacroText(draft: HitlDraft): string;
/**
 * The edit that changes who a callout is addressed to — ONE range, always.
 *
 * Three shapes, and they are all one range on purpose (see this file's header
 * on why answering is): the scalar alone when the key is already there, a whole
 * inserted line in sorted position when it is not, and the line plus its break
 * when the new addressee is nobody.
 *
 * Readdressing matters more here than it would on any other key, because
 * `assignee` is the ONLY field the cross-document query is keyed on: a callout
 * addressed to the wrong person is invisible to the right one. See
 * `HITL_QUERYABILITY`.
 *
 * Returns `null` when there is nothing to do, or when the body is not one this
 * file will write back to.
 */
export declare function setHitlAssigneeEdit(source: string, assignee: string): TextRangeEdit | null;
/**
 * The fields a section-item row carries for one callout — the whole of what
 * `HITL_QUERYABILITY` says is visible outside the page, in one place so the
 * document half and the host half cannot disagree about it.
 *
 * `itemId` IS the callout's `id`. That identity is the join: the inbox row a
 * person answers and the block in the body are the same callout because they
 * share it, and a callout with no id gets no row at all (see below).
 *
 * `assigneeId`, not `assignee`. The row's `assignee` is a human LABEL and the
 * cross-document query is keyed on the IDENTITY; a callout carries only the
 * identity, so writing it into the label field would produce a row that renders
 * a Cognito sub at a reader AND — because a host that later set a real label
 * would overwrite it — a row that silently stopped being findable. A host that
 * knows the person's name is free to add the label beside this.
 *
 * Returns `null` for a callout no row can be keyed on: no id, or addressed to
 * nobody. Both are legal in a body and both are invisible outside it — an
 * unaddressed question is one the answer endpoint refuses on purpose, and a row
 * for it would sit in nobody's inbox forever.
 */
export interface HitlMirrorRow {
    itemId: string;
    text: string;
    assigneeId: string;
    category: typeof HITL_ITEM_CATEGORY;
}
export declare function hitlMirrorRow(callout: HitlCallout): HitlMirrorRow | null;
//# sourceMappingURL=hitlText.d.ts.map