import { type EditorState, Plugin, PluginKey } from '@tiptap/pm/state';
export interface SuggestChangesState {
    enabled: boolean;
}
export declare const suggestChangesKey: PluginKey<SuggestChangesState>;
export declare function suggestChanges(initiallyEnabled?: boolean): Plugin<SuggestChangesState>;
export declare function isSuggestChangesEnabled(state: EditorState): boolean;
//# sourceMappingURL=plugin.d.ts.map