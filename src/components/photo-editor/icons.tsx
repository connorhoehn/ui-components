// src/components/photo-editor/icons.tsx
//
// Glyphs the photo editor needs that the plain set (ui/Icons) does not have.
// Same 16-unit grid, stroke on currentColor, so they sit beside `UndoIcon`,
// `ChevronIcon` and `MoreIcon` in one toolbar without a visual seam.

import type { SVGProps } from 'react';

export interface PhotoGlyphProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number;
}

function base(size: number, rest: Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return {
    width: size, height: size, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...rest,
  };
}

/** A window with a left rail: "show / hide the sidebar". */
export function SidebarToggleIcon({ size = 16, ...rest }: PhotoGlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2" y="3" width="12" height="10" rx="1.5" />
      <path d="M6 3v10M3.5 5.5h1M3.5 7.5h1" />
    </svg>
  );
}

/** A flag: the pick / reject flag. */
export function FlagIcon({ size = 16, ...rest }: PhotoGlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3.5 14V2.5M3.5 3h8l-1.5 3 1.5 3h-8" />
    </svg>
  );
}

/** A heart: a pick, on a filmstrip thumbnail. `filled` for a kept pick. */
export function HeartIcon({ size = 16, filled = false, ...rest }: PhotoGlyphProps & { filled?: boolean }) {
  return (
    <svg {...base(size, rest)} fill={filled ? 'currentColor' : 'none'}>
      <path d="M8 13.5S2.5 10.2 2.5 6.3A2.8 2.8 0 0 1 8 5a2.8 2.8 0 0 1 5.5 1.3C13.5 10.2 8 13.5 8 13.5z" />
    </svg>
  );
}

/** Two panes side by side: the compare layout. */
export function CompareLayoutIcon({ size = 16, ...rest }: PhotoGlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
      <path d="M8 3v10M3.5 6h2.5M3.5 8h2.5M10 6h2.5M10 8h2.5" />
    </svg>
  );
}

/** Two stacked squares: "n edits on this photo". */
export function EditStackIcon({ size = 16, ...rest }: PhotoGlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2.5" y="5" width="8.5" height="8.5" rx="1.5" />
      <path d="M5 5V3.5A1 1 0 0 1 6 2.5h6.5a1 1 0 0 1 1 1V10a1 1 0 0 1-1 1H11" />
    </svg>
  );
}
