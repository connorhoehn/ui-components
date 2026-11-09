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
// A pane with no picture yet (`src` omitted, `placeholder` given — "No
// picture yet") draws the SAME frame (aspect, surface, rounding, caption)
// with the words centred, so a comparison keeps its shape before every image
// exists. It is not a button and the lightbox skips it. The frame says which
// it is: `data-gallery-status="placeholder"` (the 2.512.0 gallery
// convention), and every frame carries `data-image-fit="contain|cover"` so an
// audit can tell a review subject is shown whole (`image.whole-visible`).
//
// Tokens only: frames are `surface-inset`, captions use the text tokens, and
// the focus ring is the library's `ring-primary`.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ImageLightbox } from './ImageLightbox';
import { ImageIcon } from '../ui/Icons';

export interface ImageCompareImage {
  /** The picture. Omit it (with `placeholder`) for a pane whose image does not exist yet. */
  src?: string;
  /**
   * Words for a pane with no `src` — "No picture yet". The pane keeps the
   * same frame and caption, with these centred in it; it is not zoomable.
   * Since 2.513.0.
   */
  placeholder?: string;
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
  // Only panes with a picture open in the lightbox; map a pane to its slot there.
  const shown = panes.flatMap((p, i) => (p.src ? [i] : []));

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
          const hasPicture = !!image.src;
          const frame = (
            <span
              data-image-compare-frame
              data-image-fit={fit}
              {...(hasPicture ? {} : { 'data-gallery-status': 'placeholder' })}
              className={cn('block w-full overflow-hidden rounded-lg bg-surface-inset', ASPECT[aspect])}
            >
              {hasPicture ? (
                <img src={image.src} alt={image.alt ?? image.label} loading="lazy" draggable={false} className={imgClass} />
              ) : (
                <span
                  data-image-compare-placeholder=""
                  role="img"
                  aria-label={`${image.label}: ${image.placeholder ?? 'No image'}`}
                  className="flex h-full w-full flex-col items-center justify-center gap-1 px-3 text-center text-xs text-text-tertiary"
                >
                  <ImageIcon size={24} aria-hidden />
                  <span className="leading-tight">{image.placeholder ?? 'No image'}</span>
                </span>
              )}
            </span>
          );
          return (
            <li key={`${i}-${image.src ?? 'placeholder'}`} data-image-compare-pane={i} className="min-w-0">
              <figure className="m-0 flex flex-col gap-1.5">
                {zoomable && hasPicture ? (
                  <button
                    type="button"
                    aria-label={`Enlarge ${image.label}`}
                    onClick={() => setOpenIndex(shown.indexOf(i))}
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
      {zoomable && shown.length > 0 && (
        <ImageLightbox
          images={shown.map((i) => panes[i]).map((p) => ({ src: p.src!, alt: p.alt ?? p.label, caption: p.description ? `${p.label} · ${p.description}` : p.label }))}
          openIndex={openIndex}
          onNavigate={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}

export default ImageCompare;
