export type EntryType = 'demo' | 'component';

export interface CatalogEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  type: EntryType;
  thumbnail?: string;
  /** Override the auto-generated link path (useful for nested routes). */
  path?: string;
}

export const entries: CatalogEntry[] = [
  // Full-page demos
  {
    id: 'pipeline-editor',
    title: 'Pipeline Editor',
    description: 'Visual workflow builder with drag-and-drop nodes, validation, and execution replay.',
    category: 'Workflows',
    type: 'demo',
  },
  {
    id: 'ingest-dashboard',
    title: 'Ingest Dashboard',
    description: 'Data ingestion monitoring with sources, sync progress, DLQ, and conflict resolution.',
    category: 'Workflows',
    type: 'demo',
  },
  {
    id: 'document-workspace',
    title: 'Document Workspace',
    description: 'Collaborative document editor with real-time cursors, comments, and version history.',
    category: 'Workflows',
    type: 'demo',
  },
  {
    id: 'observability-shell',
    title: 'Observability Dashboard',
    description: 'Cluster monitoring with metrics, alerts, chaos panel, and active runs table.',
    category: 'Workflows',
    type: 'demo',
  },
  {
    id: 'social-panel',
    title: 'Social & Chat',
    description: 'Chat rooms, post feed, presence indicators, and group management.',
    category: 'Workflows',
    type: 'demo',
  },
  {
    id: 'collaboration',
    title: 'Real-time Collaboration',
    description: 'Multiplayer cursors, shared text editing, canvas drawing, and reactions.',
    category: 'Workflows',
    type: 'demo',
  },

  // Hook integration demos
  {
    id: 'hook-chat',
    title: 'ChatPanel + useChat',
    description: 'ChatPanel wired to useChat() from realtime-modules. Mock mode fires synthetic messages; set VITE_GATEWAY_URL to go live.',
    category: 'Hook Integrations',
    type: 'demo',
    path: '/workflows/hook-chat',
  },
  {
    id: 'hook-presence',
    title: 'PresencePanel + usePresence',
    description: 'PresencePanel wired to usePresence(). Simulates join/away/return events in mock mode.',
    category: 'Hook Integrations',
    type: 'demo',
    path: '/workflows/hook-presence',
  },
  {
    id: 'hook-reactions',
    title: 'ReactionButtons + useReactions',
    description: 'ReactionButtons and ReactionsOverlay wired to useReactions(). Auto-fires emoji in mock mode.',
    category: 'Hook Integrations',
    type: 'demo',
    path: '/workflows/hook-reactions',
  },
  {
    id: 'hook-fileupload',
    title: 'FileUploadDrop + useFileUpload',
    description: 'FileUploadDrop wired to useFileUpload(). Simulates presign → XHR → AV-scan lifecycle.',
    category: 'Hook Integrations',
    type: 'demo',
    path: '/workflows/hook-fileupload',
  },
  {
    id: 'hook-videohangout',
    title: 'HangoutLayout + useVideoHangout',
    description: 'HangoutLayout wired to useVideoHangout(). Mock participants join with stagger; joinToken displayed.',
    category: 'Hook Integrations',
    type: 'demo',
    path: '/workflows/hook-videohangout',
  },

  // Agents demos
  {
    id: 'agents-dashboard',
    title: 'Agents Dashboard',
    description: 'Agents dashboard — grid of registered agents with status badges',
    category: 'Agents',
    type: 'demo',
    path: '/workflows/agents/dashboard',
  },
  {
    id: 'agents-flow',
    title: 'Agent Flow Canvas',
    description: 'Agent flow canvas — A2A connections visualized with xyflow',
    category: 'Agents',
    type: 'demo',
    path: '/workflows/agents/flow',
  },
  {
    id: 'agents-invoke',
    title: 'Streaming Agent Invoke',
    description: 'Streaming agent invoke — AG-UI chat with reasoning, tool calls, and state',
    category: 'Agents',
    type: 'demo',
    path: '/workflows/agents/invoke',
  },
  {
    id: 'agents-detail',
    title: 'Agent Detail',
    description: 'Per-agent detail — trace timeline, guardrails, memory, policy decisions',
    category: 'Agents',
    type: 'demo',
    path: '/workflows/agents/detail',
  },

  // Component pages
  {
    id: 'buttons',
    title: 'Buttons',
    description: 'Button and IconButton variants, sizes, and states.',
    category: 'Foundations',
    type: 'component',
  },
  {
    id: 'feedback',
    title: 'Feedback',
    description: 'Toast notifications, banners, modals, and confirmation dialogs.',
    category: 'Foundations',
    type: 'component',
  },
  {
    id: 'data-display',
    title: 'Data Display',
    description: 'Chips, charts, sparklines, skeletons, and empty states.',
    category: 'Foundations',
    type: 'component',
  },
  {
    id: 'forms',
    title: 'Forms & Inputs',
    description: 'Code editor, tag editor, user picker, and icon picker.',
    category: 'Foundations',
    type: 'component',
  },
  {
    id: 'layout',
    title: 'Layout',
    description: 'Panel primitives and layout composition patterns.',
    category: 'Foundations',
    type: 'component',
  },
  {
    id: 'primitives',
    title: 'Primitives',
    description: 'StatCard, FilterChip, Spinner, Avatar, ProgressBar, and more',
    category: 'Foundations',
    type: 'component',
    path: '/components/primitives',
  },
  {
    id: 'chat',
    title: 'Chat & Thread',
    description: 'MessageBubble, ChatComposer, ToolCallStrip, ThinkingDots and more',
    category: 'Foundations',
    type: 'component',
    path: '/components/chat',
  },
  {
    id: 'patterns',
    title: 'Patterns',
    description: 'Drawer, CollapsibleSection, PageHeader, CardHeader',
    category: 'Foundations',
    type: 'component',
    path: '/components/patterns',
  },
  {
    id: 'shell-composites',
    title: 'Shell Composites',
    description: 'ChannelHeader, PresenceAvatars, NotificationCenter, UserMenu, Breadcrumbs, PageHeader',
    category: 'Foundations',
    type: 'component',
    path: '/components/shell',
  },
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'Foundations', label: 'Foundations' },
  { id: 'Workflows', label: 'Workflows' },
  { id: 'Agents', label: 'Agents' },
  { id: 'Hook Integrations', label: 'Hook Integrations' },
] as const;
