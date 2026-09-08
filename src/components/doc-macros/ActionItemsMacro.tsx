// ui-components/src/components/doc-macros/ActionItemsMacro.tsx
//
// `macro:action-items`, drawn as a checklist you can tick inside the page.
//
// The first renderer registered through the macro registry, and the shape every
// later one should copy: a `MacroRenderer` + a five-line extension. See
// `registry.ts` for why a renderer is a node view on `macro` rather than a node
// type of its own, and `DiagramMacro.tsx` for the original argument.
//
// ## What ticking actually is
//
// Not component state, and not a payload rewrite. `toggleItemEdit` returns the
// character range of the `status:` scalar and the four or seven bytes to put
// there, and the view dispatches that as an ordinary `ReplaceStep` on the
// macro's text. Consequences, all of them free:
//
//   * **It syncs.** The macro is a textblock bound to the page's Y.Doc like
//     every paragraph, so a tick reaches the other readers the way typing does.
//   * **It merges.** Two people ticking different items touch disjoint ranges.
//     Rewriting the whole YAML body — which is what editing a parsed payload
//     and re-dumping it would do — would make those two ticks a conflict over
//     every byte in the block.
//   * **It shows up in suggestions.** The suggestion fork wraps `ReplaceStep`s
//     in `suggestionInsert` / `suggestionDelete` marks on the text and
//     `listSuggestions` walks `doc.descendants` to find them. A tick made in
//     suggestion mode is therefore a proposal in the review panel, with no code
//     here that knows suggestions exist. `MacroNode` sets `marks: '_'` for
//     exactly this; `code_block`'s `marks: ''` would have silently dropped it.
//   * **It undoes.** One step, one undo.
//
// ## Degradation
//
// `readActionItems` returns `null` for any body outside the shape it can edit
// safely — a nested mapping, a flow sequence, a trailing comment, merge damage.
// The renderer then returns `null` too, and the registry falls back to
// `plainMacroView`: the reader sees the literal YAML fence and can fix it by
// hand. That is the same answer a client that never loaded this file gives, and
// it is the format's central promise rather than a fallback we tolerate.

import { Extension } from '@tiptap/core';
import type { Plugin } from '@tiptap/pm/state';
import type { Node as PmNode } from '@tiptap/pm/model';
import { ReactMacroView } from './ReactMacroView';
import {
    MACRO_NODE_NAME,
    macroRendererPlugins,
    macroRendererStorage,
    type MacroRenderer,
    type MacroViewContext,
} from './registry';
import {
    ACTION_ITEMS_MACRO_NAME,
    actionItemMirrorRow,
    actionItemsMacroText,
    addItemEdit,
    ensureItemIdEdit,
    readActionItems,
    removeItemEdit,
    removeItemKeyEdit,
    setItemKeyEdit,
    setItemTextEdit,
    toggleItemEdit,
    type ActionItem,
    type ActionItemMirrorRow,
    type TextRangeEdit,
} from './actionItemsText';
import { ActionItemsBlock, type AssignablePerson } from './ActionItemsBlock';

declare module '@tiptap/core' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}

// ---------------------------------------------------------------------------
// The node view
// ---------------------------------------------------------------------------

export interface ActionItemsMacroOptions {
    /**
     * Who an item can be assigned to. `id` is the AUTH SUBJECT, because that
     * is what `/api/items/mine` queries on — a display name here is what once
     * left that endpoint unable to find a single assigned item.
     *
     * Read through a getter for the same reason `HitlMacroOptions.people` is:
     * a roster arrives after the editor is built and changes while it is open,
     * and an extension configured once must not freeze the first list it saw.
     *
     * Omitted renders no picker, which is the right answer for a host with no
     * directory: a control listing nobody is worse than no control.
     */
    people?: () => readonly AssignablePerson[];
    /**
     * An item's QUERYABLE fields changed, so the host's row should be brought
     * in line with them: on insert, on a reassignment, on a tick, and whenever
     * a peer changes any of them through the CRDT.
     *
     * Fires on every client that has the page open, which is why a host's
     * write has to be idempotent — a projection maintained by one designated
     * client would stop being maintained the moment that client closed the
     * tab. `ActionItemsMacroOptions` says nothing about how the row is stored;
     * see `actionItemMirrorRow` for what is in it and why an unassigned or
     * unidentified item produces nothing at all.
     *
     * Omitted means document-only, which is honest: with no host reading the
     * rows, nothing outside the page is out of step with the body.
     */
    onItemChanged?: (row: ActionItemMirrorRow) => void;
}

class ActionItemsView extends ReactMacroView {
    private items: ActionItem[];

    constructor(
        ctx: MacroViewContext,
        items: ActionItem[],
        private readonly options: ActionItemsMacroOptions = {},
    ) {
        super(ctx, ACTION_ITEMS_MACRO_NAME);
        this.items = items;
        this.report();
        this.schedule();
    }

    /**
     * Tells the host about every item something outside the page could query.
     *
     * Called on the body, not on the interaction, so a change a PEER made
     * through the CRDT projects exactly like a local one — the row has to
     * follow the document whoever moved it.
     */
    private report(): void {
        const onItemChanged = this.options.onItemChanged;
        if (!onItemChanged) return;
        for (const item of this.items) {
            const row = actionItemMirrorRow(item);
            if (row) onItemChanged(row);
        }
    }

