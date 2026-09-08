// ui-components/src/components/diagram/DiagramMacro.tsx
//
// The canvas extension that makes a `macro:diagram` fence draw a diagram.
//
// ## Why a node view on `macro`, and not a `diagram` node of its own
//
// `schema/callout.ts` in realtime-modules sets the precedent for the other
// answer: a callout is its own ProseMirror node, and `pmModel.ts` maps it to
// and from a macro marker. That would have worked here too, and it was
// rejected for one reason.
//
// MACRO-MARKDOWN.md calls this the single most important property of a shared
// document format: *an unknown macro is preserved verbatim rather than
// dropped.* A dedicated `diagram` node breaks it. `docModelToPm` would emit a
// node type that a client without this extension has no schema entry for, and
// `Node.fromJSON` does not degrade — it throws, and the page a user opened
// blanks into an error boundary. Keeping the diagram as an ordinary `macro`
// node means a client that lacks this file shows the YAML fence, which is
// exactly what the format promises, and it means `pmModel.ts` needed no change
// at all: the macro round trip already carried this block before the renderer
// existed.
//
// The cost is that a node view registered on `macro` sees EVERY macro, so it
// has to reproduce the default `<pre><code>` rendering for the ones it does not
// draw. That is `plainMacroView`, a faithful copy of `MacroNode.renderHTML`.
//
// ## Why the node view no longer lives in this file
//
// It used to. This extension carried `props.nodeViews.macro` itself, drew a
// diagram when `macroName === 'diagram'`, and fell back to `plainMacroView` for
// everything else. That works for exactly one renderer: a second extension
// registering the same way is a second plugin claiming the same node name, and
// ProseMirror keeps only the last `nodeViews[macro]` it is given — so whichever
// extension happened to sort later would silently blank the other's blocks. No
// error, no warning, just a page where half the tools stopped drawing.
//
// So the node view moved to `../doc-macros/registry.ts`, which owns the one
// `macro` node view for the whole editor and dispatches it by macro NAME. This
// file now contributes a `MacroRenderer` like any other tool. Nothing about the
// two arguments above changed — read `registry.ts`'s header, it carries them
// forward verbatim, and `ActionItemsMacro.tsx` is what a second renderer looks
// like.
//
// An editor that registers ONLY this extension is unaffected: with no other
// declared renderer, `macroRendererPlugins` elects this one the host and the
// plugin it returns is the same plugin, built from a registry holding only the
// diagram.
//
// ## Why the node view is hand-built rather than `ReactNodeViewRenderer`
//
// Tiptap's React renderer is bound to `addNodeView`, which the extension
// manager only reads off the extension whose NAME matches the node — so using
// it would mean `MacroNode.extend(...)`, and that means importing the Tiptap
// canvas adapter from this package. That import drags a second `prosemirror-*`
// graph into `./diagram`, which is the exact hazard the consuming app's
// `optimizeDeps.exclude` list exists to prevent. A ProseMirror plugin carrying
// `props.nodeViews` is keyed by node NAME rather than by extension name, so it
// needs nothing from realtime-modules and stays on the app's single
// ProseMirror.
//
// Tiptap's renderer would also have fought us on content: it falls back to
// making the WHOLE node view its `contentDOM` when it finds no
// `[data-node-view-content]`, which would render the YAML on top of the canvas.
//
// ## Read-only
//
// Three places, because one is not enough:
//
//   1. `editable=false` puts Excalidraw in `viewModeEnabled` — no toolbar, no
//      tools, no drag handles. That is Excalidraw's own read-only rendering.
//   2. `ExcalidrawCanvas.handleChange` returns early when not editable, so
//      even a synthetic change never reaches `commitLocal` and therefore never
//      reaches the Y.Doc.
//   3. The block's Remove button is not rendered, so the block itself cannot
//      be taken off the page.
//
// The flag is read from the LIVE `EditorView.editable` and re-broadcast when it
// changes (the plugin view in `registry.ts`, which now does this for every
// renderer rather than only for diagrams), so flipping a document to read-only
// mid-session reaches a diagram that is already on screen. Reading it once at
// construction would have left an editable canvas sitting inside a page that
// had just been locked.

