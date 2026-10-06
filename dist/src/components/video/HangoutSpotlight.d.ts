import type { CSSProperties, ReactNode } from 'react';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';
export interface HangoutSpotlightProps {
    /** Remote participants. Caller should NOT include the local user here. */
    participants: HangoutLayoutParticipant[];
    /** The local user — always renders in the filmstrip in spotlight mode. */
    localParticipant?: HangoutLayoutParticipant | null;
    /** Content for the main slot — typically a screen-share `<video>`. When
     *  provided, takes priority over the active-speaker tile. */
    spotlightContent?: ReactNode;
    /** Attribution label for `spotlightContent` — WHO is sharing. Without
     *  it the spotlight falls back to the active speaker's name, which is
     *  wrong whenever the person talking isn't the person sharing (F5). */
    spotlightContentLabel?: string;
    /** Active speaker id — drives spotlight slot via stabilized hysteresis. */
    activeSpeakerId?: string | null;
    /**
     * Hysteresis window (ms) before the spotlight slot swaps to a new
     * `activeSpeakerId`. Default 750.
     *
     * In a real call you WANT the delay — it stops the spotlight flickering on
     * coughs, laughs, and one-word interjections.
     *
     * Pass `0` when you need the rendered output to match the props you just
     * handed in, with no timers involved:
     *  - **Tests** — otherwise a change to `activeSpeakerId` needs fake timers
     *    plus an `act()`-wrapped `advanceTimersByTime` before any assertion.
     *  - **Storybook / demos** — changing the `activeSpeakerId` control would
     *    otherwise appear to do nothing for three quarters of a second, and a
     *    visual-regression snapshot could catch either state.
     */
    speakerHysteresisMs?: number;
    /** Click handler per filmstrip tile. */
    onParticipantClick?: (id: string) => void;
    /** Fill parent dimensions instead of letting the spotlight slot drive
     *  height via aspect-video. Used in docked + fullscreen widget modes. */
    fillParent?: boolean;
    /** Filmstrip tile width (px). Default 128 (Tailwind w-32). Larger for
     *  docked/fullscreen so small thumbs don't dominate a wide canvas. */
    filmstripTileWidth?: number;
    className?: string;
    style?: CSSProperties;
}
export declare function HangoutSpotlight({ participants, localParticipant, spotlightContent, spotlightContentLabel, activeSpeakerId, speakerHysteresisMs, onParticipantClick, fillParent, filmstripTileWidth, className, style, }: HangoutSpotlightProps): import("react").JSX.Element;
/**
 * Debounce activeSpeakerId so the spotlight slot only swaps after the new
 * speaker has been talking for at least `hysteresisMs`. Without this,
 * every cough, laugh, or short interjection causes flicker.
 *
 * `hysteresisMs <= 0` bypasses the timer entirely and commits the new id on
 * the next effect flush — the escape hatch tests and stories use so the
 * rendered output tracks the props synchronously.
 */
export declare function useStableActiveSpeaker(activeSpeakerId: string | null | undefined, hysteresisMs: number): string | null;
//# sourceMappingURL=HangoutSpotlight.d.ts.map