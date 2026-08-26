// MediaIcons — small SVG primitives used by the hangout / call composites.
//
// Pure SVG, no external dep. Each icon accepts `size` (default 20) and
// passes any additional SVG props through. Stroke-based, so they
// inherit color via currentColor — pair with `text-*` classes.

import type { SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number;
}

function base(size: number, rest: Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    focusable: false as const,
    ...rest,
  };
}

export function MicIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

export function MicOffIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <line x1="3" y1="3" x2="21" y2="21" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      <path d="M15 9.34V6a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 11" />
      <path d="M19 11a7 7 0 0 1-.11 1.23" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

export function VideoIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M22 8l-6 4 6 4V8z" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

export function VideoOffIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <line x1="3" y1="3" x2="21" y2="21" />
      <path d="M16 16H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10z" />
      <path d="M22 8l-6 4 6 4V8z" />
    </svg>
  );
}

export function ScreenShareIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2" y="4" width="20" height="12" rx="2" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
      <polyline points="9 10 12 7 15 10" />
      <line x1="12" y1="7" x2="12" y2="13" />
    </svg>
  );
}

export function ScreenShareOffIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <line x1="3" y1="3" x2="21" y2="21" />
      <path d="M22 14V6a2 2 0 0 0-2-2H6" />
      <path d="M2 6v8a2 2 0 0 0 2 2h12" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </svg>
  );
}

export function PhoneOffIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.49-2.86" />
      <path d="M5 5l-1.27 1.27a2 2 0 0 0-.45 2.11 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11" />
      <line x1="22" y1="2" x2="2" y2="22" />
    </svg>
  );
}

/** Add-a-person. Lives here rather than inside CallControls' private
 *  icon map so the docked and expanded call chromes can both render the
 *  same "add people" affordance. */
export function UserPlusIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}

/** Sparkles / magic-wand glyph — the media-effects affordance. Pair with
 *  CircularIconToggle in MediaControlsBar's `extras` slot to open a
 *  MediaEffectsTray. */
export function SparklesIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M12 3l1.9 5.1a1 1 0 0 0 .6.6L19.6 10.6a1 1 0 0 1 0 1.9L14.5 14.4a1 1 0 0 0-.6.6L12 20.1a1 1 0 0 1-1.9 0L8.2 15a1 1 0 0 0-.6-.6L2.5 12.5a1 1 0 0 1 0-1.9L7.6 8.7a1 1 0 0 0 .6-.6L10.1 3a1 1 0 0 1 1.9 0z" />
      <path d="M19 3v4" />
      <path d="M17 5h4" />
      <path d="M19 17v4" />
      <path d="M17 19h4" />
    </svg>
  );
}

/** Chat bubble glyph — the in-call chat affordance. Pair with
 *  CircularIconToggle in a controls `extras` slot to open a chat side
 *  panel (CallSidePanel) or the settings dialog's Chat tab. */
export function ChatBubbleIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

/** Roster glyph (two people, no "+") — the People destination in the
 *  call side-panel dock. Distinct from UserPlusIcon, which means "invite
 *  someone new" rather than "show who is here". */
export function UsersIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/** CC / captions glyph — the live-captions affordance. */
export function CaptionsIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10.5 10.2a2.2 2.2 0 1 0 0 3.6" />
      <path d="M16.5 10.2a2.2 2.2 0 1 0 0 3.6" />
    </svg>
  );
}

export function MoreHorizontalIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
