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
// TWO CASES, also deliberately — and not a loophole in the above. `upper` is
// the panel caption; `sentence` is the caption that labels a GROUP OF FORM
// CONTROLS ("If timeout" over a pair of radios), where an uppercase wide-
// tracked label is a visual outlier beside the sentence-case labels
// `FormField` renders for every other control on the same panel. That is one
// decision made once here rather than the same plain `<div className="text-
// [12px] font-medium">` written out at each approval/trigger/retry config.
// Each case is still exactly one size and one weight.
//
// Not `ToolbarLabel` generalised: that one is not uppercase and carries
// toolbar-specific layout (`flex-none whitespace-nowrap`). Two different jobs
// that happen to both be small and grey.

import type { ReactNode, ElementType } from 'react';
import { cn } from '../../lib/cn';

/**
 * `upper` — the 10px bold uppercase panel caption (default, unchanged).
 * `sentence` — a 12px medium sentence-case caption at normal tracking, sized
 * and weighted to match `FormField`'s own label so it sits level with the
 * other labels in a config form.
 */
export type SectionLabelCase = 'upper' | 'sentence';

const CASE_CLASSES: Record<SectionLabelCase, string> = {
  upper: 'text-[10px] font-bold uppercase tracking-[0.06em] text-text-tertiary',
  sentence: 'text-[12px] font-medium normal-case tracking-normal text-text-primary',
};

export interface SectionLabelProps {
  children: ReactNode;
  /** Letter case and weight. See `SectionLabelCase`. Default `upper`. */
  case?: SectionLabelCase;
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
  case: textCase = 'upper',
  className,
  'data-testid': testId,
}: SectionLabelProps) {
  return (
    <As
      data-testid={testId}
      className={cn(
        CASE_CLASSES[textCase] ?? CASE_CLASSES.upper,
        className,
      )}
    >
      {children}
    </As>
  );
}

export default SectionLabel;
