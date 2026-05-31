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
  adaptActivityEvent,
  adaptActivityEvents,
  adaptFileUploadState,
  adaptFileUploads,
  adaptHangoutParticipant,
  adaptHangoutParticipants,
  adaptNotification,
  adaptNotifications,
} from './adapters';
export type { FileUploadSummary } from './adapters';

// Wrapped components
export { WrappedChatPanel } from './WrappedChatPanel';
export type { WrappedChatPanelProps } from './WrappedChatPanel';

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
