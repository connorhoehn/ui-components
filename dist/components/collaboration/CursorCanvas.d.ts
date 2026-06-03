import type { RemoteCursor } from '../../hooks/useCursors';
interface CursorCanvasProps {
    cursors: Map<string, RemoteCursor>;
    localCursor?: RemoteCursor | null;
    onMouseMove: (x: number, y: number) => void;
    width?: number;
    height?: number;
}
export declare function CursorCanvas({ cursors, localCursor, onMouseMove, width, height, }: CursorCanvasProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CursorCanvas.d.ts.map