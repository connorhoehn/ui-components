// src/components/photo-editor/AdjustedImageCanvas.tsx
//
// A photo with an op list applied, live. WebGL2 when the browser has it (one
// texture upload per photo, one draw per op change); otherwise the photo as an
// <img> under CSS filters, which is exact for the pipeline's five kinds and an
// approximation for the Light / Color ones. Fills its box; the parent sizes it.

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { createAdjustRenderer, cssFilterFor, type AdjustRenderer } from './adjustRenderer';
import { paramsFromOps, type PhotoEditOp } from './model';

export interface AdjustedImageCanvasProps {
  src: string | null | undefined;
  ops: readonly PhotoEditOp[];
  alt: string;
  className?: string;
  /** Fires once the photo has decoded, with its natural size. */
  onLoad?: (size: { width: number; height: number }) => void;
  'data-testid'?: string;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith('blob:') && !src.startsWith('data:')) img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('photo-editor: image failed to load'));
    img.src = src;
  });
}

export function AdjustedImageCanvas({ src, ops, alt, className, onLoad, 'data-testid': testId = 'adjusted-image-canvas' }: AdjustedImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rendererRef = useRef<AdjustRenderer | null>(null);
  const [mode, setMode] = useState<'gl' | 'css' | 'pending'>('pending');
  const params = useMemo(() => paramsFromOps(ops), [ops]);
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;

  // Photo → texture. A new src re-uploads; nothing else does.
  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    void loadImage(src).then((img) => {
      if (cancelled) return;
      onLoadRef.current?.({ width: img.naturalWidth, height: img.naturalHeight });
      const canvas = canvasRef.current;
      if (canvas && !rendererRef.current) rendererRef.current = createAdjustRenderer(canvas);
      const r = rendererRef.current;
      if (!r) { setMode('css'); return; }
      try {
        r.setImage(img);
        setMode('gl');
      } catch {
        // A cross-origin photo without CORS taints the texture.
        setMode('css');
      }
    }).catch(() => { if (!cancelled) setMode('css'); });
    return () => { cancelled = true; };
  }, [src]);

  useEffect(() => () => { rendererRef.current?.dispose(); rendererRef.current = null; }, []);

  // Ops → one draw (GL) or one filter string (CSS). Blur is always a CSS filter.
  useEffect(() => {
    if (mode === 'gl') {
      rendererRef.current?.render(params);
      if (canvasRef.current) canvasRef.current.style.filter = params.blurPx > 0 ? `blur(${params.blurPx}px)` : '';
    } else if (mode === 'css' && imgRef.current) {
      imgRef.current.style.filter = cssFilterFor(params);
    }
  }, [mode, params]);

  return (
    <>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        data-testid={testId}
        data-render-mode={mode}
        className={cn('block h-full w-full', mode === 'css' && 'hidden', className)}
      />
      {mode === 'css' && src && (
        <img ref={imgRef} src={src} alt={alt} draggable={false} data-testid={`${testId}-fallback`} className={cn('block h-full w-full', className)} />
      )}
    </>
  );
}
