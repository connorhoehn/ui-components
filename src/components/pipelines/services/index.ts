// src/components/pipelines/services/index.ts

export {
  PipelineEditorServicesProvider,
  useImageUrl,
  // Non-throwing variant for consumers whose produced-images section is
  // optional (the run-detail step panel): no provider means "don't render it".
  useImageUrlOptional,
  usePipelineEditorServices,
  // Additive: hosts declare whether inbound webhook delivery is actually
  // wired. Defaults to disabled.
  useWebhookRelay,
} from './PipelineEditorServicesContext';
export type {
  UploadedImage,
  PipelineEditorServices,
  WebhookRelayStatus,
} from './PipelineEditorServicesContext';
