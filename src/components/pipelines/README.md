# Pipelines — `@connorhoehnslalom/ui-components/pipelines`

Pipeline editor, runtime UI, runs/approvals, LLM nodes, DLQ inspector,
and the canvas surface built on `@xyflow/react`. The **largest domain
in the library**. Consumed by the `event-catalog` and `realtime-examples`
admin views.

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

**In-flux.** Subpath-only; the API may change between minor versions.

The pipeline editor surface ships its own canvas primitives because
`@xyflow/react` requires deep integration. Consumers should not import
canvas internals — only the page-level composites.

## Persistence

The persistence layer (`persistence/pipelineStorage.ts`) carries an
AJV-validated import/export path that consumer apps depend on.

## See also

- Demo route `/workflows/pipeline-editor` for the live editor.
