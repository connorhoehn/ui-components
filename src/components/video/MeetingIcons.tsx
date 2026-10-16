// MeetingIcons — the glyphs a Teams-style meeting toolbar needs that
// MediaIcons does not carry: raise hand, react, view, notes, rooms, apps,
// meeting options (shield) and a share-tray arrow. Same contract as
// MediaIcons (24-unit viewBox, stroke = currentColor, `size` default 20).
// Every name is `Meeting…` so none can collide with ui/Icons at the root.

import type { SVGProps } from 'react';
import type { IconProps } from './MediaIcons';

function base(size: number, rest: Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    focusable: false as const,
    ...rest,
  };
}

/** An open raised hand. */
export function MeetingHandIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5" />
      <path d="M14 10.5V5.5a1.5 1.5 0 0 1 3 0v8" />
      <path d="M8 12.5 6.6 11a1.6 1.6 0 0 0-2.4 2.1l3.4 4.6A6 6 0 0 0 12.4 20h.6a4 4 0 0 0 4-4v-2.5" />
    </svg>
  );
}

/** A smiling face: the React button. */
export function MeetingReactIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14a4.5 4.5 0 0 0 7 0" />
      <line x1="9" y1="9.5" x2="9" y2="9.6" />
      <line x1="15" y1="9.5" x2="15" y2="9.6" />
    </svg>
  );
}

/** A four-pane grid: the View (layout) button. */
export function MeetingViewIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <line x1="12" y1="3.5" x2="12" y2="20.5" />
      <line x1="3.5" y1="12" x2="20.5" y2="12" />
    </svg>
  );
}

/** A ruled page: meeting notes. */
export function MeetingNotesIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <line x1="8.5" y1="8" x2="15.5" y2="8" />
      <line x1="8.5" y1="12" x2="15.5" y2="12" />
      <line x1="8.5" y1="16" x2="12.5" y2="16" />
    </svg>
  );
}

/** A room inside a room: breakout rooms. */
export function MeetingRoomsIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <rect x="11" y="11" width="6.5" height="6.5" rx="1.5" />
    </svg>
  );
}

/** A plus in a square: Apps. */
export function MeetingAppsIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

/** A shield: meeting options / lobby settings. */
export function MeetingShieldIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6l-7-3Z" />
    </svg>
  );
}

/** An arrow leaving a tray: Share (screen / content). */
export function MeetingShareIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <path d="M12 14V8.5" />
      <path d="m9.25 11 2.75-2.75L14.75 11" />
    </svg>
  );
}
