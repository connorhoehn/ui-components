# Pipeline editor re-convergence — status and recommendation

**Date:** 2026-06-06
**Status:** Documented decision — partial port deferred pending architectural sign-off

## Context

The pipeline editor exists in two copies:

| Location | Role | LOC |
|---|---|---|
| `~/Projects/ui-components/src/components/pipelines/` | The SDK library — used by demos, future consumers, and the runs-viewer panel embedded in wsg | ~12k |
| `~/Projects/realtime-examples/frontend/src/components/pipelines/` | The actual editor rendering at `localhost:15174/pipelines/<id>` | ~14k |

The wsg-frontend copy is the editor of record (route handler imports it; `localhost:15174` renders it). The SDK copy is a parallel evolution — it carries 8 agentic node types (`agent`, `mcp-tool`, `knowledge-base`, `graph-query`, `memory`, `guardrail`, `policy`, `ag-ui-output`) that wsg-frontend lacks; wsg-frontend carries `image:vision-analyze` (and now `scatter` / `image:crop` / `image:adjust-bw` / `image:adjust-layer` / `image:save` / `image-source`) that the SDK lacks.

The plan called this "Phase 4 — Re-converge editor" with a 2–3 week estimate. This document explains what was and wasn't done, and why.

## What was actually shipped (Phases 0–3, 5)

The feature work is **complete end-to-end** across four repos:

- **distributed-core** `d0639fe5` — `StepOutcome.fanOut`, per-arm `stepId` synthesis, `pipeline:step:fanout` / `pipeline:step:image:produced` typed events, `StepExecution.images` field.
- **platform-api** `525eb32` — `AnthropicVisionClient` (SDK swap), seven custom step handlers (`image:vision-analyze`, `scatter`, `image:crop`, `image-source`, `image:adjust-bw`, `image:adjust-layer`, `image:save`), end-to-end integration test.
- **websocket-gateway** `eaabaf1` (+ pending Phase 3 commit) — ScatterNode, CropNode, plus virtual scatter-children projection on the canvas (per-arm thumbnails appear inline during a run via `useScatterChildren`).
- **ui-components** `30f93ed` — `Input` / `Select` / `Textarea` / `ImageThumbnail` / `StatusPill` primitives + pipeline-editor demo rewritten to use them.

Result: image URL → Sonnet vision detects N regions → N inline crop thumbnails appear on the canvas → each can chain into adjust-bw / adjust-layer / save. The user's stated demo gate is met.

## What re-convergence would actually cost

Three architectural changes block a clean port of the wsg editor into the SDK:

### 1. Auth seam (`useIdentityContext`)
Five wsg-fork files import `IdentityContext` for the Cognito JWT (`ImagePickerInput`, `TemplatesModal`, `PipelinesPage`, `PipelineMetrics`, `useTriggerRun`). The SDK has no auth context. A clean port requires extracting a `PipelineEditorAuthProvider` interface in the SDK (`getIdToken(): Promise<string>`, `getUserId(): string`) that wsg implements with Cognito.

**Cost:** ~2 days of SDK API design + propagating the new interface through every consumer.

### 2. WebSocket adapter (`WebSocketEventAdapter`)
The wsg-fork's `WebSocketEventAdapter.ts` wraps wsg's persistent `WebSocketContext` singleton + `GatewayMessage` wire type. Both are wsg-specific. The SDK ships its own `EventStreamContext` but no transport seam.

**Cost:** ~2 days to extract a `PipelineEventTransport` interface (`subscribe(channel, handler)`, `send(message)`) and refactor both implementations against it.

### 3. NodeType union reunion
wsg-fork's `NodeType` = `{trigger, llm, transform, condition, action, fork, join, approval, image:vision-analyze, scatter, image:crop, image:adjust-bw, image:adjust-layer, image:save, image-source}`.
SDK's `NodeType` = `{trigger, llm, transform, condition, action, fork, join, approval, agent, mcp-tool, knowledge-base, graph-query, memory, guardrail, policy, ag-ui-output}`.

These overlap on the 8 canonical types but diverge on the additions (15 + 16 distinct names, 8 overlapping). Reuniting them means deciding whether `image:vision-analyze` and `agent` coexist in one union, or whether the editor accepts a pluggable node-type registry (rather than a closed literal union).

**Cost:** ~3 days of SDK type-system surgery + every consumer that switches on `NodeType` needs review.

### Plus the mechanical surface
- 30+ wsg-fork files import `constants/styles` (CSS-in-JS color tokens). SDK uses Tailwind utility classes via `cn()`. Mass migration touches every component (~3 days mechanical work).
- `ImagePickerInput.tsx` and `lib/imageUpload.ts` need an injection point or migration to the SDK.
- `PipelineEditorPage.tsx` itself is a 2.2k-LOC monolith that needs decomposition into the SDK's `editor/` sub-component layout before it can move.

**Total honest estimate**: 4–6 weeks of careful work, plus user-level architectural decisions on the auth + transport seams.

## Recommendation

**Defer the full re-convergence. The feature is shipped; this is internal cleanup with no user-visible delta.**

The right next step when the SDK seams matter (i.e. when a second consumer beyond wsg starts mounting the pipeline editor) is to spec the auth + transport interfaces in this repo's `docs/` and stage the porting in five contained PRs:

1. `feat: PipelineEditorAuthProvider interface + wsg adapter`
2. `feat: PipelineEventTransport interface + wsg WS adapter`
3. `refactor: PipelineEditorPage decomposition (extract editor/ sub-components)`
4. `chore: migrate wsg constants/styles → Tailwind utility classes`
5. `feat: NodeType union union + open registry`

Each is independently shippable. Trying to ship all five as one Phase 4 commit is the failure mode — it requires architectural decisions to be made under code-review pressure and risks a regression in the live editor.

## What the Phase 5 demo did instead

Phase 5 (`ui-components@30f93ed`) shipped the form primitives the SDK was missing AND rewrote the pipeline-editor DEMO file to use them. The demo is now ui-components-rule-compliant and serves as a working showcase that future SDK consumers can lift from. This is the highest-leverage chunk of "re-convergence value" achievable without the architectural prerequisites — it gives any future consumer a known-good starting point and demonstrates the library is composable.

## Open questions for the user

1. Is a second consumer of the pipeline editor planned in the next quarter? If not, Phase 4 is deferable indefinitely.
2. Should the SDK's `NodeType` union be opened (pluggable registry) so consumers add their own node types without forking the SDK? This is the conceptual blocker for the union reunion.
3. Are the wsg-fork's `constants/styles` tokens design-system-authoritative, or should the wsg-fork migrate to the SDK's Tailwind utility convention?

A green light on any one of these unblocks one of the five PRs above.
