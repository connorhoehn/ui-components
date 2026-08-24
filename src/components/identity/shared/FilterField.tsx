// src/components/identity/shared/FilterField.tsx
//
// The uppercase caption above a filter-bar control on the identity admin
// pages. It existed only as a copy-pasted idiom:
//
//   <div className="flex flex-col gap-1.5">
//     <label className="text-xs font-semibold …">Entity Type</label>
//     <Select … />
//   </div>
//
// — a `<label>` with no `htmlFor` that wrapped no control, i.e. exactly the
// defect the pipelines ConfigField audit found. It labelled nothing, so each
// of these filters announced as a bare "combo box" / "edit text". Eight copies
// meant eight silent controls.
//
// This is shared/FormField with the caption typography swapped in; the
// `htmlFor` → `id` association, `aria-describedby` and `aria-invalid` all come
// from there rather than being re-derived here.
//
// NOT exported from the identity barrel: it is an internal page idiom, not
// public API.

import type { ReactNode } from 'react';
import SharedFormField from '../../shared/FormField';
import { cn } from '../../../lib/cn';

export interface FilterFieldProps {
  label: string;
  /** Helper text under the control; reachable via aria-describedby. */
  hint?: string;
  /**
   * Receives the wiring to spread onto the control. `labelId` is dropped here
   * — a filter always holds a single labelable control, so `htmlFor` is enough
   * and spreading `labelId` onto a DOM node would emit an unknown attribute.
   */
  children: (wiring: {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
  }) => ReactNode;
  /** `inline` puts the caption beside the control instead of above it. */
  layout?: 'stacked' | 'inline';
  className?: string;
}

export function FilterField({ label, hint, children, layout = 'stacked', className }: FilterFieldProps) {
  return (
    <SharedFormField
      label={label}
      hint={hint}
      layout={layout}
      className={className ?? (layout === 'stacked' ? 'gap-1.5' : undefined)}
      // `min-w-0` cancels FormField's inline-layout label gutter: these
      // captions size to their text, they are not a two-column form.
      labelClassName={cn(
        'text-xs font-semibold text-neutral uppercase tracking-wide',
        layout === 'inline' && 'min-w-0',
      )}
    >
      {({ labelId: _labelId, ...wiring }) => children(wiring)}
    </SharedFormField>
  );
}

export default FilterField;
