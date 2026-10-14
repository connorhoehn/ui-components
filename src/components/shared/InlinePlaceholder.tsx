// InlinePlaceholder — "there is nothing here" for a region too small to say
// it with a card.
//
//   nothing matches “kube”
//   no computers to lab              + new computer
//
// `EmptyState` is a 220px-min-height centred block with 32px of padding. That
// is right for a page body and wrong for everywhere else: a rail section, the
// results list of a fuzzy finder, a quarter-window terminal pane. Drop an
// EmptyState into any of those and it either overflows the region or pushes
// the surrounding chrome off-screen — which is why four different files in
// compute/ (and more in pipelines/ and video/) each hand-rolled the same
// muted one-liner instead.
//
// So this is deliberately NOT a smaller EmptyState: no icon, no title/body
// split, no min-height, no guided-action list. One line of prose, optionally
// one control beside it. If you find yourself wanting a heading, the region
// is big enough for EmptyState.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { SurfaceTone } from './tones';

/** @see SurfaceTone — which colour family the placeholder paints in. */
export type InlinePlaceholderTone = SurfaceTone;

export interface InlinePlaceholderProps {
  /** The message. One short line — "nothing here", "no runs yet". */
  children: ReactNode;
  /**
   * Optional control beside the message, e.g. a `<Button size="sm">` that
   * creates the missing thing. Sits after the text, not below it.
   */
  action?: ReactNode;
  /**
   * `xs` (default) is the list/rail scale; `sm` is for a pane-sized region
   * where the line is the only thing on screen.
   */
  size?: 'xs' | 'sm';
  /**
   * `start` (default) reads as a list row, which is what a rail section or a
   * filtered result list wants. `center` is for a region the placeholder owns
   * outright — an empty pane.
   */
  align?: 'start' | 'center';
  tone?: InlinePlaceholderTone;
  className?: string;
  'data-testid'?: string;
}

const SIZE = {
  xs: 'text-[12px] gap-2',
  sm: 'text-[14px] gap-3',
} as const;

const ALIGN = {
  start: 'justify-start text-left',
  center: 'justify-center text-center',
} as const;

const TONE = {
  surface: 'text-text-tertiary',
  code: 'text-code-raised',
} as const;

export function InlinePlaceholder({
  children,
  action,
  size = 'xs',
  align = 'start',
  tone = 'surface',
  className,
  'data-testid': testId = 'inline-placeholder',
}: InlinePlaceholderProps) {
  return (
    <div
      data-testid={testId}
      // Not `role="status"`: a placeholder is the absence of content, not an
      // event. Announcing "nothing here" on every keystroke of a filter is
      // noise, and the list itself already carries the live region.
      className={cn(
        'flex items-center flex-wrap leading-normal',
        SIZE[size] ?? SIZE.xs,
        ALIGN[align] ?? ALIGN.start,
        TONE[tone] ?? TONE.surface,
        className,
      )}
    >
      <span>{children}</span>
      {action != null && <span className="shrink-0">{action}</span>}
    </div>
  );
}

export default InlinePlaceholder;
