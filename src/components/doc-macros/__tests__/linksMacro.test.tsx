// `macro:links` in a real editor.
//
// The bytes are covered on strings in `linksText.test.ts`. What needs an editor
// is that the block IS the document — that editing a row is one `ReplaceStep`
// over one scalar rather than a payload rewrite, and that a body this renderer
// declines falls back to the literal fence.
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
import { LinksMacro } from '../LinksMacro';
import { readLinks } from '../linksText';

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

const BODY = [
    'links:',
    '  - label: Runbook',
    "    url: 'https://runbooks.local/checkout'",
].join('\n');

let editor: Editor | null = null;
let element: HTMLElement | null = null;

function mount(body: string, editable = true): Editor {
    element = document.createElement('div');
    document.body.appendChild(element);
    editor = new Editor({
        element,
        editable,
        extensions: [Document, Paragraph, Text, LocalMacro, LinksMacro] as never,
        content: `<pre data-macro="links"><code>${body}</code></pre>`,
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

/** Types into a field the way a person does: through React's value tracker. */
async function commit(e: Editor, id: string, value: string): Promise<void> {
    const field = testId(e, id) as HTMLInputElement;
    await run(() => {
        field.focus();
        // Through the prototype setter, not the property: React installs a
        // value tracker on the node, and a plain assignment updates the tracker
        // too — so the change looks like a no-op and `onChange` never fires.
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
        setter.call(field, value);
        field.dispatchEvent(new Event('input', { bubbles: true }));
        // `blur()`, not a synthetic `blur` event: React delegates `onBlur` to
        // `focusout`, which a hand-made non-bubbling `blur` never becomes.
        field.blur();
    });
}

describe('reading a page of links', () => {
    it('draws an anchor per row, and only for a safe URL', async () => {
        let e!: Editor;
        await run(() => {
            e = mount(
                [
                    'links:',
                    '  - label: Runbook',
                    "    url: 'https://runbooks.local/checkout'",
                    '  - label: Do not click',
                    "    url: 'javascript:alert(1)'",
                ].join('\n'),
                false,
            );
        });
        const anchor = testId(e, 'links-row-0-anchor') as HTMLAnchorElement;
        expect(anchor.getAttribute('href')).toBe('https://runbooks.local/checkout');
        // Without `noopener` the opened page gets a handle on this window.
        expect(anchor.getAttribute('rel')).toContain('noopener');

        // The second row is SHOWN, not dropped — the bytes said something and
        // the reader is entitled to see what — but it is not clickable.
        expect(testId(e, 'links-row-1-anchor')).toBeNull();
        expect(testId(e, 'links-row-1-text')?.textContent).toContain('Do not click');
    });

    it('draws no editing controls for a reader', async () => {
        let e!: Editor;
        await run(() => {
            e = mount(BODY, false);
        });
        expect(testId(e, 'links-row-0-url')).toBeNull();
        expect(testId(e, 'links-add')).toBeNull();
    });
});

describe('editing a page of links', () => {
    it('changes a URL in a single ReplaceStep', async () => {
        let e!: Editor;
        await run(() => {
            e = mount(BODY);
        });
        const steps: ReplaceStep[] = [];
        e.on('transaction', ({ transaction }) => {
            transaction.steps.forEach((s) => {
                if (s instanceof ReplaceStep) steps.push(s);
            });
        });
        await commit(e, 'links-row-0-url', 'https://runbooks.local/checkout-v2');

        // One range over the scalar, not a payload rewrite: two people editing
        // two rows have to merge.
        expect(steps).toHaveLength(1);
        expect(readLinks(body(e))![0]!.url).toBe('https://runbooks.local/checkout-v2');
    });

    it('adds and removes a row', async () => {
        let e!: Editor;
        await run(() => {
            e = mount(BODY);
        });
        await run(() =>
            (testId(e, 'links-add') as HTMLElement).dispatchEvent(
                new MouseEvent('click', { bubbles: true }),
            ),
        );
        expect(readLinks(body(e))).toHaveLength(2);

        await run(() =>
            (testId(e, 'links-row-1-remove') as HTMLElement).dispatchEvent(
                new MouseEvent('click', { bubbles: true }),
            ),
        );
        expect(readLinks(body(e))).toHaveLength(1);
    });

    it('shows an empty list as a block a person can start from', async () => {
        let e!: Editor;
        await run(() => {
            e = mount('links: []');
        });
        expect(testId(e, 'links-empty')).not.toBeNull();
        expect(testId(e, 'links-add')).not.toBeNull();
    });
});

describe('degradation', () => {
    it('falls back to the literal fence for a body it cannot edit', async () => {
        let e!: Editor;
        await run(() => {
            e = mount('links:\n  - label: x\n    nested:\n      deep: 1');
        });
        // The same thing a client that never loaded this renderer shows.
        expect(testId(e, 'links')).toBeNull();
        expect(e.view.dom.textContent).toContain('nested:');
    });
});
