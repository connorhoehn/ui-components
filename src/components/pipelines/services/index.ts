// src/components/pipelines/services/index.ts

export {
  PipelineEditorServicesProvider,
  useImageUrl,
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
