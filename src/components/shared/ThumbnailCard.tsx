// ThumbnailCard — catalog/gallery card with hover lift, category chip, thumbnail.
//
// Designed for catalog landing pages (component galleries, demo catalogs,
// app launchers, integration grids). Hover lifts on shadow + small translate.
// Categories surface via tone-driven chip (primary/success/warning/danger/info/
// neutral) — keeps the card token-pure so consumers don't reach for inline
// styles to color one tile per category.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Chip, { type ChipTone } from './Chip';

export interface ThumbnailCardProps {
  /** Card title (required). */
  title: ReactNode;
  /** Short description. */
  description?: ReactNode;
  /** Optional category label. Shows as a Chip in the content area. */
  category?: ReactNode;
  /** Tone for the category chip. Default 'neutral'. */
  categoryTone?: ChipTone;
  /**
   * Optional thumbnail image URL. When omitted, an icon/emoji placeholder is
   * rendered against a tonal gradient background.
   */
  thumbnail?: string;
  /** Fallback glyph rendered when no thumbnail is provided. */
  icon?: ReactNode;
  /** Pixel height of the thumbnail strip. Default 160. */
  thumbnailHeight?: number;
  /** When provided, renders as an <a> wrapping the card. */
  href?: string;
  /** Optional click handler (renders as a button if no href). */
  onClick?: () => void;
  /** When provided, renders a small badge in the top-right of the thumbnail. */
  badge?: ReactNode;
  /** Optional render function for a custom right-side meta in the content. */
  meta?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

export function ThumbnailCard({
  title,
  description,
  category,
  categoryTone = 'neutral',
  thumbnail,
  icon = '🧩',
  thumbnailHeight = 160,
  href,
  onClick,
  badge,
  meta,
  className,
  style,
  'data-testid': testId = 'thumbnail-card',
}: ThumbnailCardProps) {
  const isInteractive = href || onClick;

  const shell = cn(
    'group block w-full text-left bg-[var(--color-surface,#fff)]',
    'rounded-xl border border-[var(--color-border)] overflow-hidden',
    'transition-[box-shadow,transform] duration-150',
    isInteractive &&
      'cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5',
    className,
  );

  const content = (
    <>
      <div
        data-testid={`${testId}-thumb`}
        className={cn(
          'relative flex items-center justify-center',
          'bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]',
          'border-b border-[var(--color-border)]',
        )}
        style={{ height: thumbnailHeight }}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-5xl opacity-50" aria-hidden>
            {icon}
          </span>
        )}
        {badge && (
          <span
            data-testid={`${testId}-badge`}
            className="absolute top-2 right-2"
          >
            {badge}
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          {category && (
            <Chip tone={categoryTone} size="xs" data-testid={`${testId}-category`}>
              {category}
            </Chip>
          )}
          {meta && <span className="ml-auto">{meta}</span>}
        </div>
        <div className="text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug">
          {title}
        </div>
        {description && (
          <div className="mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug">
            {description}
          </div>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        data-testid={testId}
        className={cn(shell, 'no-underline text-inherit')}
        style={style}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        data-testid={testId}
        className={cn(shell, 'font-inherit')}
        style={style}
      >
        {content}
      </button>
    );
  }

  return (
    <div data-testid={testId} className={shell} style={style}>
      {content}
    </div>
  );
}

export default ThumbnailCard;
