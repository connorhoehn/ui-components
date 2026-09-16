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