    protected element() {
        // An EMPTY roster is the same answer as no roster: a picker whose only
        // choice is "unassigned" says there is nobody to assign to, when the
        // truth is that the directory has not loaded. `refreshMacroViews`
        // is how the host brings the picker in once it has.
        const people = this.options.people?.() ?? [];
        return (
            <ActionItemsBlock
                items={this.items}
                editable={this.editable}
                onToggle={(i) => this.apply(toggleItemEdit(this.node.textContent, i))}
                onTextChange={(i, text) =>
                    this.apply(setItemTextEdit(this.node.textContent, i, text))
                }
                onRemoveItem={(i) => this.apply(removeItemEdit(this.node.textContent, i))}
                onAddItem={() => this.apply(addItemEdit(this.node.textContent, ''))}
                {...(people.length ? { people } : {})}
                {...(people.length
                    ? {
                        // One range over the item's own `assignee:` line,
                        // exactly as ticking is one range over `status:` —
                        // never a payload rewrite. Unassigning REMOVES the key
                        // rather than blanking it, because absent is what this
                        // format means by unassigned.
                        onAssign: (i: number, id: string) => this.assign(i, id),
                    }
                    : {})}
                {...(this.editable ? { onRemove: () => this.removeBlock() } : {})}
            />
        );
    }

    /**
     * Assigning, which is one edit or two.
     *
     * The second is the id, and it is minted HERE rather than at insert
     * because this is the moment the item becomes something a person has to
     * find from outside the document (see `ensureItemIdEdit`). The two are
     * dispatched in sequence and the second reads the text the first produced
     * — composing two ranges against the same pre-edit body corrupts the
     * payload, which is the trap `DecisionMacro` documents.
     *
     * Unassigning REMOVES the key rather than blanking it, because absent is
     * what this format means by unassigned. The id is left where it is: the
     * item was addressable once and may be again, and re-minting would orphan
     * whatever row already carries the old one.
     */
    private assign(index: number, assigneeId: string): void {
        if (!assigneeId) {
            this.apply(removeItemKeyEdit(this.node.textContent, index, 'assignee'));
            return;
        }
        this.apply(ensureItemIdEdit(this.node.textContent, index));
        this.apply(setItemKeyEdit(this.node.textContent, index, 'assignee', assigneeId));
    }

    /** Every mutation is one range of the macro's own text. */
    private apply(edit: TextRangeEdit | null): void {
        if (edit) this.replaceText(edit.from, edit.to, edit.insert);
    }

    update(node: PmNode): boolean {
        if (node.type !== this.node.type) return false;
        if (node.attrs.macroName !== ACTION_ITEMS_MACRO_NAME) return false;
        // A body this view can no longer edit hands the block back to
        // ProseMirror, which rebuilds it as the plain YAML fence. Drawing a
        // checklist from a payload we half-understood would be the one outcome
        // worse than showing the bytes.
        const items = readActionItems(node.textContent);
        if (!items) return false;
        const changed = node.textContent !== this.node.textContent;
        this.node = node;
        this.items = items;
        if (changed) {
            this.report();
            this.schedule();
        }
        return true;
    }

    /** React owns this subtree. Its DOM churn is not a document edit. */
    ignoreMutation(): boolean {
        return true;
    }

    /**
     * The block owns its own pointer and key events.
     *
     * Without this, ProseMirror treats a keystroke in the item-text field as
     * typing into the document and the field never receives it.
     */
    stopEvent(): boolean {
        return true;
    }
}

/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent.
 */
export function actionItemsRenderer(options: ActionItemsMacroOptions = {}): MacroRenderer {
    return {
        macroName: ACTION_ITEMS_MACRO_NAME,
        // Cheap enough to run on every transaction, and it is the route back:
        // a body this reader declines renders as the YAML fence, and `accepts`
        // is how the block returns the moment someone repairs it by hand.
        accepts: (node) => readActionItems(node.textContent) !== null,
        create: (ctx: MacroViewContext) => {
            const items = readActionItems(ctx.node.textContent);
            return items ? new ActionItemsView(ctx, items, options) : null;
        },
    };
}

// ---------------------------------------------------------------------------
// The extension
// ---------------------------------------------------------------------------

export const ActionItemsMacro = Extension.create<ActionItemsMacroOptions>({
    name: 'actionItemsMacro',

    addOptions() {
        return {};
    },

    addStorage: macroRendererStorage,

    addCommands() {
        return {
            insertActionItems:
                (texts?: readonly string[]) =>
                ({ state, commands }) => {
                    // Guard rather than assume: this extension can be
                    // registered without `MacroNode`, and inserting a node type
                    // the schema does not have throws inside the transaction.
                    if (!state.schema.nodes[MACRO_NODE_NAME]) return false;
                    const body = actionItemsMacroText(
                        (texts ?? ['']).map((text) => ({ text })),
                    );
                    return commands.insertContent([
                        {
                            type: MACRO_NODE_NAME,
                            attrs: { macroName: ACTION_ITEMS_MACRO_NAME },
                            content: [{ type: 'text', text: body }],
                        },
                        // A landing spot for the caret. The macro node is
                        // `isolating`, so a block inserted at the end of a
                        // document would otherwise leave nowhere to keep
                        // writing. The chassis drops an empty trailing
                        // paragraph on normalise, so this never reaches the
                        // exported file.
                        { type: 'paragraph' },
                    ]);
                },
        };
    },

    addProseMirrorPlugins(): Plugin[] {
        return macroRendererPlugins(this.editor, this.name, actionItemsRenderer(this.options));
    },
});

export default ActionItemsMacro;
