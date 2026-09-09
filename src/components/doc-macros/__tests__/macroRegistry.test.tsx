// The macro registry and its first two citizens, in a real editor.
//
// The `macro` node here is a LOCAL copy of realtime-modules' `MacroNode` rather
// than the real one, for the reason `diagramMacro.test.tsx` gives: importing the
// real one pulls the Tiptap canvas adapter, and with it `distributed-core`
// (which this package does not install) and a second `prosemirror-*` graph —
// the hazard the whole design avoids. The copy is the part of the schema the
// node views depend on: `content: 'text*'`, `code: true`, `marks: '_'` and the
// `macroName` attribute.
//
// `CollaborativeExcalidraw` is stubbed for the same reason it is there: the real
// component lazy-loads 1.9MB of editor and paints to a canvas jsdom does not
// implement.

import { describe, it, expect, afterEach, vi } from 'vitest';
import { act } from 'react';
import { Editor, Extension, Node } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { ReplaceStep } from '@tiptap/pm/transform';
import { DiagramMacro } from '../../diagram/DiagramMacro';
import { ActionItemsMacro } from '../ActionItemsMacro';
import { MacroRenderers } from '../MacroRenderers';
import { hostsMacroNodeViews, macroRendererPlugins, macroRendererStorage } from '../registry';
import { readActionItems } from '../actionItemsText';

