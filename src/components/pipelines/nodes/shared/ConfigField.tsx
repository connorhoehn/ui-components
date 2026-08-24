// frontend/src/components/pipelines/nodes/shared/ConfigField.tsx
//
// Labeled field wrapper with optional error and help text for node config panels.
//
// The error is a live region. Panels used to hand-roll `role="alert"` on their
// own error divs; routing every field through this one means a validation
// message is announced no matter which panel raised it, instead of depending on
// whoever wrote that panel remembering.
//
// A11y note (deep audit): the `<label>` here has no `htmlFor` and does not
// wrap the control, so it labelled NOTHING — a node config input with no
// aria-label of its own announces as a bare "edit text" / "spin button".
//
// `children` is an arbitrary ReactNode (some fields render two controls, e.g.
// ForkConfig's slider + number box), so this component cannot hand out an id
// by itself. `controlId` + `describedById` are the opt-in wiring: set
// `controlId` here AND as the control's `id` and the association becomes
// explicit; spread `describedById` onto the control's `aria-describedby` to
// reach the help/error text. Migrating the ~117 call sites across the node
// panels is per-panel work tracked separately — do NOT add a blanket
// `role="group"` wrapper here instead: the ~40% of panels that already pass
// their own `aria-label` would then announce the same name twice.

import { useId, type ReactNode } from 'react';
import { cn } from '../../../../lib/cn';

export interface ConfigFieldProps {
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  /**
   * Id of the control this field labels. Set the same value as the control's
   * `id` and the `<label htmlFor>` association becomes explicit.
   */
  controlId?: string;
  /**
   * Render-prop escape hatch: receives the id of the help/error text so the
   * control can point `aria-describedby` at it. Use INSTEAD of `children`.
   */
  render?: (wiring: { describedById?: string; controlId?: string }) => ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function ConfigField({
  label,
  required,
  help,
  error,
  controlId,
  render,
  children,
  className,
}: ConfigFieldProps) {
  const uid = useId();
  const labelId = `${uid}-label`;
  const descriptionId = error || help ? `${uid}-desc` : undefined;

  return (
    <div className={cn('flex flex-col', className)}>
      <label id={labelId} htmlFor={controlId} className="text-xs font-semibold text-text-secondary">
        {label}
        {required && (
          <span className="text-danger-fg ml-1" aria-hidden="true">
            ●
          </span>
        )}
      </label>
      <div className="mt-1">
        {render ? render({ describedById: descriptionId, controlId }) : children}
      </div>
      {error && (
        <div id={descriptionId} role="alert" className="text-[11px] text-danger-fg mt-0.5">
          {error}
        </div>
      )}
      {!error && help && (
        <div id={descriptionId} className="text-[11px] text-text-tertiary mt-0.5">
          {help}
        </div>
      )}
    </div>
  );
}