import { createElement } from 'react';
import { Extension } from '@tiptap/core';
import { PluginKey, type Plugin } from '@tiptap/pm/state';
import type { Node as PmNode } from '@tiptap/pm/model';
import type { AwarenessLike } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import DiagramBlockRenderer, { type DiagramBlockUser } from './DiagramBlockRenderer';
import { ReactMacroView } from '../doc-macros/ReactMacroView';
import {
    macroRendererPlugins,
    macroRendererStorage,
    type MacroRenderer,
    type MacroRendererStorage,
    type MacroViewContext,
} from '../doc-macros/registry';
import {
    DIAGRAM_MACRO_NAME,
    MACRO_NODE_NAME,
    diagramMacroText,
    newDiagramId,
    readDiagramId,
} from './macro';

/**
 * Everything a diagram block needs that the document does not carry.
 *
 * Supplied through a GETTER rather than as plain options, for the reason
 * `CommentHighlight` documents: ProseMirror builds its plugin list once at
 * editor construction, so a value baked in here would be the one captured on
 * the first render and consulted forever. The host holds these in a ref and the
 * node view asks for them at paint time.
 */
export interface DiagramMacroContext {
    /** The page's Y.Doc — the same one Collaboration is bound to. */
    ydoc: unknown;
    /** Awareness from the provider that owns `ydoc`. */
    awareness?: AwarenessLike | null;
    user: DiagramBlockUser;
    /** Where Excalidraw loads its fonts from, e.g. `/excalidraw-assets/`. */
    assetPath?: string;
}

export interface DiagramMacroOptions {
    getContext: () => DiagramMacroContext | null;
}

/**
 * @deprecated The `macro` node view is now the registry's single plugin, keyed
 * by `macroRenderersPluginKey`. This key no longer belongs to any plugin and is
 * kept only so a pinned consumer that imports it keeps compiling.
 */
export const diagramMacroPluginKey = new PluginKey('diagramMacro');

declare module '@tiptap/core' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}

// ---------------------------------------------------------------------------
// The diagram node view
// ---------------------------------------------------------------------------

class DiagramMacroView extends ReactMacroView {
    // Deliberately NO contentDOM. The macro's text is `id: <uuid>` — a
    // reference, not prose — and rendering it beside the canvas would put an
    // editable YAML line inside the user's picture. With no contentDOM,
    // ProseMirror treats the block as opaque, which is why `ignoreMutation` and
    // `stopEvent` below are mandatory rather than optional: without them,
    // Excalidraw's own DOM churn reads to ProseMirror as the user editing the
    // document.
    //
    // `dom`, the React root, the microtask paint and the deferred unmount all
    // come from `ReactMacroView` — read that file for why none of the four is
    // optional. What is left here is the part that is actually about diagrams.

    /**
     * Whether THIS block is the one being worked on.
     *
     * A diagram in a document is a picture until someone engages with it. It
     * used to take its editability straight from the document's, so every
     * diagram on the page mounted a full Excalidraw editor — measured on a
     * real document: 36 diagram nodes, each with its own toolbar, palette and
     * top bar rendered into the page. Excalidraw's chrome ends up in the
     * document's own structure that way (twelve "Shapes" headings, in that
     * document's outline), and the reader is handed a drawing application
     * where they expected a drawing.
     *
     * Click to work on one, click away or press Escape to put it down.
     *
     * Deliberately NOT promoted to `ReactMacroView`. It pays for a cost only
     * Excalidraw has; a checklist is cheap and should be tickable on sight, and
     * making every macro demand a click first would be ceremony borrowed from
     * someone else's problem.
     */
    private active = false;

    private onDocumentPointerDown = (event: Event): void => {
        if (!this.active) return;
        const target = event.target as Node | null;
        if (target && this.dom.contains(target)) return;
        this.setActive(false);
    };

    private onDocumentKeyDown = (event: KeyboardEvent): void => {
        if (this.active && event.key === 'Escape') this.setActive(false);
    };

    private setActive(next: boolean): void {
        if (this.active === next) return;
        this.active = next;
        this.dom.setAttribute('data-diagram-active', String(next));
        this.schedule();
    }

    constructor(
        ctx: MacroViewContext,
        private options: DiagramMacroOptions,
    ) {
        super(ctx, DIAGRAM_MACRO_NAME);
        this.dom.setAttribute('data-diagram-active', 'false');

        // `stopEvent` keeps ProseMirror out of this subtree, which also means
        // it can never make a NodeSelection here — so activation cannot ride on
        // selection and is handled directly.
        this.dom.addEventListener('mousedown', () => {
            if (this.editable) this.setActive(true);
        });
        document.addEventListener('mousedown', this.onDocumentPointerDown, true);
        document.addEventListener('keydown', this.onDocumentKeyDown, true);

        this.schedule();
    }

