// Icons — small, general-purpose SVG glyphs for controls that are not tied
// to one composite (a "new" button in a rail header, a close in a dialog).
// Stroke-based on currentColor, so they take the button's text colour. The
// call-specific set lives in `video/MediaIcons`; this is the plain set.

import type { SVGProps } from 'react';

export interface GlyphProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Rendered size in px. Default 16 — sized for an `IconButton size="sm"`. */
  size?: number;
}

function base(size: number, rest: Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...rest,
  };
}

/** A plus: "make a new one". */
export function PlusIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  );
}

/** An X: "close", "dismiss". */
export function CloseIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/** A speech bubble: a conversation, a comment. */
export function ChatIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M13.5 10a1.5 1.5 0 0 1-1.5 1.5H5.5L2.5 14V3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5z" />
    </svg>
  );
}

/** A tray with an arrow out of it: "share", "post this somewhere". */
export function ShareIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 8.5V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5M10.5 4.5 8 2 5.5 4.5M8 2v8" />
    </svg>
  );
}

/** A chevron. `dir` is where it points. */
export function ChevronIcon({ size = 16, dir = 'down', ...rest }: GlyphProps & { dir?: 'up' | 'down' | 'left' | 'right' }) {
  const d = dir === 'down' ? 'M4 6l4 4 4-4' : dir === 'up' ? 'M4 10l4-4 4 4' : dir === 'left' ? 'M10 4 6 8l4 4' : 'M6 4l4 4-4 4';
  return (
    <svg {...base(size, rest)}>
      <path d={d} />
    </svg>
  );
}

/** A clock: history, "when". */
export function HistoryIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 5v3l2 1.5" />
    </svg>
  );
}

/** A page with a folded corner: a document, a file. */
export function DocumentIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M9.5 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.5z" />
      <path d="M9.5 2v3.5H13M6 9h4M6 11.5h4" />
    </svg>
  );
}

/** A box with an arrow leaving its corner: "open this in its own view". */
export function PopOutIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M7 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9" />
      <path d="M9.5 2.5H13.5V6.5" />
      <path d="M13.5 2.5 7.5 8.5" />
    </svg>
  );
}

/** A pencil: "change this". */
export function EditIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M11.5 2.5 13.5 4.5 5.5 12.5H3.5V10.5z" />
      <path d="M10 4l2 2" />
    </svg>
  );
}

/** A bin: "remove this". */
export function TrashIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 4.5h10" />
      <path d="M6.5 4.5V3h3v1.5" />
      <path d="M4.5 4.5 5 13h6l.5-8.5" />
      <path d="M7 7v4M9 7v4" />
    </svg>
  );
}

/** A pushpin: "keep this at the top". */
export function PinIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M5.5 2h5" />
      <path d="M6.5 2v3.5L5 8.5h6L9.5 5.5V2" />
      <path d="M8 8.5V14" />
    </svg>
  );
}

/** A bell with a slash through it: "notify me quietly". */
export function BellMutedIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M4.6 11.5h6.8l-.8-1.4V7a2.7 2.7 0 0 0-4.2-2.2" />
      <path d="M5.3 6.3V7v3.1l-.7 1.4" />
      <path d="M6.9 13.2a1.2 1.2 0 0 0 2.2 0" />
      <path d="M2.5 2.5 13.5 13.5" />
    </svg>
  );
}

/** A padlock: "private", "restricted to specific people". */
export function LockIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3.5" y="7.5" width="9" height="6" rx="1.2" />
      <path d="M5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

/** An eye: watching, "N people are seeing this". */
export function EyeIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M1.8 8s2.4-4 6.2-4 6.2 4 6.2 4-2.4 4-6.2 4S1.8 8 1.8 8z" />
      <circle cx="8" cy="8" r="1.8" />
    </svg>
  );
}

