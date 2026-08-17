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
  }) => ReactNode;
  className?: string;
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
  style,
  'data-testid': testId,
}: FormFieldProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const describedById = (hint || error) ? `${id}-desc` : undefined;
  const wiring = {
    id,
    labelId,
    'aria-describedby': describedById,
    'aria-invalid': error ? true : undefined,
  };

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
          error ? 'text-[#991b1b]' : 'text-gray-700',
        )}
      >
        {label}{required && <span className="ml-0.5 text-[#991b1b]">*</span>}
      </label>
      <div className={cn(layout === 'inline' ? 'flex-1' : '')}>
        {children(wiring)}
        {(hint || error) && (
          <div
            id={describedById}
            className={cn(
              'mt-1 text-[11px]',
              error ? 'text-[#991b1b]' : 'text-neutral',
            )}
          >
            {error ?? hint}
          </div>
        )}
      </div>
    </div>
  );
}
