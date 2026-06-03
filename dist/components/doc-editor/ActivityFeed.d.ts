import type { Participant } from '../../types/document';
import type { ActivityEvent } from '../../hooks/useActivityBus';
interface ActivityFeedProps {
    events: ActivityEvent[];
    participants: Participant[];
}
export default function ActivityFeed({ events, participants }: ActivityFeedProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ActivityFeed.d.ts.map