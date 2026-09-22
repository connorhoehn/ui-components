// A card body (AgentRunCard, a document/deck card, an attachment) sizes
// itself to its CONTAINER rather than its content, so it needs MessageRow's
// full-width `contentLayout="block"`, not the default shrink-to-fit bubble
// — see MessageRow's own `contentLayout` doc comment and unit tests for the
// class-level assertions. This file pins that ChatPanel actually SETS the
// prop on every card branch, for an own ("mine") message, using its own
// metadata-parsing helpers (`documentRefFromMetadata`, real
// `agentRunRefFromMetadata` via a `/doc`-shaped message) rather than a
// mocked MessageRow.

import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ChatPanel } from '../ChatPanel';
import type { ChatMessage } from '../../../hooks/useChat';

afterEach(cleanup);

const NOOP = () => {};

function msg(overrides: Partial<ChatMessage> = {}): ChatMessage {
  return {
    id: 'm1',
    clientId: 'c1',
    content: 'hello',
    displayName: 'Connor',
    timestamp: new Date('2026-09-22T12:00:00Z').toISOString(),
    userId: 'u-me',
    ...overrides,
  } as ChatMessage;
}

function renderPanel(messages: ChatMessage[]) {
  return render(
    <ChatPanel
      messages={messages}
      onSend={NOOP}
      currentUserId="u-me"
    />,
  );
}

describe('ChatPanel — MessageRow contentLayout on card bodies', () => {
  it('a plain-text own message keeps the default shrink-to-fit bubble', () => {
    renderPanel([msg({ content: 'just some words' })]);
    const content = screen.getByTestId('message-row-content');
    expect(content.className).toContain('max-w-[85%]');
    expect(content.className).not.toContain('w-full');
  });

  it('an own message whose body is a document card (docRef) gets the full-width block layout', () => {
    renderPanel([
      msg({
        content: '📄 Q3 Plan',
        metadata: { kind: 'document', documentId: 'doc-1', title: 'Q3 Plan' },
      }),
    ]);
    expect(screen.getByTestId('document-activity-card')).toBeInTheDocument();
    const content = screen.getByTestId('message-row-content');
    expect(content.className).toContain('w-full');
    expect(content.className).toContain('max-w-[36rem]');
    expect(content.className).not.toContain('max-w-[85%]');
  });

  it('an own message whose body is an AgentRunCard (agentRef) gets the full-width block layout', () => {
    renderPanel([
      msg({
        content: '/doc write a summary',
        metadata: {
          kind: 'agent-run',
          runId: 'run-1',
          instruction: 'write a summary',
          agentName: 'Scribe',
          command: '/doc',
        },
      }),
    ]);
    expect(screen.getByTestId('agent-run-card')).toBeInTheDocument();
    const content = screen.getByTestId('message-row-content');
    expect(content.className).toContain('w-full');
    expect(content.className).toContain('max-w-[36rem]');
    expect(content.className).not.toContain('max-w-[85%]');
  });

  it('an own message with an attachment (no card ref) still gets the block layout', () => {
    renderPanel([
      msg({
        content: '',
        attachments: [{ id: 'f1', name: 'report.pdf', size: 1024, contentType: 'application/pdf', url: 'https://example.com/report.pdf' }],
      }),
    ]);
    const content = screen.getByTestId('message-row-content');
    expect(content.className).toContain('w-full');
    expect(content.className).not.toContain('max-w-[85%]');
  });
});
