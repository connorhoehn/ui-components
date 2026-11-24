// src/components/shared/TitleCard.tsx
//
// A show's title card: a full-width band where the picture fills a fixed
// frame and the title, an optional tagline and an optional small meta line
// are set ON it, bottom-left, over a dark scrim that keeps the white type
// readable on any picture in either theme. `actions` sit top-right.
// Type from the house scale only (20 / 14 / 12). Alignment is by flex
// justification, never auto margins. Since 2.545.0.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type TitleCardAspect = 'wide' | 'landscape' | 'banner';

export interface TitleCardProps {
  /** The show's (or episode's) title: 20px semibold. */
  title: ReactNode;
  /** One line under the title: 14px. */
  tagline?: ReactNode;
  /** A small line under the tagline ("6 episodes · Season 1"): 12px. */
  meta?: ReactNode;
  /** The picture that fills the band (`object-cover`). */
  image: { src: string; alt: string };
  /** The band's frame: `wide` 16:9 (default), `landscape` 4:3, `banner` 3:1. */
  aspect?: TitleCardAspect;
  /** Controls in the top-right corner (an Edit, a "…" menu). */
  actions?: ReactNode;
  /** The title's heading level. Default `h2`. */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  'data-testid'?: string;
}

const ASPECT: Record<TitleCardAspect, string> = {
  wide: 'aspect-video',
  landscape: 'aspect-[4/3]',
  banner: 'aspect-[3/1]',
};

/** A full-width band with the title set on its picture. */
export function TitleCard({
  title,
  tagline,
  meta,
  image,
  aspect = 'wide',
  actions,
  as: Heading = 'h2',
  className,
  'data-testid': testId = 'title-card',
}: TitleCardProps) {
  return (
    <section
      data-ui-part="title-card"
      data-aspect={aspect}
      data-testid={testId}
      className={cn('relative w-full overflow-hidden rounded-lg bg-surface-inset', ASPECT[aspect], className)}
    >
      <img src={image.src} alt={image.alt} draggable={false} className="absolute inset-0 block h-full w-full object-cover" data-testid={`${testId}-image`} />
      <div aria-hidden="true" data-title-card-scrim="" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      <div className={cn('absolute inset-0 flex flex-col p-4', actions ? 'justify-between' : 'justify-end')}>
        {actions && (
          <div className="flex justify-end gap-2" data-testid={`${testId}-actions`}>{actions}</div>
        )}
        <div className="flex min-w-0 flex-col items-start gap-1 text-white" data-testid={`${testId}-text`}>
          <Heading className="m-0 text-xl leading-7 font-semibold text-white">{title}</Heading>
          {tagline != null && tagline !== '' && <p className="m-0 text-sm leading-5 text-white/90" data-testid={`${testId}-tagline`}>{tagline}</p>}
          {meta != null && meta !== '' && <p className="m-0 text-xs leading-4 text-white/80" data-testid={`${testId}-meta`}>{meta}</p>}
        </div>
      </div>
    </section>
  );
}

export default TitleCard;
