// src/components/pipelines/vision/BBoxAuthoringCanvas.tsx
//
// Wraps a source image with pointer-event handlers that let the user:
//   - Drag on empty area → create a new box
//   - Drag inside an existing box → move it
//   - Drag a corner handle → resize
//   - Double-click a label → edit inline
//   - Right-click or Delete key → remove box
//
// Fully controlled. The `boxes` prop is the source of truth; mutations
// call `onChange` with the complete next array. Dynamic position/size
// is the only place `style={{}}` is permitted (percentage values cannot
// be expressed as static Tailwind classes).

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import { Input } from '../../forms/Input';
import { useBBoxAuthoring } from './useBBoxAuthoring';
import type { AuthoringBBox } from '../../../types/pipeline';

export type { AuthoringBBox };

// ── Corner handle ids ─────────────────────────────────────────────────

type CornerHandle = 'nw' | 'ne' | 'sw' | 'se';

// ── Gesture state ─────────────────────────────────────────────────────

type GestureKind =
  | { kind: 'idle' }
  | { kind: 'create'; startX: number; startY: number; currentX: number; currentY: number }
  | { kind: 'move'; id: string; offsetX: number; offsetY: number; currentX: number; currentY: number }
  | { kind: 'resize'; id: string; corner: CornerHandle; origBox: AuthoringBBox; currentX: number; currentY: number };

// ── Inline label edit state ───────────────────────────────────────────

interface LabelEdit {
  id: string;
  value: string;
}

// ── Props ─────────────────────────────────────────────────────────────

export interface BBoxAuthoringCanvasProps {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  /** Current boxes — controlled. */
  boxes: AuthoringBBox[];
  /** Called when the user edits the set (add / move / resize / label / delete). */
  onChange: (next: AuthoringBBox[]) => void;
  /** When true, render boxes but disable editing. */
  readOnly?: boolean;
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────

function genId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Clamp v to [lo, hi]. */
function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

/** Convert a pointer event to px coordinates relative to the container. */
function relativePos(
  e: React.PointerEvent<HTMLElement> | PointerEvent,
  container: HTMLDivElement,
): { x: number; y: number } {
  const rect = container.getBoundingClientRect();
  return {
    x: clamp(e.clientX - rect.left, 0, rect.width),
    y: clamp(e.clientY - rect.top, 0, rect.height),
  };
}

/** Convert px coords on the rendered container to image-space px. */
function toImagePx(
  pxX: number,
  pxY: number,
  containerW: number,
  containerH: number,
  imageW: number,
  imageH: number,
): { x: number; y: number } {
  const scaleX = imageW / containerW;
  const scaleY = imageH / containerH;
  return { x: pxX * scaleX, y: pxY * scaleY };
}

/**
 * Returns the % left/top/width/height for a box given the image dims and
 * the container's rendered size (passed down as a ratio).
 * Since the container IS the image (object-contain fills it), percentage
 * positions are relative to imageWidth/imageHeight directly.
 */
function toPercent(
  box: AuthoringBBox,
  imageW: number,
  imageH: number,
): { left: string; top: string; width: string; height: string } {
  return {
    left: `${(box.x / imageW) * 100}%`,
    top: `${(box.y / imageH) * 100}%`,
    width: `${(box.width / imageW) * 100}%`,
    height: `${(box.height / imageH) * 100}%`,
  };
}

/** Returns which box (if any) the image-space point lies inside. */
function hitTest(
  imgX: number,
  imgY: number,
  boxes: AuthoringBBox[],
): AuthoringBBox | null {
  // Iterate in reverse so topmost (last-drawn) box wins.
  for (let i = boxes.length - 1; i >= 0; i--) {
    const b = boxes[i];
    if (imgX >= b.x && imgX <= b.x + b.width && imgY >= b.y && imgY <= b.y + b.height) {
      return b;
    }
  }
  return null;
}

// ── Component ─────────────────────────────────────────────────────────

export function BBoxAuthoringCanvas({
  imageUrl,
  imageWidth,
  imageHeight,
  boxes,
  onChange,
  readOnly = false,
  className,
}: BBoxAuthoringCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gesture, setGesture] = useState<GestureKind>({ kind: 'idle' });
  const [labelEdit, setLabelEdit] = useState<LabelEdit | null>(null);
  const labelInputRef = useRef<HTMLInputElement | null>(null);

  const { addBox, moveBox, resizeBox, setLabel, deleteBox } = useBBoxAuthoring(
    boxes,
    onChange,
  );

  // Focus the label input when it mounts.
  useEffect(() => {
    if (labelEdit && labelInputRef.current) {
      labelInputRef.current.focus();
      labelInputRef.current.select();
    }
  }, [labelEdit]);

