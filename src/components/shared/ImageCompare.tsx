// src/components/shared/ImageCompare.tsx
//
// Two or three images side by side for judging one against another — the
// original reference, the current version and a new candidate. Every pane
// gets the same frame (one aspect ratio, `object-contain` on the inset
// surface), so a portrait reference and a landscape render are compared at
// one height instead of whatever height each happens to be.
//
// Clicking a pane (or Enter/Space on it) opens ImageLightbox on that image
// with the others one arrow key away, which is the "flip between them at full
// size" comparison a side-by-side cannot give. Narrow containers stack the
// panes: the layout keys off the component's own width (container queries),
// not the viewport, because it usually sits in an inspector or a drawer.
//
// Tokens only: frames are `surface-inset`, captions use the text tokens, and
// the focus ring is the library's `ring-primary`.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ImageLightbox } from './ImageLightbox';

export interface ImageCompareImage {
  src: string;
  /** Short name shown under the pane — "Reference", "Current", "Candidate". */
  label: string;
  /** Alt text. Defaults to `label`. */
  alt?: string;
  /** A quieter line under the label — "v3 · 2 days ago". */
  description?: string;
  /** A node beside the label, usually a StatusPill ("Approved"). */
  meta?: ReactNode;
}

export type ImageCompareAspect = 'square' | 'landscape' | 'portrait' | 'wide';

export interface ImageCompareProps {
  /** Two or three images, in reading order. Extras past three are ignored. */
  images: readonly ImageCompareImage[];
  /** Accessible name for the group. Default "Image comparison". */
  label?: string;
  /**
   * The shared frame every pane uses, so heights match. `landscape` (4:3,
   * default), `square` (1:1), `portrait` (3:4), `wide` (16:9).
   */
  aspect?: ImageCompareAspect;
  /** `contain` (default) shows each whole image; `cover` fills the frame and crops. */
  fit?: 'contain' | 'cover';
  /** Open the lightbox on click/Enter. Default true. */
  zoomable?: boolean;
  className?: string;
  'data-testid'?: string;
}

const ASPECT: Record<ImageCompareAspect, string> = {
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-video',
};

export function ImageCompare({
  images,
  label = 'Image comparison',
  aspect = 'landscape',
  fit = 'contain',
  zoomable = true,
  className,
  'data-testid': testId,
}: ImageCompareProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panes = images.slice(0, 3);
  if (panes.length === 0) return null;

  const imgClass = cn('block h-full w-full', fit === 'cover' ? 'object-cover' : 'object-contain');

  return (
    <div className={cn('@container', className)} data-testid={testId}>
      <ul
        aria-label={label}
        data-ui-image-compare={panes.length}
        className={cn(
          'm-0 grid list-none grid-cols-1 gap-3 p-0',
          panes.length === 2 && '@md:grid-cols-2',
          panes.length >= 3 && '@md:grid-cols-2 @2xl:grid-cols-3',
        )}
      >
        {panes.map((image, i) => {
          const frame = (
            <span
              data-image-compare-frame
              className={cn('block w-full overflow-hidden rounded-lg bg-surface-inset', ASPECT[aspect])}
            >
              <img src={image.src} alt={image.alt ?? image.label} loading="lazy" draggable={false} className={imgClass} />
            </span>
          );
          return (
            <li key={`${i}-${image.src}`} data-image-compare-pane={i} className="min-w-0">
              <figure className="m-0 flex flex-col gap-1.5">
                {zoomable ? (
                  <button
                    type="button"
                    aria-label={`Enlarge ${image.label}`}
                    onClick={() => setOpenIndex(i)}
                    className="block w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {frame}
                  </button>
                ) : (
                  frame
                )}
                <figcaption className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex min-w-0 items-center gap-2">
                    <span data-image-compare-label className="truncate text-sm font-medium text-text-primary" title={image.label}>
                      {image.label}
                    </span>
                    {image.meta != null && image.meta !== false && <span className="shrink-0">{image.meta}</span>}
                  </span>
                  {image.description && (
                    <span className="truncate text-xs text-text-secondary" title={image.description}>
                      {image.description}
                    </span>
                  )}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
      {zoomable && (
        <ImageLightbox
          images={panes.map((p) => ({ src: p.src, alt: p.alt ?? p.label, caption: p.description ? `${p.label} · ${p.description}` : p.label }))}
          openIndex={openIndex}
          onNavigate={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}

export default ImageCompare;
