// ExpandableCallWidget — three-mode floating call widget that fills the
// gap between the current fixed-size <CallWidget> and a full-screen
// stage. Modes:
//
//   - 'mini'       320×180 corner-snapped floating tile (Slack-huddle UX)
//   - 'docked'     resizable+draggable mid window (Teams-pop-out UX)
//   - 'fullscreen' viewport-filling stage using the browser Fullscreen API
//
// The widget renders a SINGLE root container whose className/style
// morphs with mode. The `children` subtree (typically a
// <HangoutLayout fillParent>) is never unmounted between modes — this
// preserves <video> elements + their srcObject bindings so swapping
// modes does NOT cause WebRTC renegotiation or autoplay regrants.
//
// State persistence (mode + position + size) lives in
// useCallWidgetPersistence. fullscreen is never persisted (browsers
// refuse auto-fullscreen without a gesture).

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { cn } from '../../lib/cn';
import {
  useCallWidgetPersistence,
  type PersistedWidgetMode,
} from './useCallWidgetPersistence';

export type CallWidgetMode = PersistedWidgetMode | 'fullscreen';

export interface ExpandableCallWidgetHandle {
  mode: CallWidgetMode;
  setMode: (m: CallWidgetMode) => void;
}

export interface ExpandableCallWidgetProps {
  /** Header label (left side of chrome). */
  title?: ReactNode;
  /** Optional status line shown under the title (e.g. "0:36 • 3 in call"). */
  subtitle?: ReactNode;
  /** Body — typically `<HangoutLayout fillParent participants={…}/>`. */
  children: ReactNode;
  /** Optional controls strip rendered below the body. Stays inside the
   *  widget chrome in mini mode (compact); spans full width in docked
   *  and fullscreen modes. */
  controls?: ReactNode;
  /** Initial mode. Persisted modes override this once `persistKey` is
   *  set and storage has a prior value. Default: 'mini'. */
  defaultMode?: PersistedWidgetMode;
  /** Fires after every settled mode change (programmatic or via UI). */
  onModeChange?: (mode: CallWidgetMode) => void;
  /** localStorage key for `{mode,x,y,width,height}`. Omit to opt out
   *  (state lives only in memory). */
  persistKey?: string;
  /** Imperative handle — `apiRef.current.setMode('fullscreen')`. */
  apiRef?: Ref<ExpandableCallWidgetHandle>;
  /** Initial corner-snap for mini mode (only used if no persisted
   *  position exists). Default 'bottom-right'. */
  defaultCorner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Hide the expand affordances (useful for read-only viewers). */
  expandable?: boolean;
  /** z-index for the floating modes. Default 9999. */
  zIndex?: number;
  /** Class on the root. */
  className?: string;
}

const MINI_WIDTH = 320;
const MINI_HEIGHT = 200;
const DOCKED_MIN_WIDTH = 640;
const DOCKED_MIN_HEIGHT = 400;
const DOCKED_MAX_WIDTH = 1440;
const DOCKED_MAX_HEIGHT = 900;
const DOCKED_DEFAULT_WIDTH = 960;
const DOCKED_DEFAULT_HEIGHT = 600;
const VIEWPORT_MARGIN = 8;
const HEADER_HEIGHT = 32;

