// MediaControlsBar — bottom control bar for an active hangout call.
//
// Purpose-built for the hangout flow: round mic / camera / screen-share
// toggles + a dedicated red Leave button. Built on top of
// CircularIconToggle and MediaIcons.
//
// Per the gateway-locked boundary (2026-06-04 vs websocket-gateway), the
// Leave-call affordance lives HERE rather than on
// <WrappedLVSHangoutLayout> or <HangoutRoomHeader>. This composite owns
// it so consumers don't have to reimplement the red round button each
// time.
//
// Pure presentational. Caller owns mute/camera/share state and provides
// handlers; this component just renders the right glyph for the state
// it was told it's in.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import CircularIconToggle, {
  type CircularIconToggleSize,
} from './CircularIconToggle';
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  ScreenShareIcon,
  ScreenShareOffIcon,
  PhoneOffIcon,
} from './MediaIcons';

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

const LEAVE_SIZE_CLASSES: Record<CircularIconToggleSize, string> = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
};

const LEAVE_ICON_SIZE: Record<CircularIconToggleSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function MediaControlsBar({
  audioOn,
  videoOn,
  screenSharing = false,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onLeave,
  audioDisabled,
  videoDisabled,
  screenShareDisabled,
  extras,
  leaveLabel = 'Leave call',
  size = 'md',
  className,
  'data-testid': testId,
}: MediaControlsBarProps) {
  const iconSize = size === 'lg' ? 22 : size === 'sm' ? 16 : 18;
  return (
    <div
      data-testid={testId}
      className={cn(
        'flex items-center justify-center gap-3 px-4 py-3',
        className,
      )}
    >
      <CircularIconToggle
        on={audioOn}
        onClick={onToggleAudio}
        disabled={audioDisabled}
        size={size}
        aria-label={audioOn ? 'Mute microphone' : 'Unmute microphone'}
        title={audioOn ? 'Mute microphone' : 'Unmute microphone'}
        iconOn={<MicIcon size={iconSize} />}
        iconOff={<MicOffIcon size={iconSize} />}
        data-testid="media-controls-mic"
      />
      <CircularIconToggle
        on={videoOn}
        onClick={onToggleVideo}
        disabled={videoDisabled}
        size={size}
        aria-label={videoOn ? 'Turn off camera' : 'Turn on camera'}
        title={videoOn ? 'Turn off camera' : 'Turn on camera'}
        iconOn={<VideoIcon size={iconSize} />}
        iconOff={<VideoOffIcon size={iconSize} />}
        data-testid="media-controls-cam"
      />
      {onToggleScreenShare && (
        <CircularIconToggle
          on={screenSharing}
          onClick={onToggleScreenShare}
          disabled={screenShareDisabled}
          size={size}
          offTone="neutral"
          aria-label={screenSharing ? 'Stop sharing screen' : 'Share screen'}
          title={screenSharing ? 'Stop sharing screen' : 'Share screen'}
          iconOn={<ScreenShareIcon size={iconSize} />}
          iconOff={<ScreenShareOffIcon size={iconSize} />}
          data-testid="media-controls-screenshare"
        />
      )}
      {extras}
      <button
        data-ui-part=""
        type="button"
        onClick={onLeave}
        aria-label={leaveLabel}
        title={leaveLabel}
        data-testid="media-controls-leave"
        className={cn(
          'rounded-full grid place-items-center transition-colors duration-150',
          LEAVE_SIZE_CLASSES[size],
          'bg-danger text-white hover:bg-danger cursor-pointer',
        )}
      >
        <PhoneOffIcon size={LEAVE_ICON_SIZE[size]} />
      </button>
    </div>
  );
}

export default MediaControlsBar;