vi.mock('../../diagram/CollaborativeExcalidraw', () => ({
    default: ({ blockId }: { blockId?: string }) => (
        <div data-testid="stub-excalidraw" data-block-id={blockId} />
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

/** A third renderer, written the way the docs say to write one. */
const StubMacro = Extension.create({
    name: 'stubMacro',
    addStorage: macroRendererStorage,
    addProseMirrorPlugins() {
        return macroRendererPlugins(this.editor, this.name, {
            macroName: 'decision',
            create: () => {
                const dom = document.createElement('div');
                dom.setAttribute('data-macro', 'decision');
                dom.setAttribute('data-testid', 'stub-decision');
                return { dom };
            },
        });
    },
});

const ITEMS = ['items:', '  - status: pending', '    text: ship it', '  - status: done', '    text: wire it'].join('\n');

let editor: Editor | null = null;
let element: HTMLElement | null = null;

function mount(extensions: unknown[], content?: string): Editor {
    element = document.createElement('div');
    document.body.appendChild(element);
    editor = new Editor({
        element,
        extensions: [Document, Paragraph, Text, LocalMacro, ...extensions] as never,
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

/** Runs something that repaints a node view, and waits for React. */
async function run(fn: () => void): Promise<void> {
    await act(async () => {
        fn();
        await new Promise((r) => setTimeout(r, 0));
    });
}

const macroPre = (e: Editor, name: string) => e.view.dom.querySelector(`pre[data-macro="${name}"]`);
const testId = (e: Editor, id: string) => e.view.dom.querySelector(`[data-testid="${id}"]`);
const itemsBody = (e: Editor) => e.state.doc.child(0).textContent;

const withActionItems = (body = ITEMS) =>
    `<pre data-macro="action-items"><code>${body}</code></pre>`;

// ---------------------------------------------------------------------------

describe('two renderers on one `macro` node', () => {
    it('both draw — which is what a second plugin on `macro` could not do', async () => {
        // Before the registry, each extension carried its own
        // `props.nodeViews.macro` and ProseMirror kept only the last one, so
        // whichever sorted later silently blanked the other's blocks.
        let e!: Editor;
        await run(() => {
            e = mount(
                [DiagramMacro, ActionItemsMacro, StubMacro],
                `${withActionItems()}<pre data-macro="diagram"><code>id: 6f9a8e2c-4b1d-4f0a-9c3e-7b2d5a1f8e04</code></pre><pre data-macro="decision"><code>choice: ship</code></pre>`,
            );
        });
        expect(testId(e, 'action-items')).not.toBeNull();
        expect(e.view.dom.querySelector('[data-macro="diagram"]')).not.toBeNull();
        expect(testId(e, 'stub-decision')).not.toBeNull();
    });

    it('leaves an unknown macro as its literal YAML fence', async () => {
        // The format's central promise: an unknown macro is preserved verbatim
        // rather than dropped, so a client missing a renderer shows the bytes.
        let e!: Editor;
        await run(() => {
            e = mount(
                [ActionItemsMacro],
                '<pre data-macro="hitl"><code>prompt: approve?\nassignee: ana</code></pre>',
            );
        });
        const pre = macroPre(e, 'hitl');
        expect(pre?.querySelector('code')).not.toBeNull();
        expect(pre?.textContent).toContain('prompt: approve?');
    });

    it('elects exactly one host, however the extensions are ordered', async () => {
        for (const order of [
            [DiagramMacro, ActionItemsMacro],
            [ActionItemsMacro, DiagramMacro],
        ]) {
            let e!: Editor;
            await run(() => {
                e = mount(order, withActionItems());
            });
            expect(e.state.plugins.filter((p) => p.props?.nodeViews?.macro)).toHaveLength(1);
            expect(testId(e, 'action-items')).not.toBeNull();
            e.destroy();
            editor = null;
            element?.remove();
        }
    });

    it('gives the host to `MacroRenderers` when it is registered', async () => {
        let e!: Editor;
        await run(() => {
            e = mount([MacroRenderers, DiagramMacro, ActionItemsMacro], withActionItems());
        });
        expect(e.state.plugins.filter((p) => p.props?.nodeViews?.macro)).toHaveLength(1);
        expect(hostsMacroNodeViews(e, 'macroRenderers')).toBe(true);
        expect(hostsMacroNodeViews(e, 'actionItemsMacro')).toBe(false);
        // And the blocks still draw — the host swap is invisible to renderers.
        expect(testId(e, 'action-items')).not.toBeNull();
    });

    it('takes a renderer with no extension of its own', async () => {
        let e!: Editor;
        await run(() => {
            e = mount(
                [
                    MacroRenderers.configure({
                        renderers: [
                            {
                                macroName: 'decision',
                                create: () => {
                                    const dom = document.createElement('div');
                                    dom.setAttribute('data-testid', 'inline-decision');
                                    return { dom };
                                },
                            },
                        ],
                    }),
                ],
                '<pre data-macro="decision"><code>choice: ship</code></pre>',
            );
        });
        expect(testId(e, 'inline-decision')).not.toBeNull();
    });
});

// ---------------------------------------------------------------------------

describe('the action-items block', () => {
    it('draws a row per item, with its progress', async () => {
        let e!: Editor;
        await run(() => {
            e = mount([ActionItemsMacro], withActionItems());
        });
        expect(testId(e, 'action-items-item-0')?.getAttribute('data-done')).toBe('false');
        expect(testId(e, 'action-items-item-1')?.getAttribute('data-done')).toBe('true');
        expect(testId(e, 'action-items-progress')?.textContent).toBe('1 of 2 done');
        // The YAML is NOT rendered as text beside the checklist.
        expect(testId(e, 'action-items')?.textContent).not.toContain('status: pending');
    });

    it('shows an assignee and a due date when the payload carries them', async () => {
        let e!: Editor;
        await run(() => {
            e = mount(
                [ActionItemsMacro],
                withActionItems(
                    "items:\n  - assignee: ana\n    due: '2026-09-10'\n    status: pending\n    text: ship it",
                ),
            );
        });
        // No directory was configured, so the assignee stays a chip; the date
        // is editable without one, so it is the field that carries it. Two
        // controls for one fact would be a choice nobody should have to make.
        expect(testId(e, 'action-items-item-0-assignee')?.textContent).toBe('@ana');
        expect((testId(e, 'action-items-item-0-due-set') as HTMLInputElement).value).toBe(
            '2026-09-10',
        );
    });

    it('shows an unfamiliar status rather than pretending it is pending', async () => {
        let e!: Editor;
        await run(() => {
            e = mount([ActionItemsMacro], withActionItems('items:\n  - status: blocked\n    text: x'));
        });
        expect(testId(e, 'action-items-item-0-status')?.textContent).toBe('blocked');
    });
});

describe('ticking an item', () => {
    it('is one minimal replacement of the macro’s own text', async () => {
        let e!: Editor;
        await run(() => {
            e = mount([ActionItemsMacro], withActionItems());
        });

        const steps: ReplaceStep[] = [];
        e.on('transaction', ({ transaction }) => {
            for (const step of transaction.steps) if (step instanceof ReplaceStep) steps.push(step);
        });

        await run(() => {
            testId(e, 'action-items-item-0-toggle')?.dispatchEvent(
                new MouseEvent('click', { bubbles: true }),
            );
        });

        // The document changed, so this syncs, undoes and shows up in
        // suggestions like any other typing — it is not component state.
        expect(readActionItems(itemsBody(e))?.[0]).toMatchObject({ status: 'done', done: true });
        expect(steps).toHaveLength(1);
        // Seven characters replaced by four: `pending` -> `done`. A payload
        // rewrite would have replaced the whole body, and two people ticking
        // different items would then collide on every byte.
        expect(steps[0]!.to - steps[0]!.from).toBe(7);
        expect(steps[0]!.slice.content.textBetween(0, 4)).toBe('done');

        // And it comes back.
        await run(() => {
            testId(e, 'action-items-item-0-toggle')?.dispatchEvent(
                new MouseEvent('click', { bubbles: true }),
            );
        });
        expect(itemsBody(e)).toBe(ITEMS);
    });

    it('repaints from the document when a remote edit arrives', async () => {
        let e!: Editor;
        await run(() => {
            e = mount([ActionItemsMacro], withActionItems());
        });
        await run(() => {
            const node = e.state.doc.child(0);
            e.view.dispatch(
                e.state.tr.replaceWith(
                    1,
                    1 + node.content.size,
                    e.state.schema.text(ITEMS.replace('status: pending', 'status: done')),
                ),
            );
        });
        expect(testId(e, 'action-items-progress')?.textContent).toBe('2 of 2 done');
    });

    it('adds and removes items as text edits too', async () => {
        let e!: Editor;
        await run(() => {
            e = mount([ActionItemsMacro], withActionItems());
        });
        await run(() => {
            (testId(e, 'action-items-add') as HTMLButtonElement).click();
        });
        expect(readActionItems(itemsBody(e))).toHaveLength(3);

        await run(() => {
            (testId(e, 'action-items-item-0-remove') as HTMLButtonElement).click();
        });
        const items = readActionItems(itemsBody(e));
        expect(items).toHaveLength(2);
        expect(items?.[0]!.text).toBe('wire it');
    });

    it('takes the whole block off the page', async () => {
        let e!: Editor;
        await run(() => {
            e = mount([ActionItemsMacro], withActionItems());
        });
        await run(() => {
            (testId(e, 'action-items-remove') as HTMLButtonElement).click();
        });
        expect(testId(e, 'action-items')).toBeNull();
        expect(e.state.doc.textContent).not.toContain('ship it');
    });
});

describe('read-only', () => {
    it('locks a checklist that is already on screen when the page is locked', async () => {
        // The registry's plugin view broadcasts the change — the same mechanism
        // the diagram needed, now serving every renderer.
        let e!: Editor;
        await run(() => {
            e = mount([ActionItemsMacro], withActionItems());
        });
        const toggle = () => testId(e, 'action-items-item-0-toggle') as HTMLButtonElement;
        expect(toggle().disabled).toBe(false);
        expect(testId(e, 'action-items-add')).not.toBeNull();

        await run(() => e.setEditable(false));

        expect(toggle().disabled).toBe(true);
        expect(testId(e, 'action-items-add')).toBeNull();
        expect(testId(e, 'action-items-remove')).toBeNull();

        // And a tick attempted anyway changes nothing.
        await run(() => {
            toggle().dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(itemsBody(e)).toBe(ITEMS);
    });
});

describe('degrading', () => {
    it('shows the literal fence when the body is not a shape it can edit', async () => {
        // A nested mapping is legal YAML that a whole-body rewrite would
        // destroy. Showing the bytes is the honest answer, and it is the same
        // answer a client without this renderer gives.
        let e!: Editor;
        await run(() => {
            e = mount(
                [ActionItemsMacro],
                withActionItems('items:\n  - text: a\n    owner:\n      name: ana'),
            );
        });
        const pre = macroPre(e, 'action-items');
        expect(pre?.querySelector('code')).not.toBeNull();
        expect(pre?.textContent).toContain('name: ana');
        expect(testId(e, 'action-items')).toBeNull();
    });

    it('hands the block back to the fence when a merge breaks the body', async () => {
        let e!: Editor;
        await run(() => {
            e = mount([ActionItemsMacro], withActionItems());
        });
        expect(testId(e, 'action-items')).not.toBeNull();

        await run(() => {
            const node = e.state.doc.child(0);
            e.view.dispatch(
                e.state.tr.replaceWith(
                    1,
                    1 + node.content.size,
                    e.state.schema.text('items:\n  - text: a\n      broken: yes'),
                ),
            );
        });
        expect(testId(e, 'action-items')).toBeNull();
        expect(macroPre(e, 'action-items')?.textContent).toContain('broken: yes');
    });

    it('recovers when the body becomes readable again', async () => {
        let e!: Editor;
        await run(() => {
            e = mount([ActionItemsMacro], withActionItems('items:\n  - text: a\n      broken: yes'));
        });
        expect(testId(e, 'action-items')).toBeNull();

        await run(() => {
            const node = e.state.doc.child(0);
            e.view.dispatch(
                e.state.tr.replaceWith(1, 1 + node.content.size, e.state.schema.text(ITEMS)),
            );
        });
        expect(testId(e, 'action-items')).not.toBeNull();
    });
});

describe('insertActionItems', () => {
    it('puts a macro:action-items block in the document', async () => {
        let e!: Editor;
        await run(() => {
            e = mount([ActionItemsMacro]);
        });
        await run(() => {
            expect(e.commands.insertActionItems(['ship it'])).toBe(true);
        });

        const macro = e.state.doc.child(0);
        expect(macro.attrs.macroName).toBe('action-items');
        expect(macro.textContent).toBe('items:\n  - status: pending\n    text: ship it');
        // A landing spot for the caret: the macro node is `isolating`.
        expect(e.state.doc.child(e.state.doc.childCount - 1).type.name).toBe('paragraph');
    });

    it('refuses rather than throwing when the schema has no macro node', () => {
        element = document.createElement('div');
        document.body.appendChild(element);
        editor = new Editor({
            element,
            extensions: [Document, Paragraph, Text, ActionItemsMacro] as never,
        });
        expect(editor.commands.insertActionItems()).toBe(false);
    });
});
