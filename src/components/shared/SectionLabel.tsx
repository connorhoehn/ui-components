// SectionLabel — the tiny uppercase caption that titles a block INSIDE a panel.
// "Variables", "Screenshot", "Inference settings", "Baseline — v3".
//
// The gap it fills: `PageSection` titles a section of a page, and `ToolbarLabel`
// labels a control inside a `Toolbar`. There was nothing for the level between —
// a caption one step below a section title — so every page declared it inline.
// Across the OrgIQ portal that shape appears **128 times in 45 files**, in two
// forms (a `style` object and a Tailwind class string), which is exactly why no
// two pages agreed on it: measured variants ran 10px and 11px, weight 600 and
// 700, tracking 0.05em and 0.06em.
//
// ONE SIZE, deliberately. There is no `size` prop, because a size prop is how
// the drift happened in the first place — every caller picking "just slightly
// smaller here" is the same thing as no component at all. If a caption genuinely
// needs different weight in one place, that is a design decision worth making
// once, here, for everyone.
//
// Not `ToolbarLabel` generalised: that one is not uppercase and carries
// toolbar-specific layout (`flex-none whitespace-nowrap`). Two different jobs
// that happen to both be small and grey.

import type { ReactNode, ElementType } from 'react';
import { cn } from '../../lib/cn';

export interface SectionLabelProps {
  children: ReactNode;
  /**
   * The element to render. Defaults to `span` so it can sit inline beside a
   * count or a chip; pass `"div"` when the caption owns its own line.
   */
  as?: ElementType;
  className?: string;
  'data-testid'?: string;
}

export function SectionLabel({
  children,
  as: As = 'span',
  className,
  'data-testid': testId,
}: SectionLabelProps) {
  return (
    <As
      data-testid={testId}
      className={cn(
        'text-[10px] font-bold uppercase tracking-[0.06em] text-text-tertiary',
        className,
      )}
    >
      {children}
    </As>
  );
}

export default SectionLabel;
