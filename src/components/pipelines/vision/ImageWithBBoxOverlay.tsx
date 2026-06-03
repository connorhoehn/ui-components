import { useCallback, useMemo, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
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

  // Reject degenerate dims to avoid NaN% via div-by-zero downstream.
  const dims = useMemo(() => {
    if (imageWidth && imageHeight && imageWidth > 0 && imageHeight > 0) {
      return { w: imageWidth, h: imageHeight };
    }
    if (naturalSize && naturalSize.w > 0 && naturalSize.h > 0) return naturalSize;
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
    // Clamp coordinates to the image frame; reject inverted or NaN bboxes.
    const x1 = Math.max(0, Math.min(bbox.x1, dims.w));
    const y1 = Math.max(0, Math.min(bbox.y1, dims.h));
    const x2 = Math.max(0, Math.min(bbox.x2, dims.w));
    const y2 = Math.max(0, Math.min(bbox.y2, dims.h));
    if (!Number.isFinite(x1) || !Number.isFinite(y1) || !Number.isFinite(x2) || !Number.isFinite(y2)) return null;
    if (x2 <= x1 || y2 <= y1) return null;
    const left = (x1 / dims.w) * 100;
    const top = (y1 / dims.h) * 100;
    const width = ((x2 - x1) / dims.w) * 100;
    const height = ((y2 - y1) / dims.h) * 100;
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
        aria-label={`${tone === 'people' ? 'Person' : 'Object'} bounding box: ${label}`}
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
          className={cn(
            'pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow',
            palette.text,
          )}
        >
          {label}
        </span>
      </button>
    );
  };

  if (!src) {
    return (
      <div
        className={cn(
          'flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-border-emphasis bg-surface-panel text-xs text-text-tertiary',
          className,
        )}
      >
        (no image)
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-lg border border-border bg-black/5',
        className,
      )}
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
