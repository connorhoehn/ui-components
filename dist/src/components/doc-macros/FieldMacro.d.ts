import { Extension } from '@tiptap/core';
import { type MacroRenderer } from './registry';
import { type FieldDraft } from './fieldText';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}
/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent.
 */
export declare function fieldRenderer(): MacroRenderer;
export declare const FieldMacro: Extension<any, import("./registry").MacroRendererStorage>;
export default FieldMacro;
//# sourceMappingURL=FieldMacro.d.ts.map