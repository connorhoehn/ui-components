import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import PanelsView from '../PanelsView';
import type { ChatMessage } from '../../../hooks/useChat';
import type { CursorMode, RemoteCursor } from '../../../hooks/useCursors';

// Replace every child panel with a thin test stub that exposes its props via
// data-* attributes so we can assert PanelsView's composition + routing
// without depending on the real implementations.

vi.mock('../../social/ChatPanel', () => ({
  ChatPanel: (props: { messages: ChatMessage[]; disabled?: boolean; typingUsers?: string[] }) => (
    <div
      data-testid="mock-chat-panel"
      data-disabled={props.disabled ? 'true' : 'false'}
      data-message-count={props.messages.length}
      data-typing={(props.typingUsers ?? []).join(',')}
    />
  ),
}));

vi.mock('../../collaboration/CursorModeSelector', () => ({
  CursorModeSelector: (props: { activeMode: CursorMode }) => (
    <div data-testid="mock-cursor-mode-selector" data-active-mode={props.activeMode} />
  ),
}));

vi.mock('../../collaboration/CursorCanvas', () => ({
  CursorCanvas: () => <div data-testid="mock-cursor-canvas" />,
}));

vi.mock('../../collaboration/TableCursorGrid', () => ({
  TableCursorGrid: () => <div data-testid="mock-table-cursor-grid" />,
}));

vi.mock('../../collaboration/TextCursorEditor', () => ({
  TextCursorEditor: () => <div data-testid="mock-text-cursor-editor" />,
}));

vi.mock('../../collaboration/CanvasCursorBoard', () => ({
  CanvasCursorBoard: () => <div data-testid="mock-canvas-cursor-board" />,
}));

vi.mock('../../collaboration/SharedTextEditor', () => ({
  SharedTextEditor: (props: { disabled?: boolean }) => (
    <div data-testid="mock-shared-text-editor" data-disabled={props.disabled ? 'true' : 'false'} />
  ),
}));

vi.mock('../../collaboration/ReactionButtons', () => ({
  ReactionButtons: (props: { disabled?: boolean }) => (
    <div data-testid="mock-reaction-buttons" data-disabled={props.disabled ? 'true' : 'false'} />
  ),
}));

vi.mock('../../social/ActivityPanel', () => ({
  ActivityPanel: (props: { connectionState: string }) => (
    <div data-testid="mock-activity-panel" data-connection-state={props.connectionState} />
  ),
}));

vi.mock('../ErrorBoundary', () => ({
  ErrorBoundary: ({ children, name }: { children: ReactNode; name?: string }) => (
    <div data-testid="mock-error-boundary" data-name={name}>{children}</div>
  ),
}));

type PanelsViewProps = React.ComponentProps<typeof PanelsView>;

function makeProps(over: Partial<PanelsViewProps> = {}): PanelsViewProps {
  return {
    connectionState: 'connected',
    onReact: () => {},
    chatMessages: [],
    onChatSend: () => {},
    cursors: new Map<string, RemoteCursor>(),
    localCursor: null,
    activeMode: 'freeform',
    onModeChange: () => {},
    onFreeformMove: () => {},
    onTableClick: () => {},
    onTextChange: () => {},
    onCanvasMove: () => {},
    crdtContent: '',
    applyLocalEdit: () => {},
    onTyping: () => {},
    typingUsers: [],
    idToken: null,
    sendMessage: () => {},
    onMessage: () => () => {},
    ...over,
  };
}

