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
