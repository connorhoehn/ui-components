// src/components/layout/AppLayout.test.tsx
//
// Tests for AppLayout — a top-level shell that wires React Router + the
// gateway contexts to a 2-column layout. We mount it inside a minimal
// demo-provider wrapper and stub every external hook so the tests stay
// deterministic.
//
// Coverage, in order: composition + defaultSidebarOpen (the original
// hub#1041 pass), then the behavioural surface — the gateway-driven
// notification banner and its timers, activating a mention, the global `?`
// shortcut's input guards, app-menu dismissal, the RECONNECT_EXHAUSTED
// toast, sidebar geometry, the docked-video outlet context, and route →
// active-view derivation.
//
// Blocks marked REGRESSION pin a bug that was live in this file; each one
// was confirmed to fail against the unfixed component before landing.

import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter, Routes, Route, useLocation, useOutletContext } from 'react-router';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Module mocks — replace every external hook + the lazy-loaded editor
// ---------------------------------------------------------------------------

const pendingApprovalsMock = vi.fn(() => [] as unknown[]);

vi.mock('../../hooks/useApiHealth', () => ({
  useApiHealth: () => ({ status: 'ok', checks: [] }),
}));

vi.mock('../../hooks/useRooms', () => ({
  useRooms: () => ({ rooms: [], loading: false, error: null }),
}));

vi.mock('../../hooks/useDocuments', () => ({
  useDocuments: () => ({
    documents: [],
    createDocument: vi.fn(),
    isLoading: false,
  }),
}));

