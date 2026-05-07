import React from 'react';

export interface StepSectionProps {
  title: string;
  children: React.ReactNode;
}

export function StepSection({ title, children }: StepSectionProps) {
  return (
    <div className="px-4 py-2.5 border-t border-border">
      <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5">
        {title}
      </div>
      {children}
    </div>
  );
}
