// __tests__/DocumentEditorPage.dataIntegrity.test.tsx
//
// Regressions for two failures that only appear once real remote traffic
// reaches the editor, which is why the composition tests next door never saw
// them:
//
//   1. Duplicate sections created by the concurrent-template race were never
//      repaired, because the repair pass ran on the `synced` edge — before the
//      other client's copy had arrived.
//   2. `useDocumentItems.itemErrors` existed but nothing rendered it, so a
//      section whose action items failed to load looked exactly like a section
//      that genuinely has none.
//
// Both drive the real Yjs stack: updates are built in a peer Y.Doc and pushed
// in as `crdt:snapshot` / `crdt:update` gateway messages, exactly as the
// gateway delivers them.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, renderHook, screen, waitFor, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import * as Y from 'yjs';
import { toBase64 } from 'lib0/buffer';

// Same seam as DocumentEditorPage.test.tsx — VideoCallPanel transitively
// imports the optional `amazon-ivs-web-broadcast` peer dependency.
vi.mock('../VideoCallPanel', () => ({
  default: () => null,
}));

import DocumentEditorPage from '../DocumentEditorPage';
import { useDocumentEditorState } from '../useDocumentEditorState';
import { IdentityProvider } from '../../../contexts/IdentityContext';
import type { UseWebSocketReturn } from '../../../hooks/useWebSocket';
import type { GatewayMessage } from '../../../types/gateway';

// ---------------------------------------------------------------------------
// Harness
// ---------------------------------------------------------------------------

const CHANNEL = 'doc:doc-1';

const IDENTITY = {
  userId: 'u-tester',
  displayName: 'Tester',
  userEmail: null,
  idToken: 'tok-test',
  onSignOut: vi.fn(),
};

function makeWs(): UseWebSocketReturn {
  return {
    connectionState: 'connected',
    lastError: null,
    sessionToken: null,
    clientId: 'client-test',
    currentChannel: CHANNEL,
    switchChannel: vi.fn(),
    sendMessage: vi.fn(),
    disconnect: vi.fn(),
    reconnect: vi.fn(),
  } as unknown as UseWebSocketReturn;
}

/** Gateway message bus the editor subscribes to. */
function makeBus() {
  const handlers: ((msg: GatewayMessage) => void)[] = [];
  return {
    onMessage: (h: (msg: GatewayMessage) => void) => {
      handlers.push(h);
      return () => {
        const i = handlers.indexOf(h);
        if (i >= 0) handlers.splice(i, 1);
      };
    },
    emit(msg: GatewayMessage) {
      act(() => {
        handlers.slice().forEach((h) => h(msg));
      });
    },
  };
}

/** Sections encoded as a peer client's whole document state. */
function peerDocWithSections(entries: [id: string, title: string][]): string {
  const doc = new Y.Doc({ gc: false });
  const sections = doc.getArray<Y.Map<unknown>>('sections');
  doc.transact(() => {
    for (const [id, title] of entries) {
      const s = new Y.Map<unknown>();
      s.set('id', id);
      s.set('type', 'notes');
      s.set('title', title);
      s.set('collapsed', false);
      s.set('items', new Y.Array());
      sections.push([s]);
    }
  });
  return toBase64(Y.encodeStateAsUpdate(doc));
}

function peerDocWithSection(id: string, title: string): string {
  return peerDocWithSections([[id, title]]);
}

