import { type MouseEvent } from 'react';
import { type RoomsIndexSubscriber } from '@connorhoehn/realtime-modules/client/hangout-rooms';
import type { RMRoomOccupancy } from './types';
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
    /** Optional kebab node passed through to the row. */
    kebab?: React.ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function HangoutRoomRow({ slug, name, participantId, occupancy, subscribeRoomsIndex, onClick, onContextMenu, kebab, className, 'data-testid': testId, }: HangoutRoomRowProps): import("react/jsx-runtime").JSX.Element;
export default HangoutRoomRow;
//# sourceMappingURL=HangoutRoomRow.d.ts.map