// The `macro:hitl` payload, from the text end.
//
// No editor here on purpose: every mutation in `hitlText.ts` is a pure
// function from (source, intent) to ONE text range, so the properties that
// matter — that an answer is a single contiguous insertion, that a body it
// does not understand is declined rather than guessed at, that retracting
// returns the bytes it started from — are all assertable on strings.

import { describe, it, expect } from 'vitest';
import {
    answerHitlEdit,
    hitlExpired,
    hitlMacroText,
    hitlMirrorRow,
    readHitl,
    retractHitlEdit,
    setHitlAssigneeEdit,
} from '../hitlText';
import type { TextRangeEdit } from '../actionItemsText';

/**
 * Ground truth: keys alphabetical (`sortKeys: true`), the ISO instant
 * single-quoted because js-yaml quotes any scalar that would otherwise resolve
 * to a Date, and `options` as a block sequence carrying both of its accepted
 * member forms.
 *
 * Pinned for the reason `actionItemsText.test.ts` pins its own body: if what
 * this file writes ever stops being what the chassis would write, something
 * goes red instead of every open editor quietly disagreeing with its own
 * exported file.
 */
const BODY = [
    'askedBy: release-agent',
    'assignee: dev-bob',
    'blocks: the 2.190.0 release',
    'context: Two changelog entries are still unreviewed.',
    "expiresAt: '2026-09-08T00:00:00.000Z'",
    'id: hitl-01J8Z',
    'options:',
    '  - then: the release train continues',
    '    value: ship it',
    '  - hold',
    'question: Ship 2.190.0 now, or hold for the changelog?',
].join('\n');

const apply = (source: string, edit: TextRangeEdit | null): string =>
    edit ? source.slice(0, edit.from) + edit.insert + source.slice(edit.to) : source;

describe('reading a callout', () => {
    it('reads the body the chassis would write', () => {
        expect(readHitl(BODY)).toEqual({
            id: 'hitl-01J8Z',
            question: 'Ship 2.190.0 now, or hold for the changelog?',
            context: 'Two changelog entries are still unreviewed.',
            askedBy: 'release-agent',
            assignee: 'dev-bob',
            blocks: 'the 2.190.0 release',
            expiresAt: '2026-09-08T00:00:00.000Z',
            options: [
                { value: 'ship it', then: 'the release train continues' },
                { value: 'hold', then: '' },
            ],
            answer: null,
            answeredBy: '',
            answeredAt: '',
        });
    });

    it('reads a bare question — everything but the question is optional', () => {
        const callout = readHitl('question: Proceed?');
        expect(callout?.question).toBe('Proceed?');
        expect(callout?.options).toEqual([]);
        expect(callout?.assignee).toBe('');
        expect(callout?.expiresAt).toBeNull();
    });

    it('reads an answered callout', () => {
        const answered = [
            'answer: ship it',
            "answeredAt: '2026-09-07T18:02:11.000Z'",
            'answeredBy: dev-bob',
            BODY,
        ].join('\n');
        const callout = readHitl(answered);
        expect(callout?.answer).toBe('ship it');
        expect(callout?.answeredBy).toBe('dev-bob');
        expect(callout?.answeredAt).toBe('2026-09-07T18:02:11.000Z');
    });
});

describe('declining a body it cannot edit safely', () => {
    // Every one of these renders as the literal YAML fence instead. That is
    // the format's central promise, not a fallback we tolerate.
    const refused: [string, string][] = [
        ['no question', 'id: x\naskedBy: agent'],
        ['a nested mapping', 'question: x\nmeta:\n  a: 1'],
        ['a duplicate top-level key', 'question: x\nquestion: y'],
        ['a flow sequence', 'question: x\noptions: [a, b]'],
        ['an unterminated quote', "question: 'x"],
        ['a trailing comment', 'question: x # really?'],
        ['an option key nobody declared', 'options:\n  - because: why\nquestion: x'],
        ['an option member with no options key', '  - hold\nquestion: x'],
        ['an empty option', 'options:\n  - \nquestion: x'],
        ['an option mapping with no value', 'options:\n  - then: nothing\nquestion: x'],
        ['members under an explicitly empty list', 'options: []\n  - hold\nquestion: x'],
        ['an indent this reader does not know', 'question: x\n   stray: 1'],
    ];
    it.each(refused)('declines %s', (_name, source) => {
        expect(readHitl(source)).toBeNull();
    });
});

