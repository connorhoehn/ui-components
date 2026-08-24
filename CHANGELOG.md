# Changelog

All notable changes to `@connorhoehnslalom/ui-components` will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

## [2.85.0] — 2026-08-24

A render-performance audit. All 12 changes are behaviour-preserving — except
one, which turned out to fix a user-visible bug.

### Fixed — a bug the perf audit found

- **`WrappedActivityPanel` stopped the activity feed rotating entirely.** It
  built `items` with an inline `adaptActivityEvents(...)` call, so the array
  had a fresh identity every render — and `ActivityFeed`'s rotation-timer
  effect keys on `items`. Any parent re-rendering faster than `rotateMs`
  (4200ms default) restarted the timer before it could fire, so the feed
  never advanced. Exactly the same shape as the `CallStartedBanner` bug in
  v2.83.0: an unstable identity in a timer effect's dependencies.

### Fixed — measured render waste

- **Two context providers rebuilt their `value` inline** (`ThemeContext`,
  `AgentsContext`). Context propagation bypasses `React.memo`, so *every*
  consumer re-rendered whenever anything above the provider did. Measured
  with a memoised consumer and a render counter: **6 consumer renders across
  5 unrelated ancestor renders → 1**. Bites on any router transition in a
  host app.
- **`ReactionOverlay` re-rendered at 2 Hz for the entire duration of every
  call.** Its 500ms expiry sweep returned `prev.filter(...)` unconditionally,
  and `filter` always allocates a new array. Measured with `<Profiler>`:
  **22 commits in the first 10s → 5, then flat**; with no reactions on
  screen it now commits never.
- **The repo's only `React.memo` was a no-op.** `VisionNode` passed
  `footerInfo` as an inline object and `onRetry` as an inline arrow, so
  `memo(VisionResponseFooter)` never skipped a single render. React Flow
  re-renders every custom node on pan, zoom and selection, so this cost on
  every canvas interaction.
- **`EditorTopBar` ran the full graph validator in its render body** — cycle
  detection and handle-compatibility across every node and edge — and it
  re-renders on every WebSocket step event during a live run. A 40-node
  pipeline emitting 200 events revalidated 200 times.
- **`EntityTable` discarded its callers' memoisation** (regression from the
  v2.72.0 façade, mine): it rebuilt `dtColumns` inline, and `columns` is a
  dependency of both of `DataTable`'s `filtered` and `sorted` memos — so the
  entire dataset was re-filtered and re-sorted on every render, including
  every keystroke in the table search. All seven identity admin pages
  already memoise their columns; the façade threw that away one level down.
- Also: `PipelineCanvas` rebuilt every node's `data` on each replay tick
  (the sibling edge effect 20 lines below already did this correctly),
  `CodeBlock` re-ran a three-regex highlighter just to toggle its copy
  button, `AgentFlowCanvas` had a `[]` default literal defeating two layout
  memos (one O(edges×agents)), `TabbedEventLog` made six passes over 200
  entries per render, and `useActiveSpeaker` allocated a `Float32Array` per
  participant per 200ms tick — GC churn its sibling `useMuteWhileTalking`
  already avoids.

### Deliberately not changed

`PresenceContext`/`WebSocketContext`/`IdentityContext` take `value` as a
prop — stability belongs to the host. `useActiveSpeaker`'s effect deps
rebuild the whole AudioContext graph when any participant field changes;
keying on IDs + stream identity would fix it but risks a stale analyser on
a real stream swap. `useLatestStepForNode` rescans all runs per node per
event and needs a per-node selector, not a narrower dep array. Several
components (`EventRow`, `ParticipantTile`, `TaskItemRow`) would need
call-site changes to benefit from `memo`, and they are stable public
exports. Two further real bugs were reported but not fixed because the fix
changes behaviour: `SocialPanel` resets form state from its `user` prop
with no guard, clobbering what the user has typed.

## [2.84.0] — 2026-08-24

The README is the library's front door, and it was misinforming people.

### Fixed

- **The README's quick-start advertised three exports that do not exist.**
  `TipTapEditor` (the export is `TiptapEditor`), `PipelineEditor` (it is
  `PipelineEditorPage`) and `ObservabilityDashboard` (it is `DashboardPage`).
  A consumer copy-pasting the first code sample got three import errors.
