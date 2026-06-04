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
    /** Active speaker id — drives spotlight slot via stabilized hysteresis. */
    activeSpeakerId?: string | null;
    /** Hysteresis window (ms) before the spotlight slot swaps. 0 = immediate. */
    speakerHysteresisMs?: number;
    /** Click handler per filmstrip tile. */
    onParticipantClick?: (id: string) => void;
    className?: string;
    style?: CSSProperties;
}
export declare function HangoutSpotlight({ participants, localParticipant, spotlightContent, activeSpeakerId, speakerHysteresisMs, onParticipantClick, className, style, }: HangoutSpotlightProps): import("react/jsx-runtime").JSX.Element;
/**
 * Debounce activeSpeakerId so the spotlight slot only swaps after the new
 * speaker has been talking for at least `hysteresisMs`. Without this,
 * every cough, laugh, or short interjection causes flicker.
 */
export declare function useStableActiveSpeaker(activeSpeakerId: string | null | undefined, hysteresisMs: number): string | null;
//# sourceMappingURL=HangoutSpotlight.d.ts.map