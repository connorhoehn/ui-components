# CLAUDE.md — @connorhoehnslalom/ui-components

> **October 12, 2026 handoff:** Current shared UI is 2.440.7; current tenant audit
> skill is `skills/ui-dom-audit/SKILL.md`. Read the sibling workspace handoff at
> `../aws-agentcore/docs/claude-code-handoff-2026-10-12.md` for verified commits,
> test scope and continuation steps. Old version/checkpoint prose below is
> historical. Source and audit changes are committed and pushed on main.

## agent-hub retired (2026-08-16)

This repo was previously coordinated through `agent-hub`. That system was
retired on 2026-08-16: the server is gone, the MCP registration removed, and
`~/.agent-hub` (task database, handoffs, blockers) deleted. Do not look for
hub tasks, do not attempt to register/heartbeat, and do not call
`mcp__agent-hub__*` tools — they no longer exist. `hub#<id>` references in
docs and commit history are historical breadcrumbs, not live tickets.
Current state and open work live in this repo (constitution/roadmap/CHANGELOG).

React component library for real-time collaborative applications. Published to
GitHub Packages as `@connorhoehnslalom/ui-components` (currently `2.98.0`). Consumed by
several downstream apps — see **Consumer list** below.

> **Package scope — read before touching imports.** This library is
> `@connorhoehnslalom/ui-components` (its repo is connorhoehnslalom-owned).
> Its peer dependency is `@connorhoehn/realtime-modules` — a *different*,
> connorhoehn-owned repo that was never renamed. Commit `a804d36`
> (2026-06-22) rewrote both scopes together and broke main for two months
> (lint, one test suite, and `npm run demo`); `ce60f6a` reverted the
> peer-dep half. Do not "fix" `@connorhoehn/realtime-modules` to the
> slalom scope — that package does not exist. Resolving the split
> properly is hub **#1493** and needs all four repos moved at once.
>
> Nothing is published yet: **both** scopes 404 on the registry, so every
> consumer is on a `file:`/git-SHA pin. #1493 is also the publish task.

## Operating mode (autonomous, 2026-05-30 → ~2026-06-20 — LAPSED)

