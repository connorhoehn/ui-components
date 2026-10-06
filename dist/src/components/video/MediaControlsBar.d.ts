import type { ReactNode } from 'react';
import { type CircularIconToggleSize } from './CircularIconToggle';
export interface MediaControlsBarProps {
    audioOn: boolean;
    videoOn: boolean;
    screenSharing?: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    /** When omitted, the screen-share toggle is not rendered. */
    onToggleScreenShare?: () => void;
    /** Required — leaves the call. Per the locked contract, leave lives here. */
    onLeave: () => void;
    audioDisabled?: boolean;
    videoDisabled?: boolean;
    screenShareDisabled?: boolean;
    /** Slot rendered between the screen-share toggle and the Leave button.
     *  Use for raise-hand, captions, chat-open, settings, etc. */
    extras?: ReactNode;
    /** Override the Leave button's accessible label. Default: "Leave call". */
    leaveLabel?: string;
    /** Size of each control. Defaults to 'md'. */
    size?: CircularIconToggleSize;
    className?: string;
    'data-testid'?: string;
}
export declare function MediaControlsBar({ audioOn, videoOn, screenSharing, onToggleAudio, onToggleVideo, onToggleScreenShare, onLeave, audioDisabled, videoDisabled, screenShareDisabled, extras, leaveLabel, size, className, 'data-testid': testId, }: MediaControlsBarProps): import("react").JSX.Element;
export default MediaControlsBar;
//# sourceMappingURL=MediaControlsBar.d.ts.map