// src/components/ui/Stack.tsx
//
// The two layout primitives the library never had, and the reason consumer
// pages are full of inline styles.
//
// Every composite in here (Card, KPIGrid, Toolbar, DataTable) covers a *named*
// region of a page. Nothing covered the connective tissue between them — "put
// these three things in a row with a gap", "stack these four with breathing
// room" — so every page reached for `style={{ display: 'flex', gap: 8 }}`. In
// the aws-agentcore portal alone that single expression accounts for more
// inline-style sites than every other pattern combined. A page cannot be free
// of hand-rolled CSS while the most common layout in it has no component.
//
//   <Stack gap="md">          column, 12px gap
//   <Inline gap="sm" wrap>    row, 8px gap, wraps
//
// Gaps are a fixed scale, not free numbers. The point is that two pages laying
// out the same kind of thing land on the same spacing without coordinating —
// which is exactly what "12px here, 10px there, 14px over there" cost us.

import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** Spacing scale. Matches Tailwind's 4px base: xs=6, sm=8, md=12, lg=16, xl=24. */
export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StackAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between';

export interface StackProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode;
  /** Space between children. Default `md` (12px). */
  gap?: StackGap;
  /** Cross-axis alignment (`align-items`). */
  align?: StackAlign;
  /** Main-axis distribution (`justify-content`). */
  justify?: StackJustify;
  /** Allow children to wrap onto more lines. Default false for Stack, true for Inline. */
  wrap?: boolean;
  /** Render as something other than a `<div>` — `ul`, `section`, `label`, … */
  as?: ElementType;
}

// Written out in full so Tailwind's source scanner sees every class. A
// template literal (`gap-${n}`) produces no rule at all — the classic v4 trap.
const GAP: Record<StackGap, string> = {
  none: 'gap-0',
  xs: 'gap-1.5',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
};

const ALIGN: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

const JUSTIFY: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

function flexClasses(
  direction: 'col' | 'row',
  { gap = 'md', align, justify, wrap }: Pick<StackProps, 'gap' | 'align' | 'justify' | 'wrap'>,
): string {
  return cn(
    'flex',
    direction === 'col' ? 'flex-col' : 'flex-row',
    GAP[gap],
    align ? ALIGN[align] : undefined,
    justify ? JUSTIFY[justify] : undefined,
    wrap ? 'flex-wrap' : undefined,
  );
}

/** Vertical flex column with a scale gap. */
export function Stack({
  children, gap, align, justify, wrap = false, as: As = 'div', className, ...rest
}: StackProps) {
  return (
    <As className={cn(flexClasses('col', { gap, align, justify, wrap }), className)} {...rest}>
      {children}
    </As>
  );
}

/**
 * Horizontal flex row with a scale gap. Wraps by default — an un-wrapping row
 * of chips is how a toolbar overflows its container on a narrow window, and
 * every consumer that hand-rolled this wrote `flexWrap: 'wrap'` anyway.
 */
export function Inline({
  children, gap = 'sm', align = 'center', justify, wrap = true, as: As = 'div', className, ...rest
}: StackProps) {
  return (
    <As className={cn(flexClasses('row', { gap, align, justify, wrap }), className)} {...rest}>
      {children}
    </As>
  );
}
