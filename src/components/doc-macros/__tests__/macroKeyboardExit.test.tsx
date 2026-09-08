// Getting back OUT of a macro block, and being told what one is.
//
// `stopEvent()` returning true is what hands keys to a macro's widgets instead
// of to ProseMirror. It is also what traps a keyboard user inside one, and
// nothing in this package noticed because a node view's escape hatch is not
// something a unit test reaches for unless it has already gone wrong.
//
// Measured on a live page-shaped document holding an action-items block, a
// decision and a HITL callout:
//
//   * Tab from the prose reached all thirteen controls across the three
//     blocks — so the widgets were reachable and operable
//   * with focus on `decision-block-set-accepted`, Escape left
//     `document.activeElement` exactly where it was. So did ArrowDown. The
//     editor never saw either key
//   * Escape in an action item's text field was worse than nothing: the
//     field's own handler blurs to cancel the edit, so focus landed on `body`
//   * every block rendered as a bare `<div data-macro="…">` — no role, no
//     name — so a screen reader was never told where one began or what it was
//
// Both halves live in `ReactMacroView`, so every macro inherits them rather
// than the next renderer rediscovering the trap.

import { describe, it, expect, afterEach, vi } from 'vitest';
import { act } from 'react';
import { Editor, Node } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { ActionItemsMacro } from '../ActionItemsMacro';
import { DecisionMacro } from '../DecisionMacro';

// Same local copy of realtime-modules' `MacroNode` the registry tests use, and
// for the same reason: importing the real one drags in the canvas adapter and
// a second prosemirror graph.
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

// jsdom implements no layout, so `Text` has no `getClientRects` and
// ProseMirror's `scrollIntoView` throws on the way out of `dispatch` —
// AFTER the transaction is applied, which is why the assertions below pass
// either way and the failure surfaces only as an unhandled error. Scrolling
// the caret into view is correct in a browser (a macro card is tall enough to
// push its own end off screen), so the stub goes here rather than the call
// going away.
for (const proto of [globalThis.Range.prototype, globalThis.Element.prototype]) {
    if ('getClientRects' in proto) continue;
    Object.defineProperty(proto, 'getClientRects', { value: () => [], configurable: true });
    Object.defineProperty(proto, 'getBoundingClientRect', {
        value: () => ({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 }),
        configurable: true,
    });
}

let editor: Editor | null = null;
let element: HTMLElement | null = null;

