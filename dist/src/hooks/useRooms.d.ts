import { GatewayMessage } from '../types/gateway';
export interface RoomItem {
    roomId: string;
    channelId: string;
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
}
export interface UseRoomsReturn {
    rooms: RoomItem[];
    activeRoom: RoomItem | null;
    setActiveRoom: (room: RoomItem | null) => void;
    createRoom: (name: string) => Promise<void>;
    createDM: (peerId: string) => Promise<void>;
    createGroupRoom: (groupId: string, name: string) => Promise<void>;
    joinRoom: (roomId: string) => Promise<void>;
    leaveRoom: (roomId: string) => Promise<void>;
    loadMembers: (roomId: string) => Promise<void>;
    members: RoomMemberItem[];
    loading: boolean;
    error: string | null;
    /** Retry the GET /api/rooms hydrate after a fetch failure. */
    retry: () => void;
}
export declare function useRooms({ idToken, onMessage }: UseRoomsOptions): UseRoomsReturn;
//# sourceMappingURL=useRooms.d.ts.map