> **Status 2026-08-16.** The repo went dormant after `a804d36` (2026-06-22)
> left main red; see the scope note above. Main is green again and the 23
> stranded commits from `agent/ui-components-2/wip` have been rebased in.
> The autonomous window below has expired — treat the wave roadmap as a
> backlog to pick from, not an active self-driving mandate, until the
> operator re-charters it.


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
npm test           # vitest run (520 test files, 5102 tests)
npm run lint       # tsc --noEmit on src AND demo (0 errors)
npm run build      # vite build (lib mode, multi-entry) + fix-subpath-dts
npm run demo       # vite dev server at http://localhost:5174
npm run test:e2e   # playwright (17 specs, 206 tests — incl. user-journey specs)
```

> `npm run lint` typechecks **both** projects — root `tsconfig.json`
> (`src`) and `demo/tsconfig.json`. Before v2.38.0 it ran only the root,
> and because the root `include` is `["src", "schemas"]` the demo app was
> never typechecked: the gate read 0 errors while `/workflows/hook-capability`
> rendered a blank page from a bad `Switch` import. Do not narrow this back
> to a single project.

> **Worktrees work now.** `.storybook/main.ts` and `demo/vite.config.ts`
> both aliased the `@connorhoehn/realtime-modules` peer dep at a fixed
> `node_modules` location (`process.cwd()` and `<configdir>/../node_modules`
> respectively). A git worktree has no `node_modules` of its own, so both
> resolved to a non-existent path and `build-storybook` / `npm run demo`
> died with an opaque `UNLOADABLE_DEPENDENCY`. Four separate agent runs hit
> this and each worked around it with a throwaway symlink. Both configs now
> use `scripts/resolve-realtime-modules.mjs`, which walks up from the config
> file — correct in a normal checkout and in a worktree, since worktrees
> live under `<repo>/.claude/worktrees/`. A worktree created OUTSIDE the
> repo still cannot resolve it; run `npm install` there if you need one.

> **Node floor for development: `^20.19.0 || >=22.12.0`** (vite 8's own
> requirement). The config files use `import.meta.dirname`, not `__dirname` —
> vite 8 warns that `__dirname` is unsupported by `configLoader: 'native'`,
> which is planned to become the default. This is a *toolchain* floor only;
> it is deliberately NOT declared in `engines`, because that field is
> consumer-facing and the shipped bundles have no such requirement.

> **Do not commit `dist/` from a parallel agent branch.** `dist/` is
> intentionally tracked (see `.gitignore`) so `github:` tag installs work
> without a build toolchain, but its chunks are content-hashed — two branches
> that both ran `npm run build` produce `services-<hashA>.js` and
> `services-<hashB>.js` from the same source and git reports a rename/rename
> conflict on every merge. Agents should run `npm run build` to verify, then
> leave `dist/` out of the commit; the release commit rebuilds it once from
> merged source. Resolving is harmless (`git checkout --ours dist && npm run
> build`) but it is pure noise on every single merge.

> **`npm run build` works in a worktree as of v2.90.1.** It used to be the
> one script that didn't: it invoked `./node_modules/vite/bin/vite.js` by
> relative path, and a *filesystem* path never gets Node's walk-up-the-tree
> resolution — which is why `test` and `lint` were fine in a worktree and
> `build` was not. `scripts/vite-build.mjs` now resolves `vite/package.json`
> and reads the bin from the manifest. (It cannot resolve `vite/bin/vite.js`
> directly: vite's `exports` map doesn't list the bin, so that fails with
> ERR_PACKAGE_PATH_NOT_EXPORTED even in a normal install.) Same fix shape as
> `scripts/resolve-realtime-modules.mjs` — if you add a script that reaches
> into `node_modules` by path, resolve it instead.

> **`npm run build` needs an 8GB heap** (wired into the script). The
> `file:../realtime-modules` devDependency is a symlink, so api-extractor
> resolves its `.d.ts` outside `node_modules`, treats it as local source,
> and walks the whole type graph — the 4GB default OOMs during the dts
> rollup.

> **TypeScript 7 (native) ships no JavaScript Compiler API** (v2.396.1).
> `import ts from 'typescript'` exposes only `version`. Three consequences:
> (1) vite-plugin-dts v5 loads `@typescript/typescript6` for its JS API, and
> that package's `@typescript/old` dep can re-point `node_modules/.bin/tsc`
> at TypeScript 6 — so every script runs `node scripts/tsc.mjs`, never bare
> `tsc`; (2) `vite.config.ts` unsets api-extractor's `typescriptCompilerFolder`
> because TS 7 has no `lib.*.d.ts` files (without it every rollup dies with
> "Symbol not found for identifier: Omit"); (3) v5 copies every ambient
> `declare global` / `declare module` block into every bundled entry, so an
> ambient block must never name a module-local type. Tests that need the
> compiler drive the CLI (`export-ambiguity.test.ts`), not the API.

> **Playwright browsers drift.** If every e2e test dies at
> `browserType.launch`, the pinned chromium build moved: run
> `npx playwright install chromium`.

**Every script in `package.json` passes as of v2.38.1** — including the two
that are easy to forget because nothing chains them into the main gate:
`npm run lint:static-styles` (inline-style drift guard) and
`npm run build-storybook`. Both were red for the whole dormancy. If you add
inline styles, the first one will catch you: convert static literals to
Tailwind, and only allowlist values that are genuinely runtime-derived.

> **`build` and `build:types` fight over `dist/index.d.ts`.** `npm run build`
> (vite + `bundleTypes`) writes a self-contained ~291KB rollup; `npm run
> build:types` (`tsc -p tsconfig.build.json`) overwrites it with a ~2.8KB
> `export * from './src/…'` stub plus 1600 files under `dist/src/`. The
> committed convention is the **rollup** output. Whenever you run
> `build:types` — it is only wired into `prepare` — re-run `npm run build`
> before committing, or you will ship the stub.

## Entry points / exports map

| Export path | Contents | Stability |
|---|---|---|
| `@connorhoehnslalom/ui-components` | Root: types, hooks, contexts, shared, sidebar, hangout, layout, social, video, identity, forms, styles, theme, api, renderers | **Stable** |
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
| `…/observability` | Dashboard, events, metrics, node pages | **In-flux** — graduation-prepped v2.72.0 (host-callback actions, `nodes` prop); freezes when a real consumer + the distributed-core `ClusterDashboard` type exist |

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
`import { AppShell, ChatPanel, HangoutLayout } from '@connorhoehnslalom/ui-components'`
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

tests/e2e/         Playwright (17 specs, 206 tests — routes smoke, visual baselines, tones, per-demo + user-journey specs)
```

