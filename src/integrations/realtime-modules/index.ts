// src/integrations/realtime-modules/index.ts
//
// Barrel for @connorhoehn/ui-components/integrations/realtime-modules
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

export { CapabilityBoundary } from './CapabilityBoundary';
export type { CapabilityBoundaryProps } from './CapabilityBoundary';
