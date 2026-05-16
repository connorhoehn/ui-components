// frontend/src/components/CursorCanvas.tsx
//
// Freeform cursor overlay — absolute-positioned container with mousemove
// broadcasting and remote cursor circles.
//
// Part of Phase 07 presence/cursors. Renders a bounded area where mouse
// movement is tracked and broadcast, and remote users' cursors are shown
// as colored circles with their initials.

import type { RemoteCursor } from '../../hooks/useCursors';
import { identityToColor, identityToInitials } from '../../utils/identity';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface CursorCanvasProps {
  cursors: Map<string, RemoteCursor>;
  localCursor?: RemoteCursor | null;
  onMouseMove: (x: number, y: number) => void;
  width?: number;
  height?: number;
}

export function CursorCanvas({
  cursors,
  localCursor,
  onMouseMove,
  width = 600,
  height = 300,
}: CursorCanvasProps) {
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onMouseMove(x, y);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative border-2 border-gray-200 rounded overflow-hidden cursor-none cursor-canvas-grid"
      style={{ width, height }}
    >
      {/* Label */}
      <span className="absolute top-1 left-1 text-gray-400 text-xs p-1 pointer-events-none select-none">
        Move your mouse here
      </span>

      {/* Local cursor circle */}
      {localCursor && (localCursor.metadata.mode as string) === 'freeform' && (() => {
        const lx = localCursor.position.x as number;
        const ly = localCursor.position.y as number;
        return (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500 border-2 border-dashed border-white flex items-center justify-center text-white text-[9px] font-bold shadow-md z-[11] pointer-events-none select-none opacity-80"
            style={{ left: lx, top: ly }}
          >
            You
          </div>
        );
      })()}

      {/* Remote cursor circles */}
      {Array.from(cursors.values()).map((cursor) => {
        const x = cursor.position.x as number;
        const y = cursor.position.y as number;
        const color = identityToColor(
          (cursor.metadata.displayName as string | undefined) ?? cursor.clientId
        );
        const initials = identityToInitials(
          (cursor.metadata.displayName as string | undefined) ?? cursor.clientId.slice(0, 2)
        );

        return (
          <div
            key={cursor.clientId}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md z-10 pointer-events-none select-none"
            style={{ left: x, top: y, background: color }}
          >
            {initials}
          </div>
        );
      })}
    </div>
  );
}