## Hard rules (do not violate)

1. **Demo pages must NOT use `style={{}}`.** Per global CLAUDE.md, all
   `demo/src/**` must use ui-components composites + Tailwind v4 token classes.
   **NOT done — the "complete" claim was an artefact of the guard
   (corrected 2026-08-24).** `check-static-styles.mjs` grepped for the literal
   string `style={{`, so hoisting the identical object to a module-level const
   and writing `style={someStyle}` sidestepped it entirely. The whole
   `document-workspace` demo, `ThemingPage` (including a hard-coded `#1e293b`),
   `QuickStartPage`, `SimulationControls` and the videohangout demo were built
   that way and the guard stayed green throughout. A rule you can evade by
   naming a variable is not a rule. The guard now matches both forms and skips
   `__tests__` (a seam test may set a style deliberately). Runtime-derived
   files are still allowlisted in
   `scripts/check-static-styles.allowlist.txt` — string-aware, so JSX samples
   inside `code={\`...\`}` props don't count.
   When you find a violation, classify A (token swap), B (use existing
   composite), or C (ship the primitive first), same as before.

   > **The guard only grepped for the literal `style={{` until 2026-08-24**,
   > so hoisting the same object to a module-level const and writing
   > `style={rowStyle}` — or `const styles = {...}` + `style={styles.row}` —
   > walked straight past it. Eleven demo files were doing exactly that
   > while the "DONE" above was on the page. The guard now resolves those
   > references and they are converted. It still does NOT chase an object
   > literal built *inside* a component (that shape is usually genuinely
   > runtime-derived), so `demo/src/components/NodeEditorPage.tsx` still
   > hand-rolls four function-scope style objects. Treat this guard as a
   > floor, not a proof of absence.

2. **Verification gate** (every commit): `npm test && npm run lint && npm run build`
   must all pass. No `--no-verify`, no skipping hooks. Run `npm run test:e2e`
   too when touching `demo/**` or `tests/e2e/**` — the unit gate cannot see a
   route that mounts blank.

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
- `src/**`: **97 files** with `style={{}}` (measured 2026-08-20, down from
  131); the ones on the allowlist are runtime-derived by design. The
  hand-rolled *form controls* under `pipelines/nodes/` are fully gone —
  `npm run lint:node-controls` enforces zero.
- `demo/**`: **complete for static styles** (2026-08-20; was 46 files, then
  a string-aware recount showed most were JSX samples in template literals).
  8 files remain on the allowlist, all runtime-derived only.
- **Deferred:** `demo/src/demos/pipeline-editor/index.tsx` — the branch's
  wave-3 eradication of this file was dropped during that rebase because
  main had already converted it, better (uses the `<Input>` composite and a
  semantic `<aside>`; the branch used a bare `<input>`). No work owed.

See `TAILWIND_MIGRATION.md` for conversion rules and token mappings.

### Hand-rolled form controls — MIGRATION COMPLETE (2026-08-21)

ALL of `src/components` is converted (v2.61.0–v2.62.0): pipelines, identity,
typed-documents, doc-types, ingest, social, doc-editor, observability,
agents, collaboration, video, field-types. `npm run lint:node-controls` now
guards the whole tree; its BASELINE lists the 27 files / 37 raw elements
that remain, every one a documented justified exception (the forms/shared
primitives themselves, hidden inputs, OTP digit boxes, media scrubbers,
dev inspectors). The composites cover every control kind: `Input` (incl.
date/datetime-local/time), `Select` (incl. `groups`/optgroup), `Textarea`,
`NumberInput`, `RadioGroup`, `Checkbox` w/ indeterminate, `Slider`,
`ColorInput`, `ToggleField`. If a new surface needs something these can't
express, ship the primitive to `forms/` first — never add a BASELINE entry
for a convertible control.

