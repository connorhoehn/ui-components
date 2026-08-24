// frontend/src/components/AppLayout.tsx
//
// Structured 2-column app layout with header, sidebar, and main content sections.
// Replaces the monolithic vertical stack in GatewayDemo.
//
// NOT a pure presentational component (the header comment claimed that for
// years): it reads the WebSocket / Identity / Presence contexts, owns the
// gateway notification banner, the collapsible sidebar, the docked-video
// outlet context and the global `?` shortcut, and mounts the pipeline
// event-stream + observability providers for the whole app.
//
// FOLLOW-UP: the hamburger menu below is hand-rolled. `shared/DropdownMenu`
// (align="end") was built for exactly this shape and adds role="menu"
// semantics plus arrow-key navigation on top of the dismissal behaviour wired
// in here. Migrating it is a separate change — it moves the menu into a
// portal and changes the item roles, so consumer snapshots need a heads-up.

import { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import type { GatewayError } from '../../types/gateway';
import type { EphemeralReaction } from '../../hooks/useReactions';
import type { LogEntry } from '../misc/EventLog';
import { useRooms } from '../../hooks/useRooms';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useEventCallback } from '../../hooks/useEventCallback';
import { useWebSocketContext } from '../../contexts/WebSocketContext';
import { useIdentityContext } from '../../contexts/IdentityContext';
import { usePresenceContext } from '../../contexts/PresenceContext';

import { ConnectionStatus } from './ConnectionStatus';
import { ApiDegradedBanner } from './ApiDegradedBanner';
import { useApiHealth } from '../../hooks/useApiHealth';
import { useToast } from '../shared/ToastProvider';
import { CollapsibleSidebar } from './CollapsibleSidebar';
import { CollapsedIconStrip } from './CollapsedIconStrip';
import { ReactionsOverlay } from '../collaboration/ReactionsOverlay';
import { ErrorDisplay } from '../misc/ErrorDisplay';
import { ErrorPanel } from '../misc/ErrorPanel';
import { TabbedEventLog } from '../misc/TabbedEventLog';
import NewDocumentModal from '../doc-editor/NewDocumentModal';
import ShortcutsHelp from '../shared/ShortcutsHelp';
import { useDocuments } from '../../hooks/useDocuments';
import { ErrorBoundary } from '../misc/ErrorBoundary';
import { EventStreamProvider, useEventStreamContext } from '../pipelines/context/EventStreamContext';
import { PipelineRunsProvider } from '../pipelines/context/PipelineRunsContext';
import { useDocumentTriggers } from '../pipelines/hooks/useDocumentTriggers';
import { useWebhookTriggers } from '../pipelines/hooks/useWebhookTriggers';
import { usePendingApprovals } from '../pipelines/hooks/usePendingApprovals';
import { usePipelineActivityRelay } from '../pipelines/hooks/usePipelineActivityRelay';
import { useWebSocketPipelineEvents } from '../pipelines/context/WebSocketEventAdapter';
import { type PipelineIndexEntry } from '../pipelines/persistence/pipelineStorage';
import { listPipelines } from '../pipelines/persistence/pipelineStorageRemote';
import { ObservabilityProvider } from '../observability/context/ObservabilityContext';
import { useAlertToasts } from '../observability/hooks/useAlertToasts';
import { cn } from '../../lib/cn';

// Lazy-loaded: only DocumentEditorPage needed for docked video persistence
const DocumentEditorPage = lazy(() => import('../doc-editor/DocumentEditorPage'));

