// src/components/image/GenerativeImagePreview.tsx
//
// "Image synthesizing" visual for generative pipeline nodes
// (NODE-VISUALS-AUDIT §3.2). Two states:
//
// - `synthesizing`: indeterminate shimmer canvas (existing skeleton-shimmer
//   keyframe) + a subtle diagonal gradient sweep + a "✦ synthesizing"
//   micro-label, with an optional ticking elapsed-time chip. Deliberately
//   NO progress bar — there is no progress signal on the wire.
// - `done`: the produced image. If the component just transitioned from
//   `synthesizing` on this mount, a blur-up reveal (blur(16px) → blur(0),
//   ~400ms) plays; mounting already-done renders the plain image.
//
// Reduced motion: static neutral block while synthesizing, instant cut on
// reveal.

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export type GenerativeImagePreviewStatus = 'synthesizing' | 'done';

export interface GenerativeImagePreviewProps {
  status: GenerativeImagePreviewStatus;
  /** Produced-image URL; rendered when status is 'done'. */
  src?: string;
  alt?: string;
  /** Epoch ms when synthesis started — enables the elapsed-time chip. */
  startedAt?: number;
  /** Caller controls size (width/height/aspect), like ImageThumbnail. */
  className?: string;
}

function formatElapsed(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function ElapsedChip({ startedAt }: { startedAt: number }) {
  const [elapsed, setElapsed] = useState(() =>
    Math.max(0, Math.floor((Date.now() - startedAt) / 1000)),
  );

  useEffect(() => {
    const tick = () => setElapsed(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  return (
    <span
      data-testid="generative-image-preview-elapsed"
      className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/90"
    >
      {formatElapsed(elapsed)}
    </span>
  );
}

export function GenerativeImagePreview({
  status,
  src,
  alt = '',
  startedAt,
  className,
}: GenerativeImagePreviewProps) {
  const reducedMotion = usePrefersReducedMotion();

  // Blur-up reveal: only when the status flips synthesizing → done during
  // this mount (mounting already-'done' skips the animation entirely).
  // Render-phase state adjustment per the React "derived state" pattern so
  // the very first 'done' frame paints blurred — an effect would flash the
  // sharp image for one frame.
  const prevStatusRef = useRef(status);
  const [revealing, setRevealing] = useState(false);
  if (prevStatusRef.current !== status) {
    prevStatusRef.current = status;
    if (status === 'done' && !reducedMotion) {
      setRevealing(true);
    }
  }

  // One frame after the blurred image commits, drop the blur class — the
  // CSS transition carries it to blur(0) over ~400ms.
  useEffect(() => {
    if (!revealing) return;
    const id = setTimeout(() => setRevealing(false), 30);
    return () => clearTimeout(id);
  }, [revealing]);

  return (
    <div
      data-testid="generative-image-preview"
      data-status={status}
      className={cn('relative overflow-hidden rounded-md bg-surface-hover', className)}
    >
      {status === 'synthesizing' ? (
        <>
          {/* Shimmer canvas (static neutral block under reduced motion) */}
          <div
            aria-hidden="true"
            data-testid="generative-image-preview-shimmer"
            className={cn(
              'absolute inset-0',
              reducedMotion
                ? 'bg-slate-200'
                : cn(
                    'bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100',
                    'bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]',
                  ),
            )}
          />
          {/* Subtle diagonal sweep riding the same keyframe, slower */}
          {!reducedMotion && (
            <div
              aria-hidden="true"
              data-testid="generative-image-preview-sweep"
              className={cn(
                'absolute inset-0',
                'bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)]',
                'bg-[length:400px_100%] bg-no-repeat',
                'animate-[skeleton-shimmer_2.4s_linear_infinite]',
              )}
            />
          )}
          {/* Indeterminate micro-label — no percent, no progress bar */}
          <span
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              'text-[11px] font-medium tracking-wide text-neutral select-none',
            )}
          >
            ✦ synthesizing
          </span>
          {startedAt !== undefined && <ElapsedChip startedAt={startedAt} />}
        </>
      ) : src ? (
        <img
          src={src}
          alt={alt}
          data-testid="generative-image-preview-img"
          className={cn(
            'h-full w-full object-cover',
            !reducedMotion && 'transition-[filter] duration-[400ms] ease-out',
            revealing ? 'blur-[16px]' : 'blur-0',
          )}
        />
      ) : (
        // 'done' without a src — keep the neutral block rather than a broken img.
        <div aria-hidden="true" className="absolute inset-0 bg-slate-200" />
      )}
    </div>
  );
}

export default GenerativeImagePreview;
