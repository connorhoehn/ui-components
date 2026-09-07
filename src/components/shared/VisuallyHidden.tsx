// src/components/shared/VisuallyHidden.tsx
//
// Content that is available to assistive technology but not painted.
//
// Why this is a component and not just `className="sr-only"`: the library is
// consumed by hosts that do NOT run Tailwind over their own bundle (the
// event-catalog admin is one — it imports `@ui/...` source directly and ships
// a hand-written stylesheet). In those hosts every utility class in the
// library is inert, so an `sr-only` label is not hidden, it is simply
// rendered — the exact opposite of the intent, and the failure is silent.
//
// The clip rectangle therefore ships as an inline style: it is the one style
// in the library that must survive a host with no CSS pipeline at all.

import type { CSSProperties, ElementType, ReactNode } from 'react';

/**
 * The canonical visually-hidden clip. Not `display: none` and not
 * `visibility: hidden` — both remove the node from the accessibility tree.
 */
export const VISUALLY_HIDDEN_STYLE: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
};

export interface VisuallyHiddenProps {
  /** Element to render. Defaults to `span`; use `div` inside block content. */
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  'data-testid'?: string;
}

/**
 * Renders `children` for screen readers only.
 *
 *   <VisuallyHidden>Sorted ascending</VisuallyHidden>
 */
export default function VisuallyHidden({
  as: Tag = 'span',
  children,
  className,
  id,
  'data-testid': testId,
}: VisuallyHiddenProps) {
  return (
    <Tag id={id} data-testid={testId} className={className} style={VISUALLY_HIDDEN_STYLE}>
      {children}
    </Tag>
  );
}