  // ── Pointer-down: decide gesture kind ─────────────────────────────

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (readOnly) return;
      if (e.button !== 0) return; // only left-drag creates / moves
      const container = containerRef.current;
      if (!container) return;

      e.preventDefault();
      container.setPointerCapture(e.pointerId);

      const { x: pxX, y: pxY } = relativePos(e, container);
      const rect = container.getBoundingClientRect();
      const { x: imgX, y: imgY } = toImagePx(
        pxX, pxY,
        rect.width, rect.height,
        imageWidth, imageHeight,
      );

      const hit = hitTest(imgX, imgY, boxes);
      if (hit) {
        setGesture({
          kind: 'move',
          id: hit.id,
          offsetX: imgX - hit.x,
          offsetY: imgY - hit.y,
          currentX: imgX,
          currentY: imgY,
        });
      } else {
        setGesture({ kind: 'create', startX: imgX, startY: imgY, currentX: imgX, currentY: imgY });
      }
    },
    [readOnly, boxes, imageWidth, imageHeight],
  );

  // ── Corner-handle pointer-down: resize gesture ─────────────────────

  const onCornerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, box: AuthoringBBox, corner: CornerHandle) => {
      if (readOnly) return;
      e.stopPropagation();
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;
      container.setPointerCapture(e.pointerId);
      const { x: pxX, y: pxY } = relativePos(e, container);
      const rect = container.getBoundingClientRect();
      const { x: imgX, y: imgY } = toImagePx(pxX, pxY, rect.width, rect.height, imageWidth, imageHeight);
      setGesture({ kind: 'resize', id: box.id, corner, origBox: { ...box }, currentX: imgX, currentY: imgY });
    },
    [readOnly, imageWidth, imageHeight],
  );

  // ── Pointer-move: update in-flight gesture visually ───────────────

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (gesture.kind === 'idle') return;
      const container = containerRef.current;
      if (!container) return;
      const { x: pxX, y: pxY } = relativePos(e, container);
      const rect = container.getBoundingClientRect();
      const { x: imgX, y: imgY } = toImagePx(pxX, pxY, rect.width, rect.height, imageWidth, imageHeight);

      if (gesture.kind === 'create') {
        setGesture((g) => g.kind === 'create' ? { ...g, currentX: imgX, currentY: imgY } : g);
      } else if (gesture.kind === 'move') {
        setGesture((g) => g.kind === 'move' ? { ...g, currentX: imgX, currentY: imgY } : g);
      } else if (gesture.kind === 'resize') {
        setGesture((g) => g.kind === 'resize' ? { ...g, currentX: imgX, currentY: imgY } : g);
      }
    },
    [gesture.kind, imageWidth, imageHeight],
  );

  // ── Pointer-up: commit gesture ─────────────────────────────────────

  const onPointerUp = useCallback(
    (_e: React.PointerEvent<HTMLDivElement>) => {
      if (gesture.kind === 'create') {
        const x1 = Math.min(gesture.startX, gesture.currentX);
        const y1 = Math.min(gesture.startY, gesture.currentY);
        const x2 = Math.max(gesture.startX, gesture.currentX);
        const y2 = Math.max(gesture.startY, gesture.currentY);
        const w = x2 - x1;
        const h = y2 - y1;
        // Discard tiny accidental clicks (< 4 px either dim).
        if (w >= 4 && h >= 4) {
          addBox({ id: genId(), x: x1, y: y1, width: w, height: h });
        }
      } else if (gesture.kind === 'move') {
        const box = boxes.find((b) => b.id === gesture.id);
        if (box) {
          const newX = clamp(gesture.currentX - gesture.offsetX, 0, imageWidth - box.width);
          const newY = clamp(gesture.currentY - gesture.offsetY, 0, imageHeight - box.height);
          moveBox(gesture.id, newX, newY);
        }
      } else if (gesture.kind === 'resize') {
        const { id, corner, origBox, currentX, currentY } = gesture;
        let { x, y, width, height } = origBox;
        if (corner === 'nw') {
          const nx = clamp(currentX, 0, x + width - 4);
          const ny = clamp(currentY, 0, y + height - 4);
          width = x + width - nx;
          height = y + height - ny;
          x = nx;
          y = ny;
        } else if (corner === 'ne') {
          const ny = clamp(currentY, 0, y + height - 4);
          width = clamp(currentX - x, 4, imageWidth - x);
          height = y + height - ny;
          y = ny;
        } else if (corner === 'sw') {
          const nx = clamp(currentX, 0, x + width - 4);
          width = x + width - nx;
          height = clamp(currentY - y, 4, imageHeight - y);
          x = nx;
        } else {
          // se
          width = clamp(currentX - x, 4, imageWidth - x);
          height = clamp(currentY - y, 4, imageHeight - y);
        }
        resizeBox(id, x, y, width, height);
      }
      setGesture({ kind: 'idle' });
    },
    [gesture, boxes, addBox, moveBox, resizeBox, imageWidth, imageHeight],
  );

  // ── Right-click on box → delete ─────────────────────────────────────

  const onContextMenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
      if (readOnly) return;
      e.preventDefault();
      deleteBox(id);
    },
    [readOnly, deleteBox],
  );

  // ── Delete key → delete selected box ────────────────────────────────
  // (simple: delete on any keydown if a box div is focused)

  const onBoxKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, id: string) => {
      if (readOnly) return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteBox(id);
      }
    },
    [readOnly, deleteBox],
  );

  // ── Double-click label → inline edit ─────────────────────────────────

  const onLabelDoubleClick = useCallback(
    (e: React.MouseEvent, box: AuthoringBBox) => {
      if (readOnly) return;
      e.stopPropagation();
      setLabelEdit({ id: box.id, value: box.label ?? '' });
    },
    [readOnly],
  );

  const commitLabel = useCallback(() => {
    if (!labelEdit) return;
    setLabel(labelEdit.id, labelEdit.value);
    setLabelEdit(null);
  }, [labelEdit, setLabel]);

  // ── Derive in-flight ghost box for create gesture ─────────────────────

  let ghostBox: { x: number; y: number; width: number; height: number } | null = null;
  if (gesture.kind === 'create') {
    const x1 = Math.min(gesture.startX, gesture.currentX);
    const y1 = Math.min(gesture.startY, gesture.currentY);
    const x2 = Math.max(gesture.startX, gesture.currentX);
    const y2 = Math.max(gesture.startY, gesture.currentY);
    if (x2 - x1 >= 2 && y2 - y1 >= 2) {
      ghostBox = { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
    }
  }

  // ── Derive in-flight ghost for move gesture ─────────────────────────

  let moveGhostBox: AuthoringBBox | null = null;
  if (gesture.kind === 'move') {
    const origBox = boxes.find((b) => b.id === gesture.id);
    if (origBox) {
      const newX = clamp(gesture.currentX - gesture.offsetX, 0, imageWidth - origBox.width);
      const newY = clamp(gesture.currentY - gesture.offsetY, 0, imageHeight - origBox.height);
      moveGhostBox = { ...origBox, x: newX, y: newY };
    }
  }

  // ── Derive in-flight ghost for resize gesture ────────────────────────

  let resizeGhostBox: AuthoringBBox | null = null;
  if (gesture.kind === 'resize') {
    const { corner, origBox, currentX, currentY } = gesture;
    let { x, y, width, height } = origBox;
    if (corner === 'nw') {
      const nx = clamp(currentX, 0, x + width - 4);
      const ny = clamp(currentY, 0, y + height - 4);
      width = x + width - nx; height = y + height - ny; x = nx; y = ny;
    } else if (corner === 'ne') {
      const ny = clamp(currentY, 0, y + height - 4);
      width = clamp(currentX - x, 4, imageWidth - x); height = y + height - ny; y = ny;
    } else if (corner === 'sw') {
      const nx = clamp(currentX, 0, x + width - 4);
      width = x + width - nx; height = clamp(currentY - y, 4, imageHeight - y); x = nx;
    } else {
      width = clamp(currentX - x, 4, imageWidth - x); height = clamp(currentY - y, 4, imageHeight - y);
    }
    resizeGhostBox = { ...origBox, x, y, width, height };
  }

  // ── Rendered boxes (committed + ghosts during gesture) ───────────────

  const activeIds = new Set<string>();
  if (gesture.kind === 'move') activeIds.add(gesture.id);
  if (gesture.kind === 'resize') activeIds.add(gesture.id);

  const renderCornerHandle = (box: AuthoringBBox, corner: CornerHandle) => {
    const cornerCls: Record<CornerHandle, string> = {
      nw: '-top-1.5 -left-1.5 cursor-nw-resize',
      ne: '-top-1.5 -right-1.5 cursor-ne-resize',
      sw: '-bottom-1.5 -left-1.5 cursor-sw-resize',
      se: '-bottom-1.5 -right-1.5 cursor-se-resize',
    };
    return (
      <button
        data-ui-part=""
        key={corner}
        type="button"
        aria-label={`Resize ${corner}`}
        className={cn(
          // `bg-white` is DELIBERATE: resize handles sit on ARBITRARY image
          // pixels, not on a themed surface. They need a fixed light fill so
          // they stay findable over any photo, in either theme.
          'absolute h-3 w-3 rounded-sm border border-primary bg-white shadow',
          cornerCls[corner],
        )}
        onPointerDown={(e) => onCornerDown(e, box, corner)}
      />
    );
  };

  const renderBox = (
    box: AuthoringBBox,
    isGhost: boolean,
    showHandles: boolean,
    key: string,
  ) => {
    const pos = toPercent(box, imageWidth, imageHeight);
    const isEditing = labelEdit?.id === box.id;
    return (
      <div
        key={key}
        role="none"
        aria-label={`Bounding box${box.label ? ': ' + box.label : ''}`}
        className={cn(
          'absolute',
          isGhost ? 'opacity-60' : 'opacity-100',
        )}
        style={{
          left: pos.left,
          top: pos.top,
          width: pos.width,
          height: pos.height,
          // var(--color-primary), not a fixed indigo: the corner handles and
          // label pill below are already `border-primary`/`bg-primary`, so a
          // hardcoded hex here drifted out of sync with them in dark mode.
          border: '2px solid var(--color-primary)',
          background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
          borderRadius: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Label */}
        {isEditing ? (
          <Input
            ref={labelInputRef}
            type="text"
            size="sm"
            value={labelEdit.value}
            onChange={(e) => setLabelEdit((prev) => prev ? { ...prev, value: e.target.value } : null)}
            onBlur={commitLabel}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); commitLabel(); }
              if (e.key === 'Escape') { e.preventDefault(); setLabelEdit(null); }
            }}
            aria-label="Box label"
            className="absolute -top-5 left-0 h-5 w-24 border-primary px-1 text-[10px] font-semibold text-primary shadow focus:border-primary focus:ring-primary/40"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <button
            data-ui-part=""
            type="button"
            tabIndex={0}
            aria-label={`Label: ${box.label || 'Unlabeled'}. Double-click to edit.`}
            className="absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow"
            style={{ whiteSpace: 'nowrap' }}
            onDoubleClick={(e) => onLabelDoubleClick(e, box)}
            onContextMenu={(e) => onContextMenu(e, box.id)}
            onKeyDown={(e) => onBoxKeyDown(e, box.id)}
          >
            {box.label || 'Unlabeled'}
          </button>
        )}
        {/* Corner handles */}
        {showHandles && !readOnly && (
          <>
            {renderCornerHandle(box, 'nw')}
            {renderCornerHandle(box, 'ne')}
            {renderCornerHandle(box, 'sw')}
            {renderCornerHandle(box, 'se')}
          </>
        )}
      </div>
    );
  };

  const renderGhostCreate = () => {
    if (!ghostBox) return null;
    const pos = toPercent(ghostBox as AuthoringBBox, imageWidth, imageHeight);
    return (
      <div
        key="ghost-create"
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: pos.left,
          top: pos.top,
          width: pos.width,
          height: pos.height,
          border: '2px dashed var(--color-primary)',
          background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
          borderRadius: 2,
          boxSizing: 'border-box',
          opacity: 0.8,
        }}
      />
    );
  };

  return (
    <div
      className={cn('relative w-full select-none overflow-hidden rounded-lg border border-border bg-black/5', className)}
      aria-label="Bounding box authoring canvas"
      data-testid="bbox-authoring-canvas"
    >
      <img
        src={imageUrl}
        alt=""
        className="block h-auto w-full object-contain"
        draggable={false}
      />

      {/* Overlay layer */}
      <div
        ref={containerRef}
        data-testid="bbox-authoring-overlay"
        className={cn(
          'absolute inset-0',
          readOnly ? 'pointer-events-none' : 'cursor-crosshair',
        )}
        onPointerDown={readOnly ? undefined : onPointerDown}
        onPointerMove={readOnly ? undefined : onPointerMove}
        onPointerUp={readOnly ? undefined : onPointerUp}
      >
        {/* Committed boxes (skip those being moved/resized — show ghost instead) */}
        {boxes.map((box) => {
          const isActive = activeIds.has(box.id);
          if (isActive) return null;
          return renderBox(box, false, true, `box-${box.id}`);
        })}

        {/* Ghost for move */}
        {moveGhostBox && renderBox(moveGhostBox, true, false, 'ghost-move')}

        {/* Ghost for resize */}
        {resizeGhostBox && renderBox(resizeGhostBox, true, true, 'ghost-resize')}

        {/* Ghost for create drag */}
        {renderGhostCreate()}
      </div>

      {/* Read-only hint */}
      {!readOnly && (
        <div className="pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80">
          Drag to add box
        </div>
      )}
    </div>
  );
}

export default BBoxAuthoringCanvas;
