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

// Host-injection seam: feed node components live run state from a host-owned
// runs store without mounting the bundled PipelineRunsProvider stack.
export {
  PipelineNodeRuntimeProvider,
  usePipelineNodeRuntime,
} from './context/PipelineNodeRuntimeContext';
export type {
  PipelineNodeRuntimeValue,
  PipelineNodeRuntimeProviderProps,
} from './context/PipelineNodeRuntimeContext';

export {
  PipelineEditorContext,
  PipelineEditorProvider,
  usePipelineEditor,
} from './context/PipelineEditorContext';
export type { PipelineEditorValue, PipelineEditorProviderProps } from './context/PipelineEditorContext';

// ─── Canvas ──────────────────────────────────────────────────────────────────
export { default as PipelineCanvas } from './canvas/PipelineCanvas';
export type { PipelineCanvasProps } from './canvas/PipelineCanvas';

export { default as NodePalette, PALETTE_ITEMS, recordRecentType } from './canvas/NodePalette';
export type { NodePaletteProps, PaletteItem } from './canvas/NodePalette';

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
  DimensionsNode,
  UpscaleNode,
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

// ─── Node visual system (categories, ports, edges, thumbs) ──────────────────
export { NODE_CATEGORIES, categoryFor } from './nodes/categories';
export type { NodeCategory } from './nodes/categories';
export { PORT_CLS, portCls } from './nodes/shared/ports';
export type { PortPayload } from './nodes/shared/ports';
export { default as NodeThumbStrip } from './nodes/shared/NodeThumbStrip';
export type { NodeThumbStripProps, NodeThumbStripImage } from './nodes/shared/NodeThumbStrip';
// Panel-building primitives, so a host adding its own node type can compose a
// config panel from the same parts the built-in panels use (additive, 2026-08-20).
export { default as ConfigField } from './nodes/shared/ConfigField';
export type { ConfigFieldProps } from './nodes/shared/ConfigField';
export { default as ConfigSection } from './nodes/shared/ConfigSection';
export { default as NodeConfigShell } from './nodes/shared/NodeConfigShell';
export { default as ToggleField } from './nodes/shared/ToggleField';
export type { ToggleFieldProps } from './nodes/shared/ToggleField';
export { default as SamplePills } from './nodes/shared/SamplePills';
export type { SamplePillsProps } from './nodes/shared/SamplePills';
export { default as SourceImagePathField } from './nodes/shared/SourceImagePathField';
export type { SourceImagePathFieldProps } from './nodes/shared/SourceImagePathField';
export { default as AnimatedEdge } from './canvas/edges/AnimatedEdge';
export type { AnimatedEdgeData, EdgeState, EdgePayload } from './canvas/edges/AnimatedEdge';

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
export { default as DimensionsConfig } from './nodes/dimensions/DimensionsConfig';
export type { DimensionsConfigProps } from './nodes/dimensions/DimensionsConfig';
export { default as UpscaleConfig } from './nodes/upscale/UpscaleConfig';
export type { UpscaleConfigProps } from './nodes/upscale/UpscaleConfig';
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

// ─── Image lineage DAG ────────────────────────────────────────────────────────
//
// <ImageLineageGraph> renders the per-run image artifact DAG (xyflow-based).
// useImageLineage() fetches /api/pipeline/runs/:runId/image-lineage with a
// module-level cache so multiple consumers share the same fetch.
export {
  ImageLineageGraph,
  useImageLineage,
  clearImageLineageCache,
} from './lineage';
export type {
  ImageLineageGraphProps,
  ImageLineageEntry,
  UseImageLineageResult,
} from './lineage';

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

// Upstream-context derivation — what `{{context.*}}` paths and image refs are
// actually available at a node, from its real position in the graph.
export {
  availableContextPaths,
  availableImageRefs,
  contextContributions,
  unresolvedTemplatePaths,
  upstreamNodeIds,
} from './context/upstreamContext';
export type { ContextPath, ImageRefOption } from './context/upstreamContext';
export { useUpstreamContext, useUpstreamImageRefs } from './context/useUpstreamContext';

// Host-declared executor capability. The palette and node cards mark types the
// host cannot run; omit `executableNodeTypes` and nothing is marked.
export { useIsNodeTypeExecutable } from './services/PipelineEditorServicesContext';

// Node types that ship without a settings UI — surfaced so a host can tell the
// author up front instead of after they place the node.
export { NODE_TYPES_WITHOUT_CONFIG } from './canvas/ConfigPanel';
export type { UpstreamContext } from './context/useUpstreamContext';
export { ContextVariablePicker } from './context/ContextVariablePicker';
export type { ContextVariablePickerProps } from './context/ContextVariablePicker';
