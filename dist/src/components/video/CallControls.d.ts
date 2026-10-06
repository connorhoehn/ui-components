import { type ReactNode } from 'react';
import { type CallStripParticipant } from './CallParticipantStrip';
export type CallControlsMode = 'audio' | 'video';
/**
 * How much of the control set the surface has room for.
 *
 *   'full'     every wired control sits in the row (default — unchanged).
 *   'compact'  only the controls needed to STAY in the call stay in the
 *              row (mute, camera, end) plus the caller's `extras`; the
 *              rest move into the "More" menu.
 *
 * A 320px widget docked beside a document was rendering the same nine-icon
 * row as a fullscreen stage, which is what made it read as "duplicated and
 * way off". Compact thins the row without REMOVING anything: a control the
 * caller wired but the user cannot reach is a regression, not a
 * simplification, so everything demoted is still one click away.
 */
export type CallControlsDensity = 'full' | 'compact';
export interface CallControlsProps {
    mode: CallControlsMode;
    /** Row density. Defaults to 'full' — see {@link CallControlsDensity}. */
    density?: CallControlsDensity;
    isMuted?: boolean;
    isCameraOn?: boolean;
    isScreenSharing?: boolean;
    onToggleMute?: () => void;
    onToggleCamera?: () => void;
    onToggleScreenShare?: () => void;
    onUpgradeToVideo?: () => void;
    onEndCall?: () => void;
    /** When provided, shows the "add participant" button + picker popover. */
    onAddParticipant?: (participantId: string) => void;
    /**
     * People who can still be added. Participants already in the call
     * should be filtered out by the caller — or pass `currentParticipantIds`
     * and let CallControls dedupe.
     */
    availableParticipants?: CallStripParticipant[];
    /** Optional explicit set of ids already in the call to dedupe against. */
    currentParticipantIds?: ReadonlyArray<string>;
    /** Consumer-owned "add people" flow. When set, the add-participant
     *  button calls this instead of toggling the built-in inline picker —
     *  for hosts that already have their own invite surface (a modal over
     *  the presence roster, say) and just want the button in the row,
     *  looking like every other control. */
    onOpenAddParticipant?: () => void;
    /** Slot rendered IN the control row, between add-participant and the
     *  End button — camera effects, captions, raise-hand. Same contract
     *  as MediaControlsBar's `extras`: extra controls belong in the row,
     *  not floating in their own strip above it. */
    extras?: ReactNode;
    className?: string;
}
export declare function CallControls({ mode, density, isMuted, isCameraOn, isScreenSharing, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onEndCall, onAddParticipant, availableParticipants, currentParticipantIds, onOpenAddParticipant, extras, className, }: CallControlsProps): import("react").JSX.Element;
//# sourceMappingURL=CallControls.d.ts.map