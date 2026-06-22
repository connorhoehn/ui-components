# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pipeline-demo.spec.ts >> Pipeline Editor Demo >> simulation starts and events appear in runs tab
- Location: tests/e2e/pipeline-demo.spec.ts:19:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Runs' })

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
      - generic [ref=e212]:
        - generic [ref=e213]:
          - generic [ref=e215]:
            - button "Back" [ref=e216]: ←
            - generic [ref=e217]: 🛡
            - generic [ref=e219]:
              - generic [ref=e220]:
                - heading "Content Moderation" [level=1] [ref=e221]
                - generic [ref=e222]:
                  - status [ref=e223]: Saved
                  - status [ref=e226]: v3 · Published
                  - status [ref=e229]: 10 warnings
              - generic [ref=e233]:
                - button "Metrics" [ref=e234] [cursor=pointer]
                - button "Export" [ref=e235] [cursor=pointer]
                - button "Published" [ref=e236] [cursor=pointer]
                - button "▶ Run" [ref=e237] [cursor=pointer]
                - button "⋯" [ref=e238] [cursor=pointer]
          - main [ref=e240]:
            - generic [ref=e241]:
              - complementary [ref=e242]:
                - searchbox "Search nodes…" [ref=e244]
                - generic [ref=e245]:
                  - generic [ref=e246]:
                    - generic [ref=e247]: SOURCES
                    - generic [ref=e248]:
                      - generic [ref=e249]: ⚡
                      - generic [ref=e250]: Trigger
                      - generic [ref=e251]: "1"
                  - generic [ref=e252]:
                    - generic [ref=e253]: LANGUAGE
                    - generic [ref=e254]:
                      - generic [ref=e255]: 🤖
                      - generic [ref=e256]: LLM
                      - generic [ref=e257]: "2"
                  - generic [ref=e258]:
                    - generic [ref=e259]: DATA
                    - generic [ref=e260]:
                      - generic [ref=e261]: ⟳
                      - generic [ref=e262]: Transform
                      - generic [ref=e263]: "3"
                    - generic [ref=e264]:
                      - generic [ref=e265]: ◇
                      - generic [ref=e266]: Condition
                      - generic [ref=e267]: "4"
                  - generic [ref=e268]:
                    - generic [ref=e269]: FLOW
                    - generic [ref=e270]:
                      - generic [ref=e271]: ⑃
                      - generic [ref=e272]: Fork
                      - generic [ref=e273]: "5"
                    - generic [ref=e274]:
                      - generic [ref=e275]: ⑂
                      - generic [ref=e276]: Join
                      - generic [ref=e277]: "6"
                  - generic [ref=e278]:
                    - generic [ref=e279]: OUTPUTS
                    - generic [ref=e280]:
                      - generic [ref=e281]: ●
                      - generic [ref=e282]: Action
                      - generic [ref=e283]: "7"
                  - generic [ref=e284]:
                    - generic [ref=e285]: HUMAN
                    - generic [ref=e286]:
                      - generic [ref=e287]: ✓
                      - generic [ref=e288]: Approval
                      - generic [ref=e289]: "8"
                - generic [ref=e290]: Press 1–8 to insert at center
              - generic [ref=e291]:
                - img:
                  - generic:
                    - generic: "true"
                  - generic:
                    - generic: "false"
                  - generic:
                    - generic: "true"
                  - generic:
                    - generic: "false"
                - generic [ref=e293] [cursor=pointer]:
                  - generic [ref=e294]:
                    - generic [ref=e295]:
                      - generic [ref=e296]: ⚡
                      - generic [ref=e297]: On doc.comment
                    - status [ref=e298]: Completed
                  - generic [ref=e301]: Any document
                - generic [ref=e303] [cursor=pointer]:
                  - generic [ref=e304]:
                    - generic [ref=e305]:
                      - generic [ref=e306]: 🤖
                      - generic [ref=e307]: claude-sonnet-4-6
                    - status [ref=e308]: Completed
                  - generic [ref=e311]: "{{context.commentBody}}"
                - generic [ref=e313] [cursor=pointer]:
                  - generic [ref=e314]:
                    - generic [ref=e315]:
                      - generic [ref=e316]: ◇
                      - generic [ref=e317]: Safe?
                    - status [ref=e318]: Idle
                  - generic [ref=e321]: context.steps_7193e7a2...
                - generic [ref=e323] [cursor=pointer]:
                  - generic [ref=e324]:
                    - generic [ref=e325]:
                      - generic [ref=e326]: ●
                      - generic [ref=e327]: post-comment
                    - status [ref=e328]: Running
                  - generic [ref=e332]: Comment on (current doc)
                - generic [ref=e334] [cursor=pointer]:
                  - generic [ref=e335]:
                    - generic [ref=e336]:
                      - generic [ref=e337]: ●
                      - generic [ref=e338]: notify
                    - status [ref=e339]: Idle
                  - generic [ref=e342]: Notify moderation
                - generic [ref=e344] [cursor=pointer]:
                  - generic [ref=e345]:
                    - generic [ref=e346]:
                      - generic [ref=e347]: ✓
                      - generic [ref=e348]: 1 approver, 1/1 required
                    - status [ref=e349]: Idle
                  - generic [ref=e352]: "@moderator"
                - generic [ref=e354] [cursor=pointer]:
                  - generic [ref=e355]:
                    - generic [ref=e356]:
                      - generic [ref=e357]: ◇
                      - generic [ref=e358]: Approved?
                    - status [ref=e359]: Idle
                  - generic [ref=e362]: received...#f81342c...
                - generic [ref=e364] [cursor=pointer]:
                  - generic [ref=e365]:
                    - generic [ref=e366]:
                      - generic [ref=e367]: ●
                      - generic [ref=e368]: post-comment
                    - status [ref=e369]: Idle
                  - generic [ref=e372]: Comment on (current doc)
                - generic [ref=e374] [cursor=pointer]:
                  - generic [ref=e375]:
                    - generic [ref=e376]:
                      - generic [ref=e377]: ●
                      - generic [ref=e378]: update-document
                    - status [ref=e379]: Idle
                  - generic [ref=e382]: Update (current)
                - img [ref=e384]
                - generic [ref=e394]:
                  - button "+" [ref=e395]
                  - button "−" [ref=e396]
                  - button "⛶" [ref=e397]
                  - button "🔒" [ref=e398]
              - complementary [ref=e399]:
                - tablist [ref=e401]:
                  - tab "Config" [selected] [ref=e402] [cursor=pointer]:
                    - generic [ref=e403]: Config
                  - tab "Runs" [ref=e404] [cursor=pointer]:
                    - generic [ref=e405]: Runs
                - generic [ref=e407]:
                  - paragraph [ref=e408]: Select a node on the canvas to configure it.
                  - generic [ref=e409]:
                    - generic [ref=e410]: Node type
                    - combobox [ref=e411] [cursor=pointer]:
                      - option "Trigger"
                      - option "LLM" [selected]
                      - option "Transform"
                      - option "Condition"
                      - option "Action"
                      - option "Approval"
                  - generic [ref=e412]:
                    - generic [ref=e413]: Label
                    - textbox "Node label…" [ref=e414]
                  - generic [ref=e415]:
                    - generic [ref=e416]: System prompt
                    - textbox "You are a content moderation assistant…" [ref=e417]
        - generic [ref=e418]:
          - generic [ref=e419]:
            - generic [ref=e420]: Simulation
            - generic [ref=e421]: Playing
          - generic [ref=e422]:
            - button "▮▮" [ref=e423] [cursor=pointer]
            - button "↺" [ref=e424] [cursor=pointer]
            - button "▶|" [ref=e425] [cursor=pointer]
            - generic [ref=e426]: 9/11
          - generic [ref=e427]:
            - generic [ref=e428]: "Speed:"
            - button "0.5x" [ref=e429] [cursor=pointer]
            - button "1x" [ref=e430] [cursor=pointer]
            - button "2x" [ref=e431] [cursor=pointer]
            - button "4x" [ref=e432] [cursor=pointer]
          - generic [ref=e433]: Action node started
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Pipeline Editor Demo', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/pages/pipeline-editor');
  6  |   });
  7  | 
  8  |   test('page renders with pipeline heading', async ({ page }) => {
  9  |     await expect(page.getByText('Content Moderation')).toBeVisible();
  10 |   });
  11 | 
  12 |   test('node palette shows node types', async ({ page }) => {
  13 |     await expect(page.getByText('Trigger')).toBeVisible();
  14 |     await expect(page.getByText('LLM')).toBeVisible();
  15 |     await expect(page.getByText('Condition').first()).toBeVisible();
  16 |     await expect(page.getByText('Action', { exact: true }).first()).toBeVisible();
  17 |   });
  18 | 
  19 |   test('simulation starts and events appear in runs tab', async ({ page }) => {
  20 |     // Switch to Runs tab to see event log
> 21 |     await page.getByRole('button', { name: 'Runs' }).click();
     |                                                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  22 |     await expect(page.getByText('step.started').first()).toBeVisible({ timeout: 10000 });
  23 |   });
  24 | 
  25 |   test('step events accumulate in runs tab', async ({ page }) => {
  26 |     await page.getByRole('button', { name: 'Runs' }).click();
  27 |     await expect(page.getByText('step.started').first()).toBeVisible({ timeout: 10000 });
  28 |   });
  29 | 
  30 |   test('step completion events appear in runs tab', async ({ page }) => {
  31 |     await page.getByRole('button', { name: 'Runs' }).click();
  32 |     await expect(page.getByText('step.completed').first()).toBeVisible({ timeout: 15000 });
  33 |   });
  34 | });
  35 | 
```