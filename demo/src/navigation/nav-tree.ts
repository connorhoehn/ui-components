import type { NavigationTree } from './types';

export const navigationTree: NavigationTree = [
  // ============================================================
  // 1. Get Started
  // ============================================================
  {
    id: 'get-started',
    label: 'Get Started',
    basePath: '/get-started',
    groups: [
      { id: 'gs-main', label: '', items: [
        { id: 'introduction', label: 'Introduction', path: '/get-started/introduction' },
        { id: 'installation', label: 'Installation', path: '/get-started/installation' },
        { id: 'quick-start', label: 'Quick Start', path: '/get-started/quick-start' },
        { id: 'theming', label: 'Theming', path: '/get-started/theming' },
      ]},
    ],
  },

  // ============================================================
  // 2. Foundations — component primitives
  // ============================================================
  {
    id: 'foundations',
    label: 'Foundations',
    basePath: '/components',
    groups: [
      { id: 'foundations-primitives', label: 'Primitives', items: [
        { id: 'primitives', label: 'Primitives', path: '/components/primitives' },
        { id: 'buttons', label: 'Buttons', path: '/components/buttons' },
      ]},
      { id: 'foundations-forms', label: 'Forms & Inputs', items: [
        { id: 'forms', label: 'Forms & Inputs', path: '/components/forms' },
      ]},
      { id: 'foundations-layout', label: 'Layout', items: [
        { id: 'layout', label: 'Layout', path: '/components/layout' },
      ]},
      { id: 'foundations-feedback', label: 'Feedback', items: [
        { id: 'feedback', label: 'Feedback', path: '/components/feedback' },
      ]},
      { id: 'foundations-data', label: 'Data Display', items: [
        { id: 'data-display', label: 'Data Display', path: '/components/data-display' },
      ]},
      { id: 'foundations-chat', label: 'Chat & Thread', items: [
        { id: 'chat', label: 'Chat & Thread', path: '/components/chat' },
      ]},
      { id: 'foundations-shell', label: 'Shell Composites', items: [
        { id: 'shell-composites', label: 'Shell Composites', path: '/components/shell' },
      ]},
      { id: 'foundations-video', label: 'Video Primitives', items: [
        { id: 'video', label: 'Video Primitives', path: '/components/video' },
      ]},
    ],
  },

  // ============================================================
  // 3. Workflows — full-domain demos
  // ============================================================
  {
    id: 'workflows',
    label: 'Workflows',
    basePath: '/workflows',
    groups: [
      { id: 'wf-pipelines', label: 'Pipelines', items: [
        { id: 'pipeline-editor', label: 'Pipeline Editor', path: '/workflows/pipeline-editor' },
      ]},
      { id: 'wf-agents', label: 'Agents', items: [
        { id: 'agent-dashboard', label: 'Agent Dashboard', path: '/workflows/agents/dashboard' },
        { id: 'agent-flow', label: 'Agent Flow (A2A)', path: '/workflows/agents/flow' },
        { id: 'agent-invoke', label: 'Agent Invoke', path: '/workflows/agents/invoke' },
        { id: 'agent-detail', label: 'Agent Detail', path: '/workflows/agents/detail' },
      ]},
      { id: 'wf-documents', label: 'Documents', items: [
        { id: 'document-workspace', label: 'Document Workspace', path: '/workflows/document-workspace' },
      ]},
      { id: 'wf-data', label: 'Data', items: [
        { id: 'ingest-dashboard', label: 'Ingest Dashboard', path: '/workflows/ingest-dashboard' },
        { id: 'observability', label: 'Observability', path: '/workflows/observability' },
      ]},
      { id: 'wf-collab-rt', label: 'Collaboration & Real-time Editing', items: [
        { id: 'wf-collaboration', label: 'Collaboration', path: '/workflows/collaboration' },
        { id: 'real-time-editing', label: 'Real-time Editing', path: '/components/real-time-editing' },
        { id: 'collaboration-primitives', label: 'Collaboration Primitives', path: '/components/collaboration' },
      ]},
      { id: 'wf-social', label: 'Social & Chat', items: [
        { id: 'social-chat', label: 'Social & Chat', path: '/workflows/social' },
      ]},
      { id: 'wf-video', label: 'Video & Streaming', items: [
        { id: 'video-streaming', label: 'Video Streaming', path: '/workflows/video-streaming' },
        { id: 'call-widget-live', label: 'Call Widget', path: '/workflows/call-widget' },
        { id: 'call-widget-primitive', label: 'Call Widget Primitive', path: '/components/call-widget' },
        { id: 'node-editor-live', label: 'Node Editor Live', path: '/pages/node-editor-live' },
        { id: 'node-editor-primitive', label: 'Node Editor Primitive', path: '/components/node-editor' },
      ]},
      { id: 'wf-identity-auth', label: 'Identity — Auth', items: [
        { id: 'identity-login', label: 'Login', path: '/workflows/identity/login' },
        { id: 'identity-consent', label: 'Consent', path: '/workflows/identity/consent' },
        { id: 'identity-mfa-verify', label: 'MFA Verify', path: '/workflows/identity/mfa-verify' },
        { id: 'identity-mfa-setup', label: 'MFA Setup', path: '/workflows/identity/mfa-setup' },
        { id: 'identity-logout', label: 'Logout', path: '/workflows/identity/logout' },
      ]},
      { id: 'wf-identity-admin', label: 'Identity — Admin', items: [
        { id: 'identity-admin-dashboard', label: 'Dashboard', path: '/workflows/identity/admin' },
        { id: 'identity-admin-pools', label: 'Pool Management', path: '/workflows/identity/admin/pools' },
        { id: 'identity-admin-users', label: 'User Management', path: '/workflows/identity/admin/users' },
        { id: 'identity-admin-groups', label: 'Group Management', path: '/workflows/identity/admin/groups' },
        { id: 'identity-admin-apps', label: 'Applications', path: '/workflows/identity/admin/applications' },
        { id: 'identity-admin-email', label: 'Email Templates', path: '/workflows/identity/admin/email-templates' },
        { id: 'identity-admin-mfa', label: 'MFA Management', path: '/workflows/identity/admin/mfa' },
        { id: 'identity-admin-audit', label: 'Audit Log', path: '/workflows/identity/admin/audit' },
        { id: 'identity-admin-full', label: 'Full Admin (Live)', path: '/workflows/identity/admin/full' },
      ]},
    ],
  },

  // ============================================================
  // 4. Reference — hooks, patterns, integrations
  // ============================================================
  {
    id: 'reference',
    label: 'Reference',
    basePath: '/hooks',
    groups: [
      { id: 'ref-hooks-connection', label: 'Hooks — Connection', items: [
        { id: 'hooks-useWebSocket', label: 'useWebSocket', path: '/hooks/useWebSocket' },
        { id: 'hooks-useApiCall', label: 'useApiCall', path: '/hooks/useApiCall' },
        { id: 'hooks-useApiHealth', label: 'useApiHealth', path: '/hooks/useApiHealth' },
      ]},
      { id: 'ref-hooks-realtime', label: 'Hooks — Real-time', items: [
        { id: 'hooks-useChat', label: 'useChat', path: '/hooks/useChat' },
        { id: 'hooks-usePresence', label: 'usePresence', path: '/hooks/usePresence' },
        { id: 'hooks-useReactions', label: 'useReactions', path: '/hooks/useReactions' },
        { id: 'hooks-useCursors', label: 'useCursors', path: '/hooks/useCursors' },
        { id: 'hooks-useActivityBus', label: 'useActivityBus', path: '/hooks/useActivityBus' },
      ]},
      { id: 'ref-hooks-documents', label: 'Hooks — Documents', items: [
        { id: 'hooks-useCollaborativeDoc', label: 'useCollaborativeDoc', path: '/hooks/useCollaborativeDoc' },
        { id: 'hooks-useCRDT', label: 'useCRDT', path: '/hooks/useCRDT' },
        { id: 'hooks-useDocuments', label: 'useDocuments', path: '/hooks/useDocuments' },
        { id: 'hooks-useDocumentComments', label: 'useDocumentComments', path: '/hooks/useDocumentComments' },
      ]},
      { id: 'ref-hooks-ui', label: 'Hooks — UI & Interaction', items: [
        { id: 'hooks-useClickOutside', label: 'useClickOutside', path: '/hooks/useClickOutside' },
        { id: 'hooks-useKeyboardShortcuts', label: 'useKeyboardShortcuts', path: '/hooks/useKeyboardShortcuts' },
        { id: 'hooks-useIdleDetector', label: 'useIdleDetector', path: '/hooks/useIdleDetector' },
      ]},
      { id: 'ref-hooks-agents', label: 'Hooks — Agents', items: [
        { id: 'hooks-ag-ui-stream', label: 'AG-UI Stream', path: '/hooks/ag-ui-stream' },
        { id: 'hooks-agent-registry', label: 'Agent Registry', path: '/hooks/agent-registry' },
        { id: 'hooks-a2a-session', label: 'A2A Sessions', path: '/hooks/a2a-session' },
      ]},
      { id: 'ref-patterns', label: 'Patterns', items: [
        { id: 'websocket-provider', label: 'WebSocket Provider', path: '/patterns/websocket-provider' },
        { id: 'auth-integration', label: 'Auth Integration', path: '/patterns/auth-integration' },
        { id: 'theming-pattern', label: 'Theming', path: '/patterns/theming' },
        { id: 'custom-renderers', label: 'Custom Renderers', path: '/patterns/custom-renderers' },
        { id: 'simulations', label: 'Simulations', path: '/patterns/simulations' },
        { id: 'embedding-modules', label: 'Embedding Modules', path: '/patterns/embedding-modules' },
      ]},
      { id: 'ref-integrations', label: 'Integrations (realtime-modules)', items: [
        { id: 'wrapped-components', label: 'Raw vs Wrapped (overview)', path: '/workflows/wrapped-components' },
        { id: 'hook-chat', label: 'ChatPanel + useChat', path: '/workflows/hook-chat' },
        { id: 'hook-presence', label: 'PresencePanel + usePresence', path: '/workflows/hook-presence' },
        { id: 'hook-reactions', label: 'ReactionButtons + useReactions', path: '/workflows/hook-reactions' },
        { id: 'hook-fileupload', label: 'FileUploadDrop + useFileUpload', path: '/workflows/hook-fileupload' },
        { id: 'hook-videohangout', label: 'HangoutLayout + useVideoHangout', path: '/workflows/hook-videohangout' },
        { id: 'hook-hangoutrooms', label: 'HangoutRoomsList + useHangoutRooms', path: '/workflows/hook-hangoutrooms' },
        { id: 'hook-activity', label: 'ActivityFeed + useActivity', path: '/workflows/hook-activity' },
        { id: 'hook-notifications', label: 'NotificationCenter + useNotifications', path: '/workflows/hook-notifications' },
        { id: 'hook-capability', label: 'useCapability + CapabilityBoundary', path: '/workflows/hook-capability' },
      ]},
    ],
  },
];
