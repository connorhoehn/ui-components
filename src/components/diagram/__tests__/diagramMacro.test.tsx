// ui-components/src/components/diagram/__tests__/diagramMacro.test.tsx
//
// The diagram macro, from both ends: the payload contract and the node view.
//
// The `macro` node here is a LOCAL copy of realtime-modules' `MacroNode` rather
// than the real one. Importing the real one would pull the Tiptap canvas
// adapter, and with it `distributed-core`, which this package does not install
// — and more importantly it would put a second `prosemirror-*` graph in the
// test's module graph, which is the hazard the whole design avoids. The copy is
// the part of the schema the node view depends on: `content: 'text*'`,
// `code: true`, and the `macroName` attribute.
//
// `CollaborativeExcalidraw` is stubbed. Not to make the test faster — to make
// it ASSERTABLE: the real component lazy-loads 1.9MB of editor and then paints
// to a canvas jsdom does not implement, so "is this diagram read-only" would be
// unanswerable. The stub renders the two props that carry the answer.

import { describe, it, expect, afterEach, vi } from 'vitest';
import { act } from 'react';
import { Editor, Node } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { DiagramMacro } from '../DiagramMacro';
import {
    DIAGRAM_MACRO_NAME,
    diagramMacroText,
    isDiagramId,
    newDiagramId,
    readDiagramId,
} from '../macro';

vi.mock('../CollaborativeExcalidraw', () => ({
    default: ({ blockId, editable }: { blockId?: string; editable?: boolean }) => (
        <div
            data-testid="stub-excalidraw"
            data-block-id={blockId}
            data-editable={String(editable)}
        />
    ),
}));

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

const ID = '6f9a8e2c-4b1d-4f0a-9c3e-7b2d5a1f8e04';

let editor: Editor | null = null;
let element: HTMLElement | null = null;

interface MountOptions {
    content?: string;
    /** Omit for the "page is not connected" path. */
    connected?: boolean;
}

function mount({ content, connected = true }: MountOptions = {}): Editor {
    element = document.createElement('div');
    document.body.appendChild(element);
    editor = new Editor({
        element,
        extensions: [
            Document,
            Paragraph,
            Text,
            LocalMacro,
            DiagramMacro.configure({
                getContext: connected
                    ? () => ({ ydoc: {}, user: { name: 'Ada', color: '#f00' } })
                    : () => null,
            }),
        ],
        ...(content ? { content } : {}),
    });
    return editor;
}

afterEach(() => {
    editor?.destroy();
    editor = null;
    element?.remove();
    element = null;
});

/**
 * Runs something that repaints a node view, and waits for React.
 *
 * `act` because those React roots are created by ProseMirror, outside any tree
 * a testing library knows about — without it every assertion races the first
 * paint and React logs the act warning for a render nobody awaited.
 */
async function run(fn: () => void): Promise<void> {
    await act(async () => {
        fn();
        await new Promise((r) => setTimeout(r, 0));
    });
}

const diagramHost = (e: Editor) => e.view.dom.querySelector('[data-macro="diagram"]');

/**
 * Engage with the block, the way a person does.
 *
 * A diagram in a document is a picture until someone clicks it: without this,
 * every diagram on a page would mount a full Excalidraw editor, toolbar and
 * all, into the reader's document.
 */
const activate = (e: Editor) =>
    diagramHost(e)?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

describe('the diagram macro payload', () => {
    it('mints ids it can read back', () => {
        const id = newDiagramId();
        expect(isDiagramId(id)).toBe(true);
        expect(readDiagramId(diagramMacroText(id))).toBe(id);
    });

    it('writes one line, because the payload is one key', () => {
        expect(diagramMacroText(ID)).toBe(`id: ${ID}`);
    });

    it('accepts a quoted scalar, because a foreign tool may have normalised it', () => {
        expect(readDiagramId(`id: "${ID}"`)).toBe(ID);
        expect(readDiagramId(`id: '${ID}'`)).toBe(ID);
    });

    it('returns null rather than inventing an id when the body is merge damage', () => {
        // Inventing one would silently start a SECOND, empty diagram and orphan
        // the elements the user actually drew.
        expect(readDiagramId('')).toBeNull();
        expect(readDiagramId('id:')).toBeNull();
        expect(readDiagramId('id: 6f9a8e2c-4b1d6f9a8e2c-4b1d')).toBeNull();
        expect(readDiagramId('title: not an id')).toBeNull();
    });
});