### Test coverage (audit #5)
Test floors landed 2026-06-10 (v2.33.0, hub #1062/#1066) and were closed
out through 2026-08-21: `pipelines/` ~45 test files, `doc-editor/` 23
(incl. the full Yjs composition path), zero-test folders filled, the large
exports (`CallWidget`, `AppLayout`, `CollapsibleSidebar`) tested, and as
of v2.66.0 **every `shared/` component has a test file** (the last 26 —
Drawer, ToastProvider, SubNavLayout, InlinePopover, ActivityFeed,
ProjectCard, SearchInput, ChatComposer, and the smaller primitives —
gained 101 tests). The 2026-08-21 audit round then closed the remaining
area gaps: identity admin+auth pages (23 tests — form payload shapes,
two-step ConfirmDialog deletes, audit query/replay, OIDC interaction
screens), `TypedDocumentForm` (13 — widget mapping, coercion, showWhen,
unlimited cardinality), `FieldTypesPage` (5 — wizard + localStorage
persistence), and `src/api/` (11 — URL/param assembly, DLQ 503
tolerance, runId→id boundary mapping). New exports ship with tests.
> **Tests are not all under `__tests__/`.** Three files are CO-LOCATED
> beside their component — `src/components/layout/AppLayout.test.tsx`,
> `CollapsibleSidebar.test.tsx`, `AppShell.test.tsx` — and they are the only
> three in the repo, so any search filtered on `-path '*__tests__*'` (409
> files) misses exactly them and reports the layout components as untested.
> That is not hypothetical: on 2026-08-24 it sent two agents off to write
> tests that already existed, and produced a "correction" to this very
> section asserting a coverage gap that did not exist. Search for
> `-name '<Component>.test.tsx'` with no path filter.
>
> The real gap in those three was narrower and easy to miss behind a green
> file count: the existing cases covered rendering and click callbacks and
> nothing else, so `CollapsibleSidebar`'s collapse mechanics — the actual
> behaviour of a collapsible sidebar — had no coverage at all, and four
> a11y/keyboard bugs were living there. **A test file existing says nothing
> about which surface it covers.**

Remaining thin spots are lower-value: contexts
(thin providers), and parts of social/ingest/observability pages.

### Story coverage (audit #4, audit #5)
Integrations layer fully storied (hub #989 CLOSED): `WrappedActivityPanel`,
`WrappedReactionsOverlay`, `WrappedFileUploadDrop`, `WrappedHangoutLayout`,
`WrappedChatPanel`, `WrappedPresencePanel`, `WrappedNotificationCenter`,
`CapabilityBoundary`, and the Hangout composites all have stories driven by
mocked `RM*` hook-return shapes (no realtime-modules runtime needed).
**hub #1059 CLOSED (v2.69.0, 2026-08-21): every `shared/` component now
has a story** — the last 32 landed together (UserPicker's is driven by
mocked `PresenceProvider`/`IdentityProvider` context values, the same
no-runtime pattern as the Wrapped* integration stories). Every shared
component now has both a test file and a story file.

## Publishing

> **`optional: true` on a peer dep is partly a lie — verified 2026-08-24.**
> A packed-tarball probe in a scratch consumer found that with the optional
> peers absent, **8 of 13 subpaths fail to import** with
> `ERR_MODULE_NOT_FOUND`; with them installed, all but
> `/integrations/realtime-modules` (genuinely unpublished — that's #1493)
> import clean. The cause is barrel re-export: `shared/Chart.tsx` imports
> `recharts` at module scope and is `export *`'d from `shared/index.ts`, so
> `import { Button } from '…/shared'` needs a charting library installed.
> Bundler consumers are usually spared by tree-shaking; **Node-ESM and SSR
> consumers are not.** Moving `Chart` out of the barrel would be a breaking
> change needing a consumer handoff, so the current truth is pinned instead by
> the "entry points and their transitive optional peers" test in
> `src/__tests__/packaging.test.ts`. Shrinking a set is fine; growing one means
> a common import path now needs another install — make that deliberate.
>
> The guard tracks **static** and **dynamic** peers separately, because only
> the first kind breaks the import: a static peer is needed by every consumer
> of that subpath whether or not they touch the feature, while
> `import('amazon-ivs-web-broadcast')` only fails when a hangout actually
> starts. That laziness is deliberate and is the entire reason `/video-ivs`
> exists. A walk following only `from "…"` reports the IVS SDK as absent from
> three entry points that do reach it — don't write one.
>
> Leanest subpaths (react only, statically): `/types`, `/video`, `/identity`,
> and `/video-ivs` (its SDK is dynamic). The root barrel needs nearly
> everything, which is the point of subpaths.
>
> **`/video-ivs` has no `src/components/video-ivs/` directory** — the entry is
> `src/video-ivs.ts`, re-exporting `src/lib/video/useHangoutEmbed`. The source
> layout below doesn't show this and it has already misled one reader.

> **Verify against a packed tarball, not the repo.** In-repo everything
> resolves from `devDependencies`, which hid four consumer-breaking bugs until
> v2.40.1 — including a root import that crashed with `ERR_MODULE_NOT_FOUND`
> and a `tsc` failure on every root import. Before publishing:
>
> ```bash
> npm pack --pack-destination /tmp/c && cd /tmp/c
> # install the tgz into a scratch project with the peers, then tsc + import
> ```
>
> `npm test` now includes `src/__tests__/packaging.test.ts`, which asserts that
> everything `vite.config.ts` externalises is declared, that no shipped `.d.ts`
> imports an undeclared package, and that every export subpath ships
> `types`/`import`/`require` with the targets present. It skips itself when
> `dist/` is absent, so run `npm run build` first for it to mean anything.


Published to `https://npm.pkg.github.com`. Version is in `package.json`.
Bump per the charter: patch=bugfix/internal/tests; minor=additive public API;
major=breaking, requires consumer handoff BEFORE merge.

```bash
npm publish   # requires GITHUB_TOKEN with packages:write
```

## Design tokens (Tailwind v4)

Tokens are declared in `src/styles.css` via `@theme`. **`src/styles.css` is the
single source of truth for branding — nothing may fork it.**

Use `cn()` from `src/lib/cn.ts` to compose class names (`clsx` + `tailwind-merge`).

### The semantic tone scale (v2.39.0)

Seven tones — `neutral`, `success`, `warning`, `danger`, `info`, `caution`,
`accent` — each with four roles:

```
--color-{tone}          solid fill / icon / indicator dot
--color-{tone}-bg       soft tinted background
--color-{tone}-fg       readable text on that soft background
--color-{tone}-border   border for the soft surface
```

**Rules:**

1. **Never name a raw palette colour, anywhere.** No `bg-green-50`, no
   `text-emerald-700`, no `ring-blue-500`, no `from-indigo-50`. Go through
   `src/components/shared/tones.ts` (`TONE_SOFT`, `TONE_SOLID`,
   `TONE_SOLID_BG`, `TONE_BORDER`, `TONE_TEXT`, `TONE_BG`), or the token
   classes directly (`bg-success-bg text-success-fg ring-primary`).

   **Hex strings in JS constants** (status maps, chart palettes, SVG
   strokes) resolve through `var(--color-*)` strings as of v2.65.0 — CSS
   vars work in inline styles and SVG attributes. The exception is
   **user-distinguishing color data** (Avatar's palette, awareness/presence
   user colors, simulation fixtures, doc samples teaching a color prop):
   those are data, often string-manipulated or sent over the wire, and MUST
   stay literal hexes — never convert them, and never pass a var string
   where code appends alpha or darkens the hex. ~214 such data hexes remain
   by design; no guard can make this distinction automatically.

   **Arbitrary-value hexes (`bg-[#2563eb]`) are guarded too** — the tones
   test can't see them, so `npm run lint:hex-colors` covers them with
   **zero tolerance** (the ~950-occurrence debt was burned down completely
   in v2.63.0–v2.64.0; the baseline is empty). Two families were added for
   colours the scale couldn't express: `--color-code-*` (Catppuccin
   terminal palette for the debugger/log/code surfaces) and
   `--color-video-*` (video stage darks).

   **Enforced with zero tolerance** by
   `src/components/shared/__tests__/tones.test.ts`, which scans all of `src/`
   — including `.stories.tsx`, since stories are what people copy from — for
   every colour-taking utility prefix. It began as a baseline of 91 files;
   all were converted, so there is no allowlist. If you need a colour the
   scale doesn't express, **add a tone** (four CSS variables + a `tones.ts`
   entry), don't add a literal.

   Family → tone when converting: green/emerald→success, red/rose→danger,
   amber/yellow→warning, blue/sky→info, indigo→primary, orange→caution,
   purple/violet→accent. Shade → role: `bg-{50..300}`→`-bg`,
   `bg-{400+}`→solid, `border-{50..300}`→`-border`, `border-{400+}`→solid,
   `text-*`→`-fg`, `ring`/`fill`/`stroke`→solid.
2. **Never define a second `Record<Tone, string>` palette.** That is exactly
   how this went wrong: Chip, Badge and StackDiagram each had one, and they
   disagreed — Chip's success was green-50/green-600, Badge's was
   emerald-100/emerald-700, so the same semantic state rendered in two
   different greens depending on which component you reached for.
3. **Consumers rebrand by overriding the variables**, after importing the
   stylesheet. Four variables re-tone every surface in the library:

   ```css
   @import "@connorhoehnslalom/ui-components/styles.css";
   :root {
     --color-accent: #0d9488;
     --color-accent-bg: #f0fdfa;
     --color-accent-fg: #0f766e;
     --color-accent-border: #99f6e4;
   }
   ```

   Adding a tone follows the same four-role shape. For a colour value rather
   than a class (canvas/SVG fills, chart series), use `toneVar(tone)`.

`toneKey()` folds the deprecated `'purple'` alias onto `'accent'`.

### Consumers (and the demo) must import, not copy

`demo/src/App.css` used to carry a verbatim copy of the `@theme` block. It
drifted — 26 tokens missing, including every `--color-cat-*` and `--font-code`
— so library components using those rendered unstyled in the demo while
looking correct in Storybook. It now does `@import "../../src/styles.css"`,
which is also the documented consumer on-ramp. Do not reintroduce a copy.

Other token families beyond the tone scale: `--color-text-{primary,secondary,
tertiary,disabled}`, `--color-surface{,-inset,-panel,-hover}`,
`--color-border{,-emphasis,-field}`, `--color-state-*` (run states),
`--color-cat-*` (pipeline node categories), `--radius-*`, `--shadow-*`,
`--font-code`.

### `src/theme/` — reconciled in v2.41.0

`ThemeProvider` used to write only `--ui-*`, which no Tailwind utility reads, so
it was silently inert while `ThemingPage` documented it as the theming API. It
now writes the real `--color-*` / `--radius-*` tokens too (`THEME_TOKEN_ALIASES`
in `css-variables.ts`), keeps `--ui-*` for existing `cssVar()` callers, and
takes a `tones` prop that maps onto the four-role scale.

Two rules that keep it honest, both pinned by
`src/theme/__tests__/ThemeProvider.tokens.test.tsx`:

1. **`lightTheme` must mirror the `@theme` tokens in `src/styles.css`.** It was
   a drifted fork (6 of 10 colours disagreed). Now that the provider writes real
   tokens, any divergence means *mounting* `<ThemeProvider>` silently rebrands
   the app.
2. **The provider must remove every property it wrote on unmount**, including
   the aliases and tone overrides.

**Only one `ThemeProvider` per document.** It writes CSS custom properties to
`document.documentElement`, and `:root` holds one value per property, so one
page cannot carry two themes. Nesting used to fail in the most confusing way
available: React flushes child effects before parent effects, so the OUTER
provider's write landed last and won — meaning `useTheme()` returned the inner
tokens while every Tailwind utility rendered the outer ones, and neither looked
wrong on its own. Worse, the inner provider's cleanup removed the same property
names the outer had set, so closing a themed preview pane stripped the app's
branding to the stylesheet defaults and the outer provider had no reason to
re-render and restore them. Since v2.96.0 a nested provider does not write and
warns in dev. To theme a subtree, set the `--color-*` variables on a wrapper
element yourself.

`preset="dark"` is **partial** — it re-tones text/surface/border and the
semantic colours, but there is no dark-specific palette in the token set yet.
