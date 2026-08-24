// src/components/forms/Checkbox.tsx
//
// Checkbox primitive. The library shipped Switch and RadioGroup but no
// checkbox, so eleven call sites across the pipelines list surfaces each
// hand-rolled `<input type="checkbox" className="w-3.5 h-3.5 accent-primary">`
// — including the select-all headers, which additionally reach into a ref to
// set `indeterminate`, since HTML only exposes the mixed state imperatively.
//
// A checkbox is NOT a Switch: a switch flips a setting that takes effect now;
// a checkbox marks selection (rows in a table, items in a list) and supports
// the "some but not all" mixed state. Selection surfaces were hand-rolling
// precisely because Switch could not express that.

import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

export interface CheckboxProps {
  id?: string;
  /** Form field name, for label association and form submission. */
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  /**
   * Mixed state — "some but not all selected". Rendered natively (the dash),
   * exposed to AT via aria-checked="mixed". Clicking a mixed checkbox
   * reports `true`, matching the native select-all convention.
   */
  indeterminate?: boolean;
  disabled?: boolean;
  /** Accessible name. Required when no visible <label> wraps this. */
  'aria-label'?: string;
  /**
   * Id of the element naming this checkbox. Prefer this over `aria-label` when
   * a visible label exists but cannot wrap the control (e.g. a generated form
   * that renders the label above a row of widgets) — a hand-written
   * `aria-label` is a copy that drifts from the words on screen.
   */
  'aria-labelledby'?: string;
  /** Id(s) of the help / error text describing this checkbox. */
  'aria-describedby'?: string;
  /**
   * Click pass-through. Row-selection checkboxes live inside clickable
   * rows/cards and need `e.stopPropagation()` so ticking the box doesn't
   * also open the row.
   */
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  /** Key pass-through, for shift-range selection handling. */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  'data-testid'?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      id,
      name,
      checked,
      onChange,
      indeterminate = false,
      disabled = false,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      onClick,
      onKeyDown,
      className,
      'data-testid': testId,
    },
    forwardedRef,
  ) {
    const innerRef = useRef<HTMLInputElement | null>(null);

    // `indeterminate` is a DOM property, not an attribute — the only way to
    // set it is imperatively, which is what every hand-rolled site did with
    // its own ref plumbing.
    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <input
        ref={(el) => {
          innerRef.current = el;
          if (typeof forwardedRef === 'function') forwardedRef(el);
          else if (forwardedRef) forwardedRef.current = el;
        }}
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-checked={indeterminate ? 'mixed' : undefined}
        onChange={(e) => onChange(e.target.checked)}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={cn(
          'w-3.5 h-3.5 accent-primary cursor-pointer disabled:cursor-not-allowed',
          className,
        )}
        data-testid={testId}
      />
    );
  },
);

export default Checkbox;