function mount(extensions: unknown[], content: string): Editor {
    element = document.createElement('div');
    document.body.appendChild(element);
    editor = new Editor({
        element,
        extensions: [Document, Paragraph, Text, LocalMacro, ...extensions] as never,
        content,
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

const ITEMS = ['items:', '  - status: pending', '    text: ship it'].join('\n');
const withItems = `<pre data-macro="action-items"><code>${ITEMS}</code></pre><p>after</p>`;
const DECISION = ['decision: Use one room primitive', 'status: accepted'].join('\n');
const withDecision = `<pre data-macro="decision"><code>${DECISION}</code></pre><p>after</p>`;
// Two macros back to back, which is where the obvious implementation broke:
// the next valid text position is INSIDE the second macro's payload.
const stacked =
    `<pre data-macro="decision"><code>${DECISION}</code></pre>`
    + `<pre data-macro="action-items"><code>${ITEMS}</code></pre><p>after</p>`;

const block = (e: Editor, name: string) =>
    e.view.dom.querySelector<HTMLElement>(`[data-macro="${name}"]`)!;
const byTestId = (e: Editor, id: string) =>
    e.view.dom.querySelector<HTMLElement>(`[data-testid="${id}"]`)!;

/** A real bubbling keydown — the block listens natively, not through React. */
function press(target: HTMLElement, key: string): void {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

describe('a macro block says what it is', () => {
    it('is a named group, not an anonymous div', async () => {
        let e!: Editor;
        await run(() => { e = mount([ActionItemsMacro], withItems); });

        const dom = block(e, 'action-items');
        expect(dom.getAttribute('role')).toBe('group');
        expect(dom.getAttribute('aria-label')).toBe('Action items');
    });

    // "Decision" is the same word on every one of them. What a reader needs on
    // a page holding four is which decision, and whether it is still in force.
    it('names a decision by its status and its claim', async () => {
        let e!: Editor;
        await run(() => { e = mount([DecisionMacro], withDecision); });

        expect(block(e, 'decision').getAttribute('aria-label'))
            .toBe('Decision, accepted: Use one room primitive');
    });

    // Focusable so Escape has somewhere to park focus on its way out of an
    // inline edit, and out of the tab order so it does not add a stop.
    it('is focusable without being a tab stop', async () => {
        let e!: Editor;
        await run(() => { e = mount([ActionItemsMacro], withItems); });
        expect(block(e, 'action-items').getAttribute('tabindex')).toBe('-1');
    });
});

describe('Escape is the way back to the text', () => {
    it('puts the caret after the block and gives the editor focus back', async () => {
        let e!: Editor;
        await run(() => { e = mount([DecisionMacro], withDecision); });

        const button = byTestId(e, 'decision-block-set-rejected');
        button.focus();
        expect(document.activeElement).toBe(button);

        await run(() => { press(button, 'Escape'); });

        // The paragraph AFTER the macro — a macro node is `isolating`, so the
        // caret cannot simply sit at the node's own end.
        const $from = e.state.selection.$from;
        expect($from.parent.type.name).toBe('paragraph');
        expect($from.parent.textContent).toBe('after');
        // Focus is back in the document, not on `body`.
        expect(e.view.dom.contains(document.activeElement)).toBe(true);
    });

    // Escape inside a text field already means "throw this edit away" — see
    // `useDraft`, which exists because the obvious implementation committed
    // the keystrokes it was cancelling. So the first press must not also
    // navigate: it cancels, and focus parks on the block instead of on `body`.
    it('parks on the block, not on body, when it cancels an inline edit', async () => {
        let e!: Editor;
        await run(() => { e = mount([ActionItemsMacro], withItems); });

        const input = byTestId(e, 'action-items-item-0-text');
        input.focus();
        await run(() => { press(input, 'Escape'); });

        expect(document.activeElement).toBe(block(e, 'action-items'));
        expect(document.activeElement).not.toBe(document.body);
        // Still inside the block: this press cancelled, it did not leave.
        expect(e.state.selection.$from.parent.textContent).not.toBe('after');
    });

    it('leaves on the second press', async () => {
        let e!: Editor;
        await run(() => { e = mount([ActionItemsMacro], withItems); });

        const input = byTestId(e, 'action-items-item-0-text');
        input.focus();
        await run(() => { press(input, 'Escape'); });
        await run(() => { press(block(e, 'action-items'), 'Escape'); });

        expect(e.state.selection.$from.parent.textContent).toBe('after');
    });

    // The hole `TextSelection.near` leaves, and the reason the search skips
    // macro nodes outright. Measured on a live document holding action items,
    // a decision and a HITL callout: Escape from the decision moved focus onto
    // the ProseMirror element — `ProseMirror-focused` was in its class list —
    // and then eleven typed characters went nowhere, because `near` had landed
    // the caret inside the NEXT macro's text and a React node view has no
    // contentDOM to render a selection in.
    it('skips over an adjacent macro rather than landing in its payload', async () => {
        let e!: Editor;
        await run(() => { e = mount([DecisionMacro, ActionItemsMacro], stacked); });

        await run(() => { press(byTestId(e, 'decision-block-set-rejected'), 'Escape'); });

        const parent = e.state.selection.$from.parent;
        expect(parent.type.name).not.toBe('macro');
        expect(parent.textContent).toBe('after');
    });

    // The body must be untouched. A navigation that also wrote the block's
    // payload would be a data bug wearing a focus bug's clothes.
    it('changes nothing in the document body', async () => {
        let e!: Editor;
        await run(() => { e = mount([DecisionMacro], withDecision); });
        const before = e.state.doc.child(0).textContent;

        await run(() => { press(byTestId(e, 'decision-block-set-rejected'), 'Escape'); });

        expect(e.state.doc.child(0).textContent).toBe(before);
    });
});

describe('the status a decision is IN can be reached', () => {
    it('keeps the current status in the tab order', async () => {
        let e!: Editor;
        await run(() => { e = mount([DecisionMacro], withDecision); });

        // Measured before this: tabbing a proposed decision hit three status
        // buttons, never four. `disabled` took the one that says which state
        // the decision is in out of the tab order, and `aria-pressed` on a
        // disabled button is not announced either.
        const current = byTestId(e, 'decision-block-set-accepted');
        expect(current.hasAttribute('disabled')).toBe(false);
        expect(current.getAttribute('aria-pressed')).toBe('true');
        current.focus();
        expect(document.activeElement).toBe(current);
    });

    it('does not rewrite the body when the status already in force is picked', async () => {
        let e!: Editor;
        await run(() => { e = mount([DecisionMacro], withDecision); });
        const before = e.state.doc.child(0).textContent;

        await run(() => { byTestId(e, 'decision-block-set-accepted').click(); });

        expect(e.state.doc.child(0).textContent).toBe(before);
    });
});

// Keeps the `vi` import honest if the suite ever needs a stub again.
void vi;
