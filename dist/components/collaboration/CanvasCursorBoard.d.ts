import type { RemoteCursor, CanvasTool } from '../../hooks/useCursors';
interface CanvasCursorBoardProps {
    cursors: Map<string, RemoteCursor>;
    localCursor?: RemoteCursor | null;
    onMouseMove: (x: number, y: number, tool: CanvasTool, color: string, size: number) => void;
    width?: number;
    height?: number;
}
export declare function CanvasCursorBoard({ cursors, localCursor, onMouseMove, width, height, }: CanvasCursorBoardProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=CanvasCursorBoard.d.ts.map