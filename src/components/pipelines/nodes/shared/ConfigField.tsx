// frontend/src/components/pipelines/nodes/shared/ConfigField.tsx
//
// Labeled field wrapper with optional error and help text for node config panels.

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
        {required && <span className="text-[#dc2626] ml-1">●</span>}
      </label>
      <div className="mt-1">{children}</div>
      {error && <div className="text-[11px] text-[#dc2626] mt-0.5">{error}</div>}
      {!error && help && <div className="text-[11px] text-text-tertiary mt-0.5">{help}</div>}
    </div>
  );
}
