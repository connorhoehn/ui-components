import type { AwarenessLike } from '@connorhoehn/realtime-modules/adapters/excalidraw';
/** Local identity, as the diagram's awareness pointers should label it. */
export interface DiagramBlockUser {
    name: string;
    color: string;
    userId?: string;
}
export interface DiagramBlockProps {
    /**
     * The diagram's id — the reference the macro body carries.
     *
     * `null` means the macro's YAML no longer says anything readable (a CRDT
     * merge of two concurrent rewrites can do that). The block then shows the
     * source instead of inventing an id, because inventing one would silently
     * start a SECOND, empty diagram and lose the first.
     */
    diagramId: string | null;
    /** The macro's literal body, shown when `diagramId` is null. */
    source?: string;
    /** The page's shared document. Null when the page is not connected. */
    ydoc: unknown;
    /** Awareness from the provider that owns `ydoc`, for live pointers. */
    awareness?: AwarenessLike | null;
    /**
     * False renders Excalidraw in view mode AND drops every local write — see
     * `ExcalidrawCanvas`. It is not a toolbar toggle.
     */
    editable?: boolean;
    user: DiagramBlockUser;
    /** Where Excalidraw loads its fonts from, e.g. `/excalidraw-assets/`. */
    assetPath?: string;
    /**
     * Removes the whole block from the page.
     *
     * Its absence is what makes the block read-only-shaped: with no contentDOM
     * the node view swallows its own events, so a click cannot select the node
     * and a backspace cannot reach it. An embedded object a reader can never
     * delete is a bug, so the editing host passes this and the header renders
     * the one affordance that removes it.
     */
    onRemove?: () => void;
    'data-testid'?: string;
}
export default function DiagramBlockRenderer({ diagramId, source, ydoc, awareness, editable, user, assetPath, onRemove, 'data-testid': testId, }: DiagramBlockProps): import("react").JSX.Element;
//# sourceMappingURL=DiagramBlockRenderer.d.ts.map