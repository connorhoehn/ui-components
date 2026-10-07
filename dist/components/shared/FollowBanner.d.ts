import { type RefObject } from 'react';
/**
 * The follow lock's auto-unlock, shared by FollowBanner and FollowModeBar.
 *
 * Unscoped (the default, and the historical behaviour): the viewer's
 * mousedown / keydown / wheel ANYWHERE in the window ends follow. Scoped
 * (2.393.0): only scrolling (wheel, touchmove) or typing (keydown) INSIDE
 * `scope` ends it — a click on a call dock, a toolbar or a side panel does
 * not, because those are not the viewer taking the page back (SPEC §2.2 row
 * 13). Registration waits 500ms so the click that started following cannot
 * end it.
 */
export declare function useFollowAutoStop(active: boolean, onStop: () => void, { enabled, scope }?: {
    enabled?: boolean;
    scope?: RefObject<HTMLElement | null> | undefined;
}): void;
export interface FollowBannerProps {
    /** Who is being followed. Null renders nothing. */
    name: string | null;
    onStop: () => void;
    /**
     * End follow on the viewer's own mousedown / keydown / wheel. Default on;
     * turn off only where the host routes those interactions itself.
     */
    autoStopOnInteract?: boolean;
    /** Same switch as `autoStopOnInteract` (2.393.0 name); `false` turns the auto-unlock off. */
    autoStop?: boolean;
    /**
     * Listen on this element only, and only for scrolling or typing — the
     * editor, typically — instead of every mousedown/keydown/wheel in the
     * window. Clicks elsewhere (a call dock, a toolbar) keep following. 2.393.0.
     */
    autoStopScope?: RefObject<HTMLElement | null>;
    /**
     * Where the followed person is — a section title ("Session flow"). Rendered
     * after the name as ` · <location>` in the regular weight. Empty or unset
     * renders the name alone.
     */
    location?: string;
    /**
     * `banner` (default): the centred strip with a small "Stop" button.
     * `bar`: the in-call follow bar — a rounded row inside the page column,
     * "**Following Alice** · Session flow" on the left and a "Stop following"
     * button on the right.
     */
    appearance?: 'banner' | 'bar';
    className?: string;
    'data-testid'?: string;
}
export declare function FollowBanner({ name, onStop, autoStopOnInteract, autoStop, autoStopScope, location, appearance, className, 'data-testid': testId, }: FollowBannerProps): import("react").JSX.Element | null;
export default FollowBanner;
//# sourceMappingURL=FollowBanner.d.ts.map