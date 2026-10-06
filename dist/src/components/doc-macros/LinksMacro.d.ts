import { Extension } from '@tiptap/core';
import { type MacroRenderer } from './registry';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}
/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent.
 */
export declare function linksRenderer(): MacroRenderer;
export declare const LinksMacro: Extension<any, import("./registry").MacroRendererStorage>;
export default LinksMacro;
//# sourceMappingURL=LinksMacro.d.ts.map