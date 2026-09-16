import { useId } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type FormFieldLayout = 'stacked' | 'inline';

export interface FormFieldProps {
  label: string;
  /** Helper text shown under the control. */
  hint?: string;
  /** Error message; when present, replaces the hint and adds a danger border. */
  error?: string;
  /** Renders an asterisk after the label. Does NOT enforce validation. */
  required?: boolean;
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

  return (
    <div
      data-testid={testId}
      className={cn(
        layout === 'inline' ? 'flex items-center gap-3' : 'flex flex-col gap-1',
        className,
      )}
      style={style}
    >
      <label
        id={labelId}
        htmlFor={id}
        className={cn(
          'text-[12px] font-medium',
          layout === 'inline' ? 'min-w-[140px]' : '',
          error ? 'text-danger-fg' : 'text-text-primary',
          labelClassName,
        )}
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-danger-fg">*</span>
        )}
      </label>
      <div className={cn(layout === 'inline' ? 'flex-1' : '')}>
        {children(wiring)}
        {(hint || error) && (
          <div
            id={describedById}
            className={cn(
              'mt-1 text-[11px]',
              error ? 'text-danger-fg' : 'text-neutral',
            )}
          >
            {error ?? hint}
          </div>
        )}
      </div>
    </div>
  );
}
