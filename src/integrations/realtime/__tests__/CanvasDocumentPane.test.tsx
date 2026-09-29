import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEffect } from 'react';
import * as Y from 'yjs';
import {
  createCanvasDocumentPane,
  type CanvasDocumentPaneModules,
  type CanvasDocumentPaneProps,
  type CanvasPaneYjsDoc,
} from '../CanvasDocumentPane';
import { canvasDocumentSaveState, canEditCanvasGrant } from '../canvasDocumentState';
import { canvasRecoveryKey, encodeCanvasRecovery, decodeCanvasRecovery } from '../canvasRecovery';
import { buildCanvasDocumentExtensions } from '../canvasDocumentExtensions';

let tiptapProps: Record<string, unknown> = {};
vi.mock('../../../components/doc-editor/TiptapEditor', () => ({
  default: (props: { onEditorReady?: (e: unknown) => void } & Record<string, unknown>) => {
    tiptapProps = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { props.onEditorReady?.({ isDestroyed: false, state: { doc: { descendants: () => {}, textBetween: () => '' }, selection: { from: 0, to: 0, empty: true } }, on() {}, off() {}, commands: { focus() {} }, chain: () => ({}), view: { domAtPos: () => ({ node: document.createElement('div') }) } }); }, []);
    return <div data-testid="tiptap-stub" />;
  },
}));
vi.mock('../../../components/doc-editor/DocumentToolbar', () => ({ default: () => <div data-testid="toolbar-stub" /> }));

const ydoc = new Y.Doc();
let yjs: CanvasPaneYjsDoc;
let messageHandlers: Array<(m: { channel?: string; type?: string; error?: unknown }) => void> = [];
let gatewayState = 'connected';
let isCanvas = true;
let onUnpersisted: ((b: Uint8Array) => void) | undefined;

const awareness = { setLocalStateField: vi.fn() };
const modules: CanvasDocumentPaneModules = {
  useGateway: () => ({
    connectionState: gatewayState,
    onMessage: (h) => { messageHandlers.push(h); return () => { messageHandlers = messageHandlers.filter((x) => x !== h); }; },
  }),
  useYjsDoc: (options) => { onUnpersisted = options.onUnpersistedChanges; return yjs; },
  useCanvasDocument: () => ({ isCanvas, body: ydoc.getXmlFragment('body'), exportMarkdown: () => '# md' }),
};
const Pane = createCanvasDocumentPane(modules);

function props(over: Partial<CanvasDocumentPaneProps> = {}): CanvasDocumentPaneProps {
  return { documentId: 'd1', tenant: 't', userId: 'u', userName: 'Ann', canEdit: true, extensions: [], loadImage: async () => new Blob(), ...over };
}

beforeEach(() => {
  yjs = { ydoc, provider: { pendingUpdateCount: 0, awareness } as never, synced: true, persistenceState: 'saved', pendingUpdateCount: 0, retryPersistence: vi.fn(), docVersion: 0 };
  messageHandlers = []; gatewayState = 'connected'; isCanvas = true; tiptapProps = {};
  sessionStorage.clear(); localStorage.clear();
});
afterEach(cleanup);

