// The typed-field macro's read/write layer.
//
// Three properties carry the design and each has tests that would fail loudly
// if a "simplification" removed them:
//
//   1. An edit is ONE range over the scalar that changed, so quoting, spacing
//      and a hand-written key order survive byte for byte. Several tests assert
//      on the WHOLE body afterwards, which is the only way to catch a fix that
//      re-dumps the payload and passes a field-by-field check.
//   2. Unanswered is the ABSENCE of `value:`, never `0`, `false` or `''`.
//      Clearing deletes the line; setting a value on a cleared field puts the
//      line back where `sortKeys` would.
//   3. An invalid value is KEPT and flagged. Only a body whose shape we could
//      not write back is declined.

import { describe, expect, it } from 'vitest';
import {
    FIELD_TYPES,
    acceptsField,
    fieldBoolean,
    fieldDate,
    fieldMacroText,
    fieldNumber,
    fieldScalar,
    fitsFieldType,
    formatFieldValue,
    readTypedField,
    setFieldLabelEdit,
    setFieldTypeEdit,
    setFieldValueEdit,
} from '../fieldText';

/** Apply a TextRangeEdit the way the node view's ReplaceStep does. */
function apply(source: string, edit: { from: number; to: number; insert: string } | null): string {
    if (!edit) return source;
    return source.slice(0, edit.from) + edit.insert + source.slice(edit.to);
}

const DATE = ['label: Target date', 'type: date', "value: '2026-11-01'"].join('\n');
const MONEY = ['label: Budget', 'type: number', 'value: 40000'].join('\n');
const FLAG = ['label: Approved', 'type: boolean', 'value: true'].join('\n');
const EMPTY = ['label: Owner', 'type: text'].join('\n');

describe('readTypedField', () => {
    it('reads a label, a type and a value', () => {
        const f = readTypedField(DATE)!;
        expect(f.label).toBe('Target date');
        expect(f.type).toBe('date');
        expect(f.value).toBe('2026-11-01');
        expect(f.valid).toBe(true);
    });

    it('treats an unmarked field as text', () => {
        expect(readTypedField('label: Owner\nvalue: Ada')!.type).toBe('text');
    });

    it('declines a body with no label — an unnamed value is not a field', () => {
        expect(readTypedField('type: number\nvalue: 3')).toBeNull();
        expect(readTypedField('')).toBeNull();
    });

    it('declines an unknown TYPE rather than downgrading it to text', () => {
        // Drawing `type: currency` as a text box would silently downgrade a
        // field another tool understands, and editing it through that box
        // would rewrite the value into a shape the real renderer refuses.
        expect(readTypedField('label: Cost\ntype: currency\nvalue: 4')).toBeNull();
    });

    it('declines shapes it could not write back', () => {
        expect(readTypedField('label: X\nvalue: |\n  a block scalar')).toBeNull();
        expect(readTypedField("label: 'unterminated")).toBeNull();
        expect(readTypedField('label: X\nnot a key line')).toBeNull();
        // Two answers is not an answer.
        expect(readTypedField('label: X\nvalue: 1\nvalue: 2')).toBeNull();
    });

    it('accepts what it reads, and only that', () => {
        expect(acceptsField(DATE)).toBe(true);
        expect(acceptsField('type: date')).toBe(false);
    });
});

describe('an invalid value is kept and flagged, never refused', () => {
    it('still reads, and reports itself as not fitting the type', () => {
        const f = readTypedField('label: Target date\ntype: date\nvalue: next tuesday')!;
        expect(f.value).toBe('next tuesday');
        expect(f.valid).toBe(false);
        // The block still draws — showing raw YAML to the person who typed
        // "next tuesday" tells them nothing and asks them to fix it in YAML.
        expect(acceptsField('label: Target date\ntype: date\nvalue: next tuesday')).toBe(true);
    });

    it('an unanswered field is valid — not answering is not an error', () => {
        expect(readTypedField(EMPTY)!.valid).toBe(true);
        expect(readTypedField(EMPTY)!.value).toBeUndefined();
    });

    it('shows the raw text rather than a formatted guess', () => {
        const f = readTypedField('label: D\ntype: date\nvalue: next tuesday')!;
        expect(formatFieldValue(f)).toBe('next tuesday');
    });
});

