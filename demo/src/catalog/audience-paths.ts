export interface AudienceLink {
  label: string;
  to: string;
}

export interface AudiencePath {
  id: string;
  /** "Build a chat" headline. */
  title: string;
  /** Short tagline shown under the title. */
  tagline: string;
  /** One-line description of what this path is. */
  description: string;
  /** Primary "Open demo" call-to-action. */
  primary: AudienceLink;
  /** Secondary related-demo chips (up to 4). */
  related: AudienceLink[];
  /** Hooks the consumer typically uses for this path. */
  hooks: string[];
  /** Composites the consumer typically uses for this path. */
  composites: string[];
  /** Token-driven accent color for the card spine + icon tint. */
  accent: 'indigo' | 'sky' | 'emerald' | 'amber' | 'slate';
}

export const audiencePaths: AudiencePath[] = [
  {
    id: 'chat',
    title: 'Build a chat',
    tagline: 'Channels with presence, reactions, typing.',
    description:
      'Drop in a ChatPanel wired to useChat() and you have a working channel — including presence, typing indicators, reactions, and replies.',
    primary: { label: 'Open chat demo', to: '/workflows/hook-chat' },
    related: [
      { label: 'Social panel', to: '/workflows/social' },
      { label: 'Reactions overlay', to: '/workflows/hook-reactions' },
      { label: 'Chat primitives', to: '/components/chat' },
    ],
    hooks: ['useChat', 'usePresence', 'useReactions'],
    composites: ['WrappedChatPanel', 'PresenceAvatars', 'ReactionsOverlay'],
    accent: 'indigo',
  },
  {
    id: 'call',
    title: 'Build a call',
    tagline: 'Video hangout with rooms, tiles, join tokens.',
    description:
      'Hangout rooms, multi-participant tile grids, transcripts, and recordings — backed by useVideoHangout() and the HangoutLayout composite.',
    primary: { label: 'Open call demo', to: '/workflows/hook-videohangout' },
    related: [
      { label: 'Hangout rooms list', to: '/workflows/hook-hangoutrooms' },
      { label: 'Video streaming', to: '/workflows/video-streaming' },
      { label: 'Call widget', to: '/workflows/call-widget' },
    ],
    hooks: ['useVideoHangout', 'useHangoutRooms'],
    composites: ['WrappedHangoutLayout', 'WrappedHangoutRoomsList', 'CallWidget'],
    accent: 'sky',
  },
  {
    id: 'doc',
    title: 'Build a doc',
    tagline: 'Collaborative rich-text with cursors and comments.',
    description:
      'A TipTap-based editor with Yjs CRDT, live cursors, threaded comments, and version history — composable with the rest of the workspace shell.',
    primary: { label: 'Open document demo', to: '/workflows/document-workspace' },
    related: [
      { label: 'Real-time collaboration', to: '/workflows/collaboration' },
      { label: 'Real-time editing primitives', to: '/components/real-time-editing' },
    ],
    hooks: ['useCRDT', 'useActivity'],
    composites: ['DocumentWorkspace', 'WrappedActivityPanel'],
    accent: 'emerald',
  },
  {
    id: 'pipeline',
    title: 'Build a pipeline',
    tagline: 'Visual node-graph editor with runs and DLQ.',
    description:
      'A drag-and-drop pipeline editor with validation, execution replay, run inspection, approvals, and a dead-letter queue triage flow.',
    primary: { label: 'Open pipeline demo', to: '/workflows/pipeline-editor' },
    related: [
      { label: 'Ingest dashboard', to: '/workflows/ingest-dashboard' },
      { label: 'Node-editor primitives', to: '/components/node-editor' },
    ],
    hooks: ['useChannel'],
    composites: ['PipelineEditor', 'RunsTable', 'NodeEditor'],
    accent: 'amber',
  },
  {
    id: 'admin',
    title: 'Build an admin console',
    tagline: 'Identity, observability, agents — one shell.',
    description:
      'A full operator console: identity & user-pool admin, observability dashboards with alerts, and the agents inventory + flow canvas.',
    primary: { label: 'Open admin demo', to: '/workflows/identity/admin/full' },
    related: [
      { label: 'Users & pools', to: '/workflows/identity/admin/users' },
      { label: 'Observability', to: '/workflows/observability' },
      { label: 'Agents dashboard', to: '/workflows/agents/dashboard' },
    ],
    hooks: ['useFeatureFlag', 'useCapability'],
    composites: ['AppShell', 'IdentityAdminPanel', 'ObservabilityShell'],
    accent: 'slate',
  },
];
