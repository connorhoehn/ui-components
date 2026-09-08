// The decision macro's read/write layer.
//
// The property that matters most is the one the format promises: an edit is
// ONE range over the scalar that changed, so quoting, spacing and a
// hand-written key order survive byte for byte. Several tests below assert on
// the whole body after applying an edit, which is the only way to catch a
// "fix" that rewrites the payload and passes a field-by-field check.

import { describe, expect, it } from 'vitest';
import {
    DECISION_MACRO_NAME,
    DECISION_STATUSES,
    acceptsDecision,
    attributeDecisionEdit,
    decisionMacroText,
    readDecision,
    setDecisionStatusEdit,
    supersedeDecisionEdit,
} from '../decisionText';

/** Apply a TextRangeEdit the way the node view's ReplaceStep does. */
function apply(source: string, edit: { from: number; to: number; insert: string } | null): string {
    if (!edit) return source;
    return source.slice(0, edit.from) + edit.insert + source.slice(edit.to);
}

const FULL = [
    "decidedAt: '2026-09-08'",
    'decidedBy: Hank Anderson',
    'decision: Use one room primitive for every conversation surface',
    'id: adr-014',
    "rationale: 'Two primitives meant two permission models, and the second one drifted'",
    'status: accepted',
    'alternatives:',
    '  - Keep rooms and DMs as separate types',
    '  - Model DMs as a room with exactly two members',
].join('\n');

describe('readDecision', () => {
    it('reads every field including the alternatives list', () => {
        const d = readDecision(FULL)!;
        expect(d.decision).toBe('Use one room primitive for every conversation surface');
        expect(d.status).toBe('accepted');
        expect(d.decidedBy).toBe('Hank Anderson');
        expect(d.decidedAt).toBe('2026-09-08');
        expect(d.rationale).toMatch(/two permission models/);
        expect(d.id).toBe('adr-014');
        expect(d.alternatives).toEqual([
            'Keep rooms and DMs as separate types',
            'Model DMs as a room with exactly two members',
        ]);
    });

    it('treats an unmarked decision as proposed', () => {
        expect(readDecision('decision: Ship it')!.status).toBe('proposed');
    });

    it('declines a body with no decision — a card with no claim is not one', () => {
        expect(readDecision('status: accepted\nrationale: because')).toBeNull();
        expect(readDecision('')).toBeNull();
    });

    it('declines an unknown status rather than coercing it', () => {
        // Silently showing someone's `status: ratified` as "Proposed" would
        // misreport the state of a real choice. The fence is the honest render.
        expect(readDecision('decision: X\nstatus: ratified')).toBeNull();
    });

    it('declines shapes it could not write back', () => {
        expect(readDecision('decision: X\nrationale: |\n  a block scalar')).toBeNull();
        expect(readDecision("decision: 'unterminated")).toBeNull();
        expect(readDecision('decision: X\nnot a key line')).toBeNull();
    });

    it('accepts what it reads, and only that', () => {
        expect(acceptsDecision(FULL)).toBe(true);
        expect(acceptsDecision('status: accepted')).toBe(false);
    });
});

