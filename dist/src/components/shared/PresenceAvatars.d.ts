export type PresenceMode = 'editor' | 'reviewer' | 'reader';
export interface PresenceUser {
    /** Unique identifier for the user. Passed back to `onUserClick`. */
    id: string;
    name: string;
    /** Optional avatar image URL. Wins over `color` when present. */
    avatarUrl?: string;
    /** Online flag. Drives the status dot when `idle` is not set:
     *  `undefined`/`true` → green; `false` → gray. */
    online?: boolean;
    /** Override the auto-computed avatar background. Useful when the
     *  user identity needs to match a CRDT cursor color elsewhere. */
    color?: string;
    /** Present but away. Dims the avatar (alpha-blends `color` when
     *  provided, otherwise drops opacity) and flips the status dot to
     *  amber. Wins over `online` for the dot color. */
    idle?: boolean;
    /** Optional editing mode — renders a small mode badge on the
     *  upper-right of the avatar (pencil / check / eye). */
    mode?: PresenceMode;
    /** One status line for the hover card — "editing", "away · 3m". Free text
     *  because the library does not know the host's vocabulary. */
    detail?: string;
    /** Where in the surface the user is — a section title, a pane name.
     *  Rendered under the detail line on the hover card. */
    location?: string;
}
export interface PresenceAvatarsProps {
    users: PresenceUser[];
    /** Maximum avatars to render before "+N" chip (default 5) */
    maxVisible?: number;
    /** Avatar diameter in px (default 28) */
    size?: number;
    /** Called when the "+N" overflow chip is clicked */
    onMoreClick?: () => void;
    /** Called with the user's `id` when an avatar is clicked. When set,
     *  each avatar becomes a `<button>` for keyboard + screen-reader
     *  accessibility; when omitted, items render as `<div>` (back-compat
     *  with consumers that just want a static row). */
    onUserClick?: (id: string) => void;
    /**
     * Enables follow mode: each avatar grows a hover/focus card (name, detail,
     * location) with a Follow action. Click stays `onUserClick` — jump once —
     * and follow is the card's explicit verb, because a bubble that follows on
     * bare click turns every glance into a mode change.
     *
     * The card replaces the native `title` tooltip when set; two tooltips
     * fighting over one hover is worse than either.
     */
    onFollowUser?: (id: string) => void;
    /** The user currently being followed, so their card offers Stop instead. */
    followingUserId?: string | null;
    className?: string;
}
/**
 * The box a card must stay inside: the viewport, narrowed by every ancestor
 * that clips (overflow other than visible) — a byline at the left edge of a
 * pane is clipped by the PANE, not the window.
 */
export declare function clippingBounds(el: HTMLElement): {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
export declare function PresenceAvatars({ users, maxVisible, size, onMoreClick, onUserClick, onFollowUser, followingUserId, className, }: PresenceAvatarsProps): import("react").JSX.Element;
export default PresenceAvatars;
//# sourceMappingURL=PresenceAvatars.d.ts.map