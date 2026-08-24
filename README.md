# @connorhoehnslalom/ui-components

React component library for real-time collaborative applications.

> **Not published yet.** Both `@connorhoehnslalom/*` and the
> `@connorhoehn/realtime-modules` peer dep still 404 on the registry, so every
> consumer is on a `file:`/git-SHA pin. Publishing is tracked as hub **#1493**
> and needs all four repos moved together. The install snippet below is what
> will work once that lands.

Consumed by `event-catalog`, `realtime-examples` (formerly
`websocket-gateway`), and `vnl-ads`.

## Install

```bash
npm install @connorhoehnslalom/ui-components
```

This is a multi-entry-point library — pick the surface you need. The root
import is fine for most consumers; sub-paths exist for code-splitting and
for surfaces that have not yet graduated to stable.

```tsx
// Root — shared primitives, layout, hooks, social, video, identity, types
import {
  Button,
  AppShell,
  ChannelHeader,
  ChatPanel,
  HangoutLayout,
  CallWidget,
  PresenceAvatars,
  PageHeader,
} from '@connorhoehnslalom/ui-components';

// Sub-paths for in-flux or specialised surfaces
import { TiptapEditor, StandaloneTiptap } from '@connorhoehnslalom/ui-components/doc-editor';
import { PipelineEditorPage } from '@connorhoehnslalom/ui-components/pipelines';
import { StreamingChatPanel, AgentFlowCanvas } from '@connorhoehnslalom/ui-components/agents';
import { DashboardPage } from '@connorhoehnslalom/ui-components/observability';
import { WrappedChatPanel } from '@connorhoehnslalom/ui-components/integrations/realtime-modules';
import '@connorhoehnslalom/ui-components/styles.css';
```

See `CLAUDE.md` for the full exports/stability map.

New to the library? Start with [`docs/consumer-adoption.md`](docs/consumer-adoption.md) —
the composite index, decision tree, and three before/after refactors that map
common hand-rolled patterns onto the canonical ui-components composites.

## Surfaces

