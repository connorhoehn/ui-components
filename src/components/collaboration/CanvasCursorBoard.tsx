// frontend/src/components/CanvasCursorBoard.tsx
//
// Canvas cursor board — a bounded drawing area that broadcasts mouse position
// with tool/color/size metadata. Remote cursors appear as colored circles
// with tool labels. Ephemeral trail particles are added on every mousemove
// event (both local and remote) and auto-removed after 1000ms.
//
// Part of Phase 07, Plan 07-04 (CURS-06).

import { useRef, useState, useCallback, useEffect } from 'react';
import type { RemoteCursor, CanvasTool } from '../../hooks/useCursors';
import { identityToColor, identityToInitials } from '../../utils/identity';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Trail helper
// ---------------------------------------------------------------------------

function addTrail(
  boardRef: React.RefObject<HTMLDivElement | null>,
  x: number,
  y: number,
  tool: CanvasTool | string,
  color: string,
  size: number
) {
  const board = boardRef.current;
  if (!board) return;

  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.borderRadius = '50%';
  dot.style.pointerEvents = 'none';
  dot.style.zIndex = '5';

  const t = tool as CanvasTool;

  switch (t) {
    case 'pen':
      dot.style.width = '2px';
      dot.style.height = '2px';
      dot.style.backgroundColor = color;
      dot.style.opacity = '0.8';
      break;
    case 'brush':
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor = color;
      dot.style.opacity = '0.6';
      break;
    case 'eraser':
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor = 'rgba(255,255,255,0.8)';
      dot.style.border = '1px solid #ccc';
      dot.style.opacity = '0.7';
      break;
    case 'select':
    default:
      dot.style.width = '1px';
      dot.style.height = '1px';
      dot.style.backgroundColor = color;
      dot.style.opacity = '0.5';
      break;
  }

  // Position centered at cursor point.
  const dotSize = parseFloat(dot.style.width) || 2;
  dot.style.left = `${x - dotSize / 2}px`;
  dot.style.top = `${y - dotSize / 2}px`;

  board.appendChild(dot);

  setTimeout(() => {
    if (board.contains(dot)) {
      board.removeChild(dot);
    }
  }, 1000);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface CanvasCursorBoardProps {
  cursors: Map<string, RemoteCursor>;
  localCursor?: RemoteCursor | null;
  onMouseMove: (x: number, y: number, tool: CanvasTool, color: string, size: number) => void;
  width?: number;
  height?: number;
}

export function CanvasCursorBoard({
  cursors,
  localCursor,
  onMouseMove,
  width = 600,
  height = 300,
}: CanvasCursorBoardProps) {
  const [tool, setTool] = useState<CanvasTool>('brush');
  const [color, setColor] = useState('#007bff');
  const [size, setSize] = useState(5);

  // Ref to the board div — trail particles are appended here imperatively
  // to avoid React re-renders on every mousemove.
  const boardRef = useRef<HTMLDivElement>(null);

  // Throttle timer for 50ms leading-edge mousemove rate-limiting.
  const throttleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Add local trail on every event (not throttled — visual feedback).
      addTrail(boardRef, x, y, tool, color, size);

      // Throttle broadcast: leading-edge 50ms.
      if (throttleTimerRef.current !== null) return;
      onMouseMove(x, y, tool, color, size);
      throttleTimerRef.current = setTimeout(() => {
        throttleTimerRef.current = null;
      }, 50);
    },
    [tool, color, size, onMouseMove]
  );

  const tools: CanvasTool[] = ['brush', 'pen', 'eraser', 'select'];
  const toolLabels: Record<CanvasTool, string> = {
    brush: 'Brush',
    pen: 'Pen',
    eraser: 'Eraser',
    select: 'Select',
  };

  // Render remote canvas cursors filtered by mode.
  const canvasCursors = Array.from(cursors.values()).filter(
    (c) => (c.metadata.mode as string) === 'canvas'
  );

  return (
    <div>
      {/* Tool controls row */}
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-neutral">Tool:</span>
          {tools.map((t) => (
            <button
              key={t}
              onClick={() => setTool(t)}
              className={cn(
                'text-xs px-2.5 py-1 border rounded cursor-pointer',
                tool === t
                  ? 'bg-[#007bff] text-white border-[#007bff]'
                  : 'bg-white text-text-primary border-border-emphasis'
              )}
            >
              {toolLabels[t]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[11px] text-neutral">Color:</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-6 cursor-pointer border-none p-0"
          />
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[11px] text-neutral">Size: {size}</span>
          <input
            type="range"
            min={1}
            max={50}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value, 10))}
            className="w-20 cursor-pointer"
          />
        </div>
      </div>

      {/* Board area */}
      <div
        ref={boardRef}
        onMouseMove={handleMouseMove}
        className="relative border-2 border-border rounded overflow-hidden cursor-crosshair cursor-canvas-grid"
        style={{ width, height }}
      >
        {/* Board label */}
        <span className="absolute top-1 left-1 text-text-tertiary text-xs p-1 pointer-events-none select-none">
          Move your mouse here (canvas mode)
        </span>

        {/* Local canvas cursor */}
        {localCursor && (localCursor.metadata.mode as string) === 'canvas' && (() => {
          const lx = localCursor.position.x as number;
          const ly = localCursor.position.y as number;
          const localTool = (localCursor.metadata.tool as CanvasTool | undefined) ?? 'brush';
          return (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-[11] pointer-events-none select-none opacity-70"
              style={{ left: lx, top: ly }}
            >
              <div className="w-6 h-6 rounded-full bg-info border-2 border-dashed border-white flex items-center justify-center text-white text-[9px] font-bold shadow-md">
                You
              </div>
              <div className="text-[11px] mt-0.5 text-white bg-info opacity-85 rounded-[3px] px-1 py-px whitespace-nowrap">
                You ({localTool})
              </div>
            </div>
          );
        })()}

        {/* Remote canvas cursors */}
        {canvasCursors.map((cursor) => {
          const cx = cursor.position.x as number;
          const cy = cursor.position.y as number;
          const cursorColor = identityToColor(
            (cursor.metadata.displayName as string | undefined) ?? cursor.clientId
          );
          const initials = identityToInitials(
            (cursor.metadata.displayName as string | undefined) ?? cursor.clientId.slice(0, 2)
          );
          const remoteTool = (cursor.metadata.tool as CanvasTool | undefined) ?? 'brush';
          const remoteSize = (cursor.metadata.size as number | undefined) ?? 5;

          return (
            <RemoteCursorWithTrail
              key={cursor.clientId}
              x={cx}
              y={cy}
              color={cursorColor}
              initials={initials}
              tool={remoteTool}
              size={remoteSize}
              boardRef={boardRef}
            />
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// RemoteCursorWithTrail — sub-component that adds a trail whenever it renders
// with new position data.
// ---------------------------------------------------------------------------

interface RemoteCursorWithTrailProps {
  x: number;
  y: number;
  color: string;
  initials: string;
  tool: CanvasTool;
  size: number;
  boardRef: React.RefObject<HTMLDivElement | null>;
}

function RemoteCursorWithTrail({
  x,
  y,
  color,
  initials,
  tool,
  size,
  boardRef,
}: RemoteCursorWithTrailProps) {
  // Add a trail particle every time position changes.
  useEffect(() => {
    addTrail(boardRef, x, y, tool, color, size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y]);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none select-none"
      style={{ left: x, top: y }}
    >
      {/* Cursor circle with initials */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md"
        style={{ background: color }}
      >
        {initials}
      </div>

      {/* Tool label below cursor */}
      <div
        className="text-[11px] mt-0.5 text-white opacity-85 rounded-[3px] px-1 py-px whitespace-nowrap"
        style={{ background: color }}
      >
        {initials} ({tool})
      </div>
    </div>
  );
}
