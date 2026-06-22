import { Participant } from '../../types/document';
import { ActivityEvent } from '../../hooks/useActivityBus';
interface ActivityFeedProps {
    events: ActivityEvent[];
    participants: Participant[];
}
export default function ActivityFeed({ events, participants }: ActivityFeedProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ActivityFeed.d.ts.map