describe('insertDiagram', () => {
    it('puts a macro:diagram block in the document', async () => {
        const e = mount();
        await run(() => { expect(e.commands.insertDiagram(ID)).toBe(true); });

        const macro = e.state.doc.child(0);
        expect(macro.type.name).toBe('macro');
        expect(macro.attrs.macroName).toBe(DIAGRAM_MACRO_NAME);
        expect(macro.textContent).toBe(`id: ${ID}`);
    });

    it('leaves a paragraph after it, so the caret has somewhere to go', async () => {
        const e = mount();
        await run(() => { e.commands.insertDiagram(); });
        const last = e.state.doc.child(e.state.doc.childCount - 1);
        expect(last.type.name).toBe('paragraph');
    });

    it('refuses rather than throwing when the schema has no macro node', () => {
        element = document.createElement('div');
        document.body.appendChild(element);
        editor = new Editor({ element, extensions: [Document, Paragraph, Text, DiagramMacro] });
        expect(editor.commands.insertDiagram()).toBe(false);
    });
});

describe('the node view', () => {
    it('binds the canvas to the id the macro body names', async () => {
        const e = mount();
        await run(() => { e.commands.insertDiagram(ID); });

        const canvas = diagramHost(e)?.querySelector('[data-testid="stub-excalidraw"]');
        // The reference, resolved: the elements live under this key in the
        // page's Y.Doc, which is the whole point of storing an id rather than
        // a scene.
        expect(canvas?.getAttribute('data-block-id')).toBe(ID);
        // The YAML is NOT rendered: a reference is not prose, and showing it
        // would put an editable `id:` line inside the user's picture.
        expect(diagramHost(e)?.textContent).not.toContain(`id: ${ID}`);
    });

    it('follows the id when a merge rewrites it', async () => {
        const other = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
        const e = mount();
        await run(() => { e.commands.insertDiagram(ID); });
        await run(() => {
            e.view.dispatch(
                e.state.tr.replaceWith(1, 1 + e.state.doc.child(0).content.size, e.state.schema.text(`id: ${other}`)),
            );
        });
        expect(
            diagramHost(e)?.querySelector('[data-testid="stub-excalidraw"]')?.getAttribute('data-block-id'),
        ).toBe(other);
    });

    it('says so, and shows the bytes, when the body no longer names a diagram', async () => {
        const e = mount();
        await run(() => { e.commands.insertDiagram(ID); });
        await run(() => {
            e.view.dispatch(
                e.state.tr.replaceWith(1, 1 + e.state.doc.child(0).content.size, e.state.schema.text('id: ???')),
            );
        });

        expect(diagramHost(e)?.textContent).toContain('no longer names a diagram');
        expect(diagramHost(e)?.textContent).toContain('id: ???');
    });

    it('is honest about a page with no shared document', async () => {
        const e = mount({ connected: false });
        await run(() => { e.commands.insertDiagram(ID); });
        // Never an empty canvas, which would read as a diagram someone erased.
        expect(diagramHost(e)?.textContent).toContain('not connected to a shared document');
    });

    it('leaves every other macro rendering exactly as it did before', async () => {
        // Registering a node view on `macro` takes over ALL macros. An action
        // item must still be a pre/code holding its literal YAML, editable as
        // text — that is what block-level suggestions are built on.
        let e!: Editor;
        await run(() => {
            e = mount({
                content:
                    '<pre data-macro="action-item"><code>id: a\nstatus: pending\ntext: ship it</code></pre>',
            });
        });

        const pre = e.view.dom.querySelector('pre[data-macro="action-item"]');
        expect(pre?.querySelector('code')).not.toBeNull();
        expect(pre?.textContent).toContain('status: pending');
    });
});

