// Assigning an action item, in a real editor.
//
// The text arithmetic is covered on strings in `actionItemsText.test.ts`. What
// needs an editor is the seam that was missing for as long as the block has
// existed: the format has carried `assignee:` since it was written and the
// block DISPLAYED it, but nothing could ever SET it — so a canvas action item
// could not be given to anybody, and the inbox's Tasks lane could never fill
// from a document. This pins the control end to end.
//
// `LocalMacro` is the same local copy of realtime-modules' `MacroNode` the
// other macro tests use, for the same reason: importing the real one pulls the
// Tiptap canvas adapter and a second `prosemirror-*` graph.

import { describe, it, expect, afterEach } from 'vitest';
import { act } from 'react';
import { Editor, Node } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { ReplaceStep } from '@tiptap/pm/transform';
import { ActionItemsMacro, type ActionItemsMacroOptions } from '../ActionItemsMacro';
import { readActionItems, type ActionItemMirrorRow } from '../actionItemsText';
import { refreshMacroViews } from '../registry';
import { readSelectOptions } from '../../../test-utils/selectListbox';

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
const ASSIGNED = ['items:', '  - assignee: ana', '    status: pending', '    text: ship it'].join(
    '\n',
);

const PEOPLE = [
    { id: 'ana', name: 'Ana Rivera' },
    { id: 'bob', name: 'Bob Martinez' },
];

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

async function pick(e: Editor, value: string): Promise<void> {
    const select = testId(e, 'action-items-item-0-assign') as HTMLSelectElement;
    await run(() => {
        select.value = value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
    });
}

describe('the mirror seam', () => {
    it('reports a row the moment an item becomes assigned, and mints its id', async () => {
        const rows: ActionItemMirrorRow[] = [];
        let e!: Editor;
        await run(() => {
            e = mount({ people: () => PEOPLE, onItemChanged: (r) => rows.push(r) }, BODY);
        });
        // Nothing to query yet: unassigned work is invisible outside the page
        // by design, not by omission.
        expect(rows).toHaveLength(0);

        await pick(e, 'bob');

        expect(rows).toHaveLength(1);
        expect(rows[0]).toMatchObject({
            text: 'ship it',
            assigneeId: 'bob',
            category: 'action-item',
            done: false,
        });
        // An index is not an identity — inserting a line above this item must
        // not move somebody else's row onto it.
        expect(rows[0]!.itemId).toBeTruthy();
        expect(readActionItems(body(e))?.[0]!.id).toBe(rows[0]!.itemId);
    });

    it('keeps the id when the item is unassigned and reassigned', async () => {
        const rows: ActionItemMirrorRow[] = [];
        let e!: Editor;
        await run(() => {
            e = mount({ people: () => PEOPLE, onItemChanged: (r) => rows.push(r) }, BODY);
        });
        await pick(e, 'bob');
        const first = readActionItems(body(e))?.[0]!.id;
        await pick(e, '');
        await pick(e, 'ana');
        // Re-minting would orphan the row that already carries the old id.
        expect(readActionItems(body(e))?.[0]!.id).toBe(first);
        expect(rows[rows.length - 1]).toMatchObject({ itemId: first!, assigneeId: 'ana' });
    });

    it('follows a tick, so finished work leaves the inbox', async () => {
        const rows: ActionItemMirrorRow[] = [];
        let e!: Editor;
        await run(() => {
            e = mount(
                { people: () => PEOPLE, onItemChanged: (r) => rows.push(r) },
                ['items:', '  - assignee: ana', '    id: item-1', '    status: pending', '    text: ship it'].join('\n'),
            );
        });
        expect(rows[0]).toMatchObject({ itemId: 'item-1', done: false });
        await run(() => {
            (testId(e, 'action-items-item-0-toggle') as HTMLElement).click();
        });
        expect(rows[rows.length - 1]).toMatchObject({ itemId: 'item-1', done: true });
    });

    it('says nothing about an item nobody could query', async () => {
        const rows: ActionItemMirrorRow[] = [];
        await run(() => {
            // Assigned but untitled: a row that says nothing to whoever finds
            // it. Legal in a body, useless outside one.
            mount(
                { onItemChanged: (r) => rows.push(r) },
                ['items:', '  - assignee: ana', '    id: item-1', '    status: pending'].join('\n'),
            );
        });
        expect(rows).toHaveLength(0);
    });
});

