// ui-components/src/components/doc-macros/registry.ts
//
// One node view on `macro`, dispatching by macro NAME.
//
// ## The problem this solves
//
// `DiagramMacro` shipped first and owned the `macro` node view outright: its
// ProseMirror plugin carried `props.nodeViews.macro`, drew a diagram when
// `macroName === 'diagram'`, and reproduced the default `<pre><code>` for
// everything else. That works exactly once. A second renderer registered the
// same way is a second plugin claiming the same node name — ProseMirror keeps
// only one `nodeViews[name]` (the last plugin wins), so whichever extension
// happened to sort later would silently blank the other's blocks. Not an
// error, not a warning: a page where half the tools stopped drawing.
//
// So the node view moves here, once, and renderers register into a registry it
// consults. `DiagramMacro` becomes a registrant like any other.
//
// ## Why the rest of the original design is kept exactly as it was
//
// Everything `DiagramMacro.tsx`'s header argues for still holds and is not
// re-litigated here — read it, it is the design document for this file too.
// In short:
//
//   * **A renderer is a node view on `macro`, never a node type of its own.**
//     A dedicated node type makes `Node.fromJSON` THROW on a client without
//     the extension, blanking the page, instead of degrading to a YAML fence.
//     That degradation is the format's central promise.
//   * **The node view is a hand-built ProseMirror plugin**, not
//     `ReactNodeViewRenderer`. Tiptap's React renderer is bound to
//     `addNodeView`, which the extension manager reads only off the extension
//     whose NAME matches the node — using it would mean `MacroNode.extend(…)`,
//     i.e. importing realtime-modules' Tiptap canvas adapter and dragging a
//     second `prosemirror-*` graph into this entry. `props.nodeViews` is keyed
//     by node NAME rather than extension name, so it needs nothing from
//     realtime-modules.
//   * **A node view on `macro` sees EVERY macro**, so unknown names must fall
//     through to `plainMacroView` untouched.
//
// ## How hosting is decided
//
// Exactly one extension per editor may contribute the plugin, or ProseMirror
// gets two `nodeViews.macro` entries again. Rather than have callers remember
// an ordering rule, every macro extension declares `addStorage:
// macroRendererStorage` and asks `macroRendererPlugins()` whether it is the
// host. The answer is derived, not claimed:
//
//   1. If `MacroRenderers` is in the extension list, it hosts. A host that is
//      explicitly registered is always the one the author meant.
//   2. Otherwise the first declaring extension in `extensionManager.extensions`
//      order hosts.
//
// This is why an app that registers ONLY `DiagramMacro` — which is every app
// pinned to a SHA older than this file — keeps working with no change at all:
// DiagramMacro is then the only declarer, so it hosts, and the registry it
// consults contains only its own renderer.
//
// Storage is safe to read at this point: `ExtensionManager`'s constructor runs
// `setupExtensions()` (which fills `editor.extensionStorage` for ALL
// extensions) before anything reads the `plugins` getter that calls
// `addProseMirrorPlugins`.
//
// ## Why the registry is keyed on the extension manager
//
// An editor rebuilds its extension manager (`editor.setOptions`,
// `registerPlugin`) on the SAME editor object, and every extension's
// `addProseMirrorPlugins` runs again on the new one. Keying on the editor would
// accumulate renderers from dead builds and leave a host election decided by a
// manager that no longer exists; keying on the manager makes each rebuild start
// from an empty registry that the same pass refills.
//
// Registration order does not matter. The plugin reads the registry lazily, at
// node-view construction time, which is after the whole plugin list is
// assembled and every extension has registered.

import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { Node as PmNode } from '@tiptap/pm/model';
import type { EditorView, NodeView } from '@tiptap/pm/view';
import { plainMacroView } from './plainMacroView';

/**
 * The ProseMirror node name a macro occupies.
 *
 * Duplicated from realtime-modules' `MACRO_NODE_NAME` rather than imported, for
 * the reason the file header gives: importing it pulls the Tiptap canvas
 * adapter and a second `prosemirror-*` graph. `'macro'` is a wire constant on
 * the same footing as the `data-macro` attribute.
 */
export const MACRO_NODE_NAME = 'macro';

/** The extension name that, when present, is always the node-view host. */
export const MACRO_RENDERERS_NAME = 'macroRenderers';

/** The single `macro` node-view plugin's key. */
export const macroRenderersPluginKey = new PluginKey(MACRO_RENDERERS_NAME);

// ---------------------------------------------------------------------------
// What a renderer is
// ---------------------------------------------------------------------------

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

export function createMacroRendererRegistry(
    renderers: readonly MacroRenderer[] = [],
): MacroRendererRegistry {
    const byName = new Map<string, MacroRenderer>();
    for (const r of renderers) byName.set(r.macroName, r);
    return {
        register(renderer) {
            byName.set(renderer.macroName, renderer);
        },
        get(macroName) {
            return byName.get(macroName);
        },
        names() {
            return [...byName.keys()];
        },
    };
}

// ---------------------------------------------------------------------------
// Per-editor plumbing
// ---------------------------------------------------------------------------

/**
 * The shape an extension puts in `addStorage` to declare itself a macro
 * renderer. Read during host election, before any plugin is built.
 */
export interface MacroRendererStorage {
    macroRenderer: true;
    [key: string]: unknown;
}

/** `addStorage: macroRendererStorage` — that is the whole declaration. */
export function macroRendererStorage(): MacroRendererStorage {
    return { macroRenderer: true };
}

/**
 * The minimum of a Tiptap editor this module touches.
 *
 * Structural rather than `import type { Editor }` so that a test can drive the
 * election with a stub, and so this file takes no value dependency on
 * `@tiptap/core`.
 */
