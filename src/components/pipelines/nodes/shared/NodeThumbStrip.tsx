// src/components/pipelines/nodes/shared/NodeThumbStrip.tsx
//
// Compact result-image strip for node bodies (cards are 200px wide).
// Renders up to `max` square ~38px thumbs in a tight row; when there are
// more images, the last tile becomes a "+N" overflow tile. Clicking any
// tile (including "+N") opens the shared ImageLightbox over ALL images,
// starting at the clicked index.
//
// Pure render from props — parents re-render as step events land, so arms
// completing out of order just pop in. No internal caching.

import { useState } from 'react';
import { cn } from '../../../../lib/cn';
import { useImageUrl } from '../../services';
import { ImageLightbox } from '../../../shared/ImageLightbox';

export interface NodeThumbStripImage {
  imageId: string;
  alt?: string;
}

export interface NodeThumbStripProps {
  images: NodeThumbStripImage[];
  /** Maximum tiles in the row (including the "+N" tile). Default 4. */
  max?: number;
  'data-testid'?: string;
}

// React Flow selects/drag-starts nodes on mousedown — every interactive
// element inside a node body must stop propagation on both mousedown and
// click so tapping a thumb doesn't select or drag the node.
const stopMouseDown = (e: React.MouseEvent) => e.stopPropagation();

const tileCls = cn(
  'h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset',
  'p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info',
);

export function NodeThumbStrip({
  images,
  max = 4,
  'data-testid': testId = 'node-thumb-strip',
}: NodeThumbStripProps) {
  const getImageUrl = useImageUrl();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const hasOverflow = images.length > max;
  const visible = hasOverflow ? images.slice(0, max - 1) : images;
  const overflowCount = images.length - visible.length;

  const openAt = (index: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenIndex(index);
  };

  return (
    <>
      <div data-testid={testId} className="flex flex-row items-center gap-1">
        {visible.map((img, i) => (
          <button
            data-ui-part=""
            key={`${img.imageId}-${i}`}
            type="button"
            data-testid={`${testId}-thumb-${i}`}
            aria-label={img.alt ?? `Result image ${i + 1} of ${images.length}`}
            className={tileCls}
            onMouseDown={stopMouseDown}
            onClick={openAt(i)}
          >
            <img
              src={getImageUrl(img.imageId)}
              alt={img.alt ?? ''}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
        {hasOverflow && (
          <button
            data-ui-part=""
            type="button"
            data-testid={`${testId}-overflow`}
            aria-label={`Show all ${images.length} images`}
            className={cn(
              tileCls,
              'flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary',
            )}
            onMouseDown={stopMouseDown}
            onClick={openAt(visible.length)}
          >
            +{overflowCount}
          </button>
        )}
      </div>

      <ImageLightbox
        images={images.map((img) => ({
          src: getImageUrl(img.imageId),
          alt: img.alt,
          caption: img.alt,
        }))}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}

export default NodeThumbStrip;
