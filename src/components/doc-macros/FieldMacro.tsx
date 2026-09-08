// ui-components/src/components/doc-macros/FieldMacro.tsx
//
// `macro:field` — one named, typed value, drawn as a line in the page.
//
// The fourth renderer registered through the macro registry, and the last of
// the three citizens `MacroNode`'s header names ("action item, decision, typed
// field"). Built to the shape `ActionItemsMacro` established and `HitlMacro`
// and `DecisionMacro` followed. See `registry.ts` for why a renderer is a node
// view on `macro` rather than a node type of its own; none of that is
// re-litigated here.
//
// ## Why this one takes no options at all
//
// `HitlMacro` carries `onAnswered` because a callout has a second reader
// outside the document. `DecisionMacro` carries `decidedBy` because a status
// change without attribution is not a record. A field has neither: nothing
// polls it, and nobody is credited for typing a budget. `FIELD_QUERYABILITY`
// in `fieldText.ts` says that in the same place the HITL note says the
// opposite, and an options bag added "for symmetry" would be a seam with
// nothing on the other side of it.
//
// ## Every interaction is exactly one range
//
// Setting a value replaces the `value:` scalar. Clearing it deletes the
// `value:` LINE — because "unanswered" is the absence of the key, never a
// written `0` or `false` (`scalarValue.ts` earned that rule; `fieldText.ts`
// carries it forward). Renaming replaces the `label:` scalar. Changing the
// type replaces the `type:` scalar and deliberately leaves the value alone.
//
// Four interactions, four independent single-range edits, none of them a
// payload rewrite. Nothing here composes two edits, which is why — unlike
// `DecisionView.setStatus` — there is no ordering hazard to document.

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
    FIELD_MACRO_NAME,
    fieldMacroText,
    readTypedField,
    setFieldLabelEdit,
    setFieldTypeEdit,
    setFieldValueEdit,
    type FieldDraft,
    type FieldType,
    type TypedField,
} from './fieldText';
import type { TextRangeEdit } from './actionItemsText';
import { FieldBlock } from './FieldBlock';

declare module '@tiptap/core' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}

class FieldView extends ReactMacroView {
    private field: TypedField;

    constructor(ctx: MacroViewContext, field: TypedField) {
        super(ctx, FIELD_MACRO_NAME);
        this.field = field;
        this.schedule();
    }

    protected element() {
        return (
            <FieldBlock
                field={this.field}
                editable={this.editable}
                {...(this.editable
                    ? {
                        onValueChange: (v: string | undefined) =>
                            this.apply(setFieldValueEdit(this.node.textContent, v)),
                        onLabelChange: (l: string) =>
                            this.apply(setFieldLabelEdit(this.node.textContent, l)),
                        onTypeChange: (t: FieldType) =>
                            this.apply(setFieldTypeEdit(this.node.textContent, t)),
                        onRemove: () => this.removeBlock(),
                    }
                    : {})}
            />
        );
    }

    private apply(edit: TextRangeEdit | null): boolean {
        if (!edit) return false;
        return this.replaceText(edit.from, edit.to, edit.insert);
    }

    update(node: PmNode): boolean {
        if (node.type !== this.node.type) return false;
        if (node.attrs.macroName !== FIELD_MACRO_NAME) return false;
        // A body this view can no longer read hands the block back to
        // ProseMirror, which rebuilds it as the plain YAML fence. Drawing a
        // field from a payload we half-understood is the one outcome worse
        // than showing the bytes.
        //
        // Note this is NOT the invalid-value path: "next tuesday" under a date
        // field still READS, comes back flagged, and stays a live block. Only a
        // body whose SHAPE we cannot write back — an unknown type, a missing
        // label, a block scalar — falls through to the fence.
        const field = readTypedField(node.textContent);
        if (!field) return false;
        const changed = node.textContent !== this.node.textContent;
        this.node = node;
        this.field = field;
        if (changed) this.schedule();
        return true;
    }

    /** React owns this subtree. Its DOM churn is not a document edit. */
    ignoreMutation(): boolean {
        return true;
    }

    /** The controls own their own pointer and key events. */
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
export function fieldRenderer(): MacroRenderer {
    return {
        macroName: FIELD_MACRO_NAME,
        // Cheap, and it is the route BACK: a body this reader declines renders
        // as the YAML fence, and `accepts` is how the block returns the moment
        // somebody repairs it by hand. A fence HAS a contentDOM, so ProseMirror
        // updates it in place and never asks for a new view without this.
        accepts: (node) => readTypedField(node.textContent) !== null,
        create: (ctx: MacroViewContext) => {
            const field = readTypedField(ctx.node.textContent);
            return field ? new FieldView(ctx, field) : null;
        },
    };
}

export const FieldMacro = Extension.create({
    name: 'fieldMacro',

    addStorage: macroRendererStorage,

    addCommands() {
        return {
            insertField:
                (draft: FieldDraft) =>
                ({ state, commands }) => {
                    // Guard rather than assume: this extension can be
                    // registered without `MacroNode`, and inserting a node type
                    // the schema does not have throws inside the transaction.
                    if (!state.schema.nodes[MACRO_NODE_NAME]) return false;
                    if (!draft.label || draft.label.trim() === '') return false;
                    return commands.insertContent([
                        {
                            type: MACRO_NODE_NAME,
                            attrs: { macroName: FIELD_MACRO_NAME },
                            content: [{ type: 'text', text: fieldMacroText(draft) }],
                        },
                        // A landing spot for the caret: the macro node is
                        // `isolating`, so a block inserted at the end of a
                        // document would otherwise leave nowhere to keep
                        // writing. The chassis drops an empty trailing
                        // paragraph on normalise, so it never reaches the file.
                        { type: 'paragraph' },
                    ]);
                },
        };
    },

    addProseMirrorPlugins(): Plugin[] {
        return macroRendererPlugins(this.editor, this.name, fieldRenderer());
    },
});

export default FieldMacro;
