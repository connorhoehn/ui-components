import { type MouseEvent } from 'react';
import type { RoomsIndexSubscriber } from '@connorhoehn/realtime-modules/client/hangout-rooms';
import type { RealtimeClientModules } from './modules';
import type { RMRoomOccupancy } from '../realtime-modules/types';
export interface HangoutRoomRowProps {
    /** Room slug (immutable identifier). */
    slug: string;
    /** Visible room name. */
    name: string;
    /** This tab's participantId, if currently in the room. Used to drive
     *  the `active` highlight and the "Just you" pulse. */
    participantId?: string;
    /** Latest occupancy snapshot for this room, or null when not yet
     *  received from the gateway. Ignored when `subscribeRoomsIndex` is
     *  provided. */
    occupancy?: RMRoomOccupancy | null;
    /** Live adapter wiring the gateway's `rooms:index` stream into
     *  `useRoomOccupancy(slug)`. When set, takes precedence over the
     *  static `occupancy` prop. */
    subscribeRoomsIndex?: RoomsIndexSubscriber;
    /** Fired on row click — caller opens the hangout overlay. */
    onClick?: () => void;
    /** Fired on right-click — caller can show a context menu. */
    onContextMenu?: (e: MouseEvent<HTMLElement>) => void;
    /**
     * Open the room's CONVERSATION rather than joining its call.
     *
     * A room is not only a call. Things are said in it, files are dropped in
     * it, documents get written in it — and until this existed the only way
     * into a room was to join the video, so everything that came out of it was
     * unreachable unless somebody was in there right now.
     *
     * Secondary by design: the row's own click still joins, because that is
     * what a hangout row is for. Omit to render no such control.
     */
    onOpenConversation?: () => void;
    /** Optional kebab node passed through to the row. */
    kebab?: React.ReactNode;
    className?: string;
    'data-testid'?: string;
}
/** The realtime-modules functions HangoutRoomRow calls. */
export type HangoutRoomRowModules = Pick<RealtimeClientModules, 'useRoomOccupancy'>;
export type HangoutRoomRowComponent = (props: HangoutRoomRowProps) => React.JSX.Element;
/**
 * Bind HangoutRoomRow to an injected `useRoomOccupancy`. The canonical binding
 * lives in `integrations/realtime-modules/HangoutRoomRow`.
 */
export declare function createHangoutRoomRow(rm: HangoutRoomRowModules): HangoutRoomRowComponent;
//# sourceMappingURL=HangoutRoomRow.d.ts.map