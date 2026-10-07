import { Extension } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import type { AwarenessLike } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import { type DiagramBlockUser } from './DiagramBlockRenderer';
import { type MacroRenderer, type MacroRendererStorage } from '../doc-macros/registry';
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
export declare const diagramMacroPluginKey: PluginKey<any>;
declare module '@tiptap/core' {
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
/**
 * The diagram renderer.
 *
 * Exported so a host can drop it straight into `MacroRenderers.configure({
 * renderers: [...] })` instead of registering this extension. The two are
 * equivalent; the extension additionally brings `insertDiagram`.
 */
export declare function diagramRenderer(options: DiagramMacroOptions): MacroRenderer;
export declare const DiagramMacro: Extension<DiagramMacroOptions, MacroRendererStorage>;
export default DiagramMacro;
//# sourceMappingURL=DiagramMacro.d.ts.map