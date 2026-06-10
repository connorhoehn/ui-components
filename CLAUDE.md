# CLAUDE.md — @connorhoehn/ui-components

React component library for real-time collaborative applications. Published to
GitHub Packages as `@connorhoehn/ui-components` (currently `2.33.0`). Consumed by
several downstream apps — see **Consumer list** below.

## Operating mode (autonomous, 2026-05-30 → ~2026-06-20)

A 5-agent Opus audit on 2026-05-30 produced a 5-wave roadmap that the
`ui-components` agent self-drives against. **Read these before picking work:**

- agent-hub task **#1071** — coordinating north-star (wave order, dependencies)
- agent-hub handoff **#334** — full charter + done-definition
- agent-hub task **#1028** — `chore: adopt AUTONOMY_CHARTER.md` — **claim first**;
  its commit body becomes `docs/AUTONOMY_CHARTER.md` and binds every later task

Wave order (don't pick across waves): **0** charter + reachability →
**1** ship missing primitives → **2** demo IA fixes →
**3** demo eradication + adapter migration → **4** tests/docs/stories →
**5** graduate in-flux modules to stable.

## Quick commands

```bash
npm test           # vitest run (286 test files)
npm run lint       # tsc --noEmit (0 errors)
npm run build      # vite build (lib mode, multi-entry) + fix-subpath-dts
npm run demo       # vite dev server at http://localhost:5174
npm run test:e2e   # playwright (tests/e2e/)
```

## Entry points / exports map

| Export path | Contents | Stability |
|---|---|---|
| `@connorhoehn/ui-components` | Root: types, hooks, contexts, shared, sidebar, hangout, layout, social, video, identity, forms, styles, theme, api, renderers | **Stable** |
| `…/types` | Core TypeScript types | **Stable** |
| `…/shared` | Button, Card, Modal, Toast, Table, TagEditor, CodeEditor, EmptyState, PageHeader, ChannelHeader, NotificationCenter, FileUploadDrop, Breadcrumbs, PresenceAvatars | **Stable** |
| `…/hooks` | useWebSocket, useComments, useLikes, usePosts, useSocialProfile, etc. | **Stable** |
| `…/identity` | Auth flows, admin user management, IdentityContext | **Stable** |
| `…/social` | Posts, reactions, follow graph, ChatPanel | **Stable** |
| `…/ingest` | Data-ingest UI primitives | **Stable** |
| `…/layout` | AppShell, AppLayout, CollapsibleSidebar | **Stable** — root-export only; there is NO `…/layout` subpath in the exports map. Import from the root. |
| `…/video` | VideoPlayer, VideoGrid, HangoutLayout, participant tiles, recordings, transcript | **Stable API**, minor churn |
| `…/video-ivs` | AWS IVS-specific video implementation | **Stable API** |
| `…/styles.css` | Tailwind design tokens + keyframes | **Stable** |
| `…/agents` | AG-UI v0.1.x streaming chat, reasoning blocks, A2A canvas, `AgentDirectory`, `ConversationHistory` | **Stable API** (AG-UI v0.1.x types frozen 2026-06-06; see `src/types/agents.ts` header) |
| `…/pipelines` | Pipeline editor, canvas, runs, approvals, LLM nodes, DLQ | **Stable — API frozen 2026-06-10** (hub #1062; see freeze note below) |
| `…/doc-editor` | TipTap collaborative rich-text editor, incl. self-bootstrapping `StandaloneTiptap` | **Stable — API frozen 2026-06-10** (hub #1066; internal Tailwind wave 3 may still land — no API impact) |
| `…/observability` | Dashboard, events, metrics, node pages | **In-flux** |

### API freeze: `/pipelines` + `/doc-editor` (2026-06-10, v2.33.0)

Both barrels are now **frozen public API** — breaking changes require a
major bump + consumer handoff per the charter (event-catalog imports
`…/pipelines` admin views; websocket-gateway consumes both).

**Frozen `/pipelines` surface** (everything `src/components/pipelines/index.ts`
exports):

- Pages: `PipelineEditorPage`, `PipelinesPage`, `PipelineRunsPage`,
  `PipelineRunReplayPage`, `PipelineRunComparePage`, `PipelineRunDiff`,
  `AllRunsPage`, `PipelineStatsPage`, `PendingApprovalsPage`
- Contexts/providers + hooks: `EventStreamProvider` / `useEventStream(Context)`,
  `PipelineRunsProvider` / `usePipelineRuns` / `useRetryFromStep` /
  `useLatestStepForNode`, `PipelineEditorContext` / `PipelineEditorProvider` /
  `usePipelineEditor` (+ their exported prop/value types)
- Canvas: `PipelineCanvas`, `NodePalette` (+ `PALETTE_ITEMS`, `recordRecentType`)
- All node components + `nodeTypes` map, all per-node `*Config` panels
- Vision/judge/lineage sub-surfaces (`./vision`, `./judge`, `./lineage`
  re-exports — frozen at their own `index.ts` barrels)
- Services seam: `PipelineEditorServicesProvider`, `useImageUrl`,
  `usePipelineEditorServices`

**Frozen `/doc-editor` surface** (everything `src/components/doc-editor/index.ts`
exports): `DocumentEditorPage` (+ `DocumentEditorPageProps`),
`DocumentListPage`, `StandaloneTiptap` (+ its prop types), `TiptapEditor`,
`DocumentHeader`, `EditorToolbar`, section/review/reader composites,
sidebar panels, `useDocumentActions`, `useSidebarPanels`, and the
`CommentThread` / `ReaderSectionCard` / `ReaderSummary` helpers.

**Deliberately OUTSIDE the freeze** (not exported by the barrels — internal,
may change without a major bump):

- `/pipelines`: `chaos/`, `dev/` (SimulatorPanel, dev editor bridge),
  `context-inspector/`, `replay/`, `cost/`, `cron/`, `persistence/`
  internals (`pipelineStorage*`, `runHistory`), `WebSocketEventAdapter`
  internals, validation/lint internals, and non-barrel one-off components
  (`RunsTable`, `RunDetailDrawer`, filter/bulk bars, `StepTimeline`, …)
- `/doc-editor`: `useDocumentEditorState`, `EditorModeSwitch`,
  `EditorSidebarManager` (page-internal orchestration — kept private on
  purpose so the page can be re-composed without an API break)

### Reachability gap (CLOSED 2026-06-10 — hub #1021 + #1058, v2.32.0)

Root `src/index.ts` now re-exports `layout/`, `social/`, `video/`, and
`identity/` alongside `shared/`, `sidebar/`, `hangout/`, so
`import { AppShell, ChatPanel, HangoutLayout } from '@connorhoehn/ui-components'`
works. Subpaths (`/social`, `/video`, `/identity`, …) remain intact; note
`layout/` never had its own subpath — root is its only import path.

Name collisions are resolved in `src/index.ts` (see the disambiguator block):
the pre-existing root symbol keeps its name; the newcomer is root-reachable
under an alias and unaliased via its subpath —
`CommentThread` (types) vs social's `CommentThread` → `CommentThreadPanel`;
`Participant` (types) vs video's → `VideoParticipant`;
`FormField`/`FormFieldProps` (shared) vs identity's → `IdentityFormField`/`IdentityFormFieldProps`;
`AuditPage` (api/pipelineAudit type) vs identity's component → `IdentityAuditPage`.

## Consumer list

| Repo | Imports from | Notes |
|---|---|---|
| `event-catalog` | `…/shared`, root index, `…/pipelines` admin views | Admin UI |
| `websocket-gateway` | `…/shared`, `…/identity`, `…/video`, `…/agents` | Admin UI + video call + agent chat |
| `vnl-ads` | Root index, `…/identity`, `…/social` | Social + identity flows |

**Changing a stable export** always requires a handoff to every consumer repo.
Breaking changes need a `raise_blocker` before landing.

## Source layout

```
src/
  components/
    agents/        AG-UI streaming chat, A2A flow canvas
    collaboration/ Presence, cursors, activity feeds
    doc-editor/    TipTap rich-text with Yjs collaboration
    doc-types/     Document type renderers
    field-types/   Field type primitives
    hangout/       Hangout-room composites (rooms list, room row, occupancy)
    identity/      Auth + admin identity panels
    ingest/        Data ingest UI
    layout/        AppShell, AppLayout, CollapsibleSidebar (root-unreachable)
    misc/          Utilities and one-offs
    observability/ Dashboard / metrics / event log
    pipelines/     Pipeline editor + runtime UI (largest domain, 91 files)
    shared/        Core primitives (51 components — Button…PageHeader)
    sidebar/       Sidebar atoms
    social/        Posts, reactions, follow graph, ChatPanel
    typed-documents/ Document views
    ui/            Low-level UI atoms (Button, Card, Panel…)
    video/         Video player + grid + participant tiles + recordings
  contexts/        React context providers (WebSocket, Identity…)
  hooks/           Shared hooks
  integrations/    realtime-modules adapter layer (Wrapped* components)
  lib/             cn() utility, video helpers
  styles/          CSS variables + global styles
  theme/           Theme tokens + ColorSchemeProvider
  types/           TypeScript type definitions
  renderers/       Document content renderers (rich-text, tasks, checklist…)
  api/             API client helpers

demo/
  src/
    pages/         Docs pages (Introduction, Installation, Quick Start, Theming…)
    components/    Component showcase pages (13 — Buttons, Forms, Video…)
    demos/         Live workflow demos (18 — pipeline-editor, hook-*-integration…)
    shell/         DemoLayout, DocsLayout, Sidebar, TopNav, Breadcrumbs
    catalog/       Demo catalog grid
    navigation/    nav-tree.ts (single source of truth for sidebar IA)

tests/e2e/         Playwright (6 specs; expansion tracked in hub #1046)
```

## Hard rules (do not violate)

1. **Demo pages must NOT use `style={{}}`.** Per global CLAUDE.md, all
   `demo/src/**` must use ui-components composites + Tailwind v4 token classes.
   Current violator count: **69 files** (eradication waves: #1045, #1050, #1055, #1067).
   When you find a violation, classify A (token swap), B (use existing
   composite), or C (ship the primitive first — file a hub task and stop).

2. **Verification gate** (every commit): `npm test && npm run lint && npm run build`
   must all pass. No `--no-verify`, no skipping hooks.

3. **No-touch list** (handoff required before changing): `src/index.ts`,
   every `*/index.ts` barrel under stable subpaths, `social/ChatPanel.tsx`
   public props, `integrations/realtime-modules/index.ts`, `styles.css` `@theme`
   tokens, `package.json` `exports`, `CHANGELOG.md`. Full list in
   `docs/AUTONOMY_CHARTER.md` once #1028 lands.

4. **Tests for every exported primitive.** New exports ship with tests
   (constitution principle 2). Cap per-task LOC at 200; large untested
   exports get a split-then-test task (see #1035, #1041).

## Active migrations / coverage gaps

### Inline-style eradication (Tailwind v4)
- `src/**`: 91 files remain (down from 122). Domain breakdown still
  pipelines-dominant.
- `demo/**`: 69 files (audit #2 backlog) — eradicated in waves #1045/#1050/#1055/#1067
  AFTER the Wave-1 primitives ship (#1017 CodeBlock, #1018 DocsShell, #1020 LogStream,
  #1023 AlertList, #1025 HealthGrid, #1030 KPIGrid, etc.).

See `TAILWIND_MIGRATION.md` for conversion rules and token mappings.

### Test coverage (audit #5)
Test floors landed 2026-06-10 (v2.33.0, hub #1062/#1066): `pipelines/`
now has ~45 test files (was 1/91) including the editor mounting path
(`PipelineEditorPage`), editor/event-stream contexts, `NodePalette`, and
20+ node components; `doc-editor/` has 23 (was 0) including the full
`DocumentEditorPage` Yjs composition path and `StandaloneTiptap`.
Remaining zero-test folders: `collaboration/` (8 components),
`doc-types/` (5), `misc/` (8) — tracked under hub #1051. Large untested
exports — `CallWidget` 1009 LOC, `AppLayout` 837, `CollapsibleSidebar`
454 — tracked under #1041.

### Story coverage (audit #4, audit #5)
Integrations layer fully storied (hub #989 CLOSED): `WrappedActivityPanel`,
`WrappedReactionsOverlay`, `WrappedFileUploadDrop`, `WrappedHangoutLayout`,
`WrappedChatPanel`, `WrappedPresencePanel`, `WrappedNotificationCenter`,
`CapabilityBoundary`, and the Hangout composites all have stories driven by
mocked `RM*` hook-return shapes (no realtime-modules runtime needed).
Still thin elsewhere: 51 `shared/` components, 7 stories (hub #1059).

## Publishing

Published to `https://npm.pkg.github.com`. Version is in `package.json`.
Bump per the charter: patch=bugfix/internal/tests; minor=additive public API;
major=breaking, requires consumer handoff BEFORE merge.

```bash
npm publish   # requires GITHUB_TOKEN with packages:write
```

## Design tokens (Tailwind v4)

Tokens are declared in `src/styles.css` via `@theme`. Key custom properties:

```
--color-primary, --color-border, --color-border-field
--color-surface, --color-text-primary, --color-text-secondary
--color-success, --color-success-bg
--color-state-running, --color-state-pending, --color-state-error
```

Use `cn()` from `src/lib/cn.ts` to compose class names (`clsx` + `tailwind-merge`).
