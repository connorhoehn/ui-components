import type { ChatMessage } from '../../hooks/useChat';
import type { CursorMode, RemoteCursor, TextSelectionData } from '../../hooks/useCursors';
import type { GatewayMessage } from '../../types/gateway';
export interface PanelsViewProps {
    connectionState: string;
    onReact: (emoji: string) => void;
    chatMessages: ChatMessage[];
    onChatSend: (content: string) => void;
    cursors: Map<string, RemoteCursor>;
    localCursor: RemoteCursor | null;
    activeMode: CursorMode;
    onModeChange: (mode: CursorMode) => void;
    onFreeformMove: (x: number, y: number) => void;
    onTableClick: (row: number, col: number) => void;
    onTextChange: (position: number, selectionData: TextSelectionData | null, hasSelection: boolean) => void;
    onCanvasMove: (x: number, y: number, tool: import('../../hooks/useCursors').CanvasTool, color: string, size: number) => void;
    crdtContent: string;
    applyLocalEdit: (newText: string) => void;
    hasConflict?: boolean;
    onDismissConflict?: () => void;
    onTyping: (isTyping: boolean) => void;
    typingUsers: string[];
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
}
export default function PanelsView({ connectionState, onReact, chatMessages, onChatSend, cursors, localCursor, activeMode, onModeChange, onFreeformMove, onTableClick, onTextChange, onCanvasMove, crdtContent, applyLocalEdit, hasConflict, onDismissConflict, onTyping, typingUsers, idToken, sendMessage, onMessage, }: PanelsViewProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PanelsView.d.ts.map