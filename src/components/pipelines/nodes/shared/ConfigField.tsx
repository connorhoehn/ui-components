// frontend/src/components/pipelines/nodes/shared/ConfigField.tsx
//
// Labeled field wrapper with optional error and help text for node config panels.
//
// The error is a live region. Panels used to hand-roll `role="alert"` on their
// own error divs; routing every field through this one means a validation
// message is announced no matter which panel raised it, instead of depending on
// whoever wrote that panel remembering.

import type { ReactNode } from 'react';
import { cn } from '../../../../lib/cn';

export interface ConfigFieldProps {
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export default function ConfigField({ label, required, help, error, children, className }: ConfigFieldProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <label className="text-xs font-semibold text-text-secondary">
        {label}
        {required && (
          <span className="text-danger-fg ml-1" aria-hidden="true">
            ●
          </span>
        )}
      </label>
      <div className="mt-1">{children}</div>
      {error && (
        <div role="alert" className="text-[11px] text-danger-fg mt-0.5">
          {error}
        </div>
      )}
      {!error && help && <div className="text-[11px] text-text-tertiary mt-0.5">{help}</div>}
    </div>
  );
}
