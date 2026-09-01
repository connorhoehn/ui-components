// FormRow — two or three fields side by side, stacking on a narrow container.
//
// `FormField` handles one control. Putting two next to each other ("Starts" /
// "Ends", "Amount" / "Note") had no component, so every form wrote
// `style={{ display: 'flex', gap: 12 }}` on the row AND `style={{ flex: 1 }}`
// on each field — two inline styles per pair, and a row that never stacked, so
// a date pair in a 520px modal squeezed both pickers until neither was usable.
//
// Children share the row EQUALLY — that is the whole contract, and it is what
// makes the component worth having: a form whose rows are all even columns
// reads as a form. For a deliberately uneven row (a narrow amount beside a wide
// note, a pair of buttons on the end) reach for `<Inline>` and size the fields
// yourself; that is a different shape, not a variant of this one.

import { Children, isValidElement, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface FormRowProps {
  /** The fields. Usually `<FormField>`s; anything is accepted. */
  children: ReactNode;
  /**
   * Below this width the row stacks. `sm` (default, 640px) suits a modal;
   * `md` (768px) suits a full-width form where three fields share the row.
   */
  stackBelow?: 'sm' | 'md';
  /** Gap between fields. Default 12px, matching Stack's `md`. */
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  'data-testid'?: string;
}

const GAP = { sm: 'gap-2', md: 'gap-3', lg: 'gap-4' } as const;
const STACK = { sm: 'flex-col sm:flex-row', md: 'flex-col md:flex-row' } as const;

export function FormRow({
  children,
  stackBelow = 'sm',
  gap = 'md',
  className,
  'data-testid': testId,
}: FormRowProps) {
  return (
    <div
      className={cn('flex items-start', STACK[stackBelow], GAP[gap], className)}
      data-testid={testId}
    >
      {Children.map(children, (child) =>
        // `flex-1 basis-0` makes every field take an equal share regardless of
        // its content width — without `basis-0` a long label widens its own
        // column and the row goes lopsided. `min-w-0` lets a select shrink
        // instead of forcing the row wider than its container.
        isValidElement(child) ? <div className="flex-1 basis-0 min-w-0">{child}</div> : child,
      )}
    </div>
  );
}

export default FormRow;
