// __tests__/DocumentEditorPage.test.tsx
//
// Mounting / composition tests for the collaborative document editor page —
// the primary public export of `/doc-editor`. The full Yjs stack runs for
// real (Y.Doc + GatewayProvider over a stub WebSocket); only the network
// seams are stubbed:
//   - `ws` prop          → fake UseWebSocketReturn (sendMessage is a sink)
//   - global fetch       → empty REST responses (comments/reviews/items/sessions)
//   - IdentityProvider   → static test identity
//
// Covers: page composition (header, mode switcher, empty state), mode
// switching, and the load-demo interaction which exercises the full
// markdown → Y.Doc → SectionList (Tiptap) path.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// VideoCallPanel transitively imports `amazon-ivs-web-broadcast`, an optional
// peer dependency consumers install themselves (same class as the hls.js
// stub in vitest.config). The panel only mounts once a call is active, which
// these composition tests never trigger — stub it at the module seam.
vi.mock('../VideoCallPanel', () => ({
  default: () => null,
}));

import DocumentEditorPage from '../DocumentEditorPage';
import { IdentityProvider } from '../../../contexts/IdentityContext';
import type { UseWebSocketReturn } from '../../../hooks/useWebSocket';

// ---------------------------------------------------------------------------
// Stubs
// ---------------------------------------------------------------------------

function makeWs(): UseWebSocketReturn {
  return {
    connectionState: 'connected',
    lastError: null,
    sessionToken: null,
    clientId: 'client-test',
    currentChannel: 'doc:doc-1',
    switchChannel: vi.fn(),
    sendMessage: vi.fn(),
    disconnect: vi.fn(),
    reconnect: vi.fn(),
  } as unknown as UseWebSocketReturn;
}

const IDENTITY = {
  userId: 'u-tester',
  displayName: 'Tester',
  userEmail: null,
  idToken: null,
  onSignOut: vi.fn(),
};

// Generic empty REST responses for the document side-channel hooks
// (comments, reviews, items, video sessions). Shapes are supersets — each
// hook picks the key it needs.
const emptyJson = {
  comments: [],
  reviews: [],
  items: [],
  sessions: [],
  mentions: [],
  tasks: [],
};

let fetchSpy: ReturnType<typeof vi.fn>;

beforeEach(() => {
  // handleModeChange persists ?mode= into the URL (history.replaceState),
  // which would otherwise leak between tests in the same jsdom.
  window.history.replaceState({}, '', '/');
  fetchSpy = vi.fn(async () => ({
    ok: true,
    status: 200,
    json: async () => emptyJson,
    text: async () => JSON.stringify(emptyJson),
  }));
  vi.stubGlobal('fetch', fetchSpy);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function renderPage(overrides: Partial<Parameters<typeof DocumentEditorPage>[0]> = {}) {
  return render(
    <IdentityProvider value={IDENTITY}>
      <DocumentEditorPage
        documentId="doc-1"
        ws={makeWs()}
        userId="u-tester"
        displayName="Tester"
        onMessage={() => () => {}}
        activityPublish={vi.fn()}
        activityEvents={[]}
        {...overrides}
      />
    </IdentityProvider>,
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('DocumentEditorPage', () => {
  it('mounts the page frame with header mode buttons and the empty-state loader', () => {
    renderPage();
    expect(screen.getByTestId('document-editor-page')).toBeInTheDocument();
    // DocumentHeader mode selector
    expect(screen.getByTestId('mode-btn-editor')).toBeInTheDocument();
    expect(screen.getByTestId('mode-btn-ack')).toBeInTheDocument();
    expect(screen.getByTestId('mode-btn-reader')).toBeInTheDocument();
    // Empty document → demo loader CTA
    expect(screen.getByText('No document content yet.')).toBeInTheDocument();
    expect(screen.getByText('Load Demo Document')).toBeInTheDocument();
  });

  it('switches view modes via the header buttons', () => {
    renderPage();
    const editorBtn = screen.getByTestId('mode-btn-editor');
    const readerBtn = screen.getByTestId('mode-btn-reader');
    // Editor starts active (highlighted), reader inactive.
    expect(editorBtn.className).toContain('bg-[#3b82f6]');
    expect(readerBtn.className).not.toContain('bg-[#3b82f6]');

    fireEvent.click(readerBtn);

    expect(readerBtn.className).toContain('bg-[#3b82f6]');
    expect(editorBtn.className).not.toContain('bg-[#3b82f6]');
  });

  it('loads the demo document into the Y.Doc and renders its sections', async () => {
    renderPage();
    fireEvent.click(screen.getByText('Load Demo Document'));

    // The markdown → Y.Doc path populates real sections; the empty state
    // clears and the demo's section titles render (as editable title inputs).
    await waitFor(() => {
      expect(screen.queryByText('No document content yet.')).toBeNull();
    });
    await waitFor(() => {
      expect(screen.getByDisplayValue('Executive Summary')).toBeInTheDocument();
    });
    expect(screen.getByDisplayValue('Action Items')).toBeInTheDocument();
  });

  it('threads the demo document meta through the Y.Doc into the header title', async () => {
    renderPage();
    fireEvent.click(screen.getByText('Load Demo Document'));
    // updateMeta → Y.Doc meta map → useDocumentMetadata observer → headerMeta
    // (the header title is an editable input — match on its value).
    await waitFor(() => {
      expect(
        screen.getByDisplayValue('Q2 Sprint Planning - Meeting Summary'),
      ).toBeInTheDocument();
    });
  });
});
