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