| Sub-path | What's there | Stability |
|---|---|---|
| `/` (root) | Shared primitives, hooks, contexts, types, layout, social, video, identity, theme, renderers | **Stable** |
| `/shared` | Core primitives — Button, Card, Modal, Toast, Table, TagEditor, CodeEditor, CodeBlock, EmptyState, PageHeader, ChannelHeader, NotificationCenter, FileUploadDrop, Breadcrumbs, PresenceAvatars, ConnectionPill, LogStream, ThumbnailCard, StackDiagram, StatCard, KPIGrid, DataTable, Tabs, TypingIndicator, ErrorState/LoadingState, etc. | **Stable** |
| `/layout` | AppShell, AppLayout, CollapsibleSidebar, DocsShell + DocsSidebar + DocsTopNav, SettingsLayout | **Stable** |
| `/social` | ChatPanel, ChatRoom, RoomList, PostFeed, ReactionsBar, ReactionPickerPopover, MessageRow, MessageGroup, GroupPanel, PresencePanel, ActivityPanel | **Stable** |
| `/video` | VideoPlayer, VideoGrid, CallWidget, CallControls, CallParticipantStrip, CallStatsOverlay, HangoutLayout, HangoutGrid, HangoutSpotlight, RosterPanel, StreamVideo, AutoplayGate, RecordingPlayer, RecordingList, RecordingRow, TranscriptOverlay | **Stable** |
| `/identity` | Auth flows (Login, Logout, MFA, Consent), admin identity panels, `IdentityContext` | **Stable** |
| `/hooks` | `useWebSocket`, `useComments`, `useLikes`, `usePosts`, `useSocialProfile`, etc. | **Stable** |
| `/styles.css` | Tailwind v4 `@theme` tokens + keyframes | **Stable** |
| `/integrations/realtime-modules` | Adapters that wire ui-components composites to `@connorhoehn/realtime-modules` hooks (`WrappedChatPanel`, `WrappedPresencePanel`, `WrappedReactionsOverlay`, `WrappedFileUploadDrop`, `WrappedHangoutLayout`, `WrappedHangoutRoomsList`, `ReconnectingShim`, `NetworkErrorBoundary`) | **Stable** |
| `/doc-editor` | Tiptap collaborative rich-text editor + self-bootstrapping `StandaloneTiptap`, document modes (Ack/Review/Reader), comments, mentions, video panel | **Stable — API frozen** 2026-06-10 (hub #1066) |
| `/pipelines` | Pipeline editor, canvas, runs, approvals, LLM nodes, DLQ | **Stable — API frozen** 2026-06-10 (hub #1062) |
| `/agents` | AG-UI v0.1.x streaming chat, reasoning blocks, A2A flow canvas | **Stable API** (AG-UI v0.1.x types frozen 2026-06-06) |
| `/observability` | Dashboard, events, metrics, node pages | **In-flux** — graduation-prepped v2.72.0; freezes when a real consumer and the distributed-core `ClusterDashboard` type exist |
| `/ingest` | Data-ingest UI primitives | **In-flux** |

## Local development

```bash
npm install
npm test            # vitest run (currently ~400 files / ~4,000 tests)
npm run lint        # tsc --noEmit over BOTH src and demo/
npm run build       # vite build (lib mode, multi-entry) + fix-subpath-dts
npm run demo        # demo site at http://localhost:5174
npm run storybook   # Storybook 10 at http://localhost:6006
npm run test:e2e    # playwright (17 specs — routes smoke, visual, journeys)

# Guards, each enforcing a rule the type system cannot:
npm run lint:hex-colors    # no arbitrary hex colour utilities (zero tolerance)
npm run lint:static-styles # no new static inline styles
npm run lint:node-controls # no hand-rolled form controls
```

### Storybook

~199 story files. Every component under `shared/` and `forms/` has one, as do
`identity/`, `ingest/`, `observability/`, `video/`, `layout/`, `social/`,
`doc-editor/` and `integrations/`. Each variant renders in isolation with
arg-driven controls; components needing context are driven from mocked
provider values rather than a live runtime.

### Demo site

The demo site at `http://localhost:5174` hosts a catalog of in-context
flows. Highlights:

| Route | What it shows |
|---|---|
| `/workflows/hook-chat` | `<ChatPanel>` driven by `useChat(channel)` |
| `/workflows/hook-presence` | `<PresencePanel>` driven by `usePresence(channel)` |
| `/workflows/hook-reactions` | `<ReactionsBar>` + `<ReactionsOverlay>` driven by `useReactions(channel)` |
| `/workflows/hook-fileupload` | `<FileUploadDrop>` driven by `useFileUpload(channel)` |
| `/workflows/hook-videohangout` | `<HangoutLayout>` driven by `useVideoHangout(channel)` |
| `/workflows/hook-hangoutrooms` | `<HangoutRoomsList>` driven by `useHangoutRooms` |
| `/workflows/wrapped-components` | Showcase of the integrations adapter layer |
| `/workflows/document-workspace` | Doc-editor with comments, sections, reader/review modes |
| `/workflows/pipeline-editor` | Live pipeline editor + runs UI |
| `/workflows/social-panel`, `/observability-shell`, `/ingest-dashboard`, `/identity`, `/video-streaming`, `/call-widget-live`, `/agents/*` | Domain-shaped showcases |

Each hook integration runs in **mock mode** by default (no gateway
required) and switches to live mode when `VITE_GATEWAY_URL` is set:

```bash
VITE_GATEWAY_URL=ws://localhost:4000 npm run demo
```

The mock wiring uses a synthetic message bus so no real WebSocket is
needed for local development.

## Operating model

This repo runs under an autonomous operating model. The
[`docs/AUTONOMY_CHARTER.md`](docs/AUTONOMY_CHARTER.md) governs what an
agent may change without operator approval, the version-bump rules, and
the no-touch list of cross-repo contracts. The constitution at
[`.agent/CONSTITUTION.md`](.agent/CONSTITUTION.md) sets the
self-driven backlog and per-task LOC cap.

See [`ROADMAP.md`](ROADMAP.md) for the current 5-wave plan.

## Tech stack

- React 19, TypeScript 5.9 (strict)
- Vite 7 (library mode, multi-entry) + Vitest
- Tailwind v4 (`@theme` tokens, `cn()` for class composition)
- TipTap + Yjs for collaborative editing
- `@xyflow/react` for pipeline + A2A canvases
- AWS IVS for `/video-ivs`
- Storybook 10 + Playwright
