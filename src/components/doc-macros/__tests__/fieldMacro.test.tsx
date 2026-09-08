// `macro:field` in a real editor.
//
// The text arithmetic is covered on strings in `fieldText.test.ts`. What needs
// an editor is the part that is a PROMISE rather than a calculation:
//
//   * setting, clearing and retyping are each ONE `ReplaceStep`, so they merge,
//     undo and show up in the suggestion fork like any other typing;
//   * a body whose SHAPE the reader declines degrades to the literal YAML
//     fence — and comes BACK the moment someone repairs it, which only works
//     because `accepts` exists (a fence keeps a contentDOM, so ProseMirror
//     updates it in place and would otherwise never ask for a new view);
//   * a body with an INVALID VALUE does NOT degrade. That is the distinction
//     the whole design rests on, and it is only observable in an editor.
//
// `LocalMacro` is the same local copy of realtime-modules' `MacroNode` that
// `macroRegistry.test.tsx` uses, for the same reason: importing the real one
// pulls the Tiptap canvas adapter and a second `prosemirror-*` graph.

import { describe, it, expect, afterEach } from 'vitest';
import { act } from 'react';
import { fireEvent } from '@testing-library/react';
import { Editor, Node } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { ReplaceStep } from '@tiptap/pm/transform';
import { FieldMacro } from '../FieldMacro';
import { readTypedField } from '../fieldText';

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

const DATE = ['label: Target date', 'type: date', "value: '2026-11-01'"].join('\n');
const OWNER = 'label: Owner\ntype: text';

let editor: Editor | null = null;
let element: HTMLElement | null = null;

