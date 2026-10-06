import { type MouseEvent } from 'react';
import type { RoomsIndexSubscriber } from '@connorhoehn/realtime-modules/client/hangout-rooms';
import type { HangoutRoomRowComponent } from './HangoutRoomRow';
import type { RMRoom, RMRoomOccupancy, RMUseHangoutRoomsReturn } from '../realtime-modules/types';
export interface HangoutRoomsSectionProps {
    /** Return value of `useHangoutRooms()` from realtime-modules. */
    rooms: RMUseHangoutRoomsReturn;
    /** Resolves the latest occupancy snapshot for one slug. Legacy
     *  pattern — when `occupancyAdapter` is supplied, that adapter wins
     *  and this callback is ignored on a per-row basis. */
    occupancyFor?: (slug: string) => RMRoomOccupancy | null;
    /** Live gateway adapter — when provided, each row drives its own
     *  `useRoomOccupancy(slug)` off this subscriber and the static
     *  `occupancyFor` lookup is bypassed. The expected shape matches the
     *  `subscribeRoomsIndex` adapter returned by `useRoomsSubscription`
     *  in the gateway frontend. */
    occupancyAdapter?: RoomsIndexSubscriber;
    /** Per-tab participantId — used to highlight rooms this tab is in. */
    participantId?: string;
    /** Called when a row is clicked. Caller opens the hangout overlay. */
    onJoinRoom?: (room: RMRoom) => void;
    /** Called when a row is right-clicked. */
    onContextMenu?: (room: RMRoom, e: MouseEvent<HTMLElement>) => void;
    /**
     * Open a room's conversation instead of joining its call. Omit and rooms
     * stay call-only, which is what they were before this existed.
     */
    onOpenConversation?: (room: RMRoom) => void;
    /** Called when "Browse all" is clicked (when rooms exceed `maxVisible`). */
    onBrowseAll?: () => void;
    /** Max rows to render inline. Defaults to 10. */
    maxVisible?: number;
    /** Section title override. Defaults to "Rooms". */
    title?: string;
    /** Section storageKey override (collapse persistence). */
    storageKey?: string;
    /** Custom create renderer — when omitted the built-in dialog is used. */
    renderCreateDialog?: (props: {
        open: boolean;
        onClose: () => void;
    }) => React.ReactNode;
}
export type HangoutRoomsSectionComponent = (props: HangoutRoomsSectionProps) => React.JSX.Element;
/**
 * Bind HangoutRoomsSection to a HangoutRoomRow (which carries the injected
 * `useRoomOccupancy`). See `createRealtimeIntegrations`.
 */
export declare function createHangoutRoomsSection(HangoutRoomRow: HangoutRoomRowComponent): HangoutRoomsSectionComponent;
//# sourceMappingURL=HangoutRoomsSection.d.ts.map