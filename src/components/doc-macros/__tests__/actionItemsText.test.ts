// The `macro:action-items` payload, from the text end.
//
// No editor here on purpose: every mutation in `actionItemsText.ts` is a pure
// function from (source, intent) to ONE text range, so the interesting
// properties — that a tick touches four characters, that a body it does not
// understand is declined rather than guessed at, that what it writes is what
// the chassis would have written — are all assertable on strings.

import { describe, it, expect } from 'vitest';
import {
    actionItemsMacroText,
    addItemEdit,
    readActionItems,
    removeItemEdit,
    removeItemKeyEdit,
    setItemKeyEdit,
    setItemTextEdit,
    toggleItemEdit,
    yamlScalar,
    type TextRangeEdit,
} from '../actionItemsText';

/**
 * Ground truth, measured rather than guessed: this is the exact string
 * `serializeDocument({ content: [{ type: 'macro', name: 'action-items', data }] })`
 * in distributed-core puts between the fences today — keys alphabetical from
 * `sortKeys: true`, `due` single-quoted because js-yaml quotes any scalar that
 * would otherwise resolve to a Date.
 *
 * Pinned here for the reason `diagram-macro-roundtrip.test.ts` pins the
 * diagram's one-key body: if the chassis ever changes how it dumps this shape,
 * something goes red instead of every open editor quietly disagreeing with its
 * own exported file.
 */
const CHASSIS_BODY = [
    'items:',
    '  - status: pending',
    '    text: ship it',
    '  - assignee: ana',
    "    due: '2026-09-10'",
    '    status: done',
    '    text: wire it',
].join('\n');

const apply = (source: string, edit: TextRangeEdit | null): string =>
    edit ? source.slice(0, edit.from) + edit.insert + source.slice(edit.to) : source;

describe('reading a checklist', () => {
    it('reads the bytes the chassis writes', () => {
        expect(readActionItems(CHASSIS_BODY)).toEqual([
            {
                index: 0,
                id: null,
                text: 'ship it',
                status: 'pending',
                done: false,
                assignee: null,
                due: null,
            },
            {
                index: 1,
                id: null,
                text: 'wire it',
                status: 'done',
                done: true,
                assignee: 'ana',
                due: '2026-09-10',
            },
        ]);
    });

    it('accepts quoted scalars, because a foreign tool may have normalised them', () => {
        const items = readActionItems("items:\n  - status: 'done'\n    text: \"ship it\"");
        expect(items?.[0]).toMatchObject({ status: 'done', done: true, text: 'ship it' });
    });

    it('reads an empty list', () => {
        expect(readActionItems('items: []')).toEqual([]);
    });

    it('shows an unfamiliar status rather than coercing it', () => {
        // Relabelling someone's `blocked` as `pending` would be a lie about
        // what the file says.
        const items = readActionItems('items:\n  - status: blocked\n    text: x');
        expect(items?.[0]).toMatchObject({ status: 'blocked', done: false });
    });

    it('declines a body it cannot edit safely, rather than guessing', () => {
        // Every one of these is legal YAML that a whole-body rewrite would
        // silently destroy. `null` sends the block to the plain fence, where
        // the reader can see and fix the bytes.
        expect(readActionItems('')).toBeNull();
        expect(readActionItems('title: not a checklist')).toBeNull();
        expect(readActionItems('items:\n  - text: a # keep this note')).toBeNull();
        expect(readActionItems('items:\n  - nested:\n      deep: 1')).toBeNull();
        expect(readActionItems('items: [a, b]')).toBeNull();
        expect(readActionItems('items:\n  - text: a\n    text: b')).toBeNull();
        expect(readActionItems("items:\n  - text: 'unterminated")).toBeNull();
    });
});

describe('ticking', () => {
    it('replaces the status scalar and nothing else', () => {
        const edit = toggleItemEdit(CHASSIS_BODY, 0)!;
        // Seven characters in, seven characters replaced by four. A whole-body
        // rewrite would have been a 100+ character range, and two people
        // ticking different items would collide on all of it.
        expect(CHASSIS_BODY.slice(edit.from, edit.to)).toBe('pending');
        expect(edit.insert).toBe('done');
        expect(apply(CHASSIS_BODY, edit)).toBe(CHASSIS_BODY.replace('pending', 'done'));
    });

    it('un-ticks the same way', () => {
        const edit = toggleItemEdit(CHASSIS_BODY, 1)!;
        expect(CHASSIS_BODY.slice(edit.from, edit.to)).toBe('done');
        expect(edit.insert).toBe('pending');
    });

    it('leaves every other byte alone — quoting, spacing and key order included', () => {
        const source = "items:\n  - due:   '2026-01-01'\n    status: pending\n    text: \"ship it\"";
        expect(apply(source, toggleItemEdit(source, 0))).toBe(
            source.replace('status: pending', 'status: done'),
        );
    });

    it('inserts a status line where sortKeys would have put it', () => {
        const source = "items:\n  - due: '2026-01-01'\n    text: t";
        expect(apply(source, toggleItemEdit(source, 0))).toBe(
            "items:\n  - due: '2026-01-01'\n    status: done\n    text: t",
        );
    });

    it('inserts it onto the marker line when nothing sorts before it', () => {
        const source = 'items:\n  - text: no status yet';
        expect(apply(source, toggleItemEdit(source, 0))).toBe(
            'items:\n  - status: done\n    text: no status yet',
        );
    });

    it('is a no-op on an item that is not there', () => {
        expect(toggleItemEdit(CHASSIS_BODY, 7)).toBeNull();
        expect(toggleItemEdit('not a checklist', 0)).toBeNull();
    });
});

