// FloatingPanel — a draggable floating surface for call-adjacent tools
// (chat first, but any tool that should hover next to the call widget).
//
// - `position: fixed`; the header is the drag handle (pointer events,
//   same document-listener drag idiom as CallWidget) with viewport
//   clamping while dragging and on restore.
// - SNAP ZONES: while dragging, if the panel's top-left corner comes
//   within `snapThreshold` px of one of the named viewport anchors, that
//   anchor is "armed" — a drop-target ghost renders there, and on
//   release the panel animates into it.
// - ANCHOR PERSISTENCE: `persistKey` stores the resolved ANCHOR plus a
//   small pixel offset, never raw viewport coordinates. Raw pixels put a
//   panel off-screen when the window shrinks or the display changes
//   between sessions; an anchor re-resolves against whatever viewport
//   exists at restore time. v1 (raw x/y) payloads are migrated in place
//   by treating the stored point as an offset from its nearest anchor.
// - FOCUS-TO-FRONT: several panels can be open at once (chat +
//   transcript). Pointer-down or keyboard focus anywhere inside a panel
//   raises it above its siblings via a module-level z-order counter.
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
import { CloseIcon, MinusIcon } from '../ui/Icons';

/** Named viewport docking positions a panel can snap to. */
export type FloatingPanelAnchor =
  | 'top-left'
  | 'top-right'
  | 'left-center'
  | 'right-center'
  | 'bottom-left'
  | 'bottom-right';

export const FLOATING_PANEL_ANCHORS: readonly FloatingPanelAnchor[] = [
  'top-left',
  'top-right',
  'left-center',
  'right-center',
  'bottom-left',
  'bottom-right',
] as const;

export interface FloatingPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Viewport-relative initial anchor when no persisted position exists.
   *  Accepts any of the six named anchors or an explicit point. */
  defaultPosition?: FloatingPanelAnchor | { x: number; y: number };
  /** localStorage key persisting the resolved anchor + offset across
   *  sessions. */
  persistKey?: string;
  /** Snap to a nearby anchor on drag release. Default true. */
  snapEnabled?: boolean;
  /** Proximity (px) at which an anchor arms. Default 24. */
  snapThreshold?: number;
  /** Restrict which anchors participate. Default: all six. */
  snapAnchors?: readonly FloatingPanelAnchor[];
  /** Fires when a drag settles into an anchor. */
  onSnap?: (anchor: FloatingPanelAnchor) => void;
  /** Floor for the shared focus-to-front z-order. Default 9999 — matches
   *  `zIndexClassName`. Pass alongside a custom `zIndexClassName` so a
   *  raise doesn't jump the panel out of its intended layer. */
  baseZIndex?: number;
  widthClassName?: string;   // default 'w-80'
  heightClassName?: string;  // default 'h-[28rem]'
  tone?: 'light' | 'dark';   // default 'dark' (call chrome)
  zIndexClassName?: string;  // default matching the call widget's layer
  className?: string;
  'data-testid'?: string;    // root default 'floating-panel'
  /**
   * Extra controls drawn in the title bar, before the ×: icon buttons such as
   * "Dock" or "Pop out". Pointer presses and keys on them never start a drag
   * or nudge the panel. Since 2.541.0.
   */
  headerActions?: ReactNode;
  /** Accessible name of the × button. Default "Close". Since 2.541.0. */
  closeLabel?: string;
  /**
   * The × button's glyph: `'close'` (an ×, the default) or `'minimize'` (a
   * bar), for a panel whose × minimises rather than closes. Since 2.541.0.
   */
  closeIcon?: 'close' | 'minimize';
  /**
   * Minimised: the panel stays mounted (its children keep running, e.g. call
   * media) but is hidden, and a pill in the panel's nearest corner restores
   * it. Pair with `onMinimizedChange`. Since 2.541.0.
   */
  minimized?: boolean;
  /**
   * Fires with `true` from the minimise button (drawn in the title bar
   * whenever this is set) and `false` from the pill. Since 2.541.0.
   */
  onMinimizedChange?: (minimized: boolean) => void;
  /** The pill's text. Default the title. Since 2.541.0. */
  minimizedLabel?: string;
  /** Extra content inside the pill, after its label (a live dot, a count). Since 2.541.0. */
  minimizedContent?: ReactNode;
}

const STORAGE_VERSION = 2;
const MARGIN = 16;
const DEFAULT_SNAP_THRESHOLD = 24;
const SNAP_TRANSITION_MS = 180;
const KEYBOARD_NUDGE_PX = 12;

