# Vision-step visualization

Components for rendering structured output of vision-model pipeline steps
(image-vision-analyze, SAM-segmentation, embeddings, etc. — anything that
produces a `VisionResult`-shaped payload).

## Components

| Export | Purpose |
|---|---|
| `<VisionResultViewer>` | Top-level composite. Renders every populated section of a `VisionResult`. Two-column layout (image+bboxes left, panels right) on `md+`. |
| `<VisionRunCard>` | Compact (≈80px) summary card for activity logs. Shows endpoint, status, caption snippet, top tags. Status: `running` / `completed` / `failed`. |
| `<CaptionPanel>` | Caption + setting/location/tod/mood chips + color swatches. |
| `<ImageWithBBoxOverlay>` | Source image with overlaid bounding boxes for people (indigo) + objects (amber). Percentage-positioned, responsive. |
| `<PeoplePanel>` | Per-person rows: bbox badge, demographics chips, activity verb, clothing. Selectable for cross-highlight with the image overlay. |
| `<ObjectsPanel>` | 2-col grid of detected objects with bbox coordinates. |
| `<TagsPanel>` | Chip cloud of tags. Optional `onTagClick` for filter navigation. |
| `<EditRecommendationsPanel>` | Exposure / WB / contrast verdicts + actionable edit suggestions with optional "Apply" buttons. |
| `useVisionResults({ runId? })` | Hook that folds `pipeline.image.vision.*` events from the existing `EventStreamContext` into per-step records (running / completed / failed). Stable record identity per `(runId, stepId)`. |

## Integration with the existing pipelines page

The existing pipelines page provides three contexts the vision components
plug into without changes:

1. **`EventStreamProvider`** — wildcard pipeline-event stream (WebSocket-fed).
   `useVisionResults` subscribes via `useEventStream('*', …)` so no new
   transport is needed.
2. **`PipelineRunsProvider`** — per-run state. Vision-step entries appear in
   `pipelineRun.steps[stepId]` like any other step — render them as you
   already do.
3. **`PipelineEditorContext`** — pipeline-definition editor. A vision step is
   just a new action subtype (or a top-level node type — your call); the
   nodes registry is the only place to wire it.

### Activity-stream example

The user-facing pattern: in the activity log on `PipelinesPage`, surface
each vision-step run as a `<VisionRunCard>`. Click expands to the full
`<VisionResultViewer>`.

```tsx
import { useVisionResults, VisionRunCard, VisionResultViewer } from '@connorhoehnslalom/ui-components/pipelines';

function VisionActivityStream({ runId }: { runId?: string }) {
  const records = useVisionResults({ runId });
  const [openStepId, setOpenStepId] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-2">
      {records.map((r) => (
        <VisionRunCard
          key={`${r.runId}::${r.stepId}`}
          status={r.status}
          result={r.result}
          runId={r.runId}
          endpointLabel={r.endpointId}
          latencyMs={r.elapsedMs}
          error={r.error}
          onOpen={() => setOpenStepId(r.stepId)}
        />
      ))}
      {openStepId && (
        <Modal onClose={() => setOpenStepId(null)}>
          <VisionResultViewer
            result={records.find((r) => r.stepId === openStepId)?.result!}
            onTagClick={(t) => navigate(`/library?tag=${t}`)}
            onApplyEdit={(edit) => triggerEditPipeline(openStepId, edit)}
          />
        </Modal>
      )}
    </div>
  );
}
```

### Realtime sync flow

Per-event behavior of `useVisionResults`:

| Event | Action |
|---|---|
| `pipeline.image.vision.started` | Insert a new record with `status: 'running'`, `endpointId`, `startedAt`. |
| `pipeline.image.vision.completed` | Update the existing record to `status: 'completed'`, fill `result`, compute `elapsedMs`. |
| `pipeline.image.vision.failed` | Update the existing record to `status: 'failed'`, fill `error`, compute `elapsedMs`. |

Record identity is keyed by `(runId, stepId)`, so a running card transitions
in-place to completed (or failed) without remounting — no flicker.

### Step-output rendering inside `PipelineRunsPage`

The simpler pattern when you want the vision result inside the existing
per-step expanded view: render `<VisionResultViewer>` keyed on
`step.output` for steps where `step.kind === 'image:vision-analyze'`.
Falls back to the existing generic `<ContextInspector>` for any other
step kind, no router change needed.

```tsx
{step.kind === 'image:vision-analyze' && step.output ? (
  <VisionResultViewer result={step.output as VisionResult} />
) : (
  <ContextInspector value={step.output} />
)}
```

## VisionResult shape

```ts
interface VisionResult {
  imageUrl?: string;             // or imageDataUrl
  imageWidth?: number;           // required for bbox scaling
  imageHeight?: number;
  caption?: string;
  setting?: string;              // 'outdoor' / 'indoor'
  location?: string;             // 'beach' / 'cafe' / etc.
  timeOfDay?: string;            // 'afternoon' / 'night'
  mood?: string;
  colors?: string[];
  people?: VisionPerson[];       // bbox + demographics + activity + clothing
  objects?: VisionObject[];      // label + bbox
  text?: string[];               // OCR
  tags?: string[];
  exposure?: { verdict, evAdjustment, rationale };
  whiteBalance?: { verdict, kelvinShift, rationale };
  contrast?: 'low' | 'normal' | 'high';
  composition?: string;
  edits?: string[];
  rawText?: string;              // raw model output (replay / re-parse)
  model?: { endpointId, latencyMs, tokensIn?, tokensOut? };
}
```

Every field is optional. The renderers gracefully degrade — a result with
only `caption` + `tags` renders only those sections, nothing else.

## Files

```
src/components/pipelines/vision/
  types.ts                          → VisionResult + sub-types
  CaptionPanel.tsx                  → caption + scene chips
  ImageWithBBoxOverlay.tsx          → image + bboxes
  PeoplePanel.tsx                   → people detail rows
  ObjectsPanel.tsx                  → object list
  TagsPanel.tsx                     → tag chip cloud
  EditRecommendationsPanel.tsx      → exposure/WB/contrast/edits
  VisionResultViewer.tsx            → top-level composite
  VisionRunCard.tsx                 → compact summary
  useVisionResults.ts               → realtime event hook
  index.ts                          → barrel
  VisionResultViewer.stories.tsx    → Storybook (Miami beach + street cafe fixtures)
  __tests__/VisionResultViewer.test.tsx → vitest
  README.md                         → this file
```