describe('adding, removing and retitling', () => {
    it('appends a pending item', () => {
        expect(apply(CHASSIS_BODY, addItemEdit(CHASSIS_BODY, 'third thing'))).toBe(
            `${CHASSIS_BODY}\n  - status: pending\n    text: third thing`,
        );
    });

    it('turns an empty flow sequence back into a block list', () => {
        expect(apply('items: []', addItemEdit('items: []', 'first'))).toBe(
            'items:\n  - status: pending\n    text: first',
        );
    });

    it('removes an item without leaving a blank line', () => {
        expect(apply(CHASSIS_BODY, removeItemEdit(CHASSIS_BODY, 0))).toBe(
            "items:\n  - assignee: ana\n    due: '2026-09-10'\n    status: done\n    text: wire it",
        );
        expect(apply(CHASSIS_BODY, removeItemEdit(CHASSIS_BODY, 1))).toBe(
            'items:\n  - status: pending\n    text: ship it',
        );
    });

    it('writes `items: []` when the last item goes, not a bare key', () => {
        // A bare `items:` parses as null, which would come back as merge damage
        // rather than as an empty checklist.
        const source = 'items:\n  - status: done\n    text: x';
        expect(apply(source, removeItemEdit(source, 0))).toBe('items: []');
        expect(readActionItems('items: []')).toEqual([]);
    });

    it('quotes a title that would otherwise reparse as something else', () => {
        expect(apply(CHASSIS_BODY, setItemTextEdit(CHASSIS_BODY, 0, 'new: title'))).toContain(
            "text: 'new: title'",
        );
        expect(readActionItems(apply(CHASSIS_BODY, setItemTextEdit(CHASSIS_BODY, 0, 'new: title')))?.[0]!.text).toBe(
            'new: title',
        );
    });

    it('refuses a multi-line title rather than writing a broken block scalar', () => {
        expect(setItemTextEdit(CHASSIS_BODY, 0, 'two\nlines')).toBeNull();
        expect(yamlScalar('two\nlines')).toBeNull();
    });
});

describe('assigning', () => {
    it('inserts `assignee` where sortKeys would have put it', () => {
        // `assignee` sorts before `status`, so it lands on the marker line and
        // pushes the rest of the item down — the body stays byte-identical to
        // what the chassis would emit for the same data.
        expect(apply(CHASSIS_BODY, setItemKeyEdit(CHASSIS_BODY, 0, 'assignee', 'bob'))).toBe(
            [
                'items:',
                '  - assignee: bob',
                '    status: pending',
                '    text: ship it',
                '  - assignee: ana',
                "    due: '2026-09-10'",
                '    status: done',
                '    text: wire it',
            ].join('\n'),
        );
    });

    it('reassigns by replacing the scalar alone', () => {
        const edit = setItemKeyEdit(CHASSIS_BODY, 1, 'assignee', 'bob');
        expect(CHASSIS_BODY.slice(edit!.from, edit!.to)).toBe('ana');
        expect(readActionItems(apply(CHASSIS_BODY, edit))?.[1]!.assignee).toBe('bob');
    });

    it('unassigning REMOVES the key, so nothing reads as assigned to nobody', () => {
        // The item's first line carries the `- ` marker, so the line survives
        // and the next key moves up onto it.
        expect(apply(CHASSIS_BODY, removeItemKeyEdit(CHASSIS_BODY, 1, 'assignee'))).toBe(
            [
                'items:',
                '  - status: pending',
                '    text: ship it',
                "  - due: '2026-09-10'",
                '    status: done',
                '    text: wire it',
            ].join('\n'),
        );
        expect(
            readActionItems(apply(CHASSIS_BODY, removeItemKeyEdit(CHASSIS_BODY, 1, 'assignee')))?.[1]!
                .assignee,
        ).toBeNull();
    });

    it('removes a continuation line together with its own break', () => {
        expect(apply(CHASSIS_BODY, removeItemKeyEdit(CHASSIS_BODY, 1, 'due'))).toBe(
            [
                'items:',
                '  - status: pending',
                '    text: ship it',
                '  - assignee: ana',
                '    status: done',
                '    text: wire it',
            ].join('\n'),
        );
    });

    it('is a no-op when there is no such key', () => {
        expect(removeItemKeyEdit(CHASSIS_BODY, 0, 'assignee')).toBeNull();
    });

    it('refuses to strip an item down to a bare marker', () => {
        const source = ['items:', '  - text: only'].join('\n');
        expect(removeItemKeyEdit(source, 0, 'text')).toBeNull();
    });
});

describe('creating a block', () => {
    it('writes exactly what the chassis serializer writes', () => {
        expect(
            actionItemsMacroText([
                { text: 'ship it' },
                { text: 'wire it', status: 'done', assignee: 'ana', due: '2026-09-10' },
            ]),
        ).toBe(CHASSIS_BODY);
    });

    it('round-trips through its own reader', () => {
        const body = actionItemsMacroText([{ text: 'a: b' }, { text: "o'clock", status: 'blocked' }]);
        expect(readActionItems(body)).toMatchObject([
            { text: 'a: b', status: 'pending' },
            { text: "o'clock", status: 'blocked' },
        ]);
    });

    it('writes an empty list as a flow sequence', () => {
        expect(actionItemsMacroText([])).toBe('items: []');
    });
});
