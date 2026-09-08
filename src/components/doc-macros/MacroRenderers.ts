// ui-components/src/components/doc-macros/MacroRenderers.ts
//
// The explicit host for the `macro` node view.
//
// Optional. `DiagramMacro` and `ActionItemsMacro` each host the node view on
// their own when nothing else declares it, so an editor that registers one or
// both of them needs nothing from this file — which is what keeps an app pinned
// to an older SHA working unchanged.
//
// Register it when you want either of two things:
//
//  1. **A renderer without an extension.** `MacroRenderers.configure({
//     renderers: [myRenderer()] })` is the whole registration.
//  2. **A guaranteed host.** When this extension is present it always hosts, so
//     the node view no longer depends on which macro extension happens to come
//     first in the list. That matters the day an editor is assembled from
//     plugins it does not control.
//
// See `registry.ts` for the election rule and why exactly one host is allowed.

import { Extension } from '@tiptap/core';
import type { Plugin } from '@tiptap/pm/state';
import {
    MACRO_RENDERERS_NAME,
    macroRendererPlugins,
    macroRendererStorage,
    type MacroRenderer,
    type MacroRendererStorage,
} from './registry';

export interface MacroRenderersOptions {
    /** Renderers to register for this editor, in addition to any extension's. */
    renderers: MacroRenderer[];
}

export const MacroRenderers = Extension.create<MacroRenderersOptions, MacroRendererStorage>({
    name: MACRO_RENDERERS_NAME,

    addOptions() {
        return { renderers: [] };
    },

    addStorage: macroRendererStorage,

    addProseMirrorPlugins(): Plugin[] {
        return macroRendererPlugins(this.editor, this.name, ...this.options.renderers);
    },
});

export default MacroRenderers;
