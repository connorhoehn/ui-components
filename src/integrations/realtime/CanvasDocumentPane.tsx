// src/integrations/realtime/CanvasDocumentPane.tsx
//
// One assembly of a collaborative canvas document, for every app that mounts
// one. Before this each app composed CanvasDocumentView by hand — extension
// list, authenticated image provider, unsaved-edit recovery, save state,
// insert-image modal, beforeunload guard — and the copies drifted.
//
// The app supplies what only it knows: which document, who is looking, whether
// they may edit, how an image URL is fetched and how a file is uploaded. The
// three realtime-modules hooks come in as an injected bag (like
// `createRealtimeIntegrations`), so this entry never imports the package.
//
//   const CanvasDocumentPane = createCanvasDocumentPane({ useYjsDoc, useCanvasDocument, useGateway });
//   <CanvasDocumentPane documentId=… tenant=… userId=… userName=… canEdit extensions={EXTENSIONS}
//     loadImage={…} uploadImage={…} layout={(p) => <EditorShell toolbar={p.toolbar} … editor={<>{p.notices}{p.canvas}</>} />} />
//
// Without `layout` the pane renders notices + canvas (toolbar and ruler inside
// the canvas). With it, the toolbar and ruler are handed over (CanvasDocumentView's
// `renderFrame`) so a shell can place them.

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type * as Y from 'yjs';
import CanvasDocumentView, { type CanvasDocumentViewProps } from '../../components/doc-editor/CanvasDocumentView';
import { DocumentImageProvider, type DocumentImageLoader } from '../../components/doc-editor/AuthenticatedDocumentImage';
import type { DocumentSaveState } from '../../components/doc-editor/DocumentSaveStatus';
import { Button } from '../../components/ui/Button';
import { Inline, Stack } from '../../components/ui/Stack';
import InlineAlert from '../../components/shared/InlineAlert';
import LoadingState from '../../components/shared/LoadingState';
import ErrorState from '../../components/shared/ErrorState';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import Modal from '../../components/shared/Modal';
import { FileUploadDrop } from '../../components/shared/FileUploadDrop';
import { MAX_IMAGE_BYTES } from '../realtime-modules/useDocumentImageUpload';
import { useCanvasRecovery } from './useCanvasRecovery';
import { canvasDocumentSaveState } from './canvasDocumentState';

// ── The injected hooks, restated structurally ──────────────────────────────

/** The gateway pieces the pane reads (`useGateway()`'s return, structurally). */
export interface CanvasPaneGateway {
  connectionState: string;
  onMessage: (handler: (message: { channel?: string; type?: string; error?: unknown }) => void) => () => void;
}

/** `useYjsDoc(...)`'s return, structurally. */
export interface CanvasPaneYjsDoc {
  ydoc: Y.Doc | null;
  provider: (CanvasDocumentViewProps['provider'] & {
    pendingUpdateCount: number;
    awareness: { setLocalStateField: (field: string, value: unknown) => void };
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
    // Passed straight through from useGateway(); opaque here.
    ws: never;
    onMessage: CanvasPaneGateway['onMessage'];
    onUnpersistedChanges?: (snapshot: Uint8Array) => void;
  }) => CanvasPaneYjsDoc;
  /** `/client` */
  useCanvasDocument: (options: { ydoc: Y.Doc | null | undefined }) => {
    isCanvas: boolean;
    body: CanvasDocumentViewProps['body'];
    exportMarkdown: () => string;
  };
}

// ── Props ──────────────────────────────────────────────────────────────────

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

/** Editor surface defaults: card toolbar on the workspace grey, ruler on, sheet fits its scroller. */
const VIEW_DEFAULTS = {
  showRuler: true, showStatusBar: false, toolbarStyle: 'card', pageMargin: 'narrow', fitHeight: 'parent', paginate: true,
} as const satisfies Partial<CanvasDocumentViewProps>;

