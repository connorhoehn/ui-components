// src/components/shared/Prose.tsx
//
// Styles bare semantic markup — h1-h4, p, ul/ol/li, code, pre, a,
// blockquote — with the design tokens, for content that arrives as plain
// HTML-shaped JSX rather than pre-styled components: inline docs/help copy,
// a markdown-rendered blob. Before this, the pipelines "Docs" tab
// (docsContent.tsx) relied on a scoped `.pipeline-docs-pane` stylesheet rule
// (src/styles.css) with hardcoded hex colours (`#0f172a`, `#e2e8f0`, …) that
// never re-tone with the theme and covered four tags, not ten.
//
// Implemented as descendant-selector Tailwind classes (`[&_h1]:…`) on a
// wrapper, not `@tailwindcss/typography` (not a dependency here) and not a
// global stylesheet rule (couldn't vary by `size`/`tone` per call site, and
// every literal added to `styles.css` is one PRs must remember to grep for
// nowhere near the consumer). Every tone alternative below is a complete,
// literal class string (matching the `TONE_*` pattern in `./tones`) — the
// Tailwind scanner needs the whole class name present verbatim in source,
// so `` `[&_h1]:${x}` `` would silently emit no CSS.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { toneKey, type ToneOrAlias, type Tone } from './tones';

export type ProseSize = 'sm' | 'md';

export interface ProseProps {
  children: ReactNode;
  /**
   * `'sm'` for a dense side panel (a docs tab, inline help next to a form);
   * `'md'` for a standalone reading surface. Default `'md'`.
   */
  size?: ProseSize;
  /**
   * Tints headings and links with a semantic tone instead of the neutral
   * text tokens — a "what's new" callout, a deprecation notice. Body text
   * stays `text-text-primary` either way. Default: untinted (headings
   * `text-text-primary`, links `text-primary`).
   */
  tone?: ToneOrAlias;
  className?: string;
  'data-testid'?: string;
}

// Structural rules that don't vary by size or tone.
const BASE =
  'max-w-none text-text-primary ' +
  '[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 ' +
  '[&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-semibold ' +
  '[&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-border ' +
  '[&_h4]:pb-1 [&_h4]:border-b [&_h4]:border-border ' +
  '[&_p]:my-2 ' +
  '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 ' +
  '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 ' +
  '[&_li]:mb-1 [&_li]:last:mb-0 ' +
  '[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:my-2 [&_blockquote]:italic [&_blockquote]:text-text-secondary ' +
  '[&_code]:font-mono [&_code]:text-[0.85em] [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:bg-surface-inset ' +
  '[&_pre]:font-mono [&_pre]:text-xs [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface-inset [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre]:my-2 ' +
  // A `<code>` nested in `<pre>` shouldn't also get the inline-code chip —
  // `[&_pre_code]` is a more specific selector than `[&_code]` (an extra
  // element in the descendant chain), so this wins regardless of the order
  // Tailwind happens to emit the two rules in.
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:rounded-none [&_pre_code]:text-[inherit] ' +
  '[&_a]:underline-offset-2 [&_a:hover]:underline';

const SIZE: Record<ProseSize, string> = {
  sm:
    'text-[13px] leading-snug ' +
    '[&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-[13px] [&_h4]:text-[13px] ' +
    '[&_h1]:mt-3 [&_h2]:mt-3 [&_h3]:mt-2.5 [&_h4]:mt-2.5 ' +
    '[&_h1]:mb-1.5 [&_h2]:mb-1.5 [&_h3]:mb-1 [&_h4]:mb-1',
  md:
    'text-sm leading-relaxed ' +
    '[&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h4]:text-sm ' +
    '[&_h1]:mt-6 [&_h2]:mt-5 [&_h3]:mt-4 [&_h4]:mt-4 ' +
    '[&_h1]:mb-3 [&_h2]:mb-2 [&_h3]:mb-1.5 [&_h4]:mb-1.5',
};

// Mutually exclusive with HEADING_COLOR_TONE below — never emitted together
// for the same render. Both set `color` on the exact same selectors
// (`.prose-wrapper h1`, …), so co-emitting both would leave the winner to
// whichever rule Tailwind happens to write later in the stylesheet, not to
// which one this component "meant". Picking exactly one branch per render
// (see `Prose` below) sidesteps that entirely.
const HEADING_COLOR_NONE =
  '[&_h1]:text-text-primary [&_h2]:text-text-primary [&_h3]:text-text-primary [&_h4]:text-text-primary [&_a]:text-primary';

const HEADING_COLOR_TONE: Record<Tone, string> = {
  neutral: '[&_h1]:text-neutral-fg [&_h2]:text-neutral-fg [&_h3]:text-neutral-fg [&_h4]:text-neutral-fg [&_a]:text-neutral-fg',
  success: '[&_h1]:text-success-fg [&_h2]:text-success-fg [&_h3]:text-success-fg [&_h4]:text-success-fg [&_a]:text-success-fg',
  warning: '[&_h1]:text-warning-fg [&_h2]:text-warning-fg [&_h3]:text-warning-fg [&_h4]:text-warning-fg [&_a]:text-warning-fg',
  danger: '[&_h1]:text-danger-fg [&_h2]:text-danger-fg [&_h3]:text-danger-fg [&_h4]:text-danger-fg [&_a]:text-danger-fg',
  info: '[&_h1]:text-info-fg [&_h2]:text-info-fg [&_h3]:text-info-fg [&_h4]:text-info-fg [&_a]:text-info-fg',
  caution: '[&_h1]:text-caution-fg [&_h2]:text-caution-fg [&_h3]:text-caution-fg [&_h4]:text-caution-fg [&_a]:text-caution-fg',
  accent: '[&_h1]:text-accent-fg [&_h2]:text-accent-fg [&_h3]:text-accent-fg [&_h4]:text-accent-fg [&_a]:text-accent-fg',
};

export function Prose({
  children,
  size = 'md',
  tone,
  className,
  'data-testid': testId,
}: ProseProps) {
  const key = tone !== undefined ? toneKey(tone) : undefined;

  return (
    <div
      data-testid={testId}
      className={cn(
        BASE,
        SIZE[size],
        key ? HEADING_COLOR_TONE[key] : HEADING_COLOR_NONE,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Prose;
