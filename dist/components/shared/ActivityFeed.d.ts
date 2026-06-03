export type ActivityKind = 'task' | 'pr' | 'decision' | 'comment' | 'status' | string;
export interface ActivityFeedItem {
    id: string;
    /** Display name of the person who performed the action, e.g. "Alex Chen". */
    actor: string;
    /** Verb phrase, e.g. "completed". */
    action: string;
    /** Jira-style ticket ID badge, e.g. "K8S-182". */
    ticketId?: string;
    /** Short description/title of the work item. */
    subject: string;
    /** Human-readable relative timestamp, e.g. "2m ago". */
    timeLabel?: string;
    /** Controls the type-dot color. */
    kind?: ActivityKind;
}
export interface ActivityFeedProps {
    items: ActivityFeedItem[];
    /** Number of items visible at once (default: 3). */
    visibleCount?: number;
    /** Auto-rotation interval in ms (default: 4200). Set 0 to disable. */
    rotateMs?: number;
    /** Delay before the first rotation fires, for stagger between sibling feeds (ms). */
    staggerMs?: number;
    /** Override dot colors per kind. Merged over the built-in palette. */
    kindColors?: Record<string, string>;
    className?: string;
}
export declare function ActivityFeed({ items, visibleCount, rotateMs, staggerMs, kindColors, className, }: ActivityFeedProps): import("react/jsx-runtime").JSX.Element;
export default ActivityFeed;
//# sourceMappingURL=ActivityFeed.d.ts.map