function okJson(body: unknown) {
  return {
    ok: true,
    status: 200,
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

const EMPTY_BODY = {
  comments: [],
  reviews: [],
  items: [],
  sessions: [],
  mentions: [],
  tasks: [],
};

/**
 * Let the Yjs observer debounce (16ms) and any follow-up effect settle.
 *
 * Several passes, not one long sleep: an effect that runs during the flush at
 * the END of an act() schedules its own timer, which cannot fire inside that
 * same act. The dedupe repair is exactly that shape — observer → setSections →
 * effect → Y delete → observer again — so it needs more than one turn.
 */
async function settle(passes = 5) {
  for (let i = 0; i < passes; i++) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
  }
}

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// ---------------------------------------------------------------------------
// 1. Duplicate-section repair after a remote merge
//
// Asserted on the hook's `sections`, not the DOM: two sections sharing an id
// also share a React key, and reconciling a duplicate-keyed list is exactly
// the case React makes no guarantees about — the stale node can outlive the
// removal and mask the repair either way.
// ---------------------------------------------------------------------------

describe('useDocumentEditorState — duplicate section repair', () => {
  function wrapper({ children }: { children: ReactNode }) {
    return <IdentityProvider value={IDENTITY}>{children}</IdentityProvider>;
  }

  function renderState(bus: ReturnType<typeof makeBus>) {
    return renderHook(
      () =>
        useDocumentEditorState({
          documentId: 'doc-1',
          ws: makeWs(),
          userId: 'u-tester',
          displayName: 'Tester',
          onMessage: bus.onMessage,
          activityPublish: vi.fn(),
        }),
      { wrapper },
    );
  }

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async () => okJson(EMPTY_BODY)));
  });

  it('drops a duplicate section that arrives in a later remote update', async () => {
    // The concurrent-template race: two clients apply the same template to the
    // same new document and produce the same deterministic section id twice.
    // The second copy reaches this client as an ordinary remote update, well
    // after it synced — so a repair pass that only runs on the synced edge
    // scans an array that does not contain the duplicate yet, and the document
    // is left listing every section twice for good.
    const bus = makeBus();
    const { result } = renderState(bus);

    bus.emit({
      type: 'crdt:snapshot',
      channel: CHANNEL,
      snapshot: peerDocWithSection('tpl-abc', 'Summary'),
    } as unknown as GatewayMessage);
    await settle();
    expect(result.current.sections).toHaveLength(1);

    // The other client's copy of the same section lands afterwards. It carries
    // a second, genuinely new section alongside it purely as a marker: without
    // something in the update that survives the repair, an assertion made
    // inside the 16ms observer debounce sees the pre-merge list and passes
    // against the bug.
    bus.emit({
      type: 'crdt:update',
      channel: CHANNEL,
      update: peerDocWithSections([
        ['tpl-abc', 'Summary (duplicate)'],
        ['sec-marker', 'Marker'],
      ]),
    } as unknown as GatewayMessage);

    await waitFor(() => {
      expect(result.current.sections.map((s) => s.id)).toContain('sec-marker');
    });
    await settle();

    // Exactly one copy survives. WHICH copy is a merge-order detail already
    // pinned by templateRace.test.ts ("keep the first occurrence") — what
    // matters here is that the repair ran at all on a post-sync merge.
    expect(result.current.sections.filter((s) => s.id === 'tpl-abc')).toHaveLength(1);
    expect(result.current.sections.map((s) => s.id).sort()).toEqual([
      'sec-marker',
      'tpl-abc',
    ]);
  });

  it('keeps distinct sections that merely arrive separately', async () => {
    const bus = makeBus();
    const { result } = renderState(bus);

    bus.emit({
      type: 'crdt:snapshot',
      channel: CHANNEL,
      snapshot: peerDocWithSection('sec-1', 'Summary'),
    } as unknown as GatewayMessage);
    await settle();

    bus.emit({
      type: 'crdt:update',
      channel: CHANNEL,
      update: peerDocWithSection('sec-2', 'Action Items'),
    } as unknown as GatewayMessage);
    await settle();

    expect(result.current.sections.map((s) => s.id).sort()).toEqual([
      'sec-1',
      'sec-2',
    ]);
  });
});

// ---------------------------------------------------------------------------
// 2. Item-load failures are visible
// ---------------------------------------------------------------------------

describe('DocumentEditorPage — item load failures', () => {
  function renderPage(bus: ReturnType<typeof makeBus>) {
    return render(
      <IdentityProvider value={IDENTITY}>
        <DocumentEditorPage
          documentId="doc-1"
          ws={makeWs()}
          userId="u-tester"
          displayName="Tester"
          onMessage={bus.onMessage}
          activityPublish={vi.fn()}
          activityEvents={[]}
        />
      </IdentityProvider>,
    );
  }

  it('tells the user when a section’s action items failed to load', async () => {
    // useDocumentItems catches a failed per-section fetch and falls back to an
    // empty array. Until `itemErrors` was rendered, "the server is down" and
    // "this section has no items" looked identical, and the reader was told
    // there is nothing here for content that exists on the server.
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        if (String(url).includes('/items')) {
          return { ok: false, status: 503, json: async () => ({}), text: async () => '' };
        }
        return okJson(EMPTY_BODY);
      }),
    );

    const bus = makeBus();
    renderPage(bus);

    bus.emit({
      type: 'crdt:snapshot',
      channel: CHANNEL,
      snapshot: peerDocWithSection('sec-1', 'Risks'),
    } as unknown as GatewayMessage);

    await waitFor(() => {
      expect(screen.getByTestId('item-load-error-banner')).toBeInTheDocument();
    });
    expect(screen.getByTestId('item-load-error-banner')).toHaveTextContent('Risks');
  });

  it('shows no banner when every section loads its items', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => okJson(EMPTY_BODY)));

    const bus = makeBus();
    renderPage(bus);

    bus.emit({
      type: 'crdt:snapshot',
      channel: CHANNEL,
      snapshot: peerDocWithSection('sec-1', 'Risks'),
    } as unknown as GatewayMessage);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Risks')).toBeInTheDocument();
    });
    await settle();
    expect(screen.queryByTestId('item-load-error-banner')).toBeNull();
  });
});
