// frontend/src/hooks/useRooms.ts
//
// Rooms hook — list/create/join/leave rooms plus real-time member tracking.
// Handles social:member_joined and social:member_left WebSocket events (RTIM-04).
// All requests use Authorization: Bearer idToken against `baseUrl` — the
// option when given, else `getApiBaseUrl()` (2.359.0). It used to read
// `import.meta.env.VITE_PLATFORM_API_URL`, which is inlined at THIS library's
// build and so is '' in every published build: the hook never fetched for a
// consumer, which is why the gateway kept its own copy.

import { useState, useEffect, useRef, useCallback } from 'react';
import type { GatewayMessage } from '../types/gateway';
// Optional: a missing ToastProvider should cost the toast, not the rooms.
import { useToastOptional } from '../components/shared/ToastProvider';
import { getApiBaseUrl } from '../lib/apiBaseUrl';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RoomItem {
  roomId: string;
  /** `room:<slug>` — a room's chat channel is its call lobby. */
  channelId: string;
  /** As sent by the API; `channelId` is derived from it when absent. */
  slug?: string;
  name: string;
  type: 'standalone' | 'group' | 'dm';
  ownerId: string;
  groupId?: string;
  dmPeerUserId?: string;
  createdAt: string;
}

export interface RoomMemberItem {
  roomId: string;
  userId: string;
  displayName?: string;
  joinedAt: string;
}

export type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

export interface UseRoomsOptions {
  idToken: string | null;
  onMessage: OnMessageFn;
  /** Origin for `/api/rooms…`. Wins over `getApiBaseUrl()` (2.359.0). */
  baseUrl?: string;
}

export interface UseRoomsReturn {
  rooms: RoomItem[];
  activeRoom: RoomItem | null;
  setActiveRoom: (room: RoomItem | null) => void;
  /**
   * Resolve with the room, so a caller can act on it — adopt it, post into it —
   * without re-reading the list. Reject when unconfigured or refused (2.359.0;
   * they resolved `void` and silently did nothing without a token before).
   */
  createRoom: (name: string) => Promise<RoomItem>;
  createDM: (peerId: string) => Promise<RoomItem>;
  createGroupRoom: (groupId: string, name: string) => Promise<RoomItem>;
  joinRoom: (roomId: string) => Promise<void>;
  leaveRoom: (roomId: string) => Promise<void>;
  loadMembers: (roomId: string) => Promise<void>;
  members: RoomMemberItem[];
  loading: boolean;
  error: string | null;
  /**
   * Failure of the `GET /api/rooms` hydrate specifically. Kept separate from
   * `error`, which is also set by create/join/leave/loadMembers.
   *
   * `RoomList` renders "Couldn't load rooms" + Retry whenever the `error` prop
   * it is given is set and the list is empty — so wiring `error` straight
   * through made a refused *createRoom* by a user with no rooms yet blame the
   * read: the panel claimed the room list had failed to load and offered to
   * re-fetch it, while the create form beside it showed the real reason.
   * Pass this to `RoomList`'s `error` prop; use `error` for mutation feedback.
   */
  loadError: string | null;
  /** Retry the GET /api/rooms hydrate after a fetch failure. */
  retry: () => void;
}

/**
 * `GET /api/rooms` does not send a channelId, and `RoomItem` declares one, so
 * every hydrated room had `channelId: undefined` and callers keying on it
 * collapsed every real room onto one key. A room's chat channel IS its call
 * lobby, `room:<slug>`, so the id is derived here, at the edge where the API
 * shape becomes the app's.
 */
function withChannelId<T extends { channelId?: string; slug?: string; roomId: string }>(room: T): T {
  if (room.channelId) return room;
  return { ...room, channelId: room.slug ? `room:${room.slug}` : room.roomId };
}

