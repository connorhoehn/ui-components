// src/components/ui/Card.tsx
//
// Container component with border, radius, and background.

import { type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { cn } from '../../lib/cn';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  padding?: CardPadding;
  /**
   * The underlying `<div>`. A plain prop, not `forwardRef` — see the note on
   * `StackProps.ref`; React 19 passes `ref` through as an ordinary prop and
   * this card is not polymorphic, so the type is exact.
   */
  ref?: Ref<HTMLDivElement>;
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
  ref,
  ...rest
}: CardProps) {
  return (
    <div
      ref={ref}
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
