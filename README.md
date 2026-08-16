# @connorhoehnslalom/ui-components

React component library for real-time collaborative applications. Published
to GitHub Packages as `@connorhoehnslalom/ui-components` (current `2.19.0`).
Consumed by `event-catalog`, `websocket-gateway`, and `vnl-ads`.

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
import { TipTapEditor, StandaloneTiptap } from '@connorhoehnslalom/ui-components/doc-editor';
import { PipelineEditor } from '@connorhoehnslalom/ui-components/pipelines';
import { StreamingChatPanel, AgentFlowCanvas } from '@connorhoehnslalom/ui-components/agents';
import { ObservabilityDashboard } from '@connorhoehnslalom/ui-components/observability';
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
| `/doc-editor` | TipTap collaborative rich-text editor + self-bootstrapping `StandaloneTiptap`, document modes (Ack/Review/Reader), comments, mentions, video panel | **In-flux** (graduation: hub #1066) |
| `/pipelines` | Pipeline editor, canvas, runs, approvals, LLM nodes, DLQ | **In-flux** (graduation: hub #1062) |
| `/agents` | AG-UI v0.1.x streaming chat, reasoning blocks, A2A flow canvas | **In-flux** (graduation: hub #1069) |
| `/observability` | Dashboard, events, metrics, node pages | **In-flux** |
| `/ingest` | Data-ingest UI primitives | **In-flux** |

## Local development

```bash
npm install
npm test            # vitest run (190+ files, 2000+ tests)
npm run lint        # tsc --noEmit
npm run build       # vite build (lib mode, multi-entry) + fix-subpath-dts
npm run demo        # demo site at http://localhost:5174
npm run storybook   # Storybook 10 at http://localhost:6006
npm run test:e2e    # playwright (tests/e2e/)
```

### Storybook

37 stories across `shared/`, `layout/`, `social/`, `video/`, `doc-editor/`,
and `integrations/`. Each variant renders in isolation with knob-driven
args.

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
