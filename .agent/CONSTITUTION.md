# Constitution: ui-components

> A living document. Edit deliberately and explain the reason in commit messages.
> Workers re-read this on every `/clear` between tasks; it is the north star
> when no task has been dispatched and self-driven work needs to be chosen.

## Mission

Be the canonical React component library for the platform. Provide a
consistent, tested, accessible set of components, hooks, and types that
consumer apps (`event-catalog`, `websocket-gateway`, `vnl-ads`, and others)
can depend on without shipping their own design systems.

Ship quality over novelty. A stable, well-tested `Button` is more valuable
than a half-finished feature.

## Scope

**This project IS:**
- A multi-entry-point npm library (`@connorhoehn/ui-components`) published to GitHub Packages.
- The source of truth for shared UI primitives (Button, Card, Modal, Table, Toast, TagEditor, CodeEditor).
- The owner of the AG-UI streaming chat surface (`/agents` entry point).
- The pipeline editor + runtime UI surface (`/pipelines`), used by admin shells across repos.
- The video conferencing UI surface (`/video`, `/video-ivs`).
- The collaborative doc-editor surface (`/doc-editor`, TipTap + Yjs).

**This project IS NOT:**
- An application. It has no runtime server, no database, no auth layer.
- A design system token authority — tokens are defined here for use here;
  they are not published for external theming.
- A code-generation tool or schema registry.
- Responsible for WebSocket transport — that belongs to consumer apps.
  This library ships `useWebSocket` as a convenience hook against a
  consumer-provided URL; the WS server lives in `websocket-gateway`.

## Cross-repo contracts (stable exports)

These exports have downstream consumers. Breaking any of them requires a
`create_handoff` to each consumer agent listed + a blocker for operator
review before landing.

| Export path | Primary consumers | Type of contract |
|---|---|---|
| Root index (`/`) | `event-catalog`, `websocket-gateway`, `vnl-ads` | Shared primitives, types, hooks |
| `/shared` | All consumers | Core UI primitives — most stable surface |
| `/types` | All consumers | TypeScript type definitions |
| `/hooks` | `websocket-gateway`, `vnl-ads` | `useWebSocket`, social hooks |
| `/identity` | `websocket-gateway`, `vnl-ads` | Auth + admin identity panels |
| `/pipelines` | `event-catalog`, `websocket-gateway` | Pipeline editor + runtime UI |
| `/agents` | `websocket-gateway` | AG-UI streaming chat surface |
| `/video` | `websocket-gateway` | Video conferencing components |
| `/styles.css` | All consumers | Design tokens |

Consumer agents to notify on breaking changes:
- `event-catalog`
- `websocket-gateway`
- `vnl-ads`

## Principles (non-negotiable)

1. **Stable exports stay stable.** No signature changes without a deprecation
   notice in the same commit and a handoff to every consumer.
2. **Tests for every exported primitive.** Today only `shared/` has tests —
   that gap is technical debt. New exports ship with tests; do not add to the
   coverage gap.
3. **Tailwind v4 only.** No new inline `style={{}}` for static values.
   Dynamic computed values (from props/state) may stay as `style` props.
   `cn()` from `src/lib/cn.ts` for all class composition.
4. **One entry point, one concern.** Do not add cross-entry-point imports
   (e.g. `/pipelines` importing from `/agents`). Shared primitives go in
   `/shared` or the root index.
5. **Linear history.** Rebase, don't merge. Commits small + atomic.
   Reference hub task ids in commit bodies.
6. **Bump the version on release-worthy changes.** Consumers pin versions;
   silent changes break pinned installs.

## Anti-goals

- **Don't ship application logic.** No API calls with hard-coded endpoints,
  no auth token management, no server-sent state. Consumers pass data in;
  the library renders it.
- **Don't add runtime dependencies lightly.** Every new dep increases
  consumer bundle size. Prefer peer deps (React, recharts, @xyflow/react) and
  dev deps. Only add a runtime dep if it's genuinely needed across multiple
  components (e.g. `clsx`, `tailwind-merge`).
- **Don't pre-build multi-theme.** The current design-token layer is
  single-theme. Defer theming extensibility until a consumer explicitly needs it.
- **Don't widen the AG-UI surface prematurely.** `/agents` is still in-flux
  (wave10 just landed). Let the hook and types stabilize before advertising
  them as stable to consumers.
- **Don't let the pipelines domain grow further without first extracting
  shared patterns.** It is already 38K lines. Any new pipeline feature should
  either fit into an existing extracted primitive or prompt a primitives-first
  refactor.

## Current phase

**T-W3a / A1 stabilization.** The Tailwind v4 wave 3 migration covers
122 remaining files across pipelines, doc-editor, observability, collaboration,
and video (see `TAILWIND_MIGRATION.md`). Wave 3 small domains (observability,
video, collaboration, doc-types, field-types, typed-documents) are the current
self-driven priority. The AG-UI agents module (wave10) just landed — needs
tests and type freeze before advertising as stable.

See `ROADMAP.md` for T-W3a → S3 progression.

## Self-driven backlog (in priority order, ranked)

When the dispatched queue is empty AND no unread handoffs are open, draw
from these. Each item must still satisfy the Good-enhancement criteria below.

1. **Tailwind wave 3: small domains** (~500 LOC changes).
   Convert observability (12 files), video (7), collaboration (8), doc-types
   (3), field-types (1), typed-documents (2) from inline `style={{}}` to
   Tailwind. Each domain is its own commit. Start with `video` (simplest).
   Ref: `ROADMAP.md` T-W3a.

2. **Fix pre-existing TypeScript errors** (~30 LOC).
   The 5 errors in `useComments`, `useLikes`, `usePosts` (missing gateway
   types module) and duplicate `ThemeProvider`/`useTheme` exports in
   `src/index.ts`. Do not fix silently — verify consumer imports still
   resolve before marking done.
   Ref: `ROADMAP.md` S1.

3. **Pipelines refactor: PipelinePage layout wrapper** (~100 LOC).
   AllRunsPage, PipelineRunsPage, PipelineStatsPage, PendingApprovalsPage
   share identical shell structure. Extract `PipelinePage` wrapper.
   Ref: `TAILWIND_MIGRATION.md` "Refactoring opportunities" #1.

4. **Pipelines refactor: NodeConfigShell** (~120 LOC).
   All `*Config.tsx` panels repeat the same card + fieldset + save/cancel
   button layout. Extract a `NodeConfigShell` component.
   Ref: `TAILWIND_MIGRATION.md` "Refactoring opportunities" #2.

5. **Pipelines refactor: DataTable primitive** (~150 LOC).
   RunsTable, ActiveRunsTable, and list pages all hand-build `<table>` with
   identical cell/header styling. Extract `DataTable`.
   Ref: `TAILWIND_MIGRATION.md` "Refactoring opportunities" #3.

6. **Consolidate pipelines/ui/ into ui/** (~80 LOC removal).
   `src/components/pipelines/ui/Button.tsx` and `IconButton.tsx` duplicate
   `src/components/ui/` counterparts. Remove the duplicates; update imports.
   Ref: `TAILWIND_MIGRATION.md` "Refactoring opportunities" #4.

7. **Add tests for useAgUiStream edge cases** (~120 LOC tests).
   The hook has coverage for the happy path but not for: connection errors
   mid-stream, partial JSON patches, concurrent streams. Add to
   `src/components/agents/hooks/__tests__/`.

8. **Tailwind wave 3: doc-editor** (~400 LOC changes).
   37 files. Keep TipTap-owned styles as `style` props. Tackle after
   small domains are done.
   Ref: `ROADMAP.md` T-W3b.

## Good-enhancement criteria

A self-driven task is worth filing when ALL of the following are true:

- It matches a ranked backlog item OR directly addresses a principle violation
  (untested export, new inline style, growing entry-point coupling).
- Estimated LOC is under 200 for a single task. Larger scope → raise a
  blocker for operator review and split.
- It does not touch package.json, tsconfig files, or lock files as a
  side-effect (those require explicit operator approval).
- It has a clear acceptance criterion checkable by `npm test && npm run build`.
- A similar task has NOT been done in the last 7 days (anti-thrashing).

## Daily cap

**30 self-driven tasks per 24-hour UTC period.**
Override: `~/.agent-hub/.budget-ui-components` (integer on one line).

## Per-task LOC cap

**200 LOC** changed per self-driven task. Larger tasks → raise a blocker.

## User-facing framing

The "user" of this library is the **consumer application developer** — the
engineer at `event-catalog`, `websocket-gateway`, or `vnl-ads` importing our
components. User-impact language should read like:

- "Consumer apps can now use `DataTable` instead of hand-rolling `<table>` with manual styling."
- "Consumer apps no longer get TypeScript errors when importing `useComments`."
- "The pipeline editor's inline style count drops from 1440 to ~200, making future consumer customization simpler."

Avoid: LOC counts, module names, internal type shapes in the top-level summary.
Include those in the technical detail section.

## Cross-repo contracts owned by this repo

Any change to a symbol in the **stable exports** column above constitutes a
contract change. Before landing:
1. Send `create_handoff` to each consumer agent listed.
2. Include: the symbol that changed, the before/after signature, and
   migration steps.
3. If breaking (no backwards-compatible fallback): raise a blocker first.
