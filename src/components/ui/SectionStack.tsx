// src/components/ui/SectionStack.tsx
//
// The page's sections, one under the other, with a hairline between each.
//
// PageSection draws a titled block; nothing drew the space BETWEEN blocks, so
// every overview page hand-rolled it — a `border-t` on the second section, a
// `mt-8` on the third, an `<hr className="my-5">` before the fourth — and two
// pages never agreed on the rhythm. SectionStack owns that boundary:
//
//   <SectionStack>
//     <PageSection title="Overview" … />
//     <PageSection size="md" title="Progress" … />
//     {hasRuns && <PageSection size="md" title="Recent runs" … />}
//   </SectionStack>
//
// - A rule between each pair of children, never before the first or after the
//   last. A null / false / undefined child is skipped, so a conditional
//   section never leaves two rules back to back or a rule hanging at the end.
// - The rhythm is the container's `gap`: 24px above and below each rule
//   (`density="compact"`: 16px). Flex gaps do not collapse, so the distance is
//   exact, unlike sibling margins.
// - `divided={false}` keeps the same section-to-section distance (48px, or
//   32px compact: the two gaps a rule would have sat between) without drawing
//   the rule.
// - Unset, `density` follows the nearest `DensityProvider`.
//
// Emits `data-ui-section-stack="comfortable|compact"` on the container and
// `data-ui-section-rule` on each rule so a rendered-UI audit can tell a
// library boundary from a hand-rolled border.

import { Children, type ElementType, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { cn } from '../../lib/cn';
import { useDensity, type Density } from '../shared/Density';

export interface SectionStackProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** The sections — typically `PageSection`s, or any block. Null/false children are skipped. */
  children?: ReactNode;
  /**
   * Vertical rhythm. `comfortable`: 24px either side of each rule. `compact`:
   * 16px. Unset, follows the nearest `DensityProvider` (comfortable without one).
   */
  density?: Density;
  /** Draw a rule between sections. `false` keeps the spacing, no rule. Default `true`. */
  divided?: boolean;
  /** Container element. Default `div`; `section` when the stack is itself a landmark region. */
  as?: 'div' | 'section';
  ref?: Ref<HTMLElement>;
  'data-testid'?: string;
}

// Written out in full so Tailwind's scanner sees every class.
const RULE_GAP: Record<Density, string> = { comfortable: 'gap-6', compact: 'gap-4' };
const PLAIN_GAP: Record<Density, string> = { comfortable: 'gap-12', compact: 'gap-8' };

export function SectionStack({
  children,
  density: densityProp,
  divided = true,
  as = 'div',
  className,
  ref,
  ...rest
}: SectionStackProps) {
  const density = useDensity(densityProp);
  // Polymorphic like Stack: the ref is an HTMLElement whichever tag renders.
  const As = as as ElementType;
  // `Children.toArray` drops null, undefined and booleans, so a conditional
  // `{cond && <PageSection …/>}` leaves no gap and no orphan rule.
  const items = Children.toArray(children);
  return (
    <As
      ref={ref}
      className={cn('flex min-w-0 flex-col', divided ? RULE_GAP[density] : PLAIN_GAP[density], className)}
      data-ui-section-stack={density}
      data-divided={divided ? undefined : 'false'}
      {...rest}
    >
      {items.flatMap((child, index) =>
        divided && index > 0
          ? [<hr key={`rule-${index}`} className="m-0 w-full self-stretch border-0 border-t border-border" data-ui-section-rule="" />, child]
          : [child],
      )}
    </As>
  );
}

export default SectionStack;
