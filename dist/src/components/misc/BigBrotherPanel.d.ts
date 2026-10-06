import type { PresenceUser } from '../../hooks/usePresence';
import type { RoomItem } from '../../hooks/useRooms';
import type { ActivityEvent } from '../../hooks/useActivityBus';
export interface BigBrotherPanelProps {
    rooms: RoomItem[];
    presenceUsers: PresenceUser[];
    activityEvents: ActivityEvent[];
    activityIsLive: boolean;
}
export declare function BigBrotherPanel({ rooms, presenceUsers, activityEvents, activityIsLive: isLive, }: BigBrotherPanelProps): import("react").JSX.Element;
//# sourceMappingURL=BigBrotherPanel.d.ts.map