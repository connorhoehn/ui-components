// ui-components/src/components/doc-macros/fieldText.ts
//
// `macro:field` — one named, TYPED value embedded in prose.
//
//     ```macro:field
//     label: Target date
//     type: date
//     value: '2026-11-01'
//     ```
//
// "Target date: 2026-11-01". "Budget: $40,000". "Owner: Ada". "Approved: yes".
// This is the third of the three citizens `MacroNode`'s header names — "an
// embedded tool (action item, decision, typed field)" — and the last one left.
//
// ## Why this is genuinely a fourth shape and not a one-row checklist
//
// The other three macros are all PLURAL or PROCEDURAL. An action item is a
// list. A HITL callout is a question with a state machine that ends when
// somebody answers. A decision is a record of a choice, with a lifecycle that
// runs for years. A typed field is none of those: it is one value, it has no
// lifecycle, nobody is addressed by it, and the interesting thing about it is
// not its state but its TYPE — that "2026-11-01" is a date and "$40,000" is a
// number, so a reader knows what it means and a tool could one day sum it.
//
// Modelling it as a one-item checklist would lose exactly that. `text: Target
// date 2026-11-01` is a string; nothing about it says the second half is a
// calendar date, and a renderer that showed a date picker for it would be
// guessing.
//
// It also closes the same shape of gap `decision` just closed. The SECTION
// world has had typed scalars for a long time — `src/renderers/{text,date,
// number,boolean}` over `scalarValue.ts` — and they do nothing at all on a
// page-shaped document. Until this file, a canvas document could not hold a
// typed value AT ALL.
//
// ## Which types, and why exactly these four
//
// text, date, number, boolean. Taken wholesale from the section field types
// (`src/renderers/*/definition.ts`) rather than invented here, because those
// four are the ones a real cookbook already asks for and the ones that already
// have a proven storage contract. Adding `select`, `currency` or `person` is a
// taxonomy question that should be answered by a document type that wants one,
// not by the renderer — and an unknown `type:` degrades honestly (see below),
// so adding a fifth later costs nothing today.
//
// ## Block, not inline — and what that costs
//
// This ships as a BLOCK, and that deserves saying out loud rather than being
// inherited by copy-paste from the three cards above it.
//
// A typed field genuinely reads better inline. "We are targeting [Nov 1] with
// a budget of [$40,000]" is the sentence a person wants to write, and this
// block cannot express it: `MacroNode` is `group: 'block'`, a textblock in the
// same family as `code_block`, so a macro always interrupts the paragraph.
//
// That is not an oversight in `MacroNode`, it is the format. A macro persists
// as a fenced code block in markdown, and there is no such thing as an inline
// fence — an inline macro would have no serialisation, which is the one thing
// the macro format exists to guarantee. So the cost is paid deliberately: a
// field is its own line, and a run of fields reads as a small property list at
// the head of a page, which is in practice where most of them go.
//
// What this file DOES refuse to inherit is the card. The other three renderers
// are cards because they each carry several facts that need arranging. A field
// carries one, and wrapping "Owner: Ada" in a bordered panel with a header
// strip would be furniture around a single word. `FieldBlock` draws one line.
//
// ## Validation: stored as it was written, and FLAGGED — never refused
//
// A date field holding `next tuesday` is a real case, and this file keeps it.
//
// Refusing it at read time (returning `null`, which renders the YAML fence)
// looks principled and is the wrong answer, for three reasons:
//
//   1. **The bytes arrive from everywhere.** A hand-edited markdown file, an
//      agent's draft, merge damage. Showing raw YAML to the person who typed
//      "next tuesday" tells them nothing about what went wrong, and asks them
//      to fix it by editing YAML.
//   2. **Only the WRITE side can refuse safely, and it already does.** A
//      `<input type="date">` cannot emit "next tuesday". The UI never creates
//      an invalid value; it only ever displays one that already existed. So
//      read-side refusal buys no correctness that write-side constraint has
//      not already bought.
//   3. **A flag is actionable and a fence is not.** The block shows the raw
//      text with a chip naming the mismatch and leaves BOTH repairs one click
//      away: fix the value, or change the type to the one it actually is.
//
// An unknown `type:` is a different question and gets the opposite answer: it
// is DECLINED. An invalid value under a known type is something we can draw
// honestly; `type: currency` is something we cannot draw AT ALL, and drawing
// it as a text box would silently downgrade a field another tool understands —
// and worse, editing it through that text box would rewrite the value into a
// shape the real renderer refuses. Same judgement `readDecision` makes about
// an unrecognised `status:`.
//
// ## Empty is a state, and it is stored by DELETING the key
//
// Inherited verbatim from `scalarValue.ts`, where it was learned the hard way:
// `undefined` means UNANSWERED, and unanswered is stored by removing `value:`
// from the body — never by writing `0`, `false`, the epoch, or `''`. A Sprint
// Retrospective's "Velocity" must render as "not set", not as a confident,
// wrong zero. So clearing a field is a whole-LINE deletion, which is still one
// range, and setting a value on an unanswered field is a whole-line insertion.
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
//
// The one place this file goes BEYOND `yamlScalar` is emission, and it has to:
// see `fieldScalar` below. A typed field whose boolean is stored as the string
// `'true'` is not a typed field.

