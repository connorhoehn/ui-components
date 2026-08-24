import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as Y from 'yjs';
import StandaloneTiptap from '../StandaloneTiptap';

// Stub the bootstrap hooks so we don't open a real WebSocket. The escape-hatch
// path doesn't touch them — those tests run with the real implementations.
const mockUseYjsDoc = vi.fn();
const mockUseWebSocket = vi.fn();

vi.mock('../../../hooks/useYjsDoc', () => ({
  useYjsDoc: (...args: unknown[]) => mockUseYjsDoc(...args),
}));
vi.mock('../../../hooks/useWebSocket', () => ({
  useWebSocket: (...args: unknown[]) => mockUseWebSocket(...args),
}));

const USER = { name: 'Test User', color: '#3b82f6' };

beforeEach(() => {
  mockUseYjsDoc.mockReset();
  mockUseWebSocket.mockReset();
  mockUseWebSocket.mockReturnValue({
    connectionState: 'idle',
    lastError: null,
    sessionToken: null,
    clientId: null,
    currentChannel: 'doc:test',
    switchChannel: vi.fn(),
    sendMessage: vi.fn(),
    disconnect: vi.fn(),
    reconnect: vi.fn(),
  });
});

describe('StandaloneTiptap — escape-hatch mode', () => {
  it('renders a tiptap surface with the provided Y.Doc + null provider', () => {
    const ydoc = new Y.Doc();
    const { container } = render(
      <StandaloneTiptap ydoc={ydoc} provider={null} user={USER} />,
    );
    // ProseMirror mounts a contenteditable surface.
    const editable = container.querySelector('[contenteditable="true"]');
    expect(editable).not.toBeNull();
    ydoc.destroy();
  });

  it('uses the default "prosemirror" fragment when none provided', () => {
    const ydoc = new Y.Doc();
    const onReady = vi.fn();
    render(
      <StandaloneTiptap
        ydoc={ydoc}
        provider={null}
        user={USER}
        onFragmentReady={onReady}
      />,
    );
    expect(onReady).toHaveBeenCalledTimes(1);
    const [fragment, doc] = onReady.mock.calls[0];
    expect(doc).toBe(ydoc);
    // Same logical fragment as the convention.
    expect(fragment).toBe(ydoc.getXmlFragment('prosemirror'));
    ydoc.destroy();
  });

  it('honors a custom fragmentName', () => {
    const ydoc = new Y.Doc();
    const onReady = vi.fn();
    render(
      <StandaloneTiptap
        ydoc={ydoc}
        provider={null}
        user={USER}
        fragmentName="content"
        onFragmentReady={onReady}
      />,
    );
    expect(onReady).toHaveBeenCalledWith(
      ydoc.getXmlFragment('content'),
      ydoc,
    );
    ydoc.destroy();
  });

  it('passes through an explicit fragment prop', () => {
    const ydoc = new Y.Doc();
    const explicit = ydoc.getXmlFragment('section-42');
    const onReady = vi.fn();
    render(
      <StandaloneTiptap
        ydoc={ydoc}
        provider={null}
        fragment={explicit}
        user={USER}
        onFragmentReady={onReady}
      />,
    );
    expect(onReady).toHaveBeenCalledWith(explicit, ydoc);
    ydoc.destroy();
  });

  it('renders the toolbar when editable (default) and hides it when read-only', () => {
    const ydoc = new Y.Doc();
    const { rerender, container } = render(
      <StandaloneTiptap ydoc={ydoc} provider={null} user={USER} />,
    );
    // EditorToolbar exposes a Bold "B" button when mounted; when editable=false
    // the toolbar isn't rendered at all.
    expect(screen.queryByRole('button', { name: 'B' })).not.toBeNull();
    rerender(
      <StandaloneTiptap
        ydoc={ydoc}
        provider={null}
        user={USER}
        editable={false}
      />,
    );
    expect(screen.queryByRole('button', { name: 'B' })).toBeNull();
    ydoc.destroy();
  });

  it('does not render a contenteditable=true region when editable=false', () => {
    const ydoc = new Y.Doc();
    const { container } = render(
      <StandaloneTiptap
        ydoc={ydoc}
        provider={null}
        user={USER}
        editable={false}
      />,
    );
    expect(container.querySelector('[contenteditable="true"]')).toBeNull();
    ydoc.destroy();
  });

  it('forwards an extra className onto the outer wrapper', () => {
    const ydoc = new Y.Doc();
    const { container } = render(
      <StandaloneTiptap
        ydoc={ydoc}
        provider={null}
        user={USER}
        className="my-wrapper"
      />,
    );
    expect(container.querySelector('.my-wrapper')).not.toBeNull();
    ydoc.destroy();
  });
});