describe('CanvasDocumentPane', () => {
  it('shows loading until the document has synced', () => {
    yjs.synced = false;
    render(<Pane {...props()} />);
    expect(screen.getByText('Loading collaborative document…')).toBeTruthy();
    expect(screen.queryByTestId('tiptap-stub')).toBeNull();
  });

  it('refuses a non-canvas document without editing it', () => {
    isCanvas = false;
    render(<Pane {...props()} />);
    expect(screen.getByText('Document migration is incomplete')).toBeTruthy();
  });

  it('is editable only when permitted, toggled on, synced and online', () => {
    const { rerender } = render(<Pane {...props()} />);
    expect(tiptapProps.editable).toBe(true);
    rerender(<Pane {...props({ editing: false })} />);
    expect(tiptapProps.editable).toBe(false);
    rerender(<Pane {...props({ canEdit: false })} />);
    expect(tiptapProps.editable).toBe(false);
    gatewayState = 'reconnecting';
    rerender(<Pane {...props()} />);
    expect(tiptapProps.editable).toBe(false);
  });

  it('applies the shared surface defaults and lets viewProps override them', () => {
    const { unmount } = render(<Pane {...props()} />);
    expect(screen.getByTestId('canvas-document').getAttribute('data-fit-height')).toBe('parent');
    unmount();
    render(<Pane {...props({ viewProps: { fitHeight: 'viewport' } })} />);
    expect(screen.getByTestId('canvas-document').getAttribute('data-fit-height')).toBe('viewport');
  });

  it('publishes the awareness identity', () => {
    render(<Pane {...props()} />);
    expect(awareness.setLocalStateField).toHaveBeenCalledWith('user', { name: 'Ann', color: 'teal', id: 'u' });
  });

  it('layout mode hands over toolbar, ruler and save state; the canvas fills the body', () => {
    render(<Pane {...props({ layout: (p) => (
      <div>
        <div data-testid="tb">{p.toolbar}</div><div data-testid="rl">{p.ruler}</div>
        <div data-testid="save">{p.saveState?.status}</div>
        <div data-testid="body">{p.notices}{p.canvas}</div>
      </div>) })} />);
    expect(screen.getByTestId('tb')).toContainElement(screen.getByTestId('canvas-document-toolbar'));
    expect(screen.getByTestId('rl')).toContainElement(screen.getByTestId('canvas-document-ruler-row'));
    expect(screen.getByTestId('body')).toContainElement(screen.getByTestId('canvas-document-workspace'));
    expect(screen.getByTestId('save').textContent).toBe('saved');
  });

  it('layout mode still renders the frame while loading', () => {
    yjs.synced = false;
    render(<Pane {...props({ layout: (p) => <div data-testid="shell">{p.canvas}{p.saveState?.status}</div> })} />);
    expect(screen.getByTestId('shell').textContent).toContain('Loading collaborative document…');
  });

  it('offers recovery for edits a restore replaced, and discards them on request', () => {
    render(<Pane {...props()} />);
    act(() => onUnpersisted!(new Uint8Array([1, 2, 3])));
    expect(screen.getByText(/available for recovery/)).toBeTruthy();
    expect(sessionStorage.getItem(canvasRecoveryKey('t', 'u', 'd1'))).toContain('recovered');
    fireEvent.click(screen.getByText('Discard recovery'));
    expect(screen.queryByText(/available for recovery/)).toBeNull();
  });

  it('honours the recovery key prefix an app already stores under', () => {
    render(<Pane {...props({ keyPrefix: 'assessment.canvasRecovery' })} />);
    act(() => onUnpersisted!(new Uint8Array([9])));
    expect(sessionStorage.getItem(canvasRecoveryKey('t', 'u', 'd1', 'assessment.canvasRecovery'))).not.toBeNull();
  });

  it('hides Recover changes from a reader', () => {
    render(<Pane {...props({ canEdit: false })} />);
    act(() => onUnpersisted!(new Uint8Array([1])));
    expect(screen.queryByText('Recover changes…')).toBeNull();
    expect(screen.getByText('Download recovery')).toBeTruthy();
  });

  it('shows a refused document operation and clears it on the next snapshot', () => {
    render(<Pane {...props()} />);
    act(() => messageHandlers.forEach((h) => h({ channel: 'doc:d1', type: 'crdt:error', error: 'nope' })));
    expect(screen.getByText('nope')).toBeTruthy();
    act(() => messageHandlers.forEach((h) => h({ channel: 'doc:other', type: 'crdt:error', error: 'other' })));
    expect(screen.queryByText('other')).toBeNull();
    act(() => messageHandlers.forEach((h) => h({ channel: 'doc:d1', type: 'crdt:snapshot' })));
    expect(screen.queryByText('nope')).toBeNull();
  });

  it('guards unload and reports pending changes while edits are unsaved', () => {
    const add = vi.spyOn(window, 'addEventListener');
    const onPendingChange = vi.fn();
    yjs.pendingUpdateCount = 2;
    render(<Pane {...props({ onPendingChange })} />);
    expect(add.mock.calls.some(([type]) => type === 'beforeunload')).toBe(true);
    expect(onPendingChange).toHaveBeenCalledWith(2);
    add.mockRestore();
  });

  it('wires Insert image only when an upload function is supplied and the doc is editable', () => {
    const { rerender } = render(<Pane {...props()} />);
    expect(screen.queryByText('Insert image')).toBeNull();
    rerender(<Pane {...props({ uploadImage: async () => '/api/uploads/x' })} />);
    // The modal is closed until the toolbar's Insert image is used.
    expect(screen.queryByText('Choose an image or drop it here')).toBeNull();
  });
});

describe('canvasDocumentSaveState', () => {
  it('is silent while idle', () => expect(canvasDocumentSaveState('idle', 0, true, () => {})).toBeUndefined());
  it('says offline only with unsaved changes', () => {
    expect(canvasDocumentSaveState('pending', 1, false, () => {})?.status).toBe('offline');
    expect(canvasDocumentSaveState('saved', 0, false, () => {})?.status).toBe('saved');
  });
  it('offers retry on error or offline', () => {
    const retry = vi.fn();
    canvasDocumentSaveState('error', 0, true, retry)?.onRetry?.();
    expect(retry).toHaveBeenCalled();
    expect(canvasDocumentSaveState('saved', 0, true, retry)?.onRetry).toBeUndefined();
  });
  it('grant edit rights lapse at expiry', () => {
    expect(canEditCanvasGrant({ canEdit: true, expiresAt: 10 }, true, 5)).toBe(true);
    expect(canEditCanvasGrant({ canEdit: true, expiresAt: 10 }, true, 10)).toBe(false);
    expect(canEditCanvasGrant({ canEdit: true, expiresAt: 10 }, false, 5)).toBe(false);
  });
});

describe('canvas recovery encoding', () => {
  it('round-trips bytes and rejects malformed records', () => {
    const bytes = new Uint8Array(20000).map((_, i) => i % 251);
    expect(decodeCanvasRecovery(encodeCanvasRecovery(bytes))).toEqual(bytes);
    expect(decodeCanvasRecovery({ version: 2 })).toBeNull();
    expect(decodeCanvasRecovery(null)).toBeNull();
  });
  it('partitions keys by identity and document', () => {
    expect(canvasRecoveryKey('a', 'b', 'c')).not.toBe(canvasRecoveryKey('a', 'b', 'd'));
  });
});

describe('buildCanvasDocumentExtensions', () => {
  it('hands the factory every part and swaps the image for the authenticated node', () => {
    const authenticated = { name: 'authed' };
    const image = { configure: () => ({ extend: () => authenticated }) } as never;
    const factory = vi.fn(() => []);
    const marker = {} as never;
    buildCanvasDocumentExtensions(factory as never, {
      MacroNode: marker, HeadingAnchor: marker, MarkdownClipboard: marker, Callout: marker, CanvasTextAlign: marker,
      TextStyleKit: marker, TableKit: marker, Image: image,
    } as never);
    const parts = (factory.mock.calls[0] as unknown[])[0] as Record<string, unknown>;
    expect(parts.MacroNode).toBe(marker);
    expect(parts.Image).toBe(authenticated);
  });
});
