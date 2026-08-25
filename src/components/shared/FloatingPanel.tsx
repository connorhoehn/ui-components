// FloatingPanel — a draggable floating surface for call-adjacent tools
// (chat first, but any tool that should hover next to the call widget).
//
// - `position: fixed`; the header is the drag handle (pointer events,
//   same document-listener drag idiom as CallWidget) with viewport
//   clamping while dragging and on restore.
// - When `persistKey` is set, the dragged position is written to
//   localStorage on drag end and restored (re-clamped into the current
//   viewport) on the next mount — same roundtrip contract as
//   useCallWidgetPersistence, but position-only.
// - Body slot is `min-h-0 flex-1 overflow-hidden flex flex-col` so a
//   ChatPanel (or any fill-height tool) can stretch into it.
// - Renders null when `!open`. Dark tone (default) matches the
//   CallWidget chrome; no external drag libs.

import { createPortal } from 'react-dom';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

export interface FloatingPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Viewport-relative initial anchor when no persisted position exists. */
  defaultPosition?: 'left-center' | 'right-center' | { x: number; y: number };
  /** localStorage key persisting the dragged position across sessions. */
  persistKey?: string;
  widthClassName?: string;   // default 'w-80'
  heightClassName?: string;  // default 'h-[28rem]'
  tone?: 'light' | 'dark';   // default 'dark' (call chrome)
  zIndexClassName?: string;  // default matching the call widget's layer
  className?: string;
  'data-testid'?: string;    // root default 'floating-panel'
}

const STORAGE_VERSION = 1;
const MARGIN = 16;

interface StoredPosition {
  v: number;
  x: number;
  y: number;
}

function readStoredPosition(persistKey: string): { x: number; y: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(persistKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredPosition;
    if (
      !parsed ||
      parsed.v !== STORAGE_VERSION ||
      typeof parsed.x !== 'number' || !Number.isFinite(parsed.x) ||
      typeof parsed.y !== 'number' || !Number.isFinite(parsed.y)
    ) {
      return null;
    }
    return { x: parsed.x, y: parsed.y };
  } catch {
    return null;
  }
}

function writeStoredPosition(persistKey: string, pos: { x: number; y: number }): void {
  try {
    const stored: StoredPosition = { v: STORAGE_VERSION, x: pos.x, y: pos.y };
    window.localStorage.setItem(persistKey, JSON.stringify(stored));
  } catch { /* quota / private mode — ignore */ }
}

/** Clamp a top-left corner so the panel stays inside the viewport. */
function clampToViewport(x: number, y: number, width: number, height: number): { x: number; y: number } {
  const maxX = Math.max(MARGIN, window.innerWidth - width - MARGIN);
  const maxY = Math.max(MARGIN, window.innerHeight - height - MARGIN);
  return {
    x: Math.min(Math.max(x, MARGIN), maxX),
    y: Math.min(Math.max(y, MARGIN), maxY),
  };
}

