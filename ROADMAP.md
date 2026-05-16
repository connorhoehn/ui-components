# Roadmap — @connorhoehn/ui-components

Phases are sequential within a track. Tracks (Tailwind, Agents, Stability) can
advance in parallel.

---

## Track T — Tailwind CSS v4 migration

### T-W3a — Small domains (current)

Convert the six smallest wave-3 domains. Each is small enough for one commit.

- **observability** — 12 files, ~5.3K lines
- **video** — 7 files, ~560 lines
- **collaboration** — 8 files (keep dynamic cursor positioning as `style`)
- **doc-types** — 3 files
- **field-types** — 1 file
- **typed-documents** — 2 files

Acceptance: `npm test && npm run build` green. Zero new inline style usages.

### T-W3b — doc-editor

37 files, ~9.8K lines. TipTap-owned styles (editor content, ProseMirror internals)
must stay as `style` props or targeted CSS rules — do not blindly convert them.

### T-W3c — Pipelines refactor (prerequisite for W3d)

Extract shared patterns before converting 64 files of inline styles:

1. `PipelinePage` layout wrapper — used by AllRunsPage, PipelineRunsPage, PipelineStatsPage, PendingApprovalsPage
2. `NodeConfigShell` — used by all `*Config.tsx` panels (card + fieldset + save/cancel buttons)
3. `DataTable` primitive — used by RunsTable, ActiveRunsTable, and list pages
4. Consolidate `src/components/pipelines/ui/Button.tsx` + `IconButton.tsx` into `src/components/ui/`

Acceptance: component count unchanged, tests green, no visual regression in demo.

### T-W3d — Pipelines conversion

Convert the remaining ~38K lines (post-refactor estimate ~25K) to Tailwind.
Split into 2 parallel agents if available (see `TAILWIND_MIGRATION.md` Approach A).

### T-CLEANUP

After T-W3d:
- `grep -r "constants/styles" src/` → if zero results, delete `src/constants/styles.ts`
- Consolidate `src/components/pipelines/ui/` into `src/components/ui/` if not done in W3c
- Final `tsc --noEmit` — only 5 pre-existing errors allowed

---

## Track A — Agents module

### A1 — AG-UI v0.1.x stabilization (in progress)

Wave10 landed: canonical event types, `useAgUiStream` rewrite, `AgUiReasoningBlock`,
`StreamingChatPanel`. Remaining items:

- Add unit tests for `AgUiReasoningBlock` and `StreamingChatPanel` (currently untested)
- Add integration test: mount `AgentInvokePage` with a mock SSE endpoint
- Freeze AG-UI event types as stable exports (document in `agents/README.md`)
- Send handoffs to `websocket-gateway` and `event-catalog` when types stabilize

### A2 — Agent registry + policy integration

- `AgentDetailPage` guardrail badges and policy decision log wired to real data
- `GuardrailBadge` + `PolicyDecisionLog` currently render mock fixtures — wire to `/api/agents/:id`
- `MemoryInspector` similarly

### A3 — A2A flow canvas

- `AgentFlowPage` / `AgentFlowCanvas` built on `@xyflow/react` — wire live edges
- Add zoom/pan toolbar, node status colours, edge latency labels

---

## Track S — Stability

### S1 — Fix pre-existing TypeScript errors

Five errors predate the Tailwind migration:
- `useComments`, `useLikes`, `usePosts` — missing `../../types/gateway` module
- `src/index.ts` duplicate exports of `ThemeProvider` and `useTheme`

Resolve without breaking consumer imports.

### S2 — Expand test coverage

Only `src/components/shared/` has tests today (107 tests). Add:
- Tests for all `src/hooks/` exports
- Tests for `AgentsProvider` + `useAgUiStream`
- Smoke tests for `VideoPlayer`, `VideoGrid` with MediaStream mocks

### S3 — Consumer integration verification

After Tracks T and A reach completion, verify each consumer imports correctly:
1. `event-catalog` — admin views import from `/pipelines` without breakage
2. `websocket-gateway` — admin-ui, `/agents`, `/video` imports
3. `vnl-ads` — root index, `/identity`, `/social` imports

Send handoffs with migration notes when any stable export changes shape.

---

## Version targets

| Phase done | Version bump | Notes |
|---|---|---|
| T-W3a complete | 2.4.0 | Minor — no API changes |
| T-W3d + T-CLEANUP | 2.5.0 | Minor — CSS-only changes |
| A1 stabilized | 2.6.0 | Minor — new `/agents` stable API |
| S1 + S2 | 2.7.0 | Minor — bug fixes + tests |
| S3 verified | 3.0.0 | Major if any breaking API changes land |
