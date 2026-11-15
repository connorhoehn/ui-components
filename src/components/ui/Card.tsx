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
   * The surface the card sits on. `'default'`: the plain surface and border.
   * `'assistant'`: the accent-tinted surface an assistant's chat text sits on
   * (`MessageRow` `assistant`), so a card it posts reads in the same voice as
   * its replies. Both follow the theme. Since 2.527.0.
   */
  tone?: 'default' | 'assistant';
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
  tone = 'default',
  className,
  ref,
  ...rest
}: CardProps) {
  return (
    <div
      ref={ref}
      data-ui-card=""
      data-tone={tone === 'assistant' ? 'assistant' : undefined}
      className={cn(
        'border rounded-lg overflow-hidden',
        tone === 'assistant' ? 'border-accent/25 bg-accent/8' : 'border-border bg-surface',
        paddingClasses[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
