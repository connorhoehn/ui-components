// src/integrations/realtime/index.ts
//
// Barrel for @connorhoehn/ui-components/integrations/realtime — the
// SCOPE-AGNOSTIC realtime integration entry.
//
// Nothing in this entry imports `@connorhoehn/realtime-modules` at runtime, so
// it loads under any install scope (e.g. `@connorhoehnslalom/realtime-modules`).
//   1. Pure mirror types, adapters and props-driven wrappers — exported as-is.
//   2. Hook-bound integrations — as factories over an injected
//      `RealtimeClientModules` bag: `createRealtimeIntegrations(rm)`, or
//      `<RealtimeIntegrationsProvider modules={rm}>` + `useRealtimeIntegrations()`.
//
// `integrations/realtime-modules` re-exports all of (1) and binds (2) to the
// canonical package, for apps installed under `@connorhoehn`.

// ── Injection ──
export type { RealtimeClientModules } from './modules';
export {
  createRealtimeIntegrations,
  RealtimeIntegrationsProvider,
  useRealtimeIntegrations,
} from './createRealtimeIntegrations';
export type {
  RealtimeIntegrations,
  RealtimeIntegrationsProviderProps,
} from './createRealtimeIntegrations';

// Per-component factories, for an app that wants one wrapper without the rest.
export { createHangoutRoomRow } from './HangoutRoomRow';
export type { HangoutRoomRowProps, HangoutRoomRowModules, HangoutRoomRowComponent } from './HangoutRoomRow';
export { createHangoutRoomsSection } from './HangoutRoomsSection';
export type { HangoutRoomsSectionProps, HangoutRoomsSectionComponent } from './HangoutRoomsSection';
export { createWrappedHangoutRoomsList } from './WrappedHangoutRoomsList';
export type { WrappedHangoutRoomsListProps, WrappedHangoutRoomsListComponent } from './WrappedHangoutRoomsList';
export { createWrappedStreamStage } from './WrappedStreamStage';
export type {
  WrappedStreamStageProps,
  StreamMode,
  WrappedStreamStageModules,
  WrappedStreamStageComponent,
} from './WrappedStreamStage';
export { createWrappedLVSHangoutLayout } from './WrappedLVSHangoutLayout';
export type {
  WrappedLVSHangoutLayoutProps,
  WrappedHangoutState,
  WrappedLVSHangoutLayoutModules,
  WrappedLVSHangoutLayoutComponent,
} from './WrappedLVSHangoutLayout';

// The canvas document assembly: extension list, authenticated images, recovery,
// save state, insert-image — one composite over injected hooks.
export { createCanvasDocumentPane } from './CanvasDocumentPane';
export type {
  CanvasDocumentPaneProps,
  CanvasDocumentPaneParts,
  CanvasDocumentPaneState,
  CanvasDocumentPaneModules,
  CanvasDocumentPaneComponent,
  CanvasPaneGateway,
  CanvasPaneYjsDoc,
} from './CanvasDocumentPane';
export { buildCanvasDocumentExtensions } from './canvasDocumentExtensions';
export type { CanvasDocumentExtensionParts, CreateCanvasExtensions } from './canvasDocumentExtensions';
export { useCanvasRecovery } from './useCanvasRecovery';
export { canvasRecoveryKey, encodeCanvasRecovery, decodeCanvasRecovery } from './canvasRecovery';
export type { CanvasRecovery } from './canvasRecovery';
export { canvasDocumentSaveState, canEditCanvasGrant } from './canvasDocumentState';

// Capabilities: the gate and the hook are pure (they read a shared context);
// only the provider calls `useCapabilities`, so only it is a factory.
export {
  createRealtimeCapabilityProvider,
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
  RealtimeCapabilityProviderModules,
  RealtimeCapabilityProviderComponent,
  CapabilityGateProps,
} from './capabilities';

