import type { GatewayMessage } from '../types/gateway';
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
export declare function useRooms({ idToken, onMessage, baseUrl: baseUrlOption }: UseRoomsOptions): UseRoomsReturn;
//# sourceMappingURL=useRooms.d.ts.map