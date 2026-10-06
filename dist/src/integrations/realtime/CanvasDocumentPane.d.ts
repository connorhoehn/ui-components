import { type ReactNode } from 'react';
import type * as Y from 'yjs';
import { type CanvasDocumentViewProps } from '../../components/doc-editor/CanvasDocumentView';
import { type DocumentImageLoader } from '../../components/doc-editor/AuthenticatedDocumentImage';
import type { DocumentSaveState } from '../../components/doc-editor/DocumentSaveStatus';
/** The gateway pieces the pane reads (`useGateway()`'s return, structurally). */
export interface CanvasPaneGateway {
    connectionState: string;
    onMessage: (handler: (message: {
        channel?: string;
        type?: string;
        error?: unknown;
    }) => void) => () => void;
}
/** `useYjsDoc(...)`'s return, structurally. */
export interface CanvasPaneYjsDoc {
    ydoc: Y.Doc | null;
    provider: (CanvasDocumentViewProps['provider'] & {
        pendingUpdateCount: number;
        awareness: {
            setLocalStateField: (field: string, value: unknown) => void;
        };
    }) | null;
    synced: boolean;
    persistenceState: 'idle' | 'pending' | 'saved' | 'error';
    pendingUpdateCount: number;
    retryPersistence: () => void;
    docVersion: number;
}
/** The realtime-modules functions the pane calls. Spread the namespace you installed. */
export interface CanvasDocumentPaneModules {
    /** `/client` */
    useGateway: () => CanvasPaneGateway;
    /** `/client` — called with `ws: gateway`. */
    useYjsDoc: (options: {
        documentId: string;
        ws: never;
        onMessage: CanvasPaneGateway['onMessage'];
        onUnpersistedChanges?: (snapshot: Uint8Array) => void;
    }) => CanvasPaneYjsDoc;
    /** `/client` */
    useCanvasDocument: (options: {
        ydoc: Y.Doc | null | undefined;
    }) => {
        isCanvas: boolean;
        body: CanvasDocumentViewProps['body'];
        exportMarkdown: () => string;
    };
}
/** What the pane knows, for a host that lays out its own shell. */
export interface CanvasDocumentPaneState {
    editable: boolean;
    online: boolean;
    synced: boolean;
    pendingUpdateCount: number;
    persistenceState: CanvasPaneYjsDoc['persistenceState'];
    docVersion: number;
    ydoc: Y.Doc | null;
    exportMarkdown: () => string;
}
/** The pieces `layout` places. */
export interface CanvasDocumentPaneParts {
    /** Recovery, storage and wire-error alerts, plus `notices`. */
    notices: ReactNode;
    /** The canvas (or its loading / migration-incomplete state), with the image provider and modal. */
    canvas: ReactNode;
    /** Formatting toolbar; null until the editor is ready or when read-only. */
    toolbar: ReactNode;
    ruler: ReactNode;
    /** For `EditorShell`'s `saveState`; undefined while idle. */
    saveState: DocumentSaveState | undefined;
    state: CanvasDocumentPaneState;
}
export interface CanvasDocumentPaneProps {
    documentId: string;
    /** Recovery is partitioned by these; also the awareness identity. */
    tenant: string;
    userId: string;
    userName: string;
    userColor?: string;
    /** The app's permission verdict (role, grant expiry, lifecycle). The pane adds sync and connection. */
    canEdit: boolean;
    /** The user's edit toggle. Default true. */
    editing?: boolean;
    /** Build once at module scope with `buildCanvasDocumentExtensions`. */
    extensions: readonly unknown[];
    /** Authenticated image fetch. */
    loadImage: DocumentImageLoader;
    /** Which image URLs need `loadImage`; default is gateway uploads. */
    isProtectedImage?: (src: string) => boolean;
    /** Present ⇒ the toolbar's Insert image opens a picker that uploads and inserts. */
    uploadImage?: (file: File) => Promise<string>;
    /** Tell the app about unsaved edits (a navigation guard, say). */
    onPendingChange?: (pendingUpdateCount: number) => void;
    /** Alerts placed before the pane's own. */
    notices?: ReactNode;
    /** Rendered inside the image provider after the canvas — a context panel, say. */
    children?: ReactNode;
    /** Pass-through to the view; overrides the pane's defaults. */
    viewProps?: Partial<Omit<CanvasDocumentViewProps, 'isCanvas' | 'body' | 'ydoc' | 'provider' | 'user' | 'editable' | 'extensions' | 'renderFrame'>>;
    onEditorReady?: (editor: unknown) => void;
    loadingLabel?: string;
    /** Place the parts in a shell. Omitted: notices then canvas, in a column. */
    layout?: (parts: CanvasDocumentPaneParts) => ReactNode;
    keyPrefix?: string;
}
export type CanvasDocumentPaneComponent = (props: CanvasDocumentPaneProps) => ReactNode;
/** Bind the pane to the app's realtime-modules functions. Call once at module scope. */
export declare function createCanvasDocumentPane(rm: CanvasDocumentPaneModules): CanvasDocumentPaneComponent;
//# sourceMappingURL=CanvasDocumentPane.d.ts.map