import { type CSSProperties } from 'react';
export declare function nameToColor(name: string): string;
export declare function nameToInitials(name: string): string;
export interface AvatarProps {
    name: string;
    size?: number;
    /**
     * Override the derived initials. Use when the caller already has canonical
     * initials (e.g. from a presence payload) and shouldn't re-derive them from
     * a display name — deriving would turn "AS" into "As".
     */
    initials?: string;
    /** Override the auto-computed color. */
    color?: string;
    /** Optional profile image URL. Falls back to initials if absent or load fails. */
    src?: string;
    className?: string;
    style?: CSSProperties;
    title?: string;
}
export declare function Avatar({ name, size, initials: initialsProp, color, src, className, style, title, }: AvatarProps): import("react").JSX.Element;
/** One person in an AvatarGroup, when a bare name isn't enough. */
export interface AvatarGroupItem {
    name: string;
    initials?: string;
    color?: string;
    src?: string;
}
export interface AvatarGroupProps {
    /** Convenience form — colors and initials are derived from the name. */
    names?: string[];
    /**
     * Richer form, for callers that already know each person's brand color,
     * canonical initials, or photo. Takes precedence over `names`. Without this,
     * callers with per-user colors had to hand-roll the whole stack.
     */
    items?: AvatarGroupItem[];
    maxVisible?: number;
    size?: number;
    className?: string;
    /**
     * Total people, when it exceeds what was passed in. Lets a caller render
     * "+3" without materialising three more entries.
     */
    total?: number;
}
export declare function AvatarGroup({ names, items, maxVisible, size, className, total, }: AvatarGroupProps): import("react").JSX.Element;
export default Avatar;
//# sourceMappingURL=Avatar.d.ts.map