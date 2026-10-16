// Structural types for a realtime-modules meeting (useMeeting's result as the
// bindings read it). Dependency-free on purpose: the call host imports them,
// and its declarations must not pull the meeting bindings' component graph
// into consumers' typechecks. Re-exported from ./meeting.

/** The slice of realtime-modules' `BreakoutState` these bindings read. */
export interface RMBreakoutState {
  phase: 'none' | 'draft' | 'open';
  mode: 'assigned' | 'self-select';
  rooms: { id: string; name: string; state: 'open' | 'closed'; members: string[] }[];
  returned: string[];
  endsAt: string | null;
  /** realtime-modules 0.124.0+: rooms are in the closing grace. */
  closing?: boolean;
  announcement: { message: string; fromUserId: string; fromDisplayName: string; at: string } | null;
  /** realtime-modules 0.130.0+: the last 20 announcements, oldest first. Older pins: absent. */
  announcements?: Array<{ message: string; fromUserId: string; fromDisplayName: string; at: string }>;
  settings: { allowReturnToMain: boolean };
}

export interface RMRaisedHand {
  userId: string;
  displayName: string;
  raisedAt: string;
}

/**
 * Structural `UseMeetingResult` (realtime-modules 0.121.0). Members added
 * later are optional, so an older pin's result still fits.
 */
export interface RMMeetingSource {
  ready: boolean;
  isOrganizer: boolean;
  hands: RMRaisedHand[];
  myHandPosition: number | null;
  toggleHand(): void;
  lowerHand(userId?: string): void;
  lowerAllHands(): void;
  breakout: RMBreakoutState;
  myRoom: { id: string; name: string } | null;
  state: { announcement: RMBreakoutState['announcement']; you?: { userId: string | null; organizer: boolean } };
  error: { code: string; message: string; requestAction: string } | null;
  /** realtime-modules 0.129.0+: server clock minus this device's, ms. Older pins: treated as 0. */
  clockOffsetMs?: number;
  configureBreakouts(rooms: { id?: string; name: string; members?: string[] }[], opts?: { mode?: 'assigned' | 'self-select'; allowReturnToMain?: boolean }): void;
  /** realtime-modules 0.123.0+. Without it the pane has no Add room. */
  addRoom?(opts?: { id?: string; name?: string }): void;
  /** realtime-modules 0.123.0+. Without it room names are read-only. */
  renameRoom?(roomId: string, name: string): void;
  assign(assignments: Record<string, string | null>): void;
  autoAssign(userIds: string[]): void;
  openRooms(roomIds?: string[]): void;
  closeRooms(roomIds?: string[]): void;
  setTimer(durationMs: number | null): void;
  broadcast(message: string): void;
  joinRoom(roomId: string): void;
  returnToMain(): void;
  endBreakouts(): void;
  dismissAnnouncement(): void;
}

/** A person in the meeting as the host knows them (the call roster). */
export interface RMMeetingPerson {
  userId: string;
  displayName: string;
  avatarUrl?: string;
}
