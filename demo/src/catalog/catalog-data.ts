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
    category: 'Pages',
    type: 'demo',
  },
  {
    id: 'ingest-dashboard',
    title: 'Ingest Dashboard',
    description: 'Data ingestion monitoring with sources, sync progress, DLQ, and conflict resolution.',
    category: 'Pages',
    type: 'demo',
  },
  {
    id: 'document-workspace',
    title: 'Document Workspace',
    description: 'Collaborative document editor with real-time cursors, comments, and version history.',
    category: 'Pages',
    type: 'demo',
  },
  {
    id: 'observability-shell',
    title: 'Observability Dashboard',
    description: 'Cluster monitoring with metrics, alerts, chaos panel, and active runs table.',
    category: 'Pages',
    type: 'demo',
  },
  {
    id: 'social-panel',
    title: 'Social & Chat',
    description: 'Chat rooms, post feed, presence indicators, and group management.',
    category: 'Pages',
    type: 'demo',
  },
  {
    id: 'collaboration',
    title: 'Real-time Collaboration',
    description: 'Multiplayer cursors, shared text editing, canvas drawing, and reactions.',
    category: 'Pages',
    type: 'demo',
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
    category: 'Components',
    type: 'component',
  },
  {
    id: 'feedback',
    title: 'Feedback',
    description: 'Toast notifications, banners, modals, and confirmation dialogs.',
    category: 'Components',
    type: 'component',
  },
  {
    id: 'data-display',
    title: 'Data Display',
    description: 'Chips, charts, sparklines, skeletons, and empty states.',
    category: 'Components',
    type: 'component',
  },
  {
    id: 'forms',
    title: 'Forms & Inputs',
    description: 'Code editor, tag editor, user picker, and icon picker.',
    category: 'Components',
    type: 'component',
  },
  {
    id: 'layout',
    title: 'Layout',
    description: 'Panel primitives and layout composition patterns.',
    category: 'Components',
    type: 'component',
  },
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'Pages', label: 'Pages' },
  { id: 'Agents', label: 'Agents' },
  { id: 'Components', label: 'Components' },
] as const;