vi.mock('../pipelines/context/EventStreamContext', async () => {
  const React = await import('react');
  return {
    EventStreamProvider: ({ children }: { children: ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useEventStreamContext: () => ({ dispatchEnvelope: vi.fn() }),
  };
});

vi.mock('../pipelines/context/PipelineRunsContext', async () => {
  const React = await import('react');
  return {
    PipelineRunsProvider: ({ children }: { children: ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

vi.mock('../pipelines/hooks/useDocumentTriggers', () => ({
  useDocumentTriggers: vi.fn(),
}));

vi.mock('../pipelines/hooks/useWebhookTriggers', () => ({
  useWebhookTriggers: vi.fn(),
}));

vi.mock('../pipelines/hooks/usePendingApprovals', () => ({
  usePendingApprovals: () => pendingApprovalsMock(),
}));

vi.mock('../pipelines/hooks/usePipelineActivityRelay', () => ({
  usePipelineActivityRelay: vi.fn(),
}));

vi.mock('../pipelines/context/WebSocketEventAdapter', () => ({
  useWebSocketPipelineEvents: vi.fn(),
}));

const listPipelinesMock = vi.fn<() => Promise<unknown[]>>(() => Promise.resolve([]));

vi.mock('../pipelines/persistence/pipelineStorageRemote', () => ({
  listPipelines: () => listPipelinesMock(),
}));

vi.mock('../observability/context/ObservabilityContext', async () => {
  const React = await import('react');
  return {
    ObservabilityProvider: ({ children }: { children: ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

vi.mock('../observability/hooks/useAlertToasts', () => ({
  useAlertToasts: vi.fn(),
}));

vi.mock('../doc-editor/DocumentEditorPage', () => ({
  default: () => null,
}));

vi.mock('../doc-editor/NewDocumentModal', () => ({
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="new-document-modal" /> : null,
}));

// ---------------------------------------------------------------------------
// Real imports (must come after vi.mock calls)
// ---------------------------------------------------------------------------

import { AppLayout, type AppLayoutProps, type DockVideoContext } from './AppLayout';
import type { GatewayError } from '../../types/gateway';
import { WebSocketProvider, type WebSocketContextValue } from '../../contexts/WebSocketContext';
import { IdentityProvider, type IdentityContextValue } from '../../contexts/IdentityContext';
import { PresenceProvider, type PresenceContextValue } from '../../contexts/PresenceContext';
import { ToastProvider } from '../shared/ToastProvider';

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

function baseProps(overrides: Partial<AppLayoutProps> = {}): AppLayoutProps {
  return {
    currentChannel: 'general',
    onSwitchChannel: vi.fn(),
    onDisconnect: vi.fn(),
    onReconnect: vi.fn(),
    activeReactions: [],
    logEntries: [],
    errors: [],
    lastError: null,
    activityEvents: [],
    activityPublish: vi.fn(),
    activityIsLive: false,
    ...overrides,
  };
}

// Every handler AppLayout registers through WebSocketContext.onMessage, plus
// the unregister function it was handed back. Lets a test drive the gateway
// message bus directly and assert the subscription is torn down.
type WsHandler = (msg: { type: string; payload?: unknown }) => void;
const wsHandlers: WsHandler[] = [];
const wsUnregisters: Array<() => void> = [];

/** Push a gateway frame through every registered handler. */
function emitGatewayMessage(msg: { type: string; payload?: unknown }) {
  act(() => {
    for (const h of [...wsHandlers]) h(msg);
  });
}

function makeWsValue(overrides: Partial<WebSocketContextValue> = {}): WebSocketContextValue {
  return {
    connectionState: 'connected',
    sendMessage: vi.fn(),
    onMessage: vi.fn((handler: WsHandler) => {
      wsHandlers.push(handler);
      const unregister = vi.fn(() => {
        const i = wsHandlers.indexOf(handler);
        if (i >= 0) wsHandlers.splice(i, 1);
      });
      wsUnregisters.push(unregister);
      return unregister;
    }) as unknown as WebSocketContextValue['onMessage'],
    ws: {} as WebSocketContextValue['ws'],
    clientId: 'self-client',
    sessionToken: 'session-tok',
    ...overrides,
  };
}

function makeIdentityValue(overrides: Partial<IdentityContextValue> = {}): IdentityContextValue {
  return {
    userId: 'self-user',
    displayName: 'Self User',
    userEmail: 'self@example.test',
    idToken: 'id-tok',
    onSignOut: vi.fn(),
    ...overrides,
  };
}

function makePresenceValue(overrides: Partial<PresenceContextValue> = {}): PresenceContextValue {
  return {
    presenceUsers: [],
    currentClientId: 'self-client',
    setTyping: vi.fn(),
    ...overrides,
  };
}

interface MountOpts {
  initialPath?: string;
  routeElement?: ReactNode;
  props?: Partial<AppLayoutProps>;
  ws?: Partial<WebSocketContextValue>;
  identity?: Partial<IdentityContextValue>;
  presence?: Partial<PresenceContextValue>;
}

/** Renders the current pathname so navigation assertions don't guess. */
function LocationProbe() {
  const location = useLocation();
  return <div data-testid="route-content" data-pathname={location.pathname}>Outlet content</div>;
}

/**
 * Route child that reaches into AppLayout's outlet context to dock/undock the
 * video document — the same seam DocumentEditorPage uses in the real app.
 */
function DockController() {
  const ctx = useOutletContext<DockVideoContext>();
  return (
    <div>
      <div data-testid="docked-id">{ctx.dockedVideoDocId ?? 'none'}</div>
      <button onClick={() => ctx.setDockedVideoDocId('doc-1')}>dock doc-1</button>
      <button onClick={() => ctx.setDockedVideoDocId(null)}>undock</button>
    </div>
  );
}

function Tree({
  props,
  wsValue,
  identityValue,
  presenceValue,
  initialPath,
  routeElement,
}: {
  props: AppLayoutProps;
  wsValue: WebSocketContextValue;
  identityValue: IdentityContextValue;
  presenceValue: PresenceContextValue;
  initialPath: string;
  routeElement: ReactNode;
}) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <ToastProvider>
        <IdentityProvider value={identityValue}>
          <WebSocketProvider value={wsValue}>
            <PresenceProvider value={presenceValue}>
              <Routes>
                <Route element={<AppLayout {...props} />}>
                  <Route path="*" element={routeElement} />
                </Route>
              </Routes>
            </PresenceProvider>
          </WebSocketProvider>
        </IdentityProvider>
      </ToastProvider>
    </MemoryRouter>
  );
}

function renderAppLayout(opts: MountOpts = {}) {
  const props = baseProps(opts.props);
  const wsValue = makeWsValue(opts.ws);
  const identityValue = makeIdentityValue(opts.identity);
  const presenceValue = makePresenceValue(opts.presence);
  const initialPath = opts.initialPath ?? '/';
  const routeElement = opts.routeElement ?? <LocationProbe />;

  const view = render(
    <Tree
      props={props}
      wsValue={wsValue}
      identityValue={identityValue}
      presenceValue={presenceValue}
      initialPath={initialPath}
      routeElement={routeElement}
    />,
  );

  /** Re-render the same tree with a patched AppLayout prop set. */
  const setProps = (patch: Partial<AppLayoutProps>) => {
    view.rerender(
      <Tree
        props={{ ...props, ...patch }}
        wsValue={wsValue}
        identityValue={identityValue}
        presenceValue={presenceValue}
        initialPath={initialPath}
        routeElement={routeElement}
      />,
    );
  };

  return { props, wsValue, identityValue, presenceValue, setProps, ...view };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  pendingApprovalsMock.mockReturnValue([]);
  listPipelinesMock.mockReturnValue(Promise.resolve([]));
  wsHandlers.length = 0;
  wsUnregisters.length = 0;
});

afterEach(() => {
  vi.useRealTimers();
});

describe('AppLayout — composition', () => {
  it('renders the app title, user email, and outlet content', () => {
    renderAppLayout({ identity: { userEmail: 'connor@example.test' } });
    expect(screen.getByText('WebSocket Gateway')).toBeInTheDocument();
    expect(screen.getByText('connor@example.test')).toBeInTheDocument();
    expect(screen.getByTestId('route-content')).toBeInTheDocument();
  });

  it('renders all six primary tabs', () => {
    renderAppLayout();
    // Scoped to the Primary nav landmark: the sidebar's DOCUMENTS / PIPELINES
    // section headers are real buttons with those same accessible names, so an
    // unscoped byRole lookup is ambiguous. (Before the CollapsibleSidebar a11y
    // fix the headers were role=button divs whose name included the "▸"
    // chevron, which accidentally kept this query unique.)
    const tabs = within(screen.getByRole('navigation', { name: 'Primary' }));
    for (const label of ['Previews', 'Social', 'Documents', 'Pipelines', 'Ingest', 'Observability']) {
      expect(tabs.getByRole('button', { name: label })).toBeInTheDocument();
    }
  });

  it('renders the open sidebar with CollapsibleSidebar by default and collapses on toggle', () => {
    renderAppLayout();
    // Open state: the sidebar collapse button is visible
    const collapseBtn = screen.getByRole('button', { name: /collapse/i });
    expect(collapseBtn).toBeInTheDocument();
    fireEvent.click(collapseBtn);
    // Collapsed state: the collapse button is replaced by an expand button
    expect(screen.queryByRole('button', { name: /collapse/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /expand/i })).toBeInTheDocument();
  });

  it('invokes IdentityContext.onSignOut when the Sign Out button is clicked', () => {
    const onSignOut = vi.fn();
    renderAppLayout({ identity: { onSignOut } });
    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });

  it('opens the app menu on hamburger click and shows menu sections', () => {
    renderAppLayout();
    const menuBtn = screen.getByRole('button', { name: /open app menu/i });
    fireEvent.click(menuBtn);
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Automation')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /document types/i })).toBeInTheDocument();
  });

  it('toggles the Dev Tools slide-out from the app menu', () => {
    renderAppLayout();
    fireEvent.click(screen.getByRole('button', { name: /open app menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /dev tools/i }));
    expect(screen.getByText('Dev Tools')).toBeInTheDocument();
    expect(screen.getByText(/clientId: self-client/i)).toBeInTheDocument();
  });

  it('renders a badge on Pending approvals when usePendingApprovals returns work', () => {
    pendingApprovalsMock.mockReturnValue([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);
    renderAppLayout({ initialPath: '/pipelines' });
    const badge = screen.getByTestId('pending-approvals-badge');
    expect(badge).toHaveTextContent('3');
  });

  it('omits the pending-approvals badge when the queue is empty', () => {
    pendingApprovalsMock.mockReturnValue([]);
    renderAppLayout({ initialPath: '/pipelines' });
    expect(screen.queryByTestId('pending-approvals-badge')).not.toBeInTheDocument();
  });

  it('renders the New Document button only when on /documents', () => {
    const { unmount } = renderAppLayout({ initialPath: '/social' });
    expect(screen.queryByTestId('new-document-btn')).not.toBeInTheDocument();
    unmount();

    renderAppLayout({ initialPath: '/documents' });
    expect(screen.getByTestId('new-document-btn')).toBeInTheDocument();
  });

  it('opens the new-document modal when the New Document button is clicked', () => {
    renderAppLayout({ initialPath: '/documents' });
    expect(screen.queryByTestId('new-document-modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('new-document-btn'));
    expect(screen.getByTestId('new-document-modal')).toBeInTheDocument();
  });

  it('opens the shortcuts help overlay when "?" is pressed', () => {
    renderAppLayout();
    // jsdom requires keydown on window with the matching key
    fireEvent.keyDown(window, { key: '?' });
    // ShortcutsHelp renders a dialog when open — assert by visible heading text
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows the Ingest sub-nav on /ingest', () => {
    renderAppLayout({ initialPath: '/ingest' });
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sources' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'DLQ' })).toBeInTheDocument();
  });

  it('shows the Observability sub-nav on /observability', () => {
    renderAppLayout({ initialPath: '/observability' });
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Nodes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Metrics' })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// defaultSidebarOpen — initial-only seed for the collapsible sidebar
//
// The 56px CollapsedIconStrip used to be reachable only by clicking the
// sidebar's collapse control, so a host could not restore a saved preference
// and a test could not render the collapsed chrome directly.
// ---------------------------------------------------------------------------

describe('AppLayout — defaultSidebarOpen', () => {
  it('starts with the full sidebar when the prop is omitted (unchanged default)', () => {
    renderAppLayout();
    expect(screen.queryByTestId('collapsed-icon-strip')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /collapse/i })).toBeInTheDocument();
  });

  it('renders the collapsed icon strip directly when false', () => {
    renderAppLayout({ props: { defaultSidebarOpen: false } });
    expect(screen.getByTestId('collapsed-icon-strip')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /collapse/i })).not.toBeInTheDocument();
  });

  it('stays uncontrolled — the strip’s expand button still restores the sidebar', () => {
    renderAppLayout({ props: { defaultSidebarOpen: false } });
    fireEvent.click(screen.getByRole('button', { name: /expand sidebar/i }));
    expect(screen.queryByTestId('collapsed-icon-strip')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /collapse/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Gateway-driven notification banner
//
// AppLayout subscribes to WebSocketContext.onMessage once on mount (empty dep
// array + latest-refs) and projects three frame shapes into banner entries.
// These tests drive the captured handler directly.
// ---------------------------------------------------------------------------

describe('AppLayout — notification banner', () => {
  it('registers exactly one gateway subscription and tears it down on unmount', () => {
    const { unmount } = renderAppLayout();
    expect(wsHandlers).toHaveLength(1);
    unmount();
    expect(wsUnregisters[0]).toHaveBeenCalledTimes(1);
    expect(wsHandlers).toHaveLength(0);
  });

  it('renders a member_joined notification with the truncated user id', () => {
    renderAppLayout();
    emitGatewayMessage({
      type: 'social:member_joined',
      payload: { userId: 'abcdefgh-ijkl', roomId: 'room-1' },
    });
    expect(screen.getByText('abcdefgh joined a room')).toBeInTheDocument();
  });

  it('ignores social:post for a room that is not the active room', () => {
    renderAppLayout();
    emitGatewayMessage({ type: 'social:post', payload: { roomId: 'room-1' } });
    expect(screen.queryByText(/New post in/)).not.toBeInTheDocument();
  });

  it('raises a mention notification when the display name matches case-insensitively', () => {
    renderAppLayout({ identity: { displayName: 'Connor Hoehn', userId: 'me' } });
    emitGatewayMessage({
      type: 'activity:event',
      payload: {
        eventType: 'doc.mention',
        userId: 'someone-else',
        detail: {
          mentionedNames: ['connor hoehn'],
          sectionId: 'sec-9',
          sectionTitle: 'Risks',
          authorName: 'Ada',
        },
      },
    });
    expect(screen.getByText('Ada mentioned you in Risks')).toBeInTheDocument();
    // Mentions carrying a sectionId are activatable, so they get button semantics.
    expect(screen.getByRole('button', { name: 'Ada mentioned you in Risks' })).toBeInTheDocument();
  });

  it('ignores a doc.mention authored by the current user', () => {
    renderAppLayout({ identity: { displayName: 'Connor', userId: 'me' } });
    emitGatewayMessage({
      type: 'activity:event',
      payload: {
        eventType: 'doc.mention',
        userId: 'me',
        detail: { mentionedNames: ['connor'], sectionId: 's1', authorName: 'Me' },
      },
    });
    expect(screen.queryByText(/mentioned you/)).not.toBeInTheDocument();
  });

  it('ignores a doc.mention aimed at somebody else', () => {
    renderAppLayout({ identity: { displayName: 'Connor', userId: 'me' } });
    emitGatewayMessage({
      type: 'activity:event',
      payload: {
        eventType: 'doc.mention',
        userId: 'other',
        detail: { mentionedNames: ['Someone Else'], sectionId: 's1', authorName: 'Ada' },
      },
    });
    expect(screen.queryByText(/mentioned you/)).not.toBeInTheDocument();
  });

  it('raises an assignment notification when an action item is assigned to me', () => {
    renderAppLayout({ identity: { userId: 'me' } });
    emitGatewayMessage({
      type: 'social:post',
      payload: {
        type: 'section:item:created',
        sectionId: 'sec-3',
        item: { assignee: 'me' },
      },
    });
    expect(screen.getByText('You were assigned an action item')).toBeInTheDocument();
  });

  it('ignores an action item assigned to somebody else', () => {
    renderAppLayout({ identity: { userId: 'me' } });
    emitGatewayMessage({
      type: 'social:post',
      payload: { type: 'section:item:updated', sectionId: 'sec-3', updates: { assignee: 'you' } },
    });
    expect(screen.queryByText('You were assigned an action item')).not.toBeInTheDocument();
  });

  it('keeps at most five banners, newest first', () => {
    renderAppLayout();
    for (let i = 0; i < 7; i++) {
      emitGatewayMessage({
        type: 'social:member_joined',
        payload: { userId: `user${i}`, roomId: 'r' },
      });
    }
    expect(screen.getAllByLabelText('Dismiss notification')).toHaveLength(5);
    // Oldest two (user0, user1) were dropped by the slice(0, 5) cap.
    expect(screen.queryByText('user0 joined a room')).not.toBeInTheDocument();
    expect(screen.getByText('user6 joined a room')).toBeInTheDocument();
  });

  it('auto-dismisses the oldest banner four seconds after it arrived', () => {
    vi.useFakeTimers();
    renderAppLayout();
    emitGatewayMessage({ type: 'social:member_joined', payload: { userId: 'aaa', roomId: 'r' } });
    act(() => { vi.advanceTimersByTime(2000); });
    emitGatewayMessage({ type: 'social:member_joined', payload: { userId: 'bbb', roomId: 'r' } });

    expect(screen.getByText('aaa joined a room')).toBeInTheDocument();
    // t=4000 relative to the first banner: only that one expires.
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.queryByText('aaa joined a room')).not.toBeInTheDocument();
    expect(screen.getByText('bbb joined a room')).toBeInTheDocument();

    // The second banner's own 4s budget still has 2s left.
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.queryByText('bbb joined a room')).not.toBeInTheDocument();
  });

  it('dismisses only the clicked banner', () => {
    renderAppLayout();
    emitGatewayMessage({ type: 'social:member_joined', payload: { userId: 'aaa', roomId: 'r' } });
    emitGatewayMessage({ type: 'social:member_joined', payload: { userId: 'bbb', roomId: 'r' } });
    const buttons = screen.getAllByLabelText('Dismiss notification');
    fireEvent.click(buttons[0]); // newest is rendered first
    expect(screen.queryByText('bbb joined a room')).not.toBeInTheDocument();
    expect(screen.getByText('aaa joined a room')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Activating a mention notification
// ---------------------------------------------------------------------------

function emitMention() {
  emitGatewayMessage({
    type: 'activity:event',
    payload: {
      eventType: 'doc.mention',
      userId: 'other',
      detail: {
        mentionedNames: ['self user'],
        sectionId: 'sec-42',
        sectionTitle: 'Scope',
        authorName: 'Ada',
      },
    },
  });
}

describe('AppLayout — activating a mention notification', () => {
  it('navigates to /documents and scrolls the section into view after the mount delay', () => {
    vi.useFakeTimers();
    const scrollIntoView = vi.fn();
    const target = document.createElement('div');
    target.id = 'section-sec-42';
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    renderAppLayout({ initialPath: '/social' });
    emitMention();
    fireEvent.click(screen.getByRole('button', { name: 'Ada mentioned you in Scope' }));

    expect(screen.getByTestId('route-content')).toHaveAttribute('data-pathname', '/documents');
    // Banner is dismissed immediately; the scroll is deferred by 300ms.
    expect(screen.queryByText('Ada mentioned you in Scope')).not.toBeInTheDocument();
    expect(scrollIntoView).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(300); });
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });

    document.body.removeChild(target);
  });

  // REGRESSION: the span carries role="button", so the WAI-ARIA button pattern
  // requires Space to activate it as well as Enter. Only Enter was handled, so
  // a keyboard user pressing Space got a page scroll and nothing else.
  it.each([['Enter'], [' ']])('activates on "%s" from the keyboard', (key) => {
    renderAppLayout({ initialPath: '/social' });
    emitMention();
    const banner = screen.getByRole('button', { name: 'Ada mentioned you in Scope' });
    banner.focus();
    fireEvent.keyDown(banner, { key });
    expect(screen.getByTestId('route-content')).toHaveAttribute('data-pathname', '/documents');
  });

  it('does not activate on an unrelated key', () => {
    renderAppLayout({ initialPath: '/social' });
    emitMention();
    const banner = screen.getByRole('button', { name: 'Ada mentioned you in Scope' });
    fireEvent.keyDown(banner, { key: 'a' });
    expect(screen.getByTestId('route-content')).toHaveAttribute('data-pathname', '/social');
  });

  // REGRESSION: the 300ms scroll timer was fired-and-forgotten, so unmounting
  // the layout in that window still reached into the document afterwards.
  it('cancels the deferred scroll when the layout unmounts first', () => {
    vi.useFakeTimers();
    const getById = vi.spyOn(document, 'getElementById');
    const { unmount } = renderAppLayout({ initialPath: '/social' });
    emitMention();
    fireEvent.click(screen.getByRole('button', { name: 'Ada mentioned you in Scope' }));
    getById.mockClear();

    unmount();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(getById).not.toHaveBeenCalled();
    getById.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// Global `?` shortcut
// ---------------------------------------------------------------------------

describe('AppLayout — global "?" shortcut', () => {
  it('does not open while focus is in a text input', () => {
    renderAppLayout();
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    fireEvent.keyDown(input, { key: '?' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    document.body.removeChild(input);
  });

  it('does not open while focus is in a textarea', () => {
    renderAppLayout();
    const ta = document.createElement('textarea');
    document.body.appendChild(ta);
    ta.focus();
    fireEvent.keyDown(ta, { key: '?' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    document.body.removeChild(ta);
  });

  it('does not open while focus is in a contenteditable surface', () => {
    renderAppLayout();
    const div = document.createElement('div');
    // jsdom does not derive isContentEditable from the attribute.
    Object.defineProperty(div, 'isContentEditable', { value: true });
    document.body.appendChild(div);
    fireEvent.keyDown(div, { key: '?' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    document.body.removeChild(div);
  });

  it('removes the window listener on unmount', () => {
    const { unmount } = renderAppLayout();
    unmount();
    fireEvent.keyDown(window, { key: '?' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// App menu dismissal
//
// REGRESSION SUITE: the hamburger menu was hand-rolled with no dismissal path
// other than re-clicking the trigger — clicking the page behind it or pressing
// Escape left it parked over the content, and it advertised nothing about its
// expanded state to assistive tech.
// ---------------------------------------------------------------------------

describe('AppLayout — app menu dismissal', () => {
  const openMenu = () => {
    const trigger = screen.getByRole('button', { name: /open app menu/i });
    fireEvent.click(trigger);
    return trigger;
  };

  it('advertises its expanded state on the trigger', () => {
    renderAppLayout();
    const trigger = screen.getByRole('button', { name: /open app menu/i });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes on Escape and restores focus to the trigger', () => {
    renderAppLayout();
    const trigger = openMenu();
    expect(screen.getByTestId('app-menu')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('app-menu')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it('closes on an outside click', () => {
    renderAppLayout();
    openMenu();
    expect(screen.getByTestId('app-menu')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId('app-menu')).not.toBeInTheDocument();
  });

  it('stays open when the click lands inside the menu', () => {
    renderAppLayout();
    openMenu();
    const menu = screen.getByTestId('app-menu');
    fireEvent.mouseDown(within(menu).getByRole('button', { name: /pipelines/i }));
    expect(screen.getByTestId('app-menu')).toBeInTheDocument();
  });

  it('does not react to Escape while the menu is closed', () => {
    renderAppLayout();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('app-menu')).not.toBeInTheDocument();
  });

  it('navigates and closes when a menu item is chosen', () => {
    renderAppLayout();
    openMenu();
    fireEvent.click(
      within(screen.getByTestId('app-menu')).getByRole('button', { name: /observability/i }),
    );
    expect(screen.queryByTestId('app-menu')).not.toBeInTheDocument();
    expect(screen.getByTestId('route-content')).toHaveAttribute('data-pathname', '/observability');
  });
});

// ---------------------------------------------------------------------------
// RECONNECT_EXHAUSTED toast
// ---------------------------------------------------------------------------

const exhausted = (timestamp: string): GatewayError => ({
  code: 'RECONNECT_EXHAUSTED',
  message: 'Could not reconnect',
  timestamp,
});

describe('AppLayout — reconnect-exhausted toast', () => {
  it('raises one error toast with a Reconnect action', () => {
    const onReconnect = vi.fn();
    renderAppLayout({ props: { lastError: exhausted('2026-01-01T00:00:00Z'), onReconnect } });
    expect(screen.getByText('Could not reconnect')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reconnect' }));
    expect(onReconnect).toHaveBeenCalledTimes(1);
  });

  it('stays silent for other error codes', () => {
    renderAppLayout({
      props: { lastError: { code: 'AUTH_TOKEN_EXPIRED', message: 'nope', timestamp: 't' } },
    });
    expect(screen.queryByText('nope')).not.toBeInTheDocument();
  });

  it('does not re-toast when the same error survives a re-render', () => {
    const err = exhausted('2026-01-01T00:00:00Z');
    const { setProps } = renderAppLayout({ props: { lastError: err } });
    setProps({ lastError: { ...err } });
    setProps({ lastError: { ...err } });
    expect(screen.getAllByText('Could not reconnect')).toHaveLength(1);
  });

  // REGRESSION: the de-dupe used to key on the error CODE alone, so only the
  // first exhaustion ever toasted. The user would click "Reconnect", the retry
  // budget would burn down again, and the second (and every later) exhaustion
  // was swallowed — no toast, no retry affordance, for the rest of the session.
  it('toasts again when a later exhaustion arrives', () => {
    const { setProps } = renderAppLayout({
      props: { lastError: exhausted('2026-01-01T00:00:00Z') },
    });
    expect(screen.getAllByText('Could not reconnect')).toHaveLength(1);
    setProps({ lastError: exhausted('2026-01-01T00:05:00Z') });
    expect(screen.getAllByText('Could not reconnect')).toHaveLength(2);
  });

  // The toast outlives the render that queued it, so its action must call the
  // CURRENT onReconnect — this is what useEventCallback buys us.
  it('the Reconnect action calls the latest onReconnect prop', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { setProps } = renderAppLayout({
      props: { lastError: exhausted('2026-01-01T00:00:00Z'), onReconnect: first },
    });
    setProps({ onReconnect: second });
    fireEvent.click(screen.getByRole('button', { name: 'Reconnect' }));
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Sidebar geometry + docked video
// ---------------------------------------------------------------------------

describe('AppLayout — sidebar geometry', () => {
  it('offsets the main column by the open sidebar width, then by the collapsed width', () => {
    const { container } = renderAppLayout();
    const main = container.querySelector('[style*="margin-left"]') as HTMLElement;
    expect(main.style.marginLeft).toBe('260px');
    expect(main.style.width).toBe('calc(100% - 260px)');

    fireEvent.click(screen.getByRole('button', { name: /collapse sidebar/i }));
    expect(main.style.marginLeft).toBe('56px');
    expect(main.style.width).toBe('calc(100% - 56px)');
  });
});

describe('AppLayout — docked video', () => {
  it('mounts the sidebar video slot while a document is docked', () => {
    renderAppLayout({ initialPath: '/social', routeElement: <DockController /> });
    expect(document.getElementById('sidebar-video-slot')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'dock doc-1' }));
    expect(screen.getByTestId('docked-id')).toHaveTextContent('doc-1');
    expect(document.getElementById('sidebar-video-slot')).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'undock' }));
    expect(document.getElementById('sidebar-video-slot')).toBeNull();
  });

  it('leaves the docked mount to the Outlet when the route already owns that document', () => {
    const { container } = renderAppLayout({
      initialPath: '/documents/doc-1',
      routeElement: <DockController />,
    });
    fireEvent.click(screen.getByRole('button', { name: 'dock doc-1' }));
    // The sidebar slot still appears, but the duplicate hidden editor must not.
    expect(document.getElementById('sidebar-video-slot')).not.toBeNull();
    expect(container.querySelector('div.hidden')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Pipeline index -> sidebar
// ---------------------------------------------------------------------------

describe('AppLayout — pipeline index', () => {
  it('feeds the resolved pipeline index into the sidebar', async () => {
    listPipelinesMock.mockReturnValue(
      Promise.resolve([{ id: 'p1', name: 'Nightly ingest', status: 'published', updatedAt: 1 }]),
    );
    renderAppLayout();
    expect(await screen.findByText('Nightly ingest')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Route -> active view derivation
// ---------------------------------------------------------------------------

describe('AppLayout — active view derivation', () => {
  it.each([['/documents'], ['/document-types'], ['/field-types']])(
    'shows the content sub-nav on %s',
    (path) => {
      renderAppLayout({ initialPath: path });
      expect(screen.getByRole('button', { name: 'Document Types' })).toBeInTheDocument();
    },
  );

  it('does not confuse /document-types with the /documents prefix', () => {
    renderAppLayout({ initialPath: '/document-types' });
    // "+ New Document" is exclusive to the /documents list route.
    expect(screen.queryByTestId('new-document-btn')).not.toBeInTheDocument();
  });

  it.each([['/pipelines'], ['/pipelines/runs']])('shows the pipelines sub-nav on %s', (path) => {
    renderAppLayout({ initialPath: path });
    expect(screen.getByRole('button', { name: 'Pending approvals' })).toBeInTheDocument();
  });

  it('shows no sub-nav on an unmatched route', () => {
    renderAppLayout({ initialPath: '/previews' });
    expect(screen.queryByRole('button', { name: 'Pending approvals' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Document Types' })).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Sidebar collapse/expand focus handoff
//
// REGRESSION SUITE: collapsing the sidebar unmounts CollapsibleSidebar (and
// with it the ✕ the user just pressed) and mounts CollapsedIconStrip in its
// place. Focus fell to <body>, so a keyboard user's next Tab restarted from
// the top of the document with no announcement. Expanding had the mirror-image
// problem. AppLayout owns the swap, so it hands focus to the counterpart
// control in whichever chrome just mounted.
// ---------------------------------------------------------------------------

describe('AppLayout — sidebar collapse focus handoff', () => {
  it('moves focus to the expand control when the sidebar collapses', () => {
    renderAppLayout();
    const collapse = screen.getByRole('button', { name: /collapse sidebar/i });
    collapse.focus();
    fireEvent.click(collapse);

    const expand = screen.getByRole('button', { name: /expand sidebar/i });
    expect(document.activeElement).toBe(expand);
    expect(document.activeElement).not.toBe(document.body);
  });

  it('moves focus back to the collapse control when the sidebar expands', () => {
    renderAppLayout({ props: { defaultSidebarOpen: false } });
    const expand = screen.getByRole('button', { name: /expand sidebar/i });
    expand.focus();
    fireEvent.click(expand);

    const collapse = screen.getByRole('button', { name: /collapse sidebar/i });
    expect(document.activeElement).toBe(collapse);
  });

  it('does not steal focus on first mount', () => {
    renderAppLayout({ props: { defaultSidebarOpen: false } });
    expect(document.activeElement).toBe(document.body);
  });
});
