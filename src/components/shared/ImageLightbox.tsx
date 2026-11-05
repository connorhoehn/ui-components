// src/components/shared/ImageLightbox.tsx
//
// Full-screen image overlay primitive. Dark backdrop, centered image,
// caption bar, "i / n" counter, prev/next navigation with wrap-around,
// keyboard support (Escape closes, ArrowLeft/ArrowRight navigate).
//
// Controlled-first: the parent owns `openIndex` and (optionally)
// `onNavigate`. When `onNavigate` is omitted the component falls back to
// internal navigation state so prev/next still work.
//
// Portal-rendered into document.body — same approach as Modal, so the
// backdrop escapes any ancestor stacking context. Modal itself isn't
// reused: its white card / focus-trap / footer chrome doesn't fit a
// full-bleed image overlay.

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';
import { trapTabKey } from '../../lib/focusTrap';
import { useOverlayLayer } from '../../lib/overlayStack';

export interface ImageLightboxImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface ImageLightboxProps {
  images: ImageLightboxImage[];
  /** Index of the open image, or null when the lightbox is closed. */
  openIndex: number | null;
  onClose: () => void;
  /**
   * Controlled navigation callback. When provided, prev/next/arrow-keys
   * call this and the parent is expected to update `openIndex`. When
   * omitted, the lightbox navigates with internal fallback state.
   */
  onNavigate?: (index: number) => void;
}

const navButtonCls = cn(
  'absolute top-1/2 -translate-y-1/2 flex items-center justify-center',
  'w-10 h-10 rounded-full bg-black/50 text-white text-xl leading-none',
  'hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80',
);

export function ImageLightbox({ images, openIndex, onClose, onNavigate }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Internal fallback index, only consulted when `onNavigate` is omitted.
  // Re-synced whenever the controlled prop changes.
  const [fallbackIndex, setFallbackIndex] = useState<number | null>(openIndex);
  useEffect(() => {
    setFallbackIndex(openIndex);
  }, [openIndex]);

  const isOpen = openIndex !== null && images.length > 0;
  // Escape/Tab/arrows belong to the top layer only. Without this the arrow
  // keys keep paging this lightbox while a dialog sits on top of it.
  const isTopLayer = useOverlayLayer(isOpen);
  const rawIndex = onNavigate ? openIndex : (fallbackIndex ?? openIndex);
  // Clamp defensively — a stale index past the end shouldn't blank the overlay.
  const index = rawIndex === null ? 0 : Math.min(Math.max(rawIndex, 0), images.length - 1);

  const navigate = (delta: number) => {
    const n = images.length;
    if (n < 2) return;
    const next = (index + delta + n) % n; // wrap around
    if (onNavigate) onNavigate(next);
    else setFallbackIndex(next);
  };

  // Focus management: move focus onto the dialog on open, restore on close.
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocusedRef.current =
      (typeof document !== 'undefined' ? document.activeElement : null) as HTMLElement | null;
    dialogRef.current?.focus();
    return () => {
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === 'function' && document.contains(prev)) {
        prev.focus();
      }
      previouslyFocusedRef.current = null;
    };
  }, [isOpen]);

  // Keyboard: Escape closes, arrows navigate (with wrap), Tab stays inside.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (!isTopLayer()) return;
      if (e.key === 'Tab') {
        // Without this, Tab off the last nav button lands on whatever is
        // behind the (still fully opaque) overlay — invisible focus.
        trapTabKey(e, dialogRef.current);
      } else if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // `navigate` closes over index/images; re-bind when they change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index, images.length, onClose, onNavigate, isTopLayer]);

  if (!isOpen) return null;

  const image = images[index];
  const multi = images.length > 1;

  return createPortal(
    <div
      ref={dialogRef}
      data-testid="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.caption ?? image.alt ?? `Image ${index + 1} of ${images.length}`}
      tabIndex={-1}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 outline-none"
      onClick={onClose}
    >
      {/* Counter */}
      <div
        data-testid="image-lightbox-counter"
        className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white/90"
      >
        {index + 1} / {images.length}
      </div>

      {/* Close */}
      <button
        data-ui-part=""
        type="button"
        aria-label="Close"
        data-testid="image-lightbox-close"
        className={cn(
          'absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full',
          'bg-black/50 text-lg leading-none text-white hover:bg-black/70',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80',
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ✕
      </button>

      {/* Image + caption — clicks inside don't close */}
      <figure
        className="flex max-h-[85vh] max-w-[85vw] flex-col items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          data-testid="image-lightbox-img"
          src={image.src}
          alt={image.alt ?? ''}
          className="max-h-[85vh] max-w-[85vw] rounded-md object-contain"
        />
        {image.caption && (
          <figcaption
            data-testid="image-lightbox-caption"
            className="max-w-[85vw] truncate rounded bg-black/60 px-3 py-1 text-center text-xs text-white/90"
          >
            {image.caption}
          </figcaption>
        )}
      </figure>

      {multi && (
        <>
          <button
            data-ui-part=""
            type="button"
            aria-label="Previous image"
            data-testid="image-lightbox-prev"
            className={cn(navButtonCls, 'left-3')}
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          >
            ‹
          </button>
          <button
            data-ui-part=""
            type="button"
            aria-label="Next image"
            data-testid="image-lightbox-next"
            className={cn(navButtonCls, 'right-3')}
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
          >
            ›
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}

export default ImageLightbox;