// The conversation surface is props-driven; only conversationFeaturesFor needs
// `lobbyForChannel`.
export {
  WrappedConversationSurface,
  capabilityNamesFor,
  CONVERSATION_CAPABILITY_NAMES,
  createConversationFeaturesFor,
} from './WrappedConversationSurface';
export type {
  WrappedConversationSurfaceProps,
  RMCapabilityMap,
  UngatedConversationFeature,
  GatedConversationFeature,
  ConversationFeaturesForOptions,
  ConversationFeaturesFor,
  ConversationFeaturesForModules,
} from './WrappedConversationSurface';

// Conversation calls (a DM / room call docked above a composer, rung over the
// gateway): the shelf binds RM's `conversationCallDockProps` +
// `useAudioVideoSettings`; the ring toast is props-driven.
export { createConversationCallDock } from './ConversationCallDock';
export type {
  ConversationCallDockProps,
  ConversationCallDockModules,
  ConversationCallDockComponent,
} from './ConversationCallDock';
export { IncomingCallToast, incomingCallTitle } from './IncomingCallToast';
export type { IncomingCallToastProps } from './IncomingCallToast';
export type {
  RMConversationCallPhase,
  RMConversationCallParticipant,
  RMConversationCallSource,
  RMDevicePreferences,
  RMIncomingConversationCall,
} from './conversationCallTypes';

// ── Pure: types, adapters, props-driven wrappers ──
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
  RMUseCursorReturn,
  RMCursorEntry,
  RMUseActivityReturn,
  RMUseFileUploadReturn,
  RMUseVideoHangoutReturn,
  RMUseNotificationsReturn,
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
} from '../realtime-modules/types';

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
} from '../realtime-modules/adapters';
export type { FileUploadSummary, UIMessageReaction } from '../realtime-modules/adapters';

