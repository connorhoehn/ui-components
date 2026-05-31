/**
 * Per-hook documentation registry consumed by HookDocPage and
 * HooksOverviewPage. One entry per documented hook; keep entries terse —
 * the full source lives in src/hooks/<hookName>.ts and is the source of
 * truth for any contract change.
 */

export type HookGroup = 'connection' | 'realtime' | 'documents' | 'ui';

export interface HookParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface HookReturn {
  name: string;
  type: string;
  description: string;
}

export interface HookRelatedLink {
  label: string;
  to: string;
}

export interface HookDoc {
  name: string;
  group: HookGroup;
  summary: string;
  description: string;
  signature: string;
  /** Top-level params (a single options object's fields, OR positional args). */
  params: HookParam[];
  /** Top-level return shape fields. */
  returns: HookReturn[];
  /** Realistic usage example — short. */
  example: string;
  related: HookRelatedLink[];
}

export const HOOK_GROUP_LABEL: Record<HookGroup, string> = {
  connection: 'Connection',
  realtime: 'Real-time',
  documents: 'Documents',
  ui: 'UI & Interaction',
};

export const HOOK_GROUP_ORDER: HookGroup[] = [
  'connection',
  'realtime',
  'documents',
  'ui',
];

export const hookDocs: HookDoc[] = [
  // ---------------------------------------------------------------------
  // Connection
  // ---------------------------------------------------------------------
  {
    name: 'useWebSocket',
    group: 'connection',
    summary: 'Managed WebSocket connection with auto-reconnect, heartbeats, channel switching.',
    description:
      'The base hook every realtime feature composes on. Manages a single WebSocket connection, persists session token and clientId in sessionStorage, retries with backoff on close, and exposes channel switching plus an imperative send.',
    signature: 'function useWebSocket(options: UseWebSocketOptions): UseWebSocketReturn',
    params: [
      { name: 'config', type: 'GatewayConfig', required: true, description: 'URL, defaultChannel, optional auth callback.' },
      { name: 'onMessage', type: '(msg: GatewayMessage) => void', required: false, description: 'Fan-out hook for inbound frames; called for every server message.' },
    ],
    returns: [
      { name: 'connectionState', type: "'idle' | 'connecting' | 'open' | 'closed' | 'error'", description: 'Live state for UI banners.' },
      { name: 'sessionToken / clientId', type: 'string | null', description: 'Identifiers issued by the gateway, persisted across reloads.' },
      { name: 'switchChannel', type: '(channel: string) => void', description: 'Subscribe to a different channel without reconnecting.' },
      { name: 'sendMessage', type: '(msg: Record<string, unknown>) => void', description: 'Send a JSON frame to the gateway.' },
      { name: 'disconnect / reconnect', type: '() => void', description: 'Imperative controls.' },
    ],
    example: `const ws = useWebSocket({
  config: { url: 'wss://gateway.example.com', defaultChannel: 'lobby' },
  onMessage: (msg) => console.log('inbound', msg),
});

return <ConnectionPill state={ws.connectionState} />;`,
    related: [
      { label: 'Hook integration: chat', to: '/workflows/hook-chat' },
      { label: 'ConnectionPill component', to: '/components/feedback' },
    ],
  },
  {
    name: 'useApiCall',
    group: 'connection',
    summary: 'fetch wrapper with loading, error, retry, and reset state.',
    description:
      'Generic typed wrapper around any async function. Tracks data/loading/error, exposes execute(...args), retry() (replays the last args), and reset(). Use for one-shot HTTP calls instead of hand-rolling useState/useEffect.',
    signature: 'function useApiCall<T>(fn: (...args: unknown[]) => Promise<T>): ApiCallState<T>',
    params: [
      { name: 'fn', type: '(...args: unknown[]) => Promise<T>', required: true, description: 'The async function to manage. Re-bound on identity change.' },
    ],
    returns: [
      { name: 'data', type: 'T | null', description: 'Latest successful result.' },
      { name: 'loading', type: 'boolean', description: 'True while a call is in-flight.' },
      { name: 'error', type: 'string | null', description: 'Error message captured from a thrown error.' },
      { name: 'execute', type: '(...args) => Promise<void>', description: 'Trigger a new call. Replaces previous data/error on success.' },
      { name: 'retry', type: '() => Promise<void>', description: 'Re-run with the last args used.' },
      { name: 'reset', type: '() => void', description: 'Clear all state.' },
    ],
    example: `const { data, loading, error, execute } = useApiCall(
  (id: string) => fetch(\`/api/users/\${id}\`).then(r => r.json())
);

useEffect(() => { void execute(userId); }, [userId]);`,
    related: [
      { label: 'useApiHealth', to: '/hooks/useApiHealth' },
    ],
  },
  {
    name: 'useApiHealth',
    group: 'connection',
    summary: 'Poll an API health endpoint and surface ok / degraded / unknown.',
    description:
      'Polls `${VITE_SOCIAL_API_URL}/health` on the configured interval and parses the standard health response. Drives the "Reconnecting…" banner used by social and admin shells.',
    signature: 'function useApiHealth(pollMs?: number): ApiHealthSnapshot',
    params: [
      { name: 'pollMs', type: 'number', required: false, description: 'Poll interval in ms (default 15000). 0 disables polling.' },
    ],
    returns: [
      { name: 'status', type: "'ok' | 'degraded' | 'unknown'", description: 'Overall health rollup.' },
      { name: 'checks', type: 'Record<string, ApiHealthCheck>', description: 'Per-dependency check map from the server.' },
      { name: 'failing', type: 'string[]', description: 'Dependency names with status !== ok. Empty when healthy.' },
    ],
    example: `const { status, failing } = useApiHealth(10_000);
if (status === 'degraded') return <Banner tone="warning">Service degraded: {failing.join(', ')}</Banner>;`,
    related: [
      { label: 'Banner primitive', to: '/components/feedback' },
    ],
  },

  // ---------------------------------------------------------------------
  // Real-time
  // ---------------------------------------------------------------------
  {
    name: 'useChat',
    group: 'realtime',
    summary: 'Channel chat: history on join, send, real-time inbound messages.',
    description:
      'Composes on useWebSocket. Loads the last 100 messages for the joined channel, exposes a send(content) helper, and appends inbound messages to a single in-memory array. Use with ChatPanel or WrappedChatPanel.',
    signature: 'function useChat(options: UseChatOptions): UseChatReturn',
    params: [
      { name: 'sendMessage / onMessage', type: 'from useWebSocket', required: true, description: 'Pass straight from your useWebSocket return.' },
      { name: 'currentChannel', type: 'string', required: true, description: 'Channel to subscribe to. Switching is handled by useWebSocket.' },
      { name: 'connectionState', type: 'ConnectionState', required: true, description: 'Gates send + history requests.' },
      { name: 'displayName', type: 'string', required: true, description: 'Display name attached to outgoing messages.' },
    ],
    returns: [
      { name: 'messages', type: 'ChatMessage[]', description: 'All messages received for the current channel, oldest first.' },
      { name: 'send', type: '(content: string) => void', description: 'Send a chat message. No-op if connection is not open.' },
    ],
    example: `const ws = useWebSocket({ config });
const { messages, send } = useChat({
  ...ws, displayName: 'Sam',
});

return <ChatPanel messages={messages} onSend={send} />;`,
    related: [
      { label: 'WrappedChatPanel demo', to: '/workflows/hook-chat' },
      { label: 'ChatPanel primitives', to: '/components/chat' },
    ],
  },
  {
    name: 'usePresence',
    group: 'realtime',
    summary: 'Per-channel online users list with a setTyping helper.',
    description:
      'Maintains a live map of users present in the current channel. Emits heartbeats, debounces a typing flag, and surfaces a setTyping helper for ChatComposer integrations.',
    signature: 'function usePresence(options: UsePresenceOptions): UsePresenceReturn',
    params: [
      { name: 'sendMessage / onMessage', type: 'from useWebSocket', required: true, description: 'Pass straight from your useWebSocket return.' },
      { name: 'currentChannel', type: 'string', required: true, description: 'Channel scope for presence list.' },
      { name: 'connectionState', type: 'ConnectionState', required: true, description: 'Gates heartbeat scheduling.' },
      { name: 'displayName', type: 'string', required: true, description: 'Display name attached to the heartbeat.' },
    ],
    returns: [
      { name: 'users', type: 'PresenceUser[]', description: 'Users currently in the channel (clientId, status, metadata).' },
      { name: 'setTyping', type: '(isTyping: boolean) => void', description: 'Toggle the local typing flag; auto-clears after 3s.' },
    ],
    example: `const ws = useWebSocket({ config });
const { users, setTyping } = usePresence({ ...ws, displayName: 'Sam' });

return <PresenceAvatars users={users} />;`,
    related: [
      { label: 'PresencePanel demo', to: '/workflows/hook-presence' },
    ],
  },
  {
    name: 'useReactions',
    group: 'realtime',
    summary: 'Ephemeral emoji reactions broadcast to the current channel.',
    description:
      'Sends an emoji reaction to the current channel and renders incoming reactions as 2.5-second overlays with randomized positions. Pair with ReactionsBar (sender) + ReactionsOverlay (renderer).',
    signature: 'function useReactions(options: UseReactionsOptions): UseReactionsReturn',
    params: [
      { name: 'sendMessage / onMessage', type: 'from useWebSocket', required: true, description: 'Pass straight from your useWebSocket return.' },
      { name: 'currentChannel', type: 'string', required: true, description: 'Channel scope for reactions.' },
      { name: 'connectionState', type: 'ConnectionState', required: true, description: 'Gates outgoing reactions.' },
    ],
    returns: [
      { name: 'activeReactions', type: 'EphemeralReaction[]', description: 'Currently-rendered reactions; auto-pruned after 2.5s.' },
      { name: 'react', type: '(emoji: string) => void', description: 'Broadcast an emoji to the channel.' },
    ],
    example: `const ws = useWebSocket({ config });
const { activeReactions, react } = useReactions(ws);

return <>
  <ReactionsOverlay reactions={activeReactions} />
  <ReactionsBar onReact={react} />
</>;`,
    related: [
      { label: 'Reactions demo', to: '/workflows/hook-reactions' },
    ],
  },
  {
    name: 'useCursors',
    group: 'realtime',
    summary: 'Multiplayer cursors across freeform, table, text, and canvas modes.',
    description:
      'One hook, four cursor modes — pick the one matching the active surface. Each mode has its own send helper (positions are throttled where it matters) and the cursors map streams remote positions tagged with displayName + color.',
    signature: 'function useCursors(options: UseCursorsOptions): UseCursorsReturn',
    params: [
      { name: 'sendMessage / onMessage', type: 'from useWebSocket', required: true, description: 'Pass straight from your useWebSocket return.' },
      { name: 'currentChannel', type: 'string', required: true, description: 'Channel scope for cursors.' },
      { name: 'connectionState', type: 'ConnectionState', required: true, description: 'Gates outgoing cursor updates.' },
      { name: 'clientId', type: 'string | null', required: true, description: 'Used to suppress echo of own cursor.' },
      { name: 'displayName', type: 'string', required: true, description: 'Label rendered next to the cursor.' },
    ],
    returns: [
      { name: 'cursors', type: 'Map<string, RemoteCursor>', description: 'All remote cursors keyed by clientId.' },
      { name: 'switchMode', type: '(mode: CursorMode) => void', description: 'Toggle between freeform / table / text / canvas modes.' },
      { name: 'sendFreeformUpdate / sendTableUpdate / sendTextUpdate / sendCanvasUpdate', type: 'mode-specific senders', description: 'Throttled where it matters; call from the surface event handlers.' },
    ],
    example: `const cursors = useCursors({ ...ws, clientId: ws.clientId, displayName: 'Sam' });

return <FreeformCursorLayer cursors={cursors.cursors} onPointerMove={(x, y) => cursors.sendFreeformUpdate(x, y)} />;`,
    related: [
      { label: 'Real-time collaboration demo', to: '/workflows/collaboration' },
    ],
  },
  {
    name: 'useActivityBus',
    group: 'realtime',
    summary: 'Cross-component activity event bus with replay buffer.',
    description:
      'Publishes typed activity events to the channel and exposes a recent-events buffer (default 200 items, oldest first). Use for activity feeds, audit trails, or cross-surface event fan-out.',
    signature: 'function useActivityBus(options: UseActivityBusOptions): UseActivityBusReturn',
    params: [
      { name: 'sendMessage / onMessage', type: 'from useWebSocket', required: true, description: 'Pass straight from your useWebSocket return.' },
      { name: 'connectionState', type: 'ConnectionState', required: true, description: 'Gates publishing.' },
      { name: 'userId / displayName / color', type: 'string / string / string?', required: true, description: 'Identity attached to every published event.' },
      { name: 'maxItems', type: 'number', required: false, description: 'Replay buffer cap (default 200).' },
    ],
    returns: [
      { name: 'events', type: 'ActivityEvent[]', description: 'Buffer of recent local + remote events.' },
      { name: 'publish', type: '(eventType: string, detail: Record<string, unknown>) => void', description: 'Publish an event to the channel.' },
      { name: 'isLive', type: 'boolean', description: 'True when the bus has handshaked with the gateway.' },
    ],
    example: `const { events, publish } = useActivityBus({
  ...ws, userId: 'u_1', displayName: 'Sam',
});

return <WrappedActivityPanel events={events} />;`,
    related: [
      { label: 'Activity demo', to: '/workflows/hook-activity' },
    ],
  },

  // ---------------------------------------------------------------------
  // Documents
  // ---------------------------------------------------------------------
  {
    name: 'useCollaborativeDoc',
    group: 'documents',
    summary: 'Y.js-backed collaborative document with sections, items, and comments.',
    description:
      'Full document orchestration hook. Wraps Y.Doc + GatewayProvider, exposes typed CRUD on sections + items, surfaces participants and per-section comments, and provides markdown import / JSON export.',
    signature: 'function useCollaborativeDoc(options: UseCollaborativeDocOptions): UseCollaborativeDocReturn',
    params: [
      { name: 'documentId', type: 'string', required: true, description: 'Identifier for the Y.Doc room.' },
      { name: 'mode', type: 'ViewMode', required: true, description: 'View mode passed through to GatewayProvider.' },
      { name: 'ws', type: 'UseWebSocketReturn', required: true, description: 'The shared useWebSocket return.' },
      { name: 'userId / displayName / color', type: 'string / string / string', required: true, description: 'Local participant identity rendered in cursors and presence.' },
      { name: 'onMessage', type: '(handler) => () => void', required: true, description: 'Subscription helper from useWebSocket.' },
    ],
    returns: [
      { name: 'meta / sections / synced', type: 'document state', description: 'Live document meta, sections array, and a synced flag.' },
      { name: 'updateMeta / addSection / addItem / updateItem / removeItem', type: 'CRUD helpers', description: 'Section + item mutators that route through Y.js.' },
      { name: 'addComment / participants / comments', type: 'collaboration state', description: 'Threaded comments per section plus the live participant list.' },
      { name: 'loadFromMarkdown / exportJSON', type: 'import / export', description: 'Round-trip helpers.' },
    ],
    example: `const ws = useWebSocket({ config });
const doc = useCollaborativeDoc({
  documentId: 'doc_42', mode: 'edit', ws,
  userId, displayName, color: '#6366f1',
  onMessage: ws.onMessage,
});

return <DocumentWorkspace doc={doc} />;`,
    related: [
      { label: 'Document workspace demo', to: '/workflows/document-workspace' },
    ],
  },
  {
    name: 'useCRDT',
    group: 'documents',
    summary: 'Single Y.Text room with plain-string content + conflict detection.',
    description:
      'Lower-level than useCollaborativeDoc — one Y.Doc with a single text fragment, reactive plain-string content, and a hasConflict flag when a remote transaction merges into existing local content.',
    signature: 'function useCRDT(options: UseCRDTOptions): UseCRDTReturn',
    params: [
      { name: 'sendMessage / onMessage', type: 'from useWebSocket', required: true, description: 'Pass straight from your useWebSocket return.' },
      { name: 'currentChannel', type: 'string', required: true, description: 'Channel acts as the Y.Doc room id.' },
      { name: 'connectionState', type: 'ConnectionState', required: true, description: 'Gates outgoing updates.' },
    ],
    returns: [
      { name: 'content', type: 'string', description: 'Current Y.Text content as a plain string (reactive).' },
      { name: 'applyLocalEdit', type: '(newText: string) => void', description: 'Diff + apply a local string into Y.Text.' },
      { name: 'hasConflict', type: 'boolean', description: 'True when a remote transaction merged into existing content.' },
      { name: 'dismissConflict', type: '() => void', description: 'Reset hasConflict.' },
    ],
    example: `const { content, applyLocalEdit, hasConflict } = useCRDT(ws);

return <textarea value={content} onChange={(e) => applyLocalEdit(e.target.value)} />;`,
    related: [
      { label: 'Real-time editing primitives', to: '/components/real-time-editing' },
    ],
  },
  {
    name: 'useDocuments',
    group: 'documents',
    summary: 'Document list with CRUD, per-doc presence, and live updates.',
    description:
      'Manages the list of documents (no Y.js content), exposes create / delete / updateMeta helpers, and surfaces per-document presence so a workspace shell can show which users are inside which doc.',
    signature: 'function useDocuments(options: UseDocumentsOptions): UseDocumentsReturn',
    params: [
      { name: 'sendMessage / onMessage', type: 'from useWebSocket', required: true, description: 'Pass straight from your useWebSocket return.' },
      { name: 'connectionState', type: 'ConnectionState', required: true, description: 'Gates outgoing requests.' },
    ],
    returns: [
      { name: 'documents / loading', type: 'DocumentInfo[] / boolean', description: 'Live document list and loading flag.' },
      { name: 'presence', type: 'Record<documentId, DocumentPresenceUser[]>', description: 'Who is inside which doc.' },
      { name: 'createDocument / deleteDocument / updateDocumentMeta', type: 'mutators', description: 'Document CRUD.' },
      { name: 'refreshDocuments / refreshPresence', type: '() => void', description: 'Force a re-fetch.' },
    ],
    example: `const { documents, createDocument } = useDocuments(ws);
return <DocumentList documents={documents} onCreate={createDocument} />;`,
    related: [
      { label: 'Document workspace demo', to: '/workflows/document-workspace' },
    ],
  },
  {
    name: 'useDocumentComments',
    group: 'documents',
    summary: 'Threaded comments anchored to document sections.',
    description:
      'Per-section threaded comments with resolve / unresolve. Initial load is fetched via REST using the supplied idToken; updates stream over the websocket.',
    signature: 'function useDocumentComments(options: UseDocumentCommentsOptions): UseDocumentCommentsReturn',
    params: [
      { name: 'documentId', type: 'string', required: true, description: 'Target document id.' },
      { name: 'idToken', type: 'string | null', required: true, description: 'Auth token used for the initial REST fetch.' },
      { name: 'sendMessage / onMessage', type: 'from useWebSocket', required: true, description: 'Pass straight from your useWebSocket return.' },
      { name: 'connectionState', type: 'string', required: true, description: 'Gates the live subscription.' },
    ],
    returns: [
      { name: 'comments', type: 'Record<sectionId, CommentThread[]>', description: 'Threaded comments grouped by section.' },
      { name: 'addComment', type: '(sectionId, text, parentCommentId?) => Promise<void>', description: 'Post a comment (or reply if parent given).' },
      { name: 'resolveThread / unresolveThread', type: '(sectionId, commentId) => Promise<void>', description: 'Resolve state toggles.' },
      { name: 'loading', type: 'boolean', description: 'True during the initial fetch.' },
    ],
    example: `const { comments, addComment } = useDocumentComments({
  documentId, idToken,
  sendMessage: ws.sendMessage, onMessage: ws.onMessage,
  connectionState: ws.connectionState,
});`,
    related: [
      { label: 'Document workspace demo', to: '/workflows/document-workspace' },
    ],
  },

  // ---------------------------------------------------------------------
  // UI & Interaction
  // ---------------------------------------------------------------------
  {
    name: 'useClickOutside',
    group: 'ui',
    summary: 'Fire a callback when a click lands outside a ref.',
    description:
      'Drop-in helper for dropdowns, popovers, and dismissible menus. Listens on mousedown so the callback runs before the click event reaches an inside target.',
    signature: 'function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, onClickOutside: () => void, enabled?: boolean): void',
    params: [
      { name: 'ref', type: 'RefObject<HTMLElement>', required: true, description: 'Target element. Clicks inside this element are ignored.' },
      { name: 'onClickOutside', type: '() => void', required: true, description: 'Fires when a click lands outside the ref.' },
      { name: 'enabled', type: 'boolean', required: false, description: 'When false, the listener is unbound. Default true.' },
    ],
    returns: [],
    example: `const ref = useRef<HTMLDivElement>(null);
useClickOutside(ref, () => setOpen(false), open);
return <div ref={ref}>...</div>;`,
    related: [
      { label: 'Drawer / popover patterns', to: '/components/patterns' },
    ],
  },
  {
    name: 'useKeyboardShortcuts',
    group: 'ui',
    summary: 'Declarative keyboard shortcut bindings with modifier matching.',
    description:
      'Pass an array of { key, meta, shift, alt, handler } and the hook keeps a document-level listener active. Editable targets (inputs, textareas, contenteditable) are skipped automatically.',
    signature: 'function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void',
    params: [
      { name: 'shortcuts', type: 'KeyboardShortcut[]', required: true, description: 'Array of { key, meta?, shift?, alt?, handler, preventDefault? } entries.' },
    ],
    returns: [],
    example: `useKeyboardShortcuts([
  { key: 'k', meta: true, handler: () => openCommandPalette() },
  { key: 'Escape', handler: () => closeAll() },
]);`,
    related: [
      { label: 'CommandPalette', to: '/components/shell' },
    ],
  },
  {
    name: 'useIdleDetector',
    group: 'ui',
    summary: 'Boolean isIdle flag after a configurable inactivity timeout.',
    description:
      'Tracks mouse + keyboard activity and flips isIdle to true after the timeout (default 2 minutes). Resets immediately on any activity. Useful for "away" presence, dimming, and pause-on-idle.',
    signature: 'function useIdleDetector(options?: UseIdleDetectorOptions): UseIdleDetectorReturn',
    params: [
      { name: 'timeoutMs', type: 'number', required: false, description: 'Idle threshold in ms (default 120000 = 2 minutes).' },
    ],
    returns: [
      { name: 'isIdle', type: 'boolean', description: 'True once the user has been inactive for timeoutMs.' },
    ],
    example: `const { isIdle } = useIdleDetector({ timeoutMs: 60_000 });
useEffect(() => { setStatus(isIdle ? 'away' : 'online'); }, [isIdle]);`,
    related: [
      { label: 'Presence demo', to: '/workflows/hook-presence' },
    ],
  },
];

export function getHookDoc(name: string): HookDoc | undefined {
  return hookDocs.find((h) => h.name === name);
}

export function hookDocsByGroup(): Array<{ group: HookGroup; label: string; docs: HookDoc[] }> {
  return HOOK_GROUP_ORDER.map((group) => ({
    group,
    label: HOOK_GROUP_LABEL[group],
    docs: hookDocs.filter((h) => h.group === group),
  }));
}
