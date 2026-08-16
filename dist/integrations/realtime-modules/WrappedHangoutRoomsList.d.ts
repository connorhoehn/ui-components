import type { ReactNode, MouseEvent } from 'react';
import { type HangoutRoomsSectionProps } from './HangoutRoomsSection';
import { type NetworkShimOptions } from './networkShim';
import type { RMRoom, RMRoomOccupancy, RMUseHangoutRoomsReturn } from './types';
type RoomsIndexSubscriber = NonNullable<HangoutRoomsSectionProps['occupancyAdapter']>;
export interface WrappedHangoutRoomsListProps {
    /** Return value of `useHangoutRooms()` from realtime-modules. */
    hangoutRooms: RMUseHangoutRoomsReturn;
    /**
     * Live gateway adapter for room occupancy — typically the
     * `subscribeRoomsIndex` returned by `useRoomsSubscription()`. When
     * provided, every row drives its own `useRoomOccupancy(slug)` off
     * this subscriber so presence indicators stay live without the
     * caller wiring per-row occupancy.
     */
    subscribeRoomsIndex?: RoomsIndexSubscriber;
    /**
     * Back-compat / static-snapshot lookup. Used only when
     * `subscribeRoomsIndex` is NOT provided. Returns the latest occupancy
     * snapshot for a slug.
     */
    occupancyFor?: (slug: string) => RMRoomOccupancy | null;
    /** This tab's participantId — drives the row "active" highlight. */
    participantId?: string;
    /** Convenience: fires with the room slug when a row is clicked. */
    onJoin?: (slug: string) => void;
    /** Right-click on a row. */
    onContextMenu?: (room: RMRoom, e: MouseEvent<HTMLElement>) => void;
    /** Fired when "Browse all" overflow link is clicked. */
    onBrowseAll?: () => void;
    /** Max inline rows. Defaults to 10. */
    maxVisible?: number;
    /** Section title override. Defaults to "Rooms". */
    title?: string;
    /** Section storageKey override (collapse persistence). */
    storageKey?: string;
    /**
     * Custom empty-state slot. When the active rooms list is empty AND
     * the hook is not loading AND there is no error, this slot REPLACES
     * the entire section render. Use it when the host page wants full
     * control over the no-rooms UI (e.g. an onboarding upsell).
     */
    renderEmpty?: ReactNode;
    /** Custom create-dialog renderer — forwarded to HangoutRoomsSection. */
    renderCreateDialog?: (props: {
        open: boolean;
        onClose: () => void;
    }) => ReactNode;
    /**
     * Opt-in: wrap the rendered section in NetworkErrorBoundary +
     * ReconnectingShim. Pass `connectionState` from the gateway layer.
     */
    wrapWithNetworkShim?: NetworkShimOptions;
}
export declare function WrappedHangoutRoomsList({ hangoutRooms, subscribeRoomsIndex, occupancyFor, participantId, onJoin, onContextMenu, onBrowseAll, maxVisible, title, storageKey, renderEmpty, renderCreateDialog, wrapWithNetworkShim, }: WrappedHangoutRoomsListProps): import("react").JSX.Element;
export default WrappedHangoutRoomsList;
//# sourceMappingURL=WrappedHangoutRoomsList.d.ts.map