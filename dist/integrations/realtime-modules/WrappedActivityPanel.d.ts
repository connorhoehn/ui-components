import type { RMUseActivityReturn } from './types';
import type { ActivityFeedProps } from '../../components/shared/ActivityFeed';
export interface WrappedActivityPanelProps {
    /** Return value of useActivity(channel) from realtime-modules */
    activity: RMUseActivityReturn;
    /** Forwarded to ActivityFeed */
    visibleCount?: ActivityFeedProps['visibleCount'];
    rotateMs?: ActivityFeedProps['rotateMs'];
    staggerMs?: ActivityFeedProps['staggerMs'];
    kindColors?: ActivityFeedProps['kindColors'];
    className?: string;
}
export declare function WrappedActivityPanel({ activity, visibleCount, rotateMs, staggerMs, kindColors, className, }: WrappedActivityPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=WrappedActivityPanel.d.ts.map