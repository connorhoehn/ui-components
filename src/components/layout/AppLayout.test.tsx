// src/components/layout/AppLayout.test.tsx
//
// Composition tests for AppLayout (837 LOC, zero coverage before hub#1041).
// AppLayout is a top-level shell that wires React Router + the gateway
// contexts to a 2-column layout. We mount it inside a minimal demo-provider
// wrapper and stub every external hook so the tests stay deterministic.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router';
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

vi.mock('../pipelines/persistence/pipelineStorageRemote', () => ({
  listPipelines: () => Promise.resolve([]),
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

import { AppLayout, type AppLayoutProps } from './AppLayout';
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

function makeWsValue(overrides: Partial<WebSocketContextValue> = {}): WebSocketContextValue {
  return {
    connectionState: 'connected',
    sendMessage: vi.fn(),
    onMessage: vi.fn(() => () => undefined),
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
  props?: Partial<AppLayoutProps>;
  ws?: Partial<WebSocketContextValue>;
  identity?: Partial<IdentityContextValue>;
  presence?: Partial<PresenceContextValue>;
}

function renderAppLayout(opts: MountOpts = {}) {
  const props = baseProps(opts.props);
  const wsValue = makeWsValue(opts.ws);
  const identityValue = makeIdentityValue(opts.identity);
  const presenceValue = makePresenceValue(opts.presence);

  return {
    props,
    wsValue,
    identityValue,
    presenceValue,
    ...render(
      <MemoryRouter initialEntries={[opts.initialPath ?? '/']}>
        <ToastProvider>
          <IdentityProvider value={identityValue}>
            <WebSocketProvider value={wsValue}>
              <PresenceProvider value={presenceValue}>
                <Routes>
                  <Route element={<AppLayout {...props} />}>
                    <Route path="*" element={<div data-testid="route-content">Outlet content</div>} />
                  </Route>
                </Routes>
              </PresenceProvider>
            </WebSocketProvider>
          </IdentityProvider>
        </ToastProvider>
      </MemoryRouter>,
    ),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  pendingApprovalsMock.mockReturnValue([]);
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
    for (const label of ['Previews', 'Social', 'Documents', 'Pipelines', 'Ingest', 'Observability']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
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
