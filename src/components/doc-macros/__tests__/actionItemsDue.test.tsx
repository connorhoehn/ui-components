// Giving an action item a deadline, in a real editor.
//
// The same gap the assignee had, one field over: `due:` has been in the format
// since it was written, the block has always drawn the chip, and nothing could
// ever write one — so `ActionItemMirrorRow.dueDate` was projected into the
// inbox row on every mirrored item and was always null.
//
// What is pinned here is the part that is not obvious from the control: what
// the picker refuses to touch (a `due` it cannot represent), what clearing
// writes (nothing — the key goes), and that a deadline does NOT make an item
// addressable the way assigning it does.
//
// `LocalMacro` is the same local copy of realtime-modules' `MacroNode` the
// other macro tests use, so this file does not pull the Tiptap canvas adapter.

import { describe, it, expect, afterEach } from 'vitest';
import { act } from 'react';
import { Editor, Node } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { ReplaceStep } from '@tiptap/pm/transform';
import { ActionItemsMacro, type ActionItemsMacroOptions } from '../ActionItemsMacro';
import { readActionItems, type ActionItemMirrorRow } from '../actionItemsText';

const LocalMacro = Node.create({
    name: 'macro',
    group: 'block',
    content: 'text*',
    code: true,
    marks: '_',
    defining: true,
    isolating: true,
    addAttributes() {
        return {
            macroName: {
                default: 'unknown',
                parseHTML: (el: HTMLElement) => el.getAttribute('data-macro') ?? 'unknown',
                renderHTML: (attrs: Record<string, unknown>) => ({ 'data-macro': attrs.macroName }),
            },
        };
    },
    parseHTML() {
        return [{ tag: 'pre[data-macro]', preserveWhitespace: 'full' as const }];
    },
    renderHTML() {
        return ['pre', {}, ['code', 0]] as never;
    },
});

const BODY = ['items:', '  - status: pending', '    text: ship it'].join('\n');
const DATED = ["items:", "  - due: '2026-09-10'", '    status: pending', '    text: ship it'].join(
    '\n',
);
const ASSIGNED_AND_DATED = [
    'items:',
    '  - assignee: bob',
    "    due: '2026-09-10'",
    '    id: item-1',
    '    status: pending',
    '    text: ship it',
].join('\n');

const PEOPLE = [{ id: 'bob', name: 'Bob Martinez' }];

let editor: Editor | null = null;
let element: HTMLElement | null = null;

function mount(options: ActionItemsMacroOptions, body: string, editable = true): Editor {
    element = document.createElement('div');
    document.body.appendChild(element);
    editor = new Editor({
        element,
        editable,
        extensions: [
            Document,
            Paragraph,
            Text,
            LocalMacro,
            ActionItemsMacro.configure(options),
        ] as never,
        content: `<pre data-macro="action-items"><code>${body}</code></pre>`,
    });
    return editor;
}

afterEach(() => {
    editor?.destroy();
    editor = null;
    element?.remove();
    element = null;
});

async function run(fn: () => void): Promise<void> {
    await act(async () => {
        fn();
        await new Promise((r) => setTimeout(r, 0));
    });
}

const testId = (e: Editor, id: string) => e.view.dom.querySelector(`[data-testid="${id}"]`);
const body = (e: Editor) => e.state.doc.child(0).textContent;

/** Opens the field on a row that has no date yet, then types one. */
async function setDue(e: Editor, value: string): Promise<void> {
    let input = testId(e, 'action-items-item-0-due-set') as HTMLInputElement | null;
    if (!input) {
        const add = testId(e, 'action-items-item-0-due-add') as HTMLElement;
        await run(() => add.dispatchEvent(new MouseEvent('click', { bubbles: true })));
        input = testId(e, 'action-items-item-0-due-set') as HTMLInputElement;
    }
    const field = input!;
    // Through the prototype setter, not the property: React installs a value
    // tracker on the node, and a plain assignment updates the tracker too — so
    // the change looks like a no-op and `onChange` never fires.
    await run(() => {
        const setter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            'value',
        )!.set!;
        setter.call(field, value);
        field.dispatchEvent(new Event('input', { bubbles: true }));
    });
}