// ---------------------------------------------------------------------------
// Focus-to-front: one ordinal counter shared by every mounted panel, so a
// raise is always strictly above every sibling regardless of their bases.
// Monotonic for the life of the document — never reset, so a remounted
// panel can't accidentally reclaim a stale slot.
// ---------------------------------------------------------------------------
let zOrderCounter = 0;
function nextZOrder(): number {
  zOrderCounter += 1;
  return zOrderCounter;
}
function currentTopZOrder(): number {
  return zOrderCounter;
}

interface StoredV1 { v: 1; x: number; y: number }
interface StoredV2 { v: 2; anchor: FloatingPanelAnchor; dx: number; dy: number }

type RestoredPlacement =
  | { kind: 'anchor'; anchor: FloatingPanelAnchor; dx: number; dy: number }
  /** A v1 payload: raw viewport pixels, migrated on first restore. */
  | { kind: 'raw'; x: number; y: number };

function isAnchor(value: unknown): value is FloatingPanelAnchor {
  return typeof value === 'string'
    && (FLOATING_PANEL_ANCHORS as readonly string[]).includes(value);
}

function finite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function readStoredPlacement(persistKey: string): RestoredPlacement | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(persistKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredV1> & Partial<StoredV2> | null;
    if (!parsed || typeof parsed !== 'object') return null;
    if (parsed.v === 2) {
      if (!isAnchor(parsed.anchor) || !finite(parsed.dx) || !finite(parsed.dy)) return null;
      return { kind: 'anchor', anchor: parsed.anchor, dx: parsed.dx, dy: parsed.dy };
    }
    // v1 wrote raw viewport pixels. Don't discard them — a user who
    // parked the panel bottom-left last session should find it
    // bottom-left this session, on whatever display they're on now.
    if (parsed.v === 1 && finite(parsed.x) && finite(parsed.y)) {
      return { kind: 'raw', x: parsed.x, y: parsed.y };
    }
    return null;
  } catch {
    return null;
  }
}

function writeStoredPlacement(
  persistKey: string,
  anchor: FloatingPanelAnchor,
  dx: number,
  dy: number,
): void {
  try {
    const stored: StoredV2 = { v: STORAGE_VERSION, anchor, dx: Math.round(dx), dy: Math.round(dy) };
    window.localStorage.setItem(persistKey, JSON.stringify(stored));
  } catch { /* quota / private mode — ignore */ }
}

/** Top-left corner a panel of `width`×`height` occupies at `anchor`. */
export function resolveAnchorPosition(
  anchor: FloatingPanelAnchor,
  width: number,
  height: number,
): { x: number; y: number } {
  if (typeof window === 'undefined') return { x: MARGIN, y: MARGIN };
  const right = Math.max(MARGIN, window.innerWidth - width - MARGIN);
  const bottom = Math.max(MARGIN, window.innerHeight - height - MARGIN);
  const middle = Math.max(MARGIN, Math.round((window.innerHeight - height) / 2));
  switch (anchor) {
    case 'top-left': return { x: MARGIN, y: MARGIN };
    case 'top-right': return { x: right, y: MARGIN };
    case 'left-center': return { x: MARGIN, y: middle };
    case 'right-center': return { x: right, y: middle };
    case 'bottom-left': return { x: MARGIN, y: bottom };
    case 'bottom-right':
    default: return { x: right, y: bottom };
  }
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

/**
 * Anchor whose resolved corner is nearest `(x, y)`, by Euclidean
 * distance. Used both for arming a snap (gated on `threshold`) and, with
 * no threshold, for choosing which anchor a free-dragged position gets
 * persisted against.
 */
function nearestAnchor(
  x: number,
  y: number,
  width: number,
  height: number,
  anchors: readonly FloatingPanelAnchor[],
  threshold?: number,
): FloatingPanelAnchor | null {
  let best: FloatingPanelAnchor | null = null;
  let bestDistance = Infinity;
  for (const anchor of anchors) {
    const at = resolveAnchorPosition(anchor, width, height);
    const dx = at.x - x;
    const dy = at.y - y;
    // Chebyshev gate (each axis independently within threshold), so an
    // anchor only arms when the panel is genuinely hugging that corner
    // or edge-midpoint — not merely closest in a diagonal sense.
    if (threshold !== undefined && (Math.abs(dx) > threshold || Math.abs(dy) > threshold)) continue;
    const distance = dx * dx + dy * dy;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = anchor;
    }
  }
  return best;
}

