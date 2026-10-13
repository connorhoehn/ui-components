# CLAUDE.md — @connorhoehnslalom/ui-components

React component library for real-time collaborative applications. Current
version is in `package.json` (**2.441.7** as of 2026-10-13). The primary
consumer is the aws-agentcore portal, which installs a packed tarball of this
package from `../aws-agentcore/portal/vendor/`. The current workspace handoff is
`../aws-agentcore/docs/claude-code-handoff-2026-10-12.md`; this repo's own
history is `CHANGELOG.md`, and the contribution rules are `CONTRIBUTING.md`.

Historical notes: the `agent-hub` coordination system was retired on
2026-08-16 (`hub#<id>` references in docs and commits are breadcrumbs, not
tickets), and the 2026-05 autonomy charter (`docs/AUTONOMY_CHARTER.md`) is a
backlog to pick from, not an active mandate.

## Package scope

This library is `@connorhoehnslalom/ui-components`. Its peer dependency is
`@connorhoehn/realtime-modules`, a different, connorhoehn-owned repo that was
never renamed. Do not "fix" that scope: the slalom-scoped package does not
exist, and rewriting both scopes together once broke main for two months.
Neither scope is published to a registry; every consumer uses a `file:` tarball
or git-sha pin.

## Commands

```bash
npm test                 # vitest (≈990 test files)
npm run lint             # tsc --noEmit on src AND demo (both; the demo once shipped a blank route while only src was checked)
npm run build            # vite lib build + subpath dts fixes; needs an 8 GB heap (wired in)
npm run demo             # dev server at http://localhost:5174
npm run test:e2e         # playwright, tests/e2e
npm run lint:static-styles && npm run lint:node-controls && npm run lint:hex-colors   # not chained into the main gate
node skills/ui-dom-audit/scripts/self-test.mjs --project ../aws-agentcore/portal     # after changing the audit skill
```

Verification gate for every commit: `npm test && npm run lint && npm run build`,
plus `npm run test:e2e` when touching `demo/**` or `tests/e2e/**`. No
`--no-verify`.

## Build and toolchain traps

- Every script runs `node scripts/tsc.mjs`, never bare `tsc`: TypeScript 7 has
  no JS compiler API, vite-plugin-dts pulls in TypeScript 6 for it, and that
  can re-point `node_modules/.bin/tsc`. Ambient `declare global` blocks must
  never name a module-local type (v5 copies them into every entry).
- `dist/` is tracked so git installs work without a toolchain, but its chunks
  are content-hashed. Build to verify, leave `dist/` out of feature commits;
  the release commit rebuilds it once.
- `build:types` emits outside `dist/` on purpose; an earlier version
  overwrote the rolled-up `dist/index.d.ts` with a 7 KB stub. The export-surface
  test checks every subpath's `.d.ts`.
- Scripts that reach into `node_modules` must resolve packages, not use paths
  (`scripts/resolve-realtime-modules.mjs`, `scripts/vite-build.mjs`), or they
  break in worktrees under `.claude/worktrees/`.
- Node floor for development is `^20.19.0 || >=22.12.0` (vite 8); it is
  deliberately not in `engines`, which is consumer-facing.
- If every e2e test dies at `browserType.launch`, run
  `npx playwright install chromium`.

## Exports

The `exports` map in `package.json` is the public surface: root, `/types`,
`/shared`, `/hooks`, `/identity`, `/social`, `/social/rich-composer`, `/ingest`,
`/agents`, `/pipelines`, `/doc-editor`, `/doc-types`, `/diagram`, `/graph`,
`/compute`, `/observability`, `/video`, `/video-ivs`, `/styles.css`,
`/integrations/realtime`, `/integrations/realtime-modules`. Layout components
(`AppShell`, `AppLayout`, `CollapsibleSidebar`) are root-only; there is no
`/layout` subpath. `/video-ivs` is `src/video-ivs.ts`, not a directory.

`/pipelines` and `/doc-editor` are frozen public API (2026-06-10): breaking
changes need a major bump and a consumer handoff. Name collisions at the root
are resolved in `src/index.ts`'s disambiguator block (`CommentThreadPanel`,
`VideoParticipant`, `IdentityFormField`, `IdentityAuditPage`).

