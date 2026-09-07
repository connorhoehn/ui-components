// src/components/shared/SkipLink.tsx
//
// The first focusable thing on a page: a link that jumps past the navigation
// to the main content. Invisible until it takes focus.
//
// Any app with a persistent sidebar needs one. Without it a keyboard or
// screen-reader user pays for the whole nav list on every single route change
// before reaching the thing they navigated to — eleven tab stops per page in
// the app this was written for.
//
// Like VisuallyHidden, the hidden/visible swap is inline rather than a
// `:focus` utility class, because hosts that do not compile the library's
// Tailwind would otherwise render a permanently-visible link — or, worse,
// a permanently-hidden one that can never be reached.

import { useState, type CSSProperties, type ReactNode } from 'react';
import { VISUALLY_HIDDEN_STYLE } from './VisuallyHidden';

const VISIBLE_STYLE: CSSProperties = {
  position: 'fixed',
  top: '8px',
  left: '8px',
  zIndex: 1000,
  padding: '8px 14px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  background: 'var(--color-surface, #ffffff)',
  color: 'var(--color-text-primary, #0f172a)',
  border: '1px solid var(--color-border, #cbd5e1)',
  outline: '2px solid var(--color-primary, #6366f1)',
  outlineOffset: '2px',
};

export interface SkipLinkProps {
  /**
   * `id` of the element to jump to. That element needs `tabIndex={-1}` for
   * the jump to move focus (not just the viewport) in every browser.
   * @default 'main-content'
   */
  targetId?: string;
  children?: ReactNode;
  className?: string;
  /** Called after the jump — use it to focus the target explicitly. */
  onSkip?: () => void;
}

export default function SkipLink({
  targetId = 'main-content',
  children = 'Skip to main content',
  className,
  onSkip,
}: SkipLinkProps) {
  const [focused, setFocused] = useState(false);
  return (
    <a
      href={`#${targetId}`}
      className={className}
      style={focused ? VISIBLE_STYLE : VISUALLY_HIDDEN_STYLE}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => {
        // href alone scrolls but does not always move focus; do both.
        const target = document.getElementById(targetId);
        target?.focus();
        onSkip?.();
      }}
    >
      {children}
    </a>
  );
}