const NOT_CONFIGURED = 'Social API not configured';

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useRooms({ idToken, onMessage, baseUrl: baseUrlOption }: UseRoomsOptions): UseRoomsReturn {
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [activeRoom, setActiveRoomState] = useState<RoomItem | null>(null);
  const [members, setMembers] = useState<RoomMemberItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const { toast } = useToastOptional() ?? {};

  const baseUrl = baseUrlOption ?? getApiBaseUrl();

  const retry = useCallback(() => setReloadKey((k) => k + 1), []);

  // ---- Stable refs for WS handler -----------------------------------------

  const onMessageRef = useRef(onMessage);
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const activeRoomRef = useRef<string | null>(null);
  const membersRequestIdRef = useRef(0);

  // ---- On mount: fetch my rooms --------------------------------------------

  useEffect(() => {
    if (!idToken || !baseUrl) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setLoadError(null);

    fetch(`${baseUrl}/api/rooms`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load rooms (${res.status})`);
        return res.json() as Promise<{ rooms: RoomItem[] }>;
      })
      .then((data) => {
        if (cancelled) return;
        setRooms((data.rooms ?? []).map(withChannelId));
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message);
        setLoadError(err.message);
        toast?.("Couldn't load rooms", { type: 'error' });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [idToken, baseUrl, reloadKey, toast]);

  // ---- WS handler: member joined / member left (RTIM-04) ------------------

  useEffect(() => {
    const unregister = onMessageRef.current((msg) => {
      const payload = ((msg as Record<string, unknown>).payload ?? msg) as Record<string, unknown>;
      if (msg.type === 'social:member_joined' && payload.roomId === activeRoomRef.current) {
        setMembers((prev) => [
          ...prev,
          {
            roomId: payload.roomId as string,
            userId: payload.userId as string,
            displayName: payload.displayName as string | undefined,
            joinedAt: new Date().toISOString(),
          },
        ]);
      } else if (msg.type === 'social:member_left' && payload.roomId === activeRoomRef.current) {
        setMembers((prev) => prev.filter((m) => m.userId !== (payload.userId as string)));
      }
    });

    return unregister;
  }, []);

  // ---- loadMembers (ROOM-06) -----------------------------------------------

  const loadMembers = useCallback(async (roomId: string): Promise<void> => {
    if (!idToken) return;
    // Monotonic request id. `setActiveRoom` fires this on every room switch and
    // the responses are not ordered: switching A -> B while A's /members call
    // was still in flight let A land last and repaint room B's participant list
    // with room A's members. Each call claims the next id; only the current
    // holder may write.
    const token = ++membersRequestIdRef.current;
    try {
      const res = await fetch(`${baseUrl}/api/rooms/${roomId}/members`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to load members (${res.status})`);
      const data = await res.json() as { members: RoomMemberItem[] };
      if (token !== membersRequestIdRef.current) return;
      setMembers(data.members ?? []);
    } catch (err) {
      if (token !== membersRequestIdRef.current) return;
      setError((err as Error).message);
    }
  }, [idToken, baseUrl]);

  // ---- setActiveRoom -------------------------------------------------------

  const setActiveRoom = useCallback((room: RoomItem | null): void => {
    activeRoomRef.current = room?.roomId ?? null;
    setActiveRoomState(room);
    if (room) {
      void loadMembers(room.roomId);
    } else {
      // Closing the room used to leave its members on screen: `members` was
      // only ever replaced by the NEXT successful load, so a consumer showing a
      // participant list beside "Select a room" listed the roster of the room
      // the user had just closed. Retire any in-flight load with it.
      membersRequestIdRef.current += 1;
      setMembers([]);
    }
  }, [loadMembers]);

  // ---- createRoom ----------------------------------------------------------

  const createRoom = useCallback(async (name: string): Promise<RoomItem> => {
    if (!idToken || !baseUrl) { setError(NOT_CONFIGURED); throw new Error(NOT_CONFIGURED); }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error(`Failed to create room (${res.status})`);
      const room = withChannelId(await res.json() as RoomItem);
      setRooms((prev) => [room, ...prev]);
      return room;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [idToken, baseUrl]);

  // ---- createDM ------------------------------------------------------------

  const createDM = useCallback(async (peerId: string): Promise<RoomItem> => {
    if (!idToken || !baseUrl) { setError(NOT_CONFIGURED); throw new Error(NOT_CONFIGURED); }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/rooms/dm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ peerId }),
      });
      if (!res.ok) throw new Error(`Failed to create DM (${res.status})`);
      const room = withChannelId(await res.json() as RoomItem);
      setRooms((prev) => [room, ...prev]);
      return room;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [idToken, baseUrl]);

  // ---- joinRoom ------------------------------------------------------------

  const joinRoom = useCallback(async (roomId: string): Promise<void> => {
    if (!idToken) return;
    if (!roomId) {
      setError('joinRoom called with empty roomId');
      return;
    }
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/rooms/${encodeURIComponent(roomId)}/join`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to join room (${res.status})`);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken, baseUrl]);

  // ---- leaveRoom -----------------------------------------------------------

  const leaveRoom = useCallback(async (roomId: string): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/rooms/${roomId}/leave`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to leave room (${res.status})`);
      setRooms((prev) => prev.filter((r) => r.roomId !== roomId));
      // Leaving the room you are IN used to drop it from `rooms` while leaving
      // `activeRoom` pointing at it, so the room vanished from the list and
      // stayed open in the pane beside it, still listing its members.
      if (activeRoomRef.current === roomId) {
        activeRoomRef.current = null;
        setActiveRoomState(null);
        membersRequestIdRef.current += 1;
        setMembers([]);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken, baseUrl]);

  // ---- createGroupRoom (ROOM-02) -------------------------------------------

  const createGroupRoom = useCallback(async (groupId: string, name: string): Promise<RoomItem> => {
    if (!idToken || !baseUrl) { setError(NOT_CONFIGURED); throw new Error(NOT_CONFIGURED); }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/groups/${groupId}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error(`Failed to create group room (${res.status})`);
      const room = withChannelId(await res.json() as RoomItem);
      setRooms((prev) => [room, ...prev]);
      return room;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [idToken, baseUrl]);

  return {
    rooms,
    activeRoom,
    setActiveRoom,
    createRoom,
    createDM,
    createGroupRoom,
    joinRoom,
    leaveRoom,
    loadMembers,
    members,
    loading,
    error,
    loadError,
    retry,
  };
}