No-touch without a handoff: `src/index.ts`, every stable barrel,
`social/ChatPanel.tsx` public props, `integrations/realtime-modules/index.ts`,
`styles.css` `@theme` tokens, `package.json` `exports`, `CHANGELOG.md`.

## Hard rules

1. **No `style={{}}` in `demo/src/**`** and no new inline styles in `src/`
   unless runtime-derived and allowlisted in
   `scripts/check-static-styles.allowlist.txt`. The guard resolves hoisted
   style constants too; it does not chase objects built inside a component, so
   treat it as a floor. Classify a violation as token swap, existing composite,
   or ship-the-primitive-first.
2. **Form controls go through `forms/`** (`Input`, `Select`, `Textarea`,
   `NumberInput`, `RadioGroup`, `Checkbox`, `Slider`, `ColorInput`,
   `ToggleField`). `lint:node-controls` guards the tree; never add a BASELINE
   entry for a convertible control.
3. **Every exported primitive ships with tests and a story.** Three tests are
   co-located beside their component (`layout/*.test.tsx`), so search by file
   name, not by `__tests__` path. A test file existing says nothing about
   which behaviour it covers.
4. **Semantic markers over visual inference.** Emit `data-ui-text`,
   `data-composer-surface`, `data-collection-page` and similar attributes from
   the owning component so the DOM audit can measure consumers without page
   exceptions. Keep font floors in the component, never a page CSS override.

## Design tokens

`src/styles.css` `@theme` is the single source of truth for branding; the demo
imports it (`demo/src/App.css`), never copies it. Compose classes with `cn()`.

Seven tones (`neutral`, `success`, `warning`, `danger`, `info`, `caution`,
`accent`), each with `--color-{tone}`, `-bg`, `-fg`, `-border`. Rules:

- Never name a raw palette colour or an arbitrary hex class. Go through
  `shared/tones.ts` or the token classes; `tones.test.ts` and
  `lint:hex-colors` enforce zero tolerance. Need a new colour? Add a tone.
  Exception: user-distinguishing colour **data** (avatar palettes, presence
  colours, fixtures) stays literal.
- Never define a second `Record<Tone, string>` palette; that is how the same
  state once rendered in two greens.
- Consumers rebrand by overriding the four `--color-accent*` variables after
  importing the stylesheet. `toneVar(tone)` for canvas/SVG values.
- Other families: `--color-text-*`, `--color-surface*`, `--color-border*`,
  `--color-state-*`, `--color-cat-*`, `--color-code-*`, `--color-video-*`,
  `--radius-*`, `--shadow-*`, `--font-code`.

`ThemeProvider` writes the real `--color-*` tokens; `lightTheme` must mirror
`@theme` (pinned by `ThemeProvider.tokens.test.tsx`), unmount removes every
property it wrote, and only one provider may exist per document (a nested one
does not write and warns). `preset="dark"` is partial.

## Releasing to the consumer

Bump `package.json` `version` in the same commit (patch = fix/internal,
minor = additive API, major = breaking with handoff). Build, then verify
against a **packed tarball**, not the repo: in-repo everything resolves from
`devDependencies`, which hid consumer-breaking imports until 2.40.1.
`src/__tests__/packaging.test.ts` checks externals, `.d.ts` imports and
subpath targets (it skips itself when `dist/` is absent). Then `npm pack`,
place the tarball in the consumer's `portal/vendor/`, update its `package.json`
and lockfile, clear the consumer's `node_modules/.vite` and restart its dev
server; a package version alone does not prove the browser serves the new
dist. Keep build, pack and install under one owner at a time.

`optional: true` on a peer is partly a lie: barrel re-exports (e.g.
`shared/Chart.tsx` importing `recharts`) make several subpaths fail to import
in Node ESM without the peer installed. The packaging test pins the current
static/dynamic peer sets per entry; shrinking is fine, growing must be
deliberate.

## UI DOM audit skill

`skills/ui-dom-audit/SKILL.md` is the portable, deterministic consistency
audit (geometry, computed styles, columns, tables, composer presence).
Frontends bind it with a small adapter; aws-agentcore's is
`portal/e2e/ui-dom-audit.adapter.ts`. When a reported defect slips past it,
add a general rule plus a failing/valid fixture pair to
`scripts/self-test.mjs`, never a page-name exception or a loosened tolerance.
