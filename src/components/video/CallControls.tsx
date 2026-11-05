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

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { CallAvatar, type CallStripParticipant } from './CallParticipantStrip';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
  more: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
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
  /** Set only by the overflow trigger, so it announces its menu. */
  expanded?: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

function ControlButton({
  icon,
  label,
  active = false,
  danger = false,
  onClick,
  disabled = false,
  testId,
  expanded,
  buttonRef,
}: ControlButtonProps) {
  return (
    <button
      data-ui-part=""
      ref={buttonRef}
      type="button"
      title={label}
      aria-label={label}
      aria-haspopup={expanded === undefined ? undefined : 'menu'}
      aria-expanded={expanded}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
      className={cn(
        'w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150',
        danger && 'bg-danger text-white hover:bg-danger',
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
// Overflow menu (internal)
// ---------------------------------------------------------------------------

/**
 * One wired control, described rather than rendered — so the same gate
 * ("no handler ⇒ no entry") decides both whether the control exists AT ALL
 * and which side of the density split it lands on. Building the row from
 * these specs is what keeps the unwired-handler rule from having to be
 * repeated once per density.
 */
interface ControlSpec {
  key: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  testId: string;
}

/**
 * "More" menu for the controls compact density demotes.
 *
 * Hand-rolled rather than reusing shared/DropdownMenu because that menu
 * paints itself with the FLIPPING surface/text tokens. Call chrome is
 * theme-invariant (see --color-call-chrome in styles.css): a themed panel
 * hanging off the always-dark card is the same class of bug the chrome
 * tokens exist to prevent, so this panel uses the chrome tokens and the
 * white-alpha overlays its siblings already use.
 *
 * Menu items keep the demoted control's `data-testid`, so a caller (or a
 * test) that reached a control inline still reaches the same node here.
 */
function OverflowMenu({ controls }: { controls: ControlSpec[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Dismiss on outside press. Without it the panel survives a click on the
  // video stage behind it, which in a 320px widget covers the call.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Escape returns focus to the trigger; arrows walk the items. Tab already
  // works (every item is a real button) — this is the keyboard affordance a
  // role="menu" promises on top of that.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const items = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );
    if (items.length === 0) return;
    e.preventDefault();
    const current = items.indexOf(document.activeElement as HTMLElement);
    let next: number;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else if (e.key === 'ArrowDown') next = current < 0 ? 0 : (current + 1) % items.length;
    else next = current <= 0 ? items.length - 1 : current - 1;
    items[next].focus();
  };

  return (
    <div className="relative inline-flex" ref={rootRef} onKeyDown={onKeyDown}>
      <ControlButton
        icon={icons.more}
        label="More call controls"
        active={open}
        expanded={open}
        buttonRef={triggerRef}
        onClick={() => setOpen((v) => !v)}
        testId="call-controls-more-button"
      />
      {open && (
        <div
          role="menu"
          aria-label="More call controls"
          data-testid="call-controls-overflow"
          className="absolute bottom-full right-0 z-10 mb-2 min-w-[176px] overflow-hidden rounded-lg border border-call-chrome-border bg-call-chrome py-1 shadow-lg"
        >
          {controls.map((c) => (
            <button
              data-ui-part=""
              key={c.key}
              type="button"
              role="menuitem"
              data-testid={c.testId}
              aria-label={c.label}
              onClick={() => {
                c.onClick();
                setOpen(false);
              }}
              className={cn(
                'flex w-full cursor-pointer items-center gap-2.5 border-none px-3 py-2 text-left text-xs transition-colors',
                c.active
                  ? 'bg-white/15 text-white'
                  : 'bg-transparent text-white/80 hover:bg-white/10 hover:text-white',
              )}
            >
              <span className="shrink-0" aria-hidden="true">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CallControls
// ---------------------------------------------------------------------------

/**
 * What survives in the row at compact density: the controls a user needs to
 * stay IN the call. End-call is inline too, but it is rendered separately
 * (after `extras`) so its position never moves.
 */
const COMPACT_INLINE_KEYS = new Set(['mute', 'camera']);

export function CallControls({
  mode,
  density = 'full',
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
  onOpenAddParticipant,
  extras,
  className,
}: CallControlsProps) {
  const [showPicker, setShowPicker] = useState(false);

  const currentSet = new Set(currentParticipantIds ?? []);
  const addable = (availableParticipants ?? []).filter((p) => !currentSet.has(p.id));

  // Every handler on this bar is optional and `ControlButton` has no
  // fallback behaviour, so an unwired control would render a live, enabled
  // icon button that swallows the click — the mic glyph never changes and
  // the user reads it as broken. Gating here (rather than at each render
  // site) means a control that is absent is absent at BOTH densities: it
  // never becomes a dead entry in the overflow menu either.
  const controls: ControlSpec[] = [];
  if (onToggleMute) {
    controls.push({
      key: 'mute',
      icon: isMuted ? icons.micOff : icons.mic,
      label: isMuted ? 'Unmute' : 'Mute',
      active: isMuted,
      onClick: onToggleMute,
      testId: 'mute-button',
    });
  }
  if (mode === 'video' && onToggleCamera) {
    controls.push({
      key: 'camera',
      icon: isCameraOn ? icons.camera : icons.cameraOff,
      label: isCameraOn ? 'Turn off camera' : 'Turn on camera',
      active: !isCameraOn,
      onClick: onToggleCamera,
      testId: 'camera-button',
    });
  }
  if (mode === 'audio' && onUpgradeToVideo) {
    controls.push({
      key: 'upgrade',
      icon: icons.videoUpgrade,
      label: 'Switch to video',
      onClick: onUpgradeToVideo,
      testId: 'upgrade-to-video-button',
    });
  }
  if (onToggleScreenShare) {
    controls.push({
      key: 'screenshare',
      icon: icons.screenShare,
      label: isScreenSharing ? 'Stop sharing' : 'Share screen',
      active: isScreenSharing,
      onClick: onToggleScreenShare,
      testId: 'screenshare-button',
    });
  }
  if (onAddParticipant || onOpenAddParticipant) {
    controls.push({
      key: 'add-participant',
      icon: icons.userPlus,
      label: 'Add people to this call',
      active: showPicker,
      onClick: onOpenAddParticipant ?? (() => setShowPicker((v) => !v)),
      testId: 'add-participant-button',
    });
  }

  const compact = density === 'compact';
  const inlineControls = compact
    ? controls.filter((c) => COMPACT_INLINE_KEYS.has(c.key))
    : controls;
  const overflowControls = compact
    ? controls.filter((c) => !COMPACT_INLINE_KEYS.has(c.key))
    : [];

  return (
    <div className={cn('flex flex-col', className)}>
      <div
        className="flex items-center justify-center gap-2 px-3 pb-3"
        data-testid="call-controls"
      >
        {inlineControls.map((c) => (
          <ControlButton
            key={c.key}
            icon={c.icon}
            label={c.label}
            active={c.active}
            onClick={c.onClick}
            testId={c.testId}
          />
        ))}
        {/* Sits where the demoted controls used to, so the row's shape is
            recognisable between densities — and BEFORE `extras`, which the
            caller passed explicitly and therefore chose to keep inline. */}
        {overflowControls.length > 0 && <OverflowMenu controls={overflowControls} />}
        {extras}
        {onEndCall && (
          <ControlButton
            icon={icons.phoneEnd}
            label="End call"
            danger
            onClick={onEndCall}
            testId="hangup-button"
          />
        )}
      </div>

      {showPicker && onAddParticipant && !onOpenAddParticipant && (
        <div
          className="border-t border-white/5 bg-call-chrome/80"
          data-testid="add-participant-picker"
        >
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wide">
              Add to call
            </span>
            <button
              data-ui-part=""
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
                  data-ui-part=""
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
                  <span className="ml-auto text-[10px] text-primary-fg">+ Add</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
