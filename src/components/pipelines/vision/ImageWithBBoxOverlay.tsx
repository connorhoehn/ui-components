import { useCallback, useMemo, useRef, useState } from 'react';
import type { VisionObject, VisionPerson, VisionResult } from './types';

export interface ImageWithBBoxOverlayProps {
  imageUrl?: string;
  imageDataUrl?: string;
  /** Pixel dimensions of the source image. Required for bbox scaling. If
   *  omitted, the component infers them from the natural image size on load. */
  imageWidth?: number;
  imageHeight?: number;
  people?: VisionPerson[];
  objects?: VisionObject[];
  /** Whether to render people, objects, or both. Default: both. */
  show?: 'people' | 'objects' | 'both';
  /** Called when the user clicks a person box. */
  onSelectPerson?: (person: VisionPerson) => void;
  /** Called when the user clicks an object box. */
  onSelectObject?: (object: VisionObject) => void;
  className?: string;
  alt?: string;
}

/**
 * Renders a source image with overlaid bounding boxes for detected people
 * (indigo) and objects (amber). Boxes scale with the rendered image size
 * via percentage-based positioning, so the component is responsive without
 * needing a canvas. Hovering a box surfaces the label tooltip.
 *
 * The image element is `object-contain` inside an aspect-ratio container so
 * boxes line up regardless of how the image is sized by the parent.
 */
export function ImageWithBBoxOverlay({
  imageUrl,
  imageDataUrl,
  imageWidth,
  imageHeight,
  people,
  objects,
  show = 'both',
  onSelectPerson,
  onSelectObject,
  className,
  alt,
}: ImageWithBBoxOverlayProps) {
  const src = imageDataUrl ?? imageUrl;
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onLoad = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    if (!imageWidth || !imageHeight) {
      setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
    }
  }, [imageWidth, imageHeight]);

  const dims = useMemo(() => {
    if (imageWidth && imageHeight) return { w: imageWidth, h: imageHeight };
    if (naturalSize) return naturalSize;
    return null;
  }, [imageWidth, imageHeight, naturalSize]);

  const renderBox = (
    bbox: { x1: number; y1: number; x2: number; y2: number },
    label: string,
    tone: 'people' | 'object',
    onClick?: () => void,
    key?: string,
  ) => {
    if (!dims) return null;
    const left = (bbox.x1 / dims.w) * 100;
    const top = (bbox.y1 / dims.h) * 100;
    const width = ((bbox.x2 - bbox.x1) / dims.w) * 100;
    const height = ((bbox.y2 - bbox.y1) / dims.h) * 100;
    const palette =
      tone === 'people'
        ? { stroke: '#4f46e5', fill: 'rgba(79,70,229,0.10)', text: 'bg-indigo-600 text-white' }
        : { stroke: '#d97706', fill: 'rgba(217,119,6,0.10)', text: 'bg-amber-600 text-white' };
    return (
      <button
        key={key}
        type="button"
        onClick={onClick}
        title={label}
        className="group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          background: palette.fill,
          border: `2px solid ${palette.stroke}`,
          borderRadius: '2px',
        }}
      >
        <span
          className={[
            'pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow',
            palette.text,
          ].join(' ')}
        >
          {label}
        </span>
      </button>
    );
  };

  if (!src) {
    return (
      <div
        className={[
          'flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-[var(--color-border,#cbd5e1)] bg-[var(--color-surface-muted,#f8fafc)] text-xs text-[var(--color-text-muted,#64748b)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        (no image)
      </div>
    );
  }

  return (
    <div
      className={[
        'relative w-full overflow-hidden rounded-md border border-[var(--color-border,#e2e8f0)] bg-black/5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt ?? ''}
        onLoad={onLoad}
        className="block h-auto w-full object-contain"
        draggable={false}
      />
      {dims ? (
        <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-auto absolute inset-0">
            {(show === 'people' || show === 'both') &&
              (people ?? []).map((p) =>
                renderBox(
                  p.bbox,
                  `#${p.index}${p.activity ? ' · ' + p.activity.replace(/^::\s*/, '') : ''}`,
                  'people',
                  onSelectPerson ? () => onSelectPerson(p) : undefined,
                  `p-${p.index}`,
                ),
              )}
            {(show === 'objects' || show === 'both') &&
              (objects ?? []).map((o, i) =>
                renderBox(
                  o.bbox,
                  o.label,
                  'object',
                  onSelectObject ? () => onSelectObject(o) : undefined,
                  `o-${i}-${o.label}`,
                ),
              )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ImageWithBBoxOverlay;

/** Convenience: pull all the bbox-related props out of a `VisionResult`. */
export function imageOverlayPropsFrom(result: VisionResult) {
  return {
    imageUrl: result.imageUrl,
    imageDataUrl: result.imageDataUrl,
    imageWidth: result.imageWidth,
    imageHeight: result.imageHeight,
    people: result.people,
    objects: result.objects,
  };
}
