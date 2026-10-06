import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedChatPanel } from '../WrappedChatPanel';
import type { RMUseChatReturn, RMChatMessage } from '../types';

const msg = (id: string, text: string, timestamp: string): RMChatMessage =>
  ({ id, clientId: 'c', channel: 'r', message: text, timestamp });
const chat = (messages: RMChatMessage[]): RMUseChatReturn => ({ messages, sendMessage: vi.fn(), loadHistory: vi.fn() });

describe('WrappedChatPanel localMessages', () => {
  it('merges local-only messages into the transcript by timestamp', () => {
    render(
      <WrappedChatPanel
        chat={chat([msg('a', 'first', '2026-10-06T10:00:00Z'), msg('c', 'third', '2026-10-06T10:02:00Z')])}
        localMessages={[{ id: 'local-1', clientId: 'local', content: 'Huddle started', timestamp: '2026-10-06T10:01:00Z' }]}
      />,
    );
    const text = document.body.textContent ?? '';
    expect(text.indexOf('first')).toBeLessThan(text.indexOf('Huddle started'));
    expect(text.indexOf('Huddle started')).toBeLessThan(text.indexOf('third'));
  });

  it('drops a local message whose id the channel now holds', () => {
    render(
      <WrappedChatPanel
        chat={chat([msg('m1', 'echoed', '2026-10-06T10:00:00Z')])}
        localMessages={[{ id: 'm1', clientId: 'local', content: 'optimistic copy', timestamp: '2026-10-06T10:00:00Z' }]}
      />,
    );
    expect(screen.getByText('echoed')).toBeInTheDocument();
    expect(screen.queryByText('optimistic copy')).toBeNull();
  });
});
