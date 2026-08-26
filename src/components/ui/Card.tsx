// src/components/ui/Card.tsx
//
// Container component with border, radius, and background.

import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  padding?: CardPadding;
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  padding = 'none',
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'border border-border rounded-lg bg-surface overflow-hidden',
        paddingClasses[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
