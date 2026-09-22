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
import {
  TONE_BORDER,
  TONE_SOLID_BG,
  toneKey,
  type Tone,
  type ToneOrAlias,
} from '../shared/tones';

/**
 * `square` is the native `accent-primary` box (default, unchanged). `round` is
 * the tone-coloured ring that fills solid and shows a tick when checked —
 * the "status toggle" shape a task list uses, where the colour carries the
 * state (amber pending, blue acknowledged, green done) and the control is
 * round so it reads as a status rather than a form field.
 *
 * This is still a real `<input type="checkbox">`: the native control is
 * transparent and stretched over the painted ring, so focus, space-to-toggle,
 * label association and form submission all behave exactly as they do for the
 * square shape. Hosts that hand-rolled this shape used a `<button>` and lost
 * every one of those.
 */
export type CheckboxShape = 'square' | 'round';

// Unchecked, the ring is an outline; hovering tints its inside so the target
// reads as something you can hit before you hit it. `peer-hover` rather than
// `hover` because the pointer is over the transparent input, not the paint.
const ROUND_HOVER_FILL: Record<Tone, string> = {
  neutral: 'peer-hover:bg-neutral/20',
  success: 'peer-hover:bg-success/20',
  warning: 'peer-hover:bg-warning/20',
  danger: 'peer-hover:bg-danger/20',
  info: 'peer-hover:bg-info/20',
  caution: 'peer-hover:bg-caution/20',
  accent: 'peer-hover:bg-accent/20',
};

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
  /**
   * Control shape. See `CheckboxShape`. Default `square`.
   *
   * With `round`, `className` lands on the wrapper (the thing with a size and
   * a position) rather than on the hidden input, since the input no longer has
   * any paint of its own — which is also how the control is resized, e.g.
   * `className="h-[22px] w-[22px]"`.
   */
  shape?: CheckboxShape;
  /**
   * Semantic tone for `shape="round"` — the ring's border and its checked
   * fill. Ignored by `shape="square"`, which is the browser's own
   * `accent-primary` box. Default `info`.
   */
  tone?: ToneOrAlias;
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
      shape = 'square',
      tone = 'info',
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

    const setRef = (el: HTMLInputElement | null) => {
      innerRef.current = el;
      if (typeof forwardedRef === 'function') forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
    };

    const handleClick = (e: MouseEvent<HTMLInputElement>) => {
      modifiersRef.current = {
        shiftKey: e.shiftKey, metaKey: e.metaKey,
        ctrlKey: e.ctrlKey, altKey: e.altKey,
      };
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      modifiersRef.current = NO_MODIFIERS;
      onKeyDown?.(e);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.checked, modifiersRef.current);

    const shared = {
      type: 'checkbox' as const,
      id,
      name,
      checked,
      disabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-checked': (indeterminate ? 'mixed' : undefined) as 'mixed' | undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onChange: handleChange,
      'data-testid': testId,
    };

    if (shape === 'round') {
      const key = toneKey(tone);
      const filled = checked || indeterminate;
      return (
        // 18px, one size — and resizable without a prop: `className` lands
        // here, the paint inside is `h-full w-full`, and the mark is a
        // fraction of that, so `className="h-[22px] w-[22px]"` scales the
        // whole control. A numeric `size` prop would have to be an inline
        // style, which this library does not ship in new components.
        <span
          className={cn(
            'relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center align-middle',
            disabled && 'opacity-50',
            className,
          )}
        >
          <input
            {...shared}
            ref={setRef}
            className="peer absolute inset-0 m-0 h-full w-full cursor-pointer rounded-full opacity-0 disabled:cursor-not-allowed"
          />
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none flex h-full w-full items-center justify-center rounded-full border-2 p-0 text-white transition-colors',
              TONE_BORDER[key],
              filled ? TONE_SOLID_BG[key] : cn('bg-transparent', !disabled && ROUND_HOVER_FILL[key]),
              'peer-focus-visible:ring-2 peer-focus-visible:ring-info/40',
            )}
          >
            {indeterminate ? (
              <svg viewBox="0 0 10 2" className="w-1/2" aria-hidden="true">
                <line x1="1" y1="1" x2="9" y2="1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : checked ? (
              <svg viewBox="0 0 10 10" fill="none" className="h-1/2 w-1/2" aria-hidden="true">
                <polyline
                  points="2,5 4,7.5 8,2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </span>
        </span>
      );
    }

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
