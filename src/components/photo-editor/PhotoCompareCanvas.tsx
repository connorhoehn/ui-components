// src/components/photo-editor/PhotoCompareCanvas.tsx
//
// The photo, before and after. Two layers of the same photo under one
// zoom / pan transform: the untouched original, and the op list rendered live
// by `AdjustedImageCanvas`, clipped at a draggable split with a round handle.
// "Original" and "Preview" badges name the sides; a centred toolbar holds the
// zoom (Fit ▾ | 100%) and the Before / After toggle. `layout="side-by-side"`
// shows the two in adjacent panes instead of a split.
//
// The stage is theme-invariant dark (`bg-video-stage`): a photo is judged on
// neutral grey, in either app theme. Geometry changes on every pointer move,
// so it lives in CSS custom properties set on the stage, not in React state.

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode, type WheelEvent } from 'react';
import { cn } from '../../lib/cn';
import { DropdownMenu } from '../shared/DropdownMenu';
import { ChevronIcon } from '../ui/Icons';
import { AdjustedImageCanvas } from './AdjustedImageCanvas';
import type { PhotoEditOp } from './model';

export type PhotoZoom = 'fit' | number;
export type PhotoCompareLayout = 'split' | 'side-by-side';

export interface PhotoCompareCanvasProps {
  /** The photo (a URL the browser can load; resolve auth before passing). */
  src: string | null | undefined;
  /** What the Preview side renders — the host's `proposed ?? ops`. */
  ops: readonly PhotoEditOp[];
  alt: string;
  /** Show Original and Preview (split or side by side). Off = the preview alone. Uncontrolled by default (on). */
  compare?: boolean;
  onCompareChange?: (compare: boolean) => void;
  layout?: PhotoCompareLayout;
  /** Where the split sits, 0..1 of the stage width. Uncontrolled by default (0.5). */
  split?: number;
  onSplitChange?: (split: number) => void;
  originalLabel?: string;
  previewLabel?: string;
  /** Anything the host floats over the stage (a composer's picker, a mask overlay). */
  overlay?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

const ZOOM_STEPS = [0.25, 0.5, 1, 2, 4];
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** A translucent chip that sits on the photo; dark in both themes, like the stage. */
const OVERLAY = 'rounded-lg bg-black/60 text-white shadow-sm backdrop-blur-sm';

function OverlayButton({ active, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'inline-flex h-8 cursor-pointer items-center gap-1.5 border-none bg-transparent px-3 text-[13px] font-medium text-white',
        'hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70',
        active && 'bg-white/15',
        className,
      )}
      {...rest}
    />
  );
}

/** One fitted frame: measures its pane and sizes the photo box to fit, then applies the shared zoom/pan. */
function FittedFrame({ natural, children }: { natural: { width: number; height: number } | null; children: ReactNode }) {
  const paneRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    const fit = () => {
      const { width, height } = pane.getBoundingClientRect();
      const ar = natural ? natural.width / natural.height : 3 / 2;
      const w = Math.min(width, height * ar);
      pane.style.setProperty('--frame-w', `${Math.round(w)}px`);
      pane.style.setProperty('--frame-h', `${Math.round(w / ar)}px`);
    };
    fit();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
    ro?.observe(pane);
    return () => ro?.disconnect();
  }, [natural]);
  return (
    <div ref={paneRef} className="absolute inset-0 overflow-hidden">
      <div
        className={cn(
          'absolute left-1/2 top-1/2 h-[var(--frame-h)] w-[var(--frame-w)] origin-center',
          '[transform:translate(-50%,-50%)_translate(var(--pan-x,0px),var(--pan-y,0px))_scale(var(--zoom,1))]',
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function PhotoCompareCanvas({
  src,
  ops,
  alt,
  compare: compareProp,
  onCompareChange,
  layout = 'split',
  split: splitProp,
  onSplitChange,
  originalLabel = 'Original',
  previewLabel = 'Preview',
  overlay,
  className,
  'data-testid': testId = 'photo-compare-canvas',
}: PhotoCompareCanvasProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [natural, setNatural] = useState<{ width: number; height: number } | null>(null);
  const [zoom, setZoom] = useState<PhotoZoom>('fit');
  const [splitState, setSplitState] = useState(0.5);
  const [compareState, setCompareState] = useState(true);
  const compare = compareProp ?? compareState;
  const toggleCompare = () => {
    if (compareProp === undefined) setCompareState(!compare);
    onCompareChange?.(!compare);
  };
  const split = splitProp ?? splitState;
  const pan = useRef({ x: 0, y: 0 });
  const drag = useRef<{ kind: 'split' | 'pan'; x: number; y: number; px: number; py: number } | null>(null);

  // Scale relative to the fitted frame. `fit` is 1; 100% is natural / fitted.
  const scaleFor = useCallback((z: PhotoZoom): number => {
    if (z === 'fit' || !natural) return 1;
    const stage = stageRef.current?.getBoundingClientRect();
    if (!stage) return 1;
    const paneW = layout === 'side-by-side' && compare ? stage.width / 2 : stage.width;
    const fittedW = Math.min(paneW, stage.height * (natural.width / natural.height));
    return (z * natural.width) / fittedW;
  }, [natural, layout, compare]);

  const setSplit = useCallback((v: number) => {
    const next = clamp(v, 0, 1);
    if (splitProp === undefined) setSplitState(next);
    onSplitChange?.(next);
  }, [splitProp, onSplitChange]);

  const applyVars = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty('--zoom', String(scaleFor(zoom)));
    el.style.setProperty('--pan-x', `${pan.current.x}px`);
    el.style.setProperty('--pan-y', `${pan.current.y}px`);
    el.style.setProperty('--split', `${(split * 100).toFixed(2)}%`);
  }, [scaleFor, zoom, split]);

  useLayoutEffect(applyVars, [applyVars]);
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(applyVars);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyVars]);

  const changeZoom = (z: PhotoZoom) => {
    if (z === 'fit') pan.current = { x: 0, y: 0 };
    setZoom(z);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>, kind: 'split' | 'pan') => {
    if (kind === 'pan' && zoom === 'fit') return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    e.stopPropagation();
    drag.current = { kind, x: e.clientX, y: e.clientY, px: pan.current.x, py: pan.current.y };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const stage = stageRef.current?.getBoundingClientRect();
    if (!d || !stage) return;
    if (d.kind === 'split') {
      setSplit((e.clientX - stage.left) / stage.width);
    } else {
      pan.current = { x: d.px + e.clientX - d.x, y: d.py + e.clientY - d.y };
      applyVars();
    }
  };
  const onPointerUp = () => { drag.current = null; };

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey) return;
    const cur = zoom === 'fit' ? (natural && stageRef.current ? 1 / scaleFor(1) : 1) : zoom;
    const next = clamp(cur * (e.deltaY < 0 ? 1.1 : 1 / 1.1), 0.1, 8);
    changeZoom(next);
  };

  const onHandleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); setSplit(split - 0.02); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setSplit(split + 0.02); }
    if (e.key === 'Home') { e.preventDefault(); setSplit(0); }
    if (e.key === 'End') { e.preventDefault(); setSplit(1); }
  };

  const zoomLabel = zoom === 'fit' ? '100%' : `${Math.round(zoom * 100)}%`;
  const original = src ? <img src={src} alt={`${alt} (original)`} draggable={false} className="block h-full w-full select-none" data-testid={`${testId}-original`} /> : null;
  const preview = <AdjustedImageCanvas src={src} ops={ops} alt={`${alt} (preview)`} onLoad={setNatural} data-testid={`${testId}-preview`} />;
  const sideBySide = compare && layout === 'side-by-side';

  return (
    <div
      ref={stageRef}
      data-testid={testId}
      data-zoom={zoom === 'fit' ? 'fit' : String(zoom)}
      data-compare={compare ? layout : 'off'}
      className={cn('relative min-h-0 min-w-0 select-none overflow-hidden rounded-md bg-video-stage', zoom !== 'fit' && 'cursor-grab active:cursor-grabbing', className)}
      onPointerDown={(e) => onPointerDown(e, 'pan')}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      {sideBySide ? (
        <div className="absolute inset-0 grid grid-cols-2 gap-1">
          <div className="relative min-w-0"><FittedFrame natural={natural}>{original}</FittedFrame></div>
          <div className="relative min-w-0"><FittedFrame natural={natural}>{preview}</FittedFrame></div>
        </div>
      ) : (
        <>
          {compare && <FittedFrame natural={natural}>{original}</FittedFrame>}
          <div className={cn('absolute inset-0', compare && '[clip-path:inset(0_0_0_var(--split))]')} data-testid={`${testId}-preview-layer`}>
            <FittedFrame natural={natural}>{preview}</FittedFrame>
          </div>
        </>
      )}

      {compare && !sideBySide && (
        <div
          className="pointer-events-none absolute inset-y-0 left-[var(--split)] w-0"
          data-testid={`${testId}-split`}
        >
          <div className="absolute inset-y-0 -left-px w-0.5 bg-white/85 shadow-[0_0_4px_rgba(0,0,0,0.5)]" />
          <div
            role="slider"
            tabIndex={0}
            aria-label="Before and after split"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(split * 100)}
            onPointerDown={(e) => onPointerDown(e, 'split')}
            onKeyDown={onHandleKey}
            data-testid={`${testId}-handle`}
            className={cn(
              'pointer-events-auto absolute left-0 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center',
              'rounded-full border-2 border-solid border-white bg-black/45 text-white shadow-md backdrop-blur-sm',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
            )}
          >
            <ChevronIcon dir="left" size={12} />
            <ChevronIcon dir="right" size={12} />
          </div>
        </div>
      )}

      {compare && (
        <span className={cn(OVERLAY, 'pointer-events-none absolute left-3 top-3 px-3 py-1.5 text-[13px] font-medium')} data-testid={`${testId}-badge-original`}>
          {originalLabel}
        </span>
      )}
      <span className={cn(OVERLAY, 'pointer-events-none absolute right-3 top-3 px-3 py-1.5 text-[13px] font-medium')} data-testid={`${testId}-badge-preview`}>
        {previewLabel}
      </span>

      <div
        className={cn(OVERLAY, 'absolute left-1/2 top-3 flex -translate-x-1/2 items-center divide-x divide-white/15 overflow-hidden')}
        data-testid={`${testId}-toolbar`}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <DropdownMenu
          trigger={<span className="inline-flex items-center gap-1.5">{zoom === 'fit' ? 'Fit' : 'Zoom'}<ChevronIcon size={12} /></span>}
          triggerLabel="Zoom"
          triggerClassName="h-8 rounded-none border-none bg-transparent px-3 text-[13px] font-medium text-white hover:bg-white/10"
          triggerTestId={`${testId}-zoom-menu`}
          sections={[{ items: [
            { label: 'Fit', active: zoom === 'fit', onSelect: () => changeZoom('fit') },
            ...ZOOM_STEPS.map((z) => ({ label: `${z * 100}%`, active: zoom === z, onSelect: () => changeZoom(z) })),
          ] }]}
        />
        <OverlayButton
          onClick={() => changeZoom(zoom === 'fit' ? 1 : 'fit')}
          active={zoom === 1}
          aria-label={zoom === 'fit' ? 'Zoom to 100%' : 'Fit to window'}
          data-testid={`${testId}-zoom-100`}
        >
          {zoomLabel}
        </OverlayButton>
        <OverlayButton
          onClick={toggleCompare}
          active={compare}
          data-testid={`${testId}-before-after`}
        >
          Before / After
        </OverlayButton>
      </div>

      {overlay}
    </div>
  );
}
