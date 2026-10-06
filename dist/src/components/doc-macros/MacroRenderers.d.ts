import { Extension } from '@tiptap/core';
import { type MacroRenderer, type MacroRendererStorage } from './registry';
export interface MacroRenderersOptions {
    /** Renderers to register for this editor, in addition to any extension's. */
    renderers: MacroRenderer[];
}
export declare const MacroRenderers: Extension<MacroRenderersOptions, MacroRendererStorage>;
export default MacroRenderers;
//# sourceMappingURL=MacroRenderers.d.ts.map