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
  TriggerNode,
  LLMNode,
  TransformNode,
  ConditionNode,
  ActionNode,
  ForkNode,
  JoinNode,
  ApprovalNode,
  BaseNode,
  nodeTypes,
} from './nodes';
export type { NodeExecutionState } from './nodes';

// ─── Vision-step visualization ───────────────────────────────────────────────
//
// Top-level: <VisionResultViewer>. Realtime hook: useVisionResults(). Compact
// activity-log entry: <VisionRunCard>. See `vision/index.ts` for the full
// surface + usage notes.
export * from './vision';