describe('fitsFieldType', () => {
    it('checks a date against the CALENDAR, not just the shape', () => {
        expect(fitsFieldType('date', '2026-11-01')).toBe(true);
        // The exact string scalarValue.ts names as the hazard: what two
        // character-merged dates interleave into. Eight right-looking digits,
        // not a date.
        expect(fitsFieldType('date', '2026-13-04')).toBe(false);
        // Parses, then normalises to March — so a shape check alone lets it in.
        expect(fitsFieldType('date', '2026-02-31')).toBe(false);
        expect(fitsFieldType('date', '2026-11-1')).toBe(false);
    });

    it('is strict about booleans, because js-yaml 1.2 is', () => {
        expect(fitsFieldType('boolean', 'true')).toBe(true);
        expect(fitsFieldType('boolean', 'false')).toBe(true);
        // YAML 1.2's core schema reads `yes` as the string "yes"; accepting it
        // would make this renderer disagree with the chassis about the body.
        expect(fitsFieldType('boolean', 'yes')).toBe(false);
        expect(fitsFieldType('boolean', 'True')).toBe(false);
    });

    it('rejects an empty numeric answer rather than reading it as zero', () => {
        expect(fitsFieldType('number', '')).toBe(false);
        expect(fitsFieldType('number', '  ')).toBe(false);
        expect(fitsFieldType('number', '40000')).toBe(true);
        expect(fitsFieldType('number', '-1.5e3')).toBe(true);
        expect(fitsFieldType('number', 'a lot')).toBe(false);
    });

    it('accepts anything as text, because anything written down is text', () => {
        for (const v of ['', 'Ada', 'next tuesday', '42']) {
            expect(fitsFieldType('text', v)).toBe(true);
        }
    });
});

describe('typed accessors', () => {
    it('reads a number, a boolean and a date', () => {
        expect(fieldNumber(readTypedField(MONEY)!)).toBe(40000);
        expect(fieldBoolean(readTypedField(FLAG)!)).toBe(true);
        expect(fieldDate(readTypedField(DATE)!)).toBe('2026-11-01');
    });

    it('never lets a missing boolean read as "No"', () => {
        // "Approved: no" and "nobody has said" are different sentences and
        // only one of them is safe to act on.
        expect(fieldBoolean(readTypedField('label: Approved\ntype: boolean')!)).toBeUndefined();
        expect(fieldBoolean(readTypedField('label: A\ntype: boolean\nvalue: maybe')!))
            .toBeUndefined();
    });

    it('never lets an unanswered number read as zero', () => {
        expect(fieldNumber(readTypedField('label: Velocity\ntype: number')!)).toBeUndefined();
    });

    it('formats a date in UTC, so it is not off by one west of Greenwich', () => {
        expect(formatFieldValue(readTypedField(DATE)!)).toContain('2026');
        expect(formatFieldValue(readTypedField(DATE)!)).toMatch(/Nov(ember)? 1\b/);
    });

    it('formats a number with separators and no silent rounding', () => {
        expect(formatFieldValue(readTypedField(MONEY)!)).toBe((40000).toLocaleString());
        const precise = readTypedField('label: Pi\ntype: number\nvalue: 3.14159265358979')!;
        expect(formatFieldValue(precise)).toContain('3.14159265358979');
    });

    it('says Yes and No rather than true and false', () => {
        expect(formatFieldValue(readTypedField(FLAG)!)).toBe('Yes');
        expect(formatFieldValue(readTypedField('label: A\ntype: boolean\nvalue: false')!)).toBe('No');
    });
});

