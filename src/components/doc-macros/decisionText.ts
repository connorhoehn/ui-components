// ui-components/src/components/doc-macros/decisionText.ts
//
// `macro:decision` — a decision, recorded in the page that argued for it.
//
// ## Why this is a THIRD renderer and not a HITL with different words
//
// `macro:hitl` is a question waiting on a person: it has an addressee, an
// expiry, and a state machine that ends when somebody answers. A decision is
// the opposite shape. It records a choice that has ALREADY been made, it is
// addressed to nobody, it never expires, and its interesting state change is
// the one that happens months later — being superseded by a better decision,
// without being erased, because the reason a superseded decision was made is
// usually the most valuable line in the document.
//
// That difference is why `status` here is not a phase but a lifecycle:
//
//     proposed → accepted → superseded
//              ↘ rejected
//
// `rejected` and `superseded` are both terminal and are NOT the same thing. A
// rejected decision was never in force; a superseded one was, and the things
// built while it held still make sense against it. Collapsing them would lose
// exactly the history this block exists to keep.
//
// `MacroNode`'s own header names three intended citizens — "action item,
// decision, typed field". This is the second of the three. It is also the fix
// for a real gap: `decisions` has been a rich SECTION renderer for a long time
// and does nothing at all on a page-shaped document, so the canvas — the shape
// this product is moving to — could not record a decision.
//
// ## The format contract, inherited unchanged
//
// A macro is a textblock holding literal YAML. Reading is parse-on-demand;
// writing is ONE minimal range over the scalar that changed, dispatched as an
// ordinary ReplaceStep. There is no second serialiser, so quoting, spacing and
// a hand-written key order survive byte for byte, and an edit merges through
// the page's Y.Doc like any other typing. See `actionItemsText.ts` for the
// original statement of this and `registry.ts` for why a renderer is a node
// view on `macro` rather than a node type of its own.

import { yamlScalar, type TextRangeEdit } from './actionItemsText';

export const DECISION_MACRO_NAME = 'decision';

/** The lifecycle, in the order the UI presents it. */
export const DECISION_STATUSES = ['proposed', 'accepted', 'rejected', 'superseded'] as const;
export type DecisionStatus = (typeof DECISION_STATUSES)[number];

const STATUS_SET = new Set<string>(DECISION_STATUSES);

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
export const DECISION_QUERYABILITY =
    'The body is the record and there is no mirror: nothing polls a decision, ' +
    'so unlike a HITL callout it has no second store to keep honest.';

// ---------------------------------------------------------------------------
// Reading
// ---------------------------------------------------------------------------

interface Entry {
    key: string;
    value: string;
    /** Offset of the first character of the scalar. */
    valueFrom: number;
    /** Offset one past the last character of the scalar. */
    valueTo: number;
    lineStart: number;
    lineEnd: number;
}

interface ParsedBody {
    entries: Entry[];
    /** `- ` members of the `alternatives:` block, in source order. */
    alternatives: string[];
    end: number;
}

const KEY_RE = /^([A-Za-z][A-Za-z0-9_-]*):/;
const LIST_MARKER = '  - ';

/**
 * Unwrap a quoted scalar, or return it as-is when plain.
 *
 * Returns `null` for anything this file will not round-trip — a block scalar
 * introducer, an unterminated quote — so a body it cannot write back is
 * declined at read time rather than corrupted at write time.
 */
