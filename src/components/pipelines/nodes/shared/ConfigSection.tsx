// frontend/src/components/pipelines/nodes/shared/ConfigSection.tsx
//
// Collapsible section wrapper for node config panels.

import { useState, type ReactNode } from 'react';
import { cn } from '../../../../lib/cn';

export interface ConfigSectionProps {
  title: string;
  defaultCollapsed?: boolean;
  children: ReactNode;
  className?: string;
}

export default function ConfigSection({ title, defaultCollapsed = false, children, className }: ConfigSectionProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className={cn('flex flex-col', className)}>
      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        className="flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs font-semibold text-text-secondary"
      >
        <span>{collapsed ? '▸' : '▾'}</span> {title}
      </button>
      {!collapsed && (
        <div className="flex flex-col gap-3 mt-2">
          {children}
        </div>
      )}
    </div>
  );
}
