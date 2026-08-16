import type { CSSProperties } from 'react';
export declare function nameToColor(name: string): string;
export declare function nameToInitials(name: string): string;
export interface AvatarProps {
    name: string;
    size?: number;
    /** Override the auto-computed color. */
    color?: string;
    /** Optional profile image URL. Falls back to initials if absent or load fails. */
    src?: string;
    className?: string;
    style?: CSSProperties;
    title?: string;
}
export declare function Avatar({ name, size, color, src, className, style, title, }: AvatarProps): import("react").JSX.Element;
export interface AvatarGroupProps {
    names: string[];
    maxVisible?: number;
    size?: number;
    className?: string;
}
export declare function AvatarGroup({ names, maxVisible, size, className, }: AvatarGroupProps): import("react").JSX.Element;
export default Avatar;
//# sourceMappingURL=Avatar.d.ts.map