// src/components/video/CallControls.tsx
//
// Bottom controls bar for the call surface — mute, camera, screen-share,
// upgrade-to-video, add-participant + picker, end-call. Extracted from
// CallWidget so callers can drop the strip into alternative call
// composers (PiP-only viewer, dialer modal, etc.) without re-wiring
// the full widget shell.
//
// Pure presentational. Caller owns mute/camera/share state and provides
// handlers; this component just renders the right glyph for the state
// it was told it's in.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CallAvatar, type CallStripParticipant } from './CallParticipantStrip';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CallControlsMode = 'audio' | 'video';

export interface CallControlsProps {
  mode: CallControlsMode;
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

  className?: string;
}

// ---------------------------------------------------------------------------
// Icons (subset shared with CallWidget header — duplicated here so this
// file has no implicit dependency on CallWidget.)
// ---------------------------------------------------------------------------

const icons = {
  mic: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  ),
  micOff: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
      <path d="M5 10v2a7 7 0 0 0 12 5.29" />
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  ),
  camera: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  cameraOff: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" />
      <path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" />
      <path d="M15 13a3 3 0 1 0-6 0" />
    </svg>
  ),
  screenShare: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <polyline points="12 8 8 12 10 12 10 14 14 14 14 12 16 12 12 8" />
    </svg>
  ),
  phoneEnd: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
      <line x1="22" y1="2" x2="2" y2="22" />
    </svg>
  ),
  userPlus: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
  videoUpgrade: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// ControlButton (internal)
// ---------------------------------------------------------------------------

interface ControlButtonProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  testId?: string;
}

function ControlButton({
  icon,
  label,
  active = false,
  danger = false,
  onClick,
  disabled = false,
  testId,
}: ControlButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
      className={cn(
        'w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150',
        danger && 'bg-red-500 text-white hover:bg-red-600',
        active && !danger && 'bg-white/20 text-white',
        !active && !danger && 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white',
        disabled && 'opacity-40 cursor-not-allowed',
      )}
    >
      {icon}
    </button>
  );
}

// ---------------------------------------------------------------------------
// CallControls
// ---------------------------------------------------------------------------

export function CallControls({
  mode,
  isMuted = false,
  isCameraOn = true,
  isScreenSharing = false,
  onToggleMute,
  onToggleCamera,
  onToggleScreenShare,
  onUpgradeToVideo,
  onEndCall,
  onAddParticipant,
  availableParticipants,
  currentParticipantIds,
  className,
}: CallControlsProps) {
  const [showPicker, setShowPicker] = useState(false);

  const currentSet = new Set(currentParticipantIds ?? []);
  const addable = (availableParticipants ?? []).filter((p) => !currentSet.has(p.id));

  return (
    <div className={cn('flex flex-col', className)}>
      <div
        className="flex items-center justify-center gap-2 px-3 pb-3"
        data-testid="call-controls"
      >
        <ControlButton
          icon={isMuted ? icons.micOff : icons.mic}
          label={isMuted ? 'Unmute' : 'Mute'}
          active={isMuted}
          onClick={onToggleMute}
          testId="mute-button"
        />
        {mode === 'video' && (
          <ControlButton
            icon={isCameraOn ? icons.camera : icons.cameraOff}
            label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
            active={!isCameraOn}
            onClick={onToggleCamera}
            testId="camera-button"
          />
        )}
        {mode === 'audio' && onUpgradeToVideo && (
          <ControlButton
            icon={icons.videoUpgrade}
            label="Switch to video"
            onClick={onUpgradeToVideo}
            testId="upgrade-to-video-button"
          />
        )}
        <ControlButton
          icon={icons.screenShare}
          label={isScreenSharing ? 'Stop sharing' : 'Share screen'}
          active={isScreenSharing}
          onClick={onToggleScreenShare}
          testId="screenshare-button"
        />
        {onAddParticipant && (
          <ControlButton
            icon={icons.userPlus}
            label="Add participant"
            active={showPicker}
            onClick={() => setShowPicker((v) => !v)}
            testId="add-participant-button"
          />
        )}
        <ControlButton
          icon={icons.phoneEnd}
          label="End call"
          danger
          onClick={onEndCall}
          testId="hangup-button"
        />
      </div>

      {showPicker && onAddParticipant && (
        <div
          className="border-t border-white/5 bg-[#0f172a]/80"
          data-testid="add-participant-picker"
        >
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wide">
              Add to call
            </span>
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              className="text-white/40 hover:text-white/80 text-xs border-none bg-transparent cursor-pointer"
              aria-label="Close add-participant picker"
            >
              ✕
            </button>
          </div>
          {addable.length === 0 ? (
            <div className="px-3 pb-2.5 text-xs text-white/40 text-center">
              Everyone is already in the call
            </div>
          ) : (
            <div className="max-h-[120px] overflow-y-auto pb-1">
              {addable.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 border-none bg-transparent text-left cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => {
                    onAddParticipant(p.id);
                    if (addable.length <= 1) setShowPicker(false);
                  }}
                >
                  <CallAvatar participant={p} size={22} />
                  <span className="text-xs text-white/80">{p.displayName}</span>
                  <span className="ml-auto text-[10px] text-indigo-400">+ Add</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
