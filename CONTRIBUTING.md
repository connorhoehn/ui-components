# Contributing — @connorhoehnslalom/ui-components

This repo runs under an autonomous operating model. Most changes land
through the agent-hub task queue rather than ad-hoc PRs. If you are a
human contributor, the rules below still apply.

The canonical references are:

- [`.agent/CONSTITUTION.md`](.agent/CONSTITUTION.md) — mission, scope,
  principles, self-driven backlog, per-task LOC cap (200), daily cap (30).
- [`docs/AUTONOMY_CHARTER.md`](docs/AUTONOMY_CHARTER.md) — no-touch list,
  version-bump policy, forbidden actions, pre-commit gates,
  consumer-notification protocol.
- [`CLAUDE.md`](CLAUDE.md) — exports/stability map, source layout,
  hard rules.
- [`ROADMAP.md`](ROADMAP.md) — the 5-wave plan and current status.

## Quick commands

```bash
npm install
npm test            # vitest run — must be green before commit
npm run lint        # tsc --noEmit — must be 0 errors before commit
npm run build       # vite build (lib mode, multi-entry) + fix-subpath-dts
npm run demo        # demo site at http://localhost:5174
npm run storybook   # Storybook 10 at http://localhost:6006
npm run test:e2e    # Playwright E2E
npm run lint:static-styles  # drift guard for the inline-style allowlist
```

`npm test && npm run lint && npm run build` is the **pre-commit gate**
(charter §5). All three must pass before any commit lands on `main`.

## Branching and commits

- Trunk-based development. Commit directly to `main` once the
  pre-commit gate is green.
- Conventional commit prefixes: `feat(domain): …`, `fix(domain): …`,
  `chore(test): …`, `docs: …`. Reference the hub task id in the body
  as `Refs hub#<id>`.
- Small, atomic commits — one logical change each.
- Never `--no-verify`, never `--force` push to shared branches, never
  amend or rebase commits another agent may have based work on.

## Tests for every exported primitive

Constitution principle 2. A new public export must ship with at least
one behavioural test in a co-located `__tests__/` directory:

```
src/components/<domain>/MyComponent.tsx
src/components/<domain>/__tests__/MyComponent.test.tsx
```

Tests use Vitest + Testing Library. Mock external IO (`useWebSocket`,
`useYjsDoc`, fetch) — never open real sockets in unit tests.

## Stories for every primitive

New shared / layout / social / video / doc-editor components also ship
with a `*.stories.tsx` next to the component:

```
src/components/<domain>/MyComponent.tsx
src/components/<domain>/MyComponent.stories.tsx
```

Use `@storybook/react-vite`. One default story per variant; tag with
`['autodocs']` for inline arg tables.

## Tailwind v4 only

- No new inline `style={{}}` for static values. Use Tailwind classes
  via `cn()` from `src/lib/cn.ts`.
- Dynamic computed values (from props/state) may stay as `style` props
  — e.g. canvas anchors, percentage progress, status colours indexed by
  state.
- Tokens live in `src/styles.css` under `@theme`. Use the CSS variables
  (`--color-primary`, `--color-border`, `--color-state-running`, …)
  rather than hard-coded hex.
- `npm run lint:static-styles` enforces the allowlist on every commit.
- See [`TAILWIND_MIGRATION.md`](TAILWIND_MIGRATION.md) for conversion
  rules and the A/B/C violation classification.

## Public API discipline

The no-touch list in the charter §1 includes:

- `src/index.ts` (root barrel)
- every stable subpath barrel (`shared/index.ts`, `layout/index.ts`,
  `social/index.ts`, `video/index.ts`, `identity/index.ts`,
  `integrations/realtime-modules/index.ts`)
- `social/ChatPanel.tsx` public props
- `styles.css` `@theme` tokens
- `package.json` `exports` map
- `CHANGELOG.md`

Changing any of those:

1. Send a `create_handoff` to **each** consumer agent (`event-catalog`,
   `websocket-gateway`, `vnl-ads`).
2. If the change is breaking (no backwards-compatible fallback): raise
   a `raise_blocker` first and wait for operator review.
3. Wait the 24h soak window before merging the version bump.

## Version bumps

Per charter §2:

- **patch** — bug fixes, internal refactors, new tests/stories/docs,
  new private components.
- **minor** — new public exports, new optional props on stable
  components, new entry-point sub-paths.
- **major** — any breaking change. Requires `CHANGELOG.md` migration
  note + handoffs to all consumers **before** merge.

Every release bumps `package.json` `version` in the same commit. The
`dist/` rebuild commit may follow within the 24h soak window.

## Agent-hub workflow (autonomous mode)

1. `register_agent` → `heartbeat` → `read_handoffs` → `get_tasks`.
2. Batch-claim up to 5 open tasks owned by your role.
3. For each task: work on local `main`, commit atomically, run the
   pre-commit gate, `mark_task_done` with the final commit SHA in the
   summary. Cross-repo work goes through `create_handoff`, never direct
   edits in sibling repos.
4. After 3–4 tasks or empty queue: `/clear` and restart the loop.
5. If a task is ambiguous, requires push/deploy, asks for sudo, or
   would modify a sibling repo: `raise_blocker` and stop.

## Domain READMEs

Each top-level domain under `src/components/` has its own short README:

- [`shared/README.md`](src/components/shared/README.md)
- [`layout/README.md`](src/components/layout/README.md)
- [`social/README.md`](src/components/social/README.md)
- [`video/README.md`](src/components/video/README.md)
- [`identity/README.md`](src/components/identity/README.md)
- [`agents/README.md`](src/components/agents/README.md)
- [`pipelines/README.md`](src/components/pipelines/README.md)
- [`observability/README.md`](src/components/observability/README.md)

When you add or graduate a component, update the corresponding domain
README in the same commit.
