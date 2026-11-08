# @connorhoehn/ui-components

A React component library and set of page templates used by Connor Hoehn's
realtime apps. It is built on Tailwind v4 design tokens and ships composites for
chat, presence, calls, documents, work items, pipelines, search and graphs, plus
adapters that wire those composites to the hooks in `@connorhoehn/realtime-modules`.

## What's in the repo

- `src/components/` - the components, one folder per domain (`shared`, `social`,
  `video`, `doc-editor`, `pipelines`, `graph`, `search`, `work`, ...). Many
  folders have their own README.
- `src/integrations/` - adapters and wrapped components for `@connorhoehn/realtime-modules`.
- `src/styles.css` - the Tailwind v4 `@theme` tokens every component uses.
- `demo/` - the demo site, with a mock mode that needs no gateway.
- `tests/` - Playwright end-to-end and Storybook tests. Unit tests sit beside the code.
- `docs/` - adoption and integration guides. `patterns/` - recipes for common setups.
- `skills/ui-dom-audit/` - a DOM audit tool shipped with the package.
- `dist/` - the built output, committed so a git install works without a toolchain.

## Start here (for humans and agents)

These files ship in the package, so they are readable from
`node_modules/@connorhoehn/ui-components/` in any consumer repo:

- [`docs/COMPONENT_INDEX.md`](docs/COMPONENT_INDEX.md): every exported
  component grouped by job, with its import path and Storybook id, under a
  "canonical choices" table (one component per common job, and what not to
  use it for). Generated from the source, so it is never stale.
- [`docs/consumer-adoption.md`](docs/consumer-adoption.md): start from the
  page archetype (`CollectionPage`, `MasterDetailPage`, `DetailPage`,
  `DashboardPage`, `SettingsPage`, all inside `PageFrame` and one
  `AppShell`), then a decision tree for the pieces inside the page.
- [`skills/ui-page-build/SKILL.md`](skills/ui-page-build/SKILL.md): the agent
  skill for building a page from the templates;
  [`skills/ui-dom-audit/SKILL.md`](skills/ui-dom-audit/SKILL.md) audits the
  rendered result.
- [`llms.txt`](llms.txt): the same map in the llms.txt format.

Layout components (`AppShell`, `CollapsibleSidebar`, `DocsShell`,
`SettingsLayout`) import from `/shared` since 2.506.0; only `AppLayout` is
root-only. There is no `/layout` subpath.

## Install

```bash
npm install ./connorhoehn-ui-components-<version>.tgz
```

`@connorhoehn/realtime-modules` is a peer dependency, required only by the
`integrations/*` entry points. Most other peers (Tiptap, Yjs, `@xyflow/react`,
`recharts`, `hls.js`, ...) are optional and only needed for the entry points that
use them. Import the stylesheet once in your app:

```tsx
// Prefer subpaths: a root import pulls every optional peer into your bundle
import {
  Button,
  AppShell,
  ChannelHeader,
  PresenceAvatars,
  PageHeader,
} from '@connorhoehn/ui-components/shared';
import { ChatPanel } from '@connorhoehn/ui-components/social';
import { HangoutLayout, CallWidget } from '@connorhoehn/ui-components/video';

// Sub-paths for in-flux or specialised surfaces
import { TiptapEditor, StandaloneTiptap } from '@connorhoehn/ui-components/doc-editor';
import { PipelineEditorPage } from '@connorhoehn/ui-components/pipelines';
import { StreamingChatPanel, AgentFlowCanvas } from '@connorhoehn/ui-components/agents';
import { DashboardPage } from '@connorhoehn/ui-components/observability';
import { WrappedChatPanel } from '@connorhoehn/ui-components/integrations/realtime-modules';
import '@connorhoehn/ui-components/styles.css';
```

Every exported component and the subpath it is on is listed in
[`docs/COMPONENT_INDEX.md`](docs/COMPONENT_INDEX.md); the table below is the
per-subpath overview.

New to the library? Start with [`docs/consumer-adoption.md`](docs/consumer-adoption.md) —
the page archetypes, decision tree, and three before/after refactors that map
common hand-rolled patterns onto the canonical ui-components composites.

## Surfaces