describe('PanelsView', () => {
  describe('section composition', () => {
    it('renders all five labeled sections', () => {
      render(<PanelsView {...makeProps()} />);
      expect(screen.getByText('Chat')).toBeInTheDocument();
      expect(screen.getByText('Cursors')).toBeInTheDocument();
      expect(screen.getByText('Reactions')).toBeInTheDocument();
      expect(screen.getByText('Shared Document')).toBeInTheDocument();
      expect(screen.getByTestId('mock-activity-panel')).toBeInTheDocument();
    });

    it('always renders ChatPanel, CursorModeSelector, ReactionButtons, SharedTextEditor, ActivityPanel', () => {
      render(<PanelsView {...makeProps()} />);
      expect(screen.getByTestId('mock-chat-panel')).toBeInTheDocument();
      expect(screen.getByTestId('mock-cursor-mode-selector')).toBeInTheDocument();
      expect(screen.getByTestId('mock-reaction-buttons')).toBeInTheDocument();
      expect(screen.getByTestId('mock-shared-text-editor')).toBeInTheDocument();
      expect(screen.getByTestId('mock-activity-panel')).toBeInTheDocument();
    });

    it('wraps ActivityPanel in an ErrorBoundary named "ActivityPanel"', () => {
      render(<PanelsView {...makeProps()} />);
      const boundary = screen.getByTestId('mock-error-boundary');
      expect(boundary).toHaveAttribute('data-name', 'ActivityPanel');
    });
  });

  describe('cursor-mode routing', () => {
    it('freeform mode renders CursorCanvas only', () => {
      render(<PanelsView {...makeProps({ activeMode: 'freeform' })} />);
      expect(screen.getByTestId('mock-cursor-canvas')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-table-cursor-grid')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-text-cursor-editor')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-canvas-cursor-board')).not.toBeInTheDocument();
    });

    it('table mode renders TableCursorGrid only', () => {
      render(<PanelsView {...makeProps({ activeMode: 'table' })} />);
      expect(screen.getByTestId('mock-table-cursor-grid')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-cursor-canvas')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-text-cursor-editor')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-canvas-cursor-board')).not.toBeInTheDocument();
    });

    it('text mode renders TextCursorEditor only', () => {
      render(<PanelsView {...makeProps({ activeMode: 'text' })} />);
      expect(screen.getByTestId('mock-text-cursor-editor')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-cursor-canvas')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-table-cursor-grid')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-canvas-cursor-board')).not.toBeInTheDocument();
    });

    it('canvas mode renders CanvasCursorBoard only', () => {
      render(<PanelsView {...makeProps({ activeMode: 'canvas' })} />);
      expect(screen.getByTestId('mock-canvas-cursor-board')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-cursor-canvas')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-table-cursor-grid')).not.toBeInTheDocument();
      expect(screen.queryByTestId('mock-text-cursor-editor')).not.toBeInTheDocument();
    });

    it('propagates activeMode down to CursorModeSelector', () => {
      render(<PanelsView {...makeProps({ activeMode: 'table' })} />);
      expect(screen.getByTestId('mock-cursor-mode-selector')).toHaveAttribute('data-active-mode', 'table');
    });
  });

  describe('connectionState propagation', () => {
    it('disables ChatPanel / ReactionButtons / SharedTextEditor when not connected', () => {
      render(<PanelsView {...makeProps({ connectionState: 'connecting' })} />);
      expect(screen.getByTestId('mock-chat-panel')).toHaveAttribute('data-disabled', 'true');
      expect(screen.getByTestId('mock-reaction-buttons')).toHaveAttribute('data-disabled', 'true');
      expect(screen.getByTestId('mock-shared-text-editor')).toHaveAttribute('data-disabled', 'true');
    });

    it('does NOT disable interactive panels when connected', () => {
      render(<PanelsView {...makeProps({ connectionState: 'connected' })} />);
      expect(screen.getByTestId('mock-chat-panel')).toHaveAttribute('data-disabled', 'false');
      expect(screen.getByTestId('mock-reaction-buttons')).toHaveAttribute('data-disabled', 'false');
      expect(screen.getByTestId('mock-shared-text-editor')).toHaveAttribute('data-disabled', 'false');
    });

    it('forwards raw connectionState string to ActivityPanel', () => {
      render(<PanelsView {...makeProps({ connectionState: 'disconnected' })} />);
      expect(screen.getByTestId('mock-activity-panel')).toHaveAttribute('data-connection-state', 'disconnected');
    });
  });

  describe('prop forwarding', () => {
    it('passes chatMessages and typingUsers through to ChatPanel', () => {
      const chatMessages: ChatMessage[] = [
        { clientId: 'u1', content: 'hi', timestamp: '0' },
        { clientId: 'u2', content: 'bye', timestamp: '0' },
      ];
      render(<PanelsView {...makeProps({ chatMessages, typingUsers: ['alice', 'bob'] })} />);
      const panel = screen.getByTestId('mock-chat-panel');
      expect(panel).toHaveAttribute('data-message-count', '2');
      expect(panel).toHaveAttribute('data-typing', 'alice,bob');
    });
  });
});
