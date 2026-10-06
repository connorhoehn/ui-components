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

  it('renders a local message with a body (node or function) as a private card, ordered by timestamp', () => {
    const onPost = vi.fn();
    render(
      <WrappedChatPanel
        chat={chat([msg('a', 'first', '2026-10-06T10:00:00Z'), msg('c', 'third', '2026-10-06T10:02:00Z')])}
        localMessages={[
          { id: 'card-1', clientId: 'local', content: 'Summary', timestamp: '2026-10-06T10:01:00Z', body: <section data-testid="rich">Rich card</section>, actions: [{ id: 'post', label: 'Post', onSelect: onPost }] },
          { id: 'card-2', clientId: 'local', content: 'Diagram', timestamp: '2026-10-06T10:01:30Z', body: () => <span>From a function</span> },
        ]}
      />,
    );
    expect(screen.getByTestId('rich')).toBeInTheDocument();
    expect(screen.getByText('From a function')).toBeInTheDocument();
    expect(screen.queryByText('Summary')).toBeNull();
    expect(screen.getAllByText('Only you can see this')).toHaveLength(2);
    const text = document.body.textContent ?? '';
    expect(text.indexOf('first')).toBeLessThan(text.indexOf('Rich card'));
    expect(text.indexOf('From a function')).toBeLessThan(text.indexOf('third'));
    screen.getByText('Post').click();
    expect(onPost).toHaveBeenCalledTimes(1);
  });

  it('drops a body card whose id the channel holds, and a duplicate id', () => {
    render(
      <WrappedChatPanel
        chat={chat([msg('m1', 'echoed', '2026-10-06T10:00:00Z')])}
        localMessages={[
          { id: 'm1', clientId: 'local', content: 'x', timestamp: '2026-10-06T10:00:00Z', body: <span>held card</span> },
          { id: 'k', clientId: 'local', content: 'x', timestamp: '2026-10-06T10:01:00Z', body: <span>once</span> },
          { id: 'k', clientId: 'local', content: 'x', timestamp: '2026-10-06T10:02:00Z', body: <span>twice</span> },
        ]}
      />,
    );
    expect(screen.queryByText('held card')).toBeNull();
    expect(screen.getByText('once')).toBeInTheDocument();
    expect(screen.queryByText('twice')).toBeNull();
  });
});
