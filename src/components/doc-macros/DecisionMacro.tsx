// ui-components/src/components/doc-macros/DecisionMacro.tsx
//
// `macro:decision` — a recorded choice, drawn as a card in the page that
// argued for it.
//
// The third renderer registered through the macro registry, built to the shape
// `ActionItemsMacro` established and `HitlMacro` followed. See `registry.ts`
// for why a renderer is a node view on `macro` rather than a node type of its
// own; none of that is re-litigated here.
//
// ## Why this one needs no mirror, and HITL did
//
// `HitlMacro` carries a whole second machinery — `onAnswered`, a busy state, a
// retract-on-rejection path — because a callout blocks an AGENT, and the agent
// is polling a store that is not the document. Two stores, no shared
// transaction, so the mirror has to be authoritative and a failed write has to
// be taken back.
//
// A decision has exactly one reader: a person, in the document that explains
// it. Nothing polls it. So there is no mirror, no busy state and no retract —
// and adding them "for symmetry" would be inventing a consistency problem this
// block does not have. `DECISION_QUERYABILITY` in `decisionText.ts` states
// that in the same place the HITL note states the opposite.
//
// ## Status and attribution are two edits, deliberately
//
// Moving a decision to `accepted` writes one range over the `status:` scalar.
// Recording who did it writes another. They are dispatched together into one
// ProseMirror transaction — so undo takes back both — but they are composed,
// not fused, because a host with no identity to offer must still be able to
// change the status rather than being blocked on inventing a name.

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
    DECISION_MACRO_NAME,
    attributeDecisionEdit,
    decisionMacroText,
    readDecision,
    setDecisionStatusEdit,
    supersedeDecisionEdit,
    type Decision,
    type DecisionDraft,
    type DecisionStatus,
} from './decisionText';
import type { TextRangeEdit } from './actionItemsText';
import { DecisionBlock } from './DecisionBlock';

declare module '@tiptap/core' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}

export interface DecisionMacroOptions {
    /**
     * Who is changing the status, for `decidedBy`. A string or a getter,
     * because the signed-in user outlives no editor and a host should not have
     * to rebuild the extension when it changes.
     *
     * Omitted writes no attribution at all, which is the honest result of not
     * knowing — inventing `decidedBy: someone` would be worse.
     */
    decidedBy?: string | (() => string | undefined);
    /** The clock, for `decidedAt`. Defaults to `Date.now`. */
    now?: () => number;
}

function resolveIdentity(source: DecisionMacroOptions['decidedBy']): string {
    if (typeof source === 'function') return source() ?? '';
    return source ?? '';
}

/** `YYYY-MM-DD` on the viewer's clock — a decision is dated by day, not instant. */
function localDay(ms: number): string {
    const d = new Date(ms);
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

class DecisionView extends ReactMacroView {
    private decision: Decision;

    constructor(
        ctx: MacroViewContext,
        decision: Decision,
        private readonly options: DecisionMacroOptions,
    ) {
        super(ctx, DECISION_MACRO_NAME);
        this.decision = decision;
        this.name(decision);
        this.schedule();
    }

    /**
     * "Decision, accepted: use Postgres" — the group name a reader lands on.
     *
     * The bare macro label says "Decision" for all of them, which is no help
     * on a page holding four. Status leads the claim because it is the
     * question actually being asked of a decision record: is this still in
     * force? The visible card says the same thing in the same order.
     */
    private name(decision: Decision): void {
        this.setAccessibleName(`Decision, ${decision.status}: ${decision.decision}`);
    }

    protected element() {
        return (
            <DecisionBlock
                decision={this.decision}
                editable={this.editable}
                {...(this.editable ? { onStatusChange: (s: DecisionStatus) => this.setStatus(s) } : {})}
                {...(this.editable ? { onSupersededBy: (ref: string) => this.setSupersededBy(ref) } : {})}
                {...(this.editable ? { onRemove: () => this.removeBlock() } : {})}
            />
        );
    }

    private apply(edit: TextRangeEdit | null): boolean {
        if (!edit) return false;
        return this.replaceText(edit.from, edit.to, edit.insert);
    }

    /**
     * Move the decision, then attribute it.
     *
     * Sequential and not batched, because the second edit's offsets are
     * computed from the text the FIRST one produced — `attributeDecisionEdit`
     * reparses `this.node.textContent`, which `replaceText` has already
     * updated. Composing two independent range edits against the same
     * pre-edit body is how you get a corrupt payload.
     */
    private setStatus(status: DecisionStatus): void {
        if (!this.apply(setDecisionStatusEdit(this.node.textContent, status))) return;

        // Attribution follows the status and never leads it: a body that says
        // who decided but not what they decided is worse than one that says
        // neither.
        const by = resolveIdentity(this.options.decidedBy);
        if (by) this.apply(attributeDecisionEdit(this.node.textContent, { by }));
        this.apply(attributeDecisionEdit(this.node.textContent, {
            at: localDay(this.options.now?.() ?? Date.now()),
        }));
    }

    private setSupersededBy(ref: string): void {
        this.apply(supersedeDecisionEdit(this.node.textContent, ref));
    }

    update(node: PmNode): boolean {
        if (node.type !== this.node.type) return false;
        if (node.attrs.macroName !== DECISION_MACRO_NAME) return false;
        // A body this view can no longer read hands the block back to
        // ProseMirror, which rebuilds it as the plain YAML fence. Drawing a
        // card from a payload we half-understood is the one outcome worse than
        // showing the bytes.
        const decision = readDecision(node.textContent);
        if (!decision) return false;
        const changed = node.textContent !== this.node.textContent;
        this.node = node;
        this.decision = decision;
        if (changed) { this.name(decision); this.schedule(); }
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
 * instead of adding the extension — the two are equivalent, and the options
 * are the same either way.
 */
export function decisionRenderer(options: DecisionMacroOptions = {}): MacroRenderer {
    return {
        macroName: DECISION_MACRO_NAME,
        // Cheap, and it is the route BACK: a body this reader declines renders
        // as the YAML fence, and `accepts` is how the card returns the moment
        // somebody repairs it by hand. A fence HAS a contentDOM, so ProseMirror
        // updates it in place and never asks for a new view without this.
        accepts: (node) => readDecision(node.textContent) !== null,
        create: (ctx: MacroViewContext) => {
            const decision = readDecision(ctx.node.textContent);
            return decision ? new DecisionView(ctx, decision, options) : null;
        },
    };
}

export const DecisionMacro = Extension.create<DecisionMacroOptions>({
    name: 'decisionMacro',

    addOptions() {
        return {};
    },

    addStorage: macroRendererStorage,

    addCommands() {
        return {
            insertDecision:
                (draft: DecisionDraft) =>
                ({ state, commands }) => {
                    // Guard rather than assume: this extension can be
                    // registered without `MacroNode`, and inserting a node type
                    // the schema does not have throws inside the transaction.
                    if (!state.schema.nodes[MACRO_NODE_NAME]) return false;
                    if (!draft.decision) return false;
                    return commands.insertContent([
                        {
                            type: MACRO_NODE_NAME,
                            attrs: { macroName: DECISION_MACRO_NAME },
                            content: [{ type: 'text', text: decisionMacroText(draft) }],
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
        return macroRendererPlugins(this.editor, this.name, decisionRenderer(this.options));
    },
});

export default DecisionMacro;
