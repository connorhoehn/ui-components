import { type CSSProperties, type ReactNode } from 'react';
import { type ToneOrAlias } from './tones';
export declare function nameToColor(name: string): string;
/**
 * The text colour that reads on `background`, or `null` when the background
 * can't be parsed. The 0.6 cut is where white-on-fill stops clearing 4.5:1
 * for the palette's own colours; above it, dark text wins.
 */
export declare function readableAvatarForeground(background: string): string | null;
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
    /**
     * An arbitrary node in the circle instead of initials — an icon, usually.
     *
     * Exists because not every avatar-shaped thing is a person. A channel row
     * wants a `#` in the same coloured circle at the same size with the same
     * overlap rules, and without this the only way to get one was a hand-rolled
     * `<span className="rounded-full …">` beside a real `Avatar`, which is two
     * components to keep in step and one of them outside the design system.
     *
     * Wins over `src` only when there is no image to show; loses to a loaded
     * image, because a photo is more specific than a glyph.
     */
    icon?: ReactNode;
    /**
     * A single character or emoji in the circle — `#` for a channel, `🔒` for a
     * private one. The string form of `icon`, sized a little larger than initials
     * because one character at initials size reads as a speck.
     */
    glyph?: string;
    /**
     * Explicit text colour for the initials/glyph. Overrides everything else.
     *
     * The default is white, which is right for the saturated palette above and
     * wrong for a pale fill — a task row's assignee badge is dark indigo on a
     * light indigo tint, and white on that fails contrast, which is exactly why
     * such badges were being hand-rolled as bare `<span>`s beside real Avatars.
     */
    foreground?: string;
    /**
     * Paint the circle in a semantic tone's soft surface (`-bg` background,
     * `-fg` text) instead of a derived or caller-supplied colour. Wins over
     * `color` / `foreground` / `autoContrast`, because a tone already declares
     * both halves of the pair.
     */
    tone?: ToneOrAlias;
    /**
     * Pick the foreground from the resolved background's luminance rather than
     * always using white. Opt-in, not the default: flipping existing avatars to
     * dark text on the lighter half of the palette would change every presence
     * row in every consumer at once.
     */
    autoContrast?: boolean;
    className?: string;
    style?: CSSProperties;
    /**
     * Tooltip text. Defaults to `name`. Pass `null` (or `showTitle={false}`) to
     * render no `title` at all — a wrapping button or link with its own `title`
     * otherwise gets two tooltips fighting, and `title=""` is not the same thing
     * as no attribute.
     */
    title?: string | null;
    /** `false` suppresses the `title` attribute entirely. See `title`. */
    showTitle?: boolean;
}
export declare function Avatar({ name, size, initials: initialsProp, color, src, icon, glyph, foreground, tone, autoContrast, className, style, title, showTitle, }: AvatarProps): import("react").JSX.Element;
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