describe('answering is ONE range', () => {
    it('inserts the three keys as a single contiguous edit at the top', () => {
        const edit = answerHitlEdit(BODY, {
            answer: 'ship it',
            by: 'dev-bob',
            at: '2026-09-07T18:02:11.000Z',
        });
        expect(edit).toEqual({
            from: 0,
            to: 0,
            insert:
                'answer: ship it\n' +
                "answeredAt: '2026-09-07T18:02:11.000Z'\n" +
                'answeredBy: dev-bob\n',
        });
        // And the result is a body this same reader still understands, with
        // every original byte where it was.
        const after = apply(BODY, edit);
        expect(after.endsWith(BODY)).toBe(true);
        expect(readHitl(after)?.answer).toBe('ship it');
    });

    it('writes no attribution when the host declared none', () => {
        const after = apply(BODY, answerHitlEdit(BODY, { answer: 'hold' }));
        expect(after.startsWith('answer: hold\n')).toBe(true);
        expect(readHitl(after)?.answeredBy).toBe('');
    });

    it('replaces an existing answer in one range rather than adding a second key', () => {
        const first = apply(BODY, answerHitlEdit(BODY, { answer: 'hold', by: 'ana' }));
        const edit = answerHitlEdit(first, { answer: 'ship it', by: 'ana' });
        expect(edit).not.toBeNull();
        const second = apply(first, edit);
        expect(readHitl(second)?.answer).toBe('ship it');
        expect(second.match(/^answer:/gm)).toHaveLength(1);
    });

    it('is a no-op when the answer is already exactly that', () => {
        const answered = apply(BODY, answerHitlEdit(BODY, { answer: 'hold' }));
        expect(answerHitlEdit(answered, { answer: 'hold' })).toBeNull();
    });

    it('refuses an empty answer and a multi-line one', () => {
        expect(answerHitlEdit(BODY, { answer: '' })).toBeNull();
        expect(answerHitlEdit(BODY, { answer: 'a\nb' })).toBeNull();
    });

    it('quotes an answer that would otherwise reparse as something else', () => {
        const after = apply(BODY, answerHitlEdit(BODY, { answer: 'no' }));
        expect(after.startsWith("answer: 'no'\n")).toBe(true);
        expect(readHitl(after)?.answer).toBe('no');
    });

    it('sorts the trio before a key nobody here has heard of', () => {
        const foreign = ['aardvark: yes', 'question: x'].join('\n');
        const after = apply(foreign, answerHitlEdit(foreign, { answer: 'ok' }));
        // `aardvark` sorts before `answer`, so the trio lands after it — not
        // wedged at line 0 on the assumption that `answer` is always first.
        expect(after).toBe('aardvark: yes\nanswer: ok\nquestion: x');
    });
});

describe('retracting', () => {
    it('returns the body byte for byte', () => {
        const answered = apply(
            BODY,
            answerHitlEdit(BODY, { answer: 'ship it', by: 'dev-bob', at: '2026-09-07T18:02:11.000Z' }),
        );
        expect(apply(answered, retractHitlEdit(answered))).toBe(BODY);
    });

    it('has nothing to do on an unanswered callout', () => {
        expect(retractHitlEdit(BODY)).toBeNull();
    });

    it('refuses a trio something was interleaved into, rather than half-removing it', () => {
        // Legal YAML, and `readHitl` reads it fine — but the three keys are no
        // longer one range, and this file does not do two edits.
        const scattered = ['answer: hold', 'id: x', 'answeredBy: ana', 'question: y'].join('\n');
        expect(readHitl(scattered)?.answer).toBe('hold');
        expect(retractHitlEdit(scattered)).toBeNull();
        expect(answerHitlEdit(scattered, { answer: 'ship it' })).toBeNull();
    });
});

describe('expiry', () => {
    const at = Date.parse('2026-09-08T00:00:00.000Z');

    it('is false before the instant and true at it', () => {
        const callout = readHitl(BODY)!;
        expect(hitlExpired(callout, at - 1)).toBe(false);
        expect(hitlExpired(callout, at)).toBe(true);
    });

    it('is false when no expiry was declared', () => {
        expect(hitlExpired(readHitl('question: x')!, Number.MAX_SAFE_INTEGER)).toBe(false);
    });

    it('is false for an expiry that is not a date — an unreadable clock is not a passed one', () => {
        expect(hitlExpired(readHitl('expiresAt: soon\nquestion: x')!, at)).toBe(false);
    });
});

describe('writing a fresh callout', () => {
    it('emits alphabetical keys and reads back identically', () => {
        const text = hitlMacroText({
            id: 'hitl-01J8Z',
            question: 'Ship 2.190.0 now, or hold for the changelog?',
            context: 'Two changelog entries are still unreviewed.',
            askedBy: 'release-agent',
            assignee: 'dev-bob',
            blocks: 'the 2.190.0 release',
            expiresAt: '2026-09-08T00:00:00.000Z',
            options: [{ value: 'ship it', then: 'the release train continues' }, 'hold'],
        });
        // The bytes are pinned, and they are NOT byte-identical to the chassis
        // fixture above: `yamlScalar` is deliberately more conservative than
        // js-yaml and quotes the question over its `?`. That divergence is the
        // one `actionItemsText` already argued is harmless — an exported file
        // is re-dumped from the PARSED data, so what has to hold is that these
        // bytes parse back to the same callout, which the next line asserts.
        expect(text).toBe(
            BODY.replace(
                'question: Ship',
                "question: 'Ship",
            ).replace('changelog?', "changelog?'"),
        );
        expect(readHitl(text)).toEqual(readHitl(BODY));
    });

    it('omits an empty option list rather than writing `options: []`', () => {
        const text = hitlMacroText({ question: 'Proceed?' });
        expect(text).toBe("question: 'Proceed?'");
        expect(readHitl(text)?.question).toBe('Proceed?');
        expect(readHitl(text)?.options).toEqual([]);
    });

    it('writes a consequence-free choice in the scalar shorthand', () => {
        const text = hitlMacroText({ question: 'x', options: [{ value: 'hold' }] });
        expect(text).toBe('options:\n  - hold\nquestion: x');
    });
});