import { yamlScalar, type TextRangeEdit } from './actionItemsText';

export const FIELD_MACRO_NAME = 'field';

/** The types, in the order the type picker offers them. */
export const FIELD_TYPES = ['text', 'date', 'number', 'boolean'] as const;
export type FieldType = (typeof FIELD_TYPES)[number];

const TYPE_SET = new Set<string>(FIELD_TYPES);

export interface TypedField {
    /** What the value is called. Required; without it, no field. */
    label: string;
    /** Absent `type:` means `text` — an unmarked field is a text field. */
    type: FieldType;
    /**
     * The `value:` scalar as written, or `undefined` when the key is ABSENT.
     *
     * `undefined` and `''` are different answers: the first is "nobody has
     * filled this in", the second is "somebody filled it in with nothing".
     * Only the first is unanswered, and only the first is what clearing
     * writes. See the header.
     */
    value: string | undefined;
    /**
     * False when a value is present and does not fit `type`.
     *
     * An unanswered field is `true` — not answering is not an error. See the
     * header for why an invalid value is kept and flagged rather than refused.
     */
    valid: boolean;
}

/**
 * Why a typed field, like a decision and unlike a HITL callout, needs no
 * queryable mirror.
 *
 * The temptation is real here: a typed value is the one macro payload that
 * plausibly WANTS an index — "every document with a target date in Q4". But a
 * mirror is a second copy to keep honest on every keystroke, and the moment it
 * exists a stale row misreports a real budget. If a field index is wanted it
 * should be a deliberate scan over the document bodies, which are already the
 * authoritative store, not a write-through this block does on the side.
 */
export const FIELD_QUERYABILITY =
    'The body is the record and there is no mirror. A field index, if one is ' +
    'ever wanted, is a scan over document bodies — not a write-through that ' +
    'can go stale and misreport a real number.';

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
    /** Offset of the newline ending this line, or the end of the source. */
    lineEnd: number;
}

interface ParsedBody {
    entries: Entry[];
    end: number;
}

const KEY_RE = /^([A-Za-z][A-Za-z0-9_-]*):/;

/**
 * Unwrap a quoted scalar, or return it as-is when plain.
 *
 * Returns `null` for anything this file will not round-trip — a block scalar
 * introducer, an unterminated quote — so a body it cannot write back is
 * declined at read time rather than corrupted at write time. Same rule, same
 * reasons, as `decisionText.ts`.
 */