| Sub-path | What's there | Stability |
|---|---|---|
| `/` (root) | Shared primitives, hooks, contexts, types, layout (also on `/shared` since 2.506.0, except root-only AppLayout; there is no `/layout` subpath), social, video, identity, theme, renderers | **Stable** |
| `/shared` | Core primitives — Button, Card, Modal, Toast, Table, TagEditor, CodeEditor, CodeBlock, EmptyState, PageHeader, ChannelHeader, NotificationCenter, FileUploadDrop, Breadcrumbs, NavRail/NavRailStack, Toolbar, WorkArea, PresenceAvatars, ConnectionPill, LogStream, ThumbnailCard, StackDiagram, StatCard, KPIGrid, DataTable, Tabs, TypingIndicator, ErrorState/LoadingState, etc. | **Stable** |
| `/social` | ChatPanel, ChatRoom, RoomList, PostFeed, ReactionsBar, ReactionPickerPopover, MessageRow, MessageGroup, GroupPanel, PresencePanel, ActivityPanel | **Stable** |
| `/video` | VideoPlayer, VideoGrid, CallWidget, CallControls, CallParticipantStrip, CallStatsOverlay, CallSidePanel, HangoutLayout, HangoutGrid, HangoutSpotlight, RosterPanel, StreamVideo, AutoplayGate, RecordingPlayer, RecordingList, RecordingRow, TranscriptOverlay, MediaEffectsTray, MediaEffectsPreviewPanel | **Stable** |
| `/identity` | Auth flows (Login, Logout, MFA, Consent), admin identity panels, `IdentityContext` | **Stable** |
| `/hooks` | `useWebSocket`, `useComments`, `useLikes`, `usePosts`, `useSocialProfile`, etc. | **Stable** |
| `/styles.css` | Tailwind v4 `@theme` tokens + keyframes | **Stable** |
| `/integrations/realtime-modules` | Adapters that wire ui-components composites to `@connorhoehn/realtime-modules` hooks, bound to the library **by that name** (canonical installs) (`WrappedChatPanel`, `WrappedPresencePanel`, `WrappedReactionsOverlay`, `WrappedFileUploadDrop`, `WrappedHangoutLayout`, `WrappedHangoutRoomsList`, `ReconnectingShim`, `NetworkErrorBoundary`) | **Stable** |
| `/integrations/realtime` | The same integrations, **scope-agnostic**: no runtime import of realtime-modules. Pure adapters and props-driven wrappers as-is; hook-bound ones (`HangoutRoomRow`/`HangoutRoomsSection`/`WrappedHangoutRoomsList`, `RealtimeCapabilityProvider`, `conversationFeaturesFor`, `WrappedStreamStage`, `WrappedLVSHangoutLayout`) via `createRealtimeIntegrations(modules)` or `<RealtimeIntegrationsProvider modules>` | **Stable** |
| `/doc-editor` | Tiptap collaborative rich-text editor + self-bootstrapping `StandaloneTiptap`, document modes (Ack/Review/Reader), comments, mentions, video panel | **Stable — API frozen** 2026-06-10 (hub #1066) |
| `/pipelines` | Pipeline editor, canvas, runs, approvals, LLM nodes, DLQ | **Stable — API frozen** 2026-06-10 (hub #1062) |
| `/agents` | AG-UI v0.1.x streaming chat, reasoning blocks, A2A flow canvas | **Stable API** (AG-UI v0.1.x types frozen 2026-06-06) |
| `/compute` | Computer Lab — a tmux-style tiling workspace over AgentCore microVM sessions: pane-kind registry, `ShellTerminal` (xterm.js, optional peer dep), fleet/tail/task hooks, `ComputeClient` transport seam, project cost centres | **In-flux** — transport seam settled, pane-kind registry open by design |
| `/observability` | Dashboard, events, metrics, node pages | **In-flux** — graduation-prepped v2.72.0; freezes when a real consumer and the distributed-core `ClusterDashboard` type exist |
| `/ingest` | Data-ingest UI primitives | **In-flux** |

### Realtime integrations under another install scope

`/integrations/realtime-modules` imports `@connorhoehn/realtime-modules/...` by
name, so an app that installed the library under a different scope (e.g.
`@connorhoehn/realtime-modules`) cannot load it. Use
`/integrations/realtime` and hand it the functions from your install:

```ts
import * as client from '@connorhoehn/realtime-modules/client';
import * as video from '@connorhoehn/realtime-modules/client/video';
import * as hangoutRooms from '@connorhoehn/realtime-modules/client/hangout-rooms';
import * as call from '@connorhoehn/realtime-modules/call';
import {
  createRealtimeIntegrations,
  WrappedChatPanel, // pure: props-driven, no injection needed
  adaptPresenceRoster,
} from '@connorhoehn/ui-components/integrations/realtime';

// Once, at module scope — each call mints new component identities.
export const rt = createRealtimeIntegrations({ ...client, ...video, ...hangoutRooms, ...call });
// rt.WrappedStreamStage, rt.WrappedLVSHangoutLayout, rt.WrappedHangoutRoomsList,
// rt.RealtimeCapabilityProvider, rt.conversationFeaturesFor, …
```

Or inject once for a tree with `<RealtimeIntegrationsProvider modules={…}>` and
read the bound set with `useRealtimeIntegrations()`. The bag
(`RealtimeClientModules`) is exactly `useCapabilities`, `useRoomOccupancy`,
`useLVSHangout`, `useLVSSubscriber`, `useLVSLiveHls`, `useLVSViewerCount` and
`lobbyForChannel`; props and test ids match the canonical entry's exports.

## Local development

```bash
npm install
npm run dev               # vite build --watch
npm run build             # library build for every entry point
npm test                  # vitest
npm run lint              # type-check src and demo
npm run demo              # demo site on http://localhost:5174
npm run storybook         # Storybook on http://localhost:6006
npm run test:e2e          # Playwright end-to-end tests
npm run test:e2e:storybook
npm pack                  # tarball for a consumer to install
```

Repo guards, each enforcing a rule the type checker cannot:

```bash
npm run lint:static-styles   # no new static inline styles
npm run lint:hex-colors      # no arbitrary hex colours; use tones and tokens
npm run lint:node-controls   # form controls come from the forms components
npm run lint:readme          # README imports must exist
npm run snapshot:exports     # refresh the public export snapshot
```

Conventions: style with Tailwind classes composed through `cn()` and the tokens in
`src/styles.css`, not inline `style`; give every exported component a test and a story.

## Entry points

This repo runs under an autonomous operating model. The
[`docs/AUTONOMY_CHARTER.md`](https://github.com/connorhoehn/ui-components/blob/main/docs/AUTONOMY_CHARTER.md) governs what an
agent may change without operator approval, the version-bump rules, and
the no-touch list of cross-repo contracts. The constitution at
[`.agent/CONSTITUTION.md`](https://github.com/connorhoehn/ui-components/blob/main/.agent/CONSTITUTION.md) sets the
self-driven backlog and per-task LOC cap.

See [`ROADMAP.md`](https://github.com/connorhoehn/ui-components/blob/main/ROADMAP.md) for the current 5-wave plan.

There is no `/layout` subpath; layout components come from `/shared` (`AppLayout` from the root).

## Related repositories

- `connorhoehn/realtime-modules` - the peer dependency: gateway server, client hooks, video.
- `connorhoehn/aws-agentcore` - consumes the library in its portal.
- `connorhoehn/realtime-examples` - example apps that consume it.
- `connorhoehn/live-video-streaming` - another consumer.
- `connorhoehn/event-catalog` - another consumer.

## Documentation

- [`docs/consumer-adoption.md`](docs/consumer-adoption.md) - which composite to reach for, with before/after examples.
- [`docs/integrations-realtime-modules.md`](docs/integrations-realtime-modules.md) - the realtime-modules adapter layer.
- [`docs/integrations/document-workspace.md`](docs/integrations/document-workspace.md) - the shared document workspace.
- [`docs/chat-draft-continuity.md`](docs/chat-draft-continuity.md) - controlled drafts and privacy for the rich composer.
- [`docs/bundle-side-effects.md`](docs/bundle-side-effects.md) - why `sideEffects` is not declared.
- [`patterns/`](patterns/README.md) - theming, websocket provider, auth, custom renderers, embedding, simulations.
- [`CHANGELOG.md`](CHANGELOG.md) - release history.
- Component READMEs live next to the code, for example [`src/components/shared`](src/components/shared/README.md).
