// DetailHeader — the top of a detail panel: what this thing is, its state, one
// line of prose about it, its metadata, and a slot for whatever the panel
// measures.
//
// `PageHeader` names a PAGE and `CardHeader` names a card in one line. Neither
// fits the shape every detail panel in these apps actually has: a title with a
// status chip beside it, an optional description paragraph, a dot-separated
// metadata line, and a right-hand region holding progress bars or a small
// action cluster. So each detail page rebuilt it — a flex row with
// justify-content, an h2 with `margin: 0` and a hard-coded font size, a
// paragraph with an inline max-width, and a metadata line hand-woven with
// `{' · '}` string literals.
//
// The right-hand `aside` is fixed-width and does not shrink: it holds gauges,
// and a gauge that reflows with the title is unreadable at both widths.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface DetailHeaderProps {
  title: ReactNode;
  /** Sits inline after the title — a status chip, a badge, a count. */
  badge?: ReactNode;
  /** One line of prose. Capped at a readable measure, not the panel width. */
  description?: ReactNode;
  /** The metadata line. Pass a `<MetaLine>`; anything is accepted. */
  meta?: ReactNode;
  /** Right-hand region — progress bars, a gauge, a small action cluster. */
  aside?: ReactNode;
  /** Width of the aside in px. Default 260. */
  asideWidth?: number;
  /** Heading level, so a panel nested under a page h1 does not claim h1. `h1` (since 2.504.0) when the header is the page's (`DetailPage`). */
  as?: 'h1' | 'h2' | 'h3';
  /**
   * The title's size (since 2.515.12). `panel` (default): 14px, a panel's
   * heading. `page`: 20px (`text-xl`, 28px line), the page-title size every
   * page template's header draws; `DetailPage` passes it.
   */
  titleSize?: 'panel' | 'page';
  className?: string;
  'data-testid'?: string;
}

export function DetailHeader({
  title,
  badge,
  description,
  meta,
  aside,
  asideWidth = 260,
  as: Heading = 'h2',
  titleSize = 'panel',
  className,
  'data-testid': testId,
}: DetailHeaderProps) {
  return (
    <div
      className={cn('flex flex-wrap items-start justify-between gap-3', className)}
      data-testid={testId}
    >
      {/* 4px between title, description and meta (since 2.515.12; was 6px). */}
      <div className="flex flex-col gap-1 min-w-0 flex-1" data-detail-header-stack="">
        <div className="flex flex-wrap items-center gap-2">
          <Heading className={cn('m-0 font-semibold text-text-primary', titleSize === 'page' ? 'text-xl leading-7' : 'text-sm')} data-title-size={titleSize}>
            {title}
          </Heading>
          {badge}
        </div>
        {description ? (
          <p className="m-0 max-w-[72ch] text-xs text-text-secondary">{description}</p>
        ) : null}
        {meta}
      </div>
      {aside ? (
        // A div, not <aside> (since 2.446.2): the readout is part of the
        // header, not a complementary landmark — and as an <aside> it picked
        // up host rules meant for side rails (the portal paints every shell
        // <aside> as a panel, so a sprint's progress sat in a grey box).
        // `asideWidth` is the preferred width; `max-w-full` caps it at the
        // header's own width once the row wraps (since 2.446.4), so a narrow
        // panel puts the readout under the title instead of past its edge.
        <div className="flex max-w-full flex-col gap-2 shrink-0" style={{ width: asideWidth }} data-detail-aside="">
          {aside}
        </div>
      ) : null}
    </div>
  );
}

export default DetailHeader;