describe('setting a due date', () => {
    it('stays out of the way until it is used', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({}, BODY);
        });
        // An empty date field on every row draws `mm/dd/yyyy` beside every
        // unscheduled item, which is most of them.
        expect(testId(e, 'action-items-item-0-due-set')).toBeNull();
        expect(testId(e, 'action-items-item-0-due-add')).not.toBeNull();
    });

    it('writes the key in the position the chassis would have put it', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({}, BODY);
        });
        await setDue(e, '2026-09-10');

        // Alphabetical, matching `sortKeys: true`, so a body this wrote is a
        // body the chassis would write.
        expect(body(e)).toBe(
            ["items:", "  - due: '2026-09-10'", '    status: pending', '    text: ship it'].join(
                '\n',
            ),
        );
        expect(readActionItems(body(e))?.[0]!.due).toBe('2026-09-10');
    });

    it('changes an existing date in a single ReplaceStep', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({}, DATED);
        });
        const steps: ReplaceStep[] = [];
        e.on('transaction', ({ transaction }) => {
            transaction.steps.forEach((s) => {
                if (s instanceof ReplaceStep) steps.push(s);
            });
        });
        await setDue(e, '2026-10-01');

        // One range over the scalar, not a payload rewrite: two people editing
        // two items have to merge.
        expect(steps).toHaveLength(1);
        expect(body(e)).toContain("due: '2026-10-01'");
    });

    it('removes the key when the date is cleared', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({}, DATED);
        });
        await setDue(e, '');

        // `due: ''` would say the item is wanted by the empty string, and the
        // chip would render `due ` pointing at nothing.
        expect(body(e)).not.toContain('due');
        expect(readActionItems(body(e))?.[0]!.due).toBeNull();
    });

    it('does not mint an id for a deadline alone', async () => {
        const rows: ActionItemMirrorRow[] = [];
        let e!: Editor;
        await run(() => {
            e = mount({ onItemChanged: (r) => rows.push(r) }, BODY);
        });
        await setDue(e, '2026-09-10');

        // Nobody owns unassigned work, so no row will ever be written for it —
        // an id here would be a UUID in the exported markdown for nothing.
        expect(readActionItems(body(e))?.[0]!.id).toBeNull();
        expect(rows).toHaveLength(0);
    });

    it('carries a changed deadline out to the row of an assigned item', async () => {
        const rows: ActionItemMirrorRow[] = [];
        let e!: Editor;
        await run(() => {
            e = mount({ people: () => PEOPLE, onItemChanged: (r) => rows.push(r) }, ASSIGNED_AND_DATED);
        });
        rows.length = 0;
        await setDue(e, '2026-10-01');

        // The whole point: the inbox has never opened this page.
        expect(rows.at(-1)).toMatchObject({
            itemId: 'item-1',
            assigneeId: 'bob',
            dueDate: '2026-10-01',
        });
    });

    it('leaves a date it cannot represent alone', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({}, ['items:', "  - due: next friday", '    text: ship it'].join('\n'));
        });
        // A date field would render this blank and then overwrite it on the
        // next change. The body is the record.
        expect(testId(e, 'action-items-item-0-due-set')).toBeNull();
        expect(testId(e, 'action-items-item-0-due-add')).toBeNull();
        expect(testId(e, 'action-items-item-0-due')?.textContent).toContain('next friday');
    });

    it('draws no control in a read-only document', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({}, DATED, false);
        });
        expect(testId(e, 'action-items-item-0-due-set')).toBeNull();
        expect(testId(e, 'action-items-item-0-due-add')).toBeNull();
        // The fact is still shown — a reader needs to see when it is wanted.
        expect(testId(e, 'action-items-item-0-due')?.textContent).toContain('2026-09-10');
    });
});
