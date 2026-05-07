// frontend/src/components/TableCursorGrid.tsx
//
// 10-row x 6-column spreadsheet grid.
// Broadcasts cell-click positions via the cursor service (mode: 'table').
// Renders colored cell-border indicators with initials badges for remote cursors
// that have metadata.mode === 'table'.

import type { RemoteCursor } from '../../hooks/useCursors';
import { identityToColor, identityToInitials } from '../../utils/identity';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TableCursorGridProps {
  cursors: Map<string, RemoteCursor>;
  localCursor?: RemoteCursor | null;
  onCellClick: (row: number, col: number) => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COL_HEADERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const ROW_COUNT = 10;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TableCursorGrid({ cursors, localCursor, onCellClick }: TableCursorGridProps) {
  // Determine local cursor cell position.
  let localCursorKey: string | null = null;
  if (localCursor && (localCursor.metadata as Record<string, unknown>).mode === 'table') {
    const pos = localCursor.position as { row?: number; col?: number };
    if (pos.row != null && pos.col != null) {
      localCursorKey = `${pos.row},${pos.col}`;
    }
  }

  // Build a lookup: "row,col" -> RemoteCursor[] for efficient cell lookup.
  const cellCursors = new Map<string, RemoteCursor[]>();
  cursors.forEach((cursor) => {
    if ((cursor.metadata as Record<string, unknown>).mode !== 'table') return;
    const pos = cursor.position as { row?: number; col?: number };
    if (pos.row == null || pos.col == null) return;
    const key = `${pos.row},${pos.col}`;
    const existing = cellCursors.get(key) ?? [];
    existing.push(cursor);
    cellCursors.set(key, existing);
  });

  return (
    <div className="overflow-auto border border-gray-200 rounded">
      <table className="border-collapse w-full">
        <thead>
          <tr>
            {/* empty corner cell */}
            <th className="font-bold bg-gray-50 p-1.5 min-w-[40px] text-center border border-gray-200" />
            {COL_HEADERS.map((header) => (
              <th
                key={header}
                className="font-bold bg-gray-50 p-1.5 min-w-[80px] text-center border border-gray-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ROW_COUNT }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {/* Row header */}
              <th className="font-bold bg-gray-50 p-1.5 min-w-[40px] text-center border border-gray-200">
                {rowIndex + 1}
              </th>

              {/* Data cells */}
              {COL_HEADERS.map((_, colIndex) => {
                const key = `${rowIndex},${colIndex}`;
                const remoteCursorsOnCell = cellCursors.get(key) ?? [];

                return (
                  <td
                    key={colIndex}
                    onClick={() => onCellClick(rowIndex, colIndex)}
                    className="relative p-2 min-w-[80px] h-[30px] border border-gray-200 cursor-pointer bg-white"
                  >
                    {/* Local cursor cell highlight */}
                    {localCursorKey === key && (
                      <div>
                        <div className="absolute inset-0 border-2 border-dashed border-blue-500 rounded pointer-events-none z-[9]" />
                        <div className="absolute -top-2.5 right-0 text-[10px] bg-blue-500 text-white px-1 py-px rounded-[3px] pointer-events-none z-[19] whitespace-nowrap">
                          You
                        </div>
                      </div>
                    )}

                    {/* Render a colored border overlay for each remote cursor on this cell */}
                    {remoteCursorsOnCell.map((cursor, i) => {
                      const color = identityToColor(
                        (cursor.metadata.displayName as string | undefined) ?? cursor.clientId
                      );
                      const initials = identityToInitials(
                        (cursor.metadata.displayName as string | undefined) ?? cursor.clientId.slice(0, 2)
                      );
                      const borderWidth = 3 - Math.min(i, 1); // slight visual stacking
                      return (
                        <div key={cursor.clientId}>
                          {/* Cell-border indicator */}
                          <div
                            className="absolute inset-0 rounded pointer-events-none"
                            style={{
                              border: `${borderWidth}px solid ${color}`,
                              boxShadow: `0 0 0 1px ${color}`,
                              zIndex: 10 + i,
                              opacity: 1 - i * 0.15,
                            }}
                          />
                          {/* Initials badge */}
                          <div
                            className="absolute -top-2.5 text-[10px] text-white px-1 py-px rounded-[3px] pointer-events-none whitespace-nowrap"
                            style={{
                              left: i * 22,
                              background: color,
                              zIndex: 20 + i,
                            }}
                          >
                            {initials}
                          </div>
                        </div>
                      );
                    })}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
