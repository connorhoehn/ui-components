export interface InlineMessageEditorProps {
    initialText: string;
    /** Resolves once the server has the new text; rejects with a reason to show. */
    onSave: (text: string) => Promise<void> | void;
    onCancel: () => void;
    'data-testid'?: string;
}
export declare function InlineMessageEditor({ initialText, onSave, onCancel, 'data-testid': testId }: InlineMessageEditorProps): import("react").JSX.Element;
export default InlineMessageEditor;
//# sourceMappingURL=InlineMessageEditor.d.ts.map