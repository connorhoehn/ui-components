import type { RemoteCursor } from '../../hooks/useCursors';
interface TableCursorGridProps {
    cursors: Map<string, RemoteCursor>;
    localCursor?: RemoteCursor | null;
    onCellClick: (row: number, col: number) => void;
}
export declare function TableCursorGrid({ cursors, localCursor, onCellClick }: TableCursorGridProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=TableCursorGrid.d.ts.map