// ---------------------------------------------------------------------------
// Readdressing — the other single-range edit
// ---------------------------------------------------------------------------

/** Applies an edit the way a node view would, so a result is comparable bytes. */
function applyEdit(source: string, edit: TextRangeEdit | null): string {
    if (!edit) return source;
    return source.slice(0, edit.from) + edit.insert + source.slice(edit.to);
}

describe('setHitlAssigneeEdit', () => {
    it('replaces the scalar alone when the key is already there', () => {
        const source = 'assignee: dev-bob\nquestion: Ship now?';
        const edit = setHitlAssigneeEdit(source, 'dev-alice');
        expect(source.slice(edit!.from, edit!.to)).toBe('dev-bob');
        expect(applyEdit(source, edit)).toBe('assignee: dev-alice\nquestion: Ship now?');
    });

    it('inserts a whole line where `sortKeys` would have put it', () => {
        // Between `askedBy` and `blocks`, and before `question` — the position
        // the chassis serializer emits, so a readdressed body stays a body it
        // would have written.
        const source = 'askedBy: agent\nblocks: the release\nquestion: Ship now?';
        const next = applyEdit(source, setHitlAssigneeEdit(source, 'dev-bob'));
        expect(next).toBe('askedBy: agent\nassignee: dev-bob\nblocks: the release\nquestion: Ship now?');
        expect(readHitl(next)?.assignee).toBe('dev-bob');
    });

    it('appends when nothing sorts after it', () => {
        const source = 'askedBy: agent';
        // No `question`, so this body is not one the block draws — and the edit
        // is declined rather than written into something it cannot read back.
        expect(setHitlAssigneeEdit(source, 'dev-bob')).toBeNull();
    });

    it('takes the whole line and its break when the new addressee is nobody', () => {
        const source = 'askedBy: agent\nassignee: dev-bob\nquestion: Ship now?';
        const next = applyEdit(source, setHitlAssigneeEdit(source, ''));
        expect(next).toBe('askedBy: agent\nquestion: Ship now?');
        expect(readHitl(next)?.assignee).toBe('');
    });

    it('is one contiguous range, always', () => {
        for (const [source, to] of [
            ['assignee: dev-bob\nquestion: q', 'dev-alice'],
            ['askedBy: a\nquestion: q', 'dev-alice'],
            ['assignee: dev-bob\nquestion: q', ''],
        ] as const) {
            const edit = setHitlAssigneeEdit(source, to)!;
            expect(edit.to).toBeGreaterThanOrEqual(edit.from);
            expect(edit.from).toBeGreaterThanOrEqual(0);
            expect(readHitl(applyEdit(source, edit))).not.toBeNull();
        }
    });

    it('does nothing when the addressee is already right, and never for a body it cannot read', () => {
        expect(setHitlAssigneeEdit('assignee: dev-bob\nquestion: q', 'dev-bob')).toBeNull();
        expect(setHitlAssigneeEdit('question: q\nmeta:\n  nested: 1', 'dev-bob')).toBeNull();
        // Nobody, and nobody was already the answer.
        expect(setHitlAssigneeEdit('question: q', '')).toBeNull();
    });
});

// ---------------------------------------------------------------------------
// The mirror row
// ---------------------------------------------------------------------------

describe('hitlMirrorRow', () => {
    it('keys the row on the callout id and addresses it by IDENTITY', () => {
        const callout = readHitl('assignee: dev-bob\nid: hitl-1\nquestion: Ship now?')!;
        expect(hitlMirrorRow(callout)).toEqual({
            itemId: 'hitl-1',
            text: 'Ship now?',
            assigneeId: 'dev-bob',
            category: 'hitl',
        });
    });

    it('refuses a callout no row can be keyed on or addressed to', () => {
        // No id: nothing to join the row and the block on.
        expect(hitlMirrorRow(readHitl('assignee: dev-bob\nquestion: q')!)).toBeNull();
        // Addressed to nobody: the answer endpoint refuses everyone, so the row
        // would sit in no inbox forever.
        expect(hitlMirrorRow(readHitl('id: hitl-1\nquestion: q')!)).toBeNull();
    });
});
