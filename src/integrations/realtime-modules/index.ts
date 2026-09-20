// src/integrations/realtime-modules/index.ts
//
// Barrel for @connorhoehnslalom/ui-components/integrations/realtime-modules
//
// Three categories of exports:
//   1. Structural mirror types (RMChatMessage, RMPresenceEntry, …)
//   2. Pure adapter functions (adaptChatMessage, adaptPresenceRoster, …)
//   3. Wrapped components (WrappedChatPanel, WrappedPresencePanel, …)

// Types
export type {
  RMChatMessage,
  RMPresenceStatus,
  RMPresenceEntry,
  RMReaction,
  RMActivityEvent,
  RMFileUploadState,
  RMChannelTransfer,
  RMHangoutParticipant,
  RMHangoutSession,
  RMNotificationEntry,
  RMCapabilityHookResult,
  RMUseChatReturn,
  RMUsePresenceReturn,
  RMUseReactionsReturn,
  RMUseActivityReturn,
  RMUseFileUploadReturn,
  RMUseVideoHangoutReturn,
  RMUseNotificationsReturn,
  // Hangout rooms (new in 2026-05)
  RMRoomVisibility,
  RMRoomState,
  RMRoomSettings,
  RMRoom,
  RMRoomOccupancyMember,
  RMRoomOccupancy,
  RMCreateRoomInput,
  RMJoinRoomResult,
  RMUseHangoutRoomsReturn,
  RMUseRoomOccupancyReturn,
} from './types';

// Adapters
export {
  adaptChatMessage,
  adaptChatMessages,
  adaptPresenceEntry,
  adaptPresenceRoster,
  adaptReaction,
  adaptReactions,
  adaptMessageReactions,
  adaptActivityEvent,
  adaptActivityEvents,
  adaptFileUploadState,
  adaptFileUploads,
  adaptHangoutParticipant,
  adaptHangoutParticipants,
  adaptNotification,
  adaptNotifications,
} from './adapters';
export type { FileUploadSummary, UIMessageReaction } from './adapters';

// Wrapped components
export { WrappedChatPanel } from './WrappedChatPanel';
export type { WrappedChatPanelProps, RMUsePinsReturn } from './WrappedChatPanel';

export { WrappedPresencePanel } from './WrappedPresencePanel';
export type { WrappedPresencePanelProps } from './WrappedPresencePanel';

export { WrappedActivityPanel } from './WrappedActivityPanel';
export type { WrappedActivityPanelProps } from './WrappedActivityPanel';

export { WrappedReactionsOverlay } from './WrappedReactionsOverlay';
export type { WrappedReactionsOverlayProps } from './WrappedReactionsOverlay';

export { WrappedFileUploadDrop } from './WrappedFileUploadDrop';
export type { WrappedFileUploadDropProps } from './WrappedFileUploadDrop';

export { WrappedHangoutLayout } from './WrappedHangoutLayout';
export type { WrappedHangoutLayoutProps } from './WrappedHangoutLayout';

export { WrappedNotificationCenter } from './WrappedNotificationCenter';
export type { WrappedNotificationCenterProps } from './WrappedNotificationCenter';

export { WrappedConnectionPill } from './WrappedConnectionPill';
export type {
  WrappedConnectionPillProps,
  RMConnectionState,
  RMConnectionStateSource,
} from './WrappedConnectionPill';

export { CapabilityBoundary } from './CapabilityBoundary';
export type { CapabilityBoundaryProps } from './CapabilityBoundary';

export { ReconnectingShim } from './ReconnectingShim';
export type {
  ReconnectingShimProps,
  ReconnectingShimConnectionState,
} from './ReconnectingShim';

export { NetworkErrorBoundary } from './NetworkErrorBoundary';
export type { NetworkErrorBoundaryProps } from './NetworkErrorBoundary';

export { applyNetworkShim } from './networkShim';
export type { NetworkShimOptions } from './networkShim';

// ── Hangout rooms composites (2026-05) ──
export { HangoutRoomRow } from './HangoutRoomRow';
export type { HangoutRoomRowProps } from './HangoutRoomRow';

export { HangoutRoomsSection } from './HangoutRoomsSection';
export type { HangoutRoomsSectionProps } from './HangoutRoomsSection';

export { NewHangoutRoomDialog, slugifyRoomName } from './NewHangoutRoomDialog';
export type { NewHangoutRoomDialogProps } from './NewHangoutRoomDialog';

// ── LVS hangout adapter (2026-06, gateway-locked contract) ──
export { default as WrappedLVSHangoutLayout } from './WrappedLVSHangoutLayout';
export type {
  WrappedLVSHangoutLayoutProps,
  WrappedHangoutState,
} from './WrappedLVSHangoutLayout';

export { WrappedHangoutRoomsList } from './WrappedHangoutRoomsList';
export type { WrappedHangoutRoomsListProps } from './WrappedHangoutRoomsList';

export { WrappedMediaEffectsTray } from './WrappedMediaEffectsTray';
export type {
  WrappedMediaEffectsTrayProps,
  RMMediaEffectsControllerSource,
  RMBackgroundMode,
} from './WrappedMediaEffectsTray';

// ── Preview-before-publish effects (2026-08) ──
export { WrappedMediaEffectsPreviewPanel } from './WrappedMediaEffectsPreviewPanel';
export type {
  WrappedMediaEffectsPreviewPanelProps,
  RMMediaEffectsPreviewControllerSource,
  RMMediaEffectsSettings,
} from './WrappedMediaEffectsPreviewPanel';

export { default as WrappedCanvasDocument } from './WrappedCanvasDocument';
export type {
  WrappedCanvasDocumentProps,
  RMUseCanvasDocumentReturn,
} from './WrappedCanvasDocument';

// Capability composition — what an embedded surface is ALLOWED to render.
// Effective = declared by the host ∩ provisioned by the gateway; see
// ./capabilities for why either alone is the wrong answer.
export {
  RealtimeCapabilityProvider,
  CapabilityGate,
  useRealtimeCapabilities,
  ALL_REALTIME_CAPABILITIES,
  DEFAULT_REALTIME_CAPABILITIES,
} from './capabilities';
export type {
  RealtimeCapabilitySet,
  RealtimeCapabilityName,
  ResolvedCapabilities,
  RealtimeCapabilityProviderProps,
  CapabilityGateProps,
} from './capabilities';

// The whole conversation, capability-gated. `effective = declared ∩
// provisioned` — see the component header for why either gate alone is wrong.
export {
  WrappedConversationSurface,
  capabilityNamesFor,
  conversationFeaturesFor,
  CONVERSATION_CAPABILITY_NAMES,
} from './WrappedConversationSurface';
export type {
  WrappedConversationSurfaceProps,
  RMCapabilityMap,
} from './WrappedConversationSurface';

// WrappedStreamStage — watch a channel in either transport. The mode is data:
// 'realtime' (WHEP, sub-second, per-viewer cost) or 'near-realtime' (HLS,
// cacheable, any audience size). See the file header for how to choose.
export { WrappedStreamStage } from './WrappedStreamStage';
export type { WrappedStreamStageProps, StreamMode } from './WrappedStreamStage';

export { useDocumentImageUpload, acceptsDocumentImage, MAX_IMAGE_BYTES, MAX_ATTACHMENT_BYTES } from './useDocumentImageUpload';
export type { DocumentImageUpload, DocumentFileUploadHook, DocumentUploadCompletion, UploadedDocumentFile } from './useDocumentImageUpload';
