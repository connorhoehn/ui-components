import { cn } from '../../lib/cn';

export interface ThinkingDotsProps {
  /** sm: 4px dots, md: 6px dots (default md) */
  size?: 'sm' | 'md';
  /** dot color, default var(--color-text-tertiary) */
  color?: string;
  className?: string;
}

/**
 * Animated 3-dot typing/thinking indicator.
 *
 * Uses inline `<style>` for keyframes to avoid global CSS dependency.
 */
export function ThinkingDots({ size = 'md', color, className }: ThinkingDotsProps) {
  const dotSize = size === 'sm' ? 4 : 6;
  const dotColor = color || 'var(--color-text-tertiary, #94a3b8)';

  return (
    <>
      <style>{`
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
      <span className={cn('inline-flex items-center gap-1', className)}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              background: dotColor,
              display: 'inline-block',
              animation: `thinkDot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </span>
    </>
  );
}
