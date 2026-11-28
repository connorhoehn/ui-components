import { useId } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { cn } from '../../lib/cn';
import { FormFieldLabelContext } from './formFieldContext';

export type FormFieldLayout = 'stacked' | 'inline' | 'inline-start';

export interface FormFieldProps {
  label: string;
  /**
   * Helper text shown under the control. A plain string still works; also
   * accepts a `ReactNode` for a hint that needs a link or inline emphasis
   * (e.g. "See the docs" as an actual `<a>`) rather than plain text.
   */
  hint?: ReactNode;
  /** Error message; when present, replaces the hint and adds a danger border. */
  error?: string;
  /**
   * `data-testid` on the hint/error element. Omit to leave it untestable by
   * id, same as before this prop existed.
   */
  hintTestId?: string;
  /** Renders an asterisk after the label. Does NOT enforce validation. */
  required?: boolean;
  /**
   * `stacked` (default): label over the control. `inline`: label and hint,
   * then the control at the row's end — a settings switch. `inline-start`
   * (since 2.549.0): the control first, then its label and hint right beside
   * it — a checkbox in a list of checks, which `inline` would put a screen
   * away from its words on a full-width row. The label is the native
   * `<label htmlFor>`, so clicking it toggles the control.
   */
  layout?: FormFieldLayout;
  /**
   * Pass-through render. The function receives an `id` and the wiring
   * (`aria-describedby` / `aria-invalid`) you should spread onto the input
   * so the label associates correctly:
   *
   *   <FormField label="Name">
   *     {(p) => <input {...p} value={...} onChange={...} />}
   *   </FormField>
   *
   * For controls that take an explicit `id` prop (Switch's `aria-labelledby`),
   * `wiring.labelId` exposes the label's id.
   */
  children: (wiring: {
    id: string;
    labelId: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
  }) => ReactNode;
  className?: string;
  /**
   * Overrides the label's typography. Exists so surfaces with their own label
   * look — the uppercase filter-bar captions on the identity admin pages, for
   * instance — can adopt this component for its `htmlFor` / `aria-describedby`
   * wiring instead of hand-rolling a detached `<label>` that names nothing.
   * Merged over the defaults, so error colouring still applies unless you
   * override it.
   */
  labelClassName?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

/**
 * Labeled wrapper around an input control. Wires `<label htmlFor>` →
 * `<input id>`, plus `aria-describedby` for hints/errors and `aria-invalid`
 * for the error state. Use the render-prop API so we don't have to wrap
 * every kind of input the library ships.
 */
export default function FormField({
  label,
  hint,
  error,
  required = false,
  layout = 'stacked',
  children,
  className,
  labelClassName,
  style,
  hintTestId,
  'data-testid': testId,
}: FormFieldProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const describedById = (hint || error) ? `${id}-desc` : undefined;
  // `labelId` is not a DOM attribute, but the documented pattern is to spread
  // this whole bag onto a native control (`<Input {...p} .../>`) — so a plain
  // enumerable field here reaches the DOM and React warns "does not
  // recognize the `labelId` prop" on every page load. Defining it as
  // non-enumerable keeps `wiring.labelId` (and the type below, which still
  // lists it) working for a consumer that reads it directly for
  // `aria-labelledby` — Switch and other non-`htmlFor` controls need exactly
  // that — while `{...wiring}` (spread/`Object.assign`/`Object.keys` all
  // honour enumerability) quietly drops it before it ever reaches a `<input>`.
  const wiring = {
    id,
    'aria-describedby': describedById,
    'aria-invalid': error ? true : undefined,
    // The asterisk after the label is decorative (aria-hidden below), so
    // `required` needs its own programmatic exposure or the requirement is
    // invisible to screen readers.
    'aria-required': required || undefined,
  } as {
    id: string;
    labelId: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
  };
  Object.defineProperty(wiring, 'labelId', {
    value: labelId,
    enumerable: false,
  });

  // `inline` is, in every place it is used, a switch with something to explain:
  // the label says what the setting is and the hint says what turning it on
  // costs. Laid out as one flex row that was label → control → hint, which put
  // the sentence on the far side of the switch from the words it explains —
  // "Record my DM calls  [switch]  Both people must turn this on" reads as
  // three unrelated fragments. The label and its hint are one block now, and
  // the control goes to the end of the row, which is where a settings toggle
  // lives everywhere else.
  const label_ = (
    <label
      id={labelId}
      htmlFor={id}
      className={cn(
        'text-[12px] font-medium',
        error ? 'text-danger-fg' : 'text-text-primary',
        labelClassName,
      )}
    >
      {label}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-danger-fg">*</span>
      )}
    </label>
  );
  const hint_ = (hint || error) ? (
    <div
      id={describedById}
      data-testid={hintTestId}
      // 12/400 meta (2.445.0): the hint was 11px, off the app's type scale.
      className={cn('text-xs font-normal leading-4', error ? 'text-danger-fg' : 'text-neutral')}
    >
      {error ?? hint}
    </div>
  ) : null;

  if (layout === 'inline-start') {
    return (
      <div
        data-testid={testId}
        data-layout="inline-start"
        className={cn('flex items-start gap-2', className)}
        style={style}
      >
        {/* The control sits on the label's first line (12px text, 16px line). */}
        <span className="flex shrink-0 pt-px">
          <FormFieldLabelContext.Provider value={labelId}>{children(wiring)}</FormFieldLabelContext.Provider>
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          {label_}
          {hint_}
        </span>
      </div>
    );
  }

  if (layout === 'inline') {
    return (
      <div
        data-testid={testId}
        className={cn('flex items-center justify-between gap-4', className)}
        style={style}
      >
        {/* min-w-0 so a long hint wraps inside the block instead of pushing the
            control off the end of the row. */}
        <span className="flex min-w-0 flex-col gap-0.5">
          {label_}
          {hint_}
        </span>
        <span className="shrink-0"><FormFieldLabelContext.Provider value={labelId}>{children(wiring)}</FormFieldLabelContext.Provider></span>
      </div>
    );
  }

  return (
    <div
      data-testid={testId}
      className={cn('flex flex-col gap-1', className)}
      style={style}
    >
      {label_}
      <div>
        {/* A control `htmlFor` cannot name (RadioGroup) takes the label id from here. */}
        <FormFieldLabelContext.Provider value={labelId}>{children(wiring)}</FormFieldLabelContext.Provider>
        {hint_ && <div className="mt-1">{hint_}</div>}
      </div>
    </div>
  );
}