describe('setFieldValueEdit', () => {
    it('replaces the scalar alone and leaves every other byte', () => {
        const next = apply(DATE, setFieldValueEdit(DATE, '2026-12-25'));
        expect(next).toBe(['label: Target date', 'type: date', "value: '2026-12-25'"].join('\n'));
    });

    it('writes a boolean BARE, not as the string "true"', () => {
        // `macroDataFromText` parses this body with js-yaml, so `value: 'true'`
        // would reach every consumer as a string. A typed field whose boolean
        // is a string is not a typed field.
        const src = 'label: Approved\ntype: boolean';
        expect(apply(src, setFieldValueEdit(src, 'true'))).toBe(
            'label: Approved\ntype: boolean\nvalue: true',
        );
        expect(fieldScalar('boolean', 'true')).toBe('true');
        expect(fieldScalar('number', '40000')).toBe('40000');
    });

    it('quotes a date, matching what js-yaml would emit', () => {
        const src = 'label: Due\ntype: date';
        expect(apply(src, setFieldValueEdit(src, '2026-11-01'))).toBe(
            "label: Due\ntype: date\nvalue: '2026-11-01'",
        );
    });

    it('stores a value that does not fit as the quoted text it is', () => {
        const src = 'label: Due\ntype: date';
        const next = apply(src, setFieldValueEdit(src, 'next tuesday'));
        // Plain, because `yamlScalar` only quotes what YAML would otherwise
        // resolve to something else — the point is that the words survive, not
        // that they are wrapped.
        expect(next).toBe('label: Due\ntype: date\nvalue: next tuesday');
        expect(readTypedField(next)!.valid).toBe(false);
        expect(readTypedField(next)!.value).toBe('next tuesday');
    });

    it('inserts a missing value line where sortKeys would put it', () => {
        expect(apply(EMPTY, setFieldValueEdit(EMPTY, 'Ada'))).toBe(
            'label: Owner\ntype: text\nvalue: Ada',
        );
        // ...which is alphabetical even when the body is not sorted already.
        const odd = 'value: 1\nlabel: N\ntype: number';
        expect(apply(odd, setFieldValueEdit(odd, '2'))).toBe('value: 2\nlabel: N\ntype: number');
    });

    it('CLEARS by deleting the line, never by writing an empty or zero value', () => {
        // The whole "empty is a state" contract. A Sprint Retrospective's
        // Velocity must render as "not set", not as a confident, wrong zero.
        expect(apply(MONEY, setFieldValueEdit(MONEY, undefined))).toBe(
            'label: Budget\ntype: number',
        );
        expect(readTypedField(apply(MONEY, setFieldValueEdit(MONEY, undefined)))!.value)
            .toBeUndefined();
    });

    it('takes the right newline when the value line is not last', () => {
        const src = "value: '2026-11-01'\nlabel: Due\ntype: date";
        expect(apply(src, setFieldValueEdit(src, undefined))).toBe('label: Due\ntype: date');
    });

    it('does nothing when there is nothing to do', () => {
        expect(setFieldValueEdit(EMPTY, undefined)).toBeNull();
        expect(setFieldValueEdit(DATE, '2026-11-01')).toBeNull();
        expect(setFieldValueEdit('type: date', 'x')).toBeNull();
    });

    it('leaves a hand-written body byte-identical apart from the one scalar', () => {
        const hand = ["label:   'Target date'", 'type: date', "value:  '2026-11-01'"].join('\n');
        const next = apply(hand, setFieldValueEdit(hand, '2026-12-25'));
        expect(next).toBe(["label:   'Target date'", 'type: date', "value:  '2026-12-25'"].join('\n'));
    });
});

describe('setFieldLabelEdit', () => {
    it('renames in one range', () => {
        expect(apply(DATE, setFieldLabelEdit(DATE, 'Ship date'))).toBe(
            ['label: Ship date', 'type: date', "value: '2026-11-01'"].join('\n'),
        );
    });

    it('refuses to unname a field', () => {
        expect(setFieldLabelEdit(DATE, '   ')).toBeNull();
    });
});

describe('setFieldTypeEdit', () => {
    it('changes the type in one range and does NOT touch the value', () => {
        // Silently deleting somebody's answer because they mis-clicked a
        // dropdown is worse than showing them "Ada" with a chip saying it is
        // not a number, next to the dropdown that undoes it.
        const src = 'label: Owner\ntype: text\nvalue: Ada';
        const next = apply(src, setFieldTypeEdit(src, 'number'));
        expect(next).toBe('label: Owner\ntype: number\nvalue: Ada');
        const f = readTypedField(next)!;
        expect(f.value).toBe('Ada');
        expect(f.valid).toBe(false);
    });

    it('inserts the key when a body never declared one', () => {
        const src = 'label: Owner\nvalue: Ada';
        expect(apply(src, setFieldTypeEdit(src, 'text'))).toBe(
            'label: Owner\ntype: text\nvalue: Ada',
        );
    });
});

describe('fieldMacroText', () => {
    it('emits sorted keys and always declares the type', () => {
        // A decision may leave `status:` implicit; a field may not leave `type:`
        // implicit, because the type is the whole point of the block.
        expect(fieldMacroText({ label: 'Owner' })).toBe('label: Owner\ntype: text');
        expect(fieldMacroText({ label: 'Target date', type: 'date', value: '2026-11-01' })).toBe(
            ['label: Target date', 'type: date', "value: '2026-11-01'"].join('\n'),
        );
    });

    it('writes no value line at all for a new, unanswered field', () => {
        expect(fieldMacroText({ label: 'Velocity', type: 'number' })).not.toContain('value');
    });

    it('round-trips through the reader for every type', () => {
        for (const type of FIELD_TYPES) {
            const body = fieldMacroText({ label: 'X', type });
            expect(readTypedField(body)).toMatchObject({ label: 'X', type, valid: true });
        }
    });
});
