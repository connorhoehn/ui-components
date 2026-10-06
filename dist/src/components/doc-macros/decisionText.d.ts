import { type TextRangeEdit } from './actionItemsText';
export declare const DECISION_MACRO_NAME = "decision";
/** The lifecycle, in the order the UI presents it. */
export declare const DECISION_STATUSES: readonly ['proposed', 'accepted', 'rejected', 'superseded'];
export type DecisionStatus = (typeof DECISION_STATUSES)[number];
export interface Decision {
    /** The decision itself, stated as a claim. Required; without it, no card. */
    decision: string;
    status: DecisionStatus;
    /** Why. Optional, and the field most worth writing. */
    rationale: string;
    /** What else was weighed. One per line in the source. */
    alternatives: string[];
    decidedBy: string;
    decidedAt: string;
    /**
     * What replaced this one. Only meaningful with `status: superseded`, and
     * free text on purpose — it may name a decision in another document, or
     * one that does not exist yet.
     */
    supersededBy: string;
    /** Stable id, when the body carries one. */
    id: string;
}
/**
 * Why a decision, unlike a HITL callout, needs no queryable mirror.
 *
 * A callout blocks an agent, so something outside the document has to be able
 * to see it was answered — hence `HITL_QUERYABILITY` and the section-item row.
 * Nothing polls a decision. It is read by people, in the document that argued
 * for it, which is the only place its rationale exists. Mirroring it would
 * create a second copy to keep honest for no reader.
 *
 * If a decision index is ever wanted, that is a scan built deliberately, not a
 * write-through this block should be doing on the side.
 */
export declare const DECISION_QUERYABILITY: string;
/**
 * Parse a decision body, or `null` when this is not one we can draw.
 *
 * `decision:` is required — a card with no claim on it is not a decision — and
 * an unrecognised `status:` is declined rather than coerced to `proposed`,
 * because silently downgrading someone's `status: ratified` to "Proposed"
 * misreports the state of a real choice. An absent status is the exception and
 * means `proposed`, since that is what an unmarked decision is.
 */
export declare function readDecision(source: string): Decision | null;
/**
 * True when a node's text is a decision body we would draw.
 *
 * Needed for the way BACK, and this is the subtle one: a rendered card has no
 * `contentDOM`, but a plain fence does, so ProseMirror updates the fence in
 * place and never asks for a new view. Without an explicit accept test, a
 * person repairing broken YAML by hand would keep looking at a fence forever.
 * `ActionItemsMacro` learned this the hard way; the note is repeated because
 * the next renderer will need it too.
 */
export declare function acceptsDecision(source: string): boolean;
/**
 * The edit that moves a decision to a new status.
 *
 * One range over the `status:` scalar — 8 characters becoming 8, or `proposed`
 * becoming `accepted` — not a payload rewrite. Returns `null` when the body is
 * not a decision, when the status is already that, or when the body carries
 * two `status:` keys (a shape we will not guess at).
 *
 * Attribution is deliberately NOT written here. Recording who moved a decision
 * to `accepted` is a second, independent edit (`attributeDecisionEdit`), so a
 * host that has no identity to offer still gets the status change instead of
 * being blocked on inventing a name.
 */
export declare function setDecisionStatusEdit(source: string, status: DecisionStatus): TextRangeEdit | null;
/**
 * The edit that records who decided, and when.
 *
 * Separate from the status change on purpose — see above. Both land in the
 * same ProseMirror transaction when a caller dispatches them together, but a
 * caller with only one of the two facts can write just that one.
 */
export declare function attributeDecisionEdit(source: string, params: {
    by?: string;
    at?: string;
}): TextRangeEdit | null;
/**
 * The edit that records what replaced this decision.
 *
 * Only meaningful alongside `status: superseded`, but not gated on it: the two
 * are separate edits and a caller may write either order, and refusing the
 * first because the second has not landed yet would make the pair
 * order-dependent for no benefit.
 */
export declare function supersedeDecisionEdit(source: string, by: string): TextRangeEdit | null;
export interface DecisionDraft {
    decision: string;
    status?: DecisionStatus;
    rationale?: string;
    alternatives?: readonly string[];
    decidedBy?: string;
    decidedAt?: string;
    id?: string;
}
/**
 * The YAML body for a new decision block, keys sorted, `alternatives:` last.
 *
 * Sorted because that is what the chassis emits and what `insertionFor`
 * assumes; `alternatives` last because it is the only multi-line value and a
 * scalar key landing after it would reparse as one of its members.
 */
export declare function decisionMacroText(draft: DecisionDraft): string;
//# sourceMappingURL=decisionText.d.ts.map