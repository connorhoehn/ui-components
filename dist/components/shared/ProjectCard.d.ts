import type { CSSProperties } from 'react';
import type { ActivityFeedItem } from './ActivityFeed';
export interface StatusColors {
    bg: string;
    border: string;
    text: string;
    accent: string;
}
export interface ProjectCardProps {
    /** Primary display name. */
    name: string;
    /** Optional monospace slug shown below the name (e.g. "proj-k8s"). */
    id?: string;
    /**
     * Status key used for accent color. Built-in keys: active, in_progress,
     * completed, archived, planning, paused. Supply `statusColors` to extend.
     */
    status?: string;
    /** Override or extend the built-in status → color map. */
    statusColors?: Record<string, StatusColors>;
    /** Names used for AvatarGroup in the footer. */
    contributorNames?: string[];
    /** Total contributor count — used to compute the "+N more" overflow label. */
    contributorCount?: number;
    /** Activity ticker items. */
    activityItems?: ActivityFeedItem[];
    /**
     * Color of the presence dot in the footer (e.g. '#22c55e' for green).
     * Default: '#d1d5db' (grey = unknown).
     */
    presenceDotColor?: string;
    /** Human-readable "last active" label shown next to the presence dot. */
    activityLabel?: string;
    /** Index used to stagger the activity rotation offset. */
    cardIndex?: number;
    /** Click handler. */
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
    /** Minimum card height (default: 190). */
    minHeight?: number;
}
export declare function ProjectCard({ name, id, status, statusColors, contributorNames, contributorCount, activityItems, presenceDotColor, activityLabel, cardIndex, onClick, className, style, minHeight, }: ProjectCardProps): import("react").JSX.Element;
export default ProjectCard;
//# sourceMappingURL=ProjectCard.d.ts.map