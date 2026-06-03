// Vision-step visualization composites for the pipelines page.
//
// Top-level entry: `<VisionResultViewer>` — renders the full structured
// output of a vision-model run (CAPTION + setting + PEOPLE/OBJECTS bboxes
// + tags + edit recommendations). Drop into a `pipeline.image.vision.completed`
// step's expanded view.
//
// Compact entry: `<VisionRunCard>` — single-line summary for activity logs.
//
// Realtime: `useVisionResults({ runId? })` — folds the existing pipeline
// event stream's `pipeline.image.vision.*` events into running/completed/
// failed records. Lives on the same `EventStreamContext` the existing
// runs page already provides.

export { CaptionPanel } from './CaptionPanel';
export type { CaptionPanelProps } from './CaptionPanel';

export { ImageWithBBoxOverlay, imageOverlayPropsFrom } from './ImageWithBBoxOverlay';
export type { ImageWithBBoxOverlayProps } from './ImageWithBBoxOverlay';

export { PeoplePanel } from './PeoplePanel';
export type { PeoplePanelProps } from './PeoplePanel';

export { ObjectsPanel } from './ObjectsPanel';
export type { ObjectsPanelProps } from './ObjectsPanel';

export { TagsPanel } from './TagsPanel';
export type { TagsPanelProps } from './TagsPanel';

export { EditRecommendationsPanel } from './EditRecommendationsPanel';
export type { EditRecommendationsPanelProps } from './EditRecommendationsPanel';

export { VisionResultViewer } from './VisionResultViewer';
export type { VisionResultViewerProps } from './VisionResultViewer';

export { VisionRunCard } from './VisionRunCard';
export type { VisionRunCardProps, VisionRunStatus } from './VisionRunCard';

export { useVisionResults } from './useVisionResults';
export type {
  UseVisionResultsOptions,
  VisionStepRecord,
  VisionStepStatus,
  PipelineImageVisionStartedPayload,
  PipelineImageVisionCompletedPayload,
  PipelineImageVisionFailedPayload,
} from './useVisionResults';

export type {
  VisionAgeBucket,
  VisionBBox,
  VisionContrastVerdict,
  VisionExposure,
  VisionObject,
  VisionPerson,
  VisionResult,
  VisionWhiteBalance,
} from './types';
