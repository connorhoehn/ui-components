import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { Node as PmNode } from '@tiptap/pm/model';
import type { EditorView, NodeView } from '@tiptap/pm/view';
/**
 * The ProseMirror node name a macro occupies.
 *
 * Duplicated from realtime-modules' `MACRO_NODE_NAME` rather than imported, for
 * the reason the file header gives: importing it pulls the Tiptap canvas
 * adapter and a second `prosemirror-*` graph. `'macro'` is a wire constant on
 * the same footing as the `data-macro` attribute.
 */
export declare const MACRO_NODE_NAME = "macro";
/** The extension name that, when present, is always the node-view host. */
export declare const MACRO_RENDERERS_NAME = "macroRenderers";
/** The single `macro` node-view plugin's key. */
export declare const macroRenderersPluginKey: PluginKey<any>;
/** Everything a macro node view is built from. */
export interface MacroViewContext {
    /** The macro node itself. Its `textContent` is the literal YAML body. */
    node: PmNode;
    view: EditorView;
    /** Position of the macro node, as ProseMirror hands it to a node view. */
    getPos: () => number | undefined;
}
/**
 * A ProseMirror node view that also wants to hear about `editable` flips.
 *
 * `refresh` is optional and is called by the host plugin's plugin view when
 * `EditorView.editable` changes without a document change — the only hook that
 * fires then. Reading `editable` once at construction would leave an editable
 * block sitting inside a page that had just been locked.
 */
export interface MacroNodeView extends NodeView {
    refresh?(): void;
}
/** Draws one macro name. */
export interface MacroRenderer {
    /** The `macro:<name>` discriminator this draws, e.g. `'action-items'`. */
    readonly macroName: string;
    /**
     * Whether this renderer can draw this node's payload. Optional; a renderer
     * that omits it is asked to draw every macro carrying its name.
     *
     * Declare it whenever `create` can decline (return `null`), because it is
     * the only way BACK. A declined block renders as the plain YAML fence, and
     * a fence keeps a `contentDOM` — so ProseMirror updates it in place on
     * every keystroke and never rebuilds it, which means the user fixing the
     * broken YAML by hand would never see their block come back. With `accepts`
     * the fence returns `false` from its own `update` the moment the payload
     * parses again, and the renderer gets another chance.
     *
     * Must be cheap: it runs on every transaction that touches the node. A line
     * scan is the right order of magnitude.
     */
    accepts?(node: PmNode): boolean;
    /**
     * Builds the node view.
     *
     * Returning `null` falls back to the plain YAML fence. That is a real
     * answer, not a failure path: a renderer whose payload arrived as merge
     * damage should show the user the bytes rather than invent a block — the
     * same judgement `readDiagramId` makes when it refuses to guess an id.
     */
    create(ctx: MacroViewContext): MacroNodeView | null;
}
/** Where renderers are looked up by macro name. */
export interface MacroRendererRegistry {
    /** Adds a renderer. A later registration for the same name replaces it. */
    register(renderer: MacroRenderer): void;
    get(macroName: string): MacroRenderer | undefined;
    /** The macro names that currently have a renderer. */
    names(): string[];
}
export declare function createMacroRendererRegistry(renderers?: readonly MacroRenderer[]): MacroRendererRegistry;
/**
 * The shape an extension puts in `addStorage` to declare itself a macro
 * renderer. Read during host election, before any plugin is built.
 */
export interface MacroRendererStorage {
    macroRenderer: true;
    [key: string]: unknown;
}
/** `addStorage: macroRendererStorage` — that is the whole declaration. */
export declare function macroRendererStorage(): MacroRendererStorage;
/**
 * The minimum of a Tiptap editor this module touches.
 *
 * Structural rather than `import type { Editor }` so that a test can drive the
 * election with a stub, and so this file takes no value dependency on
 * `@tiptap/core`.
 */
export interface MacroEditorLike {
    extensionManager?: {
        extensions?: {
            name: string;
        }[];
    } | null;
    extensionStorage?: unknown;
}
/**
 * The registry for this editor's CURRENT extension manager.
 *
 * Exported so a host can inspect what will draw (`names()`), and so a renderer
 * can be added from outside an extension. Registering after the editor is
 * built takes effect on the next paint of that macro, not retroactively —
 * ProseMirror does not rebuild node views that already exist.
 */
export declare function macroRenderersFor(editor: MacroEditorLike): MacroRendererRegistry;
/**
 * Whether `extensionName` is the one extension that contributes the node view.
 *
 * See the file header: `MacroRenderers` if present, otherwise the first
 * declaring extension. Derived on every call from state that is already
 * settled, so it needs no bookkeeping and survives an extension-manager
 * rebuild.
 */
export declare function hostsMacroNodeViews(editor: MacroEditorLike, extensionName: string): boolean;
/**
 * Repaints every macro block in an editor.
 *
 * A node view only redraws when its own TEXT changes, which is right for a
 * payload and wrong for everything a renderer reads from OUTSIDE the document
 * — a roster, a clock, the signed-in user. Those arrive after the editor is
 * built and change while it is open, and without this a control that depends
 * on one (the action-item assignee picker is the first) never appears until
 * somebody happens to edit that block.
 *
 * Returns false when this editor has no macro renderers at all, so a caller
 * can tell "nothing to repaint" from "repainted nothing".
 */
export declare function refreshMacroViews(view: EditorView): boolean;
export declare function macroNodeViewPlugin(registry: MacroRendererRegistry): Plugin;
/**
 * What a macro extension returns from `addProseMirrorPlugins`.
 *
 * Registers `renderer` for this editor and contributes the shared node view
 * plugin if — and only if — this extension is the elected host.
 *
 * A whole new macro tool is this, plus the renderer:
 *
 * ```ts
 * export const HitlMacro = Extension.create({
 *     name: 'hitlMacro',
 *     addStorage: macroRendererStorage,
 *     addProseMirrorPlugins() {
 *         return macroRendererPlugins(this.editor, this.name, hitlRenderer());
 *     },
 * });
 * ```
 */
export declare function macroRendererPlugins(editor: MacroEditorLike, extensionName: string, ...renderers: readonly MacroRenderer[]): Plugin[];
/** The accessible name for a macro block's `role="group"`. */
export declare function macroGroupLabel(macroName: string): string;
//# sourceMappingURL=registry.d.ts.map