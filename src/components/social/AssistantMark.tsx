// AssistantMark — the small square an assistant wears in a thread, where a
// person has their initials or photo. A glyph (the bot by default) on the
// accent tint, so every row an assistant wrote is recognisable before its
// text is read, and never mistaken for a person whose name happens to start
// with the same letter. Since 2.527.0.

import type { ReactNode } from 'react';
import { BotIcon } from '../ui/Icons';
import { cn } from '../../lib/cn';

export interface AssistantMarkProps {
  /** The glyph inside the square. Default: the bot glyph. */
  icon?: ReactNode;
  /** Edge length in px. Default 20, the chat row's avatar size. */
  size?: 16 | 20 | 24 | 32;
  /** Spoken name; omit when the author's name is printed beside the mark. */
  label?: string;
  className?: string;
}

const box: Record<NonNullable<AssistantMarkProps['size']>, string> = {
  16: 'h-4 w-4 rounded',
  20: 'h-5 w-5 rounded-md',
  24: 'h-6 w-6 rounded-md',
  32: 'h-8 w-8 rounded-lg',
};
const glyph: Record<NonNullable<AssistantMarkProps['size']>, number> = { 16: 12, 20: 14, 24: 16, 32: 18 };

export function AssistantMark({ icon, size = 20, label, className }: AssistantMarkProps) {
  return (
    <span
      data-testid="assistant-mark"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      className={cn('inline-grid shrink-0 place-items-center border border-accent-border bg-accent-bg text-accent-fg', box[size], className)}
    >
      {icon ?? <BotIcon size={glyph[size]} />}
    </span>
  );
}

export default AssistantMark;