// Outlet context — lets routed pages read/mutate the docked-video state without
// prop drilling through React Router.
export interface DockVideoContext {
  dockedVideoDocId: string | null;
  setDockedVideoDocId: (id: string | null) => void;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Notification {
  id: string;
  message: string;
  type: 'follow' | 'member_joined' | 'post_created' | 'mention' | 'assignment';
  timestamp: number;
  /** For mention notifications: section ID to jump to */
  sectionId?: string;
}

// ---------------------------------------------------------------------------
// NotificationBanner internal component (UXIN-04)
// ---------------------------------------------------------------------------

function NotificationBanner({ notifications, onDismiss, onClick }: {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onClick?: (notification: Notification) => void;
}) {
  if (notifications.length === 0) return null;

  const isClickable = (n: Notification) => (n.type === 'mention' || n.type === 'assignment') && !!n.sectionId;

  return (
    <div className="fixed top-16 right-4 w-80 z-[1000] flex flex-col gap-2">
      {notifications.map(n => (
        <div
          key={n.id}
          className={cn(
            'bg-surface border border-border rounded-lg px-4 py-3',
            'flex items-center justify-between font-sans shadow-md',
            'animate-[slideInRight_0.3s_ease-out]',
            n.type === 'mention'
              ? 'border-l-[3px] border-l-info'
              : 'border-l-[3px] border-l-primary',
          )}
        >
          <span
            role={isClickable(n) ? 'button' : undefined}
            tabIndex={isClickable(n) ? 0 : undefined}
            onClick={isClickable(n) ? () => onClick?.(n) : undefined}
            // role="button" must answer to Space as well as Enter (WAI-ARIA
            // button pattern). Handling Enter only meant a keyboard user
            // pressing Space on a mention got nothing but a page scroll.
            onKeyDown={isClickable(n) ? (e) => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                onClick?.(n);
              }
            } : undefined}
            className={cn(
              'text-sm text-text-primary font-normal',
              isClickable(n) && 'cursor-pointer underline decoration-text-tertiary'
            )}
          >
            {n.message}
          </span>
          <button
            onClick={() => onDismiss(n.id)}
            aria-label="Dismiss notification"
            className="text-base text-text-tertiary bg-none border-none cursor-pointer pl-3 leading-none"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface AppLayoutProps {
  // Channel routing
  currentChannel: string;
  onSwitchChannel: (channel: string) => void;
  onDisconnect: () => void;
  onReconnect: () => void;

  // Reactions overlay
  activeReactions: EphemeralReaction[];

  // Dev tools
  logEntries: LogEntry[];
  errors: GatewayError[];
  lastError: GatewayError | null;

  // Activity bus
  activityEvents: import('../../hooks/useActivityBus').ActivityEvent[];
  activityPublish: (eventType: string, detail: Record<string, unknown>) => void;
  activityIsLive: boolean;

  /**
   * Whether the left sidebar starts expanded. Optional and **initial-only**
   * — the layout still owns the state afterwards, so the collapse/expand
   * controls keep working. Omit it and the sidebar starts open, which is the
   * historical behaviour.
   *
   * It exists because the 56px `CollapsedIconStrip` was previously reachable
   * only by clicking the sidebar's collapse control: a host cannot restore
   * the user's saved preference on mount, and a test has to click before it
   * can assert on the collapsed chrome.
   */
  defaultSidebarOpen?: boolean;
}


// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Wraps the layout body in the pipelines event-stream + runs providers so
 * the cross-pipeline approvals page and the document-trigger hook can
 * share a single runs store for the whole app. Events are sourced from the
 * gateway WS bridge — there is no other producer.
 */
export function AppLayout(props: AppLayoutProps) {
  return (
    <EventStreamProvider>
      <PipelineRunsProvider>
        <ObservabilityProvider>
          <AppLayoutInner {...props} />
        </ObservabilityProvider>
      </PipelineRunsProvider>
    </EventStreamProvider>
  );
}

function AppLayoutInner({
  currentChannel,
  onDisconnect,
  onReconnect,
  activeReactions,
  logEntries,
  errors,
  lastError,
  activityEvents,
  activityPublish,
  defaultSidebarOpen = true,
}: AppLayoutProps) {
  // Pull shared state from contexts
  const { connectionState, sendMessage, onMessage, ws, clientId, sessionToken } = useWebSocketContext();
  const { userId, displayName, userEmail, idToken, onSignOut } = useIdentityContext();
  const { presenceUsers, currentClientId } = usePresenceContext();
  const navigate = useNavigate();
  const location = useLocation();
  const apiHealth = useApiHealth();
  const { toast } = useToast();

  // Surface a single, consolidated toast when the WebSocket retry budget is
  // exhausted. The hook silences per-attempt console noise and emits exactly
  // one terminal lastError with code RECONNECT_EXHAUSTED.
  //
  // The de-dupe key is `code@timestamp`, not the bare code. Keying on the code
  // alone meant the SECOND exhaustion was swallowed: the user clicks the
  // toast's "Reconnect" action, the retry budget burns down again, a fresh
  // RECONNECT_EXHAUSTED arrives — and because the ref still held
  // 'RECONNECT_EXHAUSTED' from the first one, no toast and no retry affordance
  // ever appeared again for the rest of the session. Every GatewayError
  // carries its own `timestamp`, so the key changes per occurrence while
  // re-renders that carry the same error stay silent.
  //
  // `onReconnect` is a consumer prop and is almost always an inline arrow, so
  // it goes through useEventCallback rather than into the dependency array.
  const onReconnectStable = useEventCallback(onReconnect);
  const lastErrorKeyRef = useRef<string | null>(null);
  useEffect(() => {
    const key = lastError ? `${lastError.code}@${lastError.timestamp}` : null;
    if (lastError?.code === 'RECONNECT_EXHAUSTED' && lastErrorKeyRef.current !== key) {
      toast(lastError.message, {
        type: 'error',
        actionLabel: 'Reconnect',
        onAction: () => onReconnectStable(),
      });
    }
    lastErrorKeyRef.current = key;
  }, [lastError, toast, onReconnectStable]);

  // Derive active view from URL path
  const activeView: 'panels' | 'social' | 'dashboard' | 'doc-editor' | 'doc-types' | 'field-types' | 'pipelines' | 'ingest' | 'observability' =
    location.pathname.startsWith('/pipelines') ? 'pipelines' :
    location.pathname.startsWith('/ingest') ? 'ingest' :
    location.pathname.startsWith('/observability') ? 'observability' :
    location.pathname.startsWith('/documents') ? 'doc-editor' :
    location.pathname.startsWith('/social') ? 'social' :
    location.pathname.startsWith('/dashboard') ? 'dashboard' :
    location.pathname.startsWith('/document-types') ? 'doc-types' :
    location.pathname.startsWith('/field-types') ? 'field-types' : 'panels';

  const [activeRoomId] = useState<string | null>(null);
  const [showDevTools, setShowDevTools] = useState(false);
  const [showAppMenu, setShowAppMenu] = useState(false);
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  // Global keyboard shortcut help overlay, toggled by `?`.
  const [showShortcuts, setShowShortcuts] = useState(false);
  // Video call docked to sidebar — persists across document navigation
  const [dockedVideoDocId, setDockedVideoDocId] = useState<string | null>(null);
  // Collapsible left sidebar — collapsed state shows a 56px icon strip,
  // not a fully-hidden surface (the previous behavior left the main content
  // edge-to-edge with only an overlay hamburger as the entry point).
  const [sidebarOpen, setSidebarOpen] = useState(defaultSidebarOpen);
  const SIDEBAR_COLLAPSED_WIDTH = 56;
  const SIDEBAR_OPEN_WIDTH = 260;
  const SIDEBAR_WIDTH = sidebarOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_COLLAPSED_WIDTH;

  const { rooms } = useRooms({ idToken: idToken!, onMessage });

  const { documents, createDocument } = useDocuments({
    sendMessage,
    onMessage,
    connectionState,
  });

  // Pipeline index — read from localStorage on mount.
  const [pipelineIndex, setPipelineIndex] = useState<PipelineIndexEntry[]>([]);
  useEffect(() => {
    // Guard the resolve: listPipelines() is a network read and the layout can
    // unmount (sign-out, host route swap) long before it settles. Without the
    // flag the resolution lands on an unmounted tree.
    let cancelled = false;
    void listPipelines().then((entries) => {
      if (!cancelled) setPipelineIndex(entries);
    });
    return () => { cancelled = true; };
  }, []);

  // Wire the activity bus to pipeline triggers (PIPELINES_PLAN.md §5.1).
  // Fires once per new doc.finalize / doc.comment / doc.add_item event
  // against any published pipeline whose triggerBinding matches.
  useDocumentTriggers(activityEvents);

  // Webhook variant — listens for `pipeline.webhook.triggered` events on the
  // EventStream and fires runs whose triggerBinding matches by webhookPath.
  useWebhookTriggers();

  // WebSocket pipeline source — the only event producer. Subscribes to
  // 'pipeline:all' on the gateway and forwards decoded envelopes to
  // EventStreamContext. Mounted here (rather than in GatewayDemo) because
  // this is the first component inside both <WebSocketProvider> and
  // <EventStreamProvider>, and it covers all routes (editor + observability
  // + approvals).
  const { dispatchEnvelope } = useEventStreamContext();
  useWebSocketPipelineEvents({
    channel: 'pipeline:all',
    onEvent: (env) => dispatchEnvelope(env),
    enabled: true,
  });

  // Cross-pipeline pending-approvals count — badged in the sub-nav.
  const pendingApprovals = usePendingApprovals();
  const pendingApprovalsCount = pendingApprovals.length;

  // Mirror pipeline run-lifecycle events onto the activity bus so they show
  // up in BigBrotherPanel / ActivityFeed / ActivityPanel alongside doc.* and
  // social.* entries. No-op when the event source is the gateway (the bridge
  // publishes directly in that mode — see usePipelineActivityRelay).
  usePipelineActivityRelay(activityPublish);

  // Surface cluster-health alerts from the observability dashboard as toasts.
  // Requires <ObservabilityProvider> (hoisted above AppLayoutInner) and
  // <ToastProvider> (mounted in App.tsx).
  useAlertToasts();

  // Notification state (UXIN-04)
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const activeRoomIdRef = useRef(activeRoomId);
  useEffect(() => { activeRoomIdRef.current = activeRoomId; }, [activeRoomId]);

  // Keep a ref to rooms so the notification handler can resolve names without restacking
  const roomsRef = useRef(rooms);
  useEffect(() => { roomsRef.current = rooms; }, [rooms]);

  // Stable onMessage ref for notification subscription
  const onMessageRef = useRef(onMessage);
  useEffect(() => { onMessageRef.current = onMessage; }, [onMessage]);

  // Refs for notification handler (avoids stale closure in [] deps effect)
  const displayNameRef = useRef(displayName);
  useEffect(() => { displayNameRef.current = displayName; }, [displayName]);
  const userIdRef = useRef(userId);
  useEffect(() => { userIdRef.current = userId; }, [userId]);

  // Subscribe to social events + mention notifications
  useEffect(() => {
    const unregister = onMessageRef.current((msg) => {
      let message: string | null = null;
      let type: Notification['type'] | null = null;
      let sectionId: string | undefined;

      if (msg.type === 'social:member_joined') {
        const payload = msg.payload as { userId?: string; roomId?: string } | undefined;
        const roomName = roomsRef.current.find(r => r.roomId === payload?.roomId)?.name ?? 'a room';
        const who = payload?.userId?.slice(0, 8) ?? 'Someone';
        message = `${who} joined ${roomName}`;
        type = 'member_joined';
      } else if (msg.type === 'social:post') {
        const payload = msg.payload as { roomId?: string } | undefined;
        if (payload?.roomId === activeRoomIdRef.current) {
          const roomName = roomsRef.current.find(r => r.roomId === payload.roomId)?.name ?? 'this room';
          message = `New post in ${roomName}`;
          type = 'post_created';
        }
      } else if (msg.type === 'activity:event') {
        const payload = msg.payload as {
          eventType?: string;
          detail?: {
            mentionedNames?: string[];
            sectionId?: string;
            sectionTitle?: string;
            authorName?: string;
          };
          userId?: string;
        } | undefined;

        if (
          payload?.eventType === 'doc.mention' &&
          payload.userId !== userIdRef.current &&
          Array.isArray(payload.detail?.mentionedNames) &&
          payload.detail!.mentionedNames.some(
            name => name.toLowerCase() === displayNameRef.current.toLowerCase()
          )
        ) {
          const author = payload.detail!.authorName ?? 'Someone';
          const section = payload.detail!.sectionTitle ?? 'a section';
          message = `${author} mentioned you in ${section}`;
          type = 'mention';
          sectionId = payload.detail!.sectionId;
        }
      }

      // Handle item assignment notifications
      if (!message && msg.type === 'social:post') {
        const payload = msg.payload as Record<string, unknown> | undefined;
        if (payload) {
          const postType = payload.type as string | undefined;
          if (postType === 'section:item:created' || postType === 'section:item:updated') {
            const item = payload.item as { assignee?: string } | undefined;
            const updates = payload.updates as { assignee?: string } | undefined;
            const assignee = item?.assignee ?? updates?.assignee;

            if (assignee && assignee === userIdRef.current) {
              message = 'You were assigned an action item';
              type = 'assignment';
              sectionId = payload.sectionId as string | undefined;
            }
          }
        }
      }

      if (message && type) {
        const id = `${Date.now()}-${Math.random()}`;
        setNotifications(prev => {
          const next = [{ id, message: message!, type: type!, timestamp: Date.now(), ...(sectionId ? { sectionId } : {}) }, ...prev];
          return next.slice(0, 5);
        });
      }
    });
    return unregister;
  }, []);

  // Auto-dismiss notifications after 4 seconds
  useEffect(() => {
    if (notifications.length === 0) return;
    const oldest = notifications[notifications.length - 1];
    const age = Date.now() - oldest.timestamp;
    const delay = Math.max(0, 4000 - age);
    const timer = setTimeout(() => {
      setNotifications(prev => prev.slice(0, -1));
    }, delay);
    return () => clearTimeout(timer);
  }, [notifications]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Global `?` → open shortcuts help. Skip when focus is in an input /
  // textarea / contenteditable so it doesn't swallow literal `?` typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '?') return;
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        if (target.isContentEditable) return;
      }
      e.preventDefault();
      setShowShortcuts(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Deferred scroll-into-view timer for a clicked mention/assignment
  // notification. Held in a ref so unmounting mid-flight cancels it — the
  // callback reached into `document` 300ms after the layout was gone.
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (scrollTimerRef.current !== null) clearTimeout(scrollTimerRef.current);
  }, []);

  const handleNotificationClick = useCallback((notification: Notification) => {
    if (notification.sectionId) {
      navigate('/documents');
      dismissNotification(notification.id);
      // Allow the doc editor view to mount before scrolling
      if (scrollTimerRef.current !== null) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        scrollTimerRef.current = null;
        document.getElementById(`section-${notification.sectionId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [navigate, dismissNotification]);

  // App-level hamburger menu dismissal. The menu was hand-rolled with no way
  // out other than re-clicking the trigger: clicking the page behind it or
  // pressing Escape left it parked over the content. Escape also restores
  // focus to the trigger so keyboard users are not dumped at the top of the
  // document.
  const appMenuRef = useRef<HTMLDivElement>(null);
  const appMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeAppMenu = useCallback(() => setShowAppMenu(false), []);
  useClickOutside(appMenuRef, closeAppMenu, showAppMenu);
  useEffect(() => {
    if (!showAppMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      setShowAppMenu(false);
      appMenuTriggerRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showAppMenu]);

  // Helper for menu button classes
  const menuBtnClass = (isActive: boolean) => cn(
    'block w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] hover:bg-surface-panel',
    isActive ? 'bg-surface-hover text-text-primary font-semibold' : 'bg-transparent text-text-primary font-normal'
  );

  // Helper for tab button classes
  const tabBtnClass = (isActive: boolean) => cn(
    'px-3.5 py-1.5 border-none rounded-md cursor-pointer font-[inherit] transition-[background,color] duration-[120ms] ease-in-out',
    isActive
      ? 'bg-primary-bg text-text-primary font-semibold'
      : 'bg-transparent text-neutral font-medium hover:bg-surface-hover'
  );

  // Sub-nav tab class
  const subTabClass = (isActive: boolean) => cn(
    'px-3 py-[5px] border-none rounded-md cursor-pointer font-[inherit] text-[0.8125rem] transition-[background,color] duration-[120ms] ease-in-out',
    isActive
      ? 'bg-primary-bg text-text-primary font-semibold'
      : 'bg-transparent text-neutral font-medium hover:bg-surface-hover'
  );

  return (
    <div className="relative min-h-screen font-sans bg-surface-panel">
      {/* Reactions overlay — fixed-position, sits above everything */}
      <ReactionsOverlay reactions={activeReactions} />

      {/* Notification banner — fixed-position top-right (UXIN-04) */}
      <NotificationBanner notifications={notifications} onDismiss={dismissNotification} onClick={handleNotificationClick} />

      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-surface border-b border-border gap-4 sticky top-0 z-50">
        {/* Left: app title */}
        <span className="text-base font-semibold text-text-primary shrink-0">
          WebSocket Gateway
        </span>

        {/* Center: connection status + active room/channel */}
        <div className="flex items-center gap-4 flex-1 justify-center">
          <ConnectionStatus state={connectionState} />
          <span className="text-sm text-neutral font-mono bg-surface-hover border border-border rounded-md px-2.5 py-1">
            {rooms.find(r => r.roomId === activeRoomId)?.name ?? currentChannel}
          </span>
        </div>

        {/* Right: user email + sign out + hamburger menu */}
        <div className="flex items-center gap-3 shrink-0">
          {userEmail && (
            <span className="text-sm text-neutral">
              {userEmail}
            </span>
          )}
          <button
            onClick={onSignOut}
            className="bg-none border border-border rounded-md px-3 py-1 cursor-pointer text-sm text-text-primary"
          >
            Sign Out
          </button>
          {/* Hamburger — app-level menu */}
          <div className="relative" ref={appMenuRef}>
            <button
              type="button"
              ref={appMenuTriggerRef}
              onClick={() => setShowAppMenu(v => !v)}
              className={cn(
                'border border-border rounded-md px-2 py-1 cursor-pointer text-base text-neutral leading-none',
                showAppMenu ? 'bg-surface-hover' : 'bg-none'
              )}
              title="Menu"
              aria-label="Open app menu"
              aria-haspopup="menu"
              aria-expanded={showAppMenu}
            >
              ☰
            </button>
            {showAppMenu && (
              <div
                data-testid="app-menu"
                className="absolute top-[calc(100%+6px)] right-0 bg-surface border border-border rounded-lg shadow-md z-[100] min-w-[180px] overflow-hidden"
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">
                  Content
                </div>
                <button
                  onClick={() => { navigate('/document-types'); setShowAppMenu(false); }}
                  className={menuBtnClass(activeView === 'doc-types')}
                >
                  📋 Document Types
                </button>
                <button
                  onClick={() => { navigate('/field-types'); setShowAppMenu(false); }}
                  className={menuBtnClass(activeView === 'field-types')}
                >
                  🧩 Data Types
                </button>
                <div className="border-t border-surface-hover my-1" />
                <div className="px-3 py-1.5 text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">
                  Automation
                </div>
                <button
                  onClick={() => { navigate('/pipelines'); setShowAppMenu(false); }}
                  className={menuBtnClass(activeView === 'pipelines')}
                >
                  🔀 Pipelines
                </button>
                <button
                  onClick={() => { navigate('/observability'); setShowAppMenu(false); }}
                  className={menuBtnClass(activeView === 'observability')}
                >
                  📡 Observability
                </button>
                <div className="border-t border-surface-hover my-1" />
                <div className="px-3 py-1.5 text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">
                  Analytics
                </div>
                <button
                  onClick={() => { navigate('/dashboard'); setShowAppMenu(false); }}
                  className={menuBtnClass(activeView === 'dashboard')}
                >
                  📊 Live Activity
                </button>
                <div className="border-t border-surface-hover my-1" />
                <div className="px-3 py-1.5 text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">
                  Developer
                </div>
                <button
                  onClick={() => { setShowDevTools(v => !v); setShowAppMenu(false); }}
                  className={menuBtnClass(showDevTools)}
                >
                  🔧 Dev Tools
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body — sidebar + main */}
      <div className="flex min-h-[calc(100vh-53px)]">

        {/* Sidebar — full when open; 56px icon strip when collapsed.
            Always visible, full-height, persistent. Replaces the previous
            display:none + overlay hamburger pattern. */}
        <div
          className="shrink-0 border-r border-border bg-surface flex flex-col fixed top-[53px] left-0 bottom-0 overflow-y-auto overflow-x-hidden z-40 box-border transition-[width,padding] duration-[180ms] ease-in-out"
          style={{
            width: SIDEBAR_WIDTH,
            padding: sidebarOpen ? '1rem' : '0.5rem 0',
          }}
        >
          {sidebarOpen ? (
            <CollapsibleSidebar
              connectionState={connectionState}
              onDisconnect={onDisconnect}
              onReconnect={onReconnect}
              onCollapse={() => setSidebarOpen(false)}
              presenceUsers={presenceUsers}
              currentClientId={currentClientId ?? ''}
              currentChannel={currentChannel}
              activityEvents={activityEvents}
              userId={userId}
              documents={documents}
              onOpenDocument={(id: string) => {
                navigate(`/documents/${id}`);
              }}
              pipelines={pipelineIndex}
              onOpenPipeline={(id: string) => navigate(`/pipelines/${id}`)}
              onSeeAllPipelines={() => navigate('/pipelines')}
              videoSlot={dockedVideoDocId ? <div id="sidebar-video-slot" /> : undefined}
            />
          ) : (
            <CollapsedIconStrip
              connectionState={connectionState}
              onExpand={() => setSidebarOpen(true)}
              onPipelines={() => navigate('/pipelines')}
              onObservability={() => navigate('/observability')}
              onDocuments={() => navigate('/documents')}
            />
          )}
        </div>

        {/* Main content — offset by fixed sidebar width */}
        <div
          className="flex flex-col gap-0 min-h-0 bg-surface-panel relative z-[1]"
          style={{
            marginLeft: SIDEBAR_WIDTH,
            width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          }}
        >

          {/* Primary tab bar — sits flush against the 53px header. */}
          {(() => {
            const inContent = activeView === 'doc-editor' || activeView === 'doc-types' || activeView === 'field-types';
            return (
              <div className="sticky top-[53px] bg-surface-panel z-[33] px-8">
                {/* Main tabs. A landmark, not a bare div: the sidebar has
                    section headers with the same labels ("Documents",
                    "Pipelines"), so without a named region there is no way —
                    for a screen-reader user or a test — to say which
                    "Documents" you mean. */}
                <nav aria-label="Primary" className="flex items-center gap-1 px-1 py-1.5 border-b border-border">
                  {([
                    ['/previews', 'panels', 'Previews'],
                    ['/social', 'social', 'Social'],
                    ['/documents', 'doc-editor', 'Documents'],
                    ['/pipelines', 'pipelines', 'Pipelines'],
                    ['/ingest', 'ingest', 'Ingest'],
                    ['/observability', 'observability', 'Observability'],
                  ] as const).map(([path, view, label]) => {
                    const isActive = view === 'doc-editor' ? inContent : activeView === view;
                    return (
                      <button
                        key={view}
                        onClick={() => navigate(path)}
                        className={cn(tabBtnClass(isActive), 'text-sm')}
                      >
                        {label}
                      </button>
                    );
                  })}
                  {/* New Document button */}
                  {activeView === 'doc-editor' && location.pathname === '/documents' && (
                    <button
                      data-testid="new-document-btn"
                      onClick={() => setShowNewDocModal(true)}
                      className="ml-auto flex items-center gap-1 px-3 py-[5px] text-[13px] font-semibold border-none rounded-md bg-info text-white cursor-pointer font-[inherit]"
                    >
                      + New Document
                    </button>
                  )}
                </nav>

                {/* Sub-nav — visible when in Documents section */}
                {inContent && (
                  <div className="flex items-center gap-1 px-1 py-1.5 border-b border-border bg-surface-panel">
                    {([
                      ['/documents',      'doc-editor',  'Documents'],
                      ['/document-types', 'doc-types',   'Document Types'],
                      ['/field-types',    'field-types', 'Data Types'],
                    ] as const).map(([path, view, label]) => {
                      const isActive = activeView === view;
                      return (
                        <button
                          key={view}
                          onClick={() => navigate(path)}
                          className={subTabClass(isActive)}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Pipelines sub-nav */}
                {activeView === 'pipelines' && (
                  <div className="flex items-center gap-1 px-1 py-1.5 border-b border-border bg-surface-panel">
                    {([
                      ['/pipelines',           'All pipelines',     (p: string) => p === '/pipelines' || (p.startsWith('/pipelines/') && p !== '/pipelines/approvals' && p !== '/pipelines/runs')],
                      ['/pipelines/approvals', 'Pending approvals', (p: string) => p === '/pipelines/approvals'],
                      ['/pipelines/runs',      'Runs',              (p: string) => p === '/pipelines/runs'],
                    ] as const).map(([path, label, isActiveFn]) => {
                      const isActive = isActiveFn(location.pathname);
                      const showBadge = path === '/pipelines/approvals' && pendingApprovalsCount > 0;
                      return (
                        <button
                          key={path}
                          onClick={() => navigate(path)}
                          className={cn(subTabClass(isActive), 'flex items-center gap-1.5')}
                        >
                          <span>{label}</span>
                          {showBadge && (
                            <span
                              data-testid="pending-approvals-badge"
                              className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full text-[11px] font-bold bg-warning text-white leading-none"
                            >
                              {pendingApprovalsCount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Ingest sub-nav */}
                {activeView === 'ingest' && (
                  <div className="flex items-center gap-1 px-1 py-1.5 border-b border-border bg-surface-panel">
                    {([
                      ['/ingest',                'Dashboard',    (p: string) => p === '/ingest'],
                      ['/ingest/sources',        'Sources',      (p: string) => p.startsWith('/ingest/sources')],
                      ['/ingest/items',          'Items',        (p: string) => p === '/ingest/items'],
                      ['/ingest/mapping/review', 'Needs review', (p: string) => p === '/ingest/mapping/review'],
                      ['/ingest/monitor',        'Sync Monitor', (p: string) => p === '/ingest/monitor'],
                      ['/ingest/conflicts',      'Conflicts',    (p: string) => p === '/ingest/conflicts'],
                      ['/ingest/dlq',            'DLQ',          (p: string) => p === '/ingest/dlq'],
                      ['/ingest/doctype-proposals', 'Proposals',  (p: string) => p === '/ingest/doctype-proposals'],
                      ['/ingest/audit',          'Audit',        (p: string) => p === '/ingest/audit'],
                    ] as const).map(([path, label, isActiveFn]) => {
                      const isActive = isActiveFn(location.pathname);
                      return (
                        <button
                          key={path}
                          onClick={() => navigate(path)}
                          className={cn(subTabClass(isActive), 'flex items-center gap-1.5')}
                        >
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Observability sub-nav */}
                {activeView === 'observability' && (
                  <div className="flex items-center gap-0.5 px-1 border-b border-border bg-surface-panel">
                    {([
                      ['/observability',         'Dashboard', (p: string) => p === '/observability'],
                      ['/observability/nodes',   'Nodes',     (p: string) => p === '/observability/nodes'],
                      ['/observability/events',  'Events',    (p: string) => p === '/observability/events'],
                      ['/observability/metrics', 'Metrics',   (p: string) => p === '/observability/metrics'],
                    ] as const).map(([path, label, isActiveFn]) => {
                      const isActive = isActiveFn(location.pathname);
                      return (
                        <button
                          key={path}
                          onClick={() => navigate(path)}
                          className={cn(
                            'px-3 py-1.5 border-none bg-none cursor-pointer font-[inherit] text-[0.8125rem]',
                            isActive
                              ? 'border-b-2 border-b-primary text-text-primary font-semibold'
                              : 'border-b-2 border-b-transparent text-neutral font-normal'
                          )}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Route content — rendered by React Router. Wrapped in a
              padded container so the tab bar above stays flush to the
              header but the page content below has breathing room. */}
          <div className="px-8 pt-4 pb-6 flex flex-col gap-4 flex-1 min-h-0">
            <ApiDegradedBanner health={apiHealth} />
            <ErrorBoundary name="RouteContent">
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet context={{ dockedVideoDocId, setDockedVideoDocId } satisfies DockVideoContext} />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Docked-video document — stays mounted across navigation to preserve IVS connection.
              Only rendered when user is NOT on the docked doc's route; otherwise the primary
              Outlet owns that doc's mount (avoids double-mount / conflicting portals). */}
          {dockedVideoDocId && location.pathname !== `/documents/${dockedVideoDocId}` && (
            <ErrorBoundary name="DockedVideoEditor">
              <Suspense fallback={<div>Loading...</div>}>
              <div className="hidden">
                <DocumentEditorPage
                  documentId={dockedVideoDocId}
                  ws={ws}
                  userId={userId}
                  displayName={displayName}
                  onMessage={onMessage}
                  activityPublish={activityPublish}
                  activityEvents={activityEvents}
                  onBack={() => navigate('/documents')}
                  isVideoDocked
                  onDockVideo={() => setDockedVideoDocId(dockedVideoDocId)}
                  onUndockVideo={() => setDockedVideoDocId(null)}
                />
              </div>
              </Suspense>
            </ErrorBoundary>
          )}

        </div>
      </div>

      {/* Dev Tools slide-out panel */}
      {showDevTools && (
        <div className="fixed top-[53px] right-0 bottom-0 w-[480px] bg-surface border-l border-border shadow-[-4px_0_12px_rgba(0,0,0,0.08)] z-[900] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-sm font-semibold text-text-primary">
              Dev Tools
            </span>
            <button
              onClick={() => setShowDevTools(false)}
              className="bg-none border-none cursor-pointer text-xl text-text-tertiary leading-none px-1"
            >
              x
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <ErrorDisplay error={lastError} />
            <ErrorPanel errors={errors} />
            <TabbedEventLog entries={logEntries} />
            <div className="text-xs text-text-tertiary font-mono mt-2">
              clientId: {clientId ?? '—'} | sessionToken: {sessionToken ? sessionToken.slice(0, 8) + '…' : '—'}
            </div>
          </div>
        </div>
      )}

      {/* New document modal — triggered from toolbar button */}
      <NewDocumentModal
        open={showNewDocModal}
        onClose={() => setShowNewDocModal(false)}
        onCreate={(meta) => {
          createDocument(meta);
          setShowNewDocModal(false);
        }}
      />

      {/* Global keyboard shortcut help overlay — opened by pressing `?` */}
      <ShortcutsHelp
        open={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
}
