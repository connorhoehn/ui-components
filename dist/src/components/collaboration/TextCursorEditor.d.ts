import { RemoteCursor, TextSelectionData } from '../../hooks/useCursors';
interface TextCursorEditorProps {
    cursors: Map<string, RemoteCursor>;
    localCursor?: RemoteCursor | null;
    onPositionChange: (position: number, selectionData: TextSelectionData | null, hasSelection: boolean) => void;
}
export declare function TextCursorEditor({ cursors, localCursor, onPositionChange }: TextCursorEditorProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=TextCursorEditor.d.ts.map