describe('setDecisionStatusEdit', () => {
    it('changes ONLY the status scalar, byte for byte elsewhere', () => {
        const out = apply(FULL, setDecisionStatusEdit(FULL, 'superseded'));
        expect(out).toBe(FULL.replace('status: accepted', 'status: superseded'));
        // The quoting of neighbours is untouched — the thing a rewrite loses.
        expect(out).toContain("decidedAt: '2026-09-08'");
        expect(out).toContain("rationale: 'Two primitives meant");
    });

    it('is a no-op when the status already matches', () => {
        expect(setDecisionStatusEdit(FULL, 'accepted')).toBeNull();
    });

    it('inserts status alphabetically when the body has none', () => {
        const src = 'decision: Ship it\nrationale: it works';
        const out = apply(src, setDecisionStatusEdit(src, 'accepted'));
        // After `rationale`, before `alternatives` would be — sorted order.
        expect(out).toBe('decision: Ship it\nrationale: it works\nstatus: accepted');
        expect(readDecision(out)!.status).toBe('accepted');
    });

    it('never lands a key inside the alternatives block', () => {
        // A scalar key between `alternatives:` and its `- ` members reparses as
        // garbage, so it has to go above the list.
        const src = 'decision: Ship it\nalternatives:\n  - do nothing';
        const out = apply(src, setDecisionStatusEdit(src, 'rejected'));
        expect(out).toBe('decision: Ship it\nstatus: rejected\nalternatives:\n  - do nothing');
        expect(readDecision(out)!.alternatives).toEqual(['do nothing']);
    });

    it('refuses a body carrying two status keys rather than guessing', () => {
        expect(setDecisionStatusEdit('decision: X\nstatus: proposed\nstatus: accepted', 'rejected'))
            .toBeNull();
    });

    it('round-trips every status in the lifecycle', () => {
        let src = 'decision: Ship it';
        for (const s of DECISION_STATUSES) {
            src = apply(src, setDecisionStatusEdit(src, s));
            expect(readDecision(src)!.status).toBe(s);
        }
    });
});

describe('attributeDecisionEdit and supersedeDecisionEdit', () => {
    it('records who decided without touching the status', () => {
        const src = 'decision: Ship it\nstatus: accepted';
        const out = apply(src, attributeDecisionEdit(src, { by: 'Ada Lovelace' }));
        // `decidedBy` sorts BEFORE `decision` (b < i), so it lands at the top.
        expect(out).toBe('decidedBy: Ada Lovelace\ndecision: Ship it\nstatus: accepted');
        expect(readDecision(out)!.status).toBe('accepted');
    });

    it('quotes a name that would otherwise parse as something else', () => {
        const src = 'decision: Ship it';
        const out = apply(src, attributeDecisionEdit(src, { by: 'no' }));
        expect(out).toContain("decidedBy: 'no'");
        expect(readDecision(out)!.decidedBy).toBe('no');
    });

    it('writes what superseded a decision', () => {
        const src = 'decision: Ship it\nstatus: superseded';
        const out = apply(src, supersedeDecisionEdit(src, 'adr-021'));
        expect(readDecision(out)!.supersededBy).toBe('adr-021');
    });

    it('does not require the superseded status first — the edits are independent', () => {
        const src = 'decision: Ship it\nstatus: accepted';
        expect(supersedeDecisionEdit(src, 'adr-021')).not.toBeNull();
    });
});

describe('decisionMacroText', () => {
    it('emits sorted keys with alternatives last, and reparses', () => {
        const text = decisionMacroText({
            decision: 'Adopt the canvas as the default shape',
            status: 'proposed',
            rationale: 'Sections cannot hold a macro',
            alternatives: ['Keep sections as the default'],
            decidedBy: 'Hank Anderson',
        });
        const keys = text.split('\n').filter((l) => /^[a-z]/i.test(l)).map((l) => l.split(':')[0]);
        // The contract is "scalar keys sorted, `alternatives` last" — NOT fully
        // sorted, which would put the multi-line list first and let a scalar
        // key land among its `- ` members.
        expect(keys[keys.length - 1]).toBe('alternatives');
        const scalars = keys.slice(0, -1);
        expect(scalars).toEqual([...scalars].sort());

        const back = readDecision(text)!;
        expect(back.decision).toBe('Adopt the canvas as the default shape');
        expect(back.alternatives).toEqual(['Keep sections as the default']);
        expect(back.decidedBy).toBe('Hank Anderson');
    });

    it('defaults an undeclared status to proposed', () => {
        expect(readDecision(decisionMacroText({ decision: 'X' }))!.status).toBe('proposed');
    });

    it('drops empty alternatives rather than emitting a blank list member', () => {
        const text = decisionMacroText({ decision: 'X', alternatives: ['', '  '] });
        expect(text).not.toContain('alternatives:');
        expect(readDecision(text)).not.toBeNull();
    });

    it('names itself so a host can register it', () => {
        expect(DECISION_MACRO_NAME).toBe('decision');
    });
});
