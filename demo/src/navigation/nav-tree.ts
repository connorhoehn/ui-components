import type { NavigationTree } from './types';

export const navigationTree: NavigationTree = [
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
  {
    id: 'foundations',
    label: 'Foundations',
    basePath: '/components',
    groups: [
      { id: 'comp-main', label: '', items: [
        { id: 'buttons', label: 'Buttons', path: '/components/buttons' },
        { id: 'feedback', label: 'Feedback', path: '/components/feedback' },
        { id: 'data-display', label: 'Data Display', path: '/components/data-display' },
        { id: 'forms', label: 'Forms & Inputs', path: '/components/forms' },
        { id: 'layout', label: 'Layout', path: '/components/layout' },
        { id: 'node-editor', label: 'Node Editor', path: '/components/node-editor' },
        { id: 'collaboration', label: 'Collaboration', path: '/components/collaboration' },
        { id: 'real-time-editing', label: 'Real-time Editing', path: '/components/real-time-editing' },
        { id: 'video', label: 'Video & Streaming', path: '/components/video' },
        { id: 'call-widget', label: 'Call Widget', path: '/components/call-widget' },
        { id: 'primitives', label: 'Primitives', path: '/components/primitives' },
        { id: 'chat', label: 'Chat & Thread', path: '/components/chat' },
        { id: 'patterns', label: 'Patterns', path: '/components/patterns' },
      ]},
    ],
  },
  {
    id: 'workflows',
    label: 'Workflows',
    basePath: '/workflows',
    groups: [
      { id: 'wf-pipelines', label: 'Pipelines', items: [
        { id: 'pipeline-editor', label: 'Pipeline Editor', path: '/workflows/pipeline-editor' },
        { id: 'pipeline-runs', label: 'Pipeline Runs', path: '/workflows/pipeline-runs' },
      ]},
      { id: 'wf-agents', label: 'Agents', items: [
        { id: 'agent-dashboard', label: 'Agent Dashboard', path: '/workflows/agents/dashboard' },
        { id: 'agent-flow', label: 'Agent Flow (A2A)', path: '/workflows/agents/flow' },
        { id: 'agent-invoke', label: 'Agent Invoke', path: '/workflows/agents/invoke' },
        { id: 'agent-detail', label: 'Agent Detail', path: '/workflows/agents/detail' },
      ]},
      { id: 'wf-documents', label: 'Documents', items: [
        { id: 'document-workspace', label: 'Document Workspace', path: '/workflows/document-workspace' },
        { id: 'wf-collaboration', label: 'Collaboration', path: '/workflows/collaboration' },
      ]},
      { id: 'wf-data', label: 'Data', items: [
        { id: 'ingest-dashboard', label: 'Ingest Dashboard', path: '/workflows/ingest-dashboard' },
        { id: 'observability', label: 'Observability', path: '/workflows/observability' },
      ]},
      { id: 'wf-social', label: 'Social', items: [
        { id: 'social-chat', label: 'Social & Chat', path: '/workflows/social' },
        { id: 'video-streaming', label: 'Video Streaming', path: '/workflows/video-streaming' },
        { id: 'call-widget-live', label: 'Call Widget', path: '/workflows/call-widget' },
      ]},
    ],
  },
  {
    id: 'identity',
    label: 'Identity',
    basePath: '/identity',
    groups: [
      { id: 'identity-auth', label: 'Auth Pages', items: [
        { id: 'identity-login', label: 'Login', path: '/identity/login' },
        { id: 'identity-consent', label: 'Consent', path: '/identity/consent' },
        { id: 'identity-mfa-verify', label: 'MFA Verify', path: '/identity/mfa-verify' },
        { id: 'identity-mfa-setup', label: 'MFA Setup', path: '/identity/mfa-setup' },
        { id: 'identity-logout', label: 'Logout', path: '/identity/logout' },
      ]},
      { id: 'identity-admin', label: 'Admin Pages', items: [
        { id: 'identity-admin-dashboard', label: 'Dashboard', path: '/identity/admin' },
        { id: 'identity-admin-pools', label: 'Pool Management', path: '/identity/admin/pools' },
        { id: 'identity-admin-users', label: 'User Management', path: '/identity/admin/users' },
        { id: 'identity-admin-groups', label: 'Group Management', path: '/identity/admin/groups' },
        { id: 'identity-admin-apps', label: 'Applications', path: '/identity/admin/applications' },
        { id: 'identity-admin-email', label: 'Email Templates', path: '/identity/admin/email-templates' },
        { id: 'identity-admin-mfa', label: 'MFA Management', path: '/identity/admin/mfa' },
        { id: 'identity-admin-audit', label: 'Audit Log', path: '/identity/admin/audit' },
        { id: 'identity-admin-full', label: 'Full Admin (Live)', path: '/identity/admin/full' },
      ]},
    ],
  },
  {
    id: 'patterns',
    label: 'Patterns',
    basePath: '/patterns',
    groups: [
      { id: 'patterns-main', label: '', items: [
        { id: 'websocket-provider', label: 'WebSocket Provider', path: '/patterns/websocket-provider' },
        { id: 'auth-integration', label: 'Auth Integration', path: '/patterns/auth-integration' },
        { id: 'theming-pattern', label: 'Theming', path: '/patterns/theming' },
        { id: 'custom-renderers', label: 'Custom Renderers', path: '/patterns/custom-renderers' },
        { id: 'simulations', label: 'Simulations', path: '/patterns/simulations' },
        { id: 'embedding-modules', label: 'Embedding Modules', path: '/patterns/embedding-modules' },
      ]},
    ],
  },
  {
    id: 'hooks',
    label: 'Hooks',
    basePath: '/hooks',
    groups: [
      { id: 'hooks-core', label: 'Core', items: [
        { id: 'hooks-connection', label: 'Connection', path: '/hooks/connection' },
        { id: 'hooks-ui', label: 'UI & Interaction', path: '/hooks/ui' },
      ]},
      { id: 'hooks-collab', label: 'Collaboration', items: [
        { id: 'hooks-documents', label: 'Documents', path: '/hooks/documents' },
        { id: 'hooks-collaboration', label: 'Real-time', path: '/hooks/collaboration' },
      ]},
      { id: 'hooks-agents', label: 'Agents', items: [
        { id: 'hooks-ag-ui-stream', label: 'AG-UI Stream', path: '/hooks/ag-ui-stream' },
        { id: 'hooks-agent-registry', label: 'Agent Registry', path: '/hooks/agent-registry' },
        { id: 'hooks-a2a-session', label: 'A2A Sessions', path: '/hooks/a2a-session' },
      ]},
    ],
  },
];
