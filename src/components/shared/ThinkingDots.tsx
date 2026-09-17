import { cn } from '../../lib/cn';

export interface ThinkingDotsProps {
  /** sm: 4px dots, md: 6px dots (default md). */
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Three dots breathing in sequence — "still going".
 *
 * The dots take `currentColor`, so the caller sets them with a text colour the
 * way every other glyph in this library works. There is no `color` prop: it
 * existed, took an arbitrary CSS string, and could only ever be applied as an
 * inline style — which is banned here, and which nothing was using.
 *
 * The keyframes live in `styles.css` with the rest of them. They were an inline
 * `<style>` injected by the component, so every indicator on screen put another
 * copy of the same rule in the DOM, and the CSS text turned up inside the
 * element's own `textContent` — which is how this was found: a typing indicator
 * read as "@keyframes thinkDot { … } Bob Martinez is typing…".
 */
export function ThinkingDots({ size = 'md', className }: ThinkingDotsProps) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)} data-testid="thinking-dots">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            'ui-thinking-dot inline-block rounded-full bg-current',
            size === 'sm' ? 'h-1 w-1' : 'h-1.5 w-1.5',
            // Staggered so they read as a wave rather than a pulse. Arbitrary
            // values, not inline style — the ban is on the attribute, not on
            // specific numbers.
            i === 1 && '[animation-delay:200ms]',
            i === 2 && '[animation-delay:400ms]',
          )}
        />
      ))}
    </span>
  );
}

export default ThinkingDots;