    protected element() {
        const ctx = this.options.getContext();
        const source = this.node.textContent;
        return createElement(DiagramBlockRenderer, {
            diagramId: readDiagramId(source),
            source,
            ydoc: ctx?.ydoc ?? null,
            awareness: ctx?.awareness ?? null,
            // The document being editable is permission; this block being
            // active is intent. Both, or it renders as a picture.
            editable: this.editable && this.active,
            user: ctx?.user ?? { name: 'Anonymous', color: '#3b82f6' },
            ...(ctx?.assetPath ? { assetPath: ctx.assetPath } : {}),
            ...(this.editable && this.active ? { onRemove: () => this.removeBlock() } : {}),
        });
    }

    // `removeBlock` (from the base class) is how the block leaves the page, and
    // the Remove button is the only gesture that reaches it: with no contentDOM
    // and `stopEvent` swallowing clicks, ProseMirror can never make a
    // NodeSelection here, so neither a click nor a backspace can delete this
    // block.

    update(node: PmNode): boolean {
        // A macro that stopped being a diagram is a different block; returning
        // false makes ProseMirror throw this view away and build the right one.
        if (node.type !== this.node.type) return false;
        if (node.attrs.macroName !== DIAGRAM_MACRO_NAME) return false;
        const changed = node.textContent !== this.node.textContent;
        this.node = node;
        // Re-render on a text change only. A CRDT merge can rewrite the id, and
        // the canvas must then follow it to the other diagram's elements rather
        // than keep drawing the old one.
        if (changed) this.schedule();
        return true;
    }

    /** Excalidraw's canvas is not the document. Its DOM churn is not an edit. */
    ignoreMutation(): boolean {
        return true;
    }

    /** Excalidraw owns every pointer and key event inside its own canvas. */
    stopEvent(): boolean {
        return true;
    }

    destroy(): void {
        document.removeEventListener('mousedown', this.onDocumentPointerDown, true);
        document.removeEventListener('keydown', this.onDocumentKeyDown, true);
        super.destroy();
    }
}

/**
 * The diagram renderer.
 *
 * Exported so a host can drop it straight into `MacroRenderers.configure({
 * renderers: [...] })` instead of registering this extension. The two are
 * equivalent; the extension additionally brings `insertDiagram`.
 */
export function diagramRenderer(options: DiagramMacroOptions): MacroRenderer {
    return {
        macroName: DIAGRAM_MACRO_NAME,
        create: (ctx: MacroViewContext) => new DiagramMacroView(ctx, options),
    };
}


// ---------------------------------------------------------------------------
// The extension
// ---------------------------------------------------------------------------

export const DiagramMacro = Extension.create<DiagramMacroOptions, MacroRendererStorage>({
    name: 'diagramMacro',

    addOptions() {
        return { getContext: () => null };
    },

    addCommands() {
        return {
            insertDiagram:
                (id?: string) =>
                ({ state, commands }) => {
                    // Guard rather than assume: this extension can be
                    // registered without `MacroNode`, and inserting a node type
                    // the schema does not have throws inside the transaction.
                    if (!state.schema.nodes[MACRO_NODE_NAME]) return false;
                    return commands.insertContent([
                        {
                            type: MACRO_NODE_NAME,
                            attrs: { macroName: DIAGRAM_MACRO_NAME },
                            content: [{ type: 'text', text: diagramMacroText(id ?? newDiagramId()) }],
                        },
                        // A landing spot for the caret. The macro node is
                        // `isolating`, so a diagram inserted at the end of a
                        // document would otherwise leave nowhere to keep
                        // writing. The chassis drops an empty paragraph on
                        // normalise, so this never reaches the exported file.
                        { type: 'paragraph' },
                    ]);
                },
        };
    },

    addStorage: macroRendererStorage,

    addProseMirrorPlugins(): Plugin[] {
        // One line, and it is the whole registration: the diagram's renderer
        // goes into this editor's registry, and the shared `macro` node view
        // comes back only if no other extension is already hosting it. See
        // `../doc-macros/registry.ts`.
        return macroRendererPlugins(this.editor, this.name, diagramRenderer(this.options));
    },
});

export default DiagramMacro;
