// src/components/shared/TypingIndicator.tsx
//
// Animated "X is typing…" banner. Extracted from the inline patterns in
// ChatPanel + PresencePanel so any surface (chat thread, comment reply,
// presence chip, live doc cursor) can render the same affordance.

import { cn } from '../../lib/cn';
import { ThinkingDots } from './ThinkingDots';

export interface TypingIndicatorProps {
  /**
   * Names currently typing. Empty array → renders nothing (component returns null
   * so callers don't have to wrap it in a conditional).
   */
  names: string[];
  /** Render only the animated dots, with no banner text. Default: false. */
  compact?: boolean;
  /** Dot size (passes through to ThinkingDots). Default 'sm'. */
  size?: 'sm' | 'md';
  className?: string;
  'data-testid'?: string;
}

/** Formats a list of typing user names. Trims to a max of 2 explicit names + "+N others". */
export function formatTypingBanner(names: string[]): string {
  if (names.length === 0) return '';
  if (names.length === 1) return `${names[0]} is typing…`;
  if (names.length === 2) return `${names[0]} and ${names[1]} are typing…`;
  const others = names.length - 2;
  return `${names[0]}, ${names[1]} and ${others} other${others > 1 ? 's' : ''} are typing…`;
}

export function TypingIndicator({
  names,
  compact = false,
  size = 'sm',
  className,
  'data-testid': testId = 'typing-indicator',
}: TypingIndicatorProps) {
  if (names.length === 0) return null;

  return (
    <span
      role="status"
      aria-live="polite"
      data-testid={testId}
      className={cn(
        'inline-flex items-center gap-1.5 text-[12px] text-text-tertiary',
        className,
      )}
    >
      {/* The dots take currentColor, which this span already sets — so they
          match the words beside them without a second source of truth. */}
      <ThinkingDots size={size} />
      {!compact && <span>{formatTypingBanner(names)}</span>}
    </span>
  );
}

export default TypingIndicator;