export interface MacroEditorLike {
    extensionManager?: { extensions?: { name: string }[] } | null;
    // `unknown` rather than `Record<string, unknown>`: Tiptap types
    // `Editor.extensionStorage` as its own augmentable `Storage` interface,
    // which has no index signature, so the narrower shape would refuse a real
    // editor. Narrowed at the one place it is read.
    extensionStorage?: unknown;
}

const registries = new WeakMap<object, MacroRendererRegistry>();

/**
 * The registry for this editor's CURRENT extension manager.
 *
 * Exported so a host can inspect what will draw (`names()`), and so a renderer
 * can be added from outside an extension. Registering after the editor is
 * built takes effect on the next paint of that macro, not retroactively —
 * ProseMirror does not rebuild node views that already exist.
 */
export function macroRenderersFor(editor: MacroEditorLike): MacroRendererRegistry {
    // Falls back to the editor itself when there is no manager (a stub, or an
    // editor mid-construction) so the lookup is always well defined.
    const key = (editor.extensionManager ?? editor) as object;
    let registry = registries.get(key);
    if (!registry) {
        registry = createMacroRendererRegistry();
        registries.set(key, registry);
    }
    return registry;
}

/**
 * Whether `extensionName` is the one extension that contributes the node view.
 *
 * See the file header: `MacroRenderers` if present, otherwise the first
 * declaring extension. Derived on every call from state that is already
 * settled, so it needs no bookkeeping and survives an extension-manager
 * rebuild.
 */
export function hostsMacroNodeViews(editor: MacroEditorLike, extensionName: string): boolean {
    const extensions = editor.extensionManager?.extensions ?? [];
    const storage = (editor.extensionStorage ?? {}) as Record<string, MacroRendererStorage | undefined>;
    const declaring = extensions.map((e) => e.name).filter((name) => storage[name]?.macroRenderer);
    if (declaring.includes(MACRO_RENDERERS_NAME)) return extensionName === MACRO_RENDERERS_NAME;
    // No explicit host: the first declarer takes it. `declaring[0]` is
    // undefined only when the caller did not declare `macroRendererStorage`,
    // and an extension that forgot to declare should still draw rather than
    // silently render nothing — so it hosts.
    return declaring.length === 0 || declaring[0] === extensionName;
}

// ---------------------------------------------------------------------------
// The one node view
// ---------------------------------------------------------------------------

/**
 * The plugin carrying `props.nodeViews.macro`.
 *
 * Built at most once per editor — call it through `macroRendererPlugins`
 * rather than directly, unless you are hand-wiring an editor with no macro
 * extensions at all.
 */
/**
 * The YAML fence, plus the one thing it needs when a renderer exists but
 * declined this payload: a way back.
 *
 * A plain fence has a `contentDOM`, so ProseMirror's default `update` syncs it
 * in place and never rebuilds the view. Left alone, a user repairing broken
 * YAML by hand would type the block back into shape and watch nothing happen.
 * `accepts` turns each keystroke into a re-check, and the first one that parses
 * returns `false` — which is ProseMirror's signal to throw this view away and
 * ask the plugin for a new one.
 */
function fallbackView(node: PmNode, renderer: MacroRenderer | undefined): MacroNodeView {
    const nodeView = plainMacroView(node) as MacroNodeView;
    const accepts = renderer?.accepts;
    if (!accepts) return nodeView;
    let current = node;
    nodeView.update = (updated) => {
        if (updated.type !== current.type) return false;
        if (updated.attrs.macroName !== current.attrs.macroName) return false;
        if (accepts.call(renderer, updated)) return false;
        current = updated;
        return true;
    };
    return nodeView;
}

export function macroNodeViewPlugin(registry: MacroRendererRegistry): Plugin {
    const live = new Set<MacroNodeView>();

    return new Plugin({
        key: macroRenderersPluginKey,
        props: {
            nodeViews: {
                [MACRO_NODE_NAME]: (node, view, getPos) => {
                    const macroName = String(node.attrs.macroName ?? 'unknown');
                    const renderer = registry.get(macroName);
                    if (!renderer) return plainMacroView(node);

                    const nodeView =
                        (renderer.accepts?.(node) ?? true)
                            ? renderer.create({ node, view, getPos })
                            : null;
                    // A renderer that declined this payload gets the fence, not
                    // an empty block: the bytes are the honest answer.
                    if (!nodeView) return fallbackView(node, renderer);

                    live.add(nodeView);
                    const destroy = nodeView.destroy?.bind(nodeView);
                    nodeView.destroy = () => {
                        live.delete(nodeView);
                        destroy?.();
                    };
                    return nodeView;
                },
            },
        },
        // The editable broadcast. `EditorView.setProps` runs plugin views on
        // every update, which is the only hook that fires when a host flips
        // `editable` without touching the document. Every renderer gets this,
        // not just the diagram: a checklist inside a locked page must stop
        // being tickable the moment the page locks.
        view: (editorView) => {
            let editable = editorView.editable;
            return {
                update: (updated) => {
                    if (updated.editable === editable) return;
                    editable = updated.editable;
                    live.forEach((v) => v.refresh?.());
                },
            };
        },
    });
}

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
export function macroRendererPlugins(
    editor: MacroEditorLike,
    extensionName: string,
    ...renderers: readonly MacroRenderer[]
): Plugin[] {
    const registry = macroRenderersFor(editor);
    for (const renderer of renderers) registry.register(renderer);
    return hostsMacroNodeViews(editor, extensionName) ? [macroNodeViewPlugin(registry)] : [];
}