function unquote(raw: string): string | null {
    const v = raw.trim();
    if (v === '') return '';
    if (v === '|' || v === '>' || v.startsWith('|') || v.startsWith('>')) return null;
    if (v.startsWith("'")) {
        if (v.length < 2 || !v.endsWith("'")) return null;
        return v.slice(1, -1).replace(/''/g, "'");
    }
    if (v.startsWith('"')) {
        if (v.length < 2 || !v.endsWith('"')) return null;
        return v.slice(1, -1).replace(/\\"/g, '"');
    }
    return v;
}

function parseBody(source: string): ParsedBody | null {
    const entries: Entry[] = [];
    const alternatives: string[] = [];
    let offset = 0;
    let inAlternatives = false;

    for (const line of source.split('\n')) {
        const lineStart = offset;
        const lineEnd = offset + line.length;
        offset = lineEnd + 1;

        if (line.trim() === '') { inAlternatives = false; continue; }

        if (inAlternatives && line.startsWith(LIST_MARKER)) {
            const v = unquote(line.slice(LIST_MARKER.length));
            if (v === null) return null;
            alternatives.push(v);
            continue;
        }

        const m = KEY_RE.exec(line);
        // A line that is neither a top-level key nor a list member under
        // `alternatives:` means this body is a shape we do not understand.
        // Decline the whole thing so it renders as its fence rather than as a
        // card that has quietly dropped something.
        if (!m) return null;

        inAlternatives = m[1] === 'alternatives';
        const rest = line.slice(m[0].length);
        const value = unquote(rest);
        if (value === null) return null;
        const lead = rest.length - rest.trimStart().length;
        entries.push({
            key: m[1]!,
            value,
            valueFrom: lineStart + m[0].length + lead,
            valueTo: lineEnd,
            lineStart,
            lineEnd,
        });
    }
    if (entries.length === 0) return null;
    return { entries, alternatives, end: source.length };
}

function valueOf(body: ParsedBody, key: string): string {
    return body.entries.find((e) => e.key === key)?.value ?? '';
}

/**
 * Parse a decision body, or `null` when this is not one we can draw.
 *
 * `decision:` is required — a card with no claim on it is not a decision — and
 * an unrecognised `status:` is declined rather than coerced to `proposed`,
 * because silently downgrading someone's `status: ratified` to "Proposed"
 * misreports the state of a real choice. An absent status is the exception and
 * means `proposed`, since that is what an unmarked decision is.
 */
export function readDecision(source: string): Decision | null {
    const body = parseBody(source);
    if (!body) return null;

    const decision = valueOf(body, 'decision');
    if (!decision) return null;

    const rawStatus = valueOf(body, 'status');
    if (rawStatus !== '' && !STATUS_SET.has(rawStatus)) return null;
    const status = (rawStatus || 'proposed') as DecisionStatus;

    return {
        decision,
        status,
        rationale: valueOf(body, 'rationale'),
        alternatives: body.alternatives,
        decidedBy: valueOf(body, 'decidedBy'),
        decidedAt: valueOf(body, 'decidedAt'),
        supersededBy: valueOf(body, 'supersededBy'),
        id: valueOf(body, 'id'),
    };
}

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
export function acceptsDecision(source: string): boolean {
    return readDecision(source) !== null;
}

// ---------------------------------------------------------------------------
// Writing — one range, never the whole body
// ---------------------------------------------------------------------------

/**
 * Where a key this body does not have yet goes: alphabetically, matching the
 * `sortKeys: true` the chassis writes with, so a body we wrote stays a body we
 * would write.
 *
 * Never inside the `alternatives:` block — a key landing between that entry
 * and its `- ` members would reparse as garbage. The list is always emitted
 * last for this reason, so "before the first key that sorts after" is safe for
 * every key this file writes.
 */
function insertionFor(body: ParsedBody, key: string, scalar: string): TextRangeEdit {
    const after = body.entries.find((e) => e.key > key && e.key !== 'alternatives');
    if (after) {
        return { from: after.lineStart, to: after.lineStart, insert: `${key}: ${scalar}\n` };
    }
    const alternatives = body.entries.find((e) => e.key === 'alternatives');
    if (alternatives) {
        return { from: alternatives.lineStart, to: alternatives.lineStart, insert: `${key}: ${scalar}\n` };
    }
    return { from: body.end, to: body.end, insert: `\n${key}: ${scalar}` };
}

/** Replace one key's scalar, or insert the key if it is absent. */
function setKey(body: ParsedBody, key: string, raw: string): TextRangeEdit | null {
    const scalar = yamlScalar(raw);
    if (scalar === null) return null;
    const existing = body.entries.find((e) => e.key === key);
    if (!existing) return insertionFor(body, key, scalar);
    if (body.entries.filter((e) => e.key === key).length > 1) return null;
    if (existing.value === raw) return null;
    return { from: existing.valueFrom, to: existing.valueTo, insert: scalar };
}

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
export function setDecisionStatusEdit(
    source: string,
    status: DecisionStatus,
): TextRangeEdit | null {
    const body = parseBody(source);
    if (!body) return null;
    if (!valueOf(body, 'decision')) return null;
    if (!STATUS_SET.has(status)) return null;
    return setKey(body, 'status', status);
}

/**
 * The edit that records who decided, and when.
 *
 * Separate from the status change on purpose — see above. Both land in the
 * same ProseMirror transaction when a caller dispatches them together, but a
 * caller with only one of the two facts can write just that one.
 */
export function attributeDecisionEdit(
    source: string,
    params: { by?: string; at?: string },
): TextRangeEdit | null {
    const body = parseBody(source);
    if (!body) return null;
    if (params.by) return setKey(body, 'decidedBy', params.by);
    if (params.at) return setKey(body, 'decidedAt', params.at);
    return null;
}

/**
 * The edit that records what replaced this decision.
 *
 * Only meaningful alongside `status: superseded`, but not gated on it: the two
 * are separate edits and a caller may write either order, and refusing the
 * first because the second has not landed yet would make the pair
 * order-dependent for no benefit.
 */
export function supersedeDecisionEdit(source: string, by: string): TextRangeEdit | null {
    const body = parseBody(source);
    if (!body) return null;
    if (!valueOf(body, 'decision')) return null;
    return setKey(body, 'supersededBy', by);
}

// ---------------------------------------------------------------------------
// Authoring a fresh block
// ---------------------------------------------------------------------------

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
export function decisionMacroText(draft: DecisionDraft): string {
    const rows: string[] = [];
    const put = (key: string, value: string | undefined) => {
        if (!value) return;
        const scalar = yamlScalar(value);
        if (scalar === null) return;
        rows.push(`${key}: ${scalar}`);
    };
    // Alphabetical, matching sortKeys: true.
    put('decidedAt', draft.decidedAt);
    put('decidedBy', draft.decidedBy);
    put('decision', draft.decision);
    put('id', draft.id);
    put('rationale', draft.rationale);
    put('status', draft.status ?? 'proposed');

    const alts = (draft.alternatives ?? []).filter((a) => a.trim() !== '');
    if (alts.length > 0) {
        rows.push('alternatives:');
        for (const a of alts) {
            const scalar = yamlScalar(a);
            if (scalar !== null) rows.push(`${LIST_MARKER}${scalar}`.replace(LIST_MARKER, LIST_MARKER));
        }
    }
    return rows.join('\n');
}
