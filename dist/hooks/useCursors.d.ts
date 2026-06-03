import type { ConnectionState, GatewayMessage } from '../types/gateway';
export type CursorMode = 'freeform' | 'table' | 'text' | 'canvas';
export type CanvasTool = 'brush' | 'pen' | 'eraser' | 'select';
export interface RemoteCursor {
    clientId: string;
    position: Record<string, unknown>;
    metadata: Record<string, unknown>;
}
export interface TextSelectionData {
    start: number;
    end: number;
    text: string;
}
export interface UseCursorsReturn {
    cursors: Map<string, RemoteCursor>;
    localCursor: RemoteCursor | null;
    activeMode: CursorMode;
    sendFreeformUpdate: (x: number, y: number) => void;
    sendTableUpdate: (row: number, col: number) => void;
    sendTextUpdate: (position: number, selectionData: TextSelectionData | null, hasSelection: boolean) => void;
    sendCanvasUpdate: (x: number, y: number, tool: CanvasTool, color: string, size: number) => void;
    switchMode: (mode: CursorMode) => void;
}
export interface UseCursorsOptions {
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    currentChannel: string;
    connectionState: ConnectionState;
    clientId: string | null;
    displayName: string;
}
export declare function useCursors(options: UseCursorsOptions): UseCursorsReturn;
//# sourceMappingURL=useCursors.d.ts.map