describe('read-only', () => {
    it('locks a diagram that is already on screen when the page is locked', async () => {
        // The plugin view broadcasts the change. Reading `editable` once at
        // construction would leave an editable canvas inside a locked page —
        // which is exactly the bug "hide the toolbar" would have shipped.
        const e = mount();
        await run(() => { e.commands.insertDiagram(ID); });
        await run(() => { activate(e); });
        const canvas = () => diagramHost(e)?.querySelector('[data-testid="stub-excalidraw"]');
        expect(canvas()?.getAttribute('data-editable')).toBe('true');
        expect(diagramHost(e)?.querySelector('[data-testid$="-remove"]')).not.toBeNull();

        await run(() => { e.setEditable(false); });

        expect(canvas()?.getAttribute('data-editable')).toBe('false');
        // And the block cannot be taken off the page either.
        expect(diagramHost(e)?.querySelector('[data-testid$="-remove"]')).toBeNull();
    });

    it('starts read-only when the editor does', async () => {
        const e = mount();
        await run(() => { e.setEditable(false); });
        await run(() => { e.commands.insertDiagram(ID); });
        expect(
            diagramHost(e)?.querySelector('[data-testid="stub-excalidraw"]')?.getAttribute('data-editable'),
        ).toBe('false');
    });
});

describe('removing a diagram', () => {
    it('is a picture until someone engages with it', async () => {
        const e = mount();
        await run(() => { e.commands.insertDiagram(ID); });
        const canvas = () => diagramHost(e)?.querySelector('[data-testid="stub-excalidraw"]');
        // Inserted into an editable document, and still not an editor: no
        // toolbar, no palette, nothing of Excalidraw's chrome in the page.
        expect(canvas()?.getAttribute('data-editable')).toBe('false');
        expect(diagramHost(e)?.getAttribute('data-diagram-active')).toBe('false');
        expect(diagramHost(e)?.querySelector('[data-testid$="-remove"]')).toBeNull();

        await run(() => { activate(e); });
        expect(canvas()?.getAttribute('data-editable')).toBe('true');
    });

    it('puts the diagram down when the reader clicks away', async () => {
        const e = mount();
        await run(() => { e.commands.insertDiagram(ID); });
        await run(() => { activate(e); });
        expect(diagramHost(e)?.getAttribute('data-diagram-active')).toBe('true');

        await run(() => {
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        });
        expect(diagramHost(e)?.getAttribute('data-diagram-active')).toBe('false');
    });

    it('puts it down on Escape too', async () => {
        const e = mount();
        await run(() => { e.commands.insertDiagram(ID); });
        await run(() => { activate(e); });
        await run(() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        });
        expect(diagramHost(e)?.getAttribute('data-diagram-active')).toBe('false');
    });

    it('never becomes editable inside a locked document', async () => {
        const e = mount();
        await run(() => { e.commands.insertDiagram(ID); });
        await run(() => { e.setEditable(false); });
        await run(() => { activate(e); });
        expect(
            diagramHost(e)?.querySelector('[data-testid="stub-excalidraw"]')?.getAttribute('data-editable'),
        ).toBe('false');
    });

    it('takes the block out of the document', async () => {
        const e = mount();
        await run(() => { e.commands.insertDiagram(ID); });
        await run(() => { activate(e); });
        const remove = diagramHost(e)?.querySelector<HTMLButtonElement>('[data-testid$="-remove"]');
        expect(remove).not.toBeNull();

        await run(() => { remove!.click(); });

        expect(e.state.doc.textContent).not.toContain(ID);
        expect(diagramHost(e)).toBeNull();
    });
});