describe('the assignee picker', () => {
    it('is drawn only when the host supplied a directory', async () => {
        let bare!: Editor;
        await run(() => {
            bare = mount({}, BODY);
        });
        // A picker listing nobody is worse than no picker: it reads as "there
        // is nobody to assign to" when the truth is that this host never said.
        expect(testId(bare, 'action-items-item-0-assign')).toBeNull();
        bare.destroy();
        element?.remove();

        let e!: Editor;
        await run(() => {
            e = mount({ people: () => PEOPLE }, BODY);
        });
        expect(testId(e, 'action-items-item-0-assign')).not.toBeNull();
    });

    it('picks up a directory that loads after the editor was built', async () => {
        // The failure this pins: a node view redraws only when its own text
        // changes, so a roster fetched after mount used to be invisible until
        // somebody edited that particular block.
        let people: { id: string; name: string }[] = [];
        let e!: Editor;
        await run(() => {
            e = mount({ people: () => people }, BODY);
        });
        expect(testId(e, 'action-items-item-0-assign')).toBeNull();

        people = PEOPLE;
        await run(() => {
            expect(refreshMacroViews(e.view)).toBe(true);
        });
        const select = testId(e, 'action-items-item-0-assign') as HTMLElement;
        expect(select).not.toBeNull();
        // unassigned + two people.
        expect(readSelectOptions(select).length).toBe(3);
    });

    it('assigns in single ReplaceSteps — one per key, never a payload rewrite', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({ people: () => PEOPLE }, BODY);
        });
        const steps: unknown[] = [];
        e.on('transaction', ({ transaction }) => steps.push(...transaction.steps));

        await pick(e, 'bob');

        // Two, because this item had no `id` yet and assigning is what makes
        // it addressable. Each is still ONE range over one scalar — which is
        // what merges, undoes and marks as a suggestion cleanly.
        expect(steps).toHaveLength(2);
        expect(steps.every((s) => s instanceof ReplaceStep)).toBe(true);

        expect(readActionItems(body(e))?.[0]!.assignee).toBe('bob');
        // Untouched: assigning is not a payload rewrite.
        expect(readActionItems(body(e))?.[0]).toMatchObject({ text: 'ship it', done: false });

        // Reassigning an item that is already addressable is one.
        steps.length = 0;
        await pick(e, 'ana');
        expect(steps).toHaveLength(1);
        expect(readActionItems(body(e))?.[0]!.assignee).toBe('ana');
    });

    it('unassigns by removing the key, not by blanking it', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({ people: () => PEOPLE }, ASSIGNED);
        });
        await pick(e, '');
        // `assignee: ''` would claim the item IS assigned — to an id that
        // matches nobody's inbox. Absent is what unassigned means here.
        expect(body(e)).not.toContain('assignee');
        expect(readActionItems(body(e))?.[0]!.assignee).toBeNull();
    });

    it('keeps an assignee who is not in the directory as its own choice', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({ people: () => [{ id: 'bob', name: 'Bob Martinez' }] }, ASSIGNED);
        });
        const select = testId(e, 'action-items-item-0-assign') as HTMLSelectElement;
        // Someone who left the room, or a directory that has not loaded them:
        // silently resetting the row to unassigned would lose the fact.
        expect(select.value).toBe('ana');
        expect(body(e)).toContain('assignee: ana');
    });

    it('draws no picker in a read-only document', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({ people: () => PEOPLE }, ASSIGNED, false);
        });
        expect(testId(e, 'action-items-item-0-assign')).toBeNull();
        // The fact is still shown — a reader needs to see who owns it.
        expect(testId(e, 'action-items-item-0-assignee')?.textContent).toContain('ana');
    });
});