describe('StandaloneTiptap — bootstrap mode', () => {
  it('renders loadingSlot while useYjsDoc has not produced a ydoc', () => {
    mockUseYjsDoc.mockReturnValue({
      ydoc: null,
      provider: null,
      synced: false,
      docVersion: 0,
    });
    render(
      <StandaloneTiptap
        gatewayUrl="wss://example.test/ws"
        docId="doc-1"
        authToken=""
        user={USER}
        loadingSlot={<span data-testid="loading">Connecting…</span>}
      />,
    );
    expect(screen.getByTestId('loading')).not.toBeNull();
  });

  it('renders the editor once useYjsDoc returns a ydoc', () => {
    const ydoc = new Y.Doc();
    mockUseYjsDoc.mockReturnValue({
      ydoc,
      provider: null,
      synced: true,
      docVersion: 1,
    });
    const { container } = render(
      <StandaloneTiptap
        gatewayUrl="wss://example.test/ws"
        docId="doc-1"
        authToken=""
        user={USER}
      />,
    );
    expect(container.querySelector('[contenteditable="true"]')).not.toBeNull();
    ydoc.destroy();
  });

  it('subscribes useWebSocket against the resolved channel `doc:${docId}`', () => {
    const ydoc = new Y.Doc();
    mockUseYjsDoc.mockReturnValue({
      ydoc,
      provider: null,
      synced: true,
      docVersion: 1,
    });
    render(
      <StandaloneTiptap
        gatewayUrl="wss://example.test/ws"
        docId="alpha"
        authToken="tok"
        user={USER}
      />,
    );
    const call = mockUseWebSocket.mock.calls.at(-1)![0];
    expect(call.config).toEqual({
      wsUrl: 'wss://example.test/ws',
      cognitoToken: 'tok',
      defaultChannel: 'doc:alpha',
    });
    expect(typeof call.onMessage).toBe('function');
    ydoc.destroy();
  });

  it('honors a channel override', () => {
    const ydoc = new Y.Doc();
    mockUseYjsDoc.mockReturnValue({
      ydoc,
      provider: null,
      synced: true,
      docVersion: 1,
    });
    render(
      <StandaloneTiptap
        gatewayUrl="wss://example.test/ws"
        docId="alpha"
        authToken=""
        channel="custom-channel"
        user={USER}
      />,
    );
    const call = mockUseWebSocket.mock.calls.at(-1)![0];
    expect(call.config.defaultChannel).toBe('custom-channel');
    ydoc.destroy();
  });

  it('forwards docId to useYjsDoc and treats the message subscriber as a registrar', () => {
    const ydoc = new Y.Doc();
    mockUseYjsDoc.mockReturnValue({
      ydoc,
      provider: null,
      synced: true,
      docVersion: 1,
    });
    render(
      <StandaloneTiptap
        gatewayUrl="wss://example.test/ws"
        docId="beta"
        authToken=""
        user={USER}
      />,
    );
    const yjsCall = mockUseYjsDoc.mock.calls.at(-1)![0];
    expect(yjsCall.documentId).toBe('beta');
    expect(typeof yjsCall.onMessage).toBe('function');
    // The registrar returns an unsubscribe function.
    const unsub = yjsCall.onMessage(() => undefined);
    expect(typeof unsub).toBe('function');
    ydoc.destroy();
  });
});

// ---------------------------------------------------------------------------
// requireSync — opt-in gate on the provider's first sync
// ---------------------------------------------------------------------------

// Bootstrap mode mounts on the first commit, before any server snapshot has
// arrived. The user sees an empty document with a placeholder and can type
// into it; the server's content then merges AROUND what they wrote, and
// Tiptap's Collaboration extension writes an empty paragraph into the empty
// fragment on top of that.
//
// The gate is opt-in, not the default, and that asymmetry is the whole design:
// a gateway that sends no snapshot for a brand-new document never fires
// `synced`, so gating unconditionally would hang the editor forever. The first
// test below is the one that protects existing consumers — it must keep
// passing, or this became a breaking change to a frozen export.
describe('StandaloneTiptap — requireSync', () => {
  const unsynced = (ydoc: Y.Doc) => ({ ydoc, provider: null, synced: false, docVersion: 0 });

  function renderWith(props: Record<string, unknown>) {
    return render(
      <StandaloneTiptap
        gatewayUrl="wss://example.test/ws"
        docId="doc-1"
        authToken=""
        user={USER}
        loadingSlot={<span data-testid="loading">Connecting…</span>}
        {...props}
      />,
    );
  }

  it('mounts before sync by default — the historical behaviour, unchanged', () => {
    mockUseYjsDoc.mockReturnValue(unsynced(new Y.Doc()));
    const { container } = renderWith({});
    expect(screen.queryByTestId('loading')).toBeNull();
    expect(container.querySelector('.ProseMirror, [data-testid="tiptap-editor"]') ?? container.firstChild).toBeTruthy();
  });

  it('holds on loadingSlot until synced when requireSync is set', () => {
    mockUseYjsDoc.mockReturnValue(unsynced(new Y.Doc()));
    renderWith({ requireSync: true });
    expect(screen.getByTestId('loading')).not.toBeNull();
  });

  it('mounts once sync arrives', () => {
    const ydoc = new Y.Doc();
    mockUseYjsDoc.mockReturnValue({ ydoc, provider: null, synced: true, docVersion: 1 });
    renderWith({ requireSync: true });
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  it('does not fire onFragmentReady before sync when requireSync is set', () => {
    // The prop is documented for "seeding initial content". Seeding an
    // unsynced doc writes into a fragment the server is about to merge into —
    // the same corruption the gate exists to prevent, by another route.
    const onFragmentReady = vi.fn();
    mockUseYjsDoc.mockReturnValue(unsynced(new Y.Doc()));
    renderWith({ requireSync: true, onFragmentReady });
    expect(onFragmentReady).not.toHaveBeenCalled();
  });
});
