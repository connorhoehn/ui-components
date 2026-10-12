import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ChatPanel } from '../ChatPanel';
import { WrappedConversationSurface } from '../../../integrations/realtime/WrappedConversationSurface';
import { WrappedChatPanel } from '../../../integrations/realtime-modules/WrappedChatPanel';

afterEach(cleanup);

const contentGutter = 'mx-[var(--ui-content-gutter,1rem)]';

describe('conversation host gutters', () => {
  it('passes a compact header gutter through the native integration without changing tabs', () => {
    render(<WrappedConversationSurface name="Mira" declare={['chat', 'documents', 'pins', 'calls']}
      headerClassName="px-4 py-2" data-testid="conversation" />);
    const header = screen.getByTestId('conversation-header');
    expect(header).toHaveClass('px-4', 'py-2');
    expect(header).not.toHaveClass('px-6', 'py-3');
    expect(screen.getAllByRole('tab').map(tab => tab.textContent)).toEqual(['Chat', 'Documents', 'Pinned', 'Calls']);
  });

  it('keeps the usual header gutter when the host does not override it', () => {
    render(<WrappedConversationSurface name="Mira" declare={['chat']} data-testid="conversation" />);
    expect(screen.getByTestId('conversation-header')).toHaveClass('px-6', 'py-3');
  });

  it.each([true, false])('keeps prose inset and the custom composer flush when fill=%s', fill => {
    render(<ChatPanel messages={[]} onSend={() => {}} fill={fill} flushComposer typingUsers={['Mira']}
      composer={<div data-testid="custom-composer">Input</div>} />);
    const panel = screen.getByTestId('chat-panel');
    expect(panel).toHaveClass('px-0', 'pb-0');
    if (!fill) expect(panel).toHaveClass('border', 'pt-3');
    expect(screen.getByText('Chat (0)')).toHaveClass(contentGutter);
    expect(screen.getByTestId('typing-indicator')).toHaveClass(contentGutter);
    expect(screen.getByTestId('chat-panel-messages').parentElement).toHaveClass(contentGutter);
    expect(screen.getByTestId('chat-panel-composer-slot').parentElement).toBe(panel);
    expect(screen.getByTestId('chat-panel-composer-slot')).not.toHaveClass(contentGutter);
  });

  it('keeps existing padding for panels without the flush custom composer option', () => {
    const mounted = render(<ChatPanel messages={[]} onSend={() => {}} fill
      composer={<div>Input</div>} />);
    expect(screen.getByTestId('chat-panel')).toHaveClass('px-3', 'pb-3');
    mounted.rerender(<ChatPanel messages={[]} onSend={() => {}} composer={<div>Input</div>} />);
    expect(screen.getByTestId('chat-panel')).toHaveClass('p-3', 'border');
    expect(screen.getByTestId('chat-panel-messages').parentElement).not.toHaveClass(contentGutter);
    mounted.rerender(<ChatPanel messages={[]} onSend={() => {}} flushComposer typingUsers={['Mira']} />);
    expect(screen.getByTestId('chat-panel')).toHaveClass('p-3');
    expect(screen.getByText('Chat (0)')).not.toHaveClass(contentGutter);
    expect(screen.getByTestId('typing-indicator')).not.toHaveClass(contentGutter);
  });

  it('carries the full-width composer option through the actual realtime adapter', () => {
    render(<WrappedChatPanel chat={{ messages: [], sendMessage: () => {}, loadHistory: () => {} }}
      fill flushComposer composer={<div>Input</div>} />);
    expect(screen.getByTestId('chat-panel')).toHaveClass('px-0', 'pb-0');
    expect(screen.getByTestId('chat-panel-messages').parentElement).toHaveClass(contentGutter);
  });
});
