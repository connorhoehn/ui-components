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
import type { ChangeEvent, MouseEvent } from 'react';
import { cn } from '../../lib/cn';

const NO_MODIFIERS: CheckboxModifiers = {
  shiftKey: false, metaKey: false, ctrlKey: false, altKey: false,
};

/** Modifier keys held during the click that toggled a checkbox. */
export interface CheckboxModifiers {
  shiftKey: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
}

export interface CheckboxProps {
  id?: string;
  /** Form field name, for label association and form submission. */
  name?: string;
  checked: boolean;
  /**
   * The new checked state, and the modifier keys held while it changed.
   *
   * `shiftKey` is the reason for the second argument: "tick this one" and
   * "tick everything from the last one to this one" are the same control with
   * shift held, and a callback carrying only the boolean cannot express the
   * second. Callers with a shift-select list therefore hand-rolled a native
   * <input type="checkbox"> — which is how a pipelines table ended up styling
   * itself with `accent-[var(--color-accent-solid)]`, a token that does not
   * exist. Existing callers taking one parameter are unaffected.
   *
   * The modifiers come from the CLICK, not the change event: a change event
   * carries no modifier state at all. Keyboard activation (space) also emits a
   * click, so it arrives here with every modifier false, which is correct —
   * there is no shift-space range-select convention on a checkbox.
   */
  onChange: (checked: boolean, modifiers: CheckboxModifiers) => void;
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
    const modifiersRef = useRef<CheckboxModifiers>(NO_MODIFIERS);
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
        // The click runs before the change and is the only one of the two
        // that knows which modifiers were held, so it is recorded here and
        // read a moment later. Reset to all-false first so a keyboard toggle
        // never inherits the modifiers of a previous mouse click.
        onClick={(e: MouseEvent<HTMLInputElement>) => {
          modifiersRef.current = {
            shiftKey: e.shiftKey, metaKey: e.metaKey,
            ctrlKey: e.ctrlKey, altKey: e.altKey,
          };
          onClick?.(e);
        }}
        onKeyDown={(e) => {
          // A keyboard toggle must not inherit the modifiers of whatever mouse
          // click happened last.
          modifiersRef.current = NO_MODIFIERS;
          onKeyDown?.(e);
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked, modifiersRef.current)}
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
