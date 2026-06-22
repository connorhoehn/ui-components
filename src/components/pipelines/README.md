# Pipelines — `@connorhoehnslalom/ui-components/pipelines`

Pipeline editor, runtime UI, runs/approvals, LLM nodes, DLQ inspector,
and the canvas surface built on `@xyflow/react`. The **largest domain
in the library** — 91 files. Consumed by `event-catalog` and
`websocket-gateway` admin views.

Subpath import (no root re-export — in-flux):

```tsx
import {
  PipelineEditor,
  AllRunsPage,
  PipelineRunsPage,
  PipelineStatsPage,
  PendingApprovalsPage,
  ContextInspector,
  DLQInspector,
} from '@connorhoehnslalom/ui-components/pipelines';
```

## Layout

```
pipelines/
  canvas/             — @xyflow/react canvas + node renderers
  context/            — PipelinesContext provider + hook
  context-inspector/  — interactive context-data viewer
  chaos/              — chaos-injection controls (dev-only)
  cost/               — cost-tracking views
  cron/               — scheduled-trigger UI
  dev/                — dev-mode utilities
  editor/             — editor shell, toolbars, side panels
  export/             — pipeline export flows
  hooks/              — domain-local hooks
  persistence/        — localStorage-backed pipeline definitions (JSON Schema
                        validation via AJV against schemas/pipeline.schema.json)
  AllRunsPage.tsx, PipelineRunsPage.tsx, PipelineStatsPage.tsx,
  PendingApprovalsPage.tsx, DLQInspector.tsx, ContextInspector.tsx,
  CompareStepMatrix.tsx, Diff* (StepTable, MetadataHeader, OutputViewer),
  EditorModals.tsx, ExecutorLog.tsx, …
```

## Stability

**In-flux.** Subpath-only. Wave 5 graduation tracked under hub#1062:
extract `<PipelineCanvasShell>` for reuse + finish Tailwind wave 3 over
the 91 pipeline files.

The pipeline editor surface ships its own canvas primitives because
`@xyflow/react` requires deep integration. Consumers should not import
canvas internals — only the page-level composites.

## Anti-goals

Per the constitution: **do not grow this domain further without first
extracting shared patterns**. Any new pipeline feature should either fit
into an existing extracted primitive or prompt a primitives-first
refactor (see `TAILWIND_MIGRATION.md` "Refactoring opportunities" for
the in-flight extractions: `PipelinePage` wrapper, `NodeConfigShell`,
`DataTable`).

## Tests

Severely under-tested — ratio 1/91 today (constitution principle 2
violation). Tracked under #1051. The persistence layer
(`persistence/pipelineStorage.ts`) carries an AJV-validated
import/export path that consumer apps depend on.

## See also

- [`../../../TAILWIND_MIGRATION.md`](../../../TAILWIND_MIGRATION.md) —
  remaining domain inline-style debt.
- Wave 5 in [`../../../ROADMAP.md`](../../../ROADMAP.md) for the
  graduation checklist.
- Demo route `/workflows/pipeline-editor` for the live editor.
