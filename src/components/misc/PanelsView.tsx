// frontend/src/components/PanelsView.tsx
//
// Lazy-loadable view for the "Previews" tab — Chat, Cursors, Reactions,
// Shared Document, and Activity panels.

import type { ChatMessage } from '../../hooks/useChat';
import type { CursorMode, RemoteCursor, TextSelectionData } from '../../hooks/useCursors';
import type { GatewayMessage } from '../../types/gateway';

import { ChatPanel } from '../social/ChatPanel';
import { CursorModeSelector } from '../collaboration/CursorModeSelector';
import { CursorCanvas } from '../collaboration/CursorCanvas';
import { TableCursorGrid } from '../collaboration/TableCursorGrid';
import { TextCursorEditor } from '../collaboration/TextCursorEditor';
import { CanvasCursorBoard } from '../collaboration/CanvasCursorBoard';
import { SharedTextEditor } from '../collaboration/SharedTextEditor';
import { ReactionButtons } from '../collaboration/ReactionButtons';
import { ActivityPanel } from '../social/ActivityPanel';
import { ErrorBoundary } from './ErrorBoundary';

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

export default function PanelsView({
  connectionState,
  onReact,
  chatMessages,
  onChatSend,
  cursors,
  localCursor,
  activeMode,
  onModeChange,
  onFreeformMove,
  onTableClick,
  onTextChange,
  onCanvasMove,
  crdtContent,
  applyLocalEdit,
  hasConflict,
  onDismissConflict,
  onTyping,
  typingUsers,
  idToken,
  sendMessage,
  onMessage,
}: PanelsViewProps) {
  return (
    <>
      {/* Chat section */}
      <div className="bg-surface border border-border rounded-lg p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary m-0 mb-3">Chat</p>
        <ChatPanel
          messages={chatMessages}
          onSend={onChatSend}
          disabled={connectionState !== 'connected'}
          onTyping={onTyping}
          typingUsers={typingUsers}
        />
      </div>

      {/* Cursors section */}
      <div className="bg-surface border border-border rounded-lg p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary m-0 mb-3">Cursors</p>
        <CursorModeSelector activeMode={activeMode} onModeChange={onModeChange} />
        {activeMode === 'freeform' && (
          <CursorCanvas cursors={cursors} localCursor={localCursor} onMouseMove={onFreeformMove} />
        )}
        {activeMode === 'table' && (
          <TableCursorGrid cursors={cursors} localCursor={localCursor} onCellClick={onTableClick} />
        )}
        {activeMode === 'text' && (
          <TextCursorEditor cursors={cursors} localCursor={localCursor} onPositionChange={onTextChange} />
        )}
        {activeMode === 'canvas' && (
          <CanvasCursorBoard cursors={cursors} localCursor={localCursor} onMouseMove={onCanvasMove} />
        )}
      </div>

      {/* Reactions section */}
      <div className="bg-surface border border-border rounded-lg p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary m-0 mb-3">Reactions</p>
        <ReactionButtons
          onReact={onReact}
          disabled={connectionState !== 'connected'}
        />
      </div>

      {/* Shared Document (CRDT) section */}
      <div className="bg-surface border border-border rounded-lg p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary m-0 mb-3">Shared Document</p>
        <SharedTextEditor
          content={crdtContent}
          applyLocalEdit={applyLocalEdit}
          disabled={connectionState !== 'connected'}
          hasConflict={hasConflict}
          onDismissConflict={onDismissConflict}
        />
      </div>

      {/* Activity section */}
      <ErrorBoundary name="ActivityPanel">
        <ActivityPanel
          idToken={idToken}
          sendMessage={sendMessage}
          onMessage={onMessage}
          connectionState={connectionState as 'connected' | 'connecting' | 'disconnected'}
        />
      </ErrorBoundary>
    </>
  );
}