export function FloatingPanel({
  open,
  onClose,
  title,
  children,
  defaultPosition = 'right-center',
  persistKey,
  widthClassName = 'w-80',
  heightClassName = 'h-[28rem]',
  tone = 'dark',
  zIndexClassName = 'z-[9999]',
  className,
  'data-testid': testId = 'floating-panel',
}: FloatingPanelProps) {
  const dark = tone === 'dark';
  const rootRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const posRef = useRef(pos);
  posRef.current = pos;

  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{
    pointerX: number;
    pointerY: number;
    baseX: number;
    baseY: number;
    width: number;
    height: number;
  } | null>(null);

  // Keep the latest anchor/persistKey visible to the placement effect
  // without retriggering it — placement happens once per open.
  const defaultPositionRef = useRef(defaultPosition);
  defaultPositionRef.current = defaultPosition;
  const persistKeyRef = useRef(persistKey);
  persistKeyRef.current = persistKey;

  // Initial placement (before paint): persisted position, clamped into
  // the current viewport — else the requested anchor.
  useLayoutEffect(() => {
    if (!open) return;
    const el = rootRef.current;
    if (!el || typeof window === 'undefined') return;
    const rect = el.getBoundingClientRect();
    const { width, height } = rect;

    const key = persistKeyRef.current;
    const stored = key ? readStoredPosition(key) : null;
    if (stored) {
      setPos(clampToViewport(stored.x, stored.y, width, height));
      return;
    }

    const anchor = defaultPositionRef.current;
    if (typeof anchor === 'object') {
      setPos(clampToViewport(anchor.x, anchor.y, width, height));
      return;
    }
    const y = Math.max(MARGIN, Math.round((window.innerHeight - height) / 2));
    const x = anchor === 'left-center'
      ? MARGIN
      : Math.max(MARGIN, window.innerWidth - width - MARGIN);
    setPos({ x, y });
  }, [open]);

  const handleHeaderPointerDown = useCallback((e: React.PointerEvent) => {
    // Left button only for mice; touch/pen always drag.
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const base = posRef.current ?? { x: rect.left, y: rect.top };
    dragStart.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      baseX: base.x,
      baseY: base.y,
      width: rect.width,
      height: rect.height,
    };
    setIsDragging(true);
    e.preventDefault();
  }, []);

  // Document-level move/up listeners while dragging — same idiom as
  // CallWidget's useDrag, so fast drags never escape the handle.
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      const s = dragStart.current;
      if (!s) return;
      setPos(clampToViewport(
        s.baseX + (e.clientX - s.pointerX),
        s.baseY + (e.clientY - s.pointerY),
        s.width,
        s.height,
      ));
    };

    const handlePointerUp = () => {
      dragStart.current = null;
      setIsDragging(false);
      const key = persistKeyRef.current;
      const p = posRef.current;
      if (key && p) writeStoredPosition(key, p);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  if (!open) return null;

  // Portal into document.body: consumers render this inside call chromes
  // whose roots carry `transform: translate(...)` (CallWidget drag), and
  // any non-none transform makes that ancestor the containing block for
  // position:fixed — the panel's viewport coordinates then resolve
  // against a 320px widget box and land off the bottom of the screen
  // (2026-08-25 audit, P0-1). Same escape hatch Modal uses.
  return createPortal(
    <div
      ref={rootRef}
      role="dialog"
      aria-label={title}
      data-testid={testId}
      className={cn(
        'fixed flex flex-col rounded-2xl border overflow-hidden backdrop-blur-sm',
        widthClassName,
        heightClassName,
        zIndexClassName,
        dark
          ? 'bg-surface-inverse border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-surface-panel border-border shadow-lg',
        className,
      )}
      // First render (before the placement effect) is parked offscreen so
      // the panel never flashes at (0,0).
      style={pos
        ? { left: pos.x, top: pos.y }
        : { left: -9999, top: -9999, visibility: 'hidden' }}
    >
      {/* Header / drag handle */}
      <div
        data-testid="floating-panel-header"
        onPointerDown={handleHeaderPointerDown}
        className={cn(
          'flex items-center justify-between gap-2 px-3 py-2 border-b shrink-0 select-none touch-none',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
          dark ? 'border-white/5' : 'border-border',
        )}
      >
        <span className={cn('text-xs font-medium truncate', dark ? 'text-white/80' : 'text-text-primary')}>
          {title}
        </span>
        <button
          type="button"
          onClick={onClose}
          // Don't let a click on ✕ start a drag.
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Close"
          data-testid="floating-panel-close"
          className={cn(
            'w-5 h-5 flex items-center justify-center border-none bg-transparent cursor-pointer rounded transition-colors shrink-0',
            dark ? 'text-white/40 hover:text-white/80' : 'text-text-tertiary hover:text-text-primary',
          )}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Body — fill-height slot for the hosted tool */}
      <div data-testid="floating-panel-body" className="min-h-0 flex-1 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default FloatingPanel;
