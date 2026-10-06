import type { ReactElement } from 'react';
import type { Node as PmNode } from '@tiptap/pm/model';
import type { EditorView } from '@tiptap/pm/view';
import { type MacroNodeView, type MacroViewContext } from './registry';
export declare abstract class ReactMacroView implements MacroNodeView {
    /** The node view's outer element. `data-macro` is set for the caller. */
    readonly dom: HTMLElement;
    protected node: PmNode;
    protected readonly view: EditorView;
    protected readonly getPos: () => number | undefined;
    private readonly host;
    private readonly root;
    private dead;
    private queued;
    constructor(ctx: MacroViewContext, macroName: string);
    /**
     * The way back to the prose.
     *
     * `stopEvent()` returning true is what hands keys to the widget instead of
     * to ProseMirror, and it is also what traps a keyboard user inside one.
     * Measured on a live document, with focus on the decision block's
     * "Accepted" button: Escape left `document.activeElement` exactly where it
     * was, and so did ArrowDown — the editor never saw either key, and the
     * only way back to the text was Shift-Tab past every control in the block.
     * Escape in an action item's text field was worse: the field's own handler
     * blurs to cancel, so focus landed on `body`.
     *
     * Two stages, because Escape already means "cancel this edit" inside a
     * field and must keep meaning it:
     *
     *   * from a text field — the field cancels (its own React handler has
     *     already run by the time this bubbles out of the React root), and
     *     focus parks on the block itself rather than falling to `body`
     *   * from anywhere else in the block — the caret goes to the position
     *     immediately after the node and the editor takes focus back
     *
     * So Escape from a half-typed field is one press to abandon the edit and a
     * second to leave, and Escape from a button is a single press back to the
     * text. Bubble phase on `this.dom`, which is OUTSIDE the React root
     * (`this.host`) — that ordering is what lets the field's cancel run first.
     */
    private readonly onEscape;
    /**
     * Puts the caret in the nearest REAL prose and hands focus back.
     *
     * The obvious implementation is `TextSelection.near(resolve(after), 1)`,
     * and it has a hole that only shows up when two macros are adjacent.
     * Measured on a live document holding action items, then a decision, then
     * a HITL callout: Escape from the decision's "Rejected" button moved focus
     * onto the ProseMirror element — the class list said `ProseMirror-focused`
     * — and then eleven typed characters went nowhere. `near` had found the
     * next valid text position, which was inside the HITL macro's own text,
     * and a React node view has no `contentDOM`, so ProseMirror cannot render
     * a selection there and drops every keystroke. Focus that lands somewhere
     * you cannot type is worse than focus that never moved, because it looks
     * like it worked.
     *
     * So the search skips macro nodes outright and asks for a textblock that
     * is not one: forward first, backward if the block is last, and a node
     * selection on the block itself if the document is nothing but macros —
     * which at least selects it visibly and lets an arrow key walk out.
     */
    protected exitToText(): void;
    /** The closest typable textblock at or after `from`, else the last before it. */
    private proseNear;
    /** What to draw for the node this view currently holds. */
    protected abstract element(): ReactElement;
    /** Queues a repaint. Safe to call from a constructor or a transaction. */
    protected schedule(): void;
    /** Called by the host plugin when `EditorView.editable` flips. */
    refresh(): void;
    /** True when the document allows edits. Read LIVE, never cached. */
    protected get editable(): boolean;
    /**
     * Replaces a range of the macro's TEXT.
     *
     * `from`/`to` are offsets into `node.textContent`; `+1` skips the macro
     * node's opening token, exactly as `setMacroData` does in realtime-modules.
     *
     * This is the only way a renderer should change its payload, and it is what
     * makes an in-block interaction a first-class document edit: it is an
     * ordinary `ReplaceStep` on a textblock, so Y.js merges it, undo reverses
     * it, and the suggestion fork wraps it in `suggestionDelete` /
     * `suggestionInsert` marks like any other typing.
     */
    protected replaceText(from: number, to: number, insert: string): boolean;
    /** Takes the whole block off the page. */
    protected removeBlock(): boolean;
    /** Renames the group — for a block whose payload says more than its type. */
    protected setAccessibleName(name: string): void;
    destroy(): void;
}
export default ReactMacroView;
//# sourceMappingURL=ReactMacroView.d.ts.map