- **It claimed to be published**, and pinned `2.19.0` (we are at 2.84.0).
  Nothing is published — both scopes still 404 and every consumer is on a
  `file:`/git-SHA pin (hub #1493). That is now stated up front rather than
  discovered at `npm install`.
- **Its stability table contradicted CLAUDE.md**, the source of truth:
  `/pipelines` and `/doc-editor` were listed **In-flux** when both have had
  frozen APIs since 2026-06-10, and `/agents` likewise. Someone reading the
  README would have assumed those surfaces could churn under them.
- Consumer list named `websocket-gateway`, which has been renamed to
  `realtime-examples`. Test/story counts were off by ~2× and ~5×.

### Added

- **`npm run lint:readme`** — checks every
  `import { … } from '@connorhoehnslalom/ui-components…'` in the README
  against the barrel that subpath actually maps to, following `export *`
  re-exports one level. Verified to fail on the real `TipTapEditor` typo.
  Docs drift silently; this is the cheapest place to stop it.
- **`description`, `keywords` and `homepage` in `package.json`** — all were
  absent, so the package would publish with no registry description and no
  search terms.

### Not done — needs your decision

- **There is no `license` field and no LICENSE file**, and the package is not
  marked `private`. For a package slated to publish (#1493) that is a real
  blocker: many organisations' dependency scanners reject unlicensed
  packages outright, and consumers have no stated terms. Choosing a licence
  is an owner decision, so this is reported rather than guessed at.

## [2.83.1] — 2026-08-24

### Fixed

- **Storybook and the demo server could not build in a git worktree.** Both
  configs aliased the `@connorhoehn/realtime-modules` peer dep at its TS
  source (it ships a CJS dist whose named exports Rollup cannot see), but
  each hardcoded where `node_modules` lives — `.storybook/main.ts` via
  `process.cwd()`, `demo/vite.config.ts` via `<configdir>/../node_modules`.
  A worktree has no `node_modules` of its own, so both resolved to a path
  that does not exist and the build failed with an opaque
  `UNLOADABLE_DEPENDENCY`. **Four separate agent runs hit this**, each
  papering over it with a throwaway symlink.
  Both now use `scripts/resolve-realtime-modules.mjs`, which walks up from
  the calling config file. That is correct in a normal checkout and in a
  worktree, because worktrees live under `<repo>/.claude/worktrees/` — so
  walking up reaches the real checkout's `node_modules`. Verified by
  building Storybook from a worktree containing no `node_modules` at all.
  - Known limit, and deliberate: a worktree created *outside* the repo still
    cannot resolve it, since there is nothing to walk up to. The helper
    falls back to the conventional path so the error names something a human
    recognises. Run `npm install` in such a worktree.

## [2.83.0] — 2026-08-24

Closes the three lifecycle items v2.82.0 deferred. Each was deferred as
"needs a decision", but on inspection the existing behaviour is clearly
unintended in all three, so the decision is just to fix them.

### Fixed

- **`CallStartedBanner` never auto-expired for most callers.** `onDismiss`
  was an effect dependency, and callers almost always pass an inline arrow —
  a new identity every parent render tore down the 30s timer and started it
  again. In any UI that re-renders at least once per `autoExpireSec` (a live
  call: presence updates, an elapsed ticker) the banner simply stayed up
  forever. The callback now lives in a ref so the timer depends only on the
  duration. The regression test re-renders five times across the window with
  a fresh arrow each time and asserts exactly one dismissal.
- **`useCallWidgetPersistence` threw away the position you just set.** Its
  debounce cleanup discarded any pending write on unmount, so a widget
  dragged within `debounceMs` (200ms) of the call closing never had the new
  position saved — defeating the point of a persistence hook. It now flushes
  on unmount, and on key change so the old key keeps its final value. The
  pending-write flag is tracked separately from the timer handle, because
  cleanups run in effect-definition order and the debounce cleanup clears
  the handle first.
  - The existing test asserting the *old* behaviour ("does not call setItem
    when unmounted") was inverted rather than deleted: that assertion was
    pinning the bug. It now also asserts the flush happens exactly once, so
    a flush plus a late timer can't double-write.
- **`useYjsDoc` removed a listener that was never registered.** The mount
  effect registered `'synced'` with its own arrow; the doc-rebuild effect
  called `off('synced', …)` passing its *own* hoisted declaration — a
  different function object — so the removal was a no-op. Masked today only
  because `provider.destroy()` runs immediately after and drops all
  observers; a real leak the moment that stops being true. All effects now
  share one stable `handleSynced`, so `on`/`off` always pair.

Both new behavioural fixes were verified to fail against the pre-fix code
before being kept.

## [2.82.0] — 2026-08-23

A resource-leak and effect-cleanup audit — the failure class our test suite
structurally cannot see, because vitest unmounts everything immediately and
Playwright reloads between tests. A leak here only shows up in a long-lived
consumer app.

### Fixed — confirmed leaks

- **`useAuth` leaked an immortal token-refresh chain.** `scheduleTokenRefresh()`
  is assigned from three async Cognito callbacks, but the only cleanup belonged
  to the session-restore effect. A timer scheduled *after* that cleanup ran was
  owned by nobody — and firing it scheduled the next one. Mount a `useAuth`
  consumer, let `getSession` reach the network, navigate away before it
  resolves, and you get a chain refreshing tokens and writing `localStorage`
  for the life of the tab, with a fresh independent chain per race.
- **`WrappedReactionsOverlay` never expired reactions in a burst.** The expiry
  timer was tied to the effect's lifecycle, so React ran its cleanup when the
  *next* reaction arrived — cancelling the previous reaction's still-pending
  expiry. Any burst faster than `ttlMs` left every reaction but the last on
  screen for the life of the mount. Each reaction now owns its handle.
- **`usePipelineMetrics` could spawn a duplicate immortal poll with a stale
  token.** Its `mountedRef` was shared across effect runs and reset to `true`
  on each, so when `idToken` refreshed mid-flight the old fetch's `.finally()`
  scheduled into a closure the new `stopPolling()` could not reach.
- **`CanvasCursorBoard`** created one untracked 1s timer per trail particle on
  every (deliberately un-throttled) mousemove — a fast drag at unmount
  stranded hundreds of detached nodes.
- **`useTrackStateBump`** re-derived its track list at cleanup time, so a track
  added and removed via `addtrack`/`removetrack` kept all three listeners,
  pinning an unmounted fiber.
- **`useAgUiStream` had no `useEffect` at all** — unmounting mid-stream left the
  SSE read loop running against a live connection.
- Plus async effects writing state after unmount (`PipelineRunsContext`,
  `SourceDetailPage` — which also fixes older responses overwriting newer ones
  when switching sources quickly, `AdjustLayerSliderPanel`), and ~15 callback
  timers never cleared, including the `PipelineRunReplayPage` resume toast
  scheduled immediately before the `navigate()` that unmounts the page.

### Fixed — a StrictMode double-submit of single-use codes

- **`CodeInput` submitted a completed TOTP twice.** `setTimeout(() =>
  onComplete(code), 0)` sat *inside* a `setValues` updater, and React
  deliberately double-invokes updaters in StrictMode to surface impurity — so
  the deferred submit was scheduled twice. Because a TOTP is single-use, the
  second attempt failed and the user saw "invalid code" on a **correct** entry.
  Completion now fires from an effect with a ref guard making it exactly-once,
  surviving inline-arrow `onComplete` identities, and re-arming when the code
  is corrected. The stray timer is gone entirely. Tests run inside
  `<StrictMode>` — the configuration that reproduced it — and were verified to
  fail against the original implementation.

### Verified clean, left alone

All 8 `URL.createObjectURL` sites revoke correctly, and every `ResizeObserver`
/`IntersectionObserver` disconnects. The shared module-level `AudioContext` in
`useActiveSpeaker`/`useMuteWhileTalking` is a documented deliberate singleton
(Chrome warns past ~6 contexts, hard-limits near 25) and both effects do
disconnect their per-participant nodes.

### Reported, not fixed — need a decision

- `CallStartedBanner` depends on `onDismiss`, so a caller passing an inline
  arrow restarts the auto-dismiss timer every parent render and the banner
  never expires. The cleanup is correct; the dependency is the bug.
- `useCallWidgetPersistence` discards its pending debounced write on unmount,
  so a position changed within 200ms of closing is never persisted.
- `useYjsDoc` calls `provider.off('synced', …)` with a different function
  identity than it registered — currently harmless only because
  `provider.destroy()` drops all observers.

## [2.81.0] — 2026-08-23

Console-hygiene pass, closing out the stub audit.

### Fixed

- **The doc-editor reassigned the host application's global `console.warn`.**
  `TiptapEditor.tsx` replaced `console.warn` at **module import** — not on
  mount — permanently and without ever restoring it, in order to swallow one
  Tiptap `extension-collaboration` compat warning. Any app that merely
  imported the doc-editor barrel had its console wrapped by us, for the
  lifetime of the page, silently dropping any warning whose first argument
  mentioned that string. A library has no business doing that to its host.
  It was also **unnecessary**: `StarterKit.configure({ history: false })` is
  the documented fix for that warning and is already applied. With the patch
  removed, the editor mounts with a real `Y.Doc`, `Awareness` and the
  `Collaboration` extension across 301 doc-editor tests and emits nothing.
  Pinned by a test asserting that importing the module — and the barrel —
  leaves `console.warn` identical; verified to fail with the patch restored.

### Changed

- **`useCollaborativeDoc().loadFromMarkdown` is now marked
  `@deprecated / NOT IMPLEMENTED` in its type.** It is part of the published
  return shape of a public hook, and its signature — `(markdown: string) =>
  void` — gave a consumer no hint that calling it logs a warning and does
  **nothing** to the document. Removing it would be breaking, so instead the
  interface now says so plainly, and the JSDoc ships in `dist/hooks.d.ts`
  where a consumer's editor will surface it before they call it. The warning
  is namespaced so it is attributable, and the test now also pins that the
  call leaves the document unchanged rather than partially loading.

### Audit note

The remaining 24 `console.warn` calls in `src/` were reviewed and left: all
sit on genuine error or degraded paths (failed clipboard writes, localStorage
quota, fetch failures, unhandled stream events) and are consistently
namespaced. Zero `console.log` remain.

## [2.80.0] — 2026-08-23

Continues the stub audit: the last dead affordance is now live.

### Fixed

- **`ConfigPanel`'s Runs tab rendered a hardcoded `"No runs yet."` for every
  node, always** — in the **frozen** `/pipelines` barrel — even though the
  run data it needed was already reachable from that same barrel. A tab that
  can only ever be empty is worse than no tab: it actively tells the user
  there is no run history when there may well be one. It now shows the
  selected node's latest step execution: status pill, duration, relative
  start time, the error as a `role="alert"` when the step failed, and the
  output rendered as formatted JSON.
  - Safe by construction: `useLatestStepForNode` reads `PipelineRunsContext`
    directly and returns `null` when no provider is mounted, so a bare editor
    falls back to exactly the empty state it showed before. That fallback is
    pinned by a test.
  - The status→tone map is typed `Record<StepStatus, StatusPillState>`, so
    adding a status to the union becomes a compile error here rather than a
    silently unstyled pill.
  - This is a rendering change only; no export or prop signature moved, so
    the barrel's frozen API is untouched.

### Audit note (no change)

- `HangoutGrid`'s `"paginate beyond 16 — TODO"` was checked and is **not** a
  data-loss bug: rows are computed as `ceil(count / cols)`, so every
  participant renders. The TODO is about tile size at high counts, not
  dropped participants.

## [2.79.0] — 2026-08-23

A stub audit. Most of what it found was already honestly labelled (the
in-flux `/observability` fixtures, the renderers' documented v1 stubs). Two
things were not, and both were misleading consumers rather than merely
unfinished.

### Fixed

- **`ShortcutsHelp` taught users dozens of shortcuts that do not exist.** Its
  header explained why: it mirrored the shortcut map in *PIPELINES_PLAN.md* —
  the design, not the code. Of its five sections only **Pipeline Editor** was
  actually implemented. `PipelineRunReplayPage` and `EventsPage` have **no key
  handling whatsoever**, so the Replay Viewer and Event Stream sections were
  entirely fictional; the Global section advertised a ⌘K palette that is never
  mounted and `g p`/`g o` sequences for which no handler exists anywhere. Worst
  of all, the List view advertised four shortcuts it did not have **while
  omitting the three it did** (`Esc`, `⌘A`, `Delete`).
  Unwired rows are now flagged `planned` and render dimmed, struck through and
  tagged, so the panel documents intent without claiming it works; the three
  real list-view shortcuts are listed for the first time. A test pins that ⌘K
  is marked planned while the editor's `⌘S` — which genuinely is wired — is
  not, so this cannot degrade into a blanket disclaimer.
- **`useAgentRegistry` served synthetic agents with no way to tell.** `/agents`
  is documented as a **stable** API, but the hook seeds state from
  `fixtureAgents` and *keeps* them both when no `baseUrl` is configured and
  when a fetch fails — so a consumer whose backend was down rendered
  plausible-looking fake agents beside an error. It now returns a
  `source: 'fixture' | 'remote'` discriminator, mirroring the pattern
  `usePipelineMetrics` already uses in the *in-flux* `/observability` barrel.
  Additive; `AgentRegistrySource` is exported.

### Audit notes (no change made)

- `ConflictsPage` (`/ingest`, stable) renders mock conflicts because
  `/api/sync/conflicts` does not exist — but it says so in a visible banner,
  which is the honest form of this.
- `ConfigPanel`'s **Runs** tab is hardcoded `"No runs yet."` regardless of
  actual runs, in the **frozen** `/pipelines` barrel. Wiring it to the run
  data that already lives in that barrel is a real change and needs its own
  decision.
- `CodeEditor.language` is accepted and discarded — but its JSDoc says so
  plainly ("purely cosmetic / no-op"), so it is documented, not deceptive.
- `useKeyboardShortcuts` is exported from `/hooks` with **zero** consumers
  anywhere in the repo — plausibly deliberate public API, worth confirming.
- `useWebhookTriggers` is a self-described dormant subscriber (the gateway
  bridge is unwired), and `HangoutGrid` silently caps at 16 participants.

## [2.78.0] — 2026-08-23

Three more parallel agents: API ergonomics, testability seams, and a
definitive answer on the last open bundle question. Plus a hole found in
one of this repo's own guards.

### Fixed

- **The hex-colour guard had a hole, and the v2.64.0 "zero remaining" claim
  was wrong.** `check-hex-colors.mjs` required the hex to follow the utility
  prefix *directly*, so every directional form — `border-l-[#22c55e]`,
  `border-b-[#3b82f6]`, `border-t-[#…]` — sailed straight past while the
  guard reported a clean zero. **19 escapees** across 10 files, including
  four in `Toast.tsx`. The regex now allows the directional/sub-property
  segment (`t/r/b/l/x/y/s/e`, `ring-offset`) and adds the missing
  `placeholder-` prefix; all 19 are converted to tone tokens. The sibling
  tones test was hardened the same way — it already covered `border-l` but
  not `border-x/y/s/e`, `divide-x/y`, `ring-offset` or `placeholder`. No
  live escapees there, but it was the same latent shape.

### Added

- **`className` on six video overlays** — `VideoGrid`, `StatusStrip`,
  `StatsCard`, `NetworkQualityBadge`, `ReactionOverlay`, `ReactionPicker`.
  They accepted `style` but not `className`, so every caller needed a
  wrapper `<div>` purely to set a width (inline styles being banned in
  stories and demos by our own guard). Composed through `cn()` last, so a
  caller's class **wins** its Tailwind group — which is what the tests pin,
  rather than mere string presence. `style` is now `@deprecated`.
  `CallStatsOverlay` already had `className` and `HangoutSpotlight` already
  plumbed `speakerHysteresisMs`; no redundant props were added.
- **`TranscriptOverlay` accepts `now?: number`.** Opacity is
  `1 - age/fadeAfterMs`, so any fixture with a fixed ISO timestamp is years
  old at render time and every line clamped to the 0.35 floor — the fade was
  untestable and unstorieable. Follows the existing repo convention
  (`RunFilterCriteria.now` in `runsUtils.ts`) rather than inventing a new
  clock prop.
- **Initial-state props so multi-state components can be rendered directly**
  instead of only reached by clicking: `LoginPage.defaultTab`,
  `MfaVerifyPage.defaultMode`, `MfaSetupPage.initialStep` (+
  `initialSetupResult`, `initialDeviceName` — the scan step is gated on the
  setup payload, so one prop alone renders an empty card),
  `IdentityAdminLayout.defaultSidebarOpen`, and `AppLayout.defaultSidebarOpen`.
  All seed `useState` only — the component still owns the state afterwards,
  so these are additive, not a controlled-component redesign. `defaultTab` is
  ignored when the matching capability flag is off, so it can never render a
  form the host disabled. `SettingsLayout` already supported this and was
  left alone.

### Investigated — DO NOT DECLARE `sideEffects`

Settled empirically with a **webpack** consumer (webpack honours
`sideEffects` far more aggressively than esbuild), building and *executing*
the bundles rather than inferring:

- With `"sideEffects": false`, `getFieldTypes()` returns `[]` and
  `getRenderer('rich-text','reader')` returns `null` — the renderer registry
  is completely dead, the `('*','*')` wildcard included. **Every broken
  build reported `compiled successfully`.**
- The prize is **953 bytes raw / 241 gzipped (~2.6%)** on a `Chip`-only
  bundle.
- The array form is not salvageable. `src/renderers/index.ts` is the
  library's only production module-level side effect, and in `dist` its
  registrations land in a **content-hashed** chunk that `vite.config.ts`
  never names (`manualChunks` is unset) — so any whitelist entry is an
  emergent artifact, not a contract. Only the *conjunction* of
  `**/renderers-*.js` and `**/index.js` restores correctness, and flagging
  `**/index.js` forfeits most of the tree-shaking the field was meant to buy.
- Nothing in the gate could catch a regression: vitest doesn't bundle, the
  build is rollup, and Playwright runs the vite demo. It would surface only
  as an empty type picker in a downstream webpack app.

Recorded in `docs/bundle-side-effects.md`, with the structural unblock: make
registration lazy and idempotent inside `registry.ts` so the library has no
module-level side effects, after which `["**/*.css"]` becomes safe. That
touches the no-touch list and needs a handoff.

## [2.77.0] — 2026-08-23

### Fixed

- **`ActivityPanel` spun forever when unconfigured.** `loading` initialises
  to `true`, and the hydrate effect early-returned on `!idToken || !baseUrl`
  *before* clearing it — so with no `VITE_SOCIAL_API_URL` (the default; there
  is no `.env`) or no signed-in user, the panel showed a spinner that never
  resolved, with no way out. It now resolves to the empty state. Found by the
  coverage pass, which pinned the broken behaviour rather than silently
  changing it; both regression tests are verified to fail without the fix.

### Changed

- **Config files use `import.meta.dirname` instead of `__dirname`** (40
  occurrences across `vite.config.ts`, `demo/vite.config.ts`,
  `vitest.config.ts`). Vite 8 warns on every command that `__dirname` is
  unsupported by `configLoader: 'native'`, which is planned to become the
  default in a future major. Free to adopt: vite 8 already floors Node at
  `^20.19.0 || >=22.12.0`, above `import.meta.dirname`'s 20.11 requirement.
  Deliberately **not** declared in `engines` — that field is consumer-facing,
  and this is a build-time floor the shipped bundles do not impose. Recorded
  in CLAUDE.md instead.

## [2.76.0] — 2026-08-23

A parallel-agent upgrade round: three dependency majors evaluated in isolated
worktrees, two shipped, one rejected with a root cause — plus the coverage
work that ran alongside, which found a **data-loss bug**.

### Fixed

- **`MappingRuleEditor` silently destroyed a rule.** `deleteRule` cleared the
  edit state only when the deleted index *was* the edited index. Deleting a
  row **above** the one being edited shifted every later row down while
  `editingIdx` stayed put, so `saveEdit`'s `updated[editingIdx] = draft`
  wrote the pending draft over a **different** rule. Editing `B` in
  `[A,B,C]`, deleting `A`, then saving produced `[B,B]` — `C` destroyed and
  `B` duplicated, with no error. `moveUp`/`moveDown` always re-pointed
  `editingIdx`; delete was the odd one out. Fixed, with a regression test
  verified to fail (`['b','b']`) without the fix.
- **`NodesPage` had a `= {}` default on its destructured props** (introduced
  in v2.72.0, mine), which collapses Storybook's `typeof` arg inference to
  `never`. React always passes a props object, so the default was redundant.
- **A fake `declare module 'reactflow'` was living in `declarations.d.ts`.**
  `reactflow` is not a dependency at all — this library uses `@xyflow/react`
  — but one vestigial type-only import in `validate-handles.ts` kept the
  hand-written shim alive. Repointed and deleted; typecheck stays clean,
  proving the shim was never needed. (It would have been *published* to
  consumers under vite-plugin-dts 5, colliding with their real reactflow
  types.)

### Changed

- **`react-router` peer widened to `^7.0.0 || ^8.0.0`** (dev dependency now
  8.3.0). Zero source changes were required — the library only uses
  `BrowserRouter`/`Routes`/`Route`/`Link`/`Navigate`/`Outlet`/`useNavigate`/
  `useParams`/`useSearchParams`/`useLocation`, none of which v8 breaks. The
  range is **strictly additive**, so no consumer install that is valid today
  becomes invalid, and **no charter handoff is required**. This matters:
  react-router 8 requires `react >=19.2.7`, and two of the three consumers
  (`event-catalog`, `vnl-ads`) are still on React 18 — forcing `^8.0.0`
  would have hard-broken them at install time. Verified by running the full
  gate against **both** majors, and by consumer-tarball checks under each.
  - Caveat: v8 is ESM-only with no `require` condition. This library still
    ships `.cjs` bundles that `require("react-router")`, which resolve via
    `module-sync` on Node ≥22.12. A consumer on older Node or a CJS bundler
    that ignores `module-sync` should stay on v7 — which the widened range
    keeps available.
  - Noted separately: `event-catalog` and `vnl-ads` are on React 18 while
    this library already declares `react: ^19.0.0`, so they are *already*
    out of compliance with the current peer set, independent of this change.

### Added

- **Storybook coverage for the four thin areas** — 82 story files, ~420
  stories: `identity` 0 → 24, `video` 4 → 34, `observability` 2 → 17,
  `ingest` 0 → 13. All 30 identity components turned out to be fully
  prop-driven (no hooks, fetch or router), so they needed no mocking;
  ingest's hooks call bare `fetch` with no injectable seam, so those stories
  carry a local URL-keyed mock backend with ok/error/pending modes.
- **296 tests** across `social`, `ingest`, `observability`, `ui`, `layout`
  and `doc-types`, targeting logic that can actually break — the dashboard's
  alert arithmetic (queue depth is `>50`, not `>=`; failure rate needs a
  5-item sample before dividing), `formatMs` boundaries (`0` → `"0 ms"` but
  `null`/`NaN`/`Infinity` → em-dash), and the guard that stops a background
  error from wiping visible data. Suite: 3,661 → **3,962**.
- **A packaging guard for the shape of the shipped `.d.ts`.** The existing
  test only checked that `types` targets exist. It could not see the failure
  mode found while evaluating vite-plugin-dts 5: a build that stays exit-0
  and green while emitting an unbundled `dist/src/**` tree and no
  `dist/index.d.ts` at all. Now asserts bundle count, rollup size, and the
  absence of `dist/src/`.

### Not taken (deliberately)

- **`vite-plugin-dts` 5 — root-caused and rejected.** v5 renamed
  `rollupTypes` → `bundleTypes` and **silently ignores the old key**, which
  is the whole "successful build, zero `.d.ts`" symptom. Even with the key
  corrected it is unshippable: `bundleTypes` forces `copyDtsFiles`, which
  harvests every ambient `declare module`/`declare global` block and appends
  them to **all** entries. No option suppresses it — `exclude` drops the
  file from the type program, and `beforeWriteFile` runs after the harvest.
  v4.5.4 runs fine on vite 8 with byte-identical output, so there is nothing
  to gain.
- **`typescript` 7.0.2 — evaluated in full, held.** It is clean for this
  repo: **zero** new type errors, zero test changes, and a typecheck that
  drops **30.2s → 2.0s** (verified non-vacuous by injecting a deliberate
  error and by diffing `--listFiles`: 1,239 files under both). It also does
  not change the shipped types — declaration emit and the api-extractor
  rollup produce a **byte-identical** `dist/index.d.ts`, and consumers are
  not forced onto TS7. It is held anyway because the *toolchain around it*
  fails silently in three ways: `vite-plugin-dts@4` crashes outright on TS7,
  forcing the rejected v5; and `@typescript/typescript6` pulls
  `@typescript/old@npm:typescript@6.0.3`, which declares `bin.tsc` and
  **overwrites the root `tsc` symlink** — so which compiler the gate runs is
  decided by npm install order, with no signal. Buying a faster local
  typecheck is not worth a CI that can silently validate against the wrong
  compiler. The work is preserved on `upgrade/typescript-7`.


### vite 8 (build-tool cluster)

The build-tool cluster moves to vite 8. This swaps the bundler underneath
every shipped artifact — vite 8 uses **rolldown**, not rollup — so the
verification below is about equivalence of output, not just a green gate.

### Changed

- **`vite` 7.3.6 → 8.2.2** and **`@vitejs/plugin-react` 5.2.0 → 6.1.0**.
  These are one job: plugin-react 6's peer is `vite@^8`. `@tailwindcss/vite`
  (`^5||^6||^7||^8`), `vitest` 4.1.11 (`^6||^7||^8`) and `@storybook/react-vite`
  all deduped onto vite 8 with no peer conflicts and no config changes.

  Output was checked for equivalence rather than assumed:

  - All 14 `.d.ts` entry bundles are **byte-identical** to the vite 7 build.
  - All 14 entries export the **same symbol set** in both ESM and CJS
    (366 from the root, 132 from `/pipelines`, …), and every one loads
    under plain node.
  - `dist/ui-components.css` has the same 90 `--color-*` tokens, 1657
    selectors and 38 keyframes; it differs only in minifier ordering and a
    stray `/*$vite$:1*/` marker rolldown leaves on the end (a CSS comment —
    inert, but it is new).

### Not taken (deliberately)

- **`vite-plugin-dts` stays at 4.5.4** — it works fine on vite 8 and its
  output is byte-identical, so there is nothing to gain and a real
  regression to avoid. v5 is a thin wrapper over `unplugin-dts`, and:
  - It **renamed `rollupTypes` → `bundleTypes`** and *silently ignores* the
    old key. That is the "v5 emits no types" symptom recorded under 2.73.3:
    with the key ignored it emits an unbundled `dist/src/**` tree and **no**
    `dist/*.d.ts` at all, so every `exports` `types` target 404s — while the
    build reports success.
  - Even with the key renamed, `bundleTypes` forces `copyDtsFiles`, which
    makes unplugin-dts harvest every ambient `declare module` / `declare
    global` block in the project and append it to **every** rolled-up entry.
    That would have shipped `src/declarations.d.ts`'s `declare module
    'reactflow'` stub — a module augmentation that collides with a
    consumer's real reactflow types — plus a `declare global` block
    referencing a `DevEditorBridge` type that is not in the bundle, so all
    14 `.d.ts` files fail under `skipLibCheck: false`. There is no option to
    suppress it (`exclude` drops the file from the type program instead, and
    `beforeWriteFile` runs after the harvest).

### Known warnings (not errors)

- Vite 8 warns that `__dirname` in `vite.config.ts`, `demo/vite.config.ts`
  and `vitest.config.ts` is unsupported by `configLoader: 'native'`, which
  is planned to become the default in a *future* major. Current default
  still supports it; the fix when it lands is `import.meta.dirname`.
- Rolldown's `EMPTY_IMPORT_META` warning on `ScatterPathPicker.tsx`. It
  constant-folds `import.meta.env?.VITE_SOCIAL_API_URL` to `""`. Vite 7 also
  substituted `import.meta.env` with `{}` at build time, so the expression
  already evaluated to `""` — the emitted URL is unchanged.


## [2.75.1] / [2.75.0] / [2.74.0] — 2026-08-23

Shipped from a parallel session; entries reconstructed here so the release
history stays complete.

### Added

- **In-row "add people" button on `CallWidget`**, plus a share link in the
  invite dialog, and `onOpenAddParticipant` so a host with its own invite
  surface can take over the flow instead of the built-in inline picker.
- **`UserPlusIcon`** exported from the shared media-icon set.

### Fixed

- `onOpenAddParticipant` was not actually forwarded through to the controls.

## [2.73.3] — 2026-08-23

Dependency majors, taken only where they cannot reach consumers. One of
them uncovered a shipping bug.

### Fixed

- **`ajv` was an undeclared direct dependency.**
  `pipelines/persistence/pipelineStorage.ts` imports it to validate
  persisted pipelines at runtime, but it appeared in no `dependencies`,
  `devDependencies` or `peerDependencies` — it only ever resolved because
  `vite-plugin-dts@4` happened to pull it in transitively. The build broke
  the instant that transitive provider changed, which is how it surfaced.
  Now a declared `dependency` and externalised alongside the other three.

### Changed

- `@testing-library/jest-dom` 6 → **7** and `jsdom` 28 → **29**. Test-only,
  whole suite green.

### Not taken (deliberately)

- **`vite-plugin-dts` 5 silently stops emitting types.** With v5 the build
  reports success while producing **zero** `.d.ts` files — no error, no
  warning. Installing its newly-peer `@microsoft/api-extractor` did not
  help. Reverted to 4.5.4. The packaging test caught the missing types,
  which is exactly what it exists for.
- **`@vitejs/plugin-react` 6 requires `vite@^8`** — it cannot be taken
  independently, so it belongs to the vite-8 decision below.
- Left for an explicit call, all consumer-visible or large:
  `vite` 7 → 8 (anchors the build-tool cluster; tailwind and vitest already
  accept 8), `react-router` 7 → 8 (a declared **peer** — bumping the range
  is consumer-visible), `typescript` 5.9 → 7.0 (the Go compiler rewrite).

## [2.73.2] — 2026-08-23

Shipped from a parallel session; entry reconstructed here so the release
history stays complete.

### Added

- **`CallWidget` gains a `controlsExtras` slot.** The docked widget had no
  extension point, so a consumer could not offer the same action in both
  chromes — `MediaControlsBar` (expanded) had extras, the docked widget had
  nothing. Also forwards `controlsExtras` to the active view.
- **`useToastOptional`** — for components that want to notify but must still
  mount where no provider exists (a widget reused inside a panel, or
  rendered bare in a test). Callers use `toast?.(…)` instead of crashing the
  subtree.

## [2.73.1] — 2026-08-22

Dependency hygiene. Every in-range update applied; **0 vulnerabilities**
(the residual esbuild advisory cleared with vite 7.3.6).

### Removed

- **`@tiptap/extension-collaboration-cursor` — a dead dependency pinned to a
  deprecated release.** npm reported it oddly (`Current 3.0.0, Latest
  2.26.2`) because tiptap published a 3.0.0 by accident and deprecated it:
  *"There are no breaking changes in this package, we meant to release
  2.5.0."* Nothing in `src/` or `demo/` ever imported it, so rather than
  downgrade onto the 2.x line it is removed outright, along with its stale
  entry in vite's externals list.

### Changed

- **`amazon-cognito-identity-js` now typechecks against the real package.**
  It is a peer dependency that was never installed locally; `useAuth` — a
  **public** export from `…/hooks` — resolved its six imports through a
  hand-written 34-line ambient module shim in `declarations.d.ts`. Our gate
  therefore validated the hook against our own approximation of the API, not
  the API. It is now a devDependency and the shim is deleted; the real types
  typecheck clean, so the shim was accurate — but future edits are now
  actually checked. Consumers are unaffected (it stays a peer dep, and stays
  externalised).
- In-range bumps: playwright 1.62.1, storybook 10.5.10, tiptap 3.30.2,
  recharts 3.10.1, vite 7.3.6, vitest 4.1.11, react 19.2.8, xyflow 12.11.3,
  tailwind 4.3.3, yjs 13.6.32, hls.js 1.7.1.

### Fixed

- **A flaky e2e test I introduced in v2.71.2.** `simulated participants churn
  over time` asserted the count changes within 20s, but the demo's churn is
  a ~40% join / ~30% leave roll every 5s — unreliable by construction, and
  it failed under full-suite load while passing in isolation. Replaced with
  the invariant the simulation actually maintains (count stays within its
  designed 3–9 bounds across many ticks).

### Note

The playwright bump moved the pinned chromium build, so `npx playwright
install chromium` was required — exactly the drift CLAUDE.md documents.

## [2.73.0] — 2026-08-22

A bundle-weight bug that penalised every consumer, plus the last a11y gaps.

### Fixed

- **`cmdk` was bundled instead of externalised — importing `Chip` cost 64KB.**
  All three runtime `dependencies` are meant to be external (npm installs
  them for the consumer); `clsx` and `tailwind-merge` were, `cmdk` was not.
  It therefore inlined into a shared chunk that *every* entry pulled, so the
  smallest primitives dragged in the whole command-palette fuzzy-matching
  library. Measured with a scratch consumer bundle: **importing `Chip` drops
  from 49.2KB to 4.8KB minified (−90%)**. No consumer action needed — `cmdk`
  is already a declared dependency, so it resolves from `node_modules`, and
  only loads for the two components that use it (`CommandPalette`,
  `ReactionPickerPopover`).
- **Keyboard access for `GroupPanel`'s clickable rows.** The group row and
  the per-group room rows were `<div onClick>` with `cursor-pointer` and no
  role, tabIndex or key handler — visible affordances that keyboard users
  could not reach at all. They now follow the `SidebarRow` house pattern
  (`role="button"` + `tabIndex` + `aria-pressed` + Enter/Space).
- **Three icon-only buttons in `FieldDefinitionEditor`** (move up, move down,
  remove) had no accessible name. They now carry field-scoped `aria-label`s.
  `src/components` is now at **zero** unlabelled icon-only buttons and zero
  keyboard-inaccessible click targets (the two remaining `<div onClick>` are
  `stopPropagation` event boundaries, not controls).

### Added

- **Packaging guard: every runtime dependency must be externalised.** The
  existing test asserted the converse (everything externalised is declared);
  nothing caught a declared dependency being silently inlined. This is the
  test that would have caught `cmdk`.

### Changed

- `EntityTable` dropped off the static-styles allowlist — the v2.72.0 façade
  rewrite removed its last inline style.

## [2.72.1] — 2026-08-21

Closes the last measured unit-test gaps (24 tests; suite now 3,646). The
"renderers 8/26" audit figure turned out to count metadata files — every
renderer family was already tested; the real gaps were the plumbing:

### Added

- **`renderers/registry` tests**: the four-step fallback chain
  (`type:mode` → `type:*` → `*:mode` → `*:*`), null/undefined section
  types, and user-defined field types delegating to their base
  `rendererType`.
- **`decisions/approvalSync` tests**: terminal-status mapping, document-id
  URL parsing, bearer-token POST shape, the no-documentId skip, and the
  never-throws guarantee (HTTP failures and network errors both surface
  as `{ok:false}`).
- **`lib/documentTypeApiAdapter` tests**: renderer-id → API field-kind
  translation with the unknown-renderer text fallback, and the sync
  lifecycle — create remembers the server id, update of a never-synced
  type falls back to create, a 404 on update re-creates the row, delete
  of a never-synced type is a clean no-op.
- **`ColorSchemeProvider` tests**: light default, toggle persistence to
  localStorage + `data-theme`, restore-on-mount, garbage tolerance.

## [2.72.0] — 2026-08-21

The three structural items from the audit, executed non-breaking.

### Changed

- **Observability graduation prep — no button is a no-op anymore.** The five
  `console.log` stubs became optional host callbacks: `MetricTimeSeriesPanel`
  gains `onResetZoom?`/`onExportCsv?`, `NodesPage` gains `onAddLatency?`/
  `onKillNode?`/`onTransferResource?` — each control renders only when the
  host wires it. `NodesPage` also gains a `nodes?` prop (fixture-derived set
  remains the fallback so the demo route is never blank). The barrel stays
  **in-flux**: graduation waits on a real consumer and the real
  `ClusterDashboard` type from distributed-core.
- **`EntityTable` is now a façade over `DataTable`.** Identity's table kept
  its public API, Card frame and emoji empty state, but delegates sorting,
  skeleton rows and action cells to shared `DataTable` — one table
  implementation instead of two that could drift. `DataTable` gains an
  additive `frameless` prop so composites can supply their own frame.
- **`IdentityFormField` delegates presentation to `shared/FormField`.**
  Same value-coercing API; the label/hint/error rendering and — new for
  identity — the aria wiring (`aria-describedby` linking errors/help to the
  input, `aria-invalid`) come from the shared wrapper. Identity forms adopt
  the library-standard field look (visual snaps re-baselined: /identity/login,
  /identity/mfa-setup). The checkbox branch keeps its wrapping-label markup.

### Added

- Contract tests (11) pinning all three: aria linkage, façade sorting/empty/
  actions behavior, and hidden-until-wired observability actions.

## [2.71.2] — 2026-08-21

Journey round two (e2e 193 → 206), plus the reset bug from round one fixed.

### Fixed

- **Call-widget demo: simulation Reset now resets the call state.** The
  simulator's Reset only rewound its own timeline, leaving the widget
  mid-call; the demo now mirrors reset into its dispatch (the `'reset'`
  case existed but nothing ever fired it). Pinned by a journey test.

### Added

- `hook-demos-2` journeys: auto-fired reactions land AND a clicked emoji
  fires through `useReactions`; `CapabilityBoundary` swaps to the denied
  fallback when a capability toggles off and restores on re-enable, with
  the pulse-loading state covered; activity events stream in order; the
  file-upload drop zone mounts with its input wired.
- `streaming-hangout-journeys`: video-streaming stats render and simulated
  participants churn; the hangout rooms list renders seeded rooms and a
  join reports its slug to the host; the wrapped-components comparison
  mounts both chat panels (raw + adapter); the video-hangout layout mounts.

## [2.71.1] — 2026-08-21

**User-journey e2e coverage** (22 new tests, suite now 193): the audit found
the interactive flows were smoke-tested only — mounted, screenshotted, never
driven. Five journey specs now exercise the shipped components end-to-end:

- `identity-journeys`: sign-in submits credentials, error banner toggles,
  the sign-in-only variant hides Register, MFA 6-digit entry auto-verifies,
  consent lists human-readable scope descriptions, and the full admin demo
  navigates dashboard → pools → (View) → users → audit via the real sidebar.
- `document-workspace`: section structure renders, collapsed sections
  toggle, the simulated collaborator (Alice) joins and streams edits.
- `agents-invoke`: a prompt sent into `AgentInvokePage` streams the
  scripted AG-UI answer with its `query_knowledge_base` tool call; the
  simulated/live mode banner toggles.
- `hook-demos`: mock-mode chat receives timer messages AND echoes a sent
  message back through `useChat` into the panel; presence roster joins.
- `call-widget-journey`: the auto-played call lifecycle goes active with a
  ticking `data-call-duration` timer (the testid contract from v2.67.0),
  speaking state surfaces, and the scripted call ends back to idle at 4×.

Also noted: the call demo's simulation Reset leaves the widget's call state
active (timeline-only reset) — recorded, not fixed, since the scripted
end-of-call covers the journey.

## [2.71.0] — 2026-08-21

Audit-round follow-through: the two biggest untested surfaces get suites,
and the dependency vulnerabilities are cleared.

### Added

- **Identity tests (23)**: admin form pages pin their exact submit
  payloads (user/pool/group/application/email-template), list pages pin
  the two-step ConfirmDialog delete flow, AuditPage pins the
  datetime→epoch query conversion and point-in-time replay, and the OIDC
  auth screens (login/consent/MFA verify/logout/error) are covered.
- **`TypedDocumentForm` tests (13)**: widget mapping per field kind,
  submit coercion (numbers, native booleans, empty-optional dropping),
  required/regex/min-max/requireTrue validation, `showWhen` visibility
  (hidden fields drop from the payload), unlimited-cardinality add/remove
  and number coercion, reset-on-success, error surfacing.
- **`FieldTypesPage` tests (5)**: two-step wizard gating, localStorage
  persistence across remount, disabled coming-soon primitive types.
- **`src/api/` tests (11)**: URL/param assembly and error surfacing for
  retry/force-fail/audit/DLQ/runs/resume — including DLQ's deliberate
  503→empty tolerance, `searchAudit`'s required-filter guard, and the
  backend `runId` → frontend `id` boundary mapping.

### Fixed

- **`npm audit`: 6 high-severity vulnerabilities cleared** (brace-expansion,
  fast-uri, nanoid, postcss) via lockfile-only upgrades. One low remains
  (esbuild dev-server file read, Windows-only, nested under vite — waits
  on a vite bump).

## [2.70.0] — 2026-08-21

The `forms/` primitives — the most-copied components since the control
migration — close their own coverage gaps.

### Added

- **Tests for `Input`, `Select`, `Textarea`, `RadioGroup`, `JsonPathInput`**
  (22 tests): the widened date/datetime-local type union, Select's disabled
  placeholder + `groups`/optgroup rendering, RadioGroup's shared name and
  selection reporting, JsonPathInput's sample-pill paste and
  `enforcePrefix` blur validation. Every forms primitive now has direct
  unit tests.
- **Stories for `Checkbox`, `Slider`, `ColorInput`**: Checkbox ships a
  working select-all/indeterminate example (the pattern the pipelines list
  surfaces use), Slider a formatted-readout temperature example. Every
  forms primitive now has a story.

## [2.69.0] — 2026-08-21

**Every `shared/` component now has a story** (hub #1059 closed). The last
32 landed: the 24 primitives that gained tests in v2.68.0, plus `Chart`
(all three chart kinds), `CodeEditor` (variable pills, read-only),
`PermissionDeniedCard` (camera/mic/screen states), `ScoreBarGauge`,
`ShortcutsHelp`, `StatCard` (delta + sparkline, inverted-tone failures
card), `TrendSparkline`, and `UserPicker` — the last driven by mocked
`PresenceProvider`/`IdentityProvider` values, the same no-runtime pattern
as the Wrapped* integration stories. Stories use tone/token classes only
(the tones test scans them), and `build-storybook` passes.

## [2.68.0] — 2026-08-21

**Every `shared/` component now has tests.** The 26 that had none —
including several with real behavioral surface — gained 101 tests
(constitution principle 2: tests for every exported primitive).

### Added

- Tests for: `Drawer` (portal dialog, Escape/backdrop close, focus move,
  width), `ToastProvider` (queue, per-type auto-dismiss durations,
  stacking, custom duration, hook guard), `SubNavLayout` (flat + grouped
  collapsible rails, action vs link items, `renderNavItem` delegation,
  secondary rail), `InlinePopover` (outside-dismiss vs inside clicks,
  Escape, fixed positioning), `ActivityFeed` (rotation pool, stagger-safe
  fake timers, kindColors override), `ProjectCard`, `CollapsibleSection`
  (localStorage persistence beats defaultOpen), `ChatComposer`
  (Enter/Shift+Enter, whitespace guard), `SearchInput`, `FilterChip`,
  `SegmentedControl`, `MessageBubble`, `ProgressBar` (clamping,
  divide-by-zero max), `StatusPill` (tone classes, ping halo), `PageHeader`,
  `InlineAlert` (alert vs status roles), `ThinkingBlock`, `ThinkingDots`,
  `ToolCallStrip`, `QuickPromptGrid`, `CatalogGrid`, `EntityCell`,
  `CardHeader`, `FollowUpChips`, `StatusDot`, `Spinner`.

### Docs

- CLAUDE.md coverage sections trued up: the "large untested exports"
  (`CallWidget`/`AppLayout`/`CollapsibleSidebar`) have been tested for a
  while; the story gap recounted at 32 `shared/` components (was stated
  as "51 components, 7 stories").

## [2.67.0] — 2026-08-21

### Fixed

- **Call-timer testids on both widget chromes** (parallel session): the e2e
  Hangout page-object reads `[data-testid=call-timer]` /
  `[data-call-duration]` but no element carried them. `CallWidget`'s two
  duration spans now stamp both; `ExpandableCallWidget` gains
  `durationSeconds` and renders the timer in its expanded header.
  `formatDuration` exported for reuse.

## [2.66.0] — 2026-08-21

### Fixed

- **F5: `spotlightContentLabel` attributes screen share to the sharer**
  (parallel session) — the spotlight label named the wrong participant.

## [2.65.0] — 2026-08-21

### Added

- **`ActiveCallBanner`** (`/hangout`): non-modal "call in progress — join?"
  affordance for lobbies the user wasn't invited to (sibling of
  `ResumeCallDialog` in the F3 discovery journey). Live-dot, participant
  count, elapsed ticker, avatar chips, Join/Not-now. Token classes only;
  6 tests. (Landed in a parallel session under this same version.)

The theming audit reaches JS constants: hex strings in color maps, chart
palettes and SVG strokes now resolve through the token system.

### Fixed

- **`StepTimeline` carried a second 40-entry node-type palette** that
  disagreed with the canvas (llm was blue in the timeline, violet on the
  canvas — the banned second-`Record` failure). It now colors bars by the
  same category channel the canvas uses (`--color-cat-*` via
  `NODE_CATEGORIES`), and its legend lists the six categories.

### Changed

- **~430 JS-constant hexes converted to `var(--color-*)` strings** across
  status maps (`ReviewMode`, `DocumentListPage`, `ChunkViewer`,
  `NetworkQualityBadge`, `PipelineMetrics` cost/latency thresholds…), chart
  palettes (`Chart`'s series palette, axis/grid strokes, tooltip chrome)
  and SVG strokes (`AnimatedEdge`, `AgentFlowCanvas`). CSS vars resolve in
  inline styles and SVG attributes, so these now re-tone with the theme.
- **User-distinguishing colors deliberately stay hex data**: `Avatar`'s
  palette, awareness/presence fixtures, collaboration-sim users, and code
  samples that teach passing a user color. The mechanical pass initially
  converted 35+ of these; the visual suite caught a corrupted ThemingPage
  doc sample and all were reverted from git history. Hexes that are *data*
  (manipulated as strings, sent over the wire, hash-picked per user) must
  not become var strings — there is no automated guard for this
  distinction, so it lives here and in CLAUDE.md.
- 23 unit-test assertions updated from pinned hexes to the var strings.

## [2.64.0] — 2026-08-21

**Hex burn-down complete, same day the ratchet was created.** The 844
baselined arbitrary-value hex utilities are gone; `lint:hex-colors` is now
a plain zero-tolerance rule with an empty baseline.

### Added

- **`--color-code-*` token family** (Catppuccin Mocha): bg, panel, surface,
  border, raised, text, subtle, comment, muted, red, green, blue, yellow,
  peach, mauve. The dark language of the pipeline debugger, log consoles
  and syntax-highlighted code blocks — previously ~150 per-file hexes —
  is now re-themeable like everything else.
- **`--color-video-*` tokens** (`video-stage`, `video-tile`): the near-black
  video letterbox and tile placeholder, previously three slightly-different
  ad hoc darks (#0f0f0f / #1a1a2e / #0a1020).

### Changed

- **~760 hex utilities converted by nearest tone/role** per the CLAUDE.md
  mapping table: the gray/slate text ladder onto `text-text-{primary,
  secondary,tertiary}`, semantic shades onto their tone roles, run-state
  dots onto `--color-state-*` (BaseNode's pending dot was literally the
  `state-pending` value), light-on-dark shades onto the code family.
  12 visual e2e baselines shifted — each diff reviewed (localized label/
  chip re-tonings) and regenerated; the other 52 pages were pixel-stable.
- 13 unit tests that pinned old hex class strings now assert the token
  classes.

## [2.63.0] — 2026-08-21

The tones rule gets its missing enforcement half: arbitrary-value hex
utilities (`bg-[#2563eb]`) sailed past the palette-name scan — ~950 of them
had accumulated, including Button's off-brand primary fixed in v2.61.0.

### Changed

- **665 hex utilities converted to token classes, mechanically and
  pixel-identically:** every `prefix-[#hex]` whose hex exactly equals a
  token's current value became that token's class (`text-[#0f172a]` →
  `text-text-primary`, `border-[#e2e8f0]` → `border-border`,
  `bg-[#fef2f2]` → `bg-danger-bg`, …) across `src/components`, `src/theme`,
  `src/renderers` and `demo/src`. All 64 visual e2e baselines pass
  unchanged, which is the proof of the "pixel-identical" claim.

### Added

- **`npm run lint:hex-colors`** (`scripts/check-hex-colors.mjs`): ratchet
  guard over the 844 remaining hex utilities in 143 files — the ones whose
  hex matches no token and needs judgment (nearest-tone mapping per the
  CLAUDE.md table, with eyes on the rendering change). New hexes fail;
  burn-down must lower the baseline. No new entries allowed — if the scale
  can't express a colour, add a tone.

## [2.62.0] — 2026-08-21

**The hand-rolled control migration is complete.** Every area of
`src/components` now builds its form controls from the `forms/` primitives,
and the ratchet guard covers the whole tree.

### Added

- **`ColorInput` primitive** (forms + root export): wrapper over
  `<input type="color">`, shipped because `CanvasCursorBoard` was the one
  place hand-rolling a color swatch.
- **`Select` gains `groups`** (`SelectOptionGroup[]`, rendered as
  `<optgroup>`): `FieldTypesPage`'s Drupal-style grouped type picker needed
  it, and the primitive ships first.

### Changed

- **Converted to forms primitives:** ingest (8 files — mapping rule editor,
  source detail, audit/sync/items/SLO/review/conflicts), social (7 —
  GroupPanel, SocialPanel, RoomList, PostFeed, CommentThread, ChatRoom,
  ChatPanel internals; public props untouched), doc-editor (8 — TaskItemRow's
  pill selects keep their runtime-derived colors via class overrides,
  AttachmentsPanel, NewDocumentModal, SectionComments, SectionBlock,
  ReviewableItem, DocumentHeader, CommentThread), observability (3), agents
  (3), collaboration (CanvasCursorBoard now uses `Slider` + `ColorInput`;
  SharedTextEditor's format picker), video (RecordingPlayer's speed select;
  its seek/volume ranges stay raw as media chrome), field-types (1).
- **`lint:node-controls` now guards ALL of `src/components`** (was
  `pipelines/` only). 27 files / 37 raw elements remain, every one a
  documented justified exception — the forms/shared primitives themselves,
  hidden inputs, OTP digit boxes, media scrubbers, dev inspectors.
- Visual e2e baselines regenerated for the v2.61.0 Button re-toning; the
  visual spec now blanks `<video>` surfaces (live frames made
  `/workflows/video-streaming` flaky by nature).

## [2.61.0] — 2026-08-21

The control migration crosses into its next areas: identity, typed-documents
and doc-types are now raw-control free (the survey's three biggest fronts
after pipelines), and `Button` finally wears the brand.

### Fixed

- **`Button` variants are token-mapped, not hex-literal.** Every variant was
  hardcoded (`bg-[#2563eb]` etc.), invisible to the tones guard because
  arbitrary-value utilities aren't palette names. Consequences fixed: the
  `primary` variant was blue-600 — visibly not `--color-primary` — and no
  variant re-toned when a consumer overrode the variables. Variants now use
  `bg-primary`/`surface`/`danger` tokens. **Visual change:** primary buttons
  shift from blue-600 to the brand primary everywhere.

### Changed

- **Identity is raw-control free.** `IdentityFormField` keeps its public API
  but is rebuilt on `Input`/`Textarea`/`Select`/`Checkbox` (its bare controls
  carried a literal `border-[#e2e8f0]`); `AuditPage`, `MfaManagementPage`,
  `DiagnosticsPage` and the five admin form pages drop their hand-rolled
  controls and per-page `inputClass` constants. Remaining raw elements are
  justified: `LoginPage`'s `type="hidden"` and `CodeInput`'s digit boxes
  (the primitive itself).
- **`TypedDocumentForm` (the single biggest offender, 15 controls) renders
  every widget branch with the forms primitives**, and its hexes
  (`text-[#dc2626]`, `border-[#cbd5e1]`, …) become tokens. The hand-rolled
  add/remove/submit buttons are now `Button`. `TypedDocumentsPage`'s
  display-mode picker converts too; its hidden file-upload input is a
  justified invisible trigger.
- **doc-types converted:** `DocumentTypeWizard` (7 controls),
  `FieldDefinitionEditor` (inline rename expressed as an `Input` with
  chrome-stripping overrides; the type pill select re-toned from purple
  hexes to `accent` tokens), `CookbooksModal` search.

### Added

- `InputType` accepts `date`, `datetime-local` and `time` — AuditPage's
  filters and TypedDocumentForm's date widget needed them, and the primitive
  ships first.
- `Checkbox` accepts `id` and `name` for label association and form posts.

## [2.60.0] — 2026-08-20

Reachability follow-up to v2.53.0–v2.59.0: the primitives added during the
control migration are now exported, not just used internally.

### Added

- **Root exports:** `Checkbox` and `Slider` join the other form primitives
  on the root index — they were shipped, tested and used across the
  pipelines surfaces but unreachable to consumers.
- **`/pipelines` barrel exports the panel-building primitives:**
  `ConfigField`, `ConfigSection`, `NodeConfigShell`, `ToggleField`,
  `SamplePills`, `SourceImagePathField`. A host adding its own node type
  (the `nodeVocabulary`/`modelOptions` extension story) can now compose its
  config panel from the same parts the built-in panels use, instead of
  hand-rolling — which is how this whole migration started. Additive.

### Docs

- `CLAUDE.md` gains the 2026-08-20 hand-rolled-control survey: `pipelines/`
  done; per-area counts for the remaining trees (identity 11, ingest 8,
  doc-editor 8, social 7, …) so the next front is measured, not guessed.

## [2.59.0] — 2026-08-20

The control migration extended beyond the node panels: the pipelines list
surfaces (runs, DLQ, filter bars, pages) now use the composites too, and the
one missing primitive they needed ships with it.

### Added

- **`Checkbox`** (`forms/`) — with declarative `indeterminate`. The library
  shipped `Switch` and `RadioGroup` but no checkbox, so eleven call sites
  across the pipelines list surfaces hand-rolled
  `<input type="checkbox" className="w-3.5 h-3.5 accent-primary">` — the
  select-all headers additionally reaching into a ref to set
  `indeterminate`, since HTML only exposes the mixed state imperatively.
  A checkbox is *not* a Switch: a switch flips a setting; a checkbox marks
  selection and supports "some but not all". `onClick`/`onKeyDown`
  pass-throughs cover row-embedded usage (stopPropagation, shift-range
  selection). 5 tests.

### Changed

- **Converted to composites (11 files):** `RunsTable`, `PipelinesFilterBar`
  (which now takes `someVisibleSelected` instead of a `selectAllRef` — the
  ref plumbing existed only to set `indeterminate`), `DLQInspector` (its
  select-all also *gains* an indeterminate state it never had),
  `RunsFilterBar`, `DLQEntryCard`, `PipelineCard`, `PipelineRunsPanel`,
  `PipelineRunReplayPage`, `PipelineRunsPage`, `PipelinesPage`,
  `TemplatesModal`, `ExecutorLog`, `PendingApprovalsPage`,
  `PipelineEditorPage`.
- **`lint:node-controls` scope widened** from `pipelines/nodes/` to all of
  `pipelines/`. The node panels stay at zero; the 8 files still carrying a
  raw element are a *justified* baseline, each with its reason in the
  script — terminal-styled dev inspectors, an invisible a11y range over the
  custom replay timeline, an invisible test hook, in-canvas/inline editors.
  Justified exceptions are not unconverted debt, and the guard's pass
  message now says which it is.

## [2.58.0] — 2026-08-20

Audit round: the demo's static inline styles are gone, and the showcase
pages now demo the library's real components instead of fakes.

### Fixed

- **`DataDisplayPage` showcased chips, sparklines and skeletons using
  hand-rolled fakes.** `DemoChip` carried its own hex palette — a second
  `Record<color, hex>` that duplicated and disagreed with the tone scale,
  the exact drift rule 2 of the tones section exists to prevent —
  `DemoSparkline` reimplemented `Sparkline`, and `SkeletonRect`
  reimplemented `SkeletonCard`. A showcase that renders a fake of the
  component it documents teaches the copy-paster the wrong thing twice.
  All three now render the real composites.
- **`Sparkline`'s default stroke was `#646cff`** — Vite-template indigo,
  not this library's primary, and invisible to the tones guard because it
  is a string value rather than a utility class. Now
  `var(--color-primary)`, so it follows the host's brand.
- **`RealTimeEditingPage` and `InvokeDemo`** carried private hex palettes
  (architecture-diagram tints, a green/orange mode banner); both now use
  the tone tokens (`TONE_BG`/`TONE_BORDER`, `bg-success-bg` /
  `bg-caution-bg`, `toneVar`).

### Changed

- **`SkeletonCard` gains `rounded?: 'md' | 'lg' | 'full'`** — the
  avatar-placeholder (circle) case is what forced `DataDisplayPage` to
  hand-roll its own skeleton rect. Additive; default unchanged.
- **`lint:static-styles` now scans `demo/src` too, string-aware.** A naive
  grep said 46 demo files used `style={{}}`; the real number was 9 — pages
  like `LayoutPage` and `PatternsPage` only *display* inline-style JSX
  inside `code={\`...\`}` template literals. Occurrences inside strings
  no longer count, in either tree (which also retired one stale `src`
  allowlist entry). The 8 remaining demo files are allowlisted with
  per-line justifications; every one is runtime-derived only (cursor
  positions, per-datum colors, `toneVar`).

### Docs

- `CLAUDE.md` refreshed against measurements: demo static eradication
  complete; `src` inline-style count 131 → 97; the zero-test folders
  (`collaboration/`, `misc/`, `doc-types/`) are filled and no longer
  listed as gaps.

## [2.57.0] — 2026-08-20

**Hand-rolled-control migration complete. 28 files / 112 controls → 0 / 0.**

`npm run lint:node-controls` is now a plain rule rather than a ratchet: no
raw `<input>`/`<select>`/`<textarea>` anywhere under `pipelines/nodes/`. The
baseline is empty and must stay that way — if a panel needs something the
composites can't express, add the primitive to `forms/` and use it, the way
`Slider` and `ToggleField` were added during this migration.

### Added

- **`Slider`** (`forms/`) — range input with a built-in value readout
  (`readout` takes `false` or a formatter). Three panels each had their own
  `<input type="range">` with the readout stuck somewhere different. The
  readout is part of the component because a slider without numeric feedback
  is unusable at any real scale — "somewhere around the middle" is not a
  temperature.

### Changed

- **Converted (final batch):** `ApprovalConfig`, `CropConfig`,
  `TransformConfig`, `ScatterConfig`, `LLMConfig`, `AdjustLayerConfig`,
  `AdjustLayerSliderPanel`, `ForkConfig`.
- The copy-pasted `inputCls`/`labelCls`/`helpCls` constants are gone from
  every node panel but one, where a single local `helpCls` still styles
  italic caption text that isn't a form field.

### Fixed

- **`TransformConfig`'s "Preview" was two permanently disabled textareas**
  captioned "(preview not yet available)". They read as input fields the
  user had somehow failed to enable, rather than as a feature that doesn't
  exist yet. Replaced with the shipped `EmptyState`, which says so plainly.
  (Same class of dead UI as the `ConditionConfig` button removed in v2.53.0.)

### Tests

- `Slider` (6), `ToggleField` (4).

### Migration total

Across v2.52.0–v2.57.0: **112 hand-rolled controls removed**, 4 duplicate
`inputCls` definitions collapsed, `SamplePills` de-duplicated from 17 copies,
`SourceImagePathField` from 13, two hand-built tag editors replaced with the
shipped `TagEditor`, three new primitives added (`SourceImagePathField`,
`ToggleField`, `Slider`), and four pieces of dead UI removed.

## [2.56.0] — 2026-08-20

Hand-rolled-control migration, batch 4. **14 files / 51 controls → 8 / 21.**

### Changed

- **Converted:** `ActionConfig` (the worst offender at 9),
  `TransformGeoConfig`, `EditPromptConfig`, `VariationConfig`,
  `TriggerConfig`, `RetryPolicyEditor`.
- **`ActionConfig`'s "Retry up to N times" no longer nests a number input
  inside a radio `<label>`.** A control inside a label steals clicks meant
  for the option, so tabbing to the count and clicking it re-selected the
  radio. The count is now a separate field that appears when Retry is
  chosen, matching how `JoinConfig` handles `n_of_m`.
- **Image-edit model lists** (`image:edit`) moved onto the `modelOptions`
  seam, the last hardcoded lists in the node panels.

### Note on `border-[#dc2626]`

`TriggerConfig` styled its own invalid state with a raw hex, in three
places, rather than the `invalid` prop the `Input`/`Select` composites
already carry. That is the same class of drift as the `ConfigField` hexes
fixed in v2.55.0: arbitrary-value hexes are invisible to the tones guard,
which scans for palette *utility* classes. Converting the controls removed
all three.

## [2.55.0] — 2026-08-20

Hand-rolled-control migration, batch 3. **21 files / 88 controls → 14 / 51.**

### Added

- **`ToggleField`** (`pipelines/nodes/shared`) — a boolean setting with the
  control beside its label and help underneath. `ConfigField` stacks the
  label *above* the control, which is right for a text field and wrong for a
  toggle, so every panel needing one dropped out of the pattern and
  hand-rolled `<label><input type="checkbox">` instead — eight times across
  seven panels, each with its own `accent-primary w-3.5 h-3.5`. Built on the
  library's own `<Switch>`.

### Changed

- **Converted:** `VisionConfig`, `VisionClassifyConfig`,
  `VisionDescribeConfig`, `VisionExtractTextConfig`, `ResizeConfig`,
  `FormatConvertConfig`, `WatermarkConfig`.
  `VisionClassifyConfig`'s label list was a second hand-built copy of the tag
  editor already replaced in `VisionTagConfig`; both now use `<TagEditor>`.
  `VisionConfig` carried its own inlined suggestion-pill list — not even the
  `SamplePills` copy the other panels shared.
- **Vision model lists** moved onto the `modelOptions` seam
  (`image:vision`, `image:vision-analyze`, `image:vision-ocr`).
- **`FormatConvertConfig` now disables Quality when Lossless is on** and says
  so, rather than leaving an editable field whose value is discarded.

### Fixed

- **`ConfigField` errors are now announced.** The base wrapper every panel
  routes through rendered its error as a plain `<div>`, so a validation
  message was silent to a screen reader unless the individual panel had
  hand-rolled its own `role="alert"` — which only `VisionConfig` did.
- **`ConfigField` used raw hexes** (`text-[#dc2626]`) for its required marker
  and error text. Arbitrary-value hexes slip past the tones guard, which
  scans for palette *utility* classes. Now `text-danger-fg`.

## [2.54.0] — 2026-08-18

Hand-rolled-control migration, batch 2. **22 files / 94 controls → 21 / 88.**

### Fixed

- **Five vision panels imported a context-variable picker they never
  rendered.** `VisionConfig`, `VisionTagConfig`, `VisionDescribeConfig`,
  `VisionClassifyConfig` and `VisionExtractTextConfig` each imported
  `ContextVariablePicker` and destructured `paths`/`unresolved` from
  `useUpstreamContext`, then never used any of it — invisible because
  `tsc` isn't configured to flag unused locals.

  Checked against the executor before deciding what to do with it, and the
  answer was *not* "render the missing picker": `visionHandlerFactory`
  passes `systemPrompt` through **verbatim**
  (`buildSystemPrompt: (data) => data.systemPrompt ?? ''`), so a
  `{{context.*}}` token in a vision prompt reaches the model as literal
  text. Rendering the picker would have invited authors to insert tokens
  that never resolve. The dead code is removed and `VisionTagConfig` now
  says so in its help text instead.

### Changed

- **`VisionTagConfig` converted.** Its candidate-tag editor was hand-built
  — chip list, input, Add button, Enter handling — when the library already
  ships `<TagEditor>`, which is exactly that component. Wired with
  `lowercase={false}`, because candidate tags are a controlled vocabulary
  handed to the model and "Golden Retriever" has to survive as written.
  Its hardcoded model list now comes from `modelOptions['image:vision']`.

### Tests

- `VisionTagConfig` (10), covering the TagEditor integration, tag-case
  preservation, and the model seam.

## [2.53.0] — 2026-08-18

Hand-rolled-control migration, batch 1 of the debt recorded in v2.52.0,
plus a ratchet so it can only go one way.

### Added

- **`SourceImagePathField`** (`pipelines/nodes/shared`) — the "which image
  does this step operate on?" JSONPath field, with its upstream-ref
  suggestion pills. Thirteen image panels each rendered their own, and the
  copies had already diverged on whether the path is monospaced.
- **`npm run lint:node-controls`** — a ratchet over raw
  `<input>`/`<select>`/`<textarea>` under `pipelines/nodes/`. Files not on
  the baseline must have zero; a file above its baseline fails; and a file
  *below* its baseline also fails, asking you to lower the number, so the
  ratchet tightens instead of quietly going slack. Verified by mutation in
  both directions.

### Changed

- **`NumberInput` can express "unset".** `value` now accepts `undefined`
  (rendering an empty field), and a new opt-in `onClear` makes a field
  clearable. Before this, an optional numeric setting could be typed into
  but never emptied again — deleting the text silently left the old value,
  because `''` doesn't parse to a number. `onChange` keeps its
  `(value: number) => void` signature so no existing caller breaks.
  `GenerateConfig`'s seed was shipped with exactly this bug in v2.51.0 and
  is fixed here.
- **Converted to `ConfigField` + composites:** `SharpenConfig`,
  `DimensionsConfig`, `UpscaleConfig`, `AdjustBwConfig`, `JoinConfig`
  (raw radios → `RadioGroup`), `ForkConfig`, `ConditionConfig`.
  **28 files / 112 controls → 22 files / 94.**

### Fixed

- **`ConditionConfig` had a dead button.** A primary-styled "▶ Preview with
  sample context" sat at the bottom of the panel with an empty `onClick` —
  a Phase 1 stub that was never wired up. It looked like a real action and
  did nothing whatsoever when clicked. Removed rather than left advertising
  a feature that does not exist.

### Tests

- `NumberInput` (13) and `SamplePills` (5). The `forms/` primitives — the
  very composites every panel is supposed to use — had **no tests at all**
  before this.

## [2.52.0] — 2026-08-18

### Added

- **`SamplePills`** (`pipelines/nodes/shared`) — the one-click suggestion row
  under a path input. It existed as a private copy in **seventeen** config
  panels, byte-identical apart from formatting: seventeen chances to drift and
  no single place to fix a bug. Now exported once, with tests.

  It also renders **nothing** when there are no samples. Every inlined copy
  returned an empty flex wrapper whose `mt-1.5` showed as a stray gap under
  any input with no upstream suggestions to offer.

### Audit note — hand-rolled controls

Counted while auditing, and recorded here so the number is honest rather
than rediscovered: **28 files under `pipelines/nodes/` still hand-roll 112
raw `<input>`/`<select>`/`<textarea>` controls** instead of using
`ConfigField` + `Input`/`Select`/`Textarea`/`NumberInput`.

They share a copy-pasted `inputCls` constant which has already diverged into
**4 different definitions** across 17 files — so the same field renders
differently depending on which panel you open, and all four hardcode
`bg-white` rather than a surface token. This is the Chip/Badge tone
divergence from v2.39.0 repeating in a different guise.

`GenerateConfig` and `LLMConfig`'s selects were converted in v2.51.0; the
remaining files are being worked through in batches.

## [2.51.0] — 2026-08-18

Finishes the vendor-neutrality pass across the whole pipelines node surface,
and de-hand-rolls the two panels that were still doing their own controls.

### Added

- **`modelOptions` on the editor services seam** (+ `useModelOptions` and
  `useModelOptionsResolver`). Model lists were hardcoded in two panels — an
  AWS-only pair of image model ids in `GenerateConfig`, and a
  provider-keyed chat model map in `LLMConfig`. Both go stale the moment a
  host runs a different deployment or a provider ships a new tier. Hosts now
  replace any group (`image:generate`, `llm:<provider>`) without restating
  the rest; the shipped lists remain as defaults so the editor works unwired.

  An explicitly empty list is honoured rather than treated as "unset" —
  "this host runs no image models" is a real answer.

### Changed

- **`GenerateConfig` no longer hand-rolls its controls.** It rendered raw
  `<textarea>`, `<select>` and `<input type="number">` styled by three shared
  class-string constants, instead of the
  `ConfigField`/`Textarea`/`Select`/`NumberInput` composites every other
  panel uses — the exact drift the library exists to prevent. It also now
  defaults the selection to the *first offered* model rather than a
  hardcoded id, which with a host-supplied list may not be in the list at all.
- **`LLMConfig`'s two `<select>`s** likewise become the `Select` composite,
  dropping a raw `bg-[#f9fafb]` hex along the way, and gain the `aria-label`s
  that made them testable.
- **`docsContent.tsx` no longer names a backend** for the agent,
  knowledge-base, graph-query, memory, guardrail and image-generate nodes.
  The one remaining mention is deliberate: `provider: 'bedrock'` is a frozen
  field *value* that literally means AWS Bedrock, so documenting it as such
  is correct.

### Tests

- The vendor scan now walks **every** `.tsx` under `pipelines/nodes/`
  (~78 files) instead of a hand-listed three, so a new panel is covered the
  day it lands rather than the day someone remembers to add it. Three files
  are allowlisted where the vendor name is a genuine data *value*, and a
  "guards the guard" case fails if the walk ever stops finding files.
- `modelOptions` (11) — defaults, host replacement, per-group isolation,
  empty-list semantics, and the provider-switch path, which has to read the
  **incoming** provider's list to decide whether the current model survives.
  `LLMConfig` had no tests at all before this.

## [2.50.0] — 2026-08-18

Vendor neutrality, and the memory node's editor/executor contract.

### Added

- **`nodeVocabulary` on the editor services seam.** The library ships
  vendor-neutral copy for node config fields; a host that IS running a
  specific backend supplies its own wording per node type and per field
  (`labels` / `help` / `placeholders`) and gets the vendor-accurate UI it
  wants. New `useNodeVocabulary(nodeType)` hook; it reads the context
  directly, so panels stay renderable with no services provider mounted.

  This follows the same reasoning as the existing `executableNodeTypes`:
  which backend stands behind a node type is a property of the **host's
  deployment**, not of the component library. Baking a vendor's name into a
  shared primitive makes the library wrong for every host that uses a
  different one, and it can't be corrected without a breaking change to a
  frozen surface.

### Changed

- **`KnowledgeBaseConfig`, `GraphQueryConfig` and `MemoryConfig` no longer
  name a vendor.** "Bedrock Knowledge Base" → "knowledge base", "Neptune
  cluster/graph" → "graph", "openCypher query" → "Graph query", "AgentCore
  Memory" → "memory". All of it is overridable through `nodeVocabulary`.
  A test scans these panels' non-comment source for vendor terms so the
  neutrality can't quietly regress.

### Fixed

- **The memory node's advertised output didn't match what runs.**
  `contextContributions` described a memory node as contributing
  `steps.<id>.output` — an **array**, "Records read from memory". The
  handler returns an **object**, and the recalled value sits at `.value`,
  which the picker never offered at all. A downstream author could not
  select the thing they had just stored, and anything they did select was
  silently empty at run time. Read and write now advertise their real,
  separate shapes (`value`/`found`/`key` vs `written`/`key`).

### Tests

- `nodeVocabulary` (10) — neutral defaults, host overrides, per-field
  fallback, and no-provider rendering.
- **Bidirectional contract for the memory node** (8 here, 12 in
  platform-api). Both repos assert against one shared fixture, in both
  directions: that the config shape the panel produces is exactly what the
  handler reads, and that every path the picker advertises actually exists
  in the handler's output. A one-directional test passes while the two
  halves disagree — and that failure shows up as silently wrong data at run
  time rather than as a build error.

## [2.49.0] — 2026-08-18

Group C node configuration: the two nodes whose panels read
"coming in Phase C".

### Added

- **`KnowledgeBaseConfig`** — configuration for the `knowledge-base` node
  (RAG retrieval from a Bedrock Knowledge Base): knowledge base id, query
  template, top-K, score threshold, output key and retry policy. The query
  template gets the upstream-context picker and the unresolved-path warning,
  because a typo'd `{{context.*}}` path there silently embeds and searches for
  the literal text of the template.
- **`GraphQueryConfig`** — configuration for the `graph-query` node (Neptune
  openCypher): graph id, query, bind parameters, timeout, output key and retry
  policy. Parameters are edited as rows rather than a raw JSON blob — a
  malformed blob is only discovered at run time, and a user who cannot add a
  parameter row will interpolate values into the query string instead, which
  is how you get an injection into a graph database. For the same reason the
  context picker appends to a parameter value rather than to the query.

Both are wired into `ConfigPanel` and removed from
`NODE_TYPES_WITHOUT_CONFIG`, which is now down to five inert node types
(`agent`, `mcp-tool`, `guardrail`, `policy`, `ag-ui-output`).

### Fixed

- **A colliding parameter rename silently destroyed a binding.**
  `GraphQueryConfig` stores parameters as a `Record<string, string>`, so
  renaming row `b` to `a` overwrote `a`'s value *and* dropped a row, with no
  indication. The rename is now refused with an explanation. (Caught writing
  the test for a duplicate-name warning that, it turned out, could never
  fire — a `Record` cannot hold duplicates.)

### Tests

- `KnowledgeBaseConfig` (9), `GraphQueryConfig` (12), including the boundary
  cases where a falsy check would be wrong: `topK` at 1 and 100, and a
  `scoreThreshold` of `0`, which means "keep everything" rather than "unset".

### Consumer note

The matching executor support for the `memory` node (v2.48.0) ships in
`platform-api` under `src/pipeline/memory/` — see its
`docs/memory-PROVISIONING.md`. `knowledge-base` and `graph-query` still have
no executor handler, so those nodes configure but do not yet run.

## [2.48.0] — 2026-08-18

Group B node configuration, and two canvas bugs the new e2e coverage exposed.

### Added

- **`MemoryConfig`** — configuration panel for the `memory` node (AgentCore
  Memory read/write): mode, scope, namespace, key expression, value field and
  output key, with the upstream-context variable picker wired in so key and
  value expressions can be built from what actually reaches the node.
- **`PipelineCanvas` refits on resize.** The canvas is a `flex-1` column
  between the palette and the config panel, so it is resized constantly —
  opening the config pane, collapsing the palette, resizing the window. The
  `fitView` prop only fits once, on init, so the viewport kept a fit computed
  for a width that no longer existed. A `ResizeObserver` now refits, but only
  while the viewport is still the one the editor chose: once the user pans or
  zooms it is theirs, tracked via `onMoveStart` (React Flow passes a null
  event for programmatic moves, so a non-null event is a real gesture).

### Fixed

- **`image-source` and `image:save` config panels were unreachable.** Both
  components existed and were complete, but `ConfigPanel` still mapped their
  node types to `PlaceholderConfig`, so selecting either node showed
  "coming soon" instead of the panel that was already shipped. Wired both and
  removed them from `NODE_TYPES_WITHOUT_CONFIG`.
- **Half the pipeline graph was invisible.** React Flow's default `minZoom` is
  `0.5` and `fitView` will not zoom out past the flow's `minZoom`. A pipeline
  is far wider than the canvas column at 0.5, so the fit silently *clamped*
  rather than fitting — and because the ReactFlow root is `overflow: hidden`,
  the overflow was clipped with no scrollbar and no indication anything was
  missing. Six of the seeded demo's twelve nodes were off-screen; the editor
  read as broken. `minZoom` is now `0.1` with matching `fitViewOptions`.
- **`useUpstreamContext` threw outside `PipelineEditorProvider`.** It called
  `usePipelineEditor()`, which throws when no provider is mounted, so any
  config panel using the context picker could not render in a test, a story,
  or a standalone settings view. It now reads the context object directly and
  treats "no editor" as "no upstream context to offer", matching the existing
  precedent in `PipelineRunsContext`.
- **The pipeline-editor demo reseeded on every visit.** `useDemoPipelineId`
  looked for a pipeline named `'Content Moderation'` while
  `createDemoPipeline` names its result `'Document Summary Pipeline (Demo)'`.
  The lookup never hit, so each visit wrote another identical pipeline to
  localStorage.

### Tests

- `MemoryConfig` (6), `PipelineCanvas` fit configuration (4).
- `tests/e2e/pipeline-demo.spec.ts` rewritten against the real editor — the
  old spec asserted against the removed mock simulation. It now covers the
  seeded graph rendering, palette search, **drag-and-drop from the palette
  onto the canvas**, node selection opening the real config panel, the
  no-clipping invariant above, and seed reuse across visits.

## [2.46.0] — 2026-08-18

Docs-shell layout and navigation, all four reported from using the demo.

### Fixed

- **`/workflows` rendered a blank page.** `PagesOverviewPage` looked up the nav
  section by `id === 'pages'`, which the IA restructure renamed to
  `'workflows'`. The lookup returned `undefined` and the component
  `return null`ed. It now resolves `'workflows'` (falling back to `'pages'`) and
  renders a visible message instead of nothing if neither is found, so a future
  rename degrades to a list rather than an empty screen. 26 cards render again.

- **The page stretched to the height of the nav.** `DocsShell` used
  `min-h-screen`, so nothing was height-bounded: `overflow-y-auto` on `<main>`
  never engaged and a tall sidebar dragged the whole document down with it. The
  shell now owns the viewport (`h-screen` + `overflow-hidden`) and the sidebar,
  main pane and right rail each scroll independently. Verified in-browser:
  document height now equals viewport height.

- **Navigation left you mid-page.** With `<main>` as the scroll container rather
  than the window, the browser's own scroll restoration no longer applies, so
  following a nav link kept the previous page's scroll offset. `DocsShell` takes
  a `scrollResetKey` (pass the pathname) and returns the content pane to the top.

- **Nav groups repeated their own item.** A one-item group whose label matched
  the item rendered the same words twice in a row — "Social & Chat" as a header
  above "Social & Chat" as the link. Eight groups were shaped that way. The
  header is now omitted when it carries no information; multi-item groups and
  differing labels are untouched.

### Changed

- The demo sidebar starts with only the active section expanded
  (`defaultCollapsedSections`), so the nav no longer buries the item you clicked.


## [2.45.2] — 2026-08-17

Two instances of the same root cause: `useState(() => derive(props))` runs once
per mount, but both components stay mounted while the prop they derive from
changes.

### Fixed

- **Attachments leaked between documents.** `AttachmentsPanel` seeded its list
  with a lazy initialiser, and `EditorModeSwitch` keeps the panel mounted while
  `documentId` changes. So switching documents kept showing the previous
  document's attachments — and because `persist` writes to the *current*
  document's storage key, adding a file to document B wrote document A's list
  into B's storage. Confirmed by test: B's key ended up holding
  `['a-spec.pdf', 'b-new.pdf']`.

  The list now reloads when `documentId` changes, and the mutators read from
  storage rather than from state, so a write can never be based on another
  document's list (or a stale copy from another tab).

- **Config panels kept the previously selected node's UI state.** `ConfigPanel`
  renders `<Config data={node.data} …/>` — same component type, same tree
  position — so React reuses the instance across node selections.
  `ApprovalConfig` infers its time unit once from `data.timeoutMs`: select a
  node stored in hours, then one stored in minutes, and the second rendered
  "0 hours" for a 5-minute timeout. Nudging that 0 to 1 wrote 3,600,000 —
  silently changing the node from 5 minutes to 1 hour.

  Fixed at the dispatch site rather than per panel: the config is now keyed by
  node id, so selecting a different node resets local UI state in **every**
  panel. Six config panels hold prop-seeded state.

### Checked and found correct

- Focus timers in `CommentThread` and `SectionComments` — event handlers with
  optional chaining, and React nulls refs on unmount.
- Lazy initialisers elsewhere (`NodePalette` recents, `SourcesPage`,
  `PipelineRunsPage` selection, `ResumeCallDialog`) — seeded from constants or
  storage that is not prop-scoped, so they do not go stale.


## [2.45.1] — 2026-08-17

### Fixed

- **Review items could be acknowledged or rejected more than once.**
  `ReviewableItem` defers `onAck`/`onReject` by 150ms so the pulse animation
  can play, but nothing guarded that window: the buttons stayed live, so a
  double click sent two acks for the same item. Confirmed by test — three
  clicks produced three `onAck` calls.
- **The deferred submit outlived the row.** The timer was never cleared, so a
  review list that re-rendered or unmounted mid-animation still fired
  `onAck`/`onReject` against an item the user could no longer see.

  Both fixed with an in-flight flag plus timer cleanup. The action buttons now
  disable during the window and carry a visible affordance, rather than looking
  live while silently ignoring clicks.

### Checked and found correct

Recorded so the next pass doesn't re-investigate:

- The document-events `unsubscribe` on disconnect — `useWebSocket.sendMessage`
  no-ops unless `readyState === OPEN`.
- Focus timers in `CommentThread` and `SectionComments` — they are in event
  handlers and use optional chaining, and React nulls refs on unmount, so
  `?.focus()` is already a safe no-op.
- `DocumentEditorPage`'s video-host attach interval — correctly cleared, with a
  2s stop timer that is also cleared.
- `VideoCallPanel`'s `srcObject` effects and its call-state transition effect.


## [2.45.0] — 2026-08-17

### Fixed

- **New documents could end up with every section duplicated.** The
  auto-populate effect guards on `meta.templateApplied` and
  `sections.length === 0`, but neither is a lock: `templateApplied` is a Y.Map
  key (last-write-wins, not compare-and-set), and both clients read an empty
  section list before either has written. Two people opening the same new
  document at once therefore both applied the template, and `addSection` pushes
  onto the shared Y.Array with no dedupe — so the document got two of
  everything, with different random UUIDs so nothing could tell them apart
  afterwards.

  Fixed by making the operation **idempotent** rather than trying to make it
  exclusive, which CRDTs do not offer:
  - `templateSectionId(documentId, fieldName)` derives a stable id, so
    concurrent appliers produce the *same* ids.
  - `dedupeSectionsById(ydoc)` keeps the first occurrence of each id and runs on
    every client after sync. Post-merge Y.Array order is identical everywhere,
    so "keep the first" is convergent — each client computes the same deletions
    with no coordination, and nothing is lost to a double delete.

  The repair pass also heals documents that were already duplicated.

- **Follow-mode scheduled scroll/highlight timers it never cancelled.** The
  effect re-runs on every `participants` change — constant in a live session —
  so an uncancelled scroll kept firing after the user stopped following or left
  the page.
- Removed a dead loop in the same effect that iterated every peer's awareness
  state and did nothing with it, on every participants change.
- `NewDocumentModal`'s focus timer is cleared on close; an uncancelled one lands
  on a hidden input and steals focus back.

### Added

- `src/hooks/templateSections.ts` with 9 tests, including one that reproduces
  the duplication with two synced `Y.Doc`s and one that shows both clients
  converging on a single copy after an independent repair.


## [2.44.2] — 2026-08-17

Lifecycle bugs in the two areas with the most reported trouble. Both files were
among the largest with **no tests at all**.

### Fixed — doc-editor

- **Ghost cursors.** `TiptapEditor` published the local caret into awareness on
  every selection change, tagged with `sectionId`, but unmount only removed the
  `selectionUpdate` listener — it never cleared the `cursor` field. The caret
  survived pointing into a section that no longer existed, and peers kept
  drawing it until awareness timed out, or indefinitely if the author simply
  stopped moving. Cleanup now clears the field, and only that field, since
  awareness is shared with identity/presence.
- **Carets filtered against a stale section.** `updateCursors` read `sectionId`
  but omitted it from its dependency list, so after a section id change the
  filter compared against the id the callback was created with.
- **Carets positioned against the wrong element.** The overlay received
  `editorAreaRef.current` read during render, which is null on the first pass;
  `getCoords` then fell back to `view.dom`, offsetting every remote caret until
  an unrelated re-render happened to pick up the node. Now a callback ref into
  state.

### Fixed — hangout

- **Screen share that could never be stopped.** `startScreenShare` awaits
  `getDisplayMedia`, which stays pending while the OS window-picker is open —
  easily long enough for the user to leave the call. Nothing guarded the
  resolution, so the stream was assigned to a ref after teardown had already
  run: the capture stayed live with no UI left to stop it, and the browser kept
  showing the "sharing your screen" indicator. Both awaits in the callback now
  check a component-lifetime mount flag and release the stream.

### Added

- `TiptapEditor.awareness.test.tsx` (4 cases) and
  `useHangoutEmbed.test.ts` (5 cases) — the first tests either file has had.
  Both were written to fail against the old code first.


## [2.44.1] — 2026-08-17

### Fixed

- **A document editor no longer pulls in a video-broadcast SDK.**
  `useHangoutEmbed` statically imported `amazon-ivs-web-broadcast`, which put it
  in the module graph of anything reaching that hook — including
  `…/doc-editor`, because `DocumentEditorPage` imports `VideoCallPanel`, which
  imports the hook. The panel is only *rendered* behind
  `state.showVideoCall`, but a static import is paid regardless.

  The SDK is now dynamically imported (memoized at module scope, mirroring how
  `RecordingPlayer` loads `hls.js`), and the type-only imports are `import
  type` so they erase at compile time. `dist/doc-editor.js` no longer
  references the SDK at all; it is isolated in its own lazily-loaded chunk.

  This also resolves the 2.40.1 **Known** issue: `import
  '@connorhoehnslalom/ui-components/doc-editor'` previously failed under Node
  ESM because the SDK is CommonJS-only. **All 12 export subpaths now import
  cleanly under Node ESM** (was 11 of 12), verified against a packed tarball.

  `stopScreenShare` became `async` as a result — it awaits the SDK before
  constructing a `LocalStageStream`.


## [2.44.0] — 2026-08-17

### Added

- **`executableNodeTypes` on `PipelineEditorServices`** — the host declares
  which node types its executor can actually run, and the palette and node
  cards mark the rest as **preview**.

  The palette ships more node types than any given backend implements: a survey
  against platform-api found **11 of 37 with no discoverable handler** (`agent`,
  `approval`, `policy`, `guardrail`, `graph-query`, `ag-ui-output`, `mcp-tool`,
  `knowledge-base`, and the control-flow trio `condition`/`fork`/`join`). An
  author could drag one on, wire it up, and get a pipeline that silently never
  ran that step.

  The library deliberately does **not** hardcode the set. Which types execute is
  a property of the *host's deployment*, not of a component library, and a baked
  guess goes stale the moment a handler ships — so it is a seam, not a list.
  Omit the field and nothing is marked (pre-2.44 behaviour).

  Marking informs rather than blocks: a preview type is still draggable, and the
  tooltip states the consequence ("the step will not run") rather than just
  labelling it. An empty array means *nothing* executes, which is distinct from
  omitting the field.

- `useIsNodeTypeExecutable()` exported from `…/pipelines`.
- `BaseNode` takes an optional `nodeType` so a placed card can mark itself —
  more important than the palette entry, since by then the author has already
  committed to the node.


## [2.43.0] — 2026-08-17

Node-editor authoring for LLM and vision workflows now reflects the real graph.

### Fixed

- **The LLM prompt editor offered four invented context paths.** `LLMConfig`
  shipped a hardcoded `VARIABLES` list (`context.doc.body`, `context.doc.title`,
  `context.trigger.userId`, `context.steps`) and a `SAMPLE_CONTEXT` of
  lorem-ipsum, regardless of what was upstream. Authoring against
  `trigger → transform → llm` still suggested `context.doc.body`, which no step
  writes. The panel looked capable while its context awareness was fiction, and
  a template referencing a non-existent path failed at run time with no
  authoring-time signal.

- **18 image/vision panels hardcoded fake JSONPath image refs** —
  `$.steps.upload.output.imageId`, `$.steps.crop.output.imageId`,
  `$.steps.visionAnalyze.output.extracted.regions[0].bbox` — naming nodes that
  need not exist in the user's graph. Picking one produced a reference that
  silently resolved to nothing.

Both now derive from the node's actual position in the graph.

### Added

- `context/upstreamContext.ts` — pure, no React, 28 tests:
  - `upstreamNodeIds` — strict ancestors, nearest first, cycle-safe
  - `contextContributions` — what each node type writes into context, honouring
    `outputKey` when set
  - `availableContextPaths` — every `{{context.*}}` path reachable at a node
  - `availableImageRefs` — upstream image producers as JSONPath, plus the
    always-present `$.trigger.imageRef` and a scatter parent when one is upstream
  - `unresolvedTemplatePaths` — **the authoring-time signal that was missing**:
    paths a template references that nothing upstream provides. Accepts leaves
    under an available object, since payload shape is caller-defined.
- `useUpstreamContext(nodeId)` / `useUpstreamImageRefs(nodeId)` — bind the above
  to the live editor graph.
- `ContextVariablePicker` — insertable pills tinted by value kind, an
  unresolved-path warning, and a "where each value comes from" disclosure that
  can reveal the producing node. Shared rather than inlined, since LLM, vision
  and transform panels all author templates.
- `ConfigPanel` now passes `nodeId` to every config panel; without it a panel
  can only guess at its context.


## [2.42.0] — 2026-08-17

### Added

- **Four neutral-role tokens**, completing the ramp so the greys have somewhere
  semantic to live:
  - `--color-border-subtle` (#f1f5f9) — hairline divider inside a card
  - `--color-surface-emphasis` (#e2e8f0) — stronger inset than surface-hover
  - `--color-surface-inverse` (#0f172a) + `--color-text-inverse` (#f8fafc) —
    dark surfaces (code blocks, terminals) and their text

### Changed

- **The last 248 grey palette occurrences are tokens.** `src/` and `demo/src`
  now contain **zero** raw Tailwind palette colours of any family, hue or grey.
  Combined with 2.40.0's 510 and the earlier 712 exact-match greys, ~1,470
  hardcoded colours are gone.

  `text-slate-700/800` collapse onto `text-text-primary`: usage analysis showed
  they are headings (h1/h3), labels and emphasis spans, so the darkest text role
  is the correct home. Two shades becoming one is intentional — fewer variants,
  one ramp.


## [2.41.0] — 2026-08-17

### Fixed

- **`ThemeProvider` did nothing.** It wrote only `--ui-*` custom properties,
  which no Tailwind utility reads, so `<ThemeProvider theme={{ primary: 'red' }}>`
  was silently inert — while `ThemingPage` documented it as *the* theming API
  with copy-paste samples. It now also writes the real `--color-*` / `--radius-*`
  tokens for every key with a semantic counterpart (see `THEME_TOKEN_ALIASES`),
  and still writes `--ui-*` so existing `cssVar()` callers keep working.

- **The light preset was a stale fork of the palette** — a sixth colour system.
  Six of ten mapped colours disagreed with `src/styles.css` (`primary` #3b82f6
  vs #646cff, `success` #10b981 vs #16a34a, `warning`, `info`, `textPrimary`,
  `textSecondary`). That only became dangerous once the provider started
  writing real tokens: mounting `<ThemeProvider>` with no overrides would have
  silently rebranded the app. `lightTheme` now mirrors the stylesheet, and a
  test pins it.

- **The documented `mode` prop does not exist.** Every `ThemingPage` sample used
  `<ThemeProvider mode="light">`; the prop is `preset`. Copy-pasting the docs
  produced a no-op. Fixed, and the page now documents the tone-override path.

### Added

- **`tones` prop** — the recommended rebrand path, matching what every tinted
  surface actually reads:

  ```tsx
  <ThemeProvider tones={{ accent: { base: '#0d9488', bg: '#f0fdfa' } }}>
  ```

  Omitted roles keep their default. Equivalent to overriding
  `--color-accent{,-bg,-fg,-border}` in CSS.
- `toneCssVarName`, `THEME_TOKEN_ALIASES`, `ToneRole`, `ToneOverride` exported
  from `…/theme`.
- `ThemingPage` gained a "Rebranding a tone" section covering both the plain-CSS
  and the runtime route.

### Known

- `preset="dark"` is **partial**: it re-tones text/surface/border and the
  semantic colours, but the token set has no dark-specific palette, so surfaces
  are not fully dark-mode-ready. Documented as a starting point rather than
  presented as finished.


## [2.40.1] — 2026-08-17

Packaging fixes. Nothing in this release is visible in-repo — all four bugs
were found by packing a tarball and installing it into a scratch project, the
way a consumer actually gets the library. In-repo everything resolved from
devDependencies, which is exactly why they survived this long.

### Fixed

- **`import … from '@connorhoehnslalom/ui-components'` crashed at runtime.**
  The root bundle statically imports `amazon-cognito-identity-js`, which was
  externalised in `vite.config.ts` but never declared, so a consumer got
  `ERR_MODULE_NOT_FOUND` on the root import. Eight undeclared runtime deps in
  total: that one, `amazon-ivs-web-broadcast`, `hls.js`, and six `@tiptap/*`
  extensions (only `@tiptap/react` had been declared).

- **Every consumer's `tsc` failed on the root import.** `dist/index.d.ts`,
  `dist/hooks.d.ts` and `dist/doc-editor.d.ts` import `y-protocols/awareness`
  and `lib0/observable`; neither package was declared, so consumers got TS2307
  regardless of which symbol they imported. Both are now peers.

- **13 of 15 export subpaths could not be `require`d.** Each declared only
  `types` and `import`, so CJS consumers and older bundler/Jest setups could
  reach nothing but the root — even though the build ships a `.cjs` for every
  subpath. All 13 now declare `require`.

- Added `./package.json` to `exports`; build tooling and version probes read it.

`peerDependencies` went from 8 entries to 19. The ones a consumer can skip
when they don't use that surface are marked optional in
`peerDependenciesMeta`, so they are discoverable without being mandatory.

### Added

- `src/__tests__/packaging.test.ts` — a guard for all of the above: every
  runtime import in `dist/` and every type import in `dist/**.d.ts` must be
  declared, every export subpath must ship `types`/`import`/`require` and each
  target must exist on disk, and `./package.json` must be exported.

### Known

- `import '@connorhoehnslalom/ui-components/doc-editor'` fails under **Node**
  ESM because `amazon-ivs-web-broadcast` is CommonJS-only with no `module`
  field. Bundlers handle the interop and the demo's production build succeeds,
  so this affects Node-side smoke tests, not browser consumers.
- `/doc-editor` pulling in a video-broadcast SDK at all is a chunking smell
  (`VideoCallPanel` → `useHangoutEmbed`), pre-existing and untouched here.


## [2.40.0] — 2026-08-17

### Changed

- **Every raw Tailwind palette colour in the codebase is now a tone token.**
  354 occurrences across the 91 baselined files in `src/components`, plus
  `src/renderers`, `src/integrations`, all `.stories.tsx`, and 155 more in
  `demo/src`. Converted by family→tone and shade→role: green/emerald→success,
  red/rose→danger, amber/yellow→warning, blue/sky→info, indigo→primary,
  orange→caution, purple/violet→accent.

  Scope went past `bg`/`text`/`border` to `ring`, `fill`, `stroke`, `divide`,
  `outline`, `accent`, single-side borders and gradient stops — a focus ring
  and an SVG fill are semantic choices too, and `ring-blue-500` appeared 21
  times.

  `src/` and `demo/src` now contain **zero** raw palette colours, so
  overriding a tone's four CSS variables re-themes the whole library and every
  demo.

- The tone guard is now **zero tolerance**: the 91-file baseline and
  `scripts/tone-palette.allowlist.txt` are deleted, and it scans all of `src/`
  including stories.

- ~30 test assertions pinned raw palette classes — they were locking in the
  drift they should have caught. They now assert tone classes, and their titles
  say "success tone" instead of "emerald".


## [2.39.0] — 2026-08-17

### Added

- **A single semantic tone scale — the library's branding scheme.**
  Seven tones (`neutral`, `success`, `warning`, `danger`, `info`, `caution`,
  `accent`), each with four roles: `--color-{tone}`, `-bg`, `-fg`, `-border`.
  A consumer rebrands a tone by overriding four CSS variables and every
  surface in the library follows. New `src/components/shared/tones.ts` is the
  one place that maps tones to classes, exported from `…/shared`
  (`TONE_SOFT`, `TONE_SOLID`, `TONE_SOLID_BG`, `TONE_BORDER`, `TONE_TEXT`,
  `TONE_BG`, `toneKey`, `toneVar`, `Tone`, `TONES`).
- `Avatar` gains `initials` — it derived them from `name`, turning a canonical
  "AS" into "As", which forced callers holding real initials to hand-roll the
  circle.
- `AvatarGroup` gains `items` (per-person name/initials/color/src) and
  `total`. It only accepted `names: string[]` and hashed every colour, so
  presence UIs with per-user brand colours could not use it at all.
- `ViewerCount` gains `className`; `style` is deprecated.
- `Chip` gains the `accent` tone; `purple` is deprecated but still compiles.

### Fixed

- **Three components each carried their own colour palette and they
  disagreed.** Chip's success was `green-50`/`green-600`, Badge's was
  `emerald-100`/`emerald-700`, and StackDiagram had a third set — so the same
  semantic state rendered in different hues depending on which component you
  used. All three now resolve through `tones.ts`.

  All three shift appearance slightly, Chip included. Chip's literals looked
  like an exact match for the tokens (`green-50`/`green-600` vs
  `--color-success-bg: #f0fdf4` / `--color-success-fg: #16a34a`) — but those
  hex values are the Tailwind **v3** palette, and v4 defines `green-600` as
  `oklch(62.7% .194 149.214)`, which renders a few sRGB units off the hex.
  So the old classes and the tokens were never the same colour. Badge and
  StackDiagram change more, since their palettes differed outright.
- **The demo forked the design tokens.** `demo/src/App.css` held a verbatim
  copy of the `@theme` block that had drifted 26 tokens behind — including
  every `--color-cat-*` and `--font-code`, so components using those rendered
  unstyled in the demo while looking correct in Storybook. It now imports
  `src/styles.css`, which is also the documented consumer on-ramp.

### Known

- `src/theme/` (`ThemeProvider`) injects `--ui-*` variables that no Tailwind
  utility reads, and its preset values disagree with the `@theme` tokens. It
  is a disconnected fourth colour system; reconciling it is open work.


## [2.38.1] — 2026-08-16

Internal only — no public API change. Every npm script in the repo now
passes; before this, three of them did not.

### Fixed

- **`npm run lint:static-styles` passes again** (was exiting 1). 42 files
  had drifted past the allowlist, so the guard against inline-style
  regressions was permanently red and therefore ignored. Triaged all 42
  against `TAILWIND_MIGRATION.md`: **converted 23**, allowlisted 19 that
  are genuinely runtime-derived (each with an inline note saying why).
  The conversions include 17 React Flow `<Handle>` port overrides, now
  `!bottom-2 !top-auto` / `!top-[75%]` — matching the `!top-[60%]` already
  used by the older nodes; the `!` is what beats React Flow's own
  stylesheet. Verified in `dist/ui-components.css` that these emit
  `top:75%!important`, the same shape as the pre-existing rule.
  Two bugs in the checker itself also fixed: it matched non-source files
  (a JSX sample in a README counted as a violation), and its allowlist
  parser broke on trailing `# why` comments.

- **`npm run build-storybook` passes again** (was failing outright on
  `"useRoomOccupancy" is not exported by …/dist/client/hangout-rooms`).
  realtime-modules ships a CJS dist whose named exports Rollup can't see.
  `.storybook/main.ts` now aliases the package to its TS source, the same
  workaround `demo/vite.config.ts` uses, merged onto the inherited root
  aliases so `@` and `@schemas` keep working.

### Added

- `hls.js` and `amazon-ivs-web-broadcast` as devDependencies. Both were
  undeclared optional deps that `RecordingPlayer` and `useHangoutEmbed`
  reach for, which meant 4 demo routes could not run locally. With them
  installed the **e2e suite is 100 passed / 0 skipped** (was 96/4), and
  the demo production build works for the first time. Both remain
  `external` in the lib build — verified absent from `dist/index.js` and
  `dist/video.js`, so the shipped bundle is unchanged.

## [2.38.0] — 2026-08-16

### Added

- **`ChatMessage` is now exported from `…/hooks`.** The type appears in
  `ChatPanel`'s public props but no barrel re-exported it, so consumers
  could not name it (`src/hooks/index.ts` exported only the `useChat`
  value). Additive — no existing import changes.

### Fixed

- **`npm run lint` now typechecks `demo/` as well as `src/`.** The root
  `tsconfig.json` includes only `src`, so nothing ever ran
  `demo/tsconfig.json`. The gate reported 0 errors while the demo app had
  5 real type errors, one of which broke a route at runtime. Five fixes
  landed with the gate change:
  - `hook-capability-integration` named-imported `Switch` from a deep
    `@/components/shared/Switch` path, but `Switch.tsx` only has a default
    export — `/workflows/hook-capability` rendered a blank page. Now
    imports from the `…/shared` barrel.
  - `hook-hangoutrooms-integration`'s mock `subscribeRoomsIndex` emitted
    `RoomOccupancy[]`; the real adapter delivers one room per call. The
    mock now fans the snapshot out row by row.
  - `wrapped-components` imported the previously unexported `ChatMessage`.
  - `CallWidgetPage` and `call-widget-live` called `useRef()` with no
    argument (required under the React 19 types).

- **Demo e2e suite restored: 96 passing, 4 skipped, 0 failing** (was 67
  passing / 23 failing / 11 skipped). The failures were stale specs, not
  product regressions — see the spec files for per-case notes:
  - Four specs still targeted the pre-restructure demo IA (`/demo/*`,
    `/pages/*`); repointed at the canonical `/workflows/*` and
    `/components/*` routes.
  - `catalog` and `pipeline-demo` locators hit strict-mode violations
    because the docs sidebar repeats the catalog's filter-chip labels;
    scoped to the main region. `Runs` became a `role=tab`, not a button.
  - `shared-demo` now covers `/components/feedback`. Its modal/toast/banner
    *interaction* cases are not ported: that page renders hand-rolled
    preview `div`s instead of mounting the real components.
  - Retired the `SKIP_RM` skips — realtime-modules resolves again, so the
    seven hook-integration routes are smoke-tested for real.
  - Dropped the phantom `/workflows/pipeline-runs` entry: `PipelineRunsPage`
    is exported but the demo app never routed it.

## [2.37.0] — 2026-06-11

### Fixed

- **`image-source` is now reachable from the trigger.** The node was a
  pure source (no input handle), so `trigger → image-source` couldn't be
  drawn and the executor (which only traverses from the trigger) marked
  image-source — and everything downstream — as `skipped`. But the
  backend handler + executor have always supported `trigger →
  image-source` (its default `mode:'trigger'` reads `$.trigger.imageRef`;
  `VisionPipelineE2E` wires `trigger → image-source` via `targetHandle:
  'in'` and passes). The UI contradicted the tested contract. Added the
  `'in'` target handle to `ImageSourceNode` and set
  `INPUT_HANDLES['image-source'] = ['in']` in handleCompatibility, so
  `trigger → image-source → …` pipelines build and run. No executor
  change — purely aligning the node UI with the backend.

## [2.36.0] — 2026-06-11

### Added

- **Two new pipeline image node types — `image:dimensions` and
  `image:upscale`** (additive; mirrors the existing Sharp/generative
  image nodes). Both ship a canvas node + config panel, register in
  `nodeTypes`, the node category map, the palette, the editor
  default-data factory, the config-panel dispatch / docs, the step-timeline
  colour maps, and the handle-compatibility table.
  - **`image:dimensions`** (category `transform`, icon `📐`). Reads a
    source image and emits dimension data
    (`width`/`height`/`aspectRatio`/`genWidth`/`genHeight`) into context —
    it does **not** output an image. Handles: image-in `in`, data-out
    `out`, error `error`. Node data:
    `{ type, sourceImagePath?, maxEdge? }` (maxEdge default 1024). Wire its
    `out` into `image:generate`'s width/height.
  - **`image:upscale`** (category `ai`, icon `⤢`). Super-resolves a source
    image via a self-hosted x4 upscaler and outputs a new image. Handles:
    image-in `in`, image-out `out`, error `error`. Node data:
    `{ type, sourceImagePath?, prompt?, maxEdge? }` (maxEdge default 1024).
  - New barrel exports: `DimensionsNode`, `UpscaleNode`, `DimensionsConfig`
    (+ `DimensionsConfigProps`), `UpscaleConfig` (+ `UpscaleConfigProps`).

## [2.35.0] — 2026-06-10

### Added

- **`DropdownMenu` — generic trigger + dropdown menu composite**
  (`/shared` + root, additive; hub#1498). UserMenu's dropdown surface
  minus the identity coupling: arbitrary trigger content, sectioned
  items (`sections: [{ label?, items: [{ icon?, label, active?,
  danger?, onSelect }] }]`) with uppercase headings, active-item
  highlighting, and `align: 'start' | 'end'`. `align="end"` anchors the
  panel's top-right corner to the trigger's bottom-right so app-level
  hamburger menus at the viewport's right edge don't overflow. Built on
  InlinePopover (portal, outside-click + Escape dismiss, focus
  capture/restore, Tab cycling) and adds `role="menu"`/`menuitem`
  semantics plus ArrowUp/ArrowDown/Home/End focus movement. New
  exports: `DropdownMenu`, `DropdownMenuProps`, `DropdownMenuSection`,
  `DropdownMenuItem`. 11 tests + Storybook story.
- **`InlinePopover` `placement: 'bottom-end'`** (additive). Anchors the
  panel's top-RIGHT corner to the trigger's bottom-right (existing
  placements: `bottom-start`, `right`). Used by `DropdownMenu`
  `align="end"`.

## [2.34.0] — 2026-06-10

### Added

- **`PipelineNodeRuntimeProvider` — host-injection seam for live node
  state** (`/pipelines`, additive). Node components (VisionNode,
  GenerateNode, LLMNode, …) read live execution state via
  `useLatestStepForNode(nodeId)` / `useRetryFromStep()`, which until now
  only consulted the bundled `PipelineRunsProvider` — a provider that
  hard-requires this library's WebSocketProvider + the
  `VITE_SOCIAL_API_URL` HTTP seam. Host apps that maintain their own
  runs store (websocket-gateway) can't mount it, so every
  ui-components-imported node rendered `liveStep = null` there — dark
  thumbnails and streaming footers. This is the gateway image-node
  live-state gap introduced when the nodes moved into ui-components in
  Phase 2b/2c. Hosts now mount
  `<PipelineNodeRuntimeProvider value={{ getLatestStepForNode, retryFromStep? }}>`
  around the canvas; when the seam is in scope the node-facing hooks
  read IT instead of the bundled runs store (bundled provider, if also
  mounted, is ignored for these two hooks). Contract: re-create
  `getLatestStepForNode` (new function identity) whenever the host
  store changes — consumers memoize on the identity. `retryFromStep`
  is optional (sync or async; normalized to a Promise); when omitted
  the bundled handler / no-op fallback applies as before. New exports:
  `PipelineNodeRuntimeProvider`, `usePipelineNodeRuntime`,
  `PipelineNodeRuntimeValue`, `PipelineNodeRuntimeProviderProps`.
  Absent the seam, behavior is byte-identical to 2.33.x (regression
  tests cover both paths; 11 new tests).

## [2.33.1] — 2026-06-10

### Fixed

- **`PresenceMode` now exported from `./shared` and root** (hub #1494).
  The `shared` barrel exported `PresenceAvatarsProps` (which references
  `PresenceMode` via its `mode` prop) without exporting `PresenceMode`
  itself, so the 2.33.0 d.ts rollup emitted it as
  `declare type PresenceMode = …` (declared-but-not-exported) and
  consumers couldn't import it. Source-barrel bug, not a
  vite-plugin-dts artifact. Found by websocket-gateway's 2.33.0 bump
  (gateway commit `18c47e2` carries the downstream workaround).
- **Deprecated `PresenceUser` back-compat alias** for
  `PresenceAvatarUser` re-added to `./shared` and root
  (`export type PresenceUser = PresenceAvatarUser`, tagged
  `@deprecated`). The barrel has renamed `PresenceAvatars`' user shape
  to `PresenceAvatarUser` since 2026-05-21, but earlier d.ts shapes
  still let consumers import `PresenceUser`; 2.33.0's rollup broke
  those imports with no alias. Migrate to `PresenceAvatarUser` — the
  alias goes away in the next major.

## [2.33.0] — 2026-06-10

### Added

- **`/pipelines` + `/doc-editor` graduate to stable / API-frozen**
  (hub #1062 + #1066). Both barrels' public surfaces (everything their
  `index.ts` files export) are now frozen: breaking changes require a
  major bump + consumer handoff per the charter. Internal,
  non-barrel modules (pipelines `chaos/`/`dev/`/`replay/`/persistence
  internals; doc-editor `useDocumentEditorState`/`EditorModeSwitch`/
  `EditorSidebarManager`) stay private and may change freely. Full
  enumeration in `CLAUDE.md` → "API freeze" section.
- **Pipelines test floor** (was 1 test / 91 files at audit time):
  behavior tests for `PipelineEditorPage` (full provider-stack mount:
  stale-URL redirect, top-bar/palette/canvas composition, Cmd+S save
  toast, draft-run gating, single-trigger palette invariant),
  `PipelineEditorContext` (load, node/edge mutations, duplicate,
  undo/redo history, dirty tracking, save seam, drag repositioning,
  metadata-off-history contract) and `EventStreamContext` (typed +
  wildcard fan-out, `(runId, stepId, seq)` envelope dedupe, unsubscribe,
  throwing-handler isolation). 24 new tests across 3 files; the page
  test mounts the real xyflow canvas.
- **Doc-editor test floor**: `DocumentEditorPage` composition tests
  running the real Yjs stack (Y.Doc + GatewayProvider over a stub
  gateway): page frame + header mode switcher + empty state, mode
  switching, demo-load markdown → Y.Doc → SectionList/Tiptap rendering,
  and meta propagation into the header title. 4 new tests;
  `StandaloneTiptap` and 21 other doc-editor suites already existed.
- **Pipeline node visual system** (gateway node-visuals audit
  2026-06-10). `BaseNode` gains an optional `category` prop
  (`source | transform | ai | control | sink | human`) rendering a
  3px category-colored left accent bar + a shaped icon chip (circle =
  source, rounded square = transform/sink, diamond = control, violet
  gradient = ai, pill = human); execution state keeps sole ownership
  of border/background. New `nodes/categories.ts` registry
  (`NODE_CATEGORIES`, `categoryFor()`) maps all 35 node types; every
  node component now passes its category, and `NodePalette` derives
  its section grouping + accent dots from the same map (exported
  `PALETTE_ITEMS` shape unchanged, `PaletteItem` gains optional
  `nodeCategory`). Six `--color-cat-*` theme tokens added.
- **Payload-typed edges + ports.** `AnimatedEdge` data gains optional
  `payload: 'image' | 'text' | 'data' | 'control'` and `volume`
  (fan-out multiplicity): image edges render 2.5px with violet idle
  tint and an SMIL `animateMotion` "packet" dot while active; control
  edges render dotted 1.5px; `volume ≥ 2` scales width
  `min(4, base + log2(n))` and renders an `×N` midpoint pill. New
  `nodes/shared/ports.ts` (`PORT_CLS`, `portCls()`) styles `<Handle>`
  elements by payload (image = violet square, error = red, control =
  amber); all node handles adopted. `AnimatedEdge` + types now
  exported from the `/pipelines` barrel. All animation respects
  reduced motion.
- **Generative image visuals.** New `GenerativeImagePreview`
  (`/image` + root): indeterminate shimmer + elapsed-time chip while
  `synthesizing` (deliberately no fake percent — no progress event
  exists on the wire), blur-up reveal on completion. New
  `ImageLightbox` (`/shared` + root): full-screen viewer with
  keyboard nav + wraparound. New `NodeThumbStrip` (`/pipelines`):
  ≤4 thumbs + `+N` overflow, click-to-lightbox, React-Flow-safe
  propagation guards. Adopted by Generate/Variation/EditPrompt
  (synthesizing → reveal → full multi-image strip, no longer just
  `images[0]`), Save (saved-artifact strip), Vision (input thumb now
  opens the lightbox instead of inline resize), ImageSource (prefers
  the run-injected image over design-time config; click-to-lightbox).

### Notes

- The four "missing" Wrapped* stories (hub #989 — `WrappedActivityPanel`,
  `WrappedReactionsOverlay`, `WrappedFileUploadDrop`,
  `WrappedHangoutLayout`) shipped earlier in commit 597d440; this
  release closes the tracking item and corrects the stale coverage
  notes in `CLAUDE.md`.

## [2.32.0] — 2026-06-10

### Added

- **Root-export reachability gap closed** (hub #1021 + #1058): the root
  entry (`@connorhoehnslalom/ui-components`) now re-exports the full public
  surfaces of `layout/` (AppShell, AppLayout, CollapsibleSidebar,
  SettingsLayout, TopNav, DocsShell, …), `social/` (ChatPanel, PostFeed,
  ReactionsBar, PresencePanel, ActivityPanel, …) and `video/`
  (HangoutLayout, VideoGrid, VideoPlayer, CallWidget, RecordingList,
  TranscriptPanel, …) alongside the existing shared/sidebar/hangout
  exports. `import { AppShell, ChatPanel, HangoutLayout } from
  '@connorhoehnslalom/ui-components'` now works. Subpath imports (`/social`,
  `/video`, `/identity`, …) are unchanged; note `layout/` has no
  subpath — root is its only import path.

  Name collisions keep the pre-existing root symbol canonical; the
  newcomer is aliased at root and unaliased on its subpath:
  social `CommentThread` → `CommentThreadPanel`, video `Participant` →
  `VideoParticipant`, identity `FormField`/`FormFieldProps` →
  `IdentityFormField`/`IdentityFormFieldProps`, identity `AuditPage` →
  `IdentityAuditPage`.

## [2.31.0] — 2026-06-08

### Added

- **`<PresenceAvatars>` gains 4 additive props** so it covers the
  real-time-collab feature surface that downstream consumers (notably
  websocket-gateway's doc-editor `DocumentListPage`) were rolling by
  hand. The hand-rolled versions can now be retired in favour of the
  composite without losing UX.

  New `PresenceUser` fields (all optional):
  - `color?: string` — overrides the auto-computed avatar background.
    Use to match a CRDT cursor color so the same identity stays
    visually consistent across cursor, selection halo, and avatar.
  - `idle?: boolean` — present but away. Dims the avatar
    (alpha-blends `color` to `#RRGGBB99` when in hex form, or drops
    opacity to 0.6 as a fallback) and flips the status dot from
    green → amber. Takes precedence over `online` for dot color.
  - `mode?: 'editor' | 'reviewer' | 'reader'` — renders a small
    badge on the upper-right of the avatar (pencil / check / eye).
    `aria-label` carries the human-readable verb ("Editing" /
    "Reviewing" / "Viewing"). Composite badge sizes scale with the
    avatar `size`.

  New `PresenceAvatarsProps` field:
  - `onUserClick?: (id: string) => void` — per-user click. When
    set, each avatar renders as a `<button>` (focusable + keyboard +
    screen-reader accessible); when omitted, items stay as `<div>`
    (back-compat with consumers that want a static row). Click
    `event.stopPropagation()` is fired so parent click handlers
    don't fire when an avatar is clicked.

  New e2e selectors: `data-presence-idle="true"` and
  `data-presence-mode="<mode>"` on each avatar wrapper;
  `data-testid="presence-mode-badge"` on the badge itself.

  Title text composition: `<name> — Away` when idle (wins);
  `<name> — <mode label>` when mode set; `<name>` otherwise.

  Behaviour fully backward-compatible: every new field is optional
  and existing consumers (no color, no idle, no mode, no
  onUserClick) get identical rendering. 19 new test cases
  (27/27 PresenceAvatars green; full library suite 2885/2886
  passing — 1 pre-existing skip).

  Closes the operator-weigh-in question from 2026-06-07 on whether
  to swap WSG's hand-rolled `PresenceAvatars` (115 LOC of inline-
  styled tinted-circle code in `DocumentListPage.tsx`). With this
  release the swap becomes a straight pass-through with no feature
  loss.

## [2.30.0] — 2026-06-07

### Changed

- **`<WrappedLVSHangoutLayout>` adopts ui-components composites for tile
  rendering.** The hand-rolled inline `<video>` elements that the adapter
  used to project `HangoutParticipant` into `HangoutLayoutParticipant`
  are replaced with the proper composites:

  - Remote camera tiles render via `<RemoteTileSlot>`. Inherits the
    avatar fallback, `useTrackStateBump` live-tracking, AND the
    audio-from-t=0 hidden `<audio>` binding shipped in 2.29.0 — so
    every wrapper consumer gets bug class #3 closed automatically.
  - Screen tiles (both local and remote) render via `<StreamVideo>`.
    Inherits the proper `srcObject` lifecycle, `addtrack`/`removetrack`
    rebind that fixes the "audio first, video never paints" bug
    class, and autoplay-rejection callback wiring.
  - Local camera tiles STAY inline as `<LocalCameraTile>`. The local
    user needs mirrored preview (`scale-x-[-1]`) and `muted` (to
    prevent feedback), neither of which fits `<RemoteTileSlot>`'s
    remote-tile semantics. Encapsulated as a file-private component
    rather than reopening the public composite.
  - Removed the `avatarUrl()` stub that always returned `undefined`
    — dead code, the Avatar component's initials fallback covers
    the no-URL case already.

  Behaviour change: REMOTE TILES NOW PLAY AUDIO during the cold-WHEP
  window (avatar fallback rendering). Before this release, a consumer
  that adopted `<WrappedLVSHangoutLayout>` would silently rediscover
  bug class #3 — the inline `<video>` only attached `srcObject` when
  a stream existed, but during the 5-15s pre-first-video-frame window
  with a video-track-muted=true stream, that translated to a `<div>`
  placeholder rendering with no media binding. Now the hidden `<audio>`
  inside `<RemoteTileSlot>` carries the audio track immediately.

  3 new test cases pin the contract: remote tile uses
  `<RemoteTileSlot>` (with the `remote-tile-hidden-audio` testid
  asserting the binding present); local tile is inline and does NOT
  render `<RemoteTileSlot>` testids; local-no-stream falls to the
  inline avatar tile (testid `local-camera-avatar`) not the remote
  branch. 12/12 wrapper tests green, 2866/2867 library total green
  (1 pre-existing skip).

  The MediaStream shim in the wrapper's test file also gained
  `EventTarget` (`addEventListener`/`removeEventListener`/
  `dispatchEvent`) so `useTrackStateBump` and `StreamVideo`'s
  mutation-rebind paths can run without TypeErrors during the test
  environment's mount.

## [2.29.0] — 2026-06-07

### Added

- **`<RemoteTileSlot>` audio-from-t=0**. The avatar fallback branch
  (no usable video) now renders a hidden `<audio>` bound to the same
  `MediaStream`, so the inbound audio track plays the moment its RTP
  arrives — independent of whether a `<video>` element is currently
  decoding frames. Closes bug class #3 ("~10s silence before audio
  plays") at the SHARED layer rather than letting each consumer
  rediscover the fix.

  Upstream of websocket-gateway commit `a923d6b` (introduced
  `RemoteAudioAttachment` inline in `HangoutOverlay`). With this
  release, every `<RemoteTileSlot>` consumer (current: WSG
  HangoutOverlay; future: VideoCallPanel, HangoutDemoPage,
  anything new) inherits the fix without per-consumer wiring.

  Important guard: the hidden `<audio>` is rendered ONLY in the
  avatar branch. When `<RemoteTileSlot>` is showing `<StreamVideo>`,
  the video element handles audio playback natively — adding a
  second `<audio>` bound to the same MediaStream's audio track
  would risk playback duplication in some browsers. The test suite
  pins this invariant (`renders <StreamVideo> branch (no avatar, no
  hidden audio)`).

  Pure backward-compatible: `RemoteTileSlotProps` is unchanged.
  9 new test cases (`RemoteTileSlot.test.tsx` — new file): avatar
  branch + audio binding under no-stream / camera-off / cold-WHEP
  conditions, no-binding guard for the video branch, rebind-on-
  stream-change, cleanup-on-stream-undef, display-name preservation,
  avatarSize prop. 9/9 green.

## [2.28.0] — 2026-06-07

### Added

- **`<HangoutPreJoinShell>` identity tile for the camera-off path.** New
  optional `localIdentity?: { displayName: string; avatarSrc?: string }`
  prop. When provided AND the user toggles the camera off pre-join
  (`videoEnabled=false` + `permission='granted'`), the preview tile
  renders a Meet/Teams-style identity card: large `<Avatar>` (size 96)
  + display name + "Camera off" subtitle. Avatar falls back to initials
  when `avatarSrc` is absent. Backward-compatible — consumers that
  don't pass `localIdentity` see the existing bare "Camera off" text,
  so existing call sites (websocket-gateway `HangoutRoom.tsx:195`) are
  unaffected until they opt in.

  Closes the audit gap flagged by the operator on 2026-06-04: when the
  gateway wires PreJoin into a real route, users who toggle cam off
  pre-join were seeing bare slate text instead of an identity tile,
  inconsistent with every modern conferencing UI.

  6 new test cases (`HangoutPreJoinShell.test.tsx`): identity-tile
  render path, legacy text-fallback path, no-tile-when-camera-on,
  avatarSrc → `<img>`, no-src → initials, identity-tile suppression
  in non-granted permission states. 23/23 total green.



## [2.26.0] — 2026-06-04

### Added

- **Screen-share auto-promotion in `<HangoutLayout>` / `<HangoutSpotlight>`**.
  `HangoutLayoutParticipant` gains an optional `screenElement?: ReactNode`
  slot. When ANY participant (remote or local) supplies it,
  `<HangoutLayout>` auto-flips to spotlight mode and `<HangoutSpotlight>`
  promotes the screen-share into the main slot. The sharer's CAMERA tile
  stays visible in the filmstrip — you still see the person while they're
  presenting. An explicit `spotlightContent` prop still wins (consumers
  rendering REC indicators / pinned-tile UI are unaffected). With
  multiple concurrent screen-shares (rare, but possible during a hand-off)
  the first remote sharer is promoted; a local share loses to any remote
  one. The spotlight wrapper's `data-spotlight-type` / `data-spotlight-user`
  attributes reflect the screen vs camera state so e2e specs can target
  without reading `srcObject`.

- **`<WrappedLVSHangoutLayout>` now projects `HangoutParticipant.screenStream`
  into `screenElement`** so consumers of the LVS adapter get
  screen-share spotlight promotion for free. The pre-2.26.0 behaviour
  (drop `screenStream`) is gone — this was the known follow-up flagged
  in the 2.24.0 changelog. Screen `<video>` is `object-contain` (no
  crop), never mirrored, and `muted` for local shares to prevent echo
  on system-audio shares.

### Notes

- New tests: +5 (`HangoutSpotlight` — remote auto-promote, sharer-camera
  stays in filmstrip, local auto-promote, explicit-content override,
  multi-sharer tie-break), +2 (`HangoutLayout` — auto-flip on remote
  screenElement, auto-flip on local screenElement), +2
  (`WrappedLVSHangoutLayout` — remote `screenStream` projection, local
  `screenStream` projection). Full suite 2247 tests pass, `tsc --noEmit`
  clean. No breaking changes — `screenElement` is optional everywhere.

## [2.25.0] — 2026-06-04

### Added

- **`<MediaControlsBar>`** (`/video`). Bottom control bar for an active
  hangout call: round mic / camera / screen-share toggles plus the
  red Leave button. Built on the new `<CircularIconToggle>` +
  `MediaIcons`. Per the gateway-locked boundary, this is the
  composite that owns the Leave-call affordance — sister composites
  (`<WrappedLVSHangoutLayout>`, `<HangoutRoomHeader>`) deliberately
  do not render Leave. Screen-share is opt-in: omit
  `onToggleScreenShare` and the third toggle is not rendered. An
  `extras` slot sits between the screen-share toggle and Leave for
  things like raise-hand / captions / settings.

- **`<HangoutRoomHeader>`** (`/video`). Top bar for an active hangout
  call. Renders the channel name, a subtitle, an optional inline
  `RecordingPill` (Chip uppercase + danger dot when active), an
  optional elapsed-time chip (clock-icon + tabular-nums), an optional
  right-side `PhaseChip` (idle / joining / joined / reconnecting /
  ended / failed), and an actions slot for consumer-supplied controls
  (Debug button, etc.). Like its sibling composites, Leave is NOT on
  this header — it lives on `<MediaControlsBar>`.

- **`<CircularIconToggle>`** (`/video`). Round on/off button primitive
  used by `<HangoutPreJoinShell>`, `<MediaControlsBar>`, and any other
  Meet-style media toggle surface. Consumer-supplied `iconOn` / `iconOff`
  pair; state reflected via `aria-pressed`; visual flips between an
  active soft-slate palette and an off red-soft palette (or
  neutral-soft via `offTone="neutral"` for non-media toggles like
  screen-share).

- **`MediaIcons`** (`/video`). Small set of stroke-based SVG primitives
  (`MicIcon`, `MicOffIcon`, `VideoIcon`, `VideoOffIcon`,
  `ScreenShareIcon`, `ScreenShareOffIcon`, `PhoneOffIcon`,
  `MoreHorizontalIcon`). Pure SVG — no external icon-pack dep added
  to the library. Each accepts a `size` prop (default 20) and
  passes through all standard SVG props; color inherits via
  `currentColor`. The set is intentionally narrow (only icons the
  hangout composites use); add new ones as composites require them.

### Changed

- **`<HangoutPreJoinShell>`** now uses `<CircularIconToggle>` + the
  new `MediaIcons` instead of its inline `ToggleButton` + handcrafted
  Mic / Cam SVGs. Public props unchanged.

### Notes

- New tests: 5 (`CircularIconToggle`) + 8 (`HangoutRoomHeader`) + 7
  (`MediaControlsBar`) — full suite 2238 tests pass, `tsc --noEmit`
  clean.

## [2.24.0] — 2026-06-04

### Added

- **`<HangoutPreJoinShell>`** (`/video`). Google Meet-style "green
  room" composite for the hangout pre-join flow. Channel-name header,
  live camera preview tile, mic/cam circular toggles, ready-state
  roster (with `live` / `connecting` chip per participant), and the
  Join button. Consumer-provides the `previewStream`, `permission`
  state, audio/video toggle handlers, and an `onJoin({ audio, video })`
  callback — the shell owns no media APIs itself. Permission failures
  render the new `<PermissionDeniedCard>` inline with a `Try again`
  affordance wired to `onRetryPermission`. The roster auto-truncates to
  8 entries with a `+N more` overflow chip; `readyLoading` swaps the
  roster for a `Checking room…` spinner. Used by the `websocket-gateway`
  hangout app per the gateway-locked contract finalized 2026-06-03.

- **`<WrappedLVSHangoutLayout>`** (`/integrations/realtime-modules`).
  Drop-in adapter that connects `useLVSHangout` from
  `@connorhoehnslalom/realtime-modules/client/video` to `<HangoutLayout>`.
  Per the gateway-locked boundary decisions, the wrapper:
  - exposes connection state via an `overlay({ connectionState, error,
    participantCount, remoteCount })` render-prop slot — consumers
    supply their own reconnecting / failed / empty backdrops;
  - forwards a consumer `spotlightContent` slot for REC indicators,
    pinned-tile UI, or recording badges (the wrapper does NOT
    subscribe to recording lifecycle);
  - takes an async `getStageToken` callback mirroring the SDK
    `getAuthToken` pattern so token renewal stays consumer-managed;
  - does NOT render a Leave button — leave affordance lives on the
    sibling `<MediaControlsBar>` composite (coming next).

  Maps `HangoutParticipant.streams[]` to per-tile `videoElement`s with
  `srcObject` binding via ref; `isLocal` tiles get muted + mirrored.
  Screenshare promotion (`screenStream` → spotlight) is a known
  follow-up that requires extending `HangoutLayoutParticipant` +
  `HangoutGrid/Spotlight` render paths.

- **`<PermissionDeniedCard>`** (`/shared`). New fallback primitive for
  media-device permission failures. Props: `kind: 'camera' | 'microphone'
  | 'screen'`, `state: 'denied' | 'blocked' | 'no-device' | 'unavailable'`,
  optional `message`, `onRetry`, `retryLabel`, `icon`. Default copy is
  keyed on `state`; default per-kind SVG is provided. Used by
  `<HangoutPreJoinShell>` but exported standalone for any consumer that
  needs to surface a getUserMedia rejection.

### Notes

- New tests: 7 (`PermissionDeniedCard`) + 16
  (`HangoutPreJoinShell`) + 7 (`WrappedLVSHangoutLayout`) — full suite
  2218 tests pass, `tsc --noEmit` clean. `@connorhoehnslalom/realtime-modules`
  is consumed via the existing peer-dep + `file:` pin; no new runtime
  deps.

### Added

- **`<CallControls>` + `<CallParticipantStrip>` + `<CallStatsOverlay>`**
  (`/video`). Extracted from the 1009-LOC `<CallWidget>` monolith so
  consumers can compose alternative call surfaces (PiP-only viewer,
  dialer modal, screen-share kiosk header, diagnostics-on-tile overlay)
  without re-wiring the full widget shell. `<CallControls>` is the
  pure-presentational bottom bar (mute / camera / screen-share /
  upgrade / add-participant picker / end-call) — caller owns the
  toggle state. `<CallParticipantStrip>` is the compact avatar roster
  used by audio-only mode, with `maxVisible` collapsing into a `+N`
  chip. `<CallStatsOverlay>` is the optional network-quality /
  bitrate / latency / packet-loss diagnostics dock, with a built-in
  empty-state gate (renders `null` when no metric is set). `CallWidget`
  now composes the three pieces internally and is down to 825 LOC;
  render output, props, and behaviour are unchanged for every existing
  consumer. New per-piece tests (47) cover toggle wiring, picker
  dedupe, avatar overflow, empty-stats gating, and corner positioning.
  Refs hub#1205.

- **`<HangoutGrid>` + `<HangoutSpotlight>`** (`/video`). Extracted
  from `<HangoutLayout>` as standalone presentational primitives so
  consumers can build alternative call surfaces (PiP-only viewer, a
  screen-share kiosk, a moderator panel) without recomposing the
  hangout shell. `<HangoutGrid>` owns the auto-grid sizing rules and
  local-PiP-vs-inline placement (`gridCols` helper also exported).
  `<HangoutSpotlight>` owns the spotlight slot resolution
  (`spotlightContent` > stable active speaker > first remote) and
  the filmstrip; `useStableActiveSpeaker` hysteresis hook is exported
  too. `<HangoutLayout>` now dispatches to one or the other based on
  `mode` / `spotlightContent` / participant count. Render output
  unchanged. Refs hub#1224.

- **`<AutoplayGate>` + `playState` tracking on `<StreamVideo>`**
  (`/video`). Chrome and Safari silently reject non-muted autoplay on
  remote tiles when a user joins a call from a background tab
  (notification click, hash-link) — the user sees a permanently black
  tile and has no recovery affordance. `<StreamVideo>` gains an
  optional `onPlayStateChange?: (state: 'playing' | 'paused-by-autoplay'
  | 'ended') => void` prop that fires `paused-by-autoplay` when
  `play()` rejects with `NotAllowedError`. New `<AutoplayGate>`
  composite wraps `<StreamVideo>` and, on rejection, overlays a single
  tap-to-unmute chip. On click it unmutes the wrapped tile, plays it,
  AND walks `document.querySelectorAll('video')` calling `play()` on
  every paused tile — one user gesture clears every blocked remote at
  once. SSR-safe. Refs gateway hub#1257.

- **`<MessageRow>` + `<MessageGroup>`** (`/social`). Extracted from
  `ChatPanel` as standalone presentational primitives so consumers can
  build alternate chat layouts (thread panel, dense feed, search-result
  card) without recomposing the row. `<MessageRow>` accepts a
  `ReactNode` content slot (mentions, inline media), an optional
  `footer` slot (e.g. a `<ReactionsBar>` per message), `hideAvatar` /
  `hideAuthor` toggles for use inside a group, and a `mine` flag
  surfaced as `data-mine` for styling hooks. `<MessageGroup>` stacks
  consecutive messages from the same author and renders avatar +
  author label only on the first row. ChatPanel now composes
  `<MessageRow>` directly; render output is unchanged. The
  `formatChatTime(iso)` helper is also exported. Refs hub#985.

- **`<ReactionsBar>` + `<ReactionPickerPopover>`** (`/social`). Chip bar
  showing existing reactions with counts (mine highlighted via
  `aria-pressed`) plus an "add reaction" trigger that opens a cmdk-driven
  popover with a default 64-emoji 8×8 grid, search input, Escape-to-close,
  and click-outside dismissal. Replaces the gateway's hand-rolled trigger
  UI that previously paired with `<WrappedReactionsOverlay>`'s floating
  animation. `DEFAULT_PICKER_EMOJIS` is also exported for consumers that
  want to build their own bar. Refs hub#988.
- **Global test setup** now polyfills no-op `ResizeObserver` +
  `Element.prototype.scrollIntoView` so any future cmdk consumer's tests
  work without copy-pasting the polyfill. `CommandPalette.test.tsx`'s
  local polyfill is still in place and harmless.

- **`<RecordingRow>`** (`/video`). Extracted from `<RecordingList>` as a
  standalone, presentational primitive so consumers can build custom
  recordings layouts without rebuilding the row. Adds a `status?:
  'ready' | 'processing' | 'failed'` field (with badge), an `actions?`
  slot for per-row buttons, and full keyboard support (Enter/Space
  activate, focus-visible ring). `<RecordingList>` now composes it
  internally and gains an optional `renderActions?: (item) => ReactNode`
  prop. `RecordingListItem.status` is forwarded to each row. Refs hub#987.

### Changed

- `<RecordingList>` rows now render as `<div role="button">` instead of
  `<button>`. This is required for the new `actions` slot (button-in-
  button is invalid HTML). Behavior is preserved: rows are still
  keyboard-activatable, `aria-pressed` still reflects selection, and the
  `data-testid="recording-row"` + `data-recording-id` attributes are
  unchanged. Selection ring class moved from generic `ring-2` to the
  more specific `ring-[var(--color-primary)]/40` token.

## [2.14.0] — 2026-05-31

### Added

- **`<ConnectionPill>`** (`/shared`). Canonical 5-state connection-status
  pill (idle/connecting/connected/reconnecting/disconnected) with `compact`
  + `withLabel` variants, `aria-live="polite"` for transition announcements,
  and per-state `labels` override for localisation. Promoted from
  `layout/ConnectionStatus` so chat, gateway sidebar, and admin shells all
  share one source. Refs hub#984.
- **`<DocsShell>` + `<DocsSidebar>` + `<DocsTopNav>`** (`/layout`). Trio of
  documentation-shell primitives: collapsible-section sidebar with
  active-route highlight, sticky topnav with brand + search-hotkey slot,
  and a composition shell with optional TOC right-rail. The demo's hand-
  rolled `shell/Sidebar.tsx` + `shell/TopNav.tsx` (245 LOC of inline-styled
  divs) drop out entirely; `shell/DocsLayout.tsx` is now a thin adapter
  that maps the demo's `navigationTree` to library props and plugs in
  react-router's `<Link>` via `renderLink`. Refs hub#1018.

### Changed

- `layout/ConnectionStatus` now re-exports the new `<ConnectionPill>` and
  is marked `@deprecated`. Scheduled for removal in 2.15.

### Migrated

- `demo/src/demos/social-panel/ChatMessages.tsx` typing-indicator block
  now uses the shared `<TypingIndicator>` primitive — the inline
  `@keyframes typingBounce` injection and three hand-rolled animated
  `<span>` dots are gone. Refs hub#1034.

## [2.13.0] — 2026-05-30

### Added

- **`<LogStream>` / `<TerminalLog>`** (`/shared`). Monospace terminal-style
  log panel with timestamp/level/source columns, follow-tail autoscroll,
  jump-to-live pill when the user has scrolled up, a line-count chip in
  the header, and an optional Clear button. Composes `<Card>` +
  `<CardHeader>` — no inline styles. Exposes `role="log"` with
  `aria-live="polite"` by default. Refs hub#1020.
- **`<ThumbnailCard>` + `<CatalogGrid>`** (`/shared`). Catalog/gallery
  card with hover lift, tonal category chip, thumbnail-image or
  icon-fallback, and an optional top-right badge. Renders as `<a>`,
  `<button>`, or static `<div>` based on props. Companion `<CatalogGrid>`
  standardises the responsive 1/2/3/4/5-column tile layout used by
  component galleries and demo catalogs. Unblocks Wave 2 audience-first
  landing (#1060). Refs hub#1019.
- **`<StackDiagram>` / `<LayerStack>`** (`/shared`). Data-driven layered
  architecture diagram for docs/showcase pages. Layers render as tonal
  boxes connected by arrow, line, or no connector; vertical or
  horizontal orientation. Tones match `<Chip>` (primary/success/
  warning/danger/info/caution/purple/neutral). Refs hub#1038.
- **`<SettingsLayout>`** (`/layout`). Section-rail + content + sticky-
  save-bar shell for identity/admin settings pages. Sections are
  data-driven; rail supports controlled and uncontrolled active-section
  state. Save bar appears only when `dirty` and exposes Save/Cancel
  slots with saving state and an optional meta slot for dirty-field
  count. Refs hub#1044.

### Wave 1 status

- Atoms shipped: TypingIndicator, Tabs, ErrorState/LoadingState,
  PresenceDot/UserChip.
- Composites shipped: DataTable, TopNav/NavTabs, CodeBlock, StatCard
  (with delta/sparkline), KPIGrid.
- Domain primitives shipped: HealthGrid/HealthCell, AlertList/AlertItem,
  CodeBlock, LogStream (this release), ThumbnailCard/CatalogGrid (this
  release), StackDiagram (this release), SettingsLayout (this release).
- Still open: hub#1018 DocsShell trio, #1040 CommandPalette wrapper,
  #984 ConnectionPill canonical, #985 MessageRow/MessageGroup, #982
  ChatPanel avatar slot, #987 RecordingRow/List, #988 ReactionsBar,
  #1057 CapabilityDeniedFallback, #1061 ReconnectingShim, #986
  WrappedConnectionPill.

## [2.12.0]

### Added

- Root barrel (`src/index.ts`) now re-exports `./components/layout`, so
  `AppShell`, `AppLayout`, `CollapsibleSidebar`, `ConnectionStatus`,
  `ApiDegradedBanner`, and `CollapsedIconStrip` are reachable via
  `import { ... } from '@connorhoehnslalom/ui-components'` (previously only
  available through deep imports under `…/components/layout`). Additive;
  no name collisions with shared/sidebar/hangout barrels. Refs hub#1021.
- Root barrel now re-exports `./components/social`, `./components/video`,
  and `./components/identity`. Consumers can `import { ChatPanel, ChatRoom,
  RoomList, PostFeed, GroupPanel, PresencePanel, ActivityPanel, SocialPanel,
  VideoPlayer, VideoGrid, CallWidget, HangoutLayout, RosterPanel,
  StreamVideo, RecordingPlayer, TranscriptOverlay, LoginPage, LogoutPage,
  MfaSetupPage, MfaVerifyPage, MfaDashboardPage, ConsentPage, ErrorPage,
  IdentityAdminLayout, PoolScopedLayout, EntityTable, CodeInput,
  QrCodeDisplay, StatusBadge, ... } from '@connorhoehnslalom/ui-components'`
  directly without subpath imports. Existing subpath imports continue to
  work. The `/agents` domain remains subpath-only pending its stable
  graduation (hub#1069). Refs hub#1058, resolves blocker #34 via operator
  option B (handoff #365).

### Changed (root-barrel disambiguators — non-breaking)

- Six names exist in both the new domain barrels and pre-existing root
  exports. To keep the pre-existing root contract stable, the new-domain
  variants are root-re-exported under disambiguated aliases. The original
  names continue to resolve to the pre-existing canonical source. Both
  variants remain reachable via their subpath imports.
  - `CommentThread` (root) → `./types` interface (unchanged).
    New: root-only alias `CommentThreadPanel` for `./components/social/CommentThread.tsx`.
  - `Participant` (root) → `./types` interface (unchanged).
    New: root-only alias `VideoParticipant` for `./components/video/VideoGrid.tsx` `Participant`.
  - `MfaDevice` (root) → `./types/identity` interface (unchanged).
    The identity `auth/MfaDashboardPage.tsx` ships its own page-local
    `MfaDevice` shape — kept subpath-only; not re-aliased.
  - `FormField` / `FormFieldProps` (root) → `./components/shared/FormField`
    (unchanged). New: root-only aliases `IdentityFormField` and
    `IdentityFormFieldProps` for the identity-flavoured variant.
  - `AuditPage` (root) → `./api/pipelineAudit` interface (unchanged).
    New: root-only alias `IdentityAuditPage` for the identity admin
    component.

## [2.9.1] — 2026-05-28

### Fixed

- `dist/` now committed against the git tag so consumers installing via
  `github:connorhoehnslalom/ui-components#v2.9.1` get a tarball with
  compiled artifacts present. Prior tag `v2.0.0` shipped without `dist/`
  in the tree, forcing consumers to run `prepare` (which fails in
  containers without a build toolchain). The `prepare` script is guarded
  with `test -f dist/index.js || …` so no rebuild attempt happens on
  consumer install when `dist/` is present.

No source/API changes — patch-only release for tag installability.