/** A handset: start a voice call. */
export function PhoneIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M5.2 2.8 3.4 4.6c-.5.5-.6 1.3-.2 1.9a15 15 0 0 0 6.3 6.3c.6.4 1.4.3 1.9-.2l1.8-1.8-2.6-1.7-1.3 1a11 11 0 0 1-3.4-3.4l1-1.3z" />
    </svg>
  );
}

/** A camera body: start a video call. Distinct from video/MediaIcons' VideoIcon, which is a call CONTROL. */
export function VideoCallIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2" y="4.5" width="8.5" height="7" rx="1.5" />
      <path d="M10.5 8.2 14 6.2v3.6l-3.5-2z" />
    </svg>
  );
}

/** A lightning bolt: activity, "things are happening". */
export function ActivityIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M8.5 2 4 9h3.2l-.7 5L12 7H8.8z" />
    </svg>
  );
}

/** An @ sign: mentions, "someone named you". */
export function AtIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="8.3" r="2.8" />
      <path d="M10.8 8.3v.9a1.9 1.9 0 0 0 3.7 0V8a6.5 6.5 0 1 0-2.8 5.4" />
    </svg>
  );
}

/** A crescent: the dark theme — "switch to (or currently in) dark mode". */
export function MoonIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M14 8.53A6 6 0 1 1 7.47 2 4.67 4.67 0 0 0 14 8.53z" />
    </svg>
  );
}

/** A sun: the light theme — "switch to (or currently in) light mode". */
export function SunIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" />
    </svg>
  );
}

/** Three stacked bars: "open the menu", or "unfold the rail this collapsed into". */
export function MenuIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
    </svg>
  );
}

/** A microphone on a stand: turn what is being said into text. Distinct from
 *  video/MediaIcons' MicIcon, which is a call's mute CONTROL. */
export function TranscribeIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="6" y="1.75" width="4" height="7.5" rx="2" />
      <path d="M3.5 7.5a4.5 4.5 0 0 0 9 0" />
      <path d="M8 12v2M5.5 14h5" />
    </svg>
  );
}

/** A trunk with a branch leaving it: a flow that splits — a pipeline, a branch. */
export function BranchIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="4.5" cy="3.5" r="1.5" />
      <circle cx="4.5" cy="12.5" r="1.5" />
      <circle cx="11.5" cy="3.5" r="1.5" />
      <path d="M4.5 5v6" />
      <path d="M11.5 5v1.5a3 3 0 0 1-3 3H4.5" />
    </svg>
  );
}

/** Bars on a baseline: measurements, "how much of this over time". */
export function ChartIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2.5 13.5h11" />
      <path d="M4.5 13.5V9M8 13.5V4M11.5 13.5V7" />
    </svg>
  );
}

/** Angle brackets around a slash: source, "the developer-facing thing". */
export function CodeIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M5.5 5.5 2.5 8l3 2.5M10.5 5.5 13.5 8l-3 2.5M9.3 3.5 6.7 12.5" />
    </svg>
  );
}

/** A jigsaw piece: something that plugs in — a capability, an optional part. */
export function PuzzleIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3.2 3.2H6.3a1.7 1.7 0 0 0 3.4 0H12.8V6.3a1.7 1.7 0 0 1 0 3.4V12.8H3.2z" />
    </svg>
  );
}

/** Two arrows chasing each other: something that runs again — a loop, a re-run. */
export function RepeatIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 7v-.5A3.5 3.5 0 0 1 6.5 3H12" />
      <path d="M10 1.5 12 3.5 10 5.5" />
      <path d="M13 9v.5a3.5 3.5 0 0 1-3.5 3.5H4" />
      <path d="M6 10.5 4 12.5 6 14.5" />
    </svg>
  );
}

/** A paperclip: a file came along with this. */
export function PaperclipIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M14.3 7.4 8.2 13.5a4 4 0 0 1-5.7-5.7l6.2-6.1a2.7 2.7 0 0 1 3.8 3.8l-6.2 6.1a1.3 1.3 0 0 1-1.9-1.9l5.7-5.6" />
    </svg>
  );
}