export function FloatingPanel({
  open,
  onClose,
  title,
  children,
  defaultPosition = 'right-center',
  persistKey,
  snapEnabled = true,
  snapThreshold = DEFAULT_SNAP_THRESHOLD,
  snapAnchors = FLOATING_PANEL_ANCHORS,
  onSnap,
  baseZIndex = 9999,
  widthClassName = 'w-80',
  heightClassName = 'h-[28rem]',
  tone = 'dark',
  zIndexClassName = 'z-[9999]',
  className,
  'data-testid': testId = 'floating-panel',
  headerActions,
  closeLabel = 'Close',
  closeIcon = 'close',
  minimized = false,
  onMinimizedChange,
  minimizedLabel,
  minimizedContent,
}: FloatingPanelProps) {
  const dark = tone === 'dark';
  const rootRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const posRef = useRef(pos);
  posRef.current = pos;

  const [isDragging, setIsDragging] = useState(false);
  const [armedAnchor, setArmedAnchor] = useState<FloatingPanelAnchor | null>(null);
  const armedAnchorRef = useRef<FloatingPanelAnchor | null>(null);
  armedAnchorRef.current = armedAnchor;
  const [isSnapping, setIsSnapping] = useState(false);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // null until this panel has been raised at least once. While null the
  // `zIndexClassName` layer governs, so a consumer that deliberately
  // parked the panel on a lower layer keeps it until the user interacts.
  const [zOrder, setZOrder] = useState<number | null>(null);
  const zOrderRef = useRef<number | null>(null);
  zOrderRef.current = zOrder;

  const dragStart = useRef<{
    pointerX: number;
    pointerY: number;
    baseX: number;
    baseY: number;
    width: number;
    height: number;
  } | null>(null);

  // Keep the latest anchor/persistKey/snap config visible to the drag and
  // placement effects without retriggering them.
  const defaultPositionRef = useRef(defaultPosition);
  defaultPositionRef.current = defaultPosition;
  const persistKeyRef = useRef(persistKey);
  persistKeyRef.current = persistKey;
  const snapConfigRef = useRef({ snapEnabled, snapThreshold, snapAnchors, onSnap });
  snapConfigRef.current = { snapEnabled, snapThreshold, snapAnchors, onSnap };

  /** Persist `pos` as (anchor, offset) — never as raw viewport pixels. */
  const persistPosition = useCallback((x: number, y: number, width: number, height: number) => {
    const key = persistKeyRef.current;
    if (!key) return;
    const anchor = nearestAnchor(x, y, width, height, FLOATING_PANEL_ANCHORS) ?? 'top-left';
    const at = resolveAnchorPosition(anchor, width, height);
    writeStoredPlacement(key, anchor, x - at.x, y - at.y);
  }, []);

  const raiseToFront = useCallback(() => {
    if (zOrderRef.current !== null && zOrderRef.current === currentTopZOrder()) return;
    setZOrder(nextZOrder());
  }, []);

  // Set once the person has moved the panel this session (drag, snap or a
  // keyboard nudge). Until then a viewport resize re-places it from its anchor;
  // after, a resize only clamps where they put it.
  const movedRef = useRef(false);

  // Initial placement (before paint): persisted anchor re-resolved against
  // the CURRENT viewport — else the requested anchor.
  const place = useCallback((width: number, height: number) => {
    const key = persistKeyRef.current;
    const stored = key ? readStoredPlacement(key) : null;
    if (stored) {
      if (stored.kind === 'anchor') {
        const at = resolveAnchorPosition(stored.anchor, width, height);
        setPos(clampToViewport(at.x + stored.dx, at.y + stored.dy, width, height));
        return;
      }
      // v1 → v2 migration: clamp the raw point into today's viewport,
      // then rewrite it as the nearest anchor plus the leftover offset.
      const migrated = clampToViewport(stored.x, stored.y, width, height);
      setPos(migrated);
      persistPosition(migrated.x, migrated.y, width, height);
      return;
    }

    const anchor = defaultPositionRef.current;
    if (typeof anchor === 'object') {
      setPos(clampToViewport(anchor.x, anchor.y, width, height));
      return;
    }
    setPos(resolveAnchorPosition(anchor, width, height));
  }, [persistPosition]);

  useLayoutEffect(() => {
    if (!open) return;
    const el = rootRef.current;
    if (!el || typeof window === 'undefined') return;
    movedRef.current = false;
    const { width, height } = el.getBoundingClientRect();
    place(width, height);
  }, [open, place]);

  // Re-clamp on viewport resize: a panel opened at 1440×900 and then met by a
  // 1024×768 window used to keep its y and overflow the bottom edge.
  useEffect(() => {
    if (!open || typeof window === 'undefined') return;
    const onResize = () => {
      const el = rootRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      const p = posRef.current;
      if (movedRef.current && p) setPos(clampToViewport(p.x, p.y, width, height));
      else place(width, height);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open, place]);

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
    setIsSnapping(false);
    movedRef.current = true;
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
      const next = clampToViewport(
        s.baseX + (e.clientX - s.pointerX),
        s.baseY + (e.clientY - s.pointerY),
        s.width,
        s.height,
      );
      setPos(next);
      const { snapEnabled: enabled, snapThreshold: threshold, snapAnchors: anchors } = snapConfigRef.current;
      setArmedAnchor(
        enabled
          ? nearestAnchor(next.x, next.y, s.width, s.height, anchors, threshold)
          : null,
      );
    };

    const handlePointerUp = () => {
      const s = dragStart.current;
      dragStart.current = null;
      setIsDragging(false);
      const armed = armedAnchorRef.current;
      setArmedAnchor(null);

      const width = s?.width ?? 0;
      const height = s?.height ?? 0;

      if (armed && s) {
        const at = resolveAnchorPosition(armed, width, height);
        setPos(at);
        setIsSnapping(true);
        if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
        snapTimerRef.current = setTimeout(() => setIsSnapping(false), SNAP_TRANSITION_MS);
        const key = persistKeyRef.current;
        if (key) writeStoredPlacement(key, armed, 0, 0);
        snapConfigRef.current.onSnap?.(armed);
        return;
      }

      const p = posRef.current;
      if (p) persistPosition(p.x, p.y, width, height);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, persistPosition]);

  useEffect(() => () => {
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
  }, []);

  // Keyboard nudging — the handle is focusable and announced as a button,
  // so it has to answer to something. Arrows move by a fixed step
  // (Shift = 1px for fine placement) and persist like a drag would.
  const handleHeaderKeyDown = useCallback((e: React.KeyboardEvent) => {
    const delta = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (!delta) return;
    const el = rootRef.current;
    const p = posRef.current;
    if (!el || !p) return;
    e.preventDefault();
    movedRef.current = true;
    const rect = el.getBoundingClientRect();
    const step = e.shiftKey ? 1 : KEYBOARD_NUDGE_PX;
    const next = clampToViewport(
      p.x + delta[0]! * step,
      p.y + delta[1]! * step,
      rect.width,
      rect.height,
    );
    setPos(next);
    persistPosition(next.x, next.y, rect.width, rect.height);
  }, [persistPosition]);

  // Minimising from inside the panel would drop focus into the hidden
  // dialog; hand it to the pill instead.
  const pillRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!minimized) return;
    const active = typeof document === 'undefined' ? null : document.activeElement;
    if (active && rootRef.current?.contains(active)) pillRef.current?.focus();
  }, [minimized]);

  if (!open) return null;

  // The pill sits flush in the corner the panel is nearest, so a gallery
  // parked bottom-right minimises to a pill bottom-right.
  const pill = (() => {
    if (!minimized) return null;
    const el = rootRef.current;
    const w = el?.offsetWidth ?? 0;
    const h = el?.offsetHeight ?? 0;
    const vw = typeof window === 'undefined' ? 0 : window.innerWidth;
    const vh = typeof window === 'undefined' ? 0 : window.innerHeight;
    const p = pos ?? { x: vw - w - MARGIN, y: vh - h - MARGIN };
    const right = p.x + w / 2 > vw / 2;
    const bottom = p.y + h / 2 > vh / 2;
    return {
      ...(right ? { right: Math.max(0, vw - (p.x + w)) } : { left: Math.max(0, p.x) }),
      ...(bottom ? { bottom: Math.max(0, vh - (p.y + h)) } : { top: Math.max(0, p.y) }),
    };
  })();

  const ghost = armedAnchor
    ? resolveAnchorPosition(armedAnchor, rootRef.current?.offsetWidth ?? 0, rootRef.current?.offsetHeight ?? 0)
    : null;

  // Portal into document.body: consumers render this inside call chromes
  // whose roots carry `transform: translate(...)` (CallWidget drag), and
  // any non-none transform makes that ancestor the containing block for
  // position:fixed — the panel's viewport coordinates then resolve
  // against a 320px widget box and land off the bottom of the screen
  // (2026-08-25 audit, P0-1). Same escape hatch Modal uses.
  return createPortal(
    <>
      {/* Drop-target ghost for the armed snap zone */}
      {armedAnchor && ghost && (
        <div
          aria-hidden="true"
          data-testid="floating-panel-snap-target"
          data-anchor={armedAnchor}
          className={cn(
            'fixed pointer-events-none rounded-2xl border-2 border-dashed',
            widthClassName,
            heightClassName,
            zIndexClassName,
            dark ? 'border-white/30 bg-white/5' : 'border-border-focus bg-info-bg/40',
          )}
          style={{ left: ghost.x, top: ghost.y, zIndex: baseZIndex - 1 }}
        />
      )}
      <div
        ref={rootRef}
        role="dialog"
        aria-label={title}
        data-testid={testId}
        data-snap-armed={armedAnchor ?? undefined}
        data-snapping={isSnapping ? 'true' : undefined}
        onPointerDownCapture={raiseToFront}
        onFocusCapture={raiseToFront}
        aria-hidden={minimized || undefined}
        data-minimized={minimized ? 'true' : undefined}
        className={cn(
          'fixed flex flex-col rounded-2xl border overflow-hidden backdrop-blur-sm',
          // Hidden but laid out: children stay mounted and the size stays
          // measurable for the pill's corner and the restore.
          minimized && 'invisible pointer-events-none',
          widthClassName,
          heightClassName,
          zIndexClassName,
          isSnapping && 'transition-[left,top] duration-150 ease-out',
          dark
            // Theme-INVARIANT chrome: every child below is `text-white/80`,
            // `border-white/5`, `bg-white/5`. `bg-surface-inverse` flips to
            // #f8fafc in dark mode and took the whole panel white-on-white.
            // See the --color-call-chrome comment in src/styles.css.
            ? 'bg-call-chrome border-call-chrome-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-surface-panel border-border shadow-lg',
          className,
        )}
        // First render (before the placement effect) is parked offscreen so
        // the panel never flashes at (0,0).
        style={{
          ...(pos
            ? { left: pos.x, top: pos.y }
            : { left: -9999, top: -9999, visibility: 'hidden' as const }),
          ...(zOrder !== null ? { zIndex: baseZIndex + zOrder } : null),
        }}
      >
        {/* Header / drag handle */}
        <div
          data-ui-part=""
          data-testid="floating-panel-header"
          role="button"
          tabIndex={0}
          aria-label={`Move ${title} panel`}
          onPointerDown={handleHeaderPointerDown}
          onKeyDown={handleHeaderKeyDown}
          className={cn(
            'flex items-center justify-between gap-2 px-3 py-2 border-b shrink-0 select-none touch-none',
            isDragging ? 'cursor-grabbing' : 'cursor-grab',
            dark ? 'border-white/5' : 'border-border',
          )}
        >
          <span className={cn('text-xs font-medium truncate', dark ? 'text-white/80' : 'text-text-primary')}>
            {title}
          </span>
          <div
            data-ui-part=""
            data-testid="floating-panel-actions"
            className="flex items-center gap-1 shrink-0"
            // Controls in the handle: a press or a key on them is theirs,
            // never a drag start or an arrow-key nudge of the panel.
            onPointerDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {headerActions}
            {onMinimizedChange && closeIcon !== 'minimize' && (
              <button
                data-ui-part=""
                type="button"
                onClick={() => onMinimizedChange(true)}
                aria-label="Minimise"
                data-testid="floating-panel-minimize"
                className={headerButtonClass(dark)}
              >
                <MinusIcon size={12} aria-hidden="true" />
              </button>
            )}
            <button
              data-ui-part=""
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              data-testid="floating-panel-close"
              className={headerButtonClass(dark)}
            >
              {closeIcon === 'minimize'
                ? <MinusIcon size={12} aria-hidden="true" />
                : <CloseIcon size={12} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Body — fill-height slot for the hosted tool */}
        <div data-testid="floating-panel-body" className="min-h-0 flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
      {pill && (
        <button
          ref={pillRef}
          type="button"
          data-ui-part=""
          data-testid="floating-panel-pill"
          aria-label={`Show ${minimizedLabel ?? title}`}
          onClick={() => onMinimizedChange?.(false)}
          className={cn(
            'fixed flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium cursor-pointer shadow-lg',
            zIndexClassName,
            dark
              ? 'bg-call-chrome border-call-chrome-border text-white/80 hover:text-white'
              : 'bg-surface-panel border-border text-text-primary hover:bg-surface-hover',
          )}
          style={{ ...pill, ...(zOrder !== null ? { zIndex: baseZIndex + zOrder } : null) }}
        >
          <span className="truncate max-w-[12rem]">{minimizedLabel ?? title}</span>
          {minimizedContent}
        </button>
      )}
    </>,
    document.body,
  );
}

function headerButtonClass(dark: boolean): string {
  return cn(
    'w-5 h-5 flex items-center justify-center border-none bg-transparent cursor-pointer rounded transition-colors shrink-0',
    dark ? 'text-white/40 hover:text-white/80' : 'text-text-tertiary hover:text-text-primary',
  );
}

export default FloatingPanel;
