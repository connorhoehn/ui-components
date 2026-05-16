import type { ReactNode } from 'react';
import { cn } from '../../../../lib/cn';

export interface NodeConfigShellProps {
  children: ReactNode;
  className?: string;
}

export default function NodeConfigShell({ children, className }: NodeConfigShellProps) {
  return (
    <div className={cn('flex flex-col gap-3 px-4 py-3', className)}>
      {children}
    </div>
  );
}
