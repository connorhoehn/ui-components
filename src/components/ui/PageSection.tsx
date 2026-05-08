// src/components/ui/PageSection.tsx
//
// Page-level section with title, optional description, and header actions.

import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface PageSectionProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PageSection({
  title,
  description,
  actions,
  children,
  className,
}: PageSectionProps) {
  return (
    <section className={cn('flex flex-col gap-6', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 m-0">{title}</h1>
          {description && (
            <p className="text-sm text-slate-500 mt-1 mb-0">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
      {children}
    </section>
  );
}
