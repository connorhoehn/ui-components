// Pipelines domain barrel export

// ─── Page-level components ───────────────────────────────────────────────────
export { default as PipelineEditorPage } from './PipelineEditorPage';
export { default as PipelinesPage } from './PipelinesPage';
export { default as PipelineRunsPage } from './PipelineRunsPage';
export { default as PipelineRunReplayPage } from './PipelineRunReplayPage';
export { default as PipelineRunComparePage } from './PipelineRunComparePage';
export { default as PipelineRunDiff } from './PipelineRunDiff';
export { default as AllRunsPage } from './AllRunsPage';
export { default as PipelineStatsPage } from './PipelineStatsPage';
export { default as PendingApprovalsPage } from './PendingApprovalsPage';

// ─── Contexts & Providers ────────────────────────────────────────────────────
export {
  EventStreamProvider,
  useEventStreamContext,
  useEventStream,
} from './context/EventStreamContext';
export type { EventStreamValue, EventStreamProviderProps } from './context/EventStreamContext';

export {
  PipelineRunsProvider,
  usePipelineRuns,
  useRetryFromStep,
  useLatestStepForNode,
} from './context/PipelineRunsContext';
export type { PipelineRunsProviderProps } from './context/PipelineRunsContext';

export {
  PipelineEditorContext,
  PipelineEditorProvider,
  usePipelineEditor,
} from './context/PipelineEditorContext';
export type { PipelineEditorValue, PipelineEditorProviderProps } from './context/PipelineEditorContext';

// ─── Canvas ──────────────────────────────────────────────────────────────────
export { default as PipelineCanvas } from './canvas/PipelineCanvas';
export type { PipelineCanvasProps } from './canvas/PipelineCanvas';

// ─── Node types ──────────────────────────────────────────────────────────────
export {
  // Canonical
  TriggerNode,
  LLMNode,
  TransformNode,
  ConditionNode,
  ActionNode,
  ForkNode,
  JoinNode,
  ApprovalNode,
  AgentNode,
  McpToolNode,
  KnowledgeBaseNode,
  GraphQueryNode,
  MemoryNode,
  GuardrailNode,
  PolicyNode,
  AgUiOutputNode,
  BaseNode,
  // Image pipeline (Phase 1 + Phase 2b+2c)
  ImageSourceNode,
  SaveNode,
  ScatterNode,
  ResizeNode,
  TransformGeoNode,
  FormatConvertNode,
  SharpenNode,
  WatermarkNode,
  CropNode,
  AdjustBwNode,
  AdjustLayerNode,
  VisionNode,
  VisionClassifyNode,
  VisionDescribeNode,
  VisionTagNode,
  VisionExtractTextNode,
  GenerateNode,
  VariationNode,
  EditPromptNode,
  nodeTypes,
} from './nodes';
export type { NodeExecutionState } from './nodes';

// ─── Per-node config panels ──────────────────────────────────────────────────
export { default as ImageSourceConfig } from './nodes/image-source/ImageSourceConfig';
export type { ImageSourceConfigProps } from './nodes/image-source/ImageSourceConfig';
export { default as SaveConfig } from './nodes/save/SaveConfig';
export type { SaveConfigProps } from './nodes/save/SaveConfig';
export { default as ScatterConfig } from './nodes/scatter/ScatterConfig';
export { default as ResizeConfig } from './nodes/resize/ResizeConfig';
export { default as TransformGeoConfig } from './nodes/transform-geo/TransformGeoConfig';
export { default as FormatConvertConfig } from './nodes/format-convert/FormatConvertConfig';
export { default as SharpenConfig } from './nodes/sharpen/SharpenConfig';
export { default as WatermarkConfig } from './nodes/watermark/WatermarkConfig';
export { default as CropConfig } from './nodes/crop/CropConfig';
export { default as AdjustBwConfig } from './nodes/adjust-bw/AdjustBwConfig';
export { default as AdjustLayerConfig } from './nodes/adjust-layer/AdjustLayerConfig';
export { default as VisionConfig } from './nodes/vision/VisionConfig';
export { default as VisionClassifyConfig } from './nodes/vision-classify/VisionClassifyConfig';
export { default as VisionDescribeConfig } from './nodes/vision-describe/VisionDescribeConfig';
export { default as VisionTagConfig } from './nodes/vision-tag/VisionTagConfig';
export { default as VisionExtractTextConfig } from './nodes/vision-extract-text/VisionExtractTextConfig';
export { default as GenerateConfig } from './nodes/generate/GenerateConfig';
export { default as VariationConfig } from './nodes/variation/VariationConfig';
export { default as EditPromptConfig } from './nodes/edit-prompt/EditPromptConfig';

// ─── Vision-step visualization ───────────────────────────────────────────────
//
// Top-level: <VisionResultViewer>. Realtime hook: useVisionResults(). Compact
// activity-log entry: <VisionRunCard>. See `vision/index.ts` for the full
// surface + usage notes.
export * from './vision';

// ─── Judge-step visualization (LLM-as-judge) ─────────────────────────────────
//
// Top-level: <JudgmentResultViewer>. Sub-composites: <VerdictPanel>,
// <CriteriaPanel>. Realtime hook: useJudgmentResults(). Mirrors the vision
// surface — see `judge/index.ts` for the full surface + usage notes.
export * from './judge';

// ─── Pipeline editor services seam ───────────────────────────────────────────
//
// Host editors mount <PipelineEditorServicesProvider> to inject
// host-specific callbacks (getImageUrl, uploadImage). Node components call
// useImageUrl() / usePipelineEditorServices() — no direct host-module imports.
export {
  PipelineEditorServicesProvider,
  useImageUrl,
  usePipelineEditorServices,
} from './services';
export type {
  UploadedImage as PipelineUploadedImage,
  PipelineEditorServices,
} from './services';