function mount(body: string, editable = true): Editor {
    element = document.createElement('div');
    document.body.appendChild(element);
    editor = new Editor({
        element,
        editable,
        extensions: [Document, Paragraph, Text, LocalMacro, FieldMacro] as never,
        content: `<pre data-macro="field"><code>${body}</code></pre>`,
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

describe('drawing a field', () => {
    it('draws one line — the name and the typed control, no card', async () => {
        let e!: Editor;
        await run(() => { e = mount(DATE); });
        expect(testId(e, 'field-block')?.getAttribute('data-field-type')).toBe('date');
        expect(testId(e, 'field-block')?.getAttribute('data-field-state')).toBe('set');
        expect((testId(e, 'field-block-date-input') as HTMLInputElement).value).toBe('2026-11-01');
        expect(e.view.dom.querySelector('pre[data-macro="field"] code')).toBeNull();
    });

    it('collapses to text on a page nobody may edit', async () => {
        let e!: Editor;
        await run(() => { e = mount(DATE, false); });
        expect(testId(e, 'field-block-value')?.textContent).toMatch(/Nov 1, 2026/);
        expect(e.view.dom.querySelector('input')).toBeNull();
        expect(e.view.dom.querySelector('select')).toBeNull();
    });

    it('falls back to the fence for a body it cannot READ, and comes back when repaired', async () => {
        // An unknown type is a shape we cannot draw at all. Drawing it as a
        // text box would silently downgrade a field another tool understands.
        let e!: Editor;
        await run(() => { e = mount('label: Cost\ntype: currency\nvalue: 40'); });
        expect(testId(e, 'field-block')).toBeNull();
        expect(e.view.dom.querySelector('pre[data-macro="field"] code')).not.toBeNull();

        // Repairing it by hand is a text edit like any other, and `accepts` is
        // the only thing that lets the fence hand the block back — a fence has
        // a contentDOM, so ProseMirror updates it in place forever otherwise.
        await run(() => {
            e.commands.setContent(
                '<pre data-macro="field"><code>label: Cost\ntype: number\nvalue: 40</code></pre>',
            );
        });
        expect(testId(e, 'field-block')).not.toBeNull();
    });

    it('does NOT fall back for an invalid VALUE — it stays a live block, flagged', async () => {
        // The distinction the design rests on. `<input type="date">` handed
        // "next tuesday" renders empty, so the raw text box is what keeps the
        // author's words on the screen.
        let e!: Editor;
        await run(() => { e = mount('label: Target date\ntype: date\nvalue: next tuesday'); });
        expect(testId(e, 'field-block')?.getAttribute('data-field-state')).toBe('invalid');
        expect((testId(e, 'field-block-raw-input') as HTMLInputElement).value).toBe('next tuesday');
        expect(testId(e, 'field-block-invalid')?.textContent).toBe('not a date');
        expect(e.view.dom.querySelector('pre[data-macro="field"] code')).toBeNull();
    });
});

describe('every interaction is exactly one ReplaceStep', () => {
    async function steps(e: Editor, fn: () => void): Promise<unknown[]> {
        const seen: unknown[] = [];
        const listen = ({ transaction }: { transaction: { steps: unknown[] } }) =>
            seen.push(...transaction.steps);
        e.on('transaction', listen as never);
        await run(fn);
        e.off('transaction', listen as never);
        return seen;
    }

    it('setting a date', async () => {
        let e!: Editor;
        await run(() => { e = mount(DATE); });
        const seen = await steps(e, () => {
            // `fireEvent.change`, not a hand-dispatched input event: React
            // tracks the last value it wrote to the DOM node and skips onChange
            // when a raw assignment leaves the tracker agreeing.
            fireEvent.change(testId(e, 'field-block-date-input')!, {
                target: { value: '2026-12-25' },
            });
        });
        expect(seen).toHaveLength(1);
        expect(seen[0]).toBeInstanceOf(ReplaceStep);
        expect(body(e)).toBe(['label: Target date', 'type: date', "value: '2026-12-25'"].join('\n'));
    });

    it('clearing — which removes the LINE, not writes an empty value', async () => {
        let e!: Editor;
        await run(() => { e = mount(DATE); });
        const seen = await steps(e, () => {
            (testId(e, 'field-block-clear') as HTMLButtonElement).click();
        });
        expect(seen).toHaveLength(1);
        expect(seen[0]).toBeInstanceOf(ReplaceStep);
        expect(body(e)).toBe('label: Target date\ntype: date');
        expect(readTypedField(body(e))!.value).toBeUndefined();
        expect(testId(e, 'field-block')?.getAttribute('data-field-state')).toBe('empty');
    });

    it('changing the type, WITHOUT touching the value', async () => {
        let e!: Editor;
        await run(() => { e = mount('label: Owner\ntype: text\nvalue: Ada'); });
        const seen = await steps(e, () => {
            fireEvent.change(testId(e, 'field-block-type')!, { target: { value: 'number' } });
        });
        expect(seen).toHaveLength(1);
        expect(body(e)).toBe('label: Owner\ntype: number\nvalue: Ada');
        // Flagged, not deleted: the dropdown that caused it is right there.
        expect(testId(e, 'field-block')?.getAttribute('data-field-state')).toBe('invalid');
    });

    it('a boolean lands BARE in the YAML, not as the string "true"', async () => {
        // `macroDataFromText` parses this body with js-yaml, so a quoted
        // `'true'` would reach every consumer as a string.
        let e!: Editor;
        await run(() => { e = mount('label: Approved\ntype: boolean'); });
        await run(() => {
            (testId(e, 'field-block-checkbox') as HTMLInputElement).click();
        });
        expect(body(e)).toBe('label: Approved\ntype: boolean\nvalue: true');
    });
});

describe('inserting', () => {
    it('seeds a NAMED, UNANSWERED field and leaves somewhere to keep typing', async () => {
        let e!: Editor;
        await run(() => { e = mount(OWNER); });
        await run(() => {
            e.commands.insertField({ label: 'Budget', type: 'number' });
        });
        const bodies = [...e.view.dom.querySelectorAll('[data-testid="field-block"]')];
        expect(bodies).toHaveLength(2);
        expect(bodies.some((b) => b.getAttribute('data-field-state') === 'empty')).toBe(true);
    });

    it('refuses an unnamed field rather than inserting a block with no name', async () => {
        let e!: Editor;
        await run(() => { e = mount(OWNER); });
        expect(e.commands.insertField({ label: '   ' })).toBe(false);
    });
});