function unquote(raw: string): string | null {
    const v = raw.trim();
    if (v === '') return '';
    if (v.startsWith('|') || v.startsWith('>')) return null;
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
    let offset = 0;

    for (const line of source.split('\n')) {
        const lineStart = offset;
        const lineEnd = offset + line.length;
        offset = lineEnd + 1;

        if (line.trim() === '') continue;

        const m = KEY_RE.exec(line);
        // A field body is a flat mapping and nothing else. A line that is not
        // a top-level key means this is a shape we do not understand, and the
        // honest render for that is the fence, not a card that has quietly
        // dropped something.
        if (!m) return null;

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
    return { entries, end: source.length };
}

function entryOf(body: ParsedBody, key: string): Entry | undefined {
    return body.entries.find((e) => e.key === key);
}

/** True when a recognised key appears twice — a shape we will not guess at. */
function hasDuplicateKey(body: ParsedBody): boolean {
    for (const key of ['label', 'type', 'value']) {
        if (body.entries.filter((e) => e.key === key).length > 1) return true;
    }
    return false;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Whether a scalar fits a type.
 *
 * `text` accepts anything, because anything written down is text.
 *
 * `date` is checked against the CALENDAR, not just the shape: `2026-13-04` has
 * the right eight digits and is not a date. That specific string is the one
 * `scalarValue.ts` names as the hazard — it is what two concurrent
 * character-merged dates interleave into — so it must not read as valid here
 * either.
 *
 * `boolean` is deliberately strict about `true`/`false` and nothing else. YAML
 * 1.2's core schema (what js-yaml resolves with by default) reads `yes` as the
 * string "yes", so accepting it would make this renderer disagree with the
 * chassis about what the document says.
 */
export function fitsFieldType(type: FieldType, value: string): boolean {
    switch (type) {
        case 'text':
            return true;
        case 'boolean':
            return value === 'true' || value === 'false';
        case 'number': {
            if (value.trim() === '') return false;
            return Number.isFinite(Number(value));
        }
        case 'date': {
            if (!ISO_DATE.test(value)) return false;
            const d = new Date(`${value}T00:00:00Z`);
            if (Number.isNaN(d.getTime())) return false;
            // Round-trip guard: `2026-02-31` parses, then normalises to March.
            return d.toISOString().slice(0, 10) === value;
        }
    }
}

/**
 * Parse a field body, or `null` when this is not one we can draw.
 *
 * `label:` is required — an unnamed value is not a field, it is a number lying
 * on the floor. An unrecognised `type:` is declined for the reason the header
 * gives; an absent one means `text`, since that is what an unmarked value is.
 * An invalid VALUE is never a reason to decline: it comes back flagged.
 */
export function readTypedField(source: string): TypedField | null {
    const body = parseBody(source);
    if (!body) return null;
    if (hasDuplicateKey(body)) return null;

    const label = entryOf(body, 'label')?.value ?? '';
    if (!label) return null;

    const rawType = entryOf(body, 'type')?.value ?? '';
    if (rawType !== '' && !TYPE_SET.has(rawType)) return null;
    const type = (rawType || 'text') as FieldType;

    // `undefined` when the KEY is absent — not when the scalar is empty. The
    // two are different answers and the whole "empty is a state" contract
    // rests on keeping them apart.
    const value = entryOf(body, 'value')?.value;

    return {
        label,
        type,
        value,
        valid: value === undefined || fitsFieldType(type, value),
    };
}

/**
 * True when a node's text is a field body we would draw.
 *
 * Needed for the way BACK, and this is the subtle one: a rendered block has no
 * `contentDOM`, but a plain fence DOES, so ProseMirror updates the fence in
 * place and never asks for a new view. Without an explicit accept test, a
 * person repairing broken YAML by hand would keep looking at a fence forever.
 * `ActionItemsMacro` learned this the hard way; the note is repeated because
 * every renderer needs it.
 */
export function acceptsField(source: string): boolean {
    return readTypedField(source) !== null;
}

// ---------------------------------------------------------------------------
// Typed accessors — the section contract, ported off `Section`
// ---------------------------------------------------------------------------
//
// These mirror `readNumberValue` / `readBooleanValue` / `readDateValue` in
// `src/renderers/scalarValue.ts`, which owns the same contract for sections.
// Ported rather than imported: `doc-macros` must not take a dependency on the
// section-renderer graph (the same rule `plainMacroView.ts` follows when it
// copies `MacroNode.renderHTML` rather than importing it), and that file is
// owned elsewhere. Where the two disagree, `scalarValue.ts` is the original.

/** Numeric answer, or `undefined` when unanswered or not a number. */
export function fieldNumber(field: TypedField): number | undefined {
    if (field.value === undefined || field.type !== 'number') return undefined;
    if (field.value.trim() === '') return undefined;
    const n = Number(field.value);
    return Number.isFinite(n) ? n : undefined;
}

/**
 * Yes/no answer, or `undefined` when nobody answered.
 *
 * Strict on purpose, exactly as `readBooleanValue` is: a missing or unreadable
 * value must never render as "No". "Approved: no" and "nobody has said" are
 * different sentences and only one of them is safe to act on.
 */
export function fieldBoolean(field: TypedField): boolean | undefined {
    if (field.value === undefined || field.type !== 'boolean') return undefined;
    if (field.value === 'true') return true;
    if (field.value === 'false') return false;
    return undefined;
}

/** Calendar date as `YYYY-MM-DD` (what `<input type="date">` speaks), or `''`. */
export function fieldDate(field: TypedField): string {
    if (field.value === undefined || field.type !== 'date') return '';
    return fitsFieldType('date', field.value) ? field.value : '';
}

/**
 * `YYYY-MM-DD` → `Nov 1, 2026` in the reader's locale.
 *
 * Forced to UTC, and this is not a nicety: `new Date('2026-03-04')` is UTC
 * midnight, and formatting that in any timezone west of Greenwich renders
 * "Mar 3" — an invoice due date off by one day for every user in the Americas.
 * The same note stands over `formatDateValue` in `scalarValue.ts`; it is
 * repeated because it is the kind of thing a "simplification" removes.
 */
export function formatFieldDate(iso: string): string {
    const d = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
    });
}

/**
 * Thousands separators, full precision.
 *
 * `toLocaleString()` alone rounds to three decimals, which would quietly round
 * an invoice total. Same guard, same reason, as `formatNumberValue`.
 */
export function formatFieldNumber(n: number): string {
    return n.toLocaleString(undefined, { maximumFractionDigits: 20 });
}

/** What the reader sees when the block is not editable. `''` when unanswered. */
export function formatFieldValue(field: TypedField): string {
    if (field.value === undefined) return '';
    if (!field.valid) return field.value;
    switch (field.type) {
        case 'date':
            return formatFieldDate(field.value);
        case 'number': {
            const n = fieldNumber(field);
            return n === undefined ? field.value : formatFieldNumber(n);
        }
        case 'boolean':
            return field.value === 'true' ? 'Yes' : 'No';
        case 'text':
            return field.value;
    }
}

// ---------------------------------------------------------------------------
// Writing — one range, never the whole body
// ---------------------------------------------------------------------------

/**
 * The YAML scalar for a value of a given type.
 *
 * `yamlScalar` alone is not enough here and that is the whole reason this
 * function exists. It quotes anything that would otherwise resolve to a
 * boolean — deliberately, because for an action item's `text:` a bare `true`
 * would be a type error. For a field of `type: boolean` the bare `true` is
 * exactly right and the quoted `'true'` is the error: `macroDataFromText` in
 * realtime-modules parses this body with js-yaml, so `value: 'true'` reaches
 * every consumer as the STRING "true". A typed field whose boolean is a string
 * is not a typed field.
 *
 * Numbers are emitted bare for the same reason. Dates are left to `yamlScalar`,
 * which quotes them — matching js-yaml, which quotes any scalar that would
 * otherwise resolve to a Date, and matching the `due:` key in
 * `actionItemsText.ts`.
 *
 * A value that does NOT fit its type falls through to `yamlScalar`, so "next
 * tuesday" under a date field is stored as the quoted text it is. It comes
 * back flagged, which is the design — see the header.
 */
export function fieldScalar(type: FieldType, value: string): string | null {
    if (!fitsFieldType(type, value)) return yamlScalar(value);
    if (type === 'boolean') return value;
    if (type === 'number') return value.trim();
    return yamlScalar(value);
}

/**
 * Where a key this body does not have yet goes: alphabetically, matching the
 * `sortKeys: true` the chassis writes with, so a body we wrote stays a body we
 * would write. `label` < `type` < `value`, so a fresh value lands last.
 */
function insertionFor(body: ParsedBody, key: string, scalar: string): TextRangeEdit {
    const after = body.entries.find((e) => e.key > key);
    if (after) {
        return { from: after.lineStart, to: after.lineStart, insert: `${key}: ${scalar}\n` };
    }
    return { from: body.end, to: body.end, insert: `\n${key}: ${scalar}` };
}

/** Replace one key's scalar, or insert the key if it is absent. */
function setKey(body: ParsedBody, key: string, raw: string, scalar: string | null): TextRangeEdit | null {
    if (scalar === null) return null;
    const existing = entryOf(body, key);
    if (!existing) return insertionFor(body, key, scalar);
    if (existing.value === raw) return null;
    return { from: existing.valueFrom, to: existing.valueTo, insert: scalar };
}

