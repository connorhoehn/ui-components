// src/integrations/realtime-modules/types.ts
//
// Structural mirror types for realtime-modules hook outputs.
//
// We copy the shapes (not import them) so this integration subpath compiles
// without a hard runtime dep on @connorhoehn/realtime-modules.
// The actual realtime-modules package declares identical interfaces —
// structural typing means any real hook return value satisfies these types.

/** Mirror of realtime-modules/src/client/types.ts ChatMessage */
export interface RMChatMessage {
  id: string;
  clientId: string;
  /**
   * The AUTHENTICATED author. realtime-modules has emitted this since the
   * gateway started stamping it, but this mirror never declared it, so the
   * adapter below could not carry it even in principle — and "is this message
   * mine" keys on exactly this field. Without it every message in an embedded
   * transcript belongs to somebody else.
   */
  userId?: string;
  channel: string;
  /** NOTE: realtime-modules uses `message`, not `content` */
  message: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

/** Mirror of realtime-modules/src/client/types.ts PresenceStatus */
export type RMPresenceStatus = 'online' | 'away' | 'busy' | 'offline';

/** Mirror of realtime-modules/src/client/types.ts PresenceEntry */
export interface RMPresenceEntry {
  clientId: string;
  status: RMPresenceStatus;
  metadata: Record<string, unknown>;
  channels: string[];
  nodeId: string;
  timestamp: string;
  lastSeen: string;
  lastHeartbeat: number;
}

/** Mirror of realtime-modules/src/client/types.ts Reaction */
export interface RMReaction {
  id: string;
  clientId: string;
  channel: string;
  emoji: string;
  effect: string;
  position: unknown;
  metadata: Record<string, unknown>;
  timestamp: string;
}

/** Mirror of realtime-modules/src/client/types.ts ActivityEvent */
export interface RMActivityEvent {
  eventType: string;
  detail: Record<string, unknown>;
  timestamp: string;
  userId: string | null;
  displayName: string;
}

/** Mirror of realtime-modules/src/client/useFileUpload.ts FileUploadState */
export interface RMFileUploadState {
  id: string;
  filename: string;
  size: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed' | 'scanning' | 'clean' | 'infected';
  progress?: number;
  uploadUrl?: string;
  downloadUrl?: string;
  error?: string;
}

/** Mirror of realtime-modules/src/client/useVideoHangout.ts HangoutParticipant */
export interface RMHangoutParticipant {
  clientId: string;
  displayName?: string;
  role: 'host' | 'participant' | 'viewer';
  videoOn: boolean;
  audioOn: boolean;
  joinedAt: string;
}

/** Mirror of realtime-modules/src/client/useVideoHangout.ts HangoutSession */
export interface RMHangoutSession {
  id: string;
  type: string;
  createdAt: string;
}

/** Mirror of realtime-modules/src/client/useNotifications.ts NotificationHookEntry */
export interface RMNotificationEntry {
  id: string;
  type: string;
  title: string;
  body?: string;
  timestamp: string;
  read?: boolean;
  channel?: string;
  payload?: Record<string, unknown>;
}

/** Mirror of realtime-modules/src/client/useCapability.ts CapabilityHookResult */
export interface RMCapabilityHookResult {
  capability: {
    name: string;
    enabled: boolean;
    channel?: string;
    version?: string;
    metadata?: Record<string, unknown>;
  } | null;
  enabled: boolean;
  isLoading: boolean;
  error?: Error;
}

// ---------------------------------------------------------------------------
// Hook return shapes (structural — satisfies the real hook returns)
// ---------------------------------------------------------------------------

export interface RMUseChatReturn {
  messages: RMChatMessage[];
  sendMessage: (text: string) => void;
  loadHistory: (limit?: number) => void;
}

export interface RMUsePresenceReturn {
  roster: RMPresenceEntry[];
  setStatus: (status: RMPresenceStatus) => void;
  updateMetadata: (meta: Record<string, unknown>) => void;
}

export interface RMUseReactionsReturn {
  reactions: RMReaction[];
  react: (emoji: string) => void;
}

export interface RMUseActivityReturn {
  events: RMActivityEvent[];
  loadHistory: (limit?: number) => void;
}

export interface RMUseFileUploadReturn {
  uploads: RMFileUploadState[];
  upload(file: File, opts?: { metadata?: Record<string, unknown> }): Promise<RMFileUploadState>;
  cancel(id: string): void;
  removeCompleted(): void;
}

export interface RMUseVideoHangoutReturn {
  session: RMHangoutSession | null;
  participants: RMHangoutParticipant[];
  joinToken: string | null;
  start(opts?: { type?: 'hangout' | 'call'; metadata?: Record<string, unknown> }): Promise<void>;
  join(sessionId: string): Promise<void>;
  leave(): Promise<void>;
  end(): Promise<void>;
  toggleVideo(): void;
  toggleAudio(): void;
}

export interface RMUseNotificationsReturn {
  notifications: RMNotificationEntry[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  clearAll: () => void;
}

// ---------------------------------------------------------------------------
// Hangout rooms (mirrors realtime-modules/src/client/hangout-rooms/types.ts)
// Kept structurally identical so any real hook return satisfies these.
// ---------------------------------------------------------------------------

export type RMRoomVisibility = 'org' | 'private';
export type RMRoomState = 'active' | 'archived';

export interface RMRoomSettings {
  audioOnly: boolean;
  recordingEnabled: boolean;
  softCap: number;
}

export interface RMRoom {
  orgId: string;
  roomId: string;
  slug: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  visibility: RMRoomVisibility;
  settings: RMRoomSettings;
  state: RMRoomState;
  lastActiveAt: string;
}

export interface RMRoomOccupancyMember {
  userId: string;
  displayName?: string;
  participantId: string;
}

export interface RMRoomOccupancy {
  slug: string;
  count: number;
  members: RMRoomOccupancyMember[];
}

export interface RMCreateRoomInput {
  name: string;
  description?: string;
  visibility?: RMRoomVisibility;
  settings?: Partial<RMRoomSettings>;
}

export interface RMJoinRoomResult {
  room: RMRoom;
  sessionId: string;
  token: string;
  participantId: string;
}

export interface RMUseHangoutRoomsReturn {
  rooms: RMRoom[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  createRoom: (input: RMCreateRoomInput) => Promise<RMRoom>;
  archiveRoom: (slug: string) => Promise<void>;
  joinRoom: (slug: string) => Promise<RMJoinRoomResult>;
}

export interface RMUseRoomOccupancyReturn {
  occupancy: RMRoomOccupancy | null;
}