export { WrappedChatPanel } from '../realtime-modules/WrappedChatPanel';
export type { WrappedChatPanelProps, RMUsePinsReturn } from '../realtime-modules/WrappedChatPanel';
export { WrappedPresencePanel } from '../realtime-modules/WrappedPresencePanel';
export type { WrappedPresencePanelProps } from '../realtime-modules/WrappedPresencePanel';
export { WrappedActivityPanel } from '../realtime-modules/WrappedActivityPanel';
export type { WrappedActivityPanelProps } from '../realtime-modules/WrappedActivityPanel';
export { WrappedCursorOverlay } from '../realtime-modules/WrappedCursorOverlay';
export type { WrappedCursorOverlayProps } from '../realtime-modules/WrappedCursorOverlay';
export { WrappedReactionsOverlay } from '../realtime-modules/WrappedReactionsOverlay';
export type { WrappedReactionsOverlayProps } from '../realtime-modules/WrappedReactionsOverlay';
export { WrappedFileUploadDrop } from '../realtime-modules/WrappedFileUploadDrop';
export type { WrappedFileUploadDropProps } from '../realtime-modules/WrappedFileUploadDrop';
export { WrappedHangoutLayout } from '../realtime-modules/WrappedHangoutLayout';
export type { WrappedHangoutLayoutProps } from '../realtime-modules/WrappedHangoutLayout';
export { WrappedNotificationCenter } from '../realtime-modules/WrappedNotificationCenter';
export type { WrappedNotificationCenterProps } from '../realtime-modules/WrappedNotificationCenter';
export { WrappedNotificationBell } from '../realtime-modules/WrappedNotificationBell';
export type { WrappedNotificationBellProps } from '../realtime-modules/WrappedNotificationBell';
export { WrappedConnectionPill } from '../realtime-modules/WrappedConnectionPill';
export type {
  WrappedConnectionPillProps,
  RMConnectionState,
  RMConnectionStateSource,
} from '../realtime-modules/WrappedConnectionPill';
export { CapabilityBoundary } from '../realtime-modules/CapabilityBoundary';
export type { CapabilityBoundaryProps } from '../realtime-modules/CapabilityBoundary';
export { ReconnectingShim } from '../realtime-modules/ReconnectingShim';
export type { ReconnectingShimProps, ReconnectingShimConnectionState } from '../realtime-modules/ReconnectingShim';
export { NetworkErrorBoundary } from '../realtime-modules/NetworkErrorBoundary';
export type { NetworkErrorBoundaryProps } from '../realtime-modules/NetworkErrorBoundary';
export { applyNetworkShim } from '../realtime-modules/networkShim';
export type { NetworkShimOptions } from '../realtime-modules/networkShim';
export { NewHangoutRoomDialog, slugifyRoomName } from '../realtime-modules/NewHangoutRoomDialog';
export type { NewHangoutRoomDialogProps } from '../realtime-modules/NewHangoutRoomDialog';
export { WrappedMediaEffectsTray } from '../realtime-modules/WrappedMediaEffectsTray';
export type {
  WrappedMediaEffectsTrayProps,
  RMMediaEffectsControllerSource,
  RMBackgroundMode,
} from '../realtime-modules/WrappedMediaEffectsTray';
export { WrappedMediaEffectsPreviewPanel, mediaEffectsChangeCount } from '../realtime-modules/WrappedMediaEffectsPreviewPanel';
export type {
  WrappedMediaEffectsPreviewPanelProps,
  RMMediaEffectsPreviewControllerSource,
  RMMediaEffectsSettings,
} from '../realtime-modules/WrappedMediaEffectsPreviewPanel';
export { default as WrappedCanvasDocument } from '../realtime-modules/WrappedCanvasDocument';
export type { WrappedCanvasDocumentProps, RMUseCanvasDocumentReturn } from '../realtime-modules/WrappedCanvasDocument';
export {
  useDocumentImageUpload,
  acceptsDocumentImage,
  MAX_IMAGE_BYTES,
  MAX_ATTACHMENT_BYTES,
} from '../realtime-modules/useDocumentImageUpload';
export type {
  DocumentImageUpload,
  DocumentFileUploadHook,
  DocumentUploadCompletion,
  UploadedDocumentFile,
} from '../realtime-modules/useDocumentImageUpload';
export { WrappedAudioVideoSettingsForm } from '../realtime-modules/WrappedAudioVideoSettingsForm';
export type {
  WrappedAudioVideoSettingsFormProps,
  RMMediaDevicesSource,
  RMAudioVideoSettingsSource,
} from '../realtime-modules/WrappedAudioVideoSettingsForm';

// The call block (2.439.0): one conversation call and one media sink for the
// whole shell, the pre-join check, rings, and `useCallBlock(channel)` for the
// composer's `callBlock` slot — bound once to the installed call hooks.
export { createCallBlockHost } from './CallBlockHost';
export type {
  CallBlockHost,
  CallBlockModules,
  CallBlockCall,
  CallBlockRing,
  CallBlockProps,
  CallBlockView,
  CallHostValue,
  CallHostProviderProps,
  CallHostEvent,
  CallHostEventKind,
  OnCallHostEvent,
  CallLobby,
  CallMediaPanelState,
  CallMediaOutletProps,
  UseCallBlockOptions,
} from './CallBlockHost';
export { callDrawn, callCounts, pageHuddleStart } from './callBlockModel';
export type {
  CallPhase,
  CallBlockPlacement,
  CallBlockClaimPlacement,
  CallBlockDocument,
  PreJoinChoice,
  PreJoinKind,
} from './callBlockModel';

// Meetings (2.458.0): raised hands and breakout rooms from realtime-modules'
// useMeeting (0.121.0+), passed in as a structural source — no runtime import.
export {
  WrappedBreakoutRoomsPanel,
  WrappedBreakoutRoomBanner,
  adaptBreakoutRooms,
  defaultRoomDrafts,
  meetingHandPositions,
  meetingRosterProps,
  meetingToolbarItems,
} from './meeting';
export type {
  RMBreakoutState,
  RMMeetingPerson,
  RMMeetingSource,
  RMRaisedHand,
  WrappedBreakoutRoomsPanelProps,
} from './meeting';
