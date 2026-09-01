import type * as Y from 'yjs';
import { type CanvasUnsupportedForm } from '../../components/doc-editor/CanvasDocumentView';
import type { CanvasDocumentViewProps } from '../../components/doc-editor/CanvasDocumentView';
/**
 * `useCanvasDocument(ydoc)`'s return, restated structurally so this package
 * keeps zero runtime dependency on realtime-modules — the same convention the
 * other Wrapped* components follow.
 */
export interface RMUseCanvasDocumentReturn {
    isCanvas: boolean;
    schemaVersion: number;
    body: Y.XmlFragment | null;
    exportMarkdown: () => string;
    materialize: (schema: {
        nodes: unknown;
        marks: unknown;
    }, model: unknown) => {
        ok: boolean;
        reason?: string;
        unsupported: CanvasUnsupportedForm[];
    };
    importMarkdown: (schema: {
        nodes: unknown;
        marks: unknown;
    }, markdown: string) => {
        ok: boolean;
        reason?: string;
        unsupported: CanvasUnsupportedForm[];
    };
}
export interface WrappedCanvasDocumentProps extends Omit<CanvasDocumentViewProps, 'isCanvas' | 'body' | 'onConvert' | 'unsupported'> {
    /** Return value of useCanvasDocument(ydoc) from realtime-modules. */
    canvas: RMUseCanvasDocumentReturn;
    /**
     * The live editor's ProseMirror schema, needed to build the canvas body.
     *
     * Deliberately supplied by the caller rather than constructed here: a second
     * schema means a second copy of prosemirror-model in the module graph, which
     * breaks `instanceof` across the boundary. See the note on `PmSchemaLike` in
     * useCanvasDocument.
     */
    schema: {
        nodes: unknown;
        marks: unknown;
    } | null;
    /**
     * The legacy document to convert, as a `DocModel`. When omitted, conversion
     * starts from an empty page.
     */
    legacyModel?: unknown;
}
export default function WrappedCanvasDocument({ canvas, schema, legacyModel, ...viewProps }: WrappedCanvasDocumentProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedCanvasDocument.d.ts.map