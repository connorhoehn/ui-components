import { type TextRangeEdit } from './actionItemsText';
export declare const FIELD_MACRO_NAME = "field";
/** The types, in the order the type picker offers them. */
export declare const FIELD_TYPES: readonly ['text', 'date', 'number', 'boolean'];
export type FieldType = (typeof FIELD_TYPES)[number];
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
export declare const FIELD_QUERYABILITY: string;
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
export declare function fitsFieldType(type: FieldType, value: string): boolean;
/**
 * Parse a field body, or `null` when this is not one we can draw.
 *
 * `label:` is required — an unnamed value is not a field, it is a number lying
 * on the floor. An unrecognised `type:` is declined for the reason the header
 * gives; an absent one means `text`, since that is what an unmarked value is.
 * An invalid VALUE is never a reason to decline: it comes back flagged.
 */
export declare function readTypedField(source: string): TypedField | null;
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
export declare function acceptsField(source: string): boolean;
/** Numeric answer, or `undefined` when unanswered or not a number. */
export declare function fieldNumber(field: TypedField): number | undefined;
/**
 * Yes/no answer, or `undefined` when nobody answered.
 *
 * Strict on purpose, exactly as `readBooleanValue` is: a missing or unreadable
 * value must never render as "No". "Approved: no" and "nobody has said" are
 * different sentences and only one of them is safe to act on.
 */
export declare function fieldBoolean(field: TypedField): boolean | undefined;
/** Calendar date as `YYYY-MM-DD` (what `<input type="date">` speaks), or `''`. */
export declare function fieldDate(field: TypedField): string;
/**
 * `YYYY-MM-DD` → `Nov 1, 2026` in the reader's locale.
 *
 * Forced to UTC, and this is not a nicety: `new Date('2026-03-04')` is UTC
 * midnight, and formatting that in any timezone west of Greenwich renders
 * "Mar 3" — an invoice due date off by one day for every user in the Americas.
 * The same note stands over `formatDateValue` in `scalarValue.ts`; it is
 * repeated because it is the kind of thing a "simplification" removes.
 */
export declare function formatFieldDate(iso: string): string;
/**
 * Thousands separators, full precision.
 *
 * `toLocaleString()` alone rounds to three decimals, which would quietly round
 * an invoice total. Same guard, same reason, as `formatNumberValue`.
 */
export declare function formatFieldNumber(n: number): string;
/** What the reader sees when the block is not editable. `''` when unanswered. */
export declare function formatFieldValue(field: TypedField): string;
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
export declare function fieldScalar(type: FieldType, value: string): string | null;
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
export declare function setFieldValueEdit(source: string, value: string | undefined): TextRangeEdit | null;
/** The edit that renames a field. One range over the `label:` scalar. */
export declare function setFieldLabelEdit(source: string, label: string): TextRangeEdit | null;
/**
 * The edit that changes a field's type. One range over the `type:` scalar.
 *
 * Deliberately does NOT touch the value. Retyping "Ada" from text to number
 * could plausibly clear it — but silently deleting somebody's answer because
 * they mis-clicked a dropdown is worse than showing them "Ada" with a chip
 * saying it is not a number, next to the dropdown that undoes it. Fusing the
 * two would also make this two ranges pretending to be one.
 */
export declare function setFieldTypeEdit(source: string, type: FieldType): TextRangeEdit | null;
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
export declare function fieldMacroText(draft: FieldDraft): string;
//# sourceMappingURL=fieldText.d.ts.map