# Roadmap — @connorhoehn/ui-components

Phases are sequential within a track. Tracks (Tailwind, Agents, Stability) can
advance in parallel.

---

## Track T — Tailwind CSS v4 migration ✅ COMPLETE

All waves shipped. See `TAILWIND_MIGRATION.md` for full record.

- **W1** (f0ad1ed) — Infrastructure + shared components (19 files)
- **W2** (b033c53) — Layout, UI, misc, identity, social, ingest (71 files)
- **W3a–W3b** — observability, video, collaboration, doc-types, field-types, typed-documents, doc-editor
- **W3c–W3d (pipelines)** — all 92 pipeline files use Tailwind; remaining `style={{}}` are legitimately dynamic (canvas anchors, status colors, timeline geometry). Allowlist locked at 79 files.
- **Drift guard** — `npm run lint:static-styles` enforces the allowlist on every commit.

No further wave work scheduled. Revisit if `lint:static-styles` catches a regression.

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