/** Bind the pane to the app's realtime-modules functions. Call once at module scope. */
export function createCanvasDocumentPane(rm: CanvasDocumentPaneModules): CanvasDocumentPaneComponent {
  return function CanvasDocumentPane(props: CanvasDocumentPaneProps) {
    const {
      documentId, tenant, userId, userName, userColor = 'teal', canEdit, editing = true, extensions,
      loadImage, isProtectedImage, uploadImage, onPendingChange, notices, children, viewProps,
      onEditorReady, loadingLabel = 'Loading collaborative document…', layout, keyPrefix,
    } = props;
    const gateway = rm.useGateway();
    const recovery = useCanvasRecovery(tenant, userId, documentId, keyPrefix);
    const doc = rm.useYjsDoc({
      documentId, ws: gateway as never, onMessage: gateway.onMessage, onUnpersistedChanges: recovery.retain,
    });
    const canvas = rm.useCanvasDocument({ ydoc: doc.ydoc });
    const online = gateway.connectionState === 'connected';
    const editable = canEdit && editing && doc.synced && online;
    const editableRef = useRef(editable);
    editableRef.current = editable;
    const [confirmRecovery, setConfirmRecovery] = useState(false);
    const [wireError, setWireError] = useState<string | null>(null);
    const [imageOpen, setImageOpen] = useState(false);
    const [imagePending, setImagePending] = useState(false);
    const [imageError, setImageError] = useState<string | null>(null);
    const editorRef = useRef<{ isDestroyed: boolean; chain: () => any } | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
    const user = useMemo(() => ({ name: userName, color: userColor }), [userName, userColor]);

    useEffect(() => recovery.track(doc.ydoc, doc.provider), [doc.ydoc, doc.provider, recovery.track]);
    useEffect(() => {
      if (doc.persistenceState === 'saved' && doc.pendingUpdateCount === 0) recovery.acknowledged();
    }, [doc.persistenceState, doc.pendingUpdateCount, recovery.acknowledged]);
    useEffect(() => { onPendingChange?.(doc.pendingUpdateCount); }, [doc.pendingUpdateCount, onPendingChange]);
    useEffect(() => {
      doc.provider?.awareness.setLocalStateField('user', { ...user, id: userId });
    }, [doc.provider, user, userId]);
    useEffect(() => {
      if (doc.pendingUpdateCount === 0) return;
      const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
      window.addEventListener('beforeunload', warn);
      return () => window.removeEventListener('beforeunload', warn);
    }, [doc.pendingUpdateCount]);
    useEffect(() => gateway.onMessage((message) => {
      if (message.channel !== `doc:${documentId}`) return;
      if (message.type === 'crdt:error') setWireError(typeof message.error === 'string' ? message.error : 'The document operation was refused.');
      if (message.type === 'crdt:snapshot') setWireError(null);
    }), [gateway.onMessage, documentId]);

    const insertImage = async (file: File) => {
      const editor = editorRef.current;
      if (!uploadImage || !editor || editor.isDestroyed || !editableRef.current || imagePending) return;
      setImagePending(true); setImageError(null);
      try {
        const src = await uploadImage(file);
        if (editorRef.current !== editor || editor.isDestroyed || !editableRef.current) throw new Error('The document is no longer editable. The image was not inserted.');
        editor.chain().focus().setImage({ src, alt: file.name }).run();
        setImageOpen(false);
      } catch (cause) { setImageError(cause instanceof Error ? cause.message : 'The image could not be uploaded.'); }
      finally { setImagePending(false); }
    };

    const saveState = canvasDocumentSaveState(doc.persistenceState, doc.pendingUpdateCount, online, doc.retryPersistence);
    const state: CanvasDocumentPaneState = {
      editable, online, synced: doc.synced, pendingUpdateCount: doc.pendingUpdateCount,
      persistenceState: doc.persistenceState, docVersion: doc.docVersion, ydoc: doc.ydoc, exportMarkdown: canvas.exportMarkdown,
    };

    const noticeNodes = (
      <>
        {notices}
        {recovery.recovered && (
          <InlineAlert tone="warning">
            <Stack gap="xs">
              Changes from an earlier editing session are available for recovery. They have not been applied to this document.
              <Inline gap="sm" wrap>
                <Button size="sm" variant="secondary" onClick={recovery.download}>Download recovery</Button>
                {canEdit && (
                  <Button size="sm" variant="secondary" disabled={!doc.synced || !online || doc.pendingUpdateCount > 0} onClick={() => setConfirmRecovery(true)}>Recover changes…</Button>
                )}
                <Button size="sm" variant="ghost" onClick={recovery.clear}>Discard recovery</Button>
              </Inline>
            </Stack>
          </InlineAlert>
        )}
        {recovery.storageError && (
          <InlineAlert tone="warning">
            <Inline gap="sm" wrap>
              This browser could not keep a recovery copy. Keep this page open until saving finishes.
              <Button size="sm" variant="secondary" onClick={recovery.download}>Download recovery</Button>
            </Inline>
          </InlineAlert>
        )}
        {wireError && <InlineAlert tone="error">{wireError}</InlineAlert>}
      </>
    );

    const ready = doc.synced && !!doc.ydoc && !!canvas.body;
    const extras = (
      <>
        {children}
        <ConfirmDialog
          open={confirmRecovery} onCancel={() => setConfirmRecovery(false)} title="Recover earlier changes?" tone="caution"
          body="This explicitly merges the recovered document with the current version. It can bring back content removed by a version restore. Download the recovery first if you want to keep a separate copy."
          confirmLabel="Recover changes"
          onConfirm={() => {
            if (doc.ydoc && canEdit && online && doc.pendingUpdateCount === 0) recovery.restore(doc.ydoc);
            setConfirmRecovery(false);
          }}
        />
        {uploadImage && (
          <Modal open={imageOpen} onClose={() => { if (!imagePending) setImageOpen(false); }} title="Insert image">
            <Stack gap="sm">
              {imageError && <InlineAlert tone="error">{imageError}</InlineAlert>}
              <FileUploadDrop
                accept="image/*" maxSize={MAX_IMAGE_BYTES} disabled={imagePending || !editable}
                label={imagePending ? 'Uploading image…' : 'Choose an image or drop it here'}
                onFiles={(files) => { if (files[0]) void insertImage(files[0]); }}
              />
            </Stack>
          </Modal>
        )}
      </>
    );

    const render = (canvasNode: ReactNode, toolbar: ReactNode = null, ruler: ReactNode = null) => {
      const parts: CanvasDocumentPaneParts = { notices: noticeNodes, canvas: canvasNode, toolbar, ruler, saveState, state };
      return layout ? layout(parts) : <>{noticeNodes}{canvasNode}</>;
    };

    if (!ready) return render(<LoadingState label={loadingLabel} />);
    if (!canvas.isCanvas) {
      return render(<ErrorState title="Document migration is incomplete" body="The server has not supplied a rich document snapshot. No changes have been made." />);
    }

    // The view fills the slot under the notices; in `layout` mode it hands its
    // toolbar and ruler up instead of drawing them, and they are collected here.
    const view = (frame?: (toolbar: ReactNode, ruler: ReactNode, surface: ReactNode) => ReactNode) => (
      <DocumentImageProvider loadImage={loadImage} {...(isProtectedImage ? { requiresAuthentication: isProtectedImage } : {})}>
        <CanvasDocumentView
          {...VIEW_DEFAULTS}
          {...viewProps}
          key={doc.docVersion}
          isCanvas body={canvas.body} ydoc={doc.ydoc!} provider={doc.provider} user={user}
          editable={editable} extensions={extensions}
          {...(uploadImage && editable ? { onInsertImage: () => { setImageError(null); setImageOpen(true); } } : {})}
          {...(frame ? { renderFrame: ({ toolbar, ruler, surface }) => frame(toolbar, ruler, surface) } : {})}
          onEditorReady={(editor) => { editorRef.current = editor as never; onEditorReady?.(editor); }}
        />
        {extras}
      </DocumentImageProvider>
    );

    if (!layout) return render(<Stack gap="none" className="min-h-0 flex-1" data-testid="document-canvas-slot">{view()}</Stack>);
    return view((toolbar, ruler, surface) => render(
      <Stack gap="none" className="min-h-0 flex-1" data-testid="document-canvas-slot">{surface}</Stack>, toolbar, ruler,
    ));
  };
}