export function ExpandableCallWidget({
  title,
  subtitle,
  children,
  controls,
  defaultMode = 'mini',
  onModeChange,
  persistKey,
  apiRef,
  defaultCorner = 'bottom-right',
  expandable = true,
  zIndex = 9999,
  className,
}: ExpandableCallWidgetProps) {
  // Resolve initial position from defaultMode + defaultCorner — mini
  // mode snaps to a corner, docked mode centers on the viewport
  // (using the docked default dimensions, not the mini ones — otherwise
  // a docked widget initialized with mini-mode coords would render
  // partially off-screen on first mount).
  const initialPos = useMemo(() => {
    if (defaultMode === 'docked') {
      return centerPosition(DOCKED_DEFAULT_WIDTH, DOCKED_DEFAULT_HEIGHT);
    }
    return cornerPosition(defaultCorner);
  }, [defaultMode, defaultCorner]);

  const { state, setState } = useCallWidgetPersistence({
    persistKey,
    defaults: {
      mode: defaultMode,
      x: initialPos.x,
      y: initialPos.y,
      width: DOCKED_DEFAULT_WIDTH,
      height: DOCKED_DEFAULT_HEIGHT,
    },
  });

  // Fullscreen is not persisted — it's a transient runtime state on
  // top of the persisted mini/docked mode.
  const [fsActive, setFsActive] = useState(false);
  const effectiveMode: CallWidgetMode = fsActive ? 'fullscreen' : state.mode;

  const rootRef = useRef<HTMLDivElement | null>(null);

  // requestFullscreen on the widget root (NOT documentElement) so the
  // rest of the app remains addressable on exit. Distinguish
  // programmatic exit from Esc / browser-chrome exit via a ref —
  // browser-chrome exit returns to docked (Slack convention).
  const programmaticExitRef = useRef(false);
  useEffect(() => {
    const onChange = () => {
      const fsEl = document.fullscreenElement ?? (document as any).webkitFullscreenElement;
      const inFs = fsEl === rootRef.current;
      if (!inFs && fsActive) {
        // User-driven exit (Esc / chrome). If they were programmatic,
        // honor the requested target; otherwise default to docked.
        setFsActive(false);
        if (!programmaticExitRef.current) {
          setState({ mode: 'docked' });
        }
        programmaticExitRef.current = false;
      }
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, [fsActive, setState]);

  const enterFullscreen = useCallback(() => {
    const el = rootRef.current;
    const requestFs = el?.requestFullscreen ?? (el as any)?.webkitRequestFullscreen?.bind(el);
    if (!el || !requestFs) return;
    requestFs().then(
      () => setFsActive(true),
      () => { /* browser denied — stay in current mode */ },
    );
  }, []);

  const exitFullscreen = useCallback(() => {
    const fsEl = document.fullscreenElement ?? (document as any).webkitFullscreenElement;
    if (!fsEl) return;
    programmaticExitRef.current = true;
    const exitFs = document.exitFullscreen?.bind(document) ?? (document as any).webkitExitFullscreen?.bind(document);
    void exitFs?.().catch(() => { /* */ });
  }, []);

  const setMode = useCallback((next: CallWidgetMode) => {
    if (next === effectiveMode) return;
    if (next === 'fullscreen') {
      enterFullscreen();
      return;
    }
    if (effectiveMode === 'fullscreen') {
      exitFullscreen();
      // The fullscreenchange handler will set state.mode to 'docked'
      // unless the caller's target was explicit; honor explicit target.
      setState({ mode: next });
      return;
    }
    // Crossing a mode boundary where the widget size changes — re-pick
    // a position appropriate to the new size, otherwise we render
    // partially off-screen (mini → docked: 320 corner-snap coords don't
    // work for a 960-wide widget). Re-clamp against viewport even if
    // the user has dragged the mini widget; the swap is rare enough
    // that resetting position is fine UX.
    if (next === 'docked' && effectiveMode === 'mini') {
      const c = centerPosition(state.width, state.height);
      setState({ mode: next, x: c.x, y: c.y });
      return;
    }
    if (next === 'mini' && effectiveMode === 'docked') {
      const c = cornerPosition(defaultCorner);
      setState({ mode: next, x: c.x, y: c.y });
      return;
    }
    setState({ mode: next });
  }, [effectiveMode, enterFullscreen, exitFullscreen, setState, state.width, state.height, defaultCorner]);

  useEffect(() => {
    onModeChange?.(effectiveMode);
  }, [effectiveMode, onModeChange]);

  useImperativeHandle(apiRef, () => ({ mode: effectiveMode, setMode }), [effectiveMode, setMode]);

  // ---- Drag handling (docked mode only — mini snaps to a corner) ----
  const dragStateRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const onHeaderPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (effectiveMode !== 'docked') return;
    // Skip drag setup when the pointer landed on (or inside) a button —
    // capturing the pointer on the header steals all events from
    // descendants, so the buttons would never fire their onClick.
    if ((e.target as HTMLElement).closest('button')) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: state.x,
      origY: state.y,
    };
  }, [effectiveMode, state.x, state.y]);
  const onHeaderPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const nx = clampPos(drag.origX + dx, state.width, window.innerWidth);
    const ny = clampPos(drag.origY + dy, state.height, window.innerHeight);
    setState({ x: nx, y: ny });
  }, [setState, state.width, state.height]);
  const onHeaderPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    dragStateRef.current = null;
  }, []);

  // ---- Resize handling (docked mode only, bottom-right corner grip) ----
  const resizeStateRef = useRef<{ startX: number; startY: number; origW: number; origH: number } | null>(null);
  const onResizePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (effectiveMode !== 'docked') return;
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    resizeStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origW: state.width,
      origH: state.height,
    };
  }, [effectiveMode, state.width, state.height]);
  const onResizePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const resize = resizeStateRef.current;
    if (!resize) return;
    const dw = e.clientX - resize.startX;
    const dh = e.clientY - resize.startY;
    const w = clamp(resize.origW + dw, DOCKED_MIN_WIDTH, Math.min(DOCKED_MAX_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2));
    const h = clamp(resize.origH + dh, DOCKED_MIN_HEIGHT, Math.min(DOCKED_MAX_HEIGHT, window.innerHeight - VIEWPORT_MARGIN * 2));
    setState({ width: w, height: h });
  }, [setState]);
  const onResizePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    resizeStateRef.current = null;
  }, []);

  // ---- Re-clamp on window resize (docked mode) so persisted positions
  // outside a now-smaller viewport snap back in. ----
  useLayoutEffect(() => {
    if (effectiveMode !== 'docked') return;
    const onResize = () => {
      const nx = clampPos(state.x, state.width, window.innerWidth);
      const ny = clampPos(state.y, state.height, window.innerHeight);
      if (nx !== state.x || ny !== state.y) setState({ x: nx, y: ny });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [effectiveMode, state.x, state.y, state.width, state.height, setState]);

  // ---- Compose root style + className from effective mode. ----
  const rootStyle = useMemo<CSSProperties>(() => {
    if (effectiveMode === 'fullscreen') {
      return {
        position: 'fixed', inset: 0, width: '100vw', height: '100vh',
        zIndex,
      };
    }
    if (effectiveMode === 'docked') {
      return {
        position: 'fixed',
        left: state.x, top: state.y,
        width: state.width, height: state.height,
        zIndex,
      };
    }
    // mini
    return {
      position: 'fixed',
      left: state.x, top: state.y,
      width: MINI_WIDTH, height: MINI_HEIGHT,
      zIndex,
    };
  }, [effectiveMode, state.x, state.y, state.width, state.height, zIndex]);

  return (
    <div
      ref={rootRef}
      data-call-widget-mode={effectiveMode}
      style={rootStyle}
      className={cn(
        'flex flex-col bg-[#0f172a] text-white shadow-2xl overflow-hidden border border-white/10',
        effectiveMode === 'fullscreen' ? 'rounded-none' : 'rounded-lg',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-2 px-3 border-b border-white/5 select-none',
          effectiveMode === 'docked' ? 'cursor-grab active:cursor-grabbing' : '',
        )}
        style={{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }}
        onPointerDown={onHeaderPointerDown}
        onPointerMove={onHeaderPointerMove}
        onPointerUp={onHeaderPointerUp}
        onPointerCancel={onHeaderPointerUp}
      >
        <div className="min-w-0 flex items-center gap-2 text-xs text-white/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden />
          <span className="truncate font-medium">{title}</span>
          {subtitle && <span className="truncate text-white/50">{subtitle}</span>}
        </div>
        {expandable && (
          <div className="flex items-center gap-1">
            <ModeButton
              active={effectiveMode === 'mini'}
              label="Mini"
              onClick={() => setMode('mini')}
              testId="call-widget-mode-mini"
            >
              <CornerIcon />
            </ModeButton>
            <ModeButton
              active={effectiveMode === 'docked'}
              label="Window"
              onClick={() => setMode('docked')}
              testId="call-widget-mode-docked"
            >
              <WindowIcon />
            </ModeButton>
            <ModeButton
              active={effectiveMode === 'fullscreen'}
              label="Fullscreen"
              onClick={() => setMode(effectiveMode === 'fullscreen' ? 'docked' : 'fullscreen')}
              testId="call-widget-mode-fullscreen"
            >
              <ExpandIcon />
            </ModeButton>
          </div>
        )}
      </div>

      <div className="relative flex-1 min-h-0 bg-black">
        {children}
      </div>

      {controls && (
        <div className="border-t border-white/5 px-2 py-2 bg-[#0a1020]">
          {controls}
        </div>
      )}

      {effectiveMode === 'docked' && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          onPointerCancel={onResizePointerUp}
          data-testid="call-widget-resize-handle"
          aria-label="Resize call widget"
        >
          <svg viewBox="0 0 16 16" className="w-full h-full text-white/30">
            <path d="M14 10v4h-4M14 6v8M10 14h4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
}

function ModeButton({
  active,
  label,
  onClick,
  testId,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  testId: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      data-testid={testId}
      className={cn(
        'w-6 h-6 grid place-items-center rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors',
        active && 'text-white bg-white/15',
      )}
    >
      {children}
    </button>
  );
}

function CornerIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="6.5" y="6.5" width="4" height="3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function WindowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="1.5" y="2.5" width="9" height="7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 4V2h2M10 4V2H8M2 8v2h2M10 8v2H8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// ---- Geometry helpers ----

function centerPosition(width: number, height: number): { x: number; y: number } {
  if (typeof window === 'undefined') return { x: 16, y: 16 };
  return {
    x: Math.max(VIEWPORT_MARGIN, Math.floor((window.innerWidth - width) / 2)),
    y: Math.max(VIEWPORT_MARGIN, Math.floor((window.innerHeight - height) / 2)),
  };
}

function cornerPosition(corner: ExpandableCallWidgetProps['defaultCorner']): { x: number; y: number } {
  if (typeof window === 'undefined') return { x: 16, y: 16 };
  const W = window.innerWidth;
  const H = window.innerHeight;
  switch (corner) {
    case 'top-left': return { x: VIEWPORT_MARGIN, y: VIEWPORT_MARGIN };
    case 'top-right': return { x: W - MINI_WIDTH - VIEWPORT_MARGIN, y: VIEWPORT_MARGIN };
    case 'bottom-left': return { x: VIEWPORT_MARGIN, y: H - MINI_HEIGHT - VIEWPORT_MARGIN };
    case 'bottom-right':
    default:
      return { x: W - MINI_WIDTH - VIEWPORT_MARGIN, y: H - MINI_HEIGHT - VIEWPORT_MARGIN };
  }
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function clampPos(coord: number, size: number, viewport: number): number {
  return clamp(coord, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, viewport - size - VIEWPORT_MARGIN));
}
