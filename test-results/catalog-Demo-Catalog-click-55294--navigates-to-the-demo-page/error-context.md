# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: catalog.spec.ts >> Demo Catalog >> clicking a demo card navigates to the demo page
- Location: tests/e2e/catalog.spec.ts:36:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href="/pages/pipeline-editor"]')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation "Documentation navigation" [ref=e5]:
    - link "UI Components" [ref=e7] [cursor=pointer]:
      - /url: /
    - generic [ref=e8]:
      - link "Get Started" [ref=e9] [cursor=pointer]:
        - /url: /get-started
        - generic [ref=e10]: Get Started
      - link "Foundations" [ref=e11] [cursor=pointer]:
        - /url: /components
        - generic [ref=e12]: Foundations
      - link "Workflows" [ref=e13] [cursor=pointer]:
        - /url: /workflows
        - generic [ref=e14]: Workflows
      - link "Reference" [ref=e15] [cursor=pointer]:
        - /url: /hooks
        - generic [ref=e16]: Reference
    - button "Open command palette" [ref=e18] [cursor=pointer]:
      - generic [ref=e19]: ⌘K
      - generic [ref=e20]: Search
  - generic [ref=e21]:
    - complementary "Documentation navigation" [ref=e23]:
      - generic [ref=e24]:
        - button "Get Started" [expanded] [ref=e25] [cursor=pointer]:
          - generic [ref=e26]: ▼
          - text: Get Started
        - generic [ref=e28]:
          - link "Introduction" [ref=e29] [cursor=pointer]:
            - /url: /get-started/introduction
            - generic [ref=e30]: Introduction
          - link "Installation" [ref=e31] [cursor=pointer]:
            - /url: /get-started/installation
            - generic [ref=e32]: Installation
          - link "Quick Start" [ref=e33] [cursor=pointer]:
            - /url: /get-started/quick-start
            - generic [ref=e34]: Quick Start
          - link "Theming" [ref=e35] [cursor=pointer]:
            - /url: /get-started/theming
            - generic [ref=e36]: Theming
      - generic [ref=e37]:
        - button "Foundations" [expanded] [ref=e38] [cursor=pointer]:
          - generic [ref=e39]: ▼
          - text: Foundations
        - generic [ref=e40]:
          - generic [ref=e41]:
            - generic [ref=e42]: Primitives
            - link "Primitives" [ref=e43] [cursor=pointer]:
              - /url: /components/primitives
              - generic [ref=e44]: Primitives
            - link "Buttons" [ref=e45] [cursor=pointer]:
              - /url: /components/buttons
              - generic [ref=e46]: Buttons
          - generic [ref=e47]:
            - generic [ref=e48]: Forms & Inputs
            - link "Forms & Inputs" [ref=e49] [cursor=pointer]:
              - /url: /components/forms
              - generic [ref=e50]: Forms & Inputs
          - generic [ref=e51]:
            - generic [ref=e52]: Layout
            - link "Layout" [ref=e53] [cursor=pointer]:
              - /url: /components/layout
              - generic [ref=e54]: Layout
          - generic [ref=e55]:
            - generic [ref=e56]: Feedback
            - link "Feedback" [ref=e57] [cursor=pointer]:
              - /url: /components/feedback
              - generic [ref=e58]: Feedback
          - generic [ref=e59]:
            - generic [ref=e60]: Data Display
            - link "Data Display" [ref=e61] [cursor=pointer]:
              - /url: /components/data-display
              - generic [ref=e62]: Data Display
          - generic [ref=e63]:
            - generic [ref=e64]: Chat & Thread
            - link "Chat & Thread" [ref=e65] [cursor=pointer]:
              - /url: /components/chat
              - generic [ref=e66]: Chat & Thread
          - generic [ref=e67]:
            - generic [ref=e68]: Shell Composites
            - link "Shell Composites" [ref=e69] [cursor=pointer]:
              - /url: /components/shell
              - generic [ref=e70]: Shell Composites
          - generic [ref=e71]:
            - generic [ref=e72]: Video Primitives
            - link "Video Primitives" [ref=e73] [cursor=pointer]:
              - /url: /components/video
              - generic [ref=e74]: Video Primitives
      - generic [ref=e75]:
        - button "Workflows" [expanded] [ref=e76] [cursor=pointer]:
          - generic [ref=e77]: ▼
          - text: Workflows
        - generic [ref=e78]:
          - generic [ref=e79]:
            - generic [ref=e80]: Pipelines
            - link "Pipeline Editor" [ref=e81] [cursor=pointer]:
              - /url: /workflows/pipeline-editor
              - generic [ref=e82]: Pipeline Editor
          - generic [ref=e83]:
            - generic [ref=e84]: Agents
            - link "Agent Dashboard" [ref=e85] [cursor=pointer]:
              - /url: /workflows/agents/dashboard
              - generic [ref=e86]: Agent Dashboard
            - link "Agent Flow (A2A)" [ref=e87] [cursor=pointer]:
              - /url: /workflows/agents/flow
              - generic [ref=e88]: Agent Flow (A2A)
            - link "Agent Invoke" [ref=e89] [cursor=pointer]:
              - /url: /workflows/agents/invoke
              - generic [ref=e90]: Agent Invoke
            - link "Agent Detail" [ref=e91] [cursor=pointer]:
              - /url: /workflows/agents/detail
              - generic [ref=e92]: Agent Detail
          - generic [ref=e93]:
            - generic [ref=e94]: Documents
            - link "Document Workspace" [ref=e95] [cursor=pointer]:
              - /url: /workflows/document-workspace
              - generic [ref=e96]: Document Workspace
          - generic [ref=e97]:
            - generic [ref=e98]: Data
            - link "Ingest Dashboard" [ref=e99] [cursor=pointer]:
              - /url: /workflows/ingest-dashboard
              - generic [ref=e100]: Ingest Dashboard
            - link "Observability" [ref=e101] [cursor=pointer]:
              - /url: /workflows/observability
              - generic [ref=e102]: Observability
          - generic [ref=e103]:
            - generic [ref=e104]: Collaboration & Real-time Editing
            - link "Collaboration" [ref=e105] [cursor=pointer]:
              - /url: /workflows/collaboration
              - generic [ref=e106]: Collaboration
            - link "Real-time Editing" [ref=e107] [cursor=pointer]:
              - /url: /components/real-time-editing
              - generic [ref=e108]: Real-time Editing
            - link "Collaboration Primitives" [ref=e109] [cursor=pointer]:
              - /url: /components/collaboration
              - generic [ref=e110]: Collaboration Primitives
          - generic [ref=e111]:
            - generic [ref=e112]: Social & Chat
            - link "Social & Chat" [ref=e113] [cursor=pointer]:
              - /url: /workflows/social
              - generic [ref=e114]: Social & Chat
          - generic [ref=e115]:
            - generic [ref=e116]: Video & Streaming
            - link "Video Streaming" [ref=e117] [cursor=pointer]:
              - /url: /workflows/video-streaming
              - generic [ref=e118]: Video Streaming
            - link "Call Widget" [ref=e119] [cursor=pointer]:
              - /url: /workflows/call-widget
              - generic [ref=e120]: Call Widget
            - link "Call Widget Primitive" [ref=e121] [cursor=pointer]:
              - /url: /components/call-widget
              - generic [ref=e122]: Call Widget Primitive
            - link "Node Editor Live" [ref=e123] [cursor=pointer]:
              - /url: /pages/node-editor-live
              - generic [ref=e124]: Node Editor Live
            - link "Node Editor Primitive" [ref=e125] [cursor=pointer]:
              - /url: /components/node-editor
              - generic [ref=e126]: Node Editor Primitive
          - generic [ref=e127]:
            - generic [ref=e128]: Identity — Auth
            - link "Login" [ref=e129] [cursor=pointer]:
              - /url: /workflows/identity/login
              - generic [ref=e130]: Login
            - link "Consent" [ref=e131] [cursor=pointer]:
              - /url: /workflows/identity/consent
              - generic [ref=e132]: Consent
            - link "MFA Verify" [ref=e133] [cursor=pointer]:
              - /url: /workflows/identity/mfa-verify
              - generic [ref=e134]: MFA Verify
            - link "MFA Setup" [ref=e135] [cursor=pointer]:
              - /url: /workflows/identity/mfa-setup
              - generic [ref=e136]: MFA Setup
            - link "Logout" [ref=e137] [cursor=pointer]:
              - /url: /workflows/identity/logout
              - generic [ref=e138]: Logout
          - generic [ref=e139]:
            - generic [ref=e140]: Identity — Admin
            - link "Dashboard" [ref=e141] [cursor=pointer]:
              - /url: /workflows/identity/admin
              - generic [ref=e142]: Dashboard
            - link "Pool Management" [ref=e143] [cursor=pointer]:
              - /url: /workflows/identity/admin/pools
              - generic [ref=e144]: Pool Management
            - link "User Management" [ref=e145] [cursor=pointer]:
              - /url: /workflows/identity/admin/users
              - generic [ref=e146]: User Management
            - link "Group Management" [ref=e147] [cursor=pointer]:
              - /url: /workflows/identity/admin/groups
              - generic [ref=e148]: Group Management
            - link "Applications" [ref=e149] [cursor=pointer]:
              - /url: /workflows/identity/admin/applications
              - generic [ref=e150]: Applications
            - link "Email Templates" [ref=e151] [cursor=pointer]:
              - /url: /workflows/identity/admin/email-templates
              - generic [ref=e152]: Email Templates
            - link "MFA Management" [ref=e153] [cursor=pointer]:
              - /url: /workflows/identity/admin/mfa
              - generic [ref=e154]: MFA Management
            - link "Audit Log" [ref=e155] [cursor=pointer]:
              - /url: /workflows/identity/admin/audit
              - generic [ref=e156]: Audit Log
            - link "Full Admin (Live)" [ref=e157] [cursor=pointer]:
              - /url: /workflows/identity/admin/full
              - generic [ref=e158]: Full Admin (Live)
      - generic [ref=e159]:
        - button "Reference" [expanded] [ref=e160] [cursor=pointer]:
          - generic [ref=e161]: ▼
          - text: Reference
        - generic [ref=e162]:
          - generic [ref=e163]:
            - generic [ref=e164]: Hooks — Core
            - link "Connection" [ref=e165] [cursor=pointer]:
              - /url: /hooks/connection
              - generic [ref=e166]: Connection
            - link "UI & Interaction" [ref=e167] [cursor=pointer]:
              - /url: /hooks/ui
              - generic [ref=e168]: UI & Interaction
          - generic [ref=e169]:
            - generic [ref=e170]: Hooks — Collaboration
            - link "Documents" [ref=e171] [cursor=pointer]:
              - /url: /hooks/documents
              - generic [ref=e172]: Documents
            - link "Real-time" [ref=e173] [cursor=pointer]:
              - /url: /hooks/collaboration
              - generic [ref=e174]: Real-time
          - generic [ref=e175]:
            - generic [ref=e176]: Hooks — Agents
            - link "AG-UI Stream" [ref=e177] [cursor=pointer]:
              - /url: /hooks/ag-ui-stream
              - generic [ref=e178]: AG-UI Stream
            - link "Agent Registry" [ref=e179] [cursor=pointer]:
              - /url: /hooks/agent-registry
              - generic [ref=e180]: Agent Registry
            - link "A2A Sessions" [ref=e181] [cursor=pointer]:
              - /url: /hooks/a2a-session
              - generic [ref=e182]: A2A Sessions
          - generic [ref=e183]:
            - generic [ref=e184]: Patterns
            - link "WebSocket Provider" [ref=e185] [cursor=pointer]:
              - /url: /patterns/websocket-provider
              - generic [ref=e186]: WebSocket Provider
            - link "Auth Integration" [ref=e187] [cursor=pointer]:
              - /url: /patterns/auth-integration
              - generic [ref=e188]: Auth Integration
            - link "Theming" [ref=e189] [cursor=pointer]:
              - /url: /patterns/theming
              - generic [ref=e190]: Theming
            - link "Custom Renderers" [ref=e191] [cursor=pointer]:
              - /url: /patterns/custom-renderers
              - generic [ref=e192]: Custom Renderers
            - link "Simulations" [ref=e193] [cursor=pointer]:
              - /url: /patterns/simulations
              - generic [ref=e194]: Simulations
            - link "Embedding Modules" [ref=e195] [cursor=pointer]:
              - /url: /patterns/embedding-modules
              - generic [ref=e196]: Embedding Modules
          - generic [ref=e197]:
            - generic [ref=e198]: Integrations (realtime-modules)
            - link "Raw vs Wrapped (overview)" [ref=e199] [cursor=pointer]:
              - /url: /workflows/wrapped-components
              - generic [ref=e200]: Raw vs Wrapped (overview)
            - link "ChatPanel + useChat" [ref=e201] [cursor=pointer]:
              - /url: /workflows/hook-chat
              - generic [ref=e202]: ChatPanel + useChat
            - link "PresencePanel + usePresence" [ref=e203] [cursor=pointer]:
              - /url: /workflows/hook-presence
              - generic [ref=e204]: PresencePanel + usePresence
            - link "ReactionButtons + useReactions" [ref=e205] [cursor=pointer]:
              - /url: /workflows/hook-reactions
              - generic [ref=e206]: ReactionButtons + useReactions
            - link "FileUploadDrop + useFileUpload" [ref=e207] [cursor=pointer]:
              - /url: /workflows/hook-fileupload
              - generic [ref=e208]: FileUploadDrop + useFileUpload
            - link "HangoutLayout + useVideoHangout" [ref=e209] [cursor=pointer]:
              - /url: /workflows/hook-videohangout
              - generic [ref=e210]: HangoutLayout + useVideoHangout
    - main [ref=e211]:
      - generic [ref=e213]:
        - generic [ref=e214]:
          - heading "Component Demos" [level=1] [ref=e215]
          - paragraph [ref=e216]: Interactive demonstrations of the @connorhoehnslalom/ui-components library. Each demo showcases a domain module with mock data.
        - generic [ref=e217]:
          - button "All" [ref=e218] [cursor=pointer]
          - button "Foundations" [ref=e219] [cursor=pointer]
          - button "Workflows" [ref=e220] [cursor=pointer]
          - button "Agents" [ref=e221] [cursor=pointer]
          - button "Hook Integrations" [ref=e222] [cursor=pointer]
        - generic [ref=e223]:
          - link "🖼 Workflows Pipeline Editor Visual workflow builder with drag-and-drop nodes, validation, and execution replay." [ref=e224] [cursor=pointer]:
            - /url: /demo/pipeline-editor
            - generic [ref=e225]:
              - generic [ref=e227]: 🖼
              - generic [ref=e228]:
                - generic [ref=e230]: Workflows
                - heading "Pipeline Editor" [level=3] [ref=e231]
                - paragraph [ref=e232]: Visual workflow builder with drag-and-drop nodes, validation, and execution replay.
          - link "🖼 Workflows Ingest Dashboard Data ingestion monitoring with sources, sync progress, DLQ, and conflict resolution." [ref=e233] [cursor=pointer]:
            - /url: /demo/ingest-dashboard
            - generic [ref=e234]:
              - generic [ref=e236]: 🖼
              - generic [ref=e237]:
                - generic [ref=e239]: Workflows
                - heading "Ingest Dashboard" [level=3] [ref=e240]
                - paragraph [ref=e241]: Data ingestion monitoring with sources, sync progress, DLQ, and conflict resolution.
          - link "🖼 Workflows Document Workspace Collaborative document editor with real-time cursors, comments, and version history." [ref=e242] [cursor=pointer]:
            - /url: /demo/document-workspace
            - generic [ref=e243]:
              - generic [ref=e245]: 🖼
              - generic [ref=e246]:
                - generic [ref=e248]: Workflows
                - heading "Document Workspace" [level=3] [ref=e249]
                - paragraph [ref=e250]: Collaborative document editor with real-time cursors, comments, and version history.
          - link "🖼 Workflows Observability Dashboard Cluster monitoring with metrics, alerts, chaos panel, and active runs table." [ref=e251] [cursor=pointer]:
            - /url: /demo/observability-shell
            - generic [ref=e252]:
              - generic [ref=e254]: 🖼
              - generic [ref=e255]:
                - generic [ref=e257]: Workflows
                - heading "Observability Dashboard" [level=3] [ref=e258]
                - paragraph [ref=e259]: Cluster monitoring with metrics, alerts, chaos panel, and active runs table.
          - link "🖼 Workflows Social & Chat Chat rooms, post feed, presence indicators, and group management." [ref=e260] [cursor=pointer]:
            - /url: /demo/social-panel
            - generic [ref=e261]:
              - generic [ref=e263]: 🖼
              - generic [ref=e264]:
                - generic [ref=e266]: Workflows
                - heading "Social & Chat" [level=3] [ref=e267]
                - paragraph [ref=e268]: Chat rooms, post feed, presence indicators, and group management.
          - link "🖼 Workflows Real-time Collaboration Multiplayer cursors, shared text editing, canvas drawing, and reactions." [ref=e269] [cursor=pointer]:
            - /url: /demo/collaboration
            - generic [ref=e270]:
              - generic [ref=e272]: 🖼
              - generic [ref=e273]:
                - generic [ref=e275]: Workflows
                - heading "Real-time Collaboration" [level=3] [ref=e276]
                - paragraph [ref=e277]: Multiplayer cursors, shared text editing, canvas drawing, and reactions.
          - link "🖼 Hook Integrations ChatPanel + useChat ChatPanel wired to useChat() from realtime-modules. Mock mode fires synthetic messages; set VITE_GATEWAY_URL to go live." [ref=e278] [cursor=pointer]:
            - /url: /workflows/hook-chat
            - generic [ref=e279]:
              - generic [ref=e281]: 🖼
              - generic [ref=e282]:
                - generic [ref=e284]: Hook Integrations
                - heading "ChatPanel + useChat" [level=3] [ref=e285]
                - paragraph [ref=e286]: ChatPanel wired to useChat() from realtime-modules. Mock mode fires synthetic messages; set VITE_GATEWAY_URL to go live.
          - link "🖼 Hook Integrations PresencePanel + usePresence PresencePanel wired to usePresence(). Simulates join/away/return events in mock mode." [ref=e287] [cursor=pointer]:
            - /url: /workflows/hook-presence
            - generic [ref=e288]:
              - generic [ref=e290]: 🖼
              - generic [ref=e291]:
                - generic [ref=e293]: Hook Integrations
                - heading "PresencePanel + usePresence" [level=3] [ref=e294]
                - paragraph [ref=e295]: PresencePanel wired to usePresence(). Simulates join/away/return events in mock mode.
          - link "🖼 Hook Integrations ReactionButtons + useReactions ReactionButtons and ReactionsOverlay wired to useReactions(). Auto-fires emoji in mock mode." [ref=e296] [cursor=pointer]:
            - /url: /workflows/hook-reactions
            - generic [ref=e297]:
              - generic [ref=e299]: 🖼
              - generic [ref=e300]:
                - generic [ref=e302]: Hook Integrations
                - heading "ReactionButtons + useReactions" [level=3] [ref=e303]
                - paragraph [ref=e304]: ReactionButtons and ReactionsOverlay wired to useReactions(). Auto-fires emoji in mock mode.
          - link "🖼 Hook Integrations FileUploadDrop + useFileUpload FileUploadDrop wired to useFileUpload(). Simulates presign → XHR → AV-scan lifecycle." [ref=e305] [cursor=pointer]:
            - /url: /workflows/hook-fileupload
            - generic [ref=e306]:
              - generic [ref=e308]: 🖼
              - generic [ref=e309]:
                - generic [ref=e311]: Hook Integrations
                - heading "FileUploadDrop + useFileUpload" [level=3] [ref=e312]
                - paragraph [ref=e313]: FileUploadDrop wired to useFileUpload(). Simulates presign → XHR → AV-scan lifecycle.
          - link "🖼 Hook Integrations HangoutLayout + useVideoHangout HangoutLayout wired to useVideoHangout(). Mock participants join with stagger; joinToken displayed." [ref=e314] [cursor=pointer]:
            - /url: /workflows/hook-videohangout
            - generic [ref=e315]:
              - generic [ref=e317]: 🖼
              - generic [ref=e318]:
                - generic [ref=e320]: Hook Integrations
                - heading "HangoutLayout + useVideoHangout" [level=3] [ref=e321]
                - paragraph [ref=e322]: HangoutLayout wired to useVideoHangout(). Mock participants join with stagger; joinToken displayed.
          - 'link "🖼 Hook Integrations Raw vs Wrapped (overview) Side-by-side comparison: raw hook wiring vs WrappedChatPanel + WrappedPresencePanel. Read this first if you are choosing between adapter styles." [ref=e323] [cursor=pointer]':
            - /url: /workflows/wrapped-components
            - generic [ref=e324]:
              - generic [ref=e326]: 🖼
              - generic [ref=e327]:
                - generic [ref=e329]: Hook Integrations
                - heading "Raw vs Wrapped (overview)" [level=3] [ref=e330]
                - paragraph [ref=e331]: "Side-by-side comparison: raw hook wiring vs WrappedChatPanel + WrappedPresencePanel. Read this first if you are choosing between adapter styles."
          - link "🖼 Agents Agents Dashboard Agents dashboard — grid of registered agents with status badges" [ref=e332] [cursor=pointer]:
            - /url: /workflows/agents/dashboard
            - generic [ref=e333]:
              - generic [ref=e335]: 🖼
              - generic [ref=e336]:
                - generic [ref=e338]: Agents
                - heading "Agents Dashboard" [level=3] [ref=e339]
                - paragraph [ref=e340]: Agents dashboard — grid of registered agents with status badges
          - link "🖼 Agents Agent Flow Canvas Agent flow canvas — A2A connections visualized with xyflow" [ref=e341] [cursor=pointer]:
            - /url: /workflows/agents/flow
            - generic [ref=e342]:
              - generic [ref=e344]: 🖼
              - generic [ref=e345]:
                - generic [ref=e347]: Agents
                - heading "Agent Flow Canvas" [level=3] [ref=e348]
                - paragraph [ref=e349]: Agent flow canvas — A2A connections visualized with xyflow
          - link "🖼 Agents Streaming Agent Invoke Streaming agent invoke — AG-UI chat with reasoning, tool calls, and state" [ref=e350] [cursor=pointer]:
            - /url: /workflows/agents/invoke
            - generic [ref=e351]:
              - generic [ref=e353]: 🖼
              - generic [ref=e354]:
                - generic [ref=e356]: Agents
                - heading "Streaming Agent Invoke" [level=3] [ref=e357]
                - paragraph [ref=e358]: Streaming agent invoke — AG-UI chat with reasoning, tool calls, and state
          - link "🖼 Agents Agent Detail Per-agent detail — trace timeline, guardrails, memory, policy decisions" [ref=e359] [cursor=pointer]:
            - /url: /workflows/agents/detail
            - generic [ref=e360]:
              - generic [ref=e362]: 🖼
              - generic [ref=e363]:
                - generic [ref=e365]: Agents
                - heading "Agent Detail" [level=3] [ref=e366]
                - paragraph [ref=e367]: Per-agent detail — trace timeline, guardrails, memory, policy decisions
          - link "🧱 Foundations Buttons Button and IconButton variants, sizes, and states." [ref=e368] [cursor=pointer]:
            - /url: /components/buttons
            - generic [ref=e369]:
              - generic [ref=e371]: 🧱
              - generic [ref=e372]:
                - generic [ref=e374]: Foundations
                - heading "Buttons" [level=3] [ref=e375]
                - paragraph [ref=e376]: Button and IconButton variants, sizes, and states.
          - link "🧱 Foundations Feedback Toast notifications, banners, modals, and confirmation dialogs." [ref=e377] [cursor=pointer]:
            - /url: /components/feedback
            - generic [ref=e378]:
              - generic [ref=e380]: 🧱
              - generic [ref=e381]:
                - generic [ref=e383]: Foundations
                - heading "Feedback" [level=3] [ref=e384]
                - paragraph [ref=e385]: Toast notifications, banners, modals, and confirmation dialogs.
          - link "🧱 Foundations Data Display Chips, charts, sparklines, skeletons, and empty states." [ref=e386] [cursor=pointer]:
            - /url: /components/data-display
            - generic [ref=e387]:
              - generic [ref=e389]: 🧱
              - generic [ref=e390]:
                - generic [ref=e392]: Foundations
                - heading "Data Display" [level=3] [ref=e393]
                - paragraph [ref=e394]: Chips, charts, sparklines, skeletons, and empty states.
          - link "🧱 Foundations Forms & Inputs Code editor, tag editor, user picker, and icon picker." [ref=e395] [cursor=pointer]:
            - /url: /components/forms
            - generic [ref=e396]:
              - generic [ref=e398]: 🧱
              - generic [ref=e399]:
                - generic [ref=e401]: Foundations
                - heading "Forms & Inputs" [level=3] [ref=e402]
                - paragraph [ref=e403]: Code editor, tag editor, user picker, and icon picker.
          - link "🧱 Foundations Layout Panel primitives and layout composition patterns." [ref=e404] [cursor=pointer]:
            - /url: /components/layout
            - generic [ref=e405]:
              - generic [ref=e407]: 🧱
              - generic [ref=e408]:
                - generic [ref=e410]: Foundations
                - heading "Layout" [level=3] [ref=e411]
                - paragraph [ref=e412]: Panel primitives and layout composition patterns.
          - link "🧱 Foundations Primitives StatCard, FilterChip, Spinner, Avatar, ProgressBar, and more" [ref=e413] [cursor=pointer]:
            - /url: /components/primitives
            - generic [ref=e414]:
              - generic [ref=e416]: 🧱
              - generic [ref=e417]:
                - generic [ref=e419]: Foundations
                - heading "Primitives" [level=3] [ref=e420]
                - paragraph [ref=e421]: StatCard, FilterChip, Spinner, Avatar, ProgressBar, and more
          - link "🧱 Foundations Chat & Thread MessageBubble, ChatComposer, ToolCallStrip, ThinkingDots and more" [ref=e422] [cursor=pointer]:
            - /url: /components/chat
            - generic [ref=e423]:
              - generic [ref=e425]: 🧱
              - generic [ref=e426]:
                - generic [ref=e428]: Foundations
                - heading "Chat & Thread" [level=3] [ref=e429]
                - paragraph [ref=e430]: MessageBubble, ChatComposer, ToolCallStrip, ThinkingDots and more
          - link "🧱 Foundations Patterns Drawer, CollapsibleSection, PageHeader, CardHeader" [ref=e431] [cursor=pointer]:
            - /url: /components/patterns
            - generic [ref=e432]:
              - generic [ref=e434]: 🧱
              - generic [ref=e435]:
                - generic [ref=e437]: Foundations
                - heading "Patterns" [level=3] [ref=e438]
                - paragraph [ref=e439]: Drawer, CollapsibleSection, PageHeader, CardHeader
          - link "🧱 Foundations Shell Composites ChannelHeader, PresenceAvatars, NotificationCenter, UserMenu, Breadcrumbs, PageHeader" [ref=e440] [cursor=pointer]:
            - /url: /components/shell
            - generic [ref=e441]:
              - generic [ref=e443]: 🧱
              - generic [ref=e444]:
                - generic [ref=e446]: Foundations
                - heading "Shell Composites" [level=3] [ref=e447]
                - paragraph [ref=e448]: ChannelHeader, PresenceAvatars, NotificationCenter, UserMenu, Breadcrumbs, PageHeader
    - complementary [ref=e449]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Demo Catalog', () => {
  4  |   test('page loads with title "Component Demos"', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await expect(page.getByRole('heading', { name: 'Component Demos' })).toBeVisible();
  7  |   });
  8  | 
  9  |   test('demo cards are rendered', async ({ page }) => {
  10 |     await page.goto('/');
  11 |     const cards = page.locator('a[href^="/pages/"], a[href^="/components/"]');
  12 |     await expect(cards.first()).toBeVisible();
  13 |     const count = await cards.count();
  14 |     expect(count).toBeGreaterThanOrEqual(6);
  15 |   });
  16 | 
  17 |   test('category filter chips are shown', async ({ page }) => {
  18 |     await page.goto('/');
  19 |     await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
  20 |     await expect(page.getByRole('button', { name: 'Pages', exact: true })).toBeVisible();
  21 |     await expect(page.getByRole('button', { name: 'Components', exact: true })).toBeVisible();
  22 |   });
  23 | 
  24 |   test('clicking a category filters the grid', async ({ page }) => {
  25 |     await page.goto('/');
  26 |     const cards = page.locator('a[href^="/pages/"], a[href^="/components/"]');
  27 |     const allCount = await cards.count();
  28 |     await page.getByRole('button', { name: 'Pages', exact: true }).click();
  29 |     const filteredCount = await cards.count();
  30 |     expect(filteredCount).toBeLessThan(allCount);
  31 |     // Click All to restore
  32 |     await page.getByRole('button', { name: 'All' }).click();
  33 |     await expect(cards).toHaveCount(allCount);
  34 |   });
  35 | 
  36 |   test('clicking a demo card navigates to the demo page', async ({ page }) => {
  37 |     await page.goto('/');
> 38 |     await page.locator('a[href="/pages/pipeline-editor"]').click();
     |                                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  39 |     await expect(page).toHaveURL(/\/pages\/pipeline-editor/);
  40 |   });
  41 | });
  42 | 
```