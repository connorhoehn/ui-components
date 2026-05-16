# CLAUDE.md — @connorhoehn/ui-components

React component library for real-time collaborative applications. Published to
GitHub Packages as `@connorhoehn/ui-components`. Consumed by several downstream
apps — see **Consumer list** below.

## Quick commands

```bash
npm test           # vitest run (129 tests; shared + agents hooks have coverage)
npm run lint       # tsc --noEmit (0 errors as of commit 33d6ec1)
npm run build      # vite build (lib mode, multi-entry)
npm run demo       # vite dev server at http://localhost:5174
npm run test:e2e   # playwright (tests/e2e/)
```

## Entry points / exports map

| Export path | Contents | Stability |
|---|---|---|
| `@connorhoehn/ui-components` | Root: shared, theme, types, hooks, contexts, renderers, api | **Stable** |
| `…/types` | Core TypeScript types | **Stable** |
| `…/shared` | Button, Card, Modal, Toast, Table, TagEditor, CodeEditor, EmptyState | **Stable** |
| `…/hooks` | useWebSocket, useComments, useLikes, usePosts, useSocialProfile, etc. | **Stable** |
| `…/identity` | Auth flows, admin user management, IdentityContext | **Stable** |
| `…/social` | Posts, reactions, follow graph | **Stable** |
| `…/ingest` | Data-ingest UI primitives | **Stable** |
| `…/styles.css` | Tailwind design tokens + keyframes | **Stable** |
| `…/agents` | AG-UI v0.1.x streaming chat, reasoning blocks, A2A canvas | **In-flux** (wave10 landed 2026-05) |
| `…/pipelines` | Pipeline editor, canvas, runs, approvals, LLM nodes, DLQ | **In-flux** (Tailwind migration wave 3 pending) |
| `…/doc-editor` | TipTap collaborative rich-text editor | **In-flux** (Tailwind migration pending) |
| `…/observability` | Dashboard, events, metrics, node pages | **In-flux** (Tailwind migration pending) |
| `…/video` | VideoPlayer, VideoGrid, participant tiles, reactions | **Stable API**, minor churn |
| `…/video-ivs` | AWS IVS-specific video implementation | **Stable API** |

## Consumer list

| Repo | Imports from | Notes |
|---|---|---|
| `event-catalog` | `…/shared`, root index, `…/pipelines` admin views | Uses shared primitives in admin UI |
| `websocket-gateway` | `…/shared`, `…/identity`, `…/video`, `…/agents` | Admin UI + video call + agent chat |
| `vnl-ads` | Root index, `…/identity`, `…/social` | Social + identity flows |

**Changing a stable export** always requires a handoff to every consumer repo.
Breaking changes need a blocker before landing.

## Source layout

```
src/
  components/
    agents/       AG-UI streaming chat, A2A flow canvas
    collaboration/ Presence, cursors, activity feeds
    doc-editor/   TipTap rich-text with Yjs collaboration
    doc-types/    Document type renderers
    field-types/  Field type primitives
    identity/     Auth + admin identity panels
    ingest/       Data ingest UI
    layout/       Shell panels, sidebars
    misc/         Utilities and one-offs
    observability/ Dashboard / metrics / event log
    pipelines/    Pipeline editor + runtime UI (largest domain)
    shared/       Core primitives (Button, Card, Modal, Table…)
    social/       Posts, reactions, follow graph
    typed-documents/ Document views
    ui/           Low-level UI atoms (Button, Card, Panel…)
    video/        Video player + grid + participant tiles
  contexts/       React context providers (WebSocket, Identity…)
  hooks/          Shared hooks
  lib/            cn() utility, video helpers
  styles/         CSS variables + global styles
  theme/          Theme tokens + ThemeProvider
  types/          TypeScript type definitions
  renderers/      Document content renderers (rich-text, tasks, checklist…)
  api/            API client helpers
```

## Known issues

All 5 pre-existing TypeScript errors were resolved in commit `33d6ec1`:

- `useComments/useLikes/usePosts`: import path corrected from `../../types/gateway`
  to `../types/gateway`
- `src/index.ts` duplicate exports: `ThemeProvider` renamed to `ColorSchemeProvider`;
  `useTheme` renamed to `useColorScheme` in `ThemeContext.tsx`

`npm run lint` (`tsc --noEmit`) now reports **0 errors**.

## Active migrations

### Tailwind CSS v4 — Wave 3

Waves 1–2 are done. Wave 3 covers 122 files still using inline `style={{}}`:

| Domain | Files | Notes |
|---|---|---|
| pipelines | 64 | Largest — refactor shared layout/table/config-panel first |
| doc-editor | 37 | Some TipTap-internal styles must stay inline |
| observability | 12 | |
| collaboration | 8 | Dynamic cursor positioning must stay inline |
| video | 7 | Small, straightforward |
| doc-types / field-types / typed-documents | 6 | Small |

See `TAILWIND_MIGRATION.md` for conversion rules, token mappings, and
refactoring opportunities before touching the pipelines domain.

**Verification after each wave:**
```bash
npm test && npm run build && npx tsc --noEmit
```
107 tests must pass; only 5 pre-existing tsc errors allowed (listed above).

## Publishing

Published to `https://npm.pkg.github.com`. Version is in `package.json`
(`2.3.0` at time of writing). Bump on every release-worthy change.

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