/**
 * The edit that removes a key's whole LINE, newline included.
 *
 * This is what "unanswered" is on the wire, and it has to take the line break
 * with it or the body is left with a blank line that reparses differently. The
 * newline taken is the one AFTER the line when there is one, and the one
 * BEFORE it when the line is last — otherwise deleting the final key would
 * leave a trailing newline that the next insertion would land after.
 */
function deleteLine(body: ParsedBody, entry: Entry): TextRangeEdit {
    if (entry.lineEnd < body.end) {
        return { from: entry.lineStart, to: entry.lineEnd + 1, insert: '' };
    }
    return { from: Math.max(0, entry.lineStart - 1), to: entry.lineEnd, insert: '' };
}

/**
 * The edit that stores a field's value, or clears it.
 *
 * `undefined` CLEARS — the `value:` line goes away entirely, which is the only
 * representation of "unanswered" this format has. Passing `''` is not the same
 * thing and is not treated as one: it writes an empty scalar, which is a
 * person having answered with nothing.
 *
 * Returns `null` when there is nothing to do: the body is not a field, the
 * value is already that, or clearing a field that has no value.
 */
export function setFieldValueEdit(source: string, value: string | undefined): TextRangeEdit | null {
    const body = parseBody(source);
    if (!body || hasDuplicateKey(body)) return null;
    if (!entryOf(body, 'label')?.value) return null;

    const existing = entryOf(body, 'value');
    if (value === undefined) {
        return existing ? deleteLine(body, existing) : null;
    }

    const rawType = entryOf(body, 'type')?.value ?? '';
    if (rawType !== '' && !TYPE_SET.has(rawType)) return null;
    const type = (rawType || 'text') as FieldType;
    return setKey(body, 'value', value, fieldScalar(type, value));
}

/** The edit that renames a field. One range over the `label:` scalar. */
export function setFieldLabelEdit(source: string, label: string): TextRangeEdit | null {
    const body = parseBody(source);
    if (!body || hasDuplicateKey(body)) return null;
    if (!entryOf(body, 'label')?.value) return null;
    if (label.trim() === '') return null; // a field with no name is not a field
    return setKey(body, 'label', label, yamlScalar(label));
}

/**
 * The edit that changes a field's type. One range over the `type:` scalar.
 *
 * Deliberately does NOT touch the value. Retyping "Ada" from text to number
 * could plausibly clear it — but silently deleting somebody's answer because
 * they mis-clicked a dropdown is worse than showing them "Ada" with a chip
 * saying it is not a number, next to the dropdown that undoes it. Fusing the
 * two would also make this two ranges pretending to be one.
 */
export function setFieldTypeEdit(source: string, type: FieldType): TextRangeEdit | null {
    const body = parseBody(source);
    if (!body || hasDuplicateKey(body)) return null;
    if (!entryOf(body, 'label')?.value) return null;
    if (!TYPE_SET.has(type)) return null;
    return setKey(body, 'type', type, type);
}

// ---------------------------------------------------------------------------
// Authoring a fresh block
// ---------------------------------------------------------------------------

export interface FieldDraft {
    label: string;
    type?: FieldType;
    /** Omitted means unanswered, which is the normal state of a new field. */
    value?: string;
}

/**
 * The YAML body for a new field, keys sorted.
 *
 * Sorted because that is what the chassis emits and what `insertionFor`
 * assumes; a body we wrote stays a body we would write.
 *
 * `type:` is always written even when it is `text`, unlike `status:` on a
 * decision. A decision's default is a lifecycle position that a reader can
 * infer; a field's type is the whole point of the block, and a body that does
 * not say what it holds invites the next tool to guess.
 */
export function fieldMacroText(draft: FieldDraft): string {
    const type = draft.type ?? 'text';
    // `yamlScalar` declines a multi-line value — a block scalar is not one
    // range, so this file could never edit it back. A label is one line by
    // construction; the fallback keeps the first line rather than emitting the
    // literal string "null" into a document.
    const label = yamlScalar(draft.label) ?? yamlScalar(draft.label.split('\n')[0] ?? '') ?? "''";
    const rows = [`label: ${label}`, `type: ${type}`];
    if (draft.value !== undefined) {
        const scalar = fieldScalar(type, draft.value);
        if (scalar !== null) rows.push(`value: ${scalar}`);
    }
    return rows.